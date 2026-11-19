/**
 * Build-time media discovery.
 *
 * Drop images into these folders and they appear on the site automatically:
 *   public/training/<category>/*.jpg      → Training Portfolio gallery (folder name = category)
 *   public/feedback/*.png                 → Testimonial screenshots
 *   public/certificates/<cert-id>.png     → Certificate image for a certification (see src/data/certifications.ts)
 *
 * Optional captions: a captions.json file in the same folder, e.g.
 *   { "classroom/session-01.jpg": "Security+ bootcamp, Bengaluru" }
 *
 * This module only runs on the server (during build / SSR), never in the browser.
 */
import fs from 'node:fs'
import path from 'node:path'

export interface MediaImage {
  src: string
  alt: string
  caption?: string
}

export interface GalleryImage extends MediaImage {
  category: string
}

export interface GalleryCategory {
  id: string
  label: string
}

const IMAGE_RE = /\.(jpe?g|png|webp|avif)$/i
const PUBLIC_DIR = path.join(process.cwd(), 'public')

const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' })

function safeReadDir(dir: string): fs.Dirent[] {
  try {
    return fs.readdirSync(dir, { withFileTypes: true })
  } catch {
    return []
  }
}

function readCaptions(dir: string): Record<string, string> {
  try {
    const raw = fs.readFileSync(path.join(dir, 'captions.json'), 'utf8')
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

const toUrl = (...segments: string[]) => '/' + segments.map(encodeURIComponent).join('/')

function humanize(name: string): string {
  return name
    .replace(/^\d+[-_.\s]+/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export function getTrainingGallery(): { images: GalleryImage[]; categories: GalleryCategory[] } {
  const root = path.join(PUBLIC_DIR, 'training')
  const captions = readCaptions(root)
  const images: GalleryImage[] = []
  const categories: GalleryCategory[] = []

  const entries = safeReadDir(root).sort((a, b) => collator.compare(a.name, b.name))

  const pushImage = (relParts: string[], categoryId: string, label: string) => {
    const key = relParts.join('/')
    const caption = captions[key]
    images.push({
      src: toUrl('training', ...relParts),
      category: categoryId,
      caption,
      alt: caption ?? `${label} training session delivered by Naveen A D`,
    })
  }

  // Folders → categories
  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    const files = safeReadDir(path.join(root, entry.name))
      .filter((f) => f.isFile() && IMAGE_RE.test(f.name))
      .sort((a, b) => collator.compare(a.name, b.name))
    if (!files.length) continue
    const id = entry.name.toLowerCase()
    const label = humanize(entry.name)
    categories.push({ id, label })
    for (const f of files) pushImage([entry.name, f.name], id, label)
  }

  // Loose files in /public/training → "Highlights"
  const loose = entries.filter((e) => e.isFile() && IMAGE_RE.test(e.name))
  if (loose.length) {
    categories.unshift({ id: 'highlights', label: 'Highlights' })
    for (const f of loose) pushImage([f.name], 'highlights', 'Training')
  }

  return { images, categories }
}

export function getFeedbackScreenshots(): MediaImage[] {
  const root = path.join(PUBLIC_DIR, 'feedback')
  const captions = readCaptions(root)
  return safeReadDir(root)
    .filter((f) => f.isFile() && IMAGE_RE.test(f.name))
    .sort((a, b) => collator.compare(a.name, b.name))
    .map((f) => ({
      src: toUrl('feedback', f.name),
      caption: captions[f.name],
      alt: captions[f.name] ?? 'Learner feedback received by Naveen A D',
    }))
}

/** Map of certification id → image URL (file base name must equal the certification id). */
export function getCertificateImages(): Record<string, string> {
  const root = path.join(PUBLIC_DIR, 'certificates')
  const map: Record<string, string> = {}
  for (const f of safeReadDir(root)) {
    if (f.isFile() && IMAGE_RE.test(f.name)) {
      map[path.parse(f.name).name.toLowerCase()] = toUrl('certificates', f.name)
    }
  }
  return map
}
