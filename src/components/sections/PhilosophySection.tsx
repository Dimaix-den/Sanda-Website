/**
 * PhilosophySection — replaces the uniform 2×2 grid with an asymmetric
 * bento layout. First card is large and takes two columns, the others
 * vary in height to create a rhythm that reads differently from the
 * comparison table and the 4-stat feature cards elsewhere on the page.
 */
export function PhilosophySection() {
  return (
    <section id="philosophy" className="relative border-b border-line px-5 py-16 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 -z-10 grid-lines opacity-20"
        aria-hidden
      />
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl md:mb-12">
          <div className="eyebrow">Философия</div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:mt-5 md:text-5xl">
            Не запрещает, а <span className="grad-text">показывает</span>
          </h2>
          <p className="mt-4 text-text-muted md:mt-5">
            Sanda не делит расходы на правильные и неправильные. Обозначаем границу
            безопасных трат, а что внутри — решаешь ты.
          </p>
        </div>

        {/*
         * 6-column bento on md+, stacks single column on mobile.
         * Sizing:
         *   01 — 4 columns × 2 rows  (wide hero)
         *   02 — 2 columns × 1 row
         *   03 — 2 columns × 1 row
         *   04 — 3 columns × 1 row
         *   05 — 3 columns × 1 row
         * Creates a Z-shaped rhythm that breaks grid monotony.
         */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-6 md:grid-rows-[auto_auto_auto] md:gap-4">
          {/* 01 — wide hero tile */}
          <BentoCard className="md:col-span-4 md:row-span-2 md:min-h-[320px]">
            <div className="flex h-full flex-col justify-between gap-6">
              <div className="flex items-start justify-between gap-4">
                <p className="num-display text-5xl font-black text-text-dim md:text-7xl">
                  01
                </p>
                <div
                  className="relative h-16 w-16 flex-shrink-0 rounded-2xl border border-line bg-ink-2 md:h-24 md:w-24"
                  aria-hidden
                >
                  <div
                    className="absolute inset-2 rounded-xl border border-mint/30"
                    style={{
                      background:
                        'radial-gradient(circle at 30% 30%, rgba(59,232,176,0.35) 0%, transparent 70%)',
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-2xl md:text-3xl">
                    🪞
                  </div>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold md:text-3xl">
                  Простота снаружи, <span className="grad-text">глубина внутри</span>
                </p>
                <p className="mt-3 max-w-lg text-sm text-text-muted md:text-base">
                  На главном экране — одна цифра. А под капотом — полный капитал,
                  аналитика, стрики, история. Глубина доступна, когда нужна, и не
                  отвлекает, когда не нужна.
                </p>
              </div>
            </div>
          </BentoCard>

          {/* 02 — narrow stat tile */}
          <BentoCard className="md:col-span-2">
            <p className="num-display text-xl font-black text-text-dim md:text-2xl">
              02
            </p>
            <div className="mt-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-sky/30 bg-sky/[0.08] text-lg">
              👁️
            </div>
            <p className="mt-3 text-base font-semibold md:text-lg">
              Полная прозрачность расчёта
            </p>
            <p className="mt-1.5 text-xs text-text-muted md:text-sm">
              Видишь формулу и все её компоненты. Никакой магии.
            </p>
          </BentoCard>

          {/* 03 — narrow stat tile */}
          <BentoCard className="md:col-span-2">
            <p className="num-display text-xl font-black text-text-dim md:text-2xl">
              03
            </p>
            <div className="mt-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-mint/30 bg-mint/[0.08] text-lg">
              🔥
            </div>
            <p className="mt-3 text-base font-semibold md:text-lg">
              Мотивация, а не стыд
            </p>
            <p className="mt-1.5 text-xs text-text-muted md:text-sm">
              Стрики, мягкие цвета, без упрекающих уведомлений. Sanda — твой союзник.
            </p>
          </BentoCard>

          {/* 04 — bottom wide tile */}
          <BentoCard className="md:col-span-3">
            <div className="flex items-center gap-4">
              <p className="num-display text-3xl font-black text-text-dim md:text-4xl">
                04
              </p>
              <div className="h-8 w-px bg-line" aria-hidden />
              <p className="text-base font-semibold md:text-lg">
                Свобода внутри бюджета
              </p>
            </div>
            <p className="mt-3 text-sm text-text-muted md:text-base">
              Всё, что укладывается в лимит, — можно. Плохо только тратить то, чего
              нет.
            </p>
          </BentoCard>

          {/* 05 — quote-style tile, different texture to interrupt the grid rhythm */}
          <BentoCard
            className="md:col-span-3"
            style={{
              background:
                'linear-gradient(135deg, rgba(59,232,176,0.06) 0%, rgba(59,158,255,0.04) 100%)',
            }}
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-mint">
              Наш принцип
            </p>
            <p className="mt-2 text-base font-semibold leading-snug md:text-lg">
              «Мы не учим вас жить. Мы показываем, сколько у вас есть — а что дальше,
              решаете вы.»
            </p>
            <p className="mt-3 text-xs text-text-dim">
              Команда Sanda
            </p>
          </BentoCard>
        </div>
      </div>
    </section>
  )
}

function BentoCard({
  children,
  className = '',
  style,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className={`rounded-3xl border border-line bg-ink-2 p-5 transition hover:border-line-strong md:p-6 ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}