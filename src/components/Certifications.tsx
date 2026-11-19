'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Award, ExternalLink, Expand } from 'lucide-react'
import Lightbox from './Lightbox'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { certifications } from '@/data/certifications'
import { profile } from '@/data/profile'

export default function Certifications({ images }: { images: Record<string, string> }) {
  const [lightbox, setLightbox] = useState<number | null>(null)

  const withImages = certifications.filter((c) => images[c.id])
  const lightboxItems = withImages.map((c) => ({
    src: images[c.id],
    alt: `${c.name} certificate`,
    caption: `${c.name} · ${c.issuer}`,
    meta: 'Certificate',
  }))

  return (
    <section id="certifications" aria-labelledby="cert-title" className="section border-t border-line bg-ink-900/40">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Certifications"
            id="cert-title"
            title={
              <>
                Credentials that <em className="text-gradient">back the work.</em>
              </>
            }
          />
          <a href={profile.credly} target="_blank" rel="noopener noreferrer" className="btn-ghost mb-14">
            Verify on Credly <ExternalLink size={14} aria-hidden />
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {certifications.map((c, i) => {
            const img = images[c.id]
            const imgIndex = withImages.findIndex((w) => w.id === c.id)
            return (
              <Reveal key={c.id} delay={(i % 3) * 0.07} className="w-full sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]">
                <article className="panel group flex h-full flex-col overflow-hidden transition duration-500 hover:-translate-y-1 hover:border-accent/40">
                  {img ? (
                    <button
                      type="button"
                      onClick={() => setLightbox(imgIndex)}
                      aria-label={`View ${c.name} certificate`}
                      className="relative block aspect-[16/10] w-full overflow-hidden border-b border-line bg-ink-900"
                    >
                      <Image src={img} alt={`${c.name} certificate`} fill sizes="(min-width:1024px) 380px, 90vw" loading="lazy" className="object-cover transition duration-700 group-hover:scale-[1.04]" />
                      <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-ink-950/70 text-white opacity-0 backdrop-blur transition group-hover:opacity-100 group-focus-visible:opacity-100">
                        <Expand size={15} aria-hidden />
                      </span>
                    </button>
                  ) : (
                    <div className="relative flex items-center justify-center border-b border-line bg-gradient-to-br from-ink-700/70 to-ink-900 py-8">
                      {c.logo ? (
                        <span className="relative block h-32 w-32 overflow-hidden rounded-2xl bg-white shadow-[0_0_40px_-10px_rgba(0,255,156,0.45)] ring-1 ring-accent/30 transition duration-500 group-hover:scale-105">
                          <Image
                            src={c.logo}
                            alt={`${c.name} logo`}
                            fill
                            sizes="128px"
                            className={c.logoFit === 'cover' ? 'object-cover' : 'object-contain p-1.5'}
                          />
                        </span>
                      ) : (
                        <span className="font-display text-3xl text-accent/90">{c.shortName}</span>
                      )}
                      <Award aria-hidden className="absolute right-4 top-4 text-accent/40" size={20} />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{c.issuer}</p>
                    <h3 className="mt-2 font-display text-lg leading-snug text-white">{c.name}</h3>
                    <p className="mt-3 flex-1 text-[15px] leading-relaxed text-fog-muted">{c.description}</p>
                    <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-fog-dim">
                      {c.issued && <span>Issued {c.issued}</span>}
                      {c.expires && <span>Valid to {c.expires}</span>}
                      {c.reviewNote && <span className="placeholder-tag">{c.reviewNote}</span>}
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>

      <Lightbox items={lightboxItems} index={lightbox} onClose={() => setLightbox(null)} onChange={setLightbox} />
    </section>
  )
}
