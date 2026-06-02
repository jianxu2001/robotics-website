import Image from "next/image";
import Link from "next/link";
import { CtaLink } from "@/components/cta-link";
import { ProductParameterTabs } from "@/components/product-parameter-tabs";
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

      <section className="relative overflow-hidden border-b border-white/10 bg-[#080a0d]">
        <div className="absolute inset-0 industrial-grid opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(245,180,27,0.16),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent_42%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[0.76fr_1.24fr] lg:items-center lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#f5b41b]">
              {category}
            </p>
            <h1 className="mt-5 text-4xl font-semibold tracking-normal text-white md:text-6xl">
              {model.name}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/64">
              {title}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CtaLink href={contactHref}>{t.request}</CtaLink>
              <CtaLink href={seriesHref} variant="secondary">
                {t.back}
              </CtaLink>
            </div>
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-lg border border-white/10 bg-white shadow-[0_30px_90px_rgba(0,0,0,0.42)] sm:min-h-[430px] lg:min-h-[540px]">
            <Image
              src={model.image}
              alt={`${model.name} robot`}
              fill
              priority
              unoptimized
              sizes="(min-width: 1024px) 760px, 92vw"
              className="object-contain p-6 sm:p-8"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            {specCards.map(([label, value]) => (
              <div
                key={label}
                className="rounded-md border border-white/10 bg-white/[0.055] p-5 shadow-[0_18px_48px_rgba(0,0,0,0.18)]"
              >
                <p className="text-sm text-white/46">{label}</p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProductParameterTabs
        robotRows={robotRows}
        jointRows={model.jointParameters}
        isZh={isZh}
        labels={{
          detail: t.detail,
          robot: t.robot,
          joints: t.joints,
          item: t.item,
          value: t.value,
          axis: t.axis,
          range: t.range,
        }}
      />

      <section className="border-t border-white/10 bg-[#080a0d]">
        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
          <div className="grid gap-4 rounded-lg border border-white/10 bg-white/[0.045] p-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="font-semibold text-white">{t.catalog}</p>
              <p className="mt-2 text-sm leading-6 text-white/56">{t.note}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <CtaLink href={contactHref}>{t.request}</CtaLink>
              <Link
                href={model.catalogPage}
                className="inline-flex items-center justify-center rounded-md border border-white/12 bg-white/5 px-5 py-3 text-sm font-bold text-white/72 transition hover:border-[#f5b41b]/55 hover:text-white"
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
