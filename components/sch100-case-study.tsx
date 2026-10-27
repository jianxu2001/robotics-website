import { CustomerCaseStudy, FeaturedCustomerCase } from "@/components/customer-case-study";
import { type CaseLocale } from "@/lib/customer-case";
import { sch100CaseProject } from "@/lib/sch100-case";

export function FeaturedSch100Case({ locale = "en" }: { locale?: CaseLocale }) {
  return <FeaturedCustomerCase project={sch100CaseProject} locale={locale} />;
}

export function Sch100CaseStudy({ locale }: { locale: CaseLocale }) {
  return <CustomerCaseStudy project={sch100CaseProject} locale={locale} />;
}
