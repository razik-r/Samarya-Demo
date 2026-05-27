import { useState, useEffect, useRef } from "react";
import SamryaFooter from "./SamaryaFooter.jsx";

// ─── DESIGN TOKENS ─────────────────────────────────────────────────
export const T = {
  gold:    "#D4B483",
  goldhov: "#C8A06E",
  dark:    "#1A1208",
  text:    "#2C2416",
  muted:   "#8A7D6B",
  cream:   "#F5F0E8",
  cream2:  "#EAE3D6",
  border:  "rgba(44,36,22,0.1)",
  fd:      "'pangaialight', 'Cormorant Garamond', serif",
  fu:      "'Inter', sans-serif",
};

// ─── ROOM DATA ──────────────────────────────────────────────────────
const ROOMS = [
  {
    id: "01", name: "Super Deluxe Couple Room",
    floor: "2nd Floor", guests: "2 Adults", bed: "1 King Bed",
    amenities: ["ac","pool","bfast","fire","safe","wifi","shower"],
    images: [
      "https://samarya.online/wp-content/uploads/2026/02/IMG_9604-Edit.jpg",
      "https://samarya.online/wp-content/uploads/2026/02/IMG_9619-Edit.jpg",
      "https://samarya.online/wp-content/uploads/2026/02/IMG_9694-Edit.jpg",
    ],
    wa: "Super Deluxe Couple Room",
  },
  {
    id: "02", name: "Deluxe Couple Room",
    floor: "1st Floor", guests: "2 Adults", bed: "1 King Bed",
    amenities: ["ac","pool","bfast","fire","safe"],
    images: [
      "https://samarya.online/wp-content/uploads/2026/02/IMG_8879-Edit.jpg",
      "https://samarya.online/wp-content/uploads/2026/02/IMG_8832-Edit.jpg",
      "https://samarya.online/wp-content/uploads/2026/02/IMG_8854-Edit.jpg",
    ],
    wa: "Deluxe Couple Room",
  },
  {
    id: "03", name: "Deluxe Family Room",
    floor: "Ground Floor", guests: "3 Adults", bed: "Queen + Single",
    amenities: ["ac","pool","bfast","fire","pet"],
    images: [
      "https://samarya.online/wp-content/uploads/2024/01/IMG_8984-Edit.jpg",
      "https://samarya.online/wp-content/uploads/2024/01/IMG_9054-Edit.jpg",
      "https://samarya.online/wp-content/uploads/2024/01/IMG_9069-Edit.jpg",
    ],
    wa: "Deluxe Family Room",
  },
  {
    id: "04", name: "1 BHK Suite",
    floor: "1st Floor", guests: "3 Adults", bed: "Queen + Sofa Bed",
    amenities: ["ac","pool","bfast","sofa","safe"],
    images: [
      "https://samarya.online/wp-content/uploads/2026/02/IMG_9921-Edit.jpg",
      "https://samarya.online/wp-content/uploads/2026/02/IMG_9941-Edit.jpg",
    ],
    wa: "1 BHK Suite",
  },
  {
    id: "05", name: "6-Bed Mixed Dorm",
    floor: "Ground Floor", guests: "6 Guests", bed: "Bunk Beds",
    amenities: ["ac","pool","bfast","store","fire","wifi"],
    images: [
      "https://samarya.online/wp-content/uploads/2024/01/IMG_9870-Edit-1.jpg",
      "https://samarya.online/wp-content/uploads/2024/01/IMG_9835-Edit-1.jpg",
      "https://samarya.online/wp-content/uploads/2024/01/IMG_9840-Edit-1.jpg",
    ],
    wa: "6-Bed Dorm",
  },
];

const HERO_IMAGES = ROOMS.map(r => ({ src: r.images[0], name: r.name }));

