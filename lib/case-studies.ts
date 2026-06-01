export type CaseStudy = {
  slug: string;
  title: string;
  industry: string;
  image: string;
  summary: string;
  challenge: string[];
  solution: string[];
  outcomes: string[];
  recommendedSeries: string[];
  inquiryData: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "bag-palletizing-line",
    title: "Bag Palletizing Cell for Powder and Granular Materials",
    industry: "Chemicals, feed, minerals, building materials",
    image: "/product-renders/scr180-3200.png",
    summary:
      "A representative end-of-line palletizing solution for 20-50 kg bags where factories need stable stacking, fewer manual lifts, and cleaner product flow.",
    challenge: [
      "Bags deform during transport and need reliable gripping without damaging packaging.",
      "Manual stacking creates heavy labor intensity and inconsistent pallet quality.",
      "Dusty environments require practical layout planning around conveyors, guarding, and operator access.",
    ],
    solution: [
      "Use a high-payload four-axis palletizing robot with bag gripper and controlled infeed presentation.",
      "Plan pallet positions, stack pattern logic, conveyor handoff, safety guarding, and PLC/HMI together.",
      "Review bag surface, bag weight, stack height, and destination pallet requirements before final quotation.",
    ],
    outcomes: [
      "More stable palletizing concept for repetitive bag handling.",
      "Reduced dependence on manual heavy lifting at the end of the line.",
      "Clearer technical proposal for overseas factory approval and budget review.",
    ],
    recommendedSeries: ["SCH Series", "SCR Series", "SAR Series"],
    inquiryData: ["Bag dimensions and unit weight", "Target bags per hour", "Pallet size and stack height", "Infeed direction and factory layout"],
  },
  {
    slug: "carton-case-palletizing",
    title: "Carton and Case Palletizing for Packaging Lines",
    industry: "Food, beverage, consumer goods, logistics",
    image: "/product-renders/sch210e-2350-1650.png",
    summary:
      "A compact robotic palletizing concept for cartons, cases, and boxes where SKU changes and pallet patterns must be handled cleanly.",
    challenge: [
      "Different carton sizes and pallet patterns make manual stacking slow and inconsistent.",
      "Production lines need reliable accumulation and product spacing before robot pickup.",
      "Buyers must justify the complete system scope, not just the robot body.",
    ],
    solution: [
      "Select a robot by payload, reach, carton size, pickup quantity, and stack height.",
      "Combine conveyor infeed, product spacing, gripper design, pallet locations, and guarding.",
      "Prepare a proposal around real SKU data so engineering and purchasing teams can evaluate ROI.",
    ],
    outcomes: [
      "A cleaner end-of-line automation concept for carton and case handling.",
      "Better visibility into robot, gripper, conveyor, and safety scope.",
      "Faster internal decision-making because quotation inputs are clearly defined.",
    ],
    recommendedSeries: ["SCH Series", "ECR Series", "SAR Series"],
    inquiryData: ["Carton dimensions and weight", "SKU count and pallet patterns", "Line speed", "Available floor area"],
  },
  {
    slug: "press-transfer-automation",
    title: "Press Transfer Automation for Stamping Lines",
    industry: "Metal parts, automotive components, hardware manufacturing",
    image: "/product-renders/stc10-1450-400.png",
    summary:
      "A press-side automation concept for loading, unloading, and transferring repetitive parts between stamping or forging processes.",
    challenge: [
      "Press operations require repeatable timing and safe movement paths around dangerous equipment.",
      "Part geometry, press spacing, fixture position, and cycle time all affect robot selection.",
      "Manual transfer can limit consistency and expose operators to avoidable risk.",
    ],
    solution: [
      "Review press layout, part weight, part orientation, transfer direction, and interlock requirements.",
      "Use stamping transfer robots or six-axis robots depending on reach, motion path, and tooling needs.",
      "Design fixtures, grippers, safety guarding, and line synchronization as one automation cell.",
    ],
    outcomes: [
      "More consistent press-side transfer planning.",
      "Reduced manual exposure around repetitive press operations.",
      "Clearer technical basis for fixture, robot, and control system quotation.",
    ],
    recommendedSeries: ["STC Series", "ER Series", "SAR Series"],
    inquiryData: ["Press layout and spacing", "Part dimensions and weight", "Cycle time", "Pickup and drop-off positions"],
  },
  {
    slug: "machine-tending-cell",
    title: "Compact Machine Tending Cell",
    industry: "CNC machining, processing equipment, assembly cells",
    image: "/product-renders/srl20-1500-1000.png",
    summary:
      "A compact tending cell for machine loading, unloading, and part transfer where factories need repeatable operation without a large footprint.",
    challenge: [
      "Operators spend time on repetitive loading and unloading instead of higher-value work.",
      "Machine access, door clearance, fixture position, and part orientation can be tight.",
      "Small or medium batch production needs flexible automation planning.",
    ],
    solution: [
      "Check machine access, part geometry, fixture location, door timing, and cycle target.",
      "Select compact four-axis or six-axis robots based on reach and orientation requirements.",
      "Plan infeed/outfeed, guarding, operator access, and cell footprint around the machine.",
    ],
    outcomes: [
      "A clearer path to automate repetitive machine handling.",
      "Better fit between robot motion, machine access, and production rhythm.",
      "More practical cell layout for factories with limited floor space.",
    ],
    recommendedSeries: ["ECR Series", "SRL Series", "ER Series"],
    inquiryData: ["Part drawing or dimensions", "Machine model and access direction", "Fixture location", "Required cycle time"],
  },
  {
    slug: "vision-bag-feeding",
    title: "3D Vision Bag Picking and Feeding",
    industry: "Powder handling, ingredients, chemicals, food processing",
    image: "/product-renders/er20-1700.png",
    summary:
      "A representative vision-guided concept for bag picking, bag breaking, and feeding when product position changes too much for fixed pickup.",
    challenge: [
      "Bags shift, deform, and stack unevenly during storage or transport.",
      "Fixed pickup points may fail when bag position and surface condition vary.",
      "Powder handling needs careful attention to dust, containment, and downstream feeding.",
    ],
    solution: [
      "Evaluate whether 3D vision, guided pickup, or mechanical positioning is the right approach.",
      "Design gripper and breaking method around bag material, weight, and deformation.",
      "Plan handoff to hopper, mixer, or conveyor while considering dust and maintenance access.",
    ],
    outcomes: [
      "More reliable concept for variable bag position and flexible packaging.",
      "Earlier identification of vision, tooling, and dust-control requirements.",
      "Better inquiry quality before a detailed engineering quotation.",
    ],
    recommendedSeries: ["ER Series", "SCH Series", "SAR Series"],
    inquiryData: ["Bag size and material", "Stack condition", "Pickup area", "Downstream hopper or conveyor interface"],
  },
];

