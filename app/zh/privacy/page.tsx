import type { Metadata } from "next";
import { PrivacyNotice } from "@/components/privacy-notice";
import { localizedAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "隐私与统计说明 | SCR Robot",
  description: "了解 SCR Robot 的询盘资料用途、可选 Google Analytics 统计及访问者统计选择。",
  alternates: localizedAlternates("/zh/privacy", "/privacy", "/zh/privacy"),
};

export default function PrivacyPageZh() { return <PrivacyNotice locale="zh" />; }
