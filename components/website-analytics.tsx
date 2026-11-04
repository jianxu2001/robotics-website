"use client";

import Script from "next/script";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { analyticsPage, setAnalyticsSink, trackAnalytics, validMeasurementId } from "@/lib/analytics";
import { siteSettings } from "@/lib/site-settings";

const key = "scr-analytics-consent-v1";
const changed = "scr-analytics-choice";
const settings = "scr-analytics-settings";
type Choice = "accepted" | "rejected" | null;
type TagWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
function readChoice(): Choice {
  try { const value = localStorage.getItem(key); return value === "accepted" || value === "rejected" ? value : null; } catch { return null; }
}
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback); window.addEventListener(changed, callback);
  return () => { window.removeEventListener("storage", callback); window.removeEventListener(changed, callback); };
}
const serverChoice = () => null;
const measurementId = siteSettings.enhancedMeasurementDisabled
  ? validMeasurementId(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || siteSettings.gaMeasurementId)
  : "";

export function AnalyticsPreferencesButton() {
  if (!measurementId) return null;
  return <button type="button" onClick={() => window.dispatchEvent(new Event(settings))} className="ml-4 underline underline-offset-4">Analytics / 统计设置</button>;
}

export function WebsiteAnalytics() {
  const pathname = usePathname();
  const choice = useSyncExternalStore(subscribe, readChoice, serverChoice);
  const [showSettings, setShowSettings] = useState(false);
  const lastPage = useRef("");
  const zh = pathname === "/zh" || pathname.startsWith("/zh/");
  useEffect(() => {
    const open = () => setShowSettings(true);
    window.addEventListener(settings, open);
    return () => window.removeEventListener(settings, open);
  }, []);
  useEffect(() => {
    if (!measurementId || choice !== "accepted") { setAnalyticsSink(null); return; }
    const tag = window as TagWindow;
    tag.dataLayer ??= [];
    // gtag's documented queue uses the arguments object.
    // eslint-disable-next-line prefer-rest-params
    tag.gtag ??= function () { tag.dataLayer?.push(arguments); };
    tag.gtag("consent", "default", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
    tag.gtag("js", new Date());
    const page = analyticsPage(document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href, window.location.pathname, document.referrer);
    if (!page) return;
    tag.gtag("config", measurementId, { ...page, send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false });
    setAnalyticsSink((name, params) => {
      const page = analyticsPage(document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href, window.location.pathname, document.referrer);
      if (page) tag.gtag?.("event", name, { ...page, ...params, send_to: measurementId });
    });
    return () => setAnalyticsSink(null);
  }, [choice]);
  useEffect(() => {
    if (!measurementId || choice !== "accepted") return;
    const page = analyticsPage(document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href, pathname, document.referrer);
    if (page && lastPage.current !== page.page_location) {
      (window as TagWindow).gtag?.("set", page);
      (window as TagWindow).gtag?.("event", "page_view", { ...page, send_to: measurementId });
      lastPage.current = page.page_location;
    }
  }, [pathname, choice]);
  useEffect(() => {
    if (!measurementId || choice !== "accepted") return;
    const played = new WeakSet<HTMLVideoElement>();
    const click = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(link instanceof HTMLAnchorElement)) return;
      const language = window.location.pathname.startsWith("/zh") ? "zh" : "en";
      if (link.protocol === "tel:") trackAnalytics("contact_click", { contact_method: "phone", language });
      else if (link.protocol === "mailto:") trackAnalytics("contact_click", { contact_method: "email", language });
      else if (link.hostname === "wa.me" && link.pathname === "/8613266005525") trackAnalytics("contact_click", { contact_method: "whatsapp", language });
      else if (link.origin === window.location.origin && /^\/catalogs\/[^/]+\.pdf$/.test(link.pathname)) trackAnalytics("catalog_download", { language });
    };
    const play = (event: Event) => {
      const video = event.target;
      if (!(video instanceof HTMLVideoElement) || played.has(video)) return;
      const name = video.dataset.caseVideo;
      if (name === "sch100" || name === "stc10" || name === "cr50l") {
        played.add(video); trackAnalytics("video_start", { video_name: name, language: window.location.pathname.startsWith("/zh") ? "zh" : "en" });
      }
    };
    document.addEventListener("click", click); document.addEventListener("play", play, true);
    return () => { document.removeEventListener("click", click); document.removeEventListener("play", play, true); };
  }, [choice]);
  function choose(value: Exclude<Choice, null>) {
    try { localStorage.setItem(key, value); } catch {}
    window.dispatchEvent(new Event(changed)); setShowSettings(false);
    if (value === "rejected" && choice === "accepted") {
      setAnalyticsSink(null);
      for (const cookie of document.cookie.split(";")) {
        const name = cookie.split("=")[0].trim();
        if (/^_ga(?:_|$)/.test(name)) for (const domain of ["", "; domain=.scr-robot.com", "; domain=www.scr-robot.com"]) document.cookie = name + "=; max-age=0; path=/" + domain;
      }
      window.location.reload();
    }
  }
  if (!measurementId) return null;
  return <>
    {choice === "accepted" && <Script id="scr-ga4" src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />}
    {(choice === null || showSettings) && <section aria-label={zh ? "访问统计选择" : "Analytics choice"} className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-3xl rounded-xl border border-white/20 bg-[#11171d] p-5 text-white shadow-2xl">
      <p className="font-semibold">{zh ? "允许访问与咨询统计？" : "Allow website analytics?"}</p>
      <p className="mt-2 text-sm leading-6 text-white/65">{zh ? "用于了解哪些页面带来咨询。姓名、电话、邮箱和项目正文不会发送到统计平台。选择不影响联系与询盘功能。" : "Help us understand which pages lead to enquiries. We do not send your name, phone, email or project message to analytics. Contact and enquiry features work with either choice."}</p>
      <a href={zh ? "/zh/privacy" : "/privacy"} className="mt-2 inline-block text-sm text-[#f5b41b] underline underline-offset-4">{zh ? "隐私与统计说明（Google Analytics）" : "Privacy & analytics details (Google Analytics)"}</a>
      {choice === "accepted" && <p className="mt-2 text-xs text-white/60">{zh ? "关闭统计会刷新页面，请先保存未提交的内容。" : "Turning analytics off reloads this page. Save any unsubmitted details first."}</p>}
      <div className="mt-4 flex flex-wrap gap-3"><button type="button" onClick={() => choose("accepted")} className="rounded-lg bg-[#f5b41b] px-4 py-2.5 text-sm font-semibold text-black">{zh ? "允许访问统计" : "Allow analytics"}</button><button type="button" onClick={() => choose("rejected")} className="rounded-lg border border-white/30 px-4 py-2.5 text-sm">{zh ? "仅必要功能" : "Necessary only"}</button></div>
    </section>}
  </>;
}
