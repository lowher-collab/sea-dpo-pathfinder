import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/i18n/translations";

export default function OathSection() {
  const { lang } = useLanguage();
  const t = translations.oath;

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-klein/10 to-background" />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-klein/15 rounded-full blur-3xl" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in-up">
          <blockquote className="glass-card p-8 md:p-12 glow-blue border-secondary/20">
            <p className="font-display text-xl md:text-2xl font-semibold leading-relaxed text-foreground/90">
              "{t.quote[lang]}"
            </p>
            <footer className="mt-6 flex items-center justify-center gap-2">
              <div className="w-8 h-px bg-secondary/50" />
              <span className="text-sm font-medium text-secondary">{t.brand[lang]}</span>
              <div className="w-8 h-px bg-secondary/50" />
            </footer>
          </blockquote>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            {t.trust[lang].map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
