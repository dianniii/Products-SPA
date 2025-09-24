'use client'

import Link from 'next/link'

export default function Header() {
	return (
		<header className='bg-neutral-100 shadow-sm'>
			<div className='mx-auto max-w-screen-xl px-6 flex items-center h-16'>
				<nav className='flex gap-6'>
					<Link
						href='/'
						className='text-zinc-700 text-xl hover:text-zinc-900 transition-colors'
					>
						Products
					</Link>
					<Link
						href='/created-card'
						className='text-zinc-700 text-xl hover:text-zinc-900 transition-colors'
					>
						Created
					</Link>
				</nav>
			</div>
		</header>
	)
}
