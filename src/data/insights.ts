export interface Article {
    id: string;
    title: string;
    excerpt: string;
    country: string;
    countryFlag: string;
    date: string;
    readTime: string;
    category: string;
    tags: string[];
    url: string;
}

// 指南和文章数据
export const articles: Article[] = [
    {
        id: "indonesia-pdp-law-guide",
        title: "Indonesia Personal Data Protection Law - Business Guide",
        excerpt: "A comprehensive business compliance guide for companies operating in Indonesia. Learn about legal requirements, compliance checklist, common mistakes, and penalties.",
        country: "indonesia",
        countryFlag: "🇮🇩",
        date: "2024-03-26",
        readTime: "15 min",
        category: "Compliance Guide",
        tags: ["Indonesia", "Data Protection", "Compliance", "PDP Law", "Business Guide"],
        url: "https://raw.githubusercontent.com/lowher-collab/sea-dpo-pathfinder/main/guides/indonesia-pdp-law.html"
    }
];

export const countries = [
    { name: "全部", value: "all", flag: "🌏" },
    { name: "新加坡", value: "singapore", flag: "🇸🇬" },
    { name: "泰国", value: "thailand", flag: "🇹🇭" },
    { name: "马来西亚", value: "malaysia", flag: "🇲🇾" },
    { name: "越南", value: "vietnam", flag: "🇻🇳" },
    { name: "印尼", value: "indonesia", flag: "🇮🇩" },
    { name: "菲律宾", value: "philippines", flag: "🇵🇭" }
];
