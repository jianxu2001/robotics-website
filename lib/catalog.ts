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

export const productCategories = [
  {
    title: "Palletizing & Depalletizing",
    description:
      "High-payload four-axis robots, end-of-line palletizing cells, depalletizing stations, pallet flow, conveyors, and safety systems.",
    image: "/images/bejing1%20(2).jpg",
  },
  {
    title: "Stamping & Forging Automation",
    description:
      "Dedicated multi-joint robots and transfer units for press loading, forging lines, stamping transfer, and hot-work handling.",
    image: "/images/bejing1%20(3).jpg",
  },
  {
    title: "Machine Tending",
    description:
      "Compact robot platforms for machine loading and unloading, part transfer, production fixtures, and non-standard automation.",
    image: "/images/bejing1%20(1).jpg",
  },
  {
    title: "Vision & Conveyor Systems",
    description:
      "3D vision bag breaking, material feeding, roller conveyors, powered turns, grippers, suction tooling, and custom line integration.",
    image: "/images/SCR.jpg",
  },
];

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
    category: "General handling and light palletizing",
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
      "Wide payload coverage from light 3 kg handling to 100 kg duty.",
      "Suitable for cost-sensitive automation and repeatable transfer tasks.",
    ],
    models: [
      { name: "ECR8-1200", axes: "4", payload: "8 kg", reach: "1,173 mm", repeatability: "±0.06 mm", bodyWeight: "60 kg", power: "2.45 kVA" },
      { name: "ECR10-1400", axes: "4", payload: "10 kg", reach: "1,430 mm", repeatability: "±0.06 mm", bodyWeight: "90 kg", power: "2.9 kVA" },
      { name: "ECR30-1850", axes: "4", payload: "30 kg", reach: "2,050 mm", repeatability: "±0.10 mm", bodyWeight: "211 kg", power: "3.4 kVA" },
      { name: "ECR50-1850", axes: "4", payload: "50 kg", reach: "2,050 mm", repeatability: "±0.10 mm", bodyWeight: "370 kg", power: "6.8 kVA" },
      { name: "ECR100-1850", axes: "4", payload: "100 kg", reach: "2,050 mm", repeatability: "±0.10 mm", bodyWeight: "440 kg", power: "8.55 kVA" },
    ],
  },
  {
    slug: "sch-series",
    series: "SCH Series",
    title: "Heavy-Duty Four-Axis Palletizing Robots",
    category: "Palletizing, depalletizing, and heavy handling",
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
    models: [
      { name: "SCH03AE-200-110", axes: "4", payload: "3 kg", reach: "200 mm", repeatability: "±0.02 mm", bodyWeight: "16 kg", power: "0.7 kVA" },
      { name: "SCH10AE-1300-450", axes: "4", payload: "10 kg", reach: "1,300 mm", repeatability: "±0.08 mm", bodyWeight: "100 kg", power: "2.1 kVA" },
      { name: "SCH50-1950-1800", axes: "4", payload: "50 kg", reach: "1,950 mm", repeatability: "±0.50 mm", bodyWeight: "580 kg", power: "5.75 kVA" },
      { name: "SCH100-1950-1800", axes: "4", payload: "100 kg", reach: "1,950 mm", repeatability: "±0.50 mm", bodyWeight: "680 kg", power: "5.75 kVA" },
      { name: "SCH210E-2350-1650", axes: "4", payload: "210 kg", reach: "2,350 mm", repeatability: "±0.50 mm", bodyWeight: "1,200 kg", power: "7.5 kVA" },
      { name: "SCH500-800E", axes: "4", payload: "500/600/800 kg", reach: "2,800-3,200 mm", repeatability: "±0.50 mm", bodyWeight: "2,800/3,300 kg", power: "21.0/23.0 kVA" },
    ],
  },
  {
    slug: "sar-series",
    series: "SAR Series",
    title: "Long-Reach Industrial Transfer Robots",
    category: "Long-reach palletizing and transfer automation",
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
    models: [
      { name: "SAR12-1400", axes: "4", payload: "12 kg", reach: "1,454 mm", repeatability: "±0.15 mm", bodyWeight: "135 kg", power: "3.0 kVA" },
      { name: "SAR80-2450-2300", axes: "4", payload: "80 kg", reach: "2,450 mm", repeatability: "±1.00 mm", bodyWeight: "450 kg", power: "3.5 kVA" },
      { name: "SAR130-2550-2400", axes: "4", payload: "130 kg", reach: "2,550 mm", repeatability: "±1.00 mm", bodyWeight: "780 kg", power: "5.5 kVA" },
      { name: "SAR210/300-2650", axes: "4", payload: "210/300 kg", reach: "2,650 mm", repeatability: "±1.00 mm", bodyWeight: "1,150/1,250 kg", power: "7.0/7.5 kVA" },
      { name: "SAR500/800-3500", axes: "4", payload: "500/800 kg", reach: "3,500 mm", repeatability: "±1.50 mm", bodyWeight: "1,850/2,100 kg", power: "11.0/13.0 kVA" },
    ],
  },
  {
    slug: "scr-series",
    series: "SCR Series",
    title: "High-Payload Palletizing Robot",
    category: "Dedicated robotic palletizing",
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
    models: [
      { name: "SCR180-3200", axes: "4", payload: "180 kg", reach: "3,200 mm", repeatability: "±0.50 mm", bodyWeight: "1,450 kg", power: "18.0 kVA" },
    ],
  },
  {
    slug: "srl-series",
    series: "SRL Series",
    title: "Lightweight Four-Axis Handling Robots",
    category: "Compact handling and transfer",
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
    models: [
      { name: "SRL10-900-650", axes: "4", payload: "10 kg", reach: "900 mm", repeatability: "±0.15 mm", bodyWeight: "60 kg", power: "2.3 kVA" },
      { name: "SRL20-1500-1000", axes: "4", payload: "20 kg", reach: "1,500 mm", repeatability: "±0.20 mm", bodyWeight: "80 kg", power: "2.3 kVA" },
    ],
  },
  {
    slug: "stc-series",
    series: "STC Series",
    title: "Stamping Transfer Robots",
    category: "Stamping and press automation",
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
    models: [
      { name: "STC5-1250-400", axes: "4", payload: "5 kg", reach: "1,250 mm", repeatability: "±0.15 mm", bodyWeight: "220 kg", power: "2.0 kVA" },
      { name: "STC10-1450-400", axes: "4", payload: "10 kg", reach: "1,450 mm", repeatability: "±0.15 mm", bodyWeight: "230 kg", power: "2.3 kVA" },
    ],
  },
  {
    slug: "er-series",
    series: "ER Series",
    title: "Six-Axis Industrial Robots",
    category: "Flexible six-axis automation",
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
    models: [
      { name: "ER10-1400", axes: "6", payload: "10 kg", reach: "1,400 mm", repeatability: "±0.06 mm", bodyWeight: "168 kg", power: "3.5 kVA" },
      { name: "ER20-1700", axes: "6", payload: "20 kg", reach: "1,717 mm", repeatability: "±0.06 mm", bodyWeight: "280 kg", power: "5.5 kVA" },
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
