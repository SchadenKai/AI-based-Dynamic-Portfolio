"use client"

import * as React from "react"
import { Palette, Check, ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme, THEMES, type ThemeName } from "@/components/providers/ThemeProvider"

// Preview swatch colors for each theme
const THEME_SWATCHES: Record<ThemeName, { bg: string; primary: string; secondary: string }> = {
  light:     { bg: "#ffffff", primary: "#7C3AED", secondary: "#FFD600" },
  dark:      { bg: "#000000", primary: "#7C3AED", secondary: "#FFD600" },
  cyberpunk: { bg: "#0a0a1a", primary: "#FF00FF", secondary: "#00FFFF" },
  sunset:    { bg: "#1a0a0a", primary: "#FF6B35", secondary: "#FFB347" },
  ocean:     { bg: "#041C32", primary: "#04D9FF", secondary: "#06D6A0" },
  forest:    { bg: "#0B1D0B", primary: "#4CAF50", secondary: "#FFD54F" },
  rose:      { bg: "#FFF5F7", primary: "#E91E63", secondary: "#9C27B0" },
  retro:     { bg: "#FFFBEB", primary: "#D97706", secondary: "#059669" },
  midnight:  { bg: "#0F0F23", primary: "#6366F1", secondary: "#A78BFA" },
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Close on click outside
  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  // Close on Escape
  React.useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false)
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen])

  if (!mounted) {
    return (
      <div className="w-11 h-11 bg-surface border-2 border-border rounded-lg opacity-50" />
    )
  }

  const currentTheme = THEMES.find(t => t.name === theme)

  return (
    <div ref={menuRef} className="relative">
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-11 h-11 rounded-lg flex items-center justify-center
          bg-surface border-2 border-border
          shadow-[2px_2px_0px_0px_var(--border-color)]
          hover:shadow-[4px_4px_0px_0px_var(--border-color)]
          hover:-translate-x-0.5 hover:-translate-y-0.5
          active:shadow-none active:translate-x-0.5 active:translate-y-0.5
          transition-all duration-200
          focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
        "
        whileTap={{ scale: 0.95 }}
        aria-label="Change theme"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-lg" aria-hidden="true">{currentTheme?.emoji || "🎨"}</span>
      </motion.button>

      {/* Theme Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="
              absolute bottom-full right-0 mb-3
              w-64 p-2
              bg-surface border-2 border-border
              shadow-[6px_6px_0px_0px_var(--border-color)]
              z-[100]
              rounded-lg
            "
            role="listbox"
            aria-label="Select a theme"
          >
            {/* Header */}
            <div className="flex items-center gap-2 px-2 pb-2 mb-1 border-b-2 border-border border-dashed">
              <Palette className="w-4 h-4 text-primary" />
              <span className="text-xs font-mono font-bold text-foreground uppercase tracking-wider">
                Select Theme
              </span>
            </div>

            {/* Theme Options */}
            <div className="grid grid-cols-1 gap-0.5">
              {THEMES.map((t) => {
                const isActive = theme === t.name
                const swatches = THEME_SWATCHES[t.name]
                return (
                  <motion.button
                    key={t.name}
                    onClick={() => {
                      setTheme(t.name)
                      setIsOpen(false)
                    }}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-md
                      text-left w-full
                      transition-all duration-150
                      font-mono text-sm
                      ${isActive
                        ? "bg-primary/15 text-primary font-bold border border-primary/30"
                        : "hover:bg-foreground/5 text-foreground/80 hover:text-foreground border border-transparent"
                      }
                    `}
                    role="option"
                    aria-selected={isActive}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Color Swatches */}
                    <div className="flex-shrink-0 flex gap-0.5 border border-border/30 rounded overflow-hidden">
                      <div
                        className="w-4 h-6"
                        style={{ backgroundColor: swatches.bg }}
                      />
                      <div
                        className="w-4 h-6"
                        style={{ backgroundColor: swatches.primary }}
                      />
                      <div
                        className="w-4 h-6"
                        style={{ backgroundColor: swatches.secondary }}
                      />
                    </div>

                    {/* Emoji + Label */}
                    <span className="text-base" aria-hidden="true">{t.emoji}</span>
                    <span className="flex-1">{t.label}</span>

                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                      >
                        <Check className="w-4 h-4 text-primary" />
                      </motion.div>
                    )}
                  </motion.button>
                )
              })}
            </div>

            {/* Footer hint */}
            <div className="flex items-center justify-center gap-1 pt-2 mt-1 border-t-2 border-border border-dashed">
              <ChevronUp className="w-3 h-3 text-muted-foreground" />
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                Click to close
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
