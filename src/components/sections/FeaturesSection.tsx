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
    text: 'Купить шторы, заказать цветы, записаться на Beauty-процедуры - просто запиши сразу, Sanda все запомнит и напомнит',
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
      <div className="sticky top-16 z-20 -mx-0 mb-8 border-b border-line bg-ink/85 px-5 py-3 backdrop-blur-xl md:static md:mx-auto md:max-w-6xl md:border-0 md:bg-transparent md:px-5 md:py-0 md:backdrop-blur-none">
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
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_380px] lg:gap-12">
          <div>
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              {current.title}
            </h3>
            <p className="mt-4 max-w-xl text-text-muted">{current.text}</p>
            <ul className="mt-5 space-y-3 md:mt-6">
              {current.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-mint" />
                  <span className="text-text">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-[300px] md:max-w-[340px]">
            <div
              className="pointer-events-none absolute -inset-10 -z-10 rounded-full opacity-40 blur-3xl"
              style={{
                background:
                  'radial-gradient(circle, rgba(59,158,255,0.35) 0%, transparent 70%)',
              }}
            />
            {active === 'today' && <TodayMockup zone="safe" amount={12400} />}
            {active === 'commit' && <CommitmentsMockup />}
            {active === 'goals' && <GoalsMockup />}
            {active === 'capital' && <CapitalMockup />}
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
          <p className="text-sm text-text-dim">И ещё — свайпни ←</p>
        </div>
        <div className="hscroll hscroll-bleed mx-auto max-w-6xl" style={{ scrollPaddingInline: '1.25rem' }}>
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
