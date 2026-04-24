import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
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

  // Lock body scroll while the drawer is open so the page underneath
  // doesn't scroll with the user's finger on iOS.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  // Close the drawer when the viewport crosses into desktop (lg) so it
  // doesn't linger as an invisible blocker.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
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
          <a
            href="#cta"
            className="btn-primary hidden !px-4 !py-2 text-sm sm:inline-flex"
          >
            Скачать
          </a>

          {/*
           * Mobile hamburger — only visible below lg. Swaps to an X while
           * the drawer is open, and toggles the drawer on tap.
           */}
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

      {/*
       * Mobile drawer — sits just below the header bar, fills the rest
       * of the viewport. Backdrop-blur mirrors the header so it feels
       * like the same surface expanded downward.
       */}
      <div
        id="mobile-nav"
        className={`fixed inset-x-0 top-16 z-40 origin-top border-b border-line bg-ink/95 backdrop-blur-xl transition-all duration-200 lg:hidden ${
          open
            ? 'pointer-events-auto opacity-100 translate-y-0'
            : 'pointer-events-none -translate-y-2 opacity-0'
        }`}
        role="dialog"
        aria-modal="true"
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
          {navItems.map((it) => (
            <a
              key={it.href}
              href={it.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-2xl border border-line bg-white/[0.02] px-4 py-3 text-base font-medium text-text transition hover:border-line-strong"
            >
              <span>{it.label}</span>
              <span aria-hidden className="text-text-dim">→</span>
            </a>
          ))}
          <a
            href="#cta"
            onClick={() => setOpen(false)}
            className="btn-primary mt-3 w-full"
          >
            Скачать для iOS
          </a>
        </nav>
      </div>
    </header>
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
          <p>Sanda — финансовый помощник, не банк. Решения о тратах остаются за тобой.</p>
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