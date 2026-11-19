import { profile } from '@/data/profile'

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="container-x flex flex-col items-center justify-between gap-4 text-sm text-fog-dim sm:flex-row">
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} {profile.name} ({profile.alternateName}) · {profile.jobTitle} · {profile.location}
        </p>
        <p className="flex items-center gap-2 font-mono text-xs text-accent"><span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-accent" />SYSTEM SECURE</p>
        <a href="#top" className="transition hover:text-accent">
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}
