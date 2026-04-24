// StatsMockup.tsx
// Separate file to keep the main AppMockups.tsx readable. Shows the new
// "Статистика" feature tab — cash flow, period selector, and dynamics bars.
import { PhoneFrame, StatusBar } from './PhoneFrame'

export function StatsMockup() {
  // Bar pairs: income (up, mint) / expense (down, danger) per month.
  // Heights are percentages of the max for a compact rendering.
  const months = [
    { m: 'Ноя', inc: 62, exp: 54 },
    { m: 'Дек', inc: 70, exp: 78 },
    { m: 'Янв', inc: 64, exp: 58 },
    { m: 'Фев', inc: 72, exp: 60 },
    { m: 'Мар', inc: 80, exp: 66 },
    { m: 'Апр', inc: 88, exp: 62 },
  ]

  const periods = ['День', 'Неделя', 'Месяц', 'Год']
  const active = 2 // Месяц

  return (
    <PhoneFrame>
      <StatusBar />
      <div className="flex h-full flex-col px-4 pt-5 pb-4 text-white">
        <div className="mb-3">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Статистика</p>
          <p className="mt-1 text-[20px] font-semibold">Денежный поток</p>
        </div>

        {/* Period selector chips */}
        <div className="mb-3 flex gap-1 rounded-full border border-white/5 bg-white/[0.03] p-1">
          {periods.map((p, i) => (
            <div
              key={p}
              className={`flex-1 rounded-full px-2 py-1 text-center text-[10px] font-medium ${
                i === active ? 'bg-white/10 text-white' : 'text-white/40'
              }`}
            >
              {p}
            </div>
          ))}
        </div>

        {/* Headline KPI */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-3">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-[0.18em] text-white/40">
                Тратишь меньше, чем получаешь
              </p>
              <p className="num-display mt-0.5 text-[22px] font-bold text-mint">
                + 186 000 ₸
              </p>
            </div>
            <span className="rounded-full bg-mint/[0.12] px-2 py-0.5 text-[9px] font-semibold text-mint">
              ▲ 14%
            </span>
          </div>

          {/* Income / expense dual bar chart */}
          <div className="mt-3 flex h-20 items-end justify-between gap-1.5">
            {months.map((row, i) => (
              <div key={row.m} className="flex flex-1 flex-col items-center gap-0.5">
                <div className="flex h-16 w-full items-end justify-center gap-0.5">
                  <div
                    className="w-1/2 rounded-sm"
                    style={{
                      height: `${row.inc}%`,
                      background:
                        i === months.length - 1
                          ? 'linear-gradient(180deg, #3be8b0 0%, rgba(59,232,176,0.4) 100%)'
                          : 'rgba(59,232,176,0.5)',
                    }}
                  />
                  <div
                    className="w-1/2 rounded-sm"
                    style={{
                      height: `${row.exp}%`,
                      background:
                        i === months.length - 1
                          ? 'linear-gradient(180deg, rgba(255,85,102,0.8) 0%, rgba(255,85,102,0.3) 100%)'
                          : 'rgba(255,85,102,0.4)',
                    }}
                  />
                </div>
                <span className="text-[8px] text-white/30">{row.m}</span>
              </div>
            ))}
          </div>

          <div className="mt-2 flex justify-between text-[9px]">
            <span className="flex items-center gap-1 text-white/50">
              <span className="h-1.5 w-1.5 rounded-sm bg-mint" /> Доход
            </span>
            <span className="flex items-center gap-1 text-white/50">
              <span className="h-1.5 w-1.5 rounded-sm bg-danger" /> Расход
            </span>
          </div>
        </div>

        {/* Dynamic rows — net worth, savings, expenses */}
        <div className="mt-3 space-y-1.5">
          <DynamicRow label="Капитал" value="2 480 500 ₸" delta="▲ 12,4%" positive />
          <DynamicRow label="Накопления" value="780 000 ₸" delta="▲ 8,1%" positive />
          <DynamicRow label="Расходы" value="328 000 ₸" delta="▼ 6,2%" positive />
          <DynamicRow label="Подписки" value="3 500 ₸" delta="— без изм." />
        </div>

        <div className="mt-auto flex flex-shrink-0 justify-center pt-2">
          <div className="h-1 w-20 rounded-full bg-white/30" />
        </div>
      </div>
    </PhoneFrame>
  )
}

function DynamicRow({
  label,
  value,
  delta,
  positive,
}: {
  label: string
  value: string
  delta: string
  positive?: boolean
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] px-2.5 py-1.5">
      <p className="text-[11px] text-white/70">{label}</p>
      <div className="flex items-baseline gap-1.5">
        <p className="num-display text-[11px] font-semibold text-white/90">{value}</p>
        <span
          className={`text-[9px] ${positive ? 'text-mint' : 'text-white/40'}`}
        >
          {delta}
        </span>
      </div>
    </div>
  )
}