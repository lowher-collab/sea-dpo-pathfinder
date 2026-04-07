import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

const J: Record<string, Jurisdiction> = {
  SG: {
    name: "Singapore", flag: "🇸🇬", law: "PDPA S.11(3)",
    penalty: "SGD 1M or 10% of annual turnover (whichever is higher)",
    url: "https://sso.agc.gov.sg/Act/PDPA2012",
    eval: () => ({
      status: "mandatory",
      reason: "Singapore's PDPA S.11(3) requires every organisation that handles personal data to appoint a DPO. There is no size or volume threshold — it applies to all private-sector organisations.",
    }),
  },
  MY: {
    name: "Malaysia", flag: "🇲🇾", law: "PDPA Amendment S.12A",
    penalty: "RM 1,000,000 and/or 3 years imprisonment",
    url: "https://www.pdp.gov.my/ppdpv1/en/faq/",
    eval: (a) => {
      const sens = a.dt.some(d => ["biometric","health","financial","children"].includes(d));
      const v = a.vol;
      if (["20k_100k","100k_1m","over_1m"].includes(v))
        return { status: "mandatory", reason: "You have processed more than 20,000 unique individuals' data in the past 12 months, triggering mandatory DPO appointment under Malaysia's PDPA S.12A (effective 1 June 2025)." };
      if (sens && ["10k_20k","20k_100k","100k_1m","over_1m"].includes(v))
        return { status: "mandatory", reason: "You process sensitive personal data (biometric/health/financial/children) of more than 10,000 individuals, triggering mandatory DPO appointment under Malaysia's PDPA S.12A." };
      if (a.sm === "yes")
        return { status: "mandatory", reason: "Your core activities involve regular and systematic monitoring of individuals, triggering the third mandatory condition under Malaysia's PDPA S.12A." };
      return { status: "recommended", reason: "Your current data volume is below the mandatory threshold and systematic monitoring is not identified. Appointing a DPO is recommended to prepare for future growth." };
    },
  },
  ID: {
    name: "Indonesia", flag: "🇮🇩", law: "PDP Law 27/2022 Art.53(1)",
    penalty: "Administrative: 2% of annual revenue / Criminal: IDR 4–6 billion",
    url: "https://jdih.komdigi.go.id/produk_hukum/view/id/123/",
    eval: (a) => {
      const sens = a.dt.some(d => ["biometric","health","financial","children","location"].includes(d));
      if (a.ps === "yes")
        return { status: "mandatory", reason: "Your activities involve processing personal data for public service purposes. Following the Constitutional Court ruling of July 2025 (any single condition triggers the obligation), DPO appointment is mandatory." };
      if (a.sm === "yes")
        return { status: "mandatory", reason: "Your core activities involve large-scale systematic monitoring, triggering mandatory DPO appointment under Indonesia's PDP Law Art.53(1)." };
      if (sens && ["20k_100k","100k_1m","over_1m"].includes(a.vol))
        return { status: "mandatory", reason: "You process sensitive personal data (including location/tracking data) at large scale, triggering mandatory DPO appointment under Indonesia's PDP Law Art.53(1)." };
      return { status: "conditional", reason: "The definition of 'large scale' is pending clarification in the implementing regulation (RPP PDP). If sensitive data is involved, a conservative approach — treating appointment as mandatory — is strongly advised." };
    },
  },
  TH: {
    name: "Thailand", flag: "🇹🇭", law: "PDPA S.41 + Notification B.E. 2566",
    penalty: "THB 1,000,000 (DPO-specific, S.82)",
    url: "https://www.ratchakitcha.soc.go.th/DATA/PDF/2566/A/095/T_0036.PDF",
    eval: (a) => {
      const sens = a.dt.some(d => ["biometric","health"].includes(d));
      if (a.pa === "yes")
        return { status: "mandatory", reason: "Your organisation is a PDPC-designated public authority, triggering mandatory DPO appointment under Thailand's PDPA S.41(1) (effective 13 December 2023)." };
      if (a.cda === "yes" && a.sm === "yes")
        return { status: "mandatory", reason: "Your core activities involve both large-scale processing and systematic monitoring, satisfying both conditions of Thailand's PDPA S.41(2). DPO appointment is mandatory." };
      if (a.cda === "yes" && sens)
        return { status: "mandatory", reason: "Your core activities involve processing sensitive personal data under Section 26 (biometric/health data), triggering mandatory DPO appointment under Thailand's PDPA S.41(3)." };
      return { status: "recommended", reason: "Your current activities do not trigger any of the three alternative conditions under PDPA S.41. Appointing a DPO is recommended as a best practice." };
    },
  },
  VN: {
    name: "Vietnam", flag: "🇻🇳", law: "PDPL Law No.91/2025/QH15 Art.33",
    penalty: "VND 3 billion or 5% of annual revenue (whichever is higher)",
    url: "https://thuvienphapluat.vn/van-ban/EN/Bo-may-hanh-chinh/Law-91-2025-QH15-Personal-Data-Protection/665440/tieng-anh.aspx",
    eval: (a) => {
      const sens = a.dt.some(d => ["biometric","health","financial","children","location"].includes(d));
      const cb = a.cb === "yes";
      const hasLocation = a.dt.includes("location");
      let escalation: string | null = null;
      if (cb && sens && hasLocation)
        escalation = "You have cross-border transfers combined with financial and location data — multiple risk factors overlap. We strongly recommend establishing a full DPO compliance framework and submitting a Data Protection Impact Assessment (DPIA) and Cross-Border Transfer Impact Assessment (CTIA) within 60 days.";
      else if (cb && sens)
        escalation = "Cross-border transfers combined with sensitive data processing creates a dual risk. Prioritise building a full DPO compliance structure, including a Data Protection Impact Assessment (DPIA) and Cross-Border Transfer Impact Assessment (CTIA).";
      else if (cb)
        escalation = "Cross-border data transfers are strictly regulated under Vietnam's PDPL. Your DPO should engage early and submit a Cross-Border Transfer Impact Assessment (CTIA).";
      else if (sens)
        escalation = "Processing sensitive personal data (including location/tracking data) increases regulatory risk. Your DPO should prioritise establishing a Data Protection Impact Assessment (DPIA) framework.";
      return {
        status: "mandatory",
        reason: "Vietnam's PDPL 2025 (Law No. 91/2025/QH15, effective 1 January 2026) requires all organisations processing personal data to appoint a DPO. Micro-enterprises are exempt; start-ups have a 5-year grace period.",
        escalation,
      };
    },
  },
  PH: {
    name: "Philippines", flag: "🇵🇭", law: "RA 10173 S.21 + IRR S.26(a)",
    penalty: "PHP 5,000,000 (criminal and administrative)",
    url: "https://privacy.gov.ph/data-privacy-act/",
    eval: (a) => {
      const reg = ["251_500","over_500"].includes(a.emp);
      return {
        status: "mandatory",
        reason: "Philippines' RA 10173 S.21 requires all Personal Information Controllers (PICs) and Personal Information Processors (PIPs) to appoint a DPO. There is no size or volume threshold.",
        note: reg ? "With more than 250 employees, you are also required to register your DPO and data processing systems with the NPC (NPC Circular 2022-04)." : null,
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
  SG: "Singapore AGC", MY: "Malaysia JPDP Official", ID: "Indonesia Komdigi Official",
  TH: "Thailand Royal Gazette", VN: "Vietnam MoJ Official Database", PH: "Philippines NPC Official",
};

const INIT: Answers = { countries: [], emp: "", vol: "", dt: [], cb: "", sm: "", cda: "", pa: "", ps: "", hasDPO: "", concern: "" };

const Badge = ({ status }: { status: Status }) => {
  const map = {
    mandatory: { label: "Mandatory", bg: "#FFE8E8", color: "#A32D2D" },
    conditional: { label: "Recommended (Pending Clarity)", bg: "#FFF4E0", color: "#633806" },
    recommended: { label: "Recommended", bg: "#EAF3DE", color: "#27500A" },
  };
  const s = map[status];
  return <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: 20, fontSize: "0.72rem", fontWeight: 600, background: s.bg, color: s.color, whiteSpace: "nowrap" }}>{s.label}</span>;
};

const Opt = ({ label, sub, selected, onClick, radio = false }: { label: string; sub?: string; selected: boolean; onClick: () => void; radio?: boolean }) => (
  <div onClick={onClick} style={{ display: "flex", alignItems: sub ? "flex-start" : "center", gap: "0.7rem", padding: "0.8rem 1rem", border: `1.5px solid ${selected ? "#0D7A6E" : "#DDD8CE"}`, borderRadius: 8, cursor: "pointer", fontSize: "0.88rem", background: selected ? "#EBF7F5" : "#FAFAF8", color: selected ? "#0D7A6E" : "#1A1A1A", fontWeight: selected ? 500 : 400, transition: "all 0.18s", userSelect: "none" }}>
    <div style={{ width: 17, height: 17, flexShrink: 0, border: `2px solid ${selected ? "#0D7A6E" : "#DDD8CE"}`, borderRadius: radio ? "50%" : 4, background: selected ? "#0D7A6E" : "transparent", position: "relative", marginTop: sub ? 2 : 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {selected && (radio ? <div style={{ width: 7, height: 7, borderRadius: "50%", background: "white" }} /> : <div style={{ width: 6, height: 10, border: "2px solid white", borderTop: "none", borderLeft: "none", transform: "rotate(45deg)", marginTop: -2 }} />)}
    </div>
    <div><div>{label}</div>{sub && <div style={{ fontSize: "0.75rem", color: selected ? "#0D7A6E" : "#6B6560", marginTop: 2, opacity: 0.85 }}>{sub}</div>}</div>
  </div>
);

export default function DpoCheckerEn() {
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Answers>({ ...INIT });
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  const TOTAL = 5;
  const next = () => { setStep(s => s + 1); window.scrollTo(0, 0); };
  const back = () => { setStep(s => s - 1); window.scrollTo(0, 0); };
  const toggleCountry = (c: string) => setA(prev => ({ ...prev, countries: prev.countries.includes(c) ? prev.countries.filter(x => x !== c) : [...prev.countries, c] }));
  const toggleDt = (v: string) => setA(prev => ({ ...prev, dt: prev.dt.includes(v) ? prev.dt.filter(x => x !== v) : [...prev.dt, v] }));
  const pick = (field: keyof Answers, v: string) => setA(prev => ({ ...prev, [field]: v }));
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

  const nextSteps = [
    "Prioritise appointing a compliant DPO in all <strong>mandatory</strong> jurisdictions. Clearly define their responsibilities and reporting line.",
    ...(cond > 0 ? ["For <strong>conditional</strong> jurisdictions (Indonesia), treat appointment as mandatory until the implementing regulation (RPP PDP) is published."] : []),
    ...(a.cb === "yes" ? ["Develop a <strong>cross-border data transfer compliance plan</strong>. Ensure Standard Contractual Clauses (SCC) or equivalent safeguards are in place, with particular focus on Vietnam's Cross-Border Transfer Impact Assessment (CTIA) submission obligation."] : []),
    "Establish a <strong>Data Protection Impact Assessment (DPIA)</strong> framework, prioritising high-risk processing activities.",
    "Set <strong>quarterly compliance review checkpoints</strong>. Indonesia's implementing regulation and Korea's September 2026 deadline are the most time-sensitive near-term items.",
  ];

  const card: React.CSSProperties = { background: "#fff", border: "1px solid #DDD8CE", borderRadius: 12, padding: "1.75rem", marginBottom: "1.25rem", boxShadow: "0 2px 12px rgba(15,33,64,0.06)" };
  const moduleTag: React.CSSProperties = { display: "inline-block", fontSize: "0.66rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#0D7A6E", border: "1px solid #12A396", borderRadius: 20, padding: "2px 9px", marginBottom: "0.65rem" };
  const qTitle: React.CSSProperties = { fontFamily: "'Noto Serif SC', serif", fontSize: "1.05rem", fontWeight: 600, color: "#0F2140", marginBottom: "0.35rem", lineHeight: 1.5 };
  const qHint: React.CSSProperties = { fontSize: "0.79rem", color: "#6B6560", marginBottom: "1.1rem", lineHeight: 1.6 };
  const grid2: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" };
  const btnP: React.CSSProperties = { background: "#0F2140", color: "white", padding: "0.7rem 1.6rem", borderRadius: 8, fontSize: "0.88rem", fontWeight: 500, cursor: "pointer", border: "none", fontFamily: "inherit" };
  const btnS: React.CSSProperties = { background: "transparent", color: "#6B6560", padding: "0.7rem 1.6rem", borderRadius: 8, fontSize: "0.88rem", fontWeight: 500, cursor: "pointer", border: "1px solid #DDD8CE", fontFamily: "inherit" };
  const nav: React.CSSProperties = { display: "flex", gap: "1rem", marginTop: "1.4rem", justifyContent: "space-between", alignItems: "center" };
  const pRow: React.CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderTop: "1px solid #DDD8CE", fontSize: "0.8rem", gap: 12 };

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: "#F8F6F1", minHeight: "100vh" }}>
      <Navbar />

      {step < TOTAL && (
        <div style={{ background: "#1B3A5C", padding: "0.65rem 2rem", display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ display: "flex", gap: "0.4rem", flex: 1 }}>
            {Array.from({ length: TOTAL }).map((_, i) => (
              <div key={i} style={{ height: 8, borderRadius: i === step ? 4 : "50%", width: i === step ? 28 : 8, background: i < step ? "#12A396" : i === step ? "#E8B84B" : "#3A5A80", transition: "all 0.3s" }} />
            ))}
          </div>
          <div style={{ fontSize: "0.7rem", color: "#8BA3C0", whiteSpace: "nowrap" }}>Step {step + 1} of {TOTAL}</div>
        </div>
      )}

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>

        {/* Step 0 */}
        {step === 0 && (
          <div style={card}>
            <div style={moduleTag}>Step 1 · Target Markets</div>
            <div style={qTitle}>Which ASEAN markets are you entering or planning to enter?</div>
            <div style={qHint}>Select all that apply. The tool will assess DPO requirements for each country independently.</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0.6rem" }}>
              {["SG","MY","ID","TH","VN","PH"].map(c => {
                const j = J[c]; const sel = a.countries.includes(c);
                return (
                  <div key={c} onClick={() => toggleCountry(c)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.35rem", padding: "0.9rem 0.5rem", border: `1.5px solid ${sel ? "#0D7A6E" : "#DDD8CE"}`, borderRadius: 10, cursor: "pointer", textAlign: "center", background: sel ? "#EBF7F5" : "#FAFAF8", transition: "all 0.18s" }}>
                    <div style={{ fontSize: "1.8rem" }}>{j.flag}</div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 500, color: sel ? "#0D7A6E" : "#0F2140" }}>{j.name}</div>
                    <div style={{ fontSize: "0.62rem", color: "#6B6560", fontFamily: "monospace" }}>{j.law.split("+")[0].trim()}</div>
                  </div>
                );
              })}
            </div>
            <div style={nav}>
              <div />
              <button style={{ ...btnP, opacity: a.countries.length === 0 ? 0.5 : 1 }} disabled={a.countries.length === 0} onClick={next}>Next →</button>
            </div>
          </div>
        )}

        {/* Step 1 */}
        {step === 1 && (
          <>
            <div style={card}>
              <div style={moduleTag}>Step 2 · Company Size</div>
              <div style={qTitle}>What is your total global headcount?</div>
              <div style={qHint}>Used to assess Philippines NPC registration requirements (required for 250+ employees).</div>
              <div style={grid2}>
                {[["under_50","Under 50"],["50_250","50–250"],["251_500","251–500"],["over_500","500+"]].map(([v,l]) => (
                  <Opt key={v} label={l} selected={a.emp === v} onClick={() => pick("emp", v)} radio />
                ))}
              </div>
            </div>
            <div style={card}>
              <div style={moduleTag}>Step 2 · Data Volume</div>
              <div style={qTitle}>How many unique individuals' data have you processed in the past 12 months?</div>
              <div style={qHint}>Include customers, users, employees and any other natural persons, counted as unique individuals.</div>
              <div style={grid2}>
                {[["under_10k","Under 10,000"],["10k_20k","10,000–20,000"],["20k_100k","20,000–100,000"],["100k_1m","100K–1M"],["over_1m","Over 1M"],["not_sure","Not sure"]].map(([v,l]) => (
                  <Opt key={v} label={l} selected={a.vol === v} onClick={() => pick("vol", v)} radio />
                ))}
              </div>
              <div style={nav}>
                <button style={btnS} onClick={back}>← Back</button>
                <button style={{ ...btnP, opacity: (!a.emp || !a.vol) ? 0.5 : 1 }} disabled={!a.emp || !a.vol} onClick={next}>Next →</button>
              </div>
            </div>
          </>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div style={card}>
            <div style={moduleTag}>Step 3 · Data Types</div>
            <div style={qTitle}>Which types of personal data do you process?</div>
            <div style={qHint}>Select all that apply. Biometric, health, financial, children's, and location data are classified as sensitive and trigger stricter compliance requirements.</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                ["biometric","Biometric data","Fingerprints, facial recognition, voice prints, iris scans"],
                ["health","Health / medical data","Medical records, genetic data, physical condition"],
                ["financial","Financial data","Bank accounts, credit records, payment data"],
                ["children","Children's data","Any personal data of individuals under 18"],
                ["employee","Employee data","HR records, performance reviews, payroll"],
                ["location","Location / tracking data","GPS tracking, behavioural tracking, continuous monitoring"],
              ].map(([v,l,sub]) => (
                <Opt key={v} label={l} sub={sub} selected={a.dt.includes(v)} onClick={() => toggleDt(v)} />
              ))}
              <Opt label="None of the above (basic contact / transaction data only)" selected={a.dt.length === 0} onClick={() => setA(prev => ({ ...prev, dt: [] }))} radio />
            </div>
            <div style={nav}>
              <button style={btnS} onClick={back}>← Back</button>
              <button style={btnP} onClick={next}>Next →</button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <>
            <div style={card}>
              <div style={moduleTag}>Step 4 · Processing Activities</div>
              <div style={qTitle}>Do you transfer personal data across borders?</div>
              <div style={qHint}>For example: transferring user data to servers in another country, or using overseas cloud service providers.</div>
              <div style={grid2}>
                {[["yes","Yes"],["no","No"]].map(([v,l]) => (
                  <Opt key={v} label={l} selected={a.cb === v} onClick={() => pick("cb", v)} radio />
                ))}
              </div>
            </div>
            <div style={card}>
              <div style={moduleTag}>Step 4 · Processing Activities</div>
              <div style={qTitle}>Do your core activities involve systematic and regular monitoring of individuals?</div>
              <div style={qHint}>For example: continuous user behaviour tracking, large-scale CCTV analysis, online behavioural advertising targeting.</div>
              <div style={grid2}>
                {[["yes","Yes"],["no","No"]].map(([v,l]) => (
                  <Opt key={v} label={l} selected={a.sm === v} onClick={() => pick("sm", v)} radio />
                ))}
              </div>
            </div>
            {(a.countries.includes("TH") || a.countries.includes("ID")) && (
              <div style={card}>
                <div style={moduleTag}>Step 4 · Thailand / Indonesia Specific</div>
                <div style={qTitle}>Is data processing a core part of your business activities?</div>
                <div style={qHint}>i.e. your core product or service delivery depends on data processing.</div>
                <div style={grid2}>
                  {[["yes","Yes — data processing is core to our business"],["no","No — data processing is ancillary"]].map(([v,l]) => (
                    <Opt key={v} label={l} selected={a.cda === v} onClick={() => pick("cda", v)} radio />
                  ))}
                </div>
              </div>
            )}
            {a.countries.includes("TH") && (
              <div style={card}>
                <div style={moduleTag}>Step 4 · Thailand Specific (PDPA S.41(1))</div>
                <div style={qTitle}>Is your organisation a PDPC-designated public authority?</div>
                <div style={qHint}>Applies to government bodies and PDPC-designated entities. Most private companies select "No".</div>
                <div style={grid2}>
                  {[["yes","Yes (public authority)"],["no","No (private company)"]].map(([v,l]) => (
                    <Opt key={v} label={l} selected={a.pa === v} onClick={() => pick("pa", v)} radio />
                  ))}
                </div>
              </div>
            )}
            {a.countries.includes("ID") && (
              <div style={card}>
                <div style={moduleTag}>Step 4 · Indonesia Specific (PDP Law Art.53)</div>
                <div style={qTitle}>Does your business involve processing personal data for public service purposes?</div>
                <div style={qHint}>For example: public transport, public health, government-commissioned services. Most commercial businesses select "No".</div>
                <div style={grid2}>
                  {[["yes","Yes"],["no","No — commercial services"]].map(([v,l]) => (
                    <Opt key={v} label={l} selected={a.ps === v} onClick={() => pick("ps", v)} radio />
                  ))}
                </div>
              </div>
            )}
            <div style={nav}>
              <button style={btnS} onClick={back}>← Back</button>
              <button style={{ ...btnP, opacity: !c3Valid() ? 0.5 : 1 }} disabled={!c3Valid()} onClick={next}>Next →</button>
            </div>
          </>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <div style={card}>
            <div style={moduleTag}>Step 5 · Optional</div>
            <div style={qTitle}>A few optional questions to personalise your results</div>
            <div style={qHint}>You can skip this and go straight to your results.</div>
            <div style={{ marginBottom: "1.25rem" }}>
              <div style={{ fontSize: "0.85rem", fontWeight: 500, color: "#0F2140", marginBottom: "0.5rem" }}>Have you already appointed a DPO in any jurisdiction?</div>
              <div style={grid2}>
                {[["yes","Yes"],["no","Not yet"],["partial","Partially"]].map(([v,l]) => (
                  <Opt key={v} label={l} selected={a.hasDPO === v} onClick={() => pick("hasDPO", v)} radio />
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: "0.85rem", fontWeight: 500, color: "#0F2140", marginBottom: "0.5rem" }}>What is your primary compliance concern?</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {[["fines","Avoiding regulatory fines and legal risk"],["expansion","Preparing for market expansion"],["due_diligence","Responding to client or investor due diligence"],["certification","Obtaining DPTM / ISO 27701 certification"]].map(([v,l]) => (
                  <Opt key={v} label={l} selected={a.concern === v} onClick={() => pick("concern", v)} radio />
                ))}
              </div>
            </div>
            <div style={nav}>
              <button style={btnS} onClick={back}>← Back</button>
              <button style={btnP} onClick={next}>Generate Report →</button>
            </div>
            <div style={{ textAlign: "center", marginTop: "0.75rem" }}>
              <span style={{ fontSize: "0.78rem", color: "#6B6560", cursor: "pointer", textDecoration: "underline" }} onClick={next}>Skip and view results</span>
            </div>
          </div>
        )}

        {/* Results */}
        {step === 5 && (
          <>
            <div style={{ background: "#0F2140", borderRadius: 12, padding: "1.75rem 2rem", color: "white", marginBottom: "1.25rem" }}>
              <div style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "1.35rem", fontWeight: 700, marginBottom: "0.4rem" }}>DPO Appointment Feasibility Report</div>
              <div style={{ fontSize: "0.82rem", color: "#8BA3C0" }}>Analysis across {results.length} target markets · AsiaDPO Compliance Assessment</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
                {["April 2026 Regulatory Version", ...(a.cb === "yes" ? ["Cross-border Transfer: Yes"] : []), ...(a.dt.length > 0 ? ["Sensitive Data Identified"] : [])].map(tag => (
                  <span key={tag} style={{ fontSize: "0.68rem", background: "rgba(255,255,255,0.1)", color: "#B8CCDE", padding: "2px 9px", borderRadius: 20 }}>{tag}</span>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem", marginBottom: "1.25rem" }}>
              {[[mand,"Mandatory","#A32D2D"],[cond,"Conditional","#854F0B"],[rec,"Recommended","#3B6D11"]].map(([num, label, color]) => (
                <div key={label as string} style={{ background: "#fff", border: "1px solid #DDD8CE", borderRadius: 10, padding: "1.1rem", textAlign: "center" }}>
                  <div style={{ fontSize: "1.9rem", fontWeight: 600, fontFamily: "monospace", color: color as string, marginBottom: "0.2rem" }}>{num as number}</div>
                  <div style={{ fontSize: "0.75rem", color: "#6B6560" }}>{label as string}</div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6B6560", margin: "1.25rem 0 0.6rem" }}>Assessment by Jurisdiction</div>

            {results.map(({ code, j, r }) => (
              <div key={code} style={{ background: "#fff", border: "1px solid #DDD8CE", borderRadius: 10, marginBottom: "0.85rem", overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem 1.25rem", borderBottom: "1px solid #DDD8CE" }}>
                  <div style={{ fontSize: "1.5rem" }}>{j.flag}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "1rem", fontWeight: 600, color: "#0F2140" }}>{j.name} <Badge status={r.status} /></div>
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
                  <div style={pRow}><span style={{ color: "#6B6560" }}>Maximum penalty</span><span style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#A32D2D", fontWeight: 500 }}>{j.penalty}</span></div>
                  <div style={{ ...pRow, alignItems: "flex-start" }}>
                    <span style={{ color: "#6B6560", flexShrink: 0 }}>Official source</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap", justifyContent: "flex-end" }}>
                      <a href={j.url} target="_blank" rel="noreferrer" style={{ fontFamily: "monospace", fontSize: "0.68rem", color: "#0D7A6E", textDecoration: "none" }}>{URL_LABEL[code]}</a>
                      <span style={{ fontSize: "0.63rem", background: "#E1F5EE", color: "#085041", padding: "1px 6px", borderRadius: 10 }}>{URL_OFFICIAL[code]}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <div style={{ background: "#fff", border: "1px solid #DDD8CE", borderRadius: 12, padding: "1.5rem", marginBottom: "1.25rem" }}>
              <div style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "1rem", fontWeight: 600, color: "#0F2140", marginBottom: "1rem" }}>Recommended Next Steps</div>
              <ul style={{ listStyle: "none" }}>
                {nextSteps.map((t, i) => (
                  <li key={i} style={{ display: "flex", gap: "0.85rem", padding: "0.7rem 0", borderBottom: i < nextSteps.length - 1 ? "1px solid #DDD8CE" : "none", fontSize: "0.85rem", lineHeight: 1.6, color: "#1A1A1A" }}>
                    <div style={{ width: 22, height: 22, flexShrink: 0, background: "#0F2140", color: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.68rem", fontWeight: 600, marginTop: 2 }}>{i + 1}</div>
                    <div dangerouslySetInnerHTML={{ __html: t }} />
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: "linear-gradient(135deg,#0F2140 0%,#1B3A5C 100%)", borderRadius: 12, padding: "1.75rem", color: "white", textAlign: "center", border: "1px solid #C8922A", marginBottom: "1.25rem" }}>
              <div style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.4rem", color: "#E8B84B" }}>Need a Professional DPO Advisor?</div>
              <div style={{ fontSize: "0.84rem", color: "#B8CCDE", marginBottom: "1.25rem", lineHeight: 1.7 }}>
                We specialise in cross-border data compliance across Southeast Asia — offering DPO outsourcing, multi-jurisdiction compliance planning, and international certification advisory. Leave your email and we'll be in touch.
              </div>
              {!submitted ? (
                <>
                  <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Your work email" style={{ width: "100%", padding: "0.7rem 1rem", borderRadius: 8, border: "1px solid #3A5A80", background: "rgba(255,255,255,0.08)", color: "white", fontSize: "0.88rem", fontFamily: "inherit", marginBottom: "0.6rem", outline: "none" }} />
                  <input value={company} onChange={e => setCompany(e.target.value)} type="text" placeholder="Company name (optional)" style={{ width: "100%", padding: "0.7rem 1rem", borderRadius: 8, border: "1px solid #3A5A80", background: "rgba(255,255,255,0.08)", color: "white", fontSize: "0.88rem", fontFamily: "inherit", marginBottom: "0.6rem", outline: "none" }} />
                  <button onClick={() => { if (email.includes("@")) setSubmitted(true); }} style={{ background: "#C8922A", color: "white", padding: "0.8rem 2rem", borderRadius: 8, fontSize: "0.88rem", fontWeight: 600, border: "none", cursor: "pointer", fontFamily: "inherit", width: "100%" }}>
                    Book a Free Consultation →
                  </button>
                </>
              ) : (
                <div style={{ fontSize: "0.88rem", color: "#E8B84B", padding: "0.75rem" }}>✓ Received! We'll be in touch shortly.</div>
              )}
            </div>

            <div style={{ fontSize: "0.73rem", color: "#9A948E", lineHeight: 1.7, padding: "0.85rem 1rem", background: "#F5F3EE", borderRadius: 8, borderLeft: "3px solid #DDD8CE" }}>
              This report is for reference only and does not constitute legal advice. Regulations change frequently — consult a licensed data protection lawyer before making major compliance decisions. Some implementing regulations or official guidance are pending publication; certain conclusions carry inherent uncertainty. Given the pace of regulatory change, regular review is recommended.
            </div>

            <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "space-between" }}>
              <button style={btnS} onClick={() => { setStep(0); setA({ ...INIT }); setSubmitted(false); setEmail(""); setCompany(""); window.scrollTo(0, 0); }}>← Start Over</button>
              <button style={btnP} onClick={() => window.print()}>Print Report</button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
