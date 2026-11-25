import content from "@/lib/cr50l-case-content.json";
import { crWorkstationIllustration } from "@/lib/cr-visuals";
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
    image: crWorkstationIllustration.src,
    width: crWorkstationIllustration.width,
    height: crWorkstationIllustration.height,
    captions: crWorkstationIllustration.captions,
  },
};
