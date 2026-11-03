"use client";

import Link from "next/link";
import { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { cleanSourcePath, getInquiryTopic } from "@/lib/contact-context";

type Props = { href: string; className: string; children: React.ReactNode };
function ContextLink({ href, className, children }: Props) {
  const pathname = usePathname();
  const current = useSearchParams();
  if ((pathname === "/contact" || pathname === "/zh/contact") && (href === "/contact" || href === "/zh/contact")) {
    const params = new URLSearchParams();
    const model = current.get("model");
    if (model && /^(?:ecr|sch|sar|scr|srl|stc|scd|er|cr|br)-series\/[a-z0-9-]+$/.test(model)) params.set("model", model);
    const topic = getInquiryTopic(current.get("topic")); if (topic) params.set("topic", topic);
    const source = cleanSourcePath(current.get("source")); if (source) params.set("source", source);
    href += (params.size ? `?${params}` : "") + "#inquiry";
  }
  return <Link href={href} className={className}>{children}</Link>;
}
export function LanguageSwitchLink(props: Props) {
  return <Suspense fallback={<Link href={props.href} className={props.className}>{props.children}</Link>}><ContextLink {...props} /></Suspense>;
}
