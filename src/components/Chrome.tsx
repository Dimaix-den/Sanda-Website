import { Link } from '@tanstack/react-router'

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

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="flex items-center">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-text-muted lg:flex">
          <a href="#try" className="hover:text-text">
            Как работает
          </a>
          <a href="#features" className="hover:text-text">
            Возможности
          </a>
          <a href="#people" className="hover:text-text">
            Истории
          </a>
          <a href="#compare" className="hover:text-text">
            Сравнение
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <a href="#cta" className="btn-primary !px-4 !py-2 text-sm">
            Скачать
          </a>
        </div>
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
            { label: 'Политика конфиденциальности', href: '#' },
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
