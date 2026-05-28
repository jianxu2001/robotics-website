import type { ProductSeries } from "@/lib/catalog";

type SpecTableProps = {
  series: ProductSeries;
};

export function SpecTable({ series }: SpecTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/10">
      <div className="overflow-x-auto">
        <table className="min-w-[760px] w-full border-collapse text-left text-sm">
          <thead className="bg-[#151b21] text-xs uppercase tracking-[0.14em] text-white/50">
            <tr>
              {["Model", "Axes", "Payload", "Reach", "Repeatability", "Body Weight", "Power"].map(
                (heading) => (
                  <th key={heading} className="border-b border-white/10 px-4 py-4">
                    {heading}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/8 bg-[#0c1014] text-white/72">
            {series.models.map((model) => (
              <tr key={model.name} className="transition hover:bg-white/[0.04]">
                <td className="px-4 py-4 font-mono font-semibold text-[#f5b41b]">
                  {model.name}
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
