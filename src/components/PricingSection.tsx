import { Button } from "@/components/ui/button";
import { Check, Star, ArrowRight, Zap } from "lucide-react";

interface PricingTier {
  name: string;
  nameEn: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

const tiers: PricingTier[] = [
  {
    name: "基础包",
    nameEn: "Foundation",
    price: "咨询定价",
    period: "年度服务",
    description: "",
    features: [
      "DPO 委任服务",
      "一小时咨询 / 月",
    ],
    badge: "入门",
  },
  {
    name: "核心包",
    nameEn: "Professional",
    price: "咨询定价",
    period: "年度服务",
    description: "深度治理方案，建立完整数据保护体系",
    features: [
      "基础包全部内容",
      "隐私政策定制",
      "Cookie 政策模板",
      "数据资产盘点",
      "流程制度模版",
    ],
    highlighted: true,
    badge: "推荐",
  },
  {
    name: "旗舰包",
    nameEn: "Enterprise",
    price: "咨询定价",
    period: "年度服务",
    description: "全方位合规托管，适合多地区业务扩张",
    features: [
      "核心包全部内容",
      "数据保护影响评估 (DPIA)",
      "跨境数据传输方案",
      "员工隐私培训",
      "年度合规审计报告",
      "专属合规经理对接",
    ],
    badge: "旗舰",
  },
];

export default function PricingSection() {
  const openSubscriptionForm = () => {
    window.open("https://tally.so/r/1A7MoQ", "_blank");
  };

  return (
    <section id="pricing" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-klein/10 rounded-full blur-3xl" />

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in-up">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-secondary">
            <Zap className="w-4 h-4" />
            标准化服务套餐
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            服务方案与报价
          </h2>
          <p className="text-muted-foreground text-lg">
            透明定价，按需选择。所有套餐均可根据业务规模与目标地区定制
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <div
              key={tier.nameEn}
              className={`glass-card p-8 flex flex-col animate-fade-in-up ${tier.highlighted ? "pricing-recommended scale-105" : ""
                }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Badge */}
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-secondary text-background text-sm font-semibold shadow-glow-cyan">
                    <Star className="w-3 h-3" />
                    {tier.badge}
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="space-y-2 pb-6 border-b border-border/50">
                <h3 className="font-display text-2xl font-bold">{tier.name}</h3>
                <div className="pt-2">
                  <span className={`text-3xl font-bold ${tier.highlighted ? "text-secondary" : "text-foreground"}`}>
                    {tier.price}
                  </span>
                  <span className="text-muted-foreground ml-2">/ {tier.period}</span>
                </div>
                <p className="text-sm text-muted-foreground pt-2">{tier.description}</p>
              </div>

              {/* Features */}
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
          ))}
        </div>


      </div>
    </section>
  );
}
