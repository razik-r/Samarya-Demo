import { Link } from "react-router-dom";

const headerStyles = `
  .s-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 999;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1rem 2.5rem;
    font-family: 'Inter', sans-serif;
  
    animation: s-fade 0.8s ease 0.2s both;
  }
  .s-nav-logo { height: 50.5px; width: auto; display: block; }
  .s-nav-links {
    display: flex; gap: 2.5rem; list-style: none;
  }
  .s-nav-links a {
    font-size: 12px; font-weight: 400; letter-spacing: 0.12em;
    text-transform: uppercase; text-decoration: none;
    color: rgb(255, 255, 255); transition: color 0.25s;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  }
  .s-nav-links a:hover { color: #F5F2EC; }
  .s-nav-book {
    font-size: 13px; font-weight: 500; letter-spacing: 0.12em;
    text-transform: uppercase; text-decoration: none;
    color: #111111; background: #D4B483;
    padding: 12px 28px; border-radius: 0px;
    box-shadow: 0 10px 28px rgba(17, 11, 5, 0.2);
    transition: background 0.25s, box-shadow 0.25s;
  }
  .s-nav-book:hover {
    background: #E0C596;
    box-shadow: 0 13px 32px rgba(17, 11, 5, 0.26);
  }

  @keyframes s-fade { from { opacity: 0; } to { opacity: 1; } }

  @media (max-width: 760px) {
    .s-nav {
      padding: 0.8rem 1.25rem;
    }
    .s-nav-links {
      display: none;
    }
    .s-nav-book {
      padding: 10px 16px;
    }
  }
`;

const routeByLink = {
  Home: "/",
  Rooms: "/rooms",
};

export default function SamaryaHeader({ logo, navLinks, bookingUrl, primaryCta }) {
  const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
  return (
    <>
      <style>{headerStyles}</style>
      <nav className="s-nav">
        <Link to="/"    onClick={scrollToTop} aria-label="Samarya home">
          <img className="s-nav-logo" src={logo} alt="Samarya Resort" />
        </Link>
        <ul className="s-nav-links">
          {navLinks.map((link) => (
            <li key={link}>
              {routeByLink[link] ? (
                <Link to={routeByLink[link]}>{link}</Link>
              ) : (
                <a href="#">{link}</a>
              )}
            </li>
          ))}
        </ul>
        <a href={bookingUrl} className="s-nav-book" target="_blank" rel="noreferrer">
          {primaryCta}
        </a>
      </nav>
    </>
  );
}
