import { Calendar, Clock, Tag } from "lucide-react";
import type { Article } from "@/data/insights";

interface InsightCardProps {
    article: Article;
    index: number;
}

export default function InsightCard({ article, index }: InsightCardProps) {
    return (
        <div
            className="glass-card region-card p-6 space-y-4 cursor-pointer animate-fade-in-up hover:scale-105 transition-all duration-300"
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            {/* Country Badge */}
            <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-klein/30 border border-secondary/20 text-sm font-medium">
                    <span>{article.countryFlag}</span>
                    <span>{article.country}</span>
                </span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-coral/10 text-coral border border-coral/20">
                    {article.category}
                </span>
            </div>

            {/* Title */}
            <h3 className="font-display text-xl font-semibold text-foreground hover:text-secondary transition-colors line-clamp-2">
                {article.title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm text-muted-foreground line-clamp-3">
                {article.excerpt}
            </p>

            {/* Divider */}
            <div className="h-px bg-border/50" />

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(article.date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.readTime}</span>
                </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, i) => (
                    <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-secondary/10 text-secondary/80 border border-secondary/20"
                    >
                        <Tag className="w-3 h-3" />
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}
