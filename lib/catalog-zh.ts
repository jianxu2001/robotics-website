import {
  productSeries,
  type ProductCategory,
  type ProductGroup,
  type ProductSeries,
} from "@/lib/catalog";
import { productModels } from "@/lib/product-data";
import { companyIdentity } from "@/lib/company-identity";

const zhSeriesCopy: Record<
  string,
  Pick<ProductSeries, "title" | "category" | "summary" | "applications" | "highlights">
> = {
  "cr-series": { title: "CR 系列协作码垛工作站", category: "协作码垛", summary: "CR30、CR30L、CR50、CR50L 覆盖 30 kg 与 50 kg 负载，臂展均为 1,900 mm，可选不带升降或标配 500 mm 升降的配置。", applications: ["纸箱码垛", "末端自动化"], highlights: ["四款机型臂展均为 1,900 mm，重复定位精度 ±0.1 mm。", "CR30/CR50：5 轴，不带升降，码垛高度 ≤1,800 mm（含托盘）。", "CR30L/CR50L：6 轴，标准升降 500 mm，可定制，码垛高度 ≤2,300 mm（含托盘）。"] },
  "br-series": { title: "BR 系列协作装箱工作站", category: "协作装箱", summary: "BR-30、BR-50 衔接进料定位、真空抓取和自动装箱，机器人最大行程均为 1,900 mm。", applications: ["进料定位", "真空抓取", "自动装箱"], highlights: ["BR-30：负载 30 kg，画册装箱节拍 ≤15 pcs/min。", "BR-50：负载 50 kg，画册装箱节拍 ≤8 pcs/min。", "适用纸箱长 ≤600 mm、宽 ≤500 mm、高 ≤450 mm。"] },
  "scd-series": { title: "SCD 系列冲压专用机器人", category: "冲压自动化", summary: "SCD30-1850-400 提供 30/50/80 kg 负载配置，适用于冲压转运，臂展可定制。", applications: ["冲压转运", "压力机上下料"], highlights: ["画册负载配置：30/50/80 kg。", "臂展配置：1,850/2,150/2,700 mm，可定制。", "第二轴行程 400 mm。"] },
  "ecr-series": {
    title: "紧凑型四轴搬运机器人",
    category: "通用搬运与轻型码垛",
    summary:
      "ECR 系列覆盖紧凑型四轴机器人，适用于快速、稳定、重复性高的搬运场景，兼顾负载、臂展与性价比。",
    applications: ["机床上下料", "小件搬运", "轻型码垛", "包装线"],
    highlights: [
      "紧凑占地，适合空间有限的自动化单元。",
      "负载范围覆盖 8-100 kg，可满足轻中型搬运需求。",
      "适用于重视投资回报与重复稳定性的生产线。",
    ],
  },
  "sch-series": {
    title: "重载四轴码垛机器人",
    category: "码垛、拆垛与重载搬运",
    summary:
      "SCH 系列面向工业码垛和重载物料搬运，负载可覆盖至 800 kg，适合高强度工厂生产线。",
    applications: ["码垛", "拆垛", "重型工件搬运", "包装生产线"],
    highlights: [
      "型号覆盖广，从紧凑搬运到重载码垛平台均可选择。",
      "部分型号可选装第五、第六轴，便于扩展复杂工况。",
      "适合重复堆垛、上下料、转运等高强度工业应用。",
    ],
  },
  "sar-series": {
    title: "长臂展工业搬运机器人",
    category: "长臂展码垛与转运自动化",
    summary:
      "SAR 系列具备更大的工作范围和重载能力，适用于码垛、产线转运及大型工件搬运。",
    applications: ["码垛", "物料转运", "锻压搬运", "大型工件移动"],
    highlights: [
      "四轴长臂展结构，覆盖更宽作业范围。",
      "重载型号适合高强度物料搬运场景。",
      "可结合工位布局、夹具和输送线进行定制集成。",
    ],
  },
  "scr-series": {
    title: "高负载码垛机器人",
    category: "专用机器人码垛",
    summary:
      "SCR180-3200 是面向终端码垛的大负载四轴机器人，适用于大纸箱、袋装物料及重载工厂物流。",
    applications: ["码垛", "重型纸箱搬运", "袋装堆垛", "末端自动化"],
    highlights: [
      "180 kg 负载与 3,200 mm 臂展，适合大范围码垛布局。",
      "面向更高堆垛高度和产线节拍设计。",
      "可根据项目需求选配第五轴配置。",
    ],
  },
  "srl-series": {
    title: "轻量型四轴搬运机器人",
    category: "紧凑搬运与转运",
    summary:
      "SRL 系列适用于紧凑型生产单元、小型搬运任务和产线侧转运，结构轻巧，部署灵活。",
    applications: ["机床上下料", "轻型转运", "装配辅助", "包装"],
    highlights: [
      "轻量化结构，适合紧凑自动化单元。",
      "适用于直接、稳定的搬运与转运任务。",
      "在中小负载、高频动作场景中具备良好适配性。",
    ],
  },
  "stc-series": {
    title: "冲压转运机器人",
    category: "冲压与压力机自动化",
    summary:
      "STC 系列面向冲压转运和压力机自动化，帮助工厂降低重复人工搬运，提高产线稳定性。",
    applications: ["冲压", "压力机转运", "锻压辅助", "零件上下料"],
    highlights: [
      "专用结构适合冲压线侧转运和压力机自动化。",
      "适合小中负载零件的重复搬运。",
      "可结合非标夹具和产线工装进行项目化配置。",
    ],
  },
  "er-series": {
    title: "六轴工业机器人",
    category: "柔性六轴自动化",
    summary:
      "ER 六轴机器人适用于需要复杂姿态和柔性动作的搬运、上下料及通用自动化任务。",
    applications: ["机床上下料", "柔性搬运", "装配", "通用自动化"],
    highlights: [
      "六轴结构适合复杂接近角度和工件姿态调整。",
      "+/-0.06 mm 重复定位精度，适用于精密搬运任务。",
      "适合机床上下料和紧凑型自动化工作站。",
    ],
  },
};

