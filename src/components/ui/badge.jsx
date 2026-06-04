import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 font-medium whitespace-nowrap transition-colors",
  {
    variants: {
      variant: {
        rating:
          "bg-(--swiggy-green) text-white text-xs px-1.5 py-0.5 rounded",
        "rating-muted":
          "bg-(--swiggy-gray) text-white text-xs px-1.5 py-0.5 rounded",
        discount:
          "bg-(--swiggy-orange-light) text-(--swiggy-orange) text-xs px-2 py-0.5 rounded font-semibold",
        promoted:
          "border border-(--swiggy-orange) text-(--swiggy-orange) text-xs px-2 py-0.5 rounded-full",
        filter:
          "border border-gray-300 bg-white text-(--swiggy-text) text-sm px-3 py-1 rounded-full cursor-pointer hover:border-(--swiggy-orange) hover:text-(--swiggy-orange)",
        "filter-active":
          "border border-(--swiggy-orange) bg-(--swiggy-orange-light) text-(--swiggy-orange) text-sm px-3 py-1 rounded-full cursor-pointer font-semibold",
        default:
          "bg-gray-100 text-(--swiggy-text) text-xs px-2 py-0.5 rounded",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, children, ...props }) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </span>
  );
}

function VegIndicator({ isVeg, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center border-2 rounded-sm size-4 shrink-0",
        isVeg ? "border-(--swiggy-green)" : "border-(--swiggy-red)",
        className
      )}
    >
      <span
        className={cn(
          "size-2 rounded-full",
          isVeg ? "bg-(--swiggy-green)" : "bg-(--swiggy-red)"
        )}
      />
    </span>
  );
}

export { Badge, badgeVariants, VegIndicator };
