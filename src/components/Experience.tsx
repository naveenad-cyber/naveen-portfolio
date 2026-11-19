import { ArrowUpRight, MapPin } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { currentRole, previousRoles, type Experience } from '@/data/experience'

function Dates({ role }: { role: Experience }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <span>{role.period}</span>
      {role.reviewNote && <span className="placeholder-tag">{role.reviewNote}</span>}
    </span>
  )
}

export default function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="exp-title" className="section border-t border-line bg-ink-900/40">
      <div className="container-x">
        <SectionHeading
          eyebrow="Experience"
          id="exp-title"
          title={
            <>
              Where I am now, and <em className="text-gradient">how I got here.</em>
            </>
          }
        />

        {/* Current role */}
        <Reveal>
          <article className="relative overflow-hidden rounded-lg border border-accent/25 bg-gradient-to-br from-ink-700/80 via-ink-800/80 to-ink-900 p-8 sm:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(0,255,156,0.25), transparent 65%)' }}
            />
            <div className="relative grid gap-10 lg:grid-cols-[1fr_1.1fr]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                  <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-accent" /> Current role
                </span>
                <h3 className="h-display mt-6 text-3xl sm:text-4xl">{currentRole.company}</h3>
                <p className="mt-3 text-xl text-accent-soft">{currentRole.role}</p>
                <p className="mt-4 text-sm text-fog-muted">
                  <Dates role={currentRole} />
                </p>
                {currentRole.summary && <p className="mt-6 max-w-md text-lg leading-relaxed text-fog-muted">{currentRole.summary}</p>}
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fog-dim">Focus areas</p>
                <ul className="mt-5 space-y-4">
                  {currentRole.highlights.map((h) => (
                    <li key={h} className="flex gap-4 text-[17px] leading-relaxed text-fog">
                      <ArrowUpRight size={18} className="mt-1 shrink-0 text-accent" aria-hidden />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap gap-2">
                  {currentRole.tags.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </Reveal>

        {/* Timeline */}
        <div className="mt-20">
          <Reveal>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-fog-dim">Previous experience</h3>
          </Reveal>
          <ol className="relative mt-8 border-l border-line pl-8 sm:pl-12">
            {previousRoles.map((r, i) => (
              <li key={r.id} className="relative pb-12 last:pb-0">
                <span
                  aria-hidden
                  className="absolute -left-[37px] top-2 h-2.5 w-2.5 rounded-full border border-accent bg-ink-950 sm:-left-[53px]"
                />
                <Reveal delay={Math.min(i * 0.04, 0.2)}>
                  <div className="grid gap-4 md:grid-cols-[220px_1fr] md:gap-10">
                    <div>
                      <p className="text-sm text-fog-muted">
                        <Dates role={r} />
                      </p>
                      <p className="mt-2 inline-block rounded-full border border-line px-3 py-0.5 text-[11px] uppercase tracking-wider text-fog-dim">
                        {r.kind}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-display text-lg text-white">{r.company}</h4>
                      <p className="mt-1 text-accent-soft">{r.role}</p>
                      {r.location && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-fog-dim">
                          <MapPin size={13} aria-hidden /> {r.location}
                        </p>
                      )}
                      <ul className="mt-5 space-y-2.5 text-[15px] leading-relaxed text-fog-muted">
                        {r.highlights.map((h) => (
                          <li key={h} className="flex gap-3">
                            <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-accent/60" />
                            {h}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {r.tags.map((t) => (
                          <span key={t} className="chip">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
