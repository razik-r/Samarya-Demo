import { useState, useEffect, useRef } from "react";
import fcard1 from "./assets/fcard1.jpg";
import fcard2 from "./assets/fcard2.jpg";
import SamaryaFooter from './SamaryaFooter'
// ═══════════════════════════════════════════════════════════════════
// DESIGN TOKENS
// ═══════════════════════════════════════════════════════════════════
const T = {
  gold:    "#D4B483",
  goldhov: "#C8A06E",
  dark:    "#1A1208",
  text:    "#2C2416",
  muted:   "#8A7D6B",
  cream:   "#F5F0E8",
  cream2:  "#EAE3D6",
  white:   "#FDFAF5",
  border:  "rgba(44,36,22,0.1)",
  fd:      "'pangaialight','Cormorant Garamond', serif",
  fu:      "'Inter', sans-serif",
};

// ═══════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════
const CARDS = [
  {
    id: "focus",
    title: "Designed for Focus",
    desc: "Your work doesn't stop when you travel — it just finds a better backdrop. Samarya is built around the workation rhythm: a sunlit café, a desk with a view, and internet that keeps up with your ambition.",
    image: fcard1,
    points: ["200 Mbps+ Verified Fiber WiFi", "Dedicated Workspace for Digital Nomads", "In-house Café, Always Brewing"],
  },
  {
    id: "nature",
    title: "Rooted in Nature",
    desc: "When the laptop closes, the plantation comes alive. Wander through lush coffee trails, take a sunset walk by Hirekolale Lake, or find your rhythm with live music under the stars.",
    image: fcard2,
    points: ["Infinity Pool & Bonfire Evenings", "Coffee Plantation Trails", "5-Min Walk to Hirekolale Lake"],
  },
  {
    id: "community",
    title: "Made for Community",
    desc: "Solo doesn't mean alone. Samarya draws creators, nomads, and curious minds who share a table, a sunrise, and the occasional late-night idea. The best connections happen when you least expect them.",
    image: "https://samarya.online/wp-content/uploads/2026/02/IMG_9619-Edit.jpg",
    points: ["Shared Café & Co-working Spaces", "Curated Guest Community", "Bonfire Socials & Cultural Events"],
  },
];

const ABOUT_ICONS = [
  { key: "pool",  label: "Infinity\nPool",          path: <><path d="M2 17c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2"/><path d="M2 12c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2"/></> },
  { key: "bfast", label: "Complimentary\nBreakfast", path: <><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></> },
  { key: "fire",  label: "Bonfire\nEvenings",        path: <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/> },
  { key: "pet",   label: "Pet\nFriendly",            path: <><circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/></> },
];



const MARQUEE_WORDS = ["slow mornings","deep focus","filter coffee","plantation walks","bonfire evenings","mountain air","meaningful work","creative spark"];

