import { useState } from "react";
import { C, font, body, mono, FONTS_IMPORT } from "./theme";

/* ─── Data ─── */
const navItems = [
  { icon:"⊞", label:"Dashboard",     section:"Overview" },
  { icon:"📊", label:"Performance",   section:"Overview" },
  { icon:"📅", label:"Attendance",    section:"Overview" },
  { icon:"📝", label:"Assignments",   section:"Academic", badge:3 },
  { icon:"📖", label:"Courses",       section:"Academic" },
  { icon:"🏆", label:"Grades",        section:"Academic" },
  { icon:"📋", label:"Marks",         section:"Academic" },
  { icon:"🔔", label:"Notifications", section:"System",   badge:5 },
  { icon:"⚙️", label:"Settings",      section:"System" },
];

const subjects = [
  { icon:"🔬", name:"Data Structures",    credits:"4 Credits", score:91, color:C.teal   },
  { icon:"⚙️", name:"Operating Systems",  credits:"3 Credits", score:84, color:C.gold   },
  { icon:"🧮", name:"Discrete Mathematics",credits:"4 Credits",score:76, color:C.purple },
  { icon:"🌐", name:"Computer Networks",  credits:"3 Credits", score:88, color:C.rose   },
  { icon:"💾", name:"Database Systems",   credits:"3 Credits", score:79, color:"#60a5fa" },
  { icon:"🖥️", name:"Software Engineering",credits:"2 Credits",score:92, color:"#34d399" },
];

const allAssignments = [
  { status:"late",      title:"Linked List Implementation – Lab 3",      subject:"Data Structures",      due:"3 days ago",    tag:"Overdue",   marks:null },
  { status:"pending",   title:"Process Scheduling Algorithms – Report",  subject:"Operating Systems",    due:"2 days",        tag:"Due Soon",  marks:null },
  { status:"pending",   title:"Graph Theory Problem Set – Week 8",       subject:"Discrete Mathematics", due:"5 days",        tag:"Due Soon",  marks:null },
  { status:"submitted", title:"OSI Model Presentation Slides",           subject:"Computer Networks",    due:"3 days ago",    tag:"Submitted", marks:"18/20" },
  { status:"submitted", title:"Binary Search Tree – Coding Assignment",  subject:"Data Structures",      due:"Last week",     tag:"Submitted", marks:"45/50" },
  { status:"submitted", title:"ER Diagram for Library System",           subject:"Database Systems",     due:"2 weeks ago",   tag:"Submitted", marks:"38/40" },
  { status:"pending",   title:"Software Requirement Specification",      subject:"Software Engineering", due:"1 week",        tag:"Due Soon",  marks:null },
];

const allCourses = [
  { icon:"🔬", name:"Data Structures",     instructor:"Prof. R. Sharma",   credits:4, enrolled:62, progress:78, color:C.teal   },
  { icon:"⚙️", name:"Operating Systems",   instructor:"Prof. K. Menon",    credits:3, enrolled:58, progress:65, color:C.gold   },
  { icon:"🧮", name:"Discrete Mathematics",instructor:"Prof. A. Iyer",     credits:4, enrolled:70, progress:55, color:C.purple },
  { icon:"🌐", name:"Computer Networks",   instructor:"Dr. S. Nair",       credits:3, enrolled:55, progress:82, color:C.rose   },
  { icon:"💾", name:"Database Systems",    instructor:"Prof. P. Reddy",    credits:3, enrolled:48, progress:70, color:"#60a5fa" },
  { icon:"🖥️", name:"Software Engineering",instructor:"Dr. M. Krishnan",   credits:2, enrolled:65, progress:90, color:"#34d399" },
];

const allNotifications = [
  { icon:"📢", bold:"Marks uploaded",         text:"for OS Unit Test II",                    time:"2 hours ago",  type:"info" },
  { icon:"⚠️", bold:"Low attendance warning", text:"– Computer Networks (74%)",              time:"Yesterday",    type:"warn" },
  { icon:"📝", bold:"New assignment posted",  text:"in Discrete Mathematics",                time:"2 days ago",   type:"info" },
  { icon:"🏆", bold:"Grade updated",          text:"– Data Structures Internal: A+",         time:"3 days ago",   type:"success" },
  { icon:"📅", bold:"Timetable changed",      text:"– Monday slot moved to 10 AM",           time:"4 days ago",   type:"info" },
  { icon:"📢", bold:"Result declared",        text:"– Semester III final result is live",    time:"1 week ago",   type:"success" },
  { icon:"🔔", bold:"Reminder",               text:"– Assignment due tomorrow: OS Report",   time:"1 week ago",   type:"warn" },
];

const weekAtt = [
  { day:"MON", present:true,  h:68 },
  { day:"TUE", present:true,  h:56 },
  { day:"WED", present:false, h:20 },
  { day:"THU", present:true,  h:62 },
  { day:"FRI", present:true,  h:50 },
];

const semesters = [
  { label:"Sem I",  val:7.4, pct:74, color:C.teal   },
  { label:"Sem II", val:7.9, pct:79, color:C.purple },
  { label:"Sem III",val:8.3, pct:83, color:C.teal   },
  { label:"Sem IV", val:8.6, pct:86, color:C.gold   },
];

