import { ArrowRight } from 'lucide-react'
import { TodayMockup } from '../mockups/AppMockups'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        className="pointer-events-none absolute inset-0 -z-10 grid-lines mask-fade-y opacity-40"
      />
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] -z-10 h-[520px] w-[520px] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(59,232,176,0.35) 0%, transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 left-[-10%] -z-10 h-[460px] w-[460px] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(59,158,255,0.3) 0%, transparent 70%)',
        }}
      />

      <div className="mx-auto max-w-6xl px-5 pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_440px]">
          <div>
            <div className="eyebrow">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-mint pulse-dot" />
              Версия 3.0 · Апрель 2026
            </div>

            <h1 className="mt-6 text-[44px] font-black leading-[1.02] tracking-tight md:text-[72px]">
              Одна цифра
              <br />
              <span className="grad-text">вместо таблиц.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-text-muted md:text-xl">
              Sanda каждое утро показывает, сколько можно потратить сегодня, чтобы дойти до
              зарплаты и сохранить накопления. Без категорий. Без разметки. С первого дня.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#cta" className="btn-primary">
                Скачать для iOS <ArrowRight size={18} />
              </a>
              <a href="#how" className="btn-ghost">
                Как это работает
              </a>
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-8">
              <Stat big="2 сек" small="чтобы понять, можно ли тратить" />
              <Stat big="0 категорий" small="ничего размечать не нужно" />
              <Stat big="4,8 ★" small="средняя оценка в App Store" />
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-[340px]">
            <HeroGlow />
            <TodayMockup amount={12400} spent={0} zone="safe" streak={14} />
            <FloatingCard
              className="left-[-48px] top-14 hidden md:block"
              emoji="✅"
              title="Уложился в лимит"
              sub="14 дней подряд"
            />
            <FloatingCard
              className="right-[-56px] bottom-28 hidden md:block"
              emoji="🎯"
              title="Цель на ипотеку"
              sub="39% собрано"
              accent
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function HeroGlow() {
  return (
    <div
      className="pointer-events-none absolute -inset-14 -z-10 rounded-full opacity-70 blur-3xl"
      style={{
        background:
          'radial-gradient(circle, rgba(59,232,176,0.3) 0%, rgba(59,158,255,0.2) 40%, transparent 70%)',
      }}
    />
  )
}

function Stat({ big, small }: { big: string; small: string }) {
  return (
    <div>
      <dt className="num-display text-2xl font-bold text-text md:text-3xl">{big}</dt>
      <dd className="mt-1 text-xs text-text-muted">{small}</dd>
    </div>
  )
}

function FloatingCard({
  className = '',
  emoji,
  title,
  sub,
  accent,
}: {
  className?: string
  emoji: string
  title: string
  sub: string
  accent?: boolean
}) {
  return (
    <div
      className={`absolute flex items-center gap-3 rounded-2xl border ${
        accent ? 'border-sky/30 bg-sky/[0.08]' : 'border-mint/30 bg-mint/[0.06]'
      } p-3 backdrop-blur-xl ${className}`}
      style={{
        boxShadow: '0 20px 40px -20px rgba(0,0,0,0.6)',
      }}
    >
      <div
        className="flex h-9 w-9 items-center justify-center rounded-full text-base"
        style={{
          background: 'rgba(255,255,255,0.08)',
        }}
      >
        {emoji}
      </div>
      <div>
        <p className="text-[13px] font-semibold text-white">{title}</p>
        <p className="text-[11px] text-white/60">{sub}</p>
      </div>
    </div>
  )
}
