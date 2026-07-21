// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import mermaid from "astro-mermaid";
import icon from "astro-icon";

import cloudflare from "@astrojs/cloudflare";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// https://astro.build/config
export default defineConfig({
	site: "https://gujial.cc",
	integrations: [
		mdx(),
		sitemap(),
		icon({
			include: {
				mdi: ["rss", "mastodon", "github"],
			},
		}),
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
		syntaxHighlight: "shiki",
		shikiConfig: {
			themes: {
				light: "github-light",
				dark: "github-dark",
			},
			wrap: true,
		},
		remarkPlugins: [remarkMath],
		rehypePlugins: [rehypeKatex],
	},
});
