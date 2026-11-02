type PictureProps = {
  name: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
};

export function Picture({ name, alt, width, height, priority = false, className }: PictureProps) {
  const sizes = "(min-width: 760px) 720px, 100vw";
  return (
    <picture className={className}>
      <source
        type="image/avif"
        srcSet={`/images/${name}-800.avif 800w, /images/${name}-1200.avif 1200w`}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={`/images/${name}-800.webp 800w, /images/${name}-1200.webp 1200w`}
        sizes={sizes}
      />
      <img
        src={`/images/${name}-800.webp`}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
      />
    </picture>
  );
}
