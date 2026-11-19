'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDownRight, Award, Linkedin, Mail, MapPin, ShieldCheck } from 'lucide-react'
import { profile } from '@/data/profile'
import CountUp from './CountUp'
import MatrixRain from './MatrixRain'

const ease = [0.22, 1, 0.36, 1] as const

export default function Hero() {
  const reduce = useReducedMotion()
  const fade = (delay: number, y = 16) => ({
    initial: reduce ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease },
  })

  return (
    <section id="top" className="relative isolate overflow-hidden pt-[72px]">
      {/* digital rain, kept dim so text stays readable */}
      <MatrixRain className="absolute inset-0 -z-20 h-full w-full opacity-[0.22]" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(900px 520px at 80% 10%, rgba(0,179,107,0.16), transparent 62%), linear-gradient(to bottom, rgba(3,8,6,0.55), #030806 96%)',
        }}
      />
      <div aria-hidden className="hairline-grid absolute inset-0 -z-10 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />

      <div className="container-x grid min-h-[calc(100svh-72px)] items-center gap-12 py-14 lg:grid-cols-[1fr_1fr] lg:py-20">
        {/* copy */}
        <div>
          <motion.p {...fade(0.05)} className="inline-flex items-center gap-2 rounded-sm border border-accent/30 bg-accent/5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-accent" />
            access granted · {profile.company}
          </motion.p>

          <motion.h1 {...fade(0.12, 24)} className="mt-7 font-display font-bold leading-[1.02] tracking-[-0.05em] text-white">
            <span className="mb-3 block font-mono text-sm font-normal tracking-[0.2em] text-fog-dim">&gt; whoami</span>
            <span data-text={profile.name} className="glitch block text-[3rem] sm:text-7xl lg:text-[5.4rem]">
              {profile.name}
            </span>
            <span className="mt-4 block text-[1.15rem] font-medium leading-snug tracking-tight text-gradient sm:text-2xl lg:text-[1.45rem]">
              {profile.designation}
              <span aria-hidden className="ml-1 inline-block h-[1em] w-[0.5em] translate-y-[0.12em] animate-blink bg-accent" />
            </span>
          </motion.h1>

          <motion.p {...fade(0.25)} className="mt-7 max-w-xl text-lg leading-relaxed text-fog-muted">
            {profile.statement}
          </motion.p>

          <motion.div {...fade(0.35)} className="mt-9 flex flex-wrap gap-3">
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <Linkedin size={16} aria-hidden /> Connect on LinkedIn
            </a>
            <a href="#contact" className="btn-ghost">
              <Mail size={16} aria-hidden /> Contact me
            </a>
          </motion.div>

          <motion.dl {...fade(0.5, 0)} className="mt-12 grid max-w-2xl grid-cols-3 gap-5 border-t border-line pt-7">
            {profile.metrics.map((m) => (
              <div key={m.label}>
                <dt className="sr-only">{m.label}</dt>
                <dd className={`font-display font-bold text-accent ${m.value !== undefined ? 'text-2xl sm:text-4xl' : 'text-base sm:text-xl'}`}>
                  {m.value !== undefined ? <CountUp to={m.value} suffix={m.suffix} /> : m.text}
                </dd>
                <p aria-hidden className="mt-1.5 font-mono text-[10.5px] uppercase leading-snug tracking-wider text-fog-dim">
                  {m.label}
                </p>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* portrait: chamfered HUD card */}
        <motion.div {...fade(0.3, 30)} className="relative mx-auto w-full max-w-[420px] pb-6 pr-4 sm:max-w-[460px] lg:justify-self-end">
          <div
            aria-hidden
            className="absolute -inset-8 -z-10 blur-3xl"
            style={{ background: 'radial-gradient(closest-side, rgba(0,255,156,0.30), transparent 70%)' }}
          />

          <div className="relative">
            {/* offset depth plate */}
            <div
              aria-hidden
              className="absolute inset-0 translate-x-4 translate-y-4 bg-gradient-to-br from-accent/30 to-accent/0 [clip-path:polygon(0_0,calc(100%-44px)_0,100%_44px,100%_100%,44px_100%,0_calc(100%-44px))]"
            />
            {/* photo */}
            <div className="relative aspect-[4/5] overflow-hidden bg-accent-deep/30 [clip-path:polygon(0_0,calc(100%-44px)_0,100%_44px,100%_100%,44px_100%,0_calc(100%-44px))]">
              <Image
                src={profile.photo}
                alt={`Portrait of ${profile.name}`}
                fill
                priority
                sizes="(min-width:1024px) 460px, 90vw"
                className="object-cover object-[50%_18%]"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/10 to-transparent" />
              <div aria-hidden className="absolute inset-x-0 top-0 h-1/4 animate-scan bg-gradient-to-b from-transparent via-accent/15 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{profile.company}</p>
                <p className="mt-1 font-display text-lg font-semibold leading-tight text-white sm:text-xl">{profile.name}</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-fog-muted">
                  <MapPin size={12} aria-hidden className="text-accent" /> {profile.location}
                </p>
              </div>
            </div>
            {/* HUD corner marks */}
            <span aria-hidden className="absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-accent" />
            <span aria-hidden className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-accent" />
          </div>

          {/* floating credential chips */}
          <div className="absolute -left-1 top-[14%] flex animate-float items-center gap-2 rounded-md border border-accent/30 bg-ink-900/80 px-3 py-2 backdrop-blur-md sm:-left-6">
            <ShieldCheck size={16} aria-hidden className="text-accent" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-white">ISO 27001 LA</span>
          </div>
          <div className="absolute -right-0 bottom-[22%] flex animate-float-delayed items-center gap-2 rounded-md border border-accent/30 bg-ink-900/80 px-3 py-2 backdrop-blur-md sm:-right-4">
            <Award size={16} aria-hidden className="text-accent" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-white">Security+ · CySA+ · CEH</span>
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-fog-dim transition hover:text-accent xl:flex"
      >
        scroll <ArrowDownRight size={12} />
      </a>
    </section>
  )
}
