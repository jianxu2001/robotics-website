export type ProductModelSpec = {
  name: string;
  value: string;
  nameZh?: string;
  valueZh?: string;
};

export type ProductModel = {
  name: string;
  slug: string;
  seriesSlug: string;
  series: string;
  category: string;
  image: string;
  axes: string;
  payload: string;
  reach: string;
  repeatability: string;
  bodyWeight: string;
  power: string;
  jointParameters: ProductModelSpec[];
  applications: string[];
  industries: string[];
  positioning: string;
  optionNote?: string;
  categoryZh?: string;
  positioningZh?: string;
  specifications?: ProductModelSpec[];
  environment?: ProductModelSpec[];
  drawing?: string;
  catalogFile?: string;
  catalogPage?: number;
  technicalNote?: string;
  technicalNoteZh?: string;
};

const standardEnvironment = [
  { name: "Operating temperature", value: "0-45°C" },
  { name: "Relative humidity", value: "20-80% RH, non-condensing" },
  { name: "Vibration", value: "≤4.9 m/s²" },
  {
    name: "Environmental limits",
    value:
      "No flammable or corrosive gas/liquid. Avoid water, oil, dust, strong electromagnetic sources, and gas-source interference.",
  },
];

const images = {
  ecr: "/images/bejing1%20(1).jpg",
  sch: "/images/bejing1%20(2).jpg",
  sar: "/images/bejing1%20(1).jpg",
  scr: "/images/bejing1%20(2).jpg",
  srl: "/images/bejing1%20(3).jpg",
  stc: "/images/bejing1%20(3).jpg",
  er: "/images/bejing1%20(1).jpg",
};

