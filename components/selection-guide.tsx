import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { CtaLink } from "@/components/cta-link";
import { getProductModelsBySeries } from "@/lib/product-data";
import { guidePath, selectionGuides, type GuideLocale, type SelectionGuide } from "@/lib/selection-guides";
import { absoluteUrl, getBreadcrumbJsonLd, getOrganizationJsonLd, getWebPageJsonLd, localizedAlternates, serializeJsonLd } from "@/lib/seo";

export function getGuideMetadata(guide: SelectionGuide, locale: GuideLocale): Metadata {
  const copy = guide.content[locale];
  return {
    title: `${copy.title} | SCR Robot`,
    description: copy.description,
    alternates: localizedAlternates(guidePath(guide.slug, locale), guidePath(guide.slug, "en"), guidePath(guide.slug, "zh")),
    openGraph: { title: copy.title, description: copy.description, url: absoluteUrl(guidePath(guide.slug, locale)), images: [guide.image], locale: locale === "zh" ? "zh_CN" : "en_US", type: "website" },
  };
}

export function RelatedSelectionGuides({ seriesSlug, locale = "en" }: { seriesSlug: string; locale?: GuideLocale }) {
  const guides = selectionGuides.filter((guide) => guide.seriesSlugs.includes(seriesSlug));
  if (!guides.length) return null;
  const zh = locale === "zh";
  return (
    <section className="section-shell border-t border-white/10">
      <h2 className="text-2xl font-semibold text-white">{zh ? "选型指南" : "Selection guides"}</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {guides.map((guide) => <Link key={guide.slug} href={guidePath(guide.slug, locale)} className="rounded-lg border border-white/10 bg-white/[0.035] p-6 transition hover:border-[#f5b41b]/60"><h3 className="text-lg font-semibold text-[#f5b41b]">{guide.content[locale].title} →</h3><p className="mt-3 text-sm leading-7 text-white/65">{guide.content[locale].description}</p></Link>)}
      </div>
    </section>
  );
}

function CrComparison({ locale }: { locale: GuideLocale }) {
  const zh = locale === "zh";
  const models = getProductModelsBySeries("cr-series");
  const headings = zh ? ["型号", "最大负载", "臂展", "轴数", "升降行程"] : ["Model", "Max. payload", "Reach", "Axes", "Lifting stroke"];
  return (
    <div className="mt-6 overflow-x-auto rounded-lg border border-white/15" role="region" aria-label={zh ? "CR 型号参数对比，可横向滚动" : "CR model comparison, scroll horizontally"} tabIndex={0}>
      <table className="w-full min-w-[650px] border-collapse text-left text-sm">
        <caption className="bg-[#11161b] px-5 py-4 text-left font-semibold text-white">{zh ? "CR 工作站画册参数对比" : "CR workstation catalog comparison"}</caption>
        <thead><tr className="border-y border-white/10 bg-white/[0.05]">{headings.map((heading) => <th key={heading} scope="col" className="px-5 py-4 font-semibold text-white">{heading}</th>)}</tr></thead>
        <tbody>{models.map((model) => {
          const lift = model.specifications?.find((item) => item.name === "Lifting stroke");
          return <tr key={model.slug} className="border-b border-white/10 last:border-0"><th scope="row" className="whitespace-nowrap px-5 py-4 font-semibold"><Link className="text-[#f5b41b] underline decoration-[#f5b41b]/35 underline-offset-4 hover:decoration-current" href={`${zh ? "/zh" : ""}/products/${model.seriesSlug}/${model.slug}`}>{model.name}</Link></th><td className="px-5 py-4">{model.payload}</td><td className="whitespace-nowrap px-5 py-4">{model.reach}</td><td className="px-5 py-4">{model.axes}</td><td className="px-5 py-4">{zh ? lift?.valueZh ?? lift?.value : lift?.value}</td></tr>;
        })}</tbody>
      </table>
    </div>
  );
}

