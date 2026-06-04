import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const appOutput = path.join(root, ".next", "server", "app");
const expectedHost = "https://www.scr-robot.com";

const checks = [];

function check(name, fn) {
  checks.push({ name, fn });
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function readGeneratedHtml(route) {
  const file =
    route === "/"
      ? path.join(appOutput, "index.html")
      : path.join(appOutput, `${route.replace(/^\//, "")}.html`);

  assert(fs.existsSync(file), `Missing generated HTML for ${route}: ${file}`);
  return fs.readFileSync(file, "utf8");
}

function readGeneratedBody(name) {
  const file = path.join(appOutput, `${name}.body`);
  assert(fs.existsSync(file), `Missing generated ${name} body`);
  return fs.readFileSync(file, "utf8");
}

function canonicalFor(html) {
  return html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
}

function alternateFor(html, hreflang) {
  const pattern = new RegExp(
    `<link rel="alternate" hrefLang="${hreflang}" href="([^"]+)"`,
  );
  return html.match(pattern)?.[1];
}

function jsonLdScripts(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map(
    (match) => JSON.parse(match[1]),
  );
}

check("robots.txt is generated and points to the sitemap", () => {
  const robots = readGeneratedBody("robots.txt");
  assert(robots.includes("User-Agent: *"), "robots.txt must target all crawlers");
  assert(robots.includes("Allow: /"), "robots.txt must allow the public site");
  assert(
    robots.includes(`Sitemap: ${expectedHost}/sitemap.xml`),
    "robots.txt must include the canonical sitemap URL",
  );
});

check("sitemap.xml includes English, Chinese, product, and model URLs", () => {
  const sitemap = readGeneratedBody("sitemap.xml");
  for (const url of [
    expectedHost,
    `${expectedHost}/zh`,
    `${expectedHost}/products`,
    `${expectedHost}/zh/products`,
    `${expectedHost}/products/ecr-series`,
    `${expectedHost}/zh/products/ecr-series`,
    `${expectedHost}/products/ecr-series/ecr8-1200`,
  ]) {
    assert(sitemap.includes(`<loc>${url}</loc>`), `sitemap missing ${url}`);
  }
  assert(
    sitemap.includes('hreflang="zh-CN"') && sitemap.includes('hreflang="en"'),
    "sitemap must include localized alternates",
  );
});

check("product pages have canonical URLs", () => {
  const expectations = new Map([
    ["/products", `${expectedHost}/products`],
    ["/zh/products", `${expectedHost}/zh/products`],
    ["/products/ecr-series", `${expectedHost}/products/ecr-series`],
    ["/zh/products/ecr-series", `${expectedHost}/zh/products/ecr-series`],
    [
      "/products/ecr-series/ecr8-1200",
      `${expectedHost}/products/ecr-series/ecr8-1200`,
    ],
  ]);

  for (const [route, expectedCanonical] of expectations) {
    assert(
      canonicalFor(readGeneratedHtml(route)) === expectedCanonical,
      `${route} canonical must be ${expectedCanonical}`,
    );
  }
});

check("paired English and Chinese pages have hreflang links", () => {
  const pairs = [
    ["/", "/zh"],
    ["/products", "/zh/products"],
    ["/products/ecr-series", "/zh/products/ecr-series"],
  ];

  for (const [enRoute, zhRoute] of pairs) {
    const enHtml = readGeneratedHtml(enRoute);
    const zhHtml = readGeneratedHtml(zhRoute);

    assert(
      alternateFor(enHtml, "en") === `${expectedHost}${enRoute === "/" ? "" : enRoute}`,
      `${enRoute} missing self hreflang`,
    );
    assert(
      alternateFor(enHtml, "zh-CN") === `${expectedHost}${zhRoute}`,
      `${enRoute} missing zh-CN hreflang`,
    );
    assert(
      alternateFor(zhHtml, "en") === `${expectedHost}${enRoute === "/" ? "" : enRoute}`,
      `${zhRoute} missing en hreflang`,
    );
    assert(
      alternateFor(zhHtml, "zh-CN") === `${expectedHost}${zhRoute}`,
      `${zhRoute} missing self hreflang`,
    );
  }
});

check("product model pages include Product and FAQ JSON-LD", () => {
  const html = readGeneratedHtml("/products/ecr-series/ecr8-1200");
  const scripts = jsonLdScripts(html);
  const product = scripts.find((script) => script["@type"] === "Product");
  const faq = scripts.find((script) => script["@type"] === "FAQPage");

  assert(product, "model page missing Product JSON-LD");
  assert(product.name === "ECR8-1200", "Product JSON-LD must use model name");
  assert(product.image?.startsWith(expectedHost), "Product image must be absolute");
  assert(product.brand?.name === "SCR Robot", "Product brand must be SCR Robot");

  assert(faq, "model page missing FAQ JSON-LD");
  assert(Array.isArray(faq.mainEntity), "FAQ JSON-LD must include questions");
  assert(faq.mainEntity.length >= 4, "FAQ JSON-LD must include the visible FAQs");
});

let failures = 0;

for (const { name, fn } of checks) {
  try {
    fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    failures += 1;
    console.error(`FAIL ${name}`);
    console.error(`  ${error.message}`);
  }
}

if (failures > 0) {
  process.exit(1);
}
