import { Button } from '@/components/ui/button'

interface FilterTabsProps {
	activeFilter: string
	onFilterChange: (filter: string) => void
}

function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps) {
	const filters = [
		{ id: 'all', label: 'All' },
		{ id: 'favorites', label: 'Favorites' },
		{ id: 'created', label: 'Created' }
	]

	return (
		<div className='flex gap-2 mb-6'>
			{filters.map(filter => (
				<Button
					key={filter.id}
					variant={activeFilter === filter.id ? 'default' : 'outline'}
					size='sm'
					onClick={() => onFilterChange(filter.id)}
					className='px-4 py-2 text-sm font-medium'
				>
					{filter.label}
				</Button>
			))}
		</div>
	)
}

export { FilterTabs }
