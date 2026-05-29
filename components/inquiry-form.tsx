"use client";

import { FormEvent, useMemo, useState } from "react";
import { salesEmail, whatsappUrl } from "@/lib/contact";

type InquiryFormProps = {
  locale?: "en" | "zh";
  seriesOptions: string[];
  applicationOptions: string[];
};

type SubmitState = {
  status: "idle" | "submitting" | "success" | "error";
  message: string;
};

const copy = {
  en: {
    name: "Name",
    namePlaceholder: "Your name",
    email: "Company Email",
    emailPlaceholder: "name@company.com",
    company: "Company / Website",
    companyPlaceholder: "Company name or website",
    application: "Application",
    series: "Preferred Series",
    notSure: "Not sure",
    details: "Project Details",
    detailsPlaceholder:
      "Product type, payload, reach, cycle time, pallet size, factory layout, destination country...",
    submit: "Send Inquiry",
    submitting: "Sending...",
    success: "Inquiry sent. We will reply by email as soon as possible.",
    error:
      "Automatic submission is not available right now. Please email us directly or contact us on WhatsApp.",
    emailSales: "Email Sales",
    whatsapp: "WhatsApp",
  },
  zh: {
    name: "姓名",
    namePlaceholder: "您的姓名",
    email: "公司邮箱",
    emailPlaceholder: "name@company.com",
    company: "公司 / 网站",
    companyPlaceholder: "公司名称或官网",
    application: "应用场景",
    series: "倾向系列",
    notSure: "暂不确定",
    details: "项目需求",
    detailsPlaceholder:
      "产品类型、负载、臂展、节拍、托盘尺寸、现场布局、目的国家...",
    submit: "发送询盘",
    submitting: "发送中...",
    success: "询盘已提交，我们会尽快通过邮件回复您。",
    error: "自动提交暂时不可用，请直接发送邮件或通过 WhatsApp 联系我们。",
    emailSales: "邮件联系",
    whatsapp: "WhatsApp",
  },
};

export function InquiryForm({
  locale = "en",
  seriesOptions,
  applicationOptions,
}: InquiryFormProps) {
  const t = copy[locale];
  const [state, setState] = useState<SubmitState>({ status: "idle", message: "" });

  const mailtoHref = useMemo(
    () => `mailto:${salesEmail}?subject=Industrial%20Robot%20Project%20Inquiry`,
    [],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: "submitting", message: "" });

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, locale }),
      });

      if (!response.ok) {
        throw new Error("Inquiry delivery failed.");
      }

      form.reset();
      setState({ status: "success", message: t.success });
    } catch {
      setState({ status: "error", message: t.error });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-white/72">
          {t.name}
          <input
            name="name"
            required
            className="h-12 rounded-md border border-white/12 bg-black/24 px-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#f5b41b]"
            placeholder={t.namePlaceholder}
          />
        </label>
        <label className="grid gap-2 text-sm text-white/72">
          {t.email}
          <input
            name="email"
            type="email"
            required
            className="h-12 rounded-md border border-white/12 bg-black/24 px-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#f5b41b]"
            placeholder={t.emailPlaceholder}
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm text-white/72">
        {t.company}
        <input
          name="company"
          className="h-12 rounded-md border border-white/12 bg-black/24 px-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#f5b41b]"
          placeholder={t.companyPlaceholder}
        />
      </label>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-white/72">
          {t.application}
          <select
            name="application"
            className="h-12 rounded-md border border-white/12 bg-black/24 px-4 text-white outline-none transition focus:border-[#f5b41b]"
            defaultValue={applicationOptions[0]}
          >
            {applicationOptions.map((application) => (
              <option key={application}>{application}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm text-white/72">
          {t.series}
          <select
            name="series"
            className="h-12 rounded-md border border-white/12 bg-black/24 px-4 text-white outline-none transition focus:border-[#f5b41b]"
            defaultValue={t.notSure}
          >
            <option>{t.notSure}</option>
            {seriesOptions.map((series) => (
              <option key={series}>{series}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="grid gap-2 text-sm text-white/72">
        {t.details}
        <textarea
          name="message"
          required
          rows={6}
          minLength={10}
          className="rounded-md border border-white/12 bg-black/24 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-[#f5b41b]"
          placeholder={t.detailsPlaceholder}
        />
      </label>

      <button
        type="submit"
        disabled={state.status === "submitting"}
        className="min-h-12 rounded-md bg-[#f5b41b] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-black transition hover:bg-[#ffca45] disabled:cursor-not-allowed disabled:opacity-65"
      >
        {state.status === "submitting" ? t.submitting : t.submit}
      </button>

      {state.status !== "idle" && state.message ? (
        <div
          className={`rounded-md border px-4 py-3 text-sm ${
            state.status === "success"
              ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-100"
              : "border-[#f5b41b]/35 bg-[#f5b41b]/10 text-white/78"
          }`}
          role="status"
        >
          <p>{state.message}</p>
          {state.status === "error" ? (
            <div className="mt-3 flex flex-wrap gap-2">
              <a className="text-[#f5b41b] underline-offset-4 hover:underline" href={mailtoHref}>
                {t.emailSales}
              </a>
              <a className="text-[#f5b41b] underline-offset-4 hover:underline" href={whatsappUrl}>
                {t.whatsapp}
              </a>
            </div>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}
