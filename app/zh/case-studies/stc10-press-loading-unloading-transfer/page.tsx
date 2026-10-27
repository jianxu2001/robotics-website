import { CustomerCaseStudy } from "@/components/customer-case-study";
import { getCustomerCaseMetadata, getCustomerCaseStructuredData } from "@/lib/customer-case";
import { stc10CaseProject } from "@/lib/stc10-case";
import { serializeJsonLd } from "@/lib/seo";

export const metadata = getCustomerCaseMetadata(stc10CaseProject, "zh");

export default function ZhStc10CasePage() {
  return (
    <>
      {getCustomerCaseStructuredData(stc10CaseProject, "zh").map((data, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />
      ))}
      <CustomerCaseStudy project={stc10CaseProject} locale="zh" />
    </>
  );
}
