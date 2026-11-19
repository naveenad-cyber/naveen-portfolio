'use client'

import { useCallback, useMemo, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { Expand, ImagePlus } from 'lucide-react'
import Lightbox from './Lightbox'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { trainingPrograms } from '@/data/training'
import type { GalleryCategory, GalleryImage } from '@/lib/media'
import { cn } from '@/lib/utils'

/** Shown until real photos are added to /public/training/<category>/ */
const placeholderCategories = ['Classroom', 'Corporate', 'Workshops & Demos', 'International', 'Online']

export default function TrainingPortfolio({
  images,
  categories,
}: {
  images: GalleryImage[]
  categories: GalleryCategory[]
}) {
  const [filter, setFilter] = useState('all')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const visible = useMemo(() => (filter === 'all' ? images : images.filter((i) => i.category === filter)), [images, filter])
  const labelFor = useCallback((id: string) => categories.find((c) => c.id === id)?.label ?? '', [categories])

  const items = useMemo(
    () => visible.map((i) => ({ src: i.src, alt: i.alt, caption: i.caption, meta: labelFor(i.category) })),
    [visible, labelFor],
  )

  const hasImages = images.length > 0

  return (
    <section id="training" aria-labelledby="training-title" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Training Portfolio"
          id="training-title"
          title={
            <>
              Security awareness, <em className="text-gradient">in the room.</em>
            </>
          }
          intro="Real sessions, real learners: classroom, corporate and workshop training delivered across India and Europe."
        />

        {hasImages ? (
          <>
            <div role="group" aria-label="Filter training photos by category" className="mb-8 flex flex-wrap gap-2">
              {[{ id: 'all', label: 'All sessions' }, ...categories].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={filter === c.id}
                  onClick={() => setFilter(c.id)}
                  className={cn(
                    'rounded-full border px-4 py-2 text-sm transition',
                    filter === c.id
                      ? 'border-accent bg-accent/15 text-white'
                      : 'border-line text-fog-muted hover:border-accent/40 hover:text-white',
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <motion.ul layout className="grid auto-rows-[220px] grid-cols-2 gap-3 sm:auto-rows-[260px] sm:gap-4 lg:grid-cols-3 [grid-auto-flow:dense]">
              <AnimatePresence mode="popLayout">
                {visible.map((img, i) => (
                  <motion.li
                    key={img.src}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35 }}
                    className={cn('group relative overflow-hidden rounded-md border border-line bg-ink-800', i % 7 === 0 && 'col-span-2')}
                  >
                    <button
                      type="button"
                      onClick={() => setLightbox(i)}
                      aria-label={`Open photo: ${img.caption ?? img.alt}`}
                      className="absolute inset-0 block h-full w-full text-left"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(min-width:1024px) 380px, 50vw"
                        loading={i < 3 ? 'eager' : 'lazy'}
                        className="object-cover transition duration-700 ease-out group-hover:scale-[1.05]"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/45 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">{labelFor(img.category)}</span>
                        {img.caption && (
                          <p className="mt-1.5 line-clamp-2 text-sm text-fog opacity-90 transition group-hover:opacity-100">{img.caption}</p>
                        )}
                      </div>
                      <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-ink-950/60 text-white opacity-0 backdrop-blur transition group-hover:opacity-100 group-focus-visible:opacity-100">
                        <Expand size={15} aria-hidden />
                      </span>
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </>
        ) : (
          <Reveal>
            <div className="grid auto-rows-[200px] gap-4 sm:grid-cols-2 lg:grid-cols-4" role="list" aria-label="Photo placeholders">
              {placeholderCategories.map((c, i) => (
                <div
                  role="listitem"
                  key={c}
                  className={cn(
                    'flex flex-col items-center justify-center gap-3 rounded-md border border-dashed border-amber-400/40 bg-amber-400/[0.03] p-6 text-center',
                    i === 0 && 'lg:col-span-2 lg:row-span-2',
                  )}
                >
                  <ImagePlus className="shrink-0 text-amber-300/80" size={26} aria-hidden />
                  <span className="placeholder-tag">Placeholder</span>
                  <p className="font-display text-lg text-white">{c}</p>
                  <p className="max-w-[26ch] font-mono text-[11px] leading-relaxed text-fog-dim">
                    Add photos to public/training/{c.toLowerCase().replace(/[^a-z]+/g, '-').replace(/-$/, '')}/
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {/* Programmes delivered */}
        <div className="mt-20">
          <Reveal>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-fog-dim">Programmes delivered</h3>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trainingPrograms.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.06}>
                <article className="panel flex h-full flex-col p-6 transition duration-500 hover:-translate-y-1 hover:border-accent/40">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-accent">{p.institution}</p>
                  <h4 className="mt-3 font-display text-lg leading-snug text-white">{p.title}</h4>
                  <p className="mt-3 text-sm text-fog-muted">{p.audience}</p>
                  <div className="mt-auto flex items-end justify-between pt-6">
                    <p className="text-xs text-fog-dim">{p.duration}</p>
                    <p className="font-display text-lg text-white">
                      {p.learners}
                      <span className="ml-1 text-xs text-fog-dim">learners</span>
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <Lightbox items={items} index={lightbox} onClose={() => setLightbox(null)} onChange={setLightbox} />
    </section>
  )
}