export const productSeriesZh: ProductSeries[] = productSeries.map((series) => ({
  ...series,
  ...zhSeriesCopy[series.slug],
}));

export const companyProfileZh = {
  name: companyIdentity.nameZh,
  shortName: "SCR Robot",
  founded: "2017",
  headquarters: companyIdentity.addressZh,
  facility: "约 6,000 平方米生产与工程基地",
  team: "截至2025年社保人数83人，工程技术人员30余人",
  engineering:
    "团队覆盖机械、电子、电气、软件、视觉技术研发应用与系统集成能力，可为工业客户提供机器人本体、产线集成和非标自动化方案。",
  description:
    `${companyIdentity.nameZh}是一家智能工厂解决方案提供商，业务涵盖工业机器人生产制造、设备维修、销售以及行业一站式自动化解决方案。`,
};

export const productCategoriesZh: ProductCategory[] = [
  {
    slug: "palletizing-depalletizing-robots",
    title: "码垛/拆垛机器人",
    description:
      "面向终端码垛、拆垛、袋装堆垛、纸箱搬运、托盘流转和完整机器人工作站的四轴机器人平台。",
    image: "/images/products/catalog-2026/sch100-1950-1800.webp",
    series: ["ECR系列", "SCH系列", "SAR系列", "SCR系列"],
  },
  {
    slug: "desktop-robots",
    title: "桌面型机器人",
    description:
      "适用于轻量搬运、小型工装、桌面自动化和空间受限生产单元的紧凑型机器人配置。",
    image: "/images/products/catalog-2026/sch03ae-200-110.webp",
    series: ["SCH-AE系列"],
  },
  {
    slug: "general-purpose-robots",
    title: "通用型机器人",
    description:
      "面向搬运、机床上下料、装配辅助、工件转运和通用工厂自动化的柔性六轴机器人平台。",
    image: "/images/products/catalog-2026/er20-1700.webp",
    series: ["ER系列"],
  },
  {
    slug: "stamping-dedicated-robots",
    title: "冲压专用机器人",
    description:
      "用于压力机上下料、冲压转运、锻压辅助、重复零件搬运和专用工装集成的机器人平台。",
    image: "/images/products/catalog-2026/stc10-1450-400.webp",
    series: ["STC系列", "SAR12系列"],
  },
  {
    slug: "machine-loading-unloading-robots",
    title: "机床上料/下料机器人",
    description:
      "适用于机床上料、下料、工件转运、夹具配套、重复搬运和产线侧紧凑自动化单元。",
    image: "/images/products/catalog-2026/srl10-900-650.webp",
    series: ["SRL系列"],
  },
  {
    slug: "portable-collaborative-robots",
    title: "协作码垛工作站",
    description:
      "CR30、CR30L、CR50、CR50L，臂展均为 1,900 mm，覆盖不带升降和带升降配置。",
    image: "/images/products/cr-palletizer-dark-v1.png",
    series: ["CR系列"],
  },
  { slug: "collaborative-case-packing", title: "协作装箱工作站", description: "BR-30、BR-50 协作装箱机器人，衔接进料定位、真空抓取和自动装箱。", image: "/images/products/br-case-packer-dark-v1.png", series: ["BR系列"] },
];

