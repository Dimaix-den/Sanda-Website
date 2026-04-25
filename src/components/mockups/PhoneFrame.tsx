import { type ReactNode } from 'react'

/**
 * Physical phone frame + screen area. Rounded dark bezel, fluid width.
 *
 * noNotch: when the inner mockup renders its own dynamic-island /
 * notch pill inside its status bar (as our v8 ported screens do),
 * we skip the default .notch element here to avoid stacking two.
 */
export function PhoneFrame({
  children,
  className = '',
  noNotch = true,
}: {
  children: ReactNode
  className?: string
  noNotch?: boolean
}) {
  return (
    <div className={`phone-frame ${className}`}>
      <div className="phone-screen">
        {!noNotch && <div className="notch" />}
        {children}
      </div>
    </div>
  )
}

export function StatusBar({ time = '9:41' }: { time?: string }) {
  return (
    <div className="flex flex-shrink-0 items-center justify-between px-5 pt-2.5 pb-1 text-[11px] font-semibold text-white">
      <span>{time}</span>
      <div className="flex items-center gap-1">
        <SignalIcon />
        <WifiIcon />
        <BatteryIcon />
      </div>
    </div>
  )
}

function SignalIcon() {
  return (
    <svg width="14" height="9" viewBox="0 0 14 9" fill="currentColor">
      <rect x="0" y="6" width="2" height="3" rx="0.5" />
      <rect x="4" y="4" width="2" height="5" rx="0.5" />
      <rect x="8" y="2" width="2" height="7" rx="0.5" />
      <rect x="12" y="0" width="2" height="9" rx="0.5" />
    </svg>
  )
}

function WifiIcon() {
  return (
    <svg width="14" height="9" viewBox="0 0 14 9" fill="currentColor">
      <path d="M7 8.5a1 1 0 110-2 1 1 0 010 2zM2.3 4.3a6.6 6.6 0 019.4 0l-1.1 1.1a5 5 0 00-7.2 0L2.3 4.3zM.3 2.3a9.4 9.4 0 0113.4 0l-1.1 1.1a7.8 7.8 0 00-11.2 0L.3 2.3z" />
    </svg>
  )
}

function BatteryIcon() {
  return (
    <svg width="24" height="11" viewBox="0 0 24 11">
      <rect
        x="0.5"
        y="0.5"
        width="20"
        height="10"
        rx="2.5"
        stroke="currentColor"
        fill="none"
        opacity="0.5"
      />
      <rect x="2" y="2" width="16" height="7" rx="1.2" fill="currentColor" />
      <rect x="21.5" y="3.5" width="1.5" height="4" rx="0.7" fill="currentColor" opacity="0.5" />
    </svg>
  )
}
