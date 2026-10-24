import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { productModels, getProductModel } from "../lib/product-data.ts";

const numbers = (value) => (value.replaceAll(",", "").match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
const expected = JSON.parse(fs.readFileSync(new URL("./fixtures/industrial-catalog-2026.json", import.meta.url), "utf8"));
test("all 38 industrial configurations match the owner-supplied PDF tables", () => {
  assert.equal(expected.length, 38);
  for (const row of expected) {
    const model = productModels.find((item) => item.name === row.name);
    assert.ok(model, `Missing ${row.name} from PDF page ${row.page}`);
    ["axes", "payload", "reach", "repeatability", "bodyWeight", "power"].forEach((key, index) => {
      assert.deepEqual(numbers(model[key]), numbers(row.values[index]), `${row.name} ${key}, PDF page ${row.page}`);
    });
    assert.match(model.power, /kVA$/);
  }
});
test("current CR models retain their confirmed payload, axes, height and kVA", () => {
  for (const [slug, payload, axes, height, weight, power] of [
    ["cr30-1900", "30 kg", "5", "≤1,800 mm", "430 kg", "8 kVA"],
    ["cr30l-1900", "30 kg", "6", "≤2,300 mm", "480 kg", "8 kVA"],
    ["cr50-1900", "50 kg", "5", "≤1,800 mm", "450 kg", "10 kVA"],
    ["cr50l-1900", "50 kg", "6", "≤2,300 mm", "500 kg", "10 kVA"],
  ]) {
    const model = getProductModel("cr-series", slug);
    assert.ok(model);
    assert.deepEqual([model.payload, model.axes, model.reach, model.repeatability, model.bodyWeight, model.power], [payload, axes, "1,900 mm", "±0.1 mm", weight, power]);
    assert.equal(model.specifications.find((row) => row.name === "Palletizing height, including pallet").value, height);
    assert.equal(model.environment[0].value, "-15–55 °C");
  }
});
test("BR packing models use the current names, cycle rates and kW", () => {
  for (const [slug, payload, rate] of [["br-30", "30 kg", "≤15 pcs/min"], ["br-50", "50 kg", "≤8 pcs/min"]]) {
    const model = getProductModel("br-series", slug);
    assert.deepEqual([model.payload, model.reach, model.bodyWeight, model.power], [payload, "1,900 mm", "150 kg", "3 kW"]);
    assert.equal(model.specifications.find((row) => row.name === "Packing rate").value, rate);
    assert.match(model.technicalNote, /not equivalent pressures/);
    assert.equal(model.environment.length, 0);
  }
});
test("joint ranges retain linear strokes, coupled motion and updated angular limits", () => {
  const byName = (name) => productModels.find((model) => model.name === name).jointParameters.map((row) => row.value);
  assert.deepEqual(byName("SCH130E-2200-1800"), ["+165°, -155°", "1,800 mm", "±150°", "±360°", "/", "/"]);
  assert.equal(byName("SCH210E-2350-1650")[1], "1,650 mm");
  assert.deepEqual(byName("SCR180-3200"), ["±178°", "+80°, -60°", "Global: +120°, -20°; coupled: +65°, -65°", "±360°", "/", "/"]);
  assert.equal(byName("SAR80-2450-2300")[3], "±360°");
});
test("model URLs are unique and catalog assets exist", () => {
  const paths = productModels.map((model) => `${model.seriesSlug}/${model.slug}`);
  assert.equal(new Set(paths).size, paths.length);
  for (const model of productModels.filter((item) => item.specifications)) {
    for (const asset of [model.image, model.drawing, model.catalogFile]) assert.ok(fs.existsSync(new URL(`../public${asset}`, import.meta.url)), asset);
  }
});