// ─── INCLUSIONS DATA ────────────────────────────────────────────────
const INCLUSIONS = [
  { key: "pool",   label: "Infinity Pool",          sub: "Panoramic valley views while you drift." },
  { key: "bfast",  label: "Complimentary Breakfast", sub: "Organic, locally-sourced morning harvest." },
  { key: "wifi",   label: "200 Mbps Fiber WiFi",     sub: "Uninterrupted flow for seamless digital work." },
  { key: "fire",   label: "Bonfire Evenings",         sub: "Nightly gatherings under a canopy of stars." },
  { key: "safe",   label: "Room Safe & Toiletries",   sub: "Premium essentials for peace of mind." },
  { key: "pet",    label: "Pet Friendly",             sub: "A welcoming space for your companions." },
];

// ─── SVG ICONS ──────────────────────────────────────────────────────
const ICONS = {
  ac:     <path d="M2 6h20v12H2zM7 12h10M12 9v6" strokeLinecap="round"/>,
  pool:   <><path d="M2 17c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2"/><path d="M2 12c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2"/></>,
  bfast:  <><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></>,
  fire:   <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>,
  safe:   <><rect x="3" y="11" width="18" height="11" rx="1"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
  wifi:   <><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1"/></>,
  shower: <><path d="M4 4l2 2"/><path d="M6 6a6 6 0 0 1 8.5.5L20 12M6 6l6 14"/><path d="M20 12l-6 6"/><circle cx="12" cy="6" r="1"/><circle cx="16" cy="10" r="1"/></>,
  pet:    <><circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/></>,
  store:  <><rect x="2" y="3" width="20" height="5" rx="1"/><rect x="2" y="10" width="20" height="5" rx="1"/><rect x="2" y="17" width="20" height="4" rx="1"/></>,
  sofa:   <><path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"/><path d="M2 11a2 2 0 0 1 2-2 2 2 0 0 1 2 2v5h12v-5a2 2 0 0 1 2-2 2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z"/></>,
};

function Icon({ id, size = 16, color = T.muted, opacity = 0.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ opacity, flexShrink: 0 }}>
      {ICONS[id]}
    </svg>
  );
}

// ─── AMENITY ICON WITH TOOLTIP ──────────────────────────────────────
const TIPS = { ac:"AC", pool:"Infinity Pool", bfast:"Breakfast", fire:"Bonfire",
  safe:"Room Safe", wifi:"WiFi", shower:"Hot Shower", pet:"Pet Friendly",
  store:"Secure Storage", sofa:"Living Area" };

function AmenityIcon({ id }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ position:"relative", display:"flex", cursor:"default" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke={hov ? T.gold : T.muted} strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round"
        style={{ opacity: hov ? 1 : 0.6, transition:"all 0.2s", flexShrink:0 }}>
        {ICONS[id]}
      </svg>
      {hov && (
        <div style={{
          position:"absolute", bottom:"calc(100% + 6px)", left:"50%",
          transform:"translateX(-50%)",
          fontSize:9, fontWeight:500, letterSpacing:"0.08em",
          textTransform:"uppercase", color:T.cream,
          background:T.dark, padding:"3px 7px",
          whiteSpace:"nowrap", zIndex:20,
          fontFamily:T.fu,
        }}>{TIPS[id]}</div>
      )}
    </div>
  );
}

