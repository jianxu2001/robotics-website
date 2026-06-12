import test from "node:test";
import assert from "node:assert/strict";
import {
  getDeferredVideoSource,
  getHeroRotationDelay,
  getNextHeroSlideIndex,
} from "../lib/homepage-media.mts";

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
