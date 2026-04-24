import { useMemo, useState } from 'react'

function daysUntilPayday(paydayDay: number) {
  const today = new Date()
  const day = today.getDate()
  const inThisMonth = paydayDay - day
  if (inThisMonth > 0) return inThisMonth
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
  return daysInMonth - day + paydayDay
}

function formatN(n: number) {
  return new Intl.NumberFormat('ru-RU').format(Math.max(0, Math.round(n)))
}

/**
 * TrySection — rebuilt to break the "text left / phone right" pattern
 * that HeroSection already owns. Instead we lead with a full-width
 * live result card (the big daily-limit number), then arrange sliders
 * in a responsive 2×2 grid underneath. No phone mockup here — the
 * phone belongs to Hero and Features, this section is a calculator.
 */
export function TrySection() {
  const [balance, setBalance] = useState(485_000)
  const [obligations, setObligations] = useState(142_000)
  const [goals, setGoals] = useState(50_000)
  const [payday, setPayday] = useState(15)

  const daysLeft = useMemo(() => daysUntilPayday(payday), [payday])

  const available = balance - obligations - goals
  const dailyLimit = Math.max(available / Math.max(daysLeft, 1), 0)

  const zone: 'safe' | 'warn' | 'over' =
    available <= 0 ? 'over' : available < balance * 0.15 ? 'warn' : 'safe'

  const zoneColor =
    zone === 'safe' ? '#3be8b0' : zone === 'warn' ? '#f5a623' : '#ff5566'
  const zoneLabel =
    zone === 'safe'
      ? 'В безопасной зоне'
      : zone === 'warn'
      ? 'Близко к границе'
      : 'Выше бюджета'

  return (
    <section
      id="try"
      className="relative border-b border-line px-5 py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-2xl md:mb-10">
          <div className="eyebrow">Как работает · Попробуй</div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:mt-5 md:text-5xl">
            Вноси данные и смотри,{' '}
            <span className="grad-text">твой бюджет на сегодня</span>
          </h2>
          <p className="mt-4 text-text-muted md:mt-5">
            Заноси баланс, обязательства и цели. Sanda учитывает все твои расходы,
            доходы, планы, обязательства к выплате и цели по сбережениям.
          </p>
        </div>

        {/*
         * Live result card — big centre-piece, replaces the phone mockup.
         * Left: the daily limit in huge type with the zone chip.
         * Right: the formula broken into stacked chips with values,
         * so the user *sees* what feeds into the result instead of
         * reading a static equation strip.
         */}
        <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-white/[0.04] via-white/[0.015] to-white/[0.04] p-5 md:p-8">
          <div
            className="pointer-events-none absolute -top-24 left-1/2 h-[320px] w-[320px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
            style={{
              background: `radial-gradient(circle, ${zoneColor}55 0%, transparent 70%)`,
            }}
            aria-hidden
          />

          <div className="relative grid gap-6 md:grid-cols-[1.1fr_1fr] md:gap-8">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-text-dim">
                Сегодня можно потратить
              </p>
              <div className="mt-3 flex items-baseline gap-3">
                <span
                  className="num-display text-6xl font-black leading-none tracking-tight md:text-[92px]"
                  style={{ color: zoneColor }}
                >
                  {formatN(dailyLimit)}
                </span>
                <span className="text-xl text-text-muted md:text-2xl">₸</span>
              </div>
              <div
                className="mt-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium md:text-sm"
                style={{
                  borderColor: `${zoneColor}55`,
                  background: `${zoneColor}14`,
                  color: zoneColor,
                }}
              >
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ background: zoneColor }}
                />
                {zoneLabel}
              </div>
            </div>

            {/*
             * Formula breakdown card — shows how the big number is derived.
             * Rows instead of the old horizontal chip strip — easier to read
             * on mobile and denser on desktop.
             */}
            <div className="rounded-2xl border border-line bg-ink-2/60 p-4 md:p-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-text-dim">
                Формула на сегодня
              </p>
              <div className="mt-3 space-y-2.5">
                <FormulaRow
                  color="#f3f5f7"
                  label="Баланс"
                  value={`${formatN(balance)} ₸`}
                  op=""
                />
                <FormulaRow
                  color="#ff5566"
                  label="Обязательства"
                  value={`−${formatN(obligations)} ₸`}
                  op="−"
                />
                <FormulaRow
                  color="#3b9eff"
                  label="Цели"
                  value={`−${formatN(goals)} ₸`}
                  op="−"
                />
                <div className="border-t border-line pt-2.5">
                  <FormulaRow
                    color="#3be8b0"
                    label="Дни до зарплаты"
                    value={`÷ ${daysLeft}`}
                    op="÷"
                  />
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white/[0.04] px-3 py-2.5">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                    Сегодня
                  </span>
                  <span
                    className="num-display text-lg font-bold"
                    style={{ color: zoneColor }}
                  >
                    {formatN(dailyLimit)} ₸
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*
         * Sliders in a 2×2 grid sit *below* the result — the user tweaks,
         * the big number reacts. This layout doesn't repeat "column of
         * labelled inputs" that HeroSection already shows on its left.
         */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 md:mt-8 md:gap-4">
          <SliderCard
            label="Баланс"
            sub="деньги на всех счетах"
            accent="#f3f5f7"
            value={balance}
            onChange={setBalance}
            min={50_000}
            max={1_500_000}
            step={5_000}
            unit="₸"
          />
          <SliderCard
            label="Обязательства в месяц"
            sub="кредиты, рассрочки, подписки"
            accent="#ff5566"
            value={obligations}
            onChange={setObligations}
            min={0}
            max={400_000}
            step={2_000}
            unit="₸"
          />
          <SliderCard
            label="Цели накоплений"
            sub="ипотека, отпуск, подушка"
            accent="#3b9eff"
            value={goals}
            onChange={setGoals}
            min={0}
            max={300_000}
            step={2_000}
            unit="₸"
          />
          <SliderCard
            label="День зарплаты"
            sub={`${daysLeft} дн до следующей получки`}
            accent="#3be8b0"
            value={payday}
            onChange={setPayday}
            min={1}
            max={28}
            step={1}
            unit=""
          />
        </div>
      </div>
    </section>
  )
}

