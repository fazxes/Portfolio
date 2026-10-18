/**
 * schema.org structured data as JSON-LD. `<` is escaped so text from content
 * can never close the script tag early.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** BreadcrumbList for a page path, e.g. [["Skills", "/skills"], ["humanizer", "/skills/humanizer"]]. */
export function breadcrumbs(siteUrl: string, trail: Array<[name: string, path: string]>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [["Home", "/"] as const, ...trail].map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: new URL(path, siteUrl).toString(),
    })),
  };
}
