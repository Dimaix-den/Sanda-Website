import { useState } from 'react'
import {
  CapitalMockup,
  CommitmentsMockup,
  GoalsMockup,
  TodayMockup,
} from '../mockups/AppMockups'

type TabKey = 'today' | 'commit' | 'goals' | 'capital'

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
    title: 'Главный экран',
    text: 'Крупное число, стрик и кнопка добавления расхода. Больше ничего не нужно, чтобы принять решение.',
    bullets: [
      'Зелёный — в безопасной зоне',
      'Оранжевый — близко к границе',
      'Красный — вышел за лимит, пересчет лимита',
    ],
  },
  {
    key: 'commit',
    label: 'Обязательства',
    title: 'Кредиты, рассрочки, подписки — в одном месте',
    text: 'Сумма вычитается из бюджета автоматически. Остаток после обязательств — это твои реальные деньги, разложенные по дням.',
    bullets: [
      'График погашения и дата платежа',
      'Досрочное погашение одним действием',
      'Подписки не теряются в общем балансе',
    ],
  },
  {
    key: 'goals',
    label: 'Цели и плановые расходы',
    title: 'Запланируй свой месяц и живи без неожиданностей',
    text: 'Купить шторы, заказать цветы, записаться на Beauty-процедуры — просто запиши сразу, Sanda всё запомнит и напомнит.',
    bullets: [
      'Любое количество параллельных целей',
      'Автоматическая бронь из бюджета',
      'Прогресс по каждой цели в моменте',
    ],
  },
  {
    key: 'capital',
    label: 'Капитал',
    title: 'Вся твоя картина за квартал и за год',
    text: 'Счета, сбережения, имущество и обязательства. Чистый капитал и динамика за выбранный период — чтобы видеть, растёшь ли ты финансово.',
    bullets: [
      'График капитала с касанием для точных значений',
      'Drill-down по активам и обязательствам',
      'Честная метрика успеха: не «сколько на кофе», а «вырос ли я»',
    ],
  },
]

/**
 * FeaturesSection — restructured to avoid the "text left / phone right"
 * silhouette that Hero owns.
 *
 * Layout (desktop):
 *   [ eyebrow + title + description ]        <- full-width intro
 *   [  bullets  |  phone  |  stats strip  ]  <- three-column stage
 *   [ horizontal mini-features scroll ]      <- unchanged
 *
 * Layout (mobile):
 *   intro → phone → bullets → stats
 * so the phone is centred and the columns wrap around it.
 */
export function FeaturesSection() {
  const [active, setActive] = useState<TabKey>('today')
  const current = tabs.find((t) => t.key === active)!

  return (
    <section id="features" className="border-b border-line py-16 md:py-24">
      {/*
       * Sticky tab bar: on mobile the tabs stick to the top of the viewport
       * as the user scrolls through the description, so they can jump between
       * features without losing context.
       * top-16 matches the 64px sticky Header so we don't cover it.
       */}
      <div className="sticky top-16 z-20 -mx-0 mb-10 border-b border-line bg-ink/85 px-5 py-3 backdrop-blur-xl md:static md:mx-auto md:max-w-6xl md:border-0 md:bg-transparent md:px-5 md:py-0 md:backdrop-blur-none">
        <div className="mx-auto max-w-6xl overflow-x-auto">
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

      <div className="mx-auto max-w-6xl px-5">
        {/* Intro block — sits above the stage, full width */}
        <div className="mb-8 max-w-3xl md:mb-12">
          <div className="eyebrow">Возможности</div>
          <h3 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl md:mt-5 md:text-4xl">
            {current.title}
          </h3>
          <p className="mt-3 max-w-xl text-text-muted md:mt-4">{current.text}</p>
        </div>

        {/*
         * Three-column stage: bullets | phone | companion card.
         * The phone is centred, which instantly reads as a different layout
         * from Hero and Try. On mobile we stack phone → bullets → companion.
         */}
        <div className="grid gap-8 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-10">
          {/* Bullets — order-2 on mobile so phone stays above them */}
          <div className="order-2 md:order-1">
            <p className="text-[10px] uppercase tracking-[0.2em] text-mint">
              Что внутри
            </p>
            <ul className="mt-4 space-y-3.5">
              {current.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 rounded-2xl border border-line bg-white/[0.02] px-3.5 py-3 transition hover:border-line-strong"
                >
                  <span
                    className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-mint"
                    aria-hidden
                  />
                  <span className="text-sm text-text md:text-[15px]">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Phone — centre stage, decorative glow */}
          <div className="relative order-1 mx-auto w-full max-w-[300px] md:order-2 md:max-w-[320px]">
            <div
              className="pointer-events-none absolute -inset-12 -z-10 rounded-full opacity-50 blur-3xl"
              style={{
                background:
                  'radial-gradient(circle, rgba(59,158,255,0.35) 0%, transparent 70%)',
              }}
              aria-hidden
            />
            {active === 'today' && <TodayMockup zone="safe" amount={12400} />}
            {active === 'commit' && <CommitmentsMockup />}
            {active === 'goals' && <GoalsMockup />}
            {active === 'capital' && <CapitalMockup />}
          </div>

          {/*
           * Companion card — different content per tab to match the feature
           * being shown. Keeps the right side from being empty without
           * repeating "another list of bullets".
           */}
          <div className="order-3 md:order-3">
            <CompanionCard tab={current.key} />
          </div>
        </div>
      </div>

      {/*
       * Mini-features as a horizontal snap carousel on all viewports.
       * On mobile the strip bleeds to the viewport edges; on desktop
       * the scrolling still works but the row is comfortably wide.
       */}
      <div className="mt-14 md:mt-20">
        <div className="mx-auto mb-4 max-w-6xl px-5">
          <p className="text-sm text-text-dim">Дополнительные плюшки</p>
        </div>
        <div
          className="hscroll hscroll-bleed mx-auto max-w-6xl"
          style={{ scrollPaddingInline: '1.25rem' }}
        >
          <MiniFeature
            icon="📅"
            title="Планирование бюджета"
            text="Бюджет задаётся заранее и раскладывается по дням до зарплаты. Никаких постфактум-сводок."
          />
          <MiniFeature
            icon="🔥"
            title="Стрики дисциплины"
            text="Счётчик дней подряд в лимите. Геймификация без упрёков — только мотивация продолжать."
          />
          <MiniFeature
            icon="🌍"
            title="Мультивалютность"
            text="Тенге, рубли, доллары, евро. Кастомный период бюджета — от зарплаты до зарплаты."
          />
          <MiniFeature
            icon="📱"
            title="Виджеты и Apple Watch"
            text="Дневной лимит на экране блокировки и на запястье. Быстрый взгляд — и дальше жить."
          />
          <MiniFeature
            icon="🔒"
            title="Приватность как принцип"
            text="Вход через Apple ID, гостевой режим с данными только на устройстве, полное удаление."
          />
          <MiniFeature
            icon="🌙"
            title="Тёмная тема и iOS-душа"
            text="Крупные цифры, SF-шрифт, спокойные анимации, Dynamic Island — как у родных приложений."
          />
        </div>
      </div>
    </section>
  )
}

