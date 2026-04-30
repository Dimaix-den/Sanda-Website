import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react'
import { X, ArrowRight, CheckCircle } from 'lucide-react'

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
  children = 'Участвовать в бета-тесте',
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

const ENDPOINT =
  'https://script.google.com/macros/s/AKfycbytseEyBDjqaUuQD4c7HSetyHEWtl1JoZq_H4xYibzfBaBj-gRTLMb8ljBy2E_i5VEoYA/exec'

type Status = 'idle' | 'loading' | 'success' | 'error'

function BetaModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  // Lock body scroll while modal is open
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    setStatus('loading')
    try {
      await fetch(ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      style={{
        // Solid dark backdrop — NO transparency so the page behind
        // is completely hidden and text is readable.
        background: 'rgba(5,7,10,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      {/* Panel — explicit solid background, NOT gradient-only */}
      <div
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
        style={{ backgroundColor: '#0a0d12' }}
      >
        {/* Mint glow */}
        <div
          className="pointer-events-none absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(59,232,176,0.25) 0%, transparent 70%)' }}
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

        <div className="relative px-7 py-8">
          {status === 'success' ? (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              <CheckCircle size={48} className="text-mint" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-white">Заявка принята!</h3>
              <p className="max-w-xs text-sm text-white/60">
                Отправим ссылку на указанную почту в ближайшее время.
              </p>
              <button type="button" onClick={onClose} className="btn-ghost mt-2 !px-6 !py-2.5 text-sm">
                Закрыть
              </button>
            </div>
          ) : (
            <>
              <div className="eyebrow mb-4">Бета-тест</div>
              <h3 className="text-2xl font-black tracking-tight text-white">
                Получи ранний доступ
              </h3>
              <p className="mt-2 text-sm text-white/60">
                Оставь контакты — мы пришлём приглашение одним из первых.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="beta-name"
                    className="mb-1.5 block text-xs font-medium uppercase tracking-[0.12em] text-white/40"
                  >
                    ФИО
                  </label>
                  <input
                    id="beta-name"
                    type="text"
                    required
                    placeholder="Иван Иванов"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-mint/50 focus:bg-white/[0.08]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="beta-email"
                    className="mb-1.5 block text-xs font-medium uppercase tracking-[0.12em] text-white/40"
                  >
                    Email
                  </label>
                  <input
                    id="beta-email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-mint/50 focus:bg-white/[0.08]"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-xs text-red-400">Что-то пошло не так. Попробуй снова.</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full"
                >
                  {status === 'loading' ? 'Отправка…' : 'Отправить заявку'}
                  {status !== 'loading' && <ArrowRight size={16} />}
                </button>
              </form>

              <p className="mt-4 text-center text-[11px] text-white/30">
                Никакого спама. Только приглашение, когда будем готовы.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
