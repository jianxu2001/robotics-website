import type { MetadataRoute } from "next";
import { industryPages } from "@/lib/industry-pages";
import { productSeries } from "@/lib/catalog";
import { productModels } from "@/lib/product-models";
import { absoluteUrl } from "@/lib/seo";

const lastModified = "2026-06-05T00:00:00.000Z";

const pairedRoutes = [
  { en: "/", zh: "/zh", priority: 1 },
  { en: "/products", zh: "/zh/products", priority: 0.95 },
  { en: "/industries", zh: "/zh/industries", priority: 0.85 },
  { en: "/case-studies", zh: "/zh/case-studies", priority: 0.75 },
  { en: "/about", zh: "/zh/about", priority: 0.7 },
  { en: "/contact", zh: "/zh/contact", priority: 0.8 },
];

function pairedEntry(
  url: string,
  priority: number,
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(url),
    lastModified,
    changeFrequency: "monthly",
    priority,
  };
}

function canonicalEntry(
  pathname: string,
  priority: number,
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(pathname),
    lastModified,
    changeFrequency: "monthly",
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = pairedRoutes.flatMap((route) => [
    pairedEntry(route.en, route.priority),
    pairedEntry(route.zh, route.priority),
  ]);

  const industryEntries = industryPages.map((page) =>
    canonicalEntry(`/industries/${page.slug}`, 0.72),
  );

  const productSeriesEntries = productSeries.flatMap((series) => {
    const englishPath = `/products/${series.slug}`;
    const chinesePath = `/zh/products/${series.slug}`;

    return [
      pairedEntry(englishPath, 0.86),
      pairedEntry(chinesePath, 0.82),
    ];
  });

  const modelEntries = productModels.map((model) =>
    canonicalEntry(`/products/${model.seriesSlug}/${model.slug}`, 0.78),
  );

  return [
    ...staticEntries,
    ...industryEntries,
    ...productSeriesEntries,
    ...modelEntries,
  ];
}
