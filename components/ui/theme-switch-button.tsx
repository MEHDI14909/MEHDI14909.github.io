'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'

interface ThemeSwitchProps {
  className?: string
  onThemeChange?: (theme: 'light' | 'dark') => void
}

export function ThemeSwitch({ className = '', onThemeChange }: ThemeSwitchProps) {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light')

  // Check current theme on component mount (defaults to 'light' = Crimson Red)
  React.useEffect(() => {
    const saved = localStorage.getItem('theme')
    const initialTheme: 'light' | 'dark' =
      saved === 'dark' || saved === 'light' ? saved : 'light'

    setTheme(initialTheme)
    document.documentElement.classList.toggle('dark', initialTheme === 'dark')
    onThemeChange?.(initialTheme)
  }, [onThemeChange])

  // Toggle theme
  const toggleTheme = React.useCallback(() => {
    const newTheme: 'light' | 'dark' = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    onThemeChange?.(newTheme)
    window.dispatchEvent(
      new CustomEvent('portfolio-theme-change', { detail: newTheme })
    )
  }, [theme, onThemeChange])

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        theme === 'light'
          ? 'Switch to curated gradient theme'
          : 'Switch to crimson red theme'
      }
      title={
        theme === 'light'
          ? 'Switch to Gradient Theme'
          : 'Switch to Crimson Red Theme'
      }
      className={`relative flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-color-primary)] hover:opacity-80 transition-opacity overflow-hidden cursor-pointer ${className}`}
    >
      <Sun
        className={`absolute h-5 w-5 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          theme === 'light'
            ? 'scale-100 translate-y-0 opacity-100'
            : 'scale-50 translate-y-5 opacity-0'
        }`}
      />
      <Moon
        className={`absolute h-5 w-5 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          theme === 'dark'
            ? 'scale-100 translate-y-0 opacity-100'
            : 'scale-50 translate-y-5 opacity-0'
        }`}
      />
    </button>
  )
}

export default ThemeSwitch
