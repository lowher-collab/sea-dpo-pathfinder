import { Shield, Mail, MapPin, Phone, Linkedin, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative py-16 border-t border-border/30">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-card/50" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-klein to-cyan-electric/50 flex items-center justify-center">
                <Shield className="w-5 h-5 text-foreground" />
              </div>
              <span className="font-display text-xl font-bold">出海DPO</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              专注东南亚市场的数据保护官外包服务，让合规成为您出海的竞争优势。
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-lg glass-card flex items-center justify-center hover:border-secondary/50 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg glass-card flex items-center justify-center hover:border-secondary/50 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold">服务内容</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-foreground transition-colors cursor-pointer">DPO 委任服务</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">隐私政策定制</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">数据合规审计</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">员工合规培训</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">应急响应支持</li>
            </ul>
          </div>

          {/* Coverage */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold">服务区域</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-foreground transition-colors cursor-pointer">🇸🇬 新加坡</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">🇹🇭 泰国</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">🇲🇾 马来西亚</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">🇻🇳 越南</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">🇮🇩 印度尼西亚</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">🇵🇭 菲律宾</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold">联系我们</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-secondary" />
                <span>contact@chuhaidpo.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-secondary" />
                <span>+65 6XXX XXXX</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                <span>新加坡 · 曼谷 · 吉隆坡</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider mb-8" />

        {/* Bottom */}
        <div className="space-y-6">
          {/* Legal */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>© 2024 出海DPO. 保留所有权利。</span>
              <a href="#" className="hover:text-foreground transition-colors">隐私政策</a>
              <a href="#" className="hover:text-foreground transition-colors">使用条款</a>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-3 h-3" />
              <span>本网站符合 PDPA 合规要求</span>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-center text-muted-foreground/70 max-w-4xl mx-auto">
            法律免责声明：本网站所提供的信息仅供参考，不构成法律建议。具体合规方案需根据企业实际情况由专业顾问评估后提供。我们建议在做出任何法律或业务决策前咨询持牌法律顾问。
          </p>
        </div>
      </div>
    </footer>
  );
}
