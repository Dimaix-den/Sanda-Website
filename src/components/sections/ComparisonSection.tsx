export function ComparisonSection() {
  const rows: {
    q: string
    sanda: string
    apps: string
    bank: string
  }[] = [
    {
      q: 'Помогает удержаться в бюджете',
      sanda: 'Да, каждый день',
      apps: 'Нет',
      bank: 'Нет',
    },
    {
      q: 'Позволяет планировать месяц вперёд',
      sanda: 'Да',
      apps: 'Частично',
      bank: 'Нет',
    },
    {
      q: 'Учитывает цели и сбережения',
      sanda: 'Автоматически',
      apps: 'Вручную',
      bank: 'Нет',
    },
    {
      q: 'Требует разметки каждой покупки',
      sanda: 'Нет',
      apps: 'Каждую',
      bank: 'Частично',
    },
    {
      q: 'Показывает реальную картину капитала',
      sanda: 'Да',
      apps: 'Частично',
      bank: 'Только свой',
    },
    {
      q: 'Даёт ценность с первого дня',
      sanda: 'Сразу',
      apps: 'Через 3–6 месяцев',
      bank: 'В конце месяца',
    },
  ]

  return (
    <section id="compare" className="px-5 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-2xl md:mb-12">
          <div className="eyebrow">Сравнение</div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:mt-5 md:text-5xl">
            Почему Sanda, а{' '}
            <span className="grad-text">не другой инструмент</span>
          </h2>
          <p className="mt-4 text-text-muted md:mt-5">
            Приложения учёта и банки показывают, куда ушли деньги.
            Sanda помогает управлять ими — с учётом всех обязательств, целей и планов.
          </p>
        </div>

        <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
          <div className="min-w-[620px] overflow-hidden rounded-3xl border border-line">
            {/* Header row */}
            <div className="grid grid-cols-5 border-b border-line bg-white/[0.02] text-[10px] uppercase tracking-[0.14em] text-text-dim md:text-[11px]">
              <div className="col-span-2 px-4 py-3.5 md:px-6">Что важно</div>
              <div className="border-l border-line px-2 py-3.5 text-center text-mint md:px-4">Sanda</div>
              <div className="border-l border-line px-2 py-3.5 text-center leading-tight md:px-4">
                Приложения учёта<br />финансов
              </div>
              <div className="border-l border-line px-2 py-3.5 text-center leading-tight md:px-4">
                Банковские<br />приложения
              </div>
            </div>

            {/* Data rows — fixed min-height so all rows are visually even */}
            {rows.map((r, i) => (
              <div
                key={r.q}
                className={`grid grid-cols-5 text-xs md:text-sm ${
                  i !== rows.length - 1 ? 'border-b border-line' : ''
                }`}
                style={{ minHeight: 56 }}
              >
                {/* Question */}
                <div className="col-span-2 flex items-center px-4 py-3 md:px-6">
                  <span className="leading-snug text-text">{r.q}</span>
                </div>
                {/* Sanda */}
                <div className="flex items-center justify-center border-l border-line bg-mint/[0.03] px-2 py-3 text-center font-semibold text-mint md:px-4">
                  {r.sanda}
                </div>
                {/* Apps */}
                <div className="flex items-center justify-center border-l border-line px-2 py-3 text-center text-text-muted md:px-4">
                  {r.apps}
                </div>
                {/* Bank */}
                <div className="flex items-center justify-center border-l border-line px-2 py-3 text-center text-text-muted md:px-4">
                  {r.bank}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
