import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**' // Разрешает все домены
			}
		],
		// Или используйте domains для более простой настройки:
		domains: ['cdn.dummyjson.com']
	}
}

export default nextConfig
