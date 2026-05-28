import type { Metadata } from "next";
import { CtaLink } from "@/components/cta-link";
import { SectionHeading } from "@/components/section-heading";
import { SeriesCard } from "@/components/series-card";
import { SiteHeader } from "@/components/site-header";
import { SpecTable } from "@/components/spec-table";
import {
  commonEnvironment,
  industries,
  productSeries,
} from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Robot Products | ECR, SCH, SAR, SCR, SRL, STC, ER Series",
  description:
    "Explore SCR Robot industrial robot series including ECR, SCH, SAR, SCR, SRL, STC, and ER robots for palletizing, stamping, machine tending, and conveyor automation.",
};

export default function ProductsPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#080a0d] pt-40 text-white sm:pt-32 lg:pt-28">
        <section className="section-shell pb-12">
          <SectionHeading
            eyebrow="Product portfolio"
            title="Industrial robot series for material handling, palletizing, press automation, and flexible production."
            description="Content is rewritten from the South China Robotics product catalog for overseas B2B buyers. Payload ranges span from compact 3 kg handling robots to heavy-duty 800 kg systems."
            level={1}
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Robot series", "ECR / SCH / SAR / SCR / SRL / STC / ER"],
              ["Payload range", "3-800 kg"],
              ["Reach range", "200-3,500 mm"],
              ["Applications", "Palletizing, stamping, tending, conveyors"],
            ].map(([label, value]) => (
              <div key={label} className="steel-panel p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-white/42">
                  {label}
                </p>
                <p className="mt-3 text-xl font-semibold leading-7 text-white">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="robot-series" className="section-shell pt-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {productSeries.map((series) => (
              <SeriesCard key={series.slug} series={series} />
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0f1318]">
          <div className="section-shell">
            <SectionHeading
              eyebrow="Technical specifications"
              title="Representative model data from the catalog."
              description="The tables below summarize catalog model data including axes, maximum payload, reach, repeatability, body weight, and power capacity. Final selection depends on product dimensions, duty cycle, gripper design, and plant layout."
            />
            <div className="mt-12 grid gap-12">
              {productSeries.map((series) => (
                <section key={series.slug} id={series.slug} className="scroll-mt-36">
                  <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="font-mono text-sm font-bold uppercase tracking-[0.14em] text-[#f5b41b]">
                        {series.series}
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold text-white">
                        {series.title}
                      </h2>
                    </div>
                    <CtaLink href={`/products/${series.slug}`} variant="ghost">
                      Detail Page
                    </CtaLink>
                  </div>
                  <SpecTable series={series} />
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeading
              eyebrow="Applications"
              title="Industry use cases from the catalog."
              description="SCR Robot products are positioned for industrial automation applications where repeatability, payload, and system integration matter."
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {industries.map((industry) => (
                <div
                  key={industry}
                  className="rounded-lg border border-white/10 bg-white/[0.045] p-5"
                >
                  <div className="mb-5 h-1 w-12 bg-[#d71920]" />
                  <h3 className="font-semibold text-white">{industry}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#0c0f13]">
          <div className="section-shell">
            <SectionHeading
              eyebrow="Operating environment"
              title="Standard industrial operating notes."
              description="Most catalog robot series share the following operating requirements. Compact palletizing units may support broader temperature ranges depending on configuration."
            />
            <div className="mt-10 grid gap-3 md:grid-cols-2">
              {commonEnvironment.map((item) => (
                <div key={item} className="rounded-lg border border-white/10 bg-black/24 p-5 text-white/68">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
