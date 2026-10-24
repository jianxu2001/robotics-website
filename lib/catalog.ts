import { getProductModelsBySeries, productModels } from "@/lib/product-data";

export type ProductSeries = {
  slug: string;
  series: string;
  title: string;
  category: string;
  summary: string;
  image: string;
  payloadRange: string;
  reachRange: string;
  axes: string;
  repeatability: string;
  applications: string[];
  highlights: string[];
  models: {
    name: string;
    axes: string;
    payload: string;
    reach: string;
    repeatability: string;
    bodyWeight: string;
    power: string;
  }[];
};

export type ProductCategory = {
  slug: string;
  title: string;
  description: string;
  image: string;
  series: string[];
};

export type ProductLine = {
  name: string;
  description: string;
  href: string;
};

export type ProductGroup = ProductCategory & {
  productLines: ProductLine[];
};

export const companyProfile = {
  name: "South China Robotics Technology (Guangdong) Co., Ltd.",
  shortName: "SCR Robot",
  founded: "2017",
  headquarters: "Huadu Auto City, Guangzhou, China",
  facility: "6,000 m2 manufacturing and engineering base",
  team: "83 insured employees as of 2025, including 30+ engineering and technical specialists",
  engineering:
    "A multidisciplinary team covering mechanical design, electronics, electrical controls, software, vision technology, robot application engineering, and system integration.",
  description:
    "South China Robotics Technology (Guangdong) Co., Ltd. is an intelligent factory solution provider focused on industrial robot manufacturing, equipment service, robot sales, and one-stop automation systems for demanding production environments.",
};

export const productCategories: ProductCategory[] = [
  {
    slug: "palletizing-depalletizing-robots",
    title: "Palletizing / Depalletizing Robots",
    description:
      "Four-axis robot platforms for end-of-line palletizing, depalletizing, bag stacking, carton handling, pallet flow, and complete robot cells.",
    image: "/images/bejing1%20(2).jpg",
    series: ["ECR Series", "SCH Series", "SAR Series", "SCR Series"],
  },
  {
    slug: "desktop-robots",
    title: "Desktop Robots",
    description:
      "Compact desktop-class robot configurations for light handling, small work cells, laboratory-style automation, and limited-space production lines.",
    image: "/images/bejing1%20(1).jpg",
    series: ["SCH-AE Series"],
  },
  {
    slug: "general-purpose-robots",
    title: "General-Purpose Robots",
    description:
      "Flexible six-axis robot platforms for handling, machine tending, assembly support, part transfer, and general factory automation.",
    image: "/images/bejing1%20(1).jpg",
    series: ["ER Series"],
  },
  {
    slug: "stamping-dedicated-robots",
    title: "Stamping Dedicated Robots",
    description:
      "Dedicated robot platforms for press loading, stamping transfer, forging support, repetitive part movement, and line-specific tooling.",
    image: "/images/bejing1%20(3).jpg",
    series: ["STC Series", "SAR12 Series"],
  },
  {
    slug: "machine-loading-unloading-robots",
    title: "Machine Loading / Unloading Robots",
    description:
      "Compact robot systems for machine loading, unloading, part transfer, fixtures, repetitive handling, and line-side production cells.",
    image: "/images/bejing1%20(3).jpg",
    series: ["SRL Series"],
  },
  {
    slug: "portable-collaborative-robots",
    title: "Collaborative Palletizing Workstations",
    description:
      "CR30, CR30L, CR50 and CR50L workstations with 1,900 mm reach, fixed-base and lifting configurations.",
    image: "/images/products/cr-palletizer-dark-v1.png",
    series: ["CR Series"],
  },
  {
    slug: "collaborative-case-packing", title: "Collaborative Case Packing",
    description: "BR-30 and BR-50 workstations for product infeed, vacuum handling and automatic carton packing.",
    image: "/images/products/br-case-packer-dark-v1.png", series: ["BR Series"],
  },

];

