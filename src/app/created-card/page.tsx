import { SITE_NAME } from '@/constants/seo-constants'
import CreateProductPage from '@/pages/CreatesProductPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: `Created-card | ${SITE_NAME}`
}
export default function CreatedPage() {
	return <CreateProductPage />
}
