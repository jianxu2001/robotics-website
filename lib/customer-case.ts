import type { Metadata } from "next";
import {
  absoluteUrl,
  getBreadcrumbJsonLd,
  getOrganizationJsonLd,
  getWebPageJsonLd,
  localizedAlternates,
} from "@/lib/seo";

export type CaseLocale = "en" | "zh";

export type CustomerCaseCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  summary: string;
  configurationTitle?: string;
  configurationNote: string;
  backgroundTitle: string;
  background: string;
  workflowTitle: string;
  steps: { title: string; text: string; image?: string; time?: string; alt?: string }[];
  featuresTitle: string;
  features: string[];
  ctaTitle: string;
  ctaText: string;
  ctaLabel: string;
  productLabel: string;
  productHref: string;
  contactHref: string;
  seoTitle: string;
  seoDescription: string;
};

export type CustomerCaseProject = {
  id: string;
  paths: Record<CaseLocale, string>;
  content: Record<CaseLocale, CustomerCaseCopy>;
  media: {
    width: number;
    height: number;
    captions: Record<CaseLocale, string>;
  } & (
    | { image: string }
    | {
        images: string;
        video: string;
        poster: string;
        durationSeconds: number;
        publishedAt: string;
        subtitles: Record<CaseLocale, string>;
      }
  );
};

export function getCustomerCaseImage(media: CustomerCaseProject["media"]) {
  return "image" in media ? media.image : `${media.images}/${media.poster}`;
}

export function getCustomerCaseMetadata(project: CustomerCaseProject, locale: CaseLocale): Metadata {
  const copy = project.content[locale];
  return {
    title: copy.seoTitle,
    description: copy.seoDescription,
    alternates: localizedAlternates(project.paths[locale], project.paths.en, project.paths.zh),
    openGraph: {
      title: copy.seoTitle,
      description: copy.seoDescription,
      url: absoluteUrl(project.paths[locale]),
      locale: locale === "zh" ? "zh_CN" : "en_US",
      type: "website",
      images: [{
        url: getCustomerCaseImage(project.media),
        width: project.media.width,
        height: project.media.height,
        alt: copy.title,
      }],
    },
  };
}

export function getCustomerCaseStructuredData(project: CustomerCaseProject, locale: CaseLocale) {
  const copy = project.content[locale];
  const url = absoluteUrl(project.paths[locale]);
  const isZh = locale === "zh";
  const video = "video" in project.media ? project.media : null;
  const cover = absoluteUrl(getCustomerCaseImage(project.media));
  return [
    getOrganizationJsonLd(),
    getBreadcrumbJsonLd(url, [
      { name: isZh ? "首页" : "Home", url: absoluteUrl(isZh ? "/zh" : "/") },
      { name: isZh ? "案例" : "Cases", url: absoluteUrl(isZh ? "/zh/case-studies" : "/case-studies") },
      { name: copy.title, url },
    ]),
    {
      ...getWebPageJsonLd({
        url,
        name: copy.title,
        description: copy.seoDescription,
        image: cover,
      }),
      inLanguage: isZh ? "zh-CN" : "en",
      ...(video ? { video: { "@id": `${url}#video` } } : {}),
    },
    ...(video ? [{
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "@id": `${url}#video`,
      name: copy.title,
      description: `${copy.summary} ${copy.configurationNote}`,
      thumbnailUrl: cover,
      uploadDate: video.publishedAt,
      duration: `PT${video.durationSeconds}S`,
      contentUrl: absoluteUrl(video.video),
      url: `${url}#site-video`,
      inLanguage: isZh ? "zh-CN" : "en",
      transcript: copy.steps.map((step) => `${step.time ? `${step.time} — ` : ""}${step.title}: ${step.text}`).join("\n"),
      publisher: { "@id": `${absoluteUrl("/")}/#organization` },
      isPartOf: { "@id": `${url}#webpage` },
    }] : []),
  ];
}
