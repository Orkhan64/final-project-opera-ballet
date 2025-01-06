import { create } from "zustand";

const apiUrl = import.meta.env.VITE_API_URL;

export const cartStore = create((set) => ({
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  userId: null,

  setUserId: (userId) => set({ userId }),

  setCart: (cart) => set({ cart }),

  addToCart: async (newItem) => {
    try {
      const response = await fetch(`${apiUrl}/baskets/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            "An error occurred while adding a product to the cart."
        );
      }

      const data = await response.json();

      set((state) => {
        const existingItem = state.cart.find(
          (item) =>
            item.productId ===
            data.data.items[data.data.items.length - 1].productId
        );

        let updatedCart;
        if (existingItem) {
          updatedCart = state.cart.map((item) =>
            item.productId === existingItem.productId
              ? {
                  ...item,
                  quantity:
                    item.quantity +
                    data.data.items[data.data.items.length - 1].quantity,
                }
              : item
          );
        } else {
          updatedCart = [
            ...state.cart,
            data.data.items[data.data.items.length - 1],
          ];
        }

        localStorage.setItem("cart", JSON.stringify(updatedCart));

        return { cart: updatedCart };
      });
    } catch (error) {
      console.error("Error while adding product to cart:", error.message);
    }
  },

  updateCartItem: async (productId, quantity) => {
    const userId = localStorage.getItem("userId");
    try {
      if (quantity <= 0) {
        await cartStore.getState().deleteCartItem(productId);
        return;
      }

      const response = await fetch(`${apiUrl}/update`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId, quantity }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error updating cart item");
      }

      const data = await response.json();

      set((state) => {
        const updatedCart = state.cart.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return { cart: updatedCart };
      });
    } catch (error) {
      console.error("Error while updating cart item:", error.message);
    }
  },

  deleteCartItem: async (productId) => {
    try {
      const response = await fetch(
        `${apiUrl}/baskets/${localStorage.getItem(
          "userId"
        )}/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error deleting cart item");
      }

      const data = await response.json();
      console.log("Cart item deleted:", data);

      set((state) => {
        const updatedCart = state.cart.filter(
          (item) => item.productId !== productId
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return { cart: updatedCart };
      });
    } catch (error) {
      console.error("Error while deleting cart item:", error.message);
    }
  },

  getTotalItems: () => {
    const state = cartStore.getState();
    if (Array.isArray(state.cart)) {
      return state.cart.reduce((total, item) => total + item.quantity, 0);
    }
    return 0;
  },

  cartFetch: async (userId) => {
    try {
      const response = await fetch(`${apiUrl}/baskets/${userId}`);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error while getting cart data: ${errorText}`);
      }

      const data = await response.json();

      if (Array.isArray(data.data.items)) {
        set({ cart: data.data.items });
        localStorage.setItem("cart", JSON.stringify(data.data.items));
      } else {
        set({ cart: [] });
        localStorage.setItem("cart", JSON.stringify([]));
      }
    } catch (error) {
      console.error("Error while getting cart data:", error.message);
    }
  },

  clearCart: async () => {
    try {
      const userId = cartStore.getState().userId;
      if (userId) {
        const response = await fetch(
          `${apiUrl}/baskets/clear/${userId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error clearing the cart");
        }

        console.log("Cart cleared successfully");
      }

      set({ cart: [] });
      localStorage.removeItem("cart");
    } catch (error) {
      console.error("Error while clearing the cart:", error.message);
    }
  },
}));
