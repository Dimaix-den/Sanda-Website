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
    title: 'Главный экран — одна цифра и кнопка',
    text: 'Крупное число, цвет-индикатор и кнопка добавления расхода. Больше ничего не нужно, чтобы принять решение.',
    bullets: [
      'Зелёный — в безопасной зоне',
      'Оранжевый — близко к границе',
      'Красный — вышел за лимит, бюджет сам перестроится',
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
    label: 'Цели',
    title: 'Накопления идут без героических усилий',
    text: 'Цель «отпуск» или «ипотека» резервирует сумму из месячного бюджета и не попадает в дневной лимит. Ты видишь забронированные деньги и не залезаешь в них.',
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
    <section id="features" className="border-b border-line px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <div className="eyebrow">Возможности</div>
          <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
            Простота сверху. Глубина снизу.
          </h2>
          <p className="mt-5 text-text-muted">
            На главном экране одна цифра и быстрая кнопка. Статистика, капитал, аналитика — в
            отдельных разделах для тех, кому интересно.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                active === t.key
                  ? 'border-mint/40 bg-mint/[0.1] text-mint'
                  : 'border-line bg-white/[0.02] text-text-muted hover:text-text'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[1fr_380px]">
          <div>
            <h3 className="text-3xl font-bold tracking-tight md:text-4xl">
              {current.title}
            </h3>
            <p className="mt-4 max-w-xl text-text-muted">{current.text}</p>
            <ul className="mt-6 space-y-3">
              {current.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-mint" />
                  <span className="text-text">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-[320px]">
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

        <div className="mt-20 grid gap-4 md:grid-cols-3">
          <MiniFeature
            icon="📊"
            title="Статистика без боли"
            text="Категории — в отдельном разделе для любителей деталей. Главный экран от них свободен."
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
    <div className="rounded-2xl border border-line bg-white/[0.02] p-5">
      <div className="mb-3 text-2xl">{icon}</div>
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-sm text-text-muted">{text}</p>
    </div>
  )
}
