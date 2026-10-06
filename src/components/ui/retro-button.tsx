import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const retroButtonVariants = cva(
  "relative inline-flex items-center justify-center border-2 border-transparent rounded-[2px] bg-[#010101] shadow-[1px_1px_1px_rgba(255,255,255,0.6)] cursor-pointer select-none transition-transform duration-150",
  {
    variants: {
      variant: {
        default: [
          "text-white",
          "[--bg-color:theme(colors.orange.500,#f97316)]",
          "[--bg-color-active:theme(colors.orange.600,#ea580c)]",
          "[--shadow-light:theme(colors.orange.300,#fdba74)]",
          "[--shadow-dark:theme(colors.orange.700,#c2410c)]",
        ],
        darkGray: [
          "text-white",
          "[--bg-color:theme(colors.neutral.700,#404040)]",
          "[--bg-color-active:theme(colors.neutral.800,#262626)]",
          "[--shadow-light:theme(colors.neutral.400,#a3a3a3)]",
          "[--shadow-dark:theme(colors.neutral.900,#171717)]",
        ],
        white: [
          "text-black",
          "[--bg-color:theme(colors.neutral.200,#e5e5e5)]",
          "[--bg-color-active:theme(colors.neutral.300,#d4d4d4)]",
          "[--shadow-light:theme(colors.white,#ffffff)]",
          "[--shadow-dark:theme(colors.neutral.500,#737373)]",
        ],
        lightGray: [
          "text-white",
          "[--bg-color:theme(colors.neutral.400,#a3a3a3)]",
          "[--bg-color-active:theme(colors.neutral.500,#737373)]",
          "[--shadow-light:theme(colors.neutral.200,#e5e5e5)]",
          "[--shadow-dark:theme(colors.neutral.600,#525252)]",
        ],
        gray: [
          "text-white",
          "[--bg-color:theme(colors.neutral.600,#525252)]",
          "[--bg-color-active:theme(colors.neutral.700,#404040)]",
          "[--shadow-light:theme(colors.neutral.400,#a3a3a3)]",
          "[--shadow-dark:theme(colors.neutral.800,#262626)]",
        ],
        gold: [
          "text-[#111111]",
          "[--bg-color:#dfc59e]",
          "[--bg-color-active:#c99f5b]",
          "[--shadow-light:#f3e8d6]",
          "[--shadow-dark:#9f7c3f]",
        ],
      },
      size: {
        default: "w-24",
        md: "w-auto min-w-[140px]",
        lg: "w-auto min-w-[190px]",
        full: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const retroButtonInnerVariants = cva(
  [
    "inline-block w-full rounded-[9px] px-3.5 py-2.5",
    "uppercase tracking-wider text-center font-medium",
    "bg-[var(--bg-color)] transition-all duration-200",
    "shadow-[inset_1px_1px_1px_var(--shadow-light),inset_-1px_-1px_1px_var(--shadow-dark),2px_2px_4px_#000]",
    "active:scale-[0.98] active:bg-[var(--bg-color-active)]",
    "active:shadow-[inset_0_0_4px_#000,inset_1px_1px_1px_transparent,inset_-1px_-1px_1px_transparent,2px_2px_4px_transparent]",
  ]
)

export interface RetroButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof retroButtonVariants> {
  children: React.ReactNode
  innerClassName?: string
}

const RetroButton = React.forwardRef<HTMLButtonElement, RetroButtonProps>(
  ({ className, innerClassName, variant, size, children, ...props }, ref) => {
    return (
      <button
        className={cn(retroButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <span className={cn(retroButtonInnerVariants(), innerClassName)}>{children}</span>
      </button>
    )
  }
)
RetroButton.displayName = "RetroButton"

export { RetroButton }
export default RetroButton
