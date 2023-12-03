/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,jsx,ts,tsx,mdx}'],
	darkMode: 'class',
	theme: {
		extend: {
			spacing: {
				'content-width': 'var(--content-width)',
				'content-side-width': 'var(--content-side-width)',
			},
		},
	},
	plugins: [],
};
