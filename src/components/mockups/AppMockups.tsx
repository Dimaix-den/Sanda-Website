import type { CSSProperties, ReactNode } from 'react'
import { PhoneFrame } from './PhoneFrame'

/*
 * AppMockups v8 — ported from the high-fidelity Main Page HTML mockup
 * (iOS 26 liquid-glass, Sanda dark theme). Shared layout:
 *   status bar (dynamic island) → screen content → bottom nav + FAB → home bar
 *
 * Each Mockup is a single static iPhone screen (no tab switching) so
 * FeaturesSection can swap between them on the site. The `active` prop
 * on the nav pill just indicates which tab is highlighted.
 *
 * The visual container is our existing PhoneFrame from PhoneFrame.tsx,
 * but this file renders its OWN status bar matching the new design
 * (time on the left, small glyphs on the right, a centred notch pill).
 * The default notch from PhoneFrame is still drawn at the top; the
 * bespoke status bar sits just below it.
 */

// ─── tokens ────────────────────────────────────────────────────────
const C = {
  ink: '#05070a',
  text: '#f3f5f7',
  muted: '#9aa3ae',
  dim: '#5d6672',
  mint: '#3be8b0',
  sky: '#3b9eff',
  warn: '#f5a623',
  danger: '#ff5566',
}
const GRAD = 'linear-gradient(110deg,#3be8b0 0%,#3b9eff 100%)'
const fmt = (n: number) =>
  new Intl.NumberFormat('ru-RU').format(Math.round(Math.abs(n)))

const glass = (
  op = 0.06,
  bl = 18,
  border = 'rgba(255,255,255,0.1)',
): CSSProperties => ({
  background: `rgba(255,255,255,${op})`,
  backdropFilter: `blur(${bl}px) saturate(180%)`,
  WebkitBackdropFilter: `blur(${bl}px) saturate(180%)`,
  border: `1px solid ${border}`,
})

// ─── shared chrome (status bar, bottom nav, home bar) ──────────────

function Status() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 22px 0',
        position: 'relative',
        flexShrink: 0,
        zIndex: 5,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 12,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 96,
          height: 24,
          borderRadius: 999,
          background: 'rgba(0,0,0,0.88)',
          backdropFilter: 'blur(8px)',
          zIndex: 10,
        }}
      />
      <span
        style={{ fontSize: 12, fontWeight: 600, letterSpacing: '-0.01em' }}
      >
        20:51
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <svg width="15" height="10" viewBox="0 0 15 10">
          <rect
            x="0"
            y="6.5"
            width="2.2"
            height="3.5"
            rx="0.7"
            fill="rgba(255,255,255,0.85)"
          />
          <rect
            x="3.6"
            y="4.5"
            width="2.2"
            height="5.5"
            rx="0.7"
            fill="rgba(255,255,255,0.85)"
          />
          <rect
            x="7.2"
            y="2"
            width="2.2"
            height="8"
            rx="0.7"
            fill="rgba(255,255,255,0.85)"
          />
          <rect
            x="10.8"
            y="0"
            width="2.2"
            height="10"
            rx="0.7"
            fill="rgba(255,255,255,0.28)"
          />
        </svg>
        <svg width="14" height="10" viewBox="0 0 14 10">
          <path
            d="M7 7.8a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8z"
            fill="rgba(255,255,255,0.85)"
          />
          <path
            d="M3.8 5.5C4.8 4.5 5.8 4 7 4s2.2.5 3.2 1.5"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="1.3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M1.1 3.1C2.7 1.6 4.7 0.8 7 0.8s4.3.8 5.9 2.3"
            stroke="rgba(255,255,255,0.38)"
            strokeWidth="1.3"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
        <div style={{ position: 'relative', width: 21, height: 10 }}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              border: '1.4px solid rgba(255,255,255,0.42)',
              borderRadius: 2.5,
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: -2.5,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 2,
              height: 5,
              background: 'rgba(255,255,255,0.32)',
              borderRadius: '0 1px 1px 0',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 2,
              top: 2,
              bottom: 2,
              width: '20%',
              borderRadius: 1.5,
              background: C.danger,
            }}
          />
        </div>
      </div>
    </div>
  )
}

type NavKey = 'today' | 'plans' | 'capital' | 'stats'
const NAV: { k: NavKey; l: string; ic: ReactNode }[] = [
  {
    k: 'today',
    l: 'Сегодня',
    ic: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2.5" y="2.5" width="5.5" height="5.5" rx="1.3" stroke="currentColor" strokeWidth="1.5" />
        <rect x="10" y="2.5" width="5.5" height="5.5" rx="1.3" stroke="currentColor" strokeWidth="1.5" />
        <rect x="2.5" y="10" width="5.5" height="5.5" rx="1.3" stroke="currentColor" strokeWidth="1.5" />
        <rect x="10" y="10" width="5.5" height="5.5" rx="1.3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    k: 'plans',
    l: 'Планы',
    ic: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="3" y="3" width="12" height="12" rx="2.2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 9h6M6 12h4M6 6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    k: 'capital',
    l: 'Капитал',
    ic: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M2.5 14h13M5 11.5V8M8 11.5V5.5M11.5 11.5V7.5M14.5 11.5V3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    k: 'stats',
    l: 'Стат.',
    ic: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M2.5 13L6.5 8l3.5 3.5 3.5-4.5 2.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

function BottomNav({ active }: { active: NavKey }) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 12,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingLeft: 16,
        paddingRight: 16,
        zIndex: 30,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          ...glass(0.13, 26, 'rgba(255,255,255,0.15)'),
          borderRadius: 999,
          boxShadow: '0 6px 24px rgba(0,0,0,0.4)',
          flex: '0 0 auto',
          width: 220,
          gap: 12,
          padding: '7px 1px 7px 8px',
        }}
      >
        {NAV.map((t) => {
          const on = t.k === active
          return (
            <div
              key={t.k}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1.5,
                background: on ? 'rgba(255,255,255,0.12)' : 'transparent',
                borderRadius: 999,
                padding: on ? '5px 11px' : '5px 8px',
                transition: 'all .18s ease',
                minWidth: 0,
              }}
            >
              <span
                style={{
                  color: on ? C.mint : 'rgba(255,255,255,0.36)',
                  display: 'flex',
                  transition: 'color .18s',
                }}
              >
                {t.ic}
              </span>
              {on && (
                <span
                  style={{
                    fontSize: 8.5,
                    fontWeight: 600,
                    color: C.mint,
                    letterSpacing: '0.02em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {t.l}
                </span>
              )}
            </div>
          )
        })}
      </div>
      <div
        style={{
          width: 46,
          height: 46,
          borderRadius: '50%',
          background: GRAD,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 20px -4px rgba(59,232,176,0.5)',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 3v12M3 9h12" stroke="#05070a" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  )
}

function HomeBar() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 3,
        left: '50%',
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
        zIndex: 40,
      }}
    >
      <div
        style={{
          width: 110,
          height: 4,
          borderRadius: 99,
          background: 'rgba(255,255,255,0.17)',
        }}
      />
    </div>
  )
}

/**
 * Common shell for each screen — the PhoneFrame + custom status bar +
 * a positioned content area + bottom nav + home bar. The phone's
 * internal background comes from the Main Page source (two soft
 * radial glows on a near-black base).
 */
function ScreenShell({
  children,
  active,
}: {
  children: ReactNode
  active: NavKey
}) {
  return (
    <PhoneFrame>
      {/*
       * Override the default phone-screen background with the richer
       * Main Page glow. Height is constrained by .phone-screen, so the
       * children still get a scrolling viewport when they overflow.
       */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 240px 260px at 78% 0%,rgba(59,232,176,0.14) 0%,transparent 70%),radial-gradient(ellipse 200px 220px at 12% 90%,rgba(59,158,255,0.11) 0%,transparent 70%),#05070a',
          borderRadius: 'inherit',
        }}
      />
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          zIndex: 1,
        }}
      >
        <Status />
        {children}
        <BottomNav active={active} />
        <HomeBar />
      </div>
    </PhoneFrame>
  )
}

