import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const tools = [
  {
    id: "dpo-checker",
    status: "live",
    name: "ASEAN DPO Appointment Checker",
    desc: "Answer 5 quick questions to find out whether your company is legally required to appoint a Data Protection Officer (DPO) in Singapore, Malaysia, Indonesia, Thailand, Vietnam, and the Philippines. Results include the legal basis, trigger conditions, maximum penalties, and links to official legislation for each country.",
    meta: ["Covers 6 ASEAN jurisdictions", "Regulations updated April 2026", "~3 minutes to complete"],
    tags: ["DPO Appointment", "PDPA", "PDPL", "Data Compliance"],
    href: "/tools/dpo-checker/en",
  },
  {
    id: "transfer-analyzer",
    status: "soon",
    name: "Cross-Border Data Transfer Path Analyzer",
    desc: "Enter source country, destination country and data types to get a compliance transfer path recommendation — including applicability of Data Protection Impact Assessment (DPIA) and Cross-Border Transfer Impact Assessment (CTIA) — along with a required document checklist.",
    meta: ["Covers ASEAN PDPA frameworks", "DPIA / CTIA applicability", "Outputs document checklist"],
    tags: ["Cross-Border Transfer", "DPIA", "CTIA", "Compliance Path"],
    href: null,
  },
  {
    id: "gap-assessment",
    status: "soon",
    name: "Multi-Jurisdiction Compliance Gap Assessment",
    desc: "Already have a GDPR or other compliance framework? Input your existing framework and target ASEAN markets to receive a gap analysis, priority ranking, and estimated workload — helping you plan your compliance budget for market expansion efficiently.",
    meta: ["Existing framework → ASEAN gap analysis", "Priority ranking", "Estimated compliance workload"],
    tags: ["Gap Analysis", "GDPR", "Compliance Planning", "Market Expansion"],
    href: null,
  },
];

