export type IndustrySolution = {
  slug: string;
  title: string;
  summary: string;
  image: string;
  painPoints: string[];
  approach: string[];
  recommendedSeries: string[];
  scope: string[];
};

export const industrySolutions: IndustrySolution[] = [
  {
    slug: "palletizing",
    title: "Palletizing & End-of-Line Automation",
    summary:
      "Robot palletizing systems for cartons, bags, boxes, cases, and heavy industrial products where factories need stable stacking and reduced manual labor.",
    image: "/images/bejing1%20(2).jpg",
    painPoints: [
      "Manual stacking is labor intensive and difficult to keep stable across shifts.",
      "Different SKUs, pallet sizes, and stacking patterns slow down quotation and line design.",
      "Heavy loads increase safety risk and make consistent throughput harder to maintain.",
    ],
    approach: [
      "Match payload, reach, gripper type, stack height, and line speed to the actual product.",
      "Combine robot, infeed conveyor, pallet position, safety guarding, and pallet pattern logic.",
      "Provide a practical concept for overseas buyers to review with engineering and purchasing teams.",
    ],
    recommendedSeries: ["SCH Series", "SCR Series", "SAR Series"],
    scope: ["Robot body", "Gripper tooling", "Conveyor infeed", "Pallet pattern logic", "Safety guarding", "PLC/HMI"],
  },
  {
    slug: "depalletizing",
    title: "Depalletizing & Material Feeding",
    summary:
      "Depalletizing cells for bags, cartons, cases, and mixed product handling where the downstream line needs reliable automatic feeding.",
    image: "/images/bejing1%20(1).jpg",
    painPoints: [
      "Incoming pallets may vary in stack condition, material type, and product stability.",
      "Manual feeding can become a bottleneck before packaging, mixing, or processing equipment.",
      "Irregular loads need careful gripper and detection planning before automation starts.",
    ],
    approach: [
      "Review product geometry, surface condition, bag flexibility, stack pattern, and downstream handoff.",
      "Plan robot reach, gripper contact, detection method, and conveyor transfer as one working cell.",
      "Add 3D vision options when product position or stack condition varies too much for fixed pickup.",
    ],
    recommendedSeries: ["SCH Series", "SAR Series", "ER Series"],
    scope: ["Robot depalletizing", "Product detection", "Custom gripper", "Downstream conveyor", "Vision option", "Safety layout"],
  },
  {
    slug: "bag-handling",
    title: "3D Vision Bag Breaking & Powder Handling",
    summary:
      "Automation for bag picking, breaking, feeding, and dusty material processes where reliability depends on vision, tooling, and containment.",
    image: "/images/SCR.jpg",
    painPoints: [
      "Bags deform, shift, and stack unevenly, which makes fixed-position pickup unreliable.",
      "Powder and granular materials create dust, contamination, and operator exposure concerns.",
      "Factories need smoother feeding into mixers, hoppers, and processing equipment.",
    ],
    approach: [
      "Use 3D vision or guided pickup concepts when bag position cannot be fixed mechanically.",
      "Design end tooling around bag weight, surface material, deformation, and break method.",
      "Consider dust control, handoff position, and downstream equipment early in the proposal.",
    ],
    recommendedSeries: ["ER Series", "SCH Series", "SAR Series"],
    scope: ["3D vision", "Bag gripper", "Bag breaking station", "Feeding conveyor", "Dust-aware layout", "PLC integration"],
  },
  {
    slug: "stamping-forging",
    title: "Stamping, Press & Forging Automation",
    summary:
      "Press-side robots and transfer systems for repetitive loading, unloading, part transfer, and hot-work handling around stamping or forging lines.",
    image: "/images/bejing1%20(3).jpg",
    painPoints: [
      "Press-side manual handling is repetitive, timing sensitive, and exposed to safety risk.",
      "Part position, press spacing, fixture design, and cycle time must be checked together.",
      "Hot or heavy parts require robust tooling and safe movement paths.",
    ],
    approach: [
      "Review press tonnage, line spacing, part size, part weight, and transfer direction.",
      "Match robot axes, reach, fixture handoff, and interlock logic to the line rhythm.",
      "Support custom tooling and safety integration for press-side automation projects.",
    ],
    recommendedSeries: ["STC Series", "ER Series", "SAR Series"],
    scope: ["Press loading", "Part transfer", "Fixture tooling", "Interlocks", "Safety guarding", "Line synchronization"],
  },
  {
    slug: "machine-tending",
    title: "Machine Tending & Production Cells",
    summary:
      "Compact robot cells for machine loading, unloading, part movement, and repeatable handling around CNC, processing, and assembly equipment.",
    image: "/images/bejing1%20(1).jpg",
    painPoints: [
      "Operators spend too much time on repetitive loading and unloading work.",
      "Small batch production needs flexible layout without wasting factory space.",
      "Part orientation, fixture location, and machine door timing affect automation success.",
    ],
    approach: [
      "Check part geometry, fixture position, machine access, door clearance, and required cycle time.",
      "Use compact four-axis or six-axis robots depending on reach and orientation needs.",
      "Plan the full cell around robot footprint, guarding, infeed/outfeed, and operator access.",
    ],
    recommendedSeries: ["ECR Series", "SRL Series", "ER Series"],
    scope: ["Machine loading", "Part unloading", "Fixtures", "Compact cell layout", "Safety access", "Cycle-time review"],
  },
  {
    slug: "conveyor-automation",
    title: "Conveyor & Line Integration",
    summary:
      "Conveyor automation for product transport, turning, accumulation, pallet flow, robot infeed, and complete factory material handling systems.",
    image: "/images/SCR.jpg",
    painPoints: [
      "Robot performance depends on stable product presentation and downstream material flow.",
      "Conveyor speed, direction, spacing, and accumulation can limit the complete system.",
      "Factories often need custom integration between existing equipment and new robot cells.",
    ],
    approach: [
      "Design conveyor layout together with robot reach, gripper timing, safety, and line control.",
      "Support roller conveyors, powered turns, pallet flow, infeed/outfeed, and custom transfer points.",
      "Integrate PLC/HMI logic so the robot cell works as part of the wider production line.",
    ],
    recommendedSeries: ["SCH Series", "ECR Series", "ER Series"],
    scope: ["Powered conveyors", "Roller turns", "Robot infeed", "Pallet flow", "Sensors", "PLC/HMI integration"],
  },
];

