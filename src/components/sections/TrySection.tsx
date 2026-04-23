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

  return (
    <section
      id="try"
      className="relative border-b border-line px-5 py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl md:mb-12">
         <div className="eyebrow">Как работает · Попробуй</div>
         <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:mt-5 md:text-5xl">
           Вноси данные и смотри,{' '}
           <span className="grad-text">твой бюджет на сегодня</span>
         </h2>
         <p className="mt-4 text-text-muted md:mt-5">
           Заноси баланс, обязательства и цели. Sanda учитывай все твои расходы, доходы, планы, обязательства к выплате и цели по сбережениям
         </p>
        </div>

        <div className="mb-8 overflow-x-auto md:mb-10">
         <div className="flex min-w-max items-center gap-1.5 pb-1">
           <FormulaChip color="white">Баланс</FormulaChip>
           <span className="text-text-dim">−</span>
           <FormulaChip color="danger">Обязательства</FormulaChip>
           <span className="text-text-dim">−</span>
           <FormulaChip color="sky">Цели</FormulaChip>
           <span className="mx-1 text-text-dim">÷</span>
           <FormulaChip color="mint">Дни до зарплаты</FormulaChip>
           <span className="mx-1 text-text-dim">=</span>
           <span className="grad-text text-lg font-bold md:text-xl">Сегодня</span>
         </div>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[1fr_380px] lg:gap-12">
          <div className="order-2 space-y-6 lg:order-1">
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
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative mx-auto w-full max-w-[300px] h-[380px] overflow-hidden md:h-auto md:max-w-[340px]">
              {/* Градиентная маска для плавной обрезки снизу на мобильных */}
              <div className="absolute inset-0 -z-10 md:hidden mask-gradient-fade" />
              
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

// Добавьте этот CSS класс в ваш глобальный stylesheet
/*
.mask-gradient-fade {
  mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
}
*/

function FormulaChip({
  children,
  color,
}: {
  children: React.ReactNode
  color: 'white' | 'mint' | 'sky' | 'danger'
}) {
  const map: Record<string, string> = {
    white: 'border-white/15 bg-white/[0.04] text-white',
    mint: 'border-mint/30 bg-mint/[0.08] text-mint',
    sky: 'border-sky/30 bg-sky/[0.08] text-sky',
    danger: 'border-danger/30 bg-danger/[0.08] text-danger',
  }
  return (
    <span
      className={`whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-medium md:px-3 md:py-1.5 md:text-sm ${map[color]}`}
    >
      {children}
    </span>
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
      <div className="mb-2 flex items-end justify-between gap-3">
        <div className="min-w-0">
         <p className="text-sm font-medium text-text">{label}</p>
         {sub && <p className="text-xs text-text-dim">{sub}</p>}
        </div>
        <p className="num-display whitespace-nowrap text-lg font-semibold text-text">
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
      className={`rounded-2xl border px-3 py-2.5 md:px-4 md:py-3 ${
        highlight ? 'border-mint/30 bg-mint/[0.04]' : 'border-line bg-white/[0.02]'
      }`}
    >
      <p className="text-[9px] uppercase tracking-[0.18em] text-text-dim md:text-[10px]">
        {label}
      </p>
      <p className="num-display mt-1 text-lg font-bold md:text-xl">
        <span className={highlight ? 'grad-text' : 'text-text'}>{value}</span>
        {unit && <span className="ml-1 text-sm text-text-muted">{unit}</span>}
      </p>
    </div>
  )
}
