import { ArrowRight } from 'lucide-react'
import { Reveal } from '../Reveal'

export function CtaSection() {
  return (
    <section id="cta" className="relative overflow-hidden border-b border-line">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(59,232,176,0.35) 0%, rgba(59,158,255,0.2) 30%, transparent 70%)',
        }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 grid-lines opacity-30" />

      <div className="mx-auto max-w-4xl px-5 py-20 text-center md:py-28">
        {/*
         * Staggered reveal — final CTA gets the same gentle sequence
         * as Hero so the page closes the way it opened.
         */}
        <Reveal delay={0}>
          <div className="eyebrow mx-auto">Бесплатно · iOS · Android (скоро)</div>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="mt-5 text-[36px] font-black leading-[1.05] tracking-tight sm:text-[44px] md:mt-6 md:text-[64px]">
            Попробуй сегодня <span className="grad-text">бесплатно</span>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mx-auto mt-5 max-w-xl text-base text-text-muted md:mt-6 md:text-lg">
            Скачай приложение и расчитай свой лимит на день в течение 10 минут.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:mt-10">
            <a href="#" className="btn-primary">
              Скачать в App Store <ArrowRight size={18} />
            </a>
            <a href="#" className="btn-ghost">
              Google Play (скоро)
            </a>
          </div>
        </Reveal>
        <Reveal delay={220}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-text-muted md:mt-12 md:gap-x-8 md:gap-y-4">
            <Check>Ядро бесплатно навсегда</Check>
            <Check>Работает офлайн</Check>
            <Check>Apple Sign-In</Check>
            <Check>Без рекламы</Check>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Check({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-2">
      <span
        className="inline-flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-ink"
        style={{ background: 'linear-gradient(110deg, #3be8b0 0%, #3b9eff 100%)' }}
      >
        ✓
      </span>
      {children}
    </span>
  )
}
