import type { ProductGroup } from "./catalog";
import type { ProductModel } from "./product-data";
import { getModelCategory } from "./product-selection";

export type ProductNavigationGroup = {
  slug: string;
  title: string;
  modelGroups: {
    line: ProductGroup["productLines"][number];
    models: { name: string; href: string }[];
  }[];
};

// Pass only the current language and menu fields across the client boundary.
export function getProductNavigation(
  groups: ProductGroup[],
  models: ProductModel[],
  locale: "en" | "zh",
): ProductNavigationGroup[] {
  const prefix = locale === "zh" ? "/zh" : "";
  return groups.map((group) => ({
    slug: group.slug,
    title: group.title,
    modelGroups: group.productLines.map((line) => ({
      line,
      models: models
        .filter((model) => getModelCategory(model) === group.slug
          && (group.slug === "desktop-robots" || line.href.endsWith(`/${model.seriesSlug}`)))
        .map((model) => ({
          name: model.name,
          href: `${prefix}/products/${model.seriesSlug}/${model.slug}`,
        })),
    })),
  }));
}