/**
 * Per-tab companion card. Each variant picks a different metaphor so the
 * right-hand column doesn't feel like filler.
 */
function CompanionCard({ tab }: { tab: TabKey }) {
  if (tab === 'today') {
    return (
      <div className="rounded-3xl border border-line bg-white/[0.02] p-5">
        <p className="text-[10px] uppercase tracking-[0.2em] text-text-dim">
          Пример цвета
        </p>
        <div className="mt-3 space-y-2">
          <ZoneRow color="#3be8b0" label="Зелёный" hint="Можешь тратить свободно" />
          <ZoneRow color="#f5a623" label="Оранжевый" hint="Притормози — сегодня ещё хватит" />
          <ZoneRow color="#ff5566" label="Красный" hint="Завтра лимит будет меньше" />
        </div>
      </div>
    )
  }
  if (tab === 'commit') {
    return (
      <div className="rounded-3xl border border-line bg-white/[0.02] p-5">
        <p className="text-[10px] uppercase tracking-[0.2em] text-text-dim">
          Экономия за год
        </p>
        <p className="num-display mt-2 text-4xl font-black grad-text">
          ~84 000 ₸
        </p>
        <p className="mt-2 text-xs text-text-muted">
          Средняя сумма, которую пользователи досрочно гасят в рассрочках за
          первые 12 месяцев с Sanda.
        </p>
        <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full w-[68%] rounded-full"
            style={{
              background: 'linear-gradient(90deg, #3be8b0 0%, #3b9eff 100%)',
            }}
          />
        </div>
      </div>
    )
  }
  if (tab === 'goals') {
    return (
      <div className="rounded-3xl border border-line bg-white/[0.02] p-5">
        <p className="text-[10px] uppercase tracking-[0.2em] text-text-dim">
          Активные цели
        </p>
        <div className="mt-3 space-y-3">
          <GoalBar emoji="🏠" label="Первый взнос" pct={39} />
          <GoalBar emoji="✈️" label="Отпуск" pct={48} />
          <GoalBar emoji="🛟" label="Подушка" pct={69} />
        </div>
      </div>
    )
  }
  // capital
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

function GoalBar({
  emoji,
  label,
  pct,
}: {
  emoji: string
  label: string
  pct: number
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-2">
          <span>{emoji}</span>
          <span className="text-text">{label}</span>
        </span>
        <span className="num-display text-text-muted">{pct}%</span>
      </div>
      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #3be8b0 0%, #3b9eff 100%)',
          }}
        />
      </div>
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
    <div className="w-[260px] rounded-2xl border border-line bg-white/[0.02] p-5 md:w-[300px]">
      <div className="mb-3 text-2xl">{icon}</div>
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-sm text-text-muted">{text}</p>
    </div>
  )
}