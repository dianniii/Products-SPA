// components/product/ProductDetailClient.tsx
'use client'

import { Button } from '@/components/ui/button'
import { useFavorite } from '@/hooks/useFavorite'
import { useProduct } from '@/hooks/useProduct'
import { Product } from '@/types/produsts-types'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface ProductDetailClientProps {
	productId: number
	initialProduct?: Product | null
}

export function ProductDetailClient({
	productId,
	initialProduct
}: ProductDetailClientProps) {
	const { product, error } = useProduct(productId, initialProduct)
	const { isFavorite, toggleFavorite } = useFavorite(product, productId)

	if (error) {
		return (
			<div className='text-center py-12'>
				<h1 className='text-2xl font-bold text-gray-900 mb-4'>Ошибка</h1>
				<p className='text-gray-600 mb-6'>{error}</p>
				<p className='text-sm text-gray-500 mb-4'>ID: {productId}</p>
				<Button asChild>
					<Link href='/'>Back to Products</Link>
				</Button>
			</div>
		)
	}

	if (!product) {
		return (
			<div className='text-center py-12'>
				<h1 className='text-2xl font-bold text-gray-900 mb-4'>
					Product not found
				</h1>
				<p className='text-gray-600 mb-6'>
					The product with ID {productId} does not exist
				</p>
				<Button asChild>
					<Link href='/'>Back to Products</Link>
				</Button>
			</div>
		)
	}

	return (
		<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
			<div className='rounded-lg p-6'>
				<div className='relative aspect-square flex items-center justify-center'>
					<Image
						src={product.image}
						alt={product.title}
						width={400}
						height={400}
						className='object-contain max-w-full max-h-full'
						priority
						unoptimized={true}
					/>
					{isFavorite && (
						<div className='absolute top-4 right-4'>
							<Heart className='w-6 h-6 fill-red-500 text-red-500' />
						</div>
					)}
				</div>
			</div>

			<div className='space-y-6'>
				<div>
					<h1 className='text-3xl font-bold text-gray-900 mb-2'>
						{product.title}
					</h1>
					<p className='text-2xl font-semibold text-blue-600'>
						${product.price.toFixed(2)}
					</p>
				</div>

				<div>
					<h2 className='text-lg font-semibold mb-2'>Description</h2>
					<p className='text-gray-700 leading-relaxed'>{product.description}</p>
				</div>

				<div>
					<h2 className='text-lg font-semibold mb-2'>Details</h2>
					<div className='grid grid-cols-2 gap-4 text-sm text-gray-600'>
						<div>
							<span className='font-medium'>ID:</span> {product.id}
						</div>
						<div>
							<span className='font-medium'>In favorites:</span>{' '}
							{product.liked ? 'Да' : 'Нет'}
						</div>
						<div>
							<span className='font-medium'>Type:</span>{' '}
							{productId < 0 ? 'Локальный товар' : 'Товар из API'}
						</div>
					</div>
				</div>

				<div className='flex gap-2 pt-6'>
					<Button
						variant={isFavorite ? 'destructive' : 'outline'}
						className='flex-1 gap-2'
						onClick={toggleFavorite}
					>
						<Heart className='w-4 h-4' />
						{isFavorite ? 'Remove from favorites' : 'To favorites'}
					</Button>

					<Button
						variant='default'
						className='flex-1 gap-2 bg-black hover:bg-gray-800'
					>
						<Link href='/'>Back to Products</Link>
					</Button>
				</div>
			</div>
		</div>
	)
}
