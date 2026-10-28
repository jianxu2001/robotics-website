import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CtaLink } from "@/components/cta-link";
import { IndustrialCard } from "@/components/industrial-card";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { whatsappUrl } from "@/lib/contact";
import { solutionPages } from "@/lib/solution-pages";
import { solutionEngineering } from "@/lib/solution-engineering";
import {
  canonicalAlternates,
  getSolutionPageStructuredData,
  serializeJsonLd,
} from "@/lib/seo";

type SolutionDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return solutionPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: SolutionDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = solutionPages.find((p) => p.slug === slug);

  if (!page) {
    return {};
  }

  return {
    title: page.seoTitle,
    description: page.description,
    alternates: canonicalAlternates(`/solutions/${page.slug}`),
    openGraph: {
      title: page.seoTitle,
      description: page.description,
      images: [page.image],
      type: "website",
    },
  };
}

/* ── Shared section components ── */

function PainPointCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
      <div className="mb-4 h-1 w-12 bg-[#d71920]" />
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <p className="mt-4 leading-7 text-white/64">{text}</p>
    </div>
  );
}

function ConfigRow({
  parameter,
  value,
}: {
  parameter: string;
  value: string;
}) {
  return (
    <div className="grid gap-3 border-b border-white/8 py-5 last:border-b-0 sm:grid-cols-[220px_1fr]">
      <p className="text-sm font-semibold text-[#f5b41b]">{parameter}</p>
      <p className="leading-7 text-white/72">{value}</p>
    </div>
  );
}

/* ── Page component ── */

