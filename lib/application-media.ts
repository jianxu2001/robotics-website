export type ApplicationLocale = "en" | "zh";
export type ApplicationMediaKey = "carton-palletizing" | "stamping-transfer" | "bag-feeding" | "bag-palletizing" | "bag-depalletizing" | "vision-bag-feeding" | "machine-tending" | "conveyor-flow" | "material-handling-line";
export type ApplicationMedia = {
  src: string;
  alt: string;
  caption: string;
  kind: "video-frame" | "schematic";
  caseHref?: string;
};

const photos = {
  "carton-palletizing": { src: "/images/case-studies/cr50l-lifting-palletizing/02-pallet-placement.jpg", slug: "cr50l-lifting-carton-palletizing", en: "CR50L lifting carton palletizing — site video frame", zh: "CR50L 升降式纸箱码垛 · 视频原帧" },
  "stamping-transfer": { src: "/images/case-studies/stc10-stamping/01-line-layout.jpg", slug: "stc10-press-loading-unloading-transfer", en: "STC10 inter-press transfer — site video frame", zh: "STC10 冲压线转运 · 视频原帧" },
  "bag-feeding": { src: "/images/case-studies/sch100-bag-feeding/03-feeding.jpg", slug: "sch100-bag-opening-feeding-custom-linear-track", en: "SCH100 bag opening and feeding — customer-specific linear track", zh: "SCH100 拆包上料 · 客户定制地轨配置" },
} as const;
const diagrams = {
  "bag-palletizing": { en: "Bag palletizing process schematic", zh: "袋装物料码垛工艺示意" },
  "bag-depalletizing": { en: "Bag depalletizing process schematic", zh: "袋装拆垛与转运工艺示意" },
  "vision-bag-feeding": { en: "Vision-guided bag feeding process schematic", zh: "视觉引导袋装上料工艺示意" },
  "machine-tending": { en: "Machine loading and unloading process schematic", zh: "机床上下料工艺示意" },
  "conveyor-flow": { en: "Conveyor and buffer process schematic", zh: "输送与缓存衔接工艺示意" },
  "material-handling-line": { en: "Material handling process schematic", zh: "物料搬运工艺流程示意" },
} as const;

export function getApplicationMedia(key: ApplicationMediaKey, locale: ApplicationLocale = "en"): ApplicationMedia {
  if (key in photos) {
    const photo = photos[key as keyof typeof photos];
    return { src: photo.src, alt: photo[locale], caption: photo[locale], kind: "video-frame", caseHref: `${locale === "zh" ? "/zh" : ""}/case-studies/${photo.slug}` };
  }
  const diagram = diagrams[key as keyof typeof diagrams];
  return { src: `/images/applications/${key}-${locale}.png`, alt: diagram[locale], caption: diagram[locale], kind: "schematic" };
}

export function applicationImageFields(key: ApplicationMediaKey, locale: ApplicationLocale = "en") {
  const media = getApplicationMedia(key, locale);
  return { image: media.src, imageAlt: media.alt, imageCaption: media.caption };
}
