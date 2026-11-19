import { Activity, BadgeCheck, Fish, GraduationCap, Landmark, Users } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { skillGroups } from '@/data/skills'

const icons = {
  'awareness-culture': Users,
  'phishing-se': Fish,
  'corporate-training': GraduationCap,
  'secops-siem': Activity,
  'grc-fundamentals': Landmark,
  frameworks: BadgeCheck,
} as const

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Skills & Expertise"
          id="skills-title"
          title={
            <>
              People first, <em className="text-gradient">grounded in technical depth.</em>
            </>
          }
          intro="Six areas of practice, from awareness and culture programmes to the security operations and compliance knowledge behind them."
        />

        <div className="grid gap-4 md:grid-cols-6">
          {skillGroups.map((g, i) => {
            const Icon = icons[g.id as keyof typeof icons] ?? Users
            return (
              <Reveal key={g.id} delay={(i % 3) * 0.07} className="md:col-span-3">
                <article className="panel group h-full p-7 transition duration-500 hover:-translate-y-1 hover:border-accent/40">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded border border-accent/25 bg-accent/10 text-accent transition group-hover:bg-accent/20">
                      <Icon size={21} aria-hidden />
                    </div>
                    <span className="font-mono text-xs text-fog-dim">0{i + 1}</span>
                  </div>
                  <h3 className="mt-6 font-display text-xl leading-tight text-white">{g.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-fog-muted">{g.blurb}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {g.skills.map((s) => (
                      <li key={s} className="chip">
                        {s}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
