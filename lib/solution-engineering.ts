type SolutionEngineering = {
  workflow: { title: string; text: string }[];
  selectionChecks: { item: string; why: string }[];
  related: { title: string; href: string; text: string }[];
  siteExample?: { title: string; href: string; image: string; text: string };
};

export const solutionEngineering: Record<string, SolutionEngineering> = {
  "bag-depalletizing-system": {
    workflow: [
      { title: "Present the inbound stack", text: "Confirm pallet location, bag orientation, layer arrangement and the variation expected between suppliers before choosing the detection method." },
      { title: "Pick and transfer a bag", text: "Review the bag surface, shape and available grip area with the robot, tool and path. Check clearance around the stack and receiving point." },
      { title: "Hand over to the next process", text: "Define whether the next step receives a closed bag on a conveyor or requires bag opening and material discharge. Include the downstream ready signal and recovery sequence." },
    ],
    selectionChecks: [
      { item: "Repeatable layers or variable incoming stacks?", why: "Detection must match the real incoming condition. A regular test stack does not establish that the same setup can handle shifted or damaged bags." },
      { item: "What must remain intact?", why: "Depalletizing moves the bag. If the product must remain packaged, keep the bag-handling operation separate from any opening or discharge operation." },
      { item: "Bag weight, tool and working positions", why: "Review all three together. The selected robot must accommodate the actual load arrangement and reach every required pickup and discharge point." },
      { item: "Pallet exchange and empty packaging", why: "Specify how the next pallet arrives and how empty pallets or layer sheets leave. These steps affect the cell layout and complete line cycle." },
    ],
    siteExample: {
      title: "Related site video: SCH100 bag pickup and feeding",
      href: "/case-studies/sch100-bag-opening-feeding-custom-linear-track",
      image: "/images/case-studies/sch100-bag-feeding/01-pickup.jpg",
      text: "See bag pickup, transfer and feeding in one customer installation. The video shows a custom linear track; standard SCH100 supply does not include it. This example does not establish suitability for every inbound pallet pattern or a particular vision configuration.",
    },
    related: [
      { title: "Automatic bag opening and feeding", href: "/solutions/automatic-bag-breaking-feeding-system", text: "When the next process needs the bag opened and its contents discharged." },
      { title: "Bag palletizing at the other end of the line", href: "/solutions/robotic-bag-palletizing-system", text: "Compare unloading inbound stacks with building finished-goods pallets." },
    ],
  },
  "automatic-bag-breaking-feeding-system": {
    workflow: [
      { title: "Receive and position the bag", text: "Define manual loading, conveyor delivery or robot pickup, then confirm the bag orientation required by the opening station." },
      { title: "Open and discharge", text: "Match the opening approach to the bag construction and receiving equipment. Review material flow, inlet clearance and the dust-control interface for the actual process." },
      { title: "Handle the packaging bag", text: "Specify where the packaging bag goes after discharge and how residual material and collection access are managed. Coordinate the next bag with downstream readiness." },
    ],
    selectionChecks: [
      { item: "Bag construction and internal liner", why: "Paper, woven and lined packaging can behave differently. Confirm opening and separation using the actual packaging rather than assuming one mechanism suits every bag." },
      { item: "Material and receiving process", why: "Flow behavior, moisture and the downstream inlet affect discharge. Dust-control and material compatibility requirements belong in the project specification." },
      { item: "Robot, conveyor or manual infeed?", why: "The opening station and upstream bag handling are separate scope decisions. The site example combines robot pickup and feeding, but the configuration is specific to that installation." },
      { item: "Standard robot or added travel axis?", why: "A linear track depends on the distance between pickup and feeding positions. The SCH100 case uses a customer-specific track; the standard robot does not include one." },
    ],
    siteExample: {
      title: "Watch the SCH100 bag-opening and feeding installation",
      href: "/case-studies/sch100-bag-opening-feeding-custom-linear-track",
      image: "/images/case-studies/sch100-bag-feeding/03-feeding.jpg",
      text: "The customer video shows bag pickup, transfer, discharge and subsequent packaging-bag transfer. A custom linear track connects the site positions. Material type, bag weight and production rate are not established by the footage.",
    },
    related: [
      { title: "Upstream bag depalletizing", href: "/solutions/bag-depalletizing-system", text: "Review how closed bags reach the opening and feeding process." },
      { title: "SCH robot platform", href: "/products/sch-series", text: "Compare catalog robot options separately from custom tooling and line equipment." },
    ],
  },
  "robotic-bag-palletizing-system": {
    workflow: [
      { title: "Receive the filled bag", text: "Confirm the bag's sealed condition, orientation, shape and arrival spacing from the upstream packaging line." },
      { title: "Grip and build the pattern", text: "Review support during pickup and placement, then check the pallet pattern, corner positions and each layer against the actual tool and bag dimensions." },
      { title: "Exchange the completed pallet", text: "Include removal of the finished load and introduction of the next pallet. Coordinate buffering and stop/restart behavior with the filling line." },
    ],
    selectionChecks: [
      { item: "Soft bag or stable carton?", why: "Bag shape and fill condition affect gripping and placement. A carton palletizing demonstration does not by itself establish bag-handling performance." },
      { item: "Robot payload versus complete pickup", why: "Review product count, total product load, tooling and movement conditions together. Compare appropriate ECR, SCH or SCR platforms rather than choosing from bag weight alone." },
      { item: "Reach versus finished stack height", why: "Plot the conveyor and every pallet corner at the required layers. Catalog reach does not directly specify the finished pallet height." },
      { item: "Required output including pallet change", why: "Use the actual bag arrival pattern and pallet exchange method. Confirm the full cycle instead of treating an isolated robot movement as line output." },
    ],
    related: [
      { title: "Collaborative vs industrial palletizing", href: "/guides/collaborative-vs-industrial-palletizing", text: "Compare the platform, product, layout and line-integration requirements." },
      { title: "CR workstations for carton palletizing", href: "/products/cr-series", text: "If the product is a carton, review the 30 kg and 50 kg collaborative configurations." },
      { title: "Inbound bag depalletizing", href: "/solutions/bag-depalletizing-system", text: "Review the different task of unloading incoming bag stacks." },
    ],
  },
};
