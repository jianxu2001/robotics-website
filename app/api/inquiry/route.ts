import { NextResponse } from "next/server";
import { salesEmail } from "@/lib/contact";

type InquiryPayload = {
  locale?: string;
  name?: string;
  email?: string;
  company?: string;
  application?: string;
  series?: string;
  message?: string;
  website?: string;
};

type Inquiry = Required<Omit<InquiryPayload, "website">> & {
  submittedAt: string;
};

const maxLength = {
  name: 120,
  email: 160,
  company: 180,
  application: 120,
  series: 120,
  message: 3000,
};

export async function POST(request: Request) {
  let body: InquiryPayload;

  try {
    body = (await request.json()) as InquiryPayload;
  } catch {
    return NextResponse.json({ message: "Invalid inquiry payload." }, { status: 400 });
  }

  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const inquiry = normalizeInquiry(body);
  const validationError = validateInquiry(inquiry);

  if (validationError) {
    return NextResponse.json({ message: validationError }, { status: 400 });
  }

  const deliveries = await deliverInquiry(inquiry);
  const delivered = deliveries.some((delivery) => delivery.ok);

  if (!delivered) {
    const message =
      deliveries[0]?.message ||
      "Inquiry delivery is not configured. Please set RESEND_API_KEY or CONTACT_WEBHOOK_URL.";

    return NextResponse.json({ message }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}

function normalizeInquiry(body: InquiryPayload): Inquiry {
  return {
    locale: clean(body.locale, 8) || "en",
    name: clean(body.name, maxLength.name),
    email: clean(body.email, maxLength.email),
    company: clean(body.company, maxLength.company),
    application: clean(body.application, maxLength.application),
    series: clean(body.series, maxLength.series),
    message: cleanMessage(body.message, maxLength.message),
    submittedAt: new Date().toISOString(),
  };
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

function validateInquiry(inquiry: Inquiry) {
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

async function deliverInquiry(inquiry: Inquiry) {
  const tasks: Promise<{ ok: boolean; message?: string }>[] = [];

  if (process.env.RESEND_API_KEY) {
    tasks.push(sendWithResend(inquiry));
  }

  if (process.env.CONTACT_WEBHOOK_URL) {
    tasks.push(sendToWebhook(inquiry));
  }

  if (!tasks.length) {
    return [
      {
        ok: false,
        message: "Inquiry delivery is not configured. Please set RESEND_API_KEY or CONTACT_WEBHOOK_URL.",
      },
    ];
  }

  return Promise.all(tasks);
}

async function sendWithResend(inquiry: Inquiry) {
  try {
    const from = process.env.INQUIRY_FROM_EMAIL || "SCR Robot Website <onboarding@resend.dev>";
    const to = splitEmails(process.env.INQUIRY_TO_EMAIL || salesEmail);
    const bcc = splitEmails(process.env.INQUIRY_BCC_EMAIL || "");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        bcc: bcc.length ? bcc : undefined,
        reply_to: inquiry.email,
        subject: `[SCR Robot Inquiry] ${inquiry.application || "Project request"} - ${inquiry.name}`,
        text: buildPlainText(inquiry),
        html: buildHtml(inquiry),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { ok: false, message: errorText || "Resend delivery failed." };
    }

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Resend delivery failed.",
    };
  }
}

async function sendToWebhook(inquiry: Inquiry) {
  try {
    const response = await fetch(process.env.CONTACT_WEBHOOK_URL as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.CONTACT_WEBHOOK_SECRET
          ? { Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_SECRET}` }
          : {}),
      },
      body: JSON.stringify({
        source: "scr-robot.com",
        ...inquiry,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { ok: false, message: errorText || "Webhook delivery failed." };
    }

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Webhook delivery failed.",
    };
  }
}

function splitEmails(value: string) {
  return value
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

function buildPlainText(inquiry: Inquiry) {
  return [
    "New SCR Robot website inquiry",
    "",
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Company: ${inquiry.company || "-"}`,
    `Application: ${inquiry.application || "-"}`,
    `Preferred series: ${inquiry.series || "-"}`,
    `Language: ${inquiry.locale}`,
    `Submitted at: ${inquiry.submittedAt}`,
    "",
    "Project details:",
    inquiry.message,
  ].join("\n");
}

function buildHtml(inquiry: Inquiry) {
  const rows = [
    ["Name", inquiry.name],
    ["Email", inquiry.email],
    ["Company", inquiry.company || "-"],
    ["Application", inquiry.application || "-"],
    ["Preferred series", inquiry.series || "-"],
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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
