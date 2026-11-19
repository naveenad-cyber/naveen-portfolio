'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { profile } from '@/data/profile'
import { skillGroups } from '@/data/skills'
import { certifications } from '@/data/certifications'
import { currentRole, previousRoles } from '@/data/experience'
import { trainingPrograms } from '@/data/training'

type Tone = 'dim' | 'ok' | 'warn' | 'cmd' | undefined
interface Line {
  t: string
  tone?: Tone
}

const PROMPT = 'naveen@sec:~$'
const out = (...lines: Array<string | [string, Tone]>): Line[] =>
  lines.map((l) => (Array.isArray(l) ? { t: l[0], tone: l[1] } : { t: l }))

const commands: Record<string, () => Line[]> = {
  help: () =>
    out(
      ['available commands:', 'dim'],
      '  whoami        who am I',
      '  mission       what I do',
      '  experience    roles, newest first',
      '  training      programmes delivered',
      '  skills        expertise areas',
      '  certs         credentials',
      '  stats         the numbers',
      '  contact       how to reach me',
      '  linkedin      open my LinkedIn',
      '  clear         clear the screen',
    ),
  whoami: () =>
    out(
      [`${profile.name.toLowerCase().replace(/ /g, '_')}`, 'ok'],
      `role     : ${profile.designation}`,
      `company  : ${profile.company}`,
      `focus    : ${profile.positioning.join(' · ')}`,
      `location : ${profile.location}`,
    ),
  mission: () => out(`"${profile.statement}"`),
  stats: () =>
    out(
      ['training_hours   720+', 'ok'],
      ['learners_trained 400+', 'ok'],
      ['regions          India, Europe', 'ok'],
      ['cert_pass_rates  85–90%+ (reported across batches)', 'dim'],
    ),
  experience: () => [
    { t: `* ${currentRole.company} — ${currentRole.role} [current]`, tone: 'ok' as Tone },
    ...previousRoles.map((r) => ({ t: `- ${r.company} — ${r.role} (${r.period.trim().replace(/–\s*$/, '–')})` })),
  ],
  training: () => trainingPrograms.map((p) => ({ t: `- ${p.institution}: ${p.title} · ${p.learners} learners` })),
  skills: () => skillGroups.map((g) => ({ t: `[+] ${g.title}` })),
  certs: () =>
    certifications.map((c) => ({
      t: `[${c.reviewNote ? '?' : '✓'}] ${c.name} — ${c.issuer}`,
      tone: (c.reviewNote ? 'warn' : 'ok') as Tone,
    })),
  contact: () =>
    out(`email    : ${profile.email}`, `linkedin : ${profile.linkedin.replace('https://www.', '')}`, ['tip: scroll to #contact for the enquiry form', 'dim']),
}

const aliases: Record<string, string> = { ls: 'help', '?': 'help', about: 'whoami', id: 'whoami', ping: 'contact', cert: 'certs', skill: 'skills' }

