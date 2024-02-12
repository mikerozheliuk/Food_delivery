import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { Menu } from "./pages/Menu/Menu";
import { Cart } from "./pages/Cart/Cart";
import { PageNotFound } from "./pages/PageNotFound/PageNotFound";
import { Layout } from "./layout/Menu/Layout";
import { Product } from "./pages/Product/Product";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Menu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
    ],
  },

  {
    path: "*",
    element: <PageNotFound />,
  },
]);

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
