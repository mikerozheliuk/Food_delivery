import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import axios from "axios";

import { Cart } from "./pages/Cart/Cart";

import { PageNotFound } from "./pages/PageNotFound/PageNotFound";
import { Product } from "./pages/Product/Product";

import { Layout } from "./layout/Menu/Layout";
import { PREFIX } from "./helpers/API";
import { Spinner } from "./components/Spinner/Spinner";

const Menu = lazy(() => import("./pages/Menu/Menu"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Spinner />}>
            <Menu />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/product/:id",
        element: <Product />,
        errorElement: <>Помилка</>,
        loader: async ({ params }) => {
          await new Promise<void>((resolve) => {
            setTimeout(() => {
              resolve();
            }, 2000);
          });
          const { data } = await axios.get(
            `${PREFIX}/products/${params.id}`
          );
          return data;
        },
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
