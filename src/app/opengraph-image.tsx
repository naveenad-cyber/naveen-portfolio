import { ImageResponse } from 'next/og'
import { profile } from '@/data/profile'

export const alt = `${profile.name} — ${profile.designation}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'radial-gradient(900px 500px at 85% 10%, #0a3a26 0%, #05110c 55%, #030806 100%)',
          color: '#e7ecf5',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, color: '#00ff9c', fontSize: 26, letterSpacing: 4 }}>
          <div style={{ width: 44, height: 2, background: '#00ff9c' }} />
          {profile.company.toUpperCase()}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 112, lineHeight: 1, color: '#fff', fontWeight: 600 }}>{profile.name}</div>
          <div style={{ fontSize: 44, color: '#9dffd2' }}>{profile.designation}</div>
          <div style={{ fontSize: 28, color: '#98a3b8', maxWidth: 900, marginTop: 8 }}>
            Turning cybersecurity awareness into everyday employee behaviour.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 40, fontSize: 26, color: '#98a3b8' }}>
          <span>720+ training hours</span>
          <span>400+ learners</span>
          <span>India · Europe</span>
        </div>
      </div>
    ),
    size,
  )
}
