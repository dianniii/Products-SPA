'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

import { getProducts } from '@/service/api'
import { Product } from '@/types/produsts-types'

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

	const loadProducts = async () => {
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
	}

	const loadCreatedProducts = () => {
		if (typeof window === 'undefined') return
		try {
			const stored = localStorage.getItem('createdProducts')
			if (stored) {
				setCreatedProducts(JSON.parse(stored))
			}
		} catch (err) {
			console.error('Error loading created products:', err)
		}
	}

	useEffect(() => {
		loadProducts()
		loadCreatedProducts()
	}, [])

	const toggleLike = (productId: number) => {
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
	}

	const addCreatedProduct = (productData: Omit<Product, 'id'>) => {
		const newProduct: Product = {
			...productData,
			id: -Date.now(), // Уникальный отрицательный ID
			liked: false
		}

		setCreatedProducts(prev => {
			const newProducts = [...prev, newProduct]
			if (typeof window !== 'undefined') {
				localStorage.setItem('createdProducts', JSON.stringify(newProducts))
			}
			return newProducts
		})
	}

	const updateCreatedProduct = (updatedProduct: Product) => {
		setCreatedProducts(prev => {
			const updatedProducts = prev.map(product =>
				product.id === updatedProduct.id ? updatedProduct : product
			)
			if (typeof window !== 'undefined') {
				localStorage.setItem('createdProducts', JSON.stringify(updatedProducts))
			}
			return updatedProducts
		})
	}

	const removeCreatedProduct = (productId: number) => {
		setCreatedProducts(prev => {
			const updatedProducts = prev.filter(product => product.id !== productId)
			if (typeof window !== 'undefined') {
				localStorage.setItem('createdProducts', JSON.stringify(updatedProducts))
			}
			return updatedProducts
		})
	}

	const refetchProducts = async () => {
		await loadProducts()
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
