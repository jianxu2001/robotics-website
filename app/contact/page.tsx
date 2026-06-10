import type { Metadata } from "next";
import { CtaLink } from "@/components/cta-link";
import { IndustrialCard } from "@/components/industrial-card";
import { InquiryForm } from "@/components/inquiry-form";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { salesEmail, whatsappUrl } from "@/lib/contact";
import { productGroups, productInquiryOptions } from "@/lib/catalog";
import { localizedAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact SCR Robot | Send Product Photo for Robot Recommendation",
  description:
    "Not sure which robot model fits your line? Send product photos, bag/carton size, weight, throughput, and layout. Our engineering team will recommend a practical solution.",
  alternates: localizedAlternates("/contact", "/contact", "/zh/contact"),
};

const quoteChecklist = [
  "Product photos or short video showing your current line and the product to handle",
  "Bag or carton size, unit weight, and packaging type",
  "Required bags or cartons per hour (target throughput and shift schedule)",
  "Pallet size, pallet pattern, and maximum stack height",
  "Existing line layout with infeed/outfeed direction and available floor area",
  "Destination country, voltage requirements, and project timeline",
];

const applicationOptions = [
  "Palletizing",
  "Depalletizing",
  "Stamping / forging",
  "Machine tending",
  "3D vision bag breaking",
  "Conveyor automation",
];

export default function ContactPage() {
  return (
    <>
      <SiteHeader alternateHref="/zh/contact" />
      <main className="min-h-screen bg-[#080a0d] pt-40 text-white sm:pt-32 lg:pt-28">
        <section className="section-shell pb-12">
          <SectionHeading
            eyebrow="Contact sales engineering"
            title="Request a robot automation quote with your project data."
            description="Not sure about the robot model? Send your product photo first and our engineering team will recommend a practical solution. Tell us your product, payload, reach, cycle time, pallet pattern, layout, and destination country."
            level={1}
          />
        </section>

        <section className="section-shell pt-8">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="grid gap-5">
              <IndustrialCard className="p-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f5b41b]">
                  Not sure about the robot model?
                </p>
                <h2 className="mt-4 text-2xl font-semibold text-white">
                  Send your product photo first. Our engineering team will recommend a practical solution.
                </h2>
                <p className="mt-4 leading-7 text-white/62">
                  You do not need to know which robot series fits your line. Share product photos,
                  bag or carton dimensions, unit weight, target throughput, and factory layout.
                  We will map the right robot, gripper, conveyor, and cell layout for your production.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <CtaLink href={`mailto:${salesEmail}?subject=Industrial%20Robot%20Project%20Inquiry`}>
                    Email Project Data
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
                  {productGroups.flatMap((group) => group.productLines).map((line) => (
                    <a
                      key={line.name}
                      href={line.href}
                      className="rounded-md border border-white/10 bg-black/24 px-3 py-2 text-sm text-white/70 transition hover:border-[#f5b41b]/50 hover:text-white"
                    >
                      {line.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <IndustrialCard className="p-6 md:p-8">
              <InquiryForm
                applicationOptions={applicationOptions}
                seriesOptions={productInquiryOptions}
              />
            </IndustrialCard>
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#0f1318]">
          <div className="section-shell">
            <SectionHeading
              eyebrow="What to send for faster quotation"
              title="Send these details and get a practical robot recommendation sooner."
              description="For robot automation, the best quotation starts with product photos, dimensions, weight, output target, pallet data, and factory layout. The more data you share, the more specific the proposal."
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
