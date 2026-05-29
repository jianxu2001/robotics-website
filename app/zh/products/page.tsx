import type { Metadata } from "next";
import { CtaLink } from "@/components/cta-link";
import { SectionHeading } from "@/components/section-heading";
import { SeriesCard } from "@/components/series-card";
import { SiteHeader } from "@/components/site-header";
import { SpecTable } from "@/components/spec-table";
import { commonEnvironmentZh, industriesZh, productSeriesZh } from "@/lib/catalog-zh";

export const metadata: Metadata = {
  title: "机器人产品 | ECR、SCH、SAR、SCR、SRL、STC、ER 系列",
  description:
    "查看 SCR Robot 工业机器人系列，覆盖码垛、拆垛、冲压、机床上下料、3D视觉破包投料和输送自动化。",
};

const zhSpecHeadings = ["型号", "轴数", "最大负载", "臂展", "重复定位精度", "本体重量", "电源容量"];

export default function ZhProductsPage() {
  return (
    <>
      <SiteHeader locale="zh" alternateHref="/products" />
      <main className="min-h-screen bg-[#080a0d] pt-40 text-white sm:pt-32 lg:pt-28">
        <section className="section-shell pb-12">
          <SectionHeading
            eyebrow="产品中心"
            title="面向搬运、码垛、冲压和柔性生产的工业机器人系列。"
            description="产品内容基于华南机器人画册整理，覆盖 3-800 kg 负载范围，适用于海外工业客户选型与项目沟通。"
            level={1}
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["机器人系列", "ECR / SCH / SAR / SCR / SRL / STC / ER"],
              ["负载范围", "3-800 kg"],
              ["臂展范围", "200-3,500 mm"],
              ["应用场景", "码垛、冲压、上下料、输送"],
            ].map(([label, value]) => (
              <div key={label} className="steel-panel p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-white/42">{label}</p>
                <p className="mt-3 text-xl font-semibold leading-7 text-white">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="robot-series" className="section-shell pt-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {productSeriesZh.map((series) => (
              <SeriesCard
                key={series.slug}
                series={series}
                hrefPrefix="/zh/products"
                labels={{ payload: "负载", reach: "臂展", axes: "轴数", viewSeries: "查看系列" }}
              />
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0f1318]">
          <div className="section-shell">
            <SectionHeading
              eyebrow="技术规格"
              title="画册型号参数整理。"
              description="以下表格汇总轴数、最大负载、臂展、重复定位精度、本体重量和电源容量。最终选型需结合产品尺寸、节拍、夹具和现场布局确认。"
            />
            <div className="mt-12 grid gap-12">
              {productSeriesZh.map((series) => (
                <section key={series.slug} id={series.slug} className="scroll-mt-36">
                  <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="font-mono text-sm font-bold uppercase tracking-[0.14em] text-[#f5b41b]">{series.series}</p>
                      <h2 className="mt-2 text-2xl font-semibold text-white">{series.title}</h2>
                    </div>
                    <CtaLink href={`/zh/products/${series.slug}`} variant="ghost">详情页</CtaLink>
                  </div>
                  <SpecTable series={series} headings={zhSpecHeadings} />
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeading
              eyebrow="应用行业"
              title="来自画册的典型应用场景。"
              description="产品适用于对重复定位、负载能力和系统集成要求较高的工业自动化项目。"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {industriesZh.map((industry) => (
                <div key={industry} className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
                  <div className="mb-5 h-1 w-12 bg-[#d71920]" />
                  <h3 className="font-semibold text-white">{industry}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#0c0f13]">
          <div className="section-shell">
            <SectionHeading
              eyebrow="使用环境"
              title="标准工业使用条件。"
              description="大部分机器人系列共享以下环境要求，具体项目需结合实际工况确认。"
            />
            <div className="mt-10 grid gap-3 md:grid-cols-2">
              {commonEnvironmentZh.map((item) => (
                <div key={item} className="rounded-lg border border-white/10 bg-black/24 p-5 text-white/68">{item}</div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
