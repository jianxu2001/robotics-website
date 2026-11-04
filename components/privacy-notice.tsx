import { SiteHeader } from "@/components/site-header";
import { SectionHeading } from "@/components/section-heading";
import { companyIdentity } from "@/lib/company-identity";
import { salesEmail } from "@/lib/contact";

export function PrivacyNotice({ locale }: { locale: "en" | "zh" }) {
  const zh = locale === "zh";
  const sections = zh ? [
    ["询盘与项目资料", "您通过表单提供的姓名、联系方式、公司、产品用途和项目资料，用于回复询盘、选型、报价及项目沟通。询盘会经网站托管和已配置的投递服务发送至公司收件渠道，并包含来源页和参考编号。请仅提交评估项目所需的资料。"],
    ["可选择的 Google Analytics 统计", "您选择允许后，本站才加载 Google Analytics 4，用于了解页面访问、产品视频播放、画册入口和咨询流程。Google 统计使用 Cookie 等标识符，并处理浏览器、设备、网络等技术信息。Google 按其政策处理这些信息，处理地点可能位于您所在国家或地区以外。"],
    ["统计事件的范围", "本站自定义事件只发送用途类别、语言、联系渠道和投递状态等允许的值，以及不带查询参数或片段的公开页面地址。姓名、手机、邮箱、项目正文、询盘参考编号和带咨询内容的原始联系链接不进入这些事件。广告个性化与 Google signals 在本站代码中关闭。"],
    ["Cookie 与您的选择", "允许或拒绝统计的选择保存在当前浏览器的本地存储中；选择允许后，Google Analytics 可设置 _ga 开头的 Cookie。页脚“统计设置”可重新选择。关闭统计会删除本站可访问的第一方 GA Cookie 并刷新页面，请先保存未提交的内容。拒绝统计不影响产品浏览和询盘功能。"],
    ["邮件、WhatsApp 与现场资料", "点击邮件、电话或 WhatsApp 链接后，您将在相应应用中决定是否发送。所用应用会按其自身政策处理信息。请确保您有权分享照片、视频或布局，并在发送前遮挡不必要的个人资料和客户保密信息。"],
    ["联系与数据请求", "如需查询、更正或请求删除您提交的询盘资料，或了解具体保留安排，请通过下方公司邮箱联系并说明相关询盘。我们会核对请求与实际业务记录，按适用要求处理。必要的托管、安全和投递记录由相应服务处理。"],
  ] : [
    ["Enquiries and project information", "We use the name, contact details, company, application and project information you submit to respond, assess equipment, prepare quotations and discuss your project. Our hosting and configured delivery services transmit enquiries to the company's receiving channels with a source page and reference. Please provide only what is needed to assess the project."],
    ["Optional Google Analytics", "We load Google Analytics 4 only after you allow analytics. It helps us understand page visits, product-video use, catalog links and the enquiry process. Google Analytics uses cookies and similar identifiers and processes technical information about browsers, devices and networks under Google's policies. Processing may take place outside your country or region."],
    ["Scope of analytics events", "Our custom events send allowlisted categories such as application, language, contact method and delivery status, plus public page URLs without query strings or fragments. Names, phones, emails, project messages, enquiry references and raw contact links containing project text are excluded from these events. Our site code disables ad personalization and Google signals."],
    ["Cookies and your choices", "Your analytics choice is stored in this browser's local storage. After you allow analytics, Google Analytics may set cookies beginning with _ga. Reopen Analytics settings in the footer to change your choice. Turning analytics off removes accessible first-party GA cookies and reloads the page, so save unsubmitted information first. Product browsing and enquiries work if you decline analytics."],
    ["Email, WhatsApp and site materials", "After opening an email, phone or WhatsApp link, you decide whether to send in that application. The application processes information under its own policies. Share only photos, videos and layouts you are authorized to provide, and remove unnecessary personal or confidential client information before sending."],
    ["Contact and data requests", "Contact the company email below to ask about, correct or request deletion of submitted enquiry information, or to discuss retention arrangements. Identify the relevant enquiry so we can check the request against business records and handle it under applicable requirements. Relevant services process necessary hosting, security and delivery records."],
  ];
  return <>
    <SiteHeader locale={locale} alternateHref={zh ? "/privacy" : "/zh/privacy"} />
    <main lang={zh ? "zh-CN" : "en"} className="min-h-screen bg-[#080a0d] px-5 pb-20 pt-40 text-white sm:pt-32 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeading level={1} eyebrow={zh ? "数据用途与访问选择" : "Data use & visitor choices"} title={zh ? "隐私与统计说明" : "Privacy & Analytics"} description={zh ? "更新日期：2026年11月4日" : "Updated: November 4, 2026"} />
        <p className="mt-8 leading-8 text-white/70">{zh ? companyIdentity.nameZh : companyIdentity.nameEn}</p>
        <div className="mt-10 grid gap-8">{sections.map(([title, text]) => <section key={title} className="border-t border-white/10 pt-6"><h2 className="text-xl font-semibold">{title}</h2><p className="mt-3 leading-8 text-white/70">{text}</p></section>)}</div>
        <div className="mt-10 rounded-xl border border-white/15 p-6 leading-8 text-white/70">
          <p><a className="text-[#f5b41b] underline underline-offset-4" href={`mailto:${salesEmail}`}>{salesEmail}</a></p>
          <p className="mt-3">{zh ? "Google 的信息处理与访问者选择：" : "Google's information practices and visitor controls:"}</p>
          <a href="https://policies.google.com/technologies/partner-sites" className="text-[#f5b41b] underline underline-offset-4">{zh ? "Google 如何使用来自合作伙伴网站的信息" : "How Google uses information from partner sites"}</a>
        </div>
      </div>
    </main>
  </>;
}
