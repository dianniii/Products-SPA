import axios from 'axios'
import { z } from 'zod'
import { Product } from '../types/produsts-types'

const api = axios.create({
	baseURL: 'https://dummyjson.com'
})

const ApiProductSchema = z.object({
	id: z.number(),
	title: z.string(),
	description: z.string(),
	thumbnail: z.string().url(),
	price: z.number()
})

const ApiProductsResponseSchema = z.object({
	products: z.array(ApiProductSchema)
})

function convertApiProductToAppProduct(
	item: z.infer<typeof ApiProductSchema>
): Product {
	return {
		id: item.id,
		title: item.title,
		description: item.description,
		image: item.thumbnail,
		price: item.price,
		liked: false
	}
}

//все products
export async function getProducts(): Promise<Product[]> {
	const { data } = await api.get('/products?limit=100')
	const parsed = ApiProductsResponseSchema.parse(data)
	return parsed.products.map(convertApiProductToAppProduct)
}

//product по id
export async function getProductById(id: number): Promise<Product> {
	try {
		const { data } = await api.get(`/products/${id}`)
		const parsed = ApiProductSchema.parse(data)
		return convertApiProductToAppProduct(parsed)
	} catch (error) {
		console.error(`Error fetching product ${id}:`, error)
		throw error
	}
}
