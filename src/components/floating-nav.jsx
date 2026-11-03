import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import ThemeToggle from "@/components/theme-toggle"

const links = [
  { id: "top", label: "Home" },
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
]

export default function FloatingNav() {
  const [active, setActive] = useState(links[0].id)

  useEffect(() => {
    const onScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (atBottom) {
        setActive(links[links.length - 1].id)
        return
      }

      const line = window.innerHeight * 0.4
      let current = links[0].id
      for (const { id } of links) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <div className="flex items-center gap-1 rounded-full border border-border bg-background/70 p-1 text-sm shadow-sm backdrop-blur-md">
        <span className="hidden px-3 font-medium sm:block">Mark Grotes</span>
        <span className="hidden h-4 w-px bg-border sm:block" />
        {links.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={active === id ? "true" : undefined}
            className={cn(
              "rounded-full px-3 py-1.5 transition-colors",
              active === id
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {label}
          </a>
        ))}
        <span className="h-4 w-px bg-border" />
        <ThemeToggle />
      </div>
    </nav>
  )
}