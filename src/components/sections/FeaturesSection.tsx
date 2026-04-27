import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import {
  CapitalMockup,
  PlanMockup,
  TodayMockup,
} from '../mockups/AppMockups'
import { StatsMockup } from '../mockups/StatsMockup'
import { Carousel } from './Carousel'

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
    text: 'Можно запланировать расходы, доходы и выделить бюджет на месяц. Есть ежемесячные и ежегодные статьи — всё разложено по дням.',
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
    text: 'Всё, что у тебя есть и что ты должен. Активные счета, накопления, недвижимость, кредиты — единая картина чистого капитала.',
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
    text: 'Капитал, денежный поток, динамика расходов и доходов, накоплений. За день, неделю, месяц или год.',
    bullets: [
      'Тратишь ли ты меньше, чем получаешь',
      'Динамика расходов и доходов за любой период',
      'Рост капитала и накоплений от месяца к месяцу',
    ],
  },
]

/**
 * FeaturesSection (compact) — single-viewport stage on desktop.
 *
 * Desktop silhouette (≥ md):
 *   [ eyebrow + tabs row ]
 *   [ text+bullets col | phone | companion col ]
 *   [ mini-features horizontal scroll ]
 *
 * All three columns sit on ONE row, not stacked, so the section fits in
 * a viewport without the user scrolling mid-section. Intro text and
 * bullets live in the left column instead of their own row above.
 *
 * Mobile: phone → bullets+text → companion, phone clipped with fade.
 */
export function FeaturesSection() {
  const [active, setActive] = useState<TabKey>('today')
  const current = tabs.find((t) => t.key === active)!

  return (
    <section id="features" className="border-b border-line py-16 md:py-1">
      {/*
       * Section header: eyebrow + tabs on one compact row on desktop,
       * stacked and sticky on mobile. No separate title row before the
       * stage — the per-tab title moves into the left column below.
       */}
      <div className="sticky top-16 z-20 mb-6 border-b border-line bg-ink/85 px-5 py-3 backdrop-blur-xl md:static md:mx-auto md:mb-8 md:max-w-6xl md:border-0 md:bg-transparent md:px-5 md:py-0 md:backdrop-blur-none">
        {/*
         * Carousel sits inside the content column (max-w-6xl). No bleed,
         * no padInline — first card aligns with the site's left gutter,
         * matching the rest of the page grid.
         */}
        <div className="mx-auto max-w-6xl mb-48 px-5">
          <Carousel ariaLabel="Дополнительные плюшки">
          <MiniFeature
            icon="📅"
            title="Планирование бюджета"
            text="Бюджет задаётся заранее и раскладывается по дням до зарплаты."
          />
          <MiniFeature
            icon="🔥"
            title="Стрики дисциплины"
            text="Счётчик дней подряд в лимите. Геймификация без упрёков."
          />
          <MiniFeature
            icon="🌍"
            title="Мультивалютность"
            text="Тенге, рубли, доллары, евро. Кастомный период бюджета."
          />
          <MiniFeature
            icon="📱"
            title="Виджеты и Apple Watch"
            text="Дневной лимит на экране блокировки и на запястье."
          />
          <MiniFeature
            icon="🔒"
            title="Приватность как принцип"
            text="Apple ID, гостевой режим, полное удаление данных."
          />
          <MiniFeature
            icon="🌙"
            title="iOS-душа"
            text="SF-шрифт, спокойные анимации, Dynamic Island."
          />
        </Carousel>
        </div>

        <div className="mx-auto flex mt-15 max-w-6xl items-center gap-4 md:justify-between">
          
          <div className="hidden md:block">
            <div className="eyebrow">Все,что нужно для роста</div>
          </div>
          <div className="overflow-x-auto no-scrollbar md:flex-shrink-0">
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
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5">
        {/*
         * Three-column stage on desktop. Columns share vertical space with
         * the phone so no column forces the row to stretch.
         *
         * Column sizing chosen to let the phone hold its ~320px width
         * while the text columns get the rest of the 6xl (~1200px) grid:
         *   [1fr] [320px] [1fr]  on md+
         */}
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_320px_minmax(0,1fr)] md:items-center md:gap-10">
          {/* LEFT: title + description + bullets, all in one column on desktop */}
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-[28px] md:leading-tight">
              {current.title}
            </h3>
            <p className="mt-3 text-sm text-text-muted md:mt-3 md:text-[15px]">
              {current.text}
            </p>
            <ul className="mt-5 space-y-2.5 md:mt-5">
              {current.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 rounded-xl border border-line bg-white/[0.02] px-3.5 py-2.5 transition hover:border-line-strong"
                >
                  <span
                    className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-mint"
                    aria-hidden
                  />
                  <span className="text-sm text-text">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CENTER: phone. Mobile: clipped + faded. Desktop: full. */}
          <div className="relative order-1 mx-auto w-full max-w-[300px] md:order-2 md:max-w-[320px]">
            <div
              className="pointer-events-none absolute -inset-12 -z-10 rounded-full opacity-50 blur-3xl"
              style={{
                background:
                  'radial-gradient(circle, rgba(59,158,255,0.35) 0%, transparent 70%)',
              }}
              aria-hidden
            />
            <div className="phone-cut-half md:phone-cut-none">
              {active === 'today' && <TodayMockup zone="safe" amount={12400} />}
              {active === 'plans' && <PlanMockup />}
              {active === 'capital' && <CapitalMockup />}
              {active === 'stats' && <StatsMockup />}
            </div>
          </div>

          {/*
           * RIGHT: per-tab companion card — different metaphor per tab.
           * Hidden on mobile to reduce vertical clutter; the phone
           * mockup (cut in half with gradient fade) already conveys
           * the feature, the bullets list provides the details.
           */}
          <div className="order-3 hidden md:order-3 md:block">
            <CompanionCard tab={current.key} />
          </div>
        </div>
      </div>

      {/*
       * Mini-features carousel — edge-to-edge on desktop with arrow
       * buttons and mouse-drag, native inertial swipe on mobile.
       * On mobile a static chevron hint sits in the header row to
       * tell the user the row scrolls.
       */}
      <div className="mt-12 md:mt-14">
        <div className="mx-auto mb-3 flex max-w-6xl items-center justify-between px-5">
          <span
            aria-hidden
            className="swipe-hint text-text-dim lg:hidden"
          >
            <ChevronRight size={18} strokeWidth={2.5} />
          </span>
        </div>
        
      </div>
    </section>
  )
}

