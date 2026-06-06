import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { CtaLink } from "@/components/cta-link";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { SpecTable } from "@/components/spec-table";
import { productSeries } from "@/lib/catalog";
import { whatsappUrl } from "@/lib/contact";
import { getProductModelsBySeries } from "@/lib/product-data";
import { canonicalAlternates } from "@/lib/seo";

const desktopModels = getProductModelsBySeries("sch-series").filter((model) =>
  model.name.includes("AE"),
);

const schSeries = productSeries.find((series) => series.slug === "sch-series");

export const metadata: Metadata = {
  title: "Tabletop Industrial Robots | SCR Robot",
  description:
    "Compact precise robot arms for small assembly and handling, 3-10 kg payloads and 200-1300 mm reach in tabletop cells. Get Quote.",
  alternates: canonicalAlternates("/products/desktop-robots"),
};

const applications = [
  "Small component assembly and repeatable pick-and-place work",
  "Compact fixture loading for electronics, packaging, and light industry",
  "Tabletop transfer cells where floor space and reach are limited",
  "Cost-sensitive automation for repetitive handling under 10 kg",
];

export default function DesktopRobotsPage() {
  if (!schSeries) {
    return null;
  }

  return (
    <>
      <SiteHeader alternateHref="/zh/products/sch-series" />
      <main className="min-h-screen bg-[#080a0d] pt-40 text-white sm:pt-32 lg:pt-28">
        <section className="relative border-b border-white/10">
          <div className="absolute inset-0">
            <Image
              src="/images/bejing1%20(1).jpg"
              alt="Tabletop industrial robot for compact automation"
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-34"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,10,13,0.98),rgba(8,10,13,0.76),rgba(8,10,13,0.45))]" />
            <div className="absolute inset-0 industrial-grid opacity-40" />
          </div>

          <div className="relative mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
            <p className="font-mono text-sm font-bold uppercase tracking-[0.18em] text-[#f5b41b]">
              Desktop Robots
            </p>
            <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-tight md:text-6xl">
              Tabletop Industrial Robots for Small-Scale Automation
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
              SCR Robot supplies compact precise robot arms for small component
              assembly, tabletop handling, fixture loading, and limited-space
              production cells where 3-10 kg payload and controlled reach are
              more important than oversized floor equipment.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <CtaLink href="/contact">Get Quote</CtaLink>
              <CtaLink href={whatsappUrl} variant="secondary">
                WhatsApp
              </CtaLink>
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Payload", "3-10 kg"],
              ["Reach", "200-1,300 mm"],
              ["Robot type", "Compact 4-axis"],
              ["Use case", "Small assembly and handling"],
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

        <section className="border-y border-white/10 bg-[#0f1318]">
          <div className="section-shell">
            <div className="grid gap-10 lg:grid-cols-[0.76fr_1.24fr]">
              <SectionHeading
                eyebrow="Small-scale automation"
                title="Compact robot arms for precise repetitive handling."
                description="Desktop robot projects are usually evaluated by part weight, fixture access, cycle time, repeatability, worktable size, and operator loading flow. SCR Robot can help match the robot, tooling, and cell layout before quotation."
              />
              <div className="grid gap-3 sm:grid-cols-2">
                {applications.map((application) => (
                  <article
                    key={application}
                    className="rounded-lg border border-white/10 bg-white/[0.045] p-5"
                  >
                    <div className="mb-5 h-1 w-12 bg-[#d71920]" />
                    <h2 className="text-lg font-semibold leading-7 text-white">
                      {application}
                    </h2>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell">
          <SectionHeading
            eyebrow="Model data"
            title="SCH-AE tabletop robot models."
            description="Representative desktop and compact handling models for preliminary engineering review. Final selection depends on tooling, load center, fixture position, and cycle target."
          />
          <div className="mt-10">
            <SpecTable series={schSeries} models={desktopModels} enableModelLinks />
          </div>
          <p className="mt-6 text-sm leading-6 text-white/54">
            For heavy-duty SCH palletizing and depalletizing models, visit the{" "}
            <Link href="/products/sch-series" className="text-[#f5b41b] hover:text-[#ffd36b]">
              SCH Series page
            </Link>
            .
          </p>
        </section>
      </main>
    </>
  );
}
