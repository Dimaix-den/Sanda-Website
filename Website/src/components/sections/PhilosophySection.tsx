export function PhilosophySection() {
  const items = [
    {
      n: '01',
      title: 'Простота сверху, глубина снизу',
      text: 'Главный экран — одна цифра. Статистика, капитал и аналитика не мешают первому действию.',
    },
    {
      n: '02',
      title: 'Полная прозрачность расчёта',
      text: 'Нажал на «?» — видишь формулу и все её компоненты. Никаких алгоритмов, которые нельзя проверить.',
    },
    {
      n: '03',
      title: 'Мотивация, а не стыд',
      text: 'Стрики, мягкие цвета, никаких упрекающих уведомлений. Союзник, а не строгий учитель.',
    },
    {
      n: '04',
      title: 'Свобода внутри бюджета',
      text: 'Кофе, рестораны, подписки — это не плохо. Плохо только тратить то, чего у тебя нет.',
    },
  ]

  return (
    <section className="relative border-b border-line px-5 py-24">
      <div
        className="pointer-events-none absolute inset-0 -z-10 grid-lines opacity-20"
      />
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <div className="eyebrow">Философия продукта</div>
          <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
            Не запрещать, а показывать
          </h2>
          <p className="mt-5 text-text-muted">
            Sanda не делит расходы на правильные и неправильные. Приложение показывает границу
            безопасных трат, а что внутри неё — решаешь ты.
          </p>
        </div>
        <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2">
          {items.map((it) => (
            <div key={it.n} className="bg-ink-2 p-7 md:p-8">
              <p className="num-display text-sm font-semibold text-text-dim">{it.n}</p>
              <p className="mt-4 text-xl font-semibold md:text-2xl">{it.title}</p>
              <p className="mt-3 text-text-muted">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
