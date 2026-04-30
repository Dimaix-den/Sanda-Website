import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * Horizontal carousel primitive.
 *
 * bleed=true  — track stretches to viewport edges, but the FIRST card
 *               aligns with the site's max-w-6xl grid gutter (not the
 *               physical screen edge). Achieved by computing the actual
 *               gutter width on mount/resize and applying it as
 *               padding-inline-start, while padding-inline-end stays
 *               at a fixed padInline value.
 *
 * bleed=false — track lives inside the parent container, first card
 *               naturally aligns with the content column.
 *
 * Input devices:
 *   - Mouse drag  — pointer capture, works on all desktop browsers.
 *   - Trackpad    — onWheel with deltaX, preventDefault so the page
 *                   doesn't scroll vertically at the same time.
 *   - Touch swipe — native momentum scroll (touch-action: pan-x).
 *   - Arrow keys  — CarouselArrow buttons scroll by ~one card width.
 */
export function Carousel({
  children,
  ariaLabel,
  bleed = false,
  padInline = 0,
  className = '',
}: {
  children: ReactNode
  ariaLabel?: string
  bleed?: boolean
  /** Padding on the END side (right). Start side is grid-aligned in bleed mode. */
  padInline?: number
  className?: string
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(false)
  // Computed left gutter for bleed-mode grid alignment
  const [gutterLeft, setGutterLeft] = useState(padInline)

  // ── Gutter computation (bleed only) ────────────────────────────
  // The site grid is max-w-6xl (1152px) centered. On any viewport
  // wider than 6xl the gutter = (viewportWidth - 1152) / 2 + 20px
  // (the px-5 content padding). On narrower viewports it's just 20px.
  const computeGutter = useCallback(() => {
    if (!bleed) return
    const vw = window.innerWidth
    const gridMax = 1152 // max-w-6xl
    const contentPad = 20 // px-5
    const gutter = vw > gridMax ? Math.floor((vw - gridMax) / 2) + contentPad : contentPad
    setGutterLeft(gutter)
  }, [bleed])

  useEffect(() => {
    if (!bleed) return
    computeGutter()
    window.addEventListener('resize', computeGutter, { passive: true })
    return () => window.removeEventListener('resize', computeGutter)
  }, [bleed, computeGutter])

  // ── Scroll state for arrow buttons ────────────────────────────
  const updateButtons = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setCanLeft(el.scrollLeft > 4)
    setCanRight(el.scrollLeft < max - 4)
  }, [])

  useEffect(() => {
    updateButtons()
    const el = trackRef.current
    if (!el) return
    el.addEventListener('scroll', updateButtons, { passive: true })
    const ro = new ResizeObserver(updateButtons)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', updateButtons)
      ro.disconnect()
    }
  }, [updateButtons])

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const first = el.firstElementChild as HTMLElement | null
    const cardW = first ? first.getBoundingClientRect().width : 280
    el.scrollBy({ left: dir * (cardW + 16), behavior: 'smooth' })
  }

  // ── Mouse drag ─────────────────────────────────────────────────
  const drag = useRef<{
    active: boolean
    startX: number
    startScroll: number
    moved: number
    pointerId: number | null
  }>({ active: false, startX: 0, startScroll: 0, moved: 0, pointerId: null })

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const el = trackRef.current
    if (!el) return
    drag.current = {
      active: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: 0,
      pointerId: e.pointerId,
    }
    el.setPointerCapture(e.pointerId)
    el.style.cursor = 'grabbing'
    el.style.userSelect = 'none'
    // Disable snap while dragging so it doesn't fight the gesture
    el.style.scrollSnapType = 'none'
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return
    const el = trackRef.current
    if (!el) return
    const dx = e.clientX - drag.current.startX
    drag.current.moved = Math.abs(dx)
    el.scrollLeft = drag.current.startScroll - dx
  }

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return
    const el = trackRef.current
    drag.current.active = false
    if (el) {
      try { el.releasePointerCapture(e.pointerId) } catch { /* noop */ }
      el.style.cursor = ''
      el.style.userSelect = ''
      // Re-enable snap after drag ends
      el.style.scrollSnapType = ''
    }
    if (drag.current.moved > 5) {
      // Suppress the click that fires after a drag release
      const block = (ev: Event) => { ev.preventDefault(); ev.stopPropagation() }
      window.addEventListener('click', block, { capture: true, once: true })
    }
    drag.current.moved = 0
    drag.current.pointerId = null
  }

  // ── Trackpad (two-finger horizontal swipe) ─────────────────────
  // deltaX is non-zero for horizontal trackpad swipes. We scroll the
  // track directly and call preventDefault so the page doesn't also
  // scroll vertically. We only intercept when |deltaX| > |deltaY| so
  // intentional vertical scrolling still works normally.
  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = trackRef.current
    if (!el) return
    const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY)
    if (!isHorizontal) return
    e.preventDefault()
    el.scrollLeft += e.deltaX
  }

  // ── Bleed-mode track styles ────────────────────────────────────
  const bleedStyle: React.CSSProperties = bleed
    ? {
        marginInline: 'calc((100vw - 100%) / -2)',
        width: '100vw',
        maxWidth: '100vw',
        paddingInlineStart: gutterLeft,
        paddingInlineEnd: padInline,
        // scroll-padding so snap targets align with the grid gutter
        scrollPaddingInlineStart: gutterLeft,
      }
    : { paddingInline: padInline }

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <div
        ref={trackRef}
        className="hscroll-track"
        style={bleedStyle}
        role="region"
        aria-label={ariaLabel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        onWheel={onWheel}
      >
        {children}
      </div>

      <CarouselArrow direction="left"  disabled={!canLeft}  onClick={() => scrollByCard(-1)} />
      <CarouselArrow direction="right" disabled={!canRight} onClick={() => scrollByCard(1)}  />
    </div>
  )
}

function CarouselArrow({
  direction,
  disabled,
  onClick,
}: {
  direction: 'left' | 'right'
  disabled: boolean
  onClick: () => void
}) {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight
  const side = direction === 'left' ? 'left-2' : 'right-2'
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'left' ? 'Назад' : 'Вперёд'}
      className={`absolute top-1/2 ${side} z-10 -translate-y-1/2 hidden items-center justify-center h-9 w-9 rounded-full border border-line bg-ink/80 text-text shadow-lg backdrop-blur-md transition hover:border-line-strong hover:bg-ink lg:flex ${
        disabled ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <Icon size={16} />
    </button>
  )
}
