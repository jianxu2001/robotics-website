import Image from "next/image";
import Link from "next/link";
import { CtaLink } from "@/components/cta-link";
import { SiteHeader } from "@/components/site-header";
import { productModelEnvironment, type ProductModel, type ProductModelSpec } from "@/lib/product-data";
import { getProductModelFaqs } from "@/lib/seo";
import { modelInquiryHref } from "@/lib/product-selection";
import { stc10CasePaths } from "@/lib/stc10-case";
import { cr50lCasePaths } from "@/lib/cr50l-case";
import { sch100CasePaths } from "@/lib/sch100-case";
import { isProductRender } from "@/lib/product-media";

const labels: Record<string, string> = {
  Model: "型号", Series: "系列", Axes: "轴数", "Maximum payload": "最大负载",
  Reach: "臂展", Repeatability: "重复定位精度", "Body weight": "本体重量",
  "Power capacity": "电源容量", "Operating temperature": "工作温度",
  "Relative humidity": "相对湿度", Vibration: "允许振动", "Environmental limits": "环境条件",
};
function localValue(item: ProductModelSpec, zh: boolean) {
  if (!zh) return item.value;
  if (item.valueZh) return item.valueZh;
  return item.value.replace("non-condensing", "不结露").replace("Below 4.9 m/s²", "≤4.9 m/s²")
    .replace("Global:", "全局：").replace("coupled:", "耦合：")
    .replace("No flammable or corrosive gas/liquid. Avoid water, oil, dust, strong electromagnetic sources, and gas-source interference.", "无引火性、腐蚀性气体或液体；避免接触水、油、粉尘，并远离电磁干扰源。");
}
function Parameters({ rows, zh, caption }: { rows: ProductModelSpec[]; zh: boolean; caption: string }) {
  return <div className="min-w-0 overflow-hidden rounded-lg border border-white/10"><table className="w-full border-collapse text-left text-sm sm:text-base">
    <caption className="bg-[#151b21] px-5 py-4 text-left font-semibold text-white">{caption}</caption>
    <tbody className="divide-y divide-white/10">{rows.map((item) => <tr key={item.name} className="odd:bg-white/[0.035]">
      <th scope="row" className="w-[44%] px-4 py-4 align-top font-medium text-white/72 sm:px-5">{zh ? (item.nameZh ?? labels[item.name] ?? item.name) : item.name}</th>
      <td className="break-words px-4 py-4 align-top leading-7 text-white sm:px-5">{localValue(item, zh)}</td>
    </tr>)}</tbody></table></div>;
}
export function ProductModelDetail({ model, locale = "en" }: { model: ProductModel; locale?: "en" | "zh" }) {
  const zh = locale === "zh";
  const prefix = zh ? "/zh" : "";
  const pathname = `/products/${model.seriesSlug}/${model.slug}`;
  const catalog = model.catalogFile ?? "/catalogs/scr-industrial-robots-2026.pdf";
  const specifications = model.specifications ?? [
    { name: "Model", value: model.name }, { name: "Series", value: model.series },
    { name: "Axes", value: model.axes }, { name: "Maximum payload", value: model.payload },
    { name: "Reach", value: model.reach }, { name: "Repeatability", value: model.repeatability },
    { name: "Body weight", value: model.bodyWeight }, { name: "Power capacity", value: model.power },
  ];
  const environment: ProductModelSpec[] = model.environment ?? productModelEnvironment;
  const optionNote = zh ? model.optionNote
    ?.replace("Optional A5/A6;", "可选装第五、第六轴；")
    .replace("Optional A5;", "可选装第五轴；")
    .replace("standard body/base color:", "本体/基座标准色：")
    .replace("Standard body/base color:", "本体/基座标准色：")
    .replace("standard body color:", "本体标准色：")
    .replace("Standard body:", "本体标准色：")
    .replace("base color:", "基座标准色：")
    .replace("base:", "基座：")
    .replace("Standard body/base:", "本体/基座标准色：")
    .replace("Catalog note: customizable reach.", "画册说明：臂展可定制。")
    .replace("catalog color:", "画册颜色：")
    .replaceAll("natural aluminum", "铝本色").replaceAll("yellow", "黄色")
    .replaceAll("black", "黑色").replaceAll("gray-white", "灰白色").replaceAll("white", "白色").replaceAll("blue", "蓝色")
    : model.optionNote;
  const metrics = model.seriesSlug === "br-series"
    ? [[zh ? "负载" : "Payload", model.payload], [zh ? "最大行程" : "Maximum travel", model.reach], [zh ? "装箱节拍" : "Packing rate", model.specifications?.find((s) => s.name === "Packing rate")?.value ?? "—"], [zh ? "总功率" : "Total power", model.power]]
    : [[zh ? "最大负载" : "Maximum payload", model.payload], [zh ? "臂展" : "Reach", model.reach], [zh ? "轴数" : "Axes", model.axes], [zh ? "重复定位精度" : "Repeatability", model.repeatability]];
  return <>
    <SiteHeader locale={locale} alternateHref={`${zh ? "" : "/zh"}${pathname}`} />
    <main className="min-h-screen bg-[#080a0d] pt-40 text-white sm:pt-32 lg:pt-28">
      <nav aria-label={zh ? "面包屑导航" : "Breadcrumb"} className="mx-auto flex max-w-7xl flex-wrap gap-3 px-5 py-5 text-sm text-white/55 lg:px-8">
        <Link href={`${prefix}/products`}>{zh ? "产品中心" : "Products"}</Link><span>/</span><Link href={`${prefix}/products/${model.seriesSlug}`}>{model.series.replace(" Series", zh ? " 系列" : " Series")}</Link><span>/</span><span className="text-[#f5b41b]">{model.name}</span>
      </nav>
      <section className="border-y border-white/10 bg-[#0c0f13]"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 lg:grid-cols-2 lg:px-8 lg:py-16">
        <div className="self-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#f5b41b]">{zh ? (model.categoryZh ?? "工业机器人") : model.category}</p>
          <h1 className="mt-5 break-words text-3xl font-semibold leading-tight sm:text-4xl xl:text-5xl">{model.name}</h1>
          <p className="mt-6 text-lg leading-8 text-white/70">{zh ? (model.positioningZh ?? `${model.name}，最大负载 ${model.payload}，臂展 ${model.reach}。选型请结合夹具重量、产品尺寸、工作范围和目标节拍。`) : model.positioning}</p>
          <div className="mt-8 flex flex-wrap gap-3"><CtaLink href={modelInquiryHref(model, locale)}>{zh ? "咨询此型号与报价" : "Enquire About This Model"}</CtaLink><a href={catalog} className="inline-flex items-center rounded-md border border-white/20 px-5 py-3 text-sm font-semibold transition hover:border-[#f5b41b]">{zh ? "下载产品画册 PDF" : "Download Catalog PDF"}</a></div>
          {model.name === "STC10-1450-400" && <Link href={stc10CasePaths[locale]} className="mt-5 inline-flex text-sm font-semibold text-[#f5b41b] hover:text-[#ffd36b]">{zh ? "观看 STC10 冲压线应用案例与现场视频 →" : "Watch the STC10 press automation case and site video →"}</Link>}
          {model.name === "SCH100-1950-1800" && <Link href={sch100CasePaths[locale]} className="mt-5 inline-flex text-sm font-semibold text-[#f5b41b] hover:text-[#ffd36b]">{zh ? "观看 SCH100 定制地轨拆包上料案例 · 标准机不带地轨 →" : "Watch SCH100 bag feeding with a custom track · standard robot excludes track →"}</Link>}
          {model.name === "CR50L-1900" && <Link href={cr50lCasePaths[locale]} className="mt-5 inline-flex text-sm font-semibold text-[#f5b41b] hover:text-[#ffd36b]">{zh ? "观看 CR50L 升降式纸箱码垛案例与视频 →" : "Watch the CR50L lifting carton palletizing case →"}</Link>}
          <div className="mt-8 grid grid-cols-2 gap-3">{metrics.map(([label, value]) => <div key={label} className="rounded-lg border border-white/10 bg-black/20 p-4"><p className="text-xs text-white/50">{label}</p><p className="mt-2 text-xl font-semibold text-[#ffd36b]">{value}</p></div>)}</div>
        </div>
        <div className={`relative min-h-80 overflow-hidden rounded-xl border border-white/[0.06] lg:min-h-[480px] ${isProductRender(model.image) ? "product-stage" : "bg-[#0c0f13]"}`}><Image src={model.image} alt={`${model.name} ${zh ? (model.categoryZh ?? "工业机器人") : model.category}`} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className={isProductRender(model.image) ? "product-image" : model.specifications ? "object-contain" : "object-cover"} /></div>
      </div></section>
      <section className="section-shell">
        <div className="mb-8 max-w-3xl"><p className="text-sm font-semibold uppercase tracking-widest text-[#f5b41b]">{zh ? "技术规格" : "Technical specifications"}</p><h2 className="mt-3 text-3xl font-semibold">{zh ? `${model.name} 产品参数` : `${model.name} specifications`}</h2><p className="mt-4 leading-7 text-white/60">{zh ? "参数用于初步选型。最终配置需结合产品、夹具负载、重心及产线布局确认。" : "Use these specifications for preliminary selection. Confirm the final configuration against product data, tooling load, center of gravity and line layout."}</p></div>
        <div className="grid min-w-0 items-start gap-8 lg:grid-cols-2">
          <Parameters rows={specifications} zh={zh} caption={zh ? "产品参数" : "Product parameters"} />
          <div className="grid min-w-0 gap-8">
            {optionNote ? <p className="rounded-lg border border-white/10 p-5 text-sm leading-7 text-white/70">{optionNote}</p> : null}
            {model.drawing ? <figure className="overflow-hidden rounded-lg border border-white/10 bg-[#0d141c]"><Image src={model.drawing} alt={`${model.name} ${zh ? "尺寸与工作范围图" : "dimensions and operating range drawing"}`} width={1200} height={800} className="max-h-[480px] w-full object-contain p-4 mix-blend-screen opacity-85 invert" /><figcaption className="bg-[#151b21] px-5 py-4 text-sm text-white/70">{zh ? "画册尺寸与工作范围示意" : "Catalog dimensions and operating range"}</figcaption></figure> : null}
            {model.jointParameters.length ? <Parameters rows={model.jointParameters} zh={zh} caption={zh ? "各轴动作范围" : "Joint motion ranges"} /> : null}
            {model.technicalNote ? <p className="rounded-lg border border-[#f5b41b]/25 bg-[#f5b41b]/5 p-5 text-sm leading-7 text-[#ffe1a0]">{zh ? model.technicalNoteZh : model.technicalNote}</p> : null}
            <a href={`${catalog}${model.catalogPage ? `#page=${model.catalogPage}` : ""}`} className="rounded-lg border border-white/10 p-5 text-sm text-white/65 transition hover:border-[#f5b41b]/50">{zh ? "查看原始画册与产品图 →" : "View original catalog and product illustrations →"}</a>
          </div>
        </div>
        {environment.length ? <div className="mt-10"><h2 className="mb-5 text-2xl font-semibold">{zh ? "使用环境" : "Operating environment"}</h2><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{environment.map((row) => <div key={row.name} className="rounded-lg border border-white/10 p-5"><p className="text-sm font-semibold text-white/75">{zh ? (row.nameZh ?? labels[row.name] ?? row.name) : row.name}</p><p className="mt-3 text-sm leading-7 text-white/60">{localValue(row, zh)}</p></div>)}</div></div> : null}
      </section>
      <section className="section-shell border-t border-white/10">
        <h2 className="mb-6 text-2xl font-semibold">{zh ? "选型常见问题" : "FAQ"}</h2>
        <div className="grid gap-4 md:grid-cols-2">{getProductModelFaqs(model, locale).map((faq) => <div key={faq.question} className="rounded-lg border border-white/10 p-5"><h3 className="font-semibold">{faq.question}</h3><p className="mt-3 leading-7 text-white/60">{faq.answer}</p></div>)}</div>
      </section>
      <section className="border-t border-white/10 bg-[#0c0f13]"><div className="section-shell flex flex-col justify-between gap-7 md:flex-row md:items-center"><div><h2 className="text-2xl font-semibold">{zh ? "确认这款产品是否适合您的产线" : "Check this model against your production line"}</h2><p className="mt-4 max-w-3xl leading-7 text-white/60">{zh ? "请提供产品照片、重量、尺寸、产能、托盘或纸箱规格及现场布局，便于确认设备配置。" : "Send product photos, weight, dimensions, target output, pallet or carton specifications and the available floor layout for configuration review."}</p></div><CtaLink href={modelInquiryHref(model, locale)}>{zh ? "发送项目需求" : "Send Project Details"}</CtaLink></div></section>
    </main>
  </>;
}
