import type { Metadata } from "next";
import { SelectionGuidesIndex } from "@/components/selection-guide";
import { localizedAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "机器人与码垛工作站选型指南 | SCR Robot",
  description: "比较协作码垛与工业码垛、30 kg 与 50 kg CR 工作站，从产品、负载、工作范围和布局条件出发选择机器人配置。",
  alternates: localizedAlternates("/zh/guides", "/guides", "/zh/guides"),
  openGraph: { title: "机器人选型指南 | SCR Robot", description: "从产品、负载、工作范围和布局条件出发选择机器人配置。", locale: "zh_CN" },
};
export default function Guides() { return <SelectionGuidesIndex locale="zh" />; }
