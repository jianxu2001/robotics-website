"use client";

import { useRef, useState } from "react";
import { getDeferredVideoSource } from "@/lib/homepage-media";

const videoPath = "/videos/scr-powder-automation-60s.mp4";

export function DeferredPromoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const [failed, setFailed] = useState(false);

  function activatePlayer() {
    const player = videoRef.current;
    const source = getDeferredVideoSource(true, videoPath);
    if (!player || !source) {
      return;
    }

    setFailed(false);
    setActive(true);
    player.src = source;
    player.load();
    void player.play().catch(() => {
      player.muted = true;
      void player.play();
    });
  }

  function resetFailedPlayer() {
    const player = videoRef.current;
    setActive(false);
    setFailed(true);

    if (player) {
      player.pause();
      player.removeAttribute("src");
      player.load();
    }
  }

  return (
    <div className="relative aspect-video overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        controls={active}
        playsInline
        preload="none"
        poster="/images/scr-promo-video-poster.jpg"
        aria-label="SCR Robot 60-second bilingual automation overview"
        onError={resetFailedPlayer}
      >
        Your browser does not support HTML5 video.
      </video>

      {!active ? (
        <button
          type="button"
          className="group absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/78 via-black/5 to-black/12"
          onClick={activatePlayer}
          aria-label="Play the 60-second SCR Robot bilingual automation video"
        >
          <span className="absolute right-4 top-4 rounded-md border border-white/20 bg-black/58 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white/82">
            60-second bilingual overview
          </span>
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f5b41b] shadow-[0_14px_36px_rgba(0,0,0,0.38)] transition duration-300 group-hover:scale-105 group-hover:bg-[#ffd15e]">
            <span className="ml-1 block h-0 w-0 border-y-[10px] border-y-transparent border-l-[16px] border-l-[#080a0d]" />
          </span>
          {failed ? (
            <span className="absolute bottom-5 left-5 right-5 text-center text-sm font-semibold text-white">
              The video could not load. Click to retry.
            </span>
          ) : null}
        </button>
      ) : null}
    </div>
  );
}
