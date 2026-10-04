import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionContextType {
  openItem: string | null
  setOpenItem: (value: string | null) => void
  collapsible?: boolean
}

const AccordionContext = React.createContext<AccordionContextType | undefined>(undefined)

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple"
  collapsible?: boolean
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}

export function Accordion({
  className,
  collapsible = true,
  defaultValue = "item-1",
  value,
  onValueChange,
  children,
  ...props
}: AccordionProps) {
  const [internalValue, setInternalValue] = React.useState<string | null>(defaultValue || null)

  const activeItem = value !== undefined ? value : internalValue

  const setOpenItem = (itemValue: string | null) => {
    if (value === undefined) {
      setInternalValue(itemValue)
    }
    if (onValueChange && itemValue !== null) {
      onValueChange(itemValue)
    }
  }

  return (
    <AccordionContext.Provider value={{ openItem: activeItem, setOpenItem, collapsible }}>
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

interface AccordionItemContextType {
  value: string
  isOpen: boolean
}

const AccordionItemContext = React.createContext<AccordionItemContextType | undefined>(undefined)

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

export function AccordionItem({ className, value, children, ...props }: AccordionItemProps) {
  const context = React.useContext(AccordionContext)
  if (!context) throw new Error("AccordionItem must be used within Accordion")

  const isOpen = context.openItem === value

  return (
    <AccordionItemContext.Provider value={{ value, isOpen }}>
      <div className={cn("border-b border-[#E6E1DA] transition-colors", className)} {...props}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  )
}

interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function AccordionTrigger({ className, children, ...props }: AccordionTriggerProps) {
  const accContext = React.useContext(AccordionContext)
  const itemContext = React.useContext(AccordionItemContext)
  if (!accContext || !itemContext) throw new Error("AccordionTrigger must be used within AccordionItem")

  const { setOpenItem, collapsible } = accContext
  const { value, isOpen } = itemContext

  const handleClick = () => {
    if (isOpen) {
      if (collapsible) setOpenItem(null)
    } else {
      setOpenItem(value)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-expanded={isOpen}
      className={cn(
        "flex w-full items-center justify-between py-4 text-left font-medium text-base text-[#111111] hover:text-[#B85D19] transition-colors cursor-pointer group",
        className
      )}
      {...props}
    >
      <span className="pr-4">{children}</span>
      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 transition-transform duration-300 text-[#777777] group-hover:text-[#B85D19]",
          isOpen && "rotate-180 text-[#B85D19]"
        )}
      />
    </button>
  )
}

interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AccordionContent({ className, children, ...props }: AccordionContentProps) {
  const itemContext = React.useContext(AccordionItemContext)
  if (!itemContext) throw new Error("AccordionContent must be used within AccordionItem")

  const { isOpen } = itemContext

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <div className={cn("pb-5 pt-1 text-sm sm:text-base leading-relaxed text-[#4A4A4A]", className)} {...props}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
