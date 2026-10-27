import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { ProductFinder } from "@/components/product-finder";
import { productGroups, productSeries } from "@/lib/catalog";
import { productGroupsZh } from "@/lib/catalog-zh";
import { productModels } from "@/lib/product-data";
import { toCatalogModel } from "@/lib/product-selection";

export function ProductCatalogPage({ locale = "en" }: { locale?: "en" | "zh" }) {
  const zh = locale === "zh";
  const prefix = zh ? "/zh" : "";
  const groups = zh ? productGroupsZh : productGroups;
  const categories = groups.map(({ slug, title }) => ({ slug, title }));
  return <>
    <SiteHeader locale={locale} alternateHref={zh ? "/products" : "/zh/products"} />
    <main className="min-h-screen bg-[#080a0d] pt-40 text-white sm:pt-32 lg:pt-28">
      <section className="mx-auto max-w-7xl px-4 pb-9 pt-8 sm:px-5 lg:px-8 lg:pt-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f5b41b]">{zh ? "产品中心 / 机器人选型" : "Products / Model selection"}</p>
        <div className="mt-4 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div><h1 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">{zh ? "按工况，找到合适的机器人。" : "Find the right robot for your line."}</h1><p className="mt-4 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">{zh ? "选择用途、输入负载与臂展，缩小候选范围；并排比较参数，再咨询具体型号。" : "Choose your task, narrow by payload and reach, compare candidates, then enquire about a specific model."}</p></div>
          <div className="flex shrink-0 items-center gap-6 text-sm"><div><p className="text-2xl font-semibold text-white">{productModels.length}<span className="ml-1.5 text-xs font-normal text-white/45">{zh ? "款型号" : "models"}</span></p></div><div className="h-8 w-px bg-white/15" /><div><p className="text-2xl font-semibold text-white">{groups.length}<span className="ml-1.5 text-xs font-normal text-white/45">{zh ? "类用途" : "applications"}</span></p></div></div>
        </div>
      </section>
      <section aria-label={zh ? "产品筛选与对比" : "Product filtering and comparison"} className="mx-auto max-w-7xl px-4 pb-14 sm:px-5 lg:px-8">
        <ProductFinder models={productModels.map(toCatalogModel)} categories={categories} locale={locale} />
      </section>
      <section id="robot-series" className="border-t border-white/10 bg-[#0d1218]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-5 lg:grid-cols-[1fr_1.3fr] lg:px-8">
          <div><h2 className="text-xl font-semibold">{zh ? "已经知道系列？" : "Already know your robot family?"}</h2><p className="mt-3 text-sm leading-7 text-white/50">{zh ? "直接查看系列参数，或下载原始产品画册。" : "Go directly to a series, or download the original product catalogs."}</p><div className="mt-5 flex flex-col items-start gap-3 text-sm text-[#ffd36b]"><a href="/catalogs/scr-collaborative-palletizing-packing-2026.pdf" className="underline-offset-4 hover:underline">{zh ? "协作码垛与装箱画册 PDF ↓" : "Collaborative palletizing & packing catalog PDF ↓"}</a><a href="/catalogs/scr-industrial-robots-2026.pdf" className="underline-offset-4 hover:underline">{zh ? "工业机器人画册 PDF ↓" : "Industrial robot catalog PDF ↓"}</a></div></div>
          <div className="flex flex-wrap content-start gap-3">{productSeries.map((series) => <Link key={series.slug} id={series.slug} href={`${prefix}/products/${series.slug}`} className="scroll-mt-44 rounded-lg border border-white/12 bg-white/[0.025] px-4 py-3 text-sm text-white/70 transition hover:border-[#f5b41b]/50 hover:text-[#ffd36b]">{series.series.replace(" Series", zh ? " 系列" : " Series")} ↗</Link>)}</div>
        </div>
      </section>
      <section className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-4 py-12 sm:px-5 md:flex-row md:items-center lg:px-8"><div><h2 className="text-2xl font-semibold">{zh ? "还不确定该选哪款？" : "Need help choosing a model?"}</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-white/50">{zh ? "告诉我们物料重量、夹具、节拍和现场布局，由工程师协助核对配置。" : "Share your product weight, tooling, cycle target and available layout. Our engineers can help review the configuration."}</p></div><Link href={`${prefix}/contact`} className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-lg bg-[#f5b41b] px-6 text-sm font-semibold text-black hover:bg-[#ffca45]">{zh ? "请工程师协助选型" : "Talk to an engineer"} ↗</Link></section>
    </main>
  </>;
}
