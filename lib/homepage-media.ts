export const HERO_ROTATION_MS = 4000;

export const homepageHeroSlides = [
  "/images/scr-hero-depalletizing.webp",
  "/images/scr-hero-palletizing.webp",
  "/images/scr-hero-bag-feeding.webp",
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