export default async function SolutionDetailPage({
  params,
}: SolutionDetailPageProps) {
  const { slug } = await params;
  const page = solutionPages.find((p) => p.slug === slug);

  if (!page) {
    notFound();
  }

  const structuredData = getSolutionPageStructuredData(page);
  const engineering = solutionEngineering[page.slug];

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
        {/* ── Hero ── */}
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 industrial-grid opacity-45" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
            <div>
            <div className="text-sm text-white/58">
              <Link href="/industries" className="transition hover:text-white">
                Solutions
              </Link>
              <span className="mx-2 text-white/28">/</span>
              <span className="text-white">{page.title}</span>
            </div>
            <p className="mt-10 font-mono text-sm font-bold uppercase tracking-[0.18em] text-[#f5b41b]">
              {page.eyebrow}
            </p>
            <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-tight sm:text-5xl">
              {page.heroTitle}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
              {page.heroDescription}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <CtaLink href="/contact">Request Engineering Review</CtaLink>
              <CtaLink href="/contact" variant="secondary">
                Send Product Photos First
              </CtaLink>
            </div>
            </div>
            <figure className="overflow-hidden rounded-lg border border-white/10 bg-[#0b131b]">
              <div className="relative aspect-[4/3]">
                <Image src={page.image} alt={page.imageAlt} fill priority sizes="(min-width:1024px) 42vw, 100vw" className="object-contain" />
              </div>
              <figcaption className="border-t border-white/10 px-5 py-4 text-sm leading-6 text-white/65">{page.imageCaption}</figcaption>
            </figure>
          </div>
        </section>

        {engineering && <section className="section-shell">
          <SectionHeading eyebrow="Process and selection" title="Define the complete handling task." description="Use the actual product, incoming condition and downstream interface to compare configurations." />
          <ol className="mt-8 grid gap-4 md:grid-cols-3">{engineering.workflow.map((step, index) => <li key={step.title} className="rounded-lg border border-white/10 bg-white/[0.035] p-6"><p className="font-mono text-sm text-[#f5b41b]">0{index + 1}</p><h2 className="mt-3 text-xl font-semibold">{step.title}</h2><p className="mt-4 leading-7 text-white/65">{step.text}</p></li>)}</ol>
          <h2 className="mt-12 text-2xl font-semibold">What changes the equipment selection?</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">{engineering.selectionChecks.map((check) => <article key={check.item} className="border-l-2 border-[#f5b41b]/60 pl-5"><h3 className="text-lg font-semibold">{check.item}</h3><p className="mt-3 leading-7 text-white/65">{check.why}</p></article>)}</div>
          {engineering.siteExample && <article className="mt-10 grid overflow-hidden rounded-lg border border-[#f5b41b]/30 bg-[#11161b] sm:grid-cols-[0.45fr_1fr]"><Link href={engineering.siteExample.href} className="bg-black"><Image src={engineering.siteExample.image} alt="SCH100 customer installation for bag pickup and feeding with a custom linear track" width={720} height={1280} sizes="(min-width:640px) 25vw, 100vw" className="h-64 w-full object-contain sm:h-80" /></Link><div className="self-center p-6 sm:p-8"><h2 className="text-2xl font-semibold">{engineering.siteExample.title}</h2><p className="mt-4 leading-8 text-white/65">{engineering.siteExample.text}</p><div className="mt-6"><CtaLink href={engineering.siteExample.href} variant="secondary">Watch the Site Video</CtaLink></div></div></article>}
        </section>}

        {/* ── Pain Points ── */}
        <section className="section-shell">
          <SectionHeading
            eyebrow="Production pain points"
            title={`Reviewing manual ${page.slug.includes("depalletizing") ? "depalletizing" : page.slug.includes("breaking") ? "bag opening and feeding" : "palletizing"}.`}
            description="These are the recurring problems plant managers and engineers report when they first contact SCR Robot about automating their production line. Identifying the real bottleneck helps engineering design a system that solves the production problem, not just install a robot."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {page.painPoints.map((point) => (
              <PainPointCard
                key={point.title}
                title={point.title}
                text={point.text}
              />
            ))}
          </div>
        </section>

        {/* ── Solution Overview ── */}
        <section className="border-y border-white/10 bg-[#0f1318]">
          <div className="section-shell">
            <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
              <SectionHeading
                eyebrow="SCR Robot solution"
                title={`How the ${page.title.toLowerCase()} works.`}
                description={page.solutionIntro}
              />
              <div className="rounded-lg border border-white/10 bg-black/24 p-5 md:p-7">
                <h2 className="text-xl font-semibold text-white">
                  Typical system scope
                </h2>
                <div className="mt-6 grid gap-3">
                  {page.solutionComponents.map((item) => (
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
        </section>

        {/* ── Materials & Industries ── */}
        <section className="section-shell">
          <SectionHeading
            eyebrow="Materials and industries"
            title="Where this system is applied."
            description="The following materials and industries represent typical applications. SCR Robot evaluates each project against the actual product, line layout, and throughput requirements before recommending a specific configuration."
            align="center"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <IndustrialCard className="p-5 md:p-7">
              <h2 className="text-xl font-semibold text-white">
                Materials handled
              </h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {page.materials.map((material) => (
                  <span
                    key={material}
                    className="rounded-md border border-[#f5b41b]/25 bg-[#f5b41b]/8 px-3 py-1.5 text-xs font-semibold text-[#ffd36b]"
                  >
                    {material}
                  </span>
                ))}
              </div>
            </IndustrialCard>
            <IndustrialCard className="p-5 md:p-7">
              <h2 className="text-xl font-semibold text-white">
                Industries served
              </h2>
              <div className="mt-5 grid gap-2">
                {page.industries.map((industry) => (
                  <p key={industry} className="leading-7 text-white/68">
                    {industry}
                  </p>
                ))}
              </div>
            </IndustrialCard>
          </div>
        </section>

        {/* ── System Configuration ── */}
        <section className="border-y border-white/10 bg-[#0f1318]">
          <div className="section-shell">
            <SectionHeading
              eyebrow="System configuration"
              title="Key parameters confirmed during engineering review."
              description="The values below represent typical project ranges and considerations. Final specifications are confirmed after SCR Robot reviews your product photos, bag data, throughput target, and factory layout."
            />
            <div className="mt-10">
              <IndustrialCard className="overflow-hidden p-0">
                <div className="divide-y divide-white/8 px-5 py-2 md:px-8">
                  {page.systemConfig.map((row) => (
                    <ConfigRow
                      key={row.parameter}
                      parameter={row.parameter}
                      value={row.value}
                    />
                  ))}
                </div>
              </IndustrialCard>
            </div>
          </div>
        </section>

        {/* ── What to Send for Quotation ── */}
        <section className="section-shell">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
            <SectionHeading
              eyebrow="What to send for quotation"
              title="Send these details for a faster engineering response."
              description="Clear project data helps SCR Robot recommend the robot model, gripper type, conveyor layout, safety scope, and budget direction without slow basic clarification."
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
          <div className="mt-10 text-center">
            <CtaLink href="/contact">Send Photos for Engineering Review</CtaLink>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="border-y border-white/10 bg-[#0f1318]">
          <div className="section-shell">
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
              <SectionHeading
                eyebrow="FAQ"
                title="Questions buyers usually ask before requesting a proposal."
                description="These answers help you decide what data to prepare and what to expect from the engineering review process."
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
                    <p className="mt-3 leading-7 text-white/64">
                      {item.answer}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Internal Links ── */}
        <section className="section-shell">
          <SectionHeading
            eyebrow="Explore related pages"
            title="Robot platforms, industries, and case studies."
            description="Continue to product series, industry solutions, or case concepts to build a fuller picture before requesting a quotation."
            align="center"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[...page.internalLinks, ...(engineering?.related ?? [])].filter((link, index, links) => links.findIndex((item) => item.href === link.href) === index).map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="rounded-lg border border-white/10 bg-black/24 p-5 transition hover:border-[#f5b41b]/50 hover:bg-white/[0.055]"
              >
                <div className="mb-5 h-1 w-12 bg-[#f5b41b]" />
                <h2 className="text-xl font-semibold text-white">
                  {link.title}
                </h2>
                <p className="mt-4 leading-7 text-white/62">{link.text}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="border-t border-white/10 bg-[#0c0f13]">
          <div className="section-shell">
            <IndustrialCard className="p-6 md:p-8">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f5b41b]">
                    Project review
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold text-white">
                    Ready to discuss your {page.title.toLowerCase()} project?
                  </h2>
                  <p className="mt-4 max-w-3xl leading-7 text-white/62">
                    Send product photos, bag weight, dimensions, target output,
                    layout, and destination country. SCR Robot will recommend a
                    practical {page.slug.includes("palletizing") && !page.slug.includes("depalletizing") ? "palletizing" : page.slug.includes("breaking") ? "bag breaking and feeding" : "depalletizing"} system scope and the next engineering
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
