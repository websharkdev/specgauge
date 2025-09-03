"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

type ProgressProps = React.ComponentProps<typeof ProgressPrimitive.Root> & {
  indicatorClassName?: string
}

function Progress({
  className,
  value,
  indicatorClassName = "bg-primary",
  ...props
}: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative h-1 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={`${indicatorClassName} h-full w-full flex-1 transition-all rounded-full`}
        style={{ transform: `translateX(-${value! < 10 ? 94 : (100 - (value || 0))}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
