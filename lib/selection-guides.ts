export type GuideLocale = "en" | "zh";

type GuideCopy = {
  title: string;
  description: string;
  intro: string;
  takeaway: string;
  sections: { id: string; title: string; paragraphs: string[]; checklist?: string[] }[];
  comparison?: { headings: string[]; rows: string[][] };
  sourceNote: string;
  related: { title: string; href: string; text: string }[];
};

export type SelectionGuide = {
  slug: string;
  image: string;
  seriesSlugs: string[];
  compareCrModels?: boolean;
  content: Record<GuideLocale, GuideCopy>;
};

export function guidePath(slug: string, locale: GuideLocale) {
  return `${locale === "zh" ? "/zh" : ""}/guides/${slug}`;
}

export const selectionGuides: SelectionGuide[] = [
  {
    slug: "collaborative-vs-industrial-palletizing",
    image: "/images/products/cr-palletizer-dark-v1.png",
    seriesSlugs: ["cr-series", "ecr-series", "sch-series", "scr-series"],
    content: {
      en: {
        title: "Collaborative vs Industrial Palletizing Robots: How to Choose",
        description: "Compare collaborative palletizing workstations and industrial palletizing cells by product, tooling, layout and line demand, using SCR CR, ECR and SCH examples.",
        intro: "A carton packing line and a heavy-bag line can need very different palletizing cells. Start with what must be lifted, where it must be placed and how products arrive. Then compare robot platforms against that complete task.",
        takeaway: "Shortlist a CR workstation for carton palletizing within its catalog envelope. Evaluate industrial platforms when the product, tooling, working area or line integration calls for a different cell design. Confirm the complete application before choosing a model.",
        comparison: {
          headings: ["Decision", "Collaborative workstation", "Industrial palletizing cell"],
          rows: [
            ["SCR starting points", "CR30 / CR50, with fixed-base and lifting variants", "ECR, SCH or SCR series, selected for the handling task"],
            ["Product to review", "Cartons, their dimensions, surfaces and pickup arrangement", "Bags or cartons, grip method, load and arrival condition"],
            ["Layout question", "Can the infeed and all pallet positions fit the workstation envelope?", "What robot position, conveyors and pallet handling are needed?"],
            ["Output question", "Can the verified path meet the required carton arrival rate?", "Can the cell meet demand including pallet change and upstream stops?"],
            ["Safeguarding", "Assessed for the actual robot, tool, load and operator interaction", "Assessed for the complete cell and its access points"],
          ],
        },
        sections: [
          {
            id: "product-and-tool",
            title: "1. Start with the product and end-of-arm tooling",
            paragraphs: ["Record the heaviest and largest product, the packaging surface, how it deforms and whether one or several items must be picked together. A carton that holds its shape presents a different gripping problem from a soft filled bag.", "The CR catalog includes 30 kg and 50 kg collaborative workstations. Industrial alternatives include compact ECR models and SCH palletizing robots across a broader payload range. These are catalog starting points; tooling mass, load position and the actual movement still need review. A nominal payload by itself does not confirm application suitability."],
          },
          {
            id: "reach-and-height",
            title: "2. Check the full pallet pattern and stack height",
            paragraphs: ["Draw the conveyor pickup point, robot base and every pallet position. Check the far corners, bottom layer and top layer with the real tool and product dimensions. Robot reach is not the same measurement as finished stack height.", "All four CR30/CR50 workstation variants list 1,900 mm reach. The L variants add a lifting arrangement with a standard 500 mm stroke. A lift changes the available working positions; it does not change the catalog arm-reach figure. Confirm the whole envelope rather than assuming that a lift solves every clearance issue."],
          },
          {
            id: "line-output",
            title: "3. Compare complete line output",
            paragraphs: ["Use the required products per hour together with the arrival pattern: evenly spaced cartons, short bursts and upstream stoppages lead to different buffering needs. Include pallet exchange, slip sheets where required, recipe changes and recovery after an interruption.", "A catalog motion or packing-rate figure should not be treated as guaranteed output for a different product and layout. Ask for a cycle review covering your pickup, placement and pallet pattern before fixing the line specification."],
          },
          {
            id: "layout-and-access",
            title: "4. Plan operator access and cell integration",
            paragraphs: ["Map where operators replenish pallets, remove completed loads and access equipment. Review guarding, interlocks and the robot/tool/load combination as part of the integrated cell. The word collaborative alone does not establish that an application can operate without guarding.", "Compare proposals on the same scope: robot and base, gripper, conveyors, pallet positions, controls and operator access. This makes the difference between a workstation proposal and a complete line-integration proposal easier to assess."],
            checklist: ["Product photos, packaging dimensions and weight range", "Target hourly output and product arrival pattern", "Pallet size, layer pattern and finished stack height", "Floor layout, infeed height and operator access", "Required tooling, pallet exchange and control interfaces"],
          },
        ],
        sourceNote: "Model examples use SCR's 2026 catalog and the specifications on the linked product pages. Selection considerations are application review points; they are not a project throughput or savings guarantee.",
        related: [
          { title: "30 kg vs 50 kg CR palletizers", href: "/guides/30kg-vs-50kg-palletizer", text: "Compare the four CR configurations and understand the lifting variants." },
          { title: "CR collaborative palletizing workstations", href: "/products/cr-series", text: "View catalog parameters, drawings and individual model pages." },
          { title: "Robotic bag palletizing", href: "/solutions/robotic-bag-palletizing-system", text: "Review bag presentation, gripping and end-of-line integration." },
          { title: "SCH industrial palletizing robots", href: "/products/sch-series", text: "Review industrial robot options for palletizing and handling." },
        ],
      },
      zh: {
        title: "协作码垛与工业码垛机器人怎么选？",
        description: "从产品、末端工装、工作范围、产线节拍和现场布局，对比协作码垛工作站与工业码垛方案，结合 SCR CR、ECR、SCH 系列选型。",
        intro: "纸箱包装线和重袋物料线，对码垛设备的要求可能很不一样。先明确搬什么、放到哪里、产品如何到达，再把完整作业条件与机器人平台进行匹配。",
        takeaway: "纸箱作业可从 CR 工作站的画册范围开始筛选；当产品、工装、工作范围或整线衔接提出不同要求时，再评估工业机器人平台。最终型号要结合完整应用确认。",
        comparison: {
          headings: ["比较项目", "协作码垛工作站", "工业码垛单元"],
          rows: [
            ["SCR 选型入口", "CR30 / CR50，固定底座与升降版本", "按搬运任务选择 ECR、SCH 或 SCR 系列"],
            ["产品条件", "纸箱尺寸、表面和取料组合", "袋装或箱装产品、抓取方式、负载及来料状态"],
            ["布局条件", "输送线与各托盘位置能否落在工作范围内", "机器人位置、输送与托盘流转如何配置"],
            ["产能核对", "实际路径能否衔接纸箱到达速度", "计入换托盘及上游停顿后能否满足需求"],
            ["防护配置", "结合机器人、工装、产品及人员交互评估", "结合整个单元与出入口进行评估"],
          ],
        },
        sections: [
          { id: "product-and-tool", title: "1. 先看产品和末端工装", paragraphs: ["整理最重、最大的产品，包装表面、变形情况以及单次抓取数量。形状稳定的纸箱与柔软的满袋，对抓取方式的要求不同。", "CR 画册包含 30 kg 和 50 kg 协作码垛工作站；工业方案可从紧凑型 ECR 和覆盖更广负载范围的 SCH 等系列筛选。工装重量、负载位置和实际运动还需要核对，不能仅凭额定负载确认适用性。"] },
          { id: "reach-and-height", title: "2. 核对完整垛型和堆垛高度", paragraphs: ["画出取料点、机器人底座和每个托盘位置，用实际工装与产品尺寸检查最远角、底层和顶层。臂展与最终堆垛高度是两个不同的量。", "四款 CR30/CR50 工作站的画册臂展均为 1,900 mm；L 版本带升降配置，标准升降行程为 500 mm。升降可以改变作业位置，但不改变画册中的机械臂臂展数值，仍需检查完整工作范围与干涉。"] },
          { id: "line-output", title: "3. 比较整线作业能力", paragraphs: ["除了每小时产量，还应明确产品是匀速到达还是短时间集中到达，以及上游停机情况。换托盘、需要时的隔板放置、配方切换与故障恢复，都应计入方案。", "画册运动或码垛速度不能直接当成另一种产品、另一种布局下的保证产量。应围绕实际取放路径和垛型进行节拍核对。"] },
          { id: "layout-and-access", title: "4. 把人员通道和单元配套一起比较", paragraphs: ["明确空托盘补充、满托盘移出、操作和维护的位置。防护、联锁以及机器人、工装、产品组合，需要在完整单元中评估；协作型名称本身不能证明应用可以免防护运行。", "比较报价时，把机器人及底座、抓手、输送线、托盘工位、控制接口和人员通道放在同一范围内比较，才能理解工作站与整线集成方案之间的差别。"], checklist: ["产品照片、包装尺寸与重量范围", "目标小时产量及来料节奏", "托盘尺寸、垛型与最终堆垛高度", "现场布局、输送高度与人员通道", "抓手、换托盘方式及控制接口要求"] },
        ],
        sourceNote: "型号示例依据 SCR 2026 画册及所链接产品页。选型内容用于梳理工程条件，不代表某个项目的产能或节省费用承诺。",
        related: [
          { title: "30 kg 与 50 kg CR 工作站怎么选", href: "/zh/guides/30kg-vs-50kg-palletizer", text: "对比四款 CR 配置，区分固定与升降版本。" },
          { title: "CR 协作码垛工作站", href: "/zh/products/cr-series", text: "查看画册参数、尺寸图与具体型号。" },
          { title: "SCH 工业码垛机器人", href: "/zh/products/sch-series", text: "了解工业搬运与码垛平台。" },
        ],
      },
    },
  },
  {
    slug: "30kg-vs-50kg-palletizer",
    image: "/images/products/cr-palletizer-dark-v1.png",
    seriesSlugs: ["cr-series"],
    compareCrModels: true,
    content: {
      en: {
        title: "30 kg vs 50 kg Palletizing Robots: CR Workstation Selection",
        description: "Compare CR30-1900, CR30L-1900, CR50-1900 and CR50L-1900: payload, 1,900 mm reach, fixed or lifting base, and the project data needed for selection.",
        intro: "The CR range has two separate choices: 30 kg or 50 kg nominal payload, and a fixed-base or lifting workstation. Choose the payload class and the vertical arrangement independently, then check them together against the real palletizing task.",
        takeaway: "A 50 kg model does not provide more catalog arm reach than a 30 kg model: all four list 1,900 mm. An L model adds lifting, rather than changing the nominal payload class.",
        sections: [
          { id: "payload", title: "1. Select the payload class from the actual pickup", paragraphs: ["List the weight range of every carton, the number picked per movement, carton dimensions and pickup orientation. Include the proposed gripper in the engineering review, together with load position and motion requirements.", "The 30 kg and 50 kg figures are catalog maximum-payload values. Do not interpret them as approval for every carton of that weight. The suitable product load depends on the complete tooling and operating conditions. Changing the payload class also does not establish a particular cartons-per-hour output."] },
          { id: "fixed-or-lifting", title: "2. Choose fixed base or lifting from the layout", paragraphs: ["CR30-1900 and CR50-1900 use fixed bases without lifting. CR30L-1900 and CR50L-1900 have a standard 500 mm lifting stroke, with customization subject to project review.", "Check conveyor pickup height, pallet height, each layer and the tool clearance above the finished stack. The lifting stroke and the 1,900 mm arm reach describe different parts of the workstation. Neither figure alone determines the maximum stack height for a particular layout."] },
          { id: "compare-configurations", title: "3. Compare all four catalog configurations", paragraphs: ["The table below reads from the same model data as the product pages. Open an individual model for its detailed parameters and drawing. Compare the configuration as well as the name: the L variants are listed as six-axis workstations, while the fixed variants are listed as five-axis workstations.", "Use the dimensional drawing with your conveyor and pallet positions. Check the near and far corners and the access needed to exchange pallets. If a pickup or placement position cannot be reached with adequate clearance, selecting a higher nominal payload will not by itself resolve the layout."] },
          { id: "selection-example", title: "4. Turn a carton specification into a selection request", paragraphs: ["For example, a buyer planning a 25 kg carton line should provide carton size, proposed pickup arrangement, conveyor height, pallet pattern and target output. Those inputs allow the 30 kg and 50 kg options to be reviewed; carton weight alone cannot settle the choice.", "For a mixed-SKU line, include the lightest and heaviest cartons and the smallest and largest sizes. Review pallet change, infeed spacing and tooling changes together with the planned motion. Keep the same assumptions when comparing proposals."], checklist: ["Carton dimensions and minimum / maximum weight", "Single or multiple cartons per pickup and gripper concept", "Target cartons per hour and actual arrival spacing", "Conveyor height, pallet size, layer pattern and stack height", "Available space, pallet exchange and operator access"] },
        ],
        sourceNote: "Comparison values come from SCR's 2026 collaborative palletizing and case-packing catalog. The standard 500 mm lift is a configuration specification, not a finished stack-height guarantee. Final scope is confirmed for the project.",
        related: [
          { title: "CR collaborative palletizing workstations", href: "/products/cr-series", text: "Review the complete CR range and model drawings." },
          { title: "Collaborative vs industrial palletizing", href: "/guides/collaborative-vs-industrial-palletizing", text: "Check whether a collaborative workstation is the right platform for the line." },
          { title: "BR robotic case packing", href: "/products/br-series", text: "If the task is packing products into cases, review the dedicated BR workstations." },
        ],
      },
      zh: {
        title: "30 kg 与 50 kg 码垛机器人怎么选？CR 工作站对比",
        description: "对比 CR30-1900、CR30L-1900、CR50-1900、CR50L-1900 的负载、1,900 mm 臂展及固定、升降配置，了解选型需要的产线条件。",
        intro: "CR 系列包含两个独立选择：30 kg 或 50 kg 额定负载，以及固定底座或升降工作站。先分别判断负载等级和垂直作业需求，再用完整码垛任务核对组合配置。",
        takeaway: "50 kg 型号的画册臂展并不比 30 kg 型号更大，四款均为 1,900 mm。L 版本增加升降配置，不改变其所属的额定负载等级。",
        sections: [
          { id: "payload", title: "1. 根据实际取料条件确定负载等级", paragraphs: ["列出所有纸箱的重量范围、单次抓取数量、尺寸及取料姿态，把拟用抓手、负载位置和运动条件一起交给工程评估。", "30 kg 与 50 kg 是画册中的最大负载值，不代表任意同等重量纸箱都已确认适用。实际产品负载需结合完整工装和运行条件核对，切换负载等级也不能直接确定每小时码箱数量。"] },
          { id: "fixed-or-lifting", title: "2. 根据布局选择固定或升降", paragraphs: ["CR30-1900、CR50-1900 采用不带升降的固定底座；CR30L-1900、CR50L-1900 标准升降行程为 500 mm，定制需要结合项目评估。", "核对输送取料高度、托盘高度、各层位置以及满垛上方的工装净空。升降行程与 1,900 mm 臂展描述工作站的不同部分，单看任一数值都不能确定某种布局下的最大堆垛高度。"] },
          { id: "compare-configurations", title: "3. 同时比较四款画册配置", paragraphs: ["下表直接使用与产品页相同的型号数据，点击具体型号可查看完整参数与尺寸图。固定版本在画册中列为五轴工作站，L 升降版本列为六轴工作站，比较时应关注配置而非仅看型号名称。", "将尺寸图与输送线、托盘位置叠加核对，检查近端、远端角位以及换托盘所需空间。取放位置或干涉问题，不能单靠增加额定负载解决。"] },
          { id: "selection-example", title: "4. 把纸箱规格转化为可评估的选型需求", paragraphs: ["例如一条搬运 25 kg 纸箱的产线，还应提供纸箱尺寸、取料组合、输送高度、垛型和目标产量。这些条件才能支持比较 30 kg 与 50 kg 配置，不能只凭单箱重量下结论。", "多规格产线还应包含最轻、最重和最大、最小纸箱。把换托盘、来料间隔、抓手切换与运动路径放在一起核对，并使用相同条件比较不同方案。"], checklist: ["纸箱尺寸及最小、最大重量", "单次抓取数量与抓手设想", "目标每小时箱数与实际来料间隔", "输送高度、托盘尺寸、垛型及堆垛高度", "现场空间、换托盘方式及人员通道"] },
        ],
        sourceNote: "对比数值来自 SCR 2026 协作码垛与装箱画册。标准 500 mm 升降行程属于配置参数，不是最终堆垛高度保证，具体供货范围以项目确认为准。",
        related: [
          { title: "CR 协作码垛工作站", href: "/zh/products/cr-series", text: "查看完整系列、单型号参数与尺寸图。" },
          { title: "协作码垛与工业码垛怎么选", href: "/zh/guides/collaborative-vs-industrial-palletizing", text: "先确认产线适合哪一类机器人平台。" },
          { title: "BR 机器人装箱工作站", href: "/zh/products/br-series", text: "如果任务是将产品装入箱内，可了解 BR 专用工作站。" },
        ],
      },
    },
  },
];
