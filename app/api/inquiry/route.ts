import { NextResponse } from "next/server";
import { salesEmail } from "@/lib/contact";
import {
  buildHtml,
  buildPlainText,
  normalizeInquiry,
  validateInquiry,
  type Inquiry,
  type InquiryPayload,
} from "@/lib/inquiry";

export async function POST(request: Request) {
  let body: InquiryPayload;

  try {
    body = (await request.json()) as InquiryPayload;
  } catch {
    return NextResponse.json({ message: "Invalid inquiry payload." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
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
    const message = inquiry.locale === "zh"
      ? "暂未能确认提交结果，请通过电话或邮箱确认。"
      : "We could not confirm submission. Please contact us by phone or email.";

    return NextResponse.json({ message }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
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
      signal: AbortSignal.timeout(12_000),
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        bcc: bcc.length ? bcc : undefined,
        ...(inquiry.email ? { reply_to: inquiry.email } : {}),
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
      signal: AbortSignal.timeout(12_000),
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
