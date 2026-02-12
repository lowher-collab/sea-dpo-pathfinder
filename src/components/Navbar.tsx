import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Shield, Menu, X, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/i18n/translations";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, toggleLang } = useLanguage();
  const t = translations.nav;

  const navItems = [
    { label: t.compliance[lang], href: "/#compliance" },
    { label: t.experts[lang], href: "/#experts" },
    { label: t.pricing[lang], href: "/#pricing" },
    { label: t.insights[lang], href: "/insights" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openSubscriptionForm = () => {
    window.open("https://tally.so/r/xXa25y", "_blank");
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
        : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-klein to-cyan-electric/50 flex items-center justify-center group-hover:shadow-glow-cyan transition-shadow">
              <Shield className="w-5 h-5 text-foreground" />
            </div>
            <span className="font-display text-lg font-bold text-foreground">{t.brand[lang]}</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300" />
              </a>
            ))}

            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Globe className="w-4 h-4" />
              {lang === "zh" ? "EN" : "中文"}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in-up">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => { toggleLang(); setIsMobileMenuOpen(false); }}
                className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                <Globe className="w-4 h-4" />
                {lang === "zh" ? "Switch to English" : "切换到中文"}
              </button>
              <Button variant="glass" size="sm" className="mt-2" onClick={openSubscriptionForm}>
                {t.subscribe[lang]}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
