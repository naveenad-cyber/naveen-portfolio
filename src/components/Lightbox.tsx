'use client'

import { useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

export interface LightboxItem {
  src: string
  alt: string
  caption?: string
  meta?: string
}

export default function Lightbox({
  items,
  index,
  onClose,
  onChange,
}: {
  items: LightboxItem[]
  index: number | null
  onClose: () => void
  onChange: (i: number) => void
}) {
  const open = index !== null
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastFocus = useRef<HTMLElement | null>(null)

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return
      onChange((index + dir + items.length) % items.length)
    },
    [index, items.length, onChange],
  )

  useEffect(() => {
    if (!open) return
    lastFocus.current = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>('button')
        if (!focusables.length) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      lastFocus.current?.focus()
    }
  }, [open, onClose, go])

  const item = index !== null ? items[index] : null

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={item.alt}
          className="fixed inset-0 z-[100] flex flex-col bg-ink-950/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <div className="flex items-center justify-between px-5 py-4 text-sm text-fog-muted">
            <span className="font-mono text-xs tracking-widest">
              {String((index ?? 0) + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close preview"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-fog transition hover:border-accent/60 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          <div className="relative mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-4 sm:px-16" onClick={(e) => e.stopPropagation()}>
            {items.length > 1 && (
              <button
                onClick={() => go(-1)}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-ink-900/80 text-fog transition hover:border-accent/60 hover:text-white sm:left-4"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            <motion.div
              key={item.src}
              className="relative h-full w-full"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Image src={item.src} alt={item.alt} fill sizes="100vw" className="object-contain" priority />
            </motion.div>
            {items.length > 1 && (
              <button
                onClick={() => go(1)}
                aria-label="Next image"
                className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-ink-900/80 text-fog transition hover:border-accent/60 hover:text-white sm:right-4"
              >
                <ChevronRight size={20} />
              </button>
            )}
          </div>

          <div className="px-5 py-5 text-center" onClick={(e) => e.stopPropagation()}>
            {item.meta && <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{item.meta}</div>}
            {item.caption && <p className="mx-auto mt-2 max-w-2xl text-fog">{item.caption}</p>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
