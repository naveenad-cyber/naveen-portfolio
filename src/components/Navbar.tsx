'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { profile } from '@/data/profile'
import { cn } from '@/lib/utils'

const links = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'training', label: 'Training' },
  { id: 'certifications', label: 'Credentials' },
  { id: 'testimonials', label: 'Feedback' },
  { id: 'skills', label: 'Expertise' },
  { id: 'demo', label: 'Demo' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = [...links.map((l) => l.id), 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled || open ? 'border-b border-line bg-ink-950/80 backdrop-blur-xl' : 'border-b border-transparent',
      )}
    >
      <div className="container-x flex h-[72px] items-center justify-between">
        <a href="#top" className="group flex items-center gap-2 font-mono text-[15px]" aria-label={`${profile.name} — back to top`}>
          <span className="text-accent">❯</span>
          <span className="text-white">naveen<span className="text-fog-dim">@</span>sec</span>
          <span className="text-accent">:~$</span>
          <span aria-hidden className="h-[16px] w-[8px] animate-blink bg-accent" />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              aria-current={active === l.id ? 'true' : undefined}
              className={cn(
                'relative rounded-sm px-3.5 py-2 font-mono text-[12px] uppercase tracking-wider transition-colors',
                active === l.id ? 'text-white' : 'text-fog-muted hover:text-white',
              )}
            >
              {l.label}
              {active === l.id && <span className="absolute inset-x-4 -bottom-0.5 h-px bg-accent" />}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#contact" className="btn-primary hidden !py-2.5 !text-[12px] sm:inline-flex">
            ./contact
          </a>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-sm border border-line text-fog lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <div id="mobile-nav" hidden={!open} className="border-t border-line bg-ink-950/95 backdrop-blur-xl lg:hidden">
        <nav aria-label="Mobile" className="container-x flex flex-col py-4">
          {[...links, { id: 'contact', label: 'Contact' }].map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-line/60 py-4 font-mono text-xl text-white last:border-0"
            >
              {l.label}
              <span className="font-mono text-xs text-accent">./</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
