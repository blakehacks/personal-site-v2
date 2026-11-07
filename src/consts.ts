// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Blake Maczka';
export const SITE_DESCRIPTION =
	'The personal website of Blake Maczka — software engineer and writer in Brooklyn. Projects, writing, and reading lists.';

// Profiles that belong to the same person. Used in structured data (schema.org `sameAs`)
// and llms.txt so search engines and agents can connect them to this site.
export const SOCIAL_LINKS = {
	github: 'https://github.com/blakehacks',
	x: 'https://x.com/BlakeMaczka',
	linkedin: 'https://www.linkedin.com/in/blake-maczka/',
};

// Facts for the schema.org Person markup in BaseHead.
export const PERSON = {
	jobTitle: 'Product Engineer',
	employer: { name: 'Lightning AI', url: 'https://lightning.ai/' },
	alumniOf: ['University of Michigan', 'University of Chicago'],
	location: 'Brooklyn, New York',
};
