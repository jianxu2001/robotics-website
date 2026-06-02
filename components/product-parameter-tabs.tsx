import type { JointParameter, ParameterRow } from "@/lib/product-models";

type ProductParameterTabsProps = {
  robotRows: ParameterRow[];
  jointRows: JointParameter[];
  isZh?: boolean;
  labels: {
    detail: string;
    robot: string;
    joints: string;
    item: string;
    value: string;
    axis: string;
    range: string;
  };
};

export function ProductParameterTabs({
  robotRows,
  jointRows,
  isZh = false,
  labels,
}: ProductParameterTabsProps) {
  return (
    <section className="border-t border-white/10 bg-[#0b0f13] text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
        <div className="border-b border-white/10 text-center">
          <div className="inline-flex border-b-2 border-[#f5b41b] px-4 pb-5 text-2xl font-semibold text-[#f5b41b]">
            {labels.detail}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="#robot-parameters"
            className="rounded-md border border-[#f5b41b] bg-[#f5b41b] px-5 py-3 text-sm font-bold text-[#080a0d] transition hover:bg-[#ffd36b]"
          >
            {labels.robot}
          </a>
          <a
            href="#joint-parameters"
            className="rounded-md border border-white/12 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white/68 transition hover:border-[#f5b41b]/55 hover:text-white"
          >
            {labels.joints}
          </a>
        </div>

        <div className="mt-10 grid min-w-0 gap-10">
          <ParameterTable
            id="robot-parameters"
            title={labels.robot}
            firstHeading={labels.item}
            secondHeading={labels.value}
            rows={robotRows.map((row) => ({
              key: row.label,
              label: isZh ? row.labelZh : row.label,
              value: row.value,
            }))}
          />

          <ParameterTable
            id="joint-parameters"
            title={labels.joints}
            firstHeading={labels.axis}
            secondHeading={labels.range}
            rows={jointRows.map((row) => ({
              key: row.axis,
              label: row.axis,
              value: row.range,
            }))}
          />
        </div>
      </div>
    </section>
  );
}

function ParameterTable({
  id,
  title,
  firstHeading,
  secondHeading,
  rows,
}: {
  id: string;
  title: string;
  firstHeading: string;
  secondHeading: string;
  rows: { key: string; label: string; value: string }[];
}) {
  return (
    <section id={id} className="min-w-0 scroll-mt-36">
      <h2 className="mb-5 text-2xl font-semibold text-white">{title}</h2>
      <div className="min-w-0 max-w-full overflow-hidden rounded-lg border border-white/10 bg-[#11161b] shadow-[0_24px_70px_rgba(0,0,0,0.26)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm md:text-base">
            <thead className="bg-[#171d24] text-white/78">
              <tr>
                <th className="border-b border-r border-white/10 px-5 py-4">
                  {firstHeading}
                </th>
                <th className="border-b border-white/10 px-5 py-4">
                  {secondHeading}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.key} className="border-b border-white/8 last:border-b-0">
                  <td className="w-[34%] border-r border-white/10 bg-white/[0.035] px-5 py-4 font-semibold text-white/78">
                    {row.label}
                  </td>
                  <td className="bg-[#0d1217] px-5 py-4 text-white/66">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
