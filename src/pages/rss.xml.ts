import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site ?? new URL("https://mauk.club");
  const posts = (await getCollection("posts"))
    .filter((post) => post.data.contentType !== "event")
    .sort((a, b) => b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf());

  const items = posts
    .map((post) => {
      const link = new URL(`/blog/${post.slug}/`, baseUrl).toString();
      return `
        <item>
          <title>${escapeXml(post.data.title)}</title>
          <link>${link}</link>
          <guid>${link}</guid>
          <pubDate>${post.data.publishedDate.toUTCString()}</pubDate>
          <category>${escapeXml(post.data.category)}</category>
          <description>${escapeXml(post.data.excerpt)}</description>
        </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>Malay Association UK Blog</title>
        <link>${baseUrl.toString()}</link>
        <description>Events, notices and community updates from Malay Association UK.</description>
        <language>en-GB</language>
        ${items}
      </channel>
    </rss>`;

  return new Response(xml.trim(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8"
    }
  });
};