function CompanionCard({ tab }: { tab: TabKey }) {
  if (tab === 'today') {
    return (
      <div className="rounded-3xl border border-line bg-white/[0.02] p-5">
        <p className="text-[10px] uppercase tracking-[0.2em] text-text-dim">
          Цветовые зоны
        </p>
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
        <p className="text-[10px] uppercase tracking-[0.2em] text-text-dim">
          Типы событий
        </p>
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
        <p className="text-[10px] uppercase tracking-[0.2em] text-text-dim">
          Чистый капитал
        </p>
        <p className="num-display mt-2 text-3xl font-black">2 480 500 ₸</p>
        <p className="mt-1 text-xs text-mint">▲ 12,4% за 6 мес</p>
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-xl border border-line bg-white/[0.02] px-2.5 py-2">
            <p className="text-text-dim">Активы</p>
            <p className="num-display mt-0.5 font-semibold">2,77 млн</p>
          </div>
          <div className="rounded-xl border border-line bg-white/[0.02] px-2.5 py-2">
            <p className="text-text-dim">Обязательства</p>
            <p className="num-display mt-0.5 font-semibold text-danger">−285 тыс</p>
          </div>
        </div>
      </div>
    )
  }
  // stats
  return (
    <div className="rounded-3xl border border-line bg-white/[0.02] p-5">
      <p className="text-[10px] uppercase tracking-[0.2em] text-text-dim">За апрель</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <MiniStat big="+186к" label="Сальдо" accent="#3be8b0" />
        <MiniStat big="▲ 14%" label="К прошлому" accent="#3be8b0" />
        <MiniStat big="328к" label="Расходы" />
        <MiniStat big="514к" label="Доходы" />
      </div>
      <p className="mt-3 text-[11px] text-text-muted">
        Четыре периода: день, неделя, месяц, год.
      </p>
    </div>
  )
}

function ZoneRow({
  color,
  label,
  hint,
}: {
  color: string
  label: string
  hint: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-white/[0.02] px-3 py-2">
      <span
        className="inline-block h-2.5 w-2.5 flex-shrink-0 rounded-full"
        style={{ background: color }}
      />
      <div className="min-w-0">
        <p className="text-xs font-semibold" style={{ color }}>
          {label}
        </p>
        <p className="truncate text-[11px] text-text-muted">{hint}</p>
      </div>
    </div>
  )
}

function PlanRow({
  emoji,
  label,
  hint,
}: {
  emoji: string
  label: string
  hint: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-white/[0.02] px-3 py-2">
      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white/5 text-sm">
        {emoji}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-text">{label}</p>
        <p className="truncate text-[11px] text-text-muted">{hint}</p>
      </div>
    </div>
  )
}

function MiniStat({
  big,
  label,
  accent,
}: {
  big: string
  label: string
  accent?: string
}) {
  return (
    <div className="rounded-xl border border-line bg-white/[0.02] px-2.5 py-2">
      <p className="num-display text-base font-bold" style={{ color: accent }}>
        {big}
      </p>
      <p className="mt-0.5 text-[10px] text-text-muted">{label}</p>
    </div>
  )
}

function MiniFeature({
  icon,
  title,
  text,
}: {
  icon: string
  title: string
  text: string
}) {
  return (
    <div className="w-[240px] rounded-2xl border border-line bg-white/[0.02] p-4 md:w-[280px] md:p-5">
      <div className="mb-2 text-2xl">{icon}</div>
      <p className="text-sm font-semibold md:text-base">{title}</p>
      <p className="mt-1 text-xs text-text-muted md:text-sm">{text}</p>
    </div>
  )
}
