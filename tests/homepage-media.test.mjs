import test from "node:test";
import assert from "node:assert/strict";
import "./register-paths.mjs";
const {
  getDeferredVideoSource,
  getHeroRotationDelay,
  getNextHeroSlideIndex,
  homepageHeroSlides,
} = await import("../lib/homepage-media.ts");
const { getApplicationMedia } = await import("../lib/application-media.ts");

test("hero rotation advances and wraps to the first slide", () => {
  assert.equal(getNextHeroSlideIndex(0, 3), 1);
  assert.equal(getNextHeroSlideIndex(2, 3), 0);
});

test("hero rotation stops when reduced motion is requested", () => {
  assert.equal(getHeroRotationDelay(true), null);
  assert.equal(getHeroRotationDelay(false), 4000);
});

test("video source is absent until the player is activated", () => {
  const source = "/videos/scr-powder-automation-60s.mp4";
  assert.equal(getDeferredVideoSource(false, source), undefined);
  assert.equal(getDeferredVideoSource(true, source), source);
});

test("hero rotation uses dedicated web-optimized images", () => {
  assert.equal(homepageHeroSlides.length, 3);
  assert.ok(homepageHeroSlides.every((slide) => slide.endsWith(".webp")));
});

test("carton palletizing uses the product illustration across hero and application cards", () => {
  const en = getApplicationMedia("carton-palletizing", "en");
  const zh = getApplicationMedia("carton-palletizing", "zh");
  assert.equal(en.kind, "product-render");
  assert.equal(en.src, homepageHeroSlides[0]);
  assert.equal(zh.src, en.src);
  assert.equal(zh.caseHref, `/zh${en.caseHref}`);
  assert.equal(getApplicationMedia("stamping-transfer").kind, "video-frame");
});
