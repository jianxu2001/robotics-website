import type { Metadata } from "next";
import { companyProfile } from "@/lib/catalog";
import type { ProductModel } from "@/lib/product-models";

export const siteUrl = "https://www.scr-robot.com";

export type FaqItem = {
  question: string;
  answer: string;
};

export function absoluteUrl(pathname: string) {
  if (pathname === "/") {
    return siteUrl;
  }

  return `${siteUrl}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

export function canonicalAlternates(pathname: string): Metadata["alternates"] {
  return {
    canonical: absoluteUrl(pathname),
  };
}

export function localizedAlternates(
  canonicalPath: string,
  englishPath: string,
  chinesePath: string,
): Metadata["alternates"] {
  return {
    canonical: absoluteUrl(canonicalPath),
    languages: {
      en: absoluteUrl(englishPath),
      "zh-CN": absoluteUrl(chinesePath),
      "x-default": absoluteUrl(englishPath),
    },
  };
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function getProductModelMetaDescription(model: ProductModel) {
  return `${model.name} ${model.category} from SCR Robot. Payload ${model.payload}, reach ${model.reach}, repeatability ${model.repeatability}. Built for ${model.applications.join(", ").toLowerCase()}.`;
}

export function getProductModelFaqs(model: ProductModel): FaqItem[] {
  return [
    {
      question: `Is ${model.name} suitable for my product?`,
      answer:
        "Selection depends on product weight, dimensions, cycle time, pallet pattern, gripper type, reach, and site layout. Send product photos, dimensions, and target throughput for a model recommendation.",
    },
    {
      question: "Can SCR Robot provide the complete automation cell?",
      answer:
        "Yes. The robot can be supplied as part of a complete automation solution including gripper, conveyor, pallet handling, guarding, PLC/HMI, and on-site layout planning.",
    },
    {
      question: "Are the technical parameters final for every project?",
      answer:
        "The listed values come from the catalog model data. Final configuration should be confirmed against the exact tooling, payload center, working envelope, and production environment.",
    },
    {
      question: "What information is needed for a quotation?",
      answer:
        "Please provide product photos, weight, size, packaging type, hourly output, pallet size if applicable, factory layout, voltage requirements, and destination country.",
    },
  ];
}

export function getProductModelJsonLd(model: ProductModel) {
  const modelUrl = absoluteUrl(`/products/${model.seriesSlug}/${model.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: model.name,
    sku: model.name,
    mpn: model.name,
    url: modelUrl,
    image: absoluteUrl(model.image),
    description: getProductModelMetaDescription(model),
    category: model.category,
    brand: {
      "@type": "Brand",
      name: "SCR Robot",
    },
    manufacturer: {
      "@type": "Organization",
      name: companyProfile.name,
      url: siteUrl,
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Series", value: model.series },
      { "@type": "PropertyValue", name: "Axes", value: model.axes },
      { "@type": "PropertyValue", name: "Payload", value: model.payload },
      { "@type": "PropertyValue", name: "Reach", value: model.reach },
      {
        "@type": "PropertyValue",
        name: "Repeatability",
        value: model.repeatability,
      },
      {
        "@type": "PropertyValue",
        name: "Body weight",
        value: model.bodyWeight,
      },
      { "@type": "PropertyValue", name: "Power", value: model.power },
    ],
  };
}

export function getFaqJsonLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
