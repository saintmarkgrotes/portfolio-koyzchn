import { useState } from "react"
import { flushSync } from "react-dom"
import { Moon, Sun } from "lucide-react"

export default function ThemeToggle() {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  )

  function toggle(e) {
    const next = !dark

    const apply = () => {
      setDark(next)
      document.documentElement.classList.toggle("dark", next)
    }

    try {
      localStorage.setItem("theme", next ? "dark" : "light")
    } catch {
      // storage unavailable (private mode); the theme just won't persist
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!document.startViewTransition || reduceMotion) {
      apply()
      return
    }

    // Circular reveal that starts from the button and grows to cover the screen
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    const transition = document.startViewTransition(() => flushSync(apply))
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 500,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      )
    })
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
    >
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  )
}