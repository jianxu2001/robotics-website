"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import {
  getHeroRotationDelay,
  getNextHeroSlideIndex,
  homepageHeroSlides,
} from "@/lib/homepage-media";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia(reducedMotionQuery);
  mediaQuery.addEventListener("change", callback);

  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(reducedMotionQuery).matches;
}

function getServerReducedMotionSnapshot() {
  return false;
}

export function HomepageHeroMedia() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mountedSlideCount, setMountedSlideCount] = useState(1);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot,
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const secondSlideTimer = window.setTimeout(
      () => setMountedSlideCount(2),
      800,
    );
    const thirdSlideTimer = window.setTimeout(
      () => setMountedSlideCount(homepageHeroSlides.length),
      1600,
    );

    return () => {
      window.clearTimeout(secondSlideTimer);
      window.clearTimeout(thirdSlideTimer);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const delay = getHeroRotationDelay(prefersReducedMotion);
    if (mountedSlideCount < homepageHeroSlides.length || delay === null) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) =>
        getNextHeroSlideIndex(current, homepageHeroSlides.length),
      );
    }, delay);

    return () => window.clearInterval(interval);
  }, [mountedSlideCount, prefersReducedMotion]);

  const visibleSlides = prefersReducedMotion
    ? homepageHeroSlides.slice(0, 1)
    : homepageHeroSlides.slice(0, mountedSlideCount);
  const displayedActiveIndex = prefersReducedMotion ? 0 : activeIndex;

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {visibleSlides.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          preload={index === 0}
          quality={60}
          sizes="100vw"
          className={`homepage-hero-slide ${
            index === displayedActiveIndex
              ? "homepage-hero-slide-active"
              : ""
          }`}
        />
      ))}
    </div>
  );
}
