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

// 文章数据 - 待补充
export const articles: Article[] = [];

export const countries = [
    { name: "全部", value: "all", flag: "🌏" },
    { name: "新加坡", value: "新加坡", flag: "🇸🇬" },
    { name: "泰国", value: "泰国", flag: "🇹🇭" },
    { name: "马来西亚", value: "马来西亚", flag: "🇲🇾" },
    { name: "越南", value: "越南", flag: "🇻🇳" },
    { name: "印尼", value: "印尼", flag: "🇮🇩" },
    { name: "菲律宾", value: "菲律宾", flag: "🇵🇭" }
];
