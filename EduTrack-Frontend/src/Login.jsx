import { useState } from "react";
import { C, font, body, mono, FONTS_IMPORT } from "./theme";

export default function Login({ onLogin, onGoSignup }) {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setError("");
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(role); }, 1200);
  };

  const roles = [
    { id: "student", label: "Student",  icon: "🎓" },
    { id: "teacher", label: "Teacher",  icon: "📚" },
    { id: "admin",   label: "Admin",    icon: "🛡️"  },
  ];

  return (
    <>
      <style>{`
        ${FONTS_IMPORT}
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        body { background:${C.bg}; font-family:${body}; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes pulse  { 0%,100%{opacity:0.4} 50%{opacity:0.8} }
        .login-card { animation: fadeUp 0.6s ease both; }
        .role-btn:hover { border-color:${C.goldMid} !important; background:${C.goldDim} !important; }
        .input-wrap:focus-within label { color:${C.gold} !important; }
        .input-wrap:focus-within .input-box { border-color:${C.goldMid} !important; }
        .submit-btn:hover:not(:disabled) { opacity:0.88; transform:translateY(-1px); box-shadow:0 8px 24px rgba(232,185,106,0.3) !important; }
        .submit-btn:disabled { opacity:0.6; cursor:not-allowed; }
        .link-btn:hover { color:${C.gold} !important; }
        .show-btn:hover { color:${C.text} !important; }
        .social-btn:hover { border-color:${C.goldMid} !important; background:${C.surface2} !important; }
      `}</style>

      <div style={{ minHeight:"100vh", display:"flex", background:C.bg, fontFamily:body, position:"relative", overflow:"hidden" }}>

        {/* ── Decorative BG blobs ── */}
        <div style={{ position:"absolute", top:-120, left:-120, width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle, rgba(232,185,106,0.05) 0%, transparent 70%)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:-100, right:-80, width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle, rgba(78,205,196,0.05) 0%, transparent 70%)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", top:"40%", left:"38%", width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle, rgba(167,139,250,0.03) 0%, transparent 70%)", pointerEvents:"none" }}/>

        {/* ── Left Panel ── */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", padding:"60px 40px", position:"relative" }}>
          {/* Grid pattern overlay */}
          <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`, backgroundSize:"40px 40px", pointerEvents:"none", opacity:0.5 }}/>

          <div style={{ position:"relative", zIndex:1, textAlign:"center", maxWidth:420 }}>
            {/* Logo */}
            <div style={{ display:"inline-flex", alignItems:"center", gap:14, marginBottom:48 }}>
              <div style={{ width:52, height:52, borderRadius:14, background:"linear-gradient(135deg,#e8b96a,#c4973a)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:font, fontWeight:700, fontSize:24, color:"#0d1117", boxShadow:"0 8px 28px rgba(232,185,106,0.4)", animation:"float 4s ease-in-out infinite" }}>E</div>
              <span style={{ fontFamily:font, fontSize:28, fontWeight:700, color:C.text, letterSpacing:"0.02em" }}>Edu<span style={{ color:C.gold }}>Track</span></span>
            </div>

            <h2 style={{ fontFamily:font, fontSize:32, fontWeight:600, color:C.text, lineHeight:1.2, marginBottom:16 }}>
              Empowering every<br/><span style={{ color:C.gold }}>learner's journey.</span>
            </h2>
            <p style={{ fontSize:15, color:C.textMuted, lineHeight:1.7, maxWidth:340, margin:"0 auto 48px" }}>
              A unified academic platform to track attendance, grades, assignments and performance — all in one place.
            </p>

            {/* Feature pills */}
            {[
              { icon:"📊", text:"Live performance analytics" },
              { icon:"📅", text:"Attendance & grade tracking" },
              { icon:"📝", text:"Assignment management" },
              { icon:"🔔", text:"Real-time notifications" },
            ].map((f, i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12, padding:"10px 16px", background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, textAlign:"left", animation:`fadeUp 0.5s ${0.1*i+0.3}s ease both` }}>
                <span style={{ fontSize:18 }}>{f.icon}</span>
                <span style={{ fontSize:13.5, color:C.textMuted }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right Panel (Form) ── */}
        <div style={{ width:480, display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 48px", background:C.surface, borderLeft:`1px solid ${C.border}`, position:"relative" }}>
          <div className="login-card" style={{ width:"100%" }}>

            <div style={{ marginBottom:32 }}>
              <h1 style={{ fontFamily:font, fontSize:26, fontWeight:600, color:C.text, marginBottom:6 }}>Welcome back</h1>
              <p style={{ fontSize:13.5, color:C.textMuted }}>Sign in to access your EduTrack account</p>
            </div>

            {/* Role Selector */}
            <div style={{ marginBottom:24 }}>
              <div style={{ fontSize:11, fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:C.textDim, marginBottom:10 }}>Sign in as</div>
              <div style={{ display:"flex", gap:8 }}>
                {roles.map(r => (
                  <button key={r.id} className="role-btn"
                    onClick={() => setRole(r.id)}
                    style={{ flex:1, padding:"9px 6px", borderRadius:9, border:`1px solid ${role===r.id ? C.goldMid : C.border}`, background: role===r.id ? C.goldDim : "transparent", color: role===r.id ? C.gold : C.textMuted, fontSize:13, fontWeight: role===r.id ? 600 : 400, cursor:"pointer", fontFamily:body, transition:"all 0.2s", display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                    <span style={{ fontSize:18 }}>{r.icon}</span>
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="input-wrap" style={{ marginBottom:16 }}>
                <label style={{ display:"block", fontSize:12, fontWeight:500, color:C.textMuted, marginBottom:7, transition:"color 0.2s", letterSpacing:"0.04em" }}>EMAIL ADDRESS</label>
                <div className="input-box" style={{ display:"flex", alignItems:"center", gap:10, background:C.surface2, border:`1px solid ${C.border}`, borderRadius:9, padding:"11px 14px", transition:"border 0.2s" }}>
                  <span style={{ fontSize:15, flexShrink:0 }}>✉️</span>
                  <input value={email} onChange={e => setEmail(e.target.value)} placeholder="you@institution.edu" type="email"
                    style={{ flex:1, background:"transparent", border:"none", outline:"none", fontSize:14, color:C.text, fontFamily:body }}/>
                </div>
              </div>

              {/* Password */}
              <div className="input-wrap" style={{ marginBottom:20 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:7 }}>
                  <label style={{ fontSize:12, fontWeight:500, color:C.textMuted, letterSpacing:"0.04em" }}>PASSWORD</label>
                  <span className="link-btn" style={{ fontSize:12, color:C.textMuted, cursor:"pointer", transition:"color 0.2s" }}>Forgot password?</span>
                </div>
                <div className="input-box" style={{ display:"flex", alignItems:"center", gap:10, background:C.surface2, border:`1px solid ${C.border}`, borderRadius:9, padding:"11px 14px", transition:"border 0.2s" }}>
                  <span style={{ fontSize:15, flexShrink:0 }}>🔒</span>
                  <input value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" type={showPass ? "text" : "password"}
                    style={{ flex:1, background:"transparent", border:"none", outline:"none", fontSize:14, color:C.text, fontFamily:body }}/>
                  <button type="button" className="show-btn" onClick={() => setShowPass(!showPass)}
                    style={{ background:"none", border:"none", cursor:"pointer", fontSize:12, color:C.textDim, fontFamily:body, transition:"color 0.2s" }}>
                    {showPass ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {error && (
                <div style={{ marginBottom:16, padding:"10px 14px", background:C.roseDim, border:`1px solid rgba(248,113,113,0.2)`, borderRadius:9, fontSize:13, color:C.rose }}>
                  ⚠️ &nbsp;{error}
                </div>
              )}

              <button type="submit" className="submit-btn" disabled={loading}
                style={{ width:"100%", padding:"13px", borderRadius:9, border:"none", background:"linear-gradient(135deg,#e8b96a,#c4973a)", color:"#0d1117", fontFamily:body, fontSize:15, fontWeight:600, cursor:"pointer", transition:"all 0.2s", boxShadow:"0 4px 16px rgba(232,185,106,0.2)", letterSpacing:"0.02em" }}>
                {loading ? "Signing in…" : `Sign in as ${roles.find(r=>r.id===role)?.label}`}
              </button>
            </form>

            <div style={{ display:"flex", alignItems:"center", gap:12, margin:"22px 0" }}>
              <div style={{ flex:1, height:1, background:C.border }}/>
              <span style={{ fontSize:12, color:C.textDim }}>or continue with</span>
              <div style={{ flex:1, height:1, background:C.border }}/>
            </div>

            <div style={{ display:"flex", gap:10, marginBottom:28 }}>
              {[["🔵","Google"],["⚫","GitHub"],["🔷","Microsoft"]].map(([ic,lbl]) => (
                <button key={lbl} className="social-btn"
                  style={{ flex:1, padding:"9px", borderRadius:9, border:`1px solid ${C.border}`, background:"transparent", color:C.textMuted, fontFamily:body, fontSize:13, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:7, transition:"all 0.2s" }}>
                  <span>{ic}</span>{lbl}
                </button>
              ))}
            </div>

            <p style={{ textAlign:"center", fontSize:13.5, color:C.textMuted }}>
              Don't have an account?{" "}
              <span className="link-btn" onClick={onGoSignup} style={{ color:C.gold, cursor:"pointer", fontWeight:500, transition:"color 0.2s" }}>
                Create one →
              </span>
            </p>

          </div>
        </div>
      </div>
    </>
  );
}
