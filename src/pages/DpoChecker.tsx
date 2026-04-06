import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── TYPES ─────────────────────────────────────────────────────────────────────

type Status = "mandatory" | "conditional" | "recommended";

interface EvalResult {
  status: Status;
  reason: string;
  escalation?: string | null;
  note?: string | null;
}

interface Jurisdiction {
  name: string;
  flag: string;
  law: string;
  penalty: string;
  url: string;
  eval: (a: Answers) => EvalResult;
}

interface Answers {
  countries: string[];
  emp: string;
  vol: string;
  dt: string[];
  cb: string;
  sm: string;
  cda: string;
  pa: string;
  ps: string;
  hasDPO: string;
  concern: string;
}

// ── DECISION LOGIC ────────────────────────────────────────────────────────────

const J: Record<string, Jurisdiction> = {
  SG: {
    name: "新加坡", flag: "🇸🇬", law: "PDPA S.11(3)",
    penalty: "SGD 100万或年营业额10%（以较高者为准）",
    url: "https://sso.agc.gov.sg/Act/PDPA2012",
    eval: () => ({
      status: "mandatory",
      reason: "新加坡PDPA S.11(3)要求所有处理个人数据的机构强制任命DPO，无规模门槛，适用于所有私营机构。",
    }),
  },
  MY: {
    name: "马来西亚", flag: "🇲🇾", law: "PDPA Amendment S.12A",
    penalty: "RM 1,000,000 及/或3年监禁",
    url: "https://www.pdp.gov.my/ppdpv1/en/faq/",
    eval: (a) => {
      const sens = a.dt.some(d => ["biometric","health","financial","children"].includes(d));
      const v = a.vol;
      if (["20k_100k","100k_1m","over_1m"].includes(v))
        return { status: "mandatory", reason: "过去12个月处理数据主体超过20,000名，触发马来西亚PDPA S.12A强制任命（2025年6月1日起）。" };
      if (sens && ["10k_20k","20k_100k","100k_1m","over_1m"].includes(v))
        return { status: "mandatory", reason: "处理超过10,000名敏感数据主体，触发马来西亚PDPA S.12A强制任命要求。" };
      if (a.sm === "yes")
        return { status: "mandatory", reason: "核心业务涉及系统性常规监控活动，触发马来西亚PDPA S.12A第三项强制条件。" };
      return { status: "recommended", reason: "当前数据规模低于强制门槛，建议任命DPO为未来扩张做准备。" };
    },
  },
  ID: {
    name: "印度尼西亚", flag: "🇮🇩", law: "PDP Law 27/2022 Art.53(1)",
    penalty: "行政：年营收2% / 刑事：IDR 40–60亿",
    url: "https://jdih.komdigi.go.id/produk_hukum/view/id/123/",
    eval: (a) => {
      const sens = a.dt.some(d => ["biometric","health","financial","children","location"].includes(d));
      if (a.ps === "yes")
        return { status: "mandatory", reason: "业务涉及公共服务目的数据处理，依宪法法院2025年7月裁决（任一条件触发），强制任命DPO。" };
      if (a.sm === "yes")
        return { status: "mandatory", reason: "核心业务含大规模系统性监控，依印度尼西亚PDP Law Art.53(1)强制任命DPO。" };
      if (sens && ["20k_100k","100k_1m","over_1m"].includes(a.vol))
        return { status: "mandatory", reason: "大规模处理敏感个人数据（含位置追踪数据），依印度尼西亚PDP Law Art.53(1)强制任命DPO。" };
      return { status: "conditional", reason: "\"大规模\"定义尚待实施条例（RPP PDP）明确，建议保守评估；涉及敏感数据处理建议提前任命。" };
    },
  },
  TH: {
    name: "泰国", flag: "🇹🇭", law: "PDPA S.41 + Notification B.E. 2566",
    penalty: "THB 100万（DPO专项，S.82）",
    url: "https://www.ratchakitcha.soc.go.th/DATA/PDF/2566/A/095/T_0036.PDF",
    eval: (a) => {
      const sens = a.dt.some(d => ["biometric","health"].includes(d));
      if (a.pa === "yes")
        return { status: "mandatory", reason: "属于PDPC指定的公共机构，依泰国PDPA S.41(1)强制任命DPO（2023年12月13日起）。" };
      if (a.cda === "yes" && a.sm === "yes")
        return { status: "mandatory", reason: "核心业务同时涉及大规模处理且系统性监控，满足泰国PDPA S.41(2)两项条件，强制任命DPO。" };
      if (a.cda === "yes" && sens)
        return { status: "mandatory", reason: "核心业务处理第26条敏感数据（生物特征/健康），依泰国PDPA S.41(3)强制任命DPO。" };
      return { status: "recommended", reason: "当前活动未触发PDPA S.41三项替代条件，建议任命DPO作为最佳实践。" };
    },
  },
  VN: {
    name: "越南", flag: "🇻🇳", law: "PDPL Law No.91/2025/QH15 Art.33",
    penalty: "VND 30亿或年营收5%（以较高者为准）",
    url: "https://thuvienphapluat.vn/van-ban/EN/Bo-may-hanh-chinh/Law-91-2025-QH15-Personal-Data-Protection/665440/tieng-anh.aspx",
    eval: (a) => {
      const sens = a.dt.some(d => ["biometric","health","financial","children","location"].includes(d));
      const cb = a.cb === "yes";
      const hasLocation = a.dt.includes("location");
      let escalation: string | null = null;
      if (cb && sens && hasLocation)
        escalation = "涉及跨境传输、金融/位置等敏感数据，多重风险叠加，建议优先建立完整DPO合规体系，并在60天内提交数据处理影响评估（DPIA）及跨境传输影响评估（CTIA）。";
      else if (cb && sens)
        escalation = "涉及跨境传输且处理敏感数据，双重风险叠加，建议优先建立完整DPO合规体系并进行数据处理影响评估（DPIA）及跨境传输影响评估（CTIA）。";
      else if (cb)
        escalation = "涉及跨境数据传输，须同步满足越南PDPL跨境传输规定，建议DPO尽早介入并提交跨境传输影响评估（CTIA）。";
      else if (sens)
        escalation = "处理敏感数据（含位置追踪数据）增加监管风险，建议DPO优先建立敏感数据处理规程及数据处理影响评估（DPIA）机制。";
      return {
        status: "mandatory",
        reason: "越南PDPL 2025（Law No. 91/2025/QH15，2026年1月1日起）要求所有处理个人数据的组织强制任命DPO。微型企业豁免，初创企业享5年宽限期。",
        escalation,
      };
    },
  },
  PH: {
    name: "菲律宾", flag: "🇵🇭", law: "RA 10173 S.21 + IRR S.26(a)",
    penalty: "PHP 500万（刑事及行政）",
    url: "https://privacy.gov.ph/data-privacy-act/",
    eval: (a) => {
      const reg = ["251_500","over_500"].includes(a.emp);
      return {
        status: "mandatory",
        reason: "菲律宾RA 10173 S.21要求所有个人信息控制者（PIC）及处理者（PIP）强制任命DPO，无规模门槛。",
        note: reg ? "员工超250人，须向NPC进行DPO及数据处理系统注册登记。" : null,
      };
    },
  },
};