const s = {
  card: { background: "#fff", border: "1px solid #DDD8CE", borderRadius: 14, overflow: "hidden" as const },
  accent: (live: boolean) => ({ width: 5, background: live ? "#0D7A6E" : "#DDD8CE", flexShrink: 0 } as React.CSSProperties),
  icon: (live: boolean) => ({ width: 52, height: 52, background: live ? "#EBF7F5" : "#F5F3EE", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" } as React.CSSProperties),
  tag: { fontSize: "0.68rem", color: "#6B6560", background: "#F8F6F1", border: "1px solid #DDD8CE", padding: "2px 8px", borderRadius: 6 } as React.CSSProperties,
};

export default function ToolsEn() {
  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: "#F8F6F1", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <div style={{ background: "#0F2140", padding: "5rem 2rem 4rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, border: "1px solid rgba(200,146,42,0.12)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 400, height: 400, border: "1px solid rgba(200,146,42,0.08)", borderRadius: "50%" }} />
        <div style={{ display: "inline-block", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#E8B84B", border: "1px solid rgba(200,146,42,0.4)", borderRadius: 20, padding: "4px 14px", marginBottom: "1.25rem", position: "relative", zIndex: 1 }}>
          AsiaDPO Compliance Toolkit
        </div>
        <div style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "2rem", fontWeight: 700, color: "#fff", lineHeight: 1.35, marginBottom: "1rem", position: "relative", zIndex: 1 }}>
          Compliance Made <span style={{ color: "#E8B84B" }}>Visible & Actionable</span>
        </div>
        <div style={{ fontSize: "0.95rem", color: "#8BA3C0", lineHeight: 1.75, maxWidth: 540, margin: "0 auto", position: "relative", zIndex: 1 }}>
          Built on authoritative regulatory research and professional expertise. Free to use — results are for reference only.
        </div>
      </div>

      {/* Stats */}
      <div style={{ background: "#1B3A5C", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "1rem 2rem", display: "flex", justifyContent: "center", gap: "3rem", flexWrap: "wrap" as const }}>
        {[["6","ASEAN Countries"],["Apr 2026","Regulation Currency"],["3 min","Avg. Completion Time"],["Free","No Registration"]].map(([num, label]) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "monospace", fontSize: "1.2rem", color: "#E8B84B" }}>{num}</div>
            <div style={{ fontSize: "0.68rem", color: "#8BA3C0", marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Main */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>

        <div style={{ marginBottom: "1.75rem" }}>
          <div style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "1.2rem", fontWeight: 600, color: "#0F2140", marginBottom: "0.35rem" }}>Available Tools</div>
          <div style={{ fontSize: "0.82rem", color: "#6B6560" }}>Click a tool to get started. Answer a few questions to receive a personalised compliance assessment.</div>
        </div>

        {/* Live tools */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {tools.filter(t => t.status === "live").map(tool => (
            <div key={tool.id} style={s.card}>
              <div style={{ display: "flex" }}>
                <div style={s.accent(true)} />
                <div style={{ padding: "1.75rem 1.5rem" }}>
                  <div style={s.icon(true)}>
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                      <circle cx="13" cy="10" r="4.5" stroke="#0D7A6E" strokeWidth="1.5"/>
                      <path d="M5 22c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#0D7A6E" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M17 14l2 2 4-4" stroke="#C8922A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div style={{ flex: 1, padding: "1.75rem 1.5rem 1.75rem 0" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "0.6rem", flexWrap: "wrap" as const }}>
                    <div style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "1.05rem", fontWeight: 600, color: "#0F2140" }}>{tool.name}</div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <span style={{ fontSize: "0.63rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const, background: "#EBF7F5", color: "#085041", padding: "2px 9px", borderRadius: 20 }}>Live</span>
                      <span style={{ fontSize: "0.63rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const, background: "#FFF4E0", color: "#854F0B", padding: "2px 9px", borderRadius: 20 }}>Free</span>
                    </div>
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#6B6560", lineHeight: 1.7, marginBottom: "1.1rem" }}>{tool.desc}</div>
                  <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" as const, marginBottom: "1.25rem" }}>
                    {tool.meta.map(m => (
                      <div key={m} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.75rem", color: "#9A948E" }}>
                        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#12A396" }} />{m}
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: "0.75rem" }}>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" as const }}>
                      {tool.tags.map(tag => <span key={tag} style={s.tag}>{tag}</span>)}
                    </div>
                    <Link to={tool.href!} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#0F2140", color: "white", padding: "0.6rem 1.25rem", borderRadius: 8, fontSize: "0.82rem", fontWeight: 500, textDecoration: "none" }}>
                      Open Tool →
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
          <div style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#9A948E", whiteSpace: "nowrap" }}>Coming Soon</div>
          <div style={{ flex: 1, height: 1, background: "#DDD8CE" }} />
        </div>

        {/* Coming soon */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {tools.filter(t => t.status === "soon").map(tool => (
            <div key={tool.id} style={{ ...s.card, opacity: 0.82 }}>
              <div style={{ display: "flex" }}>
                <div style={s.accent(false)} />
                <div style={{ padding: "1.75rem 1.5rem" }}>
                  <div style={s.icon(false)}>
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                      <rect x="3" y="5" width="20" height="16" rx="2" stroke="#B4B2A9" strokeWidth="1.5"/>
                      <path d="M3 10h20" stroke="#B4B2A9" strokeWidth="1.5"/>
                      <path d="M8 15h4" stroke="#B4B2A9" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M8 18h6" stroke="#B4B2A9" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
                <div style={{ flex: 1, padding: "1.75rem 1.5rem 1.75rem 0" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "0.6rem", flexWrap: "wrap" as const }}>
                    <div style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "1.05rem", fontWeight: 600, color: "#0F2140" }}>{tool.name}</div>
                    <span style={{ fontSize: "0.63rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const, background: "#F1EFE8", color: "#6B6560", padding: "2px 9px", borderRadius: 20 }}>Coming Soon</span>
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#6B6560", lineHeight: 1.7, marginBottom: "1.1rem" }}>{tool.desc}</div>
                  <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" as const, marginBottom: "1.25rem" }}>
                    {tool.meta.map(m => (
                      <div key={m} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.75rem", color: "#9A948E" }}>
                        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#DDD8CE" }} />{m}
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: "0.75rem" }}>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" as const }}>
                      {tool.tags.map(tag => <span key={tag} style={s.tag}>{tag}</span>)}
                    </div>
                    <div style={{ display: "inline-flex", alignItems: "center", background: "#F8F6F1", color: "#6B6560", padding: "0.6rem 1.25rem", borderRadius: 8, fontSize: "0.82rem", fontWeight: 500, border: "1px solid #DDD8CE" }}>
                      Coming Soon
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div style={{ marginTop: "3rem", padding: "1.25rem 1.5rem", background: "#0F2140", borderRadius: 12, display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" as const }}>
          <div style={{ fontSize: "0.82rem", color: "#8BA3C0", lineHeight: 1.6, flex: 1 }}>
            Tool results are for reference only and do not constitute legal advice. <strong style={{ color: "#E8B84B" }}>Need expert guidance?</strong> AsiaDPO provides DPO outsourcing, multi-jurisdiction compliance planning, and international certification advisory.
          </div>
          <a href="mailto:dpo@asiadpo.top" style={{ display: "inline-block", background: "#C8922A", color: "white", padding: "0.6rem 1.25rem", borderRadius: 8, fontSize: "0.82rem", fontWeight: 600, textDecoration: "none" }}>
            Book a Consultation →
          </a>
        </div>

      </div>
      <Footer />
    </div>
  );
}
