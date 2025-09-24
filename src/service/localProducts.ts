'use client'

import { Product } from '../types/produsts-types'

//Созданные products
export function getLocalProducts(): Product[] {
	if (typeof window === 'undefined') return []
	try {
		return JSON.parse(localStorage.getItem('createdProducts') || '[]')
	} catch (error) {
		console.error('Error reading from localStorage:', error)
		return []
	}
}

// Созданный Product по ID
export function getLocalProductById(id: number): Product | null {
	if (typeof window === 'undefined') return null

	try {
		console.log('Searching local product with ID:', id)
		const localProducts = JSON.parse(
			localStorage.getItem('createdProducts') || '[]'
		)
		console.log('All local products:', localProducts)
		const foundProduct = localProducts.find((p: Product) => p.id === id) || null
		console.log('Found product:', foundProduct)
		return foundProduct
	} catch (error) {
		console.error('Error reading from localStorage:', error)
		return null
	}
}

// Сохранить product (создать или обновить)
export function saveLocalProduct(product: Product): void {
	if (typeof window === 'undefined') return
	try {
		const localProducts = JSON.parse(
			localStorage.getItem('createdProducts') || '[]'
		)
		const existingIndex = localProducts.findIndex(
			(p: Product) => p.id === product.id
		)
		if (existingIndex >= 0) {
			localProducts[existingIndex] = product
		} else {
			localProducts.push(product)
		}
		localStorage.setItem('createdProducts', JSON.stringify(localProducts))
	} catch (error) {
		console.error('Error saving to localStorage:', error)
	}
}

// Удалить product
export function deleteLocalProduct(id: number): void {
	if (typeof window === 'undefined') return
	try {
		const localProducts = JSON.parse(
			localStorage.getItem('createdProducts') || '[]'
		)
		const filteredProducts = localProducts.filter((p: Product) => p.id !== id)
		localStorage.setItem('createdProducts', JSON.stringify(filteredProducts))
	} catch (error) {
		console.error('Error deleting from localStorage:', error)
	}
}

// Очистить все созданные products
export function clearLocalProducts(): void {
	if (typeof window === 'undefined') return

	try {
		localStorage.removeItem('createdProducts')
	} catch (error) {
		console.error('Error clearing localStorage:', error)
	}
}
