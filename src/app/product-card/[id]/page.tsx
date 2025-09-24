import { Button } from '@/components/ui/button'
import { SITE_NAME } from '@/constants/seo-constants'
import { ProductDetailClient } from '@/pages/ProductDetailClient'

import { getProductById } from '@/service/api'
import { ArrowLeft } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
	title: `Product-card | ${SITE_NAME}`
}

interface PageProps {
	params: Promise<{ id: string }>
}

export default async function ProductDetailPage({ params }: PageProps) {
	const { id } = await params
	const productId = Number(id)

	if (isNaN(productId)) {
		return (
			<div className='min-h-screen bg-white flex items-center justify-center'>
				<div className='text-center'>
					<h1 className='text-2xl font-bold text-gray-900 mb-4'>Error</h1>
					<p className='text-gray-600 mb-6'>Invalid product ID</p>
					<Button asChild>
						<Link href='/'>Back to products</Link>
					</Button>
				</div>
			</div>
		)
	}

	let initialProduct = null
	let error = null

	try {
		if (productId > 0) {
			initialProduct = await getProductById(productId)
		}
	} catch (err) {
		console.error('Error preloading product:', err)
		error = err instanceof Error ? err.message : 'An error has occurred'
	}

	return (
		<div className='min-h-screen bg-white'>
			<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				<nav className='mb-6'>
					<Button
						asChild
						variant='ghost'
						className='inline-flex items-center gap-2'
					>
						<Link href='/'>
							<ArrowLeft className='w-4 h-4' />
							Back to Products
						</Link>
					</Button>
				</nav>

				<ProductDetailClient
					productId={productId}
					initialProduct={initialProduct}
				/>
			</div>
		</div>
	)
}
