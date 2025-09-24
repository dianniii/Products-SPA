'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

interface UseProductCardActionsProps {
	productId: number
	onLike: (productId: number) => void
	onDelete: (productId: number) => void
	isUserProduct?: boolean
}

export function useProductCardActions({
	productId,
	onLike,
	onDelete,
	isUserProduct = false
}: UseProductCardActionsProps) {
	const router = useRouter()

	const handleLike = useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault()
			e.stopPropagation()
			onLike(productId)
		},
		[productId, onLike]
	)

	const handleDelete = useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault()
			e.stopPropagation()
			if (confirm('Are you sure you want to delete this product?')) {
				onDelete(productId)
			}
		},
		[productId, onDelete]
	)

	const handleEdit = useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault()
			e.stopPropagation()
			router.push(`/created-card?edit=${productId}`)
		},
		[productId, router]
	)

	const handleClick = useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault()
			console.log('Navigating to:', `/product-card/${productId}`)
			router.push(`/product-card/${productId}`)
		},
		[productId, router]
	)

	return {
		handleLike,
		handleDelete,
		handleEdit,
		handleClick,
		isUserProduct
	}
}