function FormulaRow({
  color,
  label,
  value,
  op,
}: {
  color: string
  label: string
  value: string
  op: string
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex min-w-0 items-center gap-2">
        <span
          className="flex h-5 w-5 flex-shrink-0 items-center justify-center text-[11px] font-bold text-text-dim"
          aria-hidden
        >
          {op}
        </span>
        <span
          className="inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full"
          style={{ background: color }}
        />
        <span className="truncate text-text-muted">{label}</span>
      </div>
      <span className="num-display whitespace-nowrap font-semibold text-text">
        {value}
      </span>
    </div>
  )
}

function SliderCard({
  label,
  sub,
  value,
  onChange,
  min,
  max,
  step,
  unit,
  accent,
}: {
  label: string
  sub?: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step: number
  unit: string
  accent: string
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div className="rounded-2xl border border-line bg-white/[0.02] p-4 transition hover:border-line-strong md:p-5">
      <div className="mb-2 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-text">{label}</p>
          {sub && <p className="text-xs text-text-dim">{sub}</p>}
        </div>
        <p className="num-display whitespace-nowrap text-xl font-bold text-text">
          {formatN(value)}
          {unit && <span className="ml-1 text-sm text-text-muted">{unit}</span>}
        </p>
      </div>
      {/*
       * .slider-hitbox extends the <input type="range"> over a 36px tall
       * area (28px on desktop) while the visible track stays 2px. Thumb
       * and fill stay at their original positions — only the finger
       * target gets bigger.
       */}
      <div className="slider-hitbox relative my-2">
        <div className="relative h-2 rounded-full bg-white/5">
          <div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ width: `${pct}%`, background: accent }}
          />
          <div
            className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink bg-white shadow-lg"
            style={{ left: `${pct}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={label}
        />
      </div>
    </div>
  )
}
