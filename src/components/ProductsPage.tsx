'use client'

import { Button } from '@/components/ui/button'
import { FilterTabs } from '@/components/ui/filterTabs'
import { Pagination } from '@/components/ui/paginator'
import { SearchBar } from '@/components/ui/serchBar'
import { useProducts } from '@/context/ProductsContext'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { useEffect } from 'react'
import { useProductsActions } from '../hooks/useProductsActions'
import { useProductsFilter } from '../hooks/useProductsFilter'
import { useProductsStatus } from '../hooks/useProductsStatus'
import { ProductCard } from './ProductCard'

function ProductsPage() {
	const { products, createdProducts } = useProducts()

	const {
		searchQuery,
		activeFilter,
		currentProducts,
		totalItems,
		itemsPerPage,
		currentPage,
		setSearchQuery,
		setActiveFilter,
		handlePageChange,
		resetPagination
	} = useProductsFilter()

	const { handleLike, handleDelete, handleRetry, isRefetching } =
		useProductsActions()

	const {
		error,
		hasProducts,
		hasApiProducts,
		hasCreatedProducts,
		isUserProduct
	} = useProductsStatus(createdProducts, products)

	// Сброс пагинации при изменении фильтров
	useEffect(() => {
		resetPagination()
	}, [activeFilter, searchQuery, resetPagination])

	return (
		<div className='min-h-screen bg-white'>
			<div className='pl-4 pr-4'>
				<div className='mx-auto max-w-7xl'>
					<div className='flex justify-between items-center mb-4 pt-6'>
						{error && (
							<Button
								variant='outline'
								onClick={handleRetry}
								disabled={isRefetching}
								className='flex items-center gap-2'
							>
								<RefreshCw
									className={`w-4 h-4 ${isRefetching ? 'animate-spin' : ''}`}
								/>
								{isRefetching ? 'Update...' : 'Repeat'}
							</Button>
						)}
					</div>

					{error && (
						<div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-lg'>
							<div className='flex items-center gap-2 text-red-800'>
								<AlertCircle className='w-5 h-5' />
								<div>
									<strong>Download error:</strong> {error}
									{hasCreatedProducts && (
										<p className='text-sm text-red-700 mt-1'>
											Only the products you created are shown
										</p>
									)}
								</div>
							</div>
						</div>
					)}

					<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6'>
						<FilterTabs
							activeFilter={activeFilter}
							onFilterChange={setActiveFilter}
						/>

						<div className='w-full sm:w-auto pr-0.5 sm:px-0'>
							<SearchBar
								value={searchQuery}
								onChange={setSearchQuery}
								placeholder='Product search...'
							/>
						</div>
					</div>

					{!hasProducts ? (
						<div className='text-center py-12'>
							{error && !hasCreatedProducts ? (
								<>
									<AlertCircle className='w-16 h-16 text-gray-400 mx-auto mb-4' />
									<h3 className='text-xl font-semibold text-gray-900 mb-2'>
										Couldnt upload products
									</h3>
									<p className='text-gray-600 mb-4'>
										Check your internet connection and try again.
									</p>
									<Button
										onClick={handleRetry}
										disabled={isRefetching}
									>
										<RefreshCw
											className={`w-4 h-4 mr-2 ${
												isRefetching ? 'animate-spin' : ''
											}`}
										/>
										Try again
									</Button>
								</>
							) : (
								<p className='text-gray-500 text-lg'>
									{searchQuery
										? `Nothing was found for the query "${searchQuery}"`
										: activeFilter === 'favorites'
										? 'You dont have any favorites yet'
										: activeFilter === 'created'
										? 'You havent created the products yet'
										: 'No products found'}
								</p>
							)}
						</div>
					) : (
						<>
							<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'>
								{currentProducts.map(product => (
									<div
										key={`${isUserProduct(product) ? 'local' : 'api'}-${
											product.id
										}`}
										className='flex justify-center'
									>
										<ProductCard
											product={product}
											onLike={handleLike}
											onDelete={handleDelete}
											isUserProduct={isUserProduct(product)}
										/>
									</div>
								))}
							</div>

							<Pagination
								currentPage={currentPage}
								totalItems={totalItems}
								itemsPerPage={itemsPerPage}
								onPageChange={handlePageChange}
							/>

							<div className='text-center mt-4 text-gray-500 pb-8'>
								Shown {currentProducts.length} from {totalItems} products
								{searchQuery && ` on request "${searchQuery}"`}
								{activeFilter === 'favorites' && 'in favorites'}
								{activeFilter === 'created' && ' created by you'}
								{error && !hasApiProducts && ' (local only)'}
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default ProductsPage
