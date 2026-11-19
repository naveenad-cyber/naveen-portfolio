'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ExternalLink, Expand, Quote } from 'lucide-react'
import Lightbox from './Lightbox'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import type { Testimonial } from '@/data/testimonials'
import type { MediaImage } from '@/lib/media'
import { profile } from '@/data/profile'

export default function Testimonials({ quotes, screenshots }: { quotes: Testimonial[]; screenshots: MediaImage[] }) {
  const scroller = useRef<HTMLDivElement>(null)
  const [lightbox, setLightbox] = useState<number | null>(null)

  const hasContent = quotes.length + screenshots.length > 0

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current
    if (!el) return
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.85, 420), behavior: 'smooth' })
  }

  return (
    <section id="testimonials" aria-labelledby="fb-title" className="section border-t border-line">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Testimonials & Feedback"
            id="fb-title"
            title={
              <>
                In their <em className="text-gradient">own words.</em>
              </>
            }
            intro="Feedback from learners and participants, shown exactly as it was written."
          />
          {hasContent && (
            <div className="mb-14 flex gap-2">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                aria-label="Previous testimonials"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-fog transition hover:border-accent/60 hover:text-white"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                aria-label="Next testimonials"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-fog transition hover:border-accent/60 hover:text-white"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {hasContent ? (
          <div
            ref={scroller}
            tabIndex={0}
            role="region"
            aria-label="Testimonials carousel"
            className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8"
          >
            {quotes.map((t) => (
              <figure key={t.id} className="panel flex w-[86%] shrink-0 snap-start flex-col p-8 sm:w-[420px]">
                <Quote className="text-accent" size={28} aria-hidden />
                <blockquote className="mt-5 flex-1 text-[17px] leading-relaxed text-fog">{t.quote}</blockquote>
                <figcaption className="mt-7 border-t border-line pt-5">
                  {t.name && <p className="font-medium text-white">{t.name}</p>}
                  {(t.designation || t.organisation) && (
                    <p className="mt-0.5 text-sm text-fog-muted">{[t.designation, t.organisation].filter(Boolean).join(' · ')}</p>
                  )}
                  {t.context && <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-accent">{t.context}</p>}
                  {t.excerpt && <p className="mt-1 text-xs text-fog-dim">Excerpt · full recommendation on LinkedIn</p>}
                </figcaption>
              </figure>
            ))}
            {screenshots.map((s, i) => (
              <figure key={s.src} className="panel group w-[86%] shrink-0 snap-start overflow-hidden p-3 sm:w-[420px]">
                <button
                  type="button"
                  onClick={() => setLightbox(i)}
                  aria-label={`Open feedback screenshot${s.caption ? `: ${s.caption}` : ''}`}
                  className="relative block aspect-[4/5] w-full overflow-hidden rounded bg-ink-900"
                >
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    sizes="(min-width:640px) 420px, 86vw"
                    loading="lazy"
                    className="object-cover object-top transition duration-700 group-hover:scale-[1.03]"
                  />
                  <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-ink-950/70 text-white opacity-0 backdrop-blur transition group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Expand size={15} aria-hidden />
                  </span>
                </button>
                <figcaption className="px-3 pb-3 pt-4 text-sm text-fog-muted">{s.caption ?? 'Learner feedback screenshot'}</figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="grid gap-5 md:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <figure key={n} className="flex min-h-[240px] flex-col rounded-md border border-dashed border-amber-400/40 bg-amber-400/[0.03] p-8">
                  <Quote className="text-amber-300/70" size={26} aria-hidden />
                  <span className="placeholder-tag mt-4 self-start">Placeholder {n}</span>
                  <p className="mt-4 text-[15px] leading-relaxed text-fog-muted">
                    Real learner feedback goes here. Add the exact wording in <code className="font-mono text-xs text-fog">src/data/testimonials.ts</code>, or
                    drop screenshots into <code className="font-mono text-xs text-fog">public/feedback/</code>.
                  </p>
                  <figcaption className="mt-auto pt-6 text-sm text-fog-dim">Name · Designation · Organisation</figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        )}
      </div>

      {hasContent && (
        <div className="container-x mt-8">
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            Read all recommendations on LinkedIn <ExternalLink size={14} aria-hidden />
          </a>
        </div>
      )}

      <Lightbox
        items={screenshots.map((s) => ({ src: s.src, alt: s.alt, caption: s.caption, meta: 'Learner feedback' }))}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onChange={setLightbox}
      />
    </section>
  )
}
