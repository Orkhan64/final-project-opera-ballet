import { create } from "zustand";

const apiUrl = import.meta.env.VITE_API_URL;

export const useBasketStore = create((set) => ({
  basket: null,
  isLoading: false,
  error: null,

  getBasketItems: async (userId) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${apiUrl}/api/basket/${userId}`);
      if (!response.ok) {
        throw new Error("Error fetching basket");
      }
      const data = await response.json();
      set({ basket: data.data, isLoading: false });
    } catch (error) {
      set({
        error: error.message || "Error fetching basket",
        isLoading: false,
      });
    }
  },

  addToBasket: async (userId, eventId, bookingId, quantity) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${apiUrl}/api/basket`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          eventId,
          bookingId,
          quantity,
        }),
      });
      if (!response.ok) {
        throw new Error("Error adding to basket");
      }
      const data = await response.json();
      set({ basket: data.data, isLoading: false });
    } catch (error) {
      set({
        error: error.message || "Error adding to basket",
        isLoading: false,
      });
    }
  },

  updateBasketItem: async (userId, bookingId, quantity) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${apiUrl}/api/basket/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          bookingId,
          quantity,
        }),
      });
      if (!response.ok) {
        throw new Error("Error updating basket item");
      }
      const data = await response.json();
      set({ basket: data.data, isLoading: false });
    } catch (error) {
      set({
        error: error.message || "Error updating basket item",
        isLoading: false,
      });
    }
  },

  deleteBasketItem: async (userId, bookingId) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${apiUrl}/api/basket/${userId}/${bookingId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error deleting basket item");
      }
      const data = await response.json();
      set({ basket: data.data, isLoading: false });
    } catch (error) {
      set({
        error: error.message || "Error deleting basket item",
        isLoading: false,
      });
    }
  },
}));

export default useBasketStore;
