import { TodayMockup } from '../mockups/AppMockups'
import { Reveal } from '../Reveal'
import { BetaButton } from '../BetaModal'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 grid-lines mask-fade-y opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] -z-10 h-[520px] w-[520px] rounded-full opacity-50 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(59,232,176,0.35) 0%, transparent 70%)' }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 left-[-10%] -z-10 h-[460px] w-[460px] rounded-full opacity-50 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(59,158,255,0.3) 0%, transparent 70%)' }}
        aria-hidden
      />

      <div className="mx-auto max-w-6xl px-5 pt-10 pb-14 md:pt-12 md:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_440px] lg:gap-12">
          <div>
            <Reveal delay={0}>
              <div className="eyebrow">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-mint pulse-dot" />
                Ранний доступ · iOS
              </div>
            </Reveal>

            <Reveal delay={60}>
              <h1 className="mt-5 text-[38px] font-black leading-[1.05] tracking-tight sm:text-[44px] md:text-[64px] md:leading-[1.02]">
                Управляй бюджетом,
                <br />
                <span className="grad-text">а не категориями</span>
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-5 max-w-xl text-base text-text-muted md:mt-6 md:text-xl">
                Sanda учтёт все твои планы и каждое утро даст одну цифру —
                сколько можно потратить сегодня, чтобы дойти до зарплаты и не трогать накопления.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-7 flex flex-wrap items-center gap-3 md:mt-8">
                {/* Primary — opens TestFlight modal */}
                <BetaButton>Скачать для iOS</BetaButton>
                <a href="#features" className="btn-ghost">
                  Как это работает
                </a>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-8 md:mt-10">
                <div className="silver-surface flex flex-wrap items-stretch divide-x divide-white/[0.06] overflow-hidden rounded-2xl">
                  <SpecItem value="Один экран" label="вместо таблиц" />
                  <SpecItem value="< 5 мин" label="первая настройка" />
                  <SpecItem value="iOS 16+" label="и Apple Watch" />
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} y={16}>
            <div className="relative mx-auto w-full max-w-[320px] md:max-w-[340px]" style={{ isolation: 'isolate' }}>
              <HeroGlow />
              <TodayMockup amount={12400} spent={0} zone="safe" streak={14} />
              <Reveal delay={420} y={18} className="absolute left-[-48px] top-14 z-10 hidden md:block">
                <FloatingCard emoji="✅" title="Уложился в лимит" sub="14 дней подряд" />
              </Reveal>
              <Reveal delay={520} y={18} className="absolute right-[-56px] bottom-28 z-10 hidden md:block">
                <FloatingCard emoji="🎯" title="Цель на ипотеку" sub="39% собрано" accent />
              </Reveal>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function HeroGlow() {
  return (
    <div
      className="pointer-events-none absolute -inset-14 -z-10 rounded-full opacity-70 blur-3xl"
      style={{ background: 'radial-gradient(circle, rgba(59,232,176,0.3) 0%, rgba(59,158,255,0.2) 40%, transparent 70%)' }}
      aria-hidden
    />
  )
}

function SpecItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center justify-center px-4 py-3 text-center md:px-5 md:py-3.5">
      <span className="silver-text num-display text-base font-semibold leading-tight tracking-tight md:text-lg">{value}</span>
      <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.2em] text-text-dim md:text-[10px]">{label}</span>
    </div>
  )
}

function FloatingCard({ emoji, title, sub, accent }: { emoji: string; title: string; sub: string; accent?: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border ${accent ? 'border-sky/30 bg-sky/[0.08]' : 'border-mint/30 bg-mint/[0.06]'} p-3 backdrop-blur-xl`}
      style={{ boxShadow: '0 20px 40px -20px rgba(0,0,0,0.6)' }}
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-full text-base" style={{ background: 'rgba(255,255,255,0.08)' }}>
        {emoji}
      </div>
      <div>
        <p className="text-[13px] font-semibold text-white">{title}</p>
        <p className="text-[11px] text-white/60">{sub}</p>
      </div>
    </div>
  )
}
