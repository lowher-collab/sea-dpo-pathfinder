import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock, Globe, Building2, CheckCircle, ArrowRight } from "lucide-react";

const regions = [
  "新加坡",
  "泰国",
  "马来西亚",
  "越南",
  "印度尼西亚",
  "菲律宾",
  "多地区/不确定",
];

const budgetRanges = [
  "5,000 美元以下",
  "5,000 - 20,000 美元",
  "20,000 - 50,000 美元",
  "50,000 美元以上",
  "待定/需咨询",
];

const timeSlots = [
  "09:00 - 09:30",
  "10:00 - 10:30",
  "11:00 - 11:30",
  "14:00 - 14:30",
  "15:00 - 15:30",
  "16:00 - 16:30",
];

export default function BookingSection() {
  const [step, setStep] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    region: "",
    budget: "",
    email: "",
    name: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    setStep(3);
  };

  return (
    <section id="booking" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-coral/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-klein/20 rounded-full blur-3xl" />

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4 animate-fade-in-up">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-coral">
            <Calendar className="w-4 h-4" />
            预约咨询
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            预约 30 分钟合规诊断
          </h2>
          <p className="text-muted-foreground text-lg">
            与资深 DPO 专家一对一沟通，获取定制化合规建议
          </p>
        </div>

        {/* Booking Card */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 md:p-12 glow-blue animate-fade-in-up">
            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-4 mb-10">
              {[
                { num: 1, label: "企业信息" },
                { num: 2, label: "选择时间" },
                { num: 3, label: "确认" },
              ].map((s) => (
                <div key={s.num} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                      step >= s.num
                        ? "bg-coral text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step > s.num ? <CheckCircle className="w-4 h-4" /> : s.num}
                  </div>
                  {s.num < 3 && (
                    <div
                      className={`w-12 h-0.5 ${
                        step > s.num ? "bg-coral" : "bg-border"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Company Info */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in-up">
                <h3 className="font-display text-xl font-semibold text-center mb-8">
                  填写企业信息
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">企业名称</Label>
                    <Input
                      id="companyName"
                      placeholder="您的公司名称"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange("companyName", e.target.value)}
                      className="bg-muted/50 border-border/50 focus:border-secondary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">企业官网</Label>
                    <Input
                      id="website"
                      placeholder="https://"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      className="bg-muted/50 border-border/50 focus:border-secondary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>出海目的地</Label>
                    <Select
                      value={formData.region}
                      onValueChange={(value) => handleInputChange("region", value)}
                    >
                      <SelectTrigger className="bg-muted/50 border-border/50">
                        <SelectValue placeholder="选择地区" />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map((region) => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>合规预算范围</Label>
                    <Select
                      value={formData.budget}
                      onValueChange={(value) => handleInputChange("budget", value)}
                    >
                      <SelectTrigger className="bg-muted/50 border-border/50">
                        <SelectValue placeholder="选择预算" />
                      </SelectTrigger>
                      <SelectContent>
                        {budgetRanges.map((range) => (
                          <SelectItem key={range} value={range}>
                            {range}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button
                  variant="cta"
                  size="xl"
                  className="w-full mt-6"
                  onClick={() => setStep(2)}
                >
                  下一步：选择时间
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            )}

            {/* Step 2: Time Selection */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in-up">
                <h3 className="font-display text-xl font-semibold text-center mb-8">
                  选择咨询时间
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">您的姓名</Label>
                    <Input
                      id="name"
                      placeholder="如何称呼您"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="bg-muted/50 border-border/50 focus:border-secondary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">电子邮箱</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="work@company.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-muted/50 border-border/50 focus:border-secondary"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-secondary" />
                    可选时段（北京时间）
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                          selectedSlot === slot
                            ? "border-coral bg-coral/20 text-coral"
                            : "border-border/50 bg-muted/30 text-foreground hover:border-secondary/50"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <Button variant="glass" size="lg" className="flex-1" onClick={() => setStep(1)}>
                    返回
                  </Button>
                  <Button
                    variant="cta"
                    size="lg"
                    className="flex-1"
                    onClick={handleSubmit}
                    disabled={!selectedSlot || !formData.email || !formData.name}
                  >
                    确认预约
                    <CheckCircle className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <div className="text-center space-y-6 animate-fade-in-up py-8">
                <div className="w-20 h-20 rounded-full bg-coral/20 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10 text-coral" />
                </div>
                <h3 className="font-display text-2xl font-bold">预约成功！</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  我们已向 <span className="text-foreground">{formData.email}</span> 发送确认邮件，
                  内含"咨询准备清单"，请提前查阅。
                </p>
                <div className="glass-card inline-flex items-center gap-3 px-6 py-3">
                  <Calendar className="w-5 h-5 text-secondary" />
                  <span className="font-medium">{selectedSlot}</span>
                  <span className="text-muted-foreground">· 北京时间</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  如需更改时间，请联系 <span className="text-secondary">support@chuhaidpo.com</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
