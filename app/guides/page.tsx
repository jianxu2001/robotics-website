import type { Metadata } from "next";
import { SelectionGuidesIndex } from "@/components/selection-guide";
import { localizedAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Robot & Palletizer Selection Guides | SCR Robot",
  description: "Practical robot selection guides: collaborative vs industrial palletizing and 30 kg vs 50 kg CR workstations. Compare product, layout and catalog requirements.",
  alternates: localizedAlternates("/guides", "/guides", "/zh/guides"),
};
export default function Guides() { return <SelectionGuidesIndex locale="en" />; }
