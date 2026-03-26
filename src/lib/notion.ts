import { Article, articles as localArticles } from "@/data/insights";

export async function fetchInsights(): Promise<Article[]> {
    const token = import.meta.env.VITE_NOTION_TOKEN;
    const databaseId = import.meta.env.VITE_NOTION_DATABASE_ID;

    // 首先添加本地指南
    let allArticles: Article[] = [...localArticles];

    if (!token || !databaseId) {
        console.log("Notion credentials missing. Using only local articles.");
        return allArticles;
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
            console.warn(`Notion API Error: ${response.status}. Using local articles only.`);
            return allArticles;
        }

        const data = await response.json();

        const notionArticles = data.results
            .map((page: any) => {
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

                            const match = Object.keys(countryMap).find((country) =>
                                content.toLowerCase().includes(country.toLowerCase())
                            );

                            if (match) {
                                val = match;
                                break;
                            }
                        }
                    }

                    return val;
                };

                const countryMap = {
                    singapore: "singapore",
                    thailand: "thailand",
                    malaysia: "malaysia",
                    vietnam: "vietnam",
                    indonesia: "indonesia",
                    philippines: "philippines",
                };

                const normalizeCountry = (country: string): string => {
                    const lower = country.toLowerCase();
                    if (lower === "all" || lower === "") return "all";
                    for (const [key, value] of Object.entries(countryMap)) {
                        if (lower.includes(key)) return value;
                    }
                    return "all";
                };

                const country = normalizeCountry(getRawCountry(page.properties, title));

                const countryFlagMap: Record<string, string> = {
                    singapore: "🇸🇬",
                    thailand: "🇹🇭",
                    malaysia: "🇲🇾",
                    vietnam: "🇻🇳",
                    indonesia: "🇮🇩",
                    philippines: "🇵🇭",
                    all: "🌏",
                };

                // Find excerpt
                const descriptionProp = page.properties.Description || page.properties.Summary;
                const excerpt = descriptionProp?.rich_text?.[0]?.plain_text || "No description";

                // Find date
                const dateProp = page.properties.Date;
                const dateValue = dateProp?.date?.start || new Date().toISOString().split("T")[0];

                // Find URL
                const urlProp = page.properties.URL;
                const url = urlProp?.url || "#";

                // Tags
                const tagsProp = page.properties.Tags;
                const tags = tagsProp?.multi_select?.map((tag: any) => tag.name) || [];

                return {
                    id: page.id,
                    title,
                    excerpt,
                    country,
                    countryFlag: countryFlagMap[country] || "🌏",
                    date: dateValue,
                    readTime: "5 min",
                    category: "Article",
                    tags,
                    url,
                };
            })
            .filter((article: Article | null) => article !== null);

        // Combine local articles with Notion articles
        allArticles = [...localArticles, ...notionArticles];

        return allArticles;
    } catch (error) {
        console.error("Error fetching from Notion:", error);
        // Return local articles as fallback
        return allArticles;
    }
}