export function SelectionGuidePage({ guide, locale }: { guide: SelectionGuide; locale: GuideLocale }) {
  const copy = guide.content[locale];
  const zh = locale === "zh";
  const prefix = zh ? "/zh" : "";
  const url = absoluteUrl(guidePath(guide.slug, locale));
  const structuredData = [
    getOrganizationJsonLd(),
    getBreadcrumbJsonLd(url, [{ name: zh ? "首页" : "Home", url: absoluteUrl(prefix || "/") }, { name: zh ? "选型指南" : "Selection guides", url: absoluteUrl(`${prefix}/guides`) }, { name: copy.title, url }]),
    { ...getWebPageJsonLd({ url, name: copy.title, description: copy.description, image: absoluteUrl(guide.image) }), inLanguage: zh ? "zh-CN" : "en" },
  ];
  return (
    <>
      {structuredData.map((data, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />)}
      <SiteHeader locale={locale} alternateHref={guidePath(guide.slug, zh ? "en" : "zh")} />
      <main className="min-h-screen bg-[#080a0d] pt-40 text-white sm:pt-32 lg:pt-28" lang={zh ? "zh-CN" : "en"}>
        <article>
          <header className="border-b border-white/10">
            <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 lg:grid-cols-[1.4fr_0.6fr] lg:px-8 lg:py-16">
              <div><Link href={`${prefix}/guides`} className="text-sm text-[#f5b41b]">← {zh ? "全部选型指南" : "All selection guides"}</Link><h1 className="mt-7 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">{copy.title}</h1><p className="mt-6 text-lg leading-8 text-white/70">{copy.intro}</p><p className="mt-6 text-sm text-white/45">SCR Robot · {zh ? "依据 2026 产品画册整理" : "Based on the 2026 product catalog"}</p></div>
              <Image src={guide.image} alt={zh ? "SCR CR 系列协作码垛工作站" : "SCR CR collaborative palletizing workstation"} width={720} height={720} sizes="(min-width:1024px) 30vw, 100vw" priority className="mx-auto h-auto max-h-80 w-full object-contain" />
            </div>
          </header>
          <div className="mx-auto max-w-5xl px-5 py-10 lg:px-8 lg:py-14">
            <p className="border-l-2 border-[#f5b41b] bg-white/[0.04] p-6 text-lg leading-8 text-white/85">{copy.takeaway}</p>
            <nav aria-label={zh ? "本文目录" : "On this page"} className="mt-8 rounded-lg border border-white/10 p-5"><p className="text-sm font-semibold text-[#f5b41b]">{zh ? "本文内容" : "On this page"}</p><ul className="mt-3 grid gap-3 text-sm sm:grid-cols-2">{copy.sections.map((section) => <li key={section.id}><a href={`#${section.id}`} className="text-white/70 hover:text-white">{section.title}</a></li>)}</ul></nav>
            {copy.comparison && <div className="mt-10 overflow-x-auto rounded-lg border border-white/10" role="region" aria-label={zh ? "方案对比，可横向滚动" : "Platform comparison, scroll horizontally"} tabIndex={0}><table className="w-full min-w-[650px] text-left text-sm"><caption className="bg-[#11161b] p-5 text-left font-semibold">{zh ? "两类码垛方案的评估重点" : "What to compare across the two approaches"}</caption><thead><tr className="border-y border-white/10">{copy.comparison.headings.map((heading) => <th scope="col" key={heading} className="px-5 py-4 text-[#f5b41b]">{heading}</th>)}</tr></thead><tbody>{copy.comparison.rows.map((row) => <tr key={row[0]} className="border-b border-white/10 last:border-0">{row.map((cell, index) => index === 0 ? <th scope="row" key={index} className="px-5 py-4 font-medium text-white">{cell}</th> : <td key={index} className="px-5 py-4 leading-7 text-white/70">{cell}</td>)}</tr>)}</tbody></table></div>}
            {copy.sections.map((section) => <section key={section.id} id={section.id} className="scroll-mt-40 border-b border-white/10 py-10"><h2 className="text-2xl font-semibold leading-snug">{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-5 leading-8 text-white/70">{paragraph}</p>)}{guide.compareCrModels && section.id === "compare-configurations" && <CrComparison locale={locale} />}{section.checklist && <ul className="mt-6 grid list-disc gap-3 pl-5 text-white/75">{section.checklist.map((item) => <li key={item} className="pl-1 leading-7">{item}</li>)}</ul>}</section>)}
            <aside className="mt-8 rounded-lg border border-white/10 p-5"><p className="text-sm leading-7 text-white/55">{copy.sourceNote}</p><a href="/catalogs/scr-collaborative-palletizing-packing-2026.pdf" className="mt-3 inline-block text-sm text-[#f5b41b] underline underline-offset-4">{zh ? "查看协作码垛与装箱原始画册 PDF" : "View the original palletizing & packing catalog PDF"}</a></aside>
            <section className="mt-12"><h2 className="text-2xl font-semibold">{zh ? "相关产品与方案" : "Related products and applications"}</h2><div className="mt-6 grid gap-4 sm:grid-cols-2">{copy.related.map((item) => <Link key={item.href} href={item.href} className="rounded-lg border border-white/10 p-5 transition hover:border-[#f5b41b]/60"><h3 className="font-semibold text-[#f5b41b]">{item.title} →</h3><p className="mt-3 text-sm leading-7 text-white/65">{item.text}</p></Link>)}</div></section>
            <section className="mt-12 rounded-lg border border-[#f5b41b]/30 bg-[#11161b] p-6 sm:p-8"><h2 className="text-2xl font-semibold">{zh ? "把产线条件发给我们，核对适合的配置" : "Match a workstation to your production line"}</h2><p className="mt-4 leading-8 text-white/65">{zh ? "提供产品尺寸、重量范围、目标产量、托盘信息和布局，即可围绕实际任务沟通型号、工装与配套范围。" : "Send product dimensions, weight range, target output, pallet details and a layout to discuss the model, tooling and integration scope for the actual task."}</p><div className="mt-6"><CtaLink href={`${prefix}/contact#inquiry`}>{zh ? "咨询选型" : "Request Selection Help"}</CtaLink></div></section>
          </div>
        </article>
      </main>
    </>
  );
}

export function SelectionGuidesIndex({ locale }: { locale: GuideLocale }) {
  const zh = locale === "zh";
  return <><SiteHeader locale={locale} alternateHref={zh ? "/guides" : "/zh/guides"} /><main lang={zh ? "zh-CN" : "en"} className="min-h-screen bg-[#080a0d] pb-16 pt-40 text-white sm:pt-32 lg:pt-28"><section className="section-shell"><p className="text-sm font-semibold uppercase tracking-widest text-[#f5b41b]">SCR Robot</p><h1 className="mt-5 text-4xl font-semibold sm:text-5xl">{zh ? "机器人选型指南" : "Robot Selection Guides"}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-white/65">{zh ? "从搬运对象、负载、工作范围与产线布局出发，比较机器人及工作站配置。" : "Compare robot platforms and workstation configurations using product, payload, working envelope and line-layout requirements."}</p><div className="mt-10 grid gap-6 md:grid-cols-2">{selectionGuides.map((guide) => <Link key={guide.slug} href={guidePath(guide.slug, locale)} className="rounded-lg border border-white/10 bg-[#11161b] p-6 transition hover:border-[#f5b41b]/60"><h2 className="text-2xl font-semibold leading-snug">{guide.content[locale].title}</h2><p className="mt-5 leading-8 text-white/65">{guide.content[locale].description}</p><span className="mt-6 inline-block font-semibold text-[#f5b41b]">{zh ? "阅读指南" : "Read guide"} →</span></Link>)}</div></section></main></>;
}
