export function PhilosophySection() {
  const items = [
    {
      n: '01',
      title: 'Простота сверху, глубина снизу',
      text: 'Главный экран — одна цифра. Капитал и аналитика не мешают первому действию.',
    },
    {
      n: '02',
      title: 'Полная прозрачность расчёта',
      text: 'Нажал на «?» — видишь формулу и все её компоненты. Никакой магии.',
    },
    {
      n: '03',
      title: 'Мотивация, а не стыд',
      text: 'Стрики, мягкие цвета, без упрекающих уведомлений. Союзник, не учитель.',
    },
    {
      n: '04',
      title: 'Свобода внутри бюджета',
      text: 'Всё, что укладывается в лимит, — можно. Плохо только тратить то, чего нет.',
    },
  ]

  return (
    <section className="relative border-b border-line px-5 py-16 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 -z-10 grid-lines opacity-20"
      />
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-2xl md:mb-12">
          <div className="eyebrow">Философия</div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:mt-5 md:text-5xl">
            Не запрещать, а показывать
          </h2>
          <p className="mt-4 text-text-muted md:mt-5">
            Sanda не делит расходы на правильные и неправильные. Показываем границу
            безопасных трат, а что внутри неё — решаешь ты.
          </p>
        </div>
        <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
          {items.map((it) => (
            <div key={it.n} className="bg-ink-2 p-5 md:p-7">
              <p className="num-display text-sm font-semibold text-text-dim">{it.n}</p>
              <p className="mt-3 text-lg font-semibold md:mt-4 md:text-xl">{it.title}</p>
              <p className="mt-2 text-sm text-text-muted md:mt-3 md:text-base">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
