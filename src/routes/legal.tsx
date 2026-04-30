import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Header, Footer } from '../components/Chrome'

export const Route = createFileRoute('/legal')({
  component: Legal,
})

type Tab = 'privacy' | 'terms'

export function Legal() {
  const [tab, setTab] = useState<Tab>('privacy')

  return (
    <>
      <Header />
      <main className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-40 right-[-10%] -z-10 h-[460px] w-[460px] rounded-full opacity-40 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(59,232,176,0.3) 0%, transparent 70%)' }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 -z-10 grid-lines mask-fade-y opacity-30" aria-hidden />

        <div className="mx-auto max-w-3xl px-5 pb-20 pt-10 md:pb-28 md:pt-16">
          {/* Header */}
          <div className="eyebrow">Правовая информация</div>
          <h1 className="mt-4 text-3xl font-black leading-[1.1] tracking-tight sm:text-4xl md:mt-5 md:text-5xl">
            Документы <span className="grad-text">Sanda</span>
          </h1>
          <p className="mt-3 text-sm text-text-dim">Последнее обновление: 23 апреля 2026 г.</p>

          {/* Tab switcher */}
          <div className="mt-8 flex gap-2">
            {([
              { key: 'privacy' as Tab, label: 'Политика конфиденциальности' },
              { key: 'terms' as Tab, label: 'Условия использования' },
            ] as const).map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  tab === t.key
                    ? 'border-mint/40 bg-mint/[0.1] text-mint'
                    : 'border-line bg-white/[0.02] text-text-muted hover:text-text'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="mt-8">
            {tab === 'privacy' ? <PrivacyContent /> : <TermsContent />}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

// ─── Privacy Policy ───────────────────────────────────────────────────────────

function PrivacyContent() {
  return (
    <div className="space-y-8">
      <Callout>
        Sanda — личный финансовый помощник. Мы серьёзно относимся к защите ваших данных
        и собираем только то, что необходимо для работы приложения.
      </Callout>

      <Section title="1. Какие данные мы собираем">
        <ul className="space-y-2">
          <Li>Имя и email — при входе через Google или Apple</Li>
          <Li>Аватар профиля — из вашего аккаунта</Li>
          <Li>Финансовые данные — транзакции, счета, цели (ручной ввод пользователя)</Li>
          <Li>Технические данные — версия приложения, тип устройства (для диагностики)</Li>
        </ul>
        <Note>Мы не запрашиваем доступ к вашим банковским счетам напрямую и не используем автоматический импорт транзакций.</Note>
      </Section>

      <Section title="2. Как мы используем данные">
        <ul className="space-y-2">
          <Li>Идентификация и синхронизация данных между устройствами</Li>
          <Li>Расчёт лимитов, статистики и аналитики внутри приложения</Li>
          <Li>Восстановление данных при переустановке приложения</Li>
          <Li>Улучшение работы сервиса на основе агрегированных (не персональных) метрик</Li>
        </ul>
        <Note>Мы не продаём и не передаём ваши данные третьим лицам в маркетинговых целях.</Note>
      </Section>

      <Section title="3. Где хранятся данные">
        <p className="leading-relaxed text-text-muted">
          Все данные хранятся в{' '}
          <strong className="text-text">Google Firebase Firestore</strong> — облачном хранилище Google.
          Данные защищены уникальным идентификатором пользователя (UID) и недоступны
          другим пользователям приложения.
        </p>
        <p className="mt-3 leading-relaxed text-text-muted">
          Firebase соответствует требованиям GDPR, SOC 2 Type II и ISO 27001.
          Серверы расположены в регионах EU/US согласно настройкам проекта.
        </p>
      </Section>

      <Section title="4. Аналитика и трекинг">
        <ul className="space-y-2">
          <Li>Яндекс.Метрика — счётчик посещаемости сайта (анонимизированные данные)</Li>
          <Li>Google Tag Manager — управление тегами и аналитикой</Li>
          <Li>Firebase Analytics — агрегированная статистика использования приложения</Li>
        </ul>
        <Note>Вы можете отключить cookies аналитики через настройки браузера.</Note>
      </Section>

      <Section title="5. Ваши права">
        <ul className="space-y-2">
          <Li>Право на доступ — запросить копию ваших данных</Li>
          <Li>Право на удаление — полностью удалить аккаунт и все данные из приложения</Li>
          <Li>Право на исправление — отредактировать любые данные вручную</Li>
          <Li>Право на переносимость — экспорт данных в форматах CSV/JSON (в разработке)</Li>
        </ul>
      </Section>

      <Section title="6. Удаление аккаунта">
        <p className="leading-relaxed text-text-muted">
          Вы можете удалить аккаунт в настройках приложения (Профиль → Удалить аккаунт).
          Все ваши данные будут безвозвратно удалены из наших серверов в течение 30 дней.
        </p>
      </Section>

      <Section title="7. Контакты">
        <p className="leading-relaxed text-text-muted">
          По вопросам конфиденциальности пишите:{' '}
          <a href="mailto:privacy@sandawallet.com" className="text-mint hover:underline">
            privacy@sandawallet.com
          </a>
        </p>
      </Section>
    </div>
  )
}

// ─── Terms of Service ─────────────────────────────────────────────────────────

function TermsContent() {
  return (
    <div className="space-y-8">
      <Callout>
        Используя Sanda, вы соглашаетесь с настоящими условиями. Пожалуйста, прочитайте
        их внимательно — мы постарались сделать их понятными.
      </Callout>

      <Section title="1. Что такое Sanda">
        <p className="leading-relaxed text-text-muted">
          Sanda — персональный финансовый помощник, который помогает управлять ежедневным
          бюджетом. Приложение не является банком, финансовым советником или инвестиционным
          инструментом. Все финансовые решения вы принимаете самостоятельно.
        </p>
      </Section>

      <Section title="2. Кто может пользоваться приложением">
        <ul className="space-y-2">
          <Li>Лица от 18 лет</Li>
          <Li>Принявшие настоящие условия использования</Li>
          <Li>Зарегистрировавшиеся через Apple ID или Google-аккаунт</Li>
        </ul>
      </Section>

      <Section title="3. Бесплатный доступ и бета-тест">
        <p className="leading-relaxed text-text-muted">
          В период бета-тестирования приложение доступно бесплатно по приглашениям.
          Мы оставляем за собой право изменить условия доступа после завершения бета-теста
          с предварительным уведомлением пользователей.
        </p>
      </Section>

      <Section title="4. Ваши обязанности">
        <ul className="space-y-2">
          <Li>Вводить достоверные данные о доходах, расходах и планах</Li>
          <Li>Не использовать приложение для незаконных целей</Li>
          <Li>Хранить данные доступа к аккаунту в тайне</Li>
          <Li>Сообщать о технических проблемах через официальные каналы</Li>
        </ul>
      </Section>

      <Section title="5. Ограничение ответственности">
        <p className="leading-relaxed text-text-muted">
          Sanda предоставляет информацию и инструменты для личного финансового планирования.
          Мы не несём ответственности за финансовые решения, принятые на основе данных
          приложения. Вся информация носит информационный, а не консультационный характер.
        </p>
        <Note>
          В случае технических сбоев мы приложим все усилия для восстановления данных,
          однако не гарантируем их сохранность при обстоятельствах вне нашего контроля.
        </Note>
      </Section>

      <Section title="6. Интеллектуальная собственность">
        <p className="leading-relaxed text-text-muted">
          Все элементы приложения — дизайн, код, тексты, логотип — являются собственностью
          Sanda. Вы не вправе копировать, воспроизводить или распространять их без
          письменного разрешения.
        </p>
      </Section>

      <Section title="7. Изменение условий">
        <p className="leading-relaxed text-text-muted">
          Мы можем обновлять условия использования. Об изменениях сообщим по email или
          через уведомление в приложении не менее чем за 14 дней до вступления в силу.
          Продолжение использования приложения означает согласие с новыми условиями.
        </p>
      </Section>

      <Section title="8. Применимое право">
        <p className="leading-relaxed text-text-muted">
          Настоящие условия регулируются законодательством Республики Казахстан.
          Споры решаются в судах по месту нахождения ответчика.
        </p>
      </Section>

      <Section title="9. Контакты">
        <p className="leading-relaxed text-text-muted">
          По вопросам условий использования:{' '}
          <a href="mailto:legal@sandawallet.com" className="text-mint hover:underline">
            legal@sandawallet.com
          </a>
        </p>
      </Section>
    </div>
  )
}

// ─── Shared UI ────────────────────────────────────────────────────────────────

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-mint/25 bg-mint/[0.05] p-5 md:p-6">
      <p className="text-[15px] leading-relaxed text-text md:text-base">{children}</p>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-line bg-white/[0.02] p-5 md:p-6">
      <h2 className="mb-4 text-lg font-bold text-text">{title}</h2>
      <div className="space-y-3 text-sm text-text-muted">{children}</div>
    </div>
  )
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-mint" />
      <span>{children}</span>
    </li>
  )
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 rounded-xl border border-line bg-white/[0.02] px-4 py-3 text-xs text-text-dim">
      💡 {children}
    </p>
  )
}
