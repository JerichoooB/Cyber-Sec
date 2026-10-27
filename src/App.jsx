import { useEffect, useState } from "react";
import { Routes, Route, NavLink, Link, useLocation } from "react-router-dom";
import {
  Shield,
  ArrowUpRight,
  Menu,
  X,
  Github,
  ArrowRight,
} from "lucide-react";
import Home from "./pages/Home";
import { Academy, ThreatLibrary, News, Contact } from "./pages/Knowledge";
import { Tools, HackerLab } from "./pages/Tools";
import { Button } from "./components/UI";
const navigation = [
  ["/", "Home"],
  ["/academy", "Academy"],
  ["/threats", "Threat Library"],
  ["/lab", "Hacker Lab"],
  ["/tools", "Tools"],
  ["/news", "News"],
  ["/contact", "Contact"],
];
function Brand() {
  return (
    <Link to="/" className="brand" aria-label="CyberVault home">
      <span className="brand-icon">
        <Shield size={24} />
      </span>
      Cyber<span>Vault</span>
      <span className="brand-period">.</span>
    </Link>
  );
}
export default function App() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
    document.title = `${navigation.find(([p]) => p === location.pathname)?.[1] || "Not found"} — CyberVault`;
  }, [location.pathname]);
  return (
    <>
      <header className="site-header">
        <div className="container nav-layout">
          <Brand />
          <nav
            className={open ? "nav-links open" : "nav-links"}
            aria-label="Main navigation"
          >
            {navigation.map(([path, label]) => (
              <NavLink end={path === "/"} to={path} key={path}>
                {label}
              </NavLink>
            ))}
          </nav>
          <Link className="nav-cta" to="/academy">
            Enter the Vault
            <ArrowUpRight size={14} />
          </Link>
          <button
            className="menu-toggle icon-button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/academy" element={<Academy />} />
          <Route path="/threats" element={<ThreatLibrary />} />
          <Route path="/lab" element={<HackerLab />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="*"
            element={
              <div className="container section page">
                <h1>Signal lost.</h1>
                <p>This page isn’t in the vault.</p>
                <Button to="/">Return home</Button>
              </div>
            }
          />
        </Routes>
      </main>
      <footer className="footer">
        <div className="container footer-main">
          <div>
            <Brand />
            <p>
              Decode the threats. Build your knowledge.
              <br />
              Own your digital future.
            </p>
            <span className="footer-status">
              <span className="status-dot" /> ALL SYSTEMS OPERATIONAL
            </span>
          </div>
          <div>
            <span className="tiny-label">EXPLORE</span>
            <Link to="/academy">Cyber Academy</Link>
            <Link to="/threats">Threat Library</Link>
            <Link to="/news">Cyber News</Link>
          </div>
          <div>
            <span className="tiny-label">GET HANDS-ON</span>
            <Link to="/lab">Hacker Lab</Link>
            <Link to="/tools">Security Tools</Link>
            <Link to="/contact">Contact us</Link>
          </div>
          <div className="footer-manifesto">
            <span className="tiny-label">BUILT FOR THE CURIOUS.</span>
            <p>
              The next line of defense
              <br />
              starts with <span className="purple-text">you.</span>
            </p>
            <a
              href="https://github.com/JerichoooB/Cyber-Sec"
              target="_blank"
              rel="noreferrer"
              aria-label="CyberVault on GitHub"
            >
              <Github size={19} />
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} CyberVault. Learn ethically. Hack
            responsibly.
          </span>
          <span className="mono">
            KNOWLEDGE IS POWER. <span className="purple-text">SECURE IT.</span>
            <ArrowRight size={13} />
          </span>
        </div>
      </footer>
    </>
  );
}
