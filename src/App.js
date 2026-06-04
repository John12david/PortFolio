import React from 'react';
import profilePicture from './assets/ProfilePicture.jpeg';
import {
  CartesianGrid, XAxis, YAxis, Tooltip,
  AreaChart, Area, ResponsiveContainer
} from 'recharts';

/* ─────────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400;500;600&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  :root {
    --bg:         #060d1b;
    --bg2:        #0b1628;
    --bg3:        #0f1e38;
    --cyan:       #00d4ff;
    --cyan-dim:   #00d4ff33;
    --violet:     #7b61ff;
    --violet-dim: #7b61ff22;
    --green:      #00e5a0;
    --red:        #ff4d6d;
    --amber:      #ffc947;
    --text:       #d4e4f7;
    --text-muted: #5a7a9a;
    --border:     rgba(0,212,255,0.12);
    --glass:      rgba(11,22,40,0.7);
    --glow:       0 0 24px rgba(0,212,255,0.2);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* ── SCROLLBAR ── */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--cyan-dim); border-radius: 2px; }

  /* ── GRID BG ── */
  .portfolio-root {
    position: relative;
    isolation: isolate;
  }
  .portfolio-root::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(var(--border) 1px, transparent 1px),
      linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
    z-index: -1;
  }
  .portfolio-root::after {
    content: '';
    position: fixed;
    inset: 0;
    background: radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,212,255,0.06) 0%, transparent 70%),
                radial-gradient(ellipse 40% 40% at 80% 80%, rgba(123,97,255,0.05) 0%, transparent 60%);
    pointer-events: none;
    z-index: -1;
  }

  /* ── NAV ── */
  .nav-bar {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    backdrop-filter: blur(20px);
    background: rgba(6,13,27,0.92);
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 3rem;
    height: 60px;
  }
  .nav-logo {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 1rem;
    color: var(--cyan);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    flex-shrink: 0;
  }
  .nav-logo span { color: var(--text-muted); }
  .nav-links { display: flex; gap: 2rem; list-style: none; }
  .nav-links button {
    background: none; border: none; cursor: pointer;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem;
    color: var(--text-muted);
    letter-spacing: 0.08em;
    transition: color 0.2s;
    padding: 0.5rem 0;
    min-height: 44px;
    display: flex;
    align-items: center;
  }
  .nav-links button:hover { color: var(--cyan); }
  .nav-status {
    display: flex; align-items: center; gap: 0.5rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    color: var(--text-muted);
    flex-shrink: 0;
  }

  /* ── HAMBURGER ── */
  .nav-hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    min-width: 44px;
    min-height: 44px;
    align-items: center;
    justify-content: center;
  }
  .nav-hamburger span {
    display: block;
    width: 22px;
    height: 2px;
    background: var(--cyan);
    border-radius: 2px;
    transition: all 0.3s;
  }
  .nav-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .nav-hamburger.open span:nth-child(2) { opacity: 0; }
  .nav-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* ── MOBILE MENU DRAWER ── */
  .nav-drawer {
    display: none;
    position: fixed;
    top: 60px; left: 0; right: 0;
    background: rgba(6,13,27,0.97);
    border-bottom: 1px solid var(--border);
    backdrop-filter: blur(20px);
    z-index: 99;
    padding: 1rem 1.5rem 1.5rem;
    flex-direction: column;
    gap: 0.25rem;
  }
  .nav-drawer.open { display: flex; }
  .nav-drawer button {
    background: none;
    border: none;
    cursor: pointer;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.85rem;
    color: var(--text-muted);
    letter-spacing: 0.08em;
    text-align: left;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--border);
    min-height: 44px;
    transition: color 0.2s;
  }
  .nav-drawer button:last-child { border-bottom: none; }
  .nav-drawer button:hover { color: var(--cyan); }

  .status-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: var(--green);
    box-shadow: 0 0 6px var(--green);
    animation: pulse 2s ease-in-out infinite;
    flex-shrink: 0;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  /* ── HERO ── */
  .hero {
    min-height: 100svh;
    display: flex;
    align-items: center;
    padding: 0 3rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  .hero-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    width: 100%;
    padding-top: 60px;
  }
  .hero-left { display: flex; flex-direction: column; gap: 1.5rem; }
  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    color: var(--cyan);
    border: 1px solid var(--cyan-dim);
    background: rgba(0,212,255,0.05);
    padding: 0.35rem 0.8rem;
    border-radius: 100px;
    width: fit-content;
    letter-spacing: 0.1em;
  }
  .hero-name {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2.4rem, 6vw, 4.5rem);
    font-weight: 800;
    line-height: 1.05;
    color: #fff;
  }
  .hero-name .accent { color: var(--cyan); }
  .hero-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: clamp(0.65rem, 1.8vw, 0.85rem);
    color: var(--text-muted);
    letter-spacing: 0.1em;
    line-height: 1.6;
  }
  .hero-title .hl { color: var(--violet); }
  .hero-desc {
    font-size: clamp(0.9rem, 2vw, 1rem);
    color: var(--text);
    line-height: 1.7;
    font-weight: 300;
    max-width: 480px;
  }
  .hero-ctas { display: flex; gap: 1rem; flex-wrap: wrap; }
  .btn-primary {
    background: var(--cyan);
    color: var(--bg);
    border: none;
    padding: 0.75rem 1.6rem;
    border-radius: 6px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;
    display: inline-block;
    min-height: 44px;
    line-height: 1;
    display: inline-flex;
    align-items: center;
  }
  .btn-primary:hover { box-shadow: 0 0 20px rgba(0,212,255,0.4); transform: translateY(-1px); }
  .btn-ghost {
    background: transparent;
    color: var(--cyan);
    border: 1px solid var(--cyan-dim);
    padding: 0.75rem 1.6rem;
    border-radius: 6px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    min-height: 44px;
  }
  .btn-ghost:hover { background: var(--cyan-dim); border-color: var(--cyan); }

  /* hero stats */
  .hero-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-top: 0.5rem;
  }
  .stat-card {
    background: var(--glass);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 1rem 1.2rem;
    backdrop-filter: blur(10px);
  }
  .stat-num {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.4rem, 3vw, 1.8rem);
    font-weight: 800;
    color: var(--cyan);
    line-height: 1;
  }
  .stat-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    color: var(--text-muted);
    margin-top: 0.3rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  /* hero right - profile visual */
  .hero-right { overflow: visible; display: flex; justify-content: center; align-items: center; }
  .profile-frame {
    position: relative;
    width: 320px;
    height: 320px;
  }
  .profile-ring {
    position: absolute;
    inset: -16px;
    border-radius: 50%;
    border: 1px solid var(--cyan-dim);
    animation: ring-spin 20s linear infinite;
  }
  .profile-ring::before {
    content: '';
    position: absolute;
    top: -3px; left: 50%;
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--cyan);
    box-shadow: 0 0 12px var(--cyan);
    transform: translateX(-50%);
  }
  @keyframes ring-spin { to { transform: rotate(360deg); } }
  .profile-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    object-position: 50% 30%;
    transform: scale(0.92);
    border: 2px solid var(--bg3);
    position: relative;
    z-index: 1;
  }
  .profile-glow {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%);
    z-index: 0;
  }
  .profile-tags {
    position: absolute;
    top: 50%;
    right: -90px;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    z-index: 5;
  }
  .profile-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    padding: 0.35rem 0.8rem;
    border-radius: 6px;
    position: relative;
    border: 1px solid var(--border);
    background: var(--glass);
    color: var(--cyan);
    backdrop-filter: blur(10px);
    transition: all 0.25s ease;
    white-space: nowrap;
    box-shadow: 0 0 8px rgba(0,212,255,0.1);
  }
  .profile-tag:hover { transform: translateX(-6px); border-color: var(--cyan); }
  .profile-tag::before {
    content: '';
    position: absolute;
    left: -30px;
    top: 50%;
    width: 30px;
    height: 1px;
    background: var(--cyan-dim);
    transform: translateY(-50%);
  }
  .profile-tag:nth-child(1) { margin-left: 0px; }
  .profile-tag:nth-child(2) { margin-left: 15px; }
  .profile-tag:nth-child(3) { margin-left: 25px; }
  .profile-tag:nth-child(4) { margin-left: 10px; }

  /* ── SECTIONS ── */
  .section {
    max-width: 1200px;
    margin: 0 auto;
    padding: 5rem 3rem;
  }
  .section-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    color: var(--cyan);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-bottom: 0.6rem;
  }
  .section-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    font-weight: 800;
    color: #fff;
    line-height: 1.1;
    margin-bottom: 2rem;
  }
  .section-title .accent { color: var(--cyan); }
  .divider {
    width: 100%;
    height: 1px;
    background: var(--border);
    margin: 0;
  }

  /* ── ABOUT ── */
  .about-grid {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 3rem;
    align-items: start;
  }
  .about-bio {
    font-size: 1.05rem;
    line-height: 1.8;
    color: var(--text);
    font-weight: 300;
  }
  .about-bio p + p { margin-top: 1rem; }
  .about-bio strong { color: var(--cyan); font-weight: 500; }
  .about-cards { display: flex; flex-direction: column; gap: 1rem; }
  .about-card {
    background: var(--glass);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 1.2rem 1.4rem;
    backdrop-filter: blur(10px);
    transition: border-color 0.2s;
  }
  .about-card:hover { border-color: var(--cyan-dim); }
  .about-card-icon {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    color: var(--cyan);
    letter-spacing: 0.1em;
    margin-bottom: 0.4rem;
  }
  .about-card h4 {
    font-family: 'Syne', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 0.3rem;
  }
  .about-card p {
    font-size: 0.85rem;
    color: var(--text-muted);
    line-height: 1.5;
  }

  /* ── SKILLS ── */
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1.5rem;
  }
  .skill-group {
    background: var(--glass);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1.5rem;
    backdrop-filter: blur(10px);
  }
  .skill-group-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    color: var(--cyan);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .skill-group-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }
  .skill-list { display: flex; flex-direction: column; gap: 0.7rem; }
  .skill-row { display: flex; flex-direction: column; gap: 0.3rem; }
  .skill-top { display: flex; justify-content: space-between; align-items: center; }
  .skill-name { font-size: 0.85rem; color: var(--text); }
  .skill-pct {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    color: var(--text-muted);
  }
  .skill-bar {
    height: 3px;
    background: rgba(255,255,255,0.06);
    border-radius: 2px;
    overflow: hidden;
  }
  .skill-fill {
    height: 100%;
    border-radius: 2px;
    background: linear-gradient(90deg, var(--cyan), var(--violet));
    transition: width 1s ease;
  }

  /* ── EXPERIENCE TIMELINE ── */
  .timeline { position: relative; padding-left: 2rem; }
  .timeline::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 1px;
    background: linear-gradient(to bottom, var(--cyan), var(--violet), transparent);
  }
  .timeline-item { position: relative; margin-bottom: 2.5rem; }
  .timeline-dot {
    position: absolute;
    left: -2.45rem;
    top: 0.3rem;
    width: 10px; height: 10px;
    border-radius: 50%;
    background: var(--cyan);
    box-shadow: 0 0 10px var(--cyan);
  }
  .timeline-item.past .timeline-dot {
    background: var(--text-muted);
    box-shadow: none;
  }
  .timeline-card {
    background: var(--glass);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1.4rem 1.6rem;
    backdrop-filter: blur(10px);
    transition: border-color 0.25s;
  }
  .timeline-card:hover { border-color: rgba(0,212,255,0.25); }
  .timeline-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.4rem; }
  .timeline-company {
    font-family: 'Syne', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    color: #fff;
  }
  .timeline-period {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    color: var(--text-muted);
    border: 1px solid var(--border);
    padding: 0.2rem 0.6rem;
    border-radius: 4px;
  }
  .timeline-role {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    color: var(--cyan);
    margin-bottom: 0.8rem;
    letter-spacing: 0.06em;
  }
  .timeline-items { list-style: none; display: flex; flex-direction: column; gap: 0.4rem; }
  .timeline-items li {
    font-size: 0.875rem;
    color: var(--text);
    line-height: 1.55;
    display: flex;
    gap: 0.6rem;
  }
  .timeline-items li::before {
    content: '›';
    color: var(--cyan);
    flex-shrink: 0;
  }
  .timeline-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.8rem; }
  .tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    border: 1px solid var(--violet-dim);
    color: var(--violet);
    background: rgba(123,97,255,0.06);
  }

  /* ── CASE STUDIES ── */
  .case-studies-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
  }
  .case-card {
    background: var(--glass);
    border: 1px solid var(--border);
    border-radius: 14px;
    overflow: hidden;
    backdrop-filter: blur(10px);
    transition: border-color 0.25s, transform 0.25s;
    cursor: pointer;
  }
  .case-card:hover { border-color: rgba(0,212,255,0.3); transform: translateY(-3px); }
  .case-card.featured {
    grid-column: span 2;
    border-color: rgba(0,212,255,0.2);
    background: linear-gradient(135deg, rgba(0,212,255,0.05), rgba(123,97,255,0.05));
  }
  .case-header {
    padding: 1.4rem 1.6rem 1rem;
    border-bottom: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.8rem;
  }
  .case-tag-featured {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.6rem;
    color: var(--amber);
    border: 1px solid rgba(255,201,71,0.25);
    background: rgba(255,201,71,0.06);
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    letter-spacing: 0.1em;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .case-title {
    font-family: 'Syne', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 0.25rem;
  }
  .case-subtitle {
    font-size: 0.78rem;
    color: var(--text-muted);
  }
  .case-body { padding: 1.2rem 1.6rem; }
  .case-section-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem;
    color: var(--text-muted);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 0.4rem;
  }
  .case-text {
    font-size: 0.875rem;
    color: var(--text);
    line-height: 1.6;
    margin-bottom: 1rem;
  }
  .case-results {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin-top: 0.5rem;
  }
  .result-chip {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    padding: 0.3rem 0.7rem;
    border-radius: 6px;
    border: 1px solid rgba(0,229,160,0.2);
    color: var(--green);
    background: rgba(0,229,160,0.06);
  }
  .case-expand-body { overflow: hidden; }
  .case-expand-inner {
    border-top: 1px solid var(--border);
    padding: 1.2rem 1.6rem;
  }
  .case-tools { display: flex; flex-wrap: wrap; gap: 0.4rem; }

  /* ── PERFORMANCE LAB ── */
  .perf-lab {
    background: var(--glass);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 1.5rem;
    backdrop-filter: blur(10px);
  }
  .perf-controls {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    margin-bottom: 1.5rem;
  }
  .load-btn {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    padding: 0.6rem 1.2rem;
    border-radius: 6px;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text-muted);
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.06em;
    min-height: 44px;
    flex: 1;
    min-width: 140px;
    white-space: nowrap;
  }
  .load-btn:hover:not(:disabled) { border-color: var(--cyan); color: var(--cyan); }
  .load-btn.active { border-color: var(--cyan); color: var(--cyan); background: var(--cyan-dim); }
  .load-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .perf-legend {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }
  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    color: var(--text-muted);
  }
  .legend-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .perf-annotation {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    color: var(--text-muted);
    text-align: center;
    margin-top: 1rem;
  }
  .perf-annotation span { color: var(--cyan); }

  /* ── CONTACT ── */
  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
  }
  .contact-headline {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.4rem, 3vw, 2.2rem);
    font-weight: 800;
    color: #fff;
    line-height: 1.2;
    margin-bottom: 1rem;
  }
  .contact-headline .accent { color: var(--cyan); }
  .contact-sub {
    font-size: 0.95rem;
    color: var(--text-muted);
    line-height: 1.6;
    margin-bottom: 2rem;
  }
  .contact-links { display: flex; flex-direction: column; gap: 0.75rem; }
  .contact-link {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.78rem;
    color: var(--text);
    text-decoration: none;
    padding: 0.8rem 1.2rem;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--glass);
    backdrop-filter: blur(10px);
    transition: border-color 0.2s, color 0.2s;
    min-height: 48px;
  }
  .contact-link:hover { border-color: var(--cyan); color: var(--cyan); }
  .contact-link-icon { color: var(--cyan); width: 16px; text-align: center; flex-shrink: 0; }
  .terminal-block {
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.78rem;
  }
  .term-topbar {
    background: var(--bg3);
    padding: 0.7rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    border-bottom: 1px solid var(--border);
  }
  .term-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
  .term-title {
    margin-left: auto;
    font-size: 0.62rem;
    color: var(--text-muted);
    letter-spacing: 0.1em;
  }
  .term-body { padding: 1.2rem; line-height: 2; overflow-x: auto; }
  .term-line { display: flex; gap: 0.5rem; flex-wrap: nowrap; }
  .term-prompt { color: var(--cyan); flex-shrink: 0; }
  .term-cmd { color: var(--text); white-space: nowrap; }
  .term-output { color: var(--text-muted); }
  .term-output.ok { color: var(--green); }
  .term-output.info { color: var(--violet); }
  .term-cursor {
    display: inline-block;
    width: 8px;
    height: 1em;
    background: var(--cyan);
    animation: blink 1.1s step-end infinite;
    vertical-align: middle;
    margin-left: 2px;
  }
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

  /* ── FOOTER ── */
  .footer {
    border-top: 1px solid var(--border);
    padding: 1.5rem 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    color: var(--text-muted);
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  /* ═══════════════════════════════════════════
     RESPONSIVE — TABLET (≤900px)
  ═══════════════════════════════════════════ */
  @media (max-width: 900px) {
    .nav-bar { padding: 0 1.5rem; }
    .nav-links { display: none; }
    .nav-status { display: none; }
    .nav-hamburger { display: flex; }

    .hero {
      padding: 0 1.5rem;
      min-height: 100svh;
    }
    .hero-inner {
      grid-template-columns: 1fr;
      gap: 2rem;
      padding-top: 80px;
      padding-bottom: 2rem;
    }
    .hero-right { display: none; }

    .section { padding: 3.5rem 1.5rem; }

    .about-grid { grid-template-columns: 1fr; gap: 2rem; }
    .about-bio { font-size: 0.95rem; }

    .skills-grid { grid-template-columns: 1fr; }

    .timeline { padding-left: 1.5rem; }
    .timeline-dot { left: -2rem; }
    .timeline-card { padding: 1.2rem; }

    .case-studies-grid { grid-template-columns: 1fr; }
    .case-card.featured { grid-column: span 1; }

    .contact-grid { grid-template-columns: 1fr; gap: 2rem; }

    .footer { padding: 1.5rem; }
  }

  /* ═══════════════════════════════════════════
     RESPONSIVE — MOBILE (≤600px)
  ═══════════════════════════════════════════ */
  @media (max-width: 600px) {
    .nav-bar { padding: 0 1rem; height: 56px; }
    .nav-drawer { top: 56px; }

    .hero { padding: 0 1rem; }
    .hero-inner { padding-top: 72px; gap: 1.5rem; }

    .hero-badge { font-size: 0.65rem; padding: 0.3rem 0.7rem; }

    .hero-stats { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
    .stat-card { padding: 0.8rem 1rem; }

    .hero-ctas { gap: 0.75rem; }
    .btn-primary, .btn-ghost {
      font-size: 0.72rem;
      padding: 0.7rem 1.2rem;
    }

    .section { padding: 2.5rem 1rem; }
    .section-title { margin-bottom: 1.5rem; }

    .about-bio { font-size: 0.9rem; }
    .about-card { padding: 1rem; }

    .skill-group { padding: 1.2rem; }

    .timeline { padding-left: 1.25rem; }
    .timeline-dot { left: -1.75rem; width: 8px; height: 8px; }
    .timeline-card { padding: 1rem; }
    .timeline-company { font-size: 0.9rem; }
    .timeline-items li { font-size: 0.82rem; }

    .case-body { padding: 1rem; }
    .case-header { padding: 1rem; }
    .case-expand-inner { padding: 1rem; }
    .result-chip { font-size: 0.62rem; }

    .perf-lab { padding: 1rem; }
    .perf-controls { flex-direction: column; gap: 0.5rem; }
    .load-btn { width: 100%; min-width: unset; text-align: center; }

    .contact-link {
      font-size: 0.7rem;
      padding: 0.75rem 1rem;
      word-break: break-all;
    }
    .terminal-block { font-size: 0.7rem; }
    .term-body { padding: 0.8rem; font-size: 0.68rem; }

    .footer { flex-direction: column; text-align: center; padding: 1rem; }
  }

  /* ═══════════════════════════════════════════
     RESPONSIVE — SMALL PHONES (≤380px)
  ═══════════════════════════════════════════ */
  @media (max-width: 380px) {
    .hero-stats { grid-template-columns: repeat(2, 1fr); gap: 0.5rem; }
    .stat-num { font-size: 1.3rem; }
    .stat-label { font-size: 0.58rem; }
    .btn-primary, .btn-ghost { font-size: 0.68rem; padding: 0.65rem 1rem; }
    .section { padding: 2rem 0.85rem; }
    .timeline-card { padding: 0.85rem; }
    .result-chip { font-size: 0.58rem; padding: 0.25rem 0.5rem; }
  }
`;

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const EXPERIENCE = [
  {
    company: 'Xebia',
    role: 'Senior Performance Test Engineer',
    period: 'Sept 2025 – Present',
    current: true,
    items: [
      'Led performance testing for KYC onboarding platform — integrated APEX AI engine to reduce onboarding time by 65%',
      'Designed end-to-end load testing strategy using JMeter + BlazeMeter for enterprise banking clients',
      'Implemented Dynatrace PurePath & Davis AI for root-cause analysis, reducing MTTR by 40%',
      'Built DQL dashboards in Dynatrace Smartscape for real-time transaction tracing across microservices',
      'Mentored junior engineers on APM tooling and performance benchmarking methodologies',
    ],
    tools: ['JMeter', 'BlazeMeter', 'Dynatrace', 'APEX AI'],
  },
  {
    company: 'Maveric Systems Limited',
    role: 'Performance Test Engineer',
    period: 'May 2023 – Sept 2025',
    items: [
      'Led performance testing for Bank ABC Bahrain & Egypt — achieved 30% response time reduction and 50% throughput gain',
      'Scripted JMeter test plans with parameterization, correlation, and custom assertions for banking APIs',
      'Integrated AppDynamics for live monitoring; delivered bottleneck analysis reports to dev leads',
      'Collaborated cross-functionally in Agile sprints to align performance SLAs with release gates',
    ],
    tools: ['JMeter', 'AppDynamics', 'Grafana', 'InfluxDB', 'LoadRunner'],
  },
  {
    company: 'Revature India',
    role: 'Associate Performance Test Engineer',
    period: 'Aug 2022 – Apr 2023',
    items: [
      'Conducted performance and functional testing on Salesforce applications across 3 product lines',
      'Developed JMeter scripts and Selenium automation suites for regression coverage',
      'Participated in daily Agile stand-ups and contributed to sprint planning for QA tracks',
    ],
    tools: ['JMeter', 'Selenium', 'Salesforce', 'Agile/Scrum'],
  },
];

const SKILLS = [
  {
    category: 'Load Testing',
    items: [
      { name: 'Apache JMeter', pct: 95 },
      { name: 'LoadRunner Enterprise', pct: 78 },
      { name: 'BlazeMeter', pct: 82 },
      { name: 'Gatling', pct: 65 },
    ],
  },
  {
    category: 'APM & Monitoring',
    items: [
      { name: 'Dynatrace (PurePath, DQL, Davis AI)', pct: 78 },
      { name: 'AppDynamics', pct: 90 },
      { name: 'Grafana', pct: 85 },
      { name: 'AWS CloudWatch', pct: 75 },
      { name: 'Splunk', pct: 70 },
    ],
  },
  {
    category: 'Scripting & Automation',
    items: [
      { name: 'Selenium WebDriver', pct: 60 },
      { name: 'Python (performance scripts)', pct: 72 },
      { name: 'Shell / Bash', pct: 68 },
      { name: 'JMeter Plugins & BeanShell', pct: 95 },
    ],
  },
  {
    category: 'Infrastructure & Platforms',
    items: [
      { name: 'AWS (EC2, CloudWatch, S3)', pct: 72 },
      { name: 'Docker / Containerized test envs', pct: 68 },
      { name: 'Jenkins (CI/CD pipelines)', pct: 75 },
      { name: 'Jira / Confluence', pct: 88 },
    ],
  },
];

const CASE_STUDIES = [
  {
    featured: true,
    title: 'KYC Platform + APEX AI Integration',
    client: 'Xebia | Enterprise Banking Client',
    problem: 'A major bank\'s KYC onboarding pipeline was taking 8–12 minutes per customer under concurrent load, causing abandonment and compliance delays. The existing monolith had no observability into transaction flows.',
    approach: 'Designed a comprehensive performance test strategy covering API, database, and integration layers. Integrated APEX AI to intelligently route and prioritize verification steps. Instrumented Dynatrace PurePath to trace every transaction hop across 14 microservices. Ran concurrent load simulations up to 2,000 users via BlazeMeter.',
    results: ['Onboarding time: 8 min → 2.8 min (65% ↓)', 'API error rate: 12% → 0.8%', 'P95 latency: 6.2s → 1.4s', 'Zero downtime during peak load'],
    tools: ['JMeter', 'BlazeMeter', 'Dynatrace', 'DQL', 'APEX AI', 'AWS CloudWatch', 'Docker'],
  },
  {
    title: 'Bank ABC – Bahrain Digital Banking',
    client: 'Maveric Systems | Bank ABC Bahrain',
    problem: 'Mobile banking app experiencing 40s+ response times under 200+ concurrent users. Release was blocked pending SLA sign-off.',
    approach: 'Built parameterized JMeter test plans covering 18 transaction types. Used AppDynamics to isolate DB query hotspots. Recommended and validated connection pool tuning + query optimization with dev team.',
    results: ['Response time: 40s → 4.5s (88% ↓)', 'Throughput: +50%', 'SLA green-lit for release'],
    tools: ['JMeter', 'AppDynamics', 'Grafana'],
  },
  {
    title: 'Bank ABC – Egypt Mobile App Scale-Out',
    client: 'Maveric Systems | Bank ABC Egypt',
    problem: 'Regional mobile app struggling with traffic spikes during peak banking hours; 5% error rate under load.',
    approach: 'Stress tested up to 1,500 concurrent users; identified memory leak in session management layer. Collaborated with dev team on fix validation and capacity planning.',
    results: ['Error rate: 5% → <0.5%', 'Scalability: +20%', 'Capacity plan delivered'],
    tools: ['JMeter', 'AppDynamics', 'Selenium'],
  },
];

const loadConfigs = {
  low:    { users: 50,   beforeBase: 20000, afterBase: 2000 },
  medium: { users: 200,  beforeBase: 40000, afterBase: 4500 },
  high:   { users: 1000, beforeBase: 60000, afterBase: 6000 },
};

/* ─────────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────────── */
function NavBar() {
  const [metrics, setMetrics] = React.useState({ rt: 245, tput: 312 });
  const [uptime, setUptime] = React.useState(0);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const t1 = setInterval(() => setUptime(u => u + 1), 1000);
    const t2 = setInterval(() =>
      setMetrics({ rt: 200 + Math.floor(Math.random() * 60), tput: 280 + Math.floor(Math.random() * 80) }),
    3000);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, []);

  function scroll(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  }

  const navItems = [
    { id: 'about', label: 'about' },
    { id: 'skills', label: 'skills' },
    { id: 'experience', label: 'experience' },
    { id: 'cases', label: 'case studies' },
    { id: 'lab', label: 'perf lab' },
    { id: 'contact', label: 'contact' },
  ];

  return (
    <>
      <nav className="nav-bar">
        <div className="nav-logo">JD<span>::</span>Perf</div>

        {/* Desktop links */}
        <ul className="nav-links">
          {navItems.map(({ id, label }) => (
            <li key={id}>
              <button onClick={() => scroll(id)}>{label}</button>
            </li>
          ))}
        </ul>

        {/* Desktop status */}
        <div className="nav-status">
          <span className="status-dot" />
          {metrics.rt}ms · {metrics.tput} req/s · {uptime}s
        </div>

        {/* Hamburger */}
        <button
          className={`nav-hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`nav-drawer ${menuOpen ? 'open' : ''}`}>
        {navItems.map(({ id, label }) => (
          <button key={id} onClick={() => scroll(id)}>{label}</button>
        ))}
        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.65rem',
          color: 'var(--text-muted)',
          marginTop: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem'
        }}>
          <span className="status-dot" style={{width:6,height:6}} />
          {metrics.rt}ms · {metrics.tput} req/s
        </div>
      </div>
    </>
  );
}

