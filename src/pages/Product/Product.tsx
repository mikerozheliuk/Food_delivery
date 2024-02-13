import { Await, useLoaderData } from "react-router-dom";
import { Product } from "../../interfaces/product.interface";
import { Suspense } from "react";
import { Spinner } from "../../components/Spinner/Spinner";

export function Product() {
  const data = useLoaderData() as { data: Product };

  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Await resolve={data.data}>
          {({ data }: { data: Product }) => (
            <>Product - {data.name}</>
          )}
        </Await>
      </Suspense>
    </>
  );
}
