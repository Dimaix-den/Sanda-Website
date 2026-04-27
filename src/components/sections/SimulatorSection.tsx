import { useState } from 'react'
import { X } from 'lucide-react'
import { Reveal } from '../Reveal'

type Day = {
  label: string
  date: string
  base: number
  purchases: { name: string; amount: number }[]
}

const defaultDays: Day[] = [
  {
    label: 'Пн',
    date: '21 апр',
    base: 12000,
    purchases: [
      { name: 'Машина', amount: 4200 },
      { name: 'Расход', amount: 2800 },
    ],
  },
  { label: 'Вт', date: '22 апр', base: 12000, purchases: [] },
  { label: 'Ср', date: '23 апр', base: 12000, purchases: [] },
  { label: 'Чт', date: '24 апр', base: 12000, purchases: [] },
  { label: 'Пт', date: '25 апр', base: 12000, purchases: [] },
]

function formatN(n: number) {
  return new Intl.NumberFormat('ru-RU').format(Math.max(0, Math.round(n)))
}

/**
 * SimulatorSection — rolling budget playground.
 *
 * Changes vs previous version:
 *   1. Each added purchase has an X button to remove it individually.
 *   2. Section has a distinct background (darker ink-3 base + layered
 *      gradient glows + diagonal "graph paper" overlay) so the block
 *      visually stands apart from the grey-on-ink sections above and
 *      below. Keeps the mint/sky palette so it still reads as Sanda.
 */
