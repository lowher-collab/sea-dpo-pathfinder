import { Button } from "@/components/ui/button";
import { MessageCircle, Award, Briefcase, Languages } from "lucide-react";

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
}

const experts: Expert[] = [
  {
    name: "陈伟明",
    nameEn: "Wilson Chen",
    title: "CIPP/A 认证专家",
    region: "新加坡",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    bio: "8年新加坡 PDPA 实操经验，主导过 20+ 互联网平台合规审计。曾任职于新加坡个人数据保护委员会。",
    certifications: ["CIPP/A", "CIPM"],
    tags: ["中文流利", "曾任职于监管机构"],
    experience: "8年+",
  },
  {
    name: "李雅婷",
    nameEn: "Yating Li",
    title: "跨国合规顾问",
    region: "新加坡",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
    bio: "专注金融科技与电商平台的数据合规，服务过多家中国出海独角兽企业。",
    certifications: ["CIPP/A", "FIP"],
    tags: ["金融科技专家", "跨境电商"],
    experience: "6年+",
  },
  {
    name: "Somchai Patel",
    nameEn: "Somchai Patel",
    title: "泰国 PDPA 首席顾问",
    region: "泰国",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    bio: "泰国本地律师，深耕 PDPA 法规解读与企业落地实施。服务客户涵盖制造业、零售业。",
    certifications: ["Thai Bar", "PDPA Cert"],
    tags: ["泰语母语", "本地化专家"],
    experience: "10年+",
  },
  {
    name: "张晓峰",
    nameEn: "Steven Zhang",
    title: "东南亚区域总监",
    region: "泰国",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face",
    bio: "覆盖泰国、越南、柬埔寨三地市场，专长于游戏出海与内容平台合规。",
    certifications: ["CIPT", "CIPP/A"],
    tags: ["中文流利", "游戏行业专家"],
    experience: "7年+",
  },
  {
    name: "Ahmad Rahman",
    nameEn: "Ahmad Rahman",
    title: "马来西亚 DPO",
    region: "马来西亚",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face",
    bio: "马来西亚注册律师，精通 PDPA 2010 与跨境数据传输规则。服务过 50+ 外资企业。",
    certifications: ["Malaysian Bar", "CIPP/A"],
    tags: ["马来语/英语", "跨境数据专家"],
    experience: "12年+",
  },
  {
    name: "Nguyen Thi Mai",
    nameEn: "Mai Nguyen",
    title: "越南合规总监",
    region: "越南",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face",
    bio: "越南本地法律专家，专注 Decree 13/2023 的企业实施与政府关系维护。",
    certifications: ["Vietnam Bar", "DPO Cert"],
    tags: ["越南语母语", "政府关系"],
    experience: "9年+",
  },
];

// Group experts by region
const groupedExperts = experts.reduce((acc, expert) => {
  if (!acc[expert.region]) {
    acc[expert.region] = [];
  }
  acc[expert.region].push(expert);
  return acc;
}, {} as Record<string, Expert[]>);

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

        {/* Experts by Region */}
        <div className="space-y-12">
          {Object.entries(groupedExperts).map(([region, regionExperts], regionIndex) => (
            <div key={region} className="animate-fade-in-up" style={{ animationDelay: `${regionIndex * 0.2}s` }}>
              {/* Region Header */}
              <div className="flex items-center gap-4 mb-6">
                <h3 className="font-display text-xl font-semibold text-secondary">{region}</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-secondary/30 to-transparent" />
              </div>

              {/* Expert Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                {regionExperts.map((expert, index) => (
                  <div
                    key={expert.nameEn}
                    className="glass-card p-6 flex gap-5 hover:border-secondary/30 transition-all duration-500 group"
                  >
                    {/* Photo */}
                    <div className="shrink-0">
                      <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-border group-hover:border-secondary/50 transition-colors">
                        <img
                          src={expert.photo}
                          alt={expert.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 space-y-3">
                      {/* Name & Title */}
                      <div>
                        <h4 className="font-display text-lg font-semibold flex items-center gap-2">
                          {expert.name}
                          <span className="text-sm text-muted-foreground font-normal">
                            {expert.nameEn}
                          </span>
                        </h4>
                        <p className="text-sm text-secondary">{expert.title}</p>
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
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center animate-fade-in-up">
          <Button variant="cta" size="xl" onClick={scrollToBooking}>
            <MessageCircle className="w-5 h-5 mr-2" />
            与专家预约咨询
          </Button>
        </div>
      </div>
    </section>
  );
}