export const productGroups: ProductGroup[] = [
  {
    ...productCategories[0],
    productLines: [
      {
        name: "ECR Series",
        description: "Compact four-axis handling robots for light palletizing, transfer, packaging, and cost-sensitive automation.",
        href: "/products/ecr-series",
      },
      {
        name: "SCH Series",
        description: "Heavy-duty four-axis palletizing and depalletizing robots with broad payload coverage up to 800 kg.",
        href: "/products/sch-series",
      },
      {
        name: "SAR Series",
        description: "Long-reach industrial transfer robots for wide work areas, palletizing layouts, and heavy material movement.",
        href: "/products/sar-series",
      },
      {
        name: "SCR Series",
        description: "Dedicated high-payload palletizing robot platform for large cartons, bags, and end-of-line stacking.",
        href: "/products/scr-series",
      },
    ],
  },
  {
    ...productCategories[1],
    productLines: [
      {
        name: "SCH-AE Series",
        description: "Compact SCH-AE models for desktop-class handling, small fixtures, and limited-space automation cells.",
        href: "/products/desktop-robots",
      },
    ],
  },
  {
    ...productCategories[2],
    productLines: [
      {
        name: "ER Series",
        description: "Six-axis industrial robots for flexible handling, tending, assembly support, and general production tasks.",
        href: "/products/er-series",
      },
    ],
  },
  {
    ...productCategories[3],
    productLines: [
      {
        name: "SCD Series",
        description: "Dedicated stamping robots with 30/50/80 kg payload configurations and customizable reach.",
        href: "/products/scd-series",
      },
      {
        name: "STC Series",
        description: "Dedicated stamping transfer robots for press-side automation and repetitive part movement.",
        href: "/products/stc-series",
      },
      {
        name: "SAR12 Series",
        description: "Compact SAR12 long-arm robot option for stamping transfer, tending, and line-side material handling.",
        href: "/products/sar-series",
      },
    ],
  },
  {
    ...productCategories[4],
    productLines: [
      {
        name: "SRL Series",
        description: "Lightweight four-axis robots for machine loading, unloading, compact transfer, and production support.",
        href: "/products/srl-series",
      },
    ],
  },
  {
    ...productCategories[5],
    productLines: [
      {
        name: "CR Series",
        description: "30 kg and 50 kg collaborative palletizing workstations, with or without a lifting axis.",
        href: "/products/cr-series",
      },
    ],
  },
  { ...productCategories[6], productLines: [{ name: "BR Series", description: "30 kg and 50 kg collaborative case packing workstations with 1,900 mm maximum travel.", href: "/products/br-series" }] },
];

export const productInquiryOptions = [...productGroups.flatMap((group) =>
  group.productLines.map((line) => line.name),
), ...productModels.filter((model) => model.specifications).map((model) => model.name)];

export const industries = [
  "Palletizing",
  "Depalletizing",
  "Stamping",
  "Forging",
  "Machine tending",
  "3D vision bag breaking",
  "Conveyor automation",
  "Custom non-standard automation",
];

