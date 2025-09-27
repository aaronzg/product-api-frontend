import { array, boolean, number, object, string, type InferOutput } from "valibot";

export const draftProductSchema = object({
  name: string(),
  price: number()
})

export const ProductSchema = object({
  name: string(),
  price: number(),
  id: number(),
  availability: boolean()
})

export const ProductsSchema = array(
  object({
    name: string(),
    price: number(),
    id: number(),
    availability: boolean(),
  })
)
export type Product = InferOutput<typeof ProductSchema>