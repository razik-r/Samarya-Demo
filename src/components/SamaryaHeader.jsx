import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const headerStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');

  .s-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 999;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.25rem 2.5rem;
    font-family: 'Inter', sans-serif;
    animation: s-fade 0.8s ease 0.2s both;
    transition: background 0.4s ease, backdrop-filter 0.4s ease, padding 0.3s ease;
  }

  .s-nav-scrolled {
    background: rgba(18,15,12,0.22);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.15);
    padding: 0.8rem 2.5rem;
  }

  .s-nav-logo { height: 44px; width: auto; display: block; }

  /* ── LINK ROLL EFFECT (domekwbrzozach style) ── */
  .s-nav-links { display: flex; gap: 2.5rem; list-style: none; }

  .s-nav-links li a {
    font-size: 12px; font-weight: 400; letter-spacing: 0.12em;
    text-transform: uppercase; text-decoration: none;
    color: rgba(255,255,255,0.85);
    text-shadow: 0 2px 10px rgba(0,0,0,0.5);
    display: inline-flex;
    flex-direction: column;
    overflow: hidden;
    height: 1.1em;           /* clip to one line height */
    line-height: 1.1em;
    transition: color 0.25s;
  }

  /* Each link has two spans — visible + clone below */
  .s-nav-links li a .link-text {
    display: flex;
    flex-direction: column;
    transition: transform 0.38s cubic-bezier(0.16,1,0.3,1);
  }

  .s-nav-links li a:hover .link-text {
    transform: translateY(-1.1em);   /* roll the pair up */
  }

  .s-nav-links li a .link-top,
  .s-nav-links li a .link-bot {
    display: block;
    height: 1.1em;
    line-height: 1.1em;
    white-space: nowrap;
  }


  /* CTA button */
  .s-nav-book {
    font-size: 12px; font-weight: 500; letter-spacing: 0.14em;
    text-transform: uppercase; text-decoration: none;
    color: #111111; background: #D4B483;
    padding: 11px 26px;
    box-shadow: 0 8px 24px rgba(17,11,5,0.18);
    transition: background 0.25s, box-shadow 0.25s;
    white-space: nowrap;
  }
  .s-nav-book:hover {
    background: #E0C596;
    box-shadow: 0 12px 30px rgba(17,11,5,0.24);
  }

  /* ── HAMBURGER ── */
  .s-hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 36px; height: 36px;
    background: none; border: none;
    cursor: pointer; padding: 4px;
    z-index: 1001;
  }
  .s-hamburger span {
    display: block; width: 100%; height: 1.5px;
    background: #F5F2EC;
    transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.2s ease;
    transform-origin: center;
  }
  .s-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
  .s-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .s-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

  /* ── MOBILE DRAWER ── */
  .s-drawer {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    z-index: 998;
    background: rgba(18,12,4,0.97);
    backdrop-filter: blur(20px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2.5rem;
    opacity: 0;
    pointer-events: none;
    transform: translateY(-8px);
    transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1);
  }
  .s-drawer.open {
    opacity: 1;
    pointer-events: all;
    transform: translateY(0);
  }

  /* Drawer links — larger, same roll effect */
  .s-drawer-link {
    font-family: 'Inter', sans-serif;
    font-size: clamp(1.5rem, 5vw, 2.2rem);
    font-weight: 300; letter-spacing: 0.1em;
    text-transform: uppercase; text-decoration: none;
    color: rgba(245,242,236,0.75);
    display: inline-flex;
    flex-direction: column;
    overflow: hidden;
    height: 1.15em; line-height: 1.15em;
    transition: color 0.25s;
  }
  .s-drawer-link .link-text {
    display: flex; flex-direction: column;
    transition: transform 0.38s cubic-bezier(0.16,1,0.3,1);
  }
  .s-drawer-link:hover .link-text { transform: translateY(-1.15em); }
  .s-drawer-link .link-top,
  .s-drawer-link .link-bot { display: block; height: 1.15em; line-height: 1.15em; white-space: nowrap; }
  .s-drawer-link .link-bot { color: #D4B483; }

  .s-drawer-book {
    margin-top: 1rem;
    font-family: 'Inter', sans-serif;
    font-size: 12px; font-weight: 500; letter-spacing: 0.16em;
    text-transform: uppercase; text-decoration: none;
    color: #111111; background: #D4B483;
    padding: 14px 32px;
    transition: background 0.25s;
  }
  .s-drawer-book:hover { background: #E0C596; }

  .s-drawer-close {
    position: absolute; top: 1.5rem; right: 1.5rem;
    font-size: 10px; font-weight: 500; letter-spacing: 0.18em;
    text-transform: uppercase; color: rgba(245,242,236,0.4);
    background: none; border: none; cursor: pointer;
    font-family: 'Inter', sans-serif;
    transition: color 0.2s;
  }
  .s-drawer-close:hover { color: #D4B483; }

  @keyframes s-fade { from { opacity: 0; } to { opacity: 1; } }

  /* ── RESPONSIVE ── */
  @media (max-width: 820px) {
    .s-nav-links { display: none; }
    .s-nav-book  { display: none; }
    .s-hamburger { display: flex; }
    .s-nav { padding: 1rem 1.25rem; }
    .s-nav-scrolled { padding: 0.75rem 1.25rem; }
  }
`;

const routeByLink = {
  Home:        "/",
  Rooms:       "/rooms",
  Experiences: "experiences",
  About:       "about",
  Contact:     "footer",
};

// Roll link — two stacked spans, clip to one line
function RollLink({ label, className, style, onClick, href, isExternal }) {
  const inner = (
    <span className="link-text">
      <span className="link-top">{label}</span>
      <span className="link-bot">{label}</span>
    </span>
  );

  if (isExternal) {
    return <a href={href} className={className} style={style} target="_blank" rel="noreferrer">{inner}</a>;
  }
  return (
    <a href="#" className={className} style={style} onClick={onClick}>{inner}</a>
  );
}

export default function SamaryaHeader({ logo, navLinks, bookingUrl, ctaHeader }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setDrawerOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setDrawerOpen(false);
  };

  const handleNavClick = (link, e) => {
    e?.preventDefault();
    if (link === "Home") { scrollToTop(); return; }
    const route = routeByLink[link];
    if (route?.startsWith("/")) { scrollToTop(); return; }
    scrollToSection(route);
  };

  return (
    <>
      <style>{headerStyles}</style>

      {/* ── NAV ── */}
      <nav className={`s-nav${isScrolled ? " s-nav-scrolled" : ""}`}>
        <Link to="/" onClick={scrollToTop} aria-label="Samarya home">
          <img className="s-nav-logo" src={logo} alt="Samarya Resort" />
        </Link>

        {/* Desktop links */}
        <ul className="s-nav-links">
          {navLinks.map((link) => (
            <li key={link}>
              {routeByLink[link]?.startsWith("/") ? (
                <Link to={routeByLink[link]} onClick={link === "Home" ? scrollToTop : undefined}
                  style={{ display:"inline-flex", flexDirection:"column",
                    overflow:"hidden", height:"1.1em", lineHeight:"1.1em",
                    fontSize:12, fontWeight:400, letterSpacing:"0.12em",
                    textTransform:"uppercase", textDecoration:"none",
                    color:"rgba(255,255,255,0.85)",
                    textShadow:"0 2px 10px rgba(0,0,0,0.5)" }}>
                  <span className="link-text">
                    <span className="link-top">{link}</span>
                    <span className="link-bot">{link}</span>
                  </span>
                </Link>
              ) : (
                <a href="#"
                  onClick={(e) => handleNavClick(link, e)}
                  style={{ display:"inline-flex", flexDirection:"column",
                    overflow:"hidden", height:"1.1em", lineHeight:"1.1em",
                    fontSize:12, fontWeight:400, letterSpacing:"0.12em",
                    textTransform:"uppercase", textDecoration:"none",
                    color:"rgba(255,255,255,0.85)",
                    textShadow:"0 2px 10px rgba(0,0,0,0.5)" }}>
                  <span className="link-text">
                    <span className="link-top">{link}</span>
                    <span className="link-bot">{link}</span>
                  </span>
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a href={bookingUrl} className="s-nav-book" target="_blank" rel="noreferrer">
          {ctaHeader}
        </a>

        {/* Hamburger */}
        <button
          className={`s-hamburger${drawerOpen ? " open" : ""}`}
          onClick={() => setDrawerOpen(o => !o)}
          aria-label={drawerOpen ? "Close menu" : "Open menu"}>
          <span/><span/><span/>
        </button>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      <div className={`s-drawer${drawerOpen ? " open" : ""}`}>
        <button className="s-drawer-close" onClick={() => setDrawerOpen(false)}>
        
        </button>

        {navLinks.map((link) => (
          routeByLink[link]?.startsWith("/") ? (
            <Link key={link} to={routeByLink[link]}
              className="s-drawer-link"
              onClick={scrollToTop}>
              <span className="link-text">
                <span className="link-top">{link}</span>
                <span className="link-bot">{link}</span>
              </span>
            </Link>
          ) : (
            <a key={link} href="#"
              className="s-drawer-link"
              onClick={(e) => { e.preventDefault(); handleNavClick(link); }}>
              <span className="link-text">
                <span className="link-top">{link}</span>
                <span className="link-bot">{link}</span>
              </span>
            </a>
          )
        ))}

        <a href={bookingUrl} className="s-drawer-book" target="_blank" rel="noreferrer">
          {ctaHeader}
        </a>
      </div>
    </>
  );
}