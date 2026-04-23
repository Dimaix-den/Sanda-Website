export function ComparisonSection() {
  const rows = [
    {
      q: 'Дает понимание своего фин. положения',
      sanda: 'да',
      cat: 'нет',
      bank: 'Вручную',
    },
    {
      q: 'Когда дает ценность для пользователя',
      sanda: 'в первый день',
      cat: 'через 3–6 мес',
      bank: 'в конце месяца',
    },
    {
      q: 'Нужна разметка транзакций',
      sanda: 'нет',
      cat: 'каждая',
      bank: 'частично',
    },
    {
      q: 'Показывает реальную фин. картину',
      sanda: 'да',
      cat: 'частично',
      bank: 'частично',
    },
    {
      q: 'Показывает бюджет с учетом всех планов',
      sanda: 'да',
      cat: 'нет',
      bank: 'частично',
    },
    {
      q: 'Отвечает на вопрос',
      sanda: 'Могу ли я сегодня потратить на себя?',
      cat: 'Сколько я потратил в прошлом месяце на ..?',
      bank: 'Где мне сократить расходы?',
    },
  ]
  return (
    <section id="compare" className="border-b border-line px-5 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-2xl md:mb-12">
          <div className="eyebrow">Сравнение</div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:mt-5 md:text-5xl">
            Преимущества перед{' '}
            <span className="grad-text">другими системами</span>
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
                Таблицы
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
