import { isProductRender } from "@/lib/product-media";
import { RelatedSelectionGuides } from "@/components/selection-guide";
import { cr50lCasePaths } from "@/lib/cr50l-case";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaLink } from "@/components/cta-link";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { SpecTable } from "@/components/spec-table";
import { productSeries } from "@/lib/catalog";
import { photoContactLinks, projectContactHref } from "@/lib/contact-context";
import { getProductModelsBySeries } from "@/lib/product-data";
import {
  getProductSeriesMetaDescription,
  getProductSeriesMetaTitle,
  getProductSeriesStructuredData,
  localizedAlternates,
  serializeJsonLd,
} from "@/lib/seo";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return productSeries.map((series) => ({ slug: series.slug }));
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const series = productSeries.find((item) => item.slug === slug);

  if (!series) {
    return {};
  }

  return {
    title: getProductSeriesMetaTitle(series),
    description: getProductSeriesMetaDescription(series),
    openGraph: {
      title: getProductSeriesMetaTitle(series),
      description: getProductSeriesMetaDescription(series),
      images: [series.image],
      type: "website",
    },
    alternates: localizedAlternates(
      `/products/${series.slug}`,
      `/products/${series.slug}`,
      `/zh/products/${series.slug}`,
    ),
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const series = productSeries.find((item) => item.slug === slug);

  if (!series) {
    notFound();
  }

  const structuredData = getProductSeriesStructuredData(series);
  const isCrSeries = series.slug === "cr-series";
  const seriesPath = `/products/${series.slug}`;
  const crQuote = projectContactHref(seriesPath, "carton-palletizing");
  const crPhotos = photoContactLinks("en", { sourcePath: seriesPath, topic: "carton-palletizing" });

  return (
    <>
      {structuredData.map((jsonLd, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />
      ))}
      <SiteHeader alternateHref={`/zh/products/${series.slug}`} />
      <main className="min-h-screen bg-[#080a0d] pt-40 text-white sm:pt-32 lg:pt-28">
        <section className="relative border-b border-white/10">
          <div className="absolute inset-0">
            <Image
              src={series.image}
              alt={`${series.series} industrial robot`}
              fill
              priority
              sizes="100vw"
              className={isProductRender(series.image) ? "object-contain object-right p-6 opacity-36" : "object-cover opacity-36"}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,10,13,0.98),rgba(8,10,13,0.7),rgba(8,10,13,0.42))]" />
            <div className="absolute inset-0 industrial-grid opacity-40" />
          </div>
          <div className="relative mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
            <p className="font-mono text-sm font-bold uppercase tracking-[0.18em] text-[#f5b41b]">
              {series.series}
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
              {series.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
              {series.summary}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              {isCrSeries ? (
                <>
                  <CtaLink href={crQuote}>Request a Palletizer Quote</CtaLink>
                  <CtaLink href="#compare-cr-models" variant="secondary">Compare the Four Models</CtaLink>
                  <CtaLink href={crPhotos.whatsapp} variant="ghost">Send Details on WhatsApp</CtaLink>
                </>
              ) : (
                <>
                  <CtaLink href="/contact">Request Model Selection</CtaLink>
                  <CtaLink href="/products" variant="secondary">Back to Products</CtaLink>
                </>
              )}
              {series.slug === "sch-series" ? <CtaLink href="/products/sch-heavy-duty-palletizing-robots" variant="ghost">Heavy-Duty Palletizing Guide</CtaLink> : null}
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Category", series.category],
              ["Payload", series.payloadRange],
              ["Reach", series.reachRange],
              ["Repeatability", series.repeatability],
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
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
              <SectionHeading
                eyebrow="Product highlights"
                title="Engineered for factory-grade automation."
                description="Compare the model specifications below, then review tooling, payload and layout requirements with our engineering team."
              />
              <div className="grid gap-4">
                {series.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="rounded-lg border border-white/10 bg-black/22 p-5"
                  >
                    <div className="mb-4 h-1 w-12 bg-[#f5b41b]" />
                    <p className="leading-7 text-white/70">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id={isCrSeries ? "compare-cr-models" : undefined} className="section-shell scroll-mt-44 lg:scroll-mt-28">
          <SectionHeading
            eyebrow="Model specifications"
            title={isCrSeries ? "Compare CR30, CR30L, CR50 and CR50L" : `${series.series} catalog models`}
            description={isCrSeries
              ? "Choose by carton weight, tooling and target stack height. Maximum payload and palletizing height are catalog values. Send your carton dimensions, weight and target output so we can confirm a configuration."
              : "Representative technical data extracted from the product catalog and rewritten for international buyers."}
          />
          <div className="mt-10">
            <SpecTable
              series={series}
              models={getProductModelsBySeries(series.slug)}
              enableModelLinks
            />
          </div>
          {isCrSeries && (
            <Link href={cr50lCasePaths.en} className="mt-6 inline-flex font-semibold text-[#ffd36b] underline underline-offset-4">
              View the CR50L lifting configuration
            </Link>
          )}
        </section>

        {isCrSeries && (
          <section className="border-t border-white/10 bg-[#0f1318]">
            <div className="section-shell grid items-start gap-8 lg:grid-cols-2">
              <div>
                <h2 className="text-2xl font-semibold text-white">What the CR30 workstation includes</h2>
                <p className="mt-4 max-w-2xl leading-7 text-white/70">
                  The fixed-base CR30 is quoted as one integrated package with the robot, base,
                  control cabinet, controls, operating and programming software, and an end-of-arm tool.
                  We select vacuum tooling or a gripper to suit the carton. Ask about a lifting model
                  if your line needs a taller stack.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white">Get a model recommendation</h2>
                <p className="mt-4 max-w-2xl leading-7 text-white/70">
                  Start with carton size, weight and target cartons per minute. A line photo or short video helps.
                  If you are a distributor or system integrator, add your market and application to the enquiry.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <CtaLink href={crQuote}>Send Carton Details</CtaLink>
                  <CtaLink href="/solutions/robotic-carton-palletizing-system" variant="secondary">Explore the Carton Palletizing System</CtaLink>
                  <Link href="/products/br-series" className="inline-flex items-center px-3 py-2 text-sm font-semibold text-[#ffd36b] underline underline-offset-4">
                    Explore BR Case Packers
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="border-t border-white/10 bg-[#0c0f13]">
          <div className="section-shell">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <SectionHeading
                eyebrow="Applications"
                title="Where this series fits."
                description="Send product dimensions, payload, gripper needs, cycle time, safety layout, and upstream/downstream equipment so engineering can confirm model fit."
              />
              <div className="grid gap-3 sm:grid-cols-2">
                {series.applications.map((application) => (
                  <div
                    key={application}
                    className="rounded-lg border border-white/10 bg-white/[0.045] p-5"
                  >
                    <h3 className="font-semibold text-white">{application}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <RelatedSelectionGuides seriesSlug={series.slug} />
      </main>
    </>
  );
}
