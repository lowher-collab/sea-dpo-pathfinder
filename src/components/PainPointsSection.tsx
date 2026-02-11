import { AlertTriangle, ArrowRight, Shield, Globe, RefreshCw, Languages, DollarSign } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/i18n/translations";

const icons = [Globe, RefreshCw, Languages, DollarSign];

export default function PainPointsSection() {
  const { lang } = useLanguage();
  const t = translations.pain;
  const points = t.points[lang];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center space-y-3 mb-16">
          <span className="text-sm text-secondary font-medium tracking-widest">
            {t.badge[lang]}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            {t.title[lang]}
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-center max-w-5xl mx-auto">
          <div className="space-y-4">
            {points.map((point, i) => {
              const Icon = icons[i];
              return (
                <div
                  key={i}
                  className="glass-card p-4 flex items-center gap-4 group hover:border-destructive/30 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-destructive/15 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-destructive" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-foreground">{point.label}</p>
                    <p className="text-sm text-muted-foreground">{point.desc}</p>
                  </div>
                  <AlertTriangle className="w-4 h-4 text-destructive/50 ml-auto shrink-0" />
                </div>
              );
            })}
          </div>

          <div className="flex lg:flex-col items-center justify-center gap-3 py-4">
            <div className="hidden lg:block w-px h-12 bg-gradient-to-b from-destructive/50 to-secondary/50" />
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center shadow-[0_0_30px_hsl(16_100%_50%/0.3)]">
              <ArrowRight className="w-6 h-6 text-accent-foreground" />
            </div>
            <div className="hidden lg:block w-px h-12 bg-gradient-to-b from-secondary/50 to-secondary/20" />
          </div>

          <div className="glass-card p-8 glow-blue space-y-6 border-secondary/30">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-klein to-cyan-electric/50 flex items-center justify-center">
                <Shield className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold">{t.solutionName[lang]}</h3>
                <p className="text-sm text-secondary">{t.solutionDesc[lang]}</p>
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <ul className="space-y-3">
              {t.solutionPoints[lang].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/90">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="pt-2 px-4 py-3 rounded-lg bg-secondary/10 border border-secondary/20 text-center">
              <p className="text-sm font-medium text-secondary">
                {t.solutionCta[lang]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
