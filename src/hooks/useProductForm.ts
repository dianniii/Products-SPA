// hooks/useProductForm.ts
'use client'

import { useProducts } from '@/context/ProductsContext'
import { Product } from '@/types/produsts-types'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
	FieldErrors,
	useForm,
	UseFormHandleSubmit,
	UseFormRegister,
	UseFormReset,
	UseFormResetField,
	UseFormSetError,
	UseFormSetValue
} from 'react-hook-form'

interface ProductFormValues {
	title: string
	description: string
	image: string
	price: number
}

interface UseProductFormReturn {
	// State
	isEditing: boolean
	currentProduct: Product | null
	productNotFound: boolean
	loading: boolean

	// Form
	register: UseFormRegister<ProductFormValues>
	handleSubmit: UseFormHandleSubmit<ProductFormValues>
	formState: {
		errors: FieldErrors<ProductFormValues>
		isSubmitting: boolean
	}
	setValue: UseFormSetValue<ProductFormValues>
	reset: UseFormReset<ProductFormValues>
	resetField: UseFormResetField<ProductFormValues>
	setError: UseFormSetError<ProductFormValues>

	// Handlers
	onSubmit: (data: ProductFormValues) => Promise<void>
	handleReset: () => void
	handleCancel: () => void
}

export function useProductForm(): UseProductFormReturn {
	const {
		addCreatedProduct,
		updateCreatedProduct,
		createdProducts,
		loading: contextLoading
	} = useProducts()
	const searchParams = useSearchParams()
	const router = useRouter()
	const editProductId = searchParams?.get('edit') || null

	const [isEditing, setIsEditing] = useState(false)
	const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
	const [productNotFound, setProductNotFound] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		setError,
		setValue,
		resetField
	} = useForm<ProductFormValues>()

	useEffect(() => {
		if (!contextLoading) {
			if (editProductId) {
				const productId = parseInt(editProductId)
				const productToEdit = createdProducts.find(p => p.id === productId)

				if (productToEdit) {
					setIsEditing(true)
					setCurrentProduct(productToEdit)
					setProductNotFound(false)

					setValue('title', productToEdit.title)
					setValue('description', productToEdit.description)
					setValue('image', productToEdit.image)
					setValue('price', productToEdit.price)
				} else {
					setProductNotFound(true)
					setIsEditing(false)
					setCurrentProduct(null)
					reset()
				}
			} else {
				setIsEditing(false)
				setCurrentProduct(null)
				setProductNotFound(false)
				reset()
			}
		}
	}, [editProductId, createdProducts, contextLoading, setValue, reset])

	const onSubmit = async (data: ProductFormValues) => {
		try {
			// Валидация
			if (!data.title.trim()) {
				setError('title', { message: 'Title is required' })
				return
			}
			if (!data.description.trim()) {
				setError('description', { message: 'Description is required' })
				return
			}
			if (!data.image.trim()) {
				setError('image', { message: 'Image URL is required' })
				return
			}
			if (data.price <= 0) {
				setError('price', { message: 'Price must be greater than 0' })
				return
			}

			if (isEditing && currentProduct) {
				// Обновляем существующий товар
				const updatedProduct = {
					...currentProduct,
					title: data.title.trim(),
					description: data.description.trim(),
					image: data.image.trim(),
					price: data.price
				}

				updateCreatedProduct(updatedProduct)
				console.log('Product updated successfully:', updatedProduct)

				await new Promise(resolve => setTimeout(resolve, 500))
				alert('Product updated successfully!')
				router.push('/')
			} else {
				// Создаем новый продукт
				const newProduct = {
					id: -Date.now(),
					title: data.title.trim(),
					description: data.description.trim(),
					image: data.image.trim(),
					price: data.price,
					liked: false
				}

				addCreatedProduct(newProduct)
				console.log('Product created successfully:', newProduct)

				await new Promise(resolve => setTimeout(resolve, 500))
				alert('Product created successfully!')
				router.push('/')
			}
		} catch (error) {
			console.error('Error saving product:', error)
			alert('Failed to save product')
		}
	}

	const handleReset = () => {
		if (isEditing && currentProduct) {
			setValue('title', currentProduct.title)
			setValue('description', currentProduct.description)
			setValue('image', currentProduct.image)
			setValue('price', currentProduct.price)
		} else {
			reset()
		}
	}

	const handleCancel = () => {
		router.push('/')
	}

	return {
		// State
		isEditing,
		currentProduct,
		productNotFound,
		loading: contextLoading,

		// Form
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setValue,
		reset,
		resetField,
		setError,

		// Handlers
		onSubmit,
		handleReset,
		handleCancel
	}
}
