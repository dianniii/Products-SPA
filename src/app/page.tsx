import { SITE_NAME } from '@/constants/seo-constants'
import ProductsPage from '@/pages/ProductsPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: `Products | ${SITE_NAME}`
}
export default async function HomePage() {
	return <ProductsPage />
}
