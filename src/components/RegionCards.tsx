import { useState } from "react";
import { FileText, CheckCircle, Building } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/i18n/translations";


interface RegionBase {
  key: string;
  flag: string;
  law: string;
  maxPenalty: { zh: string; en: string };
  riskLevel: "low" | "medium" | "high";
}

const regionsBase: RegionBase[] = [
  { key: "singapore", flag: "🇸🇬", law: "PDPA", maxPenalty: { zh: "740,000美元（或年度收入10%）", en: "USD 740,000 (or 10% annual revenue)" }, riskLevel: "medium" },
  { key: "indonesia", flag: "🇮🇩", law: "PDP Law", maxPenalty: { zh: "3,200,000美元（5年监禁）", en: "USD 3,200,000 (5 years imprisonment)" }, riskLevel: "high" },
  { key: "vietnam", flag: "🇻🇳", law: "Decree 13", maxPenalty: { zh: "115,000美元（或年度收入5%）", en: "USD 115,000 (or 5% annual revenue)" }, riskLevel: "high" },
  { key: "thailand", flag: "🇹🇭", law: "PDPA", maxPenalty: { zh: "1,500,000美元（或年度收入5%）", en: "USD 1,500,000 (or 5% annual revenue)" }, riskLevel: "medium" },
  { key: "philippines", flag: "🇵🇭", law: "DPA 2012", maxPenalty: { zh: "90,000美元（7年监禁）", en: "USD 90,000 (7 years imprisonment)" }, riskLevel: "medium" },
  { key: "malaysia", flag: "🇲🇾", law: "PDPA 2010", maxPenalty: { zh: "300,000美元（3年监禁）", en: "USD 300,000 (3 years imprisonment)" }, riskLevel: "medium" },
];

export default function RegionCards() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const { lang } = useLanguage();
  const t = translations.region;

  const riskLabels = { low: t.riskLow[lang], medium: t.riskMedium[lang], high: t.riskHigh[lang] };
  const riskColors = {
    low: "text-green-400 bg-green-400/10 border-green-400/30",
    medium: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
    high: "text-coral bg-coral/10 border-coral/30",
  };

  return (
    <section id="compliance" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in-up">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-secondary">
            <FileText className="w-4 h-4" />
            {t.badge[lang]}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold">{t.title[lang]}</h2>
          <p className="text-muted-foreground text-lg">{t.subtitle[lang]}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regionsBase.map((region, index) => {
            const countryData = t.countries[lang][region.key as keyof typeof t.countries.zh];
            return (
              <div
                key={region.key}
                className={`glass-card region-card p-6 space-y-4 cursor-pointer animate-fade-in-up ${activeRegion === region.key ? "border-secondary/50 shadow-glow-cyan" : ""}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setActiveRegion(region.key)}
                onMouseLeave={() => setActiveRegion(null)}
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-display text-xl font-semibold">
                    <span className="mr-2">{region.flag}</span>
                    {countryData.name}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${riskColors[region.riskLevel]}`}>
                    {riskLabels[region.riskLevel]}
                  </span>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-klein/30 border border-secondary/20">
                  <Building className="w-4 h-4 text-secondary" />
                  <span className="text-sm font-medium">{region.law}</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{t.maxPenalty[lang]}</span>
                    <p className="text-sm font-semibold text-coral">{region.maxPenalty[lang]}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{t.coreWarning[lang]}</span>
                    <p className={`text-sm font-medium text-right ${region.riskLevel === "high" ? "text-coral" : "text-yellow-400"}`}>
                      {countryData.coreWarning}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{t.dpoLabel[lang]}</span>
                    <span className={countryData.dpoRequired === "强制要求" || countryData.dpoRequired === "Mandatory" ? "text-coral font-medium" : "text-foreground"}>
                      {countryData.dpoRequired}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{t.dataLocal[lang]}</span>
                    <span className={countryData.dataLocalization.includes("强制") || countryData.dataLocalization.includes("Mandatory") ? "text-coral font-medium" : "text-foreground"}>
                      {countryData.dataLocalization}
                    </span>
                  </div>
                </div>

                <div className="h-px bg-border/50" />

                <div className="space-y-2">
                  {countryData.keyPoints.map((point, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
