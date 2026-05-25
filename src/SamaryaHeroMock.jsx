import { useEffect, useState } from "react";
import {useRef} from "react";


import vdbg from './assets/vdbg.mp4';
import scene1 from './assets/scene1.mp4';
import scene2 from './assets/scene2.mp4';
import scene3 from './assets/scene3.mp4';
import scene2new from './assets/scene2new.mp4';
import vdbg1 from './assets/vdbg1.mp4'

// ─── DESIGN TOKENS ────────────────────────────────────────────────
const theme = {
  gold:        "#D4B483",
  goldHover:   "#E0C596",
  charcoal:    "#111111",
  white:       "#F5F2EC",
  muted:       "#B6B6B6",
  border:      "rgba(255,255,255,0.15)",
  fontDisplay: "'Cormorant Garamond', serif",
  fontUI:      "'Inter', sans-serif",
};

// ─── CONTENT — edit freely ─────────────────────────────────────────
const content = {
  // eyebrow:     "Chikkamagaluru • India",
  brandLabel:  "Samarya",
  headline:    ["Where Coffee Blossoms", "Meet the "],
  headlineEm:  "Horizon",
  sub:         "A boutique workation sanctuary designed for deep work & slow living among the hills of Chikkamagaluru.",
  ctaPrimary:  "Book your stay",
  ctaSecondary:"Explore experiences",
  whatsapp:    "https://wa.me/919845980024",
  logo:        "https://samarya.online/wp-content/uploads/2023/12/Samarya-Official-White-Website-1-scaled.png",
  // video:       "https://res.cloudinary.com/dywtcb29v/video/upload/Firefly_slight_background_movement_soft_natural_lighting_gentle_motion_smooth_and_realistic_cwiaxx.mp4",
  // fallback:    "https://samarya.online/wp-content/uploads/2026/02/IMG_9604-Edit.jpg",
  navLinks:    ["Rooms", "Experiences", "About", "Gallery", "Contact"],
  icons: [
    { emoji: "∞", label: "Infinity Pool" },
    { emoji: "☕", label: "Estate Coffee" },
    { emoji: "⌂", label: "Workation Ready" },
  ],
  marqueeItems: [
    "Coffee Plantation Trails",
    "Infinity Pool",
    "Hirekolale Lake — 5 min walk",
    "200 Mbps Fiber WiFi",
    "Boutique Workation Sanctuary",
    "Bonfire & BBQ Nights",
    "Filter Coffee Therapy",
    "Chikkamagaluru, Karnataka",
  ],
};

