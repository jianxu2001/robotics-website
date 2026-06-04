import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { CtaLink } from "@/components/cta-link";
import { IndustrialCard } from "@/components/industrial-card";
import { SectionHeading } from "@/components/section-heading";
import { SeriesCard } from "@/components/series-card";
import { SiteHeader } from "@/components/site-header";
import {
  automationSolutions,
  companyProfile,
  industries,
  productCategories,
  productSeries,
} from "@/lib/catalog";
import { whatsappUrl } from "@/lib/contact";
import { absoluteUrl, localizedAlternates, serializeJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "SCR Robot | Palletizing Robots & Factory Automation",
  description:
    "SCR Robot builds palletizing robots, depalletizing systems, stamping automation, machine tending cells, and conveyor automation for overseas factories.",
  alternates: localizedAlternates("/", "/", "/zh"),
};

const stats = [
  { value: "2017", label: "Founded in Guangzhou" },
  { value: "6,000 m2", label: "Manufacturing and engineering base" },
  { value: "50+", label: "Employees across production and support" },
  { value: "20+", label: "Engineering and technical specialists" },
];

const trustPoints = [
  "Industrial robot manufacturing, equipment service, sales, and turnkey automation in one team.",
  "Engineering coverage across mechanical design, electrical controls, software, vision, and integration.",
  "Portfolio spans four-axis palletizing robots, six-axis robots, stamping transfer systems, and conveyor automation.",
  "Overseas buyer support with technical proposals, documentation, remote communication, and project-based customization.",
];

const projectWorkflow = [
  {
    step: "01",
    title: "Application review",
    description:
      "We review product size, weight, packaging, throughput, factory layout, and safety requirements before recommending a robot platform.",
  },
  {
    step: "02",
    title: "Concept and quotation",
    description:
      "The proposal can cover robot selection, gripper concept, conveyor layout, pallet pattern logic, guarding, controls, and budget direction.",
  },
  {
    step: "03",
    title: "System build",
    description:
      "Mechanical, electrical, software, vision, and integration teams work around the complete production cell instead of only the robot body.",
  },
  {
    step: "04",
    title: "Delivery support",
    description:
      "Projects can be supported with English communication, technical documentation, remote troubleshooting, and commissioning planning.",
  },
];

const buyerAssurance = [
  "Robot payload, reach, repeatability, and working envelope are checked against the real product and line layout.",
  "System scope can include grippers, conveyors, safety guarding, PLC/HMI, vision, and non-standard fixtures.",
  "Technical proposals are written for overseas B2B buyers who need internal review, approval, and budget justification.",
  "Inquiry routing is configured for direct email delivery and WhatsApp follow-up, reducing missed sales opportunities.",
];

const quoteInputs = [
  "Product size, unit weight, and packaging form",
  "Target throughput, cycle time, and shift schedule",
  "Pallet size, stacking pattern, and maximum stack height",
  "Infeed/outfeed direction, factory layout, and destination country",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: companyProfile.name,
  url: "https://www.scr-robot.com",
  logo: absoluteUrl("/images/SCR.jpg"),
  foundingDate: "2017-06-13",
  description: companyProfile.description,
  areaServed: "Worldwide",
  makesOffer: productSeries.map((series) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Product",
      name: series.series,
      description: series.summary,
    },
  })),
};

