import Image from "next/image";
import { CaseStudy } from "@/lib/case-studies";

type CaseStudyCardProps = {
  study: CaseStudy;
  labels?: {
    challenge: string;
    solution: string;
    outcomes: string;
    series: string;
    inquiryData: string;
  };
};

export function CaseStudyCard({
  study,
  labels = {
    challenge: "Typical challenge",
    solution: "Solution concept",
    outcomes: "Buyer value",
    series: "Recommended series",
    inquiryData: "Data to send",
  },
}: CaseStudyCardProps) {
  return (
    <article
      id={study.slug}
      className="scroll-mt-36 overflow-hidden rounded-lg border border-white/10 bg-[#11161b] shadow-[0_22px_60px_rgba(0,0,0,0.24)]"
    >
      <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-72 overflow-hidden bg-[radial-gradient(circle_at_50%_34%,rgba(255,255,255,0.18),transparent_40%),linear-gradient(135deg,#252d35_0%,#111820_48%,#05070a_100%)]">
          <div className="absolute inset-0 industrial-grid opacity-20" />
          <Image
            src={study.image}
            alt={`${study.title} representative automation case`}
            fill
            unoptimized
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-contain p-6 drop-shadow-[0_18px_26px_rgba(0,0,0,0.45)]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080a0d] via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f5b41b]">
              {study.industry}
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{study.title}</h2>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <p className="leading-7 text-white/66">{study.summary}</p>

          <div className="mt-7 grid gap-5 xl:grid-cols-3">
            <CaseList title={labels.challenge} items={study.challenge} accent="red" />
            <CaseList title={labels.solution} items={study.solution} accent="yellow" />
            <CaseList title={labels.outcomes} items={study.outcomes} accent="neutral" />
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-2">
            <TagBlock title={labels.series} items={study.recommendedSeries} />
            <TagBlock title={labels.inquiryData} items={study.inquiryData} />
          </div>
        </div>
      </div>
    </article>
  );
}

function CaseList({
  title,
  items,
  accent,
}: {
  title: string;
  items: string[];
  accent: "red" | "yellow" | "neutral";
}) {
  const accentClass =
    accent === "red" ? "bg-[#d71920]" : accent === "yellow" ? "bg-[#f5b41b]" : "bg-white/30";

  return (
    <div className="rounded-lg border border-white/10 bg-black/18 p-5">
      <div className={`mb-4 h-1 w-12 ${accentClass}`} />
      <h3 className="font-semibold text-white">{title}</h3>
      <ul className="mt-4 grid gap-3 text-sm leading-6 text-white/62">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function TagBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/42">{title}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-md border border-white/10 bg-white/[0.045] px-3 py-2 text-sm text-white/68"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
