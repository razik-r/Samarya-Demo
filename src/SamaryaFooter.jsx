const css = `  /* ── FOOTER LINK HOVER ── */
  .f-link { transition: color 0.22s; }
  .f-link:hover { color: #D4B483 !important; }

  /* ── FOOTER RESPONSIVE ── */
  @media (max-width: 1024px) {
    .f-grid { grid-template-columns: 2fr 1fr 1fr !important; gap: 2.5rem !important; }
  }
  @media (max-width: 900px) {
    .f-grid { grid-template-columns: 1.5fr 1fr 1fr !important; gap: 2rem !important; }
    .f-cta-row { flex-direction: column !important; align-items: flex-start !important; }
    .f-cta-row > div:last-child { align-items: flex-start !important; width: 100% !important; }
  }
  @media (max-width: 768px) {
    .f-grid { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; }
    .f-grid > div:last-child { grid-column: 1 / -1 !important; }
  }
  @media (max-width: 560px) {
    .f-grid { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
    .f-grid > div:first-child { margin-bottom: 1rem !important; }
    .f-cta-row { padding: 2.5rem 0 2rem !important; }
    .f-cta-row > div:first-child h2 { font-size: clamp(1.5rem, 5vw, 2.4rem) !important; }
    .f-grid > div p { font-size: 9px !important; }
  }
`

import {T} from './SamaryaRooms.jsx';
import {RevealHeadline} from './SamaryaAboutFooter.jsx';

