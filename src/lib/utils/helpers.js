import { restaurants } from "../data/restaurants";

export function filterRestaurants(list, { cuisine, sortBy, searchQuery, vegOnly }) {
  let result = [...list];

  if (vegOnly) {
    result = result.filter((r) => r.isVeg);
  }

  if (cuisine && cuisine !== "All") {
    result = result.filter((r) =>
      r.cuisines.some((c) => c.toLowerCase().includes(cuisine.toLowerCase()))
    );
  }

  if (searchQuery && searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    result = result.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.cuisines.some((c) => c.toLowerCase().includes(q)) ||
        r.areaName.toLowerCase().includes(q)
    );
  }

  if (sortBy) {
    switch (sortBy) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "deliveryTime":
        result.sort((a, b) => a.deliveryTime - b.deliveryTime);
        break;
      case "priceAsc":
        result.sort((a, b) => a.priceForTwo - b.priceForTwo);
        break;
      case "priceDesc":
        result.sort((a, b) => b.priceForTwo - a.priceForTwo);
        break;
      case "relevance":
      default:
        break;
    }
  }

  return result;
}

export function getRestaurantById(id) {
  return restaurants.find((r) => r.id === id) ?? null;
}

export function getFeaturedRestaurants(count = 8) {
  return restaurants.filter((r) => r.promoted).slice(0, count);
}

export function getRestaurantsByCuisine(cuisine, count = 10) {
  return restaurants
    .filter((r) => r.cuisines.some((c) => c.toLowerCase() === cuisine.toLowerCase()))
    .slice(0, count);
}
