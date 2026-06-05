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

function tagValue(xml, tagName) {
  return xml.match(new RegExp(`<${tagName}>(.*?)</${tagName}>`, "s"))?.[1];
}

function sitemapUrlBlocks(xml) {
  return [...xml.matchAll(/<url>(.*?)<\/url>/gs)].map((match) => match[1]);
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

function visibleText(html) {
  return html
    .replace(/<script\b[^>]*>.*?<\/script>/gs, " ")
    .replace(/<style\b[^>]*>.*?<\/style>/gs, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#x27;|&quot;|&amp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function wordCount(text) {
  return text.match(/[A-Za-z]+(?:[-'][A-Za-z]+)*/g)?.length ?? 0;
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
  assert(
    sitemap.startsWith('<?xml version="1.0" encoding="UTF-8"?>'),
    "sitemap must start with an XML declaration",
  );
  assert(
    sitemap.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'),
    "sitemap must use the standard sitemap urlset namespace without extra sitemap-level namespaces",
  );
  assert(
    !sitemap.includes("xmlns:xhtml") && !sitemap.includes("<xhtml:link"),
    "sitemap must avoid xhtml alternate links for Google Search Console compatibility",
  );

  const urlBlocks = sitemapUrlBlocks(sitemap);
  assert(urlBlocks.length > 0, "sitemap must include at least one <url> entry");

  for (const block of urlBlocks) {
    const loc = tagValue(block, "loc");
    const lastmod = tagValue(block, "lastmod");
    const changefreq = tagValue(block, "changefreq");
    const priority = tagValue(block, "priority");

    assert(loc?.startsWith(expectedHost), "each sitemap URL must include an absolute loc");
    assert(lastmod, `sitemap entry ${loc} missing lastmod`);
    assert(changefreq, `sitemap entry ${loc} missing changefreq`);
    assert(priority, `sitemap entry ${loc} missing priority`);
    assert(!Number.isNaN(Number(priority)), `sitemap entry ${loc} priority must be numeric`);
  }

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

check("product model pages use non-Product structured data with FAQ", () => {
  const html = readGeneratedHtml("/products/ecr-series/ecr8-1200");
  const scripts = jsonLdScripts(html);
  const product = scripts.find((script) => script["@type"] === "Product");
  const webPage = scripts.find((script) => script["@type"] === "WebPage");
  const breadcrumb = scripts.find((script) => script["@type"] === "BreadcrumbList");
  const organization = scripts.find((script) => script["@type"] === "Organization");
  const faq = scripts.find((script) => script["@type"] === "FAQPage");

  assert(!product, "model page must not include Product JSON-LD");
  assert(webPage, "model page missing WebPage JSON-LD");
  assert(webPage.name.includes("ECR8-1200"), "WebPage JSON-LD must use model name");
  assert(webPage.url === `${expectedHost}/products/ecr-series/ecr8-1200`, "WebPage URL must be canonical");
  assert(breadcrumb, "model page missing BreadcrumbList JSON-LD");
  assert(organization, "model page missing Organization JSON-LD");

  assert(faq, "model page missing FAQ JSON-LD");
  assert(Array.isArray(faq.mainEntity), "FAQ JSON-LD must include questions");
  assert(faq.mainEntity.length >= 4, "FAQ JSON-LD must include the visible FAQs");
});

check("robot series pages use non-Product structured data", () => {
  const seriesRoutes = [
    "/products/ecr-series",
    "/products/sch-series",
    "/products/sar-series",
    "/products/scr-series",
    "/products/srl-series",
    "/products/stc-series",
    "/products/er-series",
  ];

  for (const route of seriesRoutes) {
    const scripts = jsonLdScripts(readGeneratedHtml(route));
    const types = scripts.map((script) => script["@type"]);

    assert(!types.includes("Product"), `${route} must not include Product JSON-LD`);
    assert(!types.includes("ProductGroup"), `${route} must not include ProductGroup JSON-LD`);
    assert(types.includes("WebPage"), `${route} missing WebPage JSON-LD`);
    assert(types.includes("ItemList"), `${route} missing model ItemList JSON-LD`);
    assert(types.includes("BreadcrumbList"), `${route} missing BreadcrumbList JSON-LD`);
    assert(types.includes("Organization"), `${route} missing Organization JSON-LD`);
  }
});

check("new industry solution pages are long-form static SEO pages", () => {
  const requiredIndustryPages = [
    ["plastic-manufacturing", "Plastic Manufacturing"],
    ["chemical-processing", "Chemical Processing"],
    ["building-materials", "Building Materials"],
    ["food-ingredients", "Food Ingredients"],
    ["animal-feed", "Animal Feed"],
    ["fertilizer-production", "Fertilizer Production"],
    ["mining-materials", "Mining Materials"],
    ["refractory-materials", "Refractory Materials"],
    ["cement-products", "Cement Products"],
    ["powder-handling", "Powder Handling"],
  ];

  for (const [slug, title] of requiredIndustryPages) {
    const route = `/industries/${slug}`;
    const html = readGeneratedHtml(route);
    const text = visibleText(html);
    const scripts = jsonLdScripts(html);
    const types = scripts.map((script) => script["@type"]);

    assert(html.includes(`<h1`), `${route} must include an H1`);
    assert(text.includes(title), `${route} must include the industry name`);
    assert(text.includes("Industry pain points"), `${route} missing pain point section`);
    assert(text.includes("Automatic depalletizing solution"), `${route} missing depalletizing section`);
    assert(text.includes("Automatic feeding solution"), `${route} missing feeding section`);
    assert(text.includes("Automatic palletizing solution"), `${route} missing palletizing section`);
    assert(text.includes("FAQ"), `${route} missing FAQ section`);
    assert(text.includes("Request Engineering Review"), `${route} missing CTA`);
    assert(wordCount(text) >= 1500, `${route} must contain at least 1500 English words`);
    assert(html.includes(`<loc>${expectedHost}${route}</loc>`) || readGeneratedBody("sitemap.xml").includes(`<loc>${expectedHost}${route}</loc>`), `${route} missing from sitemap`);
    assert(html.includes('href="/products/') || html.includes('href="/products"'), `${route} missing product internal links`);
    assert(html.includes('href="/contact"'), `${route} missing contact internal link`);
    assert(types.includes("Organization"), `${route} missing Organization JSON-LD`);
    assert(types.includes("BreadcrumbList"), `${route} missing BreadcrumbList JSON-LD`);
    assert(types.includes("WebPage"), `${route} missing WebPage JSON-LD`);
    assert(types.includes("FAQPage"), `${route} missing FAQPage JSON-LD`);
    assert(canonicalFor(html) === `${expectedHost}${route}`, `${route} canonical must match route`);
  }
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
