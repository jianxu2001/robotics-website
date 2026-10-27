import test from "node:test";
import assert from "node:assert/strict";
import {
  buildHtml,
  buildPlainText,
  normalizeInquiry,
  validateInquiry,
} from "../lib/inquiry.ts";

const submittedAt = "2026-07-15T08:00:00.000Z";

test("Chinese buyers can submit phone-only contact while English email remains required", () => {
  const payload = { locale: "zh", name: "陈先生", phone: "13800138000", message: "请评估我们生产线的冲压上下料项目。" };
  assert.equal(validateInquiry(normalizeInquiry(payload)), "");
  assert.match(validateInquiry(normalizeInquiry({ ...payload, email: "invalid" })), /有效邮箱/);
  assert.match(validateInquiry(normalizeInquiry({ ...payload, locale: "en" })), /valid company email/);
  assert.match(validateInquiry(normalizeInquiry({ ...payload, name: " " })), /姓名/);
  assert.match(validateInquiry(normalizeInquiry({ ...payload, message: "短" })), /项目需求/);
});

test("Chinese inquiries require phone while English inquiries keep it optional", () => {
  const payload = {
    name: "Test buyer",
    email: "buyer@example.com",
    message: "Please review our palletizing requirements.",
  };
  assert.equal(validateInquiry(normalizeInquiry(payload)), "");
  assert.match(validateInquiry(normalizeInquiry({ ...payload, locale: "zh", phone: "  " })), /手机号码/);
  const inquiry = normalizeInquiry({ ...payload, locale: "zh", phone: "13800138000" });
  assert.equal(validateInquiry(inquiry), "");
  assert.equal(inquiry.whatsapp, "");
  assert.match(buildPlainText(inquiry), /Phone \/ 手机号码: 13800138000/);
  assert.match(buildHtml(inquiry), /13800138000/);
});

test("phone numbers remain independent from WhatsApp and are escaped in emails", () => {
  const inquiry = normalizeInquiry({ phone: " +44  20 7946 0958 ", whatsapp: "+86 13800000000" });
  assert.equal(inquiry.phone, "+44 20 7946 0958");
  assert.equal(inquiry.whatsapp, "+86 13800000000");
  assert.equal(normalizeInquiry({ phone: 123 }).phone, "");
  assert.equal(normalizeInquiry({ phone: "1".repeat(100) }).phone.length, 80);
  assert.match(buildHtml(normalizeInquiry({ phone: "<script>" })), /&lt;script&gt;/);
});

test("inquiry normalization keeps every engineering field", () => {
  const inquiry = normalizeInquiry(
    {
      locale: " zh ",
      name: "  Ada   Chen  ",
      email: " sales@example.com ",
      phone: " 13800138000 ",
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
    phone: "13800138000",
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
