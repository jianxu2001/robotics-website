export type InquiryPayload = {
  locale?: string;
  name?: string;
  email?: string;
  whatsapp?: string;
  company?: string;
  application?: string;
  series?: string;
  message?: string;
  productSize?: string;
  productWeight?: string;
  targetThroughput?: string;
  palletSize?: string;
  layoutCondition?: string;
  destinationCountry?: string;
  website?: string;
};

export type Inquiry = Required<Omit<InquiryPayload, "website">> & {
  submittedAt: string;
};

const maxLength = {
  name: 120,
  email: 160,
  whatsapp: 80,
  company: 180,
  application: 120,
  series: 120,
  message: 3000,
  productSize: 120,
  productWeight: 80,
  targetThroughput: 120,
  palletSize: 120,
  layoutCondition: 240,
  destinationCountry: 120,
};

export function normalizeInquiry(
  body: InquiryPayload,
  submittedAt = new Date().toISOString(),
): Inquiry {
  return {
    locale: clean(body.locale, 8) || "en",
    name: clean(body.name, maxLength.name),
    email: clean(body.email, maxLength.email),
    whatsapp: clean(body.whatsapp, maxLength.whatsapp),
    company: clean(body.company, maxLength.company),
    application: clean(body.application, maxLength.application),
    series: clean(body.series, maxLength.series),
    message: cleanMessage(body.message, maxLength.message),
    productSize: clean(body.productSize, maxLength.productSize),
    productWeight: clean(body.productWeight, maxLength.productWeight),
    targetThroughput: clean(body.targetThroughput, maxLength.targetThroughput),
    palletSize: clean(body.palletSize, maxLength.palletSize),
    layoutCondition: clean(body.layoutCondition, maxLength.layoutCondition),
    destinationCountry: clean(
      body.destinationCountry,
      maxLength.destinationCountry,
    ),
    submittedAt,
  };
}

export function validateInquiry(inquiry: Inquiry) {
  if (!inquiry.name) {
    return "Please enter your name.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)) {
    return "Please enter a valid company email.";
  }

  if (inquiry.message.length < 10) {
    return "Please add project details.";
  }

  return "";
}

export function buildPlainText(inquiry: Inquiry) {
  return [
    "New SCR Robot website inquiry",
    "",
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `WhatsApp: ${inquiry.whatsapp || "-"}`,
    `Company: ${inquiry.company || "-"}`,
    `Application: ${inquiry.application || "-"}`,
    `Preferred series: ${inquiry.series || "-"}`,
    `Product size: ${inquiry.productSize || "-"}`,
    `Product weight: ${inquiry.productWeight || "-"}`,
    `Target throughput: ${inquiry.targetThroughput || "-"}`,
    `Pallet size: ${inquiry.palletSize || "-"}`,
    `Layout condition: ${inquiry.layoutCondition || "-"}`,
    `Destination country: ${inquiry.destinationCountry || "-"}`,
    `Language: ${inquiry.locale}`,
    `Submitted at: ${inquiry.submittedAt}`,
    "",
    "Project details:",
    inquiry.message,
  ].join("\n");
}

export function buildHtml(inquiry: Inquiry) {
  const rows = [
    ["Name", inquiry.name],
    ["Email", inquiry.email],
    ["WhatsApp", inquiry.whatsapp || "-"],
    ["Company", inquiry.company || "-"],
    ["Application", inquiry.application || "-"],
    ["Preferred series", inquiry.series || "-"],
    ["Product size", inquiry.productSize || "-"],
    ["Product weight", inquiry.productWeight || "-"],
    ["Target throughput", inquiry.targetThroughput || "-"],
    ["Pallet size", inquiry.palletSize || "-"],
    ["Layout condition", inquiry.layoutCondition || "-"],
    ["Destination country", inquiry.destinationCountry || "-"],
    ["Language", inquiry.locale],
    ["Submitted at", inquiry.submittedAt],
  ];

  return `
    <div style="font-family:Arial,sans-serif;color:#111827;line-height:1.6">
      <h2 style="margin:0 0 16px">New SCR Robot website inquiry</h2>
      <table style="border-collapse:collapse;width:100%;max-width:680px">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <td style="border:1px solid #e5e7eb;padding:10px 12px;font-weight:700;background:#f9fafb;width:180px">${escapeHtml(label)}</td>
                <td style="border:1px solid #e5e7eb;padding:10px 12px">${escapeHtml(value)}</td>
              </tr>
            `,
          )
          .join("")}
      </table>
      <h3 style="margin:24px 0 8px">Project details</h3>
      <div style="white-space:pre-wrap;border:1px solid #e5e7eb;padding:14px 16px;max-width:680px">${escapeHtml(inquiry.message)}</div>
    </div>
  `;
}

function clean(value: unknown, max: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/\s+/g, " ").trim().slice(0, max);
}

function cleanMessage(value: unknown, max: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .trim()
    .slice(0, max);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
