import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Definir variantes del tooltip
const tooltipVariants = cva(
  "inline-flex items-center text-xs font-medium rounded-md shadow-lg p-2 transition-opacity duration-150",
  {
    variants: {
      variant: {
        default: "bg-black text-white",
        info: "bg-blue-600 text-white",
        warning: "bg-yellow-500 text-black",
        error: "bg-red-600 text-white",
        success: "bg-green-600 text-white",
      },
      size: {
        sm: "text-xs p-1",
        default: "text-sm p-2",
        lg: "text-base p-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface TooltipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tooltipVariants> {
  asChild?: boolean
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
        className={cn(tooltipVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
Tooltip.displayName = "Tooltip"

export { Tooltip, tooltipVariants }
