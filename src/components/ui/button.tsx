import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-none text-sm font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
  {
    variants: {
      variant: {
        default: "bg-black text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-800 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]",
        destructive:
          "bg-white text-red-600 border-2 border-red-600 shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] hover:bg-red-50",
        outline:
          "bg-white text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100",
        secondary:
          "bg-gray-200 text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-300",
        ghost: "hover:bg-accent hover:text-accent-foreground border-2 border-transparent hover:border-black",
        link: "text-primary underline-offset-4 hover:underline decoration-2",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }