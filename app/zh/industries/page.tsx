import type { Metadata } from "next";
import { CtaLink } from "@/components/cta-link";
import { IndustrialCard } from "@/components/industrial-card";
import { IndustrySolutionCard } from "@/components/industry-solution-card";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { industrySolutionsZh } from "@/lib/industry-solutions";
import { whatsappUrl } from "@/lib/contact";

export const metadata: Metadata = {
  title: "工业机器人应用场景 | 码垛、拆垛、冲压与工厂自动化",
  description:
    "查看 SCR Robot 工业自动化应用场景，包括码垛、拆垛、3D视觉袋装处理、冲压自动化、机床上下料和输送线集成。",
};

const decisionFactors = [
  "产品尺寸、重量、包装形式和表面状态",
  "目标产能、节拍和班次安排",
  "现场布局、可用空间和进出料方向",
  "安全要求、下游设备和目的国家",
];

export default function ZhIndustriesPage() {
  return (
    <>
      <SiteHeader locale="zh" alternateHref="/industries" />
      <main className="min-h-screen bg-[#080a0d] pt-40 text-white sm:pt-32 lg:pt-28">
        <section className="relative border-b border-white/10">
          <div className="absolute inset-0 industrial-grid opacity-40" />
          <div className="relative section-shell pb-14">
            <SectionHeading
              eyebrow="行业应用"
              title="围绕真实工厂采购场景组织自动化方案。"
              description="海外客户进站时通常带着生产问题，而不是机器人型号。行业方案页把问题、系统范围、推荐机器人系列和报价所需资料连接起来。"
              level={1}
            />
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {industrySolutionsZh.map((solution) => (
                <a
                  key={solution.slug}
                  href={`#${solution.slug}`}
                  className="rounded-lg border border-white/10 bg-white/[0.045] p-5 transition hover:border-[#f5b41b]/50 hover:bg-white/[0.07]"
                >
                  <div className="mb-5 h-1 w-12 bg-[#d71920]" />
                  <h2 className="text-lg font-semibold text-white">{solution.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-white/58">{solution.summary}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="grid gap-6">
            {industrySolutionsZh.map((solution) => (
              <IndustrySolutionCard
                key={solution.slug}
                solution={solution}
                labels={{
                  painPoints: "客户痛点",
                  approach: "SCR 方案思路",
                  recommended: "推荐机器人系列",
                  scope: "典型系统范围",
                }}
              />
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0f1318]">
          <div className="section-shell">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
              <SectionHeading
                eyebrow="报价准备"
                title="清晰的生产数据，能更快换来有效方案。"
                description="高质量询盘能帮助工程团队更快判断机器人系列、夹具、输送、安全布局和预算方向，减少基础信息反复确认。"
              />
              <div className="grid gap-3 sm:grid-cols-2">
                {decisionFactors.map((factor) => (
                  <div key={factor} className="rounded-lg border border-white/10 bg-black/24 p-5 text-white/68">
                    {factor}
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
                  从应用场景开始
                </p>
                <h2 className="mt-4 text-3xl font-semibold text-white">
                  发送产品和现场数据，启动自动化项目沟通。
                </h2>
                <p className="mt-4 max-w-3xl leading-7 text-white/62">
                  我们可以协助判断合适的机器人平台、夹具概念、输送布局和技术方案。
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <CtaLink href="/zh/contact">获取方案</CtaLink>
                <CtaLink href="/zh/case-studies" variant="ghost">
                  查看案例方案
                </CtaLink>
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
