import { draftProductSchema, ProductSchema, ProductsSchema } from '../types'
import type { Product } from '../types'
import { safeParse, pipe, transform, string, number, parse } from 'valibot'
import axios from 'axios'
import { toBoolean } from '../utils'

type Productdata = {
  [k: string]: FormDataEntryValue
}

type Data = {
  name: string
  price: number
}

export async function addProduct(data: Productdata) {
  try {
    const newData: Data = {
      name: data.name as string,
      price: +data.price, // Convertimos el precio a numero
    }

    const result = safeParse(draftProductSchema, newData)

    if (!result.success) throw new Error('Datos no validos')

    const url = `${import.meta.env.VITE_API_URL}/api/products`

    await axios.post(url, newData)
  } catch (e) {
    console.log(e)
  }
}

export const getProducts = async () => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products`
    const { data } = await axios(url)
    const result = safeParse(ProductsSchema, data.products)

    if (result.success) return result.output

    throw new Error('Hubo un error al recuperar los productos...')
  } catch (error) {
    console.log(error)
  }
}

export const getProductById = async (id: Product['id']) => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
    const { data } = await axios(url)
    const result = safeParse(ProductSchema, data.product)

    if (result.success) return result.output
    throw new Error('Hubo un error al recuperar los productos...')
  } catch (error) {
    console.log(error)
  }
}

export const updateProduct = async (data: Productdata, id: Product['id']) => {
  try {
    const NumberSchema = pipe(
      string(),
      transform((val) => Number(val)),
      number()
    )

    const result = safeParse(ProductSchema, {
      id,
      name: data.name,
      price: parse(NumberSchema, data.price),
      availability: toBoolean(data.availability.toString()),
    })

    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
      await axios.put(url, result.output)
    }
  } catch (error) {
    console.log(error)
  }
}

export const deleteProduct = async (id: Product['id']) => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
    await axios.delete(url)
  } catch (error) {
    console.log(error)
  }
}

export const updateProductAvailability = async (id: Product['id']) => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
    await axios.patch(url)
  } catch (error) {
    console.log(error)
  }
}
