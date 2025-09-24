import { useProducts } from '@/context/ProductsContext'
import { useState } from 'react'

export function useProductsActions() {
	const { toggleLike, removeCreatedProduct, refetchProducts } = useProducts()
	const [isRefetching, setIsRefetching] = useState(false)

	const handleLike = (productId: number) => {
		toggleLike(productId)
	}

	const handleDelete = (productId: number) => {
		removeCreatedProduct(productId)
	}
	const handleRetry = async () => {
		setIsRefetching(true)
		await refetchProducts()
		setIsRefetching(false)
	}

	return {
		handleLike,
		handleDelete,
		handleRetry,
		isRefetching
	}
}