const FOOTER_LINKS = {
  explore: [
    { label: "Rooms & Suites", href: "https://samarya.online/rooms/" },
    { label: "Experiences",    href: "https://samarya.online" },
    { label: "About Samarya",  href: "https://samarya.online/about/" },
    { label: "FAQs",           href: "https://samarya.online/faqs/" },
    { label: "Journal",        href: "https://samarya.online/blog/" },
  ],
  visit: [
    { label: "Get Directions",   href: "https://maps.app.goo.gl/3NRDJHjv5aDYaexi8" },
    { label: "Arrival Guide",    href: "https://samarya.online/faqs/" },
    { label: "Activities Nearby",href: "https://samarya.online" },
    { label: "Privacy Policy",   href: "https://samarya.online/privacy-policy-2/" },
  ],
};
export default function SamaryaFooter() {
  const Svg = ({ children, size=13 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={T.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ opacity:0.6, flexShrink:0, marginTop:1 }}>{children}</svg>
  );

  return (
    <footer style={{ background: T.dark, fontFamily: T.fu }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 clamp(1.5rem,3vw,2.5rem)" }}>

        {/* CTA top */}
        <div className="f-cta-row" style={{ display:"flex", alignItems:"center",
          justifyContent:"space-between", padding:"4rem 0 3rem",
          borderBottom:`1px solid rgba(245,240,232,0.08)`, flexWrap:"wrap", gap:"1.5rem" }}>
          <div>
            <p style={{ fontSize:10, fontWeight:500, letterSpacing:"0.26em",
              textTransform:"uppercase", color:T.gold, marginBottom:"0.75rem" }}>
              Come stay with us
            </p>
            <RevealHeadline text="Your hills are calling." goldWord="calling." delay={0.1}/>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem", alignItems:"flex-end" }}>
            <a href="https://wa.me/919845980024" target="_blank" rel="noreferrer"
              style={{ fontFamily:T.fu, fontSize:11, fontWeight:500,
                letterSpacing:"0.16em", textTransform:"uppercase",
                color:T.dark, background:T.gold, textDecoration:"none",
                padding:"14px 28px", display:"inline-block",
                transition:"background 0.25s" }}
              onMouseEnter={e => e.currentTarget.style.background=T.goldhov}
              onMouseLeave={e => e.currentTarget.style.background=T.gold}>
              Book via WhatsApp →
            </a>
            <a href="https://maps.app.goo.gl/3NRDJHjv5aDYaexi8" target="_blank" rel="noreferrer"
              style={{ fontFamily:T.fu, fontSize:10, fontWeight:400,
                letterSpacing:"0.12em", textTransform:"uppercase",
                color:"rgba(245,240,232,0.4)", textDecoration:"none",
                display:"flex", alignItems:"center", gap:"0.4rem" }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              Get directions
            </a>
          </div>
        </div>

        {/* Grid */}
        <div className="f-grid" style={{ display:"grid",
          gridTemplateColumns:"2fr 1fr 1fr 1.3fr",
          gap:"3rem", padding:"3rem 0",
          borderBottom:`1px solid rgba(245,240,232,0.08)` }}>

          {/* Brand */}
          <div>
            <img src="https://samarya.online/wp-content/uploads/2023/12/Samarya-Official-White-Website-1-scaled.png"
              alt="Samarya Resort"
              style={{ height:40, width:"auto", display:"block", marginBottom:"1.25rem" }}/>
            <p style={{ fontSize:12, fontWeight:400, lineHeight:1.85,
              color:"rgba(245,240,232,0.38)", maxWidth:220, marginBottom:"1.5rem" }}>
              A boutique workation sanctuary in the coffee hills of Chikkamagaluru. Crafted for deep work, slow mornings, and meaningful stays.
            </p>
            <div style={{ display:"flex", gap:"0.65rem" }}>
              {[
                { href:"https://www.instagram.com/samarya_chikkamagaluru",
                  path:<><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></> },
                { href:"https://wa.me/919845980024",
                  path:<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/> },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer"
                  style={{ width:32, height:32, border:`1px solid rgba(245,240,232,0.12)`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    textDecoration:"none", color:"rgba(245,240,232,0.45)",
                    transition:"border-color 0.25s, color 0.25s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=T.gold; e.currentTarget.style.color=T.gold; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(245,240,232,0.12)"; e.currentTarget.style.color="rgba(245,240,232,0.45)"; }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {s.path}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <p style={{ fontSize:10, fontWeight:500, letterSpacing:"0.22em",
              textTransform:"uppercase", color:"rgba(245,240,232,0.28)",
              marginBottom:"1.25rem" }}>Explore</p>
            <div style={{ display:"flex", flexDirection:"column", gap:"0.65rem" }}>
              {FOOTER_LINKS.explore.map(l => (
                <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
                  className="f-link"
                  style={{ fontSize:13, fontWeight:400, color:"rgba(245,240,232,0.52)",
                    textDecoration:"none", letterSpacing:"0.02em" }}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Visit */}
          <div>
            <p style={{ fontSize:10, fontWeight:500, letterSpacing:"0.22em",
              textTransform:"uppercase", color:"rgba(245,240,232,0.28)",
              marginBottom:"1.25rem" }}>Visit</p>
            <div style={{ display:"flex", flexDirection:"column", gap:"0.65rem" }}>
              {FOOTER_LINKS.visit.map(l => (
                <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
                  className="f-link"
                  style={{ fontSize:13, fontWeight:400, color:"rgba(245,240,232,0.52)",
                    textDecoration:"none", letterSpacing:"0.02em" }}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize:10, fontWeight:500, letterSpacing:"0.22em",
              textTransform:"uppercase", color:"rgba(245,240,232,0.28)",
              marginBottom:"1.25rem" }}>Contact</p>
            <div style={{ display:"flex", flexDirection:"column", gap:"0.85rem" }}>
              {[
                { icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>, text: "Hirekolale Road, Vadeyarapura, near Hirekolale Lake, Chikkamagaluru, Karnataka", href: null },
                { icon: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.58 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 15.92z"/>, text: "+91 98459 80024", href: "tel:+919845980024" },
                { icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>, text: "host@samarya.online", href: "mailto:host@samarya.online" },
              ].map((c, i) => (
                <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:"0.6rem" }}>
                  <Svg>{c.icon}</Svg>
                  {c.href
                    ? <a href={c.href} className="f-link" style={{ fontSize:12, fontWeight:400,
                        lineHeight:1.65, color:"rgba(245,240,232,0.52)", textDecoration:"none" }}>
                        {c.text}
                      </a>
                    : <span style={{ fontSize:12, fontWeight:400, lineHeight:1.65,
                        color:"rgba(245,240,232,0.52)" }}>{c.text}</span>
                  }
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"1.5rem 0", flexWrap:"wrap", gap:"0.75rem" }}>
          <span style={{ fontSize:11, color:"rgba(245,240,232,0.22)", letterSpacing:"0.04em" }}>
            © 2025 Samarya Resort, Chikkamagaluru. All rights reserved.
          </span>
          <div style={{ display:"flex", gap:"1.5rem" }}>
            {[["Privacy","https://samarya.online/privacy-policy-2/"],["FAQs","https://samarya.online/faqs/"],["WhatsApp","https://wa.me/919845980024"]].map(([l,h]) => (
              <a key={l} href={h} target="_blank" rel="noreferrer" className="f-link"
                style={{ fontSize:10, fontWeight:400, letterSpacing:"0.1em",
                  textTransform:"uppercase", color:"rgba(245,240,232,0.22)",
                  textDecoration:"none" }}>{l}</a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}