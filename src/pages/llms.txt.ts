// Generates /llms.txt — a plain-markdown summary of the site for AI agents and LLMs.
// Format: https://llmstxt.org. Blog posts and projects are pulled from the content
// collections, so new entries show up here automatically on the next build.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { PERSON, SITE_DESCRIPTION, SITE_TITLE, SOCIAL_LINKS } from '../consts';

export const GET: APIRoute = async ({ site }) => {
	const url = (path: string) => new URL(path, site).href;

	const posts = (await getCollection('blog')).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
	const projects = (await getCollection('projects')).sort(
		(a, b) => (a.data.order ?? 999) - (b.data.order ?? 999),
	);

	const item = (title: string, href: string, description?: string) =>
		`- [${title}](${href})${description ? `: ${description}` : ''}`;

	const body = [
		`# ${SITE_TITLE}`,
		'',
		`> ${SITE_DESCRIPTION}`,
		'',
		`Blake is a ${PERSON.jobTitle.toLowerCase()} at ${PERSON.employer.name}. He grew up in Richardson, Texas, studied at the University of Michigan and the University of Chicago, and previously worked at Rockerbox and Squarespace. In 2025 he wrote and self-published a family history book, Lives and Fates.`,
		'',
		'## Pages',
		'',
		item('About', url('/about/'), 'Background and how to get in touch'),
		item("Books I've Read", url('/books/'), 'Books Blake has read and recommends, grouped by year'),
		item('Projects', url('/projects/')),
		item('Blog', url('/blog/')),
		'',
		'## Writing',
		'',
		...posts.map((post) => item(post.data.title, url(`/blog/${post.id}/`), post.data.description)),
		'',
		'## Projects',
		'',
		...projects.map((project) =>
			item(project.data.title, url(`/projects/${project.id}/`), project.data.description),
		),
		'',
		'## Elsewhere',
		'',
		item('LinkedIn', SOCIAL_LINKS.linkedin),
		item('GitHub', SOCIAL_LINKS.github),
		item('X (Twitter)', SOCIAL_LINKS.x),
		item('RSS feed', url('/rss.xml')),
		'',
		'## Optional',
		'',
		item('Lives and Fates (full PDF)', url('/LivesAndFates.pdf'), 'The complete family history book'),
		'',
	].join('\n');

	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
