"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { salesEmail, whatsappUrl } from "@/lib/contact";
import { buildPlainText, normalizeInquiry } from "@/lib/inquiry";
import { cleanSourcePath, getInquiryTopic, inquiryTopics, photoContactLinks } from "@/lib/contact-context";
import { trackAnalytics } from "@/lib/analytics";

type InquiryFormProps = {
  locale?: "en" | "zh";
  seriesOptions: string[];
  applicationOptions: string[];
  modelOptions: { key: string; name: string; application: string }[];
};

type SubmitState = {
  status: "idle" | "submitting" | "success" | "error";
  message: string;
  showFallback?: boolean;
  reference?: string;
};

const copy = {
  en: {
    quickInquiry: "Quick Inquiry",
    name: "Name",
    namePlaceholder: "Your name",
    email: "Company Email",
    emailPlaceholder: "name@company.com",
    phone: "Phone / Mobile Number (optional)",
    phonePlaceholder: "+Country code and phone number",
    phoneHint: "Please include your country code so our engineers can contact you.",
    whatsapp: "WhatsApp (optional)",
    whatsappPlaceholder: "+Country code and number",
    company: "Company / Website",
    companyPlaceholder: "Company name or website",
    productType: "Product Type",
    series: "Preferred series / model",
    notSure: "Not sure",
    details: "Message (at least 10 characters)",
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
    success: "Inquiry sent. We will review the project data and contact you as soon as possible.",
    error:
      "We could not confirm submission. Your details are still here. Contact us by email, phone or WhatsApp to confirm receipt.",
    emailSales: "Email Sales",
    whatsappCta: "WhatsApp",
    phoneCta: "Call Sales",
    invalid: "Please check your contact information and project details.",
    copyDetails: "Copy Project Details",
    copied: "Project details copied",
    copyFailed: "Please copy the information from the form above.",
    privacyNote: "We use the information you submit to contact you about this project.",
    photosTitle: "Have product photos or a site video?",
    photosHint: "Attach them in WhatsApp or your email app. You can also send a short enquiry below.",
    photosWhatsapp: "Send Photos on WhatsApp",
    photosEmail: "Email Photos / Layout",
    additionalContact: "Company and alternative contacts (optional)",
    unavailable: "Online submission is temporarily unavailable. Please send your project by email, phone or WhatsApp.",
    reference: "Enquiry reference",
  },
  zh: {
    quickInquiry: "快速询盘",
    name: "姓名",
    namePlaceholder: "您的姓名",
    email: "公司邮箱（选填）",
    emailPlaceholder: "name@company.com",
    phone: "手机号码（必填）",
    phonePlaceholder: "请输入您的常用手机号码",
    phoneHint: "方便工程师电话沟通您的需求，无需开通 WhatsApp。",
    whatsapp: "WhatsApp（选填）",
    whatsappPlaceholder: "国家代码和号码",
    company: "公司 / 网站",
    companyPlaceholder: "公司名称或官网",
    productType: "产品类型",
    series: "倾向系列 / 型号",
    notSure: "暂不确定",
    details: "项目需求（至少 10 个字符）",
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
    success: "询盘已提交，我们会尽快通过您留下的电话或邮箱联系您。",
    error: "暂未能确认提交结果，填写的资料已保留。您可以电话或邮件确认是否收到，或复制项目资料后联系我们。",
    emailSales: "邮件联系",
    whatsappCta: "WhatsApp",
    phoneCta: "电话联系",
    invalid: "请检查联系方式和项目需求。",
    copyDetails: "复制项目资料",
    copied: "项目资料已复制",
    copyFailed: "请手动复制上方表单中的资料。",
    privacyNote: "您提交的信息将用于联系您并评估本次项目需求。",
    photosTitle: "有产品照片或现场视频？",
    photosHint: "可在 WhatsApp 或邮件应用中附上资料，也可以先填写下方简短需求。",
    photosWhatsapp: "通过 WhatsApp 发照片",
    photosEmail: "通过邮件发照片 / 布局",
    additionalContact: "公司与备用联系方式（选填）",
    unavailable: "在线提交暂不可用，请通过电话、邮件或 WhatsApp 发送项目需求。",
    reference: "询盘参考编号",
  },
};

