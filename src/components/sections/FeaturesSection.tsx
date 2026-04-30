import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { CapitalMockup, PlanMockup, TodayMockup } from '../mockups/AppMockups'
import { StatsMockup } from '../mockups/StatsMockup'
import { Carousel } from './Carousel'
import { Reveal } from '../Reveal'

type TabKey = 'today' | 'plans' | 'capital' | 'stats'

const tabs: {
  key: TabKey
  label: string
  title: string
  text: string
  bullets: string[]
}[] = [
  {
    key: 'today',
    label: 'Сегодня',
    title: 'Экран "Сегодня"',
    text: 'Крупное число, стрик и кнопка добавления расхода. Больше ничего не нужно, чтобы принять решение.',
    bullets: [
      'Зелёный — в безопасной зоне',
      'Оранжевый — близко к границе',
      'Красный — вышел за лимит, пересчёт лимита',
    ],
  },
  {
    key: 'plans',
    label: 'Планы',
    title: 'Календарь трат на месяц вперёд',
    text: 'Можно запланировать расходы, доходы и выделить бюджет на месяц. Всё разложено по дням.',
    bullets: [
      'Регулярные расходы и доходы — раз в месяц или год',
      'Плановые крупные покупки — бюджет подстроится',
      'По сути календарь трат, а не список транзакций',
    ],
  },
  {
    key: 'capital',
    label: 'Капитал',
    title: 'Обязательства, сбережения, имущество и счета',
    text: 'Всё, что у тебя есть и что ты должен. Активные счета, накопления, недвижимость, кредиты.',
    bullets: [
      'Все счета и сбережения в одном месте',
      'Имущество и обязательства — как в балансе',
      'Чистый капитал и его динамика в моменте',
    ],
  },
  {
    key: 'stats',
    label: 'Статистика',
    title: 'Вся история твоих денег в одном разделе',
    text: 'Капитал, денежный поток, динамика расходов и доходов, накоплений. За любой период.',
    bullets: [
      'Тратишь ли ты меньше, чем получаешь',
      'Динамика расходов и доходов за любой период',
      'Рост капитала и накоплений от месяца к месяцу',
    ],
  },
]

function formatN(n: number) {
  return new Intl.NumberFormat('ru-RU').format(Math.max(0, Math.round(n)))
}

