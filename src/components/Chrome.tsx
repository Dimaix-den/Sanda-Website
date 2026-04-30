import { Link } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { BetaButton } from './BetaModal'

export function Logo({ size = 28 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="relative flex items-center justify-center overflow-hidden rounded-xl"
        style={{ width: size, height: size, background: '#000' }}
      >
        <img src="/sanda-icon.png" alt="Sanda" width={size} height={size} className="object-cover" />
      </span>
      <span className="text-[17px] font-semibold tracking-tight text-white">Sanda</span>
    </div>
  )
}

const navItems = [
  { label: 'Как работает', href: '#features' },
  { label: 'Возможности', href: '#features' },
  { label: 'Истории', href: '#people' },
  { label: 'Сравнение', href: '#compare' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [dragX, setDragX] = useState<number | null>(null)
  const drawerRef = useRef<HTMLElement | null>(null)
  // Store scroll position at the moment the drawer opens
  const savedScroll = useRef(0)

  const swipe = useRef<{
    active: boolean
    startX: number
    startY: number
    locked: 'x' | 'y' | null
    width: number
    pointerId: number | null
  }>({ active: false, startX: 0, startY: 0, locked: null, width: 320, pointerId: null })

  // ── Body scroll lock ──────────────────────────────────────────
  // When the drawer opens: save scrollY, freeze body with position:fixed.
  // When the drawer closes: restore position WITHOUT scrollTo (avoids
  // the visible scroll animation that was jumping the page).
  useEffect(() => {
    if (open) {
      savedScroll.current = window.scrollY
      document.body.style.setProperty('--menu-scroll-y', `${savedScroll.current}px`)
      document.body.classList.add('menu-open')
    } else {
      if (document.body.classList.contains('menu-open')) {
        // Remove the lock class first so position:fixed goes away
        document.body.classList.remove('menu-open')
        document.body.style.removeProperty('--menu-scroll-y')
        // Then immediately jump to the saved scroll position.
        // Use scrollTo with behavior:'instant' so there's NO animation.
        window.scrollTo({ top: savedScroll.current, behavior: 'instant' as ScrollBehavior })
      }
    }
  }, [open])

  // Close at desktop breakpoint
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const handler = (e: MediaQueryListEvent) => { if (e.matches) setOpen(false) }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // ── Swipe-to-close (touch + mouse) ───────────────────────────
  function onPointerDown(e: React.PointerEvent) {
    const drawer = drawerRef.current
    if (!drawer) return
    swipe.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      locked: null,
      width: drawer.offsetWidth,
      pointerId: e.pointerId,
    }
    try { drawer.setPointerCapture(e.pointerId) } catch { /* noop */ }
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!swipe.current.active || e.pointerId !== swipe.current.pointerId) return
    const dx = e.clientX - swipe.current.startX
    const dy = e.clientY - swipe.current.startY
    if (!swipe.current.locked) {
      swipe.current.locked = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
    }
    if (swipe.current.locked === 'x' && dx > 0) setDragX(dx)
  }

  function endSwipe(e: React.PointerEvent) {
    if (!swipe.current.active || e.pointerId !== swipe.current.pointerId) return
    const dx = e.clientX - swipe.current.startX
    swipe.current.active = false
    setDragX(null)
    if (dx > swipe.current.width * 0.35) setOpen(false)
  }

  const isDragging = dragX !== null && dragX > 0
  const backdropOpacity = isDragging ? Math.max(0, 1 - dragX! / swipe.current.width) : undefined

  return (
    <>
      {/* ── Header ────────────────────────────────────────────── */}
      <header className="mobile-header fixed inset-x-3 z-50 rounded-full border border-line bg-ink/80 backdrop-blur-xl lg:static lg:inset-x-auto lg:rounded-none lg:border-x-0 lg:border-b lg:border-t-0 lg:bg-ink/70">
        <div className="lg:sticky lg:top-0 lg:z-50">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-3 md:px-5">
            <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
              <Logo />
            </Link>

            <nav className="hidden items-center gap-8 text-sm text-text-muted lg:flex">
              {navItems.map((it) => (
                <a key={it.label} href={it.href} className="hover:text-text">{it.label}</a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <div className="hidden lg:block">
                <BetaButton className="btn-primary !px-4 !py-2 text-sm">Скачать</BetaButton>
              </div>
              <button
                type="button"
                aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
                aria-expanded={open}
                aria-controls="mobile-nav"
                onClick={() => setOpen((v) => !v)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/[0.04] text-text transition active:scale-95 lg:hidden"
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="mobile-header-spacer lg:hidden" aria-hidden />

      {/* ── Backdrop (no blur — prevents Safari safe-area black strips) ── */}
      <div
        aria-hidden={!open}
        onClick={() => setOpen(false)}
        style={backdropOpacity !== undefined ? { opacity: backdropOpacity, transition: 'none' } : undefined}
        className={`fixed inset-0 z-40 bg-black/70 transition-opacity duration-300 lg:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* ── Drawer ────────────────────────────────────────────── */}
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
        style={{
          backgroundColor: '#05070a',
          ...(isDragging ? { transform: `translateX(${dragX}px)`, transition: 'none' } : {}),
        }}
        className={`fixed inset-y-0 right-0 z-50 flex w-[88%] max-w-[360px] flex-col border-l border-line shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Grab-handle */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 flex w-5 items-center justify-center">
          <div className="h-10 w-1 rounded-full bg-white/10" />
        </div>

        {/* Drawer header */}
        <div
          className="flex flex-shrink-0 items-center justify-between border-b border-line px-5 pb-4"
          style={{ paddingTop: 'max(env(safe-area-inset-top), 16px)', minHeight: 72 }}
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-text-dim">Меню</span>
          <button
            type="button"
            aria-label="Закрыть меню"
            onClick={() => setOpen(false)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/[0.04] text-text transition active:scale-95"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1.5 overflow-y-auto px-5 py-5">
          {navItems.map((it) => (
            <a
              key={it.label}
              href={it.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-2xl border border-line bg-white/[0.02] px-4 py-4 text-base font-medium text-text transition active:bg-white/[0.04]"
            >
              <span>{it.label}</span>
              <span aria-hidden className="text-text-dim">→</span>
            </a>
          ))}
        </nav>

        <div
          className="flex-shrink-0 border-t border-line px-5 pt-5"
          style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 20px)' }}
        >
          <BetaButton className="btn-primary w-full" onClick={() => setOpen(false)}>
            Скачать в TestFlight
          </BetaButton>
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
        <FooterCol title="Продукт" items={[
          { label: 'Возможности', href: '#features' },
          { label: 'Как работает', href: '#features' },
          { label: 'Сравнение', href: '#compare' },
        ]} />
        <FooterCol title="Помощь" items={[
          { label: 'Вопросы', href: '/faq' },
          { label: 'Связаться', href: 'mailto:hello@sandawallet.com' },
          { label: 'Telegram-канал', href: '#' },
        ]} />
        <FooterCol title="Правовая информация" items={[
          { label: 'Политика конфиденциальности', href: '/legal#privacy' },
          { label: 'Условия использования', href: '/legal#terms' },
          { label: 'Безопасность данных', href: '/legal#privacy' },
        ]} />
      </div>
      <div className="border-t border-line py-5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 text-xs text-text-dim md:flex-row">
          <p>Sanda — финансовый помощник, не банк. Решения о тратах остаются за тобой.</p>
          <p>Сделано в СНГ · с уважением к деньгам и людям</p>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-sm font-semibold text-text">{title}</p>
      <ul className="mt-4 space-y-2.5 text-sm text-text-muted">
        {items.map((it) => (
          <li key={it.label}>
            <a href={it.href} className="hover:text-text">{it.label}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
