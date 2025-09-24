import { cn } from '@/lib/utils'
import * as React from 'react'

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
	size?: 'sm' | 'md' | 'lg'
	required?: boolean
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
	({ className, size = 'md', required = false, ...props }, ref) => {
		return (
			<label
				className={cn(
					'font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
					{
						'text-sm': size === 'sm',
						'text-base': size === 'md',
						'text-lg': size === 'lg'
					},
					className
				)}
				ref={ref}
				{...props}
			>
				{props.children}
				{required && <span className='text-red-500 ml-1'>*</span>}
			</label>
		)
	}
)
Label.displayName = 'Label'

export { Label }
