import { useEffect, useRef, useState } from 'react'

/**
 * useCountUp — animates a number from 0 → `target` once the bound
 * element scrolls into view.
 *
 * Returns:
 *   ref — attach to the element that should trigger the animation
 *   value — the current animated number to render
 *
 * Honors prefers-reduced-motion (jumps straight to target).
 * The animation runs ONCE per mount.
 */
export function useCountUp(
  target: number,
  {
    duration = 900,
    delay = 0,
  }: { duration?: number; delay?: number } = {},
) {
  const [value, setValue] = useState(target)
  const ref = useRef<HTMLElement | null>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (startedRef.current) return

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setValue(target)
      startedRef.current = true
      return
    }

    // Start hidden — i.e. at 0 — so the count is visible.
    setValue(0)

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true
            io.disconnect()

            const start = performance.now() + delay
            const end = start + duration
            // ease-out cubic — fast at start, smooth landing
            const ease = (t: number) => 1 - Math.pow(1 - t, 3)

            let raf = 0
            const tick = (now: number) => {
              if (now < start) {
                raf = requestAnimationFrame(tick)
                return
              }
              const t = Math.min(1, (now - start) / (end - start))
              const v = Math.round(target * ease(t))
              setValue(v)
              if (t < 1) {
                raf = requestAnimationFrame(tick)
              }
            }
            raf = requestAnimationFrame(tick)
            return () => cancelAnimationFrame(raf)
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [target, duration, delay])

  return [ref, value] as const
}
