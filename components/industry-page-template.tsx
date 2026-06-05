import Image from "next/image";
import Link from "next/link";
import { CtaLink } from "@/components/cta-link";
import { IndustrialCard } from "@/components/industrial-card";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import type { IndustryPage } from "@/lib/industry-pages";
import { whatsappUrl } from "@/lib/contact";
import { getIndustryPageStructuredData, serializeJsonLd } from "@/lib/seo";

type IndustryPageTemplateProps = {
  page: IndustryPage;
};

type AutomationSectionProps = {
  eyebrow: string;
  title: string;
  intro: string;
  page: IndustryPage;
  steps: string[];
  equipment: string[];
  mode: "depalletizing" | "feeding" | "palletizing";
};

function materialPhrase(page: IndustryPage) {
  return page.materials.slice(0, 4).join(", ");
}

function packagePhrase(page: IndustryPage) {
  return page.packages.slice(0, 4).join(", ");
}

function AutomationSection({
  eyebrow,
  title,
  intro,
  page,
  steps,
  equipment,
  mode,
}: AutomationSectionProps) {
  const modeCopy = {
    depalletizing:
      "The depalletizing area is usually the first place where incoming pallet quality, layer position, product deformation, and forklift flow become visible. A useful design does not only ask whether the robot can pick the product. It checks whether the robot can reach every layer, whether the tooling can tolerate shifted packages, whether the outfeed conveyor can accept product at the required rhythm, and whether operators can correct exceptions without entering a dangerous zone.",
    feeding:
      "The feeding area connects material handling with the production process, so reliability matters more than a simple pick-and-place demonstration. The cell must know when the downstream machine is ready, how much buffer is available, whether dust or spillage affects detection, and how operators will prepare the next pallet, bag, carton, or ingredient batch. Good feeding automation protects the production rhythm instead of creating another isolated machine.",
    palletizing:
      "The palletizing area determines whether finished products leave the line in a stable, warehouse-ready condition. Robot reach, product orientation, layer pattern, gripper weight, pallet discharge, and finished stack stability all affect the result. A practical palletizing proposal considers both the robot motion and the surrounding material flow so the final pallet can be moved safely by forklift or conveyor.",
  }[mode];

  return (
    <section className="border-y border-white/10 bg-[#0f1318]">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={intro}
          />
          <div className="grid gap-5">
            <IndustrialCard className="p-5">
              <p className="leading-7 text-white/68">{modeCopy}</p>
              <p className="mt-4 leading-7 text-white/68">
                For {page.title.toLowerCase()}, SCR Robot reviews products such
                as {materialPhrase(page)} and package formats such as{" "}
                {packagePhrase(page)} before confirming the robot model,
                gripper principle, conveyor direction, safety layout, and
                control sequence. This avoids choosing automation from a
                catalog picture alone and keeps the proposal connected to the
                real factory line.
              </p>
            </IndustrialCard>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-black/24 p-5">
                <h2 className="text-xl font-semibold text-white">
                  Engineering steps
                </h2>
                <div className="mt-5 grid gap-3">
                  {steps.map((step) => (
                    <p key={step} className="leading-7 text-white/64">
                      {step}
                    </p>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/24 p-5">
                <h2 className="text-xl font-semibold text-white">
                  Typical cell scope
                </h2>
                <div className="mt-5 grid gap-3">
                  {equipment.map((item) => (
                    <div
                      key={item}
                      className="rounded-md border border-white/10 bg-white/[0.045] px-4 py-3 text-white/68"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function IndustryPageTemplate({ page }: IndustryPageTemplateProps) {
  const structuredData = getIndustryPageStructuredData(page);

  return (
    <>
      {structuredData.map((jsonLd, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />
      ))}
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
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
            <SectionHeading
              eyebrow="Industry pain points"
              title={`What ${page.title.toLowerCase()} plants need to solve before automation.`}
              description="A successful industrial robot project starts with the production problem, not with a robot model number. These pages are written for plant managers, engineers, and purchasing teams who need to reduce labor pressure while keeping production stable."
            />
            <div className="grid gap-4">
              <IndustrialCard className="p-5">
                <p className="leading-7 text-white/68">
                  {page.productionContext} Buyers in this industry usually ask
                  for automation because manual handling has become too
                  repetitive, too unstable, or too difficult to staff. The
                  important question is not only whether a robot can lift the
                  product. The project also needs to confirm how the product is
                  presented, how the next machine receives it, how pallets move
                  through the area, and how operators will interact with the
                  system during normal production and exceptions.
                </p>
                <p className="mt-4 leading-7 text-white/68">
                  SCR Robot reviews {materialPhrase(page)} and related packages
                  such as {packagePhrase(page)} as part of one production flow.
                  The engineering discussion includes payload, reach, cycle
                  time, gripper contact, product detection, conveyor direction,
                  pallet pattern, safety guarding, and maintenance access. This
                  gives the buyer a clearer path from first inquiry to practical
                  quotation.
                </p>
              </IndustrialCard>
              <div className="grid gap-4 md:grid-cols-2">
                {page.buyerProblem.map((problem) => (
                  <div
                    key={problem.title}
                    className="rounded-lg border border-white/10 bg-white/[0.045] p-5"
                  >
                    <div className="mb-4 h-1 w-12 bg-[#d71920]" />
                    <h2 className="text-xl font-semibold text-white">
                      {problem.title}
                    </h2>
                    <p className="mt-4 leading-7 text-white/64">
                      {problem.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <AutomationSection
          eyebrow="Automatic depalletizing solution"
          title={`Automatic depalletizing solution for ${page.title.toLowerCase()}.`}
          intro={page.depalletizing.intro}
          page={page}
          steps={page.depalletizing.steps}
          equipment={page.depalletizing.equipment}
          mode="depalletizing"
        />

        <AutomationSection
          eyebrow="Automatic feeding solution"
          title={`Automatic feeding solution for ${page.title.toLowerCase()}.`}
          intro={page.feeding.intro}
          page={page}
          steps={page.feeding.steps}
          equipment={page.feeding.equipment}
          mode="feeding"
        />

        <AutomationSection
          eyebrow="Automatic palletizing solution"
          title={`Automatic palletizing solution for ${page.title.toLowerCase()}.`}
          intro={page.palletizing.intro}
          page={page}
          steps={page.palletizing.steps}
          equipment={page.palletizing.equipment}
          mode="palletizing"
        />

        <section className="section-shell">
          <SectionHeading
            eyebrow="System planning"
            title="How SCR Robot turns a factory problem into a quotation-ready robot cell."
            description="The goal is to connect robot selection with product behavior, line layout, safety, and downstream equipment so the buyer can evaluate the project internally."
            align="center"
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            <IndustrialCard className="p-5">
              <h2 className="text-xl font-semibold text-white">
                Product and package review
              </h2>
              <p className="mt-4 leading-7 text-white/64">
                The review starts with product photos, sample dimensions, unit
                weight, package surface, deformation, label direction, and
                whether the product is rigid, flexible, dusty, fragile, or
                abrasive. This information affects the gripper style and the
                robot payload margin. For {page.title.toLowerCase()}, a small
                difference in bag shape, carton strength, or product surface can
                change the tooling concept and cycle time.
              </p>
            </IndustrialCard>
            <IndustrialCard className="p-5">
              <h2 className="text-xl font-semibold text-white">
                Layout and material flow
              </h2>
              <p className="mt-4 leading-7 text-white/64">
                The robot cell must fit the actual factory. Engineering checks
                infeed direction, pallet loading side, finished pallet discharge,
                forklift route, operator walkway, guard doors, control cabinet
                position, and maintenance access. A layout that looks compact on
                paper can fail if it blocks pallet movement or makes daily
                cleaning and troubleshooting difficult.
              </p>
            </IndustrialCard>
            <IndustrialCard className="p-5">
              <h2 className="text-xl font-semibold text-white">
                Robot, tooling, and controls
              </h2>
              <p className="mt-4 leading-7 text-white/64">
                Robot selection is combined with end-of-arm tooling, conveyors,
                sensors, PLC/HMI logic, safety interlocks, and recipe settings.
                The system may need vacuum cups, clamp tooling, fork tooling,
                bag suction, custom grippers, product detection, pallet checks,
                and communication with upstream or downstream machines.
              </p>
            </IndustrialCard>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0f1318]">
          <div className="section-shell">
            <SectionHeading
              eyebrow="Recommended products and internal links"
              title={`Robot platforms and related pages for ${page.title.toLowerCase()}.`}
              description="These internal links help buyers move from industry problem to robot series, product model, and quotation request without leaving the SCR Robot website."
            />
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {page.recommendedProducts.map((product) => (
                <Link
                  key={product.title}
                  href={product.href}
                  className="rounded-lg border border-white/10 bg-black/24 p-5 transition hover:border-[#f5b41b]/50 hover:bg-white/[0.055]"
                >
                  <div className="mb-5 h-1 w-12 bg-[#f5b41b]" />
                  <h2 className="text-xl font-semibold text-white">
                    {product.title}
                  </h2>
                  <p className="mt-4 leading-7 text-white/62">
                    {product.text}
                  </p>
                </Link>
              ))}
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {page.internalLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="rounded-lg border border-white/10 bg-white/[0.045] p-5 transition hover:border-[#f5b41b]/50"
                >
                  <h2 className="font-semibold text-white">{link.title}</h2>
                  <p className="mt-3 leading-7 text-white/62">{link.text}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell">
          <SectionHeading
            eyebrow="Business benefits"
            title="Focused on practical factory outcomes."
            description="The value of the project is measured by stable production, safer work, better labor allocation, and a clearer engineering scope."
            align="center"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {page.benefits.map((benefit) => (
              <div key={benefit.title} className="steel-panel p-5">
                <p className="text-xl font-semibold text-white">
                  {benefit.title}
                </p>
                <p className="mt-4 leading-7 text-white/62">{benefit.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0f1318]">
          <div className="section-shell">
            <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
              <SectionHeading
                eyebrow="Quotation checklist"
                title="Send this information for a faster engineering response."
                description="Clear project data helps SCR Robot recommend the robot series, gripper, conveyor layout, safety scope, and budget direction without slow basic clarification."
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
              description="These answers help buyers decide what data to prepare before requesting a formal robot automation proposal."
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
                    Project review
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold text-white">
                    Request Engineering Review for your {page.title.toLowerCase()} automation project.
                  </h2>
                  <p className="mt-4 max-w-3xl leading-7 text-white/62">
                    Send product photos, weight, dimensions, target output,
                    pallet pattern, factory layout, and destination country.
                    SCR Robot will help map the depalletizing, feeding, or
                    palletizing cell scope and recommend the next engineering
                    discussion.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <CtaLink href="/contact">Request Engineering Review</CtaLink>
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
