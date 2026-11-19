import Reveal from './Reveal'

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  compact,
}: {
  eyebrow: string
  title: React.ReactNode
  intro?: string
  id?: string
  compact?: boolean
}) {
  return (
    <Reveal className={compact ? 'mb-7 max-w-3xl md:mb-8' : 'mb-10 max-w-3xl md:mb-14'}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 id={id} className={compact ? 'h-display mt-4 text-[1.65rem] sm:text-3xl md:text-[2.1rem]' : 'h-display mt-5 text-[1.75rem] sm:text-4xl md:text-[2.8rem]'}>
        {title}
      </h2>
      {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fog-muted">{intro}</p>}
    </Reveal>
  )
}