const productSeriesDefinitions: Omit<ProductSeries, "models">[] = [
  {
    slug: "ecr-series",
    series: "ECR Series",
    title: "Compact Four-Axis Handling Robots",
    category: "Palletizing / depalletizing and compact handling",
    summary:
      "The ECR range covers compact four-axis robots for fast, repeatable handling where payload, reach, and cost efficiency need to stay balanced.",
    image: "/images/bejing1%20(1).jpg",
    payloadRange: "3-100 kg",
    reachRange: "200-2,050 mm",
    axes: "4-axis",
    repeatability: "±0.02-±0.10 mm",
    applications: ["Machine tending", "Small-part handling", "Light palletizing", "Packaging"],
    highlights: [
      "Compact footprint for production cells with limited space.",
      "Payload coverage from 8 kg to 100 kg for compact handling tasks.",
      "Suitable for cost-sensitive automation and repeatable transfer tasks.",
    ],
  },
  {
    slug: "sch-series",
    series: "SCH Series",
    title: "Heavy-Duty Four-Axis Palletizing Robots",
    category: "Palletizing / depalletizing robots",
    summary:
      "SCH robots are designed for industrial palletizing and heavy material handling, with payload options extending up to 800 kg for demanding factory lines.",
    image: "/images/bejing1%20(2).jpg",
    payloadRange: "3-800 kg",
    reachRange: "200-3,500 mm",
    axes: "4-axis, optional 5th/6th axis on selected models",
    repeatability: "±0.04-±1.50 mm",
    applications: ["Palletizing", "Depalletizing", "Heavy workpiece handling", "Packaging lines"],
    highlights: [
      "Broad model range from compact handling robots to heavy palletizing platforms.",
      "Selected models support optional fifth and sixth axis expansion.",
      "Built for repeatable stacking, loading, and industrial transfer applications.",
    ],
  },
  {
    slug: "sar-series",
    series: "SAR Series",
    title: "Long-Reach Industrial Transfer Robots",
    category: "Palletizing / depalletizing and long-reach transfer",
    summary:
      "The SAR range supports large working envelopes and heavy payloads for industrial transfer, palletizing, and line-side handling.",
    image: "/images/bejing1%20(1).jpg",
    payloadRange: "12-800 kg",
    reachRange: "1,454-3,500 mm",
    axes: "4-axis",
    repeatability: "±0.15-±1.50 mm",
    applications: ["Palletizing", "Material transfer", "Forging handling", "Large workpiece movement"],
    highlights: [
      "Long-reach four-axis structure for wide work areas.",
      "Heavy payload versions for demanding material handling.",
      "Configurable robot colors and selected optional axis configurations.",
    ],
  },
  {
    slug: "scr-series",
    series: "SCR Series",
    title: "High-Payload Palletizing Robot",
    category: "Palletizing / depalletizing robots",
    summary:
      "The SCR180-3200 is a dedicated high-payload four-axis robot for end-of-line palletizing, large cartons, bags, and heavy factory loads.",
    image: "/images/bejing1%20(2).jpg",
    payloadRange: "180 kg",
    reachRange: "3,200 mm",
    axes: "4-axis, optional 5th axis",
    repeatability: "±0.50 mm",
    applications: ["Palletizing", "Heavy carton handling", "Bag stacking", "End-of-line automation"],
    highlights: [
      "180 kg payload with 3,200 mm reach for large palletizing layouts.",
      "Designed for demanding stacking height and production throughput.",
      "Optional fifth-axis configuration available for selected applications.",
    ],
  },
  {
    slug: "srl-series",
    series: "SRL Series",
    title: "Lightweight Four-Axis Handling Robots",
    category: "Machine loading / unloading robots",
    summary:
      "SRL robots provide lightweight four-axis automation for compact production cells, small handling tasks, and line-side transfer.",
    image: "/images/bejing1%20(3).jpg",
    payloadRange: "10-20 kg",
    reachRange: "900-1,500 mm",
    axes: "4-axis",
    repeatability: "±0.15-±0.20 mm",
    applications: ["Machine tending", "Light transfer", "Assembly support", "Packaging"],
    highlights: [
      "Compact aluminum-color body for lightweight automation cells.",
      "Designed for straightforward handling and transfer tasks.",
      "Good fit where payload requirements are moderate and speed matters.",
    ],
  },
  {
    slug: "stc-series",
    series: "STC Series",
    title: "Stamping Transfer Robots",
    category: "Stamping dedicated robots",
    summary:
      "The STC range is built for stamping transfer and press automation, helping factories reduce manual handling around repetitive press operations.",
    image: "/images/bejing1%20(3).jpg",
    payloadRange: "5-10 kg",
    reachRange: "1,250-1,450 mm",
    axes: "4-axis",
    repeatability: "±0.15 mm",
    applications: ["Stamping", "Press transfer", "Forging support", "Part loading"],
    highlights: [
      "Dedicated structure for press-side transfer and stamping automation.",
      "Compact payload range for repeatable part movement.",
      "Supports non-standard fixtures and line-specific tooling.",
    ],
  },
  {
    slug: "er-series",
    series: "ER Series",
    title: "Six-Axis Industrial Robots",
    category: "General-purpose robots",
    summary:
      "ER six-axis robots support flexible motion for handling, tending, and general automation tasks requiring articulated reach.",
    image: "/images/bejing1%20(1).jpg",
    payloadRange: "10-20 kg",
    reachRange: "1,400-1,717 mm",
    axes: "6-axis",
    repeatability: "±0.06 mm",
    applications: ["Machine tending", "Flexible handling", "Assembly", "General automation"],
    highlights: [
      "Six-axis flexibility for complex approach angles and part orientation.",
      "Repeatability of ±0.06 mm for precise handling tasks.",
      "Useful for machine tending and compact automated workstations.",
    ],
  },
{
  "slug": "scd-series",
  "series": "SCD Series",
  "title": "Dedicated Stamping Robots",
  "category": "Stamping automation",
  "summary": "SCD30-1850-400 supports 30/50/80 kg payload configurations and customizable reach for press-side transfer.",
  "image": "/images/bejing1%20(3).jpg",
  "payloadRange": "30-80 kg",
  "reachRange": "1,850-2,700 mm",
  "axes": "4-axis",
  "repeatability": "±0.15 mm",
  "applications": [
    "Stamping transfer",
    "Press loading",
    "Part transfer"
  ],
  "highlights": [
    "30/50/80 kg catalog payload configurations.",
    "1,850/2,150/2,700 mm catalog reach options; custom reach available.",
    "400 mm second-axis stroke."
  ]
},
{
  "slug": "cr-series",
  "series": "CR Series",
  "title": "Collaborative Palletizing Workstations",
  "category": "Collaborative palletizing",
  "summary": "Compare CR30, CR30L, CR50 and CR50L: 30 kg or 50 kg payload, 1,900 mm reach, and fixed-base or 500 mm lifting configurations.",
  "image": "/images/products/cr-palletizer-dark-v1.png",
  "payloadRange": "30-50 kg",
  "reachRange": "1,900 mm",
  "axes": "5/6-axis",
  "repeatability": "±0.1 mm",
  "applications": [
    "Carton palletizing",
    "End-of-line automation"
  ],
  "highlights": [
    "All four models have 1,900 mm reach and ±0.1 mm repeatability.",
    "CR30/CR50: 5 axes, without lifting; palletizing height up to 1,800 mm including the pallet.",
    "CR30L/CR50L: 6 axes, standard 500 mm lifting stroke; palletizing height up to 2,300 mm including the pallet."
  ]
},
{
  "slug": "br-series",
  "series": "BR Series",
  "title": "Collaborative Case Packing Workstations",
  "category": "Carton packing automation",
  "summary": "BR-30 and BR-50 combine product infeed, vacuum handling and automatic carton packing with 1,900 mm maximum robot travel.",
  "image": "/images/products/br-case-packer-dark-v1.png",
  "payloadRange": "30-50 kg",
  "reachRange": "1,900 mm",
  "axes": "—",
  "repeatability": "—",
  "applications": [
    "Product infeed",
    "Vacuum handling",
    "Carton packing"
  ],
  "highlights": [
    "BR-30: 30 kg payload and catalog packing rate up to 15 pcs/min.",
    "BR-50: 50 kg payload and catalog packing rate up to 8 pcs/min.",
    "Carton dimensions: length ≤600 mm, width ≤500 mm and height ≤450 mm."
  ]
},

];

