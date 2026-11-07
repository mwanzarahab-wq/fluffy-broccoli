import { useState, useMemo } from "react";

const ME = {
  name: "Rahab Mwanza",
  title: "Full Stack Developer",
  email: "mwanza.rahab@cs.unza.zm",
  github: "https://github.com/mwanzarahab-wq",
  linkedin: "https://www.linkedin.com/in/rahab-juvenalis-mwanza-543311261",
  cv: "/Rahab_Mwanza_CV.pdf",
};

const SKILLS = [["Frontend", 9], ["Backend", 6], ["DevOps", 5], ["Mobile", 3], ["UI/UX", 8]];

const PROJECTS = [
  { title: "Mitengo", kind: "PWA", badge: "Girls in STEM Innovation Award", link: "https://m-tengo.vercel.app/",
    desc: "A price-checking PWA with basket, watchlist, wholesale and margin tools, receipts and price scouts.",
    tags: ["PWA", "Supabase", "JavaScript", "Vercel"] },
  { title: "CBT Pal", kind: "HEALTH", link: "https://lebk.vercel.app/",
    desc: "A CBT companion for students: symptom check-in, thought-record journal, daily planner and learning articles.",
    tags: ["React", "Vercel", "PWA"] },
  { title: "NeuroShift", kind: "MOBILE", link: null,
    desc: "A habit-breaking app with a daily command center, brain rewiring lessons and an encrypted data vault.",
    tags: ["NestJS", "React Native", "TypeScript", "SQLite"] },
  { title: "Nyumba Yanga", kind: "PROPTECH", link: null,
    desc: "A rental PWA for Zambia with listings, landmark search, messaging and an offline mode. In progress.",
    tags: ["Next.js", "Prisma", "PostgreSQL", "Tailwind"] },
  { title: "To-Do Web App", kind: "WEB", link: "https://vermillion-pegasus-7b7462.netlify.app/",
    desc: "A schedule-planning to-do app with inline editing, timestamps, local storage and four widget styles.",
    tags: ["JavaScript", "HTML/CSS"] },
];

const TIMELINE = [
  { when: "Nov 2026 - Jan 2027", role: "Full Stack Developer Intern @ Gladtidings Software Limited", text: "Building and shipping full stack web features end to end." },
  { when: "Nov 2026", role: "Full Stack Development Intern @ SaiKet Systems", text: "Completing full stack tasks, documented on GitHub with demo videos." },
  { when: "Oct 2026", role: "Web Development Intern @ Oasis Infobyte", text: "Built responsive apps in vanilla JavaScript, including a to-do app and a login authentication system." },
  { when: "Jan 2023 - Present", role: "Sales & Data Entry Secretary @ Mud Boutique Warehouse", text: "Serving customers and maintaining SQL and Excel inventory databases, with reports that support management decisions." },
  { when: "2023 - 2027", role: "BSc Computer Science @ University of Zambia", text: "Studying computer science while shipping real projects." },
  { when: "Aug - Oct 2022", role: "Enumerator @ Zambia 2022 Census of Population and Housing", text: "Collected and validated census data on tablets, meeting daily submission targets." },
];

const SERVICES = [
  ["</>", "Custom Web Apps", "End-to-end web applications with clean UI, secure auth and a solid database behind them."],
  ["PWA", "Progressive Web Apps", "Installable, offline-friendly apps that work well on slow networks and low-end phones."],
  ["UX", "UI Design to Code", "Turning a design reference into a pixel-careful, responsive interface."],
];

const TECH = ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "Supabase", "Tailwind", "Prisma", "NestJS", "React Native"];

