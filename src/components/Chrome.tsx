import { Link } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'

export function Logo({ size = 28 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="relative flex items-center justify-center overflow-hidden rounded-xl"
        style={{ width: size, height: size, background: '#000' }}
      >
        <img
          src="/sanda-icon.png"
          alt="Sanda"
          width={size}
          height={size}
          className="object-cover"
        />
      </span>
      <span className="text-[17px] font-semibold tracking-tight text-white">
        Sanda
      </span>
    </div>
  )
}

const navItems = [
  { label: 'Как работает', href: '#try' },
  { label: 'Возможности', href: '#features' },
  { label: 'Истории', href: '#people' },
  { label: 'Сравнение', href: '#compare' },
]

export function Header() {
  const [open, setOpen] = useState(false)

  // Transient translation during a swipe-to-close gesture. Null when
  // the user isn't dragging — the drawer then uses its CSS transition.
  const [dragX, setDragX] = useState<number | null>(null)
  const drawerRef = useRef<HTMLElement | null>(null)
  const swipe = useRef<{
    active: boolean
    startX: number
    startY: number
    locked: 'x' | 'y' | null
    width: number
    pointerId: number | null
  }>({
    active: false,
    startX: 0,
    startY: 0,
    locked: null,
    width: 320,
    pointerId: null,
  })

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  // Close if the viewport crosses into desktop.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Close on Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Reset drag state when the drawer closes.
  useEffect(() => {
    if (!open) setDragX(null)
  }, [open])

  /**
   * Swipe-to-close — the drawer sits on the right side, so a right-going
   * drag should reveal more of the page and eventually close. We track
   * horizontal delta and translate the drawer accordingly. Vertical
   * intent (scrolling the menu itself) locks the gesture to 'y' and
   * lets native scroll take over.
   */
  const onPointerDown = (e: React.PointerEvent<HTMLElement>) => {
    // Only touch or pen — mouse users will click the backdrop or X.
    if (e.pointerType === 'mouse') return
    const el = drawerRef.current
    if (!el) return
    swipe.current.active = true
    swipe.current.startX = e.clientX
    swipe.current.startY = e.clientY
    swipe.current.locked = null
    swipe.current.width = el.offsetWidth || 320
    swipe.current.pointerId = e.pointerId
  }

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!swipe.current.active) return
    const dx = e.clientX - swipe.current.startX
    const dy = e.clientY - swipe.current.startY

    // Decide axis once we have a clear direction.
    if (swipe.current.locked === null) {
      const adx = Math.abs(dx)
      const ady = Math.abs(dy)
      if (adx < 6 && ady < 6) return
      swipe.current.locked = adx > ady ? 'x' : 'y'
    }

    if (swipe.current.locked === 'y') return

    // Only a rightward drag closes the right-side drawer. Left drag
    // is clamped to 0 so the drawer can't be pulled past its home.
    const clamped = Math.max(0, dx)
    setDragX(clamped)
  }

  const endSwipe = () => {
    if (!swipe.current.active) return
    const dx = dragX ?? 0
    swipe.current.active = false
    swipe.current.pointerId = null

    // Close if the user dragged more than ~40% of the drawer width.
    if (dx > swipe.current.width * 0.4) {
      setOpen(false)
      // dragX will be reset by the effect that watches `open`.
    } else {
      setDragX(null)
    }
    swipe.current.locked = null
  }

  const isDragging = dragX !== null && dragX > 0
  const backdropOpacity = isDragging
    ? Math.max(0, 1 - dragX / swipe.current.width)
    : undefined

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-ink/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link
            to="/"
            className="flex items-center"
            onClick={() => setOpen(false)}
          >
            <Logo />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 text-sm text-text-muted lg:flex">
            {navItems.map((it) => (
              <a key={it.href} href={it.href} className="hover:text-text">
                {it.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href="#cta" className="btn-primary !px-4 !py-2 text-sm">
              Скачать
            </a>

            <button
              type="button"
              aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/[0.02] text-text transition hover:border-line-strong lg:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop — tap to close, fades as the user swipes. */}
      <div
        aria-hidden={!open}
        onClick={() => setOpen(false)}
        style={
          backdropOpacity !== undefined
            ? { opacity: backdropOpacity, transition: 'none' }
            : undefined
        }
        className={`fixed inset-0 z-40 bg-black/55 backdrop-blur-md transition-opacity duration-200 lg:hidden ${
          open
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      />

      {/*
       * Drawer — swipe-right-to-close on touch. During the drag we
       * disable the CSS transition (inline style) so the drawer sticks
       * to the finger; on release it either snaps back or closes.
       */}
      <aside
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Меню навигации"
        ref={drawerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endSwipe}
        onPointerCancel={endSwipe}
        style={
          isDragging
            ? {
                transform: `translateX(${dragX}px)`,
                transition: 'none',
              }
            : undefined
        }
        className={`fixed inset-y-0 right-0 z-50 flex w-[88%] max-w-[360px] flex-col border-l border-line bg-ink/95 backdrop-blur-2xl shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/*
         * Grab handle — a slim vertical bar on the left edge of the
         * drawer that hints "you can drag me". Purely visual.
         */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 flex w-4 items-center justify-center"
        >
          <div className="h-10 w-1 rounded-full bg-white/15" />
        </div>

        <div className="flex h-16 flex-shrink-0 items-center justify-between border-b border-line px-5">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-text-dim">
            Меню
          </span>
          <button
            type="button"
            aria-label="Закрыть меню"
            onClick={() => setOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/[0.02] text-text transition hover:border-line-strong"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-5 py-5">
          {navItems.map((it) => (
            <a
              key={it.href}
              href={it.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-2xl border border-line bg-white/[0.02] px-4 py-3 text-base font-medium text-text transition hover:border-line-strong"
            >
              <span>{it.label}</span>
              <span aria-hidden className="text-text-dim">
                →
              </span>
            </a>
          ))}
        </nav>

        <div className="flex-shrink-0 border-t border-line px-5 py-5">
          <a
            href="#cta"
            onClick={() => setOpen(false)}
            className="btn-primary w-full"
          >
            Скачать для iOS
          </a>
          <p className="mt-3 text-center text-xs text-text-dim">
            Бесплатно · iOS · Android (скоро)
          </p>
        </div>
      </aside>
    </>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 py-12 md:grid-cols-4 md:gap-10 md:py-14">
        <div className="col-span-2 md:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-text-muted">
            Одна цифра вместо таблиц. Спокойные деньги на каждый день.
          </p>
          <p className="mt-6 text-xs text-text-dim">© 2026 Sanda. Версия 3.0.0</p>
        </div>

        <FooterCol
          title="Продукт"
          items={[
            { label: 'Возможности', href: '#features' },
            { label: 'Как работает', href: '#try' },
            { label: 'Сравнение', href: '#compare' },
          ]}
        />
        <FooterCol
          title="Помощь"
          items={[
            { label: 'Вопросы', href: '/faq' },
            { label: 'Связаться', href: 'mailto:hello@sanda.app' },
            { label: 'Telegram-канал', href: '#' },
          ]}
        />
        <FooterCol
          title="Правовая информация"
          items={[
            { label: 'Политика конфиденциальности', href: '/confidential' },
            { label: 'Условия использования', href: '#' },
            { label: 'Безопасность данных', href: '#' },
          ]}
        />
      </div>
      <div className="border-t border-line py-5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 text-xs text-text-dim md:flex-row">
          <p>
            Sanda — финансовый помощник, не банк. Решения о тратах остаются за
            тобой.
          </p>
          <p>Сделано в СНГ · с уважением к деньгам и людям</p>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({
  title,
  items,
}: {
  title: string
  items: { label: string; href: string }[]
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-text">{title}</p>
      <ul className="mt-4 space-y-2.5 text-sm text-text-muted">
        {items.map((it) => (
          <li key={it.label}>
            <a href={it.href} className="hover:text-text">
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