function HeroSection() {
  const counters = [
    { value: '4+', label: 'Years Experience' },
    { value: '10+', label: 'Banking Projects' },
    { value: '88%', label: 'Avg. Latency Cut' },
    { value: '8+', label: 'Tools Mastered' },
  ];

  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-left">
          <div className="hero-badge">
            <span className="status-dot" style={{width:6,height:6}} />
            Available for Senior / Lead roles
          </div>
          <h1 className="hero-name">
            John<br /><span className="accent">David</span>
          </h1>
          <p className="hero-title">
            SENIOR PERFORMANCE TEST ENGINEER · <span className="hl">XEBIA</span>
          </p>
          <p className="hero-desc">
            I break systems before users do. Specialising in high-stakes banking performance engineering — load testing, APM observability, and AI-integrated test automation across enterprise-scale platforms.
          </p>
          <div className="hero-ctas">
            <a className="btn-primary" href="mailto:john12david05@gmail.com?subject=Resume Request">
              Request Resume
            </a>
            <a className="btn-ghost" href="https://www.linkedin.com/in/john-david-8a7237222" target="_blank" rel="noopener noreferrer">
              LinkedIn ↗
            </a>
          </div>
          <div className="hero-stats">
            {counters.map((c, i) => (
              <div key={i} className="stat-card">
                <div className="stat-num">{c.value}</div>
                <div className="stat-label">{c.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Profile frame — hidden on mobile via CSS */}
        <div className="hero-right">
          <div className="profile-frame">
            <div className="profile-ring" />
            <div className="profile-glow" />
            <img src={profilePicture} alt="John David" className="profile-img" />
            <div className="profile-tags">
              {['JMeter · 95%', 'Dynatrace · 88%', 'AppDynamics · 90%', 'BlazeMeter · 82%'].map((t, i) => (
                <div key={i} className="profile-tag">{t}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="section" id="about">
      <div className="divider" style={{marginBottom:'3rem'}} />
      <div className="section-label">// about</div>
      <div className="section-title">The Engineer Behind the <span className="accent">Metrics</span></div>
      <div className="about-grid">
        <div className="about-bio">
          <p>
            I'm a <strong>Senior Performance Test Engineer</strong> currently at <strong>Xebia</strong>, where I work at the intersection of load testing, APM observability, and AI-augmented automation. My domain is <strong>banking and financial services</strong> — a space where performance isn't just a nice-to-have, it's a regulatory and commercial imperative.
          </p>
          <p>
            Over the past 4+ years across Xebia, Maveric Systems, and Revature, I've stress-tested everything from mobile banking apps and KYC pipelines to payment gateways and core banking APIs — for clients including Bank ABC Egypt,TNB,Bank ABC Global and RBI across multiple geographies.
          </p>
          <p>
            What sets my work apart is a <strong>systems thinking</strong> approach: I don't just run JMeter scripts, I trace root causes through APM tools like Dynatrace and AppDynamics, translate findings into actionable engineering fixes, and validate improvements with hard data. My most recent work integrating <strong>APEX AI</strong> into KYC performance testing is evidence that I'm pushing into what performance engineering looks like in the AI era.
          </p>
        </div>
        <div className="about-cards">
          {[
            {icon:'// DOMAIN', title:'Banking & Financial Services', body:'4+ years in BFSI performance engineering — mobile banking, KYC, payment APIs, core banking systems.'},
            {icon:'// CURRENT', title:'Senior Performance Test Engineer @ Xebia', body:'Leading AI-integrated performance testing for enterprise clients. Driving observability with Dynatrace Smartscape + DQL.'},
            {icon:'// EDGE', title:'AI in Performance Testing', body:"Pioneering use of APEX AI for intelligent test orchestration — a differentiator most performance engineers don't have yet."},
          ].map((c, i) => (
            <div key={i} className="about-card">
              <div className="about-card-icon">{c.icon}</div>
              <h4>{c.title}</h4>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  const [visible, setVisible] = React.useState(false);
  const ref = React.useRef();

  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section" id="skills" ref={ref}>
      <div className="divider" style={{marginBottom:'3rem'}} />
      <div className="section-label">// skills</div>
      <div className="section-title">Full <span className="accent">Toolstack</span></div>
      <div className="skills-grid">
        {SKILLS.map((group, gi) => (
          <div key={gi} className="skill-group">
            <div className="skill-group-title">{group.category}</div>
            <div className="skill-list">
              {group.items.map((skill, si) => (
                <div key={si} className="skill-row">
                  <div className="skill-top">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-pct">{skill.pct}%</span>
                  </div>
                  <div className="skill-bar">
                    <div
                      className="skill-fill"
                      style={{ width: visible ? `${skill.pct}%` : '0%', transition: `width ${0.6 + si * 0.1}s ease ${gi * 0.1}s` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section className="section" id="experience">
      <div className="divider" style={{marginBottom:'3rem'}} />
      <div className="section-label">// experience</div>
      <div className="section-title">Career <span className="accent">Timeline</span></div>
      <div className="timeline">
        {EXPERIENCE.map((exp, i) => (
          <div key={i} className={`timeline-item ${exp.current ? '' : 'past'}`}>
            <div className="timeline-dot" />
            <div className="timeline-card">
              <div className="timeline-header">
                <span className="timeline-company">{exp.company}</span>
                <span className="timeline-period">{exp.period}</span>
              </div>
              <div className="timeline-role">{exp.role}</div>
              <ul className="timeline-items">
                {exp.items.map((item, j) => <li key={j}>{item}</li>)}
              </ul>
              <div className="timeline-tags">
                {exp.tools.map((t, j) => <span key={j} className="tag">{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CaseStudiesSection() {
  const [expanded, setExpanded] = React.useState(null);

  return (
    <section className="section" id="cases">
      <div className="divider" style={{marginBottom:'3rem'}} />
      <div className="section-label">// case studies</div>
      <div className="section-title">Performance <span className="accent">War Stories</span></div>
      <div className="case-studies-grid">
        {CASE_STUDIES.map((c, i) => {
          const isOpen = expanded === i;
          return (
            <div
              key={i}
              className={`case-card ${c.featured ? 'featured' : ''}`}
              onClick={() => setExpanded(isOpen ? null : i)}
            >
              <div className="case-header">
                <div style={{flex:1, minWidth:0}}>
                  <div className="case-title">{c.title}</div>
                  <div className="case-subtitle">{c.client}</div>
                </div>
                {c.featured && <span className="case-tag-featured">★ FEATURED</span>}
              </div>
              <div className="case-body">
                <div className="case-section-label">PROBLEM</div>
                <div className="case-text">{c.problem}</div>
                <div className="case-results">
                  {c.results.map((r, j) => <span key={j} className="result-chip">✓ {r}</span>)}
                </div>
              </div>
              {isOpen && (
                <div className="case-expand-body">
                  <div className="case-expand-inner">
                    <div className="case-section-label">APPROACH</div>
                    <div className="case-text">{c.approach}</div>
                    <div className="case-section-label" style={{marginTop:'0.8rem'}}>TOOLS USED</div>
                    <div className="case-tools">
                      {c.tools.map((t, j) => <span key={j} className="tag">{t}</span>)}
                    </div>
                  </div>
                </div>
              )}
              <div style={{padding:'0.5rem 1.6rem 1rem', fontFamily:'JetBrains Mono,monospace', fontSize:'0.65rem', color:'var(--text-muted)'}}>
                {isOpen ? '▲ collapse' : '▼ view approach'}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function PerformanceLabSection() {
  const [chartData, setChartData] = React.useState([]);
  const [isTesting, setIsTesting] = React.useState(false);
  const [activeLoad, setActiveLoad] = React.useState(null);

  function runTest(level) {
    if (isTesting) return;
    setActiveLoad(level);
    setIsTesting(true);
    setChartData([]);
    const { beforeBase, afterBase } = loadConfigs[level];
    const steps = Array.from({ length: 8 }, (_, i) => ({
      t: `${i + 1}s`,
      before: beforeBase + Math.random() * 6000 - 3000,
      after:  afterBase  + Math.random() * 800  - 400,
    }));
    steps.forEach((step, idx) => {
      setTimeout(() => {
        setChartData(prev => [...prev, step]);
        if (idx === steps.length - 1) setIsTesting(false);
      }, (idx + 1) * 700);
    });
  }

  const cfg = activeLoad ? loadConfigs[activeLoad] : null;

  return (
    <section className="section" id="lab">
      <div className="divider" style={{marginBottom:'3rem'}} />
      <div className="section-label">// interactive</div>
      <div className="section-title">Performance <span className="accent">Lab</span></div>
      <p style={{color:'var(--text-muted)', fontSize:'0.875rem', marginBottom:'1.5rem', maxWidth:600}}>
        Live simulation of real optimization results from the Bank ABC project. Select a load scenario to see Before vs After optimization response times.
      </p>
      <div className="perf-lab">
        <div className="perf-controls">
          {Object.entries(loadConfigs).map(([level, lcfg]) => (
            <button
              key={level}
              className={`load-btn ${activeLoad === level ? 'active' : ''}`}
              onClick={() => runTest(level)}
              disabled={isTesting}
            >
              {isTesting && activeLoad === level ? '● RUNNING...' : `${level.toUpperCase()} — ${lcfg.users} USERS`}
            </button>
          ))}
        </div>
        <div className="perf-legend">
          <div className="legend-item">
            <div className="legend-dot" style={{background:'#ff4d6d'}} />
            Before Optimization
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{background:'#00d4ff'}} />
            After Optimization
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="beforeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff4d6d" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#ff4d6d" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="afterGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="t" stroke="var(--text-muted)" tick={{ fontFamily: 'JetBrains Mono', fontSize: 10 }} />
            <YAxis
              stroke="var(--text-muted)"
              tick={{ fontFamily: 'JetBrains Mono', fontSize: 10 }}
              tickFormatter={v => `${(v/1000).toFixed(1)}s`}
              domain={cfg ? [0, cfg.beforeBase * 1.3] : [0, 80000]}
              width={42}
            />
            <Tooltip
              contentStyle={{ background: '#0b1628', border: '1px solid rgba(0,212,255,0.2)', borderRadius: 8, fontFamily: 'JetBrains Mono', fontSize: 11 }}
              labelStyle={{ color: '#5a7a9a' }}
              formatter={v => `${(v/1000).toFixed(2)}s`}
            />
            <Area type="monotone" dataKey="before" stroke="#ff4d6d" strokeWidth={2} fill="url(#beforeGrad)" name="Before" dot={false} />
            <Area type="monotone" dataKey="after"  stroke="#00d4ff" strokeWidth={2} fill="url(#afterGrad)"  name="After"  dot={false} />
          </AreaChart>
        </ResponsiveContainer>
        {cfg && (
          <div className="perf-annotation">
            Simulating <span>{cfg.users} concurrent users</span> ·
            Before: ~<span>{(cfg.beforeBase/1000).toFixed(1)}s</span> →
            After: ~<span>{(cfg.afterBase/1000).toFixed(1)}s</span>
          </div>
        )}
        {!activeLoad && (
          <div className="perf-annotation">← Select a load scenario to begin the simulation</div>
        )}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="section" id="contact">
      <div className="divider" style={{marginBottom:'3rem'}} />
      <div className="section-label">// contact</div>
      <div className="contact-grid">
        <div>
          <div className="contact-headline">
            Let's build something<br /><span className="accent">unbreakable.</span>
          </div>
          <p className="contact-sub">
            Open to Senior Performance Engineer and Lead roles — especially in banking, fintech, or AI-integrated testing domains.
          </p>
          <div className="contact-links">
            <a className="contact-link" href="mailto:john12david05@gmail.com">
              <span className="contact-link-icon">@</span>
              john12david05@gmail.com
            </a>
            <a className="contact-link" href="https://www.linkedin.com/in/john-david-8a7237222" target="_blank" rel="noopener noreferrer">
              <span className="contact-link-icon">↗</span>
              linkedin.com/in/john-david
            </a>
            <a className="contact-link" href="mailto:john12david05@gmail.com?subject=Resume%20Request&body=Hi%20John%2C%0A%0AI%27d%20like%20to%20learn%20more%20about%20your%20experience.%20Could%20you%20share%20your%20resume%3F%0A%0AThank%20you!">
              <span className="contact-link-icon">⬇</span>
              Request Resume
            </a>
          </div>
        </div>
        <div className="terminal-block">
          <div className="term-topbar">
            <div className="term-dot" style={{background:'#ff5f56'}} />
            <div className="term-dot" style={{background:'#febc2e'}} />
            <div className="term-dot" style={{background:'#27c93f'}} />
            <div className="term-title">CONNECTION STATUS</div>
          </div>
          <div className="term-body">
            <div className="term-line"><span className="term-prompt">$</span><span className="term-cmd"> ping john-david --profile</span></div>
            <div className="term-output ok">64 bytes: status=ACTIVE</div>
            <div className="term-line" style={{marginTop:'0.5rem'}}><span className="term-prompt">$</span><span className="term-cmd"> whoami</span></div>
            <div className="term-output info">Senior Perf Engineer @ Xebia</div>
            <div className="term-line" style={{marginTop:'0.5rem'}}><span className="term-prompt">$</span><span className="term-cmd"> cat skills.top</span></div>
            <div className="term-output">JMeter · Dynatrace · AppDynamics</div>
            <div className="term-line" style={{marginTop:'0.5rem'}}><span className="term-prompt">$</span><span className="term-cmd"> status --availability</span></div>
            <div className="term-output ok">OPEN TO OPPORTUNITIES</div>
            <div className="term-line" style={{marginTop:'0.5rem'}}><span className="term-prompt">$</span><span className="term-cmd"> _<span className="term-cursor" /></span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   ROOT
───────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <style>{styles}</style>
      <div className="portfolio-root">
        <NavBar />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <CaseStudiesSection />
        <PerformanceLabSection />
        <ContactSection />
        <footer className="footer">
          <span>John David · Senior Performance Test Engineer</span>
          <span style={{fontFamily:'JetBrains Mono,monospace', fontSize:'0.62rem', color:'var(--text-muted)'}}>
            Built with React · No frameworks harmed
          </span>
        </footer>
      </div>
    </>
  );
}