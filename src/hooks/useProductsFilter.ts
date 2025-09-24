import { useProducts } from '@/context/ProductsContext'
import { Product } from '@/types/produsts-types'
import { useMemo, useState } from 'react'

export function useProductsFilter() {
	const { products, createdProducts } = useProducts()
	const [currentPage, setCurrentPage] = useState(1)
	const [searchQuery, setSearchQuery] = useState('')
	const [activeFilter, setActiveFilter] = useState('all')
	const itemsPerPage = 12

	const { filteredProducts, currentProducts, totalItems } = useMemo(() => {
		let filteredByType: Product[] = []
		switch (activeFilter) {
			case 'favorites':
				const allProducts = [...createdProducts, ...products]
				filteredByType = allProducts.filter(product => product.liked)
				break
			case 'created':
				filteredByType = createdProducts
				break
			default:
				filteredByType = [...createdProducts, ...products]
		}

		// Фильтрация по поисковому запросу
		const filteredBySearch = searchQuery.trim()
			? filteredByType.filter(
					product =>
						product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
						product.description
							.toLowerCase()
							.includes(searchQuery.toLowerCase())
			  )
			: filteredByType

		// Пагинация
		const startIndex = (currentPage - 1) * itemsPerPage
		const endIndex = startIndex + itemsPerPage
		const currentProducts = filteredBySearch.slice(startIndex, endIndex)

		return {
			filteredProducts: filteredBySearch,
			currentProducts,
			totalItems: filteredBySearch.length
		}
	}, [
		products,
		createdProducts,
		activeFilter,
		searchQuery,
		currentPage,
		itemsPerPage
	])

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const resetPagination = () => setCurrentPage(1)

	return {
		// State
		currentPage,
		searchQuery,
		activeFilter,

		// Data
		filteredProducts,
		currentProducts,
		totalItems,
		itemsPerPage,

		// Actions
		setSearchQuery,
		setActiveFilter,
		handlePageChange,
		resetPagination
	}
}