const URL_LABEL: Record<string, string> = {
  SG: "sso.agc.gov.sg/Act/PDPA2012",
  MY: "pdp.gov.my/ppdpv1/en/faq/",
  ID: "jdih.komdigi.go.id",
  TH: "ratchakitcha.soc.go.th",
  VN: "thuvienphapluat.vn — Law 91/2025/QH15",
  PH: "privacy.gov.ph/data-privacy-act/",
};

const URL_OFFICIAL: Record<string, string> = {
  SG: "新加坡法规数据库", MY: "马来西亚JPDP官方", ID: "印尼Komdigi官方",
  TH: "泰国皇家公报", VN: "越南司法部官方库", PH: "菲律宾NPC官方",
};

// ── INITIAL STATE ─────────────────────────────────────────────────────────────

const INIT: Answers = {
  countries: [], emp: "", vol: "", dt: [], cb: "", sm: "",
  cda: "", pa: "", ps: "", hasDPO: "", concern: "",
};

// ── BADGE COMPONENT ───────────────────────────────────────────────────────────

const Badge = ({ status }: { status: Status }) => {
  const map = {
    mandatory: { label: "强制任命", bg: "#FFE8E8", color: "#A32D2D" },
    conditional: { label: "建议任命（待明确）", bg: "#FFF4E0", color: "#633806" },
    recommended: { label: "建议任命", bg: "#EAF3DE", color: "#27500A" },
  };
  const s = map[status];
  return (
    <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: 20, fontSize: "0.72rem", fontWeight: 600, background: s.bg, color: s.color, whiteSpace: "nowrap" }}>
      {s.label}
    </span>
  );
};

