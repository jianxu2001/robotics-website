import Image from "next/image";
import type { Metadata } from "next";
import { CtaLink } from "@/components/cta-link";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { whatsappUrl } from "@/lib/contact";
import {
  absoluteUrl,
  canonicalAlternates,
  getBreadcrumbJsonLd,
  getOrganizationJsonLd,
  getWebPageJsonLd,
  serializeJsonLd,
} from "@/lib/seo";

const pagePath = "/products/sch-heavy-duty-palletizing-robots";
const pageTitle =
  "SCH Series Heavy-Duty Four-Axis Palletizing Robots | SCR Robot";
const pageDescription =
  "Explore SCH Series heavy-duty four-axis palletizing robots for 3-800 kg payloads, robotic bag stacking systems, high-payload depalletizing, and end-of-line automation.";

const modelRows = [
  {
    model: "SCH03AE",
    payload: "3",
    reach: "200",
    application: "Desktop handling, compact sorting, and fixture-side transfer",
  },
  {
    model: "SCH10AE",
    payload: "10",
    reach: "1,300",
    application: "Light palletizing, production-side transfer, and small cartons",
  },
  {
    model: "SCH50",
    payload: "50",
    reach: "1,950",
    application: "Robotic bag stacking system for bags, cartons, and cases",
  },
  {
    model: "SCH100",
    payload: "100",
    reach: "1,950",
    application: "Heavy carton palletizing, drums, bundles, and end-of-line loads",
  },
  {
    model: "SCH210E",
    payload: "210",
    reach: "2,350",
    application: "High payload robotic depalletizer and heavy palletizing cells",
  },
  {
    model: "SCH500-800E",
    payload: "500/600/800",
    reach: "3,200/2,800",
    application: "800kg heavy duty palletizing robot for large industrial loads",
  },
];

const fitPoints = [
  {
    title: "Payload coverage up to 800 kg",
    body: "The SCH platform starts with compact handling models and extends to ultra-heavy configurations for large bags, pallet loads, drums, fixtures, and special industrial products.",
  },
  {
    title: "Built around pallet flow",
    body: "Four-axis movement supports efficient end-of-line palletizing and depalletizing layouts where repeatable vertical lifting, long shift operation, and stable stacking are more important than complex wrist motion.",
  },
  {
    title: "Complete cell integration",
    body: "SCR Robot can support gripper design, conveyor infeed, pallet positioning, safety guarding, PLC/HMI control, pallet pattern logic, and project documentation for overseas factories.",
  },
];

const applications = [
  "Bag palletizing for chemical, food ingredient, fertilizer, feed, and building material lines",
  "High payload robotic depalletizer cells for incoming pallets, material feeding, and downstream transfer",
  "Carton, case, drum, and bundled product palletizing at the end of packaging lines",
  "Heavy workpiece loading, stacking, and custom material handling for industrial production",
];

const projectInputs = [
  "Product type, dimensions, unit weight, and packaging photos",
  "Target output per hour, shift schedule, and available cycle time",
  "Pallet size, stack height, pallet pattern, and infeed/outfeed direction",
  "Factory layout, safety expectations, voltage, air supply, and destination country",
];

const pageUrl = absoluteUrl(pagePath);
const jsonLd = [
  getOrganizationJsonLd(),
  getBreadcrumbJsonLd(pageUrl, [
    { name: "Home", url: absoluteUrl("/") },
    { name: "Products", url: absoluteUrl("/products") },
    { name: "SCH Heavy-Duty Palletizing Robots", url: pageUrl },
  ]),
  getWebPageJsonLd({
    url: pageUrl,
    name: pageTitle,
    description: pageDescription,
    image: absoluteUrl("/images/bejing1%20(2).jpg"),
  }),
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "SCH Series Heavy-Duty Four-Axis Palletizing Robots",
    brand: {
      "@type": "Brand",
      name: "SCR Robot",
    },
    description: pageDescription,
    category: "Industrial palletizing robot",
    url: pageUrl,
  },
];

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "800kg heavy duty palletizing robot",
    "High payload robotic depalletizer",
    "Robotic bag stacking system",
    "SCH Series palletizing robot",
    "four-axis palletizing robot",
  ],
  alternates: canonicalAlternates(pagePath),
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    images: ["/images/bejing1%20(2).jpg"],
    type: "website",
  },
};

