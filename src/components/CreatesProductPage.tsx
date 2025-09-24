'use client'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useProductForm } from '@/hooks/useProductForm'
import { AlertCircle, ArrowLeft } from 'lucide-react'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'

export default function CreateProductPage() {
	const {
		isEditing,
		productNotFound,
		loading,
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		onSubmit,
		handleReset,
		handleCancel
	} = useProductForm()

	if (loading) {
		return (
			<div className='container mx-auto py-8 max-w-2xl'>
				<div className='flex items-center justify-center h-64'>
					<div className='text-center'>
						<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
						<div className='text-lg text-gray-600'>Загрузка...</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className='container mx-auto py-8 max-w-2xl'>
			<Button
				variant='ghost'
				onClick={handleCancel}
				className='mb-4 flex items-center gap-2 cursor-pointer'
			>
				<ArrowLeft className='w-4 h-4' />
				Back to Products
			</Button>

			<Card>
				<CardHeader>
					<CardTitle>{isEditing ? 'Edit Product' : 'Create Product'}</CardTitle>
					<CardDescription>
						{isEditing
							? 'Update the details of your product'
							: 'Fill in the details to create a new product'}
					</CardDescription>
				</CardHeader>

				{productNotFound && (
					<div className='mx-6 mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg'>
						<div className='flex items-center gap-2 text-yellow-800'>
							<AlertCircle className='w-5 h-5' />
							<div>
								<strong>Product not found</strong>
								<p className='text-sm'>
									The product you are trying to edit does not exist or has been
									deleted.
								</p>
							</div>
						</div>
					</div>
				)}

				<form onSubmit={handleSubmit(onSubmit)}>
					<CardContent className='space-y-6'>
						<div className='space-y-2'>
							<Label htmlFor='title'>Title</Label>
							<Input
								id='title'
								placeholder='Enter product title'
								{...register('title', {
									required: 'Title is required',
									minLength: {
										value: 2,
										message: 'Title must be at least 2 characters long'
									}
								})}
								className={errors.title ? 'border-destructive' : ''}
							/>
							{errors.title && (
								<p className='text-sm text-destructive'>
									{errors.title.message}
								</p>
							)}
						</div>

						<div className='space-y-2'>
							<Label htmlFor='description'>Description</Label>
							<Textarea
								id='description'
								placeholder='Short description'
								rows={3}
								{...register('description', {
									required: 'Description is required',
									minLength: {
										value: 10,
										message: 'Description must be at least 10 characters long'
									}
								})}
								className={errors.description ? 'border-destructive' : ''}
							/>
							<p className='text-sm text-muted-foreground'>
								Keep it concise and informative.
							</p>
							{errors.description && (
								<p className='text-sm text-destructive'>
									{errors.description.message}
								</p>
							)}
						</div>

						<div className='space-y-2'>
							<Label htmlFor='image'>Image URL</Label>
							<Input
								id='image'
								type='url'
								placeholder='https://example.com/image.jpg'
								{...register('image', {
									required: 'Image URL is required',
									pattern: {
										value: /^https?:\/\/.+\..+/,
										message: 'Please enter a valid URL'
									}
								})}
								className={errors.image ? 'border-destructive' : ''}
							/>
							{errors.image && (
								<p className='text-sm text-destructive'>
									{errors.image.message}
								</p>
							)}
						</div>

						<div className='space-y-2'>
							<Label htmlFor='price'>Price ($)</Label>
							<Input
								id='price'
								type='number'
								step='0.01'
								min='0.01'
								placeholder='0.00'
								{...register('price', {
									required: 'Price is required',
									min: { value: 0.01, message: 'Price must be greater than 0' },
									max: {
										value: 1000000,
										message: 'Price must be less than 1,000,000'
									},
									valueAsNumber: true
								})}
								className={errors.price ? 'border-destructive' : ''}
							/>
							{errors.price && (
								<p className='text-sm text-destructive'>
									{errors.price.message}
								</p>
							)}
						</div>
					</CardContent>

					<CardFooter className='flex justify-between mt-4'>
						<Button
							type='button'
							variant='outline'
							onClick={isEditing ? handleCancel : handleReset}
							disabled={isSubmitting}
						>
							{isEditing ? 'Cancel' : 'Reset'}
						</Button>
						<Button
							type='submit'
							disabled={isSubmitting || productNotFound}
						>
							{isSubmitting
								? isEditing
									? 'Updating...'
									: 'Creating...'
								: isEditing
								? 'Update'
								: 'Create'}
						</Button>
					</CardFooter>
				</form>
			</Card>
		</div>
	)
}
