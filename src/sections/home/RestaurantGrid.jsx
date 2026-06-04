import RestaurantCard from "./RestaurantCard";

function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="rounded-2xl bg-gray-200 w-full" style={{ aspectRatio: "3/2" }} />
      <div className="pt-2.5 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
      </div>
    </div>
  );
}

export default function RestaurantGrid({ restaurants, loading = false, title }) {
  if (loading) {
    return (
      <section>
        {title && <h2 className="text-xl font-bold text-(--swiggy-text) mb-5">{title}</h2>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-8">
          {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </section>
    );
  }

  if (!restaurants || restaurants.length === 0) {
    return (
      <section className="py-20 text-center">
        <p className="text-5xl mb-4">🍽️</p>
        <h3 className="text-lg font-semibold text-(--swiggy-text) mb-1">No restaurants found</h3>
        <p className="text-sm text-(--swiggy-gray)">Try a different filter or search term</p>
      </section>
    );
  }

  return (
    <section>
      {title && (
        <h2 className="text-xl font-bold text-(--swiggy-text) mb-5">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-8">
        {restaurants.map((r) => (
          <RestaurantCard key={r.id} restaurant={r} />
        ))}
      </div>
    </section>
  );
}
