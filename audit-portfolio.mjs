#!/usr/bin/env node
/**
 * Portfolio auditor (no dependencies, needs Node 18+).
 *
 *   node audit-portfolio.mjs https://naveenad-portfolio.vercel.app
 *   node audit-portfolio.mjs https://naveenad-portfolio.vercel.app --psi      (adds Google PageSpeed scores)
 *   node audit-portfolio.mjs http://localhost:3000                            (audit your local build)
 *
 * It checks SEO, structured data, social previews, accessibility basics, performance hints,
 * security headers, links, images and leftover placeholders, then prints suggestions and
 * writes audit-report.md next to the script.
 */
import { writeFileSync } from 'node:fs'

const args = process.argv.slice(2)
const base = (args.find((a) => /^https?:\/\//.test(a)) || 'https://naveenad-portfolio.vercel.app').replace(/\/$/, '')
const usePsi = args.includes('--psi')
const isLocal = /localhost|127\.0\.0\.1/.test(base)

const results = [] // {area, level: pass|warn|fail|info, msg, fix}
const add = (area, level, msg, fix) => results.push({ area, level, msg, fix })
const ok = (a, m) => add(a, 'pass', m)
const warn = (a, m, f) => add(a, 'warn', m, f)
const fail = (a, m, f) => add(a, 'fail', m, f)
const info = (a, m) => add(a, 'info', m)

const UA = { 'user-agent': 'PortfolioAudit/1.0' }
async function get(url, opts = {}) {
  const t = Date.now()
  try {
    const res = await fetch(url, { redirect: 'follow', headers: UA, signal: AbortSignal.timeout(20000), ...opts })
    return { res, ms: Date.now() - t }
  } catch (e) {
    return { err: e, ms: Date.now() - t }
  }
}
async function status(url) {
  let r = await get(url, { method: 'HEAD' })
  if (r.err || r.res.status === 405 || r.res.status === 403) r = await get(url)
  return r.err ? 0 : r.res.status
}
const abs = (u, from = base + '/') => {
  try {
    return new URL(u, from).href
  } catch {
    return null
  }
}
const attr = (tag, name) => {
  const m = tag.match(new RegExp(`${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, 'i'))
  return m ? (m[2] ?? m[3]) : undefined
}
const decode = (s = '') =>
  s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
const strip = (h) =>
  decode(
    h
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
  ).trim()

// ---------------------------------------------------------------- fetch home page
console.log(`\nAuditing ${base} ...\n`)
const home = await get(base + '/')
if (home.err || !home.res.ok) {
  console.error(`Could not load ${base}/ (${home.err?.message || home.res.status}). Check the address and try again.`)
  process.exit(1)
}
const html = await home.res.text()
const headers = home.res.headers
const text = strip(html)

// ---------------------------------------------------------------- 1. basics & performance
{
  const A = 'Basics'
  base.startsWith('https://') || isLocal ? ok(A, 'Served over HTTPS') : fail(A, 'Site is not served over HTTPS', 'Use the https:// address everywhere.')
  home.res.url.replace(/\/$/, '') === base ? ok(A, 'No unexpected redirects') : info(A, `Redirects to ${home.res.url}`)
  const kb = Buffer.byteLength(html) / 1024
  kb < 200 ? ok(A, `HTML size ${kb.toFixed(0)} KB`) : warn(A, `HTML is ${kb.toFixed(0)} KB`, 'Large HTML slows first paint. Move big inline data out of the page.')
  home.ms < 1500 ? ok(A, `Home page responded in ${home.ms} ms`) : warn(A, `Home page took ${home.ms} ms to respond`, 'Check Vercel region/cold start; re-test a second time since the first hit can be cold.')
  const enc = headers.get('content-encoding')
  enc ? ok(A, `Compression enabled (${enc})`) : warn(A, 'No compression header seen', 'Vercel normally enables gzip/brotli automatically.')
  const lang = attr((html.match(/<html[^>]*>/i) || [''])[0], 'lang')
  lang ? ok(A, `<html lang="${lang}"> is set`) : fail(A, 'Missing lang attribute on <html>', 'Add lang="en" in layout.tsx.')
  ;/<meta[^>]+name=["']viewport["']/i.test(html) ? ok(A, 'Viewport meta tag present') : fail(A, 'Missing viewport meta tag', 'Required for mobile.')
  const cache = headers.get('cache-control')
  info(A, `Cache-Control on home page: ${cache || 'none'}`)
}

// ---------------------------------------------------------------- 2. SEO
let title, desc, canonical
{
  const A = 'SEO'
  title = decode((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '').trim()
  if (!title) fail(A, 'No <title>', 'Add a title in layout.tsx metadata.')
  else if (title.length < 30) warn(A, `Title is short (${title.length} chars): "${title}"`, 'Aim for 40-60 characters with your name and role.')
  else if (title.length > 65) warn(A, `Title is long (${title.length} chars) and may be cut in Google: "${title}"`, 'Keep it under about 60 characters.')
  else ok(A, `Title length is good (${title.length}): "${title}"`)

  const metas = [...html.matchAll(/<meta\b[^>]*>/gi)].map((m) => m[0])
  const meta = (key, val = 'name') => {
    const t = metas.find((m) => (attr(m, val) || '').toLowerCase() === key)
    return t ? decode(attr(t, 'content') || '') : undefined
  }
  desc = meta('description')
  if (!desc) fail(A, 'No meta description', 'Add a 120-160 character description.')
  else if (desc.length < 70) warn(A, `Meta description is short (${desc.length} chars)`, 'Aim for 120-160 characters.')
  else if (desc.length > 170) warn(A, `Meta description is long (${desc.length} chars) and will be truncated`, 'Trim to about 160 characters; put the key message first.')
  else ok(A, `Meta description length is good (${desc.length})`)

  const link = [...html.matchAll(/<link\b[^>]*>/gi)].map((m) => m[0]).find((l) => (attr(l, 'rel') || '').toLowerCase() === 'canonical')
  canonical = link ? attr(link, 'href') : undefined
  if (!canonical) fail(A, 'No canonical link', 'Set alternates.canonical in layout.tsx.')
  else if (!isLocal && !canonical.startsWith(base)) fail(A, `Canonical points elsewhere: ${canonical}`, 'Set NEXT_PUBLIC_SITE_URL in Vercel to your live address and redeploy.')
  else if (/localhost/.test(canonical) && !isLocal) fail(A, `Canonical contains localhost: ${canonical}`, 'Set NEXT_PUBLIC_SITE_URL in Vercel and redeploy.')
  else ok(A, `Canonical is set: ${canonical}`)

  const robotsMeta = meta('robots')
  robotsMeta && /noindex/i.test(robotsMeta) ? fail(A, 'Page has noindex, Google will not list it', 'Remove noindex from metadata.robots.') : ok(A, 'Page is indexable (no noindex)')
  headers.get('x-robots-tag') && /noindex/i.test(headers.get('x-robots-tag')) && fail(A, 'X-Robots-Tag: noindex header present', 'Remove it from vercel.json / next.config.')

  const h1 = [...html.matchAll(/<h1\b[\s\S]*?<\/h1>/gi)]
  h1.length === 1 ? ok(A, 'Exactly one <h1>') : h1.length === 0 ? fail(A, 'No <h1> found', 'Add one h1 (your name/role).') : warn(A, `${h1.length} <h1> tags found`, 'Use a single h1 and h2s for sections.')
  const levels = [...html.matchAll(/<h([1-6])\b/gi)].map((m) => +m[1])
  let jumps = 0
  levels.forEach((l, i) => i && l - levels[i - 1] > 1 && jumps++)
  jumps ? warn(A, `Heading order skips levels ${jumps} time(s)`, 'Do not jump from h2 to h4; it helps screen readers and SEO.') : ok(A, 'Heading order is sequential')
  const words = text.split(/\s+/).length
  words >= 300 ? ok(A, `About ${words} words of crawlable text`) : warn(A, `Only about ${words} words of crawlable text`, 'Add more real written content (about, experience details).')
  info(A, `Nav/section keywords found: ${['cybersecurity', 'awareness', 'ISO 27001', 'GRC', 'phishing', 'training'].filter((k) => new RegExp(k, 'i').test(text)).join(', ')}`)

  // Open Graph / Twitter
  const og = {}
  for (const k of ['og:title', 'og:description', 'og:image', 'og:url', 'og:type']) og[k] = meta(k, 'property')
  const missing = Object.entries(og).filter(([, v]) => !v).map(([k]) => k)
  missing.length ? fail('Social', `Missing Open Graph tags: ${missing.join(', ')}`, 'Add them in layout.tsx openGraph.') : ok('Social', 'Open Graph title, description, image, url and type present')
  const tw = meta('twitter:card')
  tw ? ok('Social', `Twitter card: ${tw}`) : warn('Social', 'No twitter:card tag', 'Add twitter: { card: "summary_large_image" }.')
  if (og['og:image']) {
    const r = await get(abs(og['og:image']), { method: 'GET' })
    if (r.err || !r.res.ok) fail('Social', `og:image does not load (${r.err?.message || r.res.status}): ${og['og:image']}`, 'Check opengraph-image.tsx and the site URL.')
    else {
      const type = r.res.headers.get('content-type') || ''
      const size = (await r.res.arrayBuffer()).byteLength / 1024
      type.startsWith('image/') ? ok('Social', `og:image loads (${type}, ${size.toFixed(0)} KB)`) : fail('Social', `og:image is not an image (${type})`)
      size > 800 && warn('Social', `og:image is ${size.toFixed(0)} KB`, 'Keep share images under about 600 KB so LinkedIn does not skip them.')
    }
    !isLocal && /localhost/.test(og['og:image']) && fail('Social', 'og:image points to localhost', 'Set NEXT_PUBLIC_SITE_URL and redeploy.')
  }
}

// ---------------------------------------------------------------- 3. structured data
{
  const A = 'Structured data'
  const blocks = [...html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1])
  if (!blocks.length) fail(A, 'No JSON-LD found', 'Add ProfilePage + Person JSON-LD.')
  else {
    let data = []
    for (const b of blocks) {
      try {
        const j = JSON.parse(b.replace(/\\u003c/g, '<'))
        data.push(...(Array.isArray(j) ? j : j['@graph'] ? j['@graph'] : [j]))
      } catch (e) {
        fail(A, `A JSON-LD block is not valid JSON: ${e.message}`, 'Fix the syntax in lib/jsonld.ts.')
      }
    }
    const page = data.find((d) => d['@type'] === 'ProfilePage')
    const person = page?.mainEntity || data.find((d) => d['@type'] === 'Person')
    page ? ok(A, 'ProfilePage found') : warn(A, 'No ProfilePage type', 'Use ProfilePage with Person as mainEntity.')
    if (!person) fail(A, 'No Person entity', 'Add a Person as mainEntity.')
    else {
      for (const k of ['name', 'alternateName', 'jobTitle', 'description', 'image', 'url', 'sameAs', 'knowsAbout']) {
        const v = person[k]
        v && (!Array.isArray(v) || v.length) ? ok(A, `Person.${k} present`) : warn(A, `Person.${k} is missing or empty`, `Add ${k} (for sameAs, include LinkedIn, GitHub and YouTube if you have it).`)
      }
      const urls = [person.url, person.image, ...(person.sameAs || [])].filter(Boolean)
      for (const u of urls) {
        if (!/^https?:\/\//.test(u)) fail(A, `Not an absolute URL in JSON-LD: ${u}`)
        else if (!isLocal && /localhost/.test(u)) fail(A, `JSON-LD contains localhost: ${u}`, 'Set NEXT_PUBLIC_SITE_URL and redeploy.')
      }
      const imgOk = person.image && (await status(abs(person.image))) === 200
      imgOk ? ok(A, 'Person.image loads') : warn(A, 'Person.image does not load', 'Check the image path.')
      const visible = [person.name, person.jobTitle].filter(Boolean).every((s) => text.toLowerCase().includes(String(s).toLowerCase()))
      visible ? ok(A, 'Name and job title in the JSON-LD also appear on the page') : warn(A, 'Job title in JSON-LD is not visible on the page', 'Google wants structured data to match visible content. Show the same title in the footer or hero.')
    }
  }
  info(A, 'For the official check, also paste the URL into https://search.google.com/test/rich-results')
}

// ---------------------------------------------------------------- 4. robots, sitemap, favicon
{
  const A = 'Crawlability'
  const r = await get(base + '/robots.txt')
  if (r.err || !r.res.ok) fail(A, 'robots.txt not found', 'Add app/robots.ts.')
  else {
    const t = await r.res.text()
    ok(A, 'robots.txt found')
    ;/Disallow:\s*\/\s*$/m.test(t) && fail(A, 'robots.txt blocks the whole site', 'Remove "Disallow: /".')
    ;/Sitemap:/i.test(t) ? ok(A, 'robots.txt lists the sitemap') : warn(A, 'robots.txt has no Sitemap line', 'Add sitemap to robots.ts.')
  }
  const s = await get(base + '/sitemap.xml')
  if (s.err || !s.res.ok) fail(A, 'sitemap.xml not found', 'Add app/sitemap.ts.')
  else {
    const t = await s.res.text()
    const locs = [...t.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
    locs.length ? ok(A, `sitemap.xml lists ${locs.length} URL(s)`) : warn(A, 'sitemap.xml is empty')
    for (const l of locs) {
      if (!isLocal && !l.startsWith(base)) warn(A, `Sitemap URL is on another host: ${l}`, 'Set NEXT_PUBLIC_SITE_URL.')
    }
  }
  const fav = [...html.matchAll(/<link\b[^>]*>/gi)].map((m) => m[0]).find((l) => /icon/i.test(attr(l, 'rel') || ''))
  fav ? ok(A, 'Favicon link present') : warn(A, 'No favicon link', 'Add app/icon.svg or favicon.ico.')
  const nf = await get(base + '/this-page-should-not-exist-xyz')
  nf.res?.status === 404 ? ok(A, 'Unknown URLs return a proper 404') : warn(A, `Unknown URL returned ${nf.res?.status}`, 'Unknown pages should return 404, not 200.')
}

// ---------------------------------------------------------------- 5. accessibility basics
{
  const A = 'Accessibility'
  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0])
  const noAlt = imgs.filter((i) => attr(i, 'alt') === undefined)
  noAlt.length ? fail(A, `${noAlt.length} image(s) have no alt attribute`, 'Add alt text to each informative image; use alt="" for decoration.') : ok(A, `All ${imgs.length} <img> tags have alt`)
  const emptyAlt = imgs.filter((i) => attr(i, 'alt') === '').length
  emptyAlt > imgs.length / 2 && warn(A, `${emptyAlt} images have empty alt`, 'Give meaningful alt to your photos and certificate logos.')
  const buttons = [...html.matchAll(/<button\b[^>]*>([\s\S]*?)<\/button>/gi)]
  const unnamed = buttons.filter((b) => !strip(b[1]) && !/aria-label=|aria-labelledby=|title=/i.test(b[0]))
  unnamed.length ? fail(A, `${unnamed.length} button(s) have no accessible name`, 'Add aria-label to icon-only buttons.') : ok(A, 'All buttons have a text label or aria-label')
  const links = [...html.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/gi)]
  const emptyLinks = links.filter((l) => !strip(l[1]) && !/aria-label=|aria-labelledby=|title=|<img[^>]+alt=["'][^"']+/i.test(l[0]))
  emptyLinks.length ? warn(A, `${emptyLinks.length} link(s) have no text`, 'Add aria-label to icon-only links.') : ok(A, 'All links have text or a label')
  const wrapped = new Set()
  for (const l of html.matchAll(/<label\b[^>]*>([\s\S]*?)<\/label>/gi)) for (const i of l[1].matchAll(/<(input|textarea|select)\b[^>]*>/gi)) wrapped.add(i[0])
  const inputs = [...html.matchAll(/<(input|textarea|select)\b[^>]*>/gi)].filter((i) => !/type=["']?(hidden|submit|button)/i.test(i[0]))
  const unlabeled = inputs.filter((i) => {
    const id = attr(i[0], 'id')
    return !wrapped.has(i[0]) && !/aria-label/i.test(i[0]) && !(id && new RegExp(`for=["']${id}["']`).test(html))
  })
  unlabeled.length ? warn(A, `${unlabeled.length} form field(s) without a label`, 'Connect each field to a <label for> or aria-label.') : ok(A, 'Form fields are labelled')
  ;/href=["']#main["']|skip to/i.test(html) ? ok(A, 'Skip-to-content link present') : warn(A, 'No skip link', 'Add a "Skip to content" link for keyboard users.')
  ;/<main\b/i.test(html) ? ok(A, '<main> landmark present') : warn(A, 'No <main> landmark')
  ;/<nav\b/i.test(html) ? ok(A, '<nav> landmark present') : warn(A, 'No <nav> landmark')
  info(A, 'Colour contrast and keyboard order need a browser tool. Use Chrome DevTools > Lighthouse, or run this script with --psi.')
}

// ---------------------------------------------------------------- 6. images & performance hints
{
  const A = 'Images'
  const srcs = new Set()
  for (const m of html.matchAll(/<img\b[^>]*>/gi)) {
    const s = attr(m[0], 'src')
    if (s) srcs.add(s)
    const ss = attr(m[0], 'srcset')
    if (ss) srcs.add(ss.split(',')[0].trim().split(' ')[0])
  }
  let broken = 0
  let heavy = []
  for (const s of srcs) {
    const u = abs(decode(s))
    if (!u || u.startsWith('data:')) continue
    const r = await get(u, { method: 'GET' })
    if (r.err || !r.res.ok) {
      broken++
      fail(A, `Image does not load: ${s.slice(0, 90)}`, 'Check the file exists in /public and the path matches.')
    } else {
      const kb = (await r.res.arrayBuffer()).byteLength / 1024
      kb > 400 && heavy.push(`${decode(s).slice(0, 60)} (${kb.toFixed(0)} KB)`)
    }
  }
  broken || ok(A, `${srcs.size} image(s) checked, none broken`)
  heavy.length && warn(A, `Heavy images: ${heavy.join('; ')}`, 'Compress with squoosh.app or make them smaller; Next.js already serves WebP/AVIF but starts from your original size.')
  const lazy = [...html.matchAll(/<img\b[^>]*>/gi)].filter((m) => /loading=["']lazy/i.test(m[0])).length
  info(A, `${lazy} of ${[...html.matchAll(/<img\b/gi)].length} images are lazy-loaded`)
  const noDim = [...html.matchAll(/<img\b[^>]*>/gi)].filter((m) => !/width=/i.test(m[0]) && !/fill|style=["'][^"']*position/i.test(m[0])).length
  noDim > 3 && warn(A, `${noDim} images lack width/height`, 'Set width/height (or use fill) to avoid layout shift.')
}

// ---------------------------------------------------------------- 7. security headers
{
  const A = 'Security'
  const want = {
    'strict-transport-security': ['HSTS missing', 'Vercel adds this on custom domains; add it in vercel.json headers if absent.'],
    'x-content-type-options': ['X-Content-Type-Options missing', 'Add "nosniff" in vercel.json headers.'],
    'x-frame-options': ['X-Frame-Options missing (clickjacking)', 'Add DENY or SAMEORIGIN, or use CSP frame-ancestors.'],
    'referrer-policy': ['Referrer-Policy missing', 'Add strict-origin-when-cross-origin.'],
    'permissions-policy': ['Permissions-Policy missing', 'Disable camera/microphone/geolocation you do not use.'],
  }
  if (isLocal) info(A, 'Headers from vercel.json only apply on Vercel. Run this script on your live address to check them.')
  else for (const [h, [m, f]] of Object.entries(want)) headers.get(h) ? ok(A, `${h} set`) : warn(A, m, f)
  !isLocal && headers.get('content-security-policy') ? ok(A, 'Content-Security-Policy set') : info(A, 'No Content-Security-Policy. Optional, but a strict one is a good showcase for a security professional.')
  !isLocal && headers.get('x-powered-by') ? warn(A, `X-Powered-By header exposes: ${headers.get('x-powered-by')}`, 'Set poweredByHeader: false in next.config.ts.') : ok(A, 'No X-Powered-By header')
  const mixed = [...html.matchAll(/(?:src|href)=["']http:\/\/(?!localhost)[^"']+/gi)]
  mixed.length ? fail(A, `${mixed.length} insecure http:// resource link(s)`, 'Use https:// for all links and assets.') : ok(A, 'No insecure http:// links')
  const blank = [...html.matchAll(/<a\b[^>]*target=["']_blank["'][^>]*>/gi)].filter((m) => !/rel=["'][^"']*noopener/i.test(m[0]))
  blank.length ? warn(A, `${blank.length} external link(s) open a new tab without rel="noopener"`, 'Add rel="noopener noreferrer".') : ok(A, 'External links use rel="noopener"')
  const emailInPage = (html.match(/mailto:[^"'<\s]+/gi) || []).length
  info(A, `${emailInPage} mailto link(s) on the page: public email addresses attract spam; the form is the safer main contact.`)
}

// ---------------------------------------------------------------- 8. links
{
  const A = 'Links'
  const ids = new Set([...html.matchAll(/\sid=["']([^"']+)["']/g)].map((m) => m[1]))
  const hrefs = [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)].map((m) => decode(m[1]))
  const anchors = [...new Set(hrefs.filter((h) => h.startsWith('#') && h.length > 1))]
  const deadAnchors = anchors.filter((a) => !ids.has(a.slice(1)))
  deadAnchors.length ? fail(A, `Menu/anchor links with no matching section: ${deadAnchors.join(', ')}`, 'Make each #id exist on a section.') : ok(A, `${anchors.length} in-page anchor links all resolve`)
  const external = [...new Set(hrefs.filter((h) => /^https?:\/\//.test(h) && !h.startsWith(base)))]
  const softBlock = /linkedin\.com|instagram\.com|credly\.com|medium\.com|github\.com|wa\.me|whatsapp\.com|facebook\.com|x\.com|twitter\.com/i
  let bad = 0
  for (const u of external) {
    const s = await status(u)
    if (softBlock.test(u) && [0, 403, 429, 999].includes(s)) {
      info(A, `${u} returned ${s || 'no response'} (site blocks bots; open it manually to confirm)`)
    } else if (s === 0) {
      warn(A, `Could not reach ${u} from here (offline, blocked or timed out)`, 'Open it in your browser to confirm it works.')
    } else if (s >= 400) {
      bad++
      fail(A, `Broken external link (${s}): ${u}`, 'Fix or remove the link.')
    }
  }
  bad || ok(A, `${external.length} external link(s) checked`)
  const internalFiles = [...new Set(hrefs.filter((h) => h.startsWith('/') && !h.startsWith('//')))]
  for (const p of internalFiles) {
    const s = await status(abs(p))
    s >= 400 && fail(A, `Internal link returns ${s}: ${p}`, 'Check the file in /public (e.g. resume.pdf).')
  }
  const tel = hrefs.filter((h) => h.startsWith('tel:')).length
  info(A, `${tel} tel: link(s), ${hrefs.filter((h) => h.startsWith('mailto:')).length} mailto: link(s)`)
}

// ---------------------------------------------------------------- 9. content hygiene
{
  const A = 'Content'
  const flags = [
    [/placeholder/i, 'The word "placeholder"', 'Replace placeholder blocks with real content or hide the section.'],
    [/to confirm|confirm status|add start date|add end date/i, 'A "to confirm" tag', 'Confirm the fact (for example the CISA status) and remove the amber tag in the data file.'],
    [/YOUR-|your-domain|example\.com|lorem ipsum|TODO|TBD/i, 'Template text (YOUR-, example.com, lorem ipsum, TODO)', 'Replace with your real details.'],
    [/localhost/i, 'The word localhost', 'Set NEXT_PUBLIC_SITE_URL.'],
  ]
  let clean = true
  for (const [re, label, fix] of flags) {
    if (re.test(text)) {
      clean = false
      warn(A, `${label} is visible on the page`, fix)
    }
  }
  clean && ok(A, 'No placeholder or template text visible')
  const hasForm = /<form\b/i.test(html)
  hasForm ? ok(A, 'Contact form present') : warn(A, 'No contact form found', 'A form or a clear contact method is a must for a portfolio.')
  ;/linkedin\.com\/in\//i.test(html) ? ok(A, 'LinkedIn profile linked') : warn(A, 'No LinkedIn link', 'Link your LinkedIn.')
  ;/github\.com\//i.test(html) ? ok(A, 'GitHub linked') : info(A, 'No GitHub link')
  ;/youtube\.com|youtu\.be/i.test(html) ? ok(A, 'YouTube linked') : info(A, 'No YouTube link (add one if you have a channel; it also goes in the JSON-LD sameAs)')
  ;/resume\.pdf|href=["'][^"']+\.pdf/i.test(html) ? ok(A, 'Resume/PDF link present') : info(A, 'No resume download link')
  const years = [...text.matchAll(/\b(20[12]\d)\b/g)].map((m) => +m[1])
  const latest = Math.max(...years, 0)
  const thisYear = new Date().getFullYear()
  latest && latest < thisYear - 1 && warn(A, `Newest year mentioned is ${latest}`, 'Make sure the site shows your latest work and dates.')
  const claims = ['720+', '400+']
  info(A, `Headline numbers on the page: ${claims.filter((c) => text.includes(c)).join(', ') || 'none found'}. Keep every figure real and consistent with LinkedIn.`)
}

// ---------------------------------------------------------------- 10. optional PageSpeed
if (usePsi) {
  const A = 'PageSpeed (Google)'
  if (isLocal) warn(A, 'PageSpeed cannot test localhost', 'Run it against your live address.')
  else {
    for (const strategy of ['mobile', 'desktop']) {
      const api = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(base + '/')}&strategy=${strategy}&category=performance&category=accessibility&category=best-practices&category=seo`
      const r = await get(api)
      if (r.err || !r.res.ok) {
        warn(A, `PageSpeed API call failed for ${strategy} (${r.err?.message || r.res.status})`, 'Try again in a minute or use https://pagespeed.web.dev')
        continue
      }
      const j = await r.res.json()
      const cats = j.lighthouseResult?.categories || {}
      const line = Object.values(cats).map((c) => `${c.title} ${Math.round(c.score * 100)}`).join(' | ')
      info(A, `${strategy}: ${line}`)
      for (const c of Object.values(cats)) {
        const sc = Math.round(c.score * 100)
        sc >= 90 ? ok(A, `${strategy} ${c.title}: ${sc}`) : warn(A, `${strategy} ${c.title}: ${sc}`, 'Open https://pagespeed.web.dev for the specific items.')
      }
      const au = j.lighthouseResult?.audits || {}
      for (const k of ['largest-contentful-paint', 'cumulative-layout-shift', 'total-blocking-time']) {
        au[k] && info(A, `${strategy} ${au[k].title}: ${au[k].displayValue}`)
      }
    }
  }
}

// ---------------------------------------------------------------- report
const icon = { pass: 'PASS', warn: 'WARN', fail: 'FAIL', info: 'INFO' }
const counts = results.reduce((a, r) => ((a[r.level] = (a[r.level] || 0) + 1), a), {})
const scored = (counts.pass || 0) + (counts.warn || 0) + (counts.fail || 0)
const score = Math.round((((counts.pass || 0) + (counts.warn || 0) * 0.5) / Math.max(scored, 1)) * 100)

const areas = [...new Set(results.map((r) => r.area))]
let out = `# Portfolio audit\n\nSite: ${base}\nDate: ${new Date().toISOString().slice(0, 10)}\n\n**Score: ${score}/100** (${counts.pass || 0} passed, ${counts.warn || 0} warnings, ${counts.fail || 0} failures)\n\n`

const todo = results.filter((r) => r.level === 'fail' || r.level === 'warn')
if (todo.length) {
  out += `## Fix list (most important first)\n\n`
  for (const r of [...todo.filter((r) => r.level === 'fail'), ...todo.filter((r) => r.level === 'warn')]) {
    out += `- [${icon[r.level]}] **${r.area}**: ${r.msg}${r.fix ? `\n  - Suggestion: ${r.fix}` : ''}\n`
  }
  out += '\n'
} else out += `## Nothing to fix. Nice work.\n\n`

out += `## Full results\n`
for (const a of areas) {
  out += `\n### ${a}\n`
  for (const r of results.filter((x) => x.area === a)) out += `- ${icon[r.level]}: ${r.msg}\n`
}
out += `\n## Manual checks no script can do\n- Open the site on a real phone and scroll every section.\n- Send a test message through the contact form.\n- Share the link in a LinkedIn draft and check the preview card (https://www.linkedin.com/post-inspector/).\n- Search Google for site:${base.replace(/^https?:\/\//, '')} a few days after submitting the sitemap.\n`

writeFileSync(new URL('./audit-report.md', import.meta.url), out)

const color = { pass: '\x1b[32m', warn: '\x1b[33m', fail: '\x1b[31m', info: '\x1b[36m' }
for (const a of areas) {
  console.log(`\n\x1b[1m${a}\x1b[0m`)
  for (const r of results.filter((x) => x.area === a)) {
    console.log(`  ${color[r.level]}${icon[r.level]}\x1b[0m ${r.msg}`)
    if (r.fix && r.level !== 'pass') console.log(`       -> ${r.fix}`)
  }
}
console.log(`\n\x1b[1mScore: ${score}/100\x1b[0m  (${counts.pass || 0} passed, ${counts.warn || 0} warnings, ${counts.fail || 0} failures)`)
console.log('Report saved to audit-report.md\n')
process.exit(counts.fail ? 1 : 0)
