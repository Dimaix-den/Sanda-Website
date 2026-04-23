import { PhoneFrame, StatusBar } from './PhoneFrame'

function formatKZT(n: number) {
  return new Intl.NumberFormat('ru-RU').format(Math.round(n))
}

type Zone = 'safe' | 'warn' | 'over'

function zoneColor(zone: Zone) {
  switch (zone) {
    case 'safe':
      return '#3be8b0'
    case 'warn':
      return '#f5a623'
    case 'over':
      return '#ff5566'
  }
}

export function TodayMockup({
  amount = 12400,
  spent = 0,
  streak = 14,
  currency = '₸',
  zone = 'safe',
}: {
  amount?: number
  spent?: number
  streak?: number
  currency?: string
  zone?: Zone
}) {
  const color = zoneColor(zone)
  const remaining = Math.max(amount - spent, 0)
  const progress = Math.min(spent / amount, 1)

  return (
    <PhoneFrame>
      <StatusBar />
      <div className="flex h-full flex-col px-4 pt-5 pb-4 text-white">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
              Сегодня · 23 апреля
            </p>
            <p className="mt-0.5 text-[13px] font-medium text-white/70">
              Можешь потратить
            </p>
          </div>
          <div
            className="flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold"
            style={{ background: 'rgba(59,232,176,0.12)', color: '#3be8b0' }}
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full pulse-dot" style={{ background: '#3be8b0' }} />
            Стрик {streak} дн
          </div>
        </div>

        <div>
          <div className="relative">
            <div className="num-display text-[48px] font-bold leading-none tracking-tight" style={{ color }}>
              {formatKZT(remaining)}
              <span className="ml-1 text-[22px] text-white/50">{currency}</span>
            </div>
            <p className="mt-1.5 text-[11px] text-white/50">из {formatKZT(amount)} {currency} на день</p>
          </div>

          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${progress * 100}%`,
                background: `linear-gradient(90deg, ${color} 0%, ${color}AA 100%)`,
              }}
            />
          </div>

          <div className="mt-3 grid grid-cols-2 gap-1.5">
            <MiniStat label="Баланс" value={`485 200 ${currency}`} />
            <MiniStat label="До зарплаты" value="8 дней" />
            <MiniStat label="Обязательства" value={`142 000 ${currency}`} />
            <MiniStat label="Цели" value={`50 000 ${currency}`} />
          </div>

          <div className="mt-3 rounded-2xl border border-white/5 bg-white/[0.03] p-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/40">План на месяц</p>
              <p className="text-[10px] font-semibold text-mint">68% пути</p>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full"
                style={{ width: '68%', background: 'linear-gradient(90deg, #3be8b0 0%, #3b9eff 100%)' }}
              />
            </div>
            <p className="mt-2 text-[11px] text-white/60">Идёшь по плану — до зарплаты спокойно</p>
          </div>
        </div>

        <button
          className="mt-auto flex h-10 w-full flex-shrink-0 items-center justify-center gap-1.5 rounded-full text-[13px] font-semibold text-black"
          style={{ background: 'linear-gradient(110deg, #3be8b0 0%, #3b9eff 100%)' }}
        >
          <span className="text-base leading-none">＋</span> Добавить расход
        </button>
        <div className="mt-2 flex flex-shrink-0 justify-center">
          <div className="h-1 w-20 rounded-full bg-white/30" />
        </div>
      </div>
    </PhoneFrame>
  )
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.03] px-2.5 py-1.5">
      <p className="text-[9px] uppercase tracking-[0.14em] text-white/40">{label}</p>
      <p className="mt-0.5 text-[11px] font-semibold text-white/90">{value}</p>
    </div>
  )
}

export function CapitalMockup() {
  const points = [20, 25, 23, 30, 35, 34, 42, 48, 55, 62, 68, 74]
  const max = Math.max(...points)
  const min = Math.min(...points)
  const w = 280
  const h = 110
  const step = w / (points.length - 1)
  const path = points
    .map((p, i) => {
      const x = i * step
      const y = h - ((p - min) / (max - min)) * h
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')
  const area = `${path} L ${w} ${h} L 0 ${h} Z`

  return (
    <PhoneFrame>
      <StatusBar />
      <div className="flex h-full flex-col px-4 pt-5 pb-4 text-white">
        <div className="mb-3">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Капитал</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="num-display text-[30px] font-bold">2 480 500</span>
            <span className="text-[14px] text-white/50">₸</span>
          </div>
          <div className="mt-1 flex items-center gap-2 text-[11px]">
            <span className="text-mint">▲ 12,4%</span>
            <span className="text-white/40">за 6 мес</span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-2.5">
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="capGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#3be8b0" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#3be8b0" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="capLine" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#3be8b0" />
                <stop offset="100%" stopColor="#3b9eff" />
              </linearGradient>
            </defs>
            <path d={area} fill="url(#capGrad)" />
            <path d={path} fill="none" stroke="url(#capLine)" strokeWidth="2" />
            <circle
              cx={(points.length - 1) * step}
              cy={h - ((points[points.length - 1] - min) / (max - min)) * h}
              r="4"
              fill="#3be8b0"
            />
          </svg>
          <div className="mt-1.5 flex justify-between text-[9px] text-white/30">
            <span>Ноя</span>
            <span>Дек</span>
            <span>Янв</span>
            <span>Фев</span>
            <span>Мар</span>
            <span>Апр</span>
          </div>
        </div>

        <div className="mt-3 space-y-1.5">
          <AssetRow icon="🏦" name="Kaspi Gold" value="485 200 ₸" />
          <AssetRow icon="💎" name="Накопления" value="780 000 ₸" />
          <AssetRow icon="🏠" name="Имущество" value="1 500 000 ₸" />
          <AssetRow icon="💳" name="Обязательства" value="−284 700 ₸" negative />
        </div>

        <div className="mt-auto flex flex-shrink-0 justify-center pt-2">
          <div className="h-1 w-20 rounded-full bg-white/30" />
        </div>
      </div>
    </PhoneFrame>
  )
}

function AssetRow({
  icon,
  name,
  value,
  negative,
}: {
  icon: string
  name: string
  value: string
  negative?: boolean
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] px-2.5 py-1.5">
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/5 text-[12px]">
          {icon}
        </div>
        <p className="text-[11px] font-medium">{name}</p>
      </div>
      <p className={`num-display text-[11px] font-semibold ${negative ? 'text-danger' : 'text-white/90'}`}>
        {value}
      </p>
    </div>
  )
}

export function GoalsMockup() {
  return (
    <PhoneFrame>
      <StatusBar />
      <div className="flex h-full flex-col px-4 pt-5 pb-4 text-white">
        <div className="mb-3">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Цели</p>
          <p className="mt-1 text-[20px] font-semibold">Прогресс апреля</p>
        </div>

        <div className="space-y-2">
          <GoalCard name="Ипотека — первый взнос" amount="780 000" target="2 000 000" progress={0.39} emoji="🏠" eta="Ноябрь 2026" />
          <GoalCard name="Отпуск в Турцию" amount="145 000" target="300 000" progress={0.48} emoji="✈️" eta="Июль 2026" />
          <GoalCard name="Новый ноутбук" amount="210 000" target="450 000" progress={0.46} emoji="💻" eta="Сентябрь 2026" />
          <GoalCard name="Подушка безопасности" amount="520 000" target="750 000" progress={0.69} emoji="🛟" eta="Август 2026" />
        </div>

        <div className="mt-3 rounded-2xl border border-white/5 bg-white/[0.03] px-3 py-2">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/40">Зарезервировано из бюджета</p>
          <p className="num-display mt-0.5 text-[16px] font-semibold">50 000 ₸ / мес</p>
        </div>

        <div className="mt-auto flex flex-shrink-0 justify-center pt-2">
          <div className="h-1 w-20 rounded-full bg-white/30" />
        </div>
      </div>
    </PhoneFrame>
  )
}

function GoalCard({
  name,
  amount,
  target,
  progress,
  emoji,
  eta,
}: {
  name: string
  amount: string
  target: string
  progress: number
  emoji: string
  eta: string
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-[13px]">
            {emoji}
          </div>
          <div>
            <p className="text-[11px] font-medium">{name}</p>
            <p className="text-[9px] text-white/40">к {eta}</p>
          </div>
        </div>
        <p className="num-display text-[10px] font-semibold text-white/80">
          {amount}<span className="text-white/30"> / {target}</span>
        </p>
      </div>
      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full"
          style={{
            width: `${progress * 100}%`,
            background: 'linear-gradient(90deg, #3be8b0 0%, #3b9eff 100%)',
          }}
        />
      </div>
    </div>
  )
}

export function CommitmentsMockup() {
  return (
    <PhoneFrame>
      <StatusBar />
      <div className="flex h-full flex-col px-4 pt-5 pb-4 text-white">
        <div className="mb-3">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Обязательства</p>
          <p className="mt-1 text-[20px] font-semibold">142 000 ₸ / мес</p>
          <p className="mt-0.5 text-[10px] text-white/40">Автоматически вычитаются из лимита</p>
        </div>

        <div className="space-y-2">
          <ObligationCard icon="🏦" name="Ипотека" sum="78 000 ₸" left="4 года 2 мес" progress={0.24} due="до 15 числа" />
          <ObligationCard icon="🚗" name="Авто в рассрочку" sum="42 000 ₸" left="14 мес" progress={0.58} due="до 20 числа" />
          <ObligationCard icon="📱" name="iPhone 15 — рассрочка" sum="18 500 ₸" left="6 мес" progress={0.74} due="до 5 числа" />
          <ObligationCard icon="📺" name="Подписки" sum="3 500 ₸" left="ежемесячно" progress={1} due="—" subscription />
        </div>

        <div className="mt-3 rounded-2xl border border-mint/20 bg-mint/[0.06] p-2.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-mint">Закрыто досрочно</p>
              <p className="num-display mt-0.5 text-[14px] font-semibold">− 3 месяца</p>
            </div>
            <button className="rounded-full border border-mint/30 px-3 py-1 text-[10px] font-semibold text-mint">
              Погасить
            </button>
          </div>
        </div>

        <div className="mt-auto flex flex-shrink-0 justify-center pt-2">
          <div className="h-1 w-20 rounded-full bg-white/30" />
        </div>
      </div>
    </PhoneFrame>
  )
}

function ObligationCard({
  icon,
  name,
  sum,
  left,
  progress,
  due,
  subscription,
}: {
  icon: string
  name: string
  sum: string
  left: string
  progress: number
  due: string
  subscription?: boolean
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-[13px]">
            {icon}
          </div>
          <div>
            <p className="text-[11px] font-medium">{name}</p>
            <p className="text-[9px] text-white/40">{subscription ? left : `осталось ${left}`}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="num-display text-[11px] font-semibold">{sum}</p>
          <p className="text-[9px] text-white/40">{due}</p>
        </div>
      </div>
      {!subscription && (
        <div className="mt-1.5 h-0.5 overflow-hidden rounded-full bg-white/5">
          <div className="h-full rounded-full bg-white/40" style={{ width: `${progress * 100}%` }} />
        </div>
      )}
    </div>
  )
}

/**
 * Budget planning mockup — replaces the "categories" feature card.
 * Shows monthly budget plan, allocation to goals/obligations, remaining per day.
 */
export function PlanMockup() {
  return (
    <PhoneFrame>
      <StatusBar />
      <div className="flex h-full flex-col px-4 pt-5 pb-4 text-white">
        <div className="mb-3">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">План на апрель</p>
          <p className="mt-1 text-[20px] font-semibold">Бюджет разложен</p>
          <p className="mt-0.5 text-[10px] text-white/40">Куда пойдут твои деньги в этом месяце</p>
        </div>

        <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-3">
          <div className="flex items-baseline justify-between">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/40">Доход</p>
            <p className="num-display text-[14px] font-semibold">520 000 ₸</p>
          </div>
          <div className="mt-2.5 flex h-2 w-full overflow-hidden rounded-full bg-white/5">
            <div className="h-full" style={{ width: '27%', background: '#ff5566' }} />
            <div className="h-full" style={{ width: '10%', background: '#3b9eff' }} />
            <div className="h-full" style={{ width: '63%', background: '#3be8b0' }} />
          </div>
          <div className="mt-2 space-y-1">
            <LegendRow color="#ff5566" label="Обязательства" value="142 000 ₸" pct="27%" />
            <LegendRow color="#3b9eff" label="Цели" value="50 000 ₸" pct="10%" />
            <LegendRow color="#3be8b0" label="На жизнь" value="328 000 ₸" pct="63%" />
          </div>
        </div>

        <div className="mt-3 rounded-2xl border border-mint/20 bg-mint/[0.06] p-2.5">
          <p className="text-[10px] uppercase tracking-[0.18em] text-mint">Дневной лимит</p>
          <p className="num-display mt-0.5 text-[20px] font-bold">
            12 400 <span className="text-[14px] text-white/50">₸/день</span>
          </p>
          <p className="mt-0.5 text-[10px] text-white/50">по 26 дней до зарплаты</p>
        </div>

        <div className="mt-3 rounded-2xl border border-white/5 bg-white/[0.03] p-2.5">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/40">Сценарии</p>
          <div className="mt-2 space-y-1.5">
            <ScenarioRow icon="🎯" label="Добавить цель на отпуск" hint="+30 000 ₸ резерв" />
            <ScenarioRow icon="⏱" label="Отложить крупную покупку" hint="+2 100 ₸ к лимиту" />
          </div>
        </div>

        <div className="mt-auto flex flex-shrink-0 justify-center pt-2">
          <div className="h-1 w-20 rounded-full bg-white/30" />
        </div>
      </div>
    </PhoneFrame>
  )
}

function LegendRow({
  color,
  label,
  value,
  pct,
}: {
  color: string
  label: string
  value: string
  pct: string
}) {
  return (
    <div className="flex items-center justify-between text-[11px]">
      <div className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
        <span className="text-white/70">{label}</span>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="num-display font-semibold text-white/90">{value}</span>
        <span className="text-[9px] text-white/40">{pct}</span>
      </div>
    </div>
  )
}

function ScenarioRow({ icon, label, hint }: { icon: string; label: string; hint: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-[12px]">{icon}</span>
        <p className="text-[11px] text-white/80">{label}</p>
      </div>
      <p className="text-[10px] text-mint">{hint}</p>
    </div>
  )
}
