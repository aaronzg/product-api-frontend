import { number, object, string } from "valibot";

export const draftProductSchema = object({
  name: string(),
  price: number()
})