function slugifyModel(name: string) {
  return name
    .toLowerCase()
    .replace(/[()]/g, "")
    .replace(/~/g, "-")
    .replace(/\//g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function joints(values: string[]) {
  return ["A1", "A2", "A3", "A4", "A5", "A6"].map((name, index) => ({
    name,
    value: values[index] ?? "/",
  }));
}

function model(input: Omit<ProductModel, "slug"> & { slug?: string }): ProductModel {
  return {
    ...input,
    optionNote: input.optionNote ?? (input.series === "SCH-AE Series" ? "Optional A5;" : input.name === "SCH100S-1950-1800" ? "Optional A5/A6; standard body/base color: yellow/yellow." : undefined),
    slug: input.slug ?? slugifyModel(input.name),
  };
}

const ecrApplications = ["Light palletizing", "Packaging line handling", "Material transfer", "Compact automation cells"];
const schApplications = ["Palletizing", "Depalletizing", "Heavy material handling", "End-of-line automation"];
const desktopApplications = ["Desktop automation", "Small-part handling", "Compact fixtures", "Light transfer"];
const sarApplications = ["Long-reach palletizing", "Bulk material handling", "Heavy workpiece transfer", "Large work cells"];
const scrApplications = ["Heavy palletizing", "Bag stacking", "Carton palletizing", "End-of-line automation"];
const srlApplications = ["Machine loading", "Machine unloading", "Line-side transfer", "Compact production cells"];
const stampingApplications = ["Stamping transfer", "Press loading", "Press unloading", "Forging support"];
const erApplications = ["Machine tending", "Flexible handling", "Assembly support", "General automation"];

const palletizingIndustries = ["Plastic manufacturers", "Chemical plants", "Food processing factories", "Building material factories"];
const compactIndustries = ["Electronics manufacturing", "Light industrial production", "Packaging workshops", "Component assembly"];
const stampingIndustries = ["Metal stamping plants", "Appliance factories", "Automotive parts suppliers", "Forging workshops"];
const machineTendingIndustries = ["Machining workshops", "Metal parts factories", "Equipment manufacturers", "General manufacturing"];

export const productModels: ProductModel[] = [
  model({ name: "ECR8-1200", seriesSlug: "ecr-series", series: "ECR Series", category: "Compact Four-Axis Handling Robot", image: images.ecr, axes: "4", payload: "8 kg", reach: "1,173 mm", repeatability: "±0.06 mm", bodyWeight: "60 kg", power: "2.45 kVA", jointParameters: joints(["±165°", "-75°, +26°", "-87°, +25°", "±360°", "/", "/"]), applications: ecrApplications, industries: palletizingIndustries, positioning: "A compact four-axis robot for repeatable light-duty handling, small palletizing layouts, and cost-sensitive automation projects." }),
  model({ name: "ECR10-1400", seriesSlug: "ecr-series", series: "ECR Series", category: "Compact Four-Axis Handling Robot", image: images.ecr, axes: "4", payload: "10 kg", reach: "1,430 mm", repeatability: "±0.06 mm", bodyWeight: "90 kg", power: "2.9 kVA", jointParameters: joints(["±150°", "-80°, +26°", "-95°, +25°", "±360°", "/", "/"]), applications: ecrApplications, industries: palletizingIndustries, positioning: "A 10 kg compact handling robot for factories that need stable reach, repeatability, and simple integration in packaging or transfer cells." }),
  model({ name: "ECR30-1850", seriesSlug: "ecr-series", series: "ECR Series", category: "Compact Four-Axis Handling Robot", image: images.ecr, axes: "4", payload: "30 kg", reach: "2,050 mm", repeatability: "±0.10 mm", bodyWeight: "211 kg", power: "3.4 kVA", jointParameters: joints(["±165°", "-110°, +30°", "-30°, +105°", "±360°", "/", "/"]), applications: ecrApplications, industries: palletizingIndustries, positioning: "A mid-payload four-axis robot for packaging lines and palletizing stations where reach and floor efficiency both matter." }),
  model({ name: "ECR50-1850", seriesSlug: "ecr-series", series: "ECR Series", category: "Compact Four-Axis Handling Robot", image: images.ecr, axes: "4", payload: "50 kg", reach: "2,050 mm", repeatability: "±0.10 mm", bodyWeight: "370 kg", power: "6.8 kVA", jointParameters: joints(["±165°", "-110°, +30°", "-30°, +105°", "±360°", "/", "/"]), applications: ecrApplications, industries: palletizingIndustries, positioning: "A 50 kg handling robot for heavier cases, bags, and workpieces in compact end-of-line automation layouts." }),
  model({ name: "ECR100-1850", seriesSlug: "ecr-series", series: "ECR Series", category: "Compact Four-Axis Handling Robot", image: images.ecr, axes: "4", payload: "100 kg", reach: "2,050 mm", repeatability: "±0.10 mm", bodyWeight: "440 kg", power: "8.55 kVA", jointParameters: joints(["±165°", "-110°, +30°", "-30°, +105°", "±360°", "/", "/"]), applications: ecrApplications, industries: palletizingIndustries, positioning: "A higher-payload ECR platform for plants that need stronger lifting capacity while keeping a four-axis palletizing structure." }),

  model({ name: "SCH03AE-200-110", seriesSlug: "sch-series", series: "SCH-AE Series", category: "Desktop Four-Axis Robot", image: images.sch, axes: "4", payload: "3 kg", reach: "200 mm", repeatability: "±0.02 mm", bodyWeight: "16 kg", power: "0.7 kVA", jointParameters: joints(["±155°", "110 mm", "±115°", "±360°", "/", "/"]), applications: desktopApplications, industries: compactIndustries, positioning: "A small desktop-class robot for precise, repetitive motion in compact workstations and small fixtures." }),
  model({ name: "SCH05AE-400-200", seriesSlug: "sch-series", series: "SCH-AE Series", category: "Desktop Four-Axis Robot", image: images.sch, axes: "4", payload: "5 kg", reach: "400 mm", repeatability: "±0.04 mm", bodyWeight: "28 kg", power: "1.1 kVA", jointParameters: joints(["±160°", "200 mm", "±140°", "±360°", "/", "/"]), applications: desktopApplications, industries: compactIndustries, positioning: "A compact 5 kg robot for small-part transfer, fixture loading, and limited-space industrial automation." }),
  model({ name: "SCH05AE-600-200", seriesSlug: "sch-series", series: "SCH-AE Series", category: "Desktop Four-Axis Robot", image: images.sch, axes: "4", payload: "5 kg", reach: "600 mm", repeatability: "±0.08 mm", bodyWeight: "32 kg", power: "1.1 kVA", jointParameters: joints(["±160°", "200 mm", "±140°", "±360°", "/", "/"]), applications: desktopApplications, industries: compactIndustries, positioning: "A 600 mm reach desktop robot for compact transfer tasks where work area is limited but repeatability is required." }),
  model({ name: "SCH05A-600-200", seriesSlug: "sch-series", series: "SCH-AE Series", category: "Desktop Four-Axis Robot", image: images.sch, axes: "4", payload: "5 kg", reach: "600 mm", repeatability: "±0.08 mm", bodyWeight: "36 kg", power: "1.1 kVA", jointParameters: joints(["±165°", "200 mm", "±150°", "±360°", "/", "/"]), applications: desktopApplications, industries: compactIndustries, positioning: "A compact SCH platform for repeatable 5 kg handling in small work cells and production fixtures." }),
  model({ name: "SCH10AE-1300-450", seriesSlug: "sch-series", series: "SCH-AE Series", category: "Desktop / Compact Handling Robot", image: images.sch, axes: "4", payload: "10 kg", reach: "1,300 mm", repeatability: "±0.08 mm", bodyWeight: "100 kg", power: "2.1 kVA", jointParameters: joints(["±160°", "450 mm", "±150°", "±360°", "/", "/"]), applications: desktopApplications, industries: compactIndustries, positioning: "A longer-reach compact robot for 10 kg handling tasks, small pallet layouts, and production-side transfer." }),
  model({ name: "SCH10AE-800-450", seriesSlug: "sch-series", series: "SCH-AE Series", category: "Desktop / Compact Handling Robot", image: images.sch, axes: "4", payload: "10 kg", reach: "800 mm", repeatability: "±0.08 mm", bodyWeight: "60 kg", power: "2.1 kVA", jointParameters: joints(["±165°", "450 mm", "±150°", "±360°", "/", "/"]), applications: desktopApplications, industries: compactIndustries, positioning: "A compact 10 kg robot for short-reach transfer, machine-side handling, and efficient small automation cells." }),

  model({ name: "SCH50-1950-1800", seriesSlug: "sch-series", series: "SCH Series", category: "Four-Axis Palletizing Robot", image: images.sch, axes: "4", payload: "50 kg", reach: "1,950 mm", repeatability: "±0.50 mm", bodyWeight: "580 kg", power: "5.75 kVA", jointParameters: joints(["±130°", "1,800 mm", "±147°", "±360°", "/", "/"]), applications: schApplications, industries: palletizingIndustries, positioning: "A four-axis palletizing robot for medium-load cartons, bags, and production lines that need repeatable stacking with a compact cell layout.", optionNote: "Optional A5/A6; standard body/base color: yellow/yellow." }),
  model({ name: "SCH80-1950-1800", seriesSlug: "sch-series", series: "SCH Series", category: "Four-Axis Palletizing Robot", image: images.sch, axes: "4", payload: "80 kg", reach: "1,950 mm", repeatability: "±0.50 mm", bodyWeight: "580 kg", power: "5.75 kVA", jointParameters: joints(["±130°", "1,800 mm", "±147°", "±360°", "/", "/"]), applications: schApplications, industries: palletizingIndustries, positioning: "An 80 kg palletizing robot for factories moving heavier packages, drums, bags, or bundled materials at the end of the line.", optionNote: "Optional A5/A6; standard body/base color: yellow/yellow." }),
  model({ name: "SCH100-1950-1800", seriesSlug: "sch-series", series: "SCH Series", category: "Four-Axis Palletizing Robot", image: images.sch, axes: "4", payload: "100 kg", reach: "1,950 mm", repeatability: "±0.50 mm", bodyWeight: "680 kg", power: "5.75 kVA", jointParameters: joints(["±130°", "1,800 mm", "±147°", "±360°", "/", "/"]), applications: schApplications, industries: palletizingIndustries, positioning: "A 100 kg palletizing robot for high-load end-of-line handling, labor saving, and stable shift-to-shift production.", optionNote: "Optional A5/A6; standard body/base color: yellow/yellow." }),
  model({ name: "SCH100S-1950-1800", seriesSlug: "sch-series", series: "SCH Series", category: "Four-Axis Palletizing Robot", image: images.sch, axes: "4", payload: "100 kg", reach: "1,950 mm", repeatability: "±0.50 mm", bodyWeight: "550 kg", power: "4.4 kVA", jointParameters: joints(["±165°", "1,800 mm", "±150°", "±360°", "/", "/"]), applications: schApplications, industries: palletizingIndustries, positioning: "A 100 kg SCH variant for palletizing projects that need strong payload capacity with a lighter robot body." }),
  model({ name: "SCH10D-800-400", seriesSlug: "sch-series", series: "SCH Series", category: "Four-Axis Handling Robot", image: images.sch, axes: "4", payload: "10 kg", reach: "800 mm", repeatability: "±0.15 mm", bodyWeight: "60 kg", power: "1.5 kVA", jointParameters: joints(["100°, +140°", "400 mm", "±150°", "±360°", "/", "/"]), applications: schApplications, industries: palletizingIndustries, positioning: "A compact SCH robot for light handling and short-reach automation where floor space and cost control are important.", optionNote: "Standard body/base color: yellow." }),
  model({ name: "SCH20D-1300-400", seriesSlug: "sch-series", series: "SCH Series", category: "Four-Axis Handling Robot", image: images.sch, axes: "4", payload: "20 kg", reach: "1,300 mm", repeatability: "±0.15 mm", bodyWeight: "158 kg", power: "1.5 kVA", jointParameters: joints(["±135°", "400 mm", "±150°", "±360°", "/", "/"]), applications: schApplications, industries: palletizingIndustries, positioning: "A 20 kg SCH robot for packaging, loading, and transfer operations where a compact vertical stroke is needed.", optionNote: "Standard body/base color: yellow." }),
  model({ name: "SCH20D-1950-1850", seriesSlug: "sch-series", series: "SCH Series", category: "Four-Axis Handling Robot", image: images.sch, axes: "4", payload: "20 kg", reach: "1,950 mm", repeatability: "±0.50 mm", bodyWeight: "250 kg", power: "3.0 kVA", jointParameters: joints(["±135°", "1,850 mm", "±150°", "±360°", "/", "/"]), applications: schApplications, industries: palletizingIndustries, positioning: "A longer-reach 20 kg SCH robot for palletizing and transfer layouts that require a larger work envelope.", optionNote: "Standard body/base color: yellow." }),
  model({ name: "SCH30E-1950-1850", seriesSlug: "sch-series", series: "SCH Series", category: "Four-Axis Handling Robot", image: images.sch, axes: "4", payload: "30 kg", reach: "1,950 mm", repeatability: "±0.50 mm", bodyWeight: "290 kg", power: "3.0 kVA", jointParameters: joints(["±165°", "1,860 mm", "±150°", "±360°", "/", "/"]), applications: schApplications, industries: palletizingIndustries, positioning: "A 30 kg four-axis robot for medium-duty transfer, carton handling, and end-of-line automation.", optionNote: "Standard body/base color: yellow." }),
  model({ name: "SCH130E-2200-1800", seriesSlug: "sch-series", series: "SCH Series", category: "Heavy-Duty Palletizing Robot", image: images.sch, axes: "4", payload: "130 kg", reach: "2,200 mm", repeatability: "±0.50 mm", bodyWeight: "900 kg", power: "5.3 kVA", jointParameters: joints(["+165°, -155°", "1,800 mm", "±150°", "±360°", "/", "/"]), applications: schApplications, industries: palletizingIndustries, positioning: "A 130 kg palletizing robot for heavy bags, cartons, and stacked loads that require reliable industrial handling.", optionNote: "Optional A5/A6; standard body color: yellow, base color: black." }),
  model({ name: "SCH210E-2350-1650", seriesSlug: "sch-series", series: "SCH Series", category: "Heavy-Duty Palletizing Robot", image: images.sch, axes: "4", payload: "210 kg", reach: "2,350 mm", repeatability: "±0.50 mm", bodyWeight: "1,200 kg", power: "7.5 kVA", jointParameters: joints(["±164°", "1,650 mm", "±147°", "±360°", "/", "/"]), applications: schApplications, industries: palletizingIndustries, positioning: "A 210 kg heavy-duty palletizing platform for demanding factory lines with larger payloads and wide pallet layouts.", optionNote: "Optional A5/A6; standard body color: yellow, base color: black." }),
  model({ name: "SCH300E-2350-1650", seriesSlug: "sch-series", series: "SCH Series", category: "Heavy-Duty Palletizing Robot", image: images.sch, axes: "4", payload: "300 kg", reach: "2,350 mm", repeatability: "±0.50 mm", bodyWeight: "2,600 kg", power: "19.0 kVA", jointParameters: joints(["±180°", "750-2,400 mm", "±150°", "±360°", "/", "/"]), applications: schApplications, industries: palletizingIndustries, positioning: "A 300 kg heavy-duty robot for high-load palletizing, bulk transfer, and demanding material handling cells.", optionNote: "Optional A5/A6; standard body color: yellow, base color: black." }),
  model({ name: "SCH500-800E", slug: "sch500-800e-3200-1650", seriesSlug: "sch-series", series: "SCH Series", category: "Ultra-Heavy Palletizing Robot", image: images.sch, axes: "4", payload: "500/600/800 kg", reach: "3,200/2,800 mm", repeatability: "±0.50 mm", bodyWeight: "2,800/3,300 kg", power: "21.0/23.0 kVA", jointParameters: joints(["±180°", "800-2,500 mm", "±150°", "±360°", "/", "/"]), applications: schApplications, industries: palletizingIndustries, positioning: "An ultra-heavy SCH500-800E palletizing robot platform for large loads, high-duty palletizing, and custom industrial transfer projects.", optionNote: "Optional A5/A6; standard body color: yellow, base color: black." }),

  model({ name: "SAR80-2450-2300", seriesSlug: "sar-series", series: "SAR Series", category: "Long-Reach Four-Axis Robot", image: images.sar, axes: "4", payload: "80 kg", reach: "2,450 mm", repeatability: "±1.00 mm", bodyWeight: "450 kg", power: "3.5 kVA", jointParameters: joints(["±330°", "2,300 mm", "1,500 mm", "±360°", "/", "/"]), applications: sarApplications, industries: palletizingIndustries, positioning: "A long-reach SAR robot for wide palletizing cells, bulk product transfer, and large work envelopes.", optionNote: "Optional A5/A6; catalog color: gray-white / white / blue." }),
  model({ name: "SAR130-2550-2400", seriesSlug: "sar-series", series: "SAR Series", category: "Long-Reach Four-Axis Robot", image: images.sar, axes: "4", payload: "130 kg", reach: "2,550 mm", repeatability: "±1.00 mm", bodyWeight: "780 kg", power: "5.5 kVA", jointParameters: joints(["±330°", "2,400 mm", "1,600 mm", "±360°", "/", "/"]), applications: sarApplications, industries: palletizingIndustries, positioning: "A 130 kg long-reach robot for factories that need larger layouts and stable material movement.", optionNote: "Optional A5/A6; catalog color: gray-white / white / blue." }),
  model({ name: "SAR210/300-2650-2300", slug: "sar210-300-2650-2300", seriesSlug: "sar-series", series: "SAR Series", category: "Long-Reach Heavy Robot", image: images.sar, axes: "4", payload: "210/300 kg", reach: "2,650 mm", repeatability: "±1.00 mm", bodyWeight: "1,150/1,250 kg", power: "7.0/7.5 kVA", jointParameters: joints(["±330°", "2,300 mm", "1,500 mm", "±360°", "/", "/"]), applications: sarApplications, industries: palletizingIndustries, positioning: "A heavy SAR platform for wide-reach transfer, palletizing, and high-load material movement.", optionNote: "Optional A5/A6; catalog color: gray-white / white / blue." }),
  model({ name: "SAR500/800-3500-3100", slug: "sar500-800-3500-3100", seriesSlug: "sar-series", series: "SAR Series", category: "Long-Reach Heavy Robot", image: images.sar, axes: "4", payload: "500/800 kg", reach: "3,500 mm", repeatability: "±1.50 mm", bodyWeight: "1,850/2,100 kg", power: "11.0/13.0 kVA", jointParameters: joints(["±330°", "3,100 mm", "2,000 mm", "±360°", "/", "/"]), applications: sarApplications, industries: palletizingIndustries, positioning: "A high-payload SAR robot for extra-large work envelopes, heavy loads, and custom industrial handling cells.", optionNote: "Optional A5/A6; catalog color: gray-white / white / blue." }),

  model({ name: "SCR180-3200", seriesSlug: "scr-series", series: "SCR Series", category: "High-Payload Palletizing Robot", image: images.scr, axes: "4", payload: "180 kg", reach: "3,200 mm", repeatability: "±0.50 mm", bodyWeight: "1,450 kg", power: "18.0 kVA", jointParameters: joints(["±178°", "+80°, -60°", "Global: +120°, -20°; coupled: +65°, -65°", "±360°", "/", "/"]), applications: scrApplications, industries: palletizingIndustries, positioning: "A dedicated high-payload palletizing robot for large bags, cartons, and end-of-line loads that need long reach and reliable stacking.", optionNote: "Optional A5; standard body/base color: yellow/yellow." }),
  model({ name: "SCR180CQ-3200", seriesSlug: "scr-series", series: "SCR Series", category: "High-Payload Palletizing Robot", image: images.scr, axes: "4", payload: "180 kg", reach: "3,200 mm", repeatability: "±0.50 mm", bodyWeight: "1,450 kg", power: "18.0 kVA", jointParameters: joints(["±178°", "+80°, -30°", "Global: +120°, -20°; coupled: +65°, -65°", "±360°", "/", "/"]), applications: scrApplications, industries: palletizingIndustries, positioning: "A dedicated high-payload palletizing robot for large bags, cartons, and end-of-line loads that need long reach and reliable stacking.", optionNote: "Optional A5; standard body/base color: yellow/yellow." }),

  model({ name: "SRL10-900-650", seriesSlug: "srl-series", series: "SRL Series", category: "Machine Loading / Unloading Robot", image: images.srl, axes: "4", payload: "10 kg", reach: "900 mm", repeatability: "±0.15 mm", bodyWeight: "60 kg", power: "2.3 kVA", jointParameters: joints(["±115°", "650 mm", "±135°", "±360°", "/", "/"]), applications: srlApplications, industries: machineTendingIndustries, positioning: "A lightweight four-axis robot for machine loading, unloading, and compact line-side transfer.", optionNote: "Standard body/base color: natural aluminum." }),
  model({ name: "SRL20-1500-1000", seriesSlug: "srl-series", series: "SRL Series", category: "Machine Loading / Unloading Robot", image: images.srl, axes: "4", payload: "20 kg", reach: "1,500 mm", repeatability: "±0.20 mm", bodyWeight: "80 kg", power: "2.3 kVA", jointParameters: joints(["±100°", "1,000 mm", "±135°", "±360°", "/", "/"]), applications: srlApplications, industries: machineTendingIndustries, positioning: "A 20 kg SRL robot for longer-reach machine tending, transfer, and production support cells.", optionNote: "Standard body/base color: natural aluminum." }),

  model({ name: "SAR12-1400 Split Type", slug: "sar12-1400-split", seriesSlug: "sar-series", series: "SAR12 Series", category: "Dedicated Stamping / Transfer Robot", image: images.stc, axes: "4", payload: "12 kg", reach: "1,454 mm", repeatability: "±0.15 mm", bodyWeight: "135 kg", power: "3.0 kVA", jointParameters: joints(["±140°", "-35°, +80°", "-95°, +35°", "±360°", "/", "/"]), applications: stampingApplications, industries: stampingIndustries, positioning: "A split-cabinet SAR12 robot for stamping transfer and press-side handling applications.", optionNote: "Optional A5; standard body/base color: yellow/yellow." }),
  model({ name: "SAR12-1400 Integrated Cabinet", slug: "sar12-1400-integrated", seriesSlug: "sar-series", series: "SAR12 Series", category: "Dedicated Stamping / Transfer Robot", image: images.stc, axes: "4", payload: "12 kg", reach: "1,454 mm", repeatability: "±0.20 mm", bodyWeight: "270 kg", power: "3.0 kVA", jointParameters: joints(["±140°", "-35°, +80°", "-95°, +35°", "±360°", "/", "/"]), applications: stampingApplications, industries: stampingIndustries, positioning: "An integrated-cabinet SAR12 configuration for press-side transfer and compact stamping automation.", optionNote: "Optional A5; standard body/base color: yellow/yellow." }),
  model({ name: "SCD30-1850-400", seriesSlug: "scd-series", series: "SCD Series", category: "Dedicated Stamping Machine", image: images.stc, axes: "4", payload: "30/50/80 kg", reach: "1,850/2,150/2,700 mm", repeatability: "±0.15 mm", bodyWeight: "500 kg", power: "6.8 kVA", jointParameters: joints(["±180°", "400 mm", "±145°", "±360°", "/", "/"]), applications: stampingApplications, industries: stampingIndustries, positioning: "A dedicated stamping-machine robot with configurable reach for press automation and repetitive part transfer.", optionNote: "Catalog note: customizable reach." }),
  model({ name: "STC5-1250-400", seriesSlug: "stc-series", series: "STC Series", category: "Stamping Transfer Robot", image: images.stc, axes: "4", payload: "5 kg", reach: "1,250 mm", repeatability: "±0.15 mm", bodyWeight: "220 kg", power: "2.0 kVA", jointParameters: joints(["±135°", "400 mm", "776-1,250 mm", "±360°", "/", "/"]), applications: stampingApplications, industries: stampingIndustries, positioning: "A 5 kg stamping transfer robot for repetitive press loading and unloading where operator safety and cycle consistency matter.", optionNote: "Standard body: natural aluminum; base: white." }),
  model({ name: "STC10-1450-400", seriesSlug: "stc-series", series: "STC Series", category: "Stamping Transfer Robot", image: images.stc, axes: "4", payload: "10 kg", reach: "1,450 mm", repeatability: "±0.15 mm", bodyWeight: "230 kg", power: "2.3 kVA", jointParameters: joints(["±135°", "400 mm", "776-1,450 mm", "±360°", "/", "/"]), applications: stampingApplications, industries: stampingIndustries, positioning: "A 10 kg stamping robot for press-side transfer, labor reduction, and safer handling around repetitive stamping operations.", optionNote: "Standard body: natural aluminum; base: white." }),

  model({ name: "ER10-1400", seriesSlug: "er-series", series: "ER Series", category: "Six-Axis Industrial Robot", image: images.er, axes: "6", payload: "10 kg", reach: "1,400 mm", repeatability: "±0.06 mm", bodyWeight: "168 kg", power: "3.5 kVA", jointParameters: joints(["±170°", "-160°, +100°", "-85°, +90°", "±200°", "±120°", "±360°"]), applications: erApplications, industries: machineTendingIndustries, positioning: "A six-axis robot for flexible handling, approach-angle control, and machine tending in compact industrial cells.", optionNote: "Standard body/base color: yellow/yellow." }),
  model({ name: "ER20-1700", seriesSlug: "er-series", series: "ER Series", category: "Six-Axis Industrial Robot", image: images.er, axes: "6", payload: "20 kg", reach: "1,717 mm", repeatability: "±0.06 mm", bodyWeight: "280 kg", power: "5.5 kVA", jointParameters: joints(["±170°", "-155°, +110°", "-78°, +205°", "±200°", "±125°", "±360°"]), applications: erApplications, industries: machineTendingIndustries, positioning: "A 20 kg six-axis robot for tending, handling, and flexible automation tasks that require articulated motion.", optionNote: "Standard body/base color: yellow/yellow." }),
  model({
  "name": "CR30-1900",
  "slug": "cr30-1900",
  "seriesSlug": "cr-series",
  "series": "CR Series",
  "category": "Collaborative Palletizing Robot",
  "categoryZh": "协作码垛机器人",
  "image": "/images/products/cr-palletizer-dark-v1.png",
  "axes": "5",
  "payload": "30 kg",
  "reach": "1,900 mm",
  "repeatability": "±0.1 mm",
  "bodyWeight": "430 kg",
  "power": "8 kVA",
  "jointParameters": [],
  "applications": [
    "Carton palletizing",
    "End-of-line handling"
  ],
  "industries": [
    "Packaging",
    "Factory automation"
  ],
  "positioning": "30 kg collaborative palletizing workstation with 1,900 mm reach and a fixed base without lifting.",
  "positioningZh": "30 kg 协作码垛工作站，臂展 1,900 mm，采用不带升降的固定底座。",
  "specifications": [
    {
      "name": "Model",
      "nameZh": "型号",
      "value": "CR30-1900"
    },
    {
      "name": "Maximum payload",
      "nameZh": "最大负载",
      "value": "30 kg"
    },
    {
      "name": "Reach",
      "nameZh": "臂展",
      "value": "1,900 mm"
    },
    {
      "name": "Axes",
      "nameZh": "轴数",
      "value": "5"
    },
    {
      "name": "Palletizing height, including pallet",
      "nameZh": "码垛高度（含托盘）",
      "value": "≤1,800 mm"
    },
    {
      "name": "Repeatability",
      "nameZh": "重复定位精度",
      "value": "±0.1 mm"
    },
    {
      "name": "Robot height",
      "nameZh": "机器人高度",
      "value": "1,800–2,800 mm"
    },
    {
      "name": "Lifting stroke",
      "nameZh": "升降行程",
      "value": "Without lift",
      "valueZh": "不带升降"
    },
    {
      "name": "Pallet dimensions",
      "nameZh": "适用托盘规格",
      "value": "1,200 × 1,200 × 140 mm"
    },
    {
      "name": "Overall dimensions",
      "nameZh": "设备展开尺寸",
      "value": "1,200 × 2,600 × 2,800 mm"
    },
    {
      "name": "Machine weight",
      "nameZh": "本体重量",
      "value": "430 kg"
    },
    {
      "name": "Power supply capacity",
      "nameZh": "电源容量",
      "value": "8 kVA"
    }
  ],
  "environment": [
    {
      "name": "Operating temperature",
      "nameZh": "温度范围",
      "value": "-15–55 °C"
    },
    {
      "name": "Relative humidity",
      "nameZh": "相对湿度",
      "value": "20–80% RH, non-condensing",
      "valueZh": "20–80% RH，不结露"
    },
    {
      "name": "Permissible vibration",
      "nameZh": "允许振动",
      "value": "≤4.9 m/s²"
    },
    {
      "name": "Gas and liquid conditions",
      "nameZh": "气体及液体要求",
      "value": "No flammable or corrosive gases or liquids",
      "valueZh": "无引火性、腐蚀性气体或液体"
    },
    {
      "name": "Water, oil and dust",
      "nameZh": "水油粉尘要求",
      "value": "Avoid contact with water, oil and dust",
      "valueZh": "避免接触水、油及粉尘"
    },
    {
      "name": "Electromagnetic environment",
      "nameZh": "电磁环境要求",
      "value": "Keep away from electromagnetic interference sources",
      "valueZh": "远离电磁干扰源"
    }
  ],
  "drawing": "/images/products/cr30-1900-drawing.webp",
  "catalogFile": "/catalogs/scr-collaborative-palletizing-packing-2026.pdf",
  "catalogPage": 6
}),
  model({
  "name": "CR30L-1900",
  "slug": "cr30l-1900",
  "seriesSlug": "cr-series",
  "series": "CR Series",
  "category": "Collaborative Palletizing Robot",
  "categoryZh": "协作码垛机器人",
  "image": "/images/products/cr-palletizer-dark-v1.png",
  "axes": "6",
  "payload": "30 kg",
  "reach": "1,900 mm",
  "repeatability": "±0.1 mm",
  "bodyWeight": "480 kg",
  "power": "8 kVA",
  "jointParameters": [],
  "applications": [
    "Carton palletizing",
    "End-of-line handling"
  ],
  "industries": [
    "Packaging",
    "Factory automation"
  ],
  "positioning": "30 kg collaborative palletizing workstation with 1,900 mm reach and a standard 500 mm lifting stroke.",
  "positioningZh": "30 kg 协作码垛工作站，臂展 1,900 mm，标配 500 mm 升降行程，可定制。",
  "specifications": [
    {
      "name": "Model",
      "nameZh": "型号",
      "value": "CR30L-1900"
    },
    {
      "name": "Maximum payload",
      "nameZh": "最大负载",
      "value": "30 kg"
    },
    {
      "name": "Reach",
      "nameZh": "臂展",
      "value": "1,900 mm"
    },
    {
      "name": "Axes",
      "nameZh": "轴数",
      "value": "6"
    },
    {
      "name": "Palletizing height, including pallet",
      "nameZh": "码垛高度（含托盘）",
      "value": "≤2,300 mm"
    },
    {
      "name": "Repeatability",
      "nameZh": "重复定位精度",
      "value": "±0.1 mm"
    },
    {
      "name": "Robot height",
      "nameZh": "机器人高度",
      "value": "1,800–2,800 mm"
    },
    {
      "name": "Lifting stroke",
      "nameZh": "升降行程",
      "value": "500 mm standard; customizable",
      "valueZh": "标准 500 mm，可定制"
    },
    {
      "name": "Pallet dimensions",
      "nameZh": "适用托盘规格",
      "value": "1,200 × 1,200 × 140 mm"
    },
    {
      "name": "Overall dimensions",
      "nameZh": "设备展开尺寸",
      "value": "1,200 × 2,600 × 2,800 mm"
    },
    {
      "name": "Machine weight",
      "nameZh": "本体重量",
      "value": "480 kg"
    },
    {
      "name": "Power supply capacity",
      "nameZh": "电源容量",
      "value": "8 kVA"
    }
  ],
  "environment": [
    {
      "name": "Operating temperature",
      "nameZh": "温度范围",
      "value": "-15–55 °C"
    },
    {
      "name": "Relative humidity",
      "nameZh": "相对湿度",
      "value": "20–80% RH, non-condensing",
      "valueZh": "20–80% RH，不结露"
    },
    {
      "name": "Permissible vibration",
      "nameZh": "允许振动",
      "value": "≤4.9 m/s²"
    },
    {
      "name": "Gas and liquid conditions",
      "nameZh": "气体及液体要求",
      "value": "No flammable or corrosive gases or liquids",
      "valueZh": "无引火性、腐蚀性气体或液体"
    },
    {
      "name": "Water, oil and dust",
      "nameZh": "水油粉尘要求",
      "value": "Avoid contact with water, oil and dust",
      "valueZh": "避免接触水、油及粉尘"
    },
    {
      "name": "Electromagnetic environment",
      "nameZh": "电磁环境要求",
      "value": "Keep away from electromagnetic interference sources",
      "valueZh": "远离电磁干扰源"
    }
  ],
  "drawing": "/images/products/cr30l-1900-drawing.webp",
  "catalogFile": "/catalogs/scr-collaborative-palletizing-packing-2026.pdf",
  "catalogPage": 7
}),
  model({
  "name": "CR50-1900",
  "slug": "cr50-1900",
  "seriesSlug": "cr-series",
  "series": "CR Series",
  "category": "Collaborative Palletizing Robot",
  "categoryZh": "协作码垛机器人",
  "image": "/images/products/cr-palletizer-dark-v1.png",
  "axes": "5",
  "payload": "50 kg",
  "reach": "1,900 mm",
  "repeatability": "±0.1 mm",
  "bodyWeight": "450 kg",
  "power": "10 kVA",
  "jointParameters": [],
  "applications": [
    "Carton palletizing",
    "End-of-line handling"
  ],
  "industries": [
    "Packaging",
    "Factory automation"
  ],
  "positioning": "50 kg collaborative palletizing workstation with 1,900 mm reach and a fixed base without lifting.",
  "positioningZh": "50 kg 协作码垛工作站，臂展 1,900 mm，采用不带升降的固定底座。",
  "specifications": [
    {
      "name": "Model",
      "nameZh": "型号",
      "value": "CR50-1900"
    },
    {
      "name": "Maximum payload",
      "nameZh": "最大负载",
      "value": "50 kg"
    },
    {
      "name": "Reach",
      "nameZh": "臂展",
      "value": "1,900 mm"
    },
    {
      "name": "Axes",
      "nameZh": "轴数",
      "value": "5"
    },
    {
      "name": "Palletizing height, including pallet",
      "nameZh": "码垛高度（含托盘）",
      "value": "≤1,800 mm"
    },
    {
      "name": "Repeatability",
      "nameZh": "重复定位精度",
      "value": "±0.1 mm"
    },
    {
      "name": "Robot height",
      "nameZh": "机器人高度",
      "value": "1,800–2,800 mm"
    },
    {
      "name": "Lifting stroke",
      "nameZh": "升降行程",
      "value": "Without lift",
      "valueZh": "不带升降"
    },
    {
      "name": "Pallet dimensions",
      "nameZh": "适用托盘规格",
      "value": "1,200 × 1,200 × 140 mm"
    },
    {
      "name": "Overall dimensions",
      "nameZh": "设备展开尺寸",
      "value": "1,200 × 2,600 × 2,800 mm"
    },
    {
      "name": "Machine weight",
      "nameZh": "本体重量",
      "value": "450 kg"
    },
    {
      "name": "Power supply capacity",
      "nameZh": "电源容量",
      "value": "10 kVA"
    }
  ],
  "environment": [
    {
      "name": "Operating temperature",
      "nameZh": "温度范围",
      "value": "-15–55 °C"
    },
    {
      "name": "Relative humidity",
      "nameZh": "相对湿度",
      "value": "20–80% RH, non-condensing",
      "valueZh": "20–80% RH，不结露"
    },
    {
      "name": "Permissible vibration",
      "nameZh": "允许振动",
      "value": "≤4.9 m/s²"
    },
    {
      "name": "Gas and liquid conditions",
      "nameZh": "气体及液体要求",
      "value": "No flammable or corrosive gases or liquids",
      "valueZh": "无引火性、腐蚀性气体或液体"
    },
    {
      "name": "Water, oil and dust",
      "nameZh": "水油粉尘要求",
      "value": "Avoid contact with water, oil and dust",
      "valueZh": "避免接触水、油及粉尘"
    },
    {
      "name": "Electromagnetic environment",
      "nameZh": "电磁环境要求",
      "value": "Keep away from electromagnetic interference sources",
      "valueZh": "远离电磁干扰源"
    }
  ],
  "drawing": "/images/products/cr50-1900-drawing.webp",
  "catalogFile": "/catalogs/scr-collaborative-palletizing-packing-2026.pdf",
  "catalogPage": 8
}),
  model({
  "name": "CR50L-1900",
  "slug": "cr50l-1900",
  "seriesSlug": "cr-series",
  "series": "CR Series",
  "category": "Collaborative Palletizing Robot",
  "categoryZh": "协作码垛机器人",
  "image": "/images/products/cr-palletizer-dark-v1.png",
  "axes": "6",
  "payload": "50 kg",
  "reach": "1,900 mm",
  "repeatability": "±0.1 mm",
  "bodyWeight": "500 kg",
  "power": "10 kVA",
  "jointParameters": [],
  "applications": [
    "Carton palletizing",
    "End-of-line handling"
  ],
  "industries": [
    "Packaging",
    "Factory automation"
  ],
  "positioning": "50 kg collaborative palletizing workstation with 1,900 mm reach and a standard 500 mm lifting stroke.",
  "positioningZh": "50 kg 协作码垛工作站，臂展 1,900 mm，标配 500 mm 升降行程，可定制。",
  "specifications": [
    {
      "name": "Model",
      "nameZh": "型号",
      "value": "CR50L-1900"
    },
    {
      "name": "Maximum payload",
      "nameZh": "最大负载",
      "value": "50 kg"
    },
    {
      "name": "Reach",
      "nameZh": "臂展",
      "value": "1,900 mm"
    },
    {
      "name": "Axes",
      "nameZh": "轴数",
      "value": "6"
    },
    {
      "name": "Palletizing height, including pallet",
      "nameZh": "码垛高度（含托盘）",
      "value": "≤2,300 mm"
    },
    {
      "name": "Repeatability",
      "nameZh": "重复定位精度",
      "value": "±0.1 mm"
    },
    {
      "name": "Robot height",
      "nameZh": "机器人高度",
      "value": "1,800–2,800 mm"
    },
    {
      "name": "Lifting stroke",
      "nameZh": "升降行程",
      "value": "500 mm standard; customizable",
      "valueZh": "标准 500 mm，可定制"
    },
    {
      "name": "Pallet dimensions",
      "nameZh": "适用托盘规格",
      "value": "1,200 × 1,200 × 140 mm"
    },
    {
      "name": "Overall dimensions",
      "nameZh": "设备展开尺寸",
      "value": "1,200 × 2,600 × 2,800 mm"
    },
    {
      "name": "Machine weight",
      "nameZh": "本体重量",
      "value": "500 kg"
    },
    {
      "name": "Power supply capacity",
      "nameZh": "电源容量",
      "value": "10 kVA"
    }
  ],
  "environment": [
    {
      "name": "Operating temperature",
      "nameZh": "温度范围",
      "value": "-15–55 °C"
    },
    {
      "name": "Relative humidity",
      "nameZh": "相对湿度",
      "value": "20–80% RH, non-condensing",
      "valueZh": "20–80% RH，不结露"
    },
    {
      "name": "Permissible vibration",
      "nameZh": "允许振动",
      "value": "≤4.9 m/s²"
    },
    {
      "name": "Gas and liquid conditions",
      "nameZh": "气体及液体要求",
      "value": "No flammable or corrosive gases or liquids",
      "valueZh": "无引火性、腐蚀性气体或液体"
    },
    {
      "name": "Water, oil and dust",
      "nameZh": "水油粉尘要求",
      "value": "Avoid contact with water, oil and dust",
      "valueZh": "避免接触水、油及粉尘"
    },
    {
      "name": "Electromagnetic environment",
      "nameZh": "电磁环境要求",
      "value": "Keep away from electromagnetic interference sources",
      "valueZh": "远离电磁干扰源"
    }
  ],
  "drawing": "/images/products/cr50l-1900-drawing.webp",
  "catalogFile": "/catalogs/scr-collaborative-palletizing-packing-2026.pdf",
  "catalogPage": 9
}),
  model({
  "name": "BR-30",
  "slug": "br-30",
  "seriesSlug": "br-series",
  "series": "BR Series",
  "category": "Collaborative Case Packing Workstation",
  "categoryZh": "协作装箱机器人工作站",
  "image": "/images/products/br-case-packer-dark-v1.png",
  "axes": "—",
  "payload": "30 kg",
  "reach": "1,900 mm",
  "repeatability": "—",
  "bodyWeight": "150 kg",
  "power": "3 kW",
  "jointParameters": [],
  "applications": [
    "Product infeed",
    "Vacuum handling",
    "Carton packing"
  ],
  "industries": [
    "Packaging",
    "Factory automation"
  ],
  "positioning": "A 30 kg case packing workstation combining product infeed, vacuum handling and automatic carton packing, with a catalog packing rate of up to 15 pcs/min.",
  "positioningZh": "30 kg 协作装箱工作站，衔接进料定位、真空抓取与自动装箱，画册装箱节拍 ≤15 pcs/min。",
  "specifications": [
    {
      "name": "Model",
      "nameZh": "机型",
      "value": "BR-30"
    },
    {
      "name": "Payload",
      "nameZh": "负载",
      "value": "30 kg"
    },
    {
      "name": "Maximum robot travel",
      "nameZh": "机器人最大行程",
      "value": "1,900 mm"
    },
    {
      "name": "Packing rate",
      "nameZh": "装箱节拍",
      "value": "≤15 pcs/min"
    },
    {
      "name": "Maximum carton length",
      "nameZh": "纸箱尺寸长",
      "value": "≤600 mm"
    },
    {
      "name": "Maximum carton width",
      "nameZh": "纸箱尺寸宽",
      "value": "≤500 mm"
    },
    {
      "name": "Maximum carton height",
      "nameZh": "纸箱尺寸高",
      "value": "≤450 mm"
    },
    {
      "name": "Total power",
      "nameZh": "总功率",
      "value": "3 kW"
    },
    {
      "name": "Air pressure supply, catalog entries",
      "nameZh": "供气压力（画册列值）",
      "value": "5 kgf/cm²; 0.6 MPa"
    },
    {
      "name": "Machine net weight",
      "nameZh": "机器净重",
      "value": "150 kg"
    },
    {
      "name": "Machine dimensions (L × W × H)",
      "nameZh": "机器外形尺寸（长 × 宽 × 高）",
      "value": "Main unit: 2,200 × 500 × 1,100 mm; electrical cabinet: 700 × 320 × 1,200 mm",
      "valueZh": "主机：2,200 × 500 × 1,100 mm；电箱：700 × 320 × 1,200 mm"
    },
    {
      "name": "Power supply",
      "nameZh": "电源类型",
      "value": "Single-phase 220 V, 50/60 Hz",
      "valueZh": "单相 220 V，50/60 Hz"
    }
  ],
  "environment": [],
  "drawing": "/images/products/br-30-drawing.webp",
  "catalogFile": "/catalogs/scr-collaborative-palletizing-packing-2026.pdf",
  "catalogPage": 10,
  "technicalNote": "The catalog lists both 5 kgf/cm² and 0.6 MPa for air supply; these are not equivalent pressures. Confirm the required pressure and voltage tolerance for the selected configuration before installation. Packing rate depends on the product and packing pattern.",
  "technicalNoteZh": "画册供气栏同时列有 5 kgf/cm² 和 0.6 MPa，两者并非等值压力。安装前请确认所选配置的供气压力及电压容差。实际装箱节拍需结合产品和装箱方式确认。"
}),
  model({
  "name": "BR-50",
  "slug": "br-50",
  "seriesSlug": "br-series",
  "series": "BR Series",
  "category": "Collaborative Case Packing Workstation",
  "categoryZh": "协作装箱机器人工作站",
  "image": "/images/products/br-case-packer-dark-v1.png",
  "axes": "—",
  "payload": "50 kg",
  "reach": "1,900 mm",
  "repeatability": "—",
  "bodyWeight": "150 kg",
  "power": "3 kW",
  "jointParameters": [],
  "applications": [
    "Product infeed",
    "Vacuum handling",
    "Carton packing"
  ],
  "industries": [
    "Packaging",
    "Factory automation"
  ],
  "positioning": "A 50 kg case packing workstation combining product infeed, vacuum handling and automatic carton packing, with a catalog packing rate of up to 8 pcs/min.",
  "positioningZh": "50 kg 协作装箱工作站，衔接进料定位、真空抓取与自动装箱，画册装箱节拍 ≤8 pcs/min。",
  "specifications": [
    {
      "name": "Model",
      "nameZh": "机型",
      "value": "BR-50"
    },
    {
      "name": "Payload",
      "nameZh": "负载",
      "value": "50 kg"
    },
    {
      "name": "Maximum robot travel",
      "nameZh": "机器人最大行程",
      "value": "1,900 mm"
    },
    {
      "name": "Packing rate",
      "nameZh": "装箱节拍",
      "value": "≤8 pcs/min"
    },
    {
      "name": "Maximum carton length",
      "nameZh": "纸箱尺寸长",
      "value": "≤600 mm"
    },
    {
      "name": "Maximum carton width",
      "nameZh": "纸箱尺寸宽",
      "value": "≤500 mm"
    },
    {
      "name": "Maximum carton height",
      "nameZh": "纸箱尺寸高",
      "value": "≤450 mm"
    },
    {
      "name": "Total power",
      "nameZh": "总功率",
      "value": "3 kW"
    },
    {
      "name": "Air pressure supply, catalog entries",
      "nameZh": "供气压力（画册列值）",
      "value": "5 kgf/cm²; 0.6 MPa"
    },
    {
      "name": "Machine net weight",
      "nameZh": "机器净重",
      "value": "150 kg"
    },
    {
      "name": "Machine dimensions (L × W × H)",
      "nameZh": "机器外形尺寸（长 × 宽 × 高）",
      "value": "Main unit: 2,200 × 500 × 1,100 mm; electrical cabinet: 700 × 320 × 1,200 mm",
      "valueZh": "主机：2,200 × 500 × 1,100 mm；电箱：700 × 320 × 1,200 mm"
    },
    {
      "name": "Power supply",
      "nameZh": "电源类型",
      "value": "Single-phase 220 V, 50/60 Hz",
      "valueZh": "单相 220 V，50/60 Hz"
    }
  ],
  "environment": [],
  "drawing": "/images/products/br-50-drawing.webp",
  "catalogFile": "/catalogs/scr-collaborative-palletizing-packing-2026.pdf",
  "catalogPage": 11,
  "technicalNote": "The catalog lists both 5 kgf/cm² and 0.6 MPa for air supply; these are not equivalent pressures. Confirm the required pressure and voltage tolerance for the selected configuration before installation. Packing rate depends on the product and packing pattern.",
  "technicalNoteZh": "画册供气栏同时列有 5 kgf/cm² 和 0.6 MPa，两者并非等值压力。安装前请确认所选配置的供气压力及电压容差。实际装箱节拍需结合产品和装箱方式确认。"
}),
];

export const productModelEnvironment = standardEnvironment;

export function getProductModel(seriesSlug: string, modelSlug: string) {
  return productModels.find(
    (item) => item.seriesSlug === seriesSlug && item.slug === modelSlug,
  );
}

export function getProductModelByName(seriesSlug: string, name: string) {
  return productModels.find(
    (item) => item.seriesSlug === seriesSlug && item.name === name,
  );
}

export function getProductModelsBySeries(seriesSlug: string) {
  return productModels.filter((item) => item.seriesSlug === seriesSlug);
}

export function getProductModelSeoKeywords(modelItem: ProductModel) {
  const applicationKeywords = modelItem.applications.map((item) =>
    item.toLowerCase(),
  );

  return [
    modelItem.name,
    `${modelItem.name} robot`,
    `${modelItem.series} robot`,
    modelItem.category,
    "industrial robot manufacturer",
    "palletizing robot",
    "depalletizing robot",
    "factory automation",
    "robotic palletizing system",
    "South China Robotics",
    ...applicationKeywords,
  ];
}
