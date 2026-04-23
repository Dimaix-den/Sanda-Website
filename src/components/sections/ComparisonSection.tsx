export function ComparisonSection() {
  const rows = [
    {
      q: 'Отвечает на «сколько можно потратить сегодня?»',
      sanda: 'да, одной цифрой',
      cat: 'нет',
      bank: 'нет',
      ynab: 'примерно',
    },
    {
      q: 'Ценность с первого дня',
      sanda: 'сразу',
      cat: 'через 3–6 месяцев',
      bank: 'сразу (только прошлое)',
      ynab: 'через пару недель',
    },
    {
      q: 'Нужна разметка транзакций',
      sanda: 'нет',
      cat: 'да, каждая',
      bank: 'автокатегории',
      ynab: 'да, полная',
    },
    {
      q: 'Учитывает кредиты в других банках',
      sanda: 'да',
      cat: 'частично',
      bank: 'нет',
      ynab: 'да',
    },
    {
      q: 'Автоматически балансирует бюджет',
      sanda: 'да, каждую ночь',
      cat: 'нет',
      bank: 'нет',
      ynab: 'вручную',
    },
    {
      q: 'Время на ведение',
      sanda: '~30 секунд в день',
      cat: '10–20 минут',
      bank: '—',
      ynab: '1–2 часа в неделю',
    },
  ]
  return (
    <section id="compare" className="border-b border-line px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <div className="eyebrow">Сравнение</div>
          <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
            Свободная клетка на карте. <span className="grad-text">Пока никого нет.</span>
          </h2>
          <p className="mt-5 text-text-muted">
            Банковские приложения видят только свою долю. Категоризаторы требуют месяцы разметки.
            YNAB требует часа в неделю. Sanda — простая и про будущее.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-line">
          <div className="grid grid-cols-5 border-b border-line bg-white/[0.02] text-[11px] uppercase tracking-[0.14em] text-text-dim">
            <div className="col-span-2 px-4 py-3 md:px-6">Что важно</div>
            <div className="border-l border-line px-3 py-3 text-center text-mint md:px-4">Sanda</div>
            <div className="border-l border-line px-3 py-3 text-center md:px-4">Категоризаторы</div>
            <div className="border-l border-line px-3 py-3 text-center md:px-4">Банки / YNAB</div>
          </div>
          {rows.map((r, i) => (
            <div
              key={r.q}
              className={`grid grid-cols-5 text-sm ${
                i !== rows.length - 1 ? 'border-b border-line' : ''
              }`}
            >
              <div className="col-span-2 px-4 py-4 md:px-6">{r.q}</div>
              <div className="border-l border-line bg-mint/[0.03] px-3 py-4 text-center font-semibold text-mint md:px-4">
                {r.sanda}
              </div>
              <div className="border-l border-line px-3 py-4 text-center text-text-muted md:px-4">
                {r.cat}
              </div>
              <div className="border-l border-line px-3 py-4 text-center text-text-muted md:px-4">
                {r.bank} / {r.ynab}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Quote
            emoji="🟢"
            title="Банки"
            text="Показывают прошлое внутри одного банка. Не знают про кредиты в других и твои цели."
          />
          <Quote
            emoji="📊"
            title="Категоризаторы"
            text="Работают на полгода накопленной статистики. На вопрос про сегодня не отвечают."
          />
          <Quote
            emoji="📒"
            title="YNAB и конверты"
            text="Жёсткая система, которая забирает 1–2 часа в неделю. Большинство не выдерживает."
          />
        </div>
      </div>
    </section>
  )
}

function Quote({
  emoji,
  title,
  text,
}: {
  emoji: string
  title: string
  text: string
}) {
  return (
    <div className="rounded-2xl border border-line bg-white/[0.02] p-5">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-lg">{emoji}</span>
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-text-muted">{title}</p>
      </div>
      <p className="text-text-muted">{text}</p>
    </div>
  )
}
