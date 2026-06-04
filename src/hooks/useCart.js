"use client";

import { useCartContext } from "@/context/CartContext";

export function useCart() {
  const { items, restaurantId, restaurantName, totalItems, totalPrice, dispatch } =
    useCartContext();

  function addItem(item, restaurantId, restaurantName) {
    dispatch({ type: "ADD_ITEM", item, restaurantId, restaurantName });
  }

  function removeItem(id) {
    dispatch({ type: "REMOVE_ITEM", id });
  }

  function clearCart() {
    dispatch({ type: "CLEAR_CART" });
  }

  function getItemQuantity(id) {
    return items.find((i) => i.id === id)?.quantity ?? 0;
  }

  function isFromDifferentRestaurant(incomingRestaurantId) {
    return !!restaurantId && restaurantId !== incomingRestaurantId;
  }

  return {
    items,
    restaurantId,
    restaurantName,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    clearCart,
    getItemQuantity,
    isFromDifferentRestaurant,
  };
}
