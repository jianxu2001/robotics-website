import type { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    title: "SCR Robot | 工业机器人与自动化系统",
    description: "华南机器人科技（广东）有限公司，提供机器人码垛、拆垛、装箱、冲压上下料与自动化系统。",
    images: ["/images/scr-factory-guangdong-v1.png"],
    locale: "zh_CN",
    type: "website",
  },
};

export default function ChineseLayout({ children }: { children: React.ReactNode }) {
  return <div lang="zh-CN">{children}</div>;
}
