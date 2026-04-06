import { Link } from "react-router-dom";

const tools = [
  {
    id: "dpo-checker",
    status: "live",
    name: "ASEAN DPO 任命合规检测",
    desc: "回答5步问卷，检测您的企业在新加坡、马来西亚、印度尼西亚、泰国、越南、菲律宾六国是否需要强制任命数据保护官（DPO）。结果包含各国法律依据、触发条件、最高罚款及官方法律来源链接。",
    meta: ["覆盖ASEAN六国", "2026年4月法规版本", "约3分钟完成"],
    tags: ["DPO任命", "PDPA", "PDPL", "数据合规"],
    href: "/tools/dpo-checker",
  },
  {
    id: "transfer-analyzer",
    status: "soon",
    name: "跨境数据传输路径分析器",
    desc: "输入数据来源国、目标国及数据类型，获取合规传输路径建议——包括数据处理影响评估（DPIA）、跨境传输影响评估（CTIA）等机制的适用判断，以及所需文件清单。",
    meta: ["覆盖ASEAN各国PDPA", "DPIA / CTIA适用判断", "输出文件清单"],
    tags: ["跨境传输", "DPIA", "CTIA", "合规路径"],
    href: null,
  },
  {
    id: "gap-assessment",
    status: "soon",
    name: "多辖区合规差距评估",
    desc: "已有GDPR或其他合规体系？输入现有合规框架与目标进入的ASEAN市场，获取合规差距项清单、优先级排序及预估工作量，帮助您高效规划市场扩张的合规预算。",
    meta: ["现有体系→ASEAN差距分析", "优先级排序", "预估合规工作量"],
    tags: ["差距分析", "GDPR", "合规规划", "市场扩张"],
    href: null,
  },
];

export default function Tools() {
  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: "#F8F6F1", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ background: "#0F2140", padding: "1.25rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "3px solid #C8922A" }}>
        <div>
          <Link to="/" style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "1.3rem", fontWeight: 700, color: "#fff", textDecoration: "none" }}>
            Asia<span style={{ color: "#E8B84B" }}>DPO</span>
          </Link>
          <div style={{ fontSize: "0.68rem", color: "#8BA3C0", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 3 }}>让合规成为竞争壁垒</div>
        </div>
        <nav style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <Link to="/" style={{ fontSize: "0.82rem", color: "#8BA3C0", textDecoration: "none" }}>首页</Link>
          <Link to="/insights" style={{ fontSize: "0.82rem", color: "#8BA3C0", textDecoration: "none" }}>洞察</Link>
          <Link to="/tools" style={{ fontSize: "0.82rem", color: "#E8B84B", textDecoration: "none" }}>合规工具</Link>
        </nav>
      </div>

      {/* Hero */}
      <div style={{ background: "#0F2140", padding: "3.5rem 2rem 4rem", textAlign: "center" }}>
        <div style={{ display: "inline-block", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#E8B84B", border: "1px solid rgba(200,146,42,0.4)", borderRadius: 20, padding: "4px 14px", marginBottom: "1.25rem" }}>
          AsiaDPO 合规工具箱
        </div>
        <div style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "2rem", fontWeight: 700, color: "#fff", lineHeight: 1.35, marginBottom: "1rem" }}>
          让数据合规<span style={{ color: "#E8B84B" }}>看得见、用得上</span>
        </div>
        <div style={{ fontSize: "0.95rem", color: "#8BA3C0", lineHeight: 1.75, maxWidth: 540, margin: "0 auto" }}>
          基于权威法规研究与专业实践经验，为企业提供可操作的合规评估工具。所有工具均免费使用，结果仅供参考。
        </div>
      </div>

      {/* Stats */}
      <div style={{ background: "#1B3A5C", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "1rem 2rem", display: "flex", justifyContent: "center", gap: "3rem", flexWrap: "wrap" }}>
        {[["6","ASEAN覆盖国家"],["2026.04","法规数据时效"],["3 min","平均完成时间"],["免费","无需注册"]].map(([num, label]) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "monospace", fontSize: "1.2rem", color: "#E8B84B" }}>{num}</div>
            <div style={{ fontSize: "0.68rem", color: "#8BA3C0", marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Main */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>

        <div style={{ marginBottom: "1.75rem" }}>
          <div style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "1.2rem", fontWeight: 600, color: "#0F2140", marginBottom: "0.35rem" }}>可用工具</div>
          <div style={{ fontSize: "0.82rem", color: "#6B6560" }}>点击工具卡片进入，回答几个问题即可获得个性化合规评估报告。</div>
        </div>

        {/* Live tools */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {tools.filter(t => t.status === "live").map(tool => (
            <div key={tool.id} style={{ background: "#fff", border: "1px solid #DDD8CE", borderRadius: 14, overflow: "hidden", transition: "all 0.22s" }}>
              <div style={{ display: "flex" }}>
                <div style={{ width: 5, background: "#0D7A6E", flexShrink: 0 }} />
                <div style={{ padding: "1.75rem 1.5rem" }}>
                  <div style={{ width: 52, height: 52, background: "#EBF7F5", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                      <circle cx="13" cy="10" r="4.5" stroke="#0D7A6E" strokeWidth="1.5"/>
                      <path d="M5 22c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#0D7A6E" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M17 14l2 2 4-4" stroke="#C8922A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div style={{ flex: 1, padding: "1.75rem 1.5rem 1.75rem 0" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "0.6rem", flexWrap: "wrap" }}>
                    <div style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "1.05rem", fontWeight: 600, color: "#0F2140" }}>{tool.name}</div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <span style={{ fontSize: "0.63rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", background: "#EBF7F5", color: "#085041", padding: "2px 9px", borderRadius: 20 }}>已上线</span>
                      <span style={{ fontSize: "0.63rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", background: "#FFF4E0", color: "#854F0B", padding: "2px 9px", borderRadius: 20 }}>免费</span>
                    </div>
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#6B6560", lineHeight: 1.7, marginBottom: "1.1rem" }}>{tool.desc}</div>
                  <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
                    {tool.meta.map(m => (
                      <div key={m} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.75rem", color: "#9A948E" }}>
                        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#12A396" }} />{m}
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                      {tool.tags.map(tag => (
                        <span key={tag} style={{ fontSize: "0.68rem", color: "#6B6560", background: "#F8F6F1", border: "1px solid #DDD8CE", padding: "2px 8px", borderRadius: 6 }}>{tag}</span>
                      ))}
                    </div>
                    <Link to={tool.href!} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#0F2140", color: "white", padding: "0.6rem 1.25rem", borderRadius: 8, fontSize: "0.82rem", fontWeight: 500, textDecoration: "none" }}>
                      进入工具 →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "2.5rem 0 1.5rem" }}>
          <div style={{ flex: 1, height: 1, background: "#DDD8CE" }} />
          <div style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9A948E", whiteSpace: "nowrap" }}>即将上线</div>
          <div style={{ flex: 1, height: 1, background: "#DDD8CE" }} />
        </div>

        {/* Coming soon tools */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {tools.filter(t => t.status === "soon").map(tool => (
            <div key={tool.id} style={{ background: "#fff", border: "1px solid #DDD8CE", borderRadius: 14, overflow: "hidden", opacity: 0.82 }}>
              <div style={{ display: "flex" }}>
                <div style={{ width: 5, background: "#DDD8CE", flexShrink: 0 }} />
                <div style={{ padding: "1.75rem 1.5rem" }}>
                  <div style={{ width: 52, height: 52, background: "#F5F3EE", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                      <rect x="3" y="5" width="20" height="16" rx="2" stroke="#B4B2A9" strokeWidth="1.5"/>
                      <path d="M3 10h20" stroke="#B4B2A9" strokeWidth="1.5"/>
                      <path d="M8 15h4" stroke="#B4B2A9" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M8 18h6" stroke="#B4B2A9" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
                <div style={{ flex: 1, padding: "1.75rem 1.5rem 1.75rem 0" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "0.6rem", flexWrap: "wrap" }}>
                    <div style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "1.05rem", fontWeight: 600, color: "#0F2140" }}>{tool.name}</div>
                    <span style={{ fontSize: "0.63rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", background: "#F1EFE8", color: "#6B6560", padding: "2px 9px", borderRadius: 20 }}>即将上线</span>
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#6B6560", lineHeight: 1.7, marginBottom: "1.1rem" }}>{tool.desc}</div>
                  <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
                    {tool.meta.map(m => (
                      <div key={m} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.75rem", color: "#9A948E" }}>
                        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#DDD8CE" }} />{m}
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                      {tool.tags.map(tag => (
                        <span key={tag} style={{ fontSize: "0.68rem", color: "#6B6560", background: "#F8F6F1", border: "1px solid #DDD8CE", padding: "2px 8px", borderRadius: 6 }}>{tag}</span>
                      ))}
                    </div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#F8F6F1", color: "#6B6560", padding: "0.6rem 1.25rem", borderRadius: 8, fontSize: "0.82rem", fontWeight: 500, border: "1px solid #DDD8CE" }}>
                      敬请期待
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div style={{ marginTop: "3rem", padding: "1.25rem 1.5rem", background: "#0F2140", borderRadius: 12, display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
          <div style={{ fontSize: "0.82rem", color: "#8BA3C0", lineHeight: 1.6, flex: 1 }}>
            工具结果仅供参考，不构成法律意见。<strong style={{ color: "#E8B84B" }}>需要专业顾问？</strong> AsiaDPO 提供 DPO 外包任命、多辖区合规规划及国际认证咨询，欢迎联系我们。
          </div>
          <a href="mailto:dpo@asiadpo.top" style={{ display: "inline-block", background: "#C8922A", color: "white", padding: "0.6rem 1.25rem", borderRadius: 8, fontSize: "0.82rem", fontWeight: 600, textDecoration: "none" }}>
            预约咨询 →
          </a>
        </div>

      </div>
    </div>
  );
}
