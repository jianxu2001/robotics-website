import test from "node:test";
import assert from "node:assert/strict";
import { productModels } from "../lib/product-data.ts";
import { filterCatalogModels, getModelCategory, modelInquiryHref, toCatalogModel } from "../lib/product-selection.ts";

const models = productModels.map(toCatalogModel);
const defaults = { query: "", category: "", minPayload: "", minReach: "", sort: "recommended" };

test("task filters distinguish compact SCH and SAR12 from their larger robot families", () => {
  const desktop = filterCatalogModels(models, { ...defaults, category: "desktop-robots" });
  assert.equal(desktop.length, 6);
  assert.ok(desktop.every((m) => m.series === "SCH-AE Series"));
  assert.equal(getModelCategory({ series: "SAR12 Series" }), "stamping-dedicated-robots");
  assert.equal(getModelCategory({ series: "SAR Series" }), "palletizing-depalletizing-robots");
  assert.equal(new Set(models.map((m) => m.categoryId)).size, 7);
});

test("payload and comma-formatted reach are combined with category and model search", () => {
  const results = filterCatalogModels(models, { ...defaults, category: "portable-collaborative-robots", minPayload: "40", minReach: "1900", query: "cr-50" });
  assert.deepEqual(results.map((m) => m.name), ["CR50-1900", "CR50L-1900"]);
  assert.equal(filterCatalogModels(models, { ...defaults, minReach: "10000" }).length, 0);
  assert.equal(filterCatalogModels(models, { ...defaults, query: "does not exist" }).length, 0);
  assert.equal(filterCatalogModels(models, defaults).length, productModels.length);
});

test("selection cards preserve lifting, packing rates, and configuration-dependent values", () => {
  const byName = (name) => models.find((m) => m.name === name);
  assert.match(byName("CR30-1900").configurationZh, /不带升降/);
  assert.match(byName("CR30L-1900").configurationZh, /500 mm/);
  assert.match(byName("BR-30").configuration, /≤15 pcs\/min/);
  assert.match(byName("BR-50").configuration, /≤8 pcs\/min/);
  const combined = filterCatalogModels(models, { ...defaults, minPayload: "700", query: "SCH" });
  assert.equal(combined.length, 1);
  assert.equal(combined[0].payload, "500/600/800 kg");
  assert.equal(combined[0].reach, "3,200/2,800 mm");
  assert.equal(combined[0].multipleConfigurations, true);
  assert.match(byName("SCH03AE-200-110").configurationZh, /第五轴/);
});

test("sorting does not mutate the catalog and zero-result filters can reset", () => {
  const order = models.map((m) => m.slug);
  assert.equal(filterCatalogModels(models, { ...defaults, sort: "payload" })[0].payload, "3 kg");
  assert.deepEqual(models.map((m) => m.slug), order);
  assert.equal(filterCatalogModels(models, { ...defaults, minPayload: "-1", minReach: "invalid" }).length, models.length);
});

test("model inquiry URLs identify every model in both languages", () => {
  for (const model of models) {
    for (const locale of ["en", "zh"]) {
      const url = new URL(modelInquiryHref(model, locale), "https://www.scr-robot.com");
      assert.equal(url.pathname, locale === "zh" ? "/zh/contact" : "/contact");
      assert.equal(url.searchParams.get("model"), `${model.seriesSlug}/${model.slug}`);
      assert.equal(url.hash, "#inquiry");
    }
  }
});
