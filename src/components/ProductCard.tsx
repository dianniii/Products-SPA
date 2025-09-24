// components/ProductCard.tsx
'use client'

import { useProductCardActions } from '@/hooks/useProductCardActions'
import { cn } from '@/lib/utils'
import { Product } from '@/types/produsts-types'
import { Edit, Heart, MoreHorizontal, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
	product: Product
	onLike: (productId: number) => void
	onDelete: (productId: number) => void
	className?: string
	isUserProduct?: boolean
}

function ProductCard({
	product,
	onLike,
	onDelete,
	className,
	isUserProduct = false
}: ProductCardProps) {
	const { handleLike, handleDelete, handleEdit, handleClick } =
		useProductCardActions({
			productId: product.id,
			onLike,
			onDelete,
			isUserProduct
		})

	return (
		<Link
			href={`/product-card/${product.id}`}
			prefetch={product.id > 0}
			onClick={handleClick}
			className='block w-full h-full'
		>
			<div
				className={cn(
					'relative grid grid-rows-[auto_1fr_auto] gap-2 p-5',
					'border border-gray-200 rounded-xl bg-white',
					'cursor-pointer transition-all duration-150',
					'hover:shadow-lg hover:-translate-y-0.5',
					'h-90 flex flex-col min-h-0 w-75',
					'max-sm:w-full',
					className
				)}
			>
				{/* Like button */}
				<button
					type='button'
					onClick={handleLike}
					className={cn(
						'absolute top-3 right-3 z-10',
						'w-10 h-10 flex items-center justify-center',
						'bg-white/80 backdrop-blur-sm rounded-full',
						'transition-colors cursor-pointer border-0',
						product.liked ? 'text-red-500' : 'text-gray-500 hover:text-gray-900'
					)}
					aria-pressed={product.liked}
				>
					<Heart
						className={cn(
							'w-5 h-5 transition-all',
							product.liked ? 'fill-current' : 'fill-none'
						)}
					/>
				</button>

				{/* Product image */}
				<div className='w-full h-40 flex items-center justify-center overflow-hidden rounded-lg bg-gray-50'>
					<Image
						src={product.image}
						alt={product.title}
						width={400}
						height={400}
						className='object-contain w-full h-full'
						priority
						unoptimized={true}
					/>
				</div>

				{/* Content */}
				<div className='flex flex-col gap-2 flex-1 min-h-0'>
					<h3 className='text-base font-semibold text-gray-900 line-clamp-2 leading-tight'>
						{product.title}
					</h3>
					<p className='text-sm text-gray-600 line-clamp-3 leading-relaxed flex-1'>
						{product.description}
					</p>
				</div>

				{/* Footer */}
				<div className='flex justify-between items-center pt-3'>
					<span className='text-lg font-bold text-primary'>
						${product.price.toFixed(2)}
					</span>

					{/* Action icons */}
					<div className='flex items-center gap-1'>
						{isUserProduct && (
							<>
								<button
									type='button'
									onClick={handleEdit}
									className='p-2 rounded-full bg-gray-100 hover:bg-blue-100 hover:text-blue-600 transition-colors cursor-pointer text-gray-500'
									title='Edit product'
								>
									<Edit className='w-4 h-4' />
								</button>
								<button
									type='button'
									onClick={handleDelete}
									className='p-2 rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-600 transition-colors cursor-pointer text-gray-500'
									title='Delete product'
								>
									<Trash2 className='w-4 h-4' />
								</button>
							</>
						)}
						{!isUserProduct && (
							<MoreHorizontal className='w-5 h-5 text-gray-400' />
						)}
					</div>
				</div>
			</div>
		</Link>
	)
}

export { ProductCard }
