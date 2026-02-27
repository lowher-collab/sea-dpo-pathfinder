import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Globe, Users, ChevronDown, FileText } from "lucide-react";
import ChecklistDialog from "@/components/ChecklistDialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/i18n/translations";

export default function HeroSection() {
  const [checklistOpen, setChecklistOpen] = useState(false);
  const { lang } = useLanguage();
  const t = translations.hero;

  const stats = [
    { label: t.statCountries[lang], value: "6", icon: Globe },
    { label: t.statClients[lang], value: "50+", icon: Users },
    { label: t.statProjects[lang], value: "100+", icon: Shield },
  ];

  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="data-flow" />
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-klein/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-electric/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />

      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-secondary">
              <Shield className="w-4 h-4" />
              <span>{t.badge[lang]}</span>
            </div>

            <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.2] tracking-tight">
              <span className="block">{t.title1[lang]}</span>
              <span className="block text-gradient mt-2">{t.title2[lang]}</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              {t.subtitle[lang]}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" onClick={scrollToBooking}>
                <FileText className="w-5 h-5 mr-2" />
                {t.ctaPrimary[lang]}
              </Button>
              <Button variant="glass" size="xl" onClick={scrollToBooking}>
                {t.ctaSecondary[lang]}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
              {stats.map((stat, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center gap-2 text-secondary">
                    <stat.icon className="w-4 h-4" />
                    <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-fade-in-up-delay-2">
            <div className="glass-card p-8 space-y-6 glow-blue">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-klein to-cyan-electric/50 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold">{t.coverageTitle[lang]}</h3>
                  <p className="text-sm text-muted-foreground">{t.coverageSubtitle[lang]}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {t.regions[lang].map((region, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-full text-sm font-medium bg-klein/30 border border-secondary/20 text-secondary hover:bg-klein/50 hover:border-secondary/40 transition-all cursor-default"
                  >
                    {region}
                  </span>
                ))}
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

              <div className="space-y-4">
                <h4 className="font-medium text-muted-foreground">{t.industries[lang]}</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {t.industriesList[lang].map((industry, i) => (
                    <div key={i} className="flex items-center gap-2 text-foreground/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-coral" />
                      {industry}
                    </div>
                  ))}
                </div>
              </div>

              <Button variant="glass" className="w-full" onClick={scrollToBooking}>
                {t.serviceDetails[lang]}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-sm">{t.learnMore[lang]}</span>
          <ChevronDown className="w-5 h-5 scroll-indicator" />
        </div>
      </div>

      <ChecklistDialog open={checklistOpen} onOpenChange={setChecklistOpen} />
    </section>
  );
}
