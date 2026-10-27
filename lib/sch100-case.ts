import content from "@/lib/sch100-case-content.json";
import {
  type CaseLocale,
  type CustomerCaseProject,
  getCustomerCaseMetadata,
  getCustomerCaseStructuredData,
} from "@/lib/customer-case";

export type { CaseLocale } from "@/lib/customer-case";
export const sch100CaseSlug = "sch100-bag-opening-feeding-custom-linear-track";
export const sch100CasePaths = {
  en: `/case-studies/${sch100CaseSlug}`,
  zh: `/zh/case-studies/${sch100CaseSlug}`,
};
export const sch100CaseMedia = {
  images: "/images/case-studies/sch100-bag-feeding",
  video: "/videos/case-studies/sch100-bag-feeding-v1.mp4",
  poster: "02-transfer.jpg",
  width: 720,
  height: 1280,
  durationSeconds: 46.67,
  captions: {
    zh: "客户现场视频 · 约 47 秒",
    en: "Customer-site footage · Approx. 47 seconds",
  },
};
export const sch100CaseContent = content;
export const sch100CaseProject: CustomerCaseProject = {
  id: "sch100",
  paths: sch100CasePaths,
  media: sch100CaseMedia,
  content,
};

export function getSch100CaseMetadata(locale: CaseLocale) {
  return getCustomerCaseMetadata(sch100CaseProject, locale);
}

export function getSch100CaseStructuredData(locale: CaseLocale) {
  return getCustomerCaseStructuredData(sch100CaseProject, locale);
}
