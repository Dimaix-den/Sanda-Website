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
 * Behaviours:
 *   1. Edge-to-edge on desktop — the scrolling track fills the viewport
 *      width, so cards appear to come in from and exit to the real edge
 *      of the screen. Content-column alignment is preserved via an
 *      inset pseudo-padding equal to the user's max-w-6xl gutter.
 *   2. Mouse drag — click and hold anywhere on the track and drag to
 *      scroll. Movement > 5px suppresses the click on child anchors so
 *      a drag doesn't accidentally navigate.
 *   3. Arrow buttons on desktop — previous / next scroll by roughly one
 *      card-width. They auto-hide when there's nothing to scroll in
 *      that direction.
 *   4. Mobile touch — the browser's native inertial swipe is kept.
 *      Drag handlers only fire on pointer-type "mouse".
 */
export function Carousel({
  children,
  ariaLabel,
  bleed = true,
  padInline = 20,
  className = '',
}: {
  children: ReactNode
  ariaLabel?: string
  /**
   * When true, the track overflows its parent's max-width to reach
   * the physical viewport edge on desktop. The first card still
   * aligns to the content column via padInline.
   */
  bleed?: boolean
  /** Inner padding on both sides (keeps first/last card off the edge). */
  padInline?: number
  className?: string
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(false)

  // Drag state lives in refs — no re-renders per pointer move.
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
    // Roughly one card + gap. Use first-child width as the unit.
    const first = el.firstElementChild as HTMLElement | null
    const cardW = first ? first.getBoundingClientRect().width : 280
    const gap = 16
    el.scrollBy({ left: dir * (cardW + gap), behavior: 'smooth' })
  }

  // Drag handlers — mouse only. Touch uses native swipe.
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

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return
    const el = trackRef.current
    drag.current.active = false
    if (el && drag.current.pointerId !== null) {
      try {
        el.releasePointerCapture(drag.current.pointerId)
      } catch {
        // noop — pointer may already be released
      }
      el.style.cursor = ''
      el.style.userSelect = ''
    }
    drag.current.pointerId = null

    // If we dragged more than a few pixels, swallow the next click
    // so child links don't fire from the drag.
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
          // Bleed-to-edge on desktop: negative margin pulls the track
          // out of its parent's max-width. Calculated at runtime via
          // a CSS variable so the rule stays tidy.
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

      {/* Arrow controls — hidden on touch-only viewports (mobile) */}
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
  const side = direction === 'left' ? 'left-4' : 'right-4'
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'left' ? 'Назад' : 'Вперёд'}
      disabled={disabled}
      // Hidden on touch (lg:) so it doesn't overlay the carousel on mobile
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
