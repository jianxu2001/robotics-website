"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { salesEmail, whatsappNumber, whatsappUrl } from "@/lib/contact";

export function SiteFooter({ companyName, companyNameZh }: { companyName: string; companyNameZh: string }) {
  const pathname = usePathname();
  const zh = pathname === "/zh" || pathname.startsWith("/zh/");
  const prefix = zh ? "/zh" : "";
  const links = [
    [zh ? "产品选型" : "Product Finder", `${prefix}/products#model-finder`],
    [zh ? "应用方案" : "Applications", `${prefix}/industries`],
    [zh ? "现场案例" : "Case Studies", `${prefix}/case-studies`],
    [zh ? "选型指南" : "Selection Guides", `${prefix}/guides`],
    [zh ? "关于我们" : "About", `${prefix}/about`],
    [zh ? "联系我们" : "Contact", `${prefix}/contact`],
  ];

  return (
    <footer lang={zh ? "zh-CN" : "en"} className="mt-auto border-t border-white/10 bg-[#080a0d] px-5 py-10 text-white/60 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.2fr_0.7fr_1fr]">
        <div>
          <p className="text-base font-semibold text-white">{zh ? companyNameZh : companyName}</p>
          <p className="mt-3 max-w-md text-sm leading-7">{zh ? "工业机器人、码垛与拆垛、装箱及冲压上下料自动化。" : "Industrial robots for palletizing, depalletizing, case packing and press automation."}</p>
          <p className="mt-3 text-sm">{zh ? "中国 · 广东广州" : "Guangzhou, Guangdong, China"}</p>
        </div>
        <nav aria-label={zh ? "页脚导航" : "Footer navigation"}>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#f5b41b]">{zh ? "快速入口" : "Explore"}</p>
          <div className="mt-4 grid gap-3 text-sm">{links.map(([label, href]) => <Link key={href} href={href} className="w-fit hover:text-white">{label}</Link>)}</div>
        </nav>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#f5b41b]">{zh ? "直接联系" : "Contact Sales"}</p>
          <div className="mt-4 grid gap-3 break-words text-sm">
            <a href="tel:+8613266005525" className="w-fit hover:text-white">{zh ? "电话：" : "Phone: "}{whatsappNumber}</a>
            <a href={`mailto:${salesEmail}`} className="w-fit hover:text-white">{salesEmail}</a>
            <a href={whatsappUrl} className="w-fit hover:text-white">WhatsApp ↗</a>
            <a href="/catalogs/scr-industrial-robots-2026.pdf" className="w-fit hover:text-white">{zh ? "工业机器人画册 PDF" : "Industrial Robot Catalog PDF"}</a>
            <a href="/catalogs/scr-collaborative-palletizing-packing-2026.pdf" className="w-fit hover:text-white">{zh ? "协作码垛与装箱画册 PDF" : "Palletizing & Packing Catalog PDF"}</a>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-7xl border-t border-white/10 pt-5 text-xs text-white/40">© {new Date().getUTCFullYear()} SCR Robot</p>
    </footer>
  );
}
