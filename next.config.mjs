/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: ['@svgr/webpack'],
		})
		return config
	},
	swcMinify: true,
	i18n: {
		locales: ['default', 'ko', 'en', 'vi'],
		defaultLocale: 'default',
		localeDetection: false,
	},
	trailingSlash: true,
	compiler: {
		removeConsole: {
			exclude: ['error'],
		},
		styledComponents: true,
	},
	transpilePackages: [
		'@ant-design',
		'@rc-component',
		'antd',
		'rc-cascader',
		'rc-checkbox',
		'rc-collapse',
		'rc-dialog',
		'rc-drawer',
		'rc-dropdown',
		'rc-field-form',
		'rc-image',
		'rc-input',
		'rc-input-number',
		'rc-mentions',
		'rc-menu',
		'rc-motion',
		'rc-notification',
		'rc-pagination',
		'rc-picker',
		'rc-progress',
		'rc-rate',
		'rc-resize-observer',
		'rc-segmented',
		'rc-select',
		'rc-slider',
		'rc-steps',
		'rc-switch',
		'rc-table',
		'rc-tabs',
		'rc-textarea',
		'rc-tooltip',
		'rc-tree',
		'rc-tree-select',
		'rc-upload',
		'rc-util',
	],
	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		// ignoreBuildErrors: true,
	},
	async headers() {
		return [
			{
				source: '/api/:path*',
				headers: [
					{ key: 'Access-Control-Allow-Credentials', value: 'true' },
					{ key: 'Access-Control-Allow-Origin', value: '*' },
					{
						key: 'Access-Control-Allow-Methods',
						value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
					},
					{
						key: 'Access-Control-Allow-Headers',
						value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
					},
				],
			},
		]
	},
	// async rewrites() {
	// 	return [
	// 		{
	// 			source: '/api/:path*',
	// 			destination: 'http://localhost:3000/:path*',
	// 		},
	// 	]
	// },
}

export default nextConfig
