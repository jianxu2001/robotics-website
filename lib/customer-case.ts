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
  steps: { title: string; text: string; image: string; time: string; alt: string }[];
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
    images: string;
    video: string;
    poster: string;
    width: number;
    height: number;
    durationSeconds: number;
    captions: Record<CaseLocale, string>;
  };
};

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
        url: `${project.media.images}/${project.media.poster}`,
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
        image: absoluteUrl(`${project.media.images}/${project.media.poster}`),
      }),
      inLanguage: isZh ? "zh-CN" : "en",
    },
  ];
}
