import test from "node:test";
import assert from "node:assert/strict";
import {
  getDeferredVideoSource,
  getHeroRotationDelay,
  getNextHeroSlideIndex,
  homepageHeroSlides,
} from "../lib/homepage-media.ts";

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
