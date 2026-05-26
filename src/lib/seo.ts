export type JsonLd = Record<string, unknown>;

export const organizationId = (siteUrl: string) => `${siteUrl}/#organization`;

export const organizationJsonLd = (siteUrl: string): JsonLd => ({
  "@type": "Organization",
  "@id": organizationId(siteUrl),
  name: "Malay Association UK",
  alternateName: "Malay Association United Kingdom",
  url: `${siteUrl}/`,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/assets/malaysia-flag.png`
  },
  sameAs: [
    "https://www.instagram.com/malayassociation_uk/",
    "https://www.facebook.com/MalayClub-Uk-563146760820930/"
  ]
});

export const breadcrumbJsonLd = (
  items: Array<{ name: string; url: string }>
): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url
  }))
});
