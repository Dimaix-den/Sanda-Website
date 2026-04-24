export function ComparisonSection() {
  const rows = [
    {
      q: 'Отвечает на вопрос «сколько можно сегодня»',
      sanda: 'С первого дня',
      apps: 'Нет',
      bank: 'Нет',
    },
    {
      q: 'Когда появляется ценность',
      sanda: 'Сразу',
      apps: 'Через 3–6 месяцев',
      bank: 'В конце месяца',
    },
    {
      q: 'Требует разметки каждой покупки',
      sanda: 'Нет',
      apps: 'Каждую',
      bank: 'Частично',
    },
    {
      q: 'Видит все ваши банки, кредиты и цели',
      sanda: 'Да',
      apps: 'Частично',
      bank: 'Только свой',
    },
    {
      q: 'Учитывает обязательства и планы',
      sanda: 'Да, автоматически',
      apps: 'Вручную',
      bank: 'Нет',
    },
    {
      q: 'Куда смотрит',
      sanda: 'В будущее',
      apps: 'В прошлое',
      bank: 'В прошлое',
    },
  ]

  return (
    <section id="compare" className="border-b border-line px-5 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-2xl md:mb-12">
          <div className="eyebrow">Сравнение</div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:mt-5 md:text-5xl">
            Почему Sanda, а{' '}
            <span className="grad-text">не другой инструмент</span>
          </h2>
          <p className="mt-4 text-text-muted md:mt-5">
            Приложения учёта финансов и банки показывают, куда ушли деньги.
            Sanda показывает, сколько можно потратить прямо сейчас — с учётом
            всех банков, обязательств и целей.
          </p>
        </div>

        {/*
         * Horizontal scroll wrapper on narrow screens keeps the 4-col
         * table readable without shrinking the question column.
         */}
        <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
          <div className="min-w-[620px] overflow-hidden rounded-3xl border border-line">
            <div className="grid grid-cols-5 border-b border-line bg-white/[0.02] text-[10px] uppercase tracking-[0.14em] text-text-dim md:text-[11px]">
              <div className="col-span-2 px-3 py-3 md:px-6">Что важно</div>
              <div className="border-l border-line px-2 py-3 text-center text-mint md:px-4">
                Sanda
              </div>
              <div className="border-l border-line px-2 py-3 text-center leading-tight md:px-4">
                Приложения учёта
                <br />
                финансов
              </div>
              <div className="border-l border-line px-2 py-3 text-center leading-tight md:px-4">
                Банковские
                <br />
                приложения
              </div>
            </div>
            {rows.map((r, i) => (
              <div
                key={r.q}
                className={`grid grid-cols-5 text-xs md:text-sm ${
                  i !== rows.length - 1 ? 'border-b border-line' : ''
                }`}
              >
                <div className="col-span-2 px-3 py-3 md:px-6 md:py-4">
                  {r.q}
                </div>
                <div className="border-l border-line bg-mint/[0.03] px-2 py-3 text-center font-semibold text-mint md:px-4 md:py-4">
                  {r.sanda}
                </div>
                <div className="border-l border-line px-2 py-3 text-center text-text-muted md:px-4 md:py-4">
                  {r.apps}
                </div>
                <div className="border-l border-line px-2 py-3 text-center text-text-muted md:px-4 md:py-4">
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
