export type SolutionPage = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  eyebrow: string;
  heroTitle: string;
  heroDescription: string;
  image: string;
  painPoints: { title: string; text: string }[];
  solutionIntro: string;
  solutionComponents: string[];
  materials: string[];
  industries: string[];
  systemConfig: { parameter: string; value: string }[];
  quoteInputs: string[];
  faq: { question: string; answer: string }[];
  internalLinks: { title: string; href: string; text: string }[];
};

export const solutionPages: SolutionPage[] = [
  // ── Page 1: Bag Depalletizing System ──
  {
    slug: "bag-depalletizing-system",
    title: "Bag Depalletizing Robot System",
    seoTitle:
      "Bag Depalletizing Robot System for Powder and Bulk Material Lines | SCR Robot",
    description:
      "Robotic bag depalletizing systems for 20–50 kg powder, chemical, and bulk material bags. Automatic pallet unloading, bag feeding to hopper or conveyor. Request engineering review.",
    eyebrow: "Bag depalletizing automation",
    heroTitle:
      "Bag Depalletizing Robot System for Heavy Bags and Powder Lines",
    heroDescription:
      "SCR Robot builds turnkey bag depalletizing cells that pick 20–50 kg bags from inbound pallets and feed them into hoppers, conveyors, or processing stations. The system covers robot arm, 3D vision or position detection, custom bag gripper, outfeed conveyor, safety guarding, and PLC/HMI control — engineered to your bag type, pallet pattern, and throughput target.",
    image: "/images/bejing1%20(1).jpg",
    painPoints: [
      {
        title: "Manual unloading of 20–50 kg bags is labor intensive",
        text: "Operators unloading heavy bags shift after shift face fatigue, inconsistent cycle times, and risk of strain. A robotic depalletizing cell can maintain a steady rhythm across multiple shifts without the physical toll of manual handling.",
      },
      {
        title: "Dust exposure during bag handling",
        text: "Powder-coated bags release fine dust during lifting, turning, and placement. Robot handling combined with dust extraction at the pick and discharge points reduces operator exposure and helps maintain a cleaner production floor.",
      },
      {
        title: "Unstable or irregular pallet patterns from suppliers",
        text: "Inbound pallets do not always arrive in perfect condition. Bags can shift during transport, layers can lean, and slip sheets can tear. A practical depalletizing cell includes product detection and adjustable tooling that can tolerate some variation without stopping the line.",
      },
      {
        title: "Continuous feeding to mixer, hopper, or conveyor is hard to staff",
        text: "Many production lines need a steady bag feed rate to keep downstream equipment running at capacity. Manual unloading cannot always sustain the pace, especially during shift changes, breaks, or peak production periods.",
      },
      {
        title: "Different bag sizes and pallet types on the same line",
        text: "A plant may receive 25 kg bags on one pallet type and 50 kg bags on another. The depalletizing cell should be configurable for multiple SKUs, pallet dimensions, and layer patterns without requiring a complete mechanical rebuild.",
      },
    ],
    solutionIntro:
      "SCR Robot depalletizing cells are designed around the actual bag weight, surface, pallet condition, and downstream interface. The system can include robot arm selection based on payload and reach, 3D vision or laser-based pallet position detection, a custom bag gripper (vacuum, clamp, or combination tooling), outfeed conveyor, hopper or feeding interface, safety guarding with interlocks, and PLC/HMI with recipe management for different bag SKUs. Engineering review covers pallet access, layer detection, slip sheet handling, and integration with the existing production line.",
    solutionComponents: [
      "Depalletizing robot arm (payload selected per bag weight and reach)",
      "3D vision system or laser-based pallet position detection",
      "Custom bag gripper (vacuum, clamp, fork, or combination tooling)",
      "Outfeed conveyor for bag discharge",
      "Hopper or feeding interface to downstream equipment",
      "Safety guarding with access doors and interlocks",
      "PLC/HMI control with recipe management for multiple SKUs",
      "Optional slip sheet removal and empty pallet handling",
    ],
    materials: [
      "Plastic pellets",
      "Chemical powder",
      "Food ingredients",
      "Animal feed",
      "Fertilizer",
      "Building materials",
      "Mineral powder",
      "Cement additives",
      "Refractory materials",
    ],
    industries: [
      "Plastic manufacturing",
      "Chemical processing",
      "Food ingredient production",
      "Animal feed manufacturing",
      "Fertilizer production",
      "Building material plants",
      "Mining and mineral processing",
      "Powder handling lines",
    ],
    systemConfig: [
      {
        parameter: "Robot payload range",
        value: "50–210 kg typical; higher payloads available for heavy or dual-pick applications",
      },
      {
        parameter: "Bag weight range",
        value: "20–50 kg typical; lighter or heavier bags evaluated per project",
      },
      {
        parameter: "Bag detection",
        value: "3D vision, laser ranging, or sensor-based position detection, configured per pallet condition",
      },
      {
        parameter: "Gripper type",
        value: "Project-based: vacuum, clamp, fork, fork-and-clamp, or custom tooling per bag surface and weight",
      },
      {
        parameter: "Throughput",
        value: "Depends on bag weight, layer pattern, and discharge distance; calculated during engineering review",
      },
      {
        parameter: "Pallet types",
        value: "Standard wood, plastic, or slip-sheet pallets; configurable for multiple pallet sizes",
      },
      {
        parameter: "Safety",
        value: "Perimeter guarding, safety interlocks, light curtains, emergency stop; compliant with industrial safety standards",
      },
      {
        parameter: "Control",
        value: "PLC/HMI with recipe selection, production counting, alarm logging, and remote diagnostics capability",
      },
    ],
    quoteInputs: [
      "Product photos or short video of current bag type and pallet condition",
      "Bag size (L×W×H) and bag weight (kg)",
      "Material type and dust characteristics",
      "Target throughput (bags per hour) and shift schedule",
      "Inbound pallet size and typical layer pattern",
      "Downstream equipment: hopper inlet height, conveyor width, mixer type",
      "Existing line layout with available floor area",
      "Destination country and voltage requirements",
    ],
    faq: [
      {
        question: "Can the robot handle 25 kg or 50 kg bags?",
        answer:
          "Yes. SCR Robot selects the robot payload and gripper type based on the actual bag weight, surface material, and center of gravity. Both 25 kg and 50 kg bags are common in our depalletizing projects. The robot model is matched to the heaviest bag in your product mix with an engineering margin for tooling weight and dynamic load.",
      },
      {
        question: "Do you need 3D vision for every depalletizing project?",
        answer:
          "Not necessarily. 3D vision is valuable when pallet patterns are irregular, bags shift during transport, or layer heights vary. For stable, uniform pallets, simpler laser ranging or sensor-based detection may be sufficient. The detection method is evaluated during engineering review based on your actual pallet condition and budget.",
      },
      {
        question: "Can the system feed directly into a hopper or mixer?",
        answer:
          "Yes. The depalletizing cell can be designed with an outfeed conveyor that delivers bags directly to a hopper inlet, mixer feed point, or downstream conveyor. The discharge height, angle, and interface are confirmed during layout review so the bag arrives at the right position and orientation for the next process step.",
      },
      {
        question: "Can the robot handle dusty or coated bags?",
        answer:
          "Yes. Gripper selection accounts for dusty, slippery, or coated bag surfaces. Vacuum grippers with appropriate cup material and clamp-assisted tooling can handle bags with surface dust. Dust extraction at the pick and discharge zones can be integrated to reduce airborne dust in the production area.",
      },
      {
        question: "Can the system handle multiple bag SKUs on the same line?",
        answer:
          "Yes. The PLC/HMI can store recipes for different bag sizes, weights, pallet patterns, and discharge positions. Operators can switch between SKUs through the HMI without mechanical adjustments. The gripper and detection system are designed to accommodate the full range of bag types in your production mix.",
      },
      {
        question: "What information is needed for a depalletizing quotation?",
        answer:
          "Please send product photos or a short video of the current bags and pallets, bag dimensions and weight, material type, target throughput in bags per hour, pallet size and layer pattern, downstream equipment details (hopper height, conveyor width), factory layout, and destination country. More data means a more specific proposal.",
      },
    ],
    internalLinks: [
      {
        title: "SCH Heavy-Duty Palletizing Robots",
        href: "/products/sch-series",
        text: "Heavy-duty four-axis palletizing and depalletizing robots with payload options up to 800 kg.",
      },
      {
        title: "SCR High-Payload Palletizing Systems",
        href: "/products/scr-series",
        text: "Dedicated high-payload palletizing robot for large cartons, bags, and end-of-line stacking.",
      },
      {
        title: "Industry Solutions",
        href: "/industries",
        text: "Explore robot automation solutions across plastic, chemical, food, feed, fertilizer, building materials, and powder handling.",
      },
      {
        title: "Case Studies",
        href: "/case-studies",
        text: "Representative automation scenarios showing depalletizing, palletizing, and feeding system concepts.",
      },
    ],
  },

  // ── Page 2: Automatic Bag Breaking and Feeding System ──
  {
    slug: "automatic-bag-breaking-feeding-system",
    title: "Automatic Bag Breaking and Feeding System",
    seoTitle:
      "Automatic Bag Breaking and Feeding System for Powder Materials | SCR Robot",
    description:
      "Automatic bag breaking and feeding systems for powder materials. Dust-controlled bag opening, cutting, discharge to mixer or silo, and empty bag handling. Request engineering review.",
    eyebrow: "Bag breaking and powder feeding automation",
    heroTitle:
      "Automatic Bag Breaking and Feeding System for Powder Materials",
    heroDescription:
      "SCR Robot builds integrated bag breaking and powder feeding stations that cut, open, and discharge 20–50 kg bags into mixers, silos, hoppers, or conveyors. The system covers bag loading conveyor, automatic cutting or opening unit, discharge hopper with dust collection, empty bag waste handling, and PLC/HMI with safety guarding — designed to reduce manual powder contact and maintain consistent feed rates.",
    image: "/images/bejing1%20(3).jpg",
    painPoints: [
      {
        title: "Manual bag cutting creates dust and waste",
        text: "Operators cutting bags by hand release powder dust into the air with every cut. This creates a respiratory hazard, contaminates nearby equipment, and wastes material that settles on the floor. An enclosed automatic cutting station with dust extraction contains the powder at the source.",
      },
      {
        title: "Operators contact powder directly during feeding",
        text: "Manual bag opening and pouring brings operators into direct contact with powder materials. For chemical, mineral, or additive powders, this can create skin and respiratory exposure. An automatic system separates the operator from the material during cutting, discharge, and empty bag handling.",
      },
      {
        title: "Feeding to mixer or silo needs a stable, measured flow",
        text: "Downstream processes depend on consistent material feed. Manual bag-by-bag pouring creates uneven flow that can affect mixing quality, reaction consistency, or extrusion stability. An automated feeding system with buffering and metering delivers material at a controlled rate.",
      },
      {
        title: "Different bag materials require different cutting and discharge approaches",
        text: "Woven polypropylene, paper, PE-lined, and multi-layer bags each behave differently during cutting and emptying. The bag opening unit should be configurable for bag material, thickness, and seam type so the cutting action is reliable across your material supply.",
      },
      {
        title: "Empty bag waste handling is labor intensive and dusty",
        text: "After emptying, empty bags carry residual powder. Manual collection and compaction of empty bags creates another dust exposure point. An integrated empty bag handling system can compact or convey empty bags to a collection point without manual contact.",
      },
    ],
    solutionIntro:
      "SCR Robot bag breaking systems are engineered around your bag type, powder characteristics, downstream equipment interface, and dust control requirements. The system typically includes a bag loading conveyor or roller table, an automatic cutting or opening unit with adjustable blade or rotary cutter, a discharge hopper with integrated dust collection interface, empty bag waste handling (compactor or conveyor), safety guarding with interlocks, and PLC/HMI control. Engineering review covers bag material, powder flow properties, bridging risk, dust explosion considerations, and integration with existing mixer, silo, or pneumatic conveyor inlets.",
    solutionComponents: [
      "Bag loading conveyor or roller table with operator loading station",
      "Automatic cutting or opening unit (rotary blade, guillotine, or custom mechanism)",
      "Discharge hopper with dust collection interface and bag shaking/vibration",
      "Dust extraction system with filter and collection bin",
      "Empty bag handling (compactor, conveyor, or collection bin with lid)",
      "Safety guarding with interlocks and emergency stop",
      "PLC/HMI control with production counting and alarm management",
      "Optional: weigh hopper, buffer silo, or pneumatic conveying interface",
    ],
    materials: [
      "Chemical powder",
      "Food ingredients and additives",
      "Animal feed ingredients",
      "Fertilizer raw materials",
      "Plastic pellets and compounds",
      "Mineral powder and fillers",
      "Cement additives",
      "Refractory powders",
      "Pharmaceutical intermediates",
    ],
    industries: [
      "Chemical processing",
      "Food ingredient manufacturing",
      "Animal feed production",
      "Fertilizer blending",
      "Plastic compounding",
      "Building material production",
      "Powder coating and additive lines",
    ],
    systemConfig: [
      {
        parameter: "Bag weight range",
        value: "20–50 kg typical; lighter or heavier bags evaluated per project",
      },
      {
        parameter: "Bag material types",
        value: "Woven PP, paper, PE-lined, multi-layer kraft, and jumbo bags; cutting mechanism selected per material",
      },
      {
        parameter: "Cutting method",
        value: "Project-based: rotary blade, guillotine cutter, or custom opening mechanism per bag type and seam position",
      },
      {
        parameter: "Discharge rate",
        value: "Depends on bag weight, powder flow characteristics, and downstream equipment capacity; calculated during engineering review",
      },
      {
        parameter: "Dust collection",
        value: "Integrated dust extraction at cutting station and discharge hopper; filter type and airflow sized per powder properties",
      },
      {
        parameter: "Empty bag handling",
        value: "Compactor, screw conveyor to collection bin, or manual collection station per site preference and waste volume",
      },
      {
        parameter: "Material of construction",
        value: "Carbon steel with protective coating; stainless steel available for food-grade or corrosive applications",
      },
      {
        parameter: "Safety and compliance",
        value: "Perimeter guarding, safety interlocks, emergency stop, dust control; ATEX/DSEAR review available for combustible dusts",
      },
    ],
    quoteInputs: [
      "Product photos or short video of current bag type and manual opening process",
      "Bag size, bag weight, and bag material (woven PP, paper, PE-lined, etc.)",
      "Powder material type, bulk density, moisture content, and flow characteristics",
      "Target throughput (bags per hour) and shift schedule",
      "Downstream equipment: mixer inlet height, silo opening, conveyor type",
      "Existing line layout with available floor area and ceiling height",
      "Dust control requirements and any site combustible dust classification",
      "Destination country and voltage requirements",
    ],
    faq: [
      {
        question: "Can the system reduce dust during bag opening?",
        answer:
          "Yes. The bag cutting and discharge station is enclosed, with integrated dust extraction at the cutting point and discharge hopper. This captures airborne dust at the source before it spreads to the production floor. The extraction system is sized to the powder type and bag opening rate so operators are not exposed to visible dust clouds during normal operation.",
      },
      {
        question: "What bag materials can the automatic cutting unit handle?",
        answer:
          "The cutting mechanism is selected based on your actual bag material — woven polypropylene, multi-layer paper, PE-lined kraft, or jumbo bags. Different bag materials require different blade types, cutting angles, and feed speeds. Engineering review includes bag samples to confirm the cutting approach before system design is finalized.",
      },
      {
        question: "Can the feeding system connect to an existing mixer, silo, or conveyor?",
        answer:
          "Yes. The discharge hopper can be designed to interface with an existing mixer inlet, pneumatic conveyor pickup, screw feeder, belt conveyor, or buffer silo. The interface height, flange connection, and material flow path are confirmed during layout review so the powder transfers reliably into your existing equipment.",
      },
      {
        question: "How is empty bag waste handled after the powder is discharged?",
        answer:
          "After the bag is emptied and shaken, the empty bag can be directed to a compactor for volume reduction, conveyed to a collection bin, or dropped into a covered waste container. The handling method is selected based on your waste volume, available floor space, and whether you recycle or dispose of empty bags.",
      },
      {
        question: "Is the cutting unit customized for each bag size?",
        answer:
          "The cutting unit is configurable for a range of bag sizes within your production mix. If your plant runs multiple bag sizes, the system can be designed with adjustable guides, multi-position blades, or recipe-based settings in the PLC so operators can switch between bag types through the HMI without mechanical changes.",
      },
      {
        question: "What information is needed for a bag breaking system quotation?",
        answer:
          "Please send product photos or a short video of current bag opening, bag type and material, bag weight, powder type and flow characteristics, target throughput, downstream equipment details (mixer, silo, conveyor type and inlet size), dust control requirements, factory layout, and destination country. Bag samples for cutting trials can also help confirm the cutting approach.",
      },
    ],
    internalLinks: [
      {
        title: "SCH Heavy-Duty Palletizing Robots",
        href: "/products/sch-series",
        text: "Heavy-duty four-axis robots suitable for palletizing and depalletizing applications in powder handling lines.",
      },
      {
        title: "SCR High-Payload Palletizing Systems",
        href: "/products/scr-series",
        text: "Dedicated high-payload palletizing robot for bag stacking at the end of powder production lines.",
      },
      {
        title: "Industry Solutions",
        href: "/industries",
        text: "Explore robot automation across chemical, food, feed, fertilizer, and powder handling industries.",
      },
      {
        title: "Case Studies",
        href: "/case-studies",
        text: "Representative automation scenarios showing feeding, bag breaking, and powder handling system concepts.",
      },
    ],
  },

  // ── Page 3: Robotic Bag Palletizing System ──
  {
    slug: "robotic-bag-palletizing-system",
    title: "Robotic Bag Palletizing System",
    seoTitle:
      "Robotic Bag Palletizing System for 20–50 kg Bags | SCR Robot",
    description:
      "Robotic bag palletizing systems for 20–50 kg filled bags. Automatic pallet stacking with configurable patterns, bag flattening, and conveyor integration. Request engineering review.",
    eyebrow: "Bag palletizing automation",
    heroTitle:
      "Robotic Bag Palletizing System for 20–50 kg Bags",
    heroDescription:
      "SCR Robot builds end-of-line robotic bag palletizing cells that stack filled 20–50 kg bags onto pallets with configurable patterns, layer heights, and discharge sequences. The system covers robot arm, bag infeed conveyor, bag flattening or positioning unit, custom bag gripper, pallet magazine or dispenser, safety fencing, pallet pattern programming, and PLC/HMI control — engineered to your bag type, throughput, and pallet specification.",
    image: "/images/bejing1%20(2).jpg",
    painPoints: [
      {
        title: "Manual palletizing causes back strain and inconsistent stacking",
        text: "Lifting and stacking 20–50 kg bags onto pallets for hours per shift is one of the most physically demanding jobs on a production line. Operators tire, stacking quality drops across the shift, and pallet stability becomes inconsistent. A robotic palletizing cell maintains the same stacking precision from the first bag to the last.",
      },
      {
        title: "Heavy bags require precise placement for pallet stability",
        text: "A pallet of 50 kg bags that is not stacked squarely becomes a safety risk during forklift transport. Robot palletizing applies consistent placement force and orientation so each layer interlocks correctly, and the finished pallet is stable enough for warehouse handling and container loading.",
      },
      {
        title: "Multiple bag sizes and pallet patterns on the same line",
        text: "A production line may fill 25 kg bags onto one pallet size in the morning and 50 kg bags onto a different pallet in the afternoon. The palletizing cell should switch between patterns, layer counts, and stack heights through recipe selection on the HMI without mechanical changeover time.",
      },
      {
        title: "Integration with the packing machine and conveyor is not plug-and-play",
        text: "The palletizing robot is only one part of the flow. Bags arrive from the filling machine via conveyor. They may need flattening, positioning, or orientation correction before the robot picks them. The cell controls must communicate with upstream equipment to manage gaps, stops, and fault recovery.",
      },
      {
        title: "Labor shortage makes shift staffing unreliable",
        text: "Many factories report difficulty staffing palletizing positions consistently across all shifts. A robotic cell can operate through breaks, shift changes, and overnight production without the variability of manual staffing. Operators can be redeployed to higher-value tasks like quality inspection and line supervision.",
      },
    ],
    solutionIntro:
      "SCR Robot palletizing cells are designed around the filled bag weight, surface condition, conveyor speed, and pallet specification. The system typically includes a robot arm selected for the bag weight, reach, and cycle time; a bag infeed conveyor from the filling machine; a bag flattening or positioning unit to prepare each bag for accurate placement; a custom bag gripper (clamp, fork, vacuum, or combination); a pallet magazine or dispenser for automatic pallet feeding; safety fencing with interlocks; pallet pattern programming in the PLC/HMI; and discharge conveyor or forklift pickup zone for finished pallets. Engineering review covers bag surface friction, fill consistency, pallet pattern options, stack height limits, and integration with the upstream filling line.",
    solutionComponents: [
      "Palletizing robot arm (payload and reach selected per bag weight and pallet size)",
      "Bag infeed conveyor from filling/packing machine",
      "Bag flattening, positioning, or turning unit for pre-pick orientation",
      "Custom bag gripper (clamp, fork, vacuum, or combination tooling)",
      "Pallet magazine, dispenser, or manual pallet loading station",
      "Safety fencing with access doors, interlocks, and light curtains",
      "Pallet pattern programming in PLC/HMI with recipe management",
      "Finished pallet discharge conveyor or forklift pickup zone",
      "Optional: automatic slip sheet or layer sheet placement",
    ],
    materials: [
      "Plastic pellets (filled bags)",
      "Chemical powder (filled bags)",
      "Food ingredients (filled bags)",
      "Animal feed (filled bags)",
      "Fertilizer (filled bags)",
      "Building materials (filled bags)",
      "Mineral powder (filled bags)",
      "Cement and additives (filled bags)",
      "Refractory materials (filled bags)",
    ],
    industries: [
      "Plastic manufacturing",
      "Chemical processing",
      "Food ingredient production",
      "Animal feed manufacturing",
      "Fertilizer production",
      "Building material plants",
      "Powder handling and bagging lines",
    ],
    systemConfig: [
      {
        parameter: "Robot payload range",
        value: "50–210 kg typical for bag palletizing; higher payloads available for dual-pick or heavy bag applications",
      },
      {
        parameter: "Bag weight range",
        value: "20–50 kg typical; lighter bags (5–15 kg) and heavier bags evaluated per project",
      },
      {
        parameter: "Pallet patterns",
        value: "Configurable: column stacking, interlocking, pinwheel, or custom patterns per bag size and pallet type",
      },
      {
        parameter: "Gripper type",
        value: "Project-based: clamp gripper, fork gripper, vacuum gripper, or combination tooling per bag surface, fill consistency, and weight",
      },
      {
        parameter: "Throughput",
        value: "Depends on bag weight, pallet pattern, conveyor speed, and robot cycle time; calculated during engineering review",
      },
      {
        parameter: "Pallet sizes",
        value: "Standard 1200×1000 mm, 1200×800 mm, 1100×1100 mm; custom pallet sizes supported",
      },
      {
        parameter: "Bag positioning",
        value: "Bag flattening roller, turning device, or alignment guides before robot pick; configured per bag fill consistency",
      },
      {
        parameter: "Safety",
        value: "Perimeter fencing, safety interlocks, light curtains at pallet discharge, emergency stop; compliant with industrial safety standards",
      },
    ],
    quoteInputs: [
      "Product photos or short video of filled bags on the current line",
      "Filled bag size (L×W×H), bag weight (kg), and bag surface material",
      "Bag fill consistency (firm, soft, settled) and whether bags are sealed or stitched",
      "Target throughput (bags per hour) and shift schedule",
      "Pallet size and preferred pallet pattern or current stacking method",
      "Upstream equipment: filling machine type, conveyor width, bag arrival orientation",
      "Existing line layout with available floor area for the palletizing cell",
      "Destination country and voltage requirements",
    ],
    faq: [
      {
        question: "Can the robot palletize 20–50 kg bags reliably?",
        answer:
          "Yes. SCR Robot selects the robot model, gripper type, and cycle parameters based on the actual filled bag weight, surface friction, and fill consistency. Bags in the 20–50 kg range are the most common application for our palletizing robots. The robot payload includes an engineering margin for gripper weight and dynamic acceleration so the cell runs within a safe working envelope.",
      },
      {
        question: "Can the system support different pallet patterns?",
        answer:
          "Yes. The PLC/HMI stores pallet pattern recipes for different bag sizes, layer counts, column or interlocking patterns, and pallet types. Operators select the recipe from the HMI, and the robot adjusts pick position, placement coordinates, and layer sequence automatically. Custom patterns can be programmed during commissioning based on your stacking requirements.",
      },
      {
        question: "Can the palletizing cell connect with an existing packing machine?",
        answer:
          "Yes. The infeed conveyor is designed to interface with your existing bag filling or sealing machine. The control system communicates with upstream equipment via standard industrial protocols so bags are released to the robot at the right pace. Engineering review covers the conveyor interface, handshake signals, gap control, and fault recovery between the filling machine and the palletizing cell.",
      },
      {
        question: "What type of gripper is used for bags?",
        answer:
          "The gripper type depends on your bag surface, fill consistency, and weight. Clamp grippers work well for firm, stable bags. Fork grippers suit bags that need support from below. Vacuum grippers handle smooth-surface bags. Combination tooling can handle mixed bag types. The gripper is selected during engineering review based on bag samples or photos.",
      },
      {
        question: "Can the system work with slippery or soft bags?",
        answer:
          "Yes. Soft or partially filled bags, slippery woven-PP surfaces, and bags that settle during transport require specific gripper design and placement strategy. SCR Robot reviews bag samples, fill consistency, and surface friction before selecting the gripper type and confirming the placement approach. The goal is reliable handling without bag damage or dropped loads.",
      },
      {
        question: "What information is needed for a palletizing quotation?",
        answer:
          "Please send product photos or a short video of filled bags on the current line, filled bag dimensions and weight, bag surface material and fill consistency, target throughput, pallet size and preferred stacking pattern, upstream filling machine details, factory layout, and destination country. More complete data helps engineering select the right robot model and propose a practical cell layout.",
      },
    ],
    internalLinks: [
      {
        title: "SCH Heavy-Duty Palletizing Robots",
        href: "/products/sch-series",
        text: "Heavy-duty four-axis palletizing robots with payload options up to 800 kg for demanding bag stacking lines.",
      },
      {
        title: "SCR High-Payload Palletizing Systems",
        href: "/products/scr-series",
        text: "Dedicated 180 kg payload palletizing robot with 3,200 mm reach for large bag and carton end-of-line stacking.",
      },
      {
        title: "ECR Light-Duty Palletizing Robots",
        href: "/products/ecr-series",
        text: "Compact four-axis robots for lighter palletizing, transfer, and packaging applications with 3–100 kg payload range.",
      },
      {
        title: "Industry Solutions",
        href: "/industries",
        text: "Explore robot automation across plastic, chemical, food, feed, fertilizer, and building material industries.",
      },
    ],
  },
];
