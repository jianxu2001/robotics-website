import content from "@/lib/stc10-case-content.json";
import { type CustomerCaseProject } from "@/lib/customer-case";

export const stc10CaseSlug = "stc10-press-loading-unloading-transfer";
export const stc10CasePaths = {
  en: `/case-studies/${stc10CaseSlug}`,
  zh: `/zh/case-studies/${stc10CaseSlug}`,
};

export const stc10CaseProject: CustomerCaseProject = {
  id: "stc10",
  paths: stc10CasePaths,
  content,
  media: {
    images: "/images/case-studies/stc10-stamping",
    video: "/videos/case-studies/stc10-stamping-v1.mp4",
    poster: "01-line-layout.jpg",
    width: 1280,
    height: 720,
    durationSeconds: 20.09,
    // First successful public deployment of this customer video.
    publishedAt: "2026-10-27T04:32:56Z",
    subtitles: {
      en: "/videos/case-studies/stc10-stamping-v1.en.vtt",
      zh: "/videos/case-studies/stc10-stamping-v1.zh.vtt",
    },
    captions: {
      zh: "冲压线现场视频 · 约 20 秒",
      en: "Stamping-line footage · Approx. 20 seconds",
    },
  },
};
