import { Mail } from "lucide-react"
import Folder from "@/components/folder"
import { useIsDark } from "@/lib/use-dark"
import { buttonVariants } from "@/components/ui/button"
import FloatingNav from "@/components/floating-nav"
import { Badge } from "@/components/ui/badge"

function GithubIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.17c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  )
}

const projects = [
  {
    name: "Si Rebyu",
    desc: "AI study platform: upload a document, get flashcards and quizzes, review with spaced repetition.",
    stack: "React · Vite · Supabase · FastAPI · Gemini",
    href: "https://si-rebyu.vercel.app",
  },
]

const folderItems = projects.map(({ name, desc, href }) => ({
  title: name,
  description: desc,
  href,
}))

const experience = [
  {
    type: "Work",
    years: "2025 – Present",
    org: "Company Name",
    role: "Full-stack Developer",
    note: "One line on what you built or owned.",
  },
  {
    type: "Education",
    years: "2021 – 2025",
    org: "University Name",
    role: "BS in Computer Science",
    note: "Honors, thesis topic, or relevant coursework.",
  },
]

const stack = [
  { group: "Frontend", items: ["React", "Vite", "Tailwind CSS", "shadcn/ui"] },
  { group: "Backend", items: ["Python", "FastAPI", "Supabase"] },
  { group: "AI", items: ["Gemini API"] },
  { group: "Tools", items: ["Git", "GitHub", "Vercel"] },
]

export default function App() {
  const dark = useIsDark()
  return (
  <>
    <FloatingNav/>
    <main className="mx-auto max-w-2xl px-6 py-20">

      <section id="top" className="mb-24 scroll-mt-24">
        <h1 className="text-4xl font-semibold tracking-tight">
          Full-stack developer building clear, focused tools.
        </h1>
        <p className="mt-4 text-muted-foreground">Calbayog, Philippines.</p>
        <div className="mt-8 flex gap-3">
          <a href="#work" className={buttonVariants()}>View work</a>
          <a href="#contact" className={buttonVariants({ variant: "outline" })}>Get in touch</a>
        </div>
      </section>

      <section id="work" className="mb-24 scroll-mt-24">
        <h2 className="mb-6 text-xs uppercase tracking-widest text-muted-foreground">Selected work</h2>
        <div className="flex justify-center overflow-x-clip py-16">
          <Folder
            label="Projects"
            items={folderItems}
            size={1.15}
            color={dark ? "#a1a1aa" : "#18181b"}
            paperColor={dark ? "#fafafa" : "#ffffff"}
            theme={dark ? "dark" : "light"}
            zoomOnClick={false}
            onItemClick={(item) => window.open(item.href, "_blank", "noopener,noreferrer")}
          />
        </div>
        <p className="text-center text-xs text-muted-foreground">
          Open the folder, then click a page to visit the project.
        </p>
      </section>

      <section id="stack" className="mb-24 scroll-mt-24">
        <h2 className="mb-6 text-xs uppercase tracking-widest text-muted-foreground">Tech stack</h2>
        <dl className="divide-y divide-border border-y border-border">
          {stack.map(({ group, items }) => (
            <div key={group} className="grid gap-3 py-5 sm:grid-cols-[8rem_1fr]">
              <dt className="text-sm text-muted-foreground">{group}</dt>
              <dd className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <Badge key={item} variant="outline">{item}</Badge>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="experience" className="mb-24 scroll-mt-24">
        <h2 className="mb-6 text-xs uppercase tracking-widest text-muted-foreground">Experience</h2>
        <ul className="divide-y divide-border border-y border-border">
          {experience.map(({ type, years, org, role, note }) => (
            <li key={`${org}-${years}`} className="grid gap-1 py-5 sm:grid-cols-[8rem_1fr] sm:gap-3">
              <p className="text-sm text-muted-foreground">{years}</p>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{org}</p>
                  <Badge variant="outline">{type}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{role}</p>
                {note && <p className="mt-2 text-xs text-muted-foreground">{note}</p>}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <footer id="contact" className="scroll-mt-24 flex items-center gap-6 border-t border-border pt-6 text-sm text-muted-foreground">
        <a href="grotessaintmark@gmail.com" className="flex items-center gap-2 hover:text-foreground"><Mail className="size-4" />Email</a>
        <a href="https://github.com/saintmarkgrotes" className="flex items-center gap-2 hover:text-foreground"><GithubIcon className="size-4" />GitHub</a>
      </footer>
    </main>
  </>
  )
}