// ─── DATA (mirrors Main_Page.html) ─────────────────────────────────

const DAYS = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']
const BASE_DATE = 20
const TODAY_IDX = 3
const LIMIT = 15849
const DAY_PROGRESS = [0.02, 0.08, 0.72, 0.04, 0, 0, 0]
const DAY_DATA: Record<
  number,
  { spent: number; ops: { cat: string; icon: string; sum: number; income: boolean }[] }
> = {
  0: { spent: 320, ops: [{ cat: 'Продукты', icon: '🛒', sum: -320, income: false }] },
  1: { spent: 1200, ops: [{ cat: 'Витамины', icon: '💊', sum: -1200, income: false }] },
  2: {
    spent: 4000,
    ops: [
      { cat: 'Кафе', icon: '☕', sum: -4000, income: false },
      { cat: 'Зарплата', icon: '💰', sum: 520000, income: true },
    ],
  },
  3: {
    spent: 600,
    ops: [
      { cat: 'Продукты', icon: '🛒', sum: -600, income: false },
      { cat: 'Расход', icon: '💳', sum: -7653, income: false },
    ],
  },
  4: { spent: 0, ops: [] },
  5: { spent: 0, ops: [] },
  6: { spent: 0, ops: [] },
}
const BUDGETS = [
  { name: 'Продукты', spent: 41067, total: 30000 },
  { name: 'Витамины', spent: 0, total: 50000 },
  { name: 'Подписки', spent: 11995, total: 30000 },
]
const BCOLORS = [C.danger, C.mint, C.warn]

// ─── DayRing (progress arc around date) ────────────────────────────

