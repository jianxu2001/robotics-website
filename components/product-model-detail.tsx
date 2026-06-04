import Image from "next/image";
import Link from "next/link";
import { CtaLink } from "@/components/cta-link";
import { IndustrialCard } from "@/components/industrial-card";
import { SectionHeading } from "@/components/section-heading";
import {
  productModelEnvironment,
  type ProductModel,
} from "@/lib/product-models";
import { getProductModelFaqs } from "@/lib/seo";

type ProductModelDetailProps = {
  model: ProductModel;
};

const benefits = [
  "Reduce manual lifting and repetitive operator fatigue.",
  "Improve shift-to-shift output consistency with repeatable robot motion.",
  "Lower safety risk around palletizing, machine loading, and press-side transfer.",
  "Support project-based integration with grippers, conveyors, guarding, PLC/HMI, and site layout design.",
];

function getProblem(model: ProductModel) {
  if (model.category.toLowerCase().includes("stamping")) {
    return "Stamping and press-side operations expose operators to repetitive motion, tight timing, and high-risk loading zones. Manual transfer can limit throughput and make production harder to stabilize.";
  }

  if (model.category.toLowerCase().includes("six-axis")) {
    return "Factories often need flexible robot motion for part orientation, machine tending, and transfer tasks where simple linear handling cannot reach the required angle or position.";
  }

  if (model.category.toLowerCase().includes("desktop")) {
    return "Small production cells need reliable automation without consuming unnecessary floor space. Manual small-part handling can still create bottlenecks when volume increases.";
  }

  if (model.category.toLowerCase().includes("loading")) {
    return "Machine loading and unloading often depends on operators repeating the same motion beside equipment. This creates labor pressure, idle machine time, and inconsistent handoff timing.";
  }

  return "End-of-line palletizing and material handling are labor-intensive, physically demanding, and difficult to keep consistent across shifts, especially when loads are heavy or cycle times are tight.";
}

function getSolution(model: ProductModel) {
  return `${model.name} uses a ${model.axes}-axis industrial robot structure with ${model.payload} payload and ${model.reach} reach to automate repetitive handling tasks. SCR Robot can integrate the robot with end-of-arm tooling, conveyors, safety guarding, controls, and production-line layout support.`;
}

