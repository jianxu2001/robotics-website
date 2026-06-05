export type IndustryPage = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  eyebrow: string;
  heroTitle: string;
  heroDescription: string;
  image: string;
  materials: string[];
  packages: string[];
  productionContext: string;
  buyerProblem: { title: string; text: string }[];
  depalletizing: {
    intro: string;
    steps: string[];
    equipment: string[];
  };
  feeding: {
    intro: string;
    steps: string[];
    equipment: string[];
  };
  palletizing: {
    intro: string;
    steps: string[];
    equipment: string[];
  };
  benefits: { title: string; text: string }[];
  recommendedProducts: { title: string; href: string; text: string }[];
  internalLinks: { title: string; href: string; text: string }[];
  quoteInputs: string[];
  faq: { question: string; answer: string }[];
};

type IndustryInput = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  eyebrow: string;
  heroTitle: string;
  heroDescription: string;
  image: string;
  materials: string[];
  packages: string[];
  productionContext: string;
  painFocus: string[];
  depalletizingFocus: string;
  feedingFocus: string;
  palletizingFocus: string;
  preferredRobots: { title: string; href: string; text: string }[];
  internalLinks?: { title: string; href: string; text: string }[];
};

function industry(input: IndustryInput): IndustryPage {
  const materialList = input.materials.join(", ");
  const packageList = input.packages.join(", ");

  return {
    ...input,
    buyerProblem: [
      {
        title: "High manual handling pressure",
        text: `${input.title} plants often move ${packageList} for many hours per shift. Operators must lift, turn, align, and stack products that may be heavy, dusty, unstable, or hard to grip. This creates fatigue, inconsistent output, and greater risk when the production plan requires stable loading, depalletizing, or palletizing during peak periods.`,
      },
      {
        title: "Variable material behavior",
        text: `${materialList} do not behave like uniform ecommerce cartons. Bags can deform, powders can settle, cartons can crush, sacks can slide, and pallets from suppliers can arrive with uneven stack quality. Robot selection therefore has to consider payload, reach, center of gravity, gripper contact area, product detection, and the actual condition of the load.`,
      },
      {
        title: "Dust, layout, and downstream constraints",
        text: `${input.productionContext} A useful automation proposal has to review conveyors, pallet position, bag opening height, hopper access, guarding, maintenance space, operator access, and the communication between robot, PLC, sensors, and downstream equipment.`,
      },
      {
        title: "Quotation uncertainty",
        text: "Many overseas buyers know they need automation, but they do not know whether to start with a palletizing robot, a depalletizing robot, a bag feeding cell, or a complete robot line. SCR Robot uses product photos, package data, throughput, pallet pattern, and factory layout to turn the inquiry into a practical engineering direction.",
      },
      {
        title: input.painFocus[0],
        text: input.painFocus[1],
      },
    ],
    depalletizing: {
      intro: input.depalletizingFocus,
      steps: [
        "Confirm pallet size, stack height, layer pattern, package deformation, and whether slip sheets, straps, or damaged packages appear in the incoming load.",
        "Select the robot payload and reach so the arm can access the full pallet, discharge point, and any buffer conveyor without operating at the edge of its envelope.",
        "Design grippers around the actual product surface, including vacuum, clamp, fork, fork-and-clamp, bag suction, or custom tooling when standard tooling is not reliable.",
        "Add sensors, pallet presence checks, product detection, and safe operator access so the cell can recover from shifted loads without long downtime.",
      ],
      equipment: [
        "Depalletizing robot",
        "Layer or product detection",
        "Pallet conveyor or pallet station",
        "Outfeed conveyor",
        "Safety guarding",
        "PLC/HMI control",
      ],
    },
    feeding: {
      intro: input.feedingFocus,
      steps: [
        "Define whether the line needs automatic bag feeding, carton feeding, ingredient transfer, hopper loading, mixer loading, or machine-side loading.",
        "Check product dust, moisture, packaging strength, bag mouth position, and discharge height before choosing the feeding method.",
        "Coordinate the robot cell with conveyors, bag breaker, screw conveyor, bucket elevator, buffer hopper, weighing station, or upstream packaging machine.",
        "Use interlocks and production logic so feeding only occurs when the downstream machine is ready and the operator can safely intervene.",
      ],
      equipment: [
        "Robot loading cell",
        "Bag feeding or carton feeding conveyor",
        "Product detection",
        "Hopper or machine interface",
        "Dust-aware enclosure when required",
        "Control integration",
      ],
    },
    palletizing: {
      intro: input.palletizingFocus,
      steps: [
        "Calculate payload margin from product weight, gripper weight, acceleration, reach, and desired cycle time instead of selecting a robot only from catalog payload.",
        "Confirm pallet pattern, stack height, label direction, bag orientation, and whether the factory needs one line to one pallet or multiple lines to multiple pallets.",
        "Plan infeed conveyors, pallet magazine, empty pallet handling, pallet discharge, guarding, and operator access around the robot footprint.",
        "Use a repeatable stacking strategy so the final pallet is stable for forklift movement, warehouse storage, and shipping.",
      ],
      equipment: [
        "Palletizing robot",
        "Infeed conveyor",
        "End-of-arm tooling",
        "Pallet station",
        "Finished pallet conveyor",
        "Safety fence and sensors",
      ],
    },
    benefits: [
      {
        title: "Labor saving",
        text: "Reduce repetitive lifting, bending, turning, and stacking work so operators can move toward supervision, quality checks, material preparation, and maintenance support.",
      },
      {
        title: "Stable output",
        text: "Keep depalletizing, feeding, and palletizing aligned with the production rhythm instead of relying on manual speed that changes by shift, operator, and fatigue level.",
      },
      {
        title: "Safer handling",
        text: "Move workers away from heavy packages, dusty zones, unstable pallets, high stacking positions, and repetitive manual tasks that are difficult to sustain safely.",
      },
      {
        title: "Engineering clarity",
        text: "Turn an uncertain automation idea into a practical scope covering robot model, tooling, conveyors, safety, layout, and quotation information.",
      },
    ],
    recommendedProducts: input.preferredRobots,
    internalLinks: input.internalLinks ?? [
      {
        title: "Palletizing robot series",
        href: "/products/sch-series",
        text: "Review four-axis robot options for bag, carton, and case palletizing.",
      },
      {
        title: "High-payload palletizing",
        href: "/products/scr-series",
        text: "Consider high-payload robots for heavier bags, larger patterns, and end-of-line cells.",
      },
      {
        title: "Contact engineering",
        href: "/contact",
        text: "Send product data, photos, throughput, and layout for a project review.",
      },
    ],
    quoteInputs: [
      "Product or package photos and short process video",
      "Unit weight, dimensions, surface condition, and package material",
      "Pallet size, stack height, pallet pattern, and layer count",
      "Target throughput per hour, shift schedule, and current bottleneck",
      "Infeed direction, outfeed direction, available floor area, and site layout",
      "Dust, moisture, hygiene, safety, or environmental requirements",
      "Destination country, voltage, factory standards, and installation expectations",
    ],
    faq: [
      {
        question: `Can SCR Robot automate ${input.title.toLowerCase()} lines with different package sizes?`,
        answer:
          "Yes, but each SKU should be reviewed for weight, dimensions, center of gravity, pallet pattern, and gripper compatibility. A project can use recipe-based settings when the mechanical range and tooling design support the product mix.",
      },
      {
        question: "Should the project start with depalletizing, feeding, or palletizing?",
        answer:
          "Start with the bottleneck that limits output or creates the highest manual handling risk. Many factories begin with palletizing because it is repetitive and labor intensive, then add depalletizing or automatic feeding when upstream material flow becomes the next constraint.",
      },
      {
        question: "Can the system include conveyors, grippers, guarding, and PLC controls?",
        answer:
          "Yes. SCR Robot can discuss the robot platform together with end-of-arm tooling, conveyors, pallet stations, product detection, safety guarding, PLC/HMI logic, and the layout needed for a complete automation cell.",
      },
      {
        question: "What information is needed for a quotation?",
        answer:
          "Send product photos, dimensions, weight, package type, pallet size, stack height, target output, current layout, infeed and outfeed direction, and a short video of the manual process. This helps engineering recommend the right robot and system scope.",
      },
    ],
  };
}

