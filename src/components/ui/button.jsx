import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-transparent font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:ring-2 focus-visible:ring-(--swiggy-orange)/50 disabled:pointer-events-none disabled:opacity-50 cursor-pointer [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-(--swiggy-orange) text-white hover:bg-[#e04800] active:scale-95 shadow-sm",
        outline:
          "border-(--swiggy-orange) text-(--swiggy-orange) bg-transparent hover:bg-(--swiggy-orange-light)",
        ghost:
          "text-(--swiggy-text) hover:bg-(--swiggy-light-gray)",
        add:
          "border border-(--swiggy-green) text-(--swiggy-green) bg-white hover:bg-(--swiggy-green-light) font-bold tracking-widest text-xs",
        stepper:
          "border border-(--swiggy-green) text-(--swiggy-green) bg-white hover:bg-(--swiggy-green-light) font-bold text-base",
        secondary:
          "bg-(--swiggy-light-gray) text-(--swiggy-text) hover:bg-gray-200",
        destructive:
          "bg-red-50 text-(--swiggy-red) border border-red-200 hover:bg-red-100",
        link: "text-(--swiggy-orange) underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        xs:      "h-6 px-2 text-xs rounded-md",
        sm:      "h-8 px-3 text-sm",
        default: "h-10 px-4 text-sm",
        lg:      "h-12 px-6 text-base",
        xl:      "h-14 px-8 text-base font-semibold",
        icon:    "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

function Button({ className, variant, size, ...props }) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
