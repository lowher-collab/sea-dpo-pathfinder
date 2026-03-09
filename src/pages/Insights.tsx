import { useState } from "react";
import { Newspaper, Filter, Loader2 } from "lucide-react";
import { fetchInsights } from "@/lib/notion";
import InsightCard from "@/components/InsightCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/i18n/translations";
import { useQuery } from "@tanstack/react-query";

export default function Insights() {
  const [selectedCountry, setSelectedCountry] = useState("all");
  const { lang } = useLanguage();
  const t = translations.insights;

  const { data: articles = [], isLoading, error } = useQuery({
    queryKey: ["insights"],
    queryFn: fetchInsights,
  });

  const countryFilters = [
    { name: t.filterAll[lang], value: "all", flag: "🌏" },
    ...t.filterCountries[lang].map((name, i) => ({
      name,
      value: ["singapore", "thailand", "malaysia", "vietnam", "indonesia", "philippines"][i],
      flag: ["🇸🇬", "🇹🇭", "🇲🇾", "🇻🇳", "🇮🇩", "🇵🇭"][i],
    })),
  ];

  const filteredArticles = selectedCountry === "all"
    ? articles
    : articles.filter(article => article.country === selectedCountry);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-klein/10 to-background" />
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-klein/10 rounded-full blur-3xl" />

          <div className="container relative z-10 mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in-up">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-secondary">
                <Newspaper className="w-4 h-4" />
                {t.badge[lang]}
              </span>
              <h1 className="font-display text-4xl md:text-5xl font-bold">{t.title[lang]}</h1>
              <p className="text-muted-foreground text-lg">{t.subtitle[lang]}</p>
            </div>

            <div className="flex items-center justify-center mb-12 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <div className="inline-flex items-center gap-2 glass-card p-2 rounded-2xl">
                <Filter className="w-4 h-4 text-muted-foreground ml-2" />
                <div className="flex gap-2">
                  {countryFilters.map((country) => (
                    <button
                      key={country.value}
                      onClick={() => setSelectedCountry(country.value)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${selectedCountry === country.value
                        ? "bg-secondary text-background shadow-glow-cyan"
                        : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                        }`}
                    >
                      <span className="mr-1.5">{country.flag}</span>
                      {country.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <p className="text-sm text-muted-foreground">
                {t.articleCount[lang]} <span className="text-secondary font-semibold">{filteredArticles.length}</span> {t.articleUnit[lang]}
              </p>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-32 space-y-4">
                <Loader2 className="w-12 h-12 text-secondary animate-spin" />
                <p className="text-muted-foreground">正在从 Notion 加载内容...</p>
              </div>
            ) : error ? (
              <div className="text-center py-32">
                <p className="text-coral">加载内容失败，请检查 API 配置。</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article, index) => (
                  <InsightCard key={article.id} article={article} index={index} />
                ))}
              </div>
            )}

            {!isLoading && filteredArticles.length === 0 && (
              <div className="text-center py-32 animate-fade-in-up">
                <div className="max-w-2xl mx-auto glass-card p-12 space-y-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-klein to-cyan-electric/30 flex items-center justify-center mx-auto">
                    <Newspaper className="w-12 h-12 text-secondary" />
                  </div>
                  <h3 className="font-display text-3xl font-bold text-foreground">{t.emptyTitle[lang]}</h3>
                  <p className="text-muted-foreground text-lg">{t.emptyDesc[lang]}</p>
                  <div className="pt-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-klein/20 text-sm text-secondary">
                      <span className="inline-block w-2 h-2 rounded-full bg-secondary animate-pulse" />
                      {t.emptyNote[lang]}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
