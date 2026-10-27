import {
  Shield,
  ArrowUpRight,
  ArrowRight,
  Terminal,
  Fingerprint,
  LockKeyhole,
  Bug,
  Fish,
  Database,
  CodeXml,
  Network,
  BookOpen,
  Zap,
  Wrench,
  Crosshair,
  Radio,
  Check,
  Globe,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button, Heading, Reveal } from "../components/UI";
const topics = [
  ["Malware", "Understand the code behind the chaos.", Bug, "purple"],
  ["Phishing", "Spot the bait. Stay one step ahead.", Fish, "pink"],
  ["SQL Injection", "Explore how databases get compromised.", Database, "blue"],
  [
    "Cross-Site Scripting",
    "Uncover the risks hiding in the browser.",
    CodeXml,
    "purple",
  ],
  [
    "Password Security",
    "Build a stronger first line of defense.",
    Fingerprint,
    "pink",
  ],
  [
    "Networking Basics",
    "Understand the connections that matter.",
    Network,
    "blue",
  ],
];
function CyberVisual() {
  return (
    <div className="cyber-visual" aria-label="Illustrated security dashboard">
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="orbit orbit-three" />
      <span className="orbit-node node-one" />
      <span className="orbit-node node-two" />
      <div className="shield-core">
        <Shield strokeWidth={0.8} />
        <LockKeyhole className="core-lock" />
      </div>
      <div className="float-panel system-panel">
        <span className="tiny-label">
          <span className="status-dot" /> SYSTEM STATUS
        </span>
        <strong>
          All systems secure <Check size={13} />
        </strong>
        <div className="mini-bars">
          {Array.from({ length: 22 }, (_, i) => (
            <i key={i} style={{ height: `${12 + ((i * 17) % 30)}px` }} />
          ))}
        </div>
        <span className="mono muted">
          ENCRYPTION ACTIVE <span className="purple-text">AES-256</span>
        </span>
      </div>
      <div className="float-panel terminal-panel">
        <span className="tiny-label">
          <Terminal size={12} /> VAULT_TERMINAL{" "}
          <span className="terminal-dots">•••</span>
        </span>
        <p>
          <span className="purple-text">$</span> initiate security_protocol
        </p>
        <p className="muted">&gt; Establishing secure connection...</p>
        <p className="green-text">
          &gt; Access granted. Welcome, explorer.
          <span className="blink"> ▍</span>
        </p>
      </div>
      <div className="float-panel threat-panel">
        <div className="round-icon">
          <Shield size={17} />
        </div>
        <div>
          <span className="tiny-label">THREATS BLOCKED</span>
          <strong>
            1,284 <span>+12.8% ↗</span>
          </strong>
        </div>
      </div>
      <div className="visual-coordinate mono">
        35°41′22.2″N · ENCRYPTED CONNECTION
      </div>
    </div>
  );
}
export default function Home() {
  return (
    <>
      <section className="hero grid-bg">
        <div className="container hero-layout">
          <Reveal className="hero-copy">
            <div className="hero-badge">
              <span className="status-dot" /> KNOWLEDGE IS YOUR BEST DEFENSE{" "}
              <ChevronRight size={12} />
            </div>
            <h1>
              Enter the World
              <br />
              of{" "}
              <span>
                Cybersecurity<span className="headline-dot">.</span>
              </span>
            </h1>
            <p>
              Learn ethical hacking, understand digital threats, and explore
              cybersecurity through interactive experiences.
            </p>
            <div className="hero-actions">
              <Button to="/academy">Start Learning</Button>
              <Button to="/threats" secondary>
                Explore Threats
              </Button>
            </div>
            <div className="hero-footnote">
              <div className="avatar-stack">
                <span>JC</span>
                <span>AK</span>
                <span>MR</span>
                <span>+</span>
              </div>
              <div>
                <div className="stars">★★★★★</div>
                <small>Built for curious minds. Open to everyone.</small>
              </div>
            </div>
          </Reveal>
          <CyberVisual />
        </div>
        <div className="hero-bottom container">
          <span>
            <span className="status-dot" /> YOUR NEXT SKILL STARTS HERE
          </span>
          <a href="#explore">
            SCROLL TO EXPLORE <ArrowRight size={13} />
          </a>
          <span className="mono">EST. 2026 / ALWAYS EVOLVING</span>
        </div>
      </section>
      <section className="stats-strip">
        <div className="container stats-grid">
          {[
            ["08", "Curated lessons"],
            ["11", "Threat categories"],
            ["08", "Interactive tools"],
            ["100%", "Safe learning environment"],
          ].map(([n, t]) => (
            <div key={t}>
              <strong>
                {n}
                <span>{n === "100%" ? "" : "+"}</span>
              </strong>
              <span>{t}</span>
            </div>
          ))}
        </div>
      </section>
      <section id="explore" className="section container">
        <div className="heading-row">
          <Heading
            eyebrow="EXPLORE THE DIGITAL FRONTLINE"
            title={
              <>
                Understand the threats.
                <br />
                <span className="muted">Build your defenses.</span>
              </>
            }
            description="Break down complex concepts. Turn curiosity into capability."
          />
          <Link className="text-link" to="/threats">
            Explore threat library <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="topic-grid">
          {topics.map(([title, desc, Icon, color], i) => (
            <Reveal key={title}>
              <Link
                to={i > 3 ? "/academy" : "/threats"}
                className={`topic-card ${color}`}
              >
                <div className="card-top">
                  <span className="topic-icon">
                    <Icon size={23} />
                  </span>
                  <span className="card-index">0{i + 1} /</span>
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
                <span className="card-bottom">
                  EXPLORE TOPIC <ArrowUpRight size={17} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="why-section">
        <div className="container why-layout">
          <Reveal>
            <Heading
              eyebrow="BUILT FOR THE NEXT GENERATION"
              title={
                <>
                  Your curiosity.
                  <br />
                  Your <span className="gradient-text">superpower.</span>
                </>
              }
              description="Cybersecurity shouldn't feel out of reach. We're making it clear, hands-on, and a little more exciting."
            />
            <Button to="/academy" secondary>
              Discover the Academy
            </Button>
          </Reveal>
          <div className="benefit-grid">
            {[
              [
                BookOpen,
                "Start from zero",
                "Beginner-friendly lessons that make the complex click.",
              ],
              [
                Zap,
                "Learn by doing",
                "Safe, interactive labs. Real understanding.",
              ],
              [
                Wrench,
                "Tools that empower",
                "Practical utilities for your everyday digital life.",
              ],
              [
                Crosshair,
                "Stay one step ahead",
                "Build the mindset to navigate a changing digital world.",
              ],
            ].map(([Icon, title, desc]) => (
              <Reveal className="benefit" key={title}>
                <Icon size={22} />
                <h3>{title}</h3>
                <p>{desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="lab-banner">
          <div className="lab-art">
            <Terminal size={48} />
            <span className="mono">&gt; learn. test. repeat._</span>
          </div>
          <div>
            <span className="eyebrow">THE HACKER LAB</span>
            <h2>
              A safe space to break things.
              <br />
              <span className="muted">And learn how to fix them.</span>
            </h2>
            <p>
              Crack a cipher. Spot a phishing email. Put your skills to the
              test.
            </p>
            <Button to="/lab">Enter the Lab</Button>
          </div>
          <span className="banner-tag">
            <Radio size={13} /> SANDBOX MODE
          </span>
        </div>
      </section>
      <section className="container cta-section">
        <span className="eyebrow">YOUR JOURNEY STARTS NOW</span>
        <h2>
          Stay curious. <span className="gradient-text">Stay secure.</span>
        </h2>
        <p>Ready to strengthen your cyber knowledge?</p>
        <Button to="/academy">Launch CyberVault</Button>
        <div className="cta-grid" />
      </section>
    </>
  );
}
