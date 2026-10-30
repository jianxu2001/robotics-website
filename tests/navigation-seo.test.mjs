import test from "node:test";
import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith("@/") || specifier.startsWith(".")) {
      const url = specifier.startsWith("@/")
        ? new URL(`../${specifier.slice(2)}`, import.meta.url)
        : new URL(specifier, context.parentURL);
      if (!/\.[a-z]+$/i.test(url.pathname) && existsSync(fileURLToPath(url) + ".ts")) {
        return nextResolve(url.href + ".ts", context);
      }
    }
    return nextResolve(specifier, context);
  },
});
const { productGroups } = await import("../lib/catalog.ts");
const { productGroupsZh } = await import("../lib/catalog-zh.ts");
const { productModels } = await import("../lib/product-data.ts");
const { getProductNavigation } = await import("../lib/product-navigation.ts");
const { getModelCategory } = await import("../lib/product-selection.ts");
const { getProductModelStructuredData, getProductModelFaqs } = await import("../lib/seo.ts");

test("navigation places every model in its application exactly once in both languages", () => {
  for (const [locale, groups] of [["en", productGroups], ["zh", productGroupsZh]]) {
    const menu = getProductNavigation(groups, productModels, locale);
    const links = menu.flatMap((group) => group.modelGroups.flatMap((line) => line.models));
    assert.equal(links.length, productModels.length);
    assert.equal(new Set(links.map((m) => m.href)).size, productModels.length);
    for (const group of menu) {
      for (const line of group.modelGroups) {
        assert.ok(line.models.length, `${locale}: ${line.line.name}`);
        for (const entry of line.models) {
          const model = productModels.find((m) => m.name === entry.name);
          assert.equal(getModelCategory(model), group.slug);
          assert.equal(entry.href, `${locale === "zh" ? "/zh" : ""}/products/${model.seriesSlug}/${model.slug}`);
        }
      }
    }
    const desktop = menu.find((g) => g.slug === "desktop-robots").modelGroups.flatMap((l) => l.models);
    assert.equal(desktop.length, 6);
    assert.ok(desktop.every((m) => productModels.find((p) => p.name === m.name).series === "SCH-AE Series"));
    const heavy = menu.find((g) => g.slug === "palletizing-depalletizing-robots").modelGroups.flatMap((l) => l.models);
    assert.ok(!heavy.some((m) => /SAR12|AE-/.test(m.name)));
  }
});

test("Chinese product schema keeps its own URLs and the verified catalog specifications", () => {
  for (const model of productModels) {
    const data = getProductModelStructuredData(model, "zh");
    const product = data.find((d) => d["@type"] === "Product");
    const breadcrumb = data.find((d) => d["@type"] === "BreadcrumbList");
    const page = data.find((d) => d["@type"] === "WebPage");
    const url = `https://www.scr-robot.com/zh/products/${model.seriesSlug}/${model.slug}`;
    assert.equal(product.url, url);
    assert.equal(page.url, url);
    assert.equal(page.inLanguage, "zh-CN");
    assert.equal(breadcrumb.itemListElement.at(-1).item, url);
    assert.equal(breadcrumb.itemListElement[0].name, "首页");
    assert.equal(product.model, model.name);
    const payload = product.additionalProperty.find((p) => ["Maximum payload", "Payload"].includes(p.name));
    assert.equal(payload.value, model.payload);
    assert.equal(product.offers, undefined);
    assert.equal(product.aggregateRating, undefined);
    assert.ok(getProductModelFaqs(model, "zh").every((f) => /[\u4e00-\u9fff]/.test(f.question) && /[\u4e00-\u9fff]/.test(f.answer)));
  }
});
