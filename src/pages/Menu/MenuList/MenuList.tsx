import ProductCart from "../../../components/ProductCart/ProductCart";
import { MenuListProps } from "./MenuList.props";

export function MenuList({ products }: MenuListProps) {
  return products.map((p) => (
    <ProductCart
      key={p.id}
      id={p.id}
      name={p.name}
      description={p.ingredients.join(", ")}
      rating={p.rating}
      price={p.price}
      image={p.image}
    />
  ));
}
