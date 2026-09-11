import { createContext, ReactNode, useContext, useState } from "react";

interface CartItem {
  productId: number;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (productId: number) => void;
}

const CartContext = createContext({} as CartContextType);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function addToCart(productId: number) {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.productId === productId,
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prevItems, { productId, quantity: 1 }];
    });
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  return useContext(CartContext);
};
