import Image from "next/image";
import Link from "next/link";
import { CtaLink } from "@/components/cta-link";
import { IndustrialCard } from "@/components/industrial-card";
import { SectionHeading } from "@/components/section-heading";
import { SeriesCard } from "@/components/series-card";
import { SiteHeader } from "@/components/site-header";
import {
  automationSolutionsZh,
  companyProfileZh,
  industriesZh,
  productCategoriesZh,
  productSeriesZh,
} from "@/lib/catalog-zh";
import { whatsappUrl } from "@/lib/contact";

const stats = [
  { value: "2017", label: "公司成立" },
  { value: "6,000 m2", label: "生产与工程基地" },
  { value: "50+", label: "生产、工程与服务团队" },
  { value: "20+", label: "工程技术人员" },
];

const trustPoints = [
  "集工业机器人制造、设备服务、销售与自动化集成为一体。",
  "具备机械、电气、软件、视觉与系统集成综合工程能力。",
  "产品覆盖四轴码垛机器人、六轴机器人、冲压转运机器人与输送自动化。",
  "支持海外客户技术方案、英文资料、远程沟通与项目化定制。",
];

const projectWorkflow = [
  {
    step: "01",
    title: "工况评估",
    description:
      "先确认产品尺寸、重量、包装形式、节拍、现场布局和安全要求，再推荐合适的机器人平台。",
  },
  {
    step: "02",
    title: "方案与报价",
    description:
      "方案可覆盖机器人选型、夹具概念、输送布局、垛型逻辑、安全防护、控制系统和预算方向。",
  },
  {
    step: "03",
    title: "系统制造",
    description:
      "机械、电气、软件、视觉和集成团队围绕完整生产单元推进，而不是只提供机器人本体。",
  },
  {
    step: "04",
    title: "交付支持",
    description:
      "可提供英文沟通、技术资料、远程故障支持和调试计划，降低海外项目沟通成本。",
  },
];

const buyerAssurance = [
  "根据真实产品和现场布局核对机器人负载、臂展、重复定位精度和工作范围。",
  "系统范围可包含夹具、输送线、安全围栏、PLC/HMI、视觉和非标工装。",
  "技术方案面向海外 B2B 买家，便于内部工程评审、采购审批和预算论证。",
  "询盘已配置邮件直达与 WhatsApp 跟进，降低销售机会遗漏。",
];

const quoteInputs = [
  "产品尺寸、单件重量和包装形式",
  "目标产能、节拍和班次安排",
  "托盘尺寸、垛型和最大堆垛高度",
  "进出料方向、现场布局和目的国家",
];

export const metadata = {
  title: "SCR Robot | 工业机器人与自动化系统",
  description:
    "华南机器人科技（广州）有限公司提供码垛机器人、拆垛系统、冲压自动化、机床上下料、3D视觉破包投料与输送自动化解决方案。",
};

