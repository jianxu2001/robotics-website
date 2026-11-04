import type { Metadata } from "next";
import { PrivacyNotice } from "@/components/privacy-notice";
import { localizedAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy & Analytics | SCR Robot",
  description: "How SCR Robot uses enquiry information and optional Google Analytics, and how to manage your analytics choices.",
  alternates: localizedAlternates("/privacy", "/privacy", "/zh/privacy"),
};

export default function PrivacyPage() { return <PrivacyNotice locale="en" />; }