// ═══════════════════════════════════════════════════════════════════
// GLOBAL CSS
// ═══════════════════════════════════════════════════════════════════
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── WORD REVEAL ── */
  @keyframes wordRise {
    from { opacity:0; transform:translateY(110%); }
    to   { opacity:1; transform:translateY(0); }
  }
  .word-clip {  display: inline-block; }
  .word-inner {
    display: inline-block;
    opacity: 0; transform: translateY(110%);
  }
  .word-inner.revealed {
    animation: wordRise 0.9s cubic-bezier(0.16,1,0.3,1) forwards;
  }

  /* ── MARQUEE ── */
  @keyframes mq { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  .mq-track { animation: mq 28s linear infinite; display:flex; white-space:nowrap; }

  /* ── FLOATING CARD ── */
  @keyframes floatA {
    0%,100% { transform: translateY(0px) rotate(-3deg); }
    50%      { transform: translateY(-14px) rotate(-3deg); }
  }
  @keyframes floatB {
    0%,100% { transform: translateY(-8px) rotate(2.5deg); }
    50%      { transform: translateY(8px) rotate(2.5deg); }
  }
  .float-a { animation: floatA 5s ease-in-out infinite; }
  .float-b { animation: floatB 6s ease-in-out 0.5s infinite; }
  .float-c { animation: floatA 7s ease-in-out 1s infinite; }

  /* ── FOOTER LINK HOVER ── */
  .f-link { transition: color 0.22s; }
  .f-link:hover { color: #D4B483 !important; }

  /* ── RESPONSIVE ── */
  @media (max-width: 1024px) {
    .exp-split { grid-template-columns: 50fr 50fr !important; }
  }
  @media (max-width: 900px) {
    .bal-layout { flex-direction: column !important; }
    .bal-right  { width: 100% !important; min-height: 380px !important; }
    .f-grid     { grid-template-columns: 1fr 1fr !important; }
    .exp-split { grid-template-columns: 1fr !important; }
    .exp-split > div:first-child { min-height: 300px !important; }
  }
  @media (max-width: 768px) {
    .exp-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 1rem !important; }
  }
  @media (max-width: 560px) {
    .f-grid     { grid-template-columns: 1fr !important; gap: 2rem !important; }
    .f-cta-row  { flex-direction: column !important; align-items: flex-start !important; }
    .exp-grid   { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
    .exp-split > div:first-child { min-height: 240px !important; }
    .exp-split { padding: 2rem 1rem !important; }
  }
`;

// ═══════════════════════════════════════════════════════════════════
// SVG HELPER
// ═══════════════════════════════════════════════════════════════════
function Icon({ path, size = 20, color = T.gold, opacity = 0.75 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
      style={{ opacity, flexShrink: 0 }}>{path}</svg>
  );
}

// ═══════════════════════════════════════════════════════════════════
// WORD REVEAL HEADLINE
// ═══════════════════════════════════════════════════════════════════
export function RevealHeadline({ text, goldWord, delay = 0 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const words = text.split(" ");
  return (
    <h2 ref={ref} style={{ fontFamily: T.fd, fontSize: "clamp(2.4rem,4.5vw,3.8rem)",
      fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.05,
      color: T.text, display: "flex", flexWrap: "wrap", gap: "0 0.3em" }}>
      {words.map((w, i) => (
        <span key={i} className="word-clip">
          <span className={`word-inner${vis ? " revealed" : ""}`}
            style={{
              animationDelay: vis ? `${delay + i * 0.1}s` : "0s",
              fontStyle: w === goldWord ? "italic" : "normal",
              color: w === goldWord ? T.gold : T.text,
            }}>
            {w}
          </span>
        </span>
      ))}
    </h2>
  );
}

// ═══════════════════════════════════════════════════════════════════



// Fan positions: left, center, right - spread like playing cards
// All cards fan from a common center bottom point
const FAN_POS = [
  { left: "10%", top: "15%", rotate: -22, zIndex: 1 },   // Left card
  { left: "30%", top: "0%",  rotate:   0, zIndex: 3 },   // Center card
  { left: "50%", top: "15%", rotate:  22, zIndex: 2 },   // Right card
];

function FloatingCards({ activeIdx, isHovering = false }) {
  const floatClass = ["float-a", "float-b", "float-c"];

  return (
    <div style={{ position: "absolute", width: "100%", height: "100%", minHeight: 600, top: 0, left: 0, inset: 0 }}>
      {CARDS.map((card, i) => {
        const isActive = i === activeIdx;
        const isPrev   = i === (activeIdx - 1 + CARDS.length) % CARDS.length;

        let slotIdx;
        if (isActive) slotIdx = 1;
        else if (isPrev) slotIdx = 0;
        else slotIdx = 2;

        const pos = FAN_POS[slotIdx];

        return (
          <div
            key={card.id}
            className={floatClass[i]}
            style={{
              position: "absolute",
              left: isHovering ? pos.left : "50%",
              top: isHovering ? pos.top : "50%",
              width: "clamp(200px, 35%, 280px)",
              zIndex: pos.zIndex,
              opacity: isHovering ? (isActive ? 1 : 0.60) : 0,
              transformOrigin: "50% 100%",
              transform: isHovering
                ? `translateX(-50%) rotate(${pos.rotate}deg) scale(${isActive ? 1 : 0.93})`
                : "translateX(-50%) rotate(0deg) scale(0.7) translateY(20px)",
              transition: "all 0.55s cubic-bezier(0.16,1,0.3,1)",
              pointerEvents: "none",
            }}>
            <div style={{
              width:360,
              height:390,
              background: T.white,
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: isActive
                ? "0 24px 60px rgba(26,18,8,0.18), 0 4px 16px rgba(26,18,8,0.08)"
                : "0 8px 24px rgba(26,18,8,0.10)",
              outline: isActive ? `1.5px solid ${T.gold}` : "1.5px solid transparent",
              transition: "outline 0.4s ease",
            }}>
              <img src={card.image} alt={card.title}
                style={{ width: "100%", height: 150, objectFit: "cover", display: "block" }}/>
              <div style={{ padding: "1.25rem 1.25rem 1.5rem" }}>
                <h4 style={{ fontFamily: T.fd, fontSize: "1.3rem", fontWeight: 400,
                  letterSpacing: "-0.01em", color: T.text, marginBottom: "0.6rem",
                  lineHeight: 1.2 }}>{card.title}</h4>
                <p style={{ fontFamily: T.fu, fontSize: 11, fontWeight: 400,
                  lineHeight: 1.75, color: T.muted, marginBottom: "0.85rem",
                  fontStyle: "italic" }}>{card.desc}</p>
                <ol style={{ paddingLeft: 0, listStyle: "none", display: "flex",
                  flexDirection: "column", gap: "0.25rem" }}>
                  {card.points.map((pt, j) => (
                    <li key={j} style={{ fontFamily: T.fu, fontSize: 11,
                      fontWeight: 400, color: T.text, lineHeight: 1.5 }}>
                      <span style={{ color: T.gold, fontWeight: 500, marginRight: 4 }}>{j+1}.</span>
                      {pt}
                    </li>
                  ))}
                </ol>
                <div style={{ marginTop: "1rem", color: T.gold, fontSize: 16 }}>→</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}






// ═══════════════════════════════════════════════════════════════════
// BALANCE SECTION
// ═══════════════════════════════════════════════════════════════════
function BalanceSection() {
  const [activeCard, setActiveCard] = useState(0);
  const [cardHovering, setCardHovering] = useState(false);

  // Auto-advance
  useEffect(() => {
    const t = setInterval(() => setActiveCard(i => (i+1) % CARDS.length), 10000);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ background: T.cream, padding: "6rem 0", overflow: "hidden" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 clamp(1.5rem,3vw,2.5rem)" }}>

        {/* Eyebrow */}
        <p style={{ fontFamily: T.fu, fontSize: 11, fontWeight: 500,
          letterSpacing: "0.28em", textTransform: "uppercase",
          color: T.gold, marginBottom: "1.5rem", textAlign: "center" }}>
          Hustle & Harmony
        </p>

        {/* Animated headline — centered */}
        <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
          <RevealHeadline text="Samarya Chikkamagaluru a workation Sanctuary" goldWord="Chikkamagaluru" delay={0.1}/>
        </div>

        {/* Divider */}
        <div style={{ width: 36, height: 0.5, background: T.gold, opacity: 0.5,
          margin: "1.25rem auto 1.5rem" }}/>

        {/* Marquee */}
        <div style={{ overflow: "hidden", marginBottom: "4.5rem",
          borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`,
          padding: "0.85rem 0" }}>
          <div className="mq-track">
            {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (
              <span key={i} style={{ fontFamily: T.fd, fontSize: "clamp(1rem,1.8vw,1.3rem)",
                fontWeight: 300, fontStyle: "italic",
                color: "rgba(44,36,22,0.28)", paddingRight: "3rem", flexShrink: 0 }}>
                {w} <span style={{ display:"inline-block", width:4, height:4,
                  borderRadius:"50%", background:T.gold, opacity:0.4,
                  verticalAlign:"middle", margin:"0 0.5rem" }}/>
              </span>
            ))}
          </div>
        </div>

        {/* Main layout: text left, floating cards right */}
        <div className="bal-layout" style={{ display: "flex",  gap: "1.5rem", alignItems: "flex-start" }}>

          {/* Left — main card with text + icons + dots */}
          <div style={{ flex: "0 0 clamp(300px,42%,500px)",
            background: T.white, padding: "2.5rem 2.5rem 2rem",
            boxShadow: "0 2px 20px rgba(26,18,8,0.06)" ,borderRadius:'10px'}}>

            {/* Leaf icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke={T.gold} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
              style={{ opacity: 0.65, marginBottom: "1.5rem", display:"block" }}>
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
            </svg>

            <RevealHeadline text="Born from the Idea of Balance" goldWord="Balance" delay={0.2}/>

            <div style={{ width: 32, height: 0.5, background: T.gold,
              opacity: 0.5, margin: "1.25rem 0 0.6rem" }}/>

            <p style={{ fontFamily: T.fu, fontSize: 10, fontWeight: 500,
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: T.gold, marginBottom: "0.85rem" }}>Hustle & Harmony</p>

            <p style={{ fontFamily: T.fu, fontSize: 13, fontWeight: 400,
              lineHeight: 1.85, color: T.muted, marginBottom: "2.5rem",
              maxWidth: 360 }}>
              Samarya is a boutique workation sanctuary in Chikkamagaluru, created for those who seek deep work, slow mornings and meaningful moments in nature.
            </p>

            {/* Icon strip */}
            <div style={{ display: "flex", gap: 0, paddingTop: "1.5rem",
              borderTop: `1px solid ${T.border}`, flexWrap: "wrap" }}>
              {ABOUT_ICONS.map((icon, i) => (
                <div key={icon.key} style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  gap: "0.4rem", padding: "0 1.25rem 0 0", marginRight: "1.25rem",
                  borderRight: i < ABOUT_ICONS.length - 1 ? `1px solid ${T.border}` : "none",
                  textAlign: "center",
                }}>
                  <Icon path={icon.path} size={20}/>
                  <span style={{ fontFamily: T.fu, fontSize: 10, fontWeight: 400,
                    letterSpacing: "0.08em", textTransform: "uppercase",
                    color: T.muted, lineHeight: 1.4, whiteSpace: "pre-line" }}>
                    {icon.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Dot navigation */}
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "2rem" }}>
              {CARDS.map((_, i) => (
                <button key={i} onClick={() => setActiveCard(i)}
                  style={{
                    width: i === activeCard ? 20 : 8, height: 8,
                    borderRadius: 4, border: "none", cursor: "pointer",
                    background: i === activeCard ? T.gold : "rgba(44,36,22,0.15)",
                    transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                    padding: 0,
                  }}/>
              ))}
            </div>
          </div>

          {/* Right — floating card stack */}
          <div className="bal-right" style={{ flex: 1, position: "relative",
            minHeight: 540, overflow: "visible" }}
            onMouseEnter={() => setCardHovering(true)}
            onMouseLeave={() => setCardHovering(false)}>
            {/* <img src={CARDS[activeCard].image} alt={CARDS[activeCard].title}
              style={{ width: "100%", height: "530px", objectFit: "cover", display: "block",
                borderRadius: 4, boxShadow: "0 12px 40px rgba(26,18,8,0.12)",
                opacity: cardHovering ? 0 : 1,
              
                transition: "opacity 0.5s cubic-bezier(0.16,1,0.3,1)",
                pointerEvents: "none" }}/> */}

            {/* Window overlay with 4 images in quadrants */}
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "530px",
              borderRadius: 4, pointerEvents: "none", overflow: "hidden",
              opacity: cardHovering ? 0 : 1,
              transition: "opacity 0.5s cubic-bezier(0.16,1,0.3,1)" }}>
              {/* Top-left quadrant */}
              <div style={{ position: "absolute", top: 0, left: 0, width: "50%", height: "50%",
                overflow: "hidden" }}>
                <img src={fcard1} alt="window-tl"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
              </div>
              {/* Top-right quadrant */}
              <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "50%",
                overflow: "hidden" }}>
                <img src=  "https://samarya.online/wp-content/uploads/2026/02/IMG_9986-Edit.jpg" alt="window-tr"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
              </div>
              {/* Bottom-left quadrant */}
              <div style={{ position: "absolute", bottom: 0, left: 0, width: "50%", height: "50%",
                overflow: "hidden" }}>
                <img src="https://samarya.online/wp-content/uploads/2026/02/IMG_9619-Edit.jpg" alt="window-bl"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
              </div>
              {/* Bottom-right quadrant */}
              <div style={{ position: "absolute", bottom: 0, right: 0, width: "50%", height: "50%",
                overflow: "hidden" }}>
                <img src= {fcard2} alt="window-br"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
              </div>
              {/* White cross divider */}
              <svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}>
                <line x1="50%" y1="0" x2="50%" y2="100%" stroke="white" strokeWidth="6" opacity="1"/>
                <line x1="0" y1="50%" x2="100%" y2="50%" stroke="white" strokeWidth="6" opacity="1"/>
              </svg>
            </div>

            <FloatingCards activeIdx={activeCard} isHovering={cardHovering}/>
          </div>
        </div>

      </div>
    </section>
  );
}


