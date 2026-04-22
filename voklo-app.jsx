import { useState, useRef } from "react";

/* ─── THEME ─── */
const T = {
  bg: "#F7F6F3",
  white: "#FFFFFF",
  card: "#FFFFFF",
  border: "#E8E5DF",
  borderDark: "#D4D0C8",
  accent: "#2563EB",
  accentLight: "#EFF6FF",
  accentMid: "#BFDBFE",
  green: "#16A34A",
  greenLight: "#F0FDF4",
  greenMid: "#BBF7D0",
  red: "#DC2626",
  redLight: "#FEF2F2",
  orange: "#EA580C",
  orangeLight: "#FFF7ED",
  text: "#1A1A1A",
  textMid: "#4B5563",
  muted: "#9CA3AF",
  shadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
  shadowMd: "0 4px 6px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.04)",
  shadowLg: "0 10px 15px rgba(0,0,0,0.08), 0 4px 6px rgba(0,0,0,0.04)",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { height: 100%; }

  body {
    background: ${T.bg};
    color: ${T.text};
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
  }

  .layout { display: flex; height: 100vh; overflow: hidden; }

  /* ── Sidebar ── */
  .sidebar {
    width: 230px;
    min-width: 230px;
    background: ${T.white};
    border-right: 1px solid ${T.border};
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }

  .sidebar-top {
    padding: 24px 20px 16px;
    border-bottom: 1px solid ${T.border};
  }

  .logo {
    font-size: 22px;
    font-weight: 800;
    color: ${T.accent};
    letter-spacing: -0.5px;
  }

  .logo-tagline {
    font-size: 11.5px;
    color: ${T.muted};
    margin-top: 2px;
    font-weight: 500;
  }

  .nav { padding: 12px 10px; flex: 1; }

  .nav-label {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${T.muted};
    padding: 10px 10px 6px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 12px;
    border-radius: 10px;
    font-size: 13.5px;
    font-weight: 600;
    color: ${T.textMid};
    cursor: pointer;
    transition: all 0.12s;
    margin-bottom: 2px;
    user-select: none;
  }

  .nav-item:hover { background: ${T.bg}; color: ${T.text}; }
  .nav-item.active { background: ${T.accentLight}; color: ${T.accent}; }

  .nav-icon {
    width: 32px; height: 32px;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 15px;
    background: ${T.bg};
    flex-shrink: 0;
    transition: background 0.12s;
  }

  .nav-item.active .nav-icon { background: ${T.accentMid}; }

  .nav-step {
    width: 20px; height: 20px;
    border-radius: 50%;
    background: ${T.border};
    color: ${T.muted};
    font-size: 10px;
    font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    margin-left: auto;
  }

  .nav-item.active .nav-step, .nav-item.done .nav-step {
    background: ${T.accentMid};
    color: ${T.accent};
  }

  .nav-item.done .nav-step { background: ${T.greenMid}; color: ${T.green}; }

  .sidebar-bottom {
    padding: 14px 16px;
    border-top: 1px solid ${T.border};
    margin: 0 10px 10px;
    background: ${T.bg};
    border-radius: 12px;
  }

  .biz-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; color: ${T.muted}; }
  .biz-name { font-size: 13px; font-weight: 700; color: ${T.text}; margin-top: 2px; }

  /* ── Main ── */
  .main { flex: 1; overflow-y: auto; }
  .main-inner { padding: 36px 44px; max-width: 820px; }

  /* ── Page Header ── */
  .page-header { margin-bottom: 28px; }

  .step-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: ${T.accentLight};
    color: ${T.accent};
    font-size: 11px;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 20px;
    margin-bottom: 10px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .page-title {
    font-size: 24px;
    font-weight: 800;
    letter-spacing: -0.3px;
    color: ${T.text};
    margin-bottom: 6px;
  }

  .page-sub { color: ${T.textMid}; font-size: 14px; line-height: 1.6; font-weight: 500; }

  /* ── Cards ── */
  .card {
    background: ${T.white};
    border: 1px solid ${T.border};
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 16px;
    box-shadow: ${T.shadow};
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;
  }

  .card-title {
    font-size: 15px;
    font-weight: 700;
    color: ${T.text};
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .card-icon {
    width: 34px; height: 34px;
    border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
    background: ${T.bg};
  }

  /* ── Badges ── */
  .badge {
    font-size: 11px; font-weight: 700;
    padding: 3px 9px; border-radius: 20px;
    display: inline-flex; align-items: center; gap: 4px;
  }
  .badge-blue { background: ${T.accentLight}; color: ${T.accent}; }
  .badge-green { background: ${T.greenLight}; color: ${T.green}; }
  .badge-orange { background: ${T.orangeLight}; color: ${T.orange}; }
  .badge-gray { background: ${T.bg}; color: ${T.textMid}; border: 1px solid ${T.border}; }

  /* ── Drop Zone ── */
  .drop-zone {
    border: 2px dashed ${T.borderDark};
    border-radius: 14px;
    padding: 40px 24px;
    text-align: center;
    cursor: pointer;
    transition: all 0.15s;
    background: ${T.bg};
    margin-bottom: 16px;
  }
  .drop-zone:hover, .drop-zone.dragging {
    border-color: ${T.accent};
    background: ${T.accentLight};
  }

  .drop-icon-wrap {
    width: 56px; height: 56px;
    border-radius: 14px;
    background: ${T.white};
    border: 1px solid ${T.border};
    display: flex; align-items: center; justify-content: center;
    font-size: 24px;
    margin: 0 auto 14px;
    box-shadow: ${T.shadow};
  }

  .drop-title { font-size: 15px; font-weight: 700; color: ${T.text}; margin-bottom: 4px; }
  .drop-sub { font-size: 13px; color: ${T.muted}; font-weight: 500; }

  /* ── Image Grid ── */
  .image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(88px, 1fr));
    gap: 10px;
    margin-bottom: 16px;
  }

  .img-item {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    aspect-ratio: 1;
    border: 2px solid ${T.border};
    transition: border-color 0.12s;
    cursor: default;
    box-shadow: ${T.shadow};
  }
  .img-item.used { opacity: 0.45; }
  .img-item:not(.used):hover { border-color: ${T.accent}; }

  .img-item img { width: 100%; height: 100%; object-fit: cover; display: block; }

  .img-queued-label {
    position: absolute; bottom: 0; left: 0; right: 0;
    background: ${T.green};
    color: white;
    font-size: 9px; font-weight: 700;
    text-align: center;
    padding: 3px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .img-remove {
    position: absolute; top: 4px; right: 4px;
    background: rgba(0,0,0,0.55);
    color: white; border: none;
    border-radius: 6px;
    width: 20px; height: 20px;
    font-size: 11px; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    opacity: 0; transition: opacity 0.12s;
  }
  .img-item:hover .img-remove { opacity: 1; }

  /* ── Queue Summary ── */
  .queue-summary {
    display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 16px;
  }

  .q-stat {
    background: ${T.bg};
    border: 1px solid ${T.border};
    border-radius: 10px;
    padding: 10px 16px;
    flex: 1; min-width: 100px;
    text-align: center;
  }
  .q-stat-val { font-size: 22px; font-weight: 800; color: ${T.text}; line-height: 1; }
  .q-stat-lbl { font-size: 11px; font-weight: 600; color: ${T.muted}; margin-top: 3px; text-transform: uppercase; letter-spacing: 0.05em; }

  /* ── Schedule ── */
  .schedule-section { margin-bottom: 22px; }
  .s-label { font-size: 12px; font-weight: 700; color: ${T.textMid}; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.06em; }

  .day-row { display: flex; gap: 7px; flex-wrap: wrap; }

  .day-btn {
    width: 44px; height: 44px;
    border-radius: 11px;
    border: 1.5px solid ${T.border};
    background: ${T.bg};
    color: ${T.textMid};
    font-size: 12px; font-weight: 700;
    cursor: pointer;
    transition: all 0.12s;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .day-btn:hover { border-color: ${T.accent}; color: ${T.accent}; }
  .day-btn.on { border-color: ${T.accent}; background: ${T.accent}; color: white; box-shadow: 0 2px 8px ${T.accent}40; }

  .time-row { display: flex; gap: 12px; }

  .s-input {
    background: ${T.bg};
    border: 1.5px solid ${T.border};
    border-radius: 10px;
    color: ${T.text};
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px; font-weight: 600;
    padding: 10px 14px;
    outline: none;
    transition: border-color 0.12s;
    flex: 1;
  }
  .s-input:focus { border-color: ${T.accent}; background: ${T.white}; }
  select.s-input { cursor: pointer; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%239CA3AF' d='M6 8L0 0h12z'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; padding-right: 36px; background-color: #F7F6F3; }
  select.s-input option { background: white; }

  /* ── Platform buttons ── */
  .platform-grid { display: flex; gap: 8px; flex-wrap: wrap; }

  .platform-btn {
    display: flex; align-items: center; gap: 7px;
    padding: 8px 14px;
    border-radius: 10px;
    border: 1.5px solid ${T.border};
    background: ${T.bg};
    color: ${T.textMid};
    font-size: 13px; font-weight: 600;
    cursor: pointer; transition: all 0.12s;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .platform-btn:hover { border-color: ${T.accent}; color: ${T.accent}; background: ${T.accentLight}; }
  .platform-btn.on { border-color: ${T.accent}; background: ${T.accentLight}; color: ${T.accent}; }

  /* ── Tone ── */
  .tone-grid { display: flex; gap: 7px; flex-wrap: wrap; }
  .tone-btn {
    padding: 7px 15px; border-radius: 20px;
    border: 1.5px solid ${T.border};
    background: ${T.bg}; color: ${T.textMid};
    font-size: 13px; font-weight: 600;
    cursor: pointer; transition: all 0.12s;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .tone-btn:hover { border-color: ${T.accent}; color: ${T.accent}; }
  .tone-btn.on { border-color: ${T.accent}; background: ${T.accent}; color: white; }

  /* ── Preview Box ── */
  .preview-box {
    background: ${T.accentLight};
    border: 1px solid ${T.accentMid};
    border-radius: 12px;
    padding: 14px 18px;
    font-size: 13.5px;
    font-weight: 600;
    color: ${T.accent};
    line-height: 1.6;
  }

  /* ── Buttons ── */
  .btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 11px 22px; border-radius: 11px;
    font-size: 14px; font-weight: 700;
    cursor: pointer; transition: all 0.12s;
    border: none; font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .btn-blue { background: ${T.accent}; color: white; box-shadow: 0 2px 8px ${T.accent}40; }
  .btn-blue:hover { background: #1D4ED8; transform: translateY(-1px); box-shadow: 0 4px 14px ${T.accent}50; }
  .btn-blue:disabled { background: ${T.accentMid}; color: ${T.accent}; cursor: not-allowed; transform: none; box-shadow: none; }
  .btn-outline { background: white; color: ${T.textMid}; border: 1.5px solid ${T.border}; }
  .btn-outline:hover { border-color: ${T.borderDark}; color: ${T.text}; }

  .btn-row { display: flex; gap: 10px; margin-top: 20px; flex-wrap: wrap; align-items: center; }

  /* ── Status Banner ── */
  .status-banner {
    display: flex; align-items: center; gap: 12px;
    padding: 14px 18px; border-radius: 13px;
    font-size: 14px; font-weight: 600;
    margin-bottom: 18px;
  }
  .status-live { background: ${T.greenLight}; color: ${T.green}; border: 1px solid ${T.greenMid}; }
  .status-warn { background: ${T.orangeLight}; color: ${T.orange}; border: 1px solid #FED7AA; }

  .pulse { width: 10px; height: 10px; border-radius: 50%; background: currentColor; animation: pulse 1.5s ease infinite; flex-shrink: 0; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.7)} }

  /* ── Stats Row ── */
  .stats-row { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; margin-bottom: 18px; }
  .stat-card { background: ${T.white}; border: 1px solid ${T.border}; border-radius: 14px; padding: 18px; box-shadow: ${T.shadow}; }
  .stat-val { font-size: 28px; font-weight: 800; color: ${T.accent}; line-height: 1; margin-bottom: 4px; }
  .stat-lbl { font-size: 11.5px; font-weight: 600; color: ${T.muted}; text-transform: uppercase; letter-spacing: 0.05em; }

  /* ── Calendar ── */
  .cal-nav-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
  .cal-month-label { font-size: 17px; font-weight: 800; color: ${T.text}; }
  .cal-btn { background: ${T.bg}; border: 1.5px solid ${T.border}; color: ${T.textMid}; border-radius: 9px; padding: 7px 14px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.12s; font-family: 'Plus Jakarta Sans', sans-serif; }
  .cal-btn:hover { border-color: ${T.accent}; color: ${T.accent}; }

  .cal-grid { display: grid; grid-template-columns: repeat(7,1fr); gap: 4px; }
  .cal-day-name { text-align: center; font-size: 11px; font-weight: 700; color: ${T.muted}; padding: 4px 0 10px; text-transform: uppercase; letter-spacing: 0.06em; }

  .cal-cell {
    aspect-ratio: 1; border-radius: 10px;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    font-size: 13px; font-weight: 600;
    border: 1.5px solid transparent;
    position: relative; padding: 4px;
    min-height: 48px;
  }
  .cal-cell.other { color: ${T.muted}; opacity: 0.4; }
  .cal-cell.today { border-color: ${T.accent}; background: ${T.accentLight}; color: ${T.accent}; }
  .cal-cell.has-post { background: ${T.greenLight}; border-color: ${T.greenMid}; }

  .cal-dot { width: 6px; height: 6px; border-radius: 50%; background: ${T.green}; margin-top: 3px; }
  .cal-count { font-size: 9px; font-weight: 700; color: ${T.green}; }

  /* ── Post List ── */
  .post-item {
    display: flex; gap: 14px; align-items: flex-start;
    padding: 14px 0; border-bottom: 1px solid ${T.border};
  }
  .post-item:last-child { border-bottom: none; padding-bottom: 0; }

  .post-thumb { width: 60px; height: 60px; border-radius: 10px; object-fit: cover; border: 1px solid ${T.border}; flex-shrink: 0; }
  .post-date { font-size: 11px; font-weight: 700; color: ${T.muted}; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.04em; }
  .post-caption { font-size: 13px; color: ${T.textMid}; line-height: 1.55; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; font-weight: 500; }

  /* ── Textarea / Input ── */
  textarea {
    width: 100%; background: ${T.bg};
    border: 1.5px solid ${T.border}; border-radius: 12px;
    color: ${T.text}; font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px; font-weight: 500;
    padding: 14px; resize: vertical; outline: none;
    transition: all 0.12s; line-height: 1.6;
  }
  textarea:focus { border-color: ${T.accent}; background: ${T.white}; box-shadow: 0 0 0 3px ${T.accentLight}; }

  .text-input {
    width: 100%; background: ${T.bg};
    border: 1.5px solid ${T.border}; border-radius: 12px;
    color: ${T.text}; font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px; font-weight: 500;
    padding: 12px 14px; outline: none;
    transition: all 0.12s; margin-bottom: 12px;
  }
  .text-input:focus { border-color: ${T.accent}; background: ${T.white}; box-shadow: 0 0 0 3px ${T.accentLight}; }

  /* ── Output ── */
  .output-card {
    background: ${T.greenLight};
    border: 1.5px solid ${T.greenMid};
    border-radius: 14px; overflow: hidden;
    margin-top: 16px;
  }
  .output-header {
    display: flex; justify-content: space-between; align-items: center;
    padding: 12px 16px; border-bottom: 1px solid ${T.greenMid};
    font-size: 11px; font-weight: 700; color: ${T.green};
    text-transform: uppercase; letter-spacing: 0.07em;
  }
  .copy-btn {
    background: ${T.green}; color: white;
    border: none; border-radius: 7px;
    padding: 4px 12px; font-size: 11px; font-weight: 700;
    cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif;
    transition: background 0.12s; text-transform: none; letter-spacing: 0;
  }
  .copy-btn:hover { background: #15803D; }

  .output-body { padding: 16px; font-size: 14px; line-height: 1.75; color: ${T.text}; white-space: pre-wrap; font-weight: 500; }

  /* ── Sentiment ── */
  .sentiment { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; }
  .s-pos { background: ${T.greenLight}; color: ${T.green}; border: 1px solid ${T.greenMid}; }
  .s-neg { background: ${T.redLight}; color: ${T.red}; border: 1px solid #FECACA; }
  .s-neu { background: ${T.orangeLight}; color: ${T.orange}; border: 1px solid #FED7AA; }

  /* ── Divider ── */
  .divider { border: none; border-top: 1px solid ${T.border}; margin: 20px 0; }

  /* ── Spinner ── */
  .spinner { display: inline-block; width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.6s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── Help text ── */
  .help-text { font-size: 12.5px; color: ${T.muted}; font-weight: 500; margin-top: 8px; line-height: 1.5; }
`;

/* ─── DATA ─── */
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const TONES = ["Professional","Friendly","Witty","Bold","Casual","Luxurious"];
const PLATFORMS = [
  { id:"ig", label:"Instagram", icon:"📸" },
  { id:"fb", label:"Facebook", icon:"🔵" },
  { id:"gb", label:"Google Business", icon:"🔍" },
  { id:"tw", label:"Twitter / X", icon:"🐦" },
  { id:"li", label:"LinkedIn", icon:"💼" },
];
const FREQS = ["Once a day","Twice a day","Every other day","3× per week","Weekly"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const NAV = [
  { id:"settings", icon:"⚙️", label:"Business Setup", step:1 },
  { id:"queue",    icon:"🖼️", label:"Upload Photos",  step:2 },
  { id:"schedule", icon:"⏰", label:"Set Schedule",   step:3 },
  { id:"calendar", icon:"📅", label:"Post Calendar",  step:4 },
  { id:"reviews",  icon:"⭐", label:"Review Responder", step:null },
];

/* ─── HELPERS ─── */
async function callClaude(prompt, system = "") {
  const body = { model:"claude-sonnet-4-20250514", max_tokens:1000, messages:[{ role:"user", content:prompt }] };
  if (system) body.system = system;
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(body),
  });
  const d = await r.json();
  return d.content?.[0]?.text || "";
}

function calDays(year, month) {
  const first = new Date(year, month, 1);
  const last  = new Date(year, month+1, 0);
  const days  = [];
  for (let i = 0; i < first.getDay(); i++) days.push({ date: new Date(year, month, i - first.getDay() + 1), current: false });
  for (let d = 1; d <= last.getDate(); d++) days.push({ date: new Date(year, month, d), current: true });
  while (days.length % 7) { const p = days[days.length-1].date; const n = new Date(p); n.setDate(p.getDate()+1); days.push({ date:n, current:false }); }
  return days;
}

function sentiment(text) {
  const l = text.toLowerCase();
  const neg = ["terrible","awful","worst","horrible","rude","bad","disgusting","disappointed","poor","slow","cold","dirty","ignored","never again"];
  const pos = ["great","amazing","excellent","love","best","wonderful","fantastic","perfect","awesome","friendly","delicious","outstanding","recommend","good"];
  const n = neg.filter(w => l.includes(w)).length;
  const p = pos.filter(w => l.includes(w)).length;
  return n > p ? "negative" : p > n ? "positive" : "neutral";
}

/* ─── APP ─── */
export default function Voklo() {
  const [tab, setTab] = useState("settings");

  // Business
  const [bizName, setBizName] = useState("");
  const [bizDesc, setBizDesc] = useState("");
  const [tone, setTone] = useState("Friendly");
  const [platforms, setPlatforms] = useState(["ig","fb"]);
  const togglePlatform = id => setPlatforms(p => p.includes(id) ? p.filter(x=>x!==id) : [...p,id]);

  // Images
  const [images, setImages] = useState([]);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef();
  const addImages = files => {
    setImages(prev => [...prev, ...Array.from(files).map(f => ({
      id: Math.random().toString(36).slice(2), url: URL.createObjectURL(f), used: false,
    }))]);
  };
  const removeImg = id => setImages(p => p.filter(i => i.id !== id));
  const avail = images.filter(i => !i.used).length;

  // Schedule
  const [days, setDays] = useState(["Mon","Wed","Fri"]);
  const [time, setTime] = useState("09:00");
  const [freq, setFreq] = useState("Once a day");
  const toggleDay = d => setDays(s => s.includes(d) ? s.filter(x=>x!==d) : [...s,d]);
  const [posts, setPosts] = useState([]);
  const [schedLoading, setSchedLoading] = useState(false);
  const [live, setLive] = useState(false);

  const generateSchedule = async () => {
    if (!avail || !days.length) return;
    setSchedLoading(true);
    const dayMap = { Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6 };
    const idxs = days.map(d => dayMap[d]);
    const dates = [];
    const cur = new Date();
    while (dates.length < Math.min(avail, 8)) {
      if (idxs.includes(cur.getDay())) dates.push(new Date(cur));
      cur.setDate(cur.getDate()+1);
    }
    const unused = images.filter(i => !i.used).slice(0, dates.length);
    const platNames = platforms.map(p => PLATFORMS.find(x=>x.id===p)?.label).join(", ");
    const newPosts = [];
    for (let i = 0; i < unused.length; i++) {
      const caption = await callClaude(`Write a social media caption for ${bizName || "a local business"}.
Business: ${bizDesc || "A friendly local business serving the community"}
Tone: ${tone}
Platforms: ${platNames}
Hook them in the first line. Include 1-2 emojis. End with 5 hashtags. Return ONLY the caption.`);
      newPosts.push({ id: Math.random().toString(36).slice(2), imgId: unused[i].id, imgUrl: unused[i].url, caption, date: dates[i], platforms: platNames });
    }
    setImages(p => p.map(img => unused.find(u=>u.id===img.id) ? {...img, used:true} : img));
    setPosts(p => [...p, ...newPosts]);
    setLive(true);
    setSchedLoading(false);
    setTab("calendar");
  };

  // Reviews
  const [review, setReview] = useState("");
  const [rvTone, setRvTone] = useState("Professional");
  const [rvOut, setRvOut] = useState("");
  const [rvLoading, setRvLoading] = useState(false);
  const [rvSent, setRvSent] = useState(null);
  const [copied, setCopied] = useState(false);

  const generateReview = async () => {
    if (!review.trim()) return;
    setRvLoading(true); setRvOut("");
    const s = sentiment(review); setRvSent(s);
    const out = await callClaude(`Write a review response for ${bizName || "a local business"}.
Review: "${review}"
Tone: ${rvTone}. Sentiment: ${s}.
${s==="negative" ? "Apologize sincerely, take ownership, offer to make it right." : "Express genuine gratitude."}
Sound fully human. 3-5 sentences max. End with owner first name or 'The Team'. Return ONLY the response.`);
    setRvOut(out); setRvLoading(false);
  };

  // Calendar
  const today = new Date();
  const [cy, setCy] = useState(today.getFullYear());
  const [cm, setCm] = useState(today.getMonth());
  const days2 = calDays(cy, cm);
  const postsByDate = {};
  posts.forEach(p => { const k = p.date.toDateString(); postsByDate[k] = (postsByDate[k]||0)+1; });

  const schedulePreview = () => {
    if (!days.length) return "Select at least one day to see your schedule.";
    const [h] = time.split(":");
    const hr = parseInt(h); const ampm = hr>=12?"PM":"AM"; const h12 = hr%12||12;
    return `Posts go out every ${days.join(", ")} at ${h12}:${time.split(":")[1]} ${ampm} — ${freq.toLowerCase()}.`;
  };

  const doneSteps = {
    settings: bizName.length > 0,
    queue: images.length > 0,
    schedule: live,
  };

  return (
    <>
      <style>{css}</style>
      <div className="layout">

        {/* ── Sidebar ── */}
        <aside className="sidebar">
          <div className="sidebar-top">
            <div className="logo">voklo</div>
            <div className="logo-tagline">AI Social Media Automation</div>
          </div>
          <nav className="nav">
            <div className="nav-label">Get Started</div>
            {NAV.filter(n=>n.step).map(n => (
              <div key={n.id} className={`nav-item ${tab===n.id?"active":""} ${doneSteps[n.id]?"done":""}`} onClick={()=>setTab(n.id)}>
                <div className="nav-icon">{n.icon}</div>
                {n.label}
                <div className="nav-step">{doneSteps[n.id] ? "✓" : n.step}</div>
              </div>
            ))}
            <div className="nav-label" style={{marginTop:8}}>Tools</div>
            {NAV.filter(n=>!n.step).map(n => (
              <div key={n.id} className={`nav-item ${tab===n.id?"active":""}`} onClick={()=>setTab(n.id)}>
                <div className="nav-icon">{n.icon}</div>
                {n.label}
              </div>
            ))}
            <div key="calendar-nav" className={`nav-item ${tab==="calendar"?"active":""}`} onClick={()=>setTab("calendar")}>
              <div className="nav-icon">📅</div>
              Post Calendar
            </div>
          </nav>
          <div style={{padding:"0 10px 12px"}}>
            <div className="sidebar-bottom">
              <div className="biz-label">Business</div>
              <div className="biz-name">{bizName || "Not set up yet"}</div>
            </div>
          </div>
        </aside>

        {/* ── Main ── */}
        <main className="main">
          <div className="main-inner">

            {/* ══ SETTINGS ══ */}
            {tab === "settings" && (<>
              <div className="page-header">
                <div className="step-pill">⚙ Step 1</div>
                <div className="page-title">Set Up Your Business</div>
                <div className="page-sub">Tell Voklo about your business once. It uses this to write captions and responses that actually sound like you.</div>
              </div>
              <div className="card">
                <div className="card-header">
                  <div className="card-title"><div className="card-icon">🏢</div> Business Info</div>
                </div>
                <div style={{marginBottom:12}}>
                  <div className="s-label" style={{marginBottom:6}}>Business Name</div>
                  <input className="text-input" type="text" placeholder="e.g. Tony's Italian Kitchen" value={bizName} onChange={e=>setBizName(e.target.value)} style={{marginBottom:0}} />
                </div>
                <div style={{marginTop:14}}>
                  <div className="s-label" style={{marginBottom:6}}>Describe Your Business</div>
                  <textarea rows={3} placeholder="e.g. Family-owned Italian restaurant in downtown Boston. Known for fresh handmade pasta and a warm, welcoming vibe. Open since 1998." value={bizDesc} onChange={e=>setBizDesc(e.target.value)} />
                  <div className="help-text">The more detail you give, the better your captions and review responses will sound.</div>
                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  <div className="card-title"><div className="card-icon">🎙️</div> Brand Voice</div>
                </div>
                <div className="s-label">How should your posts sound?</div>
                <div className="tone-grid">
                  {TONES.map(t => <button key={t} className={`tone-btn ${tone===t?"on":""}`} onClick={()=>setTone(t)}>{t}</button>)}
                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  <div className="card-title"><div className="card-icon">📡</div> Your Platforms</div>
                </div>
                <div className="s-label">Which platforms do you post on?</div>
                <div className="platform-grid">
                  {PLATFORMS.map(p => <button key={p.id} className={`platform-btn ${platforms.includes(p.id)?"on":""}`} onClick={()=>togglePlatform(p.id)}>{p.icon} {p.label}</button>)}
                </div>
              </div>
              <button className="btn btn-blue" onClick={()=>setTab("queue")}>
                Next: Upload Photos →
              </button>
            </>)}

            {/* ══ QUEUE ══ */}
            {tab === "queue" && (<>
              <div className="page-header">
                <div className="step-pill">🖼 Step 2</div>
                <div className="page-title">Upload Your Photos</div>
                <div className="page-sub">Add a batch of photos. Voklo pulls from this queue automatically — you never have to manually pick which photo to post.</div>
              </div>
              <div className="card">
                <div className="card-header">
                  <div className="card-title"><div className="card-icon">📁</div> Photo Library</div>
                  {images.length > 0 && <span className="badge badge-blue">{avail} ready to post</span>}
                </div>
                <div className={`drop-zone ${dragging?"dragging":""}`}
                  onClick={()=>fileRef.current.click()}
                  onDragOver={e=>{e.preventDefault();setDragging(true)}}
                  onDragLeave={()=>setDragging(false)}
                  onDrop={e=>{e.preventDefault();setDragging(false);addImages(e.dataTransfer.files)}}>
                  <input ref={fileRef} type="file" accept="image/*" multiple style={{display:"none"}} onChange={e=>addImages(e.target.files)} />
                  <div className="drop-icon-wrap">📸</div>
                  <div className="drop-title">Drop photos here or click to browse</div>
                  <div className="drop-sub">JPG, PNG, WEBP, screenshots — add as many as you want</div>
                </div>

                {images.length > 0 && (<>
                  <div className="queue-summary">
                    <div className="q-stat"><div className="q-stat-val">{images.length}</div><div className="q-stat-lbl">Uploaded</div></div>
                    <div className="q-stat"><div className="q-stat-val" style={{color:T.green}}>{avail}</div><div className="q-stat-lbl">Ready</div></div>
                    <div className="q-stat"><div className="q-stat-val" style={{color:T.muted}}>{images.length-avail}</div><div className="q-stat-lbl">Scheduled</div></div>
                  </div>
                  <div className="image-grid">
                    {images.map(img => (
                      <div key={img.id} className={`img-item ${img.used?"used":""}`}>
                        <img src={img.url} alt="" />
                        {img.used && <div className="img-queued-label">✓ Queued</div>}
                        {!img.used && <button className="img-remove" onClick={()=>removeImg(img.id)}>✕</button>}
                      </div>
                    ))}
                  </div>
                </>)}
              </div>
              {images.length > 0 && (
                <button className="btn btn-blue" onClick={()=>setTab("schedule")}>Next: Set Your Schedule →</button>
              )}
            </>)}

            {/* ══ SCHEDULE ══ */}
            {tab === "schedule" && (<>
              <div className="page-header">
                <div className="step-pill">⏰ Step 3</div>
                <div className="page-title">Set Your Posting Schedule</div>
                <div className="page-sub">Pick your days and time once. Voklo handles everything — writing captions, queuing photos, and posting on schedule.</div>
              </div>

              {live && <div className="status-banner status-live"><div className="pulse"/> Automation is live — {posts.length} posts scheduled and ready</div>}
              {!avail && !live && <div className="status-banner status-warn">⚠️ Upload photos first before setting your schedule</div>}

              <div className="card">
                <div className="card-header"><div className="card-title"><div className="card-icon">📅</div> Which days?</div></div>
                <div className="day-row">
                  {DAYS.map(d => <button key={d} className={`day-btn ${days.includes(d)?"on":""}`} onClick={()=>toggleDay(d)}>{d.slice(0,2)}</button>)}
                </div>
              </div>

              <div className="card">
                <div className="card-header"><div className="card-title"><div className="card-icon">🕐</div> What time?</div></div>
                <div className="time-row">
                  <input type="time" className="s-input" value={time} onChange={e=>setTime(e.target.value)} />
                  <select className="s-input" value={freq} onChange={e=>setFreq(e.target.value)}>
                    {FREQS.map(f=><option key={f}>{f}</option>)}
                  </select>
                </div>
              </div>

              <div className="card">
                <div className="card-header"><div className="card-title"><div className="card-icon">👁️</div> Schedule Preview</div></div>
                <div className="preview-box">📅 {schedulePreview()}</div>
                <div className="help-text" style={{marginTop:12}}>Voklo will generate AI captions for each photo and queue {Math.min(avail,8)} posts automatically.</div>
              </div>

              <div className="btn-row">
                <button className="btn btn-blue" onClick={generateSchedule} disabled={schedLoading || !avail || !days.length}>
                  {schedLoading ? <><span className="spinner"/> Generating {Math.min(avail,8)} posts…</> : <>⚡ Generate & Schedule {Math.min(avail,8)} Posts</>}
                </button>
                {live && <button className="btn btn-outline" onClick={()=>{setLive(false);setPosts([]);setImages(p=>p.map(i=>({...i,used:false})))}}>Reset</button>}
              </div>
            </>)}

            {/* ══ CALENDAR ══ */}
            {tab === "calendar" && (<>
              <div className="page-header">
                <div className="page-title">📅 Post Calendar</div>
                <div className="page-sub">See every post that's scheduled and going out automatically.</div>
              </div>

              <div className="stats-row">
                <div className="stat-card"><div className="stat-val">{posts.length}</div><div className="stat-lbl">Scheduled</div></div>
                <div className="stat-card"><div className="stat-val">{days.length}</div><div className="stat-lbl">Days / Week</div></div>
                <div className="stat-card"><div className="stat-val">{platforms.length}</div><div className="stat-lbl">Platforms</div></div>
                <div className="stat-card"><div className="stat-val">{avail}</div><div className="stat-lbl">Photos Left</div></div>
              </div>

              <div className="card">
                <div className="cal-nav-row">
                  <button className="cal-btn" onClick={()=>{if(cm===0){setCm(11);setCy(y=>y-1)}else setCm(m=>m-1)}}>← Prev</button>
                  <div className="cal-month-label">{MONTHS[cm]} {cy}</div>
                  <button className="cal-btn" onClick={()=>{if(cm===11){setCm(0);setCy(y=>y+1)}else setCm(m=>m+1)}}>Next →</button>
                </div>
                <div className="cal-grid">
                  {DAYS.map(d=><div key={d} className="cal-day-name">{d.slice(0,2)}</div>)}
                  {days2.map(({date,current},i)=>{
                    const k = date.toDateString();
                    const isToday = k===today.toDateString();
                    const count = postsByDate[k]||0;
                    return (
                      <div key={i} className={`cal-cell ${current?"":"other"} ${isToday?"today":""} ${count?"has-post":""}`}>
                        <span>{date.getDate()}</span>
                        {count>0 && <div className="cal-dot"/>}
                        {count>1 && <div className="cal-count">{count}×</div>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {posts.length > 0 && (
                <div className="card">
                  <div className="card-header">
                    <div className="card-title"><div className="card-icon">📋</div> Upcoming Posts</div>
                    <span className="badge badge-green">✓ {posts.length} scheduled</span>
                  </div>
                  {posts.slice(0,6).map(p=>(
                    <div key={p.id} className="post-item">
                      <img src={p.imgUrl} className="post-thumb" alt="" />
                      <div style={{flex:1,minWidth:0}}>
                        <div className="post-date">{p.date.toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric"})} · {time} · {p.platforms}</div>
                        <div className="post-caption">{p.caption}</div>
                      </div>
                      <span className="badge badge-green">✓ Ready</span>
                    </div>
                  ))}
                  {posts.length>6 && <div style={{textAlign:"center",color:T.muted,fontSize:13,paddingTop:12,fontWeight:600}}>+ {posts.length-6} more posts scheduled</div>}
                </div>
              )}

              {!posts.length && (
                <div style={{textAlign:"center",color:T.muted,padding:"48px 0",fontSize:14,fontWeight:600}}>
                  No posts scheduled yet. <span style={{color:T.accent,cursor:"pointer",textDecoration:"underline"}} onClick={()=>setTab("schedule")}>Set up your schedule →</span>
                </div>
              )}
            </>)}

            {/* ══ REVIEWS ══ */}
            {tab === "reviews" && (<>
              <div className="page-header">
                <div className="page-title">⭐ Review Responder</div>
                <div className="page-sub">Paste any Google, Yelp, or Facebook review. Get a professional, human-sounding response in seconds.</div>
              </div>

              <div className="card">
                <div className="card-header"><div className="card-title"><div className="card-icon">💬</div> Paste the Review</div></div>
                <textarea rows={5} placeholder={"Paste the customer review here...\n\ne.g. \"The food was cold and the service was really slow. I waited 45 minutes and no one came to check on us.\""} value={review} onChange={e=>setReview(e.target.value)} />
                <div style={{marginTop:16}}>
                  <div className="s-label" style={{marginBottom:10}}>Response Tone</div>
                  <div className="tone-grid">
                    {TONES.map(t=><button key={t} className={`tone-btn ${rvTone===t?"on":""}`} onClick={()=>setRvTone(t)}>{t}</button>)}
                  </div>
                </div>
                <div className="btn-row">
                  <button className="btn btn-blue" onClick={generateReview} disabled={rvLoading||!review.trim()}>
                    {rvLoading ? <><span className="spinner"/> Writing response…</> : <>✍️ Generate Response</>}
                  </button>
                  {rvOut && <button className="btn btn-outline" onClick={()=>{setRvOut("");setReview("");setRvSent(null)}}>Clear</button>}
                </div>
              </div>

              {rvOut && (
                <div className="output-card">
                  <div className="output-header">
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      Your Response
                      {rvSent && <span className={`sentiment ${rvSent==="positive"?"s-pos":rvSent==="negative"?"s-neg":"s-neu"}`}>
                        {rvSent==="positive"?"😊 Positive":rvSent==="negative"?"😟 Negative":"😐 Neutral"}
                      </span>}
                    </div>
                    <button className="copy-btn" onClick={()=>{navigator.clipboard.writeText(rvOut);setCopied(true);setTimeout(()=>setCopied(false),1500)}}>
                      {copied?"✓ Copied!":"Copy"}
                    </button>
                  </div>
                  <div className="output-body">{rvOut}</div>
                </div>
              )}
            </>)}

          </div>
        </main>
      </div>
    </>
  );
}