function parameterRange(values: string[], unit: string, signed = false) {
  const numbers = values.flatMap((value) => (value.replaceAll(",", "").match(/\d+(?:\.\d+)?/g) ?? []).map(Number));
  if (!numbers.length) return "—";
  const min = Math.min(...numbers), max = Math.max(...numbers);
  const format = (value: number) => `${signed ? "±" : ""}${value.toLocaleString("en-US", { maximumFractionDigits: 3 })}`;
  return `${format(min)}${min === max ? "" : `–${format(max)}`} ${unit}`;
}
export const productSeries: ProductSeries[] = productSeriesDefinitions.map((series) => {
  const models = getProductModelsBySeries(series.slug);
  return {
    ...series, models,
    payloadRange: parameterRange(models.map((model) => model.payload), "kg"),
    reachRange: parameterRange(models.map((model) => model.reach), "mm"),
    repeatability: parameterRange(models.map((model) => model.repeatability), "mm", true),
  };
});

export const automationSolutions = [
  {
    title: "Robotic Palletizing Cells",
    description:
      "Robot arm, gripper, pallet magazine, conveyor infeed, safety guarding, PLC/HMI, and tested pallet patterns.",
  },
  {
    title: "Depalletizing & Material Feeding",
    description:
      "Robot depalletizing, product detection, gripper tooling, downstream handoff, and 3D vision options for bags and irregular loads.",
  },
  {
    title: "Stamping & Forging Lines",
    description:
      "Press loading, part transfer, hot-work handling, fixtures, interlocks, and line-specific safety integration.",
  },
  {
    title: "Conveyor Automation",
    description:
      "Powered roller lines, turning rollers, conical rollers, unpowered rollers, portable palletizing systems, suction cups, and custom grippers.",
  },
];

export const commonEnvironment = [
  "Standard robot operating temperature: 0-45 C",
  "Relative humidity: 20-80% RH, non-condensing",
  "Vibration: below 4.9 m/s2",
  "No flammable or corrosive gas/liquid exposure",
  "Avoid water, oil, powder contamination, and strong electromagnetic sources",
];