import hikes  from "./assets/hikes.png";
// ═══════════════════════════════════════════════════════════════════
// EXPERIENCES SECTION
// ═══════════════════════════════════════════════════════════════════
function ExperiencesSection() {
  const experiences = [
    { title: "Coffee Trails",  desc: "Walk through estates, meet the growers and taste coffee at its source.", img: "https://samarya.online/wp-content/uploads/2026/02/IMG_9986-Edit.jpg" },
    { title: "Bonfire Nights", desc: "Unwind with music, good food and conversations under starry skies.", img: "https://samarya.online/wp-content/uploads/2026/02/IMG_9996-Edit.jpg" },
    { title: "Offbeat Hikes",  desc: "Explore hidden trails, waterfalls and breathtaking viewpoints near Hirekolale Lake.", img: hikes },
  ];

  return (
    <section style={{ background: T.cream, paddingBottom: "5rem" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 clamp(1.5rem,3vw,2.5rem)" }}>

        {/* Split: image left, text right */}
        <div className="exp-split" style={{ display: "grid", gridTemplateColumns: "55fr 45fr",
          background: T.white, marginBottom: 10 }}>
          <div style={{ overflow: "hidden", minHeight: 400 }}>
            <img src="https://samarya.online/wp-content/uploads/2026/02/IMG_9604-Edit.jpg"
              alt="Beyond the desk"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block",
                transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)" }}
              onMouseEnter={e => e.target.style.transform = "scale(1.04)"}
              onMouseLeave={e => e.target.style.transform = "scale(1)"}/>
          </div>
          <div style={{ padding: "3.5rem 3rem", display: "flex",
            flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontFamily: T.fu, fontSize: 10, fontWeight: 500,
              letterSpacing: "0.26em", textTransform: "uppercase",
              color: T.gold, marginBottom: "0.75rem" }}>Beyond the Desk</p>
            <RevealHeadline text="Beyond the Desk at Samarya" goldWord="Samarya" delay={0.15}/>
            <div style={{ width: 32, height: 0.5, background: T.gold, opacity: 0.5, margin: "1.25rem 0" }}/>
            <p style={{ fontFamily: T.fu, fontSize: 13, fontWeight: 400,
              lineHeight: 1.85, color: T.muted, marginBottom: "2rem", maxWidth: 340 }}>
              Step away from the screen and into experiences that ground you. From coffee trails to bonfire nights — life here happens beyond the desk.
            </p>
            <a href="https://samarya.online" target="_blank" rel="noreferrer"
              style={{ fontFamily: T.fu, fontSize: 10, fontWeight: 500,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: T.text, textDecoration: "none",
                borderBottom: `1px solid ${T.border}`, paddingBottom: 2,
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                width: "fit-content", transition: "color 0.25s, border-color 0.25s" }}
              onMouseEnter={e => { e.currentTarget.style.color=T.gold; e.currentTarget.style.borderColor=T.gold; }}
              onMouseLeave={e => { e.currentTarget.style.color=T.text; e.currentTarget.style.borderColor=T.border; }}>
              Explore Experiences →
            </a>
          </div>
        </div>

        {/* 3 experience cards */}
        <div className="exp-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
          {experiences.map((exp, i) => (
            <div key={i} style={{ background: T.cream2, overflow: "hidden", cursor: "pointer" }}>
              <div style={{ overflow: "hidden", height: 240 }}>
                <img src={exp.img} alt={exp.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block",
                    transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)" }}
                  onMouseEnter={e => e.target.style.transform="scale(1.06)"}
                  onMouseLeave={e => e.target.style.transform="scale(1)"}/>
              </div>
              <div style={{ padding: "1.25rem 1.5rem 1.75rem" }}>
                <h4 style={{ fontFamily: T.fd, fontSize: "1.3rem", fontWeight: 400,
                  letterSpacing: "-0.01em", color: T.text, marginBottom: "0.5rem" }}>
                  {exp.title}
                </h4>
                <p style={{ fontFamily: T.fu, fontSize: 12, fontWeight: 400,
                  lineHeight: 1.75, color: T.muted, marginBottom: "1rem" }}>
                  {exp.desc}
                </p>
                <a href="https://samarya.online" target="_blank" rel="noreferrer"
                  style={{ fontFamily: T.fu, fontSize: 9, fontWeight: 500,
                    letterSpacing: "0.2em", textTransform: "uppercase",
                    color: T.text, textDecoration: "none",
                    borderBottom: `1px solid ${T.border}`, paddingBottom: 2,
                    display: "inline-flex", gap: "0.35rem", transition: "color 0.25s" }}
                  onMouseEnter={e => e.currentTarget.style.color=T.gold}
                  onMouseLeave={e => e.currentTarget.style.color=T.text}>
                  Discover More →
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}



// ═══════════════════════════════════════════════════════════════════
// PAGE EXPORT
// ═══════════════════════════════════════════════════════════════════
export default function SamaryaAboutFooter() {
  return (
    <>
      <style>{CSS}</style>
   <section id="about">   <BalanceSection/></section>
       <section id="experiences">
        <ExperiencesSection />
      </section>
  <section id="footer">
<SamaryaFooter/>
  </section>
      
    </>
  );
}