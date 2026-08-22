import { useEffect, useRef, useState } from "react";

import { BlurUpPicture } from "./BlurUpPicture";

export type LightboxShot = {
  src: string;
  webp: string;
  avif: string;
  placeholderWebp?: string;
  placeholderAvif?: string;
  width?: number;
  height?: number;
  previewClassName?: string;
  alt: string;
};

export function Lightbox({
  shots,
  index,
  onClose,
  onSelect,
}: {
  shots: LightboxShot[];
  index: number;
  onClose: () => void;
  onSelect: (index: number) => void;
}) {
  const current = shots[index]!;
  const multi = shots.length > 1;
  const [entered, setEntered] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [dir, setDir] = useState(1);
  const [dragX, setDragX] = useState(0);
  const startRef = useRef<{ x: number; y: number; active: boolean } | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closeTimerRef = useRef<number | null>(null);

  const requestClose = () => {
    if (exiting) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onClose();
      return;
    }
    setExiting(true);
    closeTimerRef.current = window.setTimeout(onClose, 260);
  };

  const step = (delta: number) => {
    if (!multi) return;
    setDir(delta >= 0 ? 1 : -1);
    onSelect((index + delta + shots.length) % shots.length);
  };

  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true));
    return () => {
      cancelAnimationFrame(id);
      if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (!root) return;

    const focusId = window.requestAnimationFrame(() => closeRef.current?.focus());
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        requestClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = Array.from(
        root.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) return;
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    root.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusId);
      root.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, []);

  // Preload neighbouring images so switching is instant.
  useEffect(() => {
    if (!multi) return;
    const neighbours = [
      shots[(index + 1) % shots.length],
      shots[(index - 1 + shots.length) % shots.length],
    ];
    for (const shot of neighbours) {
      if (!shot) continue;
      const img = new Image();
      img.decoding = "async";
      img.src = shot.webp || shot.src;
    }
  }, [index, shots, multi]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!multi || e.pointerType === "mouse") return;
    e.currentTarget.setPointerCapture(e.pointerId);
    startRef.current = { x: e.clientX, y: e.clientY, active: true };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const start = startRef.current;
    if (!start?.active) return;
    const dx = e.clientX - start.x;
    if (Math.abs(dx) > Math.abs(e.clientY - start.y)) setDragX(dx);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const start = startRef.current;
    startRef.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    if (!start?.active) return;
    if (Math.abs(dragX) > 55) step(dragX < 0 ? 1 : -1);
    setDragX(0);
  };

  return (
    <div
      ref={rootRef}
      className="v-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Full size screenshot"
      data-entered={entered ? "true" : "false"}
      data-exiting={exiting ? "true" : "false"}
      onClick={requestClose}
    >
      <button
        ref={closeRef}
        type="button"
        className="v-lightbox-close"
        onClick={(event) => {
          event.stopPropagation();
          requestClose();
        }}
        aria-label="Close image"
      >
        ×
      </button>

      {multi && (
        <>
          <button
            type="button"
            className="v-lightbox-nav v-lightbox-nav-prev"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous screenshot"
          >
            ‹
          </button>
          <button
            type="button"
            className="v-lightbox-nav v-lightbox-nav-next"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next screenshot"
          >
            ›
          </button>
        </>
      )}

      <div
        className="v-lightbox-stage"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="v-lightbox-frame"
          data-dragging={dragX !== 0 ? "true" : "false"}
          style={{ transform: dragX ? `translateX(${dragX}px)` : undefined }}
        >
          <BlurUpPicture
            key={current.src}
            className={`v-lightbox-pic${current.previewClassName ? ` ${current.previewClassName}--lightbox` : ""}`}
            dataDir={dir > 0 ? "next" : "prev"}
            src={current.src}
            avif={current.avif}
            webp={current.webp}
            placeholderAvif={current.placeholderAvif}
            placeholderWebp={current.placeholderWebp}
            width={current.width ?? 1280}
            height={current.height ?? 720}
            alt={current.alt}
            loading="eager"
            draggable={false}
          />
        </div>

        {multi && (
          <div className="v-lightbox-tray">
            <span className="v-lightbox-count">
              {String(index + 1).padStart(2, "0")}
              <i>/</i>
              {String(shots.length).padStart(2, "0")}
            </span>
            <div className="v-lightbox-thumbs">
              {shots.map((s, i) => (
                <button
                  type="button"
                  key={s.src + i}
                  className="v-lightbox-thumb"
                  data-active={i === index ? "true" : "false"}
                  onClick={() => {
                    setDir(i >= index ? 1 : -1);
                    onSelect(i);
                  }}
                  aria-label={`View screenshot ${i + 1}`}
                >
                  <img src={s.src} alt="" loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
            <span className="v-lightbox-swipe-hint">Swipe to browse</span>
          </div>
        )}
      </div>
    </div>
  );
}
