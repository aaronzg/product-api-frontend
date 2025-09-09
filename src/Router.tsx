import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layouts/Layout";
import { Products } from "./pages/Products";
import { NewProduct } from "./pages/NewProduct";
import { action as newProductAction } from "./pages/NewProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // Cada children es un objeto
      {
        index: true, // Para que se renderize en la ruta principal
        element: <Products />,
      },
      {
        path: 'productos/nuevo',
        element: <NewProduct />,
        action: newProductAction
      }
    ],
  },
]);
