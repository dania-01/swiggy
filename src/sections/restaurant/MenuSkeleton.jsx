export default function MenuSkeleton() {
  return (
    <div className="animate-pulse mt-4">
      {/* Veg toggle placeholder */}
      <div className="flex justify-end py-3 border-b border-gray-100">
        <div className="h-5 w-28 bg-gray-200 rounded-full" />
      </div>
      {[1, 2, 3].map((cat) => (
        <div key={cat} className="py-4 border-b border-gray-100">
          <div className="h-5 w-32 bg-gray-200 rounded mb-4" />
          {[1, 2].map((item) => (
            <div key={item} className="flex justify-between gap-4 py-4 border-b border-gray-50 last:border-0">
              <div className="flex-1 space-y-2">
                <div className="h-3 w-16 bg-gray-200 rounded" />
                <div className="h-4 w-40 bg-gray-200 rounded" />
                <div className="h-3 w-12 bg-gray-200 rounded" />
                <div className="h-3 w-64 bg-gray-200 rounded" />
              </div>
              <div className="shrink-0 space-y-2">
                <div className="w-24 h-24 bg-gray-200 rounded-xl" />
                <div className="w-24 h-8 bg-gray-200 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
