import test from "node:test";
import assert from "node:assert/strict";
import "./register-paths.mjs";
const { cleanSourcePath, getInquiryTopic, projectContactHref, photoContactLinks } = await import("../lib/contact-context.ts");
const { analyticsPage, safeEventParams, setAnalyticsSink, trackAnalytics, validMeasurementId } = await import("../lib/analytics.ts");
const { normalizeInquiry, buildPlainText, buildHtml } = await import("../lib/inquiry.ts");

test("project links preserve the reviewed task and source, without arbitrary URL data", () => {
  assert.equal(getInquiryTopic("bag-opening-feeding"), "bag-opening-feeding");
  assert.equal(getInquiryTopic("arbitrary buyer input"), undefined);
  assert.equal(getInquiryTopic("__proto__"), undefined);
  assert.equal(cleanSourcePath("https://other.example/contact"), "");
  assert.equal(cleanSourcePath("/contact?email=private@example.com#name"), "/contact");
  assert.equal(cleanSourcePath("/contact/person@example.com"), "");
  const url = new URL(projectContactHref("/solutions/bag-depalletizing-system", "bag-depalletizing"), "https://www.scr-robot.com");
  assert.equal(url.searchParams.get("topic"), "bag-depalletizing");
  assert.equal(url.searchParams.get("source"), "/solutions/bag-depalletizing-system");
  assert.equal(url.hash, "#inquiry");
});
test("the carton palletizing solution preserves the carton application and its source", async () => {
  const { solutionPages } = await import("../lib/solution-pages.ts");
  const slug = "robotic-carton-palletizing-system";
  const page = solutionPages.find((p) => p.slug === slug);
  assert.equal(page.inquiryTopic, "carton-palletizing");
  const url = new URL(projectContactHref(`/solutions/${slug}`, page.inquiryTopic), "https://www.scr-robot.com");
  assert.equal(url.searchParams.get("topic"), "carton-palletizing");
  assert.equal(url.searchParams.get("source"), `/solutions/${slug}`);
  assert.ok(page.internalLinks.some((link) => link.href === "/products/cr-series"));
  assert.ok(page.internalLinks.some((link) => link.href === "/case-studies/cr50l-lifting-carton-palletizing"));
});

test("photo handoff opens the known sales channels with task and model context", () => {
  const links = photoContactLinks("zh", { topic:"bag-opening-feeding", model:"SCH100-1950-1800", sourcePath:"/products/sch-series/sch100-1950-1800" });
  const whatsapp = new URL(links.whatsapp);
  assert.equal(whatsapp.hostname, "wa.me");
  assert.equal(whatsapp.pathname, "/8613266005525");
  assert.match(whatsapp.searchParams.get("text"), /SCH100-1950-1800/);
  assert.match(whatsapp.searchParams.get("text"), /拆包投料/);
  assert.match(links.email, /^mailto:jianxu2001@gmail\.com\?/);
});
test("inquiry receipt includes source and reference in the sales copy", () => {
  const inquiry = { ...normalizeInquiry({sourcePath:"/solutions/bag-depalletizing-system?email=secret@example.com"}), reference:"SCR-local-test" };
  assert.equal(inquiry.sourcePath, "/solutions/bag-depalletizing-system");
  assert.match(buildPlainText(inquiry), /Reference: SCR-local-test/);
  assert.match(buildHtml(inquiry), /SCR-local-test/);
  assert.ok(!buildPlainText(inquiry).includes("secret@example.com"));
});
test("analytics allowlist drops personal fields, URL text, messages and receipt references", () => {
  const clean = safeEventParams({ language:"zh", inquiry_topic:"bag-depalletizing", contact_method:"email", name:"Private Buyer", email:"private@example.com", phone:"13800000000", message:"private project", reference:"SCR-private", page_location:"https://private.example?email=private" });
  assert.deepEqual(clean, {language:"zh", inquiry_topic:"bag-depalletizing", contact_method:"email"});
  assert.equal(validMeasurementId("not-a-measurement"), "");
  assert.equal(validMeasurementId(undefined), "");
});
test("tracking is inactive without a consented sink and preserves event distinctions", () => {
  const recorded = [];
  setAnalyticsSink(null); trackAnalytics("generate_lead", { delivery_result:"acknowledged" });
  assert.equal(recorded.length, 0);
  setAnalyticsSink((event, params) => recorded.push({event,params}));
  trackAnalytics("contact_click", { contact_method:"whatsapp" });
  trackAnalytics("inquiry_error", { delivery_result:"unconfirmed" });
  trackAnalytics("generate_lead", { delivery_result:"acknowledged" });
  setAnalyticsSink(null);
  assert.deepEqual(recorded.map((row) => row.event), ["contact_click", "inquiry_error", "generate_lead"]);
});
test("page analytics excludes query strings and sends only the referrer origin", () => {
  assert.equal(analyticsPage(undefined, "/contact"), null);
  assert.equal(analyticsPage("https://other.example/contact", "/contact"), null);
  assert.equal(analyticsPage("https://www.scr-robot.com/contact?email=private", "/contact"), null);
  assert.deepEqual(analyticsPage("https://www.scr-robot.com/contact", "/contact", "https://www.google.com/search?q=private"), {page_location:"https://www.scr-robot.com/contact", page_referrer:"https://www.google.com/"});
});

test("carton application navigation leads to the carton solution with a direct inquiry path", async () => {
  const { industrySolutions, industrySolutionsZh } = await import("../lib/industry-solutions.ts");
  const { solutionPages } = await import("../lib/solution-pages.ts");
  const carton = industrySolutions.find((entry) => entry.slug === "palletizing");
  const page = solutionPages.find((entry) => `/solutions/${entry.slug}` === carton.detailLink?.href);
  assert.equal(page?.inquiryTopic, "carton-palletizing");
  assert.ok(carton.recommendedSeries.includes("CR Series"));
  assert.ok(industrySolutionsZh.find((entry) => entry.slug === "palletizing").recommendedSeries.includes("CR Series"));
});
