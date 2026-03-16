import { useState } from "react";
import { C, font, body, mono, FONTS_IMPORT } from "./theme";

const steps = ["Account Type", "Personal Info", "Credentials"];

export default function Signup({ onSignup, onGoLogin }) {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState("student");
  const [form, setForm] = useState({ name:"", email:"", phone:"", institution:"", rollNo:"", department:"", password:"", confirm:"" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const validateStep = () => {
    const e = {};
    if (step === 1) {
      if (!form.name.trim())        e.name = "Full name is required";
      if (!form.email.trim())       e.email = "Email is required";
      if (!form.institution.trim()) e.institution = "Institution is required";
    }
    if (step === 2) {
      if (!form.password)           e.password = "Password is required";
      if (form.password.length < 6) e.password = "Minimum 6 characters";
      if (form.password !== form.confirm) e.confirm = "Passwords don't match";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validateStep()) setStep(s => s + 1); };
  const back = () => { setErrors({}); setStep(s => s - 1); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); onSignup(role); }, 1400);
  };

  const roles = [
    { id:"student", icon:"🎓", label:"Student",  desc:"Track your grades, attendance & assignments" },
    { id:"teacher", icon:"📚", label:"Teacher",  desc:"Manage courses, marks & student records"      },
    { id:"admin",   icon:"🛡️",  label:"Admin",    desc:"Oversee institution data & all users"         },
  ];

  const InputField = ({ label, k, placeholder, type="text", icon, hint }) => (
    <div style={{ marginBottom:16 }}>
      <label style={{ display:"block", fontSize:11, fontWeight:500, letterSpacing:"0.08em", textTransform:"uppercase", color: errors[k] ? C.rose : C.textDim, marginBottom:7 }}>{label}</label>
      <div style={{ display:"flex", alignItems:"center", gap:10, background:C.surface2, border:`1px solid ${errors[k] ? "rgba(248,113,113,0.4)" : C.border}`, borderRadius:9, padding:"11px 14px", transition:"border 0.2s" }}
        className="input-box">
        {icon && <span style={{ fontSize:15, flexShrink:0 }}>{icon}</span>}
        {type === "password" ? (
          <>
            <input value={form[k]} onChange={e => set(k, e.target.value)} placeholder={placeholder} type={showPass ? "text" : "password"}
              style={{ flex:1, background:"transparent", border:"none", outline:"none", fontSize:14, color:C.text, fontFamily:body }}/>
            <button type="button" onClick={() => setShowPass(!showPass)}
              style={{ background:"none", border:"none", cursor:"pointer", fontSize:12, color:C.textDim, fontFamily:body }}>
              {showPass ? "Hide" : "Show"}
            </button>
          </>
        ) : (
          <input value={form[k]} onChange={e => set(k, e.target.value)} placeholder={placeholder} type={type}
            style={{ flex:1, background:"transparent", border:"none", outline:"none", fontSize:14, color:C.text, fontFamily:body }}/>
        )}
      </div>
      {errors[k] && <div style={{ fontSize:12, color:C.rose, marginTop:5 }}>⚠ {errors[k]}</div>}
      {hint && !errors[k] && <div style={{ fontSize:11, color:C.textDim, marginTop:5 }}>{hint}</div>}
    </div>
  );

  return (
    <>
      <style>{`
        ${FONTS_IMPORT}
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        body { background:${C.bg}; font-family:${body}; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .form-card { animation: fadeUp 0.5s ease both; }
        .role-card:hover  { border-color:${C.goldMid} !important; transform:translateY(-2px); }
        .input-box:focus-within { border-color:${C.goldMid} !important; }
        .next-btn:hover   { opacity:0.88; transform:translateY(-1px); box-shadow:0 8px 24px rgba(232,185,106,0.3) !important; }
        .back-btn:hover   { border-color:${C.goldMid} !important; color:${C.text} !important; }
        .link-btn:hover   { color:${C.gold} !important; }
      `}</style>

      <div style={{ minHeight:"100vh", display:"flex", background:C.bg, fontFamily:body, position:"relative", overflow:"hidden" }}>

        {/* BG blobs */}
        <div style={{ position:"absolute", top:-100, right:-100, width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(78,205,196,0.05) 0%,transparent 70%)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:-80, left:-80, width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(232,185,106,0.05) 0%,transparent 70%)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`, backgroundSize:"40px 40px", pointerEvents:"none", opacity:0.3 }}/>

        {/* ── Left Info Panel ── */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", padding:"60px 40px", position:"relative" }}>
          <div style={{ position:"relative", zIndex:1, maxWidth:400 }}>
            {/* Logo */}
            <div style={{ display:"inline-flex", alignItems:"center", gap:14, marginBottom:40 }}>
              <div style={{ width:48, height:48, borderRadius:12, background:"linear-gradient(135deg,#e8b96a,#c4973a)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:font, fontWeight:700, fontSize:22, color:"#0d1117", boxShadow:"0 8px 28px rgba(232,185,106,0.4)", animation:"float 4s ease-in-out infinite" }}>E</div>
              <span style={{ fontFamily:font, fontSize:26, fontWeight:700, color:C.text }}>Edu<span style={{ color:C.gold }}>Track</span></span>
            </div>

            <h2 style={{ fontFamily:font, fontSize:30, fontWeight:600, color:C.text, lineHeight:1.3, marginBottom:14 }}>
              Join thousands of<br/><span style={{ color:C.gold }}>students & educators.</span>
            </h2>
            <p style={{ fontSize:14.5, color:C.textMuted, lineHeight:1.7, marginBottom:40 }}>
              Set up your EduTrack account in minutes. Choose your role and get started with your academic journey.
            </p>

            {/* Steps progress visual */}
            <div style={{ marginBottom:40 }}>
              {steps.map((s, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:14, marginBottom: i < steps.length-1 ? 0 : 0 }}>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                    <div style={{ width:32, height:32, borderRadius:"50%", border:`2px solid ${step > i ? C.teal : step === i ? C.gold : C.border}`, background: step > i ? C.tealDim : step === i ? C.goldDim : "transparent", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:600, color: step > i ? C.teal : step === i ? C.gold : C.textDim, transition:"all 0.3s" }}>
                      {step > i ? "✓" : i+1}
                    </div>
                    {i < steps.length-1 && <div style={{ width:2, height:28, background: step > i ? C.teal : C.border, transition:"background 0.4s", margin:"4px 0" }}/>}
                  </div>
                  <div style={{ paddingBottom: i < steps.length-1 ? 28 : 0 }}>
                    <div style={{ fontSize:13, fontWeight:500, color: step === i ? C.text : C.textMuted }}>{s}</div>
                    <div style={{ fontSize:11, color:C.textDim }}>
                      {i===0 ? "Choose student, teacher, or admin" : i===1 ? "Your name, email & institution" : "Create a secure password"}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div style={{ display:"flex", gap:12 }}>
              {[["1,200+","Students"],["80+","Teachers"],["12","Institutions"]].map(([v,l]) => (
                <div key={l} style={{ flex:1, padding:"12px", background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, textAlign:"center" }}>
                  <div style={{ fontFamily:font, fontSize:18, fontWeight:600, color:C.gold }}>{v}</div>
                  <div style={{ fontSize:11, color:C.textDim, marginTop:2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right Form Panel ── */}
        <div style={{ width:520, display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 48px", background:C.surface, borderLeft:`1px solid ${C.border}` }}>
          <div className="form-card" style={{ width:"100%" }}>

            {/* Step header */}
            <div style={{ marginBottom:28 }}>
              <div style={{ display:"flex", gap:6, marginBottom:16 }}>
                {steps.map((_, i) => (
                  <div key={i} style={{ flex:1, height:3, borderRadius:3, background: step >= i ? C.gold : C.surface2, transition:"background 0.3s" }}/>
                ))}
              </div>
              <div style={{ fontSize:11, color:C.textDim, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:4 }}>Step {step+1} of {steps.length}</div>
              <h1 style={{ fontFamily:font, fontSize:24, fontWeight:600, color:C.text }}>{steps[step]}</h1>
            </div>

            <form onSubmit={handleSubmit}>

              {/* ── Step 0: Role ── */}
              {step === 0 && (
                <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:28 }}>
                  {roles.map(r => (
                    <div key={r.id} className="role-card"
                      onClick={() => setRole(r.id)}
                      style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 16px", borderRadius:11, border:`1px solid ${role===r.id ? C.goldMid : C.border}`, background: role===r.id ? C.goldDim : C.surface2, cursor:"pointer", transition:"all 0.2s" }}>
                      <div style={{ width:42, height:42, borderRadius:10, background: role===r.id ? "rgba(232,185,106,0.2)" : C.surface3, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{r.icon}</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:14, fontWeight:600, color: role===r.id ? C.gold : C.text }}>{r.label}</div>
                        <div style={{ fontSize:12, color:C.textMuted, marginTop:2 }}>{r.desc}</div>
                      </div>
                      <div style={{ width:18, height:18, borderRadius:"50%", border:`2px solid ${role===r.id ? C.gold : C.border}`, background: role===r.id ? C.gold : "transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:10, color:"#0d1117", fontWeight:700 }}>
                        {role===r.id && "✓"}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── Step 1: Personal Info ── */}
              {step === 1 && (
                <div style={{ marginBottom:8 }}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 14px" }}>
                    <div style={{ gridColumn:"1/-1" }}>
                      <InputField label="Full Name"    k="name"        placeholder="e.g. Arjun Kumar"           icon="👤" />
                    </div>
                    <div style={{ gridColumn:"1/-1" }}>
                      <InputField label="Email Address" k="email"      placeholder="you@institution.edu"        icon="✉️" type="email" />
                    </div>
                    <InputField label="Phone Number"    k="phone"      placeholder="+91 98765 43210"            icon="📱" />
                    <InputField label="Roll / Staff No" k="rollNo"     placeholder="e.g. 21CS045"               icon="🪪" />
                    <div style={{ gridColumn:"1/-1" }}>
                      <InputField label="Institution"   k="institution" placeholder="e.g. RV College of Engineering" icon="🏫" />
                    </div>
                    <div style={{ gridColumn:"1/-1" }}>
                      <InputField label="Department"    k="department"  placeholder="e.g. Computer Science"     icon="📂" />
                    </div>
                  </div>
                </div>
              )}

              {/* ── Step 2: Credentials ── */}
              {step === 2 && (
                <div style={{ marginBottom:8 }}>
                  <InputField label="Create Password" k="password" placeholder="Min 6 characters" type="password" icon="🔒" hint="Use letters, numbers & symbols for a strong password" />
                  <InputField label="Confirm Password" k="confirm" placeholder="Re-enter password"  type="password" icon="🔐" />

                  {/* Summary card */}
                  <div style={{ padding:"14px 16px", background:C.surface2, border:`1px solid ${C.border}`, borderRadius:10, marginTop:8 }}>
                    <div style={{ fontSize:11, fontWeight:500, letterSpacing:"0.08em", textTransform:"uppercase", color:C.textDim, marginBottom:10 }}>Account Summary</div>
                    {[
                      ["Role", roles.find(r=>r.id===role)?.icon + " " + roles.find(r=>r.id===role)?.label],
                      ["Name", form.name || "—"],
                      ["Email", form.email || "—"],
                      ["Institution", form.institution || "—"],
                    ].map(([k, v]) => (
                      <div key={k} style={{ display:"flex", justifyContent:"space-between", marginBottom:6, fontSize:13 }}>
                        <span style={{ color:C.textMuted }}>{k}</span>
                        <span style={{ color:C.text, fontWeight:500 }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div style={{ display:"flex", gap:10, marginTop:20 }}>
                {step > 0 && (
                  <button type="button" className="back-btn" onClick={back}
                    style={{ flex:1, padding:"12px", borderRadius:9, border:`1px solid ${C.border}`, background:"transparent", color:C.textMuted, fontFamily:body, fontSize:14, fontWeight:500, cursor:"pointer", transition:"all 0.2s" }}>
                    ← Back
                  </button>
                )}
                {step < steps.length - 1 ? (
                  <button type="button" className="next-btn" onClick={next}
                    style={{ flex:2, padding:"12px", borderRadius:9, border:"none", background:"linear-gradient(135deg,#e8b96a,#c4973a)", color:"#0d1117", fontFamily:body, fontSize:14, fontWeight:600, cursor:"pointer", transition:"all 0.2s", boxShadow:"0 4px 16px rgba(232,185,106,0.2)" }}>
                    Continue →
                  </button>
                ) : (
                  <button type="submit" className="next-btn" disabled={loading}
                    style={{ flex:2, padding:"12px", borderRadius:9, border:"none", background:"linear-gradient(135deg,#e8b96a,#c4973a)", color:"#0d1117", fontFamily:body, fontSize:14, fontWeight:600, cursor:"pointer", transition:"all 0.2s", boxShadow:"0 4px 16px rgba(232,185,106,0.2)", opacity: loading ? 0.7 : 1 }}>
                    {loading ? "Creating account…" : "Create Account 🎓"}
                  </button>
                )}
              </div>
            </form>

            <p style={{ textAlign:"center", fontSize:13.5, color:C.textMuted, marginTop:22 }}>
              Already have an account?{" "}
              <span className="link-btn" onClick={onGoLogin} style={{ color:C.gold, cursor:"pointer", fontWeight:500, transition:"color 0.2s" }}>
                Sign in →
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
