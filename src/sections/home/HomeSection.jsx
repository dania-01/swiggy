"use client";

import { useState, useMemo } from "react";
import CuisineSection from "./CuisineSection";
import FilterBar from "./FilterBar";
import FeaturedCarousel from "./FeaturedCarousel";
import RestaurantGrid from "./RestaurantGrid";
import { restaurants } from "@/lib/data/restaurants";
import { filterRestaurants, getFeaturedRestaurants } from "@/lib/utils/helpers";

const CITY = "Ahmedabad";

const featured = getFeaturedRestaurants(12);

export default function HomeSection() {
  const [sortBy, setSortBy] = useState("relevance");
  const [filters, setFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  function handleFilterChange(chipId) {
    if (chipId === null) { setFilters([]); return; }
    setFilters((prev) =>
      prev.includes(chipId) ? prev.filter((f) => f !== chipId) : [...prev, chipId]
    );
  }

  const filteredList = useMemo(() => {
    let list = filterRestaurants(restaurants, {
      cuisine: "",
      sortBy,
      searchQuery,
      vegOnly: filters.includes("veg"),
    });
    if (filters.includes("rating4plus")) list = list.filter((r) => r.rating >= 4.0);
    if (filters.includes("under30")) list = list.filter((r) => r.deliveryTime <= 30);
    if (filters.includes("offers")) list = list.filter((r) => Boolean(r.discount));
    return list;
  }, [sortBy, filters, searchQuery]);

  const isFiltering = searchQuery || filters.length > 0 || sortBy !== "relevance";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
      {/* Cuisine tiles */}
      <CuisineSection />

      {/* Featured carousel — hidden when filtering */}
      {!isFiltering && (
        <FeaturedCarousel
          restaurants={featured}
          title={`Top restaurant chains in ${CITY}`}
        />
      )}

      {/* Filter bar — sticks below header when scrolled */}
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        sortBy={sortBy}
        onSortChange={setSortBy}
        resultCount={filteredList.length}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
      />

      {/* Main restaurant grid */}
      <div className="mt-6">
        <RestaurantGrid
          restaurants={filteredList}
          title={
            searchQuery
              ? `Results for "${searchQuery}"`
              : `Restaurants with online food delivery in ${CITY}`
          }
        />
      </div>
    </div>
  );
}
