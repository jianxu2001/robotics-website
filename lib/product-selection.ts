import type { ProductModel } from "./product-data";

export type CatalogModel = Pick<ProductModel,
  "name" | "slug" | "seriesSlug" | "series" | "image" | "axes" | "payload" | "reach" | "repeatability" | "bodyWeight" | "power"
> & {
  categoryId: string;
  configuration: string;
  configurationZh: string;
  multipleConfigurations: boolean;
};

export type ProductFilters = {
  query: string;
  category: string;
  minPayload: string;
  minReach: string;
  sort: string;
};

export function getModelCategory(model: Pick<ProductModel, "series">) {
  switch (model.series) {
    case "CR Series": return "portable-collaborative-robots";
    case "BR Series": return "collaborative-case-packing";
    case "SCH-AE Series": return "desktop-robots";
    case "ER Series": return "general-purpose-robots";
    case "SRL Series": return "machine-loading-unloading-robots";
    case "STC Series":
    case "SCD Series":
    case "SAR12 Series": return "stamping-dedicated-robots";
    default: return "palletizing-depalletizing-robots";
  }
}

function numbers(value: string) {
  return (value.replaceAll(",", "").match(/\d+(?:\.\d+)?/g) ?? []).map(Number);
}

export function toCatalogModel(model: ProductModel): CatalogModel {
  const lifting = model.specifications?.find((row) => row.name === "Lifting stroke");
  const rate = model.specifications?.find((row) => row.name === "Packing rate");
  const multipleConfigurations = numbers(model.payload).length > 1 || numbers(model.reach).length > 1;
  const option = model.optionNote?.includes("Optional A5/A6") ? ["Optional 5th / 6th axis", "可选第五 / 第六轴"] : model.optionNote?.includes("Optional A5") ? ["Optional 5th axis", "可选第五轴"] : ["", ""];
  const variant = model.name.includes("Split Type") ? ["Split type", "分体式"] : model.name.includes("Integrated Cabinet") ? ["Integrated cabinet", "一体柜"] : ["", ""];
  const configuration = rate ? `Packing rate ${rate.value}` : lifting ? (lifting.value === "Without lift" ? "Fixed base · no lift" : `Lift: ${lifting.value}`) : multipleConfigurations ? "Multiple configurations" : [variant[0], option[0]].filter(Boolean).join(" · ");
  const configurationZh = rate ? `装箱节拍 ${rate.valueZh ?? rate.value}` : lifting ? (lifting.value === "Without lift" ? "固定底座 · 不带升降" : `升降行程 ${lifting.valueZh ?? lifting.value}`) : multipleConfigurations ? "多种负载 / 臂展配置" : [variant[1], option[1]].filter(Boolean).join(" · ");
  return {
    name: model.name, slug: model.slug, seriesSlug: model.seriesSlug, series: model.series,
    image: model.image, axes: model.axes, payload: model.payload, reach: model.reach,
    repeatability: model.repeatability, bodyWeight: model.bodyWeight, power: model.power,
    categoryId: getModelCategory(model), configuration, configurationZh, multipleConfigurations,
  };
}

function minimum(value: string) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : 0;
}

export function filterCatalogModels(models: CatalogModel[], filters: ProductFilters) {
  const query = filters.query.trim().toLowerCase().replace(/[\s–—-]/g, "");
  const payload = minimum(filters.minPayload);
  const reach = minimum(filters.minReach);
  const filtered = models.filter((model) => {
    const searchable = `${model.name} ${model.series}`.toLowerCase().replace(/[\s–—-]/g, "");
    return (!query || searchable.includes(query))
      && (!filters.category || model.categoryId === filters.category)
      && Math.max(...numbers(model.payload), 0) >= payload
      && Math.max(...numbers(model.reach), 0) >= reach;
  });
  if (filters.sort === "payload") filtered.sort((a, b) => Math.max(...numbers(a.payload)) - Math.max(...numbers(b.payload)));
  if (filters.sort === "reach") filtered.sort((a, b) => Math.max(...numbers(a.reach)) - Math.max(...numbers(b.reach)));
  if (filters.sort === "recommended") filtered.sort((a, b) => Number(!a.image.includes("-dark-")) - Number(!b.image.includes("-dark-")));
  return filtered;
}

export function modelInquiryHref(model: Pick<ProductModel, "slug" | "seriesSlug">, locale: "en" | "zh" = "en") {
  return `${locale === "zh" ? "/zh" : ""}/contact?model=${encodeURIComponent(`${model.seriesSlug}/${model.slug}`)}#inquiry`;
}
