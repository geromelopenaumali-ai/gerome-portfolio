import { useEffect, useRef, useState } from "react";

import { BlurUpPicture } from "./BlurUpPicture";

// Motion system: workflow interactions use short transform/opacity-led state
// changes so the deck feels tactile without adding a rendering-heavy timeline.

export type DeckShot = {
  url: string;
  webp?: string;
  avif?: string;
  placeholderWebp?: string;
  placeholderAvif?: string;
  width?: number;
  height?: number;
  alt: string;
};

export function WorkflowDeck({
  title,
  caption,
  shots,
  onOpen,
}: {
  title: string;
  caption: string;
  shots: DeckShot[];
  onOpen: (shot: DeckShot, index: number) => void;
}) {
  const [order, setOrder] = useState(() => shots.map((_, i) => i));
  const [isAdvancing, setIsAdvancing] = useState(false);
  const advanceTimerRef = useRef<number | null>(null);
  const frontIndex = order[0] ?? 0;
  const front = shots[frontIndex];

  const advance = () => {
    if (isAdvancing || shots.length < 2) return;
    setIsAdvancing(true);
    setOrder((prev) => [...prev.slice(1), prev[0]!]);
    advanceTimerRef.current = window.setTimeout(() => {
      setIsAdvancing(false);
      advanceTimerRef.current = null;
    }, 560);
  };

  useEffect(() => () => {
    if (advanceTimerRef.current !== null) window.clearTimeout(advanceTimerRef.current);
  }, []);

  return (
    <figure className="v-featured-window" data-advancing={isAdvancing ? "true" : "false"}>
      <div className="v-featured-window-bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>{title}</span>
      </div>

        <div className="v-featured-deck-stage">
        <div className="v-featured-deck" style={{ ["--deck-count" as string]: shots.length }}>
          {shots.map((shot, i) => {
            const depth = order.indexOf(i);
            const isFront = depth === 0;
            return (
              <button
                type="button"
                key={shot.url}
                className="v-featured-card"
                data-front={isFront ? "true" : "false"}
                style={{ ["--depth" as string]: depth, zIndex: shots.length - depth }}
                onClick={() => (isFront ? onOpen(shot, i) : advance())}
                tabIndex={isFront ? 0 : -1}
                aria-hidden={isFront ? undefined : true}
                aria-label={
                  isFront
                    ? "Enlarge this workflow screenshot"
                    : `Show next workflow screenshot (${depth + 1} of ${shots.length})`
                }
              >
                <BlurUpPicture
                  src={shot.url}
                  avif={shot.avif}
                  webp={shot.webp}
                  placeholderAvif={shot.placeholderAvif}
                  placeholderWebp={shot.placeholderWebp}
                  width={shot.width ?? 1280}
                  height={shot.height ?? 720}
                  alt={isFront ? shot.alt : ""}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className="v-featured-deck-bar">
        <span className="v-featured-deck-count">
          {String(frontIndex + 1).padStart(2, "0")}
          <i>/</i>
          {String(shots.length).padStart(2, "0")}
        </span>
        <span className="v-featured-deck-hint">Click the card to enlarge</span>
        <button
          type="button"
          className="v-featured-deck-zoom"
          onClick={advance}
          disabled={isAdvancing}
          aria-label="Show the next workflow screenshot"
        >
          Next flow
          <span aria-hidden="true">→</span>
        </button>
        <button
          type="button"
          className="v-featured-deck-zoom"
          onClick={() => front && onOpen(front, frontIndex)}
        >
          Enlarge
          <span aria-hidden="true">↗</span>
        </button>
      </div>

      <figcaption className="v-featured-caption">{caption}</figcaption>
    </figure>
  );
}
