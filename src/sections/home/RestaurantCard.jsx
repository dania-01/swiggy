import Link from "next/link";
import Image from "next/image";
import { CDN_URL } from "@/lib/data/restaurants";
import { formatRating, formatDeliveryTime } from "@/lib/utils/formatters";

/* Swiggy's green star-in-circle rating badge */
function StarRating({ rating, deliveryTime }) {
  return (
    <div className="flex items-center gap-1 text-sm text-(--swiggy-text)">
      <span className="inline-flex items-center justify-center size-4 rounded-full bg-(--swiggy-green) shrink-0">
        <svg viewBox="0 0 12 12" fill="white" className="size-2.5">
          <path d="M6 1l1.236 2.506 2.764.402-2 1.948.472 2.752L6 7.506l-2.472 1.302.472-2.752-2-1.948 2.764-.402L6 1z" />
        </svg>
      </span>
      <span className="font-medium">{formatRating(rating)}</span>
      <span className="text-(--swiggy-gray)">•</span>
      <span className="text-(--swiggy-gray)">{formatDeliveryTime(deliveryTime)}</span>
    </div>
  );
}

export default function RestaurantCard({ restaurant }) {
  const {
    id,
    name,
    imageId,
    cuisines,
    rating,
    deliveryTime,
    discount,
    promoted,
    locality,
    isOpen = true,
  } = restaurant;

  return (
    <Link href={`/restaurant/${id}`} className="block group">
      <div className="cursor-pointer">
        {/* Image */}
        <div className="relative w-full overflow-hidden rounded-2xl bg-gray-100" style={{ aspectRatio: "3/2" }}>
          <Image
            src={`${CDN_URL}${imageId}`}
            alt={name}
            fill
            className={`object-cover transition-transform duration-300 group-hover:scale-105 ${!isOpen ? "grayscale opacity-60" : ""}`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Discount banner */}
          {discount && isOpen && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent px-3 py-3">
              <p className="text-white text-sm font-bold tracking-wide truncate">{discount}</p>
            </div>
          )}

          {/* Closed overlay */}
          {!isOpen && (
            <div className="absolute inset-0 bg-black/30 flex items-end justify-start p-3">
              <span className="text-white text-xs font-semibold bg-black/60 px-2 py-1 rounded">
                Closed
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="pt-2.5 pb-1 space-y-0.5">
          <h3 className="font-bold text-[15px] text-(--swiggy-text) leading-snug line-clamp-1 group-hover:text-(--swiggy-orange) transition-colors">
            {name}
          </h3>
          <StarRating rating={rating} deliveryTime={deliveryTime} />
          <p className="text-sm text-(--swiggy-gray) line-clamp-1">
            {cuisines.join(", ")}
          </p>
          {locality && (
            <p className="text-sm text-(--swiggy-gray) line-clamp-1">{locality}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
