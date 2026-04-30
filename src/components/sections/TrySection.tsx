import { Reveal } from '../Reveal'

function formatN(n: number) {
  return new Intl.NumberFormat('ru-RU').format(Math.max(0, Math.round(n)))
}

export function TrySection() {
  // Фиксированные данные для примерной карточки
  const income = 600_000
  const obligations = 80_000
  const goals = 100_000
  const monthlyBudgets = 100_000
  const plannedExpenses = 50_000
  const daysLeft = 28

  const available =
    income -
    obligations -
    goals -
    monthlyBudgets -
    plannedExpenses

  const dailyLimit = Math.max(available / Math.max(daysLeft, 1), 0)

  const zone: 'safe' | 'warn' | 'over' =
    available <= 0 ? 'over' : available < income * 0.15 ? 'warn' : 'safe'

  const zoneColor =
    zone === 'safe' ? '#3be8b0' : zone === 'warn' ? '#f5a623' : '#ff5566'
  const zoneLabel =
    zone === 'safe'
      ? 'В безопасной зоне'
      : zone === 'warn'
      ? 'Близко к границе'
      : 'Выше бюджета'

  return (
    <section
      id="try"
      className="relative border-b border-line px-5 py-16 md:py-1"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-8 max-w-2xl md:mb-10">
            <div className="eyebrow">Удерживает в бюджете</div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:mt-5 md:text-5xl">
              Будь в курсе своих {' '}
              <span className="grad-text"> финансовых возможностей</span>
            </h2>
            <p className="mt-4 text-text-muted md:mt-5">
              Sanda учитывает все твои планы и бюджеты на месяц, и помогает определить безопасную зону для ежедневных расходов
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-white/[0.04] via-white/[0.015] to-white/[0.04] p-5 md:p-8">
            <div
              className="pointer-events-none absolute -top-24 left-1/2 h-[320px] w-[320px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
              style={{
                background: `radial-gradient(circle, ${zoneColor}55 0%, transparent 70%)`,
              }}
              aria-hidden
            />

            <div className="relative grid gap-6 md:grid-cols-[1.1fr_1fr] md:gap-8">
              {/* ЛЕВАЯ КОЛОНКА — ЦЕНТРИРОВАННЫЙ БЛОК */}
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
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{ background: zoneColor }}
                    />
                    {zoneLabel}
                  </div>
                </div>
              </div>

              {/* ПРАВАЯ КОЛОНКА — ФОРМУЛА */}
              <div className="rounded-2xl border border-line bg-ink-2/60 p-4 md:p-5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-text-dim">
                  Формула на сегодня
                </p>
                <div className="mt-3 space-y-2.5">
                  {/* Доходы — зелёный радиопоинт */}
                  <FormulaRow
                    color="#3be8b0"
                    label="Доход"
                    value={`${formatN(income)} ₸`}
                    op=""
                  />
                  {/* Обязательства — красный */}
                  <FormulaRow
                    color="#ff5566"
                    label="На обязательства"
                    value={`−${formatN(obligations)} ₸`}
                    op="−"
                  />
                  {/* В сбережения — зелёный */}
                  <FormulaRow
                    color="#3be8b0"
                    label="В сбережения"
                    value={`−${formatN(goals)} ₸`}
                    op="−"
                  />
                  {/* Бюджеты и плановые — оранжевые */}
                  <FormulaRow
                    color="#f5a623"
                    label="Бюджеты на месяц"
                    value={`−${formatN(monthlyBudgets)} ₸`}
                    op="−"
                  />
                  <FormulaRow
                    color="#f5a623"
                    label="Плановые расходы"
                    value={`−${formatN(plannedExpenses)} ₸`}
                    op="−"
                  />
                  <div className="border-t border-line pt-2.5">
                    <FormulaRow
                      color="#3be8b0"
                      label="Дни до зарплаты"
                      value={`÷ ${daysLeft}`}
                      op="÷"
                    />
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-white/[0.04] px-3 py-2.5">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                      Сегодня
                    </span>
                    <span
                      className="num-display text-lg font-bold"
                      style={{ color: zoneColor }}
                    >
                      {formatN(dailyLimit)} ₸
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function FormulaRow({
  color,
  label,
  value,
  op,
}: {
  color: string
  label: string
  value: string
  op: string
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex min-w-0 items-center gap-2">
        <span
          className="flex h-5 w-5 flex-shrink-0 items-center justify-center text-[11px] font-bold text-text-dim"
          aria-hidden
        >
          {op}
        </span>
        <span
          className="inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full"
          style={{ background: color }}
        />
        <span className="truncate text-text-muted">{label}</span>
      </div>
      <span className="num-display whitespace-nowrap font-semibold text-text">
        {value}
      </span>
    </div>
  )
}
