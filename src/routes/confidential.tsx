import { createFileRoute } from '@tanstack/react-router'
import { Header, Footer } from '../components/Chrome'

export const Route = createFileRoute('/confidential')({
  component: Confidential,
})

/**
 * Privacy page, rebuilt in the site's design language.
 *
 * Changes:
 *   - uses the site's palette (mint/sky, ink tones) instead of a one-off #00A676
 *   - responsive typography (scales down cleanly on small screens)
 *   - two-column table of contents on desktop, single flow on mobile
 *   - card styling matches the rest of the site (rounded-3xl, border-line)
 *   - uses the shared eyebrow component for section headers
 *   - contact and header blocks scale with viewport
 */
export function Confidential() {
  return (
    <>
      <Header />
      <main className="relative overflow-hidden">
        {/* Ambient glows, matching the rest of the site */}
        <div
          className="pointer-events-none absolute -top-40 right-[-10%] -z-10 h-[460px] w-[460px] rounded-full opacity-40 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(59,232,176,0.3) 0%, transparent 70%)',
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 -z-10 grid-lines mask-fade-y opacity-30"
          aria-hidden
        />

        <div className="mx-auto max-w-3xl px-5 pb-20 pt-10 md:pb-28 md:pt-16">
          {/* HERO */}
          <div className="eyebrow">Правовая информация</div>
          <h1 className="mt-4 text-3xl font-black leading-[1.1] tracking-tight sm:text-4xl md:mt-5 md:text-5xl">
            Политика <span className="grad-text">конфиденциальности</span>
          </h1>
          <p className="mt-3 text-sm text-text-dim md:mt-4">
            Последнее обновление: 23 апреля 2026 г.
          </p>

          {/* Intro callout */}
          <div className="mt-8 overflow-hidden rounded-3xl border border-mint/25 bg-mint/[0.05] p-5 md:mt-10 md:p-6">
            <p className="text-[15px] leading-relaxed text-text md:text-base">
              Sanda — личный финансовый помощник. Мы серьёзно относимся к защите
              ваших данных и собираем только то, что необходимо для работы
              приложения.
            </p>
          </div>

          {/* Table of contents — 2 columns on desktop, 1 on mobile */}
          <nav
            aria-label="Разделы политики"
            className="mt-8 rounded-3xl border border-line bg-white/[0.02] p-5 md:mt-10 md:p-6"
          >
            <p className="text-[11px] uppercase tracking-[0.2em] text-text-dim">
              Содержание
            </p>
            <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 text-sm md:grid-cols-2">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="flex items-baseline gap-2 text-text-muted transition hover:text-text"
                  >
                    <span className="num-display w-6 flex-shrink-0 text-text-dim">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{s.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sections */}
          <div className="mt-10 space-y-10 md:mt-12 md:space-y-12">
            <Section id="collect" num={1} title="Какие данные мы собираем">
              <CardList
                items={[
                  'Имя и email — при входе через Google или Apple',
                  'Аватар профиля — из вашего аккаунта',
                  'Финансовые данные — транзакции, счета, цели (ручной ввод)',
                  'Настройки — валюта, периоды, параметры',
                ]}
              />
            </Section>

            <Section id="use" num={2} title="Как мы используем данные">
              <CardList
                items={[
                  'Идентификация и синхронизация между устройствами',
                  'Расчёт лимитов и статистики',
                  'Восстановление данных при переустановке',
                ]}
              />
            </Section>

            <Section id="storage" num={3} title="Где хранятся данные">
              <p className="text-[15px] leading-relaxed text-text-muted md:text-base">
                Все данные в{' '}
                <strong className="text-text">Google Firebase Firestore</strong>{' '}
                — облаке Google. Данные защищены UID и недоступны другим
                пользователям.
              </p>
              <p className="mt-3 text-sm text-text-dim md:text-[15px]">
                Firebase соответствует GDPR, SOC 2, ISO 27001.
              </p>
            </Section>

            <Section id="third-parties" num={4} title="Передача третьим лицам">
              <p className="text-[15px] leading-relaxed text-text-muted md:text-base">
                Мы <strong className="text-text">не продаём данные</strong>.
                Доступ только у:
              </p>
              <div className="mt-3">
                <CardList
                  items={[
                    <>
                      <strong className="text-text">Google Firebase</strong> —
                      хранение и авторизация
                    </>,
                    <>
                      <strong className="text-text">Google / Apple Sign-In</strong>{' '}
                      — только авторизация
                    </>,
                  ]}
                />
              </div>
            </Section>

            <Section id="guest" num={5} title="Гостевой режим">
              <p className="text-[15px] leading-relaxed text-text-muted md:text-base">
                Можно использовать без аккаунта. Данные только на устройстве, без
                облачной синхронизации.
              </p>
            </Section>

            <Section id="delete" num={6} title="Удаление данных">
              <CardList
                items={[
                  <>
                    Настройки →{' '}
                    <strong className="text-text">Удалить аккаунт</strong>
                  </>,
                  'Все данные безвозвратно удаляются из Firebase',
                ]}
              />
            </Section>

            <Section id="security" num={7} title="Безопасность">
              <p className="text-[15px] leading-relaxed text-text-muted md:text-base">
                Доступ по правилам Firebase Security Rules. Только владелец данных
                может читать или изменять. Весь трафик — по HTTPS.
              </p>
            </Section>

            <Section id="children" num={8} title="Дети">
              <p className="text-[15px] leading-relaxed text-text-muted md:text-base">
                Приложение не для детей младше 16 лет. Мы не собираем данные
                детей.
              </p>
            </Section>

            <Section id="contacts" num={9} title="Контакты">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href="mailto:support@sanda.app"
                  className="inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/[0.08] px-4 py-2 text-sm font-semibold text-mint transition hover:bg-mint/[0.12]"
                >
                  <span aria-hidden>✉</span>
                  support@sanda.app
                </a>
                <p className="text-sm text-text-muted">
                  Ответим в течение двух рабочих дней.
                </p>
              </div>
            </Section>
          </div>

          {/* Footer strip of the document */}
          <div className="mt-16 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-6 text-xs text-text-dim md:mt-20">
            <span>© 2026 Sanda. Все права защищены.</span>
            <span>app.sanda.finance</span>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

// --- helpers -----------------------------------------------------------------

const sections = [
  { id: 'collect', title: 'Какие данные мы собираем' },
  { id: 'use', title: 'Как мы используем данные' },
  { id: 'storage', title: 'Где хранятся данные' },
  { id: 'third-parties', title: 'Передача третьим лицам' },
  { id: 'guest', title: 'Гостевой режим' },
  { id: 'delete', title: 'Удаление данных' },
  { id: 'security', title: 'Безопасность' },
  { id: 'children', title: 'Дети' },
  { id: 'contacts', title: 'Контакты' },
]

function Section({
  id,
  num,
  title,
  children,
}: {
  id: string
  num: number
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-baseline gap-3">
        <span className="num-display text-xs font-semibold text-mint md:text-sm">
          {String(num).padStart(2, '0')}
        </span>
        <h2 className="text-xl font-bold tracking-tight md:text-2xl">{title}</h2>
      </div>
      <div className="mt-3 md:mt-4">{children}</div>
    </section>
  )
}

function CardList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="overflow-hidden rounded-2xl border border-line bg-white/[0.02]">
      {items.map((item, i) => (
        <li
          key={i}
          className={`flex items-start gap-3 px-4 py-3 text-[14px] text-text-muted md:px-5 md:py-3.5 md:text-[15px] ${
            i !== items.length - 1 ? 'border-b border-line' : ''
          }`}
        >
          <span aria-hidden className="mt-[2px] flex-shrink-0 text-mint">
            →
          </span>
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  )
}