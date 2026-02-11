import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CheckCircle, FileText, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/i18n/translations";

interface ChecklistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ChecklistDialog({ open, onOpenChange }: ChecklistDialogProps) {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { lang } = useLanguage();
  const t = translations.checklist;

  const countries = t.countries[lang];

  const toggleCountry = (name: string) => {
    setSelectedCountries((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  };

  const handleSubmit = () => {
    if (selectedCountries.length > 0 && email) {
      setSubmitted(true);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedCountries([]);
      setEmail("");
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="glass-card border-border/50 sm:max-w-md">
        {!submitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-xl font-bold flex items-center gap-2">
                <FileText className="w-5 h-5 text-secondary" />
                {t.title[lang]}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {t.description[lang]}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 pt-2">
              <div className="space-y-2">
                <Label className="text-sm font-medium">{t.selectLabel[lang]}</Label>
                <div className="grid grid-cols-2 gap-2">
                  {countries.map((country) => (
                    <button
                      key={country.name}
                      onClick={() => toggleCountry(country.name)}
                      className={`p-3 rounded-lg border text-sm font-medium transition-all text-left ${
                        selectedCountries.includes(country.name)
                          ? "border-secondary bg-secondary/10 text-secondary"
                          : "border-border/50 bg-muted/30 text-foreground hover:border-secondary/30"
                      }`}
                    >
                      <span className="mr-2">{country.flag}</span>
                      {country.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="checklist-email" className="text-sm font-medium">
                  {t.emailLabel[lang]}
                </Label>
                <Input
                  id="checklist-email"
                  type="email"
                  placeholder="work@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-muted/50 border-border/50 focus:border-secondary"
                />
              </div>

              <Button
                variant="cta"
                className="w-full"
                onClick={handleSubmit}
                disabled={selectedCountries.length === 0 || !email}
              >
                <Mail className="w-4 h-4 mr-2" />
                {t.submit[lang]}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                {t.privacy[lang]}
              </p>
            </div>
          </>
        ) : (
          <div className="text-center space-y-4 py-6">
            <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="font-display text-xl font-bold">{t.successTitle[lang]}</h3>
            <p className="text-sm text-muted-foreground">
              {t.successMsg[lang]}
              <br />
              <span className="text-foreground font-medium">{email}</span>
            </p>
            <p className="text-xs text-muted-foreground">
              {t.successCountries[lang]}{selectedCountries.join(lang === "zh" ? "、" : ", ")}
            </p>
            <Button variant="glass" onClick={handleClose}>
              {t.close[lang]}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