export function FeaturesSection() {
  const [active, setActive] = useState<TabKey>('today')
  const current = tabs.find((t) => t.key === active)!

  const income = 600_000
  const obligations = 80_000
  const goals = 100_000
  const monthlyBudgets = 100_000
  const plannedExpenses = 50_000
  const daysLeft = 28
  const available = income - obligations - goals - monthlyBudgets - plannedExpenses
  const dailyLimit = Math.max(available / Math.max(daysLeft, 1), 0)
  const zone: 'safe' | 'warn' | 'over' =
    available <= 0 ? 'over' : available < income * 0.15 ? 'warn' : 'safe'
  const zoneColor =
    zone === 'safe' ? '#3be8b0' : zone === 'warn' ? '#f5a623' : '#ff5566'
  const zoneLabel =
    zone === 'safe' ? 'В безопасной зоне' : zone === 'warn' ? 'Близко к границе' : 'Выше бюджета'

  const tabStrip = (
    <div className="overflow-x-auto no-scrollbar">
      <div className="flex min-w-max gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${
              active === t.key
                ? 'border-mint/40 bg-mint/[0.1] text-mint'
                : 'border-line bg-white/[0.02] text-text-muted hover:text-text'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  )

  const phoneMockup = (
    <>
      {active === 'today' && <TodayMockup zone="safe" amount={12400} />}
      {active === 'plans' && <PlanMockup />}
      {active === 'capital' && <CapitalMockup />}
      {active === 'stats' && <StatsMockup />}
    </>
  )

  return (
    <section id="features" className="py-16 md:py-20">

      {/* ── TrySection block ─────────────────────────────────── */}
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="mb-8 max-w-2xl md:mb-10">
            <div className="eyebrow">Удерживает в бюджете</div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:mt-5 md:text-5xl">
              Будь в курсе своих{' '}
              <span className="grad-text">финансовых возможностей</span>
            </h2>
            <p className="mt-4 text-text-muted md:mt-5">
              Sanda учитывает все твои планы и бюджеты на месяц, и помогает
              определить безопасную зону для ежедневных расходов
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-white/[0.04] via-white/[0.015] to-white/[0.04] p-5 md:p-8">
            <div
              className="pointer-events-none absolute -top-24 left-1/2 h-[320px] w-[320px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
              style={{ background: `radial-gradient(circle, ${zoneColor}55 0%, transparent 70%)` }}
              aria-hidden
            />
            <div className="relative grid gap-6 md:grid-cols-[1.1fr_1fr] md:gap-8">
              {/* LEFT — big number */}
              <div className="flex items-center justify-center text-center">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-text-dim">
                    Свободный бюджет на сегодня
                  </p>
                  <div className="mt-3 flex items-baseline justify-center gap-3">
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
                    <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: zoneColor }} />
                    {zoneLabel}
                  </div>
                </div>
              </div>

              {/* RIGHT — formula */}
              <div className="rounded-2xl border border-line bg-ink-2/60 p-4 md:p-5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-text-dim">Формула на сегодня</p>
                <div className="mt-3 space-y-2.5">
                  <FormulaRow color="#3be8b0" label="Доход" value={`${formatN(income)} ₸`} op="" />
                  <FormulaRow color="#ff5566" label="На обязательства" value={`−${formatN(obligations)} ₸`} op="−" />
                  <FormulaRow color="#3be8b0" label="В сбережения" value={`−${formatN(goals)} ₸`} op="−" />
                  <FormulaRow color="#f5a623" label="Бюджеты на месяц" value={`−${formatN(monthlyBudgets)} ₸`} op="−" />
                  <FormulaRow color="#f5a623" label="Плановые расходы" value={`−${formatN(plannedExpenses)} ₸`} op="−" />
                  <div className="border-t border-line pt-2.5">
                    <FormulaRow color="#3be8b0" label="Дни до зарплаты" value={`÷ ${daysLeft}`} op="÷" />
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-white/[0.04] px-3 py-2.5">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">Сегодня</span>
                    <span className="num-display text-lg font-bold" style={{ color: zoneColor }}>
                      {formatN(dailyLimit)} ₸
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ── Tabs + phone mockup ──────────────────────────────── */}
      <div className="mx-auto mt-16 max-w-6xl px-5 md:mt-20">

        {/* Desktop: eyebrow + tabs row */}
        <div className="mb-8 hidden items-center justify-between md:flex">
          <div className="eyebrow">Все, что нужно для роста</div>
          {tabStrip}
        </div>

        {/* ── MOBILE layout: phone (clipped) → tabs → text ─── */}
        <div className="md:hidden">
          {/* Phone with top-clip fade — shows only upper portion */}
          <div className="relative mx-auto w-full max-w-[300px]">
            <div
              className="pointer-events-none absolute -inset-12 -z-10 rounded-full opacity-50 blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(59,158,255,0.35) 0%, transparent 70%)' }}
              aria-hidden
            />
            {/* phone-cut-half clips bottom and fades — original behaviour */}
            <div className="phone-cut-half">
              {phoneMockup}
            </div>
          </div>

          {/* Tabs BETWEEN phone and text.
              position: relative + z-index needed because phone-cut-half
              uses margin-bottom: -64px which pulls the tab row up behind
              the phone's layout box — clicks would land on the phone div
              instead of the buttons without this stacking fix. */}
          <div className="relative z-10 mb-5 mt-4">{tabStrip}</div>

          {/* Text */}
          <div>
            <h3 className="text-xl font-bold tracking-tight">{current.title}</h3>
            <p className="mt-2 text-sm text-text-muted">{current.text}</p>
            <ul className="mt-4 space-y-2">
              {current.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 rounded-xl border border-line bg-white/[0.02] px-3.5 py-2.5">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-mint" aria-hidden />
                  <span className="text-sm text-text">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── DESKTOP layout: text | phone | companion ─────── */}
        <div className="hidden md:grid md:grid-cols-[minmax(0,1fr)_320px_minmax(0,1fr)] md:items-center md:gap-10">
          {/* Left text */}
          <div>
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-[28px] md:leading-tight">
              {current.title}
            </h3>
            <p className="mt-3 text-[15px] text-text-muted">{current.text}</p>
            <ul className="mt-5 space-y-2.5">
              {current.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 rounded-xl border border-line bg-white/[0.02] px-3.5 py-2.5 transition hover:border-line-strong">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-mint" aria-hidden />
                  <span className="text-sm text-text">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Centre phone — full on desktop */}
          <div className="relative mx-auto w-full max-w-[320px]">
            <div
              className="pointer-events-none absolute -inset-12 -z-10 rounded-full opacity-50 blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(59,158,255,0.35) 0%, transparent 70%)' }}
              aria-hidden
            />
            <div className="phone-cut-none">
              {phoneMockup}
            </div>
          </div>

          {/* Right companion */}
          <CompanionCard tab={current.key} />
        </div>
      </div>

      {/* ── Mini-features carousel (bleed) ──────────────────── */}
      <div className="mt-8 md:mt-10">
        <div className="mx-auto mb-3 flex max-w-6xl items-center justify-end px-5">
          <span aria-hidden className="swipe-hint text-text-dim lg:hidden">
            <ChevronRight size={18} strokeWidth={2.5} />
          </span>
        </div>
        <Carousel ariaLabel="Дополнительные плюшки" bleed padInline={20}>
          <MiniFeature icon="📅" title="Планирование бюджета" text="Бюджет задаётся заранее и раскладывается по дням до зарплаты." />
          <MiniFeature icon="🔥" title="Стрики дисциплины" text="Счётчик дней подряд в лимите. Геймификация без упрёков." />
          <MiniFeature icon="🌍" title="Мультивалютность" text="Тенге, рубли, доллары, евро. Кастомный период бюджета." />
          <MiniFeature icon="📱" title="Виджеты и Apple Watch" text="Дневной лимит на экране блокировки и на запястье." />
          <MiniFeature icon="🔒" title="Приватность как принцип" text="Apple ID, гостевой режим, полное удаление данных." />
          <MiniFeature icon="🌙" title="iOS-душа" text="SF-шрифт, спокойные анимации, Dynamic Island." />
        </Carousel>
      </div>
    </section>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FormulaRow({ color, label, value, op }: { color: string; label: string; value: string; op: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex min-w-0 items-center gap-2">
        <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center text-[11px] font-bold text-text-dim" aria-hidden>{op}</span>
        <span className="inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: color }} />
        <span className="truncate text-text-muted">{label}</span>
      </div>
      <span className="num-display whitespace-nowrap font-semibold text-text">{value}</span>
    </div>
  )
}

