import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
	currentPage: number
	totalItems: number
	itemsPerPage: number
	onPageChange: (page: number) => void
}

function Pagination({
	currentPage,
	totalItems,
	itemsPerPage,
	onPageChange
}: PaginationProps) {
	const totalPages = Math.ceil(totalItems / itemsPerPage)

	return (
		<div className='flex justify-center items-center gap-4 mt-8 mb-8'>
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className='cursor-pointer p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50'
			>
				<ChevronLeft className='w-5 h-5' />
			</button>

			<span className='text-sm text-gray-600'>
				{currentPage} / {totalPages}
			</span>

			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className='cursor-pointer p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50'
			>
				<ChevronRight className='w-5 h-5' />
			</button>
		</div>
	)
}

export { Pagination }
