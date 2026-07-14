import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function GET(context) {
	const posts = await getCollection("blog");
	const feedUrl = new URL("/rss.xml", context.site).href;
	const channelImageUrl = new URL("/favicon.svg", context.site).href;
	const latestPostDate = posts
		.map((post) => post.data.updatedDate ?? post.data.pubDate)
		.sort((a, b) => b.getTime() - a.getTime())[0];

	const items = posts
		.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
		.map((post) => {
			const postUrl = new URL(`/blog/${post.id}/`, context.site).href;
			const heroImageUrl = post.data.heroImage
				? new URL(post.data.heroImage.src, context.site).href
				: undefined;

			const mediaTags = heroImageUrl
				? [
					`<media:content url="${heroImageUrl}" medium="image" type="image/${post.data.heroImage.format}" width="${post.data.heroImage.width}" height="${post.data.heroImage.height}" />`,
					`<media:thumbnail url="${heroImageUrl}" width="${post.data.heroImage.width}" height="${post.data.heroImage.height}" />`,
				  ].join("")
				: "";

			const contentHtml = heroImageUrl
				? `<p><img src="${heroImageUrl}" alt="${post.data.title}" /></p><p>${post.data.description}</p>`
				: `<p>${post.data.description}</p>`;

			return {
				title: post.data.title,
				description: post.data.description,
				pubDate: post.data.pubDate,
				link: `/blog/${post.id}/`,
				categories: post.data.tags,
				author: "gujial@gujial.cc (gujial)",
				content: contentHtml,
				customData: `${mediaTags}<guid isPermaLink="true">${postUrl}</guid>`,
			};
		});

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		xmlns: {
			atom: "http://www.w3.org/2005/Atom",
			media: "http://search.yahoo.com/mrss/",
		},
		customData: [
			`<language>zh-cn</language>`,
			`<lastBuildDate>${(latestPostDate ?? new Date()).toUTCString()}</lastBuildDate>`,
			`<atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />`,
			`<image><url>${channelImageUrl}</url><title>${SITE_TITLE}</title><link>${new URL("/", context.site).href}</link></image>`,
		].join(""),
		items,
	});
}
