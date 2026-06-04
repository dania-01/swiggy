"use client";

import { createContext, useContext, useReducer } from "react";

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.item.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      // If cart has items from a different restaurant, clear and start fresh
      if (state.restaurantId && state.restaurantId !== action.restaurantId) {
        return {
          restaurantId: action.restaurantId,
          restaurantName: action.restaurantName,
          items: [{ ...action.item, quantity: 1 }],
        };
      }
      return {
        restaurantId: action.restaurantId,
        restaurantName: action.restaurantName,
        items: [...state.items, { ...action.item, quantity: 1 }],
      };
    }

    case "REMOVE_ITEM": {
      const existing = state.items.find((i) => i.id === action.id);
      if (!existing) return state;
      if (existing.quantity === 1) {
        const items = state.items.filter((i) => i.id !== action.id);
        return {
          ...state,
          items,
          restaurantId: items.length === 0 ? null : state.restaurantId,
          restaurantName: items.length === 0 ? null : state.restaurantName,
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: i.quantity - 1 } : i
        ),
      };
    }

    case "CLEAR_CART":
      return { items: [], restaurantId: null, restaurantName: null };

    default:
      return state;
  }
}

const initialState = { items: [], restaurantId: null, restaurantName: null };

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ ...state, totalItems, totalPrice, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCartContext must be used inside CartProvider");
  return ctx;
}