export default function Home() {
  const featuredSeries = productSeries.filter((series) =>
    ["sch-series", "scr-series", "er-series"].includes(series.slug),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <SiteHeader alternateHref="/zh" />

      <main id="top" className="min-h-screen overflow-hidden bg-[#080a0d] text-white">
        <section className="relative min-h-[92vh] border-b border-white/10 pt-40 sm:pt-32 lg:pt-24">
          <Image
            src="/images/bejing1%20(1).jpg"
            alt="Industrial robotic palletizing cell in a modern factory"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-48"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,10,13,0.97)_0%,rgba(8,10,13,0.78)_46%,rgba(8,10,13,0.36)_100%)]" />
          <div className="absolute inset-0 industrial-grid opacity-50" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,transparent,rgba(8,10,13,0.98))]" />

          <div className="relative mx-auto flex min-h-[calc(92vh-8rem)] max-w-7xl items-center px-5 py-10 sm:min-h-[calc(92vh-6rem)] lg:px-8">
            <div className="max-w-5xl">
              <p className="mb-5 inline-flex max-w-full rounded-md border border-[#f5b41b]/40 bg-black/50 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#f5b41b] sm:tracking-[0.18em]">
                Intelligent factory solutions from South China Robotics
              </p>
              <h1 className="max-w-5xl text-4xl font-semibold leading-[1.05] text-white md:text-6xl lg:text-7xl">
                Palletizing robots and automation cells for factory production lines.
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-white/72 md:text-xl">
                {companyProfile.name} builds robotic palletizing, depalletizing,
                stamping, forging, machine tending, 3D vision bag breaking, and
                conveyor automation cells for overseas manufacturers that need
                practical proposals, payload checks, and integration support.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <CtaLink href="/contact">Request Project Proposal</CtaLink>
                <CtaLink href="/products" variant="secondary">
                  Compare Robot Series
                </CtaLink>
              </div>

              <div className="mt-10 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-[#0d1116]/84 p-5">
                    <div className="text-2xl font-bold text-white md:text-3xl">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-xs leading-5 text-white/52">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="section-shell">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <SectionHeading
              eyebrow="Product categories"
              title="Six robot categories built around real factory work."
              description="The product framework is now organized by production task: palletizing and depalletizing, desktop automation, general-purpose handling, stamping, machine loading, and portable collaborative work."
            />
            <div className="steel-panel p-5">
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ["Payload coverage", "3-800 kg"],
                  ["Product structure", "6 categories"],
                  ["Product lines", "11 robot lines"],
                ].map(([label, value]) => (
                  <div key={label} className="border-l border-[#f5b41b]/60 pl-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-white/42">
                      {label}
                    </p>
                    <p className="mt-2 text-xl font-semibold text-white">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {productCategories.map((category) => (
              <IndustrialCard key={category.title} className="group overflow-hidden">
                <div className="grid min-h-full lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="relative min-h-56 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080a0d] via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-white">
                      {category.title}
                    </h3>
                    <p className="mt-4 leading-7 text-white/62">
                      {category.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {category.series.map((series) => (
                        <span
                          key={series}
                          className="rounded-md border border-[#f5b41b]/25 bg-[#f5b41b]/8 px-3 py-1.5 text-xs font-semibold text-[#ffd36b]"
                        >
                          {series}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </IndustrialCard>
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0f1318]">
          <div className="section-shell">
            <SectionHeading
              eyebrow="Featured robot series"
              title="Core robot families for palletizing, heavy handling, and flexible automation."
              description="Representative series from the catalog are shown below. The full product range includes ECR, SCH, SAR, SCR, SRL, STC, and ER platforms."
            />
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {featuredSeries.map((series) => (
                <SeriesCard key={series.slug} series={series} />
              ))}
            </div>
            <div className="mt-10">
              <CtaLink href="/products" variant="secondary">
                Explore All Series
              </CtaLink>
            </div>
          </div>
        </section>

        <section id="applications" className="section-shell">
          <SectionHeading
            eyebrow="Industry applications"
            title="Automation for repetitive, heavy, and precision-driven production work."
            description="The catalog positions South China Robotics as a smart factory solution provider serving robot applications across material handling, press automation, vision feeding, and conveyor-based production."
            align="center"
          />
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry) => (
              <div
                key={industry}
                className="rounded-lg border border-white/10 bg-white/[0.045] p-5"
              >
                <div className="mb-5 h-1 w-12 bg-[#d71920]" />
                <h3 className="text-lg font-semibold text-white">{industry}</h3>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <CtaLink href="/industries" variant="secondary">
              View Industry Solutions
            </CtaLink>
            <CtaLink href="/case-studies" variant="ghost">
              View Case Concepts
            </CtaLink>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#10151a]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div className="relative min-h-[420px] overflow-hidden rounded-lg border border-white/10">
              <Image
                src="/images/SCR.jpg"
                alt="South China Robotics manufacturing facility"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080a0d] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#f5b41b]">
                  Guangzhou engineering base
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  Robot manufacturing with system integration capability.
                </h2>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <SectionHeading
                eyebrow="Why choose us"
                title="Built for buyers who need engineering confidence, not a catalog-only supplier."
                description={companyProfile.engineering}
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {trustPoints.map((point) => (
                  <div key={point} className="rounded-lg border border-white/10 bg-black/20 p-5">
                    <div className="mb-4 h-1 w-12 bg-[#f5b41b]" />
                    <p className="leading-7 text-white/70">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell">
          <SectionHeading
            eyebrow="Automation solutions"
            title="Turn robot bodies into complete production systems."
            description="Overseas projects often require more than a robot arm. SCR Robot can support the surrounding process: conveyors, tooling, safety, controls, vision, and commissioning planning."
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
        </section>

        <section className="border-y border-white/10 bg-[#0f1318]">
          <div className="section-shell">
            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
              <SectionHeading
                eyebrow="Project delivery"
                title="A practical process for overseas automation buyers."
                description="International factory buyers need more than a product list. They need a supplier who can turn production data into a credible robot cell proposal, then support the project through delivery."
              />
              <div className="grid gap-4 md:grid-cols-2">
                {projectWorkflow.map((item) => (
                  <div key={item.step} className="steel-panel p-6">
                    <p className="font-mono text-sm font-bold text-[#f5b41b]">
                      {item.step}
                    </p>
                    <h3 className="mt-4 text-xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-4 leading-7 text-white/62">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <SectionHeading
                eyebrow="Buyer confidence"
                title="Built to reduce uncertainty before a purchase decision."
                description="A serious robot project needs technical clarity, responsive communication, and enough detail for the buyer's engineering and purchasing teams to move forward."
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {buyerAssurance.map((item) => (
                  <div key={item} className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
                    <div className="mb-4 h-1 w-12 bg-[#d71920]" />
                    <p className="leading-7 text-white/68">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <IndustrialCard className="p-6 md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f5b41b]">
                Faster quotation
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-white">
                Send the key project data for a faster robot recommendation.
              </h3>
              <div className="mt-6 grid gap-3">
                {quoteInputs.map((item) => (
                  <div
                    key={item}
                    className="rounded-md border border-white/10 bg-black/24 px-4 py-4 text-white/70"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <CtaLink href="/contact">Send Project Details</CtaLink>
                <CtaLink href={whatsappUrl} variant="secondary">
                  WhatsApp
                </CtaLink>
              </div>
            </IndustrialCard>
          </div>
        </section>

        <section className="relative border-t border-white/10 bg-[#0c0f13]">
          <div className="absolute inset-0 industrial-grid opacity-30" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[0.85fr_1fr] lg:px-8">
            <SectionHeading
              eyebrow="Start a project"
              title="Send your product, payload, reach, and cycle-time requirements."
              description="Share product photos, payload, reach, cycle time, pallet pattern, and layout. We will map the robot series, gripper, conveyor flow, and proposal scope."
            />
            <IndustrialCard className="p-6 md:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                {["Robot series selection", "Palletizing cell proposal", "Stamping automation", "Vision and conveyor integration"].map(
                  (item) => (
                    <div
                      key={item}
                      className="rounded-md border border-white/10 bg-black/22 px-4 py-4 text-white/72"
                    >
                      {item}
                    </div>
                  ),
                )}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <CtaLink href="/contact">Get Engineering Review</CtaLink>
                <CtaLink href={whatsappUrl} variant="secondary">
                  WhatsApp
                </CtaLink>
              </div>
            </IndustrialCard>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#080a0d] px-5 py-8 text-white/54 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm md:flex-row md:items-center md:justify-between">
          <p>
            SCR Robot - Industrial robots, palletizing systems, stamping
            automation, and smart factory solutions.
          </p>
          <div className="flex flex-wrap gap-5">
            <Link href="/products" className="hover:text-white">
              Products
            </Link>
            <Link href="/industries" className="hover:text-white">
              Applications
            </Link>
            <Link href="/case-studies" className="hover:text-white">
              Cases
            </Link>
            <Link href="/about" className="hover:text-white">
              About
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
