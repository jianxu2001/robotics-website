import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { salesEmail, whatsappNumber } from "@/lib/contact";

export function MissingPage({ locale = "en" }: { locale?: "en" | "zh" }) {
  const zh = locale === "zh";
  const prefix = zh ? "/zh" : "";
  return <>
    <SiteHeader locale={locale} alternateHref={zh ? "/products" : "/zh/products"} />
    <main lang={zh ? "zh-CN" : "en"} className="min-h-[75vh] bg-[#080a0d] px-5 pb-20 pt-48 text-white sm:pt-40 lg:pt-36">
      <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-[#11171d] p-6 sm:p-10">
        <p className="text-sm font-semibold tracking-widest text-[#f5b41b]">404</p>
        <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">{zh ? "这个页面暂时找不到" : "We couldn’t find this page"}</h1>
        <p className="mt-5 max-w-2xl leading-8 text-white/65">{zh ? "请核对链接中的型号，或进入产品中心搜索。也可以把型号和工况发给我们，协助查找对应产品。" : "Check the model in your link, or search the product finder. You can also send us the model name and your application for help finding the right product."}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={`${prefix}/products#model-finder`} className="rounded-lg bg-[#f5b41b] px-5 py-3 font-semibold text-black">{zh ? "搜索产品型号" : "Find a robot model"}</Link>
          <Link href={`${prefix}/contact#inquiry`} className="rounded-lg border border-white/20 px-5 py-3 font-semibold">{zh ? "联系工程师" : "Contact an engineer"}</Link>
          <Link href={zh ? "/zh" : "/"} className="px-5 py-3 text-white/65 hover:text-white">{zh ? "返回首页" : "Return home"}</Link>
        </div>
        <p className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/65"><a href="tel:+8613266005525">{whatsappNumber}</a><a href={`mailto:${salesEmail}`}>{salesEmail}</a></p>
      </div>
    </main>
  </>;
}
