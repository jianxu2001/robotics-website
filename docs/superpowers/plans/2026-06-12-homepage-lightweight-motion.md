# Homepage Lightweight Motion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a low-bandwidth three-image hero crossfade and a click-to-load 60-second promotional video to the SCR Robot homepage.

**Architecture:** Keep `app/page.tsx` as a Server Component. Add two narrowly scoped Client Components: one mounts hero slides two and three after hydration and rotates the active slide, while the other keeps the video source out of the DOM until the visitor clicks the poster. Shared state rules live in a small TypeScript module tested with Node's built-in test runner.

**Tech Stack:** Next.js 16.2.6 App Router, React 19.2.4, TypeScript, Tailwind CSS 4, CSS keyframes/transitions, Node test runner, FFmpeg.

---

## File Structure

- Create `lib/homepage-media.mts`: slide metadata and pure state helpers.
- Create `tests/homepage-media.test.mjs`: Node tests for rotation and deferred video source behavior.
- Create `components/homepage-hero-media.tsx`: client-only hero image mounting and rotation.
- Create `components/deferred-promo-video.tsx`: click-to-load native video player.
- Modify `app/page.tsx`: compose the new media components into the existing homepage.
- Modify `app/globals.css`: crossfade, subtle drift, and reduced-motion styles.
- Modify `package.json`: add the built-in test command.
- Create `public/videos/scr-powder-automation-60s.mp4`: compressed 720p web delivery file.
- Create `public/images/scr-promo-video-poster.jpg`: static poster extracted from the final video.

### Task 1: Test the homepage media state rules

**Files:**
- Create: `tests/homepage-media.test.mjs`
- Create: `lib/homepage-media.mts`
- Modify: `package.json`

- [ ] **Step 1: Add the test command**

Add this script to `package.json`:

```json
"test": "node --test tests/*.test.mjs"
```

- [ ] **Step 2: Write the failing tests**

Create `tests/homepage-media.test.mjs`:

```js
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
```

- [ ] **Step 3: Run the tests and verify RED**

Run:

```powershell
npm test
```

Expected: FAIL because `lib/homepage-media.mts` does not exist.

- [ ] **Step 4: Implement the pure media rules**

Create `lib/homepage-media.mts`:

```ts
export const HERO_ROTATION_MS = 4000;

export const homepageHeroSlides = [
  "/images/bejing1%20(1).jpg",
  "/images/bejing1%20(2).jpg",
  "/images/bejing1%20(3).jpg",
] as const;

export function getNextHeroSlideIndex(currentIndex: number, slideCount: number) {
  if (slideCount < 1) return 0;
  return (currentIndex + 1) % slideCount;
}

export function getHeroRotationDelay(prefersReducedMotion: boolean) {
  return prefersReducedMotion ? null : HERO_ROTATION_MS;
}

export function getDeferredVideoSource(active: boolean, source: string) {
  return active ? source : undefined;
}
```

- [ ] **Step 5: Run the tests and verify GREEN**

Run:

```powershell
npm test
```

Expected: 3 passing tests, 0 failures.

- [ ] **Step 6: Commit**

```powershell
git add package.json tests/homepage-media.test.mjs lib/homepage-media.mts
git commit -m "test: define homepage media loading behavior"
```

### Task 2: Add the lightweight hero crossfade

**Files:**
- Create: `components/homepage-hero-media.tsx`
- Modify: `app/globals.css`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create the focused Client Component**

Create `components/homepage-hero-media.tsx` with:

```tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  getHeroRotationDelay,
  getNextHeroSlideIndex,
  homepageHeroSlides,
} from "@/lib/homepage-media.mts";

export function HomepageHeroMedia() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [additionalSlidesReady, setAdditionalSlidesReady] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    const mountTimer = window.setTimeout(() => {
      if (!mediaQuery.matches) setAdditionalSlidesReady(true);
    }, 800);

    return () => {
      window.clearTimeout(mountTimer);
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    const delay = getHeroRotationDelay(prefersReducedMotion);
    if (!additionalSlidesReady || delay === null) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) =>
        getNextHeroSlideIndex(current, homepageHeroSlides.length),
      );
    }, delay);

    return () => window.clearInterval(interval);
  }, [additionalSlidesReady, prefersReducedMotion]);

  const visibleSlides = additionalSlidesReady
    ? homepageHeroSlides
    : homepageHeroSlides.slice(0, 1);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {visibleSlides.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          preload={index === 0}
          sizes="100vw"
          className={`homepage-hero-slide ${
            index === activeIndex ? "homepage-hero-slide-active" : ""
          }`}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Add GPU-friendly crossfade styles**

Add to `app/globals.css`:

```css
.homepage-hero-slide {
  object-fit: cover;
  opacity: 0;
  transform: scale(1.04);
  transition:
    opacity 1.5s ease,
    transform 5.5s ease;
  will-change: opacity, transform;
}

.homepage-hero-slide-active {
  opacity: 0.48;
  transform: scale(1);
}

@media (prefers-reduced-motion: reduce) {
  .homepage-hero-slide {
    transition: none;
    transform: none;
  }
}
```

- [ ] **Step 3: Integrate it without moving the page to the client**

In `app/page.tsx`:

```tsx
import { HomepageHeroMedia } from "@/components/homepage-hero-media";
```

Replace the existing hero `<Image>` with:

```tsx
<HomepageHeroMedia />
```

Keep all existing overlay, headline, CTA, and statistics markup unchanged.

- [ ] **Step 4: Verify behavior and static checks**

Run:

```powershell
npm test
npm run lint
```

Expected: tests pass and ESLint exits 0.

- [ ] **Step 5: Commit**

```powershell
git add components/homepage-hero-media.tsx app/globals.css app/page.tsx
git commit -m "feat: add lightweight homepage hero motion"
```

### Task 3: Generate web video assets

**Files:**
- Create: `public/videos/scr-powder-automation-60s.mp4`
- Create: `public/images/scr-promo-video-poster.jpg`

- [ ] **Step 1: Create the destination directory**

```powershell
New-Item -ItemType Directory -Force -Path public/videos | Out-Null
```

- [ ] **Step 2: Compress the 1080p master to a 720p web file**

Run:

```powershell
$ffmpeg = "C:\Users\17876\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg.Shared_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build-shared\bin\ffmpeg.exe"
$source = "C:\Users\17876\Documents\视频剪辑\SCR双语宣传片-60秒-200kg版.mp4"
& $ffmpeg -y -i $source -vf "scale=-2:720" -c:v libx264 -preset medium -crf 28 -maxrate 1400k -bufsize 2800k -c:a aac -b:a 96k -movflags +faststart "public\videos\scr-powder-automation-60s.mp4"
```

Expected: H.264/AAC MP4 with the `moov` atom moved to the front and a target size near 8–14 MB.

- [ ] **Step 3: Extract the poster**

Run:

```powershell
& $ffmpeg -y -ss 00:00:09 -i $source -frames:v 1 -vf "scale=1280:-2" -q:v 3 "public\images\scr-promo-video-poster.jpg"
```

- [ ] **Step 4: Verify output media**

Run:

```powershell
$ffprobe = "C:\Users\17876\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg.Shared_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build-shared\bin\ffprobe.exe"
& $ffprobe -v error -show_entries format=duration,size,bit_rate -show_entries stream=codec_name,codec_type,width,height -of json "public\videos\scr-powder-automation-60s.mp4"
Get-Item "public\images\scr-promo-video-poster.jpg" | Select-Object Length
```

Expected: about 60 seconds, 1280x720 H.264 video, AAC audio, and a poster under 300 KB.

- [ ] **Step 5: Commit**

```powershell
git add public/videos/scr-powder-automation-60s.mp4 public/images/scr-promo-video-poster.jpg
git commit -m "assets: add optimized homepage promo video"
```

### Task 4: Add the deferred promotional video player

**Files:**
- Create: `components/deferred-promo-video.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create the click-to-load player**