function Radar() {
  const cx = 150, cy = 150, R = 100, n = SKILLS.length;
  const pt = (i, v) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    return [cx + Math.cos(a) * (R * v) / 10, cy + Math.sin(a) * (R * v) / 10];
  };
  const ring = (v) => SKILLS.map((_, i) => pt(i, v).join(",")).join(" ");
  return (
    <svg viewBox="0 0 300 300" className="radar" role="img" aria-label="Proficiency radar chart">
      {[2, 4, 6, 8, 10].map((v) => <polygon key={v} points={ring(v)} className="ring" />)}
      {SKILLS.map((_, i) => { const [x, y] = pt(i, 10); return <line key={i} x1={cx} y1={cy} x2={x} y2={y} className="ring" />; })}
      <polygon points={SKILLS.map(([, v], i) => pt(i, v).join(",")).join(" ")} className="area" />
      {SKILLS.map(([l, v], i) => { const [x, y] = pt(i, v); return <circle key={l} cx={x} cy={y} r="4" className="dot" />; })}
      {SKILLS.map(([l], i) => { const [x, y] = pt(i, 11.9); return <text key={l} x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="rlabel">{l.toUpperCase()}</text>; })}
    </svg>
  );
}

function Bubbles({ filter, setFilter }) {
  const counts = useMemo(() => {
    const c = {};
    PROJECTS.forEach((p) => p.tags.forEach((t) => (c[t] = (c[t] || 0) + 1)));
    return Object.entries(c).sort((a, b) => b[1] - a[1]);
  }, []);
  return (
    <div className="bubbles">
      {counts.map(([t, c], i) => (
        <button key={t} onClick={() => setFilter(filter === t ? null : t)}
          className={"bubble" + (filter === t ? " on" : "")}
          style={{ width: 64 + c * 14, height: 64 + c * 14, "--h": (i * 47) % 360 }}>{t}</button>
      ))}
    </div>
  );
}

function Chat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ b: true, t: "Hi! I'm Rahab's assistant. Ask me about her projects, skills, experience or how to contact her." }]);
  const [v, setV] = useState("");
  const answer = (q) => {
    const s = q.toLowerCase();
    if (/project|work|built|app/.test(s)) return "Rahab has built Mitengo (Girls in STEM Innovation Award), CBT Pal, NeuroShift, Nyumba Yanga and a To-Do web app. See Selected Work.";
    if (/skill|stack|tech|react/.test(s)) return "Strongest in frontend (React, Next.js) and UI, with backend work in Node.js, NestJS, Supabase and PostgreSQL.";
    if (/resume|cv|download/.test(s)) return "You can download Rahab's resume with the Download Resume button at the top of the page.";
    if (/contact|email|hire|call|reach/.test(s)) return "Email " + ME.email + " or message her on LinkedIn.";
    if (/intern|experience|educat|study|unza|school/.test(s)) return "Rahab studies Computer Science at UNZA (2023-2027) and has interned at Oasis Infobyte, SaiKet Systems and Gladtidings Software Limited.";
    return "I can tell you about Rahab's projects, skills, experience or contact details. What would you like to know?";
  };
  const send = (e) => {
    e.preventDefault();
    if (!v.trim()) return;
    setMsgs((m) => [...m, { t: v }, { b: true, t: answer(v) }]);
    setV("");
  };
  return (
    <>
      {open && (
        <div className="chat" role="dialog" aria-label="Chat assistant">
          <div className="chat-h"><b>Rahab Assistant</b><button onClick={() => setOpen(false)} aria-label="Close chat">✕</button></div>
          <div className="chat-b">{msgs.map((m, i) => <p key={i} className={m.b ? "bot" : "me"}>{m.t}</p>)}</div>
          <form onSubmit={send}><input value={v} onChange={(e) => setV(e.target.value)} placeholder="Type a message..." aria-label="Message" /><button>➤</button></form>
        </div>
      )}
      <button className="fab" onClick={() => setOpen(!open)} aria-label="Open chat">💬<i /></button>
    </>
  );
}