// ── OPTION COMPONENT ──────────────────────────────────────────────────────────

const Opt = ({ label, sub, selected, onClick, radio = false }: {
  label: string; sub?: string; selected: boolean; onClick: () => void; radio?: boolean;
}) => (
  <div onClick={onClick} style={{
    display: "flex", alignItems: sub ? "flex-start" : "center", gap: "0.7rem",
    padding: "0.8rem 1rem", border: `1.5px solid ${selected ? "#0D7A6E" : "#DDD8CE"}`,
    borderRadius: 8, cursor: "pointer", fontSize: "0.88rem",
    background: selected ? "#EBF7F5" : "#FAFAF8", color: selected ? "#0D7A6E" : "#1A1A1A",
    fontWeight: selected ? 500 : 400, transition: "all 0.18s", userSelect: "none",
  }}>
    <div style={{
      width: 17, height: 17, flexShrink: 0,
      border: `2px solid ${selected ? "#0D7A6E" : "#DDD8CE"}`,
      borderRadius: radio ? "50%" : 4,
      background: selected ? "#0D7A6E" : "transparent",
      position: "relative", marginTop: sub ? 2 : 0,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {selected && (
        radio
          ? <div style={{ width: 7, height: 7, borderRadius: "50%", background: "white" }} />
          : <div style={{ width: 6, height: 10, border: "2px solid white", borderTop: "none", borderLeft: "none", transform: "rotate(45deg)", marginTop: -2 }} />
      )}
    </div>
    <div>
      <div>{label}</div>
      {sub && <div style={{ fontSize: "0.75rem", color: selected ? "#0D7A6E" : "#6B6560", marginTop: 2, opacity: 0.85 }}>{sub}</div>}
    </div>
  </div>
);

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function DpoChecker() {
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Answers>({ ...INIT });
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  const TOTAL = 5;
  const next = () => { setStep(s => s + 1); window.scrollTo(0, 0); };
  const back = () => { setStep(s => s - 1); window.scrollTo(0, 0); };

  const toggleCountry = (c: string) =>
    setA(prev => ({ ...prev, countries: prev.countries.includes(c) ? prev.countries.filter(x => x !== c) : [...prev.countries, c] }));

  const toggleDt = (v: string) =>
    setA(prev => ({ ...prev, dt: prev.dt.includes(v) ? prev.dt.filter(x => x !== v) : [...prev.dt, v] }));

  const pick = (field: keyof Answers, v: string) =>
    setA(prev => ({ ...prev, [field]: v }));

  const c3Valid = () => {
    if (!a.cb || !a.sm) return false;
    if ((a.countries.includes("TH") || a.countries.includes("ID")) && !a.cda) return false;
    if (a.countries.includes("TH") && !a.pa) return false;
    if (a.countries.includes("ID") && !a.ps) return false;
    return true;
  };

  const results = a.countries.map(c => ({ code: c, j: J[c], r: J[c].eval(a) }));
  const mand = results.filter(x => x.r.status === "mandatory").length;
  const cond = results.filter(x => x.r.status === "conditional").length;
  const rec = results.filter(x => x.r.status === "recommended").length;

  const steps = [
    "优先在<strong>强制任命</strong>司法管辖区内指定或任命合规DPO，明确其职责边界与汇报线。",
    ...(cond > 0 ? ["针对<strong>条件强制</strong>国家（印尼），在实施细则明确前按强制要求保守准备，不建议等待RPP PDP发布。"] : []),
    ...(a.cb === "yes" ? ["制定<strong>跨境数据传输合规方案</strong>，确保标准合同条款（SCC）或等效保障措施到位，重点关注越南出境合规及跨境传输影响评估（CTIA）提交义务。"] : []),
    "建立<strong>数据保护影响评估（DPIA）机制</strong>，优先评估高风险处理活动。",
    "设定<strong>季度合规复查节点</strong>，印尼实施条例及韩国2026年9月截止日为近期重点关注事项。",
  ];

  // ── STYLES ──
  const card: React.CSSProperties = { background: "#fff", border: "1px solid #DDD8CE", borderRadius: 12, padding: "1.75rem", marginBottom: "1.25rem", boxShadow: "0 2px 12px rgba(15,33,64,0.06)" };
  const moduleTag: React.CSSProperties = { display: "inline-block", fontSize: "0.66rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#0D7A6E", border: "1px solid #12A396", borderRadius: 20, padding: "2px 9px", marginBottom: "0.65rem" };
  const qTitle: React.CSSProperties = { fontFamily: "'Noto Serif SC', serif", fontSize: "1.05rem", fontWeight: 600, color: "#0F2140", marginBottom: "0.35rem", lineHeight: 1.5 };
  const qHint: React.CSSProperties = { fontSize: "0.79rem", color: "#6B6560", marginBottom: "1.1rem", lineHeight: 1.6 };
  const grid2: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" };
  const btnPrimary: React.CSSProperties = { background: "#0F2140", color: "white", padding: "0.7rem 1.6rem", borderRadius: 8, fontSize: "0.88rem", fontWeight: 500, cursor: "pointer", border: "none", fontFamily: "inherit" };
  const btnSecondary: React.CSSProperties = { background: "transparent", color: "#6B6560", padding: "0.7rem 1.6rem", borderRadius: 8, fontSize: "0.88rem", fontWeight: 500, cursor: "pointer", border: "1px solid #DDD8CE", fontFamily: "inherit" };
  const nav: React.CSSProperties = { display: "flex", gap: "1rem", marginTop: "1.4rem", justifyContent: "space-between", alignItems: "center" };
  const penaltyRow: React.CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderTop: "1px solid #DDD8CE", fontSize: "0.8rem", gap: 12 };

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: "#F8F6F1", minHeight: "100vh" }}>
      <Navbar />

      {/* Progress bar */}
      {step < TOTAL && (
        <div style={{ background: "#1B3A5C", padding: "0.65rem 2rem", display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ display: "flex", gap: "0.4rem", flex: 1 }}>
            {Array.from({ length: TOTAL }).map((_, i) => (
              <div key={i} style={{
                height: 8, borderRadius: i === step ? 4 : "50%",
                width: i === step ? 28 : 8,
                background: i < step ? "#12A396" : i === step ? "#E8B84B" : "#3A5A80",
                transition: "all 0.3s",
              }} />
            ))}
          </div>
          <div style={{ fontSize: "0.7rem", color: "#8BA3C0", whiteSpace: "nowrap" }}>
            第 {step + 1} 步，共 {TOTAL} 步
          </div>
        </div>
      )}

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>

        {/* ── STEP 0: Countries ── */}
        {step === 0 && (
          <div style={card}>
            <div style={moduleTag}>步骤一 · 目标市场</div>
            <div style={qTitle}>您正在进入或计划进入哪些ASEAN市场？</div>
            <div style={qHint}>可多选，系统将逐一评估各国DPO任命要求。</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0.6rem" }}>
              {["SG","MY","ID","TH","VN","PH"].map(c => {
                const j = J[c];
                const sel = a.countries.includes(c);
                return (
                  <div key={c} onClick={() => toggleCountry(c)} style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: "0.35rem",
                    padding: "0.9rem 0.5rem", border: `1.5px solid ${sel ? "#0D7A6E" : "#DDD8CE"}`,
                    borderRadius: 10, cursor: "pointer", textAlign: "center",
                    background: sel ? "#EBF7F5" : "#FAFAF8", transition: "all 0.18s",
                  }}>
                    <div style={{ fontSize: "1.8rem" }}>{j.flag}</div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 500, color: sel ? "#0D7A6E" : "#0F2140" }}>{j.name}</div>
                    <div style={{ fontSize: "0.62rem", color: "#6B6560", fontFamily: "monospace" }}>{j.law.split("+")[0].trim()}</div>
                  </div>
                );
              })}
            </div>
            <div style={nav}>
              <div />
              <button style={{ ...btnPrimary, opacity: a.countries.length === 0 ? 0.5 : 1 }}
                disabled={a.countries.length === 0} onClick={next}>下一步 →</button>
            </div>
          </div>
        )}

        {/* ── STEP 1: Scale ── */}
        {step === 1 && (
          <>
            <div style={card}>
              <div style={moduleTag}>步骤二 · 企业规模</div>
              <div style={qTitle}>您的全球员工总数是？</div>
              <div style={qHint}>用于评估菲律宾NPC注册要求（超250人须额外注册）。</div>
              <div style={grid2}>
                {[["under_50","50人以下"],["50_250","50–250人"],["251_500","251–500人"],["over_500","500人以上"]].map(([v,l]) => (
                  <Opt key={v} label={l} selected={a.emp === v} onClick={() => pick("emp", v)} radio />
                ))}
              </div>
            </div>
            <div style={card}>
              <div style={moduleTag}>步骤二 · 数据规模</div>
              <div style={qTitle}>过去12个月，您处理了多少名独立个人的数据？</div>
              <div style={qHint}>包括客户、用户、员工等，以独立个体计算。</div>
              <div style={grid2}>
                {[["under_10k","10,000人以下"],["10k_20k","10,000–20,000人"],["20k_100k","20,000–100,000人"],["100k_1m","10万–100万人"],["over_1m","100万人以上"],["not_sure","不确定"]].map(([v,l]) => (
                  <Opt key={v} label={l} selected={a.vol === v} onClick={() => pick("vol", v)} radio />
                ))}
              </div>
              <div style={nav}>
                <button style={btnSecondary} onClick={back}>← 返回</button>
                <button style={{ ...btnPrimary, opacity: (!a.emp || !a.vol) ? 0.5 : 1 }}
                  disabled={!a.emp || !a.vol} onClick={next}>下一步 →</button>
              </div>
            </div>
          </>
        )}

        {/* ── STEP 2: Data types ── */}
        {step === 2 && (
          <div style={card}>
            <div style={moduleTag}>步骤三 · 数据类型</div>
            <div style={qTitle}>您处理以下哪些类型的个人数据？</div>
            <div style={qHint}>可多选。生物特征、健康、金融、儿童、位置数据属于敏感数据，会触发更严格的合规要求。</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                ["biometric","生物特征数据","指纹、面部识别、声纹、虹膜等"],
                ["health","健康/医疗数据","病历、基因信息、身体状况"],
                ["financial","金融/财务数据","银行账户、信用记录、支付数据"],
                ["children","儿童数据","未满18岁用户数据"],
                ["employee","员工数据","人力资源、绩效、薪酬记录"],
                ["location","位置/追踪数据","GPS轨迹、行为追踪、持续监控"],
              ].map(([v,l,sub]) => (
                <Opt key={v} label={l} sub={sub} selected={a.dt.includes(v)} onClick={() => toggleDt(v)} />
              ))}
              <Opt label="以上均不涉及（仅基础联系/交易数据）" selected={a.dt.length === 0}
                onClick={() => setA(prev => ({ ...prev, dt: [] }))} radio />
            </div>
            <div style={nav}>
              <button style={btnSecondary} onClick={back}>← 返回</button>
              <button style={btnPrimary} onClick={next}>下一步 →</button>
            </div>
          </div>
        )}

        {/* ── STEP 3: Activities ── */}
        {step === 3 && (
          <>
            <div style={card}>
              <div style={moduleTag}>步骤四 · 数据处理活动</div>
              <div style={qTitle}>您是否进行跨境个人数据传输？</div>
              <div style={qHint}>例如：将东南亚用户数据传输至境外服务器，或使用境外云服务商。</div>
              <div style={grid2}>
                {[["yes","是"],["no","否"]].map(([v,l]) => (
                  <Opt key={v} label={l} selected={a.cb === v} onClick={() => pick("cb", v)} radio />
                ))}
              </div>
            </div>
            <div style={card}>
              <div style={moduleTag}>步骤四 · 数据处理活动</div>
              <div style={qTitle}>您的核心业务是否涉及对个人的系统性常规监控？</div>
              <div style={qHint}>例如持续追踪用户位置、行为画像、CCTV大规模分析、在线行为定向广告。</div>
              <div style={grid2}>
                {[["yes","是"],["no","否"]].map(([v,l]) => (
                  <Opt key={v} label={l} selected={a.sm === v} onClick={() => pick("sm", v)} radio />
                ))}
              </div>
            </div>
            {(a.countries.includes("TH") || a.countries.includes("ID")) && (
              <div style={card}>
                <div style={moduleTag}>步骤四 · 泰国/印尼专项</div>
                <div style={qTitle}>数据处理是否是您业务的核心活动？</div>
                <div style={qHint}>即公司主要服务的交付依赖于数据处理。</div>
                <div style={grid2}>
                  {[["yes","是，数据处理是核心业务"],["no","否，数据处理是辅助性的"]].map(([v,l]) => (
                    <Opt key={v} label={l} selected={a.cda === v} onClick={() => pick("cda", v)} radio />
                  ))}
                </div>
              </div>
            )}
            {a.countries.includes("TH") && (
              <div style={card}>
                <div style={moduleTag}>步骤四 · 泰国专项（PDPA S.41(1)）</div>
                <div style={qTitle}>您是否属于PDPC指定的政府公共机构？</div>
                <div style={qHint}>适用于泰国PDPA S.41(1)。私营企业通常选"否"。</div>
                <div style={grid2}>
                  {[["yes","是（公共机构）"],["no","否（私营企业）"]].map(([v,l]) => (
                    <Opt key={v} label={l} selected={a.pa === v} onClick={() => pick("pa", v)} radio />
                  ))}
                </div>
              </div>
            )}
            {a.countries.includes("ID") && (
              <div style={card}>
                <div style={moduleTag}>步骤四 · 印尼专项（PDP Law Art.53）</div>
                <div style={qTitle}>您的业务是否涉及公共服务目的的数据处理？</div>
                <div style={qHint}>例如：公共交通、公共卫生、政府委托服务等。多数商业企业选"否"。</div>
                <div style={grid2}>
                  {[["yes","是"],["no","否，商业服务"]].map(([v,l]) => (
                    <Opt key={v} label={l} selected={a.ps === v} onClick={() => pick("ps", v)} radio />
                  ))}
                </div>
              </div>
            )}
            <div style={nav}>
              <button style={btnSecondary} onClick={back}>← 返回</button>
              <button style={{ ...btnPrimary, opacity: !c3Valid() ? 0.5 : 1 }}
                disabled={!c3Valid()} onClick={next}>下一步 →</button>
            </div>
          </>
        )}

        {/* ── STEP 4: Optional ── */}
        {step === 4 && (
          <div style={card}>
            <div style={moduleTag}>步骤五 · 可选补充</div>
            <div style={qTitle}>以下信息有助于提供更个性化建议（选填）</div>
            <div style={qHint}>可直接跳过查看结果。</div>
            <div style={{ marginBottom: "1.25rem" }}>
              <div style={{ fontSize: "0.85rem", fontWeight: 500, color: "#0F2140", marginBottom: "0.5rem" }}>您目前是否已在任何司法管辖区任命DPO？</div>
              <div style={grid2}>
                {[["yes","是，已任命"],["no","尚未任命"],["partial","部分已任命"]].map(([v,l]) => (
                  <Opt key={v} label={l} selected={a.hasDPO === v} onClick={() => pick("hasDPO", v)} radio />
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: "0.85rem", fontWeight: 500, color: "#0F2140", marginBottom: "0.5rem" }}>您当前最主要的合规关切是？</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {[["fines","规避监管罚款风险"],["expansion","准备市场扩张"],["due_diligence","应对客户尽职调查"],["certification","获取合规认证（DPTM/ISO）"]].map(([v,l]) => (
                  <Opt key={v} label={l} selected={a.concern === v} onClick={() => pick("concern", v)} radio />
                ))}
              </div>
            </div>
            <div style={nav}>
              <button style={btnSecondary} onClick={back}>← 返回</button>
              <button style={btnPrimary} onClick={next}>生成评估报告 →</button>
            </div>
            <div style={{ textAlign: "center", marginTop: "0.75rem" }}>
              <span style={{ fontSize: "0.78rem", color: "#6B6560", cursor: "pointer", textDecoration: "underline" }} onClick={next}>
                跳过，直接查看结果
              </span>
            </div>
          </div>
        )}

        {/* ── RESULTS ── */}
        {step === 5 && (
          <>
            {/* Header */}
            <div style={{ background: "#0F2140", borderRadius: 12, padding: "1.75rem 2rem", color: "white", marginBottom: "1.25rem" }}>
              <div style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "1.35rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                关于DPO聘用的可行性建议
              </div>
              <div style={{ fontSize: "0.82rem", color: "#8BA3C0" }}>
                基于{results.length}个目标市场的分析 · AsiaDPO合规评估报告
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
                {["2026年4月法规版本", ...(a.cb === "yes" ? ["跨境传输：是"] : []), ...(a.dt.length > 0 ? ["含敏感数据"] : [])].map(tag => (
                  <span key={tag} style={{ fontSize: "0.68rem", background: "rgba(255,255,255,0.1)", color: "#B8CCDE", padding: "2px 9px", borderRadius: 20 }}>{tag}</span>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem", marginBottom: "1.25rem" }}>
              {[[mand,"强制任命国家","#A32D2D"],[cond,"条件强制国家","#854F0B"],[rec,"建议任命国家","#3B6D11"]].map(([num, label, color]) => (
                <div key={label as string} style={{ background: "#fff", border: "1px solid #DDD8CE", borderRadius: 10, padding: "1.1rem", textAlign: "center" }}>
                  <div style={{ fontSize: "1.9rem", fontWeight: 600, fontFamily: "monospace", color: color as string, marginBottom: "0.2rem" }}>{num as number}</div>
                  <div style={{ fontSize: "0.75rem", color: "#6B6560" }}>{label as string}</div>
                </div>
              ))}
            </div>

            {/* Jurisdiction cards */}
            <div style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6B6560", margin: "1.25rem 0 0.6rem" }}>
              各司法管辖区评估结果
            </div>
            {results.map(({ code, j, r }) => (
              <div key={code} style={{ background: "#fff", border: "1px solid #DDD8CE", borderRadius: 10, marginBottom: "0.85rem", overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem 1.25rem", borderBottom: "1px solid #DDD8CE" }}>
                  <div style={{ fontSize: "1.5rem" }}>{j.flag}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "1rem", fontWeight: 600, color: "#0F2140" }}>
                      {j.name} <Badge status={r.status} />
                    </div>
                    <div style={{ fontSize: "0.68rem", color: "#6B6560", fontFamily: "monospace", marginTop: 2 }}>{j.law}</div>
                  </div>
                </div>
                <div style={{ padding: "1rem 1.25rem" }}>
                  <div style={{ fontSize: "0.85rem", lineHeight: 1.65, color: "#1A1A1A", marginBottom: "0.75rem" }}>{r.reason}</div>
                  {r.escalation && (
                    <div style={{ display: "flex", gap: "0.6rem", background: "#FFF5E8", border: "1px solid #F0A060", borderRadius: 6, padding: "0.75rem 1rem", marginBottom: "0.6rem", fontSize: "0.8rem", color: "#7A3E00", lineHeight: 1.55 }}>
                      <span>⚠</span><span>{r.escalation}</span>
                    </div>
                  )}
                  {r.note && (
                    <div style={{ display: "flex", gap: "0.6rem", background: "#EBF7F5", border: "1px solid #12A396", borderRadius: 6, padding: "0.75rem 1rem", marginBottom: "0.6rem", fontSize: "0.8rem", color: "#085041", lineHeight: 1.55 }}>
                      <span>ℹ</span><span>{r.note}</span>
                    </div>
                  )}
                  <div style={penaltyRow}>
                    <span style={{ color: "#6B6560" }}>最高罚款</span>
                    <span style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#A32D2D", fontWeight: 500 }}>{j.penalty}</span>
                  </div>
                  <div style={{ ...penaltyRow, alignItems: "flex-start" }}>
                    <span style={{ color: "#6B6560", flexShrink: 0 }}>官方法律来源</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap", justifyContent: "flex-end" }}>
                      <a href={j.url} target="_blank" rel="noreferrer" style={{ fontFamily: "monospace", fontSize: "0.68rem", color: "#0D7A6E", textDecoration: "none" }}>{URL_LABEL[code]}</a>
                      <span style={{ fontSize: "0.63rem", background: "#E1F5EE", color: "#085041", padding: "1px 6px", borderRadius: 10 }}>{URL_OFFICIAL[code]}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Next steps */}
            <div style={{ background: "#fff", border: "1px solid #DDD8CE", borderRadius: 12, padding: "1.5rem", marginBottom: "1.25rem" }}>
              <div style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "1rem", fontWeight: 600, color: "#0F2140", marginBottom: "1rem" }}>建议下一步行动</div>
              <ul style={{ listStyle: "none" }}>
                {steps.map((t, i) => (
                  <li key={i} style={{ display: "flex", gap: "0.85rem", padding: "0.7rem 0", borderBottom: i < steps.length - 1 ? "1px solid #DDD8CE" : "none", fontSize: "0.85rem", lineHeight: 1.6 }}>
                    <div style={{ width: 22, height: 22, flexShrink: 0, background: "#0F2140", color: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.68rem", fontWeight: 600, marginTop: 2 }}>{i + 1}</div>
                   <div style={{ color: "#1A1A1A" }} dangerouslySetInnerHTML={{ __html: t }} />
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div style={{ background: "linear-gradient(135deg,#0F2140 0%,#1B3A5C 100%)", borderRadius: 12, padding: "1.75rem", color: "white", textAlign: "center", border: "1px solid #C8922A", marginBottom: "1.25rem" }}>
              <div style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.4rem", color: "#E8B84B" }}>需要专业DPO合规顾问？</div>
              <div style={{ fontSize: "0.84rem", color: "#B8CCDE", marginBottom: "1.25rem", lineHeight: 1.7 }}>
                我们专注于东南亚地区的跨境数据合规需求，提供DPO外包任命、多辖区合规规划及国际认证咨询。留下您的邮件，我们将尽快与您取得联系。
              </div>
              {!submitted ? (
                <>
                  <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="您的工作邮箱"
                    style={{ width: "100%", padding: "0.7rem 1rem", borderRadius: 8, border: "1px solid #3A5A80", background: "rgba(255,255,255,0.08)", color: "white", fontSize: "0.88rem", fontFamily: "inherit", marginBottom: "0.6rem", outline: "none" }} />
                  <input value={company} onChange={e => setCompany(e.target.value)} type="text" placeholder="公司名称（可选）"
                    style={{ width: "100%", padding: "0.7rem 1rem", borderRadius: 8, border: "1px solid #3A5A80", background: "rgba(255,255,255,0.08)", color: "white", fontSize: "0.88rem", fontFamily: "inherit", marginBottom: "0.6rem", outline: "none" }} />
                  <button onClick={() => { if (email.includes("@")) setSubmitted(true); }}
                    style={{ background: "#C8922A", color: "white", padding: "0.8rem 2rem", borderRadius: 8, fontSize: "0.88rem", fontWeight: 600, border: "none", cursor: "pointer", fontFamily: "inherit", width: "100%" }}>
                    预约免费咨询 →
                  </button>
                </>
              ) : (
                <div style={{ fontSize: "0.88rem", color: "#E8B84B", padding: "0.75rem" }}>✓ 已收到！我们将尽快与您取得联系。</div>
              )}
            </div>

            {/* Disclaimer */}
            <div style={{ fontSize: "0.73rem", color: "#9A948E", lineHeight: 1.7, padding: "0.85rem 1rem", background: "#F5F3EE", borderRadius: 8, borderLeft: "3px solid #DDD8CE" }}>
              本报告仅供参考，不构成法律意见。法规持续变化，建议在重大合规决策前咨询具备相关司法管辖区执照的数据保护律师。部分国家实施细则或官方解释尚未发布，部分结论存在不确定性。考虑数据时效性，建议定期复查。
            </div>

            {/* Reset */}
            <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "space-between" }}>
              <button style={btnSecondary} onClick={() => { setStep(0); setA({ ...INIT }); setSubmitted(false); setEmail(""); setCompany(""); window.scrollTo(0, 0); }}>
                ← 重新评估
              </button>
              <button style={btnPrimary} onClick={() => window.print()}>打印报告</button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