const allMarks = [
  { subject:"Data Structures",     ia1:28, ia2:27, assignment:45, midterm:48, total:148, max:150, grade:"O"  },
  { subject:"Operating Systems",   ia1:24, ia2:26, assignment:38, midterm:44, total:132, max:150, grade:"A+" },
  { subject:"Discrete Mathematics",ia1:22, ia2:21, assignment:33, midterm:40, total:116, max:150, grade:"A"  },
  { subject:"Computer Networks",   ia1:26, ia2:25, assignment:36, midterm:46, total:133, max:150, grade:"A+" },
  { subject:"Database Systems",    ia1:23, ia2:24, assignment:35, midterm:42, total:124, max:150, grade:"A"  },
  { subject:"Software Engineering",ia1:27, ia2:28, assignment:44, midterm:47, total:146, max:150, grade:"O"  },
];

/* ─── Helpers ─── */
const tagStyle = t => t==="Overdue" ? {background:C.roseDim,color:C.rose} : t==="Due Soon" ? {background:C.goldDim,color:C.gold} : {background:C.tealDim,color:C.teal};
const statusDot = s => s==="late" ? {background:C.rose,boxShadow:`0 0 6px ${C.rose}`} : s==="pending" ? {background:C.gold,boxShadow:`0 0 6px ${C.gold}`} : {background:C.teal};
const notifColor = t => t==="warn" ? C.gold : t==="success" ? C.teal : "#60a5fa";
const gradeColor = g => g==="O" ? C.gold : g==="A+" ? C.teal : C.purple;

/* ─── Panel wrapper ─── */
const Panel = ({ children, style={} }) => (
  <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:14, padding:20, ...style }}>
    {children}
  </div>
);
const PanelHeader = ({ title, link }) => (
  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
    <span style={{ fontFamily:font, fontSize:15, fontWeight:600 }}>{title}</span>
    {link && <span style={{ fontSize:12, color:C.gold, cursor:"pointer" }}>{link} →</span>}
  </div>
);

