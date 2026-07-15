import test from "node:test";
import assert from "node:assert/strict";
import {
  buildHtml,
  buildPlainText,
  normalizeInquiry,
} from "../lib/inquiry.ts";

const submittedAt = "2026-07-15T08:00:00.000Z";

test("inquiry normalization keeps every engineering field", () => {
  const inquiry = normalizeInquiry(
    {
      locale: " zh ",
      name: "  Ada   Chen  ",
      email: " sales@example.com ",
      whatsapp: " +86  13800000000 ",
      company: " SCR   Automation ",
      application: " Palletizing ",
      series: " ECR Series ",
      message: "Need a complete cell.\r\nPlease review the layout.  ",
      productSize: " 600 x 400 x 300 mm ",
      productWeight: " 25 kg ",
      targetThroughput: " 600 bags/hour ",
      palletSize: " 1200 x 1000 mm ",
      layoutCondition: " Left infeed, 20 m2 available ",
      destinationCountry: " Indonesia ",
    },
    submittedAt,
  );

  assert.deepEqual(inquiry, {
    locale: "zh",
    name: "Ada Chen",
    email: "sales@example.com",
    whatsapp: "+86 13800000000",
    company: "SCR Automation",
    application: "Palletizing",
    series: "ECR Series",
    message: "Need a complete cell.\nPlease review the layout.",
    productSize: "600 x 400 x 300 mm",
    productWeight: "25 kg",
    targetThroughput: "600 bags/hour",
    palletSize: "1200 x 1000 mm",
    layoutCondition: "Left infeed, 20 m2 available",
    destinationCountry: "Indonesia",
    submittedAt,
  });
});

test("inquiry emails include every engineering field", () => {
  const inquiry = normalizeInquiry(
    {
      name: "Ada Chen",
      email: "sales@example.com",
      whatsapp: "+86 13800000000",
      company: "SCR Automation",
      application: "Palletizing",
      series: "ECR Series",
      message: "Need a complete palletizing cell.",
      productSize: "600 x 400 x 300 mm",
      productWeight: "25 kg",
      targetThroughput: "600 bags/hour",
      palletSize: "1200 x 1000 mm",
      layoutCondition: "Left infeed",
      destinationCountry: "Indonesia",
    },
    submittedAt,
  );

  const plainText = buildPlainText(inquiry);
  const html = buildHtml(inquiry);

  for (const value of [
    "+86 13800000000",
    "600 x 400 x 300 mm",
    "25 kg",
    "600 bags/hour",
    "1200 x 1000 mm",
    "Left infeed",
    "Indonesia",
  ]) {
    assert.match(plainText, new RegExp(value.replace(/[+]/g, "\\+")));
    assert.match(html, new RegExp(value.replace(/[+]/g, "\\+")));
  }
});

test("HTML inquiry output escapes submitted content", () => {
  const inquiry = normalizeInquiry(
    {
      name: "Ada <Admin>",
      email: "sales@example.com",
      company: "SCR & Partners",
      message: "Please review <script>alert('x')</script> now.",
    },
    submittedAt,
  );

  const html = buildHtml(inquiry);

  assert.match(html, /Ada &lt;Admin&gt;/);
  assert.match(html, /SCR &amp; Partners/);
  assert.doesNotMatch(html, /<script>/);
  assert.match(html, /&lt;script&gt;alert\(&#039;x&#039;\)&lt;\/script&gt;/);
});
