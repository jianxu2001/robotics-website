import { productGroups, productSeries } from "@/lib/catalog";

export type ParameterRow = {
  label: string;
  labelZh: string;
  value: string;
};

export type JointParameter = {
  axis: string;
  range: string;
};

export type ProductModel = {
  slug: string;
  name: string;
  seriesSlug: string;
  series: string;
  category: string;
  categoryZh: string;
  title: string;
  titleZh: string;
  image: string;
  catalogPage: string;
  applicationIndustries: string[];
  productHighlights: string[];
  robotParameters: ParameterRow[];
  jointParameters: JointParameter[];
};

const productImage = (fileName: string) => `/product-renders/${fileName}`;

export function slugifyModelName(name: string) {
  return name
    .toLowerCase()
    .replace(/~/g, "-")
    .replace(/\//g, "-")
    .replace(/[^\w-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

const seriesMeta: Record<
  string,
  {
    categoryZh: string;
    titleZh: string;
    catalogPage: string;
    industries: string[];
    highlights: string[];
  }
> = {
  "ecr-series": {
    categoryZh: "码垛/拆垛机器人",
    titleZh: "紧凑型四轴搬运机器人",
    catalogPage: "/products/catalog-page-03.png",
    industries: ["Packaging", "Machine tending", "Light palletizing", "Small-part handling"],
    highlights: ["Compact four-axis structure", "Fast repeatable handling", "Good cost-performance for compact cells"],
  },
  "sch-series": {
    categoryZh: "码垛/拆垛机器人",
    titleZh: "重载四轴码垛机器人",
    catalogPage: "/products/catalog-page-04.png",
    industries: ["Palletizing", "Depalletizing", "Packaging lines", "Heavy material handling"],
    highlights: ["Wide payload coverage", "Heavy-duty palletizing structure", "Suitable for cartons, bags, and industrial loads"],
  },
  "sar-series": {
    categoryZh: "码垛/拆垛机器人 / 冲压专用机器人",
    titleZh: "长臂展工业搬运机器人",
    catalogPage: "/products/catalog-page-05.png",
    industries: ["Palletizing", "Press transfer", "Forging support", "Large workpiece handling"],
    highlights: ["Long working envelope", "Heavy payload options", "Suitable for wide-layout production cells"],
  },
  "scr-series": {
    categoryZh: "码垛/拆垛机器人",
    titleZh: "高负载码垛机器人",
    catalogPage: "/products/catalog-page-06.png",
    industries: ["End-of-line palletizing", "Bag stacking", "Heavy carton handling", "Factory logistics"],
    highlights: ["180 kg payload", "3,200 mm reach", "Dedicated high-payload palletizing platform"],
  },
  "srl-series": {
    categoryZh: "机床上料/下料机器人",
    titleZh: "轻量型四轴搬运机器人",
    catalogPage: "/products/catalog-page-06.png",
    industries: ["Machine loading", "Machine unloading", "Compact transfer", "Assembly support"],
    highlights: ["Compact linear-base structure", "Lightweight production-cell fit", "Good for machine-side loading and unloading"],
  },
  "stc-series": {
    categoryZh: "冲压专用机器人",
    titleZh: "冲压转运机器人",
    catalogPage: "/products/catalog-page-07.png",
    industries: ["Stamping", "Press transfer", "Forging support", "Part loading"],
    highlights: ["Dedicated press-side transfer structure", "Compact payload range", "Works with custom fixtures and tooling"],
  },
  "er-series": {
    categoryZh: "通用型机器人",
    titleZh: "六轴工业机器人",
    catalogPage: "/products/catalog-page-08.png",
    industries: ["General automation", "Machine tending", "Flexible handling", "Assembly"],
    highlights: ["Six-axis articulated motion", "Flexible approach angles", "Precise repeatable handling"],
  },
};

const modelAssets: Record<string, { image: string; catalogPage: string; joint: string[] }> = {
  "ECR8-1200": { image: productImage("ecr8-1200.png"), catalogPage: "/products/catalog-page-03.png", joint: ["±165°", "-75°, +26°", "-87°, +25°", "±360°", "/", "/"] },
  "ECR10-1400": { image: productImage("ecr10-1400.png"), catalogPage: "/products/catalog-page-03.png", joint: ["±150°", "-80°, +26°", "-95°, +25°", "±360°", "/", "/"] },
  "ECR30-1850": { image: productImage("ecr30-1850.png"), catalogPage: "/products/catalog-page-03.png", joint: ["±165°", "-110°, +30°", "-30°, +105°", "±360°", "/", "/"] },
  "ECR50-1850": { image: productImage("ecr50-1850.png"), catalogPage: "/products/catalog-page-03.png", joint: ["±165°", "-110°, +30°", "-30°, +105°", "±360°", "/", "/"] },
  "ECR100-1850": { image: productImage("ecr100-1850.png"), catalogPage: "/products/catalog-page-03.png", joint: ["±165°", "-110°, +30°", "-30°, +105°", "±360°", "/", "/"] },
  "SCH03AE-200-110": { image: productImage("sch03ae-200-110.png"), catalogPage: "/products/catalog-page-03.png", joint: ["±155°", "110 mm", "±115°", "±360°", "/", "/"] },
  "SCH05AE-400-200": { image: productImage("sch03ae-200-110.png"), catalogPage: "/products/catalog-page-03.png", joint: ["±160°", "200 mm", "±140°", "±360°", "/", "/"] },
  "SCH05AE-600-200": { image: productImage("sch03ae-200-110.png"), catalogPage: "/products/catalog-page-03.png", joint: ["±160°", "200 mm", "±140°", "±360°", "/", "/"] },
  "SCH05A-600-200": { image: productImage("sch03ae-200-110.png"), catalogPage: "/products/catalog-page-03.png", joint: ["±165°", "200 mm", "±150°", "±360°", "/", "/"] },
  "SCH10AE-1300-450": { image: productImage("sch10ae-1300-450.png"), catalogPage: "/products/catalog-page-03.png", joint: ["±160°", "450 mm", "±150°", "±360°", "/", "/"] },
  "SCH10AE-800-450": { image: productImage("sch10ae-1300-450.png"), catalogPage: "/products/catalog-page-03.png", joint: ["±165°", "450 mm", "±150°", "±360°", "/", "/"] },
  "SCH10D-800-400": { image: productImage("sch10d-800-400.png"), catalogPage: "/products/catalog-page-04.png", joint: ["-100°, +140°", "400 mm", "±150°", "±360°", "/", "/"] },
  "SCH20D-1300-400": { image: productImage("sch20d-1300-400.png"), catalogPage: "/products/catalog-page-04.png", joint: ["±135°", "400 mm", "±150°", "±360°", "/", "/"] },
  "SCH20D-1950-1850": { image: productImage("sch20d-1950-1850.png"), catalogPage: "/products/catalog-page-04.png", joint: ["±135°", "1850 mm", "±150°", "±360°", "/", "/"] },
  "SCH30D-1950-1800": { image: productImage("sch30d-1950-1800.png"), catalogPage: "/products/catalog-page-04.png", joint: ["±135°", "1860 mm", "±150°", "±360°", "/", "/"] },
  "SCH50-1950-1800": { image: productImage("sch50-1950-1800.png"), catalogPage: "/products/catalog-page-04.png", joint: ["±130°", "1800 mm", "±147°", "±360°", "/", "/"] },
  "SCH80-1950-1800": { image: productImage("sch80-1950-1800.png"), catalogPage: "/products/catalog-page-04.png", joint: ["±130°", "1800 mm", "±147°", "±360°", "/", "/"] },
  "SCH100-1950-1800": { image: productImage("sch100-1950-1800.png"), catalogPage: "/products/catalog-page-04.png", joint: ["±130°", "1800 mm", "±147°", "±360°", "/", "/"] },
  "SCH100S-1950-1800": { image: productImage("sch100s-1950-1800.png"), catalogPage: "/products/catalog-page-04.png", joint: ["±135°", "1850 mm", "±155°", "±360°", "/", "/"] },
  "SCH130E-1950-1800": { image: productImage("sch130e-1950-1800.png"), catalogPage: "/products/catalog-page-05.png", joint: ["±130°", "1800 mm", "±147°", "±360°", "/", "/"] },
  "SCH210E-2350-1650": { image: productImage("sch210e-2350-1650.png"), catalogPage: "/products/catalog-page-05.png", joint: ["±130°", "1800 mm", "±147°", "±360°", "/", "/"] },
  "SCH300E-2350-1650": { image: productImage("sch300e-2350-1650.png"), catalogPage: "/products/catalog-page-05.png", joint: ["±180°", "750-2400 mm", "±150°", "±360°", "/", "/"] },
  "SCH500~800E-3200-1650": { image: productImage("sch500-800e-3200-1650.png"), catalogPage: "/products/catalog-page-05.png", joint: ["±180°", "800-2500 mm", "±150°", "±360°", "/", "/"] },
  "SAR12-1400": { image: productImage("sar12-1400.png"), catalogPage: "/products/catalog-page-07.png", joint: ["±140°", "-35°, +80°", "-95°, +35°", "±360°", "/", "/"] },
  "SAR80-2450-2300": { image: productImage("sar80-2450-2300.png"), catalogPage: "/products/catalog-page-05.png", joint: ["±330°", "2300 mm", "1500 mm", "330°", "/", "/"] },
  "SAR130-2550-2400": { image: productImage("sar130-2550-2400.png"), catalogPage: "/products/catalog-page-05.png", joint: ["±330°", "2400 mm", "1600 mm", "330°", "/", "/"] },
  "SAR210/300-2650-2300": { image: productImage("sar210-300-2650-2300.png"), catalogPage: "/products/catalog-page-05.png", joint: ["±330°", "2300 mm", "1500 mm", "330°", "/", "/"] },
  "SAR500/800-3500-3100": { image: productImage("sar500-800-3500-3100.png"), catalogPage: "/products/catalog-page-05.png", joint: ["±330°", "3100 mm", "2000 mm", "330°", "/", "/"] },
  "SCR180-3200": { image: productImage("scr180-3200.png"), catalogPage: "/products/catalog-page-06.png", joint: ["±178°", "650 mm", "Global: +120°, -20° / Coupled: +65°, -65°", "±360°", "/", "/"] },
  "SRL10-900-650": { image: productImage("srl10-900-650.png"), catalogPage: "/products/catalog-page-06.png", joint: ["±115°", "650 mm", "±135°", "±360°", "/", "/"] },
  "SRL20-1500-1000": { image: productImage("srl20-1500-1000.png"), catalogPage: "/products/catalog-page-06.png", joint: ["±100°", "1000 mm", "±135°", "±360°", "/", "/"] },
  "STC5-1250-400": { image: productImage("stc5-1250-400.png"), catalogPage: "/products/catalog-page-07.png", joint: ["±135°", "400 mm", "776-1250 mm", "±360°", "/", "/"] },
  "STC10-1450-400": { image: productImage("stc10-1450-400.png"), catalogPage: "/products/catalog-page-07.png", joint: ["±135°", "400 mm", "776-1450 mm", "±360°", "/", "/"] },
  "ER10-1400": { image: productImage("er10-1400.png"), catalogPage: "/products/catalog-page-08.png", joint: ["±170°", "-160°, +100°", "-85°, +90°", "±200°", "±120°", "±360°"] },
  "ER20-1700": { image: productImage("er20-1700.png"), catalogPage: "/products/catalog-page-08.png", joint: ["±170°", "-155°, +110°", "-78°, +205°", "±200°", "±125°", "±360°"] },
};

function robotParameters(model: {
  name: string;
  axes: string;
  payload: string;
  reach: string;
  repeatability: string;
  bodyWeight: string;
  power: string;
}): ParameterRow[] {
  return [
    { label: "Model", labelZh: "型号", value: model.name },
    { label: "Axes", labelZh: "轴数", value: model.axes },
    { label: "Maximum Payload", labelZh: "最大负载", value: model.payload },
    { label: "Maximum Reach", labelZh: "最大臂展", value: model.reach },
    { label: "Repeatability", labelZh: "重复定位精度", value: model.repeatability },
    { label: "Body Weight", labelZh: "本体重量", value: model.bodyWeight },
    { label: "Power Capacity", labelZh: "电源容量", value: model.power },
    { label: "Installation", labelZh: "安装形式", value: "Floor-mounted" },
    { label: "Operating Conditions", labelZh: "安装条件", value: "0-45 C, 20-80% RH, vibration below 4.9 m/s2" },
  ];
}

function jointParameters(values: string[]): JointParameter[] {
  return values.map((range, index) => ({
    axis: `${index + 1}`,
    range,
  }));
}

const catalogModels = productSeries.flatMap((series) => {
  const meta = seriesMeta[series.slug];

  return series.models.map((model) => {
    const asset = modelAssets[model.name];

    return {
      slug: slugifyModelName(model.name),
      name: model.name,
      seriesSlug: series.slug,
      series: series.series,
      category: series.category,
      categoryZh: meta.categoryZh,
      title: `${model.name} ${series.title}`,
      titleZh: `${model.name} ${meta.titleZh}`,
      image: asset?.image ?? series.image,
      catalogPage: asset?.catalogPage ?? meta.catalogPage,
      applicationIndustries: meta.industries,
      productHighlights: meta.highlights,
      robotParameters: robotParameters(model),
      jointParameters: jointParameters(asset?.joint ?? ["/", "/", "/", "/", "/", "/"]),
    } satisfies ProductModel;
  });
});

const portableModels: ProductModel[] = [
  {
    slug: "portable-30kg-robot",
    name: "30KG Robot",
    seriesSlug: "portable-collaborative-robots",
    series: "Portable Collaborative Robot",
    category: "Portable collaborative robots",
    categoryZh: "便携式协作机器人",
    title: "30KG Portable Collaborative Robot",
    titleZh: "30KG 便携式协作机器人",
    image: productImage("portable-30kg-robot.png"),
    catalogPage: "/products/catalog-page-09.png",
    applicationIndustries: ["Portable palletizing", "Flexible handling", "Mobile workstation support"],
    productHighlights: ["30 kg payload", "Portable palletizing structure", "Flexible deployment for changing production areas"],
    robotParameters: [
      { label: "Model", labelZh: "型号", value: "30KG Robot" },
      { label: "Axes", labelZh: "轴数", value: "5" },
      { label: "Maximum Payload", labelZh: "最大负载", value: "30 kg" },
      { label: "Maximum Reach", labelZh: "最大臂展", value: "1800 mm" },
      { label: "Repeatability", labelZh: "重复定位精度", value: "±0.1 mm" },
      { label: "Body Weight", labelZh: "本体重量", value: "475 kg" },
      { label: "Power Capacity", labelZh: "电源容量", value: "3.3 kVA" },
      { label: "Operating Conditions", labelZh: "安装条件", value: "-15-55 C, 20-80% RH, vibration below 4.9 m/s2" },
    ],
    jointParameters: [
      { axis: "Robot height", range: "1800-2800 mm" },
      { axis: "Palletizing height", range: "1800-2300 mm, including pallet" },
      { axis: "Applicable pallet", range: "1200 x 1200 x 140 mm" },
      { axis: "Equipment footprint", range: "1200 x 2600 x 2800 mm" },
    ],
  },
  {
    slug: "portable-50kg-robot",
    name: "50KG Robot",
    seriesSlug: "portable-collaborative-robots",
    series: "Portable Collaborative Robot",
    category: "Portable collaborative robots",
    categoryZh: "便携式协作机器人",
    title: "50KG Portable Collaborative Robot",
    titleZh: "50KG 便携式协作机器人",
    image: productImage("portable-50kg-robot.png"),
    catalogPage: "/products/catalog-page-09.png",
    applicationIndustries: ["Portable palletizing", "Flexible handling", "Mobile workstation support"],
    productHighlights: ["50 kg payload", "Higher-payload portable system", "Suitable for flexible heavy handling tasks"],
    robotParameters: [
      { label: "Model", labelZh: "型号", value: "50KG Robot" },
      { label: "Axes", labelZh: "轴数", value: "5" },
      { label: "Maximum Payload", labelZh: "最大负载", value: "50 kg" },
      { label: "Maximum Reach", labelZh: "最大臂展", value: "1800 mm" },
      { label: "Repeatability", labelZh: "重复定位精度", value: "±0.1 mm" },
      { label: "Body Weight", labelZh: "本体重量", value: "500 kg" },
      { label: "Power Capacity", labelZh: "电源容量", value: "6.7 kVA" },
      { label: "Operating Conditions", labelZh: "安装条件", value: "-15-55 C, 20-80% RH, vibration below 4.9 m/s2" },
    ],
    jointParameters: [
      { axis: "Robot height", range: "1800-2800 mm" },
      { axis: "Palletizing height", range: "1800-2300 mm, including pallet" },
      { axis: "Applicable pallet", range: "1200 x 1200 x 140 mm" },
      { axis: "Equipment footprint", range: "1200 x 2600 x 2800 mm" },
    ],
  },
];

export const productModels: ProductModel[] = [...catalogModels, ...portableModels];

export const productDatabase = {
  sourceCatalogs: ["/catalogs/scr-robot-2026-catalog.pdf"],
  extractedImageDirectory: "/products",
  categories: productGroups,
  models: productModels,
};

export function getProductModel(seriesSlug: string, modelSlug: string) {
  return productModels.find(
    (model) => model.seriesSlug === seriesSlug && model.slug === modelSlug,
  );
}

export function getProductModelHref(model: ProductModel, locale: "en" | "zh" = "en") {
  return `${locale === "zh" ? "/zh" : ""}/products/${model.seriesSlug}/${model.slug}`;
}

export function findProductModelByName(name: string, seriesSlug?: string) {
  return productModels.find(
    (model) => model.name === name && (!seriesSlug || model.seriesSlug === seriesSlug),
  );
}
