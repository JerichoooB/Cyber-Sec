const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const baseURL = process.env.BASE_URL || "http://localhost:5173";
(async () => {
  const browser = await chromium.launch({
    executablePath:
      process.env.CHROMIUM_PATH ||
      (require("node:fs").existsSync("/usr/bin/chromium")
        ? "/usr/bin/chromium"
        : undefined),
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(baseURL);
  await page
    .getByRole("heading", { name: "Enter the World of Cybersecurity." })
    .waitFor();
  await page.screenshot({
    path: "/tmp/cybervault-desktop.png",
    fullPage: true,
  });
  for (const [path, text] of [
    ["academy", "Cyber Academy"],
    ["threats", "Threat Library"],
    ["lab", "The Hacker Lab"],
    ["tools", "Security Tools"],
    ["news", "Stay informed."],
    ["contact", "Let’s connect."],
  ]) {
    await page.goto(baseURL + "/" + path);
    await page
      .getByRole("heading", { name: new RegExp(text) })
      .first()
      .waitFor();
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
      path + " overflow",
    );
  }
  await page.goto(baseURL + "/threats");
  await page.getByLabel("Search threats").fill("ransom");
  assert.equal(
    await page.getByRole("button", { name: "Learn more" }).count(),
    1,
  );
  await page.getByRole("button", { name: "Learn more" }).click();
  await page.getByRole("dialog").waitFor();
  assert.match(await page.getByRole("dialog").innerText(), /offline backups/);
  await page.keyboard.press("Escape");
  assert.equal(await page.getByRole("dialog").count(), 0);
  await page.goto(baseURL + "/academy");
  await page.getByRole("button", { name: "Start lesson" }).first().click();
  await page.getByRole("button", { name: "Mark as complete" }).click();
  await page.reload();
  assert.match(await page.locator(".progress-box").innerText(), /1 \/ 8/);
  await page.goto(baseURL + "/tools");
  const generator = page
    .locator("section")
    .filter({
      has: page.getByRole("heading", {
        name: "Password generator",
        exact: true,
      }),
    });
  await generator.getByRole("button", { name: "Generate password" }).click();
  assert.equal((await generator.locator("output").innerText()).length, 20);
  const base = page
    .locator("section")
    .filter({
      has: page.getByRole("heading", {
        name: "Base64 encoder / decoder",
        exact: true,
      }),
    });
  await base.locator("textarea").fill("Hello 🌍");
  await base.getByRole("button", { name: "Encode", exact: true }).click();
  const encoded = await base.locator("output").innerText();
  await base.locator("textarea").fill(encoded);
  await base.getByRole("button", { name: "Decode", exact: true }).click();
  assert.equal(await base.locator("output").innerText(), "Hello 🌍");
  const hash = page
    .locator("section")
    .filter({
      has: page.getByRole("heading", {
        name: "SHA-256 hash generator",
        exact: true,
      }),
    });
  await hash.locator("textarea").fill("abc");
  await hash.getByRole("button", { name: "Generate hash" }).click();
  assert.equal(
    await hash.locator("output").innerText(),
    "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
  );
  const cipher = page
    .locator("section")
    .filter({
      has: page.getByRole("heading", { name: "Caesar cipher", exact: true }),
    });
  await cipher.locator("textarea").fill("Hello, World!");
  await cipher.getByRole("button", { name: "Encode", exact: true }).click();
  assert.equal(await cipher.locator("output").innerText(), "Khoor, Zruog!");
  await page.goto(baseURL + "/lab");
  await page
    .getByRole("button", { name: "The sender uses", exact: false })
    .click();
  await page.getByText("Correct!", { exact: false }).waitFor();
  await page
    .getByRole("button", { name: "Parameterized", exact: true })
    .click();
  await page.getByText("Input is bound as data.", { exact: false }).waitFor();
  await page.getByRole("button", { name: "Run simulation" }).click();
  await page.getByText("3306 / MySQL").waitFor();
  await page.goto(baseURL + "/contact");
  await page.getByLabel("Your name").fill("Alex");
  await page.getByLabel("Email address").fill("alex@example.com");
  await page.getByLabel("Message", { exact: true }).fill("Hello vault");
  await page.getByRole("button", { name: "Preview submission" }).click();
  await page.getByRole("status").waitFor();
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of [
    "",
    "academy",
    "threats",
    "lab",
    "tools",
    "news",
    "contact",
  ]) {
    await page.goto(baseURL + "/" + path);
    await page.waitForTimeout(150);
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
      path + " mobile overflow",
    );
  }
  await page.goto(baseURL);
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Tools", exact: true })
    .click();
  await page.getByRole("heading", { name: "Security Tools" }).waitFor();
  await page.goto(baseURL);
  await page.screenshot({ path: "/tmp/cybervault-mobile.png", fullPage: true });
  assert.deepEqual(errors, []);
  console.log(
    "PASS: 7 routes, desktop/mobile layout, threat search/dialog, lesson persistence, password generation, Unicode Base64 roundtrip, SHA-256 known vector, Caesar cipher, quiz, SQL concept, port simulation, contact validation, mobile navigation; no browser errors.",
  );
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
