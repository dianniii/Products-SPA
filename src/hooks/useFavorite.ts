// hooks/useFavorite.ts
import { useProducts } from '@/context/ProductsContext'
import { saveLocalProduct } from '@/service/localProducts'
import { Product } from '@/types/produsts-types'
import { useState } from 'react'

interface UseFavoriteResult {
	isFavorite: boolean
	toggleFavorite: () => void
}

export function useFavorite(
	product: Product | null,
	productId: number
): UseFavoriteResult {
	const { toggleLike } = useProducts()
	const [isFavorite, setIsFavorite] = useState(product?.liked || false)

	const toggleFavorite = () => {
		if (!product) return

		const newFavoriteState = !isFavorite
		setIsFavorite(newFavoriteState)
		toggleLike(product.id)

		// Обновляем локальное состояние продукта
		const updatedProduct = { ...product, liked: newFavoriteState }

		// Сохраняем только локальные товары
		if (productId < 0) {
			saveLocalProduct(updatedProduct)
		}
	}

	return { isFavorite, toggleFavorite }
}
