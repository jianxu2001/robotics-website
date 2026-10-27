import { Sch100CaseStudy } from "@/components/sch100-case-study";
import { getSch100CaseMetadata, getSch100CaseStructuredData } from "@/lib/sch100-case";
import { serializeJsonLd } from "@/lib/seo";

export const metadata = getSch100CaseMetadata("en");

export default function Sch100CasePage() {
  return (
    <>
      {getSch100CaseStructuredData("en").map((data, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />
      ))}
      <Sch100CaseStudy locale="en" />
    </>
  );
}
