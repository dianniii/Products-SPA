import { Skeleton } from '@/components/ui/skeleton'

function Loading() {
	return (
		<div className='min-h-screen bg-white'>
			<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				<div className='space-y-6'>
					<Skeleton className='h-6 w-24 mb-6' />

					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
						<Skeleton className='aspect-square rounded-lg' />
						<div className='space-y-6'>
							<Skeleton className='h-8 rounded' />
							<Skeleton className='h-6 rounded w-1/4' />

							<div className='space-y-2'>
								<Skeleton className='h-4 rounded' />
								<Skeleton className='h-4 rounded' />
								<Skeleton className='h-4 rounded w-3/4' />
							</div>

							<div className='grid grid-cols-2 gap-4'>
								<Skeleton className='h-4 rounded' />
								<Skeleton className='h-4 rounded' />
							</div>

							<Skeleton className='h-10 rounded' />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Loading