// ─── STYLES ────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  .s-hero {
    position: relative;
    width: 100%; height: 100vh; min-height: 620px;
    overflow: hidden;
    background: #0a0a0a;
  }

  /* Video */
  .s-video-wrap { position: absolute; inset: 0; z-index: 0;    }
  .s-video-wrap video {
    width: 100%; height: 100%;
    object-fit: cover; object-position: center;
    animation: s-zoom 18s ease-in-out infinite alternate;
    background: rgba(255, 255, 255, 0.2);    backdrop-filter: blur(10px);
  }
  .s-fallback {
    position: absolute; inset: 0; z-index: -1;
    background-size: cover; background-position: center 40%;
    animation: s-zoom 18s ease-in-out infinite alternate;
  }

  /* Overlay layers */
  .s-ov-base {
    position: absolute; inset: 0; z-index: 1;
    
     
       background: linear-gradient(to right, rgba(19, 10, 1, 0.62) 0%, rgba(37, 18, 4, 0) 50%, rgba(255, 255, 255, 0) 100%);

   filter: brightness(4) contrast(125%) ;
  }
  .s-ov-golden {
    position: absolute; inset: 0; z-index: 2;
    background: rgba(124, 117, 108, 0.28);
    mix-blend-mode: multiply;
  }
  .s-ov-left {
    position: absolute; inset: 0; z-index: 3;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.62) 0%, rgba(14, 13, 13, 0.3) 50%, rgba(255, 255, 255, 0) 100%);
  }
  .s-ov-bottom {
    position: absolute; bottom: 0; left: 0; right: 0; height: 70%; z-index: 3;
    background: linear-gradient(to top, rgba(30,15,2,0.65) 0%, rgba(20,10,1,0.2) 60%, transparent 100%);
  }
  .s-grain {
    position: absolute; inset: 0; z-index: 4;
    opacity: 0.035; pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 128px;
  }

  /* Frosted Glass Effect */
  .s-frosted {
    position: absolute; inset: 0; z-index: 5;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    pointer-events: none;
  }

  /* Nav */
  .s-nav {
    position: absolute; top: 0; left: 0; right: 0; z-index: 10;
    display: flex; align-items: center; justify-content: space-between;
   padding: 1rem 2.5rem;
    animation: s-fade 0.8s ease 0.2s both;
   

  }
  .s-nav-logo { height: 70.5px; width: auto; display: block; }
  .s-nav-links {
    display: flex; gap: 2.5rem; list-style: none;
  }
  .s-nav-links a {
    font-size: 12px; font-weight: 400; letter-spacing: 0.12em;
    text-transform: uppercase; text-decoration: none;
    color: rgb(255, 255, 255); transition: color 0.25s;
  }
  .s-nav-links a:hover { color: #F5F2EC; }
  .s-nav-book {
    font-size: 13px; font-weight: 500; letter-spacing: 0.12em;
    text-transform: uppercase; text-decoration: none;
    color: #111111; background: #D4B483;
    padding: 12px 28px; border-radius: 0px;
    transition: background 0.25s;
  }
  .s-nav-book:hover { background: #E0C596; }

  /* Hero content */
  .s-content {
    position: absolute; bottom: 8.5rem; left: 0; right: 0; z-index: 10;
    max-width: 1400px; margin: 0 auto; padding: 0 3rem;
  }
  .s-eyebrow {
    font-size: 14px; font-weight: 500; letter-spacing: 0.3em;
    text-transform: uppercase; color: #D4B483;
    margin-bottom: 0.75rem;
    animation: s-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s both;
  }
  .s-brand-label {
    font-size: 22px; font-weight: 500; letter-spacing: 0.18em;
    text-transform: uppercase; color: #F5F2EC;
    margin-bottom: 0.6rem;
    text-shadow: 0 2px 20px rgba(0,0,0,0.5);
    animation: s-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s both;
  }
  .s-headline {
    font-size: clamp(52px, 7vw, 86px);
    font-weight: 400; letter-spacing: -0.04em; line-height: 0.95;
    color: #F5F2EC; max-width: 650px; margin-bottom: 1.5rem;
    text-shadow: 0 2px 40px rgba(0,0,0,0.4);
    animation: s-up 3s cubic-bezier(0.16,1,0.3,1) 0.6s both;
  }
  .s-headline em { font-style: italic; color: #D4B483; }
  .s-divider {
    width: 36px; height: 0.5px; background: #D4B483;
    margin-bottom: 1.25rem;
    animation: s-fade 0.8s ease 0.85s both;
  }
  .s-sub {
    font-size: 15px; font-weight: 400; line-height: 1.75;
    color: rgba(210,200,185,0.88); max-width: 440px;
    margin-bottom: 2rem;
    text-shadow: 0 1px 16px rgba(0,0,0,0.55);
    animation: s-up 0.9s cubic-bezier(0.16,1,0.3,1) 0.8s both;
  }
  .s-cta-group {
    display: flex; align-items: center; gap: 1rem;
    animation: s-up 0.9s cubic-bezier(0.16,1,0.3,1) 0.95s both;
  }
  .s-cta-primary {
    font-size: 13px; font-weight: 500; letter-spacing: 0.12em;
    text-transform: uppercase; text-decoration: none;
    color: #111111; background: #D4B483;
    padding: 16px 36px; border-radius: 0px;
    transition: background 0.25s, transform 0.2s;
    display: inline-block;
  }
  .s-cta-primary:hover { background: #E0C596; transform: translateY(-1px); }
  .s-cta-secondary {
    font-size: 13px; font-weight: 500; letter-spacing: 0.12em;
    text-transform: uppercase; text-decoration: none;
    color: #F5F2EC; background: transparent;
    padding: 16px 36px; border-radius: 0px;
    border: 1px solid rgba(255,255,255,0.15);
    transition: border-color 0.25s, background 0.25s, transform 0.2s;
    display: inline-block;
  }
  .s-cta-secondary:hover {
    border-color: rgba(255,255,255,0.4);
    background: rgba(255,255,255,0.06);
    transform: translateY(-1px);
  }

  /* Icon strip */
  .s-icons {
    position: absolute; bottom: 3.25rem; left: 0; right: 0; z-index: 10;
    display: flex; align-items: center; justify-content: center;
    animation: s-fade 0.9s ease 1.15s both;
  }
  .s-icon-item {
    display: flex; align-items: center; gap: 0.55rem; padding: 0 2rem;
  }
  .s-icon-item + .s-icon-item { border-left: 1px solid rgba(255,255,255,0.15); }
  .s-icon-emoji { font-size: 1rem; opacity: 0.65; }
  .s-icon-label {
    font-size: 12px; font-weight: 400; letter-spacing: 0.1em;
    text-transform: uppercase; color: #B6B6B6;
  }

  /* Marquee */
  .s-marquee {
    position: absolute; bottom: 0; left: 0; right: 0; z-index: 9;
    border-top: 1px solid rgba(255,255,255,0.15);
    padding: 0.65rem 0; overflow: hidden;
    background: rgba(20,10,2,0.5);
    backdrop-filter: blur(12px);
  }
  .s-marquee-track {
    display: flex; white-space: nowrap;
    animation: s-marquee 32s linear infinite;
  }
  .s-marquee-item {
    display: inline-flex; align-items: center; gap: 1.5rem;
    font-size: 11px; font-weight: 400; letter-spacing: 0.22em;
    text-transform: uppercase; color: rgba(182,182,182,0.55);
    padding-right: 3rem; flex-shrink: 0;
  }
  .s-marquee-dot {
    width: 2px; height: 2px; background: #D4B483;
    border-radius: 50%; flex-shrink: 0;
  }

  @keyframes s-up   { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
  @keyframes s-fade { from { opacity: 0; } to { opacity: 1; } }
  @keyframes s-zoom { from { transform: scale(1); } to { transform: scale(1.05); } }
  @keyframes s-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

  .video{
 position:absolute;
 inset:0;

 width:100%;
 height:100%;
 object-fit:cover;

 transition:opacity 2.5s ease;
}

.show{
 opacity:1;
}

.hide{
 opacity:0;
}
`;


// ─── COMPONENT ─────────────────────────────────────────────────────
export default function SamaryaHeroMock() {
  const marqueeDouble = [...content.marqueeItems, ...content.marqueeItems];

 



  const Videoclip = () => {
    const videos = [vdbg1, scene3, scene2new];
  
    const [active, setActive] = useState(0);
  
    const videoRefs = useRef([]);
  
    const handleEnded = () => {
      setActive((prev) => (prev + 1) % videos.length);
    };
  
    useEffect(() => {
      const currentVideo = videoRefs.current[active];
  
      if (currentVideo) {
        currentVideo.currentTime = 0;
  
        currentVideo
          .play()
          .catch((err) => console.log("Playback issue:", err));
      }
    }, [active]);
  
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden"
        }}
      >
        {videos.map((video, index) => (
          <video
            key={index}
            ref={(el) => (videoRefs.current[index] = el)}
            src={video}
            muted
            playsInline
            preload="auto"
            onEnded={active === index ? handleEnded : undefined}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
  
              opacity: active === index ? 1 : 0,
  
              transition:
                "opacity 2.5s cubic-bezier(.4,0,.2,1)",
  
              pointerEvents: "none"
            }}
          />
        ))}
      </div>
    );
  };
  
 
  

  const Videoclip1 =  ()=>{
    let url = "https://res.cloudinary.com/dywtcb29v/video/upload/Firefly_slight_background_movement_soft_natural_lighting_gentle_motion_smooth_and_realistic_cwiaxx.mp4"
    const [index, setIndex] = useState(0);
    const videos = [vdbg1, scene1 , scene2]
    return (
<video key={videos[index] || url } autoPlay  muted  playsInline style={{ height: "inherit", width: "100%" }} onEnded={() => {setIndex((idx) => idx + 1);}}>
          <source src={videos[index] ||url} />
        </video>
    )
  }



  return (
    <>
      <style>{styles}</style>

      <section className="s-hero" style={{ fontFamily: theme.fontUI }}>

        {/* Background */}
        <div className="s-video-wrap">
          <div
            className="s-fallback"
            style={{ backgroundImage: `url(${content.fallback})` }}
          />
          {/* <video autoPlay muted loop playsInline>
            <source src={vdbg} type="video/mp4" />
          </video> */}



          <Videoclip />



       

        </div>

        {/* Overlay layers */}
        {/* <div className="s-ov-base" /> */}
        {/* <div className="s-ov-golden" /> */}
        <div className="s-ov-left" />
        {/* <div className="s-ov-bottom" /> */}
        {/* <div className="s-grain" /> */}

        {/* Nav */}
        <nav className="s-nav ">
          <img className="s-nav-logo" src={content.logo} alt="Samarya Resort" />
          <ul className="s-nav-links">
            {content.navLinks.map((link) => (
              <li key={link}><a href="#">{link}</a></li>
            ))}
          </ul>
          <a href={content.whatsapp} className="s-nav-book" target="_blank" rel="noreferrer">
            Book your stay
          </a>
        </nav>

        {/* Hero content */}
        <div className="s-content" style={{ fontFamily: theme.fontUI }}>
          <p className="s-eyebrow">{content.eyebrow}</p>
          {/* <p className="s-brand-label">{content.brandLabel}</p> */}
          <h1 className="s-headline" style={{ fontFamily: theme.fontDisplay }}>
            {content.headline[0]}<br />
            {content.headline[1]}<em>{content.headlineEm}</em>
          </h1>
          <div className="s-divider" />
          <p className="s-sub">{content.sub}</p>
          <div className="s-cta-group">
            <a href={content.whatsapp} className="s-cta-primary" target="_blank" rel="noreferrer">
              {content.ctaPrimary}
            </a>
            <a href="#experiences" className="s-cta-secondary">
              {content.ctaSecondary}
            </a>
          </div>
        </div>

        {/* Icon strip */}
        <div className="s-icons">
          {content.icons.map((icon, i) => (
            <div key={i} className="s-icon-item">
              <span className="s-icon-emoji">{icon.emoji}</span>
              <span className="s-icon-label">{icon.label}</span>
            </div>
          ))}
        </div>

        {/* Marquee */}
        {/* <div className="s-marquee">
          <div className="s-marquee-track">
            {marqueeDouble.map((item, i) => (
              <span key={i} className="s-marquee-item">
                {item} <span className="s-marquee-dot" />
              </span>
            ))}
          </div>
        </div> */}

      </section>

      <section>

      </section>
    </>
  );

}
