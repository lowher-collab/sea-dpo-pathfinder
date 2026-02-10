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

const countries = [
  { name: "新加坡", flag: "🇸🇬" },
  { name: "泰国", flag: "🇹🇭" },
  { name: "马来西亚", flag: "🇲🇾" },
  { name: "越南", flag: "🇻🇳" },
  { name: "印度尼西亚", flag: "🇮🇩" },
  { name: "菲律宾", flag: "🇵🇭" },
];

interface ChecklistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ChecklistDialog({ open, onOpenChange }: ChecklistDialogProps) {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
    // Reset after close animation
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
                获取合规落地清单
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                选择您的目标国家，我们将发送对应的《东南亚合规落地清单 2026版》至您的邮箱
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 pt-2">
              <div className="space-y-2">
                <Label className="text-sm font-medium">选择目标国家（可多选）</Label>
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
                  工作邮箱
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
                免费获取清单
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                我们尊重您的隐私，不会向第三方共享您的信息
              </p>
            </div>
          </>
        ) : (
          <div className="text-center space-y-4 py-6">
            <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="font-display text-xl font-bold">发送成功！</h3>
            <p className="text-sm text-muted-foreground">
              《东南亚合规落地清单 2026版》已发送至
              <br />
              <span className="text-foreground font-medium">{email}</span>
            </p>
            <p className="text-xs text-muted-foreground">
              涵盖国家：{selectedCountries.join("、")}
            </p>
            <Button variant="glass" onClick={handleClose}>
              关闭
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
