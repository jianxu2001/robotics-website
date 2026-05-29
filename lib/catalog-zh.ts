import { productSeries, type ProductSeries } from "@/lib/catalog";

const zhSeriesCopy: Record<
  string,
  Pick<ProductSeries, "title" | "category" | "summary" | "applications" | "highlights">
> = {
  "ecr-series": {
    title: "紧凑型四轴搬运机器人",
    category: "通用搬运与轻型码垛",
    summary:
      "ECR 系列覆盖紧凑型四轴机器人，适用于快速、稳定、重复性高的搬运场景，兼顾负载、臂展与性价比。",
    applications: ["机床上下料", "小件搬运", "轻型码垛", "包装线"],
    highlights: [
      "紧凑占地，适合空间有限的自动化单元。",
      "负载范围覆盖 3-100 kg，可满足轻中型搬运需求。",
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
  name: "华南机器人科技（广州）有限公司",
  shortName: "SCR Robot",
  founded: "2017",
  headquarters: "中国广州花都汽车城",
  facility: "约 6,000 平方米生产与工程基地",
  team: "50+ 名员工，20+ 名工程技术人员",
  engineering:
    "团队覆盖机械、电子、电气、软件、视觉技术研发应用与系统集成能力，可为工业客户提供机器人本体、产线集成和非标自动化方案。",
  description:
    "华南机器人科技（广州）有限公司是一家智能工厂解决方案提供商，业务涵盖工业机器人生产制造、设备维修、销售以及行业一站式自动化解决方案。",
};

export const productCategoriesZh = [
  {
    title: "码垛与拆垛自动化",
    description:
      "覆盖高负载四轴机器人、末端码垛单元、拆垛站、托盘流转、输送线和安全防护系统。",
    image: "/images/bejing1%20(2).jpg",
  },
  {
    title: "冲压与锻压自动化",
    description:
      "面向压力机上下料、锻压线、冲压转运和高重复性热加工搬运的专用机器人系统。",
    image: "/images/bejing1%20(3).jpg",
  },
  {
    title: "机床上下料",
    description:
      "紧凑型机器人平台可用于机床上下料、工件转运、夹具配套和非标自动化单元。",
    image: "/images/bejing1%20(1).jpg",
  },
  {
    title: "视觉与输送系统",
    description:
      "支持 3D 视觉拆垛破包投料、滚筒线、动力转弯、吸盘夹具和整线集成。",
    image: "/images/SCR.jpg",
  },
];

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
