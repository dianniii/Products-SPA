// hooks/useProduct.ts
import { getProductById } from '@/service/api'
import { getLocalProductById } from '@/service/localProducts'
import { Product } from '@/types/produsts-types'
import { useEffect, useState } from 'react'

interface UseProductResult {
	product: Product | null
	error: string | null
}

export function useProduct(
	productId: number,
	initialProduct?: Product | null
): UseProductResult {
	const [product, setProduct] = useState<Product | null>(initialProduct || null)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		// Если продукт уже передан с сервера, не загружаем повторно
		if (initialProduct) {
			return
		}

		async function loadProduct() {
			try {
				let loadedProduct: Product | null = null
				if (productId < 0) {
					loadedProduct = getLocalProductById(productId)
				} else {
					loadedProduct = await getProductById(productId)
				}
				if (!loadedProduct) {
					throw new Error('Product not found')
				}
				setProduct(loadedProduct)
			} catch (err) {
				setError('Продукт не найден')
			}
		}

		loadProduct()
	}, [productId, initialProduct])

	return { product, error }
}
