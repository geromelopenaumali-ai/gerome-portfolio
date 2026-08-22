// Auto-generated responsive image manifest (AVIF/WebP variants in /public/opt).
export type ResponsiveImage = {
  src: string;
  avif: string;
  webp: string;
  placeholderAvif: string;
  placeholderWebp: string;
  width: number;
  height: number;
};

const manifest: Record<string, { file: string; width: number; height: number; widths: number[] }> = {
  "content-repurposing": { file: "/aicontentrepurposing.png", width: 770, height: 921, widths: [480, 770] },
  "asana-crm": { file: "/asanacrmautomation.png", width: 1589, height: 919, widths: [480, 800, 1200, 1589] },
  "lead-enrichment": { file: "/leadenrichment.png", width: 610, height: 921, widths: [480, 610] },
  "gmail-attachment": { file: "/gmailintegration.png", width: 1835, height: 733, widths: [480, 800, 1200, 1600, 1835] },
  "asana-xero": { file: "/Asanacompletedtask.png", width: 1836, height: 789, widths: [480, 800, 1200, 1600, 1836] },
  "n8n-rag": { file: "/RAGagentport.png", width: 1720, height: 794, widths: [480, 800, 1200, 1600, 1720] },
  "n8n-support": { file: "/customersupportAIagentrename.png", width: 1721, height: 804, widths: [480, 800, 1200, 1600, 1721] },
  "n8n-lead": { file: "/leadqualifenrich.png", width: 1716, height: 829, widths: [480, 800, 1200, 1600, 1716] },
  "n8n-messenger": { file: "/facebookmessagengeraisuppport.png", width: 1718, height: 795, widths: [480, 800, 1200, 1600, 1718] },
  "hazel-1": { file: "/featuredprojectAIreceptionist.png", width: 1716, height: 717, widths: [480, 800, 1200, 1600, 1716] },
  "hazel-2": { file: "/featuredprojectAIreceptionist2.png", width: 1716, height: 749, widths: [480, 800, 1200, 1600, 1716] },
};

export function img(slug: keyof typeof manifest | string): ResponsiveImage {
  const m = manifest[slug];
  if (!m) throw new Error(`Unknown image: ${slug}`);
  const set = (ext: string) => m.widths.map((w) => `/opt/${slug}-${w}.${ext} ${w}w`).join(', ');
  const smallest = m.widths[0]!;
  return {
    src: m.file,
    avif: set('avif'),
    webp: set('webp'),
    placeholderAvif: `/opt/${slug}-${smallest}.avif`,
    placeholderWebp: `/opt/${slug}-${smallest}.webp`,
    width: m.width,
    height: m.height,
  };
}
