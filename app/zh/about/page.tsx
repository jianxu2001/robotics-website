import Image from "next/image";
import type { Metadata } from "next";
import { CtaLink } from "@/components/cta-link";
import { IndustrialCard } from "@/components/industrial-card";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { automationSolutionsZh, companyProfileZh } from "@/lib/catalog-zh";

export const metadata: Metadata = {
  title: "关于华南机器人 | 工业机器人制造商",
  description:
    "了解华南机器人科技（广州）有限公司，一家成立于2017年的工业机器人制造商与智能工厂解决方案提供商。",
};

const profileStats = [
  ["成立时间", companyProfileZh.founded],
  ["生产基地", companyProfileZh.facility],
  ["团队规模", companyProfileZh.team],
  ["总部位置", companyProfileZh.headquarters],
];

const capabilities = [
  "工业机器人生产制造",
  "设备维护与售后技术支持",
  "机器人销售与应用工程",
  "行业一站式自动化解决方案",
  "机械、电气、软件与视觉系统集成",
  "面向生产线的非标定制自动化",
];

export default function ZhAboutPage() {
  return (
    <>
      <SiteHeader locale="zh" alternateHref="/about" />
      <main className="min-h-screen bg-[#080a0d] pt-40 text-white sm:pt-32 lg:pt-28">
        <section className="relative border-b border-white/10">
          <Image src="/images/SCR.jpg" alt="华南机器人厂房" fill priority sizes="100vw" className="object-cover opacity-42" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,10,13,0.98),rgba(8,10,13,0.72),rgba(8,10,13,0.4))]" />
          <div className="absolute inset-0 industrial-grid opacity-30" />
          <div className="relative mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
            <p className="font-mono text-sm font-bold uppercase tracking-[0.18em] text-[#f5b41b]">公司简介</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
              华南机器人科技（广州）有限公司
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">{companyProfileZh.description}</p>
          </div>
        </section>

        <section className="section-shell">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeading
              eyebrow="工程基地"
              title="面向工厂自动化项目的机器人制造与集成团队。"
              description={companyProfileZh.engineering}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {profileStats.map(([label, value]) => (
                <div key={label} className="steel-panel p-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-white/42">{label}</p>
                  <p className="mt-3 text-xl font-semibold leading-7 text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0f1318]">
          <div className="section-shell">
            <SectionHeading
              eyebrow="业务能力"
              title="机器人制造与自动化集成能力结合。"
              description="公司定位为智能工厂解决方案提供商，可将机器人产品、设备服务和行业自动化系统结合落地。"
            />
            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((capability) => (
                <IndustrialCard key={capability} className="p-6">
                  <div className="mb-5 h-1 w-12 bg-[#d71920]" />
                  <h3 className="text-xl font-semibold leading-7 text-white">{capability}</h3>
                </IndustrialCard>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell">
          <SectionHeading
            eyebrow="方案范围"
            title="围绕生产结果设计完整系统。"
            description="对海外客户而言，真正的价值是可运行的完整系统：机器人、夹具、输送、安全、控制、调试逻辑和资料支持。"
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-4">
            {automationSolutionsZh.map((solution, index) => (
              <div key={solution.title} className="steel-panel p-6">
                <p className="font-mono text-3xl font-semibold text-[#f5b41b]">0{index + 1}</p>
                <h3 className="mt-5 text-xl font-semibold text-white">{solution.title}</h3>
                <p className="mt-4 leading-7 text-white/58">{solution.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <CtaLink href="/zh/contact">沟通自动化项目</CtaLink>
          </div>
        </section>
      </main>
    </>
  );
}
