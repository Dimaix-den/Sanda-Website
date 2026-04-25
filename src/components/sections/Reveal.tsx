import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'

/**
 * Reveal — drop-in wrapper that fades + slides its children in when
 * they enter the viewport. Designed to be unobtrusive:
 *
 *   - default: 12px translate-y, 320ms ease-out, no overshoot
 *   - runs ONCE per element (so re-scrolling doesn't re-animate)
 *   - falls back to "instantly visible" for prefers-reduced-motion
 *   - root margin = -10% so the animation triggers slightly before
 *     the element fully enters the viewport, avoiding the "pops in
 *     after I'm already looking at it" effect
 *
 * Stagger is handled by the consumer via `delay` — pass an index *
 * a small number (40-80ms) for a list. Don't go above 200ms total
 * delay or the page feels laggy.
 */
export function Reveal({
  children,
  delay = 0,
  duration = 320,
  y = 12,
  as = 'div',
  className = '',
  style,
}: {
  children: ReactNode
  /** Stagger offset in ms. Keep <= 200ms cumulatively. */
  delay?: number
  /** Animation duration in ms. */
  duration?: number
  /** Vertical translate offset in px. Smaller = more subtle. */
  y?: number
  /**
   * Tag to render. Defaults to 'div'. Kept as a string union of the
   * common containers so TS doesn't blow up trying to enumerate every
   * IntrinsicElement.
   */
  as?: 'div' | 'section' | 'span' | 'li' | 'figure'
  className?: string
  style?: CSSProperties
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Honour reduced-motion: skip the animation entirely.
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setShown(true)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true)
            io.disconnect()
            break
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const mergedStyle: CSSProperties = {
    transform: shown ? 'translateY(0)' : `translateY(${y}px)`,
    opacity: shown ? 1 : 0,
    transition: `transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, opacity ${duration}ms ease-out ${delay}ms`,
    willChange: shown ? undefined : 'transform, opacity',
    ...style,
  }

  // Render via createElement to keep the polymorphic "as" prop simple.
  // We assign a callback ref since the underlying element type varies.
  const setRef = (node: HTMLElement | null) => {
    ref.current = node
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = as as any
  return (
    <Tag ref={setRef} className={className} style={mergedStyle}>
      {children}
    </Tag>
  )
}
