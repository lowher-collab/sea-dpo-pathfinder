import { AlertTriangle, ArrowRight, Shield, Globe, RefreshCw, Languages, DollarSign } from "lucide-react";

const painPoints = [
  { icon: Globe, label: "各国法律差异大", desc: "6国法规各不相同" },
  { icon: RefreshCw, label: "法规更新快", desc: "政策频繁修订" },
  { icon: Languages, label: "多语言障碍", desc: "本地语言文件要求" },
  { icon: DollarSign, label: "成本不可控", desc: "多国合规费用叠加" },
];

export default function PainPointsSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <span className="text-sm text-secondary font-medium tracking-widest">
            为什么选择出海DPO
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            出海合规，为什么这么难？
          </h2>
        </div>

        {/* Diagram: Pain Points → Solution */}
        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-center max-w-5xl mx-auto">
          {/* Left: Pain Points */}
          <div className="space-y-4">
            {painPoints.map((point, i) => (
              <div
                key={i}
                className="glass-card p-4 flex items-center gap-4 group hover:border-destructive/30 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-destructive/15 flex items-center justify-center shrink-0">
                  <point.icon className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground">{point.label}</p>
                  <p className="text-sm text-muted-foreground">{point.desc}</p>
                </div>
                <AlertTriangle className="w-4 h-4 text-destructive/50 ml-auto shrink-0" />
              </div>
            ))}
          </div>

          {/* Center: Arrow */}
          <div className="flex lg:flex-col items-center justify-center gap-3 py-4">
            <div className="hidden lg:block w-px h-12 bg-gradient-to-b from-destructive/50 to-secondary/50" />
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center shadow-[0_0_30px_hsl(16_100%_50%/0.3)]">
              <ArrowRight className="w-6 h-6 text-accent-foreground" />
            </div>
            <div className="hidden lg:block w-px h-12 bg-gradient-to-b from-secondary/50 to-secondary/20" />
          </div>

          {/* Right: Solution */}
          <div className="glass-card p-8 glow-blue space-y-6 border-secondary/30">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-klein to-cyan-electric/50 flex items-center justify-center">
                <Shield className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold">出海DPO</h3>
                <p className="text-sm text-secondary">一站式解决方案</p>
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <ul className="space-y-3">
              {[
                "一个团队覆盖 6 国法规",
                "实时追踪法规变动",
                "本地语言专家对接",
                "固定年费，成本透明",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/90">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="pt-2 px-4 py-3 rounded-lg bg-secondary/10 border border-secondary/20 text-center">
              <p className="text-sm font-medium text-secondary">
                从「逐国拼凑」到「统一托管」
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
