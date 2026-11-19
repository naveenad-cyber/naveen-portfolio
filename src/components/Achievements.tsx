import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import CountUp from './CountUp'
import { achievements } from '@/data/achievements'
import { cn } from '@/lib/utils'

function Figure({ value }: { value: string }) {
  const m = /^(\d+)(\+?)$/.exec(value)
  if (m) return <CountUp to={Number(m[1])} suffix={m[2]} />
  return <>{value}</>
}

export default function Achievements() {
  return (
    <section id="achievements" aria-labelledby="ach-title" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Achievements"
          id="ach-title"
          title={
            <>
              Impact, <em className="text-gradient">in numbers.</em>
            </>
          }
          intro="Verified milestones from training delivery, mentoring and professional development."
        />
        <div className="grid gap-4 md:grid-cols-4">
          {achievements.map((a, i) => (
            <Reveal key={a.id} delay={(i % 4) * 0.06} className={cn(a.size === 'md' ? 'md:col-span-1' : 'md:col-span-2')}>
              <article
                className={cn(
                  'panel group h-full overflow-hidden p-7 transition duration-500 hover:border-accent/40',
                  a.size === 'lg' && 'bg-gradient-to-br from-ink-700/70 to-ink-800/60 p-9',
                )}
              >
                <p
                  className={cn(
                    'font-display leading-none text-white',
                    a.size === 'lg' ? 'text-5xl text-gradient sm:text-7xl' : 'text-2xl sm:text-3xl',
                  )}
                >
                  <Figure value={a.figure} />
                </p>
                <h3 className="mt-5 text-base font-medium text-white">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fog-muted">{a.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
