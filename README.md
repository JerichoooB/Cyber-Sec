# CyberVault

A responsive, cyberpunk cybersecurity learning hub built with React, Vite, Tailwind CSS, Framer Motion, Lucide, and React Router.

## Development

Requires Node.js 20.19+ or 22.12+ (validated on Node 24) and npm.

```sh
cd /workspace/Cyber-Sec
npm ci --cache /workspace/.npm-cache
npm run dev -- --port 5173
```

For a checkout outside the cloud environment, use its local directory and omit the custom cache flag if unnecessary.

```sh
npm run build
npm run preview -- --port 4173
```

Deploy the generated `dist/` directory to a static host. Configure the host to rewrite non-file routes to `index.html` so direct links such as `/academy` work.

## Pages and interactions

- **Home:** illustrated security dashboard, topic cards, benefits, and links to learning paths.
- **Academy:** eight short lessons, difficulty filters, lesson dialogs, and browser-local progress.
- **Threat Library:** eleven threats with search, severity filters, and prevention guidance.
- **Hacker Lab:** password estimate, phishing quiz, inert SQL comparison, Caesar cipher, SHA-256, and simulated port discovery.
- **Tools:** cryptographic random password generation, password estimates, Unicode Base64, SHA-256, Caesar cipher, and local username format/privacy checks.
- **News:** three clearly labeled static editorial explainers.
- **Contact:** browser validation with an explicit demo result. No delivery backend is connected.

All tools process text locally. Lab examples do not contact targets or perform real scans. Caesar ciphers are educational, not secure encryption; Base64 is encoding. SHA-256 alone is unsuitable for password storage. Password estimates do not check breach databases. Clipboard and SHA-256 functionality require a secure context (HTTPS or localhost).

The homepage dashboard statistics are illustrative. Learning progress is saved only in this browser's local storage. No API keys, database, or environment variables are required.

## Accessibility

Includes keyboard focus indicators, a skip link, labeled controls, native modal dialogs, mobile navigation, responsive grids, and reduced-motion support.

## Browser smoke tests

With the dev server running:

```sh
npm run test:smoke
```

The test uses system Chromium when available. Otherwise run `npx playwright install chromium` first, or set `CHROMIUM_PATH` to an installed Chromium executable. Set `BASE_URL` to test a different server (for example the production preview on port 4173). It checks all routes at desktop/mobile widths, navigation, modal behavior, saved lesson progress, and representative tool results. Screenshots are written to `/tmp/cybervault-desktop.png` and `/tmp/cybervault-mobile.png`.
