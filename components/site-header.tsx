import Link from "next/link";
import { CtaLink } from "@/components/cta-link";

const navItems = [
  { label: "Products", href: "/products" },
  { label: "Applications", href: "/#applications" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#080a0d]/86 backdrop-blur-xl">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-5 sm:px-5 sm:py-4 lg:px-8"
        aria-label="Primary navigation"
      >
        <Link href="/" className="group flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-[#f5b41b]/50 bg-[#f5b41b] text-sm font-black text-black">
            SCR
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-bold uppercase tracking-[0.12em] text-white sm:tracking-[0.16em]">
              SCR Robot
            </span>
            <span className="hidden text-xs text-white/48 sm:block">
              Palletizing Automation Systems
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
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
            href="https://wa.me/8613800000000"
            className="hidden text-sm font-semibold text-white/72 transition hover:text-white sm:inline-flex"
          >
            WhatsApp
          </a>
          <CtaLink href="/contact" className="px-4 py-2.5">
            Get Quote
          </CtaLink>
        </div>
      </nav>
      <div className="border-t border-white/8 px-4 pb-3 lg:hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-3 gap-2 pt-3 text-xs font-semibold uppercase tracking-[0.06em] text-white/60 sm:flex sm:overflow-x-auto sm:tracking-[0.08em]">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md border border-white/10 bg-white/5 px-2 py-2 text-center transition hover:border-[#f5b41b]/60 hover:text-white sm:shrink-0 sm:px-3"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
