import { notFound } from "next/navigation";
import { CUISINE_CATEGORIES } from "@/config";
import CuisinePage from "@/sections/restaurants/CuisinePage";

function findCategory(slug) {
  return CUISINE_CATEGORIES.find(
    (c) => c.label.toLowerCase().replace(/\s+/g, "-") === slug
  );
}

export async function generateMetadata({ params }) {
  const { cuisine } = await params;
  const cat = findCategory(cuisine);
  if (!cat) return { title: "Not Found" };
  return {
    title: `${cat.label} Restaurants — Swiggy`,
    description: `Order the best ${cat.label} food online. Fast delivery near you.`,
  };
}

export default async function Page({ params }) {
  const { cuisine } = await params;
  const cat = findCategory(cuisine);
  if (!cat) notFound();

  return <CuisinePage slug={cuisine} label={cat.label} />;
}
