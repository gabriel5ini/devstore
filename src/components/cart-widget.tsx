"use client";

import { useCart } from "@/contexts/cart-context";
import { ShoppingBagIcon } from "lucide-react";

export function CartWidget() {
  const { cartItems } = useCart();

  return (
    <div className="flex items-center gap-2">
      <ShoppingBagIcon className="h-4 w-4" />
      <span className="text-sm ">Cart ({cartItems.length})</span>
    </div>
  );
}
