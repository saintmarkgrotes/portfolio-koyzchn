import { ArrowUpRight, Github, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

const projects = [
  {
    name: "Si Rebyu",
    desc: "AI study platform: upload a document, get flashcards and quizzes, review with spaced repetition.",
    stack: "React · Vite · Supabase · FastAPI · Gemini",
    href: "https://si-rebyu.vercel.app",
  },
]

export default function App() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <header className="mb-20 flex items-center justify-between text-sm">
        <span className="font-medium">Mark Grotes</span>
        <nav className="flex gap-6 text-muted-foreground">
          <a href="#work" className="hover:text-foreground transition-colors">Work</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
        </nav>
      </header>

      <section className="mb-24">
        <h1 className="text-4xl font-semibold tracking-tight">
          Full-stack developer building clear, focused tools.
        </h1>
        <p className="mt-4 text-muted-foreground">Cebu, Philippines.</p>
        <div className="mt-8 flex gap-3">
          <Button asChild><a href="#work">View work</a></Button>
          <Button variant="outline" asChild><a href="#contact">Get in touch</a></Button>
        </div>
      </section>

      <section id="work" className="mb-24">
        <h2 className="mb-6 text-xs uppercase tracking-widest text-muted-foreground">Selected work</h2>
        <ul className="divide-y divide-border border-y border-border">
          {projects.map((p) => (
            <li key={p.name}>
              <a href={p.href} target="_blank" rel="noreferrer" className="group flex items-start justify-between gap-4 py-6">
                <div>
                  <p className="font-medium">{p.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{p.stack}</p>
                </div>
                <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <footer id="contact" className="flex items-center gap-6 border-t border-border pt-6 text-sm text-muted-foreground">
        <a href="mailto:you@email.com" className="flex items-center gap-2 hover:text-foreground"><Mail className="size-4" />Email</a>
        <a href="https://github.com/saintmarkgrotes" className="flex items-center gap-2 hover:text-foreground"><Github className="size-4" />GitHub</a>
      </footer>
    </main>
  )
}