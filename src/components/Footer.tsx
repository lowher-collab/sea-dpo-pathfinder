import { Shield, Mail, MapPin, Phone, Linkedin, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/i18n/translations";

export default function Footer() {
  const { lang } = useLanguage();
  const t = translations.footer;

  const coverageItems = [
    "🇸🇬", "🇹🇭", "🇲🇾", "🇻🇳", "🇮🇩", "🇵🇭",
  ];
  const coverageNames = {
    zh: ["新加坡", "泰国", "马来西亚", "越南", "印度尼西亚", "菲律宾"],
    en: ["Singapore", "Thailand", "Malaysia", "Vietnam", "Indonesia", "Philippines"],
  };

  return (
    <footer className="relative py-16 border-t border-border/30">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-card/50" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-klein to-cyan-electric/50 flex items-center justify-center">
                <Shield className="w-5 h-5 text-foreground" />
              </div>
              <span className="font-display text-xl font-bold">{t.brand[lang]}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{t.brandDesc[lang]}</p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg glass-card flex items-center justify-center hover:border-secondary/50 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg glass-card flex items-center justify-center hover:border-secondary/50 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-display font-semibold">{t.servicesTitle[lang]}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {t.services[lang].map((s, i) => (
                <li key={i} className="hover:text-foreground transition-colors cursor-pointer">{s}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-display font-semibold">{t.coverageTitle[lang]}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {coverageNames[lang].map((name, i) => (
                <li key={i} className="hover:text-foreground transition-colors cursor-pointer">
                  {coverageItems[i]} {name}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-display font-semibold">{t.contactTitle[lang]}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-secondary" />
                <span>{t.contactEmail[lang]}</span>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-secondary" />
                <span>{t.contactPhone[lang]}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                <span>{lang === "zh" ? "新加坡 · 曼谷 · 吉隆坡" : "Singapore · Bangkok · Kuala Lumpur"}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="section-divider mb-8" />

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>{t.copyright[lang]}</span>
              <a href="#" className="hover:text-foreground transition-colors">{t.privacyPolicy[lang]}</a>
              <a href="#" className="hover:text-foreground transition-colors">{t.terms[lang]}</a>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-3 h-3" />
              <span>{t.pdpaCompliant[lang]}</span>
            </div>
          </div>

          <p className="text-xs text-center text-muted-foreground/70 max-w-4xl mx-auto">
            {t.disclaimer[lang]}
          </p>
        </div>
      </div>
    </footer>
  );
}
