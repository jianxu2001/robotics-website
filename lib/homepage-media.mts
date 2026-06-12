export const HERO_ROTATION_MS = 4000;

export const homepageHeroSlides = [
  "/images/bejing1%20(1).jpg",
  "/images/bejing1%20(2).jpg",
  "/images/bejing1%20(3).jpg",
] as const;

export function getNextHeroSlideIndex(
  currentIndex: number,
  slideCount: number,
) {
  if (slideCount < 1) {
    return 0;
  }

  return (currentIndex + 1) % slideCount;
}

export function getHeroRotationDelay(prefersReducedMotion: boolean) {
  return prefersReducedMotion ? null : HERO_ROTATION_MS;
}

export function getDeferredVideoSource(active: boolean, source: string) {
  return active ? source : undefined;
}
