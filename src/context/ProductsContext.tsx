'use client'

import { getProducts } from '@/service/api'
import { Product } from '@/types/produsts-types'
import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState
} from 'react'

interface ProductsContextType {
	products: Product[]
	createdProducts: Product[]
	loading: boolean
	error: string | null
	toggleLike: (productId: number) => void
	addCreatedProduct: (product: Omit<Product, 'id'>) => void
	updateCreatedProduct: (product: Product) => void
	removeCreatedProduct: (productId: number) => void
	refetchProducts: () => Promise<void>
}

const ProductsContext = createContext<ProductsContextType | undefined>(
	undefined
)

export function ProductsProvider({ children }: { children: React.ReactNode }) {
	const [products, setProducts] = useState<Product[]>([])
	const [createdProducts, setCreatedProducts] = useState<Product[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [isMounted, setIsMounted] = useState(false)

	// Используем useCallback для стабилизации функций
	const loadProducts = useCallback(async () => {
		try {
			setLoading(true)
			setError(null)
			const data = await getProducts()
			setProducts(data)
		} catch (err) {
			console.error('Failed to load products:', err)
			setError('Failed to load products. Check your internet connection.')
			setProducts([])
		} finally {
			setLoading(false)
		}
	}, [])

	const loadCreatedProducts = useCallback(() => {
		if (!isMounted) return

		try {
			const stored = localStorage.getItem('createdProducts')
			if (stored) {
				setCreatedProducts(JSON.parse(stored))
			}
		} catch (err) {
			console.error('Error loading created products:', err)
		}
	}, [isMounted])

	useEffect(() => {
		setIsMounted(true)
	}, [])

	// Разделим useEffect на два, чтобы избежать циклических зависимостей
	useEffect(() => {
		if (isMounted) {
			loadProducts()
			loadCreatedProducts()
		}
	}, [isMounted, loadProducts, loadCreatedProducts])

	const toggleLike = useCallback(
		(productId: number) => {
			if (!isMounted) return

			setProducts(prev =>
				prev.map(product =>
					product.id === productId
						? { ...product, liked: !product.liked }
						: product
				)
			)

			setCreatedProducts(prev =>
				prev.map(product =>
					product.id === productId
						? { ...product, liked: !product.liked }
						: product
				)
			)
		},
		[isMounted]
	)

	const addCreatedProduct = useCallback(
		(productData: Omit<Product, 'id'>) => {
			if (!isMounted) return

			const newProduct: Product = {
				...productData,
				id: -Date.now(),
				liked: false
			}

			setCreatedProducts(prev => {
				const newProducts = [...prev, newProduct]
				localStorage.setItem('createdProducts', JSON.stringify(newProducts))
				return newProducts
			})
		},
		[isMounted]
	)

	const updateCreatedProduct = useCallback(
		(updatedProduct: Product) => {
			if (!isMounted) return

			setCreatedProducts(prev => {
				const updatedProducts = prev.map(product =>
					product.id === updatedProduct.id ? updatedProduct : product
				)
				localStorage.setItem('createdProducts', JSON.stringify(updatedProducts))
				return updatedProducts
			})
		},
		[isMounted]
	)

	const removeCreatedProduct = useCallback(
		(productId: number) => {
			if (!isMounted) return

			setCreatedProducts(prev => {
				const updatedProducts = prev.filter(product => product.id !== productId)
				localStorage.setItem('createdProducts', JSON.stringify(updatedProducts))
				return updatedProducts
			})
		},
		[isMounted]
	)

	const refetchProducts = useCallback(async () => {
		await loadProducts()
	}, [loadProducts])

	if (!isMounted) {
		return (
			<ProductsContext.Provider
				value={{
					products: [],
					createdProducts: [],
					loading: true,
					error: null,
					toggleLike: () => {},
					addCreatedProduct: () => {},
					updateCreatedProduct: () => {},
					removeCreatedProduct: () => {},
					refetchProducts: async () => {}
				}}
			>
				{children}
			</ProductsContext.Provider>
		)
	}

	return (
		<ProductsContext.Provider
			value={{
				products,
				createdProducts,
				loading,
				error,
				toggleLike,
				addCreatedProduct,
				updateCreatedProduct,
				removeCreatedProduct,
				refetchProducts
			}}
		>
			{children}
		</ProductsContext.Provider>
	)
}

export function useProducts() {
	const context = useContext(ProductsContext)
	if (context === undefined) {
		throw new Error('useProducts must be used within a ProductsProvider')
	}
	return context
}