export default function Terminal({ size = 'compact' }: { size?: 'compact' | 'full' }) {
  const inputId = useId()
  const full = size === 'full'
  const [lines, setLines] = useState<Line[]>([])
  const [typing, setTyping] = useState('')
  const [value, setValue] = useState('')
  const [booted, setBooted] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const history = useRef<string[]>([])
  const histIdx = useRef(-1)
  const cancelled = useRef(false)

  const run = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return
    const echo: Line = { t: `${PROMPT} ${raw.trim()}`, tone: 'cmd' }
    if (cmd === 'clear') return setLines([])
    if (cmd === 'linkedin') {
      window.open(profile.linkedin, '_blank', 'noopener,noreferrer')
      return setLines((l) => [...l, echo, { t: 'opening linkedin…', tone: 'dim' }])
    }
    const key = aliases[cmd] ?? cmd
    let result: Line[]
    if (commands[key]) result = commands[key]()
    else if (cmd.startsWith('sudo')) result = out(['naveen is not in the sudoers file. This incident will be reported. 😉', 'warn'])
    else if (cmd === 'rm -rf /' || cmd.startsWith('rm ')) result = out(['permission denied. Backups exist, and so does MFA.', 'warn'])
    else result = out([`command not found: ${cmd}. type 'help'`, 'warn'])
    setLines((l) => [...l, echo, ...result])
  }, [])

  // boot sequence: types two commands, then hands over to the visitor
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timers: ReturnType<typeof setTimeout>[] = []
    const script = full ? ['whoami', 'mission', 'help'] : ['whoami']
    if (reduce) {
      script.forEach((c) => run(c))
      setBooted(true)
      return
    }
    let delay = 500
    script.forEach((cmd) => {
      ;[...cmd].forEach((_, i) => {
        timers.push(
          setTimeout(() => {
            if (!cancelled.current) setTyping(cmd.slice(0, i + 1))
          }, delay + i * 70),
        )
      })
      delay += cmd.length * 70 + 250
      timers.push(
        setTimeout(() => {
          if (cancelled.current) return
          setTyping('')
          run(cmd)
        }, delay),
      )
      delay += 650
    })
    timers.push(setTimeout(() => !cancelled.current && setBooted(true), delay))
    return () => {
      timers.forEach(clearTimeout)
    }
  }, [run, full])

  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines, typing])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    cancelled.current = true
    setTyping('')
    setBooted(true)
    if (value.trim()) {
      history.current.push(value)
      histIdx.current = history.current.length
    }
    run(value)
    setValue('')
  }

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const h = history.current
    if (e.key === 'ArrowUp' && h.length) {
      e.preventDefault()
      histIdx.current = Math.max(0, histIdx.current - 1)
      setValue(h[histIdx.current] ?? '')
    } else if (e.key === 'ArrowDown' && h.length) {
      e.preventDefault()
      histIdx.current = Math.min(h.length, histIdx.current + 1)
      setValue(h[histIdx.current] ?? '')
    }
  }

  const tone = (t: Tone) =>
    t === 'ok' ? 'text-accent' : t === 'warn' ? 'text-amber-300' : t === 'dim' ? 'text-fog-dim' : t === 'cmd' ? 'text-white' : 'text-fog'

  return (
    <div className="overflow-hidden rounded-md border border-accent/30 bg-ink-950/90 shadow-[0_0_60px_-20px_rgba(0,255,156,0.45)]">
      <div className="flex items-center justify-between border-b border-line bg-ink-800/80 px-4 py-2">
        <div className="flex items-center gap-2" aria-hidden>
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        </div>
        <span className="font-mono text-[11px] text-fog-dim">naveen@sec: ~ — interactive</span>
        <span className="font-mono text-[11px] text-accent">● live</span>
      </div>

      <div
        ref={bodyRef}
        role="log"
        aria-label="Interactive terminal output"
        className={`overflow-y-auto font-mono ${full ? 'h-[230px] px-4 py-3 text-[12.5px] leading-[1.65] sm:h-[270px] sm:px-5 sm:text-[13px]' : 'h-[132px] px-3.5 py-2.5 text-[11.5px] leading-[1.6]'}`}
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((l, i) => (
          <div key={i} className={`whitespace-pre-wrap break-words ${tone(l.tone)}`}>
            {l.t}
          </div>
        ))}
        {!booted && (
          <div className="text-white">
            {PROMPT} {typing}
            <span className="ml-0.5 inline-block h-[14px] w-[7px] translate-y-[2px] animate-blink bg-accent" />
          </div>
        )}
      </div>

      <form onSubmit={submit} className="flex items-center gap-2 border-t border-line px-3.5 py-2 font-mono text-[11.5px]">
        <label htmlFor={inputId} className="shrink-0 text-accent">
          {PROMPT}
        </label>
        <input
          id={inputId}
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKey}
          onFocus={() => {
            cancelled.current = true
            setTyping('')
            setBooted(true)
          }}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          placeholder="type a command…"
          className="min-w-0 flex-1 bg-transparent text-white caret-[#00ff9c] placeholder:text-fog-dim focus:outline-none"
        />
      </form>

      <div className="flex flex-wrap gap-1.5 border-t border-line px-3 py-2" aria-label="Quick commands">
        {(full ? ['help', 'whoami', 'experience', 'skills', 'certs', 'contact', 'clear'] : ['help', 'skills', 'certs', 'contact']).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => {
              cancelled.current = true
              setTyping('')
              setBooted(true)
              run(c)
            }}
            className="rounded-sm border border-line px-2 py-1 font-mono text-[11px] text-fog-muted transition hover:border-accent/60 hover:text-accent"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  )
}
