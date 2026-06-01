import Image from "next/image";
import Link from "next/link";
import { CtaLink } from "@/components/cta-link";
import type { ProductModel } from "@/lib/product-models";

type ProductModelDetailProps = {
  model: ProductModel;
  locale?: "en" | "zh";
};

const copy = {
  en: {
    products: "Products",
    category: "Robot category",
    request: "Get Quote",
    back: "Back to Series",
    reach: "Maximum Reach",
    payload: "Maximum Payload",
    axes: "Axes",
    weight: "Body Weight",
    detail: "Detailed Parameters",
    robot: "Robot Parameters",
    joints: "Joint Parameters",
    item: "Item",
    value: "Value",
    axis: "Axis",
    range: "Motion Range",
    catalog: "Catalog source",
    catalogText: "View the original catalog page",
    note: "Only robot parameters and joint parameters are shown here, following the requested product-detail structure.",
  },
  zh: {
    products: "产品中心",
    category: "机器人类别",
    request: "获取报价",
    back: "返回系列",
    reach: "最大臂展",
    payload: "最大负载",
    axes: "轴数",
    weight: "本体重量",
    detail: "详细参数",
    robot: "机器人参数",
    joints: "关节参数",
    item: "项目",
    value: "参数",
    axis: "轴",
    range: "动作范围",
    catalog: "画册来源",
    catalogText: "查看原始画册页面",
    note: "本页按要求仅保留机器人参数与关节参数，便于客户快速选型。",
  },
};

function findValue(model: ProductModel, label: string) {
  return model.robotParameters.find((row) => row.label === label)?.value ?? "-";
}

export function ProductModelDetail({
  model,
  locale = "en",
}: ProductModelDetailProps) {
  const t = copy[locale];
  const isZh = locale === "zh";
  const productsHref = isZh ? "/zh/products" : "/products";
  const seriesHref = `${productsHref}/${model.seriesSlug}`;
  const contactHref = isZh ? "/zh/contact" : "/contact";
  const title = isZh ? model.titleZh : model.title;
  const category = isZh ? model.categoryZh : model.category;
  const robotRows = model.robotParameters;
  const specCards = [
    [t.reach, findValue(model, "Maximum Reach")],
    [t.payload, findValue(model, "Maximum Payload")],
    [t.axes, findValue(model, "Axes")],
    [t.weight, findValue(model, "Body Weight")],
  ];

  return (
    <main className="min-h-screen bg-[#080a0d] pt-40 text-white sm:pt-32 lg:pt-28">
      <section className="border-b border-white/10 bg-[#11161b]">
        <div className="mx-auto max-w-7xl px-5 py-5 text-sm text-white/58 lg:px-8">
          <Link href={productsHref} className="transition hover:text-white">
            {t.products}
          </Link>
          <span className="mx-2 text-white/28">/</span>
          <Link href={seriesHref} className="transition hover:text-white">
            {model.series}
          </Link>
          <span className="mx-2 text-white/28">/</span>
          <span className="text-white">{model.name}</span>
        </div>
      </section>

      <section className="bg-[#f5f6f8] text-[#10151b]">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#009da5]">
              {category}
            </p>
            <h1 className="mt-5 text-4xl font-semibold tracking-normal text-[#111820] md:text-6xl">
              {model.name}
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-[#48525d]">
              {title}
            </p>
          </div>

          <div className="relative mx-auto mt-10 h-[320px] max-w-4xl sm:h-[420px] lg:h-[500px]">
            <Image
              src={model.image}
              alt={`${model.name} robot`}
              fill
              priority
              sizes="(min-width: 1024px) 720px, 92vw"
              className="object-contain"
            />
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {specCards.map(([label, value]) => (
              <div
                key={label}
                className="rounded-md border border-[#d9dee4] bg-white p-5 shadow-[0_18px_48px_rgba(11,18,26,0.08)]"
              >
                <p className="text-sm text-[#697480]">{label}</p>
                <p className="mt-2 text-2xl font-semibold text-[#10151b]">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white text-[#10151b]">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
          <div className="border-b border-[#d9dee4]">
            <div className="flex flex-wrap items-end justify-center gap-8">
              <div className="border-b-2 border-[#009da5] px-4 pb-5 text-2xl font-medium text-[#009da5]">
                {t.detail}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-8 text-lg">
            <span className="border-b-2 border-[#009da5] pb-2 font-semibold">
              {t.robot}
            </span>
            <span className="pb-2 text-[#4c5661]">{t.joints}</span>
          </div>

          <div className="mt-8 grid min-w-0 gap-10">
            <section className="min-w-0">
              <h2 className="mb-5 text-2xl font-semibold">{t.robot}</h2>
              <div className="min-w-0 max-w-full overflow-hidden rounded-md border border-[#d9dee4]">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[520px] border-collapse text-left text-base">
                    <thead className="bg-[#f2f4f6]">
                      <tr>
                        <th className="border-b border-r border-[#d9dee4] px-5 py-4">
                          {t.item}
                        </th>
                        <th className="border-b border-[#d9dee4] px-5 py-4">
                          {t.value}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {robotRows.map((row) => (
                        <tr key={row.label} className="odd:bg-white even:bg-[#f6f7f8]">
                          <td className="border-r border-[#d9dee4] px-5 py-4 font-medium">
                            {isZh ? row.labelZh : row.label}
                          </td>
                          <td className="px-5 py-4">{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section className="min-w-0">
              <h2 className="mb-5 text-2xl font-semibold">{t.joints}</h2>
              <div className="min-w-0 max-w-full overflow-hidden rounded-md border border-[#d9dee4]">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[420px] border-collapse text-left text-base">
                    <thead className="bg-[#f2f4f6]">
                      <tr>
                        <th className="border-b border-r border-[#d9dee4] px-5 py-4">
                          {t.axis}
                        </th>
                        <th className="border-b border-[#d9dee4] px-5 py-4">
                          {t.range}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {model.jointParameters.map((joint) => (
                        <tr key={joint.axis} className="odd:bg-white even:bg-[#f6f7f8]">
                          <td className="border-r border-[#d9dee4] px-5 py-4 font-medium">
                            {joint.axis}
                          </td>
                          <td className="px-5 py-4">{joint.range}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-10 grid gap-4 rounded-md border border-[#d9dee4] bg-[#f5f6f8] p-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="font-semibold text-[#10151b]">{t.catalog}</p>
              <p className="mt-2 text-sm leading-6 text-[#5a6570]">{t.note}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <CtaLink href={contactHref}>{t.request}</CtaLink>
              <Link
                href={model.catalogPage}
                className="inline-flex items-center justify-center rounded-md border border-[#cfd6dd] bg-white px-5 py-3 text-sm font-bold text-[#10151b] transition hover:border-[#009da5] hover:text-[#009da5]"
              >
                {t.catalogText}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
