import { ProductMegaMenuClient } from "@/components/product-mega-menu-client";
import { productGroups } from "@/lib/catalog";
import { productGroupsZh } from "@/lib/catalog-zh";
import { productModels } from "@/lib/product-data";
import { getProductNavigation } from "@/lib/product-navigation";

export function ProductMegaMenu({ locale = "en" }: { locale?: "en" | "zh" }) {
  const groups = locale === "zh" ? productGroupsZh : productGroups;
  return <ProductMegaMenuClient locale={locale} groups={getProductNavigation(groups, productModels, locale)} />;
}