export const industryPages: IndustryPage[] = [
  industry({
    slug: "plastic-manufacturing",
    title: "Plastic Manufacturing",
    seoTitle: "Plastic Manufacturing Automation | Depalletizing & Palletizing Robots",
    description:
      "SCR Robot automation for plastic resin bags, molded parts, cartons, containers, film rolls, depalletizing, feeding, and end-of-line palletizing.",
    eyebrow: "Industry solution for plastic manufacturing",
    heroTitle: "Plastic Manufacturing Robot Automation for Depalletizing, Feeding, and Palletizing",
    heroDescription:
      "Automate resin bags, molded plastic parts, cartons, containers, and packaging lines with robot cells planned around product weight, pallet pattern, conveyors, and factory layout.",
    image: "/images/bejing1%20(2).jpg",
    materials: ["plastic resin bags", "molded plastic parts", "containers", "cartons", "film rolls"],
    packages: ["resin sacks", "cartons", "cases", "totes", "wrapped bundles"],
    productionContext:
      "Plastic production lines may include injection molding, extrusion, compounding, bagging, carton packing, and warehouse pallet flow in the same plant.",
    painFocus: [
      "Mixed SKU handling",
      "Plastic factories often change product dimensions, carton sizes, and packaging formats. The automation cell must be designed so operators can switch recipes, adjust pallet patterns, and keep line flow stable without rebuilding the whole system.",
    ],
    depalletizingFocus:
      "Automatic depalletizing is useful when resin bags, cartons, or containers arrive on pallets and must be unloaded to mixers, dryers, conveyors, or packaging areas.",
    feedingFocus:
      "Automatic feeding helps move resin bags, molded parts, or cartons into downstream equipment while reducing manual lifting around compounding, packing, or assembly areas.",
    palletizingFocus:
      "Automatic palletizing stabilizes end-of-line stacking for bags, cartons, molded products, and mixed plastic goods that need consistent pallet quality before warehousing.",
    preferredRobots: [
      {
        title: "SCH Series palletizing robots",
        href: "/products/sch-series",
        text: "For cartons, resin bags, cases, and medium to heavy end-of-line palletizing.",
      },
      {
        title: "ECR Series compact robots",
        href: "/products/ecr-series",
        text: "For compact cells, lighter molded plastic parts, and transfer tasks.",
      },
      {
        title: "SAR Series long-reach robots",
        href: "/products/sar-series",
        text: "For larger layouts, depalletizing, and wide work envelopes.",
      },
    ],
  }),
  industry({
    slug: "chemical-processing",
    title: "Chemical Processing",
    seoTitle: "Chemical Processing Automation | Bag Feeding & Palletizing Robots",
    description:
      "Robot automation for chemical bags, drums, cartons, powders, granular materials, depalletizing, automatic feeding, and palletizing.",
    eyebrow: "Industry solution for chemical processing",
    heroTitle: "Chemical Processing Robot Automation for Safer Bag Handling and Palletizing",
    heroDescription:
      "Plan robot cells for chemical bags, drums, cartons, powders, and granular materials with attention to dust, containment, payload, gripper design, and downstream equipment.",
    image: "/images/SCR.jpg",
    materials: ["chemical powders", "granules", "additives", "drums", "bagged raw materials"],
    packages: ["woven bags", "valve bags", "cartons", "drums", "pails"],
    productionContext:
      "Chemical processing lines often combine raw material receiving, batching, bag opening, mixing, packaging, and palletizing in dusty or controlled areas.",
    painFocus: [
      "Worker exposure reduction",
      "Chemical plants often want automation because manual bag handling places workers near dust, repetitive lifting, and process equipment. The cell must reduce exposure while still allowing inspection, maintenance, and safe exception handling.",
    ],
    depalletizingFocus:
      "Automatic depalletizing can unload bagged raw materials, cartons, or drums and transfer them to feeding conveyors, weighing areas, or staging points.",
    feedingFocus:
      "Automatic feeding is often the core requirement in chemical processing because bags or containers must reach mixers, hoppers, or dosing equipment at the right time.",
    palletizingFocus:
      "Automatic palletizing helps packaged chemical products leave the line with stable stack quality and less manual contact with dusty or heavy packages.",
    preferredRobots: [
      {
        title: "SCR Series high-payload robot",
        href: "/products/scr-series",
        text: "For heavy chemical bags and demanding palletizing layouts.",
      },
      {
        title: "SCH Series palletizing robots",
        href: "/products/sch-series",
        text: "For bags, cartons, drums, and end-of-line chemical packaging.",
      },
      {
        title: "SAR Series depalletizing robots",
        href: "/products/sar-series",
        text: "For wide work cells and stacked incoming materials.",
      },
    ],
  }),
  industry({
    slug: "building-materials",
    title: "Building Materials",
    seoTitle: "Building Materials Automation | Heavy Bag Palletizing Robots",
    description:
      "Heavy-duty robot automation for building material bags, tiles, boards, cartons, depalletizing, feeding, and palletizing.",
    eyebrow: "Industry solution for building materials",
    heroTitle: "Building Materials Robot Automation for Heavy Bags, Boards, Tiles, and Pallets",
    heroDescription:
      "Use SCR Robot systems to handle heavy building material bags, boards, tiles, cartons, and pallet flow with robots, grippers, conveyors, and safety planning.",
    image: "/images/bejing1%20(3).jpg",
    materials: ["dry mortar", "cement additives", "tiles", "boards", "construction chemicals"],
    packages: ["heavy bags", "cartons", "bundles", "boards", "palletized stacks"],
    productionContext:
      "Building material factories often run heavy products, dusty packaging areas, tall pallets, and forklifts moving between bagging, curing, storage, and loading zones.",
    painFocus: [
      "Heavy and dusty work",
      "Manual stacking of building material bags or boards is physically demanding and often happens in dusty environments. Robot automation must be strong enough for the load and simple enough for daily operators to maintain.",
    ],
    depalletizingFocus:
      "Automatic depalletizing supports incoming boards, cartons, bags, or palletized materials that need to move into cutting, mixing, packing, or transfer equipment.",
    feedingFocus:
      "Automatic feeding can load bags, boards, or cartons into production-side stations while reducing heavy lifting and improving line continuity.",
    palletizingFocus:
      "Automatic palletizing is especially valuable for heavy bags, cartons, boards, or tile products where consistent stacks reduce forklift and warehouse risk.",
    preferredRobots: [
      {
        title: "SCH Series heavy-duty robots",
        href: "/products/sch-series",
        text: "For heavy bags, cartons, and building material palletizing.",
      },
      {
        title: "SCR Series high-payload robot",
        href: "/products/scr-series",
        text: "For high-payload end-of-line stacking and large palletizing layouts.",
      },
      {
        title: "SAR Series long-reach robots",
        href: "/products/sar-series",
        text: "For wide work envelopes and heavy material transfer.",
      },
    ],
  }),
  industry({
    slug: "food-ingredients",
    title: "Food Ingredients",
    seoTitle: "Food Ingredient Automation | Bag Feeding & Palletizing Robots",
    description:
      "Robot automation for food ingredient bags, cartons, sacks, depalletizing, automatic feeding, conveyor transfer, and palletizing.",
    eyebrow: "Industry solution for food ingredients",
    heroTitle: "Food Ingredients Robot Automation for Bag Feeding, Depalletizing, and Palletizing",
    heroDescription:
      "Automate ingredient bags, cartons, and packaging lines with robot systems designed for stable feeding, repeatable palletizing, and safer material handling.",
    image: "/images/bejing1%20(1).jpg",
    materials: ["flour", "starch", "sugar", "seasoning powder", "food additives"],
    packages: ["paper bags", "woven bags", "cartons", "cases", "ingredient sacks"],
    productionContext:
      "Food ingredient plants need material flow that supports batching, mixing, packaging, hygiene rules, and shift-to-shift output stability.",
    painFocus: [
      "Batching and packaging continuity",
      "Ingredient handling often sits between warehouse receiving, recipe batching, and packaging. When manual feeding or palletizing is unstable, the whole line can lose rhythm even if the processing equipment is ready.",
    ],
    depalletizingFocus:
      "Automatic depalletizing unloads ingredient bags or cartons from pallets and transfers them toward batching, staging, or feeding points.",
    feedingFocus:
      "Automatic feeding helps move ingredient bags to hoppers, mixers, or bag opening stations while reducing repetitive lifting near food processing equipment.",
    palletizingFocus:
      "Automatic palletizing improves final stack consistency for ingredient bags, cartons, and cases before warehouse transfer.",
    preferredRobots: [
      {
        title: "ECR Series compact robots",
        href: "/products/ecr-series",
        text: "For lighter ingredient packages and compact transfer cells.",
      },
      {
        title: "SCH Series palletizing robots",
        href: "/products/sch-series",
        text: "For bag and carton palletizing at the end of food ingredient lines.",
      },
      {
        title: "ER Series six-axis robots",
        href: "/products/er-series",
        text: "For flexible loading, handling, and special approach angles.",
      },
    ],
  }),
  industry({
    slug: "animal-feed",
    title: "Animal Feed",
    seoTitle: "Animal Feed Automation | Feed Bag Palletizing Robots",
    description:
      "Robot automation for feed bags, additives, cartons, depalletizing, automatic loading, and palletizing in animal feed production.",
    eyebrow: "Industry solution for animal feed",
    heroTitle: "Animal Feed Robot Automation for Bag Handling, Feeding, and Palletizing",
    heroDescription:
      "Automate feed bags, additive sacks, cartons, and end-of-line palletizing with robot cells planned around bag deformation, dust, throughput, and pallet stability.",
    image: "/images/bejing1%20(2).jpg",
    materials: ["pellet feed", "powder feed", "premix", "additives", "bagged raw materials"],
    packages: ["feed bags", "sacks", "cartons", "woven bags", "bulk ingredient bags"],
    productionContext:
      "Feed mills often move high volumes of bagged material from mixing and bagging to warehouse pallets while dust and bag deformation affect handling quality.",
    painFocus: [
      "High-volume bag flow",
      "Animal feed lines can produce many bags per hour, and manual stacking becomes difficult when bag shape changes, operators rotate, or warehouse pallets must remain stable for transport.",
    ],
    depalletizingFocus:
      "Automatic depalletizing can unload premix, additives, or incoming bagged materials and send them toward dosing, staging, or feeding equipment.",
    feedingFocus:
      "Automatic feeding can move bags toward mixers, bag openers, or hoppers while keeping workers away from repetitive lifting and dusty areas.",
    palletizingFocus:
      "Automatic palletizing is a strong fit for feed bags because the work is repetitive, high volume, and sensitive to stack quality.",
    preferredRobots: [
      {
        title: "SCH Series palletizing robots",
        href: "/products/sch-series",
        text: "For feed bag palletizing and warehouse-ready stacks.",
      },
      {
        title: "SCR Series high-payload robot",
        href: "/products/scr-series",
        text: "For heavier bag patterns and demanding end-of-line cells.",
      },
      {
        title: "SAR Series long-reach robots",
        href: "/products/sar-series",
        text: "For wider layouts and depalletizing tasks.",
      },
    ],
  }),
  industry({
    slug: "fertilizer-production",
    title: "Fertilizer Production",
    seoTitle: "Fertilizer Production Automation | Bag Palletizing Robots",
    description:
      "Robot automation for fertilizer bags, granular products, additives, depalletizing, automatic feeding, and palletizing.",
    eyebrow: "Industry solution for fertilizer production",
    heroTitle: "Fertilizer Production Robot Automation for Bags, Feeding Lines, and Pallets",
    heroDescription:
      "Use robot automation to handle fertilizer bags, granular materials, additives, and palletizing cells with attention to dust, corrosion risk, payload, and stack quality.",
    image: "/images/bejing1%20(3).jpg",
    materials: ["compound fertilizer", "granular fertilizer", "powder additives", "soil amendments", "bagged raw materials"],
    packages: ["fertilizer bags", "woven sacks", "cartons", "palletized bags", "bulk additive bags"],
    productionContext:
      "Fertilizer plants handle dusty or granular materials, heavy bagging output, pallet transfer, and demanding warehouse flow around packaging lines.",
    painFocus: [
      "Dusty high-load packaging",
      "Manual fertilizer bag stacking can be exhausting because bags are heavy, surfaces are dusty, and output is continuous. Automation must consider product residue, bag deformation, and maintenance access.",
    ],
    depalletizingFocus:
      "Automatic depalletizing can unload raw material bags or additive packages for transfer to feeding, mixing, or staging points.",
    feedingFocus:
      "Automatic feeding moves bags or additive packages toward hoppers, mixers, or bag opening stations while reducing manual exposure to dust.",
    palletizingFocus:
      "Automatic palletizing gives fertilizer producers consistent stacks and reduces the labor load at the end of high-volume packaging lines.",
    preferredRobots: [
      {
        title: "SCR Series high-payload robot",
        href: "/products/scr-series",
        text: "For heavy fertilizer bag palletizing and high-load cells.",
      },
      {
        title: "SCH Series palletizing robots",
        href: "/products/sch-series",
        text: "For end-of-line fertilizer bag handling and stack building.",
      },
      {
        title: "SAR Series long-reach robots",
        href: "/products/sar-series",
        text: "For depalletizing and wide fertilizer plant layouts.",
      },
    ],
  }),
  industry({
    slug: "mining-materials",
    title: "Mining Materials",
    seoTitle: "Mining Materials Automation | Heavy Bag Palletizing Robots",
    description:
      "Robot automation for mining materials, mineral powders, ore additives, heavy bags, depalletizing, feeding, and palletizing.",
    eyebrow: "Industry solution for mining materials",
    heroTitle: "Mining Materials Robot Automation for Heavy Bags, Powders, and Pallets",
    heroDescription:
      "Automate mineral powder bags, ore additives, cartons, and heavy material handling with robust robot cells for depalletizing, feeding, and palletizing.",
    image: "/images/SCR.jpg",
    materials: ["mineral powders", "ore additives", "abrasive materials", "processed minerals", "bagged compounds"],
    packages: ["heavy bags", "woven sacks", "bulk cartons", "palletized materials", "drums"],
    productionContext:
      "Mining material processing often includes abrasive products, dusty packaging areas, heavy loads, and warehouse movement that demands stable pallets.",
    painFocus: [
      "Abrasive and heavy materials",
      "Mining material packages can be heavy, dusty, and abrasive. The robot cell must protect tooling, allow cleaning, and give operators safe access while keeping output steady.",
    ],
    depalletizingFocus:
      "Automatic depalletizing supports incoming raw material bags, cartons, or drums that must be unloaded before transfer to processing or blending equipment.",
    feedingFocus:
      "Automatic feeding can move bagged mineral materials to hoppers, crushers, mixers, or transfer points without relying on repetitive manual lifting.",
    palletizingFocus:
      "Automatic palletizing gives heavy mineral bags or cartons a consistent stack pattern for forklift movement and shipping.",
    preferredRobots: [
      {
        title: "SCH Series heavy-duty robots",
        href: "/products/sch-series",
        text: "For heavy bags, cartons, and demanding mining material palletizing.",
      },
      {
        title: "SAR Series long-reach robots",
        href: "/products/sar-series",
        text: "For large work cells and depalletizing heavy materials.",
      },
      {
        title: "SCR Series high-payload robot",
        href: "/products/scr-series",
        text: "For high-load end-of-line stacking.",
      },
    ],
  }),
  industry({
    slug: "refractory-materials",
    title: "Refractory Materials",
    seoTitle: "Refractory Materials Automation | Robot Palletizing & Feeding",
    description:
      "Robot automation for refractory bags, bricks, mixes, cartons, depalletizing, feeding, and palletizing in high-load material plants.",
    eyebrow: "Industry solution for refractory materials",
    heroTitle: "Refractory Materials Robot Automation for Bags, Bricks, Mixes, and Pallets",
    heroDescription:
      "Plan robot systems for refractory mixes, bricks, bags, cartons, depalletizing, automatic feeding, and palletizing in dusty, heavy-duty environments.",
    image: "/images/bejing1%20(3).jpg",
    materials: ["refractory mixes", "bricks", "castables", "powders", "ceramic raw materials"],
    packages: ["bags", "cartons", "brick stacks", "bundles", "palletized loads"],
    productionContext:
      "Refractory material plants combine heavy product handling, dust, abrasive surfaces, and packaging or curing processes that require careful layout planning.",
    painFocus: [
      "Irregular product forms",
      "Refractory products may include bags, cartons, bricks, and bundles. A single automation discussion must separate what can be vacuum handled, what needs clamping, and what requires a special mechanical gripper.",
    ],
    depalletizingFocus:
      "Automatic depalletizing can unload incoming bricks, bags, cartons, or mixes and deliver them to transfer conveyors or process stations.",
    feedingFocus:
      "Automatic feeding moves bags or refractory materials toward mixers, presses, or staging areas while reducing repetitive manual contact.",
    palletizingFocus:
      "Automatic palletizing helps create repeatable stacks for refractory bags, cartons, or brick bundles before warehouse movement.",
    preferredRobots: [
      {
        title: "SAR Series long-reach robots",
        href: "/products/sar-series",
        text: "For wide cells, heavy handling, and depalletizing applications.",
      },
      {
        title: "SCH Series palletizing robots",
        href: "/products/sch-series",
        text: "For bag, carton, and bundle palletizing.",
      },
      {
        title: "ER Series six-axis robots",
        href: "/products/er-series",
        text: "For flexible handling where approach angle matters.",
      },
    ],
  }),
  industry({
    slug: "cement-products",
    title: "Cement Products",
    seoTitle: "Cement Product Automation | Cement Bag Palletizing Robots",
    description:
      "Robot automation for cement bags, mortar bags, blocks, cartons, depalletizing, feeding, and palletizing.",
    eyebrow: "Industry solution for cement products",
    heroTitle: "Cement Products Robot Automation for Heavy Bags, Blocks, and Pallets",
    heroDescription:
      "Automate cement bags, dry mortar bags, blocks, cartons, and pallet flow with heavy-duty robot systems designed for dust, payload, and stable stacking.",
    image: "/images/bejing1%20(2).jpg",
    materials: ["cement bags", "dry mortar", "blocks", "tile adhesive", "construction mixes"],
    packages: ["paper bags", "woven bags", "blocks", "cartons", "palletized stacks"],
    productionContext:
      "Cement product plants often combine dusty bagging, heavy packages, warehouse pallets, forklifts, and continuous end-of-line movement.",
    painFocus: [
      "Heavy bag repetition",
      "Cement and mortar bags are heavy and repetitive to stack. Manual palletizing can slow output, create unstable layers, and expose operators to dust and lifting fatigue.",
    ],
    depalletizingFocus:
      "Automatic depalletizing can unload incoming bags, blocks, cartons, or pallets for transfer into production or rework areas.",
    feedingFocus:
      "Automatic feeding can move bags or blocks into conveyors, hoppers, or process-side stations while reducing manual lifting around dusty areas.",
    palletizingFocus:
      "Automatic palletizing is often the first automation step for cement products because it stabilizes heavy end-of-line stacking and reduces labor pressure.",
    preferredRobots: [
      {
        title: "SCR Series high-payload robot",
        href: "/products/scr-series",
        text: "For heavy cement bag palletizing and large stack layouts.",
      },
      {
        title: "SCH Series heavy-duty robots",
        href: "/products/sch-series",
        text: "For mortar bags, cartons, and heavy end-of-line handling.",
      },
      {
        title: "SAR Series long-reach robots",
        href: "/products/sar-series",
        text: "For wide palletizing and depalletizing layouts.",
      },
    ],
  }),
  industry({
    slug: "powder-handling",
    title: "Powder Handling",
    seoTitle: "Powder Handling Automation | Bag Feeding & Palletizing Robots",
    description:
      "Robot automation for powder bags, sacks, cartons, depalletizing, automatic feeding, bag opening, and palletizing.",
    eyebrow: "Industry solution for powder handling",
    heroTitle: "Powder Handling Robot Automation for Bags, Feeding, Depalletizing, and Palletizing",
    heroDescription:
      "Use robot automation to move powder bags, sacks, cartons, and packaged materials into feeding, bag opening, transfer, and palletizing workflows.",
    image: "/images/SCR.jpg",
    materials: ["powder ingredients", "mineral powder", "chemical powder", "food powder", "additives"],
    packages: ["powder bags", "sacks", "cartons", "valve bags", "palletized bags"],
    productionContext:
      "Powder handling projects often connect receiving pallets, bag opening, feeding, dust control, mixing, packaging, and finished palletizing.",
    painFocus: [
      "Dust and bag deformation",
      "Powder bags can sag, leak dust, or deform during pickup. The robot cell must evaluate bag strength, suction surface, clamping method, dust collection, and discharge accuracy before quotation.",
    ],
    depalletizingFocus:
      "Automatic depalletizing unloads powder bags or cartons and moves them toward feeding, bag opening, or staging equipment.",
    feedingFocus:
      "Automatic feeding is central to powder handling because bags must reach hoppers, bag breakers, mixers, or dosing systems reliably.",
    palletizingFocus:
      "Automatic palletizing supports finished powder bags or cartons with repeatable stack quality and reduced manual exposure to dust.",
    preferredRobots: [
      {
        title: "SAR Series depalletizing robots",
        href: "/products/sar-series",
        text: "For wide powder bag depalletizing and feeding layouts.",
      },
      {
        title: "SCH Series palletizing robots",
        href: "/products/sch-series",
        text: "For finished powder bag and carton palletizing.",
      },
      {
        title: "ER Series six-axis robots",
        href: "/products/er-series",
        text: "For flexible bag handling and machine-side loading tasks.",
      },
    ],
  }),
];

export function getIndustryPage(slug: string) {
  return industryPages.find((page) => page.slug === slug);
}
