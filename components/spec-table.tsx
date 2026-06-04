import Link from "next/link";
import type { ProductSeries } from "@/lib/catalog";

type SpecTableModel = ProductSeries["models"][number] & {
  slug?: string;
};

type SpecTableProps = {
  series: ProductSeries;
  headings?: string[];
  models?: SpecTableModel[];
  enableModelLinks?: boolean;
};

export function SpecTable({
  series,
  headings = [
    "Model",
    "Axes",
    "Payload",
    "Reach",
    "Repeatability",
    "Body Weight",
    "Power",
  ],
  models = series.models,
  enableModelLinks = false,
}: SpecTableProps) {
  return (
    <div className="min-w-0 max-w-full overflow-hidden rounded-lg border border-white/10">
      <div className="min-w-0 max-w-full overflow-x-auto">
        <table className="min-w-[760px] w-full border-collapse text-left text-sm">
          <thead className="bg-[#151b21] text-xs uppercase tracking-[0.14em] text-white/50">
            <tr>
              {headings.map((heading) => (
                <th key={heading} className="border-b border-white/10 px-4 py-4">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/8 bg-[#0c1014] text-white/72">
            {models.map((model) => (
              <tr key={model.name} className="transition hover:bg-white/[0.04]">
                <td className="px-4 py-4 font-mono font-semibold text-[#f5b41b]">
                  {enableModelLinks ? (
                    <Link
                      href={`/products/${series.slug}/${model.slug ?? model.name.toLowerCase()}`}
                      className="transition hover:text-[#ffd36b]"
                    >
                      {model.name}
                    </Link>
                  ) : (
                    model.name
                  )}
                </td>
                <td className="px-4 py-4">{model.axes}</td>
                <td className="px-4 py-4">{model.payload}</td>
                <td className="px-4 py-4">{model.reach}</td>
                <td className="px-4 py-4">{model.repeatability}</td>
                <td className="px-4 py-4">{model.bodyWeight}</td>
                <td className="px-4 py-4">{model.power}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
