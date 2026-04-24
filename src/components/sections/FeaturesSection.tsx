import { useState } from 'react'
import {
  CapitalMockup,
  PlanMockup,
  TodayMockup,
} from '../mockups/AppMockups'
import { StatsMockup } from '../mockups/StatsMockup'

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
    title: 'Главный экран',
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
    text: 'Здесь ты ведёшь всё, что у тебя есть и что ты должен. Активные счета, накопления, недвижимость, кредиты — единая картина чистого капитала.',
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
    text: 'Капитал, денежный поток, динамика расходов и доходов, накоплений и прочее — за день, неделю, месяц или год. Данные собираются автоматически из твоих счетов.',
    bullets: [
      'Тратишь ли ты меньше, чем получаешь — одним числом',
      'Динамика расходов и доходов за любой период',
      'Рост капитала и накоплений от месяца к месяцу',
    ],
  },
]

/**
 * FeaturesSection — three-column stage (bullets | phone | companion).
 *
 * Mobile tweak: the phone is clipped to ~50% height with a bottom gradient
 * fade so the mockup reads as a peek, not a full-height billboard that
 * blows out the scroll.
 */
export function FeaturesSection() {
  const [active, setActive] = useState<TabKey>('today')
  const current = tabs.find((t) => t.key === active)!

  return (
    <section id="features" className="border-b border-line py-20 md:py-24">
      {/*
       * Sticky tab bar — on mobile sticks under the 64px header so the
       * user can swap tabs without losing context. Scroll track hidden.
       */}
      <div className="sticky top-16 z-20 -mx-0 mb-10 border-b border-line bg-ink/85 px-5 py-3 backdrop-blur-xl md:static md:mx-auto md:max-w-6xl md:border-0 md:bg-transparent md:px-5 md:py-0 md:backdrop-blur-none">
        <div className="mx-auto max-w-6xl overflow-x-auto no-scrollbar">
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
        {/* Intro block — full width above the stage */}
        <div className="mb-8 max-w-3xl md:mb-12">
          <div className="eyebrow">Возможности</div>
          <h3 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl md:mt-5 md:text-4xl">
            {current.title}
          </h3>
          <p className="mt-3 max-w-xl text-text-muted md:mt-4">{current.text}</p>
        </div>

        {/*
         * Three-column stage: bullets | phone | companion card.
         * Mobile: phone → bullets → companion. Phone gets clipped with a
         * fade-out mask on mobile so it reads as a preview.
         */}
        <div className="grid gap-8 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-10">
          {/* Bullets — order-2 on mobile so the phone appears first */}
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

          {/*
           * Phone wrapper:
           *   mobile → .phone-cut-half (fixed visual height ~ half the phone,
           *            gradient mask fades to transparent at the bottom)
           *   desktop → unclipped, .md:phone-cut-none resets it
           */}
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
           * Companion card — different content per tab to avoid another
           * list of bullets on the right.
           */}
          <div className="order-3 md:order-3">
            <CompanionCard tab={current.key} />
          </div>
        </div>
      </div>

      {/*
       * Mini-features horizontal carousel. Scrollbar hidden via .no-scrollbar
       * (handled by .hscroll itself, but we keep it explicit on mobile).
       */}
      <div className="mt-16 md:mt-20">
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

function CompanionCard({ tab }: { tab: TabKey }) {
  if (tab === 'today') {
    return (
      <div className="rounded-3xl border border-line bg-white/[0.02] p-5">
        <p className="text-[10px] uppercase tracking-[0.2em] text-text-dim">
          Цветовые зоны
        </p>
        <div className="mt-3 space-y-2">
          <ZoneRow color="#3be8b0" label="Зелёный" hint="Можешь тратить свободно" />
          <ZoneRow color="#f5a623" label="Оранжевый" hint="Притормози — сегодня ещё хватит" />
          <ZoneRow color="#ff5566" label="Красный" hint="Завтра лимит будет меньше" />
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
      <p className="text-[10px] uppercase tracking-[0.2em] text-text-dim">
        За апрель
      </p>
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
    <div className="w-[260px] rounded-2xl border border-line bg-white/[0.02] p-5 md:w-[300px]">
      <div className="mb-3 text-2xl">{icon}</div>
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-sm text-text-muted">{text}</p>
    </div>
  )
}