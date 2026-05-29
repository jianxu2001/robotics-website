import Link from "next/link";
import { CtaLink } from "@/components/cta-link";
import { whatsappUrl } from "@/lib/contact";

type SiteHeaderProps = {
  locale?: "en" | "zh";
  alternateHref?: string;
};

const navItems = {
  en: [
    { label: "Products", href: "/products" },
    { label: "Applications", href: "/#applications" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  zh: [
    { label: "产品", href: "/zh/products" },
    { label: "应用", href: "/zh/#applications" },
    { label: "关于我们", href: "/zh/about" },
    { label: "联系我们", href: "/zh/contact" },
  ],
};

export function SiteHeader({
  locale = "en",
  alternateHref,
}: SiteHeaderProps) {
  const isZh = locale === "zh";
  const items = navItems[locale];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#080a0d]/86 backdrop-blur-xl">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-5 sm:px-5 sm:py-4 lg:px-8"
        aria-label={isZh ? "主导航" : "Primary navigation"}
      >
        <Link
          href={isZh ? "/zh" : "/"}
          className="group flex min-w-0 items-center gap-3"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-[#f5b41b]/50 bg-[#f5b41b] text-sm font-black text-black">
            SCR
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-bold uppercase tracking-[0.12em] text-white sm:tracking-[0.16em]">
              SCR Robot
            </span>
            <span className="hidden text-xs text-white/48 sm:block">
              {isZh ? "工业机器人与自动化系统" : "Palletizing Automation Systems"}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/62 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={whatsappUrl}
            className="hidden text-sm font-semibold text-white/72 transition hover:text-white sm:inline-flex"
          >
            WhatsApp
          </a>
          <Link
            href={alternateHref ?? (isZh ? "/" : "/zh")}
            className="hidden rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] text-white/68 transition hover:border-[#f5b41b]/60 hover:text-white sm:inline-flex"
          >
            {isZh ? "EN" : "中文"}
          </Link>
          <CtaLink href={isZh ? "/zh/contact" : "/contact"} className="px-4 py-2.5">
            {isZh ? "获取报价" : "Get Quote"}
          </CtaLink>
        </div>
      </nav>
      <div className="border-t border-white/8 px-4 pb-3 lg:hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-3 gap-2 pt-3 text-xs font-semibold uppercase tracking-[0.06em] text-white/60 sm:flex sm:overflow-x-auto sm:tracking-[0.08em]">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md border border-white/10 bg-white/5 px-2 py-2 text-center transition hover:border-[#f5b41b]/60 hover:text-white sm:shrink-0 sm:px-3"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={alternateHref ?? (isZh ? "/" : "/zh")}
            className="rounded-md border border-white/10 bg-white/5 px-2 py-2 text-center transition hover:border-[#f5b41b]/60 hover:text-white sm:shrink-0 sm:px-3"
          >
            {isZh ? "EN" : "中文"}
          </Link>
        </div>
      </div>
    </header>
  );
}
