"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { motion } from "framer-motion"

export default function Dock({ items, className }) {
  const [active, setActive] = React.useState(null)
  const [hovered, setHovered] = React.useState(null)

  return (
    <div className={cn("flex items-center justify-center w-full py-2 sm:py-3", className)}>
      <motion.div
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className={cn(
          "flex items-end gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-3xl",
          "border border-white/25 bg-black/35 backdrop-blur-2xl shadow-2xl text-white"
        )}
        style={{
          transform: "perspective(600px) rotateX(10deg)", // arc layout illusion
        }}
      >
        <TooltipProvider delayDuration={100}>
          {items.map((item, i) => {
            const isActive = active === item.label
            const isHovered = hovered === i

            return (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <motion.div
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    animate={{
                      scale: isHovered ? 1.2 : 1,
                      rotate: isHovered ? -5 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative flex flex-col items-center"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "rounded-2xl relative text-white hover:text-white hover:bg-white/20 h-9 w-9 sm:h-10 sm:w-10",
                        "transition-colors cursor-pointer",
                        isHovered && "shadow-lg shadow-white/20 bg-white/15"
                      )}
                      onClick={() => {
                        setActive(item.label)
                        item.onClick?.()
                      }}
                    >
                      <item.icon
                        className={cn(
                          "h-5 w-5 sm:h-5 sm:w-5 transition-colors",
                          isActive ? "text-white" : "text-white/80"
                        )}
                      />
                      {/* Glowing ring effect */}
                      {isHovered && (
                        <motion.span
                          layoutId="glow"
                          className="absolute inset-0 rounded-2xl border border-white/50"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                      )}
                    </Button>

                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="dot"
                        className="w-1.5 h-1.5 rounded-full bg-white mt-1 shadow-xs"
                      />
                    )}
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={8} className="text-xs bg-black/95 text-white border-white/15 px-2.5 py-1 rounded-lg shadow-xl font-medium">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            )
          })}
        </TooltipProvider>
      </motion.div>
    </div>
  )
}
