import { useState } from "react";
import {
  Search,
  ShieldAlert,
  ArrowUpRight,
  BookOpen,
  Clock,
  CheckCircle2,
  Filter,
  Newspaper,
  Send,
  Github,
} from "lucide-react";
import { Heading, Reveal, Modal } from "../components/UI";
import { threats, lessons, articles } from "../data/content";
export function ThreatLibrary() {
  const [query, setQuery] = useState("");
  const [severity, setSeverity] = useState("All");
  const [selected, setSelected] = useState(null);
  const filtered = threats.filter(
    (t) =>
      t[0].toLowerCase().includes(query.toLowerCase()) &&
      (severity === "All" || t[2] === severity),
  );
  return (
    <div className="container page section">
      <Heading
        eyebrow="KNOW YOUR ADVERSARY"
        title={
          <>
            Threat <span className="gradient-text">Library</span>
          </>
        }
        description="Understand the tactics. Recognize the signals. Build stronger defenses."
      />
      <div className="filter-row">
        <label className="search">
          <Search size={18} />
          <input
            aria-label="Search threats"
            placeholder="Search threats..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <label className="select-label">
          <Filter size={16} />
          <select
            aria-label="Filter severity"
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
          >
            {["All", "Critical", "High", "Medium"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <span className="muted mono">{filtered.length} THREATS</span>
      </div>
      <div className="content-grid">
        {filtered.map((t, i) => (
          <Reveal className="glass content-card" key={t[0]}>
            <div className="card-top">
              <ShieldAlert className="purple-text" />
              <span className={`badge ${t[2].toLowerCase()}`}>{t[2]}</span>
            </div>
            <h3>{t[0]}</h3>
            <p>{t[1]}</p>
            <button className="text-link" onClick={() => setSelected(t)}>
              Learn more <ArrowUpRight size={16} />
            </button>
          </Reveal>
        ))}
      </div>
      {!filtered.length && (
        <p className="empty-state">
          No threats match your search. Try a different term or severity.
        </p>
      )}
      {selected && (
        <Modal title={selected[0]} onClose={() => setSelected(null)}>
          <span className={`badge ${selected[2].toLowerCase()}`}>
            {selected[2]} severity
          </span>
          <h3>What it is</h3>
          <p>{selected[1]}</p>
          <h3>How it works · example scenario</h3>
          <p>{selected[3]}</p>
          <h3>Protect yourself</h3>
          <p>{selected[4]}</p>
        </Modal>
      )}
    </div>
  );
}
function readProgress() {
  try {
    const value = JSON.parse(
      localStorage.getItem("cybervault-progress") || "[]",
    );
    return Array.isArray(value)
      ? [...new Set(value.filter((x) => lessons.some((l) => l[0] === x)))]
      : [];
  } catch {
    return [];
  }
}
export function Academy() {
  const [category, setCategory] = useState("All lessons");
  const [selected, setSelected] = useState(null);
  const [completed, setCompleted] = useState(readProgress);
  const markComplete = () => {
    const next = [...new Set([...completed, selected[0]])];
    setCompleted(next);
    try {
      localStorage.setItem("cybervault-progress", JSON.stringify(next));
    } catch {}
    setSelected(null);
  };
  const filtered = lessons.filter(
    (l) => category === "All lessons" || l[2] === category,
  );
  return (
    <div className="container page section">
      <Heading
        eyebrow="UPGRADE YOUR KNOWLEDGE"
        title={
          <>
            Cyber <span className="gradient-text">Academy</span>
          </>
        }
        description="Small lessons. Lasting skills. Your journey into cybersecurity starts here."
      />
      <div className="academy-layout">
        <aside className="glass academy-sidebar">
          <span className="tiny-label">LEARNING PATH</span>
          {["All lessons", "Beginner", "Intermediate", "Advanced"].map((c) => (
            <button
              className={category === c ? "active" : ""}
              onClick={() => setCategory(c)}
              key={c}
            >
              <BookOpen size={16} />
              {c}
            </button>
          ))}
          <div className="progress-box">
            <span className="tiny-label">YOUR PROGRESS</span>
            <strong>
              {completed.length} / {lessons.length} lessons
            </strong>
            <progress max={lessons.length} value={completed.length} />
            <small>Saved on this browser.</small>
          </div>
        </aside>
        <div className="lesson-grid">
          {filtered.map((l) => (
            <Reveal className="glass content-card" key={l[0]}>
              <div className="card-top">
                <span className="badge">{l[2]}</span>
                {completed.includes(l[0]) ? (
                  <CheckCircle2 size={20} className="green-text" />
                ) : (
                  <BookOpen className="purple-text" size={20} />
                )}
              </div>
              <h3>{l[0]}</h3>
              <p>{l[1]}</p>
              <div className="lesson-bottom">
                <span>
                  <Clock size={13} />
                  {l[3]}
                </span>
                <button className="text-link" onClick={() => setSelected(l)}>
                  {completed.includes(l[0]) ? "Review lesson" : "Start lesson"}
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      {selected && (
        <Modal title={selected[0]} onClose={() => setSelected(null)}>
          <span className="badge">
            {selected[2]} · {selected[3]}
          </span>
          <p className="lesson-text">{selected[4]}</p>
          <h3>Reflect on what you learned</h3>
          <p>
            How could you apply this concept to protect a device, account, or
            application you use?
          </p>
          <button className="button" onClick={markComplete}>
            <CheckCircle2 size={17} />
            Mark as complete
          </button>
        </Modal>
      )}
    </div>
  );
}
export function News() {
  const [selected, setSelected] = useState(null);
  return (
    <div className="container page section">
      <Heading
        eyebrow="THE CYBER BRIEFING"
        title={
          <>
            Stay informed.
            <br />
            <span className="gradient-text">Stay ahead.</span>
          </>
        }
        description="Evergreen security explainers and awareness tips from the vault."
      />
      <div className="notice">
        <Newspaper size={18} /> Editorial demo content — these are static
        learning articles, not a live news feed.
      </div>
      <div className="content-grid">
        {articles.map((a, i) => (
          <Reveal className="glass article-card" key={a[1]}>
            <div className={`article-art art-${i}`}>
              <ShieldAlert size={70} strokeWidth={0.8} />
              <span className="mono">VAULT BRIEF / {a[4]}</span>
            </div>
            <div className="article-body">
              <span className="eyebrow">{a[0]}</span>
              <h3>{a[1]}</h3>
              <p>{a[2]}</p>
              <div className="lesson-bottom">
                <span>{a[3]}</span>
                <button className="text-link" onClick={() => setSelected(a)}>
                  Read article <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      {selected && (
        <Modal title={selected[1]} onClose={() => setSelected(null)}>
          <span className="eyebrow">
            {selected[0]} · {selected[3]}
          </span>
          <p>{selected[2]}</p>
          <h3>Your next move</h3>
          <p>{selected[5]}</p>
          <p className="muted">
            Educational demo article. No live incident reporting is included.
          </p>
        </Modal>
      )}
    </div>
  );
}
export function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="container page section">
      <Heading
        eyebrow="OPEN A SECURE CHANNEL"
        title={
          <>
            Let’s <span className="gradient-text">connect.</span>
          </>
        }
        description="Have a question, an idea, or a topic you’d like to explore?"
      />
      <div className="contact-layout">
        <div>
          <h3>Curiosity belongs here.</h3>
          <p className="muted">
            CyberVault is a space for learning and sharing. Explore the source,
            suggest a lesson, or make this project your own.
          </p>
          <a
            className="contact-link"
            href="https://github.com/JerichoooB/Cyber-Sec"
            target="_blank"
            rel="noreferrer"
          >
            <Github size={23} />
            <div>
              <strong>Find us on GitHub</strong>
              <small>JerichoooB / Cyber-Sec</small>
            </div>
            <ArrowUpRight size={18} />
          </a>
          <div className="notice">
            Never include passwords, credentials, or sensitive security findings
            in a contact form.
          </div>
        </div>
        <form
          className="glass contact-form"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <span className="badge">LOCAL DEMO FORM</span>
          <label>
            Your name
            <input
              required
              name="name"
              placeholder="Alex Morgan"
              maxLength={100}
            />
          </label>
          <label>
            Email address
            <input
              required
              type="email"
              name="email"
              placeholder="alex@example.com"
            />
          </label>
          <label>
            Message
            <textarea
              required
              name="message"
              placeholder="What's on your mind?"
              rows={5}
              maxLength={3000}
            />
          </label>
          <p className="muted small">
            This frontend demo validates your message locally. No message is
            sent or stored.
          </p>
          <button className="button" type="submit">
            Preview submission <Send size={16} />
          </button>
          {sent && (
            <p className="success-message" role="status">
              Your form is valid. Delivery isn’t connected yet; contact the
              project through GitHub.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
