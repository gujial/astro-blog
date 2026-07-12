// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import mermaid from "astro-mermaid";

import cloudflare from "@astrojs/cloudflare";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// https://astro.build/config
export default defineConfig({
	site: "https://gujial.cc",
	integrations: [
		mdx(),
		sitemap(),
		mermaid({
			theme: 'forest',
			autoTheme: true
		})
	],
	adapter: cloudflare({
		platformProxy: {
			enabled: true,
		},
	}),
	markdown: {
         remarkPlugins: [remarkMath],
         rehypePlugins: [rehypeKatex],
    },
});
