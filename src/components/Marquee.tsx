import { profile } from '@/data/profile'

export default function Marquee() {
  const items = [...profile.positioning, 'Phishing Simulation', 'Social Engineering Awareness', 'Security Awareness Campaigns']
  const row = (hidden?: boolean) => (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t} className="flex items-center gap-10 whitespace-nowrap font-mono text-sm uppercase tracking-[0.28em] text-fog-muted sm:text-base">
          {t}
          <span aria-hidden className="text-accent">{'//'}</span>
        </li>
      ))}
    </ul>
  )
  return (
    <div className="relative overflow-hidden border-y border-line bg-ink-900/60 py-4" role="presentation">
      <div className="flex w-max animate-marquee">
        {row()}
        {row(true)}
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-950 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-950 to-transparent" />
    </div>
  )
}
