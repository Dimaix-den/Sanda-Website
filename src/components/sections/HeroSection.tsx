import { ArrowRight } from 'lucide-react'
import { TodayMockup } from '../mockups/AppMockups'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        className="pointer-events-none absolute inset-0 -z-10 grid-lines mask-fade-y opacity-40"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] -z-10 h-[520px] w-[520px] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(59,232,176,0.35) 0%, transparent 70%)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 left-[-10%] -z-10 h-[460px] w-[460px] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(59,158,255,0.3) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      <div className="mx-auto max-w-6xl px-5 pt-10 pb-14 md:pt-10 md:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_440px] lg:gap-12">
          <div>
            <div className="eyebrow">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-mint pulse-dot" />
              Версия 3.0 · Апрель 2026
            </div>

            <h1 className="mt-5 text-[38px] font-black leading-[1.05] tracking-tight sm:text-[44px] md:text-[72px] md:leading-[1.02]">
              Финансовая грамотность
              <br />
              <span className="grad-text">без ограничений</span>
            </h1>

            <p className="mt-5 max-w-xl text-base text-text-muted md:mt-6 md:text-xl">
              Sanda не покажет, сколько ты потратил на кофе, она покажет сколько
              кофе ты можешь себе позволить
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3 md:mt-8">
              <a href="#cta" className="btn-primary">
                Скачать для iOS <ArrowRight size={18} />
              </a>
              <a href="#try" className="btn-ghost">
                Как это работает
              </a>
            </div>

            {/*
             * Silvered spec-row — replaces the old three-column stats grid.
             * Visually de-emphasised vs the headline: smaller, lower
             * contrast, brushed-metal gradient. Reads as "badges" or
             * "spec strip" so the reader's eye can skip it if they're
             * already sold, and absorbs it passively if not. Three items
             * are separated by hairline dividers rather than stacked in
             * a 3-col grid with their own labels/values, which feels
             * heavier.
             */}
            <div className="mt-8 md:mt-10">
              <div className="silver-surface flex flex-wrap items-stretch divide-x divide-white/[0.06] overflow-hidden rounded-2xl">
                <SpecItem value="2 сек" label="до решения" />
                <SpecItem value="Одна цифра" label="вместо таблиц" />
                <SpecItem value="4,8 ★" label="в App Store" />
              </div>
            </div>
          </div>

          {/*
           * Phone wrapper. `isolation: isolate` is the key fix here —
           * the ported mockup contains its own z-index stack (status
           * bar 5, bottom nav 30, home bar 40, dynamic-island pill 50),
           * which used to escape into this wrapper's stacking context
           * and float above the FloatingCards even though the cards
           * sit later in DOM order. Isolating the phone caps all those
           * indices to its own subtree, so the cards (rendered as
           * siblings) reliably win.
           */}
          <div
            className="relative mx-auto w-full max-w-[320px] md:max-w-[340px]"
            style={{ isolation: 'isolate' }}
          >
            <HeroGlow />
            <TodayMockup amount={12400} spent={0} zone="safe" streak={14} />
            <FloatingCard
              className="left-[-48px] top-14 z-10 hidden md:flex"
              emoji="✅"
              title="Уложился в лимит"
              sub="14 дней подряд"
            />
            <FloatingCard
              className="right-[-56px] bottom-28 z-10 hidden md:flex"
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
      aria-hidden
    />
  )
}

/**
 * Single "spec" item in the silver hero strip. Number is rendered in a
 * silvered gradient, label is dim and uppercase with wide tracking so
 * it reads like an engraving on the side of a device.
 */
function SpecItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center justify-center px-4 py-3 text-center md:px-5 md:py-3.5">
      <span className="silver-text num-display text-base font-semibold leading-tight tracking-tight md:text-lg">
        {value}
      </span>
      <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.2em] text-text-dim md:text-[10px]">
        {label}
      </span>
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
