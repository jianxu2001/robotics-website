import Image from "next/image";
import Link from "next/link";
import type { ProductGroup } from "@/lib/catalog";
import { IndustrialCard } from "@/components/industrial-card";

type ProductGroupCardLabels = {
  productLines: string;
  view: string;
};

type ProductGroupCardProps = {
  group: ProductGroup;
  labels?: ProductGroupCardLabels;
};

const defaultLabels: ProductGroupCardLabels = {
  productLines: "Product lines",
  view: "View",
};

export function ProductGroupCard({
  group,
  labels = defaultLabels,
}: ProductGroupCardProps) {
  return (
    <IndustrialCard className="group overflow-hidden">
      <div className="relative min-h-52 overflow-hidden border-b border-white/10">
        <Image
          src={group.image}
          alt={group.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover opacity-82 transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,13,0.1),rgba(8,10,13,0.86))]" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#f5b41b]">
            {labels.productLines}
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-white">{group.title}</h3>
        </div>
      </div>

      <div className="p-6">
        <p className="leading-7 text-white/64">{group.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {group.series.map((series) => (
            <span
              key={series}
              className="rounded-md border border-[#f5b41b]/25 bg-[#f5b41b]/8 px-3 py-1.5 text-xs font-semibold text-[#ffd36b]"
            >
              {series}
            </span>
          ))}
        </div>

        <div className="mt-6 grid gap-3">
          {group.productLines.map((line) => (
            <Link
              key={line.name}
              href={line.href}
              className="rounded-lg border border-white/10 bg-black/22 p-4 transition hover:border-[#f5b41b]/45 hover:bg-[#f5b41b]/8"
            >
              <div className="flex items-center justify-between gap-3">
                <h4 className="font-semibold text-white">{line.name}</h4>
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-white/42">
                  {labels.view}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-white/56">
                {line.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </IndustrialCard>
  );
}
