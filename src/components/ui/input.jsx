import { cn } from "@/lib/utils";

function InputWrapper({ className, children }) {
  return (
    <div className={cn("relative flex items-center w-full", className)}>
      {children}
    </div>
  );
}

function Input({ className, type = "text", leftIcon, rightIcon, ...props }) {
  const hasLeft = Boolean(leftIcon);
  const hasRight = Boolean(rightIcon);

  if (leftIcon || rightIcon) {
    return (
      <InputWrapper>
        {leftIcon && (
          <span className="absolute left-3 text-(--swiggy-gray) pointer-events-none flex items-center">
            {leftIcon}
          </span>
        )}
        <input
          type={type}
          data-slot="input"
          className={cn(
            "h-11 w-full rounded-lg border border-gray-200 bg-white text-sm text-(--swiggy-text) placeholder:text-gray-400",
            "outline-none transition-colors focus:border-(--swiggy-orange) focus:ring-2 focus:ring-(--swiggy-orange)/20",
            "disabled:pointer-events-none disabled:opacity-50",
            hasLeft && "pl-10",
            hasRight && "pr-10",
            !hasLeft && "pl-3",
            !hasRight && "pr-3",
            className
          )}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-3 text-(--swiggy-gray) flex items-center">
            {rightIcon}
          </span>
        )}
      </InputWrapper>
    );
  }

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-(--swiggy-text) placeholder:text-gray-400",
        "outline-none transition-colors focus:border-(--swiggy-orange) focus:ring-2 focus:ring-(--swiggy-orange)/20",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

function SearchInput({ className, ...props }) {
  return (
    <Input
      type="search"
      className={cn("h-12 rounded-full pl-12 pr-4 shadow-sm border-gray-300 text-base", className)}
      {...props}
    />
  );
}

export { Input, InputWrapper, SearchInput };
