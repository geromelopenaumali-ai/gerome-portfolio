import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";

type BlurUpPictureProps = {
  src: string;
  avif?: string;
  webp?: string;
  placeholderAvif?: string;
  placeholderWebp?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  loading?: ImgHTMLAttributes<HTMLImageElement>["loading"];
  decoding?: ImgHTMLAttributes<HTMLImageElement>["decoding"];
  draggable?: boolean;
  dataDir?: string;
};

export function BlurUpPicture({
  src,
  avif,
  webp,
  placeholderAvif,
  placeholderWebp,
  alt,
  width,
  height,
  className = "",
  loading = "lazy",
  decoding = "async",
  draggable,
  dataDir,
}: BlurUpPictureProps) {
  const [loaded, setLoaded] = useState(false);
  const [useFallbackSource, setUseFallbackSource] = useState(false);
  const [placeholderFailed, setPlaceholderFailed] = useState(false);
  const fullImageRef = useRef<HTMLImageElement>(null);
  // WebP is the most broadly reliable optimized format across iPad and mobile Safari.
  const placeholder = placeholderWebp || placeholderAvif;

  useEffect(() => {
    setLoaded(false);
    setUseFallbackSource(false);
    setPlaceholderFailed(false);
    const image = fullImageRef.current;
    if (image?.complete && image.naturalWidth > 0) setLoaded(true);
  }, [src, avif, webp]);

  const handleFullImageError = () => {
    if (!useFallbackSource) {
      setLoaded(false);
      setUseFallbackSource(true);
    }
  };

  return (
    <span
      className={`blur-up-frame${placeholder ? " has-placeholder" : ""}${loaded ? " is-loaded" : ""}${className ? ` ${className}` : ""}`}
      style={{ aspectRatio: `${width} / ${height}` }}
      data-dir={dataDir}
    >
      {placeholder && !placeholderFailed ? (
        <picture className="blur-up-placeholder" aria-hidden="true">
          {placeholderWebp ? <source srcSet={placeholderWebp} type="image/webp" /> : null}
          {placeholderAvif ? <source srcSet={placeholderAvif} type="image/avif" /> : null}
          <img
            src={placeholder}
            alt=""
            width={width}
            height={height}
            decoding="async"
            aria-hidden="true"
            onError={() => setPlaceholderFailed(true)}
          />
        </picture>
      ) : null}
      <picture className="blur-up-picture">
        {!useFallbackSource && webp ? <source srcSet={webp} type="image/webp" /> : null}
        {!useFallbackSource && avif ? <source srcSet={avif} type="image/avif" /> : null}
        <img
          ref={fullImageRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          decoding={decoding}
          draggable={draggable}
          onLoad={() => setLoaded(true)}
          onError={handleFullImageError}
        />
      </picture>
    </span>
  );
}
