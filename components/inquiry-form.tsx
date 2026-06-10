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
    quickInquiry: "Quick Inquiry",
    name: "Name",
    namePlaceholder: "Your name",
    email: "Company Email",
    emailPlaceholder: "name@company.com",
    whatsapp: "WhatsApp",
    whatsappPlaceholder: "+Country code and number",
    company: "Company / Website",
    companyPlaceholder: "Company name or website",
    productType: "Product Type",
    series: "Preferred Series",
    notSure: "Not sure",
    details: "Message",
    detailsPlaceholder:
      "Briefly describe your product, packaging, production line, and what you need the robot to do...",
    engineeringDetails: "Engineering Details (optional — helps us respond faster)",
    productSize: "Product size",
    productSizePlaceholder: "e.g., 600×400×300 mm bag",
    productWeight: "Product weight",
    productWeightPlaceholder: "e.g., 25 kg per bag",
    targetThroughput: "Target throughput",
    targetThroughputPlaceholder: "e.g., 600 bags per hour",
    palletSize: "Pallet size",
    palletSizePlaceholder: "e.g., 1200×1000 mm",
    layoutCondition: "Layout condition",
    layoutConditionPlaceholder: "Infeed direction, floor area, constraints",
    destinationCountry: "Destination country",
    destinationCountryPlaceholder: "Country and port",
    submit: "Request Engineering Review",
    submitting: "Sending...",
    success: "Inquiry sent. We will review the project data and reply by email as soon as possible.",
    error:
      "Automatic submission is not available right now. Please email us directly or contact us on WhatsApp.",
    emailSales: "Email Sales",
    whatsappCta: "WhatsApp",
  },
  zh: {
    quickInquiry: "快速询盘",
    name: "姓名",
    namePlaceholder: "您的姓名",
    email: "公司邮箱",
    emailPlaceholder: "name@company.com",
    whatsapp: "WhatsApp",
    whatsappPlaceholder: "国家代码和号码",
    company: "公司 / 网站",
    companyPlaceholder: "公司名称或官网",
    productType: "产品类型",
    series: "倾向系列",
    notSure: "暂不确定",
    details: "留言",
    detailsPlaceholder:
      "简要描述您的产品、包装形式、产线情况和自动化需求...",
    engineeringDetails: "工程参数（选填 — 帮我们更快回复）",
    productSize: "产品尺寸",
    productSizePlaceholder: "例如：600×400×300 mm 袋装",
    productWeight: "产品重量",
    productWeightPlaceholder: "例如：25 kg/袋",
    targetThroughput: "目标产能",
    targetThroughputPlaceholder: "例如：600 袋/小时",
    palletSize: "托盘尺寸",
    palletSizePlaceholder: "例如：1200×1000 mm",
    layoutCondition: "现场布局",
    layoutConditionPlaceholder: "进出料方向、可用面积、限制条件",
    destinationCountry: "目的国家",
    destinationCountryPlaceholder: "国家和港口",
    submit: "发送询盘",
    submitting: "发送中...",
    success: "询盘已提交，我们会尽快通过邮件回复您。",
    error: "自动提交暂时不可用，请直接发送邮件或通过 WhatsApp 联系我们。",
    emailSales: "邮件联系",
    whatsappCta: "WhatsApp",
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

      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f5b41b]">
        {t.quickInquiry}
      </p>

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

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-white/72">
          {t.whatsapp}
          <input
            name="whatsapp"
            className="h-12 rounded-md border border-white/12 bg-black/24 px-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#f5b41b]"
            placeholder={t.whatsappPlaceholder}
          />
        </label>
        <label className="grid gap-2 text-sm text-white/72">
          {t.company}
          <input
            name="company"
            className="h-12 rounded-md border border-white/12 bg-black/24 px-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#f5b41b]"
            placeholder={t.companyPlaceholder}
          />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-white/72">
          {t.productType}
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
          rows={5}
          minLength={10}
          className="rounded-md border border-white/12 bg-black/24 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-[#f5b41b]"
          placeholder={t.detailsPlaceholder}
        />
      </label>

      <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-[#f5b41b]">
        {t.engineeringDetails}
      </p>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-white/72">
          {t.productSize}
          <input
            name="productSize"
            className="h-12 rounded-md border border-white/12 bg-black/24 px-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#f5b41b]"
            placeholder={t.productSizePlaceholder}
          />
        </label>
        <label className="grid gap-2 text-sm text-white/72">
          {t.productWeight}
          <input
            name="productWeight"
            className="h-12 rounded-md border border-white/12 bg-black/24 px-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#f5b41b]"
            placeholder={t.productWeightPlaceholder}
          />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-white/72">
          {t.targetThroughput}
          <input
            name="targetThroughput"
            className="h-12 rounded-md border border-white/12 bg-black/24 px-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#f5b41b]"
            placeholder={t.targetThroughputPlaceholder}
          />
        </label>
        <label className="grid gap-2 text-sm text-white/72">
          {t.palletSize}
          <input
            name="palletSize"
            className="h-12 rounded-md border border-white/12 bg-black/24 px-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#f5b41b]"
            placeholder={t.palletSizePlaceholder}
          />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-white/72">
          {t.layoutCondition}
          <input
            name="layoutCondition"
            className="h-12 rounded-md border border-white/12 bg-black/24 px-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#f5b41b]"
            placeholder={t.layoutConditionPlaceholder}
          />
        </label>
        <label className="grid gap-2 text-sm text-white/72">
          {t.destinationCountry}
          <input
            name="destinationCountry"
            className="h-12 rounded-md border border-white/12 bg-black/24 px-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#f5b41b]"
            placeholder={t.destinationCountryPlaceholder}
          />
        </label>
      </div>

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
                {t.whatsappCta}
              </a>
            </div>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}
