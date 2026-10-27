import { IndustrialCard } from "@/components/industrial-card";
import { companyIdentity } from "@/lib/company-identity";

export function CompanyContactDetails({ locale = "en" }: { locale?: "en" | "zh" }) {
  const zh = locale === "zh";
  return (
    <IndustrialCard className="p-6">
      <h2 className="text-xl font-semibold text-white">{zh ? "公司名称与地址" : "Company Name & Address"}</h2>
      <dl className="mt-6 space-y-5 text-sm leading-7">
        {zh && <div><dt className="text-white/45">公司名称</dt><dd className="mt-1 text-white/85">{companyIdentity.nameZh}</dd></div>}
        <div>
          <dt className="text-white/45">{zh ? "英文名称" : "Company name"}</dt>
          <dd lang="en" className="mt-1 break-words text-white/85">{companyIdentity.nameEn}</dd>
        </div>
        {zh && <div><dt className="text-white/45">公司地址</dt><dd className="mt-1 text-white/85">{companyIdentity.addressZh}</dd></div>}
        <div>
          <dt className="text-white/45">{zh ? "英文地址" : "Address"}</dt>
          <dd lang="en" className="mt-1 break-words text-white/85"><address className="not-italic">{companyIdentity.addressEn}</address></dd>
        </div>
      </dl>
    </IndustrialCard>
  );
}
