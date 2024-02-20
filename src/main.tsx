import "./index.scss";

import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter, defer } from "react-router-dom";

import { Provider } from "react-redux";

import axios from "axios";

import { store } from "./store/store";

import { Cart } from "./pages/Cart/Cart";
import { Login } from "./pages/Login/Login";
import { Product } from "./pages/Product/Product";
import { Register } from "./pages/Register/Register";
import { PageNotFound } from "./pages/PageNotFound/PageNotFound";

import { PREFIX } from "./helpers/API";
import { RequireAuth } from "./helpers/RequireAuth";

import { Layout } from "./layout/Menu/Layout";
import { AuthLayout } from "./layout/Auth/AuthLayout";

import { Spinner } from "./components/Spinner/Spinner";

const Menu = lazy(() => import("./pages/Menu/Menu"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
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
          return defer({
            data: new Promise((resolve, reject) => {
              setTimeout(() => {
                axios
                  .get(`${PREFIX}/products/${params.id}`)
                  .then((data) => resolve(data))
                  .catch((e) => reject(e));
              }, 2000);
            }),
          });
        },
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
