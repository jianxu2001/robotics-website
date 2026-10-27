import type { Metadata } from "next";
import { ProductCatalogPage } from "@/components/product-catalog-page";
import { localizedAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "机器人产品 | 码垛、桌面、通用、冲压、上下料、协作机器人",
  description:
    "查看 SCR Robot 工业机器人与工作站类别：码垛/拆垛机器人、桌面型机器人、通用型机器人、冲压专用机器人、机床上下料机器人和便携式协作机器人。",
  alternates: localizedAlternates("/zh/products", "/products", "/zh/products"),
};

export default function ProductsPage() {
  return <ProductCatalogPage locale="zh" />;
}