Create `components/deferred-promo-video.tsx`:

```tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { getDeferredVideoSource } from "@/lib/homepage-media.mts";

const videoPath = "/videos/scr-powder-automation-60s.mp4";

export function DeferredPromoVideo() {
  const [active, setActive] = useState(false);
  const [failed, setFailed] = useState(false);
  const source = getDeferredVideoSource(active, videoPath);

  if (active && source && !failed) {
    return (
      <video
        className="aspect-video w-full bg-black object-cover"
        controls
        autoPlay
        playsInline
        preload="none"
        poster="/images/scr-promo-video-poster.jpg"
        aria-label="SCR Robot 60-second bilingual automation overview"
        onError={() => setFailed(true)}
      >
        <source src={source} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
    );
  }

  return (
    <button
      type="button"
      className="group relative block aspect-video w-full overflow-hidden bg-black text-left"
      onClick={() => {
        setFailed(false);
        setActive(true);
      }}
      aria-label="Play the 60-second SCR Robot bilingual automation video"
    >
      <Image
        src="/images/scr-promo-video-poster.jpg"
        alt=""
        fill
        sizes="(min-width: 1024px) 70vw, 100vw"
        className="object-cover opacity-75 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-90"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/20" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f5b41b] text-2xl text-[#080a0d] shadow-xl">
          ▶
        </span>
      </span>
      <span className="absolute bottom-5 left-5 right-5">
        <span className="block text-xs font-bold uppercase tracking-[0.16em] text-[#f5b41b]">
          60-second bilingual overview
        </span>
        <span className="mt-2 block text-xl font-semibold text-white">
          See SCR powder handling automation in action
        </span>
        {failed ? (
          <span className="mt-2 block text-sm text-white/70">
            The video could not load. Click to retry.
          </span>
        ) : null}
      </span>
    </button>
  );
}
```

- [ ] **Step 2: Replace the three static video-request cards**

In the existing “Watch the Robot in Action” section in `app/page.tsx`:

```tsx
import { DeferredPromoVideo } from "@/components/deferred-promo-video";
```

Render a large video card with:

```tsx
<div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-lg border border-white/10 bg-[#0d1116]">
  <DeferredPromoVideo />
  <div className="grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-center">
    <p className="leading-7 text-white/62">
      A concise bilingual introduction to SCR Robot powder handling,
      depalletizing, feeding, and palletizing capabilities.
    </p>
    <CtaLink href="/contact" variant="secondary">
      Request a Layout Review
    </CtaLink>
  </div>
</div>
```

- [ ] **Step 3: Run automated checks**

Run:

```powershell
npm test
npm run lint
npm run build
node scripts\seo-check.mjs
git diff --check
```

Expected: all commands exit 0.

- [ ] **Step 4: Browser verification**

Verify on desktop and mobile widths:

- First hero image is visible immediately.
- Images two and three crossfade without moving the headline or CTAs.
- Reduced-motion mode leaves the first image static.
- No video request appears before clicking the poster.
- Clicking the poster creates the native player and starts playback.
- Video controls, sound, progress, and fullscreen are available.
- The poster and video section do not cause layout shift.

- [ ] **Step 5: Commit**

```powershell
git add components/deferred-promo-video.tsx app/page.tsx
git commit -m "feat: add click-to-load homepage promo video"
```

### Task 5: Final review

**Files:**
- Review all files changed by Tasks 1–4.

- [ ] **Step 1: Inspect the final diff**

```powershell
git diff 707a10c..HEAD --stat
git diff 707a10c..HEAD -- app/page.tsx app/globals.css components lib tests package.json
```

- [ ] **Step 2: Confirm repository scope**

```powershell
git status --short
git check-ignore .superpowers/brainstorm/homepage-video-20260612/content/lightweight-homepage-motion.html
```

Expected: no uncommitted files and `.superpowers/` remains ignored.

- [ ] **Step 3: Report measured media sizes and verification results**

Include the final MP4 size, poster size, test count, build result, lint result, SEO check result, and browser checks in the completion summary.
