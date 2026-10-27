import Image from "next/image";
import Link from "next/link";
import { CtaLink } from "@/components/cta-link";
import { SiteHeader } from "@/components/site-header";
import {
  type CaseLocale,
  sch100CaseContent,
  sch100CaseMedia,
  sch100CasePaths,
} from "@/lib/sch100-case";

function localPath(url: string) {
  return new URL(url).pathname;
}

export function FeaturedSch100Case({ locale = "en" }: { locale?: CaseLocale }) {
  const copy = sch100CaseContent[locale];
  const isZh = locale === "zh";
  return (
    <article className="mt-10 overflow-hidden rounded-lg border border-[#f5b41b]/30 bg-[#11161b]">
      <div className="grid md:grid-cols-[0.7fr_1.3fr]">
        <Link
          href={sch100CasePaths[locale]}
          className="relative flex justify-center bg-[#080a0d]"
          aria-label={copy.title}
        >
          <Image
            src={`${sch100CaseMedia.images}/02-transfer.jpg`}
            alt={copy.steps[1].alt}
            width={720}
            height={1280}
            sizes="(min-width: 768px) 30vw, 100vw"
            className="h-80 w-full object-contain md:h-full md:max-h-[32rem]"
          />
          <span className="absolute bottom-4 left-4 rounded border border-white/20 bg-black/80 px-3 py-1 text-xs text-white">
            {isZh ? "现场视频 · 约 47 秒" : "Site video · Approx. 47 seconds"}
          </span>
        </Link>
        <div className="flex flex-col justify-center p-6 md:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#f5b41b]">{copy.eyebrow}</p>
          <h2 className="mt-4 text-2xl font-semibold leading-tight text-white md:text-3xl">
            <Link href={sch100CasePaths[locale]}>{copy.title}</Link>
          </h2>
          <p className="mt-3 font-semibold text-[#f5b41b]">{copy.subtitle}</p>
          <p className="mt-5 leading-7 text-white/66">{copy.summary}</p>
          <p className="mt-5 border-l-2 border-[#f5b41b] pl-4 text-sm leading-7 text-white/75">{copy.configurationNote}</p>
          <div className="mt-6">
            <CtaLink href={sch100CasePaths[locale]}>{isZh ? "查看案例与现场视频" : "View Case & Site Video"}</CtaLink>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Sch100CaseStudy({ locale }: { locale: CaseLocale }) {
  const copy = sch100CaseContent[locale];
  const isZh = locale === "zh";
  const casesHref = isZh ? "/zh/case-studies" : "/case-studies";
  return (
    <>
      <SiteHeader locale={locale} alternateHref={sch100CasePaths[isZh ? "en" : "zh"]} />
      <main className="min-h-screen bg-[#080a0d] pt-40 text-white sm:pt-32 lg:pt-28" lang={isZh ? "zh-CN" : "en"}>
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-7xl px-5 pb-14 pt-6 lg:px-8 lg:pb-20">
            <Link href={casesHref} className="text-sm text-white/55 transition hover:text-[#f5b41b]">
              ← {isZh ? "全部案例" : "All cases"}
            </Link>
            <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#f5b41b]">{copy.eyebrow}</p>
                <h1 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">{copy.title}</h1>
                <p className="mt-5 text-xl font-semibold text-[#f5b41b] sm:text-2xl">{copy.subtitle}</p>
                <p className="mt-6 text-lg leading-8 text-white/66">{copy.summary}</p>
                <div className="mt-7 border-l-2 border-[#f5b41b] bg-white/[0.045] px-5 py-4">
                  <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-[#f5b41b]">{isZh ? "配置说明" : "Configuration"}</h2>
                  <p id="sch100-configuration" className="mt-2 text-sm leading-7 text-white/80">{copy.configurationNote}</p>
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <CtaLink href={localPath(copy.contactHref)}>{copy.ctaLabel}</CtaLink>
                  <CtaLink href={localPath(copy.productHref)} variant="secondary">{copy.productLabel}</CtaLink>
                </div>
              </div>
              <figure className="mx-auto w-full max-w-[21rem] lg:mr-0">
                <video
                  controls
                  playsInline
                  preload="none"
                  width={720}
                  height={1280}
                  poster={`${sch100CaseMedia.images}/02-transfer.jpg`}
                  aria-label={isZh ? "SCH100 客户定制地轨拆包上料现场视频" : "SCH100 bag-opening and feeding video with customer-specific linear track"}
                  aria-describedby="sch100-configuration"
                  className="aspect-[9/16] h-auto max-h-[37rem] w-full rounded-lg border border-white/15 bg-black object-contain"
                >
                  <source src={sch100CaseMedia.video} type="video/mp4" />
                  <a href={sch100CaseMedia.video}>{isZh ? "打开现场视频" : "Open site video"}</a>
                </video>
                <figcaption className="mt-3 text-center text-xs text-white/45">{isZh ? "客户现场视频 · 约 47 秒" : "Customer-site footage · Approx. 47 seconds"}</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#f5b41b]">{isZh ? "项目概况" : "Project overview"}</p>
          <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">{copy.backgroundTitle}</h2>
          <p className="mt-5 max-w-4xl leading-8 text-white/66">{copy.background}</p>
        </section>

        <section className="border-y border-white/10 bg-[#0d1115]">
          <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
            <h2 className="text-2xl font-semibold sm:text-3xl">{copy.workflowTitle}</h2>
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {copy.steps.map((step, index) => (
                <article key={step.image} className="overflow-hidden rounded-lg border border-white/10 bg-[#11161b]">
                  <div className="relative bg-black">
                    <Image
                      src={`${sch100CaseMedia.images}/${step.image}`}
                      alt={step.alt}
                      width={720}
                      height={1280}
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="aspect-[9/16] h-auto w-full object-contain"
                    />
                    <span className="absolute bottom-3 right-3 rounded border border-white/20 bg-black/80 px-2 py-1 text-xs text-white">{step.time}</span>
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-bold tracking-[0.12em] text-[#f5b41b]">0{index + 1}</p>
                    <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/62">{step.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
          <h2 className="text-2xl font-semibold sm:text-3xl">{copy.featuresTitle}</h2>
          <ul className="mt-7 grid gap-5 md:grid-cols-2">
            {copy.features.map((feature) => (
              <li key={feature} className="border-l-2 border-[#f5b41b] pl-5 leading-7 text-white/70">{feature}</li>
            ))}
          </ul>
          <div className="mt-12 rounded-lg border border-white/10 bg-[#11161b] p-6 md:p-9">
            <h2 className="text-2xl font-semibold sm:text-3xl">{copy.ctaTitle}</h2>
            <p className="mt-5 max-w-4xl leading-8 text-white/66">{copy.ctaText}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <CtaLink href={localPath(copy.contactHref)}>{copy.ctaLabel}</CtaLink>
              <CtaLink href={localPath(copy.productHref)} variant="secondary">{copy.productLabel}</CtaLink>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
