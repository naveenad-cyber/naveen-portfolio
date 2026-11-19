'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Check, CheckCircle2, Copy, Github, Instagram, Linkedin, MessageCircle, Send } from 'lucide-react'
import Reveal from './Reveal'
import { profile } from '@/data/profile'
import { cn } from '@/lib/utils'

const enquiryTypes = [
  'Corporate awareness programme',
  'Training or workshop',
  'Security culture consulting',
  'Speaking or collaboration',
  'Something else',
]

const socials = [
  { icon: Linkedin, label: 'LinkedIn', href: profile.linkedin },
  { icon: BookOpen, label: 'Medium', href: profile.medium },
  { icon: Github, label: 'GitHub', href: profile.github },
  { icon: Instagram, label: 'Instagram', href: profile.instagram },
  { icon: MessageCircle, label: 'WhatsApp', href: profile.whatsapp },
]

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function Contact() {
  const [type, setType] = useState(enquiryTypes[0])
  const [status, setStatus] = useState<Status>('idle')
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable — the mailto link still works */
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    if (data.get('_gotcha')) return // honeypot
    setStatus('sending')
    try {
      const res = await fetch(profile.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          organisation: data.get('organisation'),
          enquiry_type: type,
          message: data.get('message'),
        }),
      })
      if (res.ok) {
        setStatus('sent')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const field =
    'w-full rounded border border-line bg-ink-900/70 px-4 py-3 text-[15px] text-white placeholder:text-fog-dim transition focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20'

  return (
    <section id="contact" aria-labelledby="contact-title" className="section relative overflow-hidden border-t border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(0,179,107,0.18), transparent 65%)' }}
      />
      <div className="container-x relative">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr]">
          <Reveal>
            <span className="eyebrow">Contact</span>
            <h2 id="contact-title" className="h-display mt-5 text-3xl sm:text-5xl">
              Let&apos;s build a stronger <em className="text-gradient">security culture.</em>
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-fog-muted">
              Open to awareness programme design, corporate security training, workshops and consulting conversations with
              organisations in India and internationally.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <Linkedin size={16} aria-hidden /> Message on LinkedIn
              </a>
              <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                View resume
              </a>
            </div>

            <div className="mt-10 rounded-md border border-line bg-ink-800/50 p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fog-dim">Email</p>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                <a href={`mailto:${profile.email}`} className="break-all text-lg text-white transition hover:text-accent">
                  {profile.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-xs text-fog-muted transition hover:border-accent/50 hover:text-white"
                >
                  {copied ? <Check size={13} aria-hidden /> : <Copy size={13} aria-hidden />}
                  <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="mt-3 text-sm text-fog-dim">{profile.location}</p>
            </div>

            <ul className="mt-6 flex flex-wrap gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="chip gap-2 py-2 transition hover:border-accent/50 hover:text-white"
                  >
                    <s.icon size={14} aria-hidden /> {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="panel p-7 sm:p-9">
              <AnimatePresence mode="wait">
                {status === 'sent' ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    role="status"
                    className="flex min-h-[420px] flex-col items-center justify-center text-center"
                  >
                    <CheckCircle2 size={44} className="text-accent" aria-hidden />
                    <h3 className="mt-5 font-display text-lg text-white">Message sent</h3>
                    <p className="mt-3 max-w-sm text-fog-muted">Thank you for reaching out. I will reply to your email as soon as I can.</p>
                    <button type="button" onClick={() => setStatus('idle')} className="btn-ghost mt-7">
                      Send another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} aria-label="Professional enquiry">
                    <h3 className="font-display text-lg text-white">Professional enquiry</h3>

                    <fieldset className="mt-6">
                      <legend className="mb-3 text-sm text-fog-muted">What is this about?</legend>
                      <div className="flex flex-wrap gap-2">
                        {enquiryTypes.map((t) => (
                          <button
                            key={t}
                            type="button"
                            aria-pressed={type === t}
                            onClick={() => setType(t)}
                            className={cn(
                              'rounded-full border px-3.5 py-1.5 text-sm transition',
                              type === t
                                ? 'border-accent bg-accent/15 text-white'
                                : 'border-line text-fog-muted hover:border-accent/40 hover:text-white',
                            )}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </fieldset>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-1.5 block text-sm text-fog-muted">Name</span>
                        <input name="name" required autoComplete="name" className={field} placeholder="Your name" />
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-sm text-fog-muted">Work email</span>
                        <input name="email" type="email" required autoComplete="email" className={field} placeholder="you@company.com" />
                      </label>
                    </div>
                    <label className="mt-4 block">
                      <span className="mb-1.5 block text-sm text-fog-muted">Organisation</span>
                      <input name="organisation" autoComplete="organization" className={field} placeholder="Company or institution" />
                    </label>
                    <label className="mt-4 block">
                      <span className="mb-1.5 block text-sm text-fog-muted">How can I help?</span>
                      <textarea name="message" required rows={5} className={cn(field, 'resize-none')} placeholder="A few lines about your goals, audience and timeline." />
                    </label>

                    {/* Honeypot — hidden from people, catches bots */}
                    <div aria-hidden className="absolute -left-[9999px]">
                      <label>
                        Leave empty <input name="_gotcha" tabIndex={-1} autoComplete="off" />
                      </label>
                    </div>

                    <button type="submit" disabled={status === 'sending'} className="btn-primary mt-7 w-full disabled:opacity-60">
                      {status === 'sending' ? (
                        'Sending…'
                      ) : (
                        <>
                          <Send size={15} aria-hidden /> Send enquiry
                        </>
                      )}
                    </button>
                    <p aria-live="polite" className="mt-4 min-h-[1.25rem] text-sm text-red-300">
                      {status === 'error' && (
                        <>
                          Something went wrong. Please email me directly at{' '}
                          <a className="underline" href={`mailto:${profile.email}`}>
                            {profile.email}
                          </a>
                          .
                        </>
                      )}
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
