import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Award, Briefcase, Shield, Lock, FileCheck, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/i18n/translations";

const backgroundIcons = { legal: Shield, infosec: Lock, certification: FileCheck };
const backgrounds = ["certification", "legal", "legal", "infosec", "infosec", "certification"] as const;
const certifications = [
  ["CIPP/A", "CIPM"],
  ["Thai Bar", "PDPA Cert"],
  ["Malaysian Bar", "CIPP/A"],
  ["Vietnam Bar", "DPO Cert"],
  ["CISSP", "CIPP/A"],
  ["CPA", "DPO Cert", "ISO 27001 LA"],
];
const experiences = {
  zh: ["8年+", "10年+", "12年+", "9年+", "11年+", "7年+"],
  en: ["8 yrs+", "10 yrs+", "12 yrs+", "9 yrs+", "11 yrs+", "7 yrs+"],
};
const photos = [
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=300&h=300&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&h=300&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=300&fit=crop&crop=face",
];

const regionFlags: Record<string, string> = {
  "新加坡": "🇸🇬", "泰国": "🇹🇭", "马来西亚": "🇲🇾", "越南": "🇻🇳", "印度尼西亚": "🇮🇩", "菲律宾": "🇵🇭",
  "Singapore": "🇸🇬", "Thailand": "🇹🇭", "Malaysia": "🇲🇾", "Vietnam": "🇻🇳", "Indonesia": "🇮🇩", "Philippines": "🇵🇭",
};

export default function ExpertProfiles() {
  const { lang } = useLanguage();
  const t = translations.expert;
  const experts = t.experts[lang];
  const bgLabels = { legal: t.bgLegal[lang], infosec: t.bgInfosec[lang], certification: t.bgCert[lang] };

  const openSubscriptionForm = () => {
    window.open("https://tally.so/r/1A7MoQ", "_blank");
  };

  return (
    <section id="experts" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-klein/5 to-background" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in-up">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-secondary">
            <Award className="w-4 h-4" />
            {t.badge[lang]}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold">{t.title[lang]}</h2>
          <p className="text-muted-foreground text-lg">{t.subtitle[lang]}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experts.map((expert, index) => {
            const bg = backgrounds[index];
            const BgIcon = backgroundIcons[bg];
            return (
              <div
                key={expert.name}
                className="glass-card p-6 space-y-4 hover:border-secondary/30 transition-all duration-500 group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-border group-hover:border-secondary/50 transition-colors">
                      <img src={photos[index]} alt={expert.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-lg font-semibold">{expert.name}</h4>
                    <p className="text-sm text-secondary mt-1">{expert.title}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-klein/30 border border-secondary/20 text-secondary">
                    {regionFlags[expert.region]} {expert.region}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-muted/50 border border-border text-muted-foreground">
                    <BgIcon className="w-3 h-3" />
                    {bgLabels[bg]}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">{expert.bio}</p>

                <div className="flex flex-wrap gap-2">
                  {expert.tags.map((tag, i) => (
                    <span key={i} className="expert-badge">{tag}</span>
                  ))}
                  <span className="expert-badge">
                    <Briefcase className="w-3 h-3 mr-1" />
                    {experiences[lang][index]}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Award className="w-3 h-3" />
                  <span>{certifications[index].join(" · ")}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center animate-fade-in-up">
          <Button variant="glass" size="xl" onClick={openSubscriptionForm}>
            <MessageCircle className="w-5 h-5 mr-2" />
            {t.ctaButton[lang]}
          </Button>
        </div>
      </div>
    </section>
  );
}
