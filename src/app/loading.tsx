// app/products/loading.tsx
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
	return (
		<div className='min-h-screen bg-white'>
			<div className='pl-4 pr-4'>
				<div className='mx-auto max-w-7xl'>
					<div className='flex justify-between items-center mb-4 pt-6'>
						<Skeleton className='h-10 w-32' />
					</div>
					<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6'>
						<div className='flex gap-2'>
							<Skeleton className='h-10 w-20' />
							<Skeleton className='h-10 w-24' />
							<Skeleton className='h-10 w-28' />
						</div>
						<Skeleton className='h-10 w-64' />
					</div>
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'>
						{Array.from({ length: 12 }).map((_, index) => (
							<div
								key={index}
								className='flex justify-center'
							>
								<div className='w-full max-w-75 space-y-3 p-5 border border-gray-200 rounded-xl'>
									<Skeleton className='h-40 w-full rounded-lg' />
									<Skeleton className='h-6 w-full' />
									<Skeleton className='h-4 w-3/4' />
									<Skeleton className='h-4 w-1/2' />
									<div className='flex justify-between items-center pt-3'>
										<Skeleton className='h-6 w-16' />
										<Skeleton className='h-8 w-8 rounded-full' />
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Пагинация */}
					<div className='flex justify-center mt-8'>
						<Skeleton className='h-10 w-64' />
					</div>
				</div>
			</div>
		</div>
	)
}
