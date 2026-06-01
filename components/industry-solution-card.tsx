import Image from "next/image";
import { IndustrySolution } from "@/lib/industry-solutions";

type IndustrySolutionCardProps = {
  solution: IndustrySolution;
  labels?: {
    painPoints: string;
    approach: string;
    recommended: string;
    scope: string;
  };
};

export function IndustrySolutionCard({
  solution,
  labels = {
    painPoints: "Buyer challenges",
    approach: "SCR approach",
    recommended: "Recommended robot series",
    scope: "Typical system scope",
  },
}: IndustrySolutionCardProps) {
  return (
    <article
      id={solution.slug}
      className="scroll-mt-36 overflow-hidden rounded-lg border border-white/10 bg-[#11161b] shadow-[0_22px_60px_rgba(0,0,0,0.24)]"
    >
      <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
        <div className="relative min-h-72 overflow-hidden">
          <Image
            src={solution.image}
            alt={`${solution.title} automation solution`}
            fill
            sizes="(min-width: 1024px) 38vw, 100vw"
            className="object-cover opacity-82"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080a0d] via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#f5b41b]">
              {labels.recommended}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {solution.recommendedSeries.map((series) => (
                <span
                  key={series}
                  className="rounded-md border border-white/12 bg-black/48 px-3 py-2 text-xs font-semibold text-white/78"
                >
                  {series}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <h2 className="text-3xl font-semibold leading-tight text-white">
            {solution.title}
          </h2>
          <p className="mt-5 leading-7 text-white/64">{solution.summary}</p>

          <div className="mt-8 grid gap-5 xl:grid-cols-2">
            <SolutionList title={labels.painPoints} items={solution.painPoints} accent="red" />
            <SolutionList title={labels.approach} items={solution.approach} accent="yellow" />
          </div>

          <div className="mt-7">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/42">
              {labels.scope}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {solution.scope.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-white/10 bg-white/[0.045] px-3 py-2 text-sm text-white/68"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function SolutionList({
  title,
  items,
  accent,
}: {
  title: string;
  items: string[];
  accent: "red" | "yellow";
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/18 p-5">
      <div className={`mb-4 h-1 w-12 ${accent === "red" ? "bg-[#d71920]" : "bg-[#f5b41b]"}`} />
      <h3 className="font-semibold text-white">{title}</h3>
      <ul className="mt-4 grid gap-3 text-sm leading-6 text-white/62">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
