export type IndustryPage = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  eyebrow: string;
  heroTitle: string;
  heroDescription: string;
  image: string;
  buyerProblem: string[];
  solution: string[];
  benefits: { title: string; text: string }[];
  recommendedProducts: { title: string; href: string; text: string }[];
  applications: string[];
  quoteInputs: string[];
  faq: { question: string; answer: string }[];
};

export const industryPages: IndustryPage[] = [
  {
    slug: "plastics",
    title: "Plastic Manufacturers",
    seoTitle: "Plastic Factory Automation | Palletizing Robots",
    description:
      "Automate plastic bag, carton, resin, and molded-part handling with SCR Robot palletizing, depalletizing, conveyors, and gripper integration.",
    eyebrow: "Automation for plastic manufacturers",
    heroTitle: "Robot automation for plastic bags, cartons, resin, and end-of-line handling.",
    heroDescription:
      "Plastic manufacturers handle resin bags, cartons, molded parts, film rolls, containers, and mixed SKUs. SCR Robot helps review product data, gripper needs, conveyors, and pallet patterns before quoting the cell.",
    image: "/images/bejing1%20(2).jpg",
    buyerProblem: [
      "Manual palletizing of plastic bags, cartons, and molded products creates fatigue and inconsistent output across shifts.",
      "Different product weights, package surfaces, bag deformation, and pallet patterns make automation selection difficult.",
      "Production lines often need stable infeed, conveyors, grippers, and robot selection as one complete system.",
    ],
    solution: [
      "Use palletizing robots for repetitive end-of-line stacking of bags, cartons, and cases.",
      "Use depalletizing robots and bag feeding automation where resin bags or stacked products must be unloaded and transferred to downstream equipment.",
      "Integrate robot, gripper, conveyor, pallet position, safety guarding, and PLC/HMI logic around the actual factory layout.",
    ],
    benefits: [
      {
        title: "Labor Saving",
        text: "Reduce repetitive manual lifting, stacking, and feeding work in high-volume plastic production areas.",
      },
      {
        title: "Cost Reduction",
        text: "Lower dependence on manual handling labor and reduce downtime caused by inconsistent production flow.",
      },
      {
        title: "Productivity Improvement",
        text: "Stabilize palletizing patterns, line feeding, and material transfer so output is easier to manage across shifts.",
      },
      {
        title: "Safety",
        text: "Move workers away from heavy bags, repetitive bending, and high-risk material handling positions.",
      },
    ],
    recommendedProducts: [
      {
        title: "Palletizing Robot",
        href: "/products/sch-series",
        text: "For cartons, bags, cases, and end-of-line stacking in plastic production.",
      },
      {
        title: "Depalletizing Robot",
        href: "/products/sar-series",
        text: "For unloading stacked materials and transferring products to downstream equipment.",
      },
      {
        title: "Bag Feeding Automation",
        href: "/industries",
        text: "For resin bags, powder bags, material feeding, and bag handling workflows.",
      },
    ],
    applications: [
      "Plastic resin bag palletizing",
      "Molded plastic product handling",
      "Carton and case palletizing",
      "Bag depalletizing and feeding",
      "Conveyor infeed and outfeed automation",
      "Packaging line transfer",
    ],
    quoteInputs: [
      "Bag, carton, or product weight and dimensions",
      "Pallet size, stack height, and pallet pattern",
      "Target output per hour or cycle time",
      "Infeed direction, conveyor layout, and available floor space",
      "Photos or video of the current manual process",
    ],
    faq: [
      {
        question: "Can one robot handle different plastic product sizes?",
        answer:
          "Yes, but the gripper, payload margin, pallet pattern, and line control must be reviewed for each SKU. Send product dimensions, weight, and packaging photos for evaluation.",
      },
      {
        question: "Can the system handle resin bags?",
        answer:
          "Resin bag projects usually require careful gripper design because bags deform and shift. South China Robotics can evaluate palletizing, depalletizing, and feeding layouts based on bag weight, material, and stack condition.",
      },
      {
        question: "What information is needed for a quotation?",
        answer:
          "Provide product weight, dimensions, package type, pallet size, target throughput, factory layout, destination country, and any current process video.",
      },
    ],
  },
  {
    slug: "chemical",
    title: "Chemical Plants",
    seoTitle: "Chemical Bag Handling Automation | SCR Robot",
    description:
      "Plan robotic palletizing, depalletizing, bag feeding, and conveyor automation for chemical bags, cartons, drums, powders, and granular materials.",
    eyebrow: "Automation for chemical plants",
    heroTitle: "Safer robot automation for chemical bags, cartons, drums, and feeding lines.",
    heroDescription:
      "Chemical plants need to reduce manual exposure, improve safety, and stabilize handling of bags, drums, powders, and granular materials. SCR Robot reviews material data, dust conditions, tooling, and conveyor flow before proposal.",
    image: "/images/SCR.jpg",
    buyerProblem: [
      "Manual handling of chemical bags or containers can expose workers to dust, repetitive lifting, and safety risk.",
      "Powder and granular materials require stable feeding, transfer, and containment planning.",
      "Irregular bags, heavy loads, and different pallet patterns make simple equipment selection risky.",
    ],
    solution: [
      "Use heavy-duty palletizing robots for bag and carton stacking at the end of chemical production lines.",
      "Use depalletizing and bag feeding automation to unload stacked materials and feed mixers, hoppers, or processing equipment.",
      "Design the complete cell around gripper type, dust-aware layout, conveyors, guarding, and control integration.",
    ],
    benefits: [
      {
        title: "Labor Saving",
        text: "Reduce manual lifting and repetitive material transfer around packaging and feeding areas.",
      },
      {
        title: "Cost Reduction",
        text: "Improve labor allocation and reduce production interruptions caused by unstable manual handling.",
      },
      {
        title: "Productivity Improvement",
        text: "Keep packaging, palletizing, and material feeding more consistent across shifts.",
      },
      {
        title: "Safety",
        text: "Reduce worker exposure to heavy handling, dusty material zones, and repetitive high-risk tasks.",
      },
    ],
    recommendedProducts: [
      {
        title: "Bag Feeding Automation",
        href: "/industries",
        text: "For bag picking, bag breaking, powder feeding, and downstream material transfer.",
      },
      {
        title: "Palletizing Robot",
        href: "/products/scr-series",
        text: "For heavy bags, cartons, and end-of-line palletizing in chemical packaging.",
      },
      {
        title: "Depalletizing Robot",
        href: "/products/sch-series",
        text: "For unloading stacked products and feeding material into the next production process.",
      },
    ],
    applications: [
      "Chemical bag palletizing",
      "Powder and granular material feeding",
      "Bag depalletizing",
      "Carton and drum handling",
      "Conveyor transfer",
      "End-of-line packaging automation",
    ],
    quoteInputs: [
      "Material type and package form",
      "Bag, carton, or drum weight and dimensions",
      "Dust, safety, or containment requirements",
      "Target throughput and shift schedule",
      "Pallet pattern, stack height, and factory layout",
    ],
    faq: [
      {
        question: "Can robots be used for chemical bag handling?",
        answer:
          "Yes. The key is to evaluate bag weight, surface condition, deformation, dust environment, pickup method, and downstream feeding requirements before selecting the robot and tooling.",
      },
      {
        question: "Can South China Robotics design the gripper and conveyor system?",
        answer:
          "Yes. Projects can include robot selection, gripper concept, conveyors, product detection, safety guarding, and PLC/HMI integration.",
      },
      {
        question: "What should chemical plants send for quotation?",
        answer:
          "Send material type, package photos, weight, dimensions, pallet pattern, target capacity, dust or safety requirements, and current factory layout.",
      },
    ],
  },
  {
    slug: "building-materials",
    title: "Building Material Factories",
    seoTitle: "Building Material Palletizing Robots | SCR Robot",
    description:
      "Use SCR Robot palletizing, depalletizing, and conveyor automation for heavy building material bags, boards, cartons, tiles, and pallet flow.",
    eyebrow: "Automation for building material factories",
    heroTitle: "Heavy-duty robot automation for building material bags, boards, cartons, and tiles.",
    heroDescription:
      "Building material factories handle heavy products, dusty environments, tall stacks, and repetitive palletizing work. SCR Robot helps evaluate payload, stack height, gripper design, conveyors, and safety scope before quotation.",
    image: "/images/bejing1%20(3).jpg",
    buyerProblem: [
      "Heavy products create high labor intensity and higher risk of fatigue-related handling errors.",
      "Manual palletizing can be unstable when products are heavy, dusty, or packed in bags and cartons.",
      "Factories need durable robot cells that match product weight, pallet height, conveyor flow, and safety requirements.",
    ],
    solution: [
      "Use heavy-duty palletizing robots for bags, cartons, boards, tiles, and other building material products.",
      "Use depalletizing robots where incoming pallets or stacked materials must be unloaded and transferred.",
      "Plan robot payload, reach, gripper, conveyors, pallet position, and guarding as one working automation cell.",
    ],
    benefits: [
      {
        title: "Labor Saving",
        text: "Reduce the need for workers to lift, stack, and transfer heavy building material products manually.",
      },
      {
        title: "Cost Reduction",
        text: "Lower manual handling cost and reduce production interruptions caused by labor shortages or fatigue.",
      },
      {
        title: "Productivity Improvement",
        text: "Improve stack consistency, line stability, and handling repeatability for heavy products.",
      },
      {
        title: "Safety",
        text: "Reduce worker exposure to heavy loads, dust, repetitive lifting, and palletizing risk zones.",
      },
    ],
    recommendedProducts: [
      {
        title: "Heavy-Duty Palletizing Robot",
        href: "/products/sch-series",
        text: "For heavy bags, cartons, boards, and high-load end-of-line automation.",
      },
      {
        title: "High-Payload Palletizing Robot",
        href: "/products/scr-series",
        text: "For larger palletizing layouts and high-payload material handling.",
      },
      {
        title: "Conveyor Automation",
        href: "/industries/building-materials",
        text: "For infeed, outfeed, pallet flow, turning, and material transfer around the robot cell.",
      },
    ],
    applications: [
      "Cement or mortar bag palletizing",
      "Tile and board handling",
      "Carton palletizing",
      "Heavy bag depalletizing",
      "Pallet flow and conveyor transfer",
      "End-of-line stacking automation",
    ],
    quoteInputs: [
      "Product weight, dimensions, and package type",
      "Pallet size, target stack height, and pattern",
      "Dust level and site safety requirements",
      "Throughput target and line speed",
      "Available floor area and conveyor direction",
    ],
    faq: [
      {
        question: "Can the system handle heavy building material bags?",
        answer:
          "Yes. Robot selection depends on bag weight, stack height, pallet pattern, gripper method, and safety layout. High-payload SCH, SCR, or SAR options can be evaluated from the catalog range.",
      },
      {
        question: "Can the automation include conveyors?",
        answer:
          "Yes. Conveyor infeed, outfeed, turning, pallet flow, sensors, and PLC/HMI logic can be included in the system scope.",
      },
      {
        question: "What project details are most important?",
        answer:
          "Product weight, dimensions, packaging, pallet size, stack height, target throughput, dust conditions, factory layout, and photos or video of the current process.",
      },
    ],
  },
  {
    slug: "food-processing",
    title: "Food Processing Factories",
    seoTitle: "Food Packaging Line Automation | Palletizing Robots",
    description:
      "Automate food cartons, bags, cases, boxes, ingredient feeding, conveyor transfer, and palletizing with SCR Robot packaging line solutions.",
    eyebrow: "Automation for food processing factories",
    heroTitle: "Reliable robot automation for food cartons, bags, cases, and packaging lines.",
    heroDescription:
      "Food processing factories need stable output, safer repetitive handling, and smooth packaging-line flow. SCR Robot reviews package sizes, throughput, pallet pattern, conveyors, and site constraints before recommending a cell.",
    image: "/images/bejing1%20(1).jpg",
    buyerProblem: [
      "Manual palletizing and packaging transfer can become a bottleneck during peak production.",
      "Food factories often manage multiple package sizes, cartons, bags, and case formats.",
      "Labor shortages, repetitive lifting, and inconsistent stacking can affect daily output stability.",
    ],
    solution: [
      "Use palletizing robots for cartons, bags, boxes, and cases at the end of packaging lines.",
      "Use depalletizing and bag feeding automation for ingredient handling or upstream material transfer.",
      "Integrate robot selection with conveyors, grippers, safety guarding, and product flow requirements.",
    ],
    benefits: [
      {
        title: "Labor Saving",
        text: "Reduce repetitive lifting, stacking, and transfer work around packaging and material handling areas.",
      },
      {
        title: "Cost Reduction",
        text: "Improve labor allocation and reduce output variation caused by manual handling limits.",
      },
      {
        title: "Productivity Improvement",
        text: "Support more stable packaging-line flow, palletizing consistency, and shift-to-shift output.",
      },
      {
        title: "Safety",
        text: "Reduce fatigue, repetitive motion, and heavy lifting risks for packaging-line operators.",
      },
    ],
    recommendedProducts: [
      {
        title: "Palletizing Robot",
        href: "/products/sch-series",
        text: "For cartons, cases, bags, and end-of-line packaging automation.",
      },
      {
        title: "Portable Collaborative Palletizer",
        href: "/products",
        text: "For flexible palletizing needs in smaller or changing production areas.",
      },
      {
        title: "Bag Feeding Automation",
        href: "/industries",
        text: "For ingredient bags, material feeding, and upstream handling workflows.",
      },
    ],
    applications: [
      "Carton and case palletizing",
      "Bag palletizing",
      "Ingredient bag feeding",
      "Packaging line transfer",
      "Depalletizing and material feeding",
      "Conveyor integration",
    ],
    quoteInputs: [
      "Food package type and product dimensions",
      "Unit weight and target output per hour",
      "Pallet size, stack height, and pallet pattern",
      "Line layout, conveyor direction, and available floor area",
      "Photos or videos of the current packaging line",
    ],
    faq: [
      {
        question: "Can robots handle multiple carton or bag sizes?",
        answer:
          "Yes, but each SKU should be checked for weight, dimensions, pallet pattern, and gripper compatibility. Send the full product list for a practical recommendation.",
      },
      {
        question: "Is a portable palletizer suitable for food processing lines?",
        answer:
          "It can be suitable when the line needs flexible deployment, moderate payload, and smaller footprint. Final selection depends on product weight, cycle time, and available space.",
      },
      {
        question: "What information is needed to discuss a food processing automation project?",
        answer:
          "Provide package photos, dimensions, weight, target throughput, pallet pattern, line layout, hygiene or site requirements, and destination country.",
      },
    ],
  },
];

export function getIndustryPage(slug: string) {
  return industryPages.find((page) => page.slug === slug);
}
