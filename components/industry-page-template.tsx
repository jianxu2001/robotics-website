import Image from "next/image";
import Link from "next/link";
import { CtaLink } from "@/components/cta-link";
import { IndustrialCard } from "@/components/industrial-card";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import type { IndustryPage } from "@/lib/industry-pages";
import { whatsappUrl } from "@/lib/contact";

type IndustryPageTemplateProps = {
  page: IndustryPage;
};

export function IndustryPageTemplate({ page }: IndustryPageTemplateProps) {
  return (
    <>
      <SiteHeader alternateHref="/zh/industries" />
      <main className="min-h-screen bg-[#080a0d] pt-40 text-white sm:pt-32 lg:pt-28">
        <section className="relative overflow-hidden border-b border-white/10">
          <Image
            src={page.image}
            alt={`${page.title} robot automation`}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-42"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,10,13,0.98),rgba(8,10,13,0.78),rgba(8,10,13,0.42))]" />
          <div className="absolute inset-0 industrial-grid opacity-45" />
          <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
            <div className="text-sm text-white/58">
              <Link href="/industries" className="transition hover:text-white">
                Industries
              </Link>
              <span className="mx-2 text-white/28">/</span>
              <span className="text-white">{page.title}</span>
            </div>
            <p className="mt-10 font-mono text-sm font-bold uppercase tracking-[0.18em] text-[#f5b41b]">
              {page.eyebrow}
            </p>
            <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-tight md:text-6xl">
              {page.heroTitle}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
              {page.heroDescription}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <CtaLink href="/contact">Discuss Your Automation Project</CtaLink>
              <CtaLink href={whatsappUrl} variant="secondary">
                WhatsApp
              </CtaLink>
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <SectionHeading
              eyebrow="Buyer problem"
              title={`What ${page.title.toLowerCase()} need to solve.`}
              description="These pages are written for plant managers, purchasing teams, and automation buyers who need a practical way to reduce labor pressure and stabilize production."
            />
            <div className="grid gap-4">
              {page.buyerProblem.map((problem) => (
                <div
                  key={problem}
                  className="rounded-lg border border-white/10 bg-white/[0.045] p-5"
                >
                  <div className="mb-4 h-1 w-12 bg-[#d71920]" />
                  <p className="leading-7 text-white/68">{problem}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0f1318]">
          <div className="section-shell">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
              <SectionHeading
                eyebrow="Solution"
                title="Robot automation planned around the real production line."
                description="South China Robotics evaluates product weight, package form, payload, reach, pallet layout, conveyor direction, and factory space before recommending a robot cell."
              />
              <div className="grid gap-4">
                {page.solution.map((item) => (
                  <IndustrialCard key={item} className="p-5">
                    <p className="leading-7 text-white/70">{item}</p>
                  </IndustrialCard>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell">
          <SectionHeading
            eyebrow="Business benefits"
            title="Focused on conversion-critical factory outcomes."
            description="The goal is not only to install a robot, but to help the factory reduce manual work, control cost, improve output, and create safer handling conditions."
            align="center"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {page.benefits.map((benefit) => (
              <div key={benefit.title} className="steel-panel p-5">
                <p className="text-xl font-semibold text-white">{benefit.title}</p>
                <p className="mt-4 leading-7 text-white/62">{benefit.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0f1318]">
          <div className="section-shell">
            <SectionHeading
              eyebrow="Recommended products"
              title={`Robot products for ${page.title.toLowerCase()}.`}
              description="Product selection depends on payload, reach, tooling, package type, cycle time, and plant layout. These are practical starting points for quotation discussion."
            />
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {page.recommendedProducts.map((product) => (
                <Link
                  key={product.title}
                  href={product.href}
                  className="rounded-lg border border-white/10 bg-black/24 p-5 transition hover:border-[#f5b41b]/50 hover:bg-white/[0.055]"
                >
                  <div className="mb-5 h-1 w-12 bg-[#f5b41b]" />
                  <h3 className="text-xl font-semibold text-white">
                    {product.title}
                  </h3>
                  <p className="mt-4 leading-7 text-white/62">{product.text}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <SectionHeading
              eyebrow="Applications"
              title="Typical automation scenarios."
              description="Use these application examples to identify whether the current production bottleneck is palletizing, depalletizing, bag feeding, conveyor transfer, or a complete automation cell."
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {page.applications.map((application) => (
                <div
                  key={application}
                  className="rounded-lg border border-white/10 bg-white/[0.045] p-5"
                >
                  <h3 className="font-semibold text-white">{application}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0f1318]">
          <div className="section-shell">
            <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
              <SectionHeading
                eyebrow="Quotation checklist"
                title="Send this information for a faster engineering response."
                description="Clear project data helps the team recommend the robot series, gripper, conveyor layout, safety scope, and budget direction without basic back-and-forth delays."
              />
              <div className="grid gap-3 sm:grid-cols-2">
                {page.quoteInputs.map((item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-white/10 bg-black/24 p-5 text-white/68"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <SectionHeading
              eyebrow="FAQ"
              title="Questions purchasing managers usually ask first."
              description="The answers below are designed to help overseas buyers decide what information to send before requesting a formal proposal."
            />
            <div className="grid gap-4">
              {page.faq.map((item) => (
                <article
                  key={item.question}
                  className="rounded-lg border border-white/10 bg-[#11161b] p-5"
                >
                  <h2 className="text-lg font-semibold text-white">
                    {item.question}
                  </h2>
                  <p className="mt-3 leading-7 text-white/64">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#0c0f13]">
          <div className="section-shell">
            <IndustrialCard className="p-6 md:p-8">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f5b41b]">
                    Contact CTA
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold text-white">
                    Send your {page.title.toLowerCase()} automation requirement.
                  </h2>
                  <p className="mt-4 max-w-3xl leading-7 text-white/62">
                    Share product photos, weight, dimensions, target output,
                    pallet pattern, factory layout, and destination country.
                    We will help map the right robot and system scope.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <CtaLink href="/contact">Get a Robot Automation Quote</CtaLink>
                  <CtaLink href={whatsappUrl} variant="secondary">
                    WhatsApp
                  </CtaLink>
                </div>
              </div>
            </IndustrialCard>
          </div>
        </section>
      </main>
    </>
  );
}
