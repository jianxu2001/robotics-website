"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  productGroups,
  productSeries,
  type ProductGroup,
  type ProductSeries,
} from "@/lib/catalog";
import { productGroupsZh, productSeriesZh } from "@/lib/catalog-zh";
import {
  findProductModelByName,
  getProductModelHref,
} from "@/lib/product-models";

type ProductMegaMenuProps = {
  locale?: "en" | "zh";
};

const copy = {
  en: {
    trigger: "Products",
    category: "Product Categories",
    lines: "Robot Lines",
    models: "Representative Models",
    allProducts: "All Products",
    getQuote: "Get Quote",
    noModels: "Project inquiry",
  },
  zh: {
    trigger: "产品",
    category: "产品类别",
    lines: "机器人系列",
    models: "代表型号",
    allProducts: "全部产品",
    getQuote: "获取报价",
    noModels: "项目咨询",
  },
};

function getSeriesForLine(lineHref: string, seriesList: ProductSeries[]) {
  return seriesList.find((series) => lineHref.endsWith(`/${series.slug}`));
}

function getPortableModelName(lineName: string) {
  if (lineName.includes("30")) return "30KG Robot";
  if (lineName.includes("50")) return "50KG Robot";
  return null;
}

function getModelGroups(
  group: ProductGroup,
  seriesList: ProductSeries[],
  fallback: string,
  locale: "en" | "zh",
) {
  return group.productLines.map((line) => {
    const series = getSeriesForLine(line.href, seriesList);
    const portableModelName = getPortableModelName(line.name);
    const portableModel = portableModelName
      ? findProductModelByName(portableModelName)
      : null;

    return {
      line,
      models:
        series?.models.map((model) => {
          const detail = findProductModelByName(model.name, series.slug);

          return {
            name: model.name,
            href: detail ? getProductModelHref(detail, locale) : line.href,
          };
        }) ??
        (portableModel
          ? [
              {
                name: line.name,
                href: getProductModelHref(portableModel, locale),
              },
            ]
          : [{ name: fallback, href: line.href }]),
    };
  });
}

export function ProductMegaMenu({ locale = "en" }: ProductMegaMenuProps) {
  const isZh = locale === "zh";
  const t = copy[locale];
  const groups = isZh ? productGroupsZh : productGroups;
  const seriesList = isZh ? productSeriesZh : productSeries;
  const productsHref = isZh ? "/zh/products" : "/products";
  const contactHref = isZh ? "/zh/contact" : "/contact";
  const [activeIndex, setActiveIndex] = useState(0);

  const activeGroup = groups[activeIndex] ?? groups[0];
  const modelGroups = useMemo(
    () => getModelGroups(activeGroup, seriesList, t.noModels, locale),
    [activeGroup, seriesList, t.noModels, locale],
  );

  return (
    <div className="group/product-menu relative flex self-stretch items-center">
      <Link
        href={productsHref}
        aria-haspopup="true"
        className="relative py-2 text-sm font-medium text-white/68 transition hover:text-white group-hover/product-menu:text-white"
      >
        {t.trigger}
        <span className="absolute inset-x-0 -bottom-1 h-0.5 origin-left scale-x-0 bg-[#f5b41b] transition group-hover/product-menu:scale-x-100" />
      </Link>

      <div className="pointer-events-none fixed inset-x-0 top-16 hidden opacity-0 transition duration-200 group-hover/product-menu:pointer-events-auto group-hover/product-menu:block group-hover/product-menu:opacity-100 group-focus-within/product-menu:pointer-events-auto group-focus-within/product-menu:block group-focus-within/product-menu:opacity-100 lg:block">
        <div className="border-y border-white/10 bg-[#0b0e12]/98 shadow-[0_28px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl">
          <div className="mx-auto grid max-w-7xl grid-cols-[0.9fr_0.95fr_1.2fr] divide-x divide-white/10 px-8 py-8">
            <div className="pr-8">
              <div className="mb-5 flex items-center justify-between gap-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f5b41b]">
                  {t.category}
                </p>
                <Link
                  href={productsHref}
                  className="text-xs font-semibold text-white/50 transition hover:text-white"
                >
                  {t.allProducts}
                </Link>
              </div>
              <div className="grid gap-2">
                {groups.map((group, index) => (
                  <Link
                    key={group.slug}
                    href={`${productsHref}#${group.slug}`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    className={`rounded-md border px-4 py-3 text-sm font-semibold transition ${
                      activeIndex === index
                        ? "border-[#f5b41b]/45 bg-[#f5b41b]/12 text-[#ffd36b]"
                        : "border-transparent bg-white/[0.035] text-white/72 hover:border-white/12 hover:text-white"
                    }`}
                  >
                    {group.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="px-8">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-[#f5b41b]">
                {t.lines}
              </p>
              <div className="grid gap-3">
                {activeGroup.productLines.map((line) => (
                  <Link
                    key={line.name}
                    href={line.href}
                    className="rounded-md border border-white/10 bg-white/[0.035] px-4 py-3 transition hover:border-[#f5b41b]/45 hover:bg-[#f5b41b]/10"
                  >
                    <span className="block text-sm font-semibold text-white">
                      {line.name}
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-white/48">
                      {line.description}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="pl-8">
              <div className="mb-5 flex items-center justify-between gap-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f5b41b]">
                  {t.models}
                </p>
                <Link
                  href={contactHref}
                  className="rounded-md border border-white/12 bg-white/5 px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] text-white/62 transition hover:border-[#f5b41b]/50 hover:text-white"
                >
                  {t.getQuote}
                </Link>
              </div>
              <div className="grid max-h-[470px] gap-5 overflow-y-auto pr-2">
                {modelGroups.map((modelGroup) => (
                  <div key={modelGroup.line.name}>
                    <Link
                      href={modelGroup.line.href}
                      className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-white/50 transition hover:text-[#ffd36b]"
                    >
                      {modelGroup.line.name}
                    </Link>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {modelGroup.models.map((model) => (
                        <Link
                          key={`${modelGroup.line.name}-${model.name}`}
                          href={model.href}
                          className="rounded-md border border-white/8 bg-black/22 px-3 py-2 text-sm text-white/70 transition hover:border-[#f5b41b]/45 hover:text-white"
                        >
                          {model.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
