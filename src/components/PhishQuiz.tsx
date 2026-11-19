'use client'

import { useState } from 'react'
import { AlertTriangle, CheckCircle2, MailWarning, RotateCcw, ShieldCheck } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { cn } from '@/lib/utils'

interface Mail {
  from: string
  addr: string
  subject: string
  body: string[]
  link?: string
  phish: boolean
  flags: string[]
  why: string
}

/** Fictional examples written for awareness demos. Not real organisations. */
const mails: Mail[] = [
  {
    from: 'IT Helpdesk',
    addr: 'it-support@c0mpany-helpdesk.com',
    subject: 'URGENT: your password expires in 2 hours',
    body: ['Your mailbox will be locked unless you confirm your password now.'],
    link: 'http://company-login.verify-now.top/reset',
    phish: true,
    flags: ['Look-alike sender domain (a zero instead of an “o”)', 'Artificial urgency', 'Link goes to an unrelated domain'],
    why: 'Real IT teams do not ask you to re-enter a password from an email link. Go to the official portal yourself, or report it.',
  },
  {
    from: 'HR Team',
    addr: 'hr@company.com',
    subject: 'Reminder: updated leave policy now on the intranet',
    body: ['The leave policy has been refreshed. You can read it on the intranet. No action is needed.'],
    phish: false,
    flags: ['Expected sender and domain', 'No credentials requested', 'No pressure or deadline'],
    why: 'Looks routine. If you are ever unsure, open the intranet directly rather than through the email.',
  },
  {
    from: 'CEO Office',
    addr: 'ceo.office.live@gmail.com',
    subject: 'Quick favour — keep this between us',
    body: ['I am in a meeting and cannot call. Please buy 5 gift cards and send me the codes today.'],
    phish: true,
    flags: ['Executive writing from a free webmail address', 'Secrecy and urgency', 'Gift cards are a classic social-engineering ask'],
    why: 'Impersonating leaders is a common social-engineering pattern. Verify through a known phone number or chat, never by replying.',
  },
  {
    from: 'Microsoft 365',
    addr: 'no-reply@microsoft.com',
    subject: 'New sign-in method added to your account',
    body: ['A security info method was added. If this was not you, open your account security page directly from your browser favourites.'],
    phish: false,
    flags: ['Notification only, with no link to click', 'Tells you to use your own bookmark', 'Matches an action you can check'],
    why: 'Safe pattern: no credentials asked and no suspicious link. Still, check the activity in your account yourself.',
  },
]

export default function PhishQuiz() {
  const [i, setI] = useState(0)
  const [answer, setAnswer] = useState<null | boolean>(null)
  const [score, setScore] = useState(0)
  const done = i >= mails.length
  const m = mails[Math.min(i, mails.length - 1)]

  const pick = (guessPhish: boolean) => {
    if (answer !== null) return
    setAnswer(guessPhish)
    if (guessPhish === m.phish) setScore((s) => s + 1)
  }
  const next = () => {
    setAnswer(null)
    setI((n) => n + 1)
  }
  const reset = () => {
    setI(0)
    setAnswer(null)
    setScore(0)
  }

  const correct = answer !== null && answer === m.phish

  return (
    <section id="demo" aria-labelledby="demo-title" className="section border-t border-line">
      <div className="container-x">
        <SectionHeading
          eyebrow="Live demo"
          id="demo-title"
          title={
            <>
              Phish or <em className="text-gradient">legit?</em>
            </>
          }
          intro="The kind of exercise I use in awareness sessions. Four fictional emails: decide, then see the red flags."
        />

        <Reveal>
          <div className="panel mx-auto max-w-3xl overflow-hidden !p-0">
            <div className="flex items-center justify-between border-b border-line bg-ink-800/80 px-5 py-3 font-mono text-[11px] uppercase tracking-wider text-fog-dim">
              <span className="flex items-center gap-2">
                <MailWarning size={14} className="text-accent" aria-hidden /> inbox.sim
              </span>
              <span aria-live="polite">{done ? 'complete' : `email ${i + 1} / ${mails.length}`}</span>
            </div>

            {!done ? (
              <div className="p-6 sm:p-8">
                <div className="rounded border border-line bg-ink-900/70 p-5">
                  <p className="font-mono text-xs text-fog-dim">
                    From: <span className="text-fog">{m.from}</span> &lt;{m.addr}&gt;
                  </p>
                  <p className="mt-1 font-mono text-xs text-fog-dim">
                    Subject: <span className="font-semibold text-white">{m.subject}</span>
                  </p>
                  <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-fog-muted">
                    {m.body.map((b) => (
                      <p key={b}>{b}</p>
                    ))}
                    {m.link && <p className="break-all font-mono text-sm text-accent underline decoration-dotted">{m.link}</p>}
                  </div>
                </div>

                {answer === null ? (
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button type="button" onClick={() => pick(true)} className="btn-ghost !border-red-400/50 !text-red-300 hover:!bg-red-500/10">
                      <AlertTriangle size={15} aria-hidden /> Phishing
                    </button>
                    <button type="button" onClick={() => pick(false)} className="btn-primary">
                      <ShieldCheck size={15} aria-hidden /> Legitimate
                    </button>
                  </div>
                ) : (
                  <div role="status" className={cn('mt-6 rounded border p-5', correct ? 'border-accent/50 bg-accent/5' : 'border-red-400/40 bg-red-500/5')}>
                    <p className={cn('flex items-center gap-2 font-mono text-sm font-semibold', correct ? 'text-accent' : 'text-red-300')}>
                      {correct ? <CheckCircle2 size={16} aria-hidden /> : <AlertTriangle size={16} aria-hidden />}
                      {correct ? 'Correct' : 'Not quite'}: this one is {m.phish ? 'PHISHING' : 'LEGITIMATE'}.
                    </p>
                    <ul className="mt-3 space-y-1.5 font-mono text-[12.5px] text-fog">
                      {m.flags.map((f) => (
                        <li key={f}>
                          {m.phish ? '⚑' : '✓'} {f}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-[15px] leading-relaxed text-fog-muted">{m.why}</p>
                    <button type="button" onClick={next} className="btn-primary mt-5">
                      {i === mails.length - 1 ? 'See my score' : 'Next email'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center sm:p-12" role="status">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-fog-dim">result</p>
                <p className="mt-3 font-display text-5xl font-bold text-accent">
                  {score}/{mails.length}
                </p>
                <p className="mx-auto mt-4 max-w-md text-fog-muted">
                  {score === mails.length
                    ? 'Sharp eyes. The next step is making reporting suspicious emails an everyday habit.'
                    : 'Good effort. Attackers rely on urgency and familiarity, which is why practice beats a one-off policy slide.'}
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <button type="button" onClick={reset} className="btn-ghost">
                    <RotateCcw size={14} aria-hidden /> Try again
                  </button>
                  <a href="#contact" className="btn-primary">
                    Bring this to your team
                  </a>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
