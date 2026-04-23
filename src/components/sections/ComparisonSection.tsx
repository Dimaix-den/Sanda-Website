export function ComparisonSection() {
  const rows = [
    {
      q: 'Отвечает на «сколько можно потратить сегодня?»',
      sanda: 'да, одной цифрой',
      cat: 'нет',
      bank: 'нет',
    },
    {
      q: 'Ценность с первого дня',
      sanda: 'сразу',
      cat: 'через 3–6 мес',
      bank: 'прошлое',
    },
    {
      q: 'Нужна разметка транзакций',
      sanda: 'нет',
      cat: 'каждая',
      bank: 'авто',
    },
    {
      q: 'Учитывает кредиты в других банках',
      sanda: 'да',
      cat: 'частично',
      bank: 'нет',
    },
    {
      q: 'Балансирует бюджет сам',
      sanda: 'каждую ночь',
      cat: 'нет',
      bank: 'нет',
    },
    {
      q: 'Время на ведение',
      sanda: '~30 сек/день',
      cat: '10–20 мин',
      bank: '—',
    },
  ]
  return (
    <section id="compare" className="border-b border-line px-5 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-2xl md:mb-12">
          <div className="eyebrow">Сравнение</div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:mt-5 md:text-5xl">
            Свободная клетка на карте.{' '}
            <span className="grad-text">Пока никого нет.</span>
          </h2>
          <p className="mt-4 text-text-muted md:mt-5">
            Банки видят только свою долю. Категоризаторы требуют месяцы разметки. YNAB требует
            час в неделю. Sanda — простая и про будущее.
          </p>
        </div>

        {/*
         * Horizontal scroll wrapper on narrow screens keeps the 4-col table
         * readable without shrinking the question column into 2-word chaos.
         */}
        <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
          <div className="min-w-[560px] overflow-hidden rounded-3xl border border-line">
            <div className="grid grid-cols-5 border-b border-line bg-white/[0.02] text-[10px] uppercase tracking-[0.14em] text-text-dim md:text-[11px]">
              <div className="col-span-2 px-3 py-3 md:px-6">Что важно</div>
              <div className="border-l border-line px-2 py-3 text-center text-mint md:px-4">
                Sanda
              </div>
              <div className="border-l border-line px-2 py-3 text-center md:px-4">
                Категориз.
              </div>
              <div className="border-l border-line px-2 py-3 text-center md:px-4">
                Банки / YNAB
              </div>
            </div>
            {rows.map((r, i) => (
              <div
                key={r.q}
                className={`grid grid-cols-5 text-xs md:text-sm ${
                  i !== rows.length - 1 ? 'border-b border-line' : ''
                }`}
              >
                <div className="col-span-2 px-3 py-3 md:px-6 md:py-4">{r.q}</div>
                <div className="border-l border-line bg-mint/[0.03] px-2 py-3 text-center font-semibold text-mint md:px-4 md:py-4">
                  {r.sanda}
                </div>
                <div className="border-l border-line px-2 py-3 text-center text-text-muted md:px-4 md:py-4">
                  {r.cat}
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
