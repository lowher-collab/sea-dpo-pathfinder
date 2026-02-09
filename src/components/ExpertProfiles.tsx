import { Button } from "@/components/ui/button";
import { MessageCircle, Award, Briefcase, Shield, Lock, FileCheck } from "lucide-react";

interface Expert {
  name: string;
  nameEn: string;
  title: string;
  region: string;
  photo: string;
  bio: string;
  certifications: string[];
  tags: string[];
  experience: string;
  background: "legal" | "infosec" | "certification";
}

const backgroundIcons = {
  legal: Shield,
  infosec: Lock,
  certification: FileCheck,
};

const backgroundLabels = {
  legal: "法律背景",
  infosec: "信息安全背景",
  certification: "认证审计背景",
};

const regionFlags: Record<string, string> = {
  "新加坡": "🇸🇬",
  "泰国": "🇹🇭",
  "马来西亚": "🇲🇾",
  "越南": "🇻🇳",
  "印度尼西亚": "🇮🇩",
  "菲律宾": "🇵🇭",
};

const experts: Expert[] = [
  {
    name: "陈伟明",
    nameEn: "Wilson Chen",
    title: "CIPP/A 认证专家",
    region: "新加坡",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face",
    bio: "8年新加坡 PDPA 实操经验，主导过 20+ 互联网平台合规审计。曾任职于新加坡个人数据保护委员会。",
    certifications: ["CIPP/A", "CIPM"],
    tags: ["中文流利", "曾任职于监管机构"],
    experience: "8年+",
    background: "certification",
  },
  {
    name: "Somchai Patel",
    nameEn: "Somchai Patel",
    title: "泰国 PDPA 首席顾问",
    region: "泰国",
    photo: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=300&h=300&fit=crop&crop=face",
    bio: "泰国本地律师，深耕 PDPA 法规解读与企业落地实施。服务客户涵盖制造业、零售业。",
    certifications: ["Thai Bar", "PDPA Cert"],
    tags: ["泰语母语", "本地化专家"],
    experience: "10年+",
    background: "legal",
  },
  {
    name: "Ahmad Rahman",
    nameEn: "Ahmad Rahman",
    title: "马来西亚 DPO",
    region: "马来西亚",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
    bio: "马来西亚注册律师，精通 PDPA 2010 与跨境数据传输规则。服务过 50+ 外资企业。",
    certifications: ["Malaysian Bar", "CIPP/A"],
    tags: ["马来语/英语", "跨境数据专家"],
    experience: "12年+",
    background: "legal",
  },
  {
    name: "Nguyen Thi Mai",
    nameEn: "Mai Nguyen",
    title: "越南合规总监",
    region: "越南",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face",
    bio: "越南本地法律专家，专注 Decree 13 的企业实施与政府关系维护。",
    certifications: ["Vietnam Bar", "DPO Cert"],
    tags: ["越南语母语", "政府关系"],
    experience: "9年+",
    background: "infosec",
  },
  {
    name: "Budi Santoso",
    nameEn: "Budi Santoso",
    title: "印尼数据保护顾问",
    region: "印度尼西亚",
    photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&h=300&fit=crop&crop=face",
    bio: "印尼信息安全专家，专注 PDP Law 企业合规落地，曾任职于国际四大咨询公司。",
    certifications: ["CISSP", "CIPP/A"],
    tags: ["印尼语母语", "信息安全"],
    experience: "11年+",
    background: "infosec",
  },
  {
    name: "Maria Santos",
    nameEn: "Maria Santos",
    title: "菲律宾 DPA 专家",
    region: "菲律宾",
    photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=300&fit=crop&crop=face",
    bio: "菲律宾认证数据保护官，精通 DPA 2012 与 NPC 监管要求，擅长企业隐私框架搭建。",
    certifications: ["CPA", "DPO Cert", "ISO 27001 LA"],
    tags: ["英语/他加禄语", "认证审计专家"],
    experience: "7年+",
    background: "certification",
  },
];

export default function ExpertProfiles() {
  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="experts" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-klein/5 to-background" />

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in-up">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-secondary">
            <Award className="w-4 h-4" />
            Expert Network
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            地区 DPO 专家团队
          </h2>
          <p className="text-muted-foreground text-lg">
            本地化专家网络，深谙各地法规与商业文化，为您的出海之旅保驾护航
          </p>
        </div>

        {/* Expert Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experts.map((expert, index) => {
            const BgIcon = backgroundIcons[expert.background];
            return (
              <div
                key={expert.nameEn}
                className="glass-card p-6 space-y-4 hover:border-secondary/30 transition-all duration-500 group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Photo & Region */}
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-border group-hover:border-secondary/50 transition-colors">
                      <img
                        src={expert.photo}
                        alt={expert.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-lg font-semibold">{expert.name}</h4>
                    <p className="text-sm text-muted-foreground">{expert.nameEn}</p>
                    <p className="text-sm text-secondary mt-1">{expert.title}</p>
                  </div>
                </div>

                {/* Region Badge */}
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-klein/30 border border-secondary/20 text-secondary">
                    {regionFlags[expert.region]} {expert.region}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-muted/50 border border-border text-muted-foreground">
                    <BgIcon className="w-3 h-3" />
                    {backgroundLabels[expert.background]}
                  </span>
                </div>

                {/* Bio */}
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {expert.bio}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {expert.tags.map((tag, i) => (
                    <span key={i} className="expert-badge">
                      {tag}
                    </span>
                  ))}
                  <span className="expert-badge">
                    <Briefcase className="w-3 h-3 mr-1" />
                    {expert.experience}
                  </span>
                </div>

                {/* Certifications */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Award className="w-3 h-3" />
                  <span>{expert.certifications.join(" · ")}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center animate-fade-in-up">
          <Button variant="glass" size="xl" onClick={scrollToBooking}>
            <MessageCircle className="w-5 h-5 mr-2" />
            与专家预约咨询
          </Button>
        </div>
      </div>
    </section>
  );
}
