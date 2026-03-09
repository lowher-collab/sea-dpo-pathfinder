import { Article } from "@/data/insights";

export async function fetchInsights(): Promise<Article[]> {
    const token = import.meta.env.VITE_NOTION_TOKEN;
    const databaseId = import.meta.env.VITE_NOTION_DATABASE_ID;

    if (!token || !databaseId) {
        console.warn("Notion credentials missing. Returning empty array.");
        return [];
    }

    try {
        console.log("Fetching from Notion via proxy...");
        const response = await fetch(`/notion-api/v1/databases/${databaseId}/query`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Notion-Version": "2022-06-28",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sorts: [
                    {
                        property: "Date",
                        direction: "descending",
                    },
                ],
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Notion API Error: ${response.status} ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();

        const articles = data.results.map((page: any) => {
            // Find the property of type 'title'
            const titleProp = Object.values(page.properties).find(
                (prop: any) => prop.type === "title"
            ) as any;
            const title = titleProp?.title[0]?.plain_text || "Untitled";

            // Find Status (case-insensitive and support both status/select types)
            const statusProp = page.properties.Status;
            const statusValue = (statusProp?.status?.name || statusProp?.select?.name || "").toLowerCase();
            const isPublished = statusValue === "published";

            // Find Category
            const categoryValue = (page.properties.Category?.select?.name || "").toLowerCase();
            const isBlog = categoryValue === "blog";

            // If not published or not a blog, filter it out
            if (!isPublished || !isBlog) {
                return null;
            }

            // Robust country extraction: Try Country property -> Tags -> Scan EVERY property
            const getRawCountry = (props: any, pageTitle: string) => {
                const c = props.Country;
                // 1. Try dedicated Country property
                let val = c?.select?.name ||
                    c?.multi_select?.[0]?.name ||
                    c?.rich_text?.[0]?.plain_text ||
                    "";

                // 2. Try Tags property
                if (!val && props.Tags?.multi_select?.length > 0) {
                    val = props.Tags.multi_select[0].name;
                }

                // 3. Fallback: Scan EVERY property for country keywords
                if (!val || normalizeCountry(val) === "all") {
                    for (const [key, prop] of Object.entries(props)) {
                        const p = prop as any;
                        const content = p.select?.name ||
                            p.multi_select?.map((m: any) => m.name).join(" ") ||
                            p.rich_text?.map((r: any) => r.plain_text).join(" ") ||
                            p.title?.map((t: any) => t.plain_text).join(" ") ||
                            "";

                        // If this property contains a valid country, use it
                        if (normalizeCountry(content) !== "all") {
                            val = content;
                            break;
                        }
                    }
                }

                // 4. Final fallback: Use title
                if (!val || normalizeCountry(val) === "all") {
                    val = pageTitle;
                }

                return val;
            };

            const rawCountry = getRawCountry(page.properties, title);

            return {
                id: page.id,
                title: title,
                excerpt: page.properties.Excerpt?.rich_text[0]?.plain_text || "",
                country: normalizeCountry(rawCountry),
                countryFlag: getCountryFlag(rawCountry),
                date: page.properties.Date?.date?.start || new Date().toISOString(),
                readTime: page.properties.ReadTime?.rich_text[0]?.plain_text || "5 min read",
                category: page.properties.Category?.select?.name || "Insight",
                tags: page.properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
                url: page.public_url || page.url || "#",
            };
        }).filter(Boolean) as Article[];

        return articles;
    } catch (error: any) {
        console.error("Notion API Error:", error);

        // Auto-discovery logic for Database ID
        if (error.message.includes("is a page, not a database")) {
            console.warn("Detected Page ID instead of Database ID. Searching for accessible databases...");
            try {
                const searchResponse = await fetch(`/notion-api/v1/search`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Notion-Version": "2022-06-28",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        filter: { property: "object", value: "database" }
                    }),
                });
                if (searchResponse.ok) {
                    const searchData = await searchResponse.json();
                    console.log("--- NOTION DATABASE DISCOVERY ---");
                    console.log("I found the following databases your integration can access:");
                    searchData.results.forEach((db: any) => {
                        console.log(`Name: ${db.title[0]?.plain_text || "Untitled"}, ID: ${db.id.replace(/-/g, "")}`);
                    });
                    console.log("Please copy the correct ID and update your .env file!");
                    console.log("---------------------------------");
                }
            } catch (searchErr) {
                console.error("Failed to auto-discover databases:", searchErr);
            }
        }

        if (error.name === "TypeError" && error.message.includes("fetch")) {
            console.error("CORS Error detected. Proxy might be misconfigured.");
        }
        return [];
    }
}

function normalizeCountry(country: string = ""): string {
    const c = country.toLowerCase();
    if (c.includes("新加坡") || c.includes("singapore")) return "singapore";
    if (c.includes("泰国") || c.includes("thailand")) return "thailand";
    if (c.includes("马来西亚") || c.includes("malaysia")) return "malaysia";
    if (c.includes("越南") || c.includes("vietnam")) return "vietnam";
    if (c.includes("印尼") || c.includes("indonesia") || c.includes("印度尼西亚")) return "indonesia";
    if (c.includes("菲律宾") || c.includes("philippines")) return "philippines";
    return "all";
}

function getCountryFlag(country: string = ""): string {
    const c = country.toLowerCase();
    if (c.includes("新加坡") || c.includes("singapore")) return "🇸🇬";
    if (c.includes("泰国") || c.includes("thailand")) return "🇹🇭";
    if (c.includes("马来西亚") || c.includes("malaysia")) return "🇲🇾";
    if (c.includes("越南") || c.includes("vietnam")) return "🇻🇳";
    if (c.includes("印尼") || c.includes("indonesia") || c.includes("印度尼西亚")) return "🇮🇩";
    if (c.includes("菲律宾") || c.includes("philippines")) return "🇵🇭";
    return "🌏";
}
