import { Reveal } from '../Reveal'
import { BetaButton } from '../BetaModal'

export function CtaSection() {
  return (
    <section id="cta" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(59,232,176,0.35) 0%, rgba(59,158,255,0.2) 30%, transparent 70%)',
        }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 grid-lines opacity-30" />

      <div className="mx-auto max-w-4xl px-5 py-20 text-center md:py-28">
        <Reveal delay={0}>
          <div className="eyebrow mx-auto">Бета-тест · iOS · Android (скоро)</div>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="mt-5 text-[36px] font-black leading-[1.05] tracking-tight sm:text-[44px] md:mt-6 md:text-[64px]">
            Попробуй Sanda{' '}
            <span className="grad-text">первым</span>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mx-auto mt-5 max-w-xl text-base text-text-muted md:mt-6 md:text-lg">
            Оставь заявку на бета-тест — и рассчитай свой лимит на день
            в течение 10 минут после получения доступа.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:mt-10">
            <BetaButton>Скачать для IOS</BetaButton>
            <a href="#features" className="btn-ghost">
              Узнать больше
            </a>
          </div>
        </Reveal>
        <Reveal delay={220}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-text-muted md:mt-12 md:gap-x-8 md:gap-y-4">
            <Check>Бесплатно</Check>
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