/* ════════════════════════════════════════════════
   PAGE: DASHBOARD (home)
═══════════════════════════════════════════════ */
function PageDashboard() {
  const stats = [
    { label:"Cumulative GPA",   value:"8.6", sub:"out of 10.0",      change:"↑ +0.3 this semester", up:true,  color:C.gold   },
    { label:"Attendance",       value:"89%", sub:"47 / 53 classes",   change:"↑ Above threshold",    up:true,  color:C.teal   },
    { label:"Pending Tasks",    value:"3",   sub:"assignments due",   change:"↓ 2 overdue",          up:false, color:C.rose   },
    { label:"Courses Enrolled", value:"6",   sub:"active this sem",   change:"↑ All on track",       up:true,  color:C.purple },
  ];
  return (
    <div>
      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:24 }}>
        {stats.map((s,i) => (
          <div key={i} className="stat-card" style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:14, padding:20, position:"relative", overflow:"hidden", cursor:"default", animationDelay:`${i*0.08}s` }}>
            <div style={{ position:"absolute", top:0, right:0, width:80, height:80, background:`radial-gradient(circle at 80% 20%, ${s.color}12 0%, transparent 70%)`, pointerEvents:"none" }}/>
            <div style={{ fontSize:11, fontWeight:500, letterSpacing:"0.08em", textTransform:"uppercase", color:C.textDim, marginBottom:10 }}>{s.label}</div>
            <div style={{ fontFamily:font, fontSize:32, fontWeight:700, lineHeight:1, marginBottom:8, color:s.color }}>{s.value}</div>
            <div style={{ fontSize:12, color:C.textMuted }}>{s.sub}</div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:3, fontSize:11, fontWeight:500, padding:"2px 7px", borderRadius:20, marginTop:6, background:s.up?C.tealDim:C.roseDim, color:s.up?C.teal:C.rose }}>{s.change}</div>
          </div>
        ))}
      </div>

      {/* Mid row */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:24 }}>
        {/* GPA Performance */}
        <Panel>
          <PanelHeader title="Academic Performance" link="Full Report"/>
          <div style={{ display:"flex", alignItems:"center", gap:18, marginBottom:18 }}>
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="35" fill="none" stroke={C.surface2} strokeWidth="7"/>
              <circle cx="40" cy="40" r="35" fill="none" stroke={C.gold} strokeWidth="7" strokeLinecap="round" strokeDasharray="220" strokeDashoffset="44" transform="rotate(-90 40 40)"/>
              <text x="40" y="37" textAnchor="middle" fontSize="14" fontWeight="700" fill={C.gold} fontFamily={font}>8.6</text>
              <text x="40" y="51" textAnchor="middle" fontSize="9" fill={C.textMuted}>GPA</text>
            </svg>
            <div>
              <div style={{ fontFamily:font, fontSize:34, fontWeight:700, color:C.gold, lineHeight:1 }}>8.6 <span style={{ fontSize:14, color:C.textDim }}>/ 10</span></div>
              <div style={{ fontSize:12, color:C.textMuted, marginTop:4 }}>Cumulative GPA — Above Average</div>
              <div style={{ marginTop:10, padding:"7px 12px", background:C.goldDim, borderRadius:8, display:"inline-flex", gap:6 }}>
                <span style={{ fontSize:12, fontWeight:500, color:C.gold }}>🏅 Class Rank: #14 of 120</span>
              </div>
            </div>
          </div>
          {semesters.map((s,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:7 }}>
              <span style={{ fontSize:"11.5px", color:C.textMuted, width:56, flexShrink:0 }}>{s.label}</span>
              <div style={{ flex:1, height:5, background:C.surface2, borderRadius:3, overflow:"hidden" }}>
                <div style={{ width:`${s.pct}%`, height:"100%", background:s.color, borderRadius:3 }}/>
              </div>
              <span style={{ fontSize:"11.5px", fontFamily:mono, color:C.textMuted, width:28, textAlign:"right" }}>{s.val}</span>
            </div>
          ))}
        </Panel>

        {/* Subject Grades */}
        <Panel>
          <PanelHeader title="Subject Grades" link="All Marks"/>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {subjects.slice(0,4).map((s,i) => (
              <div key={i} className="grade-item" style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 12px", borderRadius:9, background:C.surface2, border:`1px solid ${C.border}`, cursor:"default" }}>
                <div style={{ width:32, height:32, borderRadius:8, background:`${s.color}18`, color:s.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, flexShrink:0 }}>{s.icon}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13, fontWeight:500, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{s.name}</div>
                  <div style={{ fontSize:11, color:C.textMuted }}>{s.credits}</div>
                </div>
                <div style={{ width:80 }}>
                  <div style={{ background:C.border, borderRadius:4, height:4, overflow:"hidden" }}>
                    <div style={{ width:`${s.score}%`, height:"100%", background:s.color, borderRadius:4 }}/>
                  </div>
                </div>
                <div style={{ fontFamily:mono, fontSize:13, fontWeight:500, color:s.color, minWidth:34, textAlign:"right" }}>{s.score}</div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Bottom row */}
      <div style={{ display:"grid", gridTemplateColumns:"1.3fr 1fr", gap:16 }}>
        {/* Assignments preview */}
        <Panel>
          <PanelHeader title="Assignments" link="View All"/>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {allAssignments.slice(0,5).map((a,i) => (
              <div key={i} className="assign-item" style={{ display:"flex", alignItems:"flex-start", gap:12, padding:12, borderRadius:9, background:C.surface2, border:`1px solid ${C.border}`, cursor:"default" }}>
                <div style={{ width:8, height:8, borderRadius:"50%", marginTop:5, flexShrink:0, ...statusDot(a.status) }}/>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13, fontWeight:500 }}>{a.title}</div>
                  <div style={{ fontSize:11, color:C.textMuted, marginTop:3 }}>{a.subject}</div>
                </div>
                <div style={{ fontSize:10, fontWeight:500, padding:"2px 8px", borderRadius:20, flexShrink:0, ...tagStyle(a.tag) }}>{a.tag}</div>
              </div>
            ))}
          </div>
        </Panel>

        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {/* Attendance widget */}
          <Panel>
            <PanelHeader title="Weekly Attendance" link="Full Log"/>
            <div style={{ display:"flex", gap:6, alignItems:"flex-end", height:80, marginBottom:10 }}>
              {weekAtt.map((d,i) => (
                <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4, flex:1 }}>
                  <div style={{ width:"100%", height:d.h, borderRadius:"4px 4px 0 0", background:d.present ? `linear-gradient(to top,${C.teal},rgba(78,205,196,0.5))` : `linear-gradient(to top,${C.rose},rgba(248,113,113,0.5))` }}/>
                  <span style={{ fontSize:10, color:C.textDim, fontFamily:mono }}>{d.day}</span>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:16, marginBottom:14 }}>
              {[[C.teal,"Present"],[C.rose,"Absent"]].map(([c,l]) => (
                <div key={l} style={{ display:"flex", alignItems:"center", gap:5, fontSize:11, color:C.textMuted }}>
                  <div style={{ width:7, height:7, borderRadius:"50%", background:c }}/>
                  {l}
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:10 }}>
              {[["47",C.teal,"Present"],["6",C.rose,"Absent"],["89%",C.gold,"Overall"]].map(([v,c,l]) => (
                <div key={l} style={{ flex:1, textAlign:"center", padding:"10px 8px", borderRadius:9, border:`1px solid ${C.border}`, background:C.surface2 }}>
                  <div style={{ fontFamily:font, fontSize:20, fontWeight:600, color:c }}>{v}</div>
                  <div style={{ fontSize:11, color:C.textMuted, marginTop:2 }}>{l}</div>
                </div>
              ))}
            </div>
          </Panel>

          {/* Notifications preview */}
          <Panel>
            <PanelHeader title="Notifications" link="All"/>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {allNotifications.slice(0,3).map((n,i) => (
                <div key={i} style={{ display:"flex", gap:10, padding:"11px 12px", borderRadius:9, background:C.surface2, border:`1px solid ${C.border}` }}>
                  <span style={{ fontSize:16, flexShrink:0, marginTop:1 }}>{n.icon}</span>
                  <div>
                    <div style={{ fontSize:"12.5px", color:C.textMuted, lineHeight:1.5 }}>
                      <strong style={{ color:C.text, fontWeight:500 }}>{n.bold}</strong> {n.text}
                    </div>
                    <div style={{ fontSize:"10.5px", color:C.textDim, marginTop:3, fontFamily:mono }}>{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   PAGE: PERFORMANCE
═══════════════════════════════════════ */
function PagePerformance() {
  const bars = [
    { label:"Internal Avg",  val:85, color:C.teal   },
    { label:"Assignment Avg",val:88, color:C.gold   },
    { label:"Midterm Avg",   val:80, color:C.purple },
    { label:"Overall",       val:86, color:C.rose   },
  ];
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
        {/* Radar-like bar chart */}
        <Panel>
          <PanelHeader title="Performance Overview"/>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {bars.map((b,i) => (
              <div key={i}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                  <span style={{ fontSize:13, color:C.textMuted }}>{b.label}</span>
                  <span style={{ fontSize:13, fontFamily:mono, color:b.color }}>{b.val}%</span>
                </div>
                <div style={{ height:8, background:C.surface2, borderRadius:4, overflow:"hidden" }}>
                  <div style={{ width:`${b.val}%`, height:"100%", background:`linear-gradient(90deg, ${b.color}, ${b.color}88)`, borderRadius:4 }}/>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        {/* GPA Trend */}
        <Panel>
          <PanelHeader title="GPA Trend"/>
          <div style={{ display:"flex", alignItems:"flex-end", gap:12, height:120, marginBottom:14 }}>
            {semesters.map((s,i) => (
              <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                <span style={{ fontSize:11, fontFamily:mono, color:s.color }}>{s.val}</span>
                <div style={{ width:"100%", height:`${s.pct*1.1}px`, borderRadius:"5px 5px 0 0", background:`linear-gradient(to top, ${s.color}, ${s.color}60)` }}/>
                <span style={{ fontSize:11, color:C.textDim }}>{s.label}</span>
              </div>
            ))}
          </div>
          <div style={{ padding:"10px 14px", background:C.goldDim, borderRadius:9, border:`1px solid ${C.goldMid}` }}>
            <div style={{ fontSize:12, color:C.gold, fontWeight:500 }}>🏅 Consistent upward trend — Excellent progress!</div>
          </div>
        </Panel>
      </div>

      {/* Subject breakdown table */}
      <Panel>
        <PanelHeader title="Subject Performance Breakdown"/>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr>
                {["Subject","Credits","Score","Grade","Status"].map(h => (
                  <th key={h} style={{ textAlign:"left", fontSize:11, fontWeight:500, letterSpacing:"0.08em", textTransform:"uppercase", color:C.textDim, paddingBottom:12, borderBottom:`1px solid ${C.border}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {subjects.map((s,i) => (
                <tr key={i}>
                  <td style={{ padding:"12px 0", borderBottom:`1px solid ${C.border}` }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ width:28, height:28, borderRadius:7, background:`${s.color}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13 }}>{s.icon}</div>
                      <span style={{ fontSize:13, fontWeight:500 }}>{s.name}</span>
                    </div>
                  </td>
                  <td style={{ fontSize:13, color:C.textMuted, padding:"12px 0", borderBottom:`1px solid ${C.border}` }}>{s.credits}</td>
                  <td style={{ padding:"12px 0", borderBottom:`1px solid ${C.border}` }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ width:60, height:4, background:C.surface2, borderRadius:2, overflow:"hidden" }}>
                        <div style={{ width:`${s.score}%`, height:"100%", background:s.color }}/>
                      </div>
                      <span style={{ fontSize:13, fontFamily:mono, color:s.color }}>{s.score}</span>
                    </div>
                  </td>
                  <td style={{ padding:"12px 0", borderBottom:`1px solid ${C.border}` }}>
                    <span style={{ fontSize:11, fontWeight:600, padding:"2px 9px", borderRadius:20, background:`${s.color}18`, color:s.color }}>{s.score>=90?"O":s.score>=80?"A+":"A"}</span>
                  </td>
                  <td style={{ padding:"12px 0", borderBottom:`1px solid ${C.border}` }}>
                    <span style={{ fontSize:11, padding:"2px 9px", borderRadius:20, background:C.tealDim, color:C.teal }}>On Track</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

/* ════════════════════════════════
   PAGE: ATTENDANCE
═══════════════════════════════ */
function PageAttendance() {
  const months = [
    { m:"Jan", present:18, absent:2 },
    { m:"Feb", present:16, absent:3 },
    { m:"Mar", present:13, absent:1 },
  ];
  const subjectAtt = [
    { name:"Data Structures",     pct:92, present:23, total:25 },
    { name:"Operating Systems",   pct:84, present:21, total:25 },
    { name:"Discrete Mathematics",pct:80, present:20, total:25 },
    { name:"Computer Networks",   pct:74, present:18, total:24, warn:true },
    { name:"Database Systems",    pct:88, present:22, total:25 },
    { name:"Software Engineering",pct:96, present:24, total:25 },
  ];
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      {/* Summary chips */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
        {[["47","Classes Attended",C.teal],["6","Classes Missed",C.rose],["89%","Overall Rate",C.gold]].map(([v,l,c]) => (
          <Panel key={l}>
            <div style={{ fontFamily:font, fontSize:36, fontWeight:700, color:c, lineHeight:1 }}>{v}</div>
            <div style={{ fontSize:13, color:C.textMuted, marginTop:6 }}>{l}</div>
          </Panel>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
        {/* Monthly chart */}
        <Panel>
          <PanelHeader title="Monthly Attendance"/>
          <div style={{ display:"flex", gap:20, alignItems:"flex-end", height:120, marginBottom:12 }}>
            {months.map((m,i) => {
              const total = m.present + m.absent;
              return (
                <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                  <div style={{ width:"100%", display:"flex", flexDirection:"column", gap:3, alignItems:"center" }}>
                    <div style={{ width:"60%", height:m.absent*14, background:`linear-gradient(to top,${C.rose},${C.rose}80)`, borderRadius:"3px 3px 0 0" }}/>
                    <div style={{ width:"60%", height:m.present*5, background:`linear-gradient(to top,${C.teal},${C.teal}80)`, borderRadius:"3px 3px 0 0" }}/>
                  </div>
                  <span style={{ fontSize:12, color:C.textMuted }}>{m.m}</span>
                </div>
              );
            })}
          </div>
          <div style={{ display:"flex", gap:16 }}>
            {[[C.teal,"Present"],[C.rose,"Absent"]].map(([c,l]) => (
              <div key={l} style={{ display:"flex", alignItems:"center", gap:5, fontSize:12, color:C.textMuted }}>
                <div style={{ width:8, height:8, borderRadius:2, background:c }}/>
                {l}
              </div>
            ))}
          </div>
        </Panel>

        {/* Weekly chart */}
        <Panel>
          <PanelHeader title="This Week"/>
          <div style={{ display:"flex", gap:6, alignItems:"flex-end", height:100, marginBottom:10 }}>
            {weekAtt.map((d,i) => (
              <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4, flex:1 }}>
                <div style={{ width:"100%", height:d.h, borderRadius:"4px 4px 0 0", background:d.present?`linear-gradient(to top,${C.teal},rgba(78,205,196,0.5))`:`linear-gradient(to top,${C.rose},rgba(248,113,113,0.5))` }}/>
                <span style={{ fontSize:11, color:C.textDim, fontFamily:mono }}>{d.day}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Per-subject */}
      <Panel>
        <PanelHeader title="Subject-wise Attendance"/>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {subjectAtt.map((s,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:14, padding:"12px 14px", borderRadius:9, background:C.surface2, border:`1px solid ${s.warn?"rgba(248,113,113,0.25)":C.border}` }}>
              <div style={{ flex:1, fontSize:13, fontWeight:500 }}>{s.name}</div>
              <span style={{ fontSize:12, color:C.textMuted, fontFamily:mono, marginRight:8 }}>{s.present}/{s.total}</span>
              <div style={{ width:120, height:5, background:C.border, borderRadius:3, overflow:"hidden" }}>
                <div style={{ width:`${s.pct}%`, height:"100%", background:s.pct<80?C.rose:s.pct>=90?C.teal:C.gold, borderRadius:3 }}/>
              </div>
              <span style={{ fontSize:13, fontFamily:mono, color:s.pct<80?C.rose:s.pct>=90?C.teal:C.gold, width:40, textAlign:"right" }}>{s.pct}%</span>
              {s.warn && <span style={{ fontSize:10, padding:"2px 7px", borderRadius:20, background:C.roseDim, color:C.rose }}>⚠ Low</span>}
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* ════════════════════════════════
   PAGE: ASSIGNMENTS
═══════════════════════════════ */
function PageAssignments() {
  const [filter, setFilter] = useState("All");
  const filters = ["All","Pending","Submitted","Overdue"];
  const filtered = filter==="All" ? allAssignments : allAssignments.filter(a => filter==="Pending"?a.status==="pending":filter==="Submitted"?a.status==="submitted":a.status==="late");
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      {/* Summary */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
        {[
          ["3","Pending",C.gold],["2","Overdue",C.rose],["4","Submitted",C.teal],["7","Total",C.purple]
        ].map(([v,l,c]) => (
          <Panel key={l}>
            <div style={{ fontFamily:font, fontSize:32, fontWeight:700, color:c }}>{v}</div>
            <div style={{ fontSize:13, color:C.textMuted, marginTop:4 }}>{l} Assignments</div>
          </Panel>
        ))}
      </div>

      <Panel>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
          <span style={{ fontFamily:font, fontSize:15, fontWeight:600 }}>All Assignments</span>
          <div style={{ display:"flex", gap:6 }}>
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                style={{ padding:"5px 12px", borderRadius:8, border:`1px solid ${filter===f?C.goldMid:C.border}`, background:filter===f?C.goldDim:"transparent", color:filter===f?C.gold:C.textMuted, fontSize:12, fontWeight:filter===f?600:400, cursor:"pointer", fontFamily:body }}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {filtered.map((a,i) => (
            <div key={i} className="assign-item" style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 16px", borderRadius:10, background:C.surface2, border:`1px solid ${C.border}`, cursor:"default" }}>
              <div style={{ width:9, height:9, borderRadius:"50%", flexShrink:0, ...statusDot(a.status) }}/>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13.5, fontWeight:500 }}>{a.title}</div>
                <div style={{ fontSize:12, color:C.textMuted, marginTop:3 }}>{a.subject}</div>
              </div>
              <div style={{ fontSize:12, color:C.textMuted, minWidth:90, textAlign:"right" }}>
                {a.status==="submitted" ? `Due: ${a.due}` : `Due in ${a.due}`}
              </div>
              {a.marks && <div style={{ fontSize:12, fontFamily:mono, color:C.teal, background:C.tealDim, padding:"3px 9px", borderRadius:20 }}>{a.marks}</div>}
              <div style={{ fontSize:11, fontWeight:500, padding:"3px 10px", borderRadius:20, minWidth:72, textAlign:"center", ...tagStyle(a.tag) }}>{a.tag}</div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* ════════════════════════════════
   PAGE: COURSES
═══════════════════════════════ */
function PageCourses() {
  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
        {allCourses.map((c,i) => (
          <div key={i} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:14, padding:20, cursor:"default", position:"relative", overflow:"hidden", transition:"border 0.2s" }} className="grade-item">
            <div style={{ position:"absolute", top:0, right:0, width:100, height:100, background:`radial-gradient(circle at 80% 20%, ${c.color}10 0%, transparent 70%)`, pointerEvents:"none" }}/>
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:14 }}>
              <div style={{ width:44, height:44, borderRadius:11, background:`${c.color}18`, color:c.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>{c.icon}</div>
              <span style={{ fontSize:11, padding:"3px 9px", borderRadius:20, background:`${c.color}15`, color:c.color }}>{c.credits} Cr</span>
            </div>
            <div style={{ fontFamily:font, fontSize:15, fontWeight:600, marginBottom:4 }}>{c.name}</div>
            <div style={{ fontSize:12, color:C.textMuted, marginBottom:4 }}>{c.instructor}</div>
            <div style={{ fontSize:12, color:C.textDim, marginBottom:14 }}>{c.enrolled} students enrolled</div>
            <div style={{ marginBottom:8 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                <span style={{ fontSize:11, color:C.textMuted }}>Course Progress</span>
                <span style={{ fontSize:11, fontFamily:mono, color:c.color }}>{c.progress}%</span>
              </div>
              <div style={{ height:5, background:C.surface2, borderRadius:3, overflow:"hidden" }}>
                <div style={{ width:`${c.progress}%`, height:"100%", background:c.color, borderRadius:3 }}/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════
   PAGE: GRADES
═══════════════════════════════ */
function PageGrades() {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
        {[["8.6","CGPA",C.gold],["A+","Current Grade",C.teal],["#14","Class Rank",C.purple]].map(([v,l,c]) => (
          <Panel key={l}>
            <div style={{ fontFamily:font, fontSize:36, fontWeight:700, color:c }}>{v}</div>
            <div style={{ fontSize:13, color:C.textMuted, marginTop:6 }}>{l}</div>
          </Panel>
        ))}
      </div>
      <Panel>
        <PanelHeader title="Subject-wise Grades"/>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {subjects.map((s,i) => (
            <div key={i} className="assign-item" style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 16px", borderRadius:10, background:C.surface2, border:`1px solid ${C.border}` }}>
              <div style={{ width:36, height:36, borderRadius:9, background:`${s.color}18`, color:s.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>{s.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13.5, fontWeight:500 }}>{s.name}</div>
                <div style={{ fontSize:12, color:C.textMuted }}>{s.credits}</div>
              </div>
              <div style={{ width:100, height:5, background:C.border, borderRadius:3, overflow:"hidden" }}>
                <div style={{ width:`${s.score}%`, height:"100%", background:s.color }}/>
              </div>
              <div style={{ fontFamily:mono, fontSize:14, color:s.color, width:32, textAlign:"right" }}>{s.score}</div>
              <div style={{ width:36, height:36, borderRadius:9, background:`${s.color}15`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:font, fontSize:14, fontWeight:700, color:s.color }}>
                {s.score>=90?"O":s.score>=80?"A+":"A"}
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* ════════════════════════════════
   PAGE: MARKS
═══════════════════════════════ */
function PageMarks() {
  return (
    <Panel>
      <PanelHeader title="Marks Breakdown"/>
      <div style={{ overflowX:"auto" }}>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead>
            <tr>
              {["Subject","IA – 1","IA – 2","Assignment","Midterm","Total","Grade"].map(h => (
                <th key={h} style={{ textAlign:"left", fontSize:11, fontWeight:500, letterSpacing:"0.08em", textTransform:"uppercase", color:C.textDim, padding:"0 12px 14px 0", borderBottom:`1px solid ${C.border}`, whiteSpace:"nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allMarks.map((m,i) => (
              <tr key={i}>
                <td style={{ padding:"13px 12px 13px 0", borderBottom:`1px solid ${C.border}`, fontSize:13, fontWeight:500 }}>{m.subject}</td>
                {[m.ia1+"/30",m.ia2+"/30",m.assignment+"/50",m.midterm+"/50"].map((v,j) => (
                  <td key={j} style={{ padding:"13px 12px 13px 0", borderBottom:`1px solid ${C.border}`, fontSize:13, fontFamily:mono, color:C.textMuted }}>{v}</td>
                ))}
                <td style={{ padding:"13px 12px 13px 0", borderBottom:`1px solid ${C.border}` }}>
                  <span style={{ fontSize:13, fontFamily:mono, color:C.gold, fontWeight:600 }}>{m.total}/{m.max}</span>
                </td>
                <td style={{ padding:"13px 0", borderBottom:`1px solid ${C.border}` }}>
                  <span style={{ fontSize:12, fontWeight:600, padding:"3px 10px", borderRadius:20, background:`${gradeColor(m.grade)}18`, color:gradeColor(m.grade) }}>{m.grade}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

/* ════════════════════════════════
   PAGE: NOTIFICATIONS
═══════════════════════════════ */
function PageNotifications() {
  const [read, setRead] = useState([]);
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
        <span style={{ fontFamily:font, fontSize:16, fontWeight:600 }}>All Notifications</span>
        <button onClick={() => setRead(allNotifications.map((_,i)=>i))} style={{ fontSize:12, color:C.gold, background:"none", border:"none", cursor:"pointer", fontFamily:body }}>Mark all as read</button>
      </div>
      {allNotifications.map((n,i) => (
        <div key={i} onClick={() => setRead(r => r.includes(i) ? r : [...r,i])}
          style={{ display:"flex", gap:14, padding:"14px 16px", borderRadius:11, background: read.includes(i)?C.surface:C.surface2, border:`1px solid ${read.includes(i)?C.border:`${notifColor(n.type)}30`}`, cursor:"pointer", transition:"all 0.2s" }}>
          <div style={{ width:36, height:36, borderRadius:9, background:`${notifColor(n.type)}15`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, flexShrink:0 }}>{n.icon}</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:13.5, color:read.includes(i)?C.textMuted:C.text }}>
              <strong style={{ fontWeight:600, color:read.includes(i)?C.textMuted:C.text }}>{n.bold}</strong> {n.text}
            </div>
            <div style={{ fontSize:11, color:C.textDim, marginTop:4, fontFamily:mono }}>{n.time}</div>
          </div>
          {!read.includes(i) && <div style={{ width:8, height:8, borderRadius:"50%", background:notifColor(n.type), flexShrink:0, marginTop:5 }}/>}
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════════════
   PAGE: SETTINGS
═══════════════════════════════ */
function PageSettings() {
  const [notify, setNotify] = useState({ marks:true, attendance:true, assignments:false, system:true });
  const [name, setName] = useState("Arjun Kumar");
  const [email, setEmail] = useState("arjun.kumar@rvcollege.edu");
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20, maxWidth:680 }}>
      {/* Profile */}
      <Panel>
        <PanelHeader title="Profile Settings"/>
        <div style={{ display:"flex", alignItems:"center", gap:18, marginBottom:22, padding:"14px 16px", background:C.surface2, borderRadius:11, border:`1px solid ${C.border}` }}>
          <div style={{ width:56, height:56, borderRadius:"50%", background:"linear-gradient(135deg,#4ecdc4,#2d9e97)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:18, color:"#0d1117", flexShrink:0 }}>AK</div>
          <div>
            <div style={{ fontSize:16, fontWeight:600, color:C.text }}>{name}</div>
            <div style={{ fontSize:13, color:C.textMuted }}>{email}</div>
            <div style={{ fontSize:11, background:C.tealDim, color:C.teal, padding:"2px 9px", borderRadius:20, display:"inline-block", marginTop:5 }}>Student – Semester IV</div>
          </div>
        </div>
        {[["Full Name","text",name,setName],["Email","email",email,setEmail]].map(([l,t,v,sv]) => (
          <div key={l} style={{ marginBottom:14 }}>
            <label style={{ display:"block", fontSize:11, fontWeight:500, letterSpacing:"0.08em", textTransform:"uppercase", color:C.textDim, marginBottom:7 }}>{l}</label>
            <input value={v} onChange={e=>sv(e.target.value)} type={t}
              style={{ width:"100%", padding:"11px 14px", background:C.surface2, border:`1px solid ${C.border}`, borderRadius:9, fontSize:14, color:C.text, fontFamily:body, outline:"none" }}/>
          </div>
        ))}
        <button style={{ padding:"11px 22px", borderRadius:9, border:"none", background:"linear-gradient(135deg,#e8b96a,#c4973a)", color:"#0d1117", fontFamily:body, fontSize:14, fontWeight:600, cursor:"pointer" }}>Save Changes</button>
      </Panel>

      {/* Notifications */}
      <Panel>
        <PanelHeader title="Notification Preferences"/>
        {[["marks","New Marks & Grades","Get notified when marks are uploaded"],["attendance","Attendance Alerts","Warning when attendance drops below 75%"],["assignments","Assignment Reminders","Reminders for upcoming due dates"],["system","System Announcements","Important platform-wide announcements"]].map(([k,l,d]) => (
          <div key={k} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 0", borderBottom:`1px solid ${C.border}` }}>
            <div>
              <div style={{ fontSize:13.5, fontWeight:500 }}>{l}</div>
              <div style={{ fontSize:12, color:C.textMuted, marginTop:2 }}>{d}</div>
            </div>
            <div onClick={() => setNotify(n => ({...n,[k]:!n[k]}))} style={{ width:44, height:24, borderRadius:12, background:notify[k]?C.gold:C.surface2, border:`1px solid ${notify[k]?C.goldMid:C.border}`, position:"relative", cursor:"pointer", transition:"all 0.3s", flexShrink:0 }}>
              <div style={{ width:18, height:18, borderRadius:"50%", background:"white", position:"absolute", top:3, left:notify[k]?23:3, transition:"left 0.3s", boxShadow:"0 1px 4px rgba(0,0,0,0.3)" }}/>
            </div>
          </div>
        ))}
      </Panel>

      {/* Danger zone */}
      <Panel>
        <PanelHeader title="Account"/>
        <div style={{ display:"flex", gap:10 }}>
          <button style={{ padding:"10px 20px", borderRadius:9, border:`1px solid ${C.border}`, background:"transparent", color:C.textMuted, fontFamily:body, fontSize:13, cursor:"pointer" }}>Change Password</button>
          <button style={{ padding:"10px 20px", borderRadius:9, border:`1px solid rgba(248,113,113,0.3)`, background:C.roseDim, color:C.rose, fontFamily:body, fontSize:13, cursor:"pointer" }}>Sign Out</button>
        </div>
      </Panel>
    </div>
  );
}

/* ════════════════════════════════
   MAIN DASHBOARD SHELL
═══════════════════════════════ */
const pageMap = {
  "Dashboard":     <PageDashboard/>,
  "Performance":   <PagePerformance/>,
  "Attendance":    <PageAttendance/>,
  "Assignments":   <PageAssignments/>,
  "Courses":       <PageCourses/>,
  "Grades":        <PageGrades/>,
  "Marks":         <PageMarks/>,
  "Notifications": <PageNotifications/>,
  "Settings":      <PageSettings/>,
};

export default function Dashboard({ onLogout, role = "student" }) {
  const [active, setActive] = useState("Dashboard");

  return (
    <>
      <style>{`
        ${FONTS_IMPORT}
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        body { background:${C.bg}; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-thumb { background:${C.surface2}; border-radius:3px; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .stat-card { animation: fadeUp 0.5s ease both; }
        .nav-item:hover { background:${C.surface2} !important; color:${C.text} !important; }
        .grade-item:hover { border-color:${C.goldMid} !important; transition:border 0.2s; }
        .assign-item:hover { border-color:rgba(255,255,255,0.1) !important; transition:border 0.2s; }
      `}</style>

      <div style={{ display:"flex", height:"100vh", fontFamily:body, background:C.bg, color:C.text, overflow:"hidden" }}>

        {/* ── Sidebar ── */}
        <aside style={{ width:230, background:C.surface, borderRight:`1px solid ${C.border}`, display:"flex", flexDirection:"column", flexShrink:0, position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:-80, left:-80, width:250, height:250, background:"radial-gradient(circle,rgba(232,185,106,0.08) 0%,transparent 70%)", pointerEvents:"none" }}/>

          <div style={{ padding:"26px 24px 18px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:34, height:34, borderRadius:8, background:"linear-gradient(135deg,#e8b96a,#c4973a)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:font, fontWeight:700, fontSize:16, color:"#0d1117", boxShadow:"0 4px 14px rgba(232,185,106,0.35)", flexShrink:0 }}>E</div>
            <span style={{ fontFamily:font, fontSize:18, fontWeight:600 }}>Edu<span style={{ color:C.gold }}>Track</span></span>
          </div>

          <div style={{ padding:"18px 14px 10px", flex:1, overflowY:"auto" }}>
            {["Overview","Academic","System"].map(section => (
              <div key={section}>
                <div style={{ fontSize:10, fontWeight:500, letterSpacing:"0.12em", textTransform:"uppercase", color:C.textDim, padding:"0 10px", marginBottom:7, marginTop:section!=="Overview"?16:0 }}>{section}</div>
                {navItems.filter(n => n.section===section).map(n => (
                  <div key={n.label} className="nav-item" onClick={() => setActive(n.label)}
                    style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 12px", borderRadius:9, cursor:"pointer", marginBottom:2, fontSize:"13.5px", fontWeight:active===n.label?500:400, color:active===n.label?C.gold:C.textMuted, background:active===n.label?C.goldDim:"transparent", position:"relative", transition:"all 0.2s" }}>
                    {active===n.label && <div style={{ position:"absolute", left:0, top:"25%", height:"50%", width:3, background:C.gold, borderRadius:"0 3px 3px 0" }}/>}
                    <span style={{ width:16, textAlign:"center", fontSize:14, flexShrink:0 }}>{n.icon}</span>
                    {n.label}
                    {n.badge && <span style={{ marginLeft:"auto", background:C.rose, color:"white", fontSize:10, fontWeight:600, padding:"1px 6px", borderRadius:20 }}>{n.badge}</span>}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div style={{ margin:14, padding:"12px 14px", background:C.surface2, borderRadius:14, border:`1px solid ${C.border}`, display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:36, height:36, borderRadius:"50%", background:"linear-gradient(135deg,#4ecdc4,#2d9e97)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:600, fontSize:13, color:"#0d1117", flexShrink:0 }}>AK</div>
            <div>
              <div style={{ fontSize:13, fontWeight:500 }}>Arjun Kumar</div>
              <div style={{ fontSize:11, background:C.tealDim, color:C.teal, padding:"1px 7px", borderRadius:20, display:"inline-block", marginTop:2, textTransform:"capitalize" }}>{role}</div>
            </div>
            <button onClick={onLogout} title="Logout" style={{ marginLeft:"auto", background:"none", border:"none", cursor:"pointer", fontSize:16, color:C.textDim, flexShrink:0 }}>↩</button>
          </div>
        </aside>

        {/* ── Main ── */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
          {/* Topbar */}
          <div style={{ padding:"16px 30px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", background:C.surface, flexShrink:0 }}>
            <div>
              <h1 style={{ fontFamily:font, fontSize:22, fontWeight:600, letterSpacing:"0.01em" }}>{active}</h1>
              <p style={{ fontSize:13, color:C.textMuted, marginTop:2 }}>Semester IV &nbsp;·&nbsp; 2025–26</p>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, background:C.surface2, border:`1px solid ${C.border}`, borderRadius:9, padding:"7px 14px", fontSize:13, color:C.textMuted }}>
                🔍 &nbsp;Search…
              </div>
              <div style={{ padding:"6px 14px", borderRadius:9, background:C.goldDim, border:`1px solid ${C.goldMid}`, fontSize:12, fontWeight:500, color:C.gold, fontFamily:mono }}>
                SEM – IV
              </div>
              <div style={{ width:36, height:36, borderRadius:9, background:C.surface2, border:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", position:"relative", fontSize:15 }}
                onClick={() => setActive("Notifications")}>
                🔔
                <div style={{ position:"absolute", top:7, right:7, width:7, height:7, background:C.rose, borderRadius:"50%", border:`1.5px solid ${C.surface}` }}/>
              </div>
            </div>
          </div>

          {/* Page content */}
          <div style={{ flex:1, overflowY:"auto", padding:"26px 30px" }}>
            {pageMap[active]}
          </div>
        </div>
      </div>
    </>
  );
}