export default function SchHeavyDutyPalletizingRobotsPage() {
  return (
    <>
      {jsonLd.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(item) }}
        />
      ))}
      <SiteHeader alternateHref="/zh/products/sch-series" />
      <main className="min-h-screen bg-[#080a0d] pt-40 text-white sm:pt-32 lg:pt-28">
        <section className="relative border-b border-white/10">
          <div className="absolute inset-0">
            <Image
              src="/images/bejing1%20(2).jpg"
              alt="SCH Series heavy-duty four-axis palletizing robot cell"
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-38"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,10,13,0.98),rgba(8,10,13,0.74),rgba(8,10,13,0.42))]" />
            <div className="absolute inset-0 industrial-grid opacity-40" />
          </div>

          <div className="relative mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
            <p className="font-mono text-sm font-bold uppercase tracking-[0.18em] text-[#f5b41b]">
              SCH Series
            </p>
            <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-tight md:text-6xl">
              SCH Series Heavy-Duty Four-Axis Palletizing Robots
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
              The SCR Robot SCH Series is built for factories that need dependable
              palletizing, depalletizing, bag stacking, and heavy material
              handling from compact 3 kg workstations up to an 800kg heavy duty
              palletizing robot for large industrial loads.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <CtaLink href={whatsappUrl}>Request Project Proposal</CtaLink>
              <CtaLink href="/products/sch-series" variant="secondary">
                View SCH Catalog Models
              </CtaLink>
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Payload range", "3-800 kg"],
              ["Reach range", "200-3,200 mm"],
              ["Robot type", "Four-axis palletizing"],
              ["System scope", "Robot, gripper, conveyors, guarding"],
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
                eyebrow="Product overview"
                title="Heavy-duty palletizing robots for demanding factory lines."
                description="The SCH Series is positioned for B2B buyers who need more than a robot arm. SCR Robot reviews product weight, stack height, cycle time, gripper requirements, and line layout before recommending a complete palletizing or depalletizing solution."
              />
              <div className="grid gap-4">
                {fitPoints.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-lg border border-white/10 bg-black/22 p-5"
                  >
                    <div className="mb-4 h-1 w-12 bg-[#f5b41b]" />
                    <h3 className="text-xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 leading-7 text-white/68">{item.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell">
          <SectionHeading
            eyebrow="Model comparison"
            title="SCH Series technical data for project screening."
            description="Use this table to compare representative SCH models before sharing your product dimensions, load weight, pallet pattern, and factory layout for engineering confirmation."
          />
          <div className="mt-10 min-w-0 max-w-full overflow-hidden rounded-lg border border-white/10">
            <div className="min-w-0 max-w-full overflow-x-auto">
              <table className="min-w-[760px] w-full border-collapse text-left text-sm">
                <caption className="sr-only">
                  SCH Series model comparison by payload, reach, and primary
                  application.
                </caption>
                <thead className="bg-[#151b21] text-xs uppercase tracking-[0.14em] text-white/50">
                  <tr>
                    <th scope="col" className="border-b border-white/10 px-4 py-4">
                      Model
                    </th>
                    <th scope="col" className="border-b border-white/10 px-4 py-4">
                      Payload (kg)
                    </th>
                    <th scope="col" className="border-b border-white/10 px-4 py-4">
                      Reach (mm)
                    </th>
                    <th scope="col" className="border-b border-white/10 px-4 py-4">
                      Primary Application
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/8 bg-[#0c1014] text-white/72">
                  {modelRows.map((row) => (
                    <tr key={row.model} className="transition hover:bg-white/[0.04]">
                      <th
                        scope="row"
                        className="px-4 py-4 font-mono font-semibold text-[#f5b41b]"
                      >
                        {row.model}
                      </th>
                      <td className="px-4 py-4">{row.payload}</td>
                      <td className="px-4 py-4">{row.reach}</td>
                      <td className="px-4 py-4">{row.application}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#10151a]">
          <div className="section-shell">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <SectionHeading
                eyebrow="Applications"
                title="From robotic bag stacking systems to high-payload depalletizing."
                description="SCH robots are selected for repetitive, heavy, and labor-intensive material handling where consistent stack quality and safe movement matter across every shift."
              />
              <div className="grid gap-3 sm:grid-cols-2">
                {applications.map((application) => (
                  <article
                    key={application}
                    className="rounded-lg border border-white/10 bg-white/[0.045] p-5"
                  >
                    <div className="mb-5 h-1 w-12 bg-[#d71920]" />
                    <h3 className="font-semibold leading-7 text-white">
                      {application}
                    </h3>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <SectionHeading
                eyebrow="Project engineering"
                title="Turn the SCH robot body into a complete automation cell."
                description="A palletizing robot project depends on load center, gripper design, product stability, pallet pattern, conveyor timing, and site safety. SCR Robot can prepare a project proposal around the full working cell instead of only quoting a model number."
              />
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {projectInputs.map((item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-white/10 bg-white/[0.045] p-5 leading-7 text-white/68"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <aside className="steel-panel p-6 md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f5b41b]">
                Request proposal
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-white">
                Send your load data for SCH model selection.
              </h2>
              <p className="mt-5 leading-8 text-white/68">
                Share your product photos, payload, pallet size, target
                throughput, and factory layout. SCR Robot will review whether
                an SCH50, SCH100, SCH210E, or SCH500-800E platform is the best
                fit for your palletizing or depalletizing cell.
              </p>
              <div className="mt-8">
                <CtaLink href={whatsappUrl} className="w-full">
                  Request Project Proposal
                </CtaLink>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
