import Link from "next/link";
import type { ProductSeries } from "@/lib/catalog";
import { getProductModelByName } from "@/lib/product-data";

type SpecTableModel = ProductSeries["models"][number] & {
  slug?: string;
};

type SpecTableProps = {
  series: ProductSeries;
  headings?: string[];
  models?: SpecTableModel[];
  enableModelLinks?: boolean;
  hrefPrefix?: string;
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
  hrefPrefix = "/products",
}: SpecTableProps) {
  if (series.slug === "cr-series" || series.slug === "br-series") {
    const zh = hrefPrefix.startsWith("/zh") || headings[0] === "型号";
    const packing = series.slug === "br-series";
    const columns = packing
      ? (zh ? ["型号", "负载", "最大行程", "装箱节拍", "纸箱尺寸上限（长×宽×高）", "净重", "总功率"] : ["Model", "Payload", "Maximum travel", "Packing rate", "Maximum carton (L×W×H)", "Net weight", "Total power"])
      : (zh ? ["型号", "负载", "轴数", "臂展", "码垛高度（含托盘）", "升降行程", "本体重量", "电源容量"] : ["Model", "Payload", "Axes", "Reach", "Palletizing height incl. pallet", "Lifting stroke", "Machine weight", "Power supply capacity"]);
    return <div className="max-w-full overflow-x-auto rounded-lg border border-white/10"><table className="w-full min-w-[850px] text-left text-sm">
      <thead className="bg-[#151b21] text-white/60"><tr>{columns.map((label) => <th scope="col" key={label} className="px-4 py-4">{label}</th>)}</tr></thead>
      <tbody className="divide-y divide-white/10">{models.map((model) => {
        const specs = getProductModelByName(series.slug, model.name)?.specifications;
        const value = (name: string) => { const row = specs?.find((item) => item.name === name); return (zh ? row?.valueZh : undefined) ?? row?.value ?? "—"; };
        const values = packing ? [model.payload, model.reach, value("Packing rate"), "600 × 500 × 450 mm", model.bodyWeight, model.power] : [model.payload, model.axes, model.reach, value("Palletizing height, including pallet"), value("Lifting stroke"), model.bodyWeight, model.power];
        return <tr key={model.name}><th scope="row" className="px-4 py-4 font-mono text-[#f5b41b]"><Link href={`${hrefPrefix}/${series.slug}/${model.slug ?? model.name.toLowerCase()}`}>{model.name}</Link></th>{values.map((v, i) => <td key={i} className="px-4 py-4 text-white/75">{v}</td>)}</tr>;
      })}</tbody>
    </table></div>;
  }
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
                      href={`${hrefPrefix}/${series.slug}/${model.slug ?? model.name.toLowerCase()}`}
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
