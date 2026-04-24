import { ArrowRight } from 'lucide-react'

type Variant = 'compact' | 'split' | 'banner'

/**
 * Slim, horizontally-oriented CTA strip that sits *between* content
 * sections to break scroll-blindness and funnel the user toward the
 * download button without hijacking a full viewport like CtaSection.
 *
 * Variants give us different silhouettes so two inline CTAs on the same
 * page don't look like the same component twice.
 *   - `compact`: single-line pill on desktop, stacked on mobile
 *   - `split`:  two-column with a faux app icon left, text + button right
 *   - `banner`: tall, centred, numeric badge — good as a hard stop
 */
export function InlineCta({
  variant = 'compact',
  eyebrow,
  title,
  subtitle,
  cta = 'Скачать бесплатно',
  href = '#cta',
}: {
  variant?: Variant
  eyebrow?: string
  title: string
  subtitle?: string
  cta?: string
  href?: string
}) {
  if (variant === 'split') {
    return (
      <div className="border-b border-line px-5 py-10 md:py-14">
        <div className="mx-auto max-w-6xl">
          <div className="cta-inline relative flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7 md:p-8">
            <div className="relative flex min-w-0 items-center gap-4">
              {/*
               * Faux app tile: gradient square, large sum, underline — reads
               * as "daily limit at a glance" without another phone mockup.
               */}
              <div
                className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border border-mint/30 bg-ink-2 shadow-inner md:h-16 md:w-16"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(59,232,176,0.18) 0%, rgba(59,158,255,0.12) 100%)',
                }}
                aria-hidden
              >
                <span className="num-display grad-text text-lg font-black md:text-xl">
                  ₸
                </span>
              </div>
              <div className="min-w-0">
                {eyebrow && (
                  <p className="text-[10px] uppercase tracking-[0.2em] text-mint md:text-[11px]">
                    {eyebrow}
                  </p>
                )}
                <p className="mt-1 text-lg font-bold leading-tight sm:text-xl md:text-2xl">
                  {title}
                </p>
                {subtitle && (
                  <p className="mt-1 text-sm text-text-muted">{subtitle}</p>
                )}
              </div>
            </div>
            <a
              href={href}
              className="btn-primary relative z-10 flex-shrink-0 self-stretch sm:self-auto"
            >
              {cta} <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'banner') {
    return (
      <div className="border-b border-line px-5 py-10 md:py-14">
        <div className="mx-auto max-w-5xl">
          <div className="cta-inline relative overflow-hidden p-6 text-center md:p-10">
            {eyebrow && (
              <div className="eyebrow relative z-10 mx-auto">{eyebrow}</div>
            )}
            <h3 className="relative z-10 mx-auto mt-3 max-w-2xl text-2xl font-black tracking-tight md:mt-4 md:text-4xl">
              {title}
            </h3>
            {subtitle && (
              <p className="relative z-10 mx-auto mt-3 max-w-xl text-sm text-text-muted md:mt-4 md:text-base">
                {subtitle}
              </p>
            )}
            <div className="relative z-10 mt-5 flex flex-wrap items-center justify-center gap-3 md:mt-6">
              <a href={href} className="btn-primary">
                {cta} <ArrowRight size={18} />
              </a>
              <a href="#try" className="btn-ghost">
                Посчитать сначала
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // compact (default)
  return (
    <div className="border-b border-line px-5 py-8 md:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="cta-inline relative flex flex-col items-start gap-4 p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
          <div className="relative">
            {eyebrow && (
              <p className="text-[10px] uppercase tracking-[0.2em] text-mint md:text-[11px]">
                {eyebrow}
              </p>
            )}
            <p className="mt-1 text-base font-semibold leading-tight sm:text-lg md:text-xl">
              {title}
            </p>
            {subtitle && (
              <p className="mt-1 text-sm text-text-muted">{subtitle}</p>
            )}
          </div>
          <a
            href={href}
            className="btn-primary relative z-10 flex-shrink-0 self-stretch sm:self-auto sm:!px-5 sm:!py-2.5 sm:text-sm"
          >
            {cta} <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  )
}
