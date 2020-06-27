const { description } = require('../../package')

module.exports = {
	base: '/vue-values/',
	/**
	 * Ref：https://v1.vuepress.vuejs.org/config/#title
	 */
	title: 'Vue Values',
	/**
	 * Ref：https://v1.vuepress.vuejs.org/config/#description
	 */
	description: description,

	/**
	 * Extra tags to be injected to the page HTML `<head>`
	 *
	 * ref：https://v1.vuepress.vuejs.org/config/#head
	 */
	head: [
		['meta', { name: 'theme-color', content: '#4fc08d' }],
		['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
		['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
		['link', { rel: "apple-touch-icon", sizes: "57x57", href: "/apple-icon-57x57.png"}],
		['link', { rel: "apple-touch-icon", sizes: "60x60", href: "/apple-icon-60x60.png"}],
		['link', { rel: "apple-touch-icon", sizes: "72x72", href: "/apple-icon-72x72.png"}],
		['link', { rel: "apple-touch-icon", sizes: "76x76", href: "/apple-icon-76x76.png"}],
		['link', { rel: "apple-touch-icon", sizes: "114x114", href: "/apple-icon-114x114.png"}],
		['link', { rel: "apple-touch-icon", sizes: "120x120", href: "/apple-icon-120x120.png"}],
		['link', { rel: "apple-touch-icon", sizes: "144x144", href: "/apple-icon-144x144.png"}],
		['link', { rel: "apple-touch-icon", sizes: "152x152", href: "/apple-icon-152x152.png"}],
		['link', { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-icon-180x180.png"}],
		['link', { rel: "icon", type: "image/png", sizes: "192x192", href: "/android-icon-192x192.png"}],
		['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png"}],
		['link', { rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon-96x96.png"}],
		['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png"}],
		['link', { rel: "icon", type: "image/png", href: "/logo.png"}],
	],

	/**
	 * Theme configuration, here is the default theme configuration for VuePress.
	 *
	 * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
	 */
	themeConfig: {
		repo: 'https://github.com/adrianhurt/vue-values',
		editLinks: false,
		docsDir: '',
		editLinkText: '',
		lastUpdated: false,
		nav: [
			{
				text: 'Documentation',
				link: '/docs/',
			},
		],
		sidebar: {
			'/docs/': [
				{
					title: 'Getting Started',
					collapsable: false,
					children: [
						'',
						'installation',
					]
				},
				{
					title: 'Value components',
					collapsable: false,
					children: [
						'value',
						'boolean-value',
						'number-value',
						'string-value',
						'array-value',
						'set-value',
						'object-value',
						'map-value',
					]
				},
				{
					title: 'StoredValue components',
					collapsable: false,
					children: [
						'stored-value-components',
						'stored-value-manipulation',
						'store-state-manipulation',
						'store-persistence',
					]
				},
			],
		}
	},

	/**
	 * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
	 */
	plugins: [
		'@vuepress/plugin-back-to-top',
		'@vuepress/plugin-medium-zoom',
	]
}
