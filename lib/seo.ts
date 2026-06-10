import type { Metadata } from "next";
import { companyProfile, type ProductSeries } from "@/lib/catalog";
import type { IndustryPage } from "@/lib/industry-pages";
import { getProductModelsBySeries, type ProductModel } from "@/lib/product-data";
import type { SolutionPage } from "@/lib/solution-pages";

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

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: companyProfile.name,
    alternateName: companyProfile.shortName,
    url: siteUrl,
    description: companyProfile.description,
    foundingDate: companyProfile.founded,
    address: companyProfile.headquarters,
  };
}

export function getBreadcrumbJsonLd(
  pageUrl: string,
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getWebPageJsonLd(input: {
  url: string;
  name: string;
  description: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${input.url}#webpage`,
    url: input.url,
    name: input.name,
    description: input.description,
    image: input.image,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: companyProfile.shortName,
      url: siteUrl,
    },
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    breadcrumb: {
      "@id": `${input.url}#breadcrumb`,
    },
  };
}

export function getProductSeriesStructuredData(series: ProductSeries) {
  const seriesUrl = absoluteUrl(`/products/${series.slug}`);
  const models = getProductModelsBySeries(series.slug);

  return [
    getOrganizationJsonLd(),
    getBreadcrumbJsonLd(seriesUrl, [
      { name: "Home", url: siteUrl },
      { name: "Products", url: absoluteUrl("/products") },
      { name: series.series, url: seriesUrl },
    ]),
    getWebPageJsonLd({
      url: seriesUrl,
      name: getProductSeriesMetaTitle(series),
      description: getProductSeriesMetaDescription(series),
      image: absoluteUrl(series.image),
    }),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${seriesUrl}#models`,
      name: `${series.series} robot models`,
      description: `Catalog model list for ${series.series} industrial robots.`,
      url: seriesUrl,
      numberOfItems: models.length,
      itemListElement: models.map((model, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: model.name,
        url: absoluteUrl(`/products/${model.seriesSlug}/${model.slug}`),
      })),
    },
  ];
}

export function getProductModelStructuredData(model: ProductModel) {
  const modelUrl = absoluteUrl(`/products/${model.seriesSlug}/${model.slug}`);
  const seriesUrl = absoluteUrl(`/products/${model.seriesSlug}`);

  const structuredData: unknown[] = [
    getOrganizationJsonLd(),
    getBreadcrumbJsonLd(modelUrl, [
      { name: "Home", url: siteUrl },
      { name: "Products", url: absoluteUrl("/products") },
      { name: model.series, url: seriesUrl },
      { name: model.name, url: modelUrl },
    ]),
    getWebPageJsonLd({
      url: modelUrl,
      name: getProductModelMetaTitle(model),
      description: getProductModelMetaDescription(model),
      image: absoluteUrl(model.image),
    }),
    getProductModelJsonLd(model, modelUrl),
  ];

  return structuredData;
}

function getProductModelJsonLd(model: ProductModel, modelUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${modelUrl}#product`,
    name: `${model.name} ${model.category}`,
    brand: {
      "@type": "Brand",
      name: companyProfile.shortName,
    },
    manufacturer: {
      "@id": `${siteUrl}/#organization`,
    },
    sku: model.name,
    model: model.name,
    description: getProductModelMetaDescription(model),
    category: `Industrial Robot / ${model.category}`,
    url: modelUrl,
    image: absoluteUrl(model.image),
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Payload",
        value: model.payload,
      },
      {
        "@type": "PropertyValue",
        name: "Reach",
        value: model.reach,
      },
      {
        "@type": "PropertyValue",
        name: "Axis Configuration",
        value: `${model.axes}-axis`,
      },
      {
        "@type": "PropertyValue",
        name: "Repeatability",
        value: model.repeatability,
      },
      {
        "@type": "PropertyValue",
        name: "Body Weight",
        value: model.bodyWeight,
      },
      {
        "@type": "PropertyValue",
        name: "Power Capacity",
        value: model.power,
      },
    ],
  };
}

export function getIndustryPageStructuredData(page: IndustryPage) {
  const pageUrl = absoluteUrl(`/industries/${page.slug}`);

  return [
    getOrganizationJsonLd(),
    getBreadcrumbJsonLd(pageUrl, [
      { name: "Home", url: siteUrl },
      { name: "Industries", url: absoluteUrl("/industries") },
      { name: page.title, url: pageUrl },
    ]),
    getWebPageJsonLd({
      url: pageUrl,
      name: page.seoTitle,
      description: page.description,
      image: absoluteUrl(page.image),
    }),
    getFaqJsonLd(page.faq),
  ];
}

export function getSolutionPageStructuredData(page: SolutionPage) {
  const pageUrl = absoluteUrl(`/solutions/${page.slug}`);

  return [
    getOrganizationJsonLd(),
    getBreadcrumbJsonLd(pageUrl, [
      { name: "Home", url: siteUrl },
      { name: "Solutions", url: absoluteUrl("/solutions") },
      { name: page.title, url: pageUrl },
    ]),
    getWebPageJsonLd({
      url: pageUrl,
      name: page.seoTitle,
      description: page.description,
      image: absoluteUrl(page.image),
    }),
    getFaqJsonLd(page.faq),
  ];
}

const productSeriesMetadataOverrides: Record<
  string,
  { title: string; description: string }
> = {
  "ecr-series": {
    title: "ECR Light-Duty Palletizing Robots | SCR Robot",
    description:
      "Mini 4-axis handling robots for light-duty palletizing, 8-100 kg payloads and up to 2050 mm reach for compact automation. Get Quote.",
  },
  "sar-series": {
    title: "SAR Long-Reach Transfer Robots | SCR Robot",
    description:
      "Long-reach industrial transfer robots for wide work areas, 12-800 kg payloads and up to 3500 mm reach. Request Proposal.",
  },
  "sch-series": {
    title: "SCH Heavy-Duty Palletizing Robots | SCR Robot",
    description:
      "Heavy-duty palletizing and high payload depalletizer robots, 3-800 kg payloads and up to 3200 mm reach. Request Proposal.",
  },
  "scr-series": {
    title: "SCR High-Payload Palletizing Systems | SCR Robot",
    description:
      "High-capacity palletizing for large cartons and bags, 180 kg payload and 3200 mm reach end-of-line systems. Get Quote.",
  },
};

export function getProductSeriesMetaTitle(series: ProductSeries) {
  const override = productSeriesMetadataOverrides[series.slug];

  if (override) {
    return override.title;
  }

  return `${series.series} Robots | ${series.payloadRange} Payload | SCR Robot`;
}

export function getProductSeriesMetaDescription(series: ProductSeries) {
  const override = productSeriesMetadataOverrides[series.slug];

  if (override) {
    return override.description;
  }

  return `Review ${series.series} robot specs, payload ${series.payloadRange}, reach ${series.reachRange}, applications, and model data for factory automation projects.`;
}

export function getProductModelMetaTitle(model: ProductModel) {
  const title = `${model.name} Robot | ${model.payload}, ${model.reach} | SCR Robot`;

  if ([...title].length <= 70) {
    return title;
  }

  return `${model.name} Robot | ${model.payload} Payload | SCR Robot`;
}

export function getProductModelMetaDescription(model: ProductModel) {
  return `${model.name}: ${model.payload} payload, ${model.reach} reach, ${model.repeatability} repeatability. Request SCR Robot selection help for ${model.applications[0].toLowerCase()} projects.`;
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
