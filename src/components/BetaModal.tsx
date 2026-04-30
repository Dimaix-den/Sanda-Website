import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { X, ArrowRight, CheckCircle } from 'lucide-react'

// ─── Context ──────────────────────────────────────────────────────────────────

type BetaModalCtx = {
  openModal: () => void
}

const Ctx = createContext<BetaModalCtx>({ openModal: () => {} })

export function useBetaModal() {
  return useContext(Ctx)
}

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

// ─── Button (drop-in replacement for every CTA) ───────────────────────────────

export function BetaButton({
  children = 'Попробовать бесплатно',
  className = 'btn-primary',
  size,
}: {
  children?: ReactNode
  className?: string
  size?: number
}) {
  const { openModal } = useBetaModal()
  return (
    <button type="button" onClick={openModal} className={className}>
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
    /* Backdrop */
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      style={{ background: 'rgba(5,7,10,0.8)', backdropFilter: 'blur(8px)' }}
    >
      {/* Panel */}
      <div
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-line bg-ink-2 shadow-2xl"
        style={{
          background:
            'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
        }}
      >
        {/* Glow */}
        <div
          className="pointer-events-none absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(59,232,176,0.6) 0%, transparent 70%)',
          }}
          aria-hidden
        />

        {/* Close */}
        <button
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-line bg-white/[0.03] text-text-muted transition hover:text-text"
        >
          <X size={15} />
        </button>

        <div className="relative px-7 py-8">
          {status === 'success' ? (
            /* Success screen */
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              <CheckCircle size={48} className="text-mint" strokeWidth={1.5} />
              <h3 className="text-xl font-bold">Заявка принята!</h3>
              <p className="max-w-xs text-sm text-text-muted">
                Мы свяжемся с тобой, когда откроем доступ к бета-версии Sanda.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="btn-ghost mt-2 !px-6 !py-2.5 text-sm"
              >
                Закрыть
              </button>
            </div>
          ) : (
            /* Form */
            <>
              <div className="eyebrow mb-4">Бета-тест</div>
              <h3 className="text-2xl font-black tracking-tight">
                Получи ранний доступ
              </h3>
              <p className="mt-2 text-sm text-text-muted">
                Оставь контакты — мы пришлём приглашение одним из первых.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="beta-name"
                    className="mb-1.5 block text-xs font-medium uppercase tracking-[0.12em] text-text-muted"
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
                    className="w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-sm text-text outline-none transition placeholder:text-text-dim focus:border-mint/50 focus:bg-white/[0.05]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="beta-email"
                    className="mb-1.5 block text-xs font-medium uppercase tracking-[0.12em] text-text-muted"
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
                    className="w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-sm text-text outline-none transition placeholder:text-text-dim focus:border-mint/50 focus:bg-white/[0.05]"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-xs text-red-400">
                    Что-то пошло не так. Попробуй снова.
                  </p>
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

              <p className="mt-4 text-center text-[11px] text-text-dim">
                Никакого спама. Только приглашение, когда будем готовы.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
