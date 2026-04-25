import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * Horizontal carousel primitive used for mini-features, testimonials,
 * and anywhere a row of cards needs to scroll horizontally.
 *
 * v7 change: `bleed` now defaults to FALSE. The track obeys its parent
 * container's max-width and left grid-gutter, so the first card lines
 * up with the rest of the content. Set `bleed` explicitly to true if
 * you want the desktop edge-to-edge effect.
 *
 * Behaviours:
 *   - Arrow buttons on desktop — previous / next by ~ one card-width.
 *     Auto-hide when there's nothing to scroll in that direction.
 *   - Mouse drag — click and hold anywhere on the track to pan. A drag
 *     > 5px suppresses the next click to avoid accidental navigation.
 *   - Mobile touch — native inertial swipe. Drag handlers only bind to
 *     pointerType === 'mouse'.
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
  /**
   * When true, the track overflows its parent's max-width and reaches
   * the physical viewport edge on desktop. When false (default), the
   * track lives inside the content column — first card aligns with the
   * site's left grid line.
   */
  bleed?: boolean
  /** Inner padding on both sides. 0 by default so the first card
   * hugs the parent's gutter naturally. */
  padInline?: number
  className?: string
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(false)

  const drag = useRef<{
    active: boolean
    startX: number
    startScroll: number
    moved: number
    pointerId: number | null
  }>({
    active: false,
    startX: 0,
    startScroll: 0,
    moved: 0,
    pointerId: null,
  })

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

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const first = el.firstElementChild as HTMLElement | null
    const cardW = first ? first.getBoundingClientRect().width : 280
    const gap = 16
    el.scrollBy({ left: dir * (cardW + gap), behavior: 'smooth' })
  }

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const el = trackRef.current
    if (!el) return
    drag.current.active = true
    drag.current.startX = e.clientX
    drag.current.startScroll = el.scrollLeft
    drag.current.moved = 0
    drag.current.pointerId = e.pointerId
    el.setPointerCapture(e.pointerId)
    el.style.cursor = 'grabbing'
    el.style.userSelect = 'none'
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return
    const el = trackRef.current
    if (!el) return
    const dx = e.clientX - drag.current.startX
    drag.current.moved = Math.abs(dx)
    el.scrollLeft = drag.current.startScroll - dx
  }

  const endDrag = () => {
    if (!drag.current.active) return
    const el = trackRef.current
    drag.current.active = false
    if (el && drag.current.pointerId !== null) {
      try {
        el.releasePointerCapture(drag.current.pointerId)
      } catch {
        // noop
      }
      el.style.cursor = ''
      el.style.userSelect = ''
    }
    drag.current.pointerId = null

    if (drag.current.moved > 5) {
      const block = (ev: Event) => {
        ev.preventDefault()
        ev.stopPropagation()
      }
      window.addEventListener('click', block, { capture: true, once: true })
    }
    drag.current.moved = 0
  }

  return (
    <div className={`relative ${className}`}>
      <div
        ref={trackRef}
        className="hscroll-track"
        style={{
          paddingInline: padInline,
          // Bleed mode only: break out of the parent's max-width.
          ...(bleed
            ? ({
                marginInline: 'calc((100vw - 100%) / -2)',
                width: '100vw',
                maxWidth: '100vw',
              } as React.CSSProperties)
            : {}),
        }}
        role="region"
        aria-label={ariaLabel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
      >
        {children}
      </div>

      <CarouselArrow
        direction="left"
        disabled={!canLeft}
        onClick={() => scrollBy(-1)}
      />
      <CarouselArrow
        direction="right"
        disabled={!canRight}
        onClick={() => scrollBy(1)}
      />
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
      disabled={disabled}
      className={`absolute top-1/2 ${side} z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-ink/80 text-text shadow-xl backdrop-blur-xl transition lg:flex ${
        disabled
          ? 'pointer-events-none opacity-0'
          : 'opacity-100 hover:border-line-strong hover:bg-ink/95'
      }`}
    >
      <Icon size={18} />
    </button>
  )
}
