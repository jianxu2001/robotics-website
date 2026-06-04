import type { Metadata } from "next";
import { CtaLink } from "@/components/cta-link";
import { IndustrialCard } from "@/components/industrial-card";
import { IndustrySolutionCard } from "@/components/industry-solution-card";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { industrySolutions } from "@/lib/industry-solutions";
import { industryPages } from "@/lib/industry-pages";
import { whatsappUrl } from "@/lib/contact";
import { localizedAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Robot Automation Applications | Palletizing & Tending",
  description:
    "Explore SCR Robot automation for palletizing, depalletizing, bag handling, stamping, machine tending, conveyors, and factory integration projects.",
  alternates: localizedAlternates("/industries", "/industries", "/zh/industries"),
};

const decisionFactors = [
  "Product size, weight, packaging, and surface condition",
  "Target throughput, cycle time, and shift schedule",
  "Factory layout, available floor area, and infeed/outfeed direction",
  "Safety requirements, downstream equipment, and destination country",
];

export default function IndustriesPage() {
  return (
    <>
      <SiteHeader alternateHref="/zh/industries" />
      <main className="min-h-screen bg-[#080a0d] pt-40 text-white sm:pt-32 lg:pt-28">
        <section className="relative border-b border-white/10">
          <div className="absolute inset-0 industrial-grid opacity-40" />
          <div className="relative section-shell pb-14">
            <SectionHeading
              eyebrow="Industry applications"
              title="Robot automation by factory application, product type, and line layout."
              description="Start from the production problem, then connect the product, payload, throughput, robot series, gripper, conveyors, and quotation data."
              level={1}
            />
            <div className="mt-10">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f5b41b]">
                Target industries
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {industryPages.map((page) => (
                  <a
                    key={page.slug}
                    href={`/industries/${page.slug}`}
                    className="rounded-lg border border-white/10 bg-white/[0.055] p-5 transition hover:border-[#f5b41b]/50 hover:bg-white/[0.08]"
                  >
                    <h2 className="text-lg font-semibold text-white">
                      {page.title}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-white/58">
                      {page.description}
                    </p>
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {industrySolutions.map((solution) => (
                <a
                  key={solution.slug}
                  href={`#${solution.slug}`}
                  className="rounded-lg border border-white/10 bg-white/[0.045] p-5 transition hover:border-[#f5b41b]/50 hover:bg-white/[0.07]"
                >
                  <div className="mb-5 h-1 w-12 bg-[#d71920]" />
                  <h2 className="text-lg font-semibold text-white">{solution.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-white/58">{solution.summary}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="grid gap-6">
            {industrySolutions.map((solution) => (
              <IndustrySolutionCard key={solution.slug} solution={solution} />
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0f1318]">
          <div className="section-shell">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
              <SectionHeading
                eyebrow="Quotation readiness"
                title="The fastest proposals start with clear production data."
                description="A strong inquiry helps engineering identify the robot series, gripper, conveyors, safety layout, and budget direction without wasting days on basic clarification."
              />
              <div className="grid gap-3 sm:grid-cols-2">
                {decisionFactors.map((factor) => (
                  <div key={factor} className="rounded-lg border border-white/10 bg-black/24 p-5 text-white/68">
                    {factor}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell">
          <IndustrialCard className="p-6 md:p-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f5b41b]">
                  Start with your factory data
                </p>
                <h2 className="mt-4 text-3xl font-semibold text-white">
                  Send product photos, throughput, and layout for a practical proposal.
                </h2>
                <p className="mt-4 max-w-3xl leading-7 text-white/62">
                  We can help map the robot platform, end-of-arm tooling, conveyor layout, and engineering scope for your production line.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <CtaLink href="/contact">Request Application Review</CtaLink>
                <CtaLink href="/case-studies" variant="ghost">
                  View Case Concepts
                </CtaLink>
                <CtaLink href={whatsappUrl} variant="secondary">
                  WhatsApp
                </CtaLink>
              </div>
            </div>
          </IndustrialCard>
        </section>
      </main>
    </>
  );
}
