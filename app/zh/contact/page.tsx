import type { Metadata } from "next";
import { CtaLink } from "@/components/cta-link";
import { IndustrialCard } from "@/components/industrial-card";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { salesEmail, whatsappUrl } from "@/lib/contact";
import { productSeriesZh } from "@/lib/catalog-zh";

export const metadata: Metadata = {
  title: "联系 SCR Robot | 获取工业机器人报价",
  description:
    "联系 SCR Robot，咨询码垛机器人、拆垛系统、冲压自动化、机床上下料、3D视觉破包投料和输送自动化项目。",
};

const quoteChecklist = [
  "产品尺寸、单件重量和包装形式",
  "目标产能、节拍和班次安排",
  "机器人负载、臂展和倾向系列",
  "托盘尺寸、堆垛高度和垛型要求",
  "现场布局、进出料方向和可用空间",
  "目的国家、安全要求和项目时间计划",
];

export default function ZhContactPage() {
  return (
    <>
      <SiteHeader locale="zh" alternateHref="/contact" />
      <main className="min-h-screen bg-[#080a0d] pt-40 text-white sm:pt-32 lg:pt-28">
        <section className="section-shell pb-12">
          <SectionHeading
            eyebrow="联系销售工程"
            title="获取机器人或自动化系统方案。"
            description="请提供产品、工艺、负载、臂展和工厂布局信息，我们将协助判断合适的机器人系列和自动化单元结构。"
            level={1}
          />
        </section>

        <section className="section-shell pt-8">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="grid gap-5">
              <IndustrialCard className="p-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f5b41b]">直接咨询</p>
                <h2 className="mt-4 text-2xl font-semibold text-white">发送项目资料获取报价。</h2>
                <p className="mt-4 leading-7 text-white/62">
                  信息越完整，我们越快判断机器人系列、夹具方案、输送布局和预算方向。
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <CtaLink href={`mailto:${salesEmail}?subject=Industrial%20Robot%20Project%20Inquiry`}>邮件联系</CtaLink>
                  <CtaLink href={whatsappUrl} variant="secondary">WhatsApp</CtaLink>
                </div>
              </IndustrialCard>

              <div className="steel-panel p-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f5b41b]">机器人系列</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {productSeriesZh.map((series) => (
                    <a key={series.slug} href={`/zh/products/${series.slug}`} className="rounded-md border border-white/10 bg-black/24 px-3 py-2 text-sm text-white/70 transition hover:border-[#f5b41b]/50 hover:text-white">
                      {series.series}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <IndustrialCard className="p-6 md:p-8">
              <form action={`mailto:${salesEmail}`} method="post" encType="text/plain" className="grid gap-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="grid gap-2 text-sm text-white/72">
                    姓名
                    <input name="name" className="h-12 rounded-md border border-white/12 bg-black/24 px-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#f5b41b]" placeholder="您的姓名" />
                  </label>
                  <label className="grid gap-2 text-sm text-white/72">
                    公司邮箱
                    <input name="email" type="email" className="h-12 rounded-md border border-white/12 bg-black/24 px-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#f5b41b]" placeholder="name@company.com" />
                  </label>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="grid gap-2 text-sm text-white/72">
                    应用场景
                    <select name="application" className="h-12 rounded-md border border-white/12 bg-black/24 px-4 text-white outline-none transition focus:border-[#f5b41b]" defaultValue="码垛">
                      <option>码垛</option>
                      <option>拆垛</option>
                      <option>冲压 / 锻压</option>
                      <option>机床上下料</option>
                      <option>3D 视觉破包投料</option>
                      <option>输送自动化</option>
                    </select>
                  </label>
                  <label className="grid gap-2 text-sm text-white/72">
                    倾向系列
                    <select name="series" className="h-12 rounded-md border border-white/12 bg-black/24 px-4 text-white outline-none transition focus:border-[#f5b41b]" defaultValue="暂不确定">
                      <option>暂不确定</option>
                      {productSeriesZh.map((series) => (
                        <option key={series.slug}>{series.series}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <label className="grid gap-2 text-sm text-white/72">
                  项目需求
                  <textarea name="message" rows={6} className="rounded-md border border-white/12 bg-black/24 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-[#f5b41b]" placeholder="产品类型、负载、臂展、节拍、托盘尺寸、现场布局、目的国家..." />
                </label>
                <button type="submit" className="min-h-12 rounded-md bg-[#f5b41b] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-black transition hover:bg-[#ffca45]">
                  发送询盘
                </button>
              </form>
            </IndustrialCard>
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#0f1318]">
          <div className="section-shell">
            <SectionHeading
              eyebrow="报价资料清单"
              title="这些信息能帮助工程团队更快回复。"
              description="机器人自动化项目越早明确生产数据，越容易快速形成可执行方案。"
            />
            <div className="mt-10 grid gap-3 md:grid-cols-2">
              {quoteChecklist.map((item) => (
                <div key={item} className="rounded-lg border border-white/10 bg-black/24 p-5 text-white/68">{item}</div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
