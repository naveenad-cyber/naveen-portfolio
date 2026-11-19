'use client'

import { useEffect, useRef } from 'react'

const GLYPHS = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓ01{}[]<>/\\$#%&=+*'

/** Quiet "digital rain" backdrop. Pauses when off-screen / tab hidden; static when reduced motion is requested. */
export default function MatrixRain({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const size = 16
    let cols = 0
    let drops: number[] = []
    let w = 0
    let h = 0
    let raf = 0
    let last = 0
    let visible = true

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(w / size)
      drops = Array.from({ length: cols }, () => Math.random() * -50)
      ctx.fillStyle = '#030806'
      ctx.fillRect(0, 0, w, h)
    }

    const draw = (t: number) => {
      raf = requestAnimationFrame(draw)
      if (!visible || document.hidden || t - last < 55) return
      last = t
      ctx.fillStyle = 'rgba(3, 8, 6, 0.14)'
      ctx.fillRect(0, 0, w, h)
      ctx.font = `${size}px var(--font-mono), monospace`
      for (let i = 0; i < cols; i++) {
        const ch = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        const y = drops[i] * size
        ctx.fillStyle = Math.random() > 0.975 ? '#d6ffe9' : '#00ff9c'
        ctx.fillText(ch, i * size, y)
        if (y > h && Math.random() > 0.975) drops[i] = 0
        drops[i] += 1
      }
    }

    resize()
    if (reduce) {
      // one static frame of glyphs
      for (let k = 0; k < 40; k++) draw(1000 * k + 100)
      cancelAnimationFrame(raf)
    } else {
      raf = requestAnimationFrame(draw)
    }

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(canvas)
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} aria-hidden className={className} />
}
