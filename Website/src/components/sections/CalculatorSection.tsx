import { useMemo, useState } from 'react'
import { TodayMockup } from '../mockups/AppMockups'

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

export function CalculatorSection() {
  const [balance, setBalance] = useState(485_000)
  const [obligations, setObligations] = useState(142_000)
  const [goals, setGoals] = useState(50_000)
  const [payday, setPayday] = useState(15)

  const daysLeft = useMemo(() => daysUntilPayday(payday), [payday])

  const available = balance - obligations - goals
  const dailyLimit = Math.max(available / Math.max(daysLeft, 1), 0)

  const zone: 'safe' | 'warn' | 'over' =
    available <= 0 ? 'over' : available < balance * 0.15 ? 'warn' : 'safe'

  return (
    <section id="calc" className="relative border-t border-line px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <div className="eyebrow">Попробуй прямо здесь</div>
          <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
            Поменяй цифры — и посмотри,{' '}
            <span className="grad-text">сколько можно тратить сегодня</span>
          </h2>
          <p className="mt-5 max-w-xl text-text-muted">
            Sanda считает по простой формуле: баланс минус обязательства и цели, делим на дни до
            зарплаты. Без категорий. Без месяцев разметки.
          </p>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-[1fr_420px]">
          <div className="order-2 space-y-7 lg:order-1">
            <Slider
              label="Баланс"
              accent="white"
              value={balance}
              onChange={setBalance}
              min={50_000}
              max={1_500_000}
              step={5_000}
              unit="₸"
            />
            <Slider
              label="Обязательства в месяц"
              sub="кредиты, рассрочки, коммуналка, подписки"
              accent="#ff5566"
              value={obligations}
              onChange={setObligations}
              min={0}
              max={400_000}
              step={2_000}
              unit="₸"
            />
            <Slider
              label="Цели накоплений"
              sub="ипотека, отпуск, подушка безопасности"
              accent="#3b9eff"
              value={goals}
              onChange={setGoals}
              min={0}
              max={300_000}
              step={2_000}
              unit="₸"
            />
            <Slider
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

            <div className="grid grid-cols-3 gap-3 pt-4">
              <Result label="Доступно" value={formatN(Math.max(available, 0))} unit="₸" />
              <Result label="Дней" value={String(daysLeft)} unit="" />
              <Result
                label="На сегодня"
                value={formatN(dailyLimit)}
                unit="₸"
                highlight
              />
            </div>

            <p className="text-xs text-text-dim">
              Формула: (Баланс − Обязательства − Цели) ÷ Дней до зарплаты. Пересчитывается каждую
              ночь.
            </p>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative mx-auto w-full max-w-[320px]">
              <div
                className="pointer-events-none absolute -inset-10 -z-10 rounded-full opacity-40 blur-3xl"
                style={{
                  background:
                    'radial-gradient(circle, rgba(59,232,176,0.35) 0%, transparent 70%)',
                }}
              />
              <TodayMockup
                amount={Math.max(dailyLimit, 0)}
                spent={0}
                zone={zone}
                streak={14}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Slider({
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
  const trackColor = accent === 'white' ? '#f3f5f7' : accent
  return (
    <div>
      <div className="mb-2 flex items-end justify-between">
        <div>
          <p className="text-sm font-medium text-text">{label}</p>
          {sub && <p className="text-xs text-text-dim">{sub}</p>}
        </div>
        <p className="num-display text-lg font-semibold text-text">
          {formatN(value)}
          {unit && <span className="ml-1 text-sm text-text-muted">{unit}</span>}
        </p>
      </div>
      <div className="relative h-2 rounded-full bg-white/5">
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ width: `${pct}%`, background: trackColor }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full cursor-pointer opacity-0"
        />
        <div
          className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink bg-white shadow-lg"
          style={{ left: `${pct}%` }}
        />
      </div>
    </div>
  )
}

function Result({
  label,
  value,
  unit,
  highlight,
}: {
  label: string
  value: string
  unit: string
  highlight?: boolean
}) {
  return (
    <div
      className={`rounded-2xl border px-4 py-3 ${
        highlight ? 'border-mint/30 bg-mint/[0.04]' : 'border-line bg-white/[0.02]'
      }`}
    >
      <p className="text-[10px] uppercase tracking-[0.18em] text-text-dim">{label}</p>
      <p className="num-display mt-1 text-xl font-bold">
        <span className={highlight ? 'grad-text' : 'text-text'}>{value}</span>
        {unit && <span className="ml-1 text-sm text-text-muted">{unit}</span>}
      </p>
    </div>
  )
}