export function SimulatorSection() {
  const [days, setDays] = useState<Day[]>(defaultDays)
  const [active, setActive] = useState(1)

  let rolling = 0
  const computed = days.map((d) => {
    const spent = d.purchases.reduce((s, p) => s + p.amount, 0)
    const adjusted = d.base + rolling
    const delta = adjusted - spent
    rolling = delta
    const zone: 'safe' | 'warn' | 'over' =
      adjusted <= 0 ? 'over' : adjusted < d.base * 0.3 ? 'warn' : 'safe'
    return { ...d, spent, adjusted, delta, zone }
  })

  const current = computed[active]

  function addPurchase(amount: number, name: string) {
    setDays((prev) => {
      const next = [...prev]
      next[active] = {
        ...next[active],
        purchases: [...next[active].purchases, { amount, name }],
      }
      return next
    })
  }

  function removePurchase(idx: number) {
    setDays((prev) => {
      const next = [...prev]
      next[active] = {
        ...next[active],
        purchases: next[active].purchases.filter((_, i) => i !== idx),
      }
      return next
    })
  }

  function reset() {
    setDays(defaultDays)
    setActive(1)
  }

  return (
    <section className="relative overflow-hidden border-b border-line px-5 py-16 md:py-24">
      {/*
       * Distinct section background — darker than the rest of the page
       * with layered Sanda-themed glows and a subtle "graph paper" grid.
       * Breaks scroll blindness while staying on-brand.
       */}
      <div
        className="pointer-events-none absolute inset-0 -z-20"
        style={{ background: 'var(--color-ink-3)' }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-50"
        style={{
          backgroundImage:
            'radial-gradient(700px 400px at 88% 10%, rgba(59, 232, 176, 0.14) 0%, transparent 60%), radial-gradient(600px 360px at 5% 90%, rgba(59, 158, 255, 0.12) 0%, transparent 60%)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 grid-lines opacity-[0.18]"
        aria-hidden
      />
      {/* Faint top/bottom hairline glow to underline the section break */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px -z-10"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(59,232,176,0.4), rgba(59,158,255,0.4), transparent)',
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-8 max-w-2xl md:mb-10">
            <div className="eyebrow">Самобалансирующийся бюджет</div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:mt-5 md:text-5xl">
              Потратил лишнего?{' '}
              <span className="grad-text">Завтра лимит уменьшится</span>
            </h2>
            <p className="mt-4 text-text-muted md:mt-5">
              Выбери день, добавь трату — и проследи, как перестраиваются лимиты
              на ближайшую неделю.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="rounded-3xl border border-line-strong bg-ink-2/80 p-3 backdrop-blur-sm md:p-8">
          {/* Days strip */}
          <div className="-mx-1 flex snap-x snap-mandatory gap-2 overflow-x-auto no-scrollbar px-1 pb-1 sm:mx-0 sm:grid sm:grid-cols-5 sm:gap-2 sm:overflow-visible sm:px-0 sm:pb-0">
            {computed.map((d, i) => {
              const isActive = i === active
              const zoneBg =
                d.zone === 'safe'
                  ? 'rgba(59,232,176,0.15)'
                  : d.zone === 'warn'
                  ? 'rgba(245,166,35,0.15)'
                  : 'rgba(255,85,102,0.15)'
              const zoneText =
                d.zone === 'safe'
                  ? '#3be8b0'
                  : d.zone === 'warn'
                  ? '#f5a623'
                  : '#ff5566'
              return (
                <button
                  key={d.label}
                  onClick={() => setActive(i)}
                  className={`w-[110px] flex-shrink-0 snap-start rounded-2xl border px-3 py-3 text-left transition sm:w-auto sm:py-4 ${
                    isActive
                      ? 'border-white/20 bg-white/[0.06]'
                      : 'border-line hover:border-line-strong'
                  }`}
                >
                  <p className="text-[10px] uppercase tracking-[0.2em] text-text-dim">
                    {d.label}
                  </p>
                  <p className="text-[11px] text-text-muted">{d.date}</p>
                  <p
                    className="num-display mt-2 text-base font-bold md:text-xl"
                    style={{ color: zoneText }}
                  >
                    {formatN(d.adjusted)}
                  </p>
                  <p className="text-[10px] text-text-dim">
                    потр.: {formatN(d.spent)}
                  </p>
                  <div
                    className="mt-2 h-1 rounded-full"
                    style={{ background: zoneBg }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.min(
                          (d.spent / Math.max(d.adjusted, 1)) * 100,
                          100,
                        )}%`,
                        background: zoneText,
                      }}
                    />
                  </div>
                </button>
              )
            })}
          </div>

          <div className="mt-5 grid gap-4 md:mt-6 md:grid-cols-2 md:gap-5">
            {/* LEFT: day detail + purchase list with per-row remove buttons */}
            <div className="rounded-2xl border border-line bg-white/[0.02] p-4 md:p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-text-dim">
                {current.label}, {current.date}
              </p>
              <p className="num-display mt-2 text-3xl font-bold md:text-4xl">
                <span
                  style={{
                    color:
                      current.zone === 'safe'
                        ? '#3be8b0'
                        : current.zone === 'warn'
                        ? '#f5a623'
                        : '#ff5566',
                  }}
                >
                  {formatN(current.adjusted)}
                </span>
                <span className="ml-2 text-base text-text-muted md:text-lg">₸</span>
              </p>
              <p className="mt-1 text-sm text-text-muted">
                базовый лимит {formatN(current.base)} ₸
                {active > 0 && (
                  <>
                    {' '}
                    {computed[active - 1].delta >= 0 ? (
                      <span className="text-mint">
                        + {formatN(computed[active - 1].delta)} переноса
                      </span>
                    ) : (
                      <span className="text-danger">
                        − {formatN(Math.abs(computed[active - 1].delta))} перерасхода
                      </span>
                    )}
                  </>
                )}
              </p>

              <div className="mt-4 space-y-2">
                {current.purchases.length === 0 ? (
                  <p className="text-sm text-text-dim">Трат пока нет.</p>
                ) : (
                  current.purchases.map((p, i) => (
                    <div
                      key={i}
                      className="group flex items-center justify-between gap-2 rounded-xl border border-line bg-white/[0.02] px-3 py-2 text-sm"
                    >
                      <span className="min-w-0 truncate text-text">{p.name}</span>
                      <div className="flex flex-shrink-0 items-center gap-2">
                        <span className="num-display text-text-muted">
                          −{formatN(p.amount)} ₸
                        </span>
                        <button
                          type="button"
                          onClick={() => removePurchase(i)}
                          aria-label={`Удалить «${p.name}»`}
                          title="Удалить"
                          className="flex h-6 w-6 items-center justify-center rounded-full border border-line text-text-dim transition hover:border-danger/40 hover:bg-danger/10 hover:text-danger"
                        >
                          <X size={12} strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* RIGHT: quick-add buttons + planning hint + reset */}
            <div className="rounded-2xl border border-line bg-white/[0.02] p-4 md:p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-text-dim">
                Добавить трату
              </p>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <QuickBtn
                  label="Кофе"
                  amount={1500}
                  onClick={() => addPurchase(1500, 'Кофе')}
                />
                <QuickBtn
                  label="Стрижка"
                  amount={6000}
                  onClick={() => addPurchase(6000, 'Стрижка')}
                />
                <QuickBtn
                  label="Ужин"
                  amount={12000}
                  onClick={() => addPurchase(12000, 'Ужин')}
                />
                <QuickBtn
                  label="На себя"
                  amount={18000}
                  onClick={() => addPurchase(18000, 'На себя')}
                />
              </div>

              <div className="mt-4 rounded-xl border border-mint/20 bg-mint/[0.05] p-3">
                <p className="text-[11px] uppercase tracking-[0.18em] text-mint">
                  Планирование вперёд
                </p>
                <p className="mt-1 text-xs text-text-muted">
                  Знаешь, что в пятницу будет крупная покупка? Занеси её заранее —
                  бюджет пересчитает дни и отложит сумму.
                </p>
              </div>

              <button
                onClick={reset}
                className="mt-4 w-full rounded-full border border-line py-2 text-sm text-text-muted hover:border-line-strong hover:text-text"
              >
                Сбросить неделю
              </button>
            </div>
          </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function QuickBtn({
  label,
  amount,
  onClick,
}: {
  label: string
  amount: number
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between gap-2 rounded-xl border border-line bg-white/[0.02] px-3 py-2 text-left text-sm hover:border-line-strong hover:bg-white/[0.04]"
    >
      <span className="min-w-0 truncate text-text">{label}</span>
      <span className="num-display whitespace-nowrap text-xs text-text-muted">
        −{formatN(amount)} ₸
      </span>
    </button>
  )
}