function DayRing({
  pct,
  active,
  isFuture,
  date,
  label,
}: {
  pct: number
  active: boolean
  isFuture: boolean
  date: number
  label: string
}) {
  const r = 12.5
  const dash = 2 * Math.PI * r
  const offset = dash * (1 - Math.min(pct, 1))
  const ringColor =
    pct > 0.9 ? C.danger : pct > 0.7 ? C.warn : C.mint
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        padding: 0,
        flex: 1,
      }}
    >
      <span
        style={{
          fontSize: 8.5,
          fontWeight: 500,
          letterSpacing: '0.07em',
          textTransform: 'uppercase',
          color: active ? C.mint : C.dim,
        }}
      >
        {label}
      </span>
      <div style={{ position: 'relative', width: 32, height: 32 }}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}
        >
          <circle
            cx="16"
            cy="16"
            r={r}
            fill="none"
            stroke={
              isFuture ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.09)'
            }
            strokeWidth="2"
            strokeDasharray={isFuture ? '3 3' : undefined}
          />
          {pct > 0 && (
            <circle
              cx="16"
              cy="16"
              r={r}
              fill="none"
              stroke={active ? C.mint : ringColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={dash}
              strokeDashoffset={offset}
              opacity={active ? 1 : 0.7}
            />
          )}
          {active && (
            <circle
              cx="16"
              cy="16"
              r={r}
              fill="none"
              stroke={C.mint}
              strokeWidth="2"
              strokeOpacity="0.25"
            />
          )}
        </svg>
        <div
          style={{
            position: 'absolute',
            inset: 4,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: active ? 'rgba(59,232,176,0.12)' : 'transparent',
          }}
        >
          <span
            style={{
              fontSize: 12,
              fontWeight: active ? 700 : 500,
              color: active ? C.mint : isFuture ? C.dim : C.muted,
              fontVariantNumeric: 'tabular-nums',
              lineHeight: 1,
            }}
          >
            {date}
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── SCREEN: СЕГОДНЯ ───────────────────────────────────────────────

/*
 * TodayMockup — signature props preserved for backward compat with
 * HeroSection and FeaturesSection: { amount, spent, zone, streak }.
 * In the new design the exact same numbers drive the "Можешь потратить"
 * card, so the props flow through naturally.
 */
export function TodayMockup({
  amount = LIMIT,
  spent = DAY_DATA[TODAY_IDX].spent,
  streak = 5,
}: {
  amount?: number
  spent?: number
  streak?: number
  currency?: string
  zone?: 'safe' | 'warn' | 'over'
} = {}) {
  const day = TODAY_IDX
  const data = DAY_DATA[day]
  const available = amount - spent
  const spentPct = Math.min(spent / amount, 1)
  const zone =
    spentPct > 1 ? 'danger' : spentPct > 0.85 ? 'warn' : 'safe'
  const color =
    zone === 'danger' ? C.danger : zone === 'warn' ? C.warn : C.mint

  return (
    <ScreenShell active="today">
      <div
        style={{
          flex: 1,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          paddingBottom: 72,
        }}
      >
        {/* Header: brand + streak + avatar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexShrink: 0,
            padding: '32px 20px 0',
          }}
        >
          <span
            style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.04em' }}
          >
            Sanda
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                ...glass(0.07, 14, 'rgba(245,166,35,0.18)'),
                borderRadius: 999,
                padding: '4px 9px',
              }}
            >
              <span style={{ fontSize: 12 }}>🔥</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.warn }}>
                {streak}
              </span>
            </div>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                background: GRAD,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                fontWeight: 700,
                color: C.ink,
                flexShrink: 0,
              }}
            >
              АС
            </div>
          </div>
        </div>

        {/* Day picker with progress rings */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '12px 14px 0',
            flexShrink: 0,
          }}
        >
          {DAYS.map((d, i) => (
            <DayRing
              key={d}
              pct={DAY_PROGRESS[i]}
              active={i === day}
              isFuture={i > TODAY_IDX}
              date={BASE_DATE + i}
              label={d}
            />
          ))}
        </div>

        {/* Limit card */}
        <div
          style={{
            margin: '10px 14px 0',
            borderRadius: 24,
            padding: '16px 18px',
            flexShrink: 0,
            position: 'relative',
            overflow: 'hidden',
            ...glass(0.06, 22, 'rgba(255,255,255,0.08)'),
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: -50,
              right: -30,
              width: 150,
              height: 150,
              borderRadius: '50%',
              background: `radial-gradient(circle,${color}18 0%,transparent 65%)`,
              pointerEvents: 'none',
            }}
          />
          <p
            style={{
              fontSize: 9,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              color: 'rgba(255,255,255,0.3)',
              marginBottom: 8,
            }}
          >
            Можешь потратить
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 5,
              marginBottom: 8,
            }}
          >
            <span
              className="num-rise"
              style={{
                fontSize: 38,
                fontWeight: 800,
                letterSpacing: '-0.05em',
                color,
                lineHeight: 1,
                fontVariantNumeric: 'tabular-nums',
                animationDelay: '180ms',
              }}
            >
              {available < 0 ? '−' : ''}
              {fmt(available)}
            </span>
            <span
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: 'rgba(255,255,255,0.22)',
              }}
            >
              ₸
            </span>
          </div>
          <div
            style={{
              height: 2.5,
              borderRadius: 99,
              background: 'rgba(255,255,255,0.06)',
              overflow: 'hidden',
              marginBottom: 8,
            }}
          >
            <div
              className="bar-grow"
              style={{
                height: '100%',
                borderRadius: 99,
                width: `${Math.min(spentPct * 100, 100)}%`,
                background:
                  zone === 'safe'
                    ? GRAD
                    : `linear-gradient(90deg,${color},${color}99)`,
                transition: 'width .45s ease',
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              gap: 12,
              fontSize: 10.5,
              color: 'rgba(255,255,255,0.32)',
            }}
          >
            <span>
              Лимит{' '}
              <span
                style={{
                  color: 'rgba(255,255,255,0.48)',
                  fontWeight: 500,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {fmt(amount)} ₸
              </span>
            </span>
            <span>·</span>
            <span>
              Потрачено{' '}
              <span
                style={{
                  color,
                  fontWeight: 600,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {fmt(spent)} ₸
              </span>
            </span>
          </div>
        </div>

        {/* Budgets summary */}
        <div
          style={{
            ...glass(0.05, 18, 'rgba(255,255,255,0.08)'),
            borderRadius: 22,
            padding: '14px 16px',
            flexShrink: 0,
            margin: '8px 14px 12px',
          }}
        >
          <p
            style={{
              fontSize: 9,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              color: 'rgba(255,255,255,0.28)',
              marginBottom: 10,
            }}
          >
            Бюджеты
          </p>
          {BUDGETS.map((b, i) => {
            const pct = Math.min(b.spent / b.total, 1)
            const left = b.total - b.spent
            const over = b.spent > b.total
            const bc = BCOLORS[i]
            return (
              <div
                key={b.name}
                style={{ marginBottom: i < BUDGETS.length - 1 ? 10 : 0 }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}
                >
                  <span style={{ fontSize: 12.5, fontWeight: 500 }}>
                    {b.name}
                  </span>
                  <span
                    style={{
                      fontSize: 10.5,
                      fontWeight: 600,
                      fontVariantNumeric: 'tabular-nums',
                      color:
                        over
                          ? C.danger
                          : b.spent === 0
                          ? C.dim
                          : bc,
                    }}
                  >
                    {over
                      ? `−${fmt(Math.abs(left))} ₸`
                      : b.spent === 0
                      ? 'не потрачено'
                      : `${fmt(left)} ₸ ост.`}
                  </span>
                </div>
                <div
                  style={{
                    height: 2.5,
                    borderRadius: 99,
                    background: 'rgba(255,255,255,0.05)',
                    overflow: 'hidden',
                    marginBottom: 4,
                  }}
                >
                  <div
                    className="bar-grow"
                    style={{
                      height: '100%',
                      borderRadius: 99,
                      width: `${Math.min(pct * 100, 100)}%`,
                      // Stagger by ~80ms × index so the bars unfurl in
                      // sequence rather than all at once. Only fires
                      // once on first mount (CSS animation, not transition).
                      animationDelay: `${250 + i * 80}ms`,
                      background:
                        b.spent === 0
                          ? 'rgba(255,255,255,0.08)'
                          : over
                          ? `linear-gradient(90deg,${C.danger},${C.danger}88)`
                          : bc === C.mint
                          ? GRAD
                          : `linear-gradient(90deg,${bc},${bc}88)`,
                    }}
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 9.5,
                    color: 'rgba(255,255,255,0.22)',
                  }}
                >
                  <span style={{ fontVariantNumeric: 'tabular-nums' }}>
                    {b.spent > 0 ? (
                      <span style={{ color: bc, fontWeight: 500 }}>
                        {fmt(b.spent)} ₸
                      </span>
                    ) : (
                      '0 ₸'
                    )}{' '}
                    потрачено
                  </span>
                  <span style={{ fontVariantNumeric: 'tabular-nums' }}>
                    из {fmt(b.total)} ₸
                  </span>
                </div>
                {i < BUDGETS.length - 1 && (
                  <div
                    style={{
                      height: 1,
                      background: 'rgba(255,255,255,0.04)',
                      marginTop: 8,
                    }}
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* Operations (scrollable tail) */}
        <div
          style={{
            flex: 1,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            padding: '10px 14px 0',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 700 }}>Операции</span>
            <span style={{ fontSize: 9.5, color: C.dim }}>23 апреля</span>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {data.ops.length === 0 ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 44,
                  opacity: 0.32,
                }}
              >
                <span style={{ fontSize: 11, color: C.dim }}>
                  Нет операций
                </span>
              </div>
            ) : (
              data.ops.map((op, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 12px',
                    ...glass(0.04, 10, 'rgba(255,255,255,0.06)'),
                    borderRadius: 14,
                    marginBottom: 5,
                    height: 48,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <div
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 9,
                        background: op.income
                          ? 'rgba(59,232,176,0.09)'
                          : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${
                          op.income
                            ? 'rgba(59,232,176,0.18)'
                            : 'rgba(255,255,255,0.06)'
                        }`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 13,
                        flexShrink: 0,
                      }}
                    >
                      {op.icon}
                    </div>
                    <div style={{ lineHeight: 1 }}>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 500,
                          display: 'block',
                        }}
                      >
                        {op.cat}
                      </span>
                      <span style={{ fontSize: 9.5, color: C.dim }}>
                        {op.income ? 'Доход' : 'Расход'}
                      </span>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: op.income
                        ? C.mint
                        : Math.abs(op.sum) > 3000
                        ? C.danger
                        : C.warn,
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {op.income ? '+' : ''}
                    {fmt(op.sum)} ₸
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </ScreenShell>
  )
}

// ─── SCREEN: ПЛАНЫ ─────────────────────────────────────────────────

const PLAN_GROUPS = [
  {
    date: '24 апр',
    items: [{ name: 'Проект', sum: 150000, income: true }],
  },
  {
    date: '25 апр',
    items: [
      { name: 'Шторы', sum: -60000, income: false },
      { name: 'Бра', sum: -20000, income: false },
    ],
  },
  {
    date: '26 апр',
    items: [{ name: 'Аренда', sum: -180000, income: false }],
  },
]

export function PlanMockup() {
  return (
    <ScreenShell active="plans">
      <div
        style={{
          flex: 1,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          paddingBottom: 72,
        }}
      >
        <div style={{ padding: '12px 20px 0', flexShrink: 0 }}>
          <p
            style={{
              fontSize: 9,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'rgba(255,255,255,0.28)',
              marginBottom: 2,
            }}
          >
            Апрель 2026
          </p>
          <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.04em' }}>
            Планы
          </h1>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 14px 0' }}>
          {/* Income / expense */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 7,
              marginBottom: 8,
            }}
          >
            <div
              style={{
                ...glass(0.06, 18, 'rgba(59,232,176,0.16)'),
                borderRadius: 18,
                padding: '12px 14px',
              }}
            >
              <p
                style={{
                  fontSize: 8.5,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: C.mint,
                  marginBottom: 5,
                }}
              >
                Доход
              </p>
              <p
                className="num-rise"
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  color: C.mint,
                  fontVariantNumeric: 'tabular-nums',
                  lineHeight: 1,
                  animationDelay: '120ms',
                }}
              >
                +150 000
              </p>
              <p style={{ fontSize: 10, color: 'rgba(59,232,176,0.45)', marginTop: 1 }}>₸</p>
            </div>
            <div
              style={{
                ...glass(0.06, 18, 'rgba(245,166,35,0.16)'),
                borderRadius: 18,
                padding: '12px 14px',
              }}
            >
              <p
                style={{
                  fontSize: 8.5,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: C.warn,
                  marginBottom: 5,
                }}
              >
                Расход
              </p>
              <p
                className="num-rise"
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  color: C.warn,
                  fontVariantNumeric: 'tabular-nums',
                  lineHeight: 1,
                  animationDelay: '200ms',
                }}
              >
                −190 000
              </p>
              <p style={{ fontSize: 10, color: 'rgba(245,166,35,0.45)', marginTop: 1 }}>₸</p>
            </div>
          </div>

          {/* Categories */}
          <div
            style={{
              ...glass(0.05, 18, 'rgba(255,255,255,0.08)'),
              borderRadius: 20,
              padding: '12px 14px',
              marginBottom: 8,
            }}
          >
            <p
              style={{
                fontSize: 9,
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'rgba(255,255,255,0.28)',
                marginBottom: 10,
              }}
            >
              Категории
            </p>
            {BUDGETS.map((b, i) => {
              const pct = Math.min(b.spent / b.total, 1)
              const over = b.spent > b.total
              const bc = BCOLORS[i]
              return (
                <div
                  key={b.name}
                  style={{ marginBottom: i < BUDGETS.length - 1 ? 10 : 0 }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 5,
                    }}
                  >
                    <span style={{ fontSize: 12.5, fontWeight: 500 }}>
                      {b.name}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span
                        style={{
                          fontSize: 10,
                          color: C.dim,
                          fontVariantNumeric: 'tabular-nums',
                        }}
                      >
                        {fmt(b.spent)} / {fmt(b.total)} ₸
                      </span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M4.5 2.5L7.5 6 4.5 9.5"
                          stroke="rgba(255,255,255,0.2)"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div
                    style={{
                      height: 2.5,
                      borderRadius: 99,
                      background: 'rgba(255,255,255,0.05)',
                      overflow: 'hidden',
                      marginBottom: 4,
                    }}
                  >
                    <div
                      className="bar-grow"
                      style={{
                        height: '100%',
                        borderRadius: 99,
                        width: `${Math.min(pct * 100, 100)}%`,
                        animationDelay: `${250 + i * 80}ms`,
                        background: over
                          ? `linear-gradient(90deg,${C.danger},${C.danger}88)`
                          : bc === C.mint
                          ? GRAD
                          : `linear-gradient(90deg,${bc},${bc}88)`,
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 9.5,
                      color: C.dim,
                    }}
                  >
                    <span>
                      {over
                        ? `Превышен на ${fmt(b.spent - b.total)} ₸`
                        : `Осталось ${fmt(b.total - b.spent)} ₸`}
                    </span>
                    <span
                      style={{
                        color: over ? C.danger : bc,
                        fontWeight: 600,
                      }}
                    >
                      {Math.round(pct * 100)}%
                    </span>
                  </div>
                  {i < BUDGETS.length - 1 && (
                    <div
                      style={{
                        height: 1,
                        background: 'rgba(255,255,255,0.04)',
                        marginTop: 8,
                      }}
                    />
                  )}
                </div>
              )
            })}
          </div>

          {/* Planned transactions */}
          <div style={{ marginBottom: 8 }}>
            <p
              style={{
                fontSize: 9,
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'rgba(255,255,255,0.28)',
                marginBottom: 8,
              }}
            >
              Запланировано
            </p>
            {PLAN_GROUPS.map((group, gi) => (
              <div key={gi} style={{ marginBottom: 6 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginBottom: 4,
                  }}
                >
                  <span style={{ fontSize: 10, fontWeight: 500, color: C.dim }}>
                    {group.date}
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: 1,
                      background: 'rgba(255,255,255,0.05)',
                    }}
                  />
                  <span style={{ fontSize: 9.5, color: C.dim }}>
                    {group.items.reduce((s, t) => s + t.sum, 0) > 0 ? '+' : ''}
                    {fmt(
                      Math.abs(group.items.reduce((s, t) => s + t.sum, 0)),
                    )}{' '}
                    ₸
                  </span>
                </div>
                {group.items.map((item, ii) => (
                  <div
                    key={ii}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '9px 12px',
                      ...glass(0.05, 12, 'rgba(255,255,255,0.07)'),
                      borderRadius: 14,
                      marginBottom: 4,
                    }}
                  >
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: '50%',
                        border: '1.5px solid rgba(255,255,255,0.18)',
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontSize: 12.5,
                        fontWeight: 500,
                        flex: 1,
                        color: C.text,
                      }}
                    >
                      {item.name}
                    </span>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: item.income ? C.mint : C.warn,
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {item.income ? '+' : '-'}
                      {fmt(item.sum)} ₸
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Month nav */}
          <div
            style={{
              ...glass(0.06, 14, 'rgba(255,255,255,0.09)'),
              borderRadius: 999,
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 8,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M9 2.5L4.5 7 9 11.5"
                stroke={C.text}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Апрель 2026</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M5 2.5L9.5 7 5 11.5"
                stroke={C.text}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </ScreenShell>
  )
}

// ─── SCREEN: КАПИТАЛ ───────────────────────────────────────────────

const ACCOUNTS = [
  { name: 'Freedom', val: 200990 },
  { name: 'Forte travel', val: 1000 },
  { name: 'Евразийский', val: 760 },
  { name: 'Kaspi Gold', val: 687 },
  { name: 'Halyk', val: 0 },
  { name: 'Наличные', val: 0 },
]

const SAVINGS = [
  {
    name: 'Инвестиции',
    saved: 5580000,
    pct: 1,
    sub: 'Цель: 240 000 ₸/мес',
    note: 'Отложено: 340 000 ₸',
  },
  {
    name: 'Фин. подушка',
    saved: 1593563,
    pct: 1,
    sub: 'Цель: 100 000 ₸/мес',
    note: null as string | null,
  },
  {
    name: 'На поездки',
    saved: 868097,
    pct: 0.62,
    sub: 'Цель: 50 000 ₸/мес',
    note: null as string | null,
  },
]

export function CapitalMockup() {
  return (
    <ScreenShell active="capital">
      <div
        style={{
          flex: 1,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          paddingBottom: 72,
        }}
      >
        <div style={{ padding: '12px 20px 0', flexShrink: 0 }}>
          <p
            style={{
              fontSize: 9,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'rgba(255,255,255,0.28)',
              marginBottom: 2,
            }}
          >
            Все счета
          </p>
          <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.04em' }}>
            Капитал
          </h1>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 14px 0' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 6,
              marginBottom: 8,
            }}
          >
            {ACCOUNTS.map((a) => (
              <div
                key={a.name}
                style={{
                  ...glass(0.05, 14, 'rgba(255,255,255,0.08)'),
                  borderRadius: 18,
                  padding: '12px 14px',
                }}
              >
                <p style={{ fontSize: 10.5, color: C.dim, marginBottom: 5 }}>
                  {a.name}
                </p>
                <p
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    fontVariantNumeric: 'tabular-nums',
                    color: a.val > 0 ? C.text : 'rgba(255,255,255,0.25)',
                  }}
                >
                  {fmt(a.val)} ₸
                </p>
              </div>
            ))}
            <div
              style={{
                ...glass(0.03, 14, 'rgba(255,255,255,0.06)'),
                borderRadius: 18,
                padding: '12px 14px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3,
                gridColumn: '1 / -1',
              }}
            >
              <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.18)', lineHeight: 1 }}>
                +
              </span>
              <span style={{ fontSize: 11.5, color: C.dim }}>Добавить счёт</span>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              marginBottom: 8,
            }}
          >
            <span style={{ fontSize: 13 }}>🏦</span>
            <span style={{ fontSize: 13, fontWeight: 700 }}>Сбережения</span>
          </div>
          {SAVINGS.map((s, i) => (
            <div
              key={i}
              style={{
                ...glass(
                  s.pct >= 1 ? 0.07 : 0.05,
                  18,
                  s.pct >= 1
                    ? 'rgba(59,232,176,0.18)'
                    : 'rgba(255,255,255,0.08)',
                ),
                borderRadius: 20,
                padding: '12px 16px',
                marginBottom: 6,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 6,
                }}
              >
                <div>
                  <p style={{ fontSize: 12.5, fontWeight: 600, marginBottom: 2 }}>
                    {s.name}
                  </p>
                  <p style={{ fontSize: 9.5, color: C.dim }}>{s.sub}</p>
                </div>
                <p
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    fontVariantNumeric: 'tabular-nums',
                    color: s.pct >= 1 ? C.mint : C.text,
                  }}
                >
                  {fmt(s.saved)} ₸
                </p>
              </div>
              <div
                style={{
                  height: 2.5,
                  borderRadius: 99,
                  background: 'rgba(255,255,255,0.06)',
                  overflow: 'hidden',
                  marginBottom: s.note ? 5 : 0,
                }}
              >
                <div
                  className="bar-grow"
                  style={{
                    height: '100%',
                    borderRadius: 99,
                    width: `${Math.min(s.pct * 100, 100)}%`,
                    animationDelay: `${250 + i * 80}ms`,
                    background: GRAD,
                  }}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 4,
                }}
              >
                {s.note ? (
                  <p
                    style={{
                      fontSize: 9.5,
                      color: C.mint,
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {s.note}
                  </p>
                ) : (
                  <span />
                )}
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: s.pct >= 1 ? C.mint : C.muted,
                  }}
                >
                  {Math.round(s.pct * 100)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScreenShell>
  )
}
