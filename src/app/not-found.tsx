'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
	return (
		<main className='flex flex-col items-center justify-center space-y-6 h-1.5 mt-70'>
			<h1 className='text-5xl font-bold'>404</h1>
			<p className='text-xl'>Oops, something went wrong:(</p>
			<Link
				href='/'
				className='text-sm text-black hover:font-bold hover:underline'
			>
				<Button
					variant='ghost'
					className='mb-4 flex items-center gap-2 cursor-pointer'
				>
					<ArrowLeft className='w-4 h-4' />
					Back to Products
				</Button>
			</Link>
		</main>
	)
}
