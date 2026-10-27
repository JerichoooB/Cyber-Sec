import { useState } from "react";
import {
  Fingerprint,
  KeyRound,
  Binary,
  Hash,
  LockKeyhole,
  UserRound,
  Copy,
  Check,
  ShieldCheck,
  MailWarning,
  Database,
  Network,
  ArrowRight,
  Terminal,
} from "lucide-react";
import { Heading } from "../components/UI";
export function passwordScore(value) {
  return Math.min(
    4,
    Number(value.length >= 12) +
      Number(value.length >= 16) +
      Number(/[a-z]/.test(value) && /[A-Z]/.test(value)) +
      Number(/\d/.test(value) && /[^a-zA-Z0-9]/.test(value)),
  );
}
function Output({ value }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="output">
      <output aria-live="polite">
        {value || "Your result will appear here."}
      </output>
      {value && (
        <button
          className="icon-button"
          aria-label="Copy result"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(value);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            } catch {
              setCopied(false);
            }
          }}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      )}
    </div>
  );
}
function ToolCard({ icon: Icon, title, description, children }) {
  return (
    <section className="glass tool-card">
      <span className="topic-icon">
        <Icon size={23} />
      </span>
      <h3>{title}</h3>
      <p>{description}</p>
      {children}
    </section>
  );
}
export function PasswordStrength() {
  const [value, setValue] = useState("");
  const score = passwordScore(value);
  return (
    <ToolCard
      icon={Fingerprint}
      title="Password strength"
      description="An offline estimate. Your password never leaves this browser."
    >
      <label>
        Password
        <input
          type="password"
          autoComplete="new-password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type a sample password"
        />
      </label>
      <div className={`strength-meter strength-${score}`}>
        {[1, 2, 3, 4].map((n) => (
          <i key={n} className={score >= n ? "filled" : ""} />
        ))}
      </div>
      <strong className="strength-label">
        {value
          ? ["Very weak", "Weak", "Fair", "Good", "Strong"][score]
          : "Waiting for input"}
      </strong>
      <small>
        Use 16+ characters and a unique password per account. This estimate
        cannot detect breached passwords.
      </small>
    </ToolCard>
  );
}
export function Generator() {
  const [length, setLength] = useState(20);
  const [value, setValue] = useState("");
  function generate() {
    const chars =
      "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%&*+-?";
    let result = "";
    while (result.length < length) {
      const bytes = crypto.getRandomValues(new Uint8Array(length * 2));
      for (const b of bytes) {
        if (b < 256 - (256 % chars.length) && result.length < length)
          result += chars[b % chars.length];
      }
    }
    setValue(result);
  }
  return (
    <ToolCard
      icon={KeyRound}
      title="Password generator"
      description="Create a password using your browser’s cryptographic random source."
    >
      <label>
        Length <span className="purple-text">{length} characters</span>
        <input
          type="range"
          min="12"
          max="48"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        />
      </label>
      <button className="button compact" onClick={generate}>
        Generate password <ArrowRight size={15} />
      </button>
      <Output value={value} />
    </ToolCard>
  );
}
export function Base64() {
  const [value, setValue] = useState("");
  const [output, setOutput] = useState("");
  function convert(decode) {
    try {
      if (decode) {
        const bytes = Uint8Array.from(atob(value), (c) => c.charCodeAt(0));
        setOutput(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
      } else {
        const bytes = new TextEncoder().encode(value);
        let binary = "";
        for (const byte of bytes) binary += String.fromCharCode(byte);
        setOutput(btoa(binary));
      }
    } catch {
      setOutput("Invalid Base64 or unsupported UTF-8 text.");
    }
  }
  return (
    <ToolCard
      icon={Binary}
      title="Base64 encoder / decoder"
      description="Convert UTF-8 text. Base64 is encoding, not encryption."
    >
      <label>
        Input
        <textarea
          rows={3}
          value={value}
          maxLength={20000}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter text or Base64"
        />
      </label>
      <div className="button-row">
        <button className="button compact" onClick={() => convert(false)}>
          Encode
        </button>
        <button
          className="button compact secondary"
          onClick={() => convert(true)}
        >
          Decode
        </button>
      </div>
      <Output value={output} />
    </ToolCard>
  );
}
export function HashTool() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  async function hash() {
    try {
      const digest = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(value),
      );
      setResult(
        Array.from(new Uint8Array(digest), (x) =>
          x.toString(16).padStart(2, "0"),
        ).join(""),
      );
    } catch {
      setResult(
        "SHA-256 requires a secure browser context (HTTPS or localhost).",
      );
    }
  }
  return (
    <ToolCard
      icon={Hash}
      title="SHA-256 hash generator"
      description="Create a one-way fingerprint of text. SHA-256 alone is not suitable for storing passwords."
    >
      <label>
        Text to hash
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={3}
          placeholder="Enter some text"
        />
      </label>
      <button className="button compact" onClick={hash}>
        Generate hash
      </button>
      <Output value={result} />
    </ToolCard>
  );
}
export function Caesar() {
  const [value, setValue] = useState("");
  const [shift, setShift] = useState(3);
  const [result, setResult] = useState("");
  function convert(direction) {
    setResult(
      value.replace(/[a-z]/gi, (c) => {
        const base = c <= "Z" ? 65 : 97;
        return String.fromCharCode(
          ((c.charCodeAt(0) - base + direction * shift + 26) % 26) + base,
        );
      }),
    );
  }
  return (
    <ToolCard
      icon={LockKeyhole}
      title="Caesar cipher"
      description="Shift letters to explore a classical cipher. Educational only — not secure encryption."
    >
      <label>
        Message
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={3}
          placeholder="Hello, explorer"
        />
      </label>
      <label>
        Letter shift: {shift}
        <input
          type="range"
          min="1"
          max="25"
          value={shift}
          onChange={(e) => setShift(Number(e.target.value))}
        />
      </label>
      <div className="button-row">
        <button className="button compact" onClick={() => convert(1)}>
          Encode
        </button>
        <button
          className="button compact secondary"
          onClick={() => convert(-1)}
        >
          Decode
        </button>
      </div>
      <Output value={result} />
    </ToolCard>
  );
}
export function Username() {
  const [value, setValue] = useState("");
  return (
    <ToolCard
      icon={UserRound}
      title="Username check"
      description="Check format and privacy clues locally. Does not check availability on any service."
    >
      <label>
        Username
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="cyber_explorer"
          maxLength={80}
        />
      </label>
      {value && (
        <ul className="check-list">
          <li>
            {/^[a-zA-Z][a-zA-Z0-9_]{2,19}$/.test(value)
              ? "✓ Valid format"
              : "○ Use 3–20 letters, digits, or underscores; start with a letter."}
          </li>
          <li>
            {/\d{4}/.test(value)
              ? "○ Consider removing dates or other personal numbers."
              : "✓ No obvious four-digit date."}
          </li>
          <li>Use an alias instead of your real name for more privacy.</li>
        </ul>
      )}
    </ToolCard>
  );
}
function Phishing() {
  const [answer, setAnswer] = useState(null);
  return (
    <ToolCard
      icon={MailWarning}
      title="Spot the phishing email"
      description="Inspect a fictional message. Which clue is most suspicious?"
    >
      <div className="email-demo">
        <small>From: security@cybervau1t.example</small>
        <strong>URGENT: Your account will be deleted</strong>
        <p>Verify your password in 10 minutes to keep access.</p>
      </div>
      {[
        "The sender uses a lookalike domain and creates urgency.",
        "The message mentions an account.",
        "The message is short.",
      ].map((a, i) => (
        <button
          className={`quiz-option ${answer === i ? "selected" : ""}`}
          key={a}
          onClick={() => setAnswer(i)}
        >
          {a}
        </button>
      ))}
      {answer !== null && (
        <p role="status" className={answer === 0 ? "green-text" : "pink-text"}>
          {answer === 0
            ? "Correct! The “1” in the domain and pressure to act are red flags. Verify through a known official channel."
            : "Look more closely at the sender domain and pressure to share a password. Try again."}
        </p>
      )}
    </ToolCard>
  );
}
function SqlDemo() {
  const [safe, setSafe] = useState(false);
  return (
    <ToolCard
      icon={Database}
      title="SQL injection concept"
      description="A fixed, inert illustration. No database or external system is contacted."
    >
      <div className="segmented">
        <button
          className={!safe ? "active" : ""}
          onClick={() => setSafe(false)}
        >
          Unsafe pattern
        </button>
        <button className={safe ? "active" : ""} onClick={() => setSafe(true)}>
          Parameterized
        </button>
      </div>
      <pre className="code-output">
        {safe
          ? "SELECT * FROM users\nWHERE username = ?;\n\nparameters: [userInput]"
          : '"SELECT * FROM users WHERE\nusername = \'" + userInput + "\';"'}
      </pre>
      <div className="notice">
        {safe
          ? "Input is bound as data. It cannot change the query structure."
          : "Concatenating untrusted input into a query lets data be interpreted as instructions."}
      </div>
    </ToolCard>
  );
}
function Ports() {
  const [ran, setRan] = useState(false);
  return (
    <ToolCard
      icon={Network}
      title="Port discovery simulator"
      description="Explore a fictional host. No packets are sent and no real host is scanned."
    >
      <div className="simulation-host">
        <span className="status-dot" /> training-host.example · SIMULATED
      </div>
      <button className="button compact" onClick={() => setRan((v) => !v)}>
        {ran ? "Reset simulation" : "Run simulation"}
        <Terminal size={15} />
      </button>
      {ran && (
        <div className="port-results" role="status">
          {[
            ["22", "SSH", "Filtered"],
            ["80", "HTTP", "Open"],
            ["443", "HTTPS", "Open"],
            ["3306", "MySQL", "Closed"],
          ].map(([p, s, state]) => (
            <div key={p}>
              <span>
                {p} / {s}
              </span>
              <span className={state === "Open" ? "green-text" : "muted"}>
                {state}
              </span>
            </div>
          ))}
          <p>
            Open ports indicate reachable services, not necessarily
            vulnerabilities. Test only systems you are authorized to assess.
          </p>
        </div>
      )}
    </ToolCard>
  );
}
export function Tools() {
  return (
    <div className="container page section">
      <Heading
        eyebrow="YOUR DIGITAL TOOLKIT"
        title={
          <>
            Security <span className="gradient-text">Tools</span>
          </>
        }
        description="Useful utilities. Zero uploads. Everything is processed in your browser."
      />
      <div className="notice">
        <ShieldCheck size={18} /> Local by design. No account, API key, or
        external service required.
      </div>
      <div className="tools-grid">
        <Generator />
        <PasswordStrength />
        <Base64 />
        <HashTool />
        <Caesar />
        <Username />
      </div>
    </div>
  );
}
export function HackerLab() {
  return (
    <div className="container page section">
      <Heading
        eyebrow="SANDBOX MODE / ACTIVE"
        title={
          <>
            The Hacker <span className="gradient-text">Lab</span>
          </>
        }
        description="Turn theory into intuition with safe, beginner-friendly experiments."
      />
      <div className="notice">
        <ShieldCheck size={18} /> Educational simulations only. All examples run
        locally with no external targets.
      </div>
      <div className="tools-grid">
        <PasswordStrength />
        <Phishing />
        <SqlDemo />
        <Caesar />
        <HashTool />
        <Ports />
      </div>
    </div>
  );
}
