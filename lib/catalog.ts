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
  name: "South China Robotics Technology (Guangzhou) Co., Ltd.",
  shortName: "SCR Robot",
  founded: "2017",
  headquarters: "Huadu Auto City, Guangzhou, China",
  facility: "6,000 m2 manufacturing and engineering base",
  team: "50+ employees with 20+ engineering and technical specialists",
  engineering:
    "A multidisciplinary team covering mechanical design, electronics, electrical controls, software, vision technology, robot application engineering, and system integration.",
  description:
    "South China Robotics Technology (Guangzhou) Co., Ltd. is an intelligent factory solution provider focused on industrial robot manufacturing, equipment service, robot sales, and one-stop automation systems for demanding production environments.",
};

export const productCategories: ProductCategory[] = [
  {
    slug: "palletizing-depalletizing-robots",
    title: "Palletizing / Depalletizing Robots",
    description:
      "Four-axis robot platforms for end-of-line palletizing, depalletizing, bag stacking, carton handling, pallet flow, and complete robot cells.",
    image: "/product-renders/scr180-3200.png",
    series: ["ECR Series", "SCH Series", "SAR Series", "SCR Series"],
  },
  {
    slug: "desktop-robots",
    title: "Desktop Robots",
    description:
      "Compact desktop-class robot configurations for light handling, small work cells, laboratory-style automation, and limited-space production lines.",
    image: "/product-renders/sch03ae-200-110.png",
    series: ["SCH-AE Series"],
  },
  {
    slug: "general-purpose-robots",
    title: "General-Purpose Robots",
    description:
      "Flexible six-axis robot platforms for handling, machine tending, assembly support, part transfer, and general factory automation.",
    image: "/product-renders/er20-1700.png",
    series: ["ER Series"],
  },
  {
    slug: "stamping-dedicated-robots",
    title: "Stamping Dedicated Robots",
    description:
      "Dedicated robot platforms for press loading, stamping transfer, forging support, repetitive part movement, and line-specific tooling.",
    image: "/product-renders/stc10-1450-400.png",
    series: ["STC Series", "SAR12 Series"],
  },
  {
    slug: "machine-loading-unloading-robots",
    title: "Machine Loading / Unloading Robots",
    description:
      "Compact robot systems for machine loading, unloading, part transfer, fixtures, repetitive handling, and line-side production cells.",
    image: "/product-renders/srl20-1500-1000.png",
    series: ["SRL Series"],
  },
  {
    slug: "portable-collaborative-robots",
    title: "Portable Collaborative Robots",
    description:
      "Portable collaborative robot options for flexible production assistance, mobile handling cells, and applications that require fast redeployment.",
    image: "/product-renders/portable-50kg-robot.png",
    series: ["30 kg Robot", "50 kg Robot"],
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
        href: "/products/sch-series",
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
        name: "30 kg Robot",
        description: "Portable collaborative robot option for flexible medium-payload handling and mobile workstation concepts.",
        href: "/products/portable-collaborative-robots/portable-30kg-robot",
      },
      {
        name: "50 kg Robot",
        description: "Higher-payload portable collaborative option for heavier handling tasks that still require flexible deployment.",
        href: "/products/portable-collaborative-robots/portable-50kg-robot",
      },
    ],
  },
];

export const productInquiryOptions = productGroups.flatMap((group) =>
  group.productLines.map((line) => line.name),
);

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

