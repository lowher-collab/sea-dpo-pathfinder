import { Button } from "@/components/ui/button";
import { MessageCircle, Award, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/i18n/translations";

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
const regionFlags: Record<string, string> = {
  "新加坡": "🇸🇬", "泰国": "🇹🇭", "马来西亚": "🇲🇾", "越南": "🇻🇳", "印度尼西亚": "🇮🇩", "菲律宾": "🇵🇭",
  "Singapore": "🇸🇬", "Thailand": "🇹🇭", "Malaysia": "🇲🇾", "Vietnam": "🇻🇳", "Indonesia": "🇮🇩", "Philippines": "🇵🇭",
};

export default function ExpertProfiles() {
  const { lang } = useLanguage();
  const t = translations.expert;
  const experts = t.experts[lang];

  const openSubscriptionForm = () => {
    window.open("https://tally.so/r/xXa25y", "_blank");
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
            return (
              <div
                key={expert.name}
                className="glass-card p-6 space-y-4 hover:border-secondary/30 transition-all duration-500 group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-border group-hover:border-secondary/50 transition-all duration-300 relative flex items-center justify-center bg-gradient-to-br from-muted/50 to-klein/10 group-hover:from-klein/20 group-hover:to-secondary/10">
                      <span className="text-4xl drop-shadow-sm select-none">
                        {regionFlags[expert.region]}
                      </span>
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
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">{expert.bio}</p>

                <div className="flex flex-wrap gap-2">
                  {expert.tags.map((tag, i) => (
                    <span key={i} className="expert-badge">{tag}</span>
                  ))}
                  <span className="expert-badge">
                    {experiences[lang][index]}
                  </span>
                </div>

                <div className="text-xs text-muted-foreground">
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