export function InquiryForm({
  locale = "en",
  seriesOptions,
  applicationOptions,
  modelOptions,
}: InquiryFormProps) {
  const t = copy[locale];
  const params = useSearchParams();
  const modelKey = params.get("model");
  const topic = getInquiryTopic(params.get("topic"));
  const sourcePath = cleanSourcePath(params.get("source")) || (locale === "zh" ? "/zh/contact" : "/contact");
  const inquiryModel = modelOptions.find((model) => model.key === modelKey);
  const [choice, setChoice] = useState<{ key: string | null | undefined; value: string }>({ key: undefined, value: "" });
  const selectedSeries = choice.key === modelKey ? choice.value : inquiryModel?.name ?? t.notSure;
  const [state, setState] = useState<SubmitState>({ status: "idle", message: "" });
  const [fallbackBody, setFallbackBody] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const [acceptingInquiries, setAcceptingInquiries] = useState<boolean | null>(null);
  const started = useRef(false);
  const contextApplication = topic ? inquiryTopics[topic][locale] : inquiryModel?.application ?? "";
  const photoLinks = photoContactLinks(locale, { topic, sourcePath, model: selectedSeries !== t.notSure ? selectedSeries : "" });
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/inquiry", { signal: controller.signal, cache: "no-store" })
      .then((response) => response.ok ? response.json() : null)
      .then((result) => { if (typeof result?.acceptingInquiries === "boolean") setAcceptingInquiries(result.acceptingInquiries); })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  const mailtoHref = useMemo(
    () => `mailto:${salesEmail}?subject=Industrial%20Robot%20Project%20Inquiry${fallbackBody ? `&body=${encodeURIComponent(fallbackBody)}` : ""}`,
    [fallbackBody],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    trackAnalytics("inquiry_attempt", { language: locale, inquiry_topic: topic });
    setState({ status: "submitting", message: "" });

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    setFallbackBody(buildPlainText(normalizeInquiry({ ...payload, locale })));
    setCopyStatus("");

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20_000);
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, locale }),
        signal: controller.signal,
      });

      if (response.status === 400) {
        trackAnalytics("inquiry_error", { language: locale, inquiry_topic: topic, delivery_result: "validation_error" });
        const result = await response.json();
        setState({ status: "error", message: typeof result.message === "string" ? result.message : t.invalid });
        return;
      }
      if (!response.ok) {
        throw new Error("Inquiry delivery failed.");
      }
      const result = await response.json();
      if (result.ok !== true) throw new Error("Inquiry acknowledgement missing.");

      form.reset();
      if (!payload.website && typeof result.reference === "string" && /^SCR-[0-9a-f-]{36}$/i.test(result.reference)) {
        trackAnalytics("generate_lead", { language: locale, inquiry_topic: topic, delivery_result: "acknowledged" });
      }
      setState({ status: "success", message: t.success, reference: typeof result.reference === "string" ? result.reference : undefined });
    } catch {
      trackAnalytics("inquiry_error", { language: locale, inquiry_topic: topic, delivery_result: "unconfirmed" });
      setState({ status: "error", message: t.error, showFallback: true });
    } finally {
      window.clearTimeout(timeout);
    }
  }

  return <>
    <section aria-label={t.photosTitle} className="mb-6 rounded-lg border border-[#f5b41b]/25 bg-[#f5b41b]/5 p-5">
      <h2 className="font-semibold text-white">{t.photosTitle}</h2>
      <p className="mt-2 text-sm leading-6 text-white/60">{acceptingInquiries === false ? (locale === "zh" ? "请在 WhatsApp 或邮件应用中附上产品照片、视频或布局。" : "Attach product photos, a site video or layout in WhatsApp or your email app.") : t.photosHint}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <a href={photoLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="rounded-md bg-[#f5b41b] px-4 py-3 text-sm font-semibold text-black">{t.photosWhatsapp}</a>
        <a href={photoLinks.email} className="rounded-md border border-white/20 px-4 py-3 text-sm font-semibold text-white">{t.photosEmail}</a>
      </div>
    </section>
    {acceptingInquiries === false ? <p role="status" className="rounded-lg border border-[#f5b41b]/30 p-5 leading-7 text-white/75">{t.unavailable}<br /><a href="tel:+8613266005525" className="text-[#ffd36b]">+86 13266005525</a></p> :
    <form onSubmit={handleSubmit} onFocusCapture={(event) => {
      if (!started.current && /^(INPUT|SELECT|TEXTAREA)$/.test(event.target.tagName)) {
        started.current = true; trackAnalytics("inquiry_start", { language: locale, inquiry_topic: topic });
      }
    }} aria-busy={state.status === "submitting"} className="grid gap-5">
      <input type="hidden" name="sourcePath" value={sourcePath} />
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
      {inquiryModel && selectedSeries === inquiryModel.name ? <p className="rounded-lg border border-[#f5b41b]/30 bg-[#f5b41b]/8 px-4 py-3 text-sm text-white/75">{locale === "zh" ? "当前咨询型号：" : "Enquiring about: "}<strong className="font-semibold text-[#ffd36b]">{inquiryModel.name}</strong></p> : null}

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-white/72">
          {t.name}
          <input
            name="name"
            required
            autoComplete="name"
            maxLength={120}
            className="h-12 rounded-md border border-white/12 bg-black/24 px-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#f5b41b]"
            placeholder={t.namePlaceholder}
          />
        </label>
        <label className="grid gap-2 text-sm text-white/72">
          {t.phone}
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            required={locale === "zh"}
            pattern={locale === "zh" ? ".*\\S.*" : undefined}
            maxLength={80}
            aria-describedby="inquiry-phone-hint"
            className="h-12 rounded-md border border-white/12 bg-black/24 px-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#f5b41b]"
            placeholder={t.phonePlaceholder}
          />
          <span id="inquiry-phone-hint" className="text-xs text-white/60">{t.phoneHint}</span>
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-white/72">
          {t.email}
          <input
            name="email"
            type="email"
            autoComplete="email"
            maxLength={160}
            required={locale !== "zh"}
            className="h-12 rounded-md border border-white/12 bg-black/24 px-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#f5b41b]"
            placeholder={t.emailPlaceholder}
          />
        </label>
      </div>
      <details className="rounded-lg border border-white/12 p-4">
        <summary className="cursor-pointer text-sm font-semibold text-white/65">{t.additionalContact}</summary>
        <div className="mt-4 grid gap-5">
        <label className="grid gap-2 text-sm text-white/72">
          {t.whatsapp}
          <input
            name="whatsapp"
            type="tel"
            className="h-12 rounded-md border border-white/12 bg-black/24 px-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#f5b41b]"
            placeholder={t.whatsappPlaceholder}
          />
        </label>

      <div className="grid gap-5">
        <label className="grid gap-2 text-sm text-white/72">
          {t.company}
          <input
            name="company"
            autoComplete="organization"
            maxLength={180}
            className="h-12 rounded-md border border-white/12 bg-black/24 px-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#f5b41b]"
            placeholder={t.companyPlaceholder}
          />
        </label>
      </div>

        </div>
      </details>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-white/72">
          {t.productType}
          <select
            key={contextApplication || "no-application"}
            name="application"
            className="h-12 rounded-md border border-white/12 bg-black/24 px-4 text-white outline-none transition focus:border-[#f5b41b]"
            defaultValue={contextApplication}
          >
            <option value="">{locale === "zh" ? "请选择用途" : "Select an application"}</option>
            {contextApplication && !applicationOptions.includes(contextApplication) ? <option>{contextApplication}</option> : null}
            {applicationOptions.map((application) => (
              <option key={application}>{application}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm text-white/72">
          {t.series}
          <select
            key={inquiryModel?.key ?? "no-model"}
            name="series"
            className="h-12 rounded-md border border-white/12 bg-black/24 px-4 text-white outline-none transition focus:border-[#f5b41b]"
            value={selectedSeries}
            onChange={(event) => setChoice({ key: modelKey, value: event.target.value })}
          >
            <option>{t.notSure}</option>
            {inquiryModel && !seriesOptions.includes(inquiryModel.name) ? <option>{inquiryModel.name}</option> : null}
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
          maxLength={3000}
          className="rounded-md border border-white/12 bg-black/24 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-[#f5b41b]"
          placeholder={t.detailsPlaceholder}
        />
      </label>

      <details className="rounded-lg border border-white/12 p-4">
      <summary className="cursor-pointer text-sm font-semibold text-white/65">{t.engineeringDetails}</summary>
      <div className="mt-4 grid gap-5">

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

      </div>
      </details>

      <button
        type="submit"
        disabled={state.status === "submitting"}
        className="min-h-12 rounded-md bg-[#f5b41b] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-black transition hover:bg-[#ffca45] disabled:cursor-not-allowed disabled:opacity-65"
      >
        {state.status === "submitting" ? t.submitting : t.submit}
      </button>
      <p className="text-xs leading-6 text-white/50">{t.privacyNote}</p>

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
          {state.reference && <p className="mt-2 break-all text-xs">{t.reference}: {state.reference}</p>}
          {state.status === "error" && state.showFallback ? (
            <div className="mt-3 flex flex-wrap gap-2">
              <a className="text-[#f5b41b] underline-offset-4 hover:underline" href="tel:+8613266005525">{t.phoneCta}</a>
              <a className="text-[#f5b41b] underline-offset-4 hover:underline" href={mailtoHref}>
                {t.emailSales}
              </a>
              <a className="text-[#f5b41b] underline-offset-4 hover:underline" href={whatsappUrl}>
                {t.whatsappCta}
              </a>
              <button type="button" className="text-[#f5b41b] underline-offset-4 hover:underline" onClick={async () => {
                try {
                  await navigator.clipboard.writeText(fallbackBody);
                  setCopyStatus(t.copied);
                } catch {
                  setCopyStatus(t.copyFailed);
                }
              }}>{t.copyDetails}</button>
            </div>
          ) : null}
          {copyStatus ? <p className="mt-3 text-xs">{copyStatus}</p> : null}
        </div>
      ) : null}
    </form>}
  </>;
}
