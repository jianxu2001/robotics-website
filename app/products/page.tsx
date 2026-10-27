import type { Metadata } from "next";
import { ProductCatalogPage } from "@/components/product-catalog-page";
import { localizedAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Industrial Robot Products | Palletizing & Tending Robots",
  description:
    "Compare SCR Robot palletizing, depalletizing, stamping, machine tending, six-axis, desktop, and collaborative robot series for factory automation.",
  alternates: localizedAlternates("/products", "/products", "/zh/products"),
};

export default function ProductsPage() {
  return <ProductCatalogPage locale="en" />;
}