export function ProductModelDetail({ model }: ProductModelDetailProps) {
  const technicalParameters = [
    { name: "Model", value: model.name },
    { name: "Series", value: model.series },
    { name: "Axes", value: model.axes },
    { name: "Maximum payload", value: model.payload },
    { name: "Reach", value: model.reach },
    { name: "Repeatability", value: model.repeatability },
    { name: "Body weight", value: model.bodyWeight },
    { name: "Power capacity", value: model.power },
  ];

  return (
    <main className="min-h-screen bg-[#080a0d] pt-40 text-white sm:pt-32 lg:pt-28">
      <section className="border-b border-white/10 bg-[#0c0f13]">
        <div className="mx-auto max-w-7xl px-5 py-4 text-xs font-semibold uppercase tracking-[0.08em] text-white/48 lg:px-8">
          <Link href="/products" className="transition hover:text-white">
            Products
          </Link>
          <span className="mx-2 text-white/24">/</span>
          <Link
            href={`/products/${model.seriesSlug}`}
            className="transition hover:text-white"
          >
            {model.series}
          </Link>
          <span className="mx-2 text-white/24">/</span>
          <span className="text-[#f5b41b]">{model.name}</span>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <Image
            src={model.image}
            alt={`${model.name} industrial robot application`}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-26"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,10,13,0.98),rgba(8,10,13,0.74),rgba(8,10,13,0.48))]" />
          <div className="absolute inset-0 industrial-grid opacity-35" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1fr_0.82fr] lg:px-8 lg:py-24">
          <div>
            <p className="font-mono text-sm font-bold uppercase tracking-[0.18em] text-[#f5b41b]">
              {model.category}
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
              {model.name} {model.category}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
              {model.positioning}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <CtaLink href="/contact">Request Model Review</CtaLink>
              <CtaLink href={`/products/${model.seriesSlug}`} variant="secondary">
                View Series
              </CtaLink>
            </div>
          </div>

          <IndustrialCard className="self-end p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Payload", model.payload],
                ["Reach", model.reach],
                ["Axes", model.axes],
                ["Repeatability", model.repeatability],
              ].map(([label, value]) => (
                <div key={label} className="rounded-md border border-white/10 bg-black/24 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-white/42">
                    {label}
                  </p>
                  <p className="mt-2 text-xl font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>
            {model.optionNote ? (
              <p className="mt-4 rounded-md border border-[#f5b41b]/20 bg-[#f5b41b]/8 p-4 text-sm leading-6 text-[#ffd36b]">
                {model.optionNote}
              </p>
            ) : null}
          </IndustrialCard>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            ["Problem", getProblem(model)],
            ["Solution", getSolution(model)],
            ["Benefits", benefits.join(" ")],
          ].map(([title, content]) => (
            <IndustrialCard key={title} className="p-6">
              <div className="mb-5 h-1 w-12 bg-[#f5b41b]" />
              <h2 className="text-2xl font-semibold text-white">{title}</h2>
              <p className="mt-4 leading-7 text-white/66">{content}</p>
            </IndustrialCard>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0f1318]">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Technical parameters"
            title={`${model.name} robot specifications`}
            description="Catalog robot parameters and joint range data for preliminary model comparison. Final selection should be confirmed against tooling, payload center, and production layout."
          />

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <IndustrialCard className="overflow-hidden">
              <div className="border-b border-white/10 px-5 py-4">
                <h2 className="font-semibold text-white">Robot Parameters</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                  <tbody className="divide-y divide-white/8">
                    {technicalParameters.map((item) => (
                      <tr key={item.name} className="odd:bg-white/[0.035]">
                        <th className="w-1/2 px-5 py-4 font-semibold text-white/82">
                          {item.name}
                        </th>
                        <td className="px-5 py-4 text-white/68">{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </IndustrialCard>

            <IndustrialCard className="overflow-hidden">
              <div className="border-b border-white/10 px-5 py-4">
                <h2 className="font-semibold text-white">Joint Parameters</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[420px] border-collapse text-left text-sm">
                  <tbody className="divide-y divide-white/8">
                    {model.jointParameters.map((item) => (
                      <tr key={item.name} className="odd:bg-white/[0.035]">
                        <th className="w-1/3 px-5 py-4 font-semibold text-white/82">
                          {item.name}
                        </th>
                        <td className="px-5 py-4 text-white/68">{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </IndustrialCard>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {productModelEnvironment.map((item) => (
              <div
                key={item.name}
                className="rounded-lg border border-white/10 bg-black/22 p-5"
              >
                <p className="text-sm font-semibold text-white">{item.name}</p>
                <p className="mt-2 text-sm leading-6 text-white/62">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            eyebrow="Applications"
            title="Match this model to your payload, product, and layout."
            description="SCR Robot helps overseas buyers confirm robot payload, reach, tooling, conveyors, safety layout, and cycle-time targets before quotation."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {[...model.applications, ...model.industries].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-white/10 bg-white/[0.045] p-5"
              >
                <div className="mb-4 h-1 w-10 bg-[#d71920]" />
                <h3 className="font-semibold text-white">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0c0f13]">
        <div className="section-shell">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeading
              eyebrow="FAQ"
              title={`Buying notes for ${model.name}.`}
              description="These questions help overseas purchasing managers prepare the basic information needed for model selection and quotation."
            />
            <div className="grid gap-4">
              {getProductModelFaqs(model).map((faq) => (
                <IndustrialCard key={faq.question} className="p-6">
                  <h3 className="font-semibold text-white">{faq.question}</h3>
                  <p className="mt-3 leading-7 text-white/64">{faq.answer}</p>
                </IndustrialCard>
              ))}
            </div>
          </div>

          <IndustrialCard className="mt-12 p-7">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="font-mono text-sm font-bold uppercase tracking-[0.16em] text-[#f5b41b]">
                  Project evaluation
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-white">
                  Send product photos and receive a model selection proposal.
                </h2>
                <p className="mt-4 max-w-3xl leading-7 text-white/64">
                  Include product weight, dimensions, packaging type, target output,
                  pallet size, factory layout, and destination country for a faster
                  quotation.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <CtaLink href="/contact">Get Model Recommendation</CtaLink>
                <CtaLink href="/contact" variant="secondary">
                  Contact SCR Robot
                </CtaLink>
              </div>
            </div>
          </IndustrialCard>
        </div>
      </section>
    </main>
  );
}
