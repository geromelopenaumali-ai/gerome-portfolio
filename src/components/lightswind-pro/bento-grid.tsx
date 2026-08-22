import type { LucideIcon } from "lucide-react";

type BentoGridItem = {
  number: string;
  title: string;
  description: string;
  detail?: string;
  tags?: string[];
  icon: LucideIcon;
};

type BentoGridProps = {
  items: BentoGridItem[];
  className?: string;
};

export default function BentoGrid({ items, className = "" }: BentoGridProps) {
  return (
    <div className={`lightswind-bento-grid wb2-bento-grid${className ? ` ${className}` : ""}`}>
      {items.map(({ number, title, description, detail, tags, icon: Icon }) => (
        <article className="lightswind-bento-card" key={number}>
          <div className="lightswind-bento-card-background" aria-hidden="true" />
          <div className="lightswind-bento-card-overlay" aria-hidden="true" />
          <div className="lightswind-bento-card-top">
            <span className="lightswind-bento-card-number">{number}</span>
            <Icon className="lightswind-bento-card-icon" aria-hidden="true" />
          </div>
          <div className="lightswind-bento-card-content">
            <div className="lightswind-bento-card-copy">
              <h3>{title}</h3>
              <p>{description}</p>
              {detail && <p className="lightswind-bento-card-detail">{detail}</p>}
            </div>
            {tags && tags.length > 0 && (
              <div className="lightswind-bento-card-tags" aria-label={`${title} tools`}>
                {tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

export type { BentoGridItem, BentoGridProps };
