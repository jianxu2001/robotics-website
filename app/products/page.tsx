import type { Metadata } from "next";
import { CtaLink } from "@/components/cta-link";
import { ProductGroupCard } from "@/components/product-group-card";
import { SectionHeading } from "@/components/section-heading";
import { SeriesCard } from "@/components/series-card";
import { SiteHeader } from "@/components/site-header";
import { SpecTable } from "@/components/spec-table";
import {
  commonEnvironment,
  industries,
  productGroups,
  productSeries,
} from "@/lib/catalog";
import { getProductModelsBySeries } from "@/lib/product-models";

export const metadata: Metadata = {
  title: "Robot Products | Palletizing, Desktop, General, Stamping, Tending, Collaborative Robots",
  description:
    "Explore SCR Robot product categories including palletizing and depalletizing robots, desktop robots, general-purpose robots, stamping robots, machine loading robots, and portable collaborative robots.",
};

export default function ProductsPage() {
  return (
    <>
      <SiteHeader alternateHref="/zh/products" />
      <main className="min-h-screen bg-[#080a0d] pt-40 text-white sm:pt-32 lg:pt-28">
        <section className="section-shell pb-12">
          <SectionHeading
            eyebrow="Product portfolio"
            title="Six robot categories for palletizing, tending, stamping, desktop automation, and flexible production."
            description="The SCR Robot product framework is organized for overseas B2B buyers: six major robot categories, eleven product lines, and detailed series data from the catalog."
            level={1}
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Product categories", "6 major categories"],
              ["Product lines", "11 robot lines"],
              ["Payload range", "3-800 kg"],
              ["Applications", "Palletizing, stamping, tending, collaboration"],
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

        <section className="section-shell pt-8">
          <SectionHeading
            eyebrow="Product framework"
            title="Find the right robot family by production task."
            description="Each category below groups the relevant robot lines around the way overseas factories normally evaluate automation projects: pallet flow, machine loading, press automation, general handling, or flexible collaborative work."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {productGroups.map((group) => (
              <ProductGroupCard key={group.slug} group={group} />
            ))}
          </div>
        </section>

        <section id="robot-series" className="section-shell pt-8">
          <SectionHeading
            eyebrow="Detailed catalog series"
            title="Representative robot series and catalog specifications."
            description="The detailed cards below summarize the main catalog series with payload, reach, applications, and specification tables for project-level comparison."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
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
            <div className="mt-12 grid min-w-0 gap-12">
              {productSeries.map((series) => (
                <section key={series.slug} id={series.slug} className="min-w-0 scroll-mt-36">
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
                  <SpecTable
                    series={series}
                    models={getProductModelsBySeries(series.slug)}
                    enableModelLinks
                  />
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
