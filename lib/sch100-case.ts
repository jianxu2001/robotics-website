import type { Metadata } from "next";
import content from "@/lib/sch100-case-content.json";
import {
  absoluteUrl,
  getBreadcrumbJsonLd,
  getOrganizationJsonLd,
  getWebPageJsonLd,
  localizedAlternates,
} from "@/lib/seo";

export type CaseLocale = "en" | "zh";
export const sch100CaseSlug = "sch100-bag-opening-feeding-custom-linear-track";
export const sch100CasePaths = {
  en: `/case-studies/${sch100CaseSlug}`,
  zh: `/zh/case-studies/${sch100CaseSlug}`,
};
export const sch100CaseMedia = {
  images: "/images/case-studies/sch100-bag-feeding",
  video: "/videos/case-studies/sch100-bag-feeding-v1.mp4",
};
export const sch100CaseContent = content;

export function getSch100CaseMetadata(locale: CaseLocale): Metadata {
  const copy = content[locale];
  return {
    title: copy.seoTitle,
    description: copy.seoDescription,
    alternates: localizedAlternates(
      sch100CasePaths[locale],
      sch100CasePaths.en,
      sch100CasePaths.zh,
    ),
    openGraph: {
      title: copy.seoTitle,
      description: copy.seoDescription,
      url: absoluteUrl(sch100CasePaths[locale]),
      locale: locale === "zh" ? "zh_CN" : "en_US",
      type: "website",
      images: [{
        url: `${sch100CaseMedia.images}/02-transfer.jpg`,
        width: 720,
        height: 1280,
        alt: copy.steps[1].alt,
      }],
    },
  };
}

export function getSch100CaseStructuredData(locale: CaseLocale) {
  const copy = content[locale];
  const url = absoluteUrl(sch100CasePaths[locale]);
  const isZh = locale === "zh";
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
        image: absoluteUrl(`${sch100CaseMedia.images}/02-transfer.jpg`),
      }),
      inLanguage: isZh ? "zh-CN" : "en",
    },
  ];
}
