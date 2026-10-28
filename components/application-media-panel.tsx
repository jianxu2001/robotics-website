import Image from "next/image";
import Link from "next/link";
import type { ApplicationMedia } from "@/lib/application-media";

export function ApplicationMediaPanel({ media }: { media: ApplicationMedia }) {
  return (
    <figure className="overflow-hidden rounded-lg border border-white/10 bg-[#0b131b]">
      <div className={`relative ${media.kind === "video-frame" && !media.src.includes("stc10-stamping") ? "aspect-[3/4] max-h-[32rem]" : "aspect-[16/10]"}`}>
        <Image src={media.src} alt={media.alt} fill sizes="(min-width:1024px) 40vw, 100vw" className="object-contain" />
      </div>
      <figcaption className="border-t border-white/10 px-5 py-4 text-sm leading-6 text-white/65">
        {media.caseHref ? <Link href={media.caseHref} className="text-[#f5b41b] underline decoration-[#f5b41b]/30 underline-offset-4 hover:decoration-current">{media.caption} →</Link> : media.caption}
      </figcaption>
    </figure>
  );
}
