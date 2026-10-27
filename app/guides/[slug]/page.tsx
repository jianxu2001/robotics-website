import { notFound } from "next/navigation";
import { SelectionGuidePage, getGuideMetadata } from "@/components/selection-guide";
import { selectionGuides } from "@/lib/selection-guides";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return selectionGuides.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const guide = selectionGuides.find((item) => item.slug === slug);
  return guide ? getGuideMetadata(guide, "en") : {};
}
export default async function Guide({ params }: Props) {
  const { slug } = await params;
  const guide = selectionGuides.find((item) => item.slug === slug);
  if (!guide) notFound();
  return <SelectionGuidePage guide={guide} locale="en" />;
}
