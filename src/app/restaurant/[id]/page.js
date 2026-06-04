import { notFound } from "next/navigation";
import { getRestaurantById } from "@/lib/utils/helpers";
import { getMenuByRestaurantId } from "@/lib/data/menuItems";
import RestaurantPage from "@/sections/restaurant/RestaurantPage";

export async function generateMetadata({ params }) {
  const restaurant = getRestaurantById((await params).id);
  if (!restaurant) return { title: "Restaurant not found" };
  return {
    title: `${restaurant.name} Menu — Swiggy`,
    description: `Order from ${restaurant.name}. ${restaurant.cuisines.join(", ")}.`,
  };
}

export default async function Page({ params }) {
  const id = (await params).id;
  const restaurant = getRestaurantById(id);
  if (!restaurant) notFound();

  const menu = getMenuByRestaurantId(id);

  return <RestaurantPage restaurant={restaurant} menu={menu} />;
}
