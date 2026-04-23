export function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      title: 'Заносишь баланс',
      text: 'Сколько сейчас на карте — в одном или нескольких банках. Занимает минуту.',
    },
    {
      num: '02',
      title: 'Добавляешь обязательства и цели',
      text: 'Кредиты, рассрочки, подписки, коммуналка. Накопления на отпуск, ипотеку, подушку.',
    },
    {
      num: '03',
      title: 'Получаешь цифру на сегодня',
      text: 'Одно число на главном экране. Внутри него — вся твоя математика.',
    },
  ]
  return (
    <section id="how" className="border-b border-line px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl">
          <div className="eyebrow">Как работает</div>
          <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
            Три шага, и ты живёшь с понятным бюджетом
          </h2>
          <p className="mt-5 text-text-muted">
            Никаких месяцев разметки транзакций, диаграмм и категорий. Ценность появляется уже
            в первый вечер.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.num}
              className="rounded-3xl border border-line bg-white/[0.02] p-6"
            >
              <p className="num-display grad-text text-4xl font-black">{s.num}</p>
              <p className="mt-4 text-xl font-semibold">{s.title}</p>
              <p className="mt-2 text-sm text-text-muted">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-line bg-white/[0.02] p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-text-dim">Формула</p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xl font-semibold md:text-2xl">
            <FormulaChip color="white">Баланс</FormulaChip>
            <span className="text-text-dim">−</span>
            <FormulaChip color="danger">Обязательства</FormulaChip>
            <span className="text-text-dim">−</span>
            <FormulaChip color="sky">Цели</FormulaChip>
            <span className="mx-1 text-text-dim">÷</span>
            <FormulaChip color="mint">Дни до зарплаты</FormulaChip>
            <span className="mx-2 text-text-dim">=</span>
            <span className="grad-text">Сегодня</span>
          </div>
          <p className="mt-4 max-w-2xl text-sm text-text-muted">
            Ничего магического. Пересчитывается каждую ночь. Потратил больше вчера — сегодня
            цифра уменьшилась. Сэкономил — сегодня стало больше. Бюджет сам себя балансирует.
          </p>
        </div>
      </div>
    </section>
  )
}

function FormulaChip({
  children,
  color,
}: {
  children: React.ReactNode
  color: 'white' | 'mint' | 'sky' | 'danger'
}) {
  const map: Record<string, string> = {
    white: 'border-white/15 bg-white/[0.04] text-white',
    mint: 'border-mint/30 bg-mint/[0.08] text-mint',
    sky: 'border-sky/30 bg-sky/[0.08] text-sky',
    danger: 'border-danger/30 bg-danger/[0.08] text-danger',
  }
  return (
    <span className={`rounded-full border px-3 py-1.5 text-sm font-medium ${map[color]}`}>
      {children}
    </span>
  )
}