export const caseStudiesZh: CaseStudy[] = [
  {
    slug: "bag-palletizing-line",
    title: "粉体与颗粒物料袋装码垛单元",
    industry: "化工、饲料、矿粉、建材",
    image: "/product-renders/scr180-3200.png",
    summary: "面向 20-50 kg 袋装物料的代表性末端码垛方案，适合需要稳定堆垛、减少人工搬运和改善物流节拍的工厂。",
    challenge: ["袋体在输送中会变形，需要可靠抓取且不损坏包装。", "人工码垛劳动强度高，垛型一致性难以保持。", "粉尘环境需要同步考虑输送、防护和操作通道。"],
    solution: ["采用高负载四轴码垛机器人，结合袋装夹具和稳定进料姿态。", "把托盘位置、垛型逻辑、输送交接、安全围栏和 PLC/HMI 一起规划。", "报价前确认袋体表面、单袋重量、堆垛高度和目标托盘要求。"],
    outcomes: ["形成更稳定的袋装重复码垛方案。", "减少末端重体力人工搬运依赖。", "便于海外工厂内部审批和预算评估。"],
    recommendedSeries: ["SCH Series", "SCR Series", "SAR Series"],
    inquiryData: ["袋子尺寸和单袋重量", "目标每小时袋数", "托盘尺寸和堆垛高度", "进料方向和现场布局"],
  },
  {
    slug: "carton-case-palletizing",
    title: "包装线纸箱与箱装码垛",
    industry: "食品饮料、日化、消费品、物流",
    image: "/product-renders/sch210e-2350-1650.png",
    summary: "面向纸箱、箱装和包装线末端的紧凑型机器人码垛方案，适合 SKU 和垛型变化较多的生产现场。",
    challenge: ["不同纸箱尺寸和垛型会让人工码垛效率与一致性下降。", "机器人抓取前需要稳定的产品间距和缓存。", "买家需要评估完整系统范围，而不仅是机器人本体。"],
    solution: ["根据负载、臂展、纸箱尺寸、一次抓取数量和堆垛高度选择机器人。", "组合进料输送、产品分距、夹具、托盘位置和安全防护。", "围绕真实 SKU 数据形成便于工程和采购评估的方案。"],
    outcomes: ["形成更清晰的包装线末端自动化概念。", "明确机器人、夹具、输送和安全范围。", "减少内部决策前的信息反复确认。"],
    recommendedSeries: ["SCH Series", "ECR Series", "SAR Series"],
    inquiryData: ["纸箱尺寸和重量", "SKU 数量和垛型", "线体速度", "可用场地空间"],
  },
  {
    slug: "press-transfer-automation",
    title: "冲压线转运自动化",
    industry: "金属零件、汽车零部件、五金制造",
    image: "/product-renders/stc10-1450-400.png",
    summary: "面向冲压或锻压工序的上下料与零件转运方案，减少重复人工并提升设备旁作业安全性。",
    challenge: ["压力机旁作业节拍敏感，且需要安全的运动路径。", "零件形状、设备间距、夹具位置和节拍会共同影响选型。", "人工转运会限制一致性，并增加操作风险。"],
    solution: ["确认压力机布局、零件重量、姿态、转运方向和联锁要求。", "根据臂展、运动路径和工装需求选择冲压转运或六轴机器人。", "把夹具、安全围栏、联锁和产线同步作为完整单元规划。"],
    outcomes: ["提升冲压线转运规划的稳定性。", "减少重复压力机旁人工暴露。", "为机器人、夹具和控制系统报价提供更清晰依据。"],
    recommendedSeries: ["STC Series", "ER Series", "SAR Series"],
    inquiryData: ["压力机布局和间距", "零件尺寸和重量", "目标节拍", "取放位置"],
  },
  {
    slug: "machine-tending-cell",
    title: "紧凑型机床上下料单元",
    industry: "CNC 加工、加工设备、装配单元",
    image: "/product-renders/srl20-1500-1000.png",
    summary: "面向机床上下料和零件转运的紧凑型自动化单元，适合希望减少重复操作但场地有限的工厂。",
    challenge: ["操作员大量时间花在重复上下料。", "机床入口、开门空间、夹具位置和零件姿态可能比较紧凑。", "中小批量生产需要更灵活的自动化规划。"],
    solution: ["确认机床入口、零件形状、夹具位置、开门节拍和目标节拍。", "根据臂展与姿态需求选择紧凑四轴或六轴机器人。", "围绕机床规划进出料、安全防护、操作通道和单元占地。"],
    outcomes: ["形成自动化重复上下料的清晰路径。", "让机器人动作与机床入口和生产节拍更匹配。", "更适合场地有限的工厂布局。"],
    recommendedSeries: ["ECR Series", "SRL Series", "ER Series"],
    inquiryData: ["零件图纸或尺寸", "机床型号和开门方向", "夹具位置", "目标节拍"],
  },
  {
    slug: "vision-bag-feeding",
    title: "3D视觉袋装抓取与上料",
    industry: "粉体投料、原料处理、化工、食品加工",
    image: "/product-renders/er20-1700.png",
    summary: "面向袋装抓取、破包和投料的视觉引导方案，适合袋体位置变化较大、固定点抓取不稳定的现场。",
    challenge: ["袋体存放和输送后容易偏移、变形和堆叠不齐。", "当袋体位置和表面状态变化较大时，固定点抓取容易失败。", "粉体处理还需要考虑粉尘、密封和下游上料接口。"],
    solution: ["评估 3D 视觉、视觉引导抓取或机械定位哪种更适合。", "围绕袋体材质、重量和变形程度设计夹具与破包方式。", "规划向料仓、混合机或输送线的交接，同时考虑除尘和维护通道。"],
    outcomes: ["提升袋体位置变化下的自动化可行性。", "更早明确视觉、夹具和防尘需求。", "在详细报价前提高询盘资料质量。"],
    recommendedSeries: ["ER Series", "SCH Series", "SAR Series"],
    inquiryData: ["袋子尺寸和材质", "堆放状态", "抓取区域", "下游料仓或输送接口"],
  },
];
