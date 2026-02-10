import { Shield, Award } from "lucide-react";

export default function OathSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-klein/10 to-background" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-klein/15 rounded-full blur-3xl" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in-up">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-klein to-cyan-electric/50 flex items-center justify-center shadow-[0_0_60px_hsl(224_100%_50%/0.3)]">
              <Shield className="w-10 h-10 text-foreground" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-secondary">
              <Award className="w-4 h-4" />
              职业誓言
            </span>
          </div>

          {/* Oath Text */}
          <blockquote className="glass-card p-8 md:p-12 glow-blue border-secondary/20">
            <p className="font-display text-xl md:text-2xl font-semibold leading-relaxed text-foreground/90">
              "作为数据保护官，我们承诺以最高的职业道德标准，保护每一位数据主体的合法权益，确保企业合规运营。"
            </p>
            <footer className="mt-6 flex items-center justify-center gap-2">
              <div className="w-8 h-px bg-secondary/50" />
              <span className="text-sm font-medium text-secondary">出海DPO 全体顾问</span>
              <div className="w-8 h-px bg-secondary/50" />
            </footer>
          </blockquote>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-secondary" />
              国际认证持证团队
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-secondary" />
              严格保密协议
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-secondary" />
              独立第三方立场
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
