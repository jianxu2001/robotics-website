import type { Metadata } from "next";
import { CtaLink } from "@/components/cta-link";
import { IndustrialCard } from "@/components/industrial-card";
import { InquiryForm } from "@/components/inquiry-form";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { salesEmail, whatsappUrl } from "@/lib/contact";
import { productGroupsZh, productInquiryOptionsZh } from "@/lib/catalog-zh";
import { localizedAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "联系 SCR Robot | 获取工业机器人项目报价",
  description:
    "联系 SCR Robot，咨询码垛、拆垛、冲压锻压、机床上下料、3D视觉破包投料和输送自动化项目方案。",
  alternates: localizedAlternates("/zh/contact", "/contact", "/zh/contact"),
};

const quoteChecklist = [
  "产品尺寸、单件重量和包装形式",
  "目标产能、节拍和班次安排",
  "机器人负载、臂展和倾向系列",
  "托盘尺寸、堆垛高度和垛型要求",
  "现场布局、进出料方向和可用空间",
  "目的国家、安全要求和项目时间计划",
];

const applicationOptions = [
  "码垛",
  "拆垛",
  "冲压 / 锻压",
  "机床上下料",
  "3D视觉破包投料",
  "输送自动化",
];

export default function ZhContactPage() {
  return (
    <>
      <SiteHeader locale="zh" alternateHref="/contact" />
      <main className="min-h-screen bg-[#080a0d] pt-40 text-white sm:pt-32 lg:pt-28">
        <section className="section-shell pb-12">
          <SectionHeading
            eyebrow="联系销售工程师"
            title="获取机器人或自动化系统方案。"
            description="请提供产品、工艺、负载、臂展和工厂布局信息，我们将协助判断合适的机器人系列和自动化单元结构。"
            level={1}
          />
        </section>

        <section className="section-shell pt-8">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="grid gap-5">
              <IndustrialCard className="p-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f5b41b]">
                  直接咨询
                </p>
                <h2 className="mt-4 text-2xl font-semibold text-white">
                  发送项目资料获取报价。
                </h2>
                <p className="mt-4 leading-7 text-white/62">
                  信息越完整，我们越能快速判断机器人系列、夹具方案、输送布局和预算方向。
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <CtaLink href={`mailto:${salesEmail}?subject=Industrial%20Robot%20Project%20Inquiry`}>
                    邮件联系
                  </CtaLink>
                  <CtaLink href={whatsappUrl} variant="secondary">
                    WhatsApp
                  </CtaLink>
                </div>
              </IndustrialCard>

              <div className="steel-panel p-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f5b41b]">
                  机器人系列
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {productGroupsZh.flatMap((group) => group.productLines).map((line) => (
                    <a
                      key={line.name}
                      href={line.href}
                      className="rounded-md border border-white/10 bg-black/24 px-3 py-2 text-sm text-white/70 transition hover:border-[#f5b41b]/50 hover:text-white"
                    >
                      {line.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <IndustrialCard className="p-6 md:p-8">
              <InquiryForm
                locale="zh"
                applicationOptions={applicationOptions}
                seriesOptions={productInquiryOptionsZh}
              />
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
                <div
                  key={item}
                  className="rounded-lg border border-white/10 bg-black/24 p-5 text-white/68"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
