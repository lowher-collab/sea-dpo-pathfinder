import { Check, Star, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/i18n/translations";

export default function PricingSection() {
  const { lang } = useLanguage();
  const t = translations.pricing;
  const tiers = t.tiers[lang];

  return (
    <section id="pricing" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-klein/10 rounded-full blur-3xl" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in-up">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-secondary">
            <Zap className="w-4 h-4" />
            {t.badge[lang]}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold">{t.title[lang]}</h2>
          <p className="text-muted-foreground text-lg">{t.subtitle[lang]}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, index) => {
            const isHighlighted = index === 1;
            return (
              <div
                key={tier.name}
                className={`glass-card p-8 flex flex-col animate-fade-in-up ${isHighlighted ? "pricing-recommended scale-105" : ""}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-secondary text-background text-sm font-semibold shadow-glow-cyan">
                      <Star className="w-3 h-3" />
                      {tier.badge}
                    </span>
                  </div>
                )}

                <div className="space-y-2 pb-6 border-b border-border/50">
                  <h3 className="font-display text-2xl font-bold">{tier.name}</h3>
                  <div className="pt-2">
                    <span className={`text-3xl font-bold ${isHighlighted ? "text-secondary" : "text-foreground"}`}>
                      {tier.price}
                    </span>
                    <span className="text-muted-foreground ml-2">/ {tier.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground pt-2">{tier.description}</p>
                </div>

                <div className="flex-1 py-6 space-y-4">
                  {tier.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 bg-secondary/20 text-secondary">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-sm text-foreground/80">{feature}</span>
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
