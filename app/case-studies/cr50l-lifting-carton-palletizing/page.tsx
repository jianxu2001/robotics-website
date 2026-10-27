import { CustomerCaseStudy } from "@/components/customer-case-study";
import { getCustomerCaseMetadata, getCustomerCaseStructuredData } from "@/lib/customer-case";
import { cr50lCaseProject } from "@/lib/cr50l-case";
import { serializeJsonLd } from "@/lib/seo";

export const metadata = getCustomerCaseMetadata(cr50lCaseProject, "en");

export default function Cr50lCasePage() {
  return (
    <>
      {getCustomerCaseStructuredData(cr50lCaseProject, "en").map((data, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />
      ))}
      <CustomerCaseStudy project={cr50lCaseProject} locale="en" />
    </>
  );
}
