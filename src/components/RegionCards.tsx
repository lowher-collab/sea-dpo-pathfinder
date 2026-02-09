import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, AlertTriangle, CheckCircle, Building, Download } from "lucide-react";

interface RegionData {
  name: string;
  nameEn: string;
  law: string;
  maxPenalty: string;
  dpoRequired: string;
  dataLocalization: string;
  keyPoints: string[];
  riskLevel: "low" | "medium" | "high";
}

const regionFlags: Record<string, string> = {
  "新加坡": "🇸🇬",
  "泰国": "🇹🇭",
  "马来西亚": "🇲🇾",
  "越南": "🇻🇳",
  "印度尼西亚": "🇮🇩",
  "菲律宾": "🇵🇭",
};

const regions: RegionData[] = [
  {
    name: "新加坡",
    nameEn: "Singapore",
    law: "PDPA",
    maxPenalty: "Up to $740,000+（或年收入10%）",
    dpoRequired: "强制要求",
    dataLocalization: "无强制要求",
    keyPoints: ["72小时违规通报", "监管极其成熟", "同意义务严格"],
    riskLevel: "medium",
  },
  {
    name: "泰国",
    nameEn: "Thailand",
    law: "PDPA",
    maxPenalty: "Up to $150,000+（刑事罚金另计）",
    dpoRequired: "特定情况要求",
    dataLocalization: "无强制要求",
    keyPoints: ["2022年生效", "关注敏感数据保护", "员工培训义务"],
    riskLevel: "medium",
  },
  {
    name: "马来西亚",
    nameEn: "Malaysia",
    law: "PDPA 2010",
    maxPenalty: "Up to $110,000+",
    dpoRequired: "无强制要求",
    dataLocalization: "需当地存储",
    keyPoints: ["刑事责任可能", "7项数据原则", "数据不出境原则"],
    riskLevel: "medium",
  },
  {
    name: "越南",
    nameEn: "Vietnam",
    law: "Decree 13",
    maxPenalty: "Up to $4,000+（虽金额低但伴随停业风险）",
    dpoRequired: "特定情况要求",
    dataLocalization: "强制本地化",
    keyPoints: ["强制本地化", "新法执行严", "影响评估义务"],
    riskLevel: "high",
  },
  {
    name: "印度尼西亚",
    nameEn: "Indonesia",
    law: "PDP Law",
    maxPenalty: "Up to 2% 年总收入",
    dpoRequired: "强制要求",
    dataLocalization: "政府数据必须",
    keyPoints: ["2024全面执行", "刑事责任重", "高额罚款"],
    riskLevel: "high",
  },
  {
    name: "菲律宾",
    nameEn: "Philippines",
    law: "DPA 2012",
    maxPenalty: "Up to $90,000+",
    dpoRequired: "强制要求",
    dataLocalization: "无强制要求",
    keyPoints: ["NPC 监管严格", "违规报告义务高", "敏感数据高标准"],
    riskLevel: "medium",
  },
];

const riskColors = {
  low: "text-green-400 bg-green-400/10 border-green-400/30",
  medium: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
  high: "text-coral bg-coral/10 border-coral/30",
};

const riskLabels = {
  low: "低风险",
  medium: "中等风险",
  high: "高风险",
};

export default function RegionCards() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  return (
    <section id="compliance" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in-up">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-secondary">
            <FileText className="w-4 h-4" />
            Compliance Intelligence
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            东南亚数据保护法律图谱
          </h2>
          <p className="text-muted-foreground text-lg">
            一站式了解各地区数据保护法规要求，消除信息差，精准布局出海合规战略
          </p>
        </div>

        {/* Region Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regions.map((region, index) => (
            <div
              key={region.name}
              className={`glass-card region-card p-6 space-y-4 cursor-pointer animate-fade-in-up ${
                activeRegion === region.name ? "border-secondary/50 shadow-glow-cyan" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setActiveRegion(region.name)}
              onMouseLeave={() => setActiveRegion(null)}
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-xl font-semibold">
                    <span className="mr-2">{regionFlags[region.name]}</span>
                    {region.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{region.nameEn}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${riskColors[region.riskLevel]}`}>
                  {riskLabels[region.riskLevel]}
                </span>
              </div>

              {/* Law Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-klein/30 border border-secondary/20">
                <Building className="w-4 h-4 text-secondary" />
                <span className="text-sm font-medium">{region.law}</span>
              </div>

              {/* Key Metrics */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">最高罚金</span>
                  <span className="font-semibold text-coral">{region.maxPenalty}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">DPO 委任</span>
                  <span className={region.dpoRequired === "强制要求" ? "text-coral font-medium" : "text-foreground"}>
                    {region.dpoRequired}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">数据本地化</span>
                  <span className={region.dataLocalization.includes("强制") ? "text-coral font-medium" : "text-foreground"}>
                    {region.dataLocalization}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-border/50" />

              {/* Key Points */}
              <div className="space-y-2">
                {region.keyPoints.map((point, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Button variant="glass" className="w-full group" size="sm">
                <Download className="w-4 h-4 mr-2 group-hover:text-secondary transition-colors" />
                下载合规清单
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl glass-card">
            <AlertTriangle className="w-5 h-5 text-coral" />
            <span className="text-muted-foreground">需要定制化合规方案？</span>
            <Button variant="glass" size="sm">
              联系专家
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
