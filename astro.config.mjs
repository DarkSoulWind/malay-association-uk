import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { fileURLToPath } from "node:url";

const alias = (path) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
	site: "https://malayassociation.co.uk",
	output: "static",
	integrations: [
		sitemap({
			filter: (page) => !page.endsWith("/admin/"),
		}),
	],
	vite: {
		resolve: {
			alias: {
				"@components": alias("./src/components"),
				"@layouts": alias("./src/layouts"),
				"@styles": alias("./src/styles"),
			},
		},
	},
});
