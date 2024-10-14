import type { Config } from 'tailwindcss';

export default {
	content: [
		'./src/**/*.{html,js,jsx,ts,tsx,mdx}',
		'./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}',
	],
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
} satisfies Config;
