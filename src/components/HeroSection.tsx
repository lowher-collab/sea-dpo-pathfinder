import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Globe, Users, ChevronDown, FileText } from "lucide-react";
import ChecklistDialog from "@/components/ChecklistDialog";

const stats = [
  { label: "已覆盖国家", value: "8+", icon: Globe },
  { label: "服务企业", value: "200+", icon: Users },
  { label: "合规项目", value: "500+", icon: Shield },
];

const regions = ["新加坡", "泰国", "马来西亚", "越南", "印尼", "菲律宾", "香港", "台湾"];

export default function HeroSection() {
  const [checklistOpen, setChecklistOpen] = useState(false);

  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="data-flow" />
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Floating Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-klein/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-electric/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />

      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-secondary">
              <Shield className="w-4 h-4" />
              <span>东南亚数据合规专家</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              链接东南亚专家资源，<br />
              <span className="text-gradient">为出海企业构建合规护城河</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              我们在新加坡总部统一调度，联动东南亚各国本地合规专家，为您提供高性价比的落地支持。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" onClick={() => setChecklistOpen(true)}>
                <FileText className="w-5 h-5 mr-2" />
                获取《合规落地清单 2026版》
              </Button>
              <Button variant="glass" size="xl" onClick={scrollToBooking}>
                预约合规诊断
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Stats */}
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

          {/* Right: Glass Card */}
          <div className="animate-fade-in-up-delay-2">
            <div className="glass-card p-8 space-y-6 glow-blue">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-klein to-cyan-electric/50 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold">服务覆盖区域</h3>
                  <p className="text-sm text-muted-foreground">东南亚全境覆盖</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {regions.map((region, index) => (
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
                <h4 className="font-medium text-muted-foreground">已服务行业</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {["跨境电商", "金融科技", "游戏出海", "SaaS 平台", "社交媒体", "医疗健康"].map((industry, i) => (
                    <div key={i} className="flex items-center gap-2 text-foreground/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-coral" />
                      {industry}
                    </div>
                  ))}
                </div>
              </div>

              <Button variant="glass" className="w-full" onClick={scrollToBooking}>
                了解服务详情
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-sm">了解更多</span>
          <ChevronDown className="w-5 h-5 scroll-indicator" />
        </div>
      </div>

      <ChecklistDialog open={checklistOpen} onOpenChange={setChecklistOpen} />
    </section>
  );
}
