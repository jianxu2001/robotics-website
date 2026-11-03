export type AnalyticsEvent = "contact_click" | "catalog_download" | "video_start" | "inquiry_start" | "inquiry_attempt" | "inquiry_error" | "generate_lead";
type AnalyticsParams = {
  contact_method?: "phone" | "email" | "whatsapp";
  language?: "en" | "zh";
  inquiry_topic?: "bag-depalletizing" | "bag-opening-feeding" | "bag-palletizing" | "carton-palletizing" | "press-transfer";
  delivery_result?: "validation_error" | "unconfirmed" | "acknowledged";
  video_name?: "sch100" | "stc10" | "cr50l";
};
const allowed = {
  contact_method: ["phone", "email", "whatsapp"],
  language: ["en", "zh"],
  inquiry_topic: ["bag-depalletizing", "bag-opening-feeding", "bag-palletizing", "carton-palletizing", "press-transfer"],
  delivery_result: ["validation_error", "unconfirmed", "acknowledged"],
  video_name: ["sch100", "stc10", "cr50l"],
};
const events = new Set(["contact_click", "catalog_download", "video_start", "inquiry_start", "inquiry_attempt", "inquiry_error", "generate_lead"]);
let sink: ((name: string, params: Record<string, string>) => void) | null = null;
export function setAnalyticsSink(value: typeof sink) { sink = value; }
export function safeEventParams(params: Record<string, unknown>) {
  const clean: Record<string, string> = {};
  for (const [key, values] of Object.entries(allowed)) {
    if (typeof params[key] === "string" && values.includes(params[key] as string)) clean[key] = params[key] as string;
  }
  return clean;
}
export function trackAnalytics(name: AnalyticsEvent, params: AnalyticsParams = {}) {
  if (events.has(name)) sink?.(name, safeEventParams(params));
}
export function validMeasurementId(value: string | undefined) {
  return /^G-[A-Z0-9]{6,20}$/.test(value ?? "") ? value as string : "";
}
export function analyticsPage(canonical: string | undefined, pathname: string, referrer = "") {
  try {
    const url = new URL(canonical ?? "");
    if (url.origin !== "https://www.scr-robot.com" || url.pathname !== pathname || url.search || url.hash) return null;
    let origin = "";
    try { const from = new URL(referrer); if (/^https?:$/.test(from.protocol)) origin = from.origin + "/"; } catch {}
    return { page_location: url.href, page_referrer: origin };
  } catch { return null; }
}
