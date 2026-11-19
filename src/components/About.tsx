import Reveal from './Reveal'
import Terminal from './Terminal'
import SectionHeading from './SectionHeading'
import { profile } from '@/data/profile'

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-fit">
      <div className="container-x">
        <SectionHeading
          eyebrow="About"
          id="about-title"
          compact
          title={
            <>
              From technical security work to <em className="text-gradient">changing how people behave.</em>
            </>
          }
        />

        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <Reveal className="space-y-4 text-[15px] leading-[1.7] text-fog-muted sm:text-base">
            <p>
              <span className="text-white">I started in hands-on security consulting</span>: vulnerability assessments, ISO/IEC 27001
              ISMS projects, vendor risk reviews, and the phishing simulations and awareness initiatives that put me
              closest to the human side of security. That experience pointed my career toward people, behaviour and training.
            </p>
            <p>
              That led me into teaching. Across India and Europe I have delivered{' '}
              <span className="text-white">720+ hours of cybersecurity training</span> to technical and non-technical learners
              (over 400 of them) through classrooms, corporate sessions, workshops and live demonstrations, with
              85–90%+ certification success rates across the batches I trained.
            </p>
            <p>
              Today, as <span className="text-white">{profile.designation} at {profile.company}</span>, I bring both sides together:
              the technical grounding of a security consultant and the communication skills of a trainer, applied to
              corporate security awareness, security culture and human risk management.
            </p>
            <p className="text-sm text-fog-dim">
              {profile.education.degree} · {profile.education.institution} · {profile.location}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <Terminal size="full" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