export const productSeries: ProductSeries[] = [
  {
    slug: "ecr-series",
    series: "ECR Series",
    title: "Compact Four-Axis Handling Robots",
    category: "Palletizing / depalletizing and compact handling",
    summary:
      "The ECR range covers compact four-axis robots for fast, repeatable handling where payload, reach, and cost efficiency need to stay balanced.",
    image: "/product-renders/ecr50-1850.png",
    payloadRange: "3-100 kg",
    reachRange: "200-2,050 mm",
    axes: "4-axis",
    repeatability: "卤0.02-卤0.10 mm",
    applications: ["Machine tending", "Small-part handling", "Light palletizing", "Packaging"],
    highlights: [
      "Compact footprint for production cells with limited space.",
      "Wide payload coverage from light 3 kg handling to 100 kg duty.",
      "Suitable for cost-sensitive automation and repeatable transfer tasks.",
    ],
    models: [
      { name: "ECR8-1200", axes: "4", payload: "8 kg", reach: "1,173 mm", repeatability: "卤0.06 mm", bodyWeight: "60 kg", power: "2.45 kVA" },
      { name: "ECR10-1400", axes: "4", payload: "10 kg", reach: "1,430 mm", repeatability: "卤0.06 mm", bodyWeight: "90 kg", power: "2.9 kVA" },
      { name: "ECR30-1850", axes: "4", payload: "30 kg", reach: "2,050 mm", repeatability: "卤0.10 mm", bodyWeight: "211 kg", power: "3.4 kVA" },
      { name: "ECR50-1850", axes: "4", payload: "50 kg", reach: "2,050 mm", repeatability: "卤0.10 mm", bodyWeight: "370 kg", power: "6.8 kVA" },
      { name: "ECR100-1850", axes: "4", payload: "100 kg", reach: "2,050 mm", repeatability: "卤0.10 mm", bodyWeight: "440 kg", power: "8.55 kVA" },
    ],
  },
  {
    slug: "sch-series",
    series: "SCH Series",
    title: "Heavy-Duty Four-Axis Palletizing Robots",
    category: "Palletizing / depalletizing robots",
    summary:
      "SCH robots are designed for industrial palletizing and heavy material handling, with payload options extending up to 800 kg for demanding factory lines.",
    image: "/product-renders/sch210e-2350-1650.png",
    payloadRange: "3-800 kg",
    reachRange: "200-3,500 mm",
    axes: "4-axis, optional 5th/6th axis on selected models",
    repeatability: "卤0.04-卤1.50 mm",
    applications: ["Palletizing", "Depalletizing", "Heavy workpiece handling", "Packaging lines"],
    highlights: [
      "Broad model range from compact handling robots to heavy palletizing platforms.",
      "Selected models support optional fifth and sixth axis expansion.",
      "Built for repeatable stacking, loading, and industrial transfer applications.",
    ],
    models: [
      { name: "SCH03AE-200-110", axes: "4", payload: "3 kg", reach: "200 mm", repeatability: "卤0.02 mm", bodyWeight: "16 kg", power: "0.7 kVA" },
      { name: "SCH05AE-400-200", axes: "4", payload: "5 kg", reach: "400 mm", repeatability: "卤0.04 mm", bodyWeight: "28 kg", power: "1.1 kVA" },
      { name: "SCH05AE-600-200", axes: "4", payload: "5 kg", reach: "600 mm", repeatability: "卤0.08 mm", bodyWeight: "32 kg", power: "1.1 kVA" },
      { name: "SCH05A-600-200", axes: "4", payload: "5 kg", reach: "600 mm", repeatability: "卤0.08 mm", bodyWeight: "36 kg", power: "1.1 kVA" },
      { name: "SCH10AE-1300-450", axes: "4", payload: "10 kg", reach: "1,300 mm", repeatability: "卤0.08 mm", bodyWeight: "100 kg", power: "2.1 kVA" },
      { name: "SCH10AE-800-450", axes: "4", payload: "10 kg", reach: "800 mm", repeatability: "卤0.08 mm", bodyWeight: "60 kg", power: "2.1 kVA" },
      { name: "SCH10D-800-400", axes: "4", payload: "10 kg", reach: "800 mm", repeatability: "卤0.15 mm", bodyWeight: "60 kg", power: "1.5 kVA" },
      { name: "SCH20D-1300-400", axes: "4", payload: "20 kg", reach: "1,300 mm", repeatability: "卤0.15 mm", bodyWeight: "158 kg", power: "1.5 kVA" },
      { name: "SCH20D-1950-1850", axes: "4", payload: "20 kg", reach: "1,950 mm", repeatability: "卤0.50 mm", bodyWeight: "250 kg", power: "3.0 kVA" },
      { name: "SCH30D-1950-1800", axes: "4", payload: "30 kg", reach: "1,950 mm", repeatability: "卤0.50 mm", bodyWeight: "290 kg", power: "3.0 kVA" },
      { name: "SCH50-1950-1800", axes: "4", payload: "50 kg", reach: "1,950 mm", repeatability: "卤0.50 mm", bodyWeight: "580 kg", power: "5.75 kVA" },
      { name: "SCH80-1950-1800", axes: "4", payload: "80 kg", reach: "1,950 mm", repeatability: "卤0.50 mm", bodyWeight: "580 kg", power: "5.75 kVA" },
      { name: "SCH100-1950-1800", axes: "4", payload: "100 kg", reach: "1,950 mm", repeatability: "卤0.50 mm", bodyWeight: "680 kg", power: "5.75 kVA" },
      { name: "SCH100S-1950-1800", axes: "4", payload: "100 kg", reach: "1,950 mm", repeatability: "卤0.50 mm", bodyWeight: "550 kg", power: "4.4 kVA" },
      { name: "SCH130E-1950-1800", axes: "4", payload: "130 kg", reach: "1,950 mm", repeatability: "卤0.50 mm", bodyWeight: "450 kg", power: "5.3 kVA" },
      { name: "SCH210E-2350-1650", axes: "4", payload: "210 kg", reach: "2,350 mm", repeatability: "卤0.50 mm", bodyWeight: "1,200 kg", power: "7.5 kVA" },
      { name: "SCH300E-2350-1650", axes: "4", payload: "300 kg", reach: "2,350 mm", repeatability: "卤0.50 mm", bodyWeight: "2,600 kg", power: "19.0 kVA" },
      { name: "SCH500~800E-3200-1650", axes: "4", payload: "500/600/800 kg", reach: "3,200/2,800 mm", repeatability: "卤0.50 mm", bodyWeight: "2,800/3,300 kg", power: "21.0/23.0 kVA" },
    ],
  },
  {
    slug: "sar-series",
    series: "SAR Series",
    title: "Long-Reach Industrial Transfer Robots",
    category: "Palletizing / depalletizing and long-reach transfer",
    summary:
      "The SAR range supports large working envelopes and heavy payloads for industrial transfer, palletizing, and line-side handling.",
    image: "/product-renders/sar500-800-3500-3100.png",
    payloadRange: "12-800 kg",
    reachRange: "1,454-3,500 mm",
    axes: "4-axis",
    repeatability: "卤0.15-卤1.50 mm",
    applications: ["Palletizing", "Material transfer", "Forging handling", "Large workpiece movement"],
    highlights: [
      "Long-reach four-axis structure for wide work areas.",
      "Heavy payload versions for demanding material handling.",
      "Configurable robot colors and selected optional axis configurations.",
    ],
    models: [
      { name: "SAR12-1400", axes: "4", payload: "12 kg", reach: "1,454 mm", repeatability: "卤0.15 mm", bodyWeight: "135 kg", power: "3.0 kVA" },
      { name: "SAR80-2450-2300", axes: "4", payload: "80 kg", reach: "2,450 mm", repeatability: "卤1.00 mm", bodyWeight: "450 kg", power: "3.5 kVA" },
      { name: "SAR130-2550-2400", axes: "4", payload: "130 kg", reach: "2,550 mm", repeatability: "卤1.00 mm", bodyWeight: "780 kg", power: "5.5 kVA" },
      { name: "SAR210/300-2650-2300", axes: "4", payload: "210/300 kg", reach: "2,650 mm", repeatability: "卤1.00 mm", bodyWeight: "1,150/1,250 kg", power: "7.0/7.5 kVA" },
      { name: "SAR500/800-3500-3100", axes: "4", payload: "500/800 kg", reach: "3,500 mm", repeatability: "卤1.50 mm", bodyWeight: "1,850/2,100 kg", power: "11.0/13.0 kVA" },
    ],
  },
  {
    slug: "scr-series",
    series: "SCR Series",
    title: "High-Payload Palletizing Robot",
    category: "Palletizing / depalletizing robots",
    summary:
      "The SCR180-3200 is a dedicated high-payload four-axis robot for end-of-line palletizing, large cartons, bags, and heavy factory loads.",
    image: "/product-renders/scr180-3200.png",
    payloadRange: "180 kg",
    reachRange: "3,200 mm",
    axes: "4-axis, optional 5th axis",
    repeatability: "卤0.50 mm",
    applications: ["Palletizing", "Heavy carton handling", "Bag stacking", "End-of-line automation"],
    highlights: [
      "180 kg payload with 3,200 mm reach for large palletizing layouts.",
      "Designed for demanding stacking height and production throughput.",
      "Optional fifth-axis configuration available for selected applications.",
    ],
    models: [
      { name: "SCR180-3200", axes: "4", payload: "180 kg", reach: "3,200 mm", repeatability: "卤0.50 mm", bodyWeight: "1,450 kg", power: "18.0 kVA" },
    ],
  },
  {
    slug: "srl-series",
    series: "SRL Series",
    title: "Lightweight Four-Axis Handling Robots",
    category: "Machine loading / unloading robots",
    summary:
      "SRL robots provide lightweight four-axis automation for compact production cells, small handling tasks, and line-side transfer.",
    image: "/product-renders/srl20-1500-1000.png",
    payloadRange: "10-20 kg",
    reachRange: "900-1,500 mm",
    axes: "4-axis",
    repeatability: "卤0.15-卤0.20 mm",
    applications: ["Machine tending", "Light transfer", "Assembly support", "Packaging"],
    highlights: [
      "Compact aluminum-color body for lightweight automation cells.",
      "Designed for straightforward handling and transfer tasks.",
      "Good fit where payload requirements are moderate and speed matters.",
    ],
    models: [
      { name: "SRL10-900-650", axes: "4", payload: "10 kg", reach: "900 mm", repeatability: "卤0.15 mm", bodyWeight: "60 kg", power: "2.3 kVA" },
      { name: "SRL20-1500-1000", axes: "4", payload: "20 kg", reach: "1,500 mm", repeatability: "卤0.20 mm", bodyWeight: "80 kg", power: "2.3 kVA" },
    ],
  },
  {
    slug: "stc-series",
    series: "STC Series",
    title: "Stamping Transfer Robots",
    category: "Stamping dedicated robots",
    summary:
      "The STC range is built for stamping transfer and press automation, helping factories reduce manual handling around repetitive press operations.",
    image: "/product-renders/stc10-1450-400.png",
    payloadRange: "5-10 kg",
    reachRange: "1,250-1,450 mm",
    axes: "4-axis",
    repeatability: "卤0.15 mm",
    applications: ["Stamping", "Press transfer", "Forging support", "Part loading"],
    highlights: [
      "Dedicated structure for press-side transfer and stamping automation.",
      "Compact payload range for repeatable part movement.",
      "Supports non-standard fixtures and line-specific tooling.",
    ],
    models: [
      { name: "STC5-1250-400", axes: "4", payload: "5 kg", reach: "1,250 mm", repeatability: "卤0.15 mm", bodyWeight: "220 kg", power: "2.0 kVA" },
      { name: "STC10-1450-400", axes: "4", payload: "10 kg", reach: "1,450 mm", repeatability: "卤0.15 mm", bodyWeight: "230 kg", power: "2.3 kVA" },
    ],
  },
  {
    slug: "er-series",
    series: "ER Series",
    title: "Six-Axis Industrial Robots",
    category: "General-purpose robots",
    summary:
      "ER six-axis robots support flexible motion for handling, tending, and general automation tasks requiring articulated reach.",
    image: "/product-renders/er20-1700.png",
    payloadRange: "10-20 kg",
    reachRange: "1,400-1,717 mm",
    axes: "6-axis",
    repeatability: "卤0.06 mm",
    applications: ["Machine tending", "Flexible handling", "Assembly", "General automation"],
    highlights: [
      "Six-axis flexibility for complex approach angles and part orientation.",
      "Repeatability of 卤0.06 mm for precise handling tasks.",
      "Useful for machine tending and compact automated workstations.",
    ],
    models: [
      { name: "ER10-1400", axes: "6", payload: "10 kg", reach: "1,400 mm", repeatability: "卤0.06 mm", bodyWeight: "168 kg", power: "3.5 kVA" },
      { name: "ER20-1700", axes: "6", payload: "20 kg", reach: "1,717 mm", repeatability: "卤0.06 mm", bodyWeight: "280 kg", power: "5.5 kVA" },
    ],
  },
];

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

