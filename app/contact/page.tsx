import type { Metadata } from "next";
import { CtaLink } from "@/components/cta-link";
import { IndustrialCard } from "@/components/industrial-card";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { salesEmail, whatsappUrl } from "@/lib/contact";
import { productSeries } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Contact SCR Robot | Request Industrial Robot Quotation",
  description:
    "Contact SCR Robot for palletizing robots, depalletizing robots, stamping automation, machine tending, 3D vision bag breaking, and conveyor automation projects.",
};

const quoteChecklist = [
  "Product dimensions, unit weight, and packaging type",
  "Target throughput, cycle time, and shift schedule",
  "Robot payload, reach, and preferred product series if known",
  "Pallet size, stack height, and pallet pattern",
  "Factory layout, infeed/outfeed direction, and available floor area",
  "Destination country, safety requirements, and installation timeline",
];

export default function ContactPage() {
  return (
    <>
      <SiteHeader alternateHref="/zh/contact" />
      <main className="min-h-screen bg-[#080a0d] pt-40 text-white sm:pt-32 lg:pt-28">
        <section className="section-shell pb-12">
          <SectionHeading
            eyebrow="Contact sales engineering"
            title="Request a robot or automation system proposal."
            description="Tell us about your product, process, payload, reach, and factory layout. We will help identify the right robot series and automation cell structure for your overseas project."
            level={1}
          />
        </section>

        <section className="section-shell pt-8">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="grid gap-5">
              <IndustrialCard className="p-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f5b41b]">
                  Direct inquiry
                </p>
                <h2 className="mt-4 text-2xl font-semibold text-white">
                  Send project details for quotation.
                </h2>
                <p className="mt-4 leading-7 text-white/62">
                  The more technical information you provide, the faster the team
                  can recommend a robot family, tooling concept, conveyor layout,
                  and budgetary direction.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <CtaLink href={`mailto:${salesEmail}?subject=Industrial%20Robot%20Project%20Inquiry`}>
                    Email Sales
                  </CtaLink>
                  <CtaLink href={whatsappUrl} variant="secondary">
                    WhatsApp
                  </CtaLink>
                </div>
              </IndustrialCard>

              <div className="steel-panel p-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f5b41b]">
                  Robot series
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {productSeries.map((series) => (
                    <a
                      key={series.slug}
                      href={`/products/${series.slug}`}
                      className="rounded-md border border-white/10 bg-black/24 px-3 py-2 text-sm text-white/70 transition hover:border-[#f5b41b]/50 hover:text-white"
                    >
                      {series.series}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <IndustrialCard className="p-6 md:p-8">
              <form
                action={`mailto:${salesEmail}`}
                method="post"
                encType="text/plain"
                className="grid gap-5"
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="grid gap-2 text-sm text-white/72">
                    Name
                    <input
                      name="name"
                      className="h-12 rounded-md border border-white/12 bg-black/24 px-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#f5b41b]"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="grid gap-2 text-sm text-white/72">
                    Company Email
                    <input
                      name="email"
                      type="email"
                      className="h-12 rounded-md border border-white/12 bg-black/24 px-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#f5b41b]"
                      placeholder="name@company.com"
                    />
                  </label>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="grid gap-2 text-sm text-white/72">
                    Application
                    <select
                      name="application"
                      className="h-12 rounded-md border border-white/12 bg-black/24 px-4 text-white outline-none transition focus:border-[#f5b41b]"
                      defaultValue="Palletizing"
                    >
                      <option>Palletizing</option>
                      <option>Depalletizing</option>
                      <option>Stamping / forging</option>
                      <option>Machine tending</option>
                      <option>3D vision bag breaking</option>
                      <option>Conveyor automation</option>
                    </select>
                  </label>
                  <label className="grid gap-2 text-sm text-white/72">
                    Preferred Series
                    <select
                      name="series"
                      className="h-12 rounded-md border border-white/12 bg-black/24 px-4 text-white outline-none transition focus:border-[#f5b41b]"
                      defaultValue="Not sure"
                    >
                      <option>Not sure</option>
                      {productSeries.map((series) => (
                        <option key={series.slug}>{series.series}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <label className="grid gap-2 text-sm text-white/72">
                  Project Details
                  <textarea
                    name="message"
                    rows={6}
                    className="rounded-md border border-white/12 bg-black/24 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-[#f5b41b]"
                    placeholder="Product type, payload, reach, cycle time, pallet size, factory layout, destination country..."
                  />
                </label>
                <button
                  type="submit"
                  className="min-h-12 rounded-md bg-[#f5b41b] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-black transition hover:bg-[#ffca45]"
                >
                  Send Inquiry
                </button>
              </form>
            </IndustrialCard>
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#0f1318]">
          <div className="section-shell">
            <SectionHeading
              eyebrow="Quotation checklist"
              title="Information that helps engineering respond faster."
              description="For robot automation, the best quotation starts with clear production data."
            />
            <div className="mt-10 grid gap-3 md:grid-cols-2">
              {quoteChecklist.map((item) => (
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