export const productGroupsZh: ProductGroup[] = [
  {
    ...productCategoriesZh[0],
    productLines: [
      {
        name: "ECR系列",
        description: "紧凑四轴搬运机器人，适用于轻型码垛、转运、包装和高性价比自动化。",
        href: "/zh/products/ecr-series",
      },
      {
        name: "SCH系列",
        description: "重载四轴码垛/拆垛机器人，负载范围覆盖广，可支持 800 kg 级应用。",
        href: "/zh/products/sch-series",
      },
      {
        name: "SAR系列",
        description: "长臂展工业转运机器人，适用于大范围码垛布局和重载物料搬运。",
        href: "/zh/products/sar-series",
      },
      {
        name: "SCR系列",
        description: "高负载专用码垛机器人平台，适用于大型纸箱、袋装物料和末端堆垛。",
        href: "/zh/products/scr-series",
      },
    ],
  },
  {
    ...productCategoriesZh[1],
    productLines: [
      {
        name: "SCH-AE系列",
        description: "紧凑型 SCH-AE 机型，适合桌面级搬运、小型工装和有限空间自动化单元。",
        href: "/zh/products#desktop-robots",
      },
    ],
  },
  {
    ...productCategoriesZh[2],
    productLines: [
      {
        name: "ER系列",
        description: "六轴工业机器人，适用于柔性搬运、上下料、装配辅助和通用生产任务。",
        href: "/zh/products/er-series",
      },
    ],
  },
  {
    ...productCategoriesZh[3],
    productLines: [
      {
        name: "SCD系列", description: "冲压专用机器人，30/50/80 kg 负载配置，臂展可定制。", href: "/zh/products/scd-series", },
      {
        name: "STC系列",
        description: "冲压转运专用机器人，面向压力机侧自动化和重复零件搬运。",
        href: "/zh/products/stc-series",
      },
      {
        name: "SAR12系列",
        description: "紧凑型 SAR12 长臂机器人，可用于冲压转运、上下料和产线侧物料搬运。",
        href: "/zh/products/sar-series",
      },
    ],
  },
  {
    ...productCategoriesZh[4],
    productLines: [
      {
        name: "SRL系列",
        description: "轻量四轴机器人，适用于机床上料、下料、紧凑转运和产线辅助。",
        href: "/zh/products/srl-series",
      },
    ],
  },
  {
    ...productCategoriesZh[5],
    productLines: [
      {
        name: "CR系列", description: "30 kg 与 50 kg 协作码垛工作站，提供不带升降与带升降机型。", href: "/zh/products/cr-series", },
    ],
  },
  { ...productCategoriesZh[6], productLines: [{ name: "BR系列", description: "30 kg 与 50 kg 协作装箱工作站，最大行程 1,900 mm。", href: "/zh/products/br-series" }] },
];

export const productInquiryOptionsZh = [...productGroupsZh.flatMap((group) =>
  group.productLines.map((line) => line.name),
), ...productModels.filter((model) => model.specifications).map((model) => model.name)];

export const industriesZh = [
  "码垛",
  "拆垛",
  "冲压",
  "锻压",
  "机床上下料",
  "3D 视觉破包投料",
  "输送自动化",
  "非标定制自动化",
];

export const automationSolutionsZh = [
  {
    title: "机器人码垛单元",
    description:
      "包含机器人、夹具、托盘库、输送进料、安全围栏、PLC/HMI 和码垛垛型测试。",
  },
  {
    title: "拆垛与投料系统",
    description:
      "支持机器人拆垛、产品识别、夹具设计、下游输送衔接，以及袋装物料 3D 视觉选配。",
  },
  {
    title: "冲压与锻压产线",
    description:
      "覆盖压力机上下料、工件转运、热加工搬运、工装夹具、互锁与安全集成。",
  },
  {
    title: "输送线自动化",
    description:
      "提供动力滚筒线、转弯滚筒、锥形滚筒、无动力滚筒、便捷式码垛和定制夹具。",
  },
];

export const commonEnvironmentZh = [
  "标准工作温度：0-45 C",
  "相对湿度：20-80% RH，无凝露",
  "振动：低于 4.9 m/s2",
  "避免易燃、腐蚀性气体或液体环境",
  "避免水、油、粉尘污染及强电磁源附近使用",
];
