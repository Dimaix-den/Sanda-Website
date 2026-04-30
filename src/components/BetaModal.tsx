import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react'
import { X, ArrowRight, Download } from 'lucide-react'

const TESTFLIGHT_URL = 'https://testflight.apple.com/join/j8xcddP5'

// ─── Context ──────────────────────────────────────────────────────────────────

type BetaModalCtx = { openModal: () => void }
const Ctx = createContext<BetaModalCtx>({ openModal: () => {} })
export function useBetaModal() { return useContext(Ctx) }

// ─── Provider ─────────────────────────────────────────────────────────────────

export function BetaModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const openModal = useCallback(() => setOpen(true), [])
  const closeModal = useCallback(() => setOpen(false), [])
  return (
    <Ctx.Provider value={{ openModal }}>
      {children}
      {open && <BetaModal onClose={closeModal} />}
    </Ctx.Provider>
  )
}

// ─── Button ───────────────────────────────────────────────────────────────────

export function BetaButton({
  children = 'Скачать в TestFlight',
  className = 'btn-primary',
  size,
  onClick,
}: {
  children?: ReactNode
  className?: string
  size?: number
  onClick?: () => void
}) {
  const { openModal } = useBetaModal()
  return (
    <button
      type="button"
      onClick={() => { openModal(); onClick?.() }}
      className={className}
    >
      {children}
      {className.includes('btn-primary') && <ArrowRight size={size ?? 18} />}
    </button>
  )
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function BetaModal({ onClose }: { onClose: () => void }) {
  // Lock body scroll
  useEffect(() => {
    const scrollY = window.scrollY
    document.body.style.setProperty('--modal-scroll-y', `${scrollY}px`)
    document.body.classList.add('modal-open')
    return () => {
      document.body.classList.remove('modal-open')
      document.body.style.removeProperty('--modal-scroll-y')
      window.scrollTo(0, scrollY)
    }
  }, [])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      style={{
        background: 'rgba(5,7,10,0.88)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      {/* Panel */}
      <div
        className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
        style={{ backgroundColor: '#0a0d12' }}
      >
        {/* Mint glow */}
        <div
          className="pointer-events-none absolute -top-16 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(59,232,176,0.3) 0%, transparent 70%)' }}
          aria-hidden
        />

        {/* Close */}
        <button
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/50 transition hover:text-white"
        >
          <X size={15} />
        </button>

        <div className="relative px-7 pb-8 pt-8">
          {/* Badge */}
          <div className="eyebrow mb-5">Ранний доступ · TestFlight</div>

          {/* Icon */}
          <div
            className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10"
            style={{ background: 'linear-gradient(135deg, rgba(59,232,176,0.2) 0%, rgba(59,158,255,0.15) 100%)' }}
          >
            <Download size={28} className="text-mint" strokeWidth={1.5} />
          </div>

          <h3 className="text-2xl font-black tracking-tight text-white">
            Приложение доступно
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-white/60">
            Sanda уже в раннем доступе через TestFlight. Установи приложение прямо сейчас
            — это бесплатно и без ожидания.
          </p>

          {/* Steps */}
          <div className="mt-5 space-y-2.5">
            <Step n={1} text="Установи приложение TestFlight из App Store (если ещё не установлено)" />
            <Step n={2} text="Нажми кнопку ниже — откроется приглашение" />
            <Step n={3} text="Нажми «Принять» и установи Sanda" />
          </div>

          {/* CTA */}
          <a
            href={TESTFLIGHT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-6 w-full"
            onClick={onClose}
          >
            Открыть в TestFlight
            <ArrowRight size={16} />
          </a>

          <p className="mt-4 text-center text-[11px] text-white/25">
            Только для iOS · Android — скоро
          </p>
        </div>
      </div>
    </div>
  )
}

function Step({ n, text }: { n: number; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span
        className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-ink"
        style={{ background: 'linear-gradient(110deg, #3be8b0 0%, #3b9eff 100%)', marginTop: 1 }}
      >
        {n}
      </span>
      <p className="text-sm text-white/60 leading-snug">{text}</p>
    </div>
  )
}
