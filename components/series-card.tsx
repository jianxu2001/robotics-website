import Image from "next/image";
import { CtaLink } from "@/components/cta-link";
import type { ProductSeries } from "@/lib/catalog";

type SeriesCardProps = {
  series: ProductSeries;
  compact?: boolean;
  hrefPrefix?: string;
  labels?: {
    payload: string;
    reach: string;
    axes: string;
    viewSeries: string;
  };
};

export function SeriesCard({
  series,
  compact = false,
  hrefPrefix = "/products",
  labels = {
    payload: "Payload",
    reach: "Reach",
    axes: "Axes",
    viewSeries: "View Series",
  },
}: SeriesCardProps) {
  return (
    <article className="group overflow-hidden rounded-lg border border-white/10 bg-[#11161b] shadow-[0_22px_60px_rgba(0,0,0,0.24)] transition hover:-translate-y-1 hover:border-[#f5b41b]/40">
      <div className="relative aspect-[16/10] overflow-hidden bg-[radial-gradient(circle_at_50%_34%,rgba(255,255,255,0.18),transparent_40%),linear-gradient(135deg,#252d35_0%,#111820_48%,#05070a_100%)]">
        <div className="absolute inset-0 industrial-grid opacity-20" />
        <Image
          src={series.image}
          alt={`${series.series} industrial robot application`}
          fill
          unoptimized
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-contain p-5 drop-shadow-[0_16px_24px_rgba(0,0,0,0.45)] transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080a0d] via-transparent to-transparent" />
        <div className="absolute left-4 top-4 rounded-md border border-[#f5b41b]/40 bg-black/54 px-3 py-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-[#f5b41b]">
          {series.series}
        </div>
      </div>
      <div className="p-5 md:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/42">
          {series.category}
        </p>
        <h3 className="mt-3 text-2xl font-semibold leading-tight text-white">
          {series.title}
        </h3>
        <p className="mt-4 leading-7 text-white/62">{series.summary}</p>
        <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 text-sm">
          {[
            [labels.payload, series.payloadRange],
            [labels.reach, series.reachRange],
            [labels.axes, series.axes],
          ].map(([label, value]) => (
            <div key={label} className="bg-[#0b0f13] p-3">
              <p className="text-[11px] uppercase tracking-[0.12em] text-white/38">
                {label}
              </p>
              <p className="mt-2 font-semibold text-white">{value}</p>
            </div>
          ))}
        </div>
        {!compact ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {series.applications.slice(0, 4).map((application) => (
              <span
                key={application}
                className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/68"
              >
                {application}
              </span>
            ))}
          </div>
        ) : null}
        <div className="mt-7">
          <CtaLink href={`${hrefPrefix}/${series.slug}`} variant="secondary">
            {labels.viewSeries}
          </CtaLink>
        </div>
      </div>
    </article>
  );
}
