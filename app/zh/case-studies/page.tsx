import type { Metadata } from "next";
import { CaseStudyCard } from "@/components/case-study-card";
import { CtaLink } from "@/components/cta-link";
import { IndustrialCard } from "@/components/industrial-card";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { caseStudiesZh } from "@/lib/case-studies";
import { whatsappUrl } from "@/lib/contact";

export const metadata: Metadata = {
  title: "代表性自动化案例方案 | SCR Robot",
  description:
    "查看 SCR Robot 代表性自动化案例方案，覆盖袋装码垛、纸箱码垛、冲压转运、机床上下料和 3D 视觉袋装上料。",
};

const reviewQuestions = [
  "需要搬运的产品或包装是什么？",
  "目标产能、节拍和班次安排是什么？",
  "现场空间、输送方向和安全约束有哪些？",
  "需要报价的机器人、夹具、输送和控制范围是什么？",
];

export default function ZhCaseStudiesPage() {
  return (
    <>
      <SiteHeader locale="zh" alternateHref="/case-studies" />
      <main className="min-h-screen bg-[#080a0d] pt-40 text-white sm:pt-32 lg:pt-28">
        <section className="relative border-b border-white/10">
          <div className="absolute inset-0 industrial-grid opacity-40" />
          <div className="relative section-shell pb-14">
            <SectionHeading
              eyebrow="代表性案例"
              title="用接近真实项目的方案场景，帮助买家快速建立画面感。"
              description="这些是代表性方案场景，不编造具体客户业绩。它们展示 SCR Robot 如何围绕产品搬运、机器人选型、夹具、输送、安全和报价资料进行项目判断。"
              level={1}
            />
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {caseStudiesZh.map((study) => (
                <a
                  key={study.slug}
                  href={`#${study.slug}`}
                  className="rounded-lg border border-white/10 bg-white/[0.045] p-5 transition hover:border-[#f5b41b]/50 hover:bg-white/[0.07]"
                >
                  <div className="mb-5 h-1 w-12 bg-[#d71920]" />
                  <h2 className="text-base font-semibold leading-6 text-white">{study.title}</h2>
                  <p className="mt-3 text-xs uppercase tracking-[0.12em] text-white/42">
                    {study.industry}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="grid gap-6">
            {caseStudiesZh.map((study) => (
              <CaseStudyCard
                key={study.slug}
                study={study}
                labels={{
                  challenge: "典型挑战",
                  solution: "方案概念",
                  outcomes: "买家价值",
                  series: "推荐系列",
                  inquiryData: "需要提供的数据",
                }}
              />
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0f1318]">
          <div className="section-shell">
            <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
              <SectionHeading
                eyebrow="项目评估"
                title="更有效的案例沟通，从四个实际问题开始。"
                description="买家越早提供这些信息，销售工程沟通就越能从泛泛咨询进入具体技术方案。"
              />
              <div className="grid gap-3 sm:grid-cols-2">
                {reviewQuestions.map((question) => (
                  <div key={question} className="rounded-lg border border-white/10 bg-black/24 p-5 text-white/68">
                    {question}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell">
          <IndustrialCard className="p-6 md:p-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f5b41b]">
                  需要类似方案？
                </p>
                <h2 className="mt-4 text-3xl font-semibold text-white">
                  发送产品数据和现场布局，获取针对项目的方案建议。
                </h2>
                <p className="mt-4 max-w-3xl leading-7 text-white/62">
                  我们可以根据您的负载、臂展、节拍、垛型、机台布局和目的市场调整代表性方案。
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <CtaLink href="/zh/contact">获取报价</CtaLink>
                <CtaLink href={whatsappUrl} variant="secondary">
                  WhatsApp
                </CtaLink>
              </div>
            </div>
          </IndustrialCard>
        </section>
      </main>
    </>
  );
}
