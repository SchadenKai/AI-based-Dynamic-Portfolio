"use client"

import * as React from "react"

export type ThemeName = 
  | "light" 
  | "dark" 
  | "cyberpunk" 
  | "sunset" 
  | "ocean" 
  | "forest" 
  | "rose" 
  | "retro"
  | "midnight"

export interface ThemeConfig {
  name: ThemeName
  label: string
  emoji: string
  isDark: boolean
}

export const THEMES: ThemeConfig[] = [
  { name: "light",     label: "Light",     emoji: "☀️",  isDark: false },
  { name: "dark",      label: "Dark",      emoji: "🌙",  isDark: true  },
  { name: "cyberpunk", label: "Cyberpunk", emoji: "🤖",  isDark: true  },
  { name: "sunset",    label: "Sunset",    emoji: "🌅",  isDark: true  },
  { name: "ocean",     label: "Ocean",     emoji: "🌊",  isDark: true  },
  { name: "forest",    label: "Forest",    emoji: "🌲",  isDark: true  },
  { name: "rose",      label: "Rosé",      emoji: "🌸",  isDark: false },
  { name: "retro",     label: "Retro",     emoji: "📟",  isDark: false },
  { name: "midnight",  label: "Midnight",  emoji: "🔮",  isDark: true  },
]

interface ThemeContextType {
  theme: ThemeName
  setTheme: (theme: ThemeName) => void
  themes: ThemeConfig[]
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

// Script to inject in <head> to prevent flash of unstyled content
export function ThemeScript() {
  const script = `
    (function() {
      try {
        var theme = localStorage.getItem('portfolio-theme') || 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        // Also set dark class for components that check for it
        var isDark = ['dark','cyberpunk','sunset','ocean','forest','midnight'].includes(theme);
        document.documentElement.classList.toggle('dark', isDark);
      } catch (e) {}
    })();
  `
  return <script dangerouslySetInnerHTML={{ __html: script }} />
}

export function ThemeProvider({
  children,
  defaultTheme = "dark",
}: {
  children: React.ReactNode
  defaultTheme?: ThemeName
}) {
  const [theme, setThemeState] = React.useState<ThemeName>(defaultTheme)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    const stored = localStorage.getItem("portfolio-theme") as ThemeName | null
    if (stored && THEMES.some(t => t.name === stored)) {
      setThemeState(stored)
    }
    setMounted(true)
  }, [])

  const setTheme = React.useCallback((newTheme: ThemeName) => {
    setThemeState(newTheme)
    localStorage.setItem("portfolio-theme", newTheme)

    // Apply data-theme attribute
    document.documentElement.setAttribute("data-theme", newTheme)

    // Toggle .dark class for components that check for it
    const config = THEMES.find(t => t.name === newTheme)
    const isDark = config?.isDark ?? false
    document.documentElement.classList.toggle("dark", isDark)
  }, [])

  // Apply theme once mounted
  React.useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute("data-theme", theme)
      const config = THEMES.find(t => t.name === theme)
      const isDark = config?.isDark ?? false
      document.documentElement.classList.toggle("dark", isDark)
    }
  }, [mounted, theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  )
}
