import '@/app/globals.css'
import Footer from '@/components/common/footer'
import Header from '@/components/common/header'
import { ProductsProvider } from '@/context/ProductsContext'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

export const metadata: Metadata = {
	title: 'Products-spa',
	description: 'Favorite products in one place'
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html
			lang='en'
			className='bg-white'
		>
			<body className={`${inter.className} min-h-screen flex flex-col mx-auto`}>
				<Header />
				<main className='flex-1'>
					<div className='mx-auto'>
						<ProductsProvider>{children}</ProductsProvider>
					</div>
				</main>
				<Footer />
			</body>
		</html>
	)
}
