import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { redirect } from 'next/navigation';

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        blue:
          "bg-[#087EEF] text-white shadow-xs hover:bg-[#0776E1] focus-visible:ring-bg-[#0776E1]",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        glass: "bg-white/5 bg-opacity-40 backdrop-blur-xl bg-blend-multiply border border-white/10",
      },
      size: {
        default: "px-5 h-[38px] has-[>svg]:px-3 rounded-full",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export type ButtonVariants = VariantProps<typeof buttonVariants>;


export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  ButtonVariants {
  asChild?: boolean;
  href?: string;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  href,
  ...props
}: React.ComponentProps<"button"> & ButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      onClick={href ? () => redirect(href) : props.onClick}
      {...props}
    />
  )
}

export { Button, buttonVariants }
