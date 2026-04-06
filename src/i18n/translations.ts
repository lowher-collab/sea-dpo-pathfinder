export type Language = "zh" | "en";

export const translations = {
  // Navbar
  nav: {
    brand: { zh: "出海DPO", en: "SEA DPO" },
    compliance: { zh: "法律概览", en: "Compliance" },
    experts: { zh: "区域专家网络", en: "Expert Network" },
    pricing: { zh: "服务方案", en: "Pricing" },
    insights: { zh: "行业洞察", en: "Insights" },
    tools: { zh: "合规工具", en: "Tools" },  
    subscribe: { zh: "订阅获取合规清单", en: "Get Compliance Checklist" },
  },

  // Hero Section
  hero: {
    badge: { zh: "东南亚数据合规专家", en: "Southeast Asia Data Compliance Experts" },
    title1: { zh: "链接东南亚专家资源，", en: "Connecting SEA Expert Resources," },
    title2: { zh: "为出海企业构建合规护城河", en: "Building Compliance Moats for Global Enterprises" },
    subtitle: {
      zh: "我们在新加坡总部统一调度，联动东南亚各国本地合规专家，为您提供高性价比的落地支持。",
      en: "Headquartered in Singapore, we coordinate local compliance experts across Southeast Asia to deliver cost-effective on-the-ground support.",
    },
    ctaPrimary: { zh: "获取《合规落地清单 2026版》", en: "Get Compliance Checklist 2026" },
    ctaSecondary: { zh: "预约合规诊断", en: "Book Compliance Assessment" },
    statCountries: { zh: "已覆盖国家", en: "Countries Covered" },
    statClients: { zh: "服务企业", en: "Clients Served" },
    statProjects: { zh: "合规项目", en: "Compliance Projects" },
    coverageTitle: { zh: "服务覆盖区域", en: "Service Coverage" },
    coverageSubtitle: { zh: "东南亚全境覆盖", en: "Full Southeast Asia Coverage" },
    industries: { zh: "已服务行业", en: "Industries Served" },
    industriesList: {
      zh: ["跨境电商", "金融科技", "游戏出海", "SaaS 平台", "社交媒体", "医疗健康"],
      en: ["E-commerce", "FinTech", "Gaming", "SaaS Platforms", "Social Media", "Healthcare"],
    },
    regions: {
      zh: ["新加坡", "泰国", "马来西亚", "越南", "印尼", "菲律宾"],
      en: ["Singapore", "Thailand", "Malaysia", "Vietnam", "Indonesia", "Philippines"],
    },
    serviceDetails: { zh: "了解服务详情", en: "View Service Details" },
    learnMore: { zh: "了解更多", en: "Learn More" },
  },

  // Pain Points
  pain: {
    badge: { zh: "为什么选择出海DPO", en: "Why Choose SEA DPO" },
    title: { zh: "出海合规，为什么这么难？", en: "Why Is Overseas Compliance So Hard?" },
    points: {
      zh: [
        { label: "各国法律差异大", desc: "6国法规各不相同" },
        { label: "法规更新快", desc: "政策频繁修订" },
        { label: "多语言障碍", desc: "本地语言文件要求" },
        { label: "成本不可控", desc: "多国合规费用叠加" },
      ],
      en: [
        { label: "Diverse Legal Frameworks", desc: "6 countries, 6 different regulations" },
        { label: "Rapid Regulatory Changes", desc: "Frequent policy updates" },
        { label: "Language Barriers", desc: "Local language documentation required" },
        { label: "Unpredictable Costs", desc: "Multi-country compliance costs add up" },
      ],
    },
    solutionName: { zh: "出海DPO", en: "SEA DPO" },
    solutionDesc: { zh: "一站式解决方案", en: "One-Stop Solution" },
    solutionPoints: {
      zh: ["一个团队覆盖 6 国法规", "实时追踪法规变动", "本地语言专家对接", "固定年费，成本透明"],
      en: ["One team covering 6 countries", "Real-time regulatory tracking", "Local language experts", "Fixed annual fee, transparent costs"],
    },
    solutionCta: { zh: "从「逐国拼凑」到「统一托管」", en: 'From "Piecemeal" to "Unified Management"' },
  },

  // Region Cards
  region: {
    badge: { zh: "区域法规概览", en: "Regional Compliance Overview" },
    title: { zh: "东南亚数据保护法律图谱", en: "Southeast Asia Data Protection Legal Map" },
    subtitle: {
      zh: "一站式了解各地区数据保护法规要求，消除信息差，精准布局出海合规战略",
      en: "Understand regional data protection requirements at a glance. Eliminate information gaps and strategize your compliance roadmap.",
    },
    maxPenalty: { zh: "最高罚金", en: "Max Penalty" },
    coreWarning: { zh: "核心警示", en: "Key Warning" },
    dpoLabel: { zh: "DPO 委任", en: "DPO Appointment" },
    dataLocal: { zh: "数据本地化", en: "Data Localization" },
    riskLow: { zh: "低风险", en: "Low Risk" },
    riskMedium: { zh: "中等风险", en: "Medium Risk" },
    riskHigh: { zh: "高风险", en: "High Risk" },
    countries: {
      zh: {
        singapore: { name: "新加坡", coreWarning: "强制委任 DPO", dpoRequired: "强制要求", dataLocalization: "无强制要求", keyPoints: ["72小时违规通报", "监管极其成熟", "同意义务严格"] },
        indonesia: { name: "印度尼西亚", coreWarning: "高风险：刑事责任重", dpoRequired: "强制要求", dataLocalization: "政府数据必须", keyPoints: ["2024全面执行", "刑事责任重", "高额罚款"] },
        vietnam: { name: "越南", coreWarning: "高风险：有停业风险", dpoRequired: "特定情况要求", dataLocalization: "强制本地化", keyPoints: ["强制本地化", "新法执行严", "影响评估义务"] },
        thailand: { name: "泰国", coreWarning: "强制隐私影响评估", dpoRequired: "特定情况要求", dataLocalization: "无强制要求", keyPoints: ["2022年生效", "关注敏感数据保护", "员工培训义务"] },
        philippines: { name: "菲律宾", coreWarning: "严格的违规通报时限", dpoRequired: "强制要求", dataLocalization: "无强制要求", keyPoints: ["NPC 监管严格", "违规报告义务高", "敏感数据高标准"] },
        malaysia: { name: "马来西亚", coreWarning: "刑事责任可能", dpoRequired: "无强制要求", dataLocalization: "需当地存储", keyPoints: ["7项数据原则", "数据不出境原则", "刑事责任可能"] },
      },
      en: {
        singapore: { name: "Singapore", coreWarning: "Mandatory DPO Appointment", dpoRequired: "Mandatory", dataLocalization: "Not Required", keyPoints: ["72h Breach Notification", "Mature Regulatory Framework", "Strict Consent Obligations"] },
        indonesia: { name: "Indonesia", coreWarning: "High Risk: Criminal Liability", dpoRequired: "Mandatory", dataLocalization: "Government Data Required", keyPoints: ["Full Enforcement 2024", "Heavy Criminal Liability", "Significant Fines"] },
        vietnam: { name: "Vietnam", coreWarning: "High Risk: Business Suspension", dpoRequired: "Conditional", dataLocalization: "Mandatory Localization", keyPoints: ["Mandatory Localization", "Strict New Law Enforcement", "Impact Assessment Required"] },
        thailand: { name: "Thailand", coreWarning: "Mandatory Privacy Impact Assessment", dpoRequired: "Conditional", dataLocalization: "Not Required", keyPoints: ["Effective Since 2022", "Sensitive Data Focus", "Employee Training Required"] },
        philippines: { name: "Philippines", coreWarning: "Strict Breach Notification Deadlines", dpoRequired: "Mandatory", dataLocalization: "Not Required", keyPoints: ["Strict NPC Oversight", "High Reporting Obligations", "High Sensitive Data Standards"] },
        malaysia: { name: "Malaysia", coreWarning: "Possible Criminal Liability", dpoRequired: "Not Required", dataLocalization: "Local Storage Required", keyPoints: ["7 Data Principles", "Data Export Restrictions", "Possible Criminal Liability"] },
      },
    },
  },

  // Oath Section
  oath: {
    quote: {
      zh: "我们以全球视野筑基，以本地智慧破局，让数据合规成为您赢在全球市场的核心竞争力！",
      en: "We build on a global vision and break through with local expertise, making data compliance your core competitive advantage in the global market!",
    },
    brand: { zh: "出海 DPO", en: "SEA DPO" },
    trust: {
      zh: ["国际认证持证团队", "严格保密协议", "独立第三方立场"],
      en: ["Internationally Certified Team", "Strict Confidentiality Agreements", "Independent Third-Party Position"],
    },
  },

  // Expert Profiles
  expert: {
    badge: { zh: "区域专家网络", en: "Regional Expert Network" },
    title: { zh: "区域专家网络", en: "Regional Expert Network" },
    subtitle: {
      zh: "我们在新加坡总部统一调度，联动东南亚各国本地合规专家，为您提供高性价比的落地支持",
      en: "Headquartered in Singapore, we coordinate local compliance experts across Southeast Asia for cost-effective on-ground support",
    },
    ctaButton: { zh: "订阅获取合规清单", en: "Subscribe for Compliance Checklist" },
    bgLegal: { zh: "法律背景", en: "Legal" },
    bgInfosec: { zh: "信息安全背景", en: "InfoSec" },
    bgCert: { zh: "认证审计背景", en: "Certification" },
    experts: {
      zh: [
        { name: "陈伟明", title: "CIPP/A 认证专家", region: "新加坡", bio: "8年新加坡 PDPA 实操经验，主导过 20+ 互联网平台合规审计。曾任职于新加坡个人数据保护委员会。", tags: ["中文流利", "曾任职于监管机构"] },
        { name: "Somchai Patel", title: "泰国 PDPA 首席顾问", region: "泰国", bio: "泰国本地律师，深耕 PDPA 法规解读与企业落地实施。服务客户涵盖制造业、零售业。", tags: ["泰语母语", "本地化专家"] },
        { name: "Ahmad Rahman", title: "马来西亚 DPO", region: "马来西亚", bio: "马来西亚注册律师，精通 PDPA 2010 与跨境数据传输规则。服务过 50+ 外资企业。", tags: ["马来语/英语", "跨境数据专家"] },
        { name: "Nguyen Thi Mai", title: "越南合规总监", region: "越南", bio: "越南本地法律专家，专注 Decree 13 的企业实施与政府关系维护。", tags: ["越南语母语", "政府关系"] },
        { name: "Budi Santoso", title: "印尼数据保护顾问", region: "印度尼西亚", bio: "印尼信息安全专家，专注 PDP Law 企业合规落地，曾任职于国际四大咨询公司。", tags: ["印尼语母语", "信息安全"] },
        { name: "Maria Santos", title: "菲律宾 DPA 专家", region: "菲律宾", bio: "菲律宾认证数据保护官，精通 DPA 2012 与 NPC 监管要求，擅长企业隐私框架搭建。", tags: ["英语/他加禄语", "认证审计专家"] },
      ],
      en: [
        { name: "Chen Weiming", title: "CIPP/A Certified Expert", region: "Singapore", bio: "8 years of hands-on PDPA experience in Singapore, led 20+ compliance audits for tech platforms. Former PDPC official.", tags: ["Fluent Chinese", "Former Regulator"] },
        { name: "Somchai Patel", title: "Thailand PDPA Lead Consultant", region: "Thailand", bio: "Thai local attorney specializing in PDPA interpretation and enterprise implementation across manufacturing and retail.", tags: ["Native Thai", "Localization Expert"] },
        { name: "Ahmad Rahman", title: "Malaysia DPO", region: "Malaysia", bio: "Malaysian registered lawyer, expert in PDPA 2010 and cross-border data transfer rules. Served 50+ foreign enterprises.", tags: ["Malay/English", "Cross-border Data Expert"] },
        { name: "Nguyen Thi Mai", title: "Vietnam Compliance Director", region: "Vietnam", bio: "Vietnamese legal expert focused on Decree 13 enterprise implementation and government relations.", tags: ["Native Vietnamese", "Government Relations"] },
        { name: "Budi Santoso", title: "Indonesia Data Protection Consultant", region: "Indonesia", bio: "Indonesian InfoSec expert specializing in PDP Law compliance. Former Big Four consultant.", tags: ["Native Indonesian", "Information Security"] },
        { name: "Maria Santos", title: "Philippines DPA Expert", region: "Philippines", bio: "Certified Philippine DPO, expert in DPA 2012 and NPC requirements. Specializes in enterprise privacy frameworks.", tags: ["English/Tagalog", "Certification Audit Expert"] },
      ],
    },
  },

  // Pricing
  pricing: {
    badge: { zh: "标准化服务套餐", en: "Standardized Service Packages" },
    title: { zh: "服务方案与报价", en: "Service Plans & Pricing" },
    subtitle: {
      zh: "透明定价，按需选择。所有套餐均可根据业务规模与目标地区定制",
      en: "Transparent pricing, choose as needed. All plans can be customized based on business scale and target regions.",
    },
    disclaimer: {
      zh: "价格因地区和规模浮动",
      en: "Price varies based on region and scale",
    },
    tiers: {
      zh: [
        { name: "基础包", price: "USD 300", period: "月", description: "", features: ["DPO 委任服务", "一小时咨询 / 月"], badge: "入门" },
        { name: "核心包", price: "咨询定价", period: "年度服务", description: "深度治理方案，建立完整数据保护体系", features: ["基础包全部内容", "隐私政策定制", "Cookie 政策模板", "数据资产盘点", "流程制度模版"], badge: "推荐" },
        { name: "旗舰包", price: "咨询定价", period: "年度服务", description: "全方位合规托管，适合多地区业务扩张", features: ["核心包全部内容", "数据保护影响评估 (DPIA)", "跨境数据传输方案", "员工隐私培训", "年度合规审计报告", "专属合规经理对接"], badge: "旗舰" },
      ],
      en: [
        { name: "Foundation", price: "USD 300", period: "month", description: "", features: ["DPO Appointment Service", "1 Hour Consultation / Month"], badge: "Starter" },
        { name: "Professional", price: "Contact Us", period: "Annual", description: "In-depth governance, build a complete data protection system", features: ["All Foundation features", "Custom Privacy Policy", "Cookie Policy Template", "Data Asset Inventory", "Process & Policy Templates"], badge: "Recommended" },
        { name: "Enterprise", price: "Contact Us", period: "Annual", description: "Full compliance management for multi-region expansion", features: ["All Professional features", "Data Protection Impact Assessment (DPIA)", "Cross-border Data Transfer Solutions", "Employee Privacy Training", "Annual Compliance Audit Report", "Dedicated Compliance Manager"], badge: "Flagship" },
      ],
    },
  },

  // Booking Section
  booking: {
    title: { zh: "订阅最新合规资讯", en: "Subscribe to Latest Compliance Updates" },
    subtitle: { zh: "及时获取资讯，助力企业出海", en: "Stay informed, empower your global expansion" },
    cta: { zh: "立即订阅，获取2026合规清单", en: "Subscribe Now for 2026 Compliance Checklist" },
  },

  // Checklist Dialog
  checklist: {
    title: { zh: "获取合规落地清单", en: "Get Compliance Checklist" },
    description: {
      zh: "选择您的目标国家，我们将发送对应的《东南亚合规落地清单 2026版》至您的邮箱",
      en: "Select your target countries and we'll send the corresponding SEA Compliance Checklist 2026 to your email",
    },
    selectLabel: { zh: "选择目标国家（可多选）", en: "Select Target Countries (multiple)" },
    emailLabel: { zh: "工作邮箱", en: "Work Email" },
    submit: { zh: "免费获取清单", en: "Get Checklist Free" },
    privacy: { zh: "我们尊重您的隐私，不会向第三方共享您的信息", en: "We respect your privacy and won't share your information with third parties" },
    successTitle: { zh: "发送成功！", en: "Sent Successfully!" },
    successMsg: { zh: "《东南亚合规落地清单 2026版》已发送至", en: "SEA Compliance Checklist 2026 has been sent to" },
    successCountries: { zh: "涵盖国家：", en: "Covered countries: " },
    close: { zh: "关闭", en: "Close" },
    countries: {
      zh: [
        { name: "新加坡", flag: "🇸🇬" },
        { name: "泰国", flag: "🇹🇭" },
        { name: "马来西亚", flag: "🇲🇾" },
        { name: "越南", flag: "🇻🇳" },
        { name: "印度尼西亚", flag: "🇮🇩" },
        { name: "菲律宾", flag: "🇵🇭" },
      ],
      en: [
        { name: "Singapore", flag: "🇸🇬" },
        { name: "Thailand", flag: "🇹🇭" },
        { name: "Malaysia", flag: "🇲🇾" },
        { name: "Vietnam", flag: "🇻🇳" },
        { name: "Indonesia", flag: "🇮🇩" },
        { name: "Philippines", flag: "🇵🇭" },
      ],
    },
  },

  // Footer
  footer: {
    brand: { zh: "出海DPO", en: "SEA DPO" },
    brandDesc: {
      zh: "专注东南亚市场的数据保护官外包服务，让合规成为您出海的竞争优势。",
      en: "Southeast Asia-focused DPO outsourcing service, making compliance your competitive advantage for global expansion.",
    },
    servicesTitle: { zh: "服务内容", en: "Services" },
    services: {
      zh: ["DPO 委任服务", "隐私政策定制", "数据合规审计", "员工合规培训", "应急响应支持"],
      en: ["DPO Appointment", "Privacy Policy Customization", "Data Compliance Audit", "Employee Compliance Training", "Emergency Response Support"],
    },
    coverageTitle: { zh: "服务区域", en: "Coverage" },
    contactTitle: { zh: "联系我们", en: "Contact Us" },
    contactEmail: { zh: "contact@asiadpo.top", en: "contact@asiadpo.top" },
    contactPhone: { zh: "WhatsApp 65-81514048", en: "WhatsApp 65-81514048" },
    copyright: { zh: "© 2024 出海DPO. 保留所有权利。", en: "© 2024 SEA DPO. All Rights Reserved." },
    privacyPolicy: { zh: "隐私政策", en: "Privacy Policy" },
    terms: { zh: "使用条款", en: "Terms of Use" },
    pdpaCompliant: { zh: "本网站符合 PDPA 合规要求", en: "This website is PDPA compliant" },
    disclaimer: {
      zh: "法律免责声明：本网站所提供的信息仅供参考，不构成法律建议。具体合规方案需根据企业实际情况由专业顾问评估后提供。我们建议在做出任何法律或业务决策前咨询持牌法律顾问。",
      en: "Legal Disclaimer: The information provided on this website is for reference only and does not constitute legal advice. Specific compliance solutions must be assessed by professional consultants based on actual business conditions. We recommend consulting licensed legal advisors before making any legal or business decisions.",
    },
  },

  // Insights Page
  insights: {
    badge: { zh: "行业洞察", en: "Industry Insights" },
    title: { zh: "东南亚数据合规动态", en: "Southeast Asia Data Compliance Updates" },
    subtitle: {
      zh: "及时掌握各国法规更新、监管动态和行业最佳实践",
      en: "Stay updated on regulatory changes, enforcement actions, and industry best practices",
    },
    articleCount: { zh: "共找到", en: "Found" },
    articleUnit: { zh: "篇文章", en: "articles" },
    emptyTitle: { zh: "建设中……", en: "Coming Soon..." },
    emptyDesc: { zh: "精彩内容即将上线，敬请期待", en: "Exciting content is on the way, stay tuned" },
    emptyNote: { zh: "我们正在为您准备最新的行业洞察", en: "We are preparing the latest industry insights for you" },
    filterAll: { zh: "全部", en: "All" },
    filterCountries: {
      zh: ["新加坡", "泰国", "马来西亚", "越南", "印尼", "菲律宾"],
      en: ["Singapore", "Thailand", "Malaysia", "Vietnam", "Indonesia", "Philippines"],
    },
  },
} as const;

export type TranslationKey = keyof typeof translations;
