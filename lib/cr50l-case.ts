import content from "@/lib/cr50l-case-content.json";
import { type CustomerCaseProject } from "@/lib/customer-case";

export const cr50lCaseSlug = "cr50l-lifting-carton-palletizing";
export const cr50lCasePaths = {
  en: `/case-studies/${cr50lCaseSlug}`,
  zh: `/zh/case-studies/${cr50lCaseSlug}`,
};

export const cr50lCaseProject: CustomerCaseProject = {
  id: "cr50l",
  paths: cr50lCasePaths,
  content,
  media: {
    images: "/images/case-studies/cr50l-lifting-palletizing",
    video: "/videos/case-studies/cr50l-lifting-palletizing-v1.mp4",
    poster: "02-pallet-placement.jpg",
    width: 720,
    height: 1280,
    durationSeconds: 34.97,
    // First successful public deployment of this video on the SCR website.
    publishedAt: "2026-10-27T08:26:19Z",
    subtitles: {
      en: "/videos/case-studies/cr50l-lifting-palletizing-v1.en.vtt",
      zh: "/videos/case-studies/cr50l-lifting-palletizing-v1.zh.vtt",
    },
    captions: {
      zh: "CR50L 升降工作站运行视频 · 约 35 秒",
      en: "CR50L lifting workstation footage · Approx. 35 seconds",
    },
  },
};
