import type { MetadataRoute } from "next";
import { industryPages } from "@/lib/industry-pages";
import { productSeries } from "@/lib/catalog";
import { productModels } from "@/lib/product-data";
import { solutionPages } from "@/lib/solution-pages";
import { absoluteUrl } from "@/lib/seo";
import { sch100CasePaths } from "@/lib/sch100-case";
import { stc10CasePaths } from "@/lib/stc10-case";

const lastModified = "2026-10-27T00:00:00.000Z";

const pairedRoutes = [
  { en: "/", zh: "/zh", priority: 1 },
  { en: "/products", zh: "/zh/products", priority: 0.95 },
  {
    en: "/products/sch-heavy-duty-palletizing-robots",
    zh: "/zh/products/sch-series",
    priority: 0.88,
  },
  {
    en: "/products/desktop-robots",
    zh: "/zh/products/sch-series",
    priority: 0.84,
  },
  { en: "/industries", zh: "/zh/industries", priority: 0.85 },
  { en: "/case-studies", zh: "/zh/case-studies", priority: 0.75 },
  { en: sch100CasePaths.en, zh: sch100CasePaths.zh, priority: 0.78 },
  { en: stc10CasePaths.en, zh: stc10CasePaths.zh, priority: 0.78 },
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

  const modelEntries = productModels.flatMap((model) => [
    canonicalEntry(`/products/${model.seriesSlug}/${model.slug}`, 0.78),
    canonicalEntry(`/zh/products/${model.seriesSlug}/${model.slug}`, 0.76),
  ]);

  const solutionEntries = solutionPages.map((page) =>
    canonicalEntry(`/solutions/${page.slug}`, 0.76),
  );

  const entries = [
    ...staticEntries,
    ...industryEntries,
    ...productSeriesEntries,
    ...modelEntries,
    ...solutionEntries,
  ];
  const seen = new Set<string>();
  return entries.filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
