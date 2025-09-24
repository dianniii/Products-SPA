import { useProducts } from '@/context/ProductsContext'
import { Product } from '@/types/produsts-types'

export function useProductsStatus(
	createdProducts: Product[],
	products: Product[]
) {
	const { error } = useProducts()

	const hasProducts = createdProducts.length + products.length > 0
	const hasApiProducts = products.length > 0
	const hasCreatedProducts = createdProducts.length > 0

	const isUserProduct = (product: Product) => {
		return createdProducts.some(
			createdProduct => createdProduct.id === product.id
		)
	}

	return {
		error,
		hasProducts,
		hasApiProducts,
		hasCreatedProducts,
		isUserProduct
	}
}