function MiniFeature({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="w-[220px] flex-shrink-0 rounded-2xl border border-line bg-white/[0.02] p-4">
      <div className="mb-2 text-2xl">{icon}</div>
      <p className="text-sm font-semibold leading-snug">{title}</p>
      <p className="mt-1.5 text-xs leading-relaxed text-text-muted">{text}</p>
    </div>
  )
}

function CompanionCard({ tab }: { tab: TabKey }) {
  if (tab === 'today') {
    return (
      <div className="rounded-3xl border border-line bg-white/[0.02] p-5">
        <p className="text-[10px] uppercase tracking-[0.2em] text-text-dim">Цветовые зоны</p>
        <div className="mt-3 space-y-2">
          <ZoneRow color="#3be8b0" label="Зелёный" hint="Можешь тратить свободно" />
          <ZoneRow color="#f5a623" label="Оранжевый" hint="Притормози — ещё хватит" />
          <ZoneRow color="#ff5566" label="Красный" hint="Завтра лимит уменьшится" />
        </div>
      </div>
    )
  }
  if (tab === 'plans') {
    return (
      <div className="rounded-3xl border border-line bg-white/[0.02] p-5">
        <p className="text-[10px] uppercase tracking-[0.2em] text-text-dim">Типы событий</p>
        <div className="mt-3 space-y-2">
          <PlanRow emoji="🔁" label="Каждый месяц" hint="Аренда, интернет, подписки" />
          <PlanRow emoji="📆" label="Раз в год" hint="ОСАГО, абонемент, налоги" />
          <PlanRow emoji="🎯" label="Разовая покупка" hint="Подарок, крупный чек" />
          <PlanRow emoji="💼" label="Доход" hint="Зарплата, бонус, фриланс" />
        </div>
      </div>
    )
  }
  if (tab === 'capital') {
    return (
      <div className="rounded-3xl border border-line bg-white/[0.02] p-5">
        <p className="text-[10px] uppercase tracking-[0.2em] text-text-dim">Чистый капитал</p>
        <p className="num-display mt-2 text-3xl font-black">2 480 500 ₸</p>
        <p className="mt-1 text-xs text-mint">▲ 12,4% за 6 мес</p>
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-xl border border-line bg-white/[0.02] px-3 py-2">
            <p className="text-text-dim">Активы</p>
            <p className="num-display mt-0.5 font-semibold">3 200 000 ₸</p>
          </div>
          <div className="rounded-xl border border-line bg-white/[0.02] px-3 py-2">
            <p className="text-text-dim">Обязательства</p>
            <p className="num-display mt-0.5 font-semibold">719 500 ₸</p>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="rounded-3xl border border-line bg-white/[0.02] p-5">
      <p className="text-[10px] uppercase tracking-[0.2em] text-text-dim">За последние 30 дней</p>
      <div className="mt-3 space-y-2">
        <StatRow label="Доходы" value="680 000 ₸" up />
        <StatRow label="Расходы" value="412 000 ₸" />
        <StatRow label="Сбережения" value="268 000 ₸" up />
        <StatRow label="Норма сбережений" value="39,4%" up />
      </div>
    </div>
  )
}

function ZoneRow({ color, label, hint }: { color: string; label: string; hint: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-white/[0.02] px-3 py-2">
      <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full" style={{ background: color }} />
      <div>
        <p className="text-xs font-medium">{label}</p>
        <p className="text-[11px] text-text-dim">{hint}</p>
      </div>
    </div>
  )
}

function PlanRow({ emoji, label, hint }: { emoji: string; label: string; hint: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-white/[0.02] px-3 py-2">
      <span>{emoji}</span>
      <div>
        <p className="text-xs font-medium">{label}</p>
        <p className="text-[11px] text-text-dim">{hint}</p>
      </div>
    </div>
  )
}

function StatRow({ label, value, up }: { label: string; value: string; up?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-line bg-white/[0.02] px-3 py-2">
      <p className="text-xs text-text-muted">{label}</p>
      <p className={`num-display text-xs font-semibold ${up ? 'text-mint' : 'text-text'}`}>{value}</p>
    </div>
  )
}
