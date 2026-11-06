import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

// Black and white only: intensity comes from opacity, so it follows light/dark mode
const LEVELS = [
  "bg-border",
  "bg-foreground/20",
  "bg-foreground/40",
  "bg-foreground/65",
  "bg-foreground",
]

function buildGrid(days) {
  // Pad the first week so every column starts on Sunday
  const offset = new Date(`${days[0].date}T00:00:00`).getDay()
  const cells = [...Array(offset).fill(null), ...days]
  const columns = Math.ceil(cells.length / 7)

  const labels = []
  let lastMonth = -1
  for (let col = 0; col < columns; col++) {
    const first = cells.slice(col * 7, col * 7 + 7).find(Boolean)
    const month = first ? Number(first.date.slice(5, 7)) - 1 : lastMonth
    labels.push(month !== lastMonth ? MONTHS[month] : "")
    lastMonth = month
  }
  // Drop a cramped first label so it doesn't collide with the next one
  if (labels[0] && labels.slice(1, 4).some(Boolean)) labels[0] = ""

  return { cells, columns, labels }
}

export default function GithubActivity({ username = "saintmarkgrotes" }) {
  const [state, setState] = useState({ status: "loading", data: null })
  const scrollRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then((res) => {
        if (!res.ok) throw new Error("Request failed")
        return res.json()
      })
      .then((data) => {
        if (!cancelled) setState({ status: "ready", data })
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error", data: null })
      })
    return () => {
      cancelled = true
    }
  }, [username])

  // On small screens the graph scrolls sideways; start at the most recent weeks
  useEffect(() => {
    const el = scrollRef.current
    if (state.status === "ready" && el) el.scrollLeft = el.scrollWidth
  }, [state.status])

  const ready = state.status === "ready" && state.data?.contributions?.length > 0
  const grid = ready ? buildGrid(state.data.contributions) : null
  const total = ready
    ? (state.data.total?.lastYear ??
      state.data.contributions.reduce((sum, day) => sum + day.count, 0))
    : 0
  const columns = grid ? { gridTemplateColumns: `repeat(${grid.columns}, minmax(0, 1fr))` } : undefined

  return (
    <div>
      <div className="mb-4 flex items-baseline justify-between gap-4 text-sm">
        <p className="text-muted-foreground">
          {ready ? (
            <>
              <span className="font-medium text-foreground">{total.toLocaleString()}</span>{" "}
              contributions in the last year
            </>
          ) : state.status === "error" ? (
            "Couldn’t load activity right now."
          ) : (
            "Loading activity…"
          )}
        </p>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
        >
          @{username}
        </a>
      </div>

      <div ref={scrollRef} className="overflow-x-auto pb-2">
        <div className="min-w-[600px]">
          {ready ? (
            <>
              <div className="mb-1 grid gap-[3px] text-[10px] leading-3 text-muted-foreground" style={columns}>
                {grid.labels.map((label, i) => (
                  <span key={i} className="whitespace-nowrap">
                    {label}
                  </span>
                ))}
              </div>
              <div
                className="grid gap-[3px]"
                style={{ ...columns, gridTemplateRows: "repeat(7, auto)", gridAutoFlow: "column" }}
              >
                {grid.cells.map((day, i) =>
                  day ? (
                    <div
                      key={day.date}
                      title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                      className={cn("aspect-square rounded-[2px]", LEVELS[day.level] ?? LEVELS[0])}
                    />
                  ) : (
                    <div key={`pad-${i}`} className="aspect-square" />
                  )
                )}
              </div>
            </>
          ) : (
            state.status === "loading" && <div className="h-28 animate-pulse rounded-md bg-muted" />
          )}
        </div>
      </div>

      {ready && (
        <div className="mt-3 flex items-center justify-end gap-1.5 text-[10px] text-muted-foreground">
          <span>Less</span>
          {LEVELS.map((level) => (
            <span key={level} className={cn("size-2.5 rounded-[2px]", level)} />
          ))}
          <span>More</span>
        </div>
      )}
    </div>
  )
}