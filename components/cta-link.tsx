import Link from "next/link";

type CtaLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const variantClassNames = {
  primary:
    "bg-[#f5b41b] text-black shadow-[0_0_28px_rgba(245,180,27,0.22)] hover:bg-[#ffca45]",
  secondary:
    "border border-white/18 bg-white/8 text-white hover:border-[#f5b41b]/70 hover:bg-[#f5b41b]/10",
  ghost: "text-white/78 hover:text-white",
};

export function CtaLink({
  href,
  children,
  variant = "primary",
  className = "",
}: CtaLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center justify-center rounded-md px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] transition ${variantClassNames[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