export const industrySolutionsZh: IndustrySolution[] = [
  {
    slug: "palletizing",
    title: "码垛与末端自动化",
    summary:
      "面向纸箱、袋装、箱装和重载工业产品的机器人码垛系统，帮助工厂稳定堆垛、减少人工搬运。",
    image: "/images/bejing1%20(2).jpg",
    painPoints: ["人工堆垛强度高，跨班次稳定性难以保持。", "SKU、托盘尺寸和垛型变化会影响方案设计和报价速度。", "重载物料增加安全风险，也让产线节拍更难稳定。"],
    approach: ["根据真实产品匹配负载、臂展、夹具、堆垛高度和线速。", "把机器人、进料输送、托盘位置、安全防护和垛型逻辑作为完整单元设计。", "提供便于海外买家内部工程评审和采购审批的方案概念。"],
    recommendedSeries: ["SCH Series", "SCR Series", "SAR Series"],
    scope: ["机器人本体", "夹具工装", "进料输送", "垛型逻辑", "安全围栏", "PLC/HMI"],
  },
  {
    slug: "depalletizing",
    title: "拆垛与物料上料",
    summary:
      "适用于袋装、纸箱、箱装和混合物料的拆垛单元，为下游包装、混合或加工设备提供稳定自动上料。",
    image: "/images/bejing1%20(1).jpg",
    painPoints: ["来料托盘的堆垛状态、物料类型和稳定性可能不一致。", "人工上料容易成为包装、混合或加工设备前端瓶颈。", "不规则物料需要提前规划夹具和检测方式。"],
    approach: ["确认产品外形、表面状态、袋体柔性、堆垛方式和下游交接方式。", "把机器人臂展、夹具接触、检测方式和输送转接作为一个工作单元规划。", "当物料位置或堆垛状态变化较大时，可加入 3D 视觉方案。"],
    recommendedSeries: ["SCH Series", "SAR Series", "ER Series"],
    scope: ["机器人拆垛", "产品检测", "定制夹具", "下游输送", "视觉选项", "安全布局"],
  },
  {
    slug: "bag-handling",
    title: "3D视觉破包与粉体上料",
    summary:
      "面向袋装抓取、破包、投料和粉体工况的自动化方案，可靠性取决于视觉、夹具和现场防尘布局。",
    image: "/images/SCR.jpg",
    painPoints: ["袋体容易变形、偏移和堆叠不齐，固定点抓取不稳定。", "粉体或颗粒物料带来粉尘、污染和人员暴露风险。", "工厂需要更稳定地向混合机、料仓或加工设备投料。"],
    approach: ["当袋体位置无法机械固定时，可采用 3D 视觉或视觉引导抓取概念。", "围绕袋重、表面材质、变形程度和破包方式设计末端工具。", "在方案早期考虑除尘、交接位置和下游设备接口。"],
    recommendedSeries: ["ER Series", "SCH Series", "SAR Series"],
    scope: ["3D视觉", "袋装夹具", "破包工位", "上料输送", "防尘布局", "PLC集成"],
  },
  {
    slug: "stamping-forging",
    title: "冲压、压力机与锻压自动化",
    summary:
      "面向冲压或锻压产线的上下料、零件转运和热加工搬运自动化，减少重复人工并提升安全性。",
    image: "/images/bejing1%20(3).jpg",
    painPoints: ["压力机旁人工搬运重复性强、节拍敏感且存在安全风险。", "零件位置、设备间距、工装设计和节拍必须一起核对。", "高温或重载零件需要更可靠的工装和安全运动路径。"],
    approach: ["确认压力机吨位、线体间距、零件尺寸、零件重量和转运方向。", "把机器人轴数、臂展、工装交接和联锁逻辑与产线节拍匹配。", "支持围绕冲压线的非标夹具和安全集成。"],
    recommendedSeries: ["STC Series", "ER Series", "SAR Series"],
    scope: ["压力机上下料", "零件转运", "工装夹具", "联锁控制", "安全防护", "产线同步"],
  },
  {
    slug: "machine-tending",
    title: "机床上下料与生产单元",
    summary:
      "面向 CNC、加工设备和装配工位的紧凑型机器人单元，用于重复上下料、零件搬运和产线侧转运。",
    image: "/images/bejing1%20(1).jpg",
    painPoints: ["操作员大量时间花在重复上下料工作。", "小批量生产需要灵活布局，同时不能占用过多工厂空间。", "零件方向、夹具位置和机床门节拍会影响自动化可行性。"],
    approach: ["确认零件形状、夹具位置、机床入口、开门空间和目标节拍。", "根据臂展和姿态需求选择紧凑四轴或六轴机器人。", "围绕机器人占地、安全防护、进出料和操作员通道规划完整单元。"],
    recommendedSeries: ["ECR Series", "SRL Series", "ER Series"],
    scope: ["机床上料", "零件下料", "工装夹具", "紧凑布局", "安全通道", "节拍评估"],
  },
  {
    slug: "conveyor-automation",
    title: "输送线与产线集成",
    summary:
      "用于产品输送、转弯、缓存、托盘流转、机器人进料和工厂物料搬运系统的输送自动化方案。",
    image: "/images/SCR.jpg",
    painPoints: ["机器人效率取决于稳定的来料姿态和下游物料流。", "输送速度、方向、间距和缓存能力会限制整个系统。", "工厂通常需要把现有设备与新的机器人单元进行非标集成。"],
    approach: ["把输送布局与机器人臂展、夹具节拍、安全和线体控制一起设计。", "支持滚筒线、动力转弯、托盘流转、进出料和定制转接点。", "集成 PLC/HMI 逻辑，让机器人单元成为完整产线的一部分。"],
    recommendedSeries: ["SCH Series", "ECR Series", "ER Series"],
    scope: ["动力输送", "滚筒转弯", "机器人进料", "托盘流转", "传感器", "PLC/HMI集成"],
  },
];