export default function App() {
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState(null);
  const shown = PROJECTS.filter((p) => !filter || p.tags.includes(filter));
  const go = () => setMenu(false);
  return (
    <>
      <header className="nav">
        <a className="logo" href="#top"><span>&gt;_</span> RAHAB</a>
        <button className="burger" onClick={() => setMenu(!menu)} aria-label="Menu" aria-expanded={menu}>☰</button>
        <nav className={menu ? "links open" : "links"}>
          {[["work", "Work"], ["timeline", "Timeline"], ["services", "Services"], ["contact", "Contact"]].map(([id, l]) => <a key={id} href={"#" + id} onClick={go}>{l}</a>)}
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="avatar"><div className="orbit"><i /></div><img src="/profile.jpg" alt="Rahab Mwanza" onError={(e) => (e.currentTarget.style.display = "none")} /></div>
          <p className="pill"><b /> Open to employment and projects</p>
          <h1>{ME.name}<span>{ME.title}</span></h1>
          <p className="sub">I build fast, accessible web apps and PWAs for real problems in Zambia, from price transparency to student wellbeing.</p>
          <div className="btns"><a className="btn" href="#work">View Selected Work ↓</a><a className="btn ghost" href={ME.cv} download>Download Resume</a></div>
        </section>

        <section className="marq" aria-label="Technologies">
          <p className="mono">POWERING NEXT-GEN APPS WITH</p>
          <div className="track">{[...TECH, ...TECH].map((t, i) => <span key={i}><em>{t[0]}</em>{t}</span>)}</div>
        </section>

        <section className="stats wrap">
          {[["3", "Internships"], ["5", "Projects built"], ["1", "Innovation award"]].map(([n, l]) => <div key={l} className="card"><h3>{n}</h3><p>{l}</p></div>)}
        </section>

        <section className="wrap grid2">
          <div className="card">
            <div className="row"><h2>◎ Proficiency Radar</h2><span className="tag mono">LIVE DATA</span></div>
            <Radar />
          </div>
          <div className="card">
            <div className="row"><div><h2>Tech Frequency</h2><p className="muted">Usage across my projects. Tap one to filter.</p></div>
              <button className="link" onClick={() => setFilter(null)}>Reset Filter</button></div>
            <Bubbles filter={filter} setFilter={setFilter} />
          </div>
        </section>

        <section id="work" className="wrap">
          <h2 className="big">Selected Work</h2>
          <p className="muted">Projects where I led design and engineering{filter ? " (filtered by " + filter + ")" : ""}.</p>
          <div className="works">
            {shown.map((p, i) => (
              <article key={p.title} className={"work" + (i === 0 ? " feat" : "")} style={{ "--h": 150 + ((i * 12) % 40) }}>
                <span className="kind mono">{p.kind}</span>
                {p.badge && <span className="award">🏆 {p.badge}</span>}
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="tags">{p.tags.map((t) => <span key={t} className="tag mono">{t}</span>)}</div>
                {p.link ? <a href={p.link} target="_blank" rel="noopener noreferrer">View Project ↗</a> : <small>Link coming soon</small>}
              </article>
            ))}
          </div>
        </section>

        <section id="timeline" className="wrap">
          <h2 className="big">Impact Timeline</h2>
          <ol className="tl">{TIMELINE.map((t, i) => (
            <li key={t.role} className={i === 0 ? "now" : ""}><span className="tag mono">{t.when}</span><h3>{t.role}</h3><p>{t.text}</p></li>
          ))}</ol>
        </section>

        <section id="services" className="wrap">
          <h2 className="big">Built for real problems. <em>Business logic.</em></h2>
          <div className="svc">{SERVICES.map(([i, h, p]) => <div key={h} className="card"><b className="ico mono">{i}</b><h3>{h}</h3><p>{p}</p></div>)}</div>
        </section>

        <section className="wrap">
          <div className="code">
            <div className="bar"><i /><i /><i /><span className="tag mono">rahab.ts</span></div>
            <pre>{`const rahab = {
  role: "Full Stack Developer",
  studying: "BSc Computer Science, UNZA",
  stack: ["React", "Next.js", "Node", "Supabase"],
  award: "Girls in STEM Innovation",
  available: true,
};`}</pre>
          </div>
        </section>

        <section id="contact" className="wrap">
          <div className="card cta">
            <div className="rocket">🚀</div>
            <h2>Have a project in mind?</h2>
            <p className="muted">I'm open to employment, collaborations and freelance work. Let's build something useful together.</p>
            <a className="btn" href={"mailto:" + ME.email}>Say Hello</a>
            <div className="social"><a href={ME.cv} download>Resume</a><a href={ME.github} target="_blank" rel="noopener noreferrer">GitHub</a><a href={ME.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a><a href={"mailto:" + ME.email}>Email</a></div>
          </div>
        </section>
      </main>
      <footer>© 2026 {ME.name}. Built with React and Vite.</footer>
      <Chat />
    </>
  );
}
