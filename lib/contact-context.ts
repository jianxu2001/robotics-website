export type ContactLocale = "en" | "zh";
export const inquiryTopics = {
  "bag-depalletizing": { en: "Bag depalletizing", zh: "袋装拆垛" },
  "bag-opening-feeding": { en: "Bag opening and material feeding", zh: "拆包投料" },
  "bag-palletizing": { en: "Bag palletizing", zh: "袋装码垛" },
  "carton-palletizing": { en: "Carton palletizing", zh: "纸箱码垛" },
  "press-transfer": { en: "Press loading and transfer", zh: "冲压上下料与转运" },
} as const;
export type InquiryTopic = keyof typeof inquiryTopics;

export function getInquiryTopic(value: string | null | undefined): InquiryTopic | undefined {
  return value && Object.hasOwn(inquiryTopics, value) ? value as InquiryTopic : undefined;
}

export function cleanSourcePath(value: unknown) {
  if (typeof value !== "string" || value.length > 240) return "";
  const path = value.split(/[?#]/, 1)[0];
  if (path === "/" || path === "/zh") return path;
  return /^\/(?:zh\/)?(?:products|solutions|industries|case-studies|guides|contact|about)(?:\/[a-z0-9-]+){0,3}$/.test(path) ? path : "";
}

export function projectContactHref(sourcePath: string, topic?: InquiryTopic, locale: ContactLocale = "en", anchor: "inquiry" | "photos" = "inquiry") {
  const params = new URLSearchParams();
  const source = cleanSourcePath(sourcePath);
  if (source) params.set("source", source);
  if (topic) params.set("topic", topic);
  return `${locale === "zh" ? "/zh" : ""}/contact${params.size ? `?${params}` : ""}#${anchor}`;
}

export function photoContactLinks(locale: ContactLocale, context: { topic?: InquiryTopic; model?: string; sourcePath?: string } = {}) {
  const zh = locale === "zh";
  const source = cleanSourcePath(context.sourcePath);
  const text = [
    zh ? "您好，我想咨询 SCR 机器人选型。" : "Hello, I would like SCR Robot selection advice.",
    context.topic ? `${zh ? "工艺" : "Application"}: ${inquiryTopics[context.topic][locale]}` : "",
    context.model ? `${zh ? "型号" : "Model"}: ${context.model}` : "",
    source ? `${zh ? "参考页面" : "Reference page"}: https://www.scr-robot.com${source === "/" ? "" : source}` : "",
    zh ? "我会在此附上产品照片或现场视频，请协助评估。" : "I will attach product photos or a site video here for review.",
  ].filter(Boolean).join("\n");
  return {
    whatsapp: `https://wa.me/8613266005525?text=${encodeURIComponent(text)}`,
    email: `mailto:jianxu2001@gmail.com?subject=${encodeURIComponent(zh ? "SCR 机器人项目资料与选型咨询" : "SCR Robot project photos and selection inquiry")}&body=${encodeURIComponent(text)}`,
  };
}
