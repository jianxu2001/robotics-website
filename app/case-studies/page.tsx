import type { Metadata } from "next";
import { CaseStudyCard } from "@/components/case-study-card";
import { CtaLink } from "@/components/cta-link";
import { IndustrialCard } from "@/components/industrial-card";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { caseStudies } from "@/lib/case-studies";
import { whatsappUrl } from "@/lib/contact";
import { localizedAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Robot Automation Case Concepts | SCR Robot",
  description:
    "Review robot automation concepts for bag palletizing, carton palletizing, press transfer, machine tending, and 3D vision bag feeding.",
  alternates: localizedAlternates(
    "/case-studies",
    "/case-studies",
    "/zh/case-studies",
  ),
};

const reviewQuestions = [
  "What product or package must be handled?",
  "What throughput, cycle time, and shift schedule are required?",
  "What floor space, conveyor direction, and safety constraints exist?",
  "Which robot, gripper, conveyor, and control scope should be quoted?",
];

export default function CaseStudiesPage() {
  return (
    <>
      <SiteHeader alternateHref="/zh/case-studies" />
      <main className="min-h-screen bg-[#080a0d] pt-40 text-white sm:pt-32 lg:pt-28">
        <section className="relative border-b border-white/10">
          <div className="absolute inset-0 industrial-grid opacity-40" />
          <div className="relative section-shell pb-14">
            <SectionHeading
              eyebrow="Representative cases"
              title="Robot cell concepts for real palletizing, tending, and transfer projects."
              description="Use these scenarios to see how product data, payload, tooling, conveyors, safety, and cycle time shape a usable automation proposal."
              level={1}
            />
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {caseStudies.map((study) => (
                <a
                  key={study.slug}
                  href={`#${study.slug}`}
                  className="rounded-lg border border-white/10 bg-white/[0.045] p-5 transition hover:border-[#f5b41b]/50 hover:bg-white/[0.07]"
                >
                  <div className="mb-5 h-1 w-12 bg-[#d71920]" />
                  <h2 className="text-base font-semibold leading-6 text-white">{study.title}</h2>
                  <p className="mt-3 text-xs uppercase tracking-[0.12em] text-white/42">
                    {study.industry}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="grid gap-6">
            {caseStudies.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0f1318]">
          <div className="section-shell">
            <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
              <SectionHeading
                eyebrow="Project review"
                title="A better case discussion starts with four practical questions."
                description="When buyers provide this information early, the sales engineering conversation moves faster from general interest to a useful technical proposal."
              />
              <div className="grid gap-3 sm:grid-cols-2">
                {reviewQuestions.map((question) => (
                  <div key={question} className="rounded-lg border border-white/10 bg-black/24 p-5 text-white/68">
                    {question}
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
                  Need a similar solution?
                </p>
                <h2 className="mt-4 text-3xl font-semibold text-white">
                  Send product photos and layout notes for a project-specific proposal.
                </h2>
                <p className="mt-4 max-w-3xl leading-7 text-white/62">
                  We can adapt these concepts to your payload, reach, cycle time, pallet pattern, machine layout, and destination market.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <CtaLink href="/contact">Request Similar Proposal</CtaLink>
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
