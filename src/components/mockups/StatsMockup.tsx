import { PhoneFrame } from './PhoneFrame'
import type { CSSProperties, ReactNode } from 'react'

// NOTE: This file intentionally duplicates a few tokens/helpers from
// AppMockups.tsx. They're small, and keeping StatsMockup self-contained
// lets the other file stay readable. The tokens match C / GRAD / glass
// 1:1 so visual consistency is preserved.

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

// ─── Status / BottomNav / HomeBar — identical to AppMockups ────────
// These are small enough that duplicating them beats exporting.

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
      <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '-0.01em' }}>
        20:51
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <svg width="15" height="10" viewBox="0 0 15 10">
          <rect x="0" y="6.5" width="2.2" height="3.5" rx="0.7" fill="rgba(255,255,255,0.85)" />
          <rect x="3.6" y="4.5" width="2.2" height="5.5" rx="0.7" fill="rgba(255,255,255,0.85)" />
          <rect x="7.2" y="2" width="2.2" height="8" rx="0.7" fill="rgba(255,255,255,0.85)" />
          <rect x="10.8" y="0" width="2.2" height="10" rx="0.7" fill="rgba(255,255,255,0.28)" />
        </svg>
        <svg width="14" height="10" viewBox="0 0 14 10">
          <path d="M7 7.8a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8z" fill="rgba(255,255,255,0.85)" />
          <path d="M3.8 5.5C4.8 4.5 5.8 4 7 4s2.2.5 3.2 1.5" stroke="rgba(255,255,255,0.85)" strokeWidth="1.3" strokeLinecap="round" fill="none" />
          <path d="M1.1 3.1C2.7 1.6 4.7 0.8 7 0.8s4.3.8 5.9 2.3" stroke="rgba(255,255,255,0.38)" strokeWidth="1.3" strokeLinecap="round" fill="none" />
        </svg>
        <div style={{ position: 'relative', width: 21, height: 10 }}>
          <div style={{ position: 'absolute', inset: 0, border: '1.4px solid rgba(255,255,255,0.42)', borderRadius: 2.5 }} />
          <div style={{ position: 'absolute', right: -2.5, top: '50%', transform: 'translateY(-50%)', width: 2, height: 5, background: 'rgba(255,255,255,0.32)', borderRadius: '0 1px 1px 0' }} />
          <div style={{ position: 'absolute', left: 2, top: 2, bottom: 2, width: '20%', borderRadius: 1.5, background: C.danger }} />
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
    <div style={{ position: 'absolute', bottom: 12, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, paddingLeft: 16, paddingRight: 16, zIndex: 30 }}>
      <div style={{ display: 'flex', alignItems: 'center', ...glass(0.13, 26, 'rgba(255,255,255,0.15)'), borderRadius: 999, boxShadow: '0 6px 24px rgba(0,0,0,0.4)', flex: '0 0 auto', width: 220, gap: 12, padding: '7px 1px 7px 8px' }}>
        {NAV.map((t) => {
          const on = t.k === active
          return (
            <div key={t.k} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, background: on ? 'rgba(255,255,255,0.12)' : 'transparent', borderRadius: 999, padding: on ? '5px 11px' : '5px 8px', transition: 'all .18s ease', minWidth: 0 }}>
              <span style={{ color: on ? C.mint : 'rgba(255,255,255,0.36)', display: 'flex', transition: 'color .18s' }}>{t.ic}</span>
              {on && <span style={{ fontSize: 8.5, fontWeight: 600, color: C.mint, letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>{t.l}</span>}
            </div>
          )
        })}
      </div>
      <div style={{ width: 46, height: 46, borderRadius: '50%', background: GRAD, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 20px -4px rgba(59,232,176,0.5)' }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 3v12M3 9h12" stroke="#05070a" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  )
}

function HomeBar() {
  return (
    <div style={{ position: 'absolute', bottom: 3, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none', zIndex: 40 }}>
      <div style={{ width: 110, height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.17)' }} />
    </div>
  )
}

// ─── Sparkline ─────────────────────────────────────────────────────

function Spark({ points, color }: { points: number[]; color: string }) {
  const w = 56
  const h = 28
  const min = Math.min(...points)
  const max = Math.max(...points)
  const rng = max - min || 1
  const pts = points
    .map(
      (p, i) =>
        `${(i / (points.length - 1)) * w},${h - ((p - min) / rng) * h}`,
    )
    .join(' ')
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible' }}>
      <polygon points={`${pts} ${w},${h} 0,${h}`} fill={`${color}1a`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Stats data ────────────────────────────────────────────────────

const STATS = [
  { label: 'Капитал', icon: '🏛', value: '69 688 840', suf: '₸', color: C.danger, pts: [80, 75, 78, 72, 70, 68, 65, 63] },
  { label: 'Денежный поток', icon: '↕', value: '+901 391', suf: '₸', color: C.mint, pts: [20, 30, 25, 35, 40, 38, 50, 60, 70] },
  { label: 'Доходы', icon: '↗', value: '1 508 241', suf: '₸', color: C.mint, pts: [10, 20, 18, 30, 35, 32, 45, 55] },
  { label: 'Расходы', icon: '↘', value: '−606 850', suf: '₸', color: C.warn, pts: [5, 15, 20, 25, 30, 28, 40, 50] },
]

const PERIODS = ['День', 'Неделя', 'Месяц', 'Год']
const ACTIVE_PERIOD = 'Месяц'

// ─── SCREEN: СТАТИСТИКА ────────────────────────────────────────────

export function StatsMockup() {
  return (
    <PhoneFrame>
      {/* richer page background (matches Main_Page phone body) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 240px 260px at 78% 0%,rgba(59,232,176,0.14) 0%,transparent 70%),radial-gradient(ellipse 200px 220px at 12% 90%,rgba(59,158,255,0.11) 0%,transparent 70%),#05070a',
          borderRadius: 'inherit',
        }}
      />
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%', zIndex: 1 }}>
        <Status />
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
              Обзор
            </p>
            <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.04em' }}>
              Статистика
            </h1>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '10px 14px 0' }}>
            {STATS.map((s, i) => (
              <div
                key={i}
                style={{
                  ...glass(0.05, 18, 'rgba(255,255,255,0.08)'),
                  borderRadius: 20,
                  padding: '12px 16px',
                  marginBottom: 6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                      marginBottom: 5,
                    }}
                  >
                    <span style={{ fontSize: 11, color: s.color }}>{s.icon}</span>
                    <span style={{ fontSize: 10.5, color: C.dim }}>{s.label}</span>
                  </div>
                  <span
                    style={{
                      fontSize: 20,
                      fontWeight: 800,
                      letterSpacing: '-0.04em',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {s.value}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.28)',
                      marginLeft: 3,
                    }}
                  >
                    {s.suf}
                  </span>
                </div>
                <Spark points={s.pts} color={s.color} />
              </div>
            ))}

            {/* Discipline card */}
            <div
              style={{
                ...glass(0.05, 18, 'rgba(255,255,255,0.08)'),
                borderRadius: 20,
                padding: '12px 16px 24px',
                marginBottom: 4,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  marginBottom: 8,
                }}
              >
                <span style={{ fontSize: 11, color: C.mint }}>◎</span>
                <span style={{ fontSize: 10.5, color: C.dim }}>
                  Дисциплина бюджета
                </span>
              </div>
              <div
                style={{
                  height: 3,
                  borderRadius: 99,
                  background: 'rgba(255,255,255,0.06)',
                  overflow: 'hidden',
                  marginBottom: 7,
                }}
              >
                <div
                  style={{
                    height: '100%',
                    borderRadius: 99,
                    width: '74%',
                    background: GRAD,
                  }}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: 10, color: C.dim }}>
                  17 дн. в бюджете
                </span>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.mint }}>
                  74%
                </span>
                <span style={{ fontSize: 10, color: C.danger }}>
                  6 дн. перерасход
                </span>
              </div>
            </div>

            {/* Period pills */}
            <div
              style={{
                ...glass(0.07, 14, 'rgba(255,255,255,0.09)'),
                borderRadius: 999,
                padding: 4,
                display: 'flex',
                marginBottom: 7,
              }}
            >
              {PERIODS.map((p) => (
                <div
                  key={p}
                  style={{
                    flex: 1,
                    padding: '6px 4px',
                    borderRadius: 999,
                    textAlign: 'center',
                    fontSize: 11.5,
                    fontWeight: 500,
                    background:
                      p === ACTIVE_PERIOD ? 'rgba(255,255,255,0.13)' : 'transparent',
                    color: p === ACTIVE_PERIOD ? C.text : C.dim,
                  }}
                >
                  {p}
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
              <span style={{ fontSize: 13, fontWeight: 600 }}>Этот месяц</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M5 2.5L9.5 7 5 11.5"
                  stroke={'rgba(255,255,255,0.18)'}
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
        <BottomNav active="stats" />
        <HomeBar />
      </div>
    </PhoneFrame>
  )
}
