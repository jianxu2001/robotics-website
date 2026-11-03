import Link from "next/link";
import { sch100CaseMedia, sch100CasePaths } from "@/lib/sch100-case";

export function SolutionSiteVideo({ heading, text }: { heading: string; text: string }) {
  const media = sch100CaseMedia;
  return <section aria-label="Related customer installation" className="mx-auto max-w-7xl px-5 pt-10 lg:px-8">
    <div className="grid gap-7 overflow-hidden rounded-xl border border-[#f5b41b]/30 bg-[#11161b] p-6 sm:grid-cols-[0.5fr_1fr] sm:p-8">
      <figure className="mx-auto w-full max-w-52">
        <video data-case-video="sch100" controls playsInline preload="none" width={media.width} height={media.height} poster={`${media.images}/${media.poster}`} className="aspect-[9/16] max-h-80 w-full rounded-lg bg-black object-contain" aria-label="SCH100 bag opening and feeding customer video">
          <source src={media.video} type="video/mp4" />
          <track kind="subtitles" src={media.subtitles.en} srcLang="en" label="English — workflow" default />
          <track kind="subtitles" src={media.subtitles.zh} srcLang="zh-CN" label="中文 · 工艺说明" />
        </video>
        <figcaption className="mt-2 text-xs leading-6 text-white/55">Customer footage · Approx. 47 seconds</figcaption>
      </figure>
      <div className="self-center"><p className="text-xs font-semibold uppercase tracking-widest text-[#f5b41b]">See the handling process</p><h2 className="mt-3 text-2xl font-semibold text-white">{heading}</h2><p className="mt-4 text-sm leading-7 text-white/65">{text}</p><p className="mt-4 border-l-2 border-[#f5b41b] pl-4 text-sm leading-7 text-white/75">Customer-specific linear track. The standard SCH100 does not include a track. Bag weight, production rate and a particular vision configuration are not established by this footage.</p><Link href={sch100CasePaths.en} className="mt-5 inline-flex text-sm font-semibold text-[#ffd36b] hover:underline">View the complete SCH100 case →</Link></div>
    </div>
  </section>;
}
