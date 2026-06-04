import MenuSkeleton from "@/sections/restaurant/MenuSkeleton";

export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-28 animate-pulse">
      {/* Back nav */}
      <div className="h-4 w-36 bg-gray-200 rounded my-4" />

      {/* Restaurant header skeleton */}
      <div className="flex flex-col sm:flex-row gap-5 py-6">
        <div className="w-full sm:w-48 h-36 bg-gray-200 rounded-2xl shrink-0" />
        <div className="flex-1 space-y-3 py-1">
          <div className="h-7 w-52 bg-gray-200 rounded" />
          <div className="h-4 w-64 bg-gray-200 rounded" />
          <div className="h-3 w-40 bg-gray-200 rounded" />
          <div className="flex gap-3 pt-1">
            <div className="h-16 w-28 bg-gray-200 rounded-xl" />
            <div className="h-16 w-28 bg-gray-200 rounded-xl" />
            <div className="h-16 w-28 bg-gray-200 rounded-xl" />
          </div>
        </div>
      </div>

      <div className="border-t-8 border-gray-50" />
      <MenuSkeleton />
    </div>
  );
}