export default function ZhHomePage() {
  const featuredSeries = productSeriesZh.filter((series) =>
    ["sch-series", "scr-series", "er-series"].includes(series.slug),
  );

  return (
    <>
      <SiteHeader locale="zh" alternateHref="/" />
      <main id="top" className="min-h-screen overflow-hidden bg-[#080a0d] text-white">
        <section className="relative min-h-[92vh] border-b border-white/10 pt-40 sm:pt-32 lg:pt-24">
          <Image
            src="/images/bejing1%20(1).jpg"
            alt="工业机器人码垛自动化单元"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-48"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,10,13,0.97)_0%,rgba(8,10,13,0.78)_46%,rgba(8,10,13,0.36)_100%)]" />
          <div className="absolute inset-0 industrial-grid opacity-50" />
          <div className="relative mx-auto flex min-h-[calc(92vh-8rem)] max-w-7xl items-center px-5 py-10 sm:min-h-[calc(92vh-6rem)] lg:px-8">
            <div className="max-w-5xl">
              <p className="mb-5 inline-flex rounded-md border border-[#f5b41b]/40 bg-black/50 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#f5b41b]">
                华南机器人智能工厂解决方案
              </p>
              <h1 className="max-w-5xl text-4xl font-semibold leading-[1.08] text-white md:text-6xl lg:text-7xl">
                面向全球工厂的工业机器人与自动化系统。
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-white/72 md:text-xl">
                {companyProfileZh.name} 提供码垛、拆垛、冲压、锻压、机床上下料、
                3D 视觉破包投料和输送自动化解决方案，帮助制造企业提升效率与稳定性。
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <CtaLink href="/zh/contact">获取报价</CtaLink>
                <CtaLink href="/zh/products" variant="secondary">
                  查看产品系列
                </CtaLink>
              </div>
              <div className="mt-10 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-[#0d1116]/84 p-5">
                    <div className="text-2xl font-bold text-white md:text-3xl">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-xs leading-5 text-white/52">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell">
          <SectionHeading
            eyebrow="产品类别"
            title="围绕真实工厂任务构建六大机器人类别。"
            description="产品框架按应用任务整理：码垛/拆垛、桌面自动化、通用搬运、冲压专用、机床上下料和便携式协作场景。"
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ["负载覆盖", "3-800 kg"],
              ["产品结构", "六大类别"],
              ["产品线", "11 个机器人产品线"],
            ].map(([label, value]) => (
              <div key={label} className="steel-panel p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-white/42">{label}</p>
                <p className="mt-2 text-xl font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {productCategoriesZh.map((category) => (
              <IndustrialCard key={category.title} className="group overflow-hidden">
                <div className="grid min-h-full lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="relative min-h-56 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="bg-[#f5f6f8] object-contain p-5 transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080a0d] via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-white">{category.title}</h3>
                    <p className="mt-4 leading-7 text-white/62">{category.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {category.series.map((series) => (
                        <span
                          key={series}
                          className="rounded-md border border-[#f5b41b]/25 bg-[#f5b41b]/8 px-3 py-1.5 text-xs font-semibold text-[#ffd36b]"
                        >
                          {series}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </IndustrialCard>
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0f1318]">
          <div className="section-shell">
            <SectionHeading
              eyebrow="核心机器人系列"
              title="适用于码垛、重载搬运与柔性自动化的机器人家族。"
              description="完整产品系列包括 ECR、SCH、SAR、SCR、SRL、STC、ER，覆盖 3-800 kg 负载范围。"
            />
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {featuredSeries.map((series) => (
                <SeriesCard
                  key={series.slug}
                  series={series}
                  hrefPrefix="/zh/products"
                  labels={{ payload: "负载", reach: "臂展", axes: "轴数", viewSeries: "查看系列" }}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="applications" className="section-shell">
          <SectionHeading
            eyebrow="行业应用"
            title="服务重复、重载和高稳定性生产场景。"
            description="从物料搬运、冲压自动化到视觉投料与输送线集成，面向制造企业的真实产线需求。"
            align="center"
          />
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {industriesZh.map((industry) => (
              <div key={industry} className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
                <div className="mb-5 h-1 w-12 bg-[#d71920]" />
                <h3 className="text-lg font-semibold text-white">{industry}</h3>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <CtaLink href="/zh/industries" variant="secondary">
              查看行业方案
            </CtaLink>
            <CtaLink href="/zh/case-studies" variant="ghost">
              查看案例方案
            </CtaLink>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#10151a]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div className="relative min-h-[420px] overflow-hidden rounded-lg border border-white/10">
              <Image src="/images/SCR.jpg" alt="华南机器人制造基地" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080a0d] via-transparent to-transparent" />
            </div>
            <div className="flex flex-col justify-center">
              <SectionHeading
                eyebrow="为什么选择我们"
                title="不仅提供机器人本体，更提供可落地的自动化工程能力。"
                description={companyProfileZh.engineering}
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {trustPoints.map((point) => (
                  <div key={point} className="rounded-lg border border-white/10 bg-black/20 p-5">
                    <div className="mb-4 h-1 w-12 bg-[#f5b41b]" />
                    <p className="leading-7 text-white/70">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell">
          <SectionHeading
            eyebrow="自动化解决方案"
            title="把机器人本体转化为完整生产系统。"
            description="海外项目通常需要的不只是机器人手臂，还包括夹具、输送、安全、控制、视觉和调试规划。"
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
        </section>

        <section className="border-y border-white/10 bg-[#0f1318]">
          <div className="section-shell">
            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
              <SectionHeading
                eyebrow="项目交付"
                title="面向海外自动化买家的清晰推进流程。"
                description="国际工厂客户需要的不只是产品列表，而是能把生产数据转化成可信方案，并持续支持交付的供应商。"
              />
              <div className="grid gap-4 md:grid-cols-2">
                {projectWorkflow.map((item) => (
                  <div key={item.step} className="steel-panel p-6">
                    <p className="font-mono text-sm font-bold text-[#f5b41b]">
                      {item.step}
                    </p>
                    <h3 className="mt-4 text-xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-4 leading-7 text-white/62">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <SectionHeading
                eyebrow="采购信任"
                title="在采购决策前降低项目不确定性。"
                description="严肃的机器人项目需要清晰的技术判断、及时沟通，以及足够支撑工程和采购团队推进的信息。"
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {buyerAssurance.map((item) => (
                  <div key={item} className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
                    <div className="mb-4 h-1 w-12 bg-[#d71920]" />
                    <p className="leading-7 text-white/68">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <IndustrialCard className="p-6 md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f5b41b]">
                更快报价
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-white">
                提供关键项目数据，获得更有价值的工程回复。
              </h3>
              <div className="mt-6 grid gap-3">
                {quoteInputs.map((item) => (
                  <div
                    key={item}
                    className="rounded-md border border-white/10 bg-black/24 px-4 py-4 text-white/70"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <CtaLink href="/zh/contact">发送询盘</CtaLink>
                <CtaLink href={whatsappUrl} variant="secondary">
                  WhatsApp
                </CtaLink>
              </div>
            </IndustrialCard>
          </div>
        </section>

        <section className="relative border-t border-white/10 bg-[#0c0f13]">
          <div className="absolute inset-0 industrial-grid opacity-30" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[0.85fr_1fr] lg:px-8">
            <SectionHeading
              eyebrow="开始项目"
              title="发送产品、负载、臂展和节拍需求。"
              description="我们将协助判断合适的机器人系列、自动化单元结构、输送布局和夹具方案。"
            />
            <IndustrialCard className="p-6 md:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                {["机器人系列选型", "码垛单元方案", "冲压自动化", "视觉与输送集成"].map((item) => (
                  <div key={item} className="rounded-md border border-white/10 bg-black/22 px-4 py-4 text-white/72">
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <CtaLink href="/zh/contact">联系销售</CtaLink>
                <CtaLink href={whatsappUrl} variant="secondary">WhatsApp</CtaLink>
              </div>
            </IndustrialCard>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#080a0d] px-5 py-8 text-white/54 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm md:flex-row md:items-center md:justify-between">
          <p>SCR Robot - 工业机器人、码垛系统、冲压自动化与智能工厂解决方案。</p>
          <div className="flex flex-wrap gap-5">
            <Link href="/zh/products" className="hover:text-white">产品</Link>
            <Link href="/zh/industries" className="hover:text-white">应用</Link>
            <Link href="/zh/case-studies" className="hover:text-white">案例</Link>
            <Link href="/zh/about" className="hover:text-white">关于我们</Link>
            <Link href="/zh/contact" className="hover:text-white">联系我们</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
