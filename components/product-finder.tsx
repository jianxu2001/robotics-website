"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { filterCatalogModels, modelInquiryHref, type CatalogModel, type ProductFilters } from "@/lib/product-selection";

type Category = { slug: string; title: string };
const emptyFilters = { query: "", minPayload: "", minReach: "", sort: "recommended" };
function subscribeHash(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}
const readHash = () => window.location.hash.slice(1);
const serverHash = () => "";

export function ProductFinder({ models, categories, locale = "en" }: { models: CatalogModel[]; categories: Category[]; locale?: "en" | "zh" }) {
  const zh = locale === "zh";
  const prefix = zh ? "/zh" : "";
  const hash = useSyncExternalStore(subscribeHash, readHash, serverHash);
  const category = categories.some((item) => item.slug === hash) ? hash : "";
  const [filters, setFilters] = useState(emptyFilters);
  const [limit, setLimit] = useState(12);
  const [comparison, setComparison] = useState<string[]>([]);
  const results = filterCatalogModels(models, { ...filters, category });
  const selected = comparison.map((slug) => models.find((model) => model.slug === slug)!).filter(Boolean);
  const categoryName = (model: CatalogModel) => categories.find((item) => item.slug === model.categoryId)?.title ?? model.series;
  function update(key: keyof Omit<ProductFilters, "category">, value: string) {
    setFilters((previous) => ({ ...previous, [key]: value }));
    setLimit(12);
  }
  function clear() {
    setFilters(emptyFilters);
    setLimit(12);
    window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}#model-finder`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }
  function toggle(slug: string) {
    setComparison((previous) => previous.includes(slug) ? previous.filter((item) => item !== slug) : previous.length < 3 ? [...previous, slug] : previous);
  }
  const control = "mt-2 h-12 w-full rounded-lg border border-white/15 bg-[#0b0f14] px-3 text-base text-white outline-none transition focus:border-[#f5b41b] focus:ring-2 focus:ring-[#f5b41b]/15";
  return <div id="model-finder" className="relative scroll-mt-44 lg:scroll-mt-24">
    {categories.map((item) => <span key={item.slug} id={item.slug} className="absolute top-0 scroll-mt-44 lg:scroll-mt-24" />)}
    <div className="rounded-2xl border border-white/10 bg-[#11171d] p-5 md:p-7">
      <p className="text-xs font-semibold uppercase tracking-widest text-[#f5b41b]">{zh ? "01 · 选择生产任务" : "01 · Choose your task"}</p>
      <nav aria-label={zh ? "按用途筛选" : "Filter by application"} className="mt-4 hidden flex-wrap gap-2 sm:flex">
        {[{ slug: "model-finder", title: zh ? "全部产品" : "All products" }, ...categories].map((item) => {
          const active = item.slug === (category || "model-finder");
          return <a key={item.slug} href={`#${item.slug}`} onClick={() => setLimit(12)} aria-current={active ? "true" : undefined} className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f5b41b] ${active ? "border-[#f5b41b] bg-[#f5b41b] text-black" : "border-white/12 bg-white/[0.025] text-white/70 hover:border-white/35 hover:text-white"}`}>{item.title}<span className={`ml-2 text-xs ${active ? "text-black/60" : "text-white/40"}`}>{item.slug === "model-finder" ? models.length : models.filter((model) => model.categoryId === item.slug).length}</span></a>;
        })}
      </nav>
      <label className="mt-4 block text-sm text-white/65 sm:hidden"><span className="sr-only">{zh ? "生产用途" : "Production task"}</span><select aria-label={zh ? "生产用途" : "Production task"} value={category} onChange={(event) => { window.location.hash = event.target.value || "model-finder"; setLimit(12); }} className="h-12 w-full rounded-lg border border-white/15 bg-[#0b0f14] px-3 text-sm text-white focus:border-[#f5b41b]">{[{ slug: "", title: zh ? "全部产品" : "All products" }, ...categories].map((item) => <option key={item.slug} value={item.slug}>{item.title} · {item.slug ? models.filter((model) => model.categoryId === item.slug).length : models.length}</option>)}</select></label>
      <div className="mt-6 border-t border-white/10 pt-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#f5b41b]">{zh ? "02 · 输入选型条件" : "02 · Set your requirements"}</p>
        <div className="mt-4 grid grid-cols-2 gap-4 xl:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <label className="col-span-2 text-sm text-white/65 xl:col-span-1">{zh ? "搜索型号或系列" : "Model or series"}<input type="search" value={filters.query} onChange={(event) => update("query", event.target.value)} placeholder={zh ? "例如 CR30、SCH、BR-50" : "e.g. CR30, SCH, BR-50"} className={control} /></label>
          <label className="flex flex-col justify-between text-xs text-white/65 sm:text-sm"><span>{zh ? "所需负载至少（kg）" : "Required payload, min. (kg)"}</span><input type="number" min="0" step="any" inputMode="decimal" value={filters.minPayload} onChange={(event) => update("minPayload", event.target.value)} placeholder={zh ? "不限" : "Any"} className={control} /></label>
          <label className="flex flex-col justify-between text-xs text-white/65 sm:text-sm"><span>{zh ? "所需臂展 / 行程至少（mm）" : "Required reach / travel, min. (mm)"}</span><input type="number" min="0" step="any" inputMode="decimal" value={filters.minReach} onChange={(event) => update("minReach", event.target.value)} placeholder={zh ? "不限" : "Any"} className={control} /></label>
          <label className="col-span-2 text-sm text-white/65 xl:col-span-1">{zh ? "排列方式" : "Sort by"}<select value={filters.sort} onChange={(event) => update("sort", event.target.value)} className={control}><option value="recommended">{zh ? "默认排序" : "Featured first"}</option><option value="payload">{zh ? "负载从小到大" : "Payload: low to high"}</option><option value="reach">{zh ? "臂展从小到大" : "Reach: short to long"}</option></select></label>
        </div>
        <p className="mt-4 text-xs leading-6 text-white/45">{zh ? "负载请计入夹具重量。多配置型号需在详情中核对负载与臂展的对应组合。" : "Include tooling weight in the payload. For multi-configuration models, confirm the paired payload and reach in the model details."}</p>
      </div>
    </div>

    <div className="my-7 flex flex-wrap items-center justify-between gap-4">
      <p role="status" aria-live="polite" className="text-sm text-white/60">{zh ? "候选型号" : "Candidate models"} <strong className="ml-2 text-xl font-semibold text-white">{results.length}</strong><span className="ml-2 text-white/40">/ {models.length}</span></p>
      <div className="flex flex-wrap items-center gap-4 text-sm"><button type="button" onClick={() => document.getElementById("model-comparison")?.scrollIntoView({ block: "start", behavior: "instant" })} className="text-[#ffd36b] hover:underline">{zh ? `型号对比 (${comparison.length}/3)` : `Compare (${comparison.length}/3)`}</button><button type="button" onClick={clear} className="text-white/65 underline-offset-4 hover:text-white hover:underline">{zh ? "清除筛选" : "Clear filters"}</button></div>
    </div>

    {results.length === 0 ? <div className="rounded-xl border border-dashed border-white/20 py-16 text-center"><h3 className="text-xl font-semibold">{zh ? "当前条件下没有候选型号" : "No candidates for these requirements"}</h3><p className="mx-auto mt-3 max-w-lg px-5 text-sm leading-6 text-white/55">{zh ? "试着减少筛选条件，或把工况发给工程师，评估其他配置。" : "Try fewer filters, or send your production requirements to our engineers for configuration review."}</p><div className="mt-6 flex justify-center gap-5 text-sm"><button onClick={clear} className="text-[#ffd36b] underline">{zh ? "重新筛选" : "Reset filters"}</button><Link href={`${prefix}/contact`} className="text-white underline">{zh ? "请工程师协助选型" : "Ask an engineer"}</Link></div></div> : <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {results.slice(0, limit).map((model) => {
        const isSelected = comparison.includes(model.slug);
        const dark = model.image.includes("-dark-");
        const href = `${prefix}/products/${model.seriesSlug}/${model.slug}`;
        return <article key={model.slug} className={`group flex min-w-0 flex-col overflow-hidden rounded-xl border bg-[#10161c] transition ${isSelected ? "border-[#f5b41b]/70" : "border-white/10 hover:border-white/25"}`}>
          <Link href={href} className="relative block aspect-[16/10] overflow-hidden bg-[#0c0f13]" aria-label={`${zh ? "查看" : "View"} ${model.name}`}><Image src={model.image} alt={`${model.name} ${dark ? (zh ? "工作站示意" : "workstation illustration") : (zh ? "系列应用场景" : "series application scene")}`} fill sizes="(min-width:1280px) 32vw, (min-width:768px) 50vw, 100vw" className={dark ? "object-contain p-4 transition duration-500 group-hover:scale-105" : "object-cover opacity-70 transition duration-500 group-hover:scale-105"} /><span className="absolute left-4 top-4 rounded-md border border-white/15 bg-black/65 px-2.5 py-1.5 text-[11px] font-semibold text-white/80">{model.series.replace(" Series", zh ? " 系列" : " Series")}</span><span className="absolute bottom-3 right-3 rounded bg-black/60 px-2 py-1 text-[10px] text-white/65">{dark ? (zh ? "工作站示意" : "Workstation illustration") : (zh ? "应用场景" : "Application scene")}</span></Link>
          <div className="flex flex-1 flex-col p-5"><p className="text-xs text-white/45">{categoryName(model)}</p><h3 className="mt-2 break-words text-xl font-semibold tracking-tight"><Link href={href} className="hover:text-[#ffd36b]">{model.name}</Link></h3>
            <p className="mt-3 min-h-6 text-sm text-[#e1c68b]">{(zh ? model.configurationZh : model.configuration) || (model.axes !== "—" ? `${model.axes} ${zh ? "轴机器人" : "axes"}` : "")}</p>
            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4 border-y border-white/10 py-4"><div><dt className="text-xs text-white/45">{zh ? "最大负载" : "Payload"}</dt><dd className="mt-1 font-semibold text-white">{model.payload}</dd></div><div><dt className="text-xs text-white/45">{model.seriesSlug === "br-series" ? (zh ? "最大行程" : "Max. travel") : (zh ? "臂展" : "Reach")}</dt><dd className="mt-1 font-semibold text-white">{model.reach}</dd></div><div><dt className="text-xs text-white/45">{zh ? "重复定位精度" : "Repeatability"}</dt><dd className="mt-1 text-sm text-white/85">{model.repeatability}</dd></div><div><dt className="text-xs text-white/45">{zh ? "轴数" : "Axes"}</dt><dd className="mt-1 text-sm text-white/85">{model.axes}</dd></div></dl>
            <div className="mt-auto flex items-center justify-between gap-3 pt-5"><Link href={href} className="inline-flex min-h-11 items-center rounded-lg bg-[#f5b41b] px-4 text-sm font-semibold text-black transition hover:bg-[#ffca45]">{zh ? "查看详情" : "Model details"}<span className="ml-2" aria-hidden="true">↗</span></Link><button type="button" aria-pressed={isSelected} disabled={!isSelected && comparison.length >= 3} onClick={() => toggle(model.slug)} aria-label={`${isSelected ? (zh ? "移出对比" : "Remove from comparison") : (zh ? "加入对比" : "Compare")} ${model.name}`} className="min-h-11 text-sm text-white/70 transition hover:text-[#ffd36b] disabled:cursor-not-allowed disabled:opacity-30">{isSelected ? (zh ? "✓ 已选对比" : "✓ Selected") : (zh ? "+ 加入对比" : "+ Compare")}</button></div>
          </div>
        </article>;
      })}
    </div>}
    {results.length > limit ? <div className="mt-8 text-center"><button type="button" onClick={() => setLimit((previous) => previous + 12)} className="min-h-12 rounded-lg border border-white/20 bg-white/5 px-8 text-sm font-semibold hover:border-[#f5b41b]/60">{zh ? `显示更多型号（已显示 ${Math.min(limit, results.length)} / ${results.length}）` : `Show more models (${Math.min(limit, results.length)} / ${results.length})`}</button></div> : null}

    <section id="model-comparison" aria-label={zh ? "型号对比" : "Model comparison"} className="mt-12 scroll-mt-44 overflow-hidden rounded-xl border border-white/10 bg-[#11171d] lg:scroll-mt-24">
      <div className="flex flex-wrap items-start justify-between gap-4 p-5 md:p-7"><div><h2 className="text-xl font-semibold">{zh ? "把候选型号放在一起比较" : "Compare your shortlist"}</h2><p className="mt-2 text-sm leading-6 text-white/50">{zh ? "最多选择 3 款，直接比较核心参数与升降 / 装箱配置。" : "Select up to 3 models to compare key specifications and lifting or packing configurations."}</p></div>{selected.length ? <button onClick={() => setComparison([])} className="min-h-10 text-sm text-white/60 hover:text-white">{zh ? "清空对比" : "Clear comparison"}</button> : null}</div>
      {selected.length ? <div role="region" aria-label={zh ? "候选型号参数对比表，可横向滚动" : "Candidate comparison table, scroll horizontally"} tabIndex={0} className="overflow-x-auto border-t border-white/10 focus-visible:outline-2 focus-visible:outline-[#f5b41b]"><table style={{ minWidth: 160 + selected.length * 220 }} className="w-full border-collapse text-left text-sm"><caption className="sr-only">{zh ? "候选型号参数对比" : "Candidate model specifications"}</caption><thead><tr><th className="sticky left-0 z-10 w-40 min-w-40 bg-[#11171d] p-5 font-medium text-white/45">{zh ? "参数" : "Specification"}</th>{selected.map((model) => <th key={model.slug} className="min-w-48 p-5 align-top"><Link href={`${prefix}/products/${model.seriesSlug}/${model.slug}`} className="text-base font-semibold text-[#ffd36b] hover:underline">{model.name}</Link><button onClick={() => toggle(model.slug)} aria-label={`${zh ? "移除" : "Remove"} ${model.name}`} className="ml-3 inline-flex h-8 w-8 items-center justify-center rounded border border-white/15 text-white/50 hover:text-white">×</button></th>)}</tr></thead><tbody>{[
        [zh ? "用途" : "Application", (m: CatalogModel) => categoryName(m)],
        [zh ? "最大负载" : "Payload", (m: CatalogModel) => m.payload],
        [zh ? "臂展 / 最大行程" : "Reach / max. travel", (m: CatalogModel) => m.reach],
        [zh ? "轴数" : "Axes", (m: CatalogModel) => m.axes],
        [zh ? "重复定位精度" : "Repeatability", (m: CatalogModel) => m.repeatability],
        [zh ? "配置" : "Configuration", (m: CatalogModel) => (zh ? m.configurationZh : m.configuration) || "—"],
        [zh ? "本体重量" : "Body weight", (m: CatalogModel) => m.bodyWeight],
        [zh ? "电源容量 / 功率" : "Power capacity / power", (m: CatalogModel) => m.power],
      ].map(([label, value]) => <tr key={label as string} className="border-t border-white/10 odd:bg-white/[0.025]"><th scope="row" className="sticky left-0 z-10 w-40 min-w-40 bg-[#141b22] px-5 py-4 font-medium text-white/50">{label as string}</th>{selected.map((model) => <td key={model.slug} className="px-5 py-4 text-white/85">{(value as (m: CatalogModel) => string)(model)}</td>)}</tr>)}<tr className="border-t border-white/10"><th scope="row" className="sticky left-0 z-10 w-40 min-w-40 bg-[#141b22] p-5 font-medium text-white/50">{zh ? "下一步" : "Next step"}</th>{selected.map((model) => <td key={model.slug} className="p-5"><Link href={modelInquiryHref(model, locale)} className="inline-flex rounded-lg bg-[#f5b41b] px-4 py-3 font-semibold text-black">{zh ? "咨询此型号" : "Enquire about model"}</Link></td>)}</tr></tbody></table></div> : <p className="border-t border-white/10 px-5 py-8 text-sm text-white/45 md:px-7">{zh ? "点击产品卡片上的「加入对比」，候选型号会保留在这里，切换筛选条件后也能继续比较。" : "Choose “Compare” on any model card. Your shortlist stays here as you change filters."}</p>}
    </section>
    <details className="mt-8 rounded-xl border border-white/10 px-5 py-4"><summary className="cursor-pointer text-sm text-white/55">{zh ? `全部 ${models.length} 款型号索引` : `All ${models.length} model links`}</summary><div className="mt-5 grid gap-3 pb-2 sm:grid-cols-2 lg:grid-cols-3">{models.map((model) => <Link key={model.slug} href={`${prefix}/products/${model.seriesSlug}/${model.slug}`} className="text-sm text-white/65 hover:text-[#ffd36b]">{model.name}</Link>)}</div></details>
  </div>;
}
