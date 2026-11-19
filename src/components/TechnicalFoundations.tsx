import { ArrowUpRight } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { projects } from '@/data/projects'
import { profile } from '@/data/profile'

export default function TechnicalFoundations() {
  return (
    <section id="foundations" aria-labelledby="found-title" className="section border-t border-line bg-ink-900/40">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Technical Foundations"
            id="found-title"
            title={
              <>
                Hands-on work behind <em className="text-gradient">the credibility.</em>
              </>
            }
            intro="Security engineering and GRC projects that keep my training and awareness work grounded in practice."
          />
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn-ghost mb-14">
            GitHub <ArrowUpRight size={14} aria-hidden />
          </a>
        </div>
        <ul className="divide-y divide-line border-y border-line">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={Math.min(i * 0.04, 0.2)}>
              <li className="grid gap-3 py-6 md:grid-cols-[90px_260px_1fr_auto] md:items-baseline md:gap-8">
                <span className="font-mono text-xs text-fog-dim">{p.year}</span>
                <h3 className="font-display text-lg text-white">{p.title}</h3>
                <p className="text-[15px] leading-relaxed text-fog-muted">{p.description}</p>
                <div className="flex flex-wrap gap-2 md:justify-end">
                  {p.tags.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