// ─── ROOM CARD ──────────────────────────────────────────────────────
function RoomCard({ room, large }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [hov, setHov] = useState(false);
  const ivRef = useRef(null);

  const startSlide = () => {
    if (room.images.length <= 1) return;
    ivRef.current = setInterval(() => setImgIdx(i => (i+1) % room.images.length), 1200);
  };
  const stopSlide = () => {
    clearInterval(ivRef.current);
    setImgIdx(0);
  };

  const imgH = large ? 300 : 220;

  return (
    <div
      onMouseEnter={() => { setHov(true); startSlide(); }}
      onMouseLeave={() => { setHov(false); stopSlide(); }}
      style={{
        background: T.cream2,
        display:"flex", flexDirection:"column",
        overflow:"hidden",
        height:"100%",
      }}>

      {/* Image */}
      <div style={{ position:"relative", width:"100%", height:imgH, overflow:"hidden", flexShrink:0 }}>
        {room.images.map((src, i) => (
          <img key={i} src={src} alt={room.name}
            style={{
              position:"absolute", inset:0, width:"100%", height:"100%",
              objectFit:"cover",
              opacity: i === imgIdx ? 1 : 0,
              transform: i === imgIdx ? (hov ? "scale(1.05)" : "scale(1)") : "scale(1.06)",
              transition:"opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}/>
        ))}
        {/* Overlay */}
        <div style={{
          position:"absolute", inset:0,
          background:"linear-gradient(180deg,rgba(0,0,0,0.04) 0%,rgba(0,0,0,0.32) 100%)",
          zIndex:1, pointerEvents:"none",
        }}/>
        {/* Number */}
        <span style={{
          position:"absolute", top:"0.8rem", left:"1rem", zIndex:2,
          fontFamily:T.fd, fontSize:"0.68rem", fontWeight:300,
          letterSpacing:"0.2em", color:"rgba(245,240,232,0.55)",
        }}>{room.id}</span>
        {/* Floor */}
        <span style={{
          position:"absolute", top:"0.8rem", right:"0.9rem", zIndex:2,
          fontSize:9, fontWeight:500, letterSpacing:"0.12em",
          textTransform:"uppercase", color:"rgba(245,240,232,0.8)",
          background:"rgba(0,0,0,0.28)", backdropFilter:"blur(6px)",
          padding:"3px 8px",
        }}>{room.floor}</span>
        {/* Dots */}
        {room.images.length > 1 && (
          <div style={{
            position:"absolute", bottom:"0.65rem", left:"50%",
            transform:"translateX(-50%)",
            display:"flex", gap:4, zIndex:2,
            opacity: hov ? 1 : 0, transition:"opacity 0.25s",
          }}>
            {room.images.map((_,i) => (
              <div key={i}
                onClick={e => { e.stopPropagation(); setImgIdx(i); }}
                style={{
                  width:4, height:4, borderRadius:"50%", cursor:"pointer",
                  background: i===imgIdx ? T.gold : "rgba(255,255,255,0.3)",
                  transform: i===imgIdx ? "scale(1.3)" : "scale(1)",
                  transition:"all 0.3s",
                }}/>
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{
        padding:"1.25rem 1.5rem",
        display:"flex", flexDirection:"column", gap:"0.65rem", flex:1,
      }}>
        <div style={{
          fontFamily:T.fd,
          fontSize: large ? "1.5rem" : "1.2rem",
          fontWeight:400, letterSpacing:"-0.01em", lineHeight:1.15,
          color:T.text,
        }}>{room.name}</div>

        <div style={{
          display:"flex", alignItems:"center", gap:"0.5rem",
          fontSize:11, fontWeight:400, letterSpacing:"0.05em", color:T.muted,
          fontFamily:T.fu,
        }}>
          <span>{room.guests}</span>
          <span style={{ color:T.gold, opacity:0.5 }}>·</span>
          <span>{room.bed}</span>
        </div>

        {/* Amenities */}
        <div style={{
          display:"flex", alignItems:"center", gap:"0.65rem",
          flexWrap:"wrap", paddingTop:"0.65rem",
          borderTop:`1px solid ${T.border}`,
        }}>
          {room.amenities.map(a => <AmenityIcon key={a} id={a}/>)}
        </div>

        {/* Footer */}
        <div style={{
          display:"flex", alignItems:"center", justifyContent:"space-between",
          paddingTop:"0.7rem", borderTop:`1px solid ${T.border}`,
          marginTop:"auto",
        }}>
          <a
            href={`https://wa.me/919845980024?text=Hi, I'd like to book the ${room.wa}`}
            target="_blank" rel="noreferrer"
            style={{
              display:"inline-flex", alignItems:"center", gap:"0.4rem",
              fontSize:10, fontWeight:500, letterSpacing:"0.16em",
              textTransform:"uppercase", color:T.dark,
              background:T.gold, textDecoration:"none",
              padding:"8px 14px",
              transition:"background 0.25s",
              fontFamily:T.fu,
              whiteSpace:"nowrap",
            }}
            onMouseEnter={e => e.currentTarget.style.background = T.goldhov}
            onMouseLeave={e => e.currentTarget.style.background = T.gold}
          >
            Book via WhatsApp →
          </a>
          {large && (
            <span style={{ fontSize:9, fontWeight:400, letterSpacing:"0.08em",
              textTransform:"uppercase", color:T.muted, fontFamily:T.fu }}>
              Instant confirm
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── INCLUSIONS CARD ────────────────────────────────────────────────
function InclusionsCard() {
  return (
    <div style={{
      background:T.cream2,
      padding:"1.75rem 1.75rem 1.5rem",
      display:"flex", flexDirection:"column",
      height:"100%",
    }}>
      <p style={{ fontFamily:T.fu, fontSize:10, fontWeight:500,
        letterSpacing:"0.24em", textTransform:"uppercase",
        color:T.gold, marginBottom:"0.6rem" }}>Inclusions</p>

      <h3 style={{ fontFamily:T.fd, fontSize:"1.55rem", fontWeight:400,
        letterSpacing:"-0.01em", lineHeight:1.1, color:T.text,
        marginBottom:"0.5rem" }}>
        Everything your<br/>stay <em style={{ fontStyle:"italic", color:T.gold }}>includes</em>
      </h3>

      <p style={{ fontFamily:T.fu, fontSize:12, fontWeight:400, lineHeight:1.7,
        color:T.muted, marginBottom:"1.25rem", paddingBottom:"1.25rem",
        borderBottom:`1px solid ${T.border}` }}>
        Designed for slow mornings, deep work and unforgettable evenings. Our sanctuary provides the canvas; you provide the intent.
      </p>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr",
        gap:"0.85rem 1rem", flex:1 }}>
        {INCLUSIONS.map(item => (
          <div key={item.key} style={{ display:"flex", alignItems:"flex-start", gap:"0.6rem" }}>
            <div style={{
              width:28, height:28, border:`1px solid ${T.border}`,
              display:"flex", alignItems:"center", justifyContent:"center",
              flexShrink:0, background:"rgba(255,255,255,0.5)",
            }}>
              <Icon id={item.key} size={13} color={T.gold} opacity={1}/>
            </div>
            <div>
              <div style={{ fontFamily:T.fu, fontSize:11, fontWeight:500,
                letterSpacing:"0.04em", color:T.text, lineHeight:1.3,
                marginBottom:2 }}>{item.label}</div>
              <div style={{ fontFamily:T.fu, fontSize:10, fontWeight:400,
                lineHeight:1.5, color:T.muted }}>{item.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <a href="https://samarya.online" target="_blank" rel="noreferrer"
        style={{ display:"inline-flex", alignItems:"center", gap:"0.4rem",
          marginTop:"1.25rem", fontFamily:T.fu,
          fontSize:10, fontWeight:500, letterSpacing:"0.16em",
          textTransform:"uppercase", color:T.text, textDecoration:"none",
          borderBottom:`1px solid ${T.border}`, paddingBottom:2,
          width:"fit-content", transition:"color 0.25s" }}
        onMouseEnter={e => { e.currentTarget.style.color=T.gold; e.currentTarget.style.borderColor=T.gold; }}
        onMouseLeave={e => { e.currentTarget.style.color=T.text; e.currentTarget.style.borderColor=T.border; }}>
        Explore Amenities →
      </a>
    </div>
  );
}

// ─── HERO ───────────────────────────────────────────────────────────
function RoomsHero() {
  const [idx, setIdx] = useState(0);
  const DUR = 4500;
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    const tick = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const el = ((ts - startRef.current) / DUR) * 100;
      if (el >= 100) {
        startRef.current = ts;
        setIdx(i => (i+1) % HERO_IMAGES.length);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div style={{ position:"relative", width:"100%", height:"clamp(380px, 72vh, 680px)",
      overflow:"hidden", background:T.dark, fontFamily:T.fu }}>

      {HERO_IMAGES.map((img, i) => (
        <img key={i} src={img.src} alt={img.name}
          style={{
            position:"absolute", inset:0, width:"100%", height:"100%",
            objectFit:"cover",
            opacity: i===idx ? 1 : 0,
            transform: i===idx ? "scale(1)" : "scale(1.07)",
            transition:"opacity 1.6s ease, transform 7s cubic-bezier(0.16,1,0.3,1)",
          }}/>
      ))}

      {/* Overlays */}
      <div style={{ position:"absolute", inset:0, zIndex:1,
        background:"linear-gradient(180deg,rgba(0,0,0,0.15) 0%,rgba(0,0,0,0.65) 100%)" }}/>
      <div style={{ position:"absolute", inset:0, zIndex:1,
        background:"linear-gradient(to right,rgba(0,0,0,0.5) 0%,transparent 55%)" }}/>

      {/* Content */}
      <div className="rooms-hero-copy" style={{
        position:"absolute", bottom:"clamp(2rem,5vh,3.5rem)",
        left:0, right:0, zIndex:3,
        maxWidth:1320, margin:"0 auto",
        padding:"0 clamp(1.25rem,3vw,2.5rem)",
      }}>
        <p className="rooms-hero-kicker" style={{ fontSize:11, fontWeight:500, letterSpacing:"0.3em",
          textTransform:"uppercase", color:T.gold, marginBottom:"0.8rem",
          display:"flex", alignItems:"center", gap:"0.65rem" }}>
          <span style={{ display:"inline-block", width:22, height:0.5, background:T.gold }}/>
          Accommodations
        </p>
        <h2 className="rooms-hero-title" style={{ fontFamily:T.fd,
          fontSize:"clamp(2.4rem,5.5vw,5rem)",
          fontWeight:400, letterSpacing:"-0.03em", lineHeight:0.97,
          color:"#F5F2EC", marginBottom:"1rem",
          textShadow:"0 2px 24px rgba(0,0,0,0.35)" }}>
          Find your <em style={{ fontStyle:"italic", color:T.gold }}>perfect retreat</em>
        </h2>
        <p className="rooms-hero-description" style={{ fontSize:14, fontWeight:400, lineHeight:1.75,
          color:"rgba(245,242,236,0.6)", maxWidth:400,
          textShadow:"0 1px 12px rgba(0,0,0,0.5)" }}>
          From intimate couple suites to social dorms — each space crafted for slow mornings, deep rest, and plantation sunsets.
        </p>
      </div>

      {/* Counter */}
      {/* <div style={{ position:"absolute", bottom:"clamp(2rem,5vh,3.5rem)",
        right:"clamp(1.25rem,3vw,2.5rem)", zIndex:3,
        fontFamily:T.fd, fontSize:"0.9rem", fontWeight:300,
        letterSpacing:"0.12em", color:"rgba(245,242,236,0.35)" }}>
        <span style={{ color:T.gold }}>{String(idx+1).padStart(2,"0")}</span> / {String(HERO_IMAGES.length).padStart(2,"0")}
      </div> */}

      {/* Progress */}
      {/* <div style={{ position:"absolute", bottom:0, left:0, right:0,
        height:1.5, background:"rgba(255,255,255,0.08)", zIndex:4 }}>
        <div style={{ height:"100%", background:T.gold,
          width:`${prog}%`, transition:"width 0.1s linear" }}/>
      </div> */}
    </div>
  );
}

// ─── GLOBAL STYLES ──────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0;  overflow-x: hidden; }

  .rooms-hero-kicker,
  .rooms-hero-title,
  .rooms-hero-description {
    animation: rooms-rise 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  .rooms-hero-kicker { animation-delay: 0.15s; }
  .rooms-hero-title { animation-delay: 0.27s; }
  .rooms-hero-description { animation-delay: 0.4s; }

  /* Bento grid — desktop */
  .bento {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: auto auto;
    gap: 8px;
  }
  .bento-card {
    animation: rooms-card-in 0.65s cubic-bezier(0.16, 1, 0.3, 1) both;
    animation-delay: var(--room-delay);
  }
  .b-c1 { grid-column: 1/6;  grid-row: 1; }
  .b-c2 { grid-column: 6/9;  grid-row: 1; }
  .b-c3 { grid-column: 9/13; grid-row: 1; }
  .b-c4 { grid-column: 1/5;  grid-row: 2; }
  .b-c5 { grid-column: 5/8;  grid-row: 2; }
  .b-c6 { grid-column: 8/13; grid-row: 2; }

  @keyframes rooms-rise {
    from { opacity: 0; transform: translateY(18px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes rooms-card-in {
    from { opacity: 0; transform: translateY(22px) scale(0.985); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* Tablet — 2 columns */
  @media (max-width: 900px) {
    .bento {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: auto;
    }
    .b-c1 { grid-column: 1/3; grid-row: auto; }
    .b-c2 { grid-column: 1/2; grid-row: auto; }
    .b-c3 { grid-column: 2/3; grid-row: auto; }
    .b-c4 { grid-column: 1/2; grid-row: auto; }
    .b-c5 { grid-column: 2/3; grid-row: auto; }
    .b-c6 { grid-column: 1/3; grid-row: auto; }
  }

  /* Mobile — 1 column */
  @media (max-width: 560px) {
    .bento {
      grid-template-columns: 1fr;
      gap: 6px;
    }
    .b-c1,.b-c2,.b-c3,.b-c4,.b-c5,.b-c6 {
      grid-column: 1/-1; grid-row: auto;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .rooms-hero-kicker,
    .rooms-hero-title,
    .rooms-hero-description,
    .bento-card {
      animation: none;
    }
  }
`;

// ─── MAIN COMPONENT ─────────────────────────────────────────────────
export default function SamaryaRooms() {
  const pad = "clamp(1.25rem, 3vw, 2.5rem)";

  return (
    <>
      <style>{css}</style>

    

      {/* Hero */}
      <RoomsHero />

      {/* Bento section */}
      <section style={{ background:T.cream, padding:"clamp(2rem,4vw,3rem) 0 clamp(3rem,5vw,4rem)",
        fontFamily:T.fu }}>
        <div style={{ maxWidth:1320, maxHeight: "100%", margin:"0 auto", padding:`0 ${pad}` }}>

          <div className="bento">
            <div className="b-c1 bento-card" style={{ "--room-delay": "0.08s" }}><RoomCard room={ROOMS[0]} large/></div>
            <div className="b-c2 bento-card" style={{ "--room-delay": "0.16s" }}><RoomCard room={ROOMS[1]}/></div>
            <div className="b-c3 bento-card" style={{ "--room-delay": "0.24s" }}><RoomCard room={ROOMS[2]}/></div>
            <div className="b-c4 bento-card" style={{ "--room-delay": "0.32s" }}><RoomCard room={ROOMS[4]}/></div>
            <div className="b-c5 bento-card" style={{ "--room-delay": "0.4s" }}><RoomCard room={ROOMS[3]}/></div>
            <div className="b-c6 bento-card" style={{ "--room-delay": "0.48s" }}><InclusionsCard/></div>
          </div>

          {/* Footer */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
            flexWrap:"wrap", gap:"0.75rem",
            marginTop:"1.5rem", paddingTop:"1.5rem",
            borderTop:`1px solid ${T.border}` }}>
            <p style={{ fontSize:12, color:T.muted, letterSpacing:"0.02em" }}>
              Check-in <strong style={{ color:T.gold, fontWeight:500 }}>9:00 AM</strong> · Check-out <strong style={{ color:T.gold, fontWeight:500 }}>11:00 AM</strong> · GST 12% additional · Extra adult ₹2,000
            </p>
            <a href="https://samarya.online/rooms/" target="_blank" rel="noreferrer"
              style={{ fontSize:10, fontWeight:500, letterSpacing:"0.18em",
                textTransform:"uppercase", color:T.text, textDecoration:"none",
                display:"flex", alignItems:"center", gap:"0.4rem",
                borderBottom:`1px solid ${T.border}`, paddingBottom:2 }}
              onMouseEnter={e => { e.currentTarget.style.color=T.gold; e.currentTarget.style.borderColor=T.gold; }}
              onMouseLeave={e => { e.currentTarget.style.color=T.text; e.currentTarget.style.borderColor=T.border; }}>
              View all rooms →
            </a>
          </div>
        </div>


        
        
      </section>
        <SamryaFooter />
    </>
  );
}
