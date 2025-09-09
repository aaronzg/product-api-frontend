import { draftProductSchema } from "../types";
import { safeParse } from "valibot";
import axios from "axios";

type Productdata = {
  [k: string]: FormDataEntryValue;
};

type Data = {
  name: string
  price: number
}

export async function addProduct(data: Productdata) {
  try {
    const newData : Data  = {
      name: data.name as string,
      price: +data.price, // Convertimos el precio a numero
    }

    const result = safeParse(draftProductSchema, newData);

    if (!result.success) throw new Error("Datos no validos");

    const url = `${import.meta.env.VITE_API_URL}/api/products`

   const { data: response } = await axios.post(url, newData)
    console.log(result);

  } catch (e) {
    console.log(e);
  }
}
