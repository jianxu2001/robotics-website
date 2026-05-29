import Image from "next/image";
import type { Metadata } from "next";
import { CtaLink } from "@/components/cta-link";
import { IndustrialCard } from "@/components/industrial-card";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { automationSolutions, companyProfile } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "About South China Robotics | Industrial Robot Manufacturer",
  description:
    "Learn about South China Robotics Technology (Guangzhou) Co., Ltd., an industrial robot manufacturer and intelligent factory solution provider founded in 2017.",
};

const profileStats = [
  ["Founded", companyProfile.founded],
  ["Facility", companyProfile.facility],
  ["Team", companyProfile.team],
  ["Location", companyProfile.headquarters],
];

const capabilities = [
  "Industrial robot production and manufacturing",
  "Equipment maintenance and after-sales technical support",
  "Robot sales and application engineering",
  "One-stop industry automation solution delivery",
  "Mechanical, electrical, software, and vision system integration",
  "Custom non-standard automation for production lines",
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader alternateHref="/zh/about" />
      <main className="min-h-screen bg-[#080a0d] pt-40 text-white sm:pt-32 lg:pt-28">
        <section className="relative border-b border-white/10">
          <Image
            src="/images/SCR.jpg"
            alt="South China Robotics facility"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-42"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,10,13,0.98),rgba(8,10,13,0.72),rgba(8,10,13,0.4))]" />
          <div className="absolute inset-0 industrial-grid opacity-30" />
          <div className="relative mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
            <p className="font-mono text-sm font-bold uppercase tracking-[0.18em] text-[#f5b41b]">
              Company profile
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
              South China Robotics Technology (Guangzhou) Co., Ltd.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
              {companyProfile.description}
            </p>
          </div>
        </section>

        <section className="section-shell">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeading
              eyebrow="Engineering base"
              title="A practical robot manufacturer for factory automation projects."
              description={companyProfile.engineering}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {profileStats.map(([label, value]) => (
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
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0f1318]">
          <div className="section-shell">
            <SectionHeading
              eyebrow="What we do"
              title="Robot manufacturing plus automation integration."
              description="The catalog positions the company as a smart factory solution provider, combining robot products with equipment service and industry-specific automation systems."
            />
            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((capability) => (
                <IndustrialCard key={capability} className="p-6">
                  <div className="mb-5 h-1 w-12 bg-[#d71920]" />
                  <h3 className="text-xl font-semibold leading-7 text-white">
                    {capability}
                  </h3>
                </IndustrialCard>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell">
          <SectionHeading
            eyebrow="Solution scope"
            title="Designed for production-line outcomes."
            description="For overseas buyers, the value is the complete working system: robot, tooling, conveyors, safety, controls, commissioning logic, and documentation."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-4">
            {automationSolutions.map((solution, index) => (
              <div key={solution.title} className="steel-panel p-6">
                <p className="font-mono text-3xl font-semibold text-[#f5b41b]">
                  0{index + 1}
                </p>
                <h3 className="mt-5 text-xl font-semibold text-white">
                  {solution.title}
                </h3>
                <p className="mt-4 leading-7 text-white/58">
                  {solution.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <CtaLink href="/contact">Discuss an Automation Project</CtaLink>
          </div>
        </section>
      </main>
    </>
  );
}
