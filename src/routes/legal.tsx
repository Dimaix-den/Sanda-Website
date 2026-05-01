import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Header, Footer } from '../components/Chrome'

export const Route = createFileRoute('/legal')({
  component: Legal,
})

type Tab = 'privacy' | 'terms'

export function Legal() {
  const [tab, setTab] = useState<Tab>(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#terms') return 'terms'
    return 'privacy'
  })

  useEffect(() => {
    const handler = () => setTab(window.location.hash === '#terms' ? 'terms' : 'privacy')
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  function switchTab(next: Tab) {
    setTab(next)
    history.replaceState(null, '', `/legal#${next}`)
  }

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
          <div className="eyebrow">Правовая информация</div>
          <h1 className="mt-4 text-3xl font-black leading-[1.1] tracking-tight sm:text-4xl md:mt-5 md:text-5xl">
            Документы <span className="grad-text">Sanda</span>
          </h1>
          <p className="mt-3 text-sm text-text-dim">Последнее обновление: 23 апреля 2026 г.</p>

          <div className="mt-8 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => switchTab('privacy')}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${tab === 'privacy' ? 'border-mint/40 bg-mint/[0.1] text-mint' : 'border-line bg-white/[0.02] text-text-muted hover:text-text'}`}
            >
              Политика конфиденциальности
            </button>
            <button
              type="button"
              onClick={() => switchTab('terms')}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${tab === 'terms' ? 'border-mint/40 bg-mint/[0.1] text-mint' : 'border-line bg-white/[0.02] text-text-muted hover:text-text'}`}
            >
              Условия использования
            </button>
          </div>

          <div className="mt-8">
            {tab === 'privacy' ? <PrivacyContent /> : <TermsContent />}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

function PrivacyContent() {
  return (
    <div className="space-y-6">
      <Callout>Sanda — личный финансовый помощник. Мы серьёзно относимся к защите ваших данных и собираем только то, что необходимо для работы приложения.</Callout>
      <Section title="1. Какие данные мы собираем">
        <ul className="space-y-2">
          <Li>Имя и email — при входе через Google или Apple</Li>
          <Li>Аватар профиля — из вашего аккаунта</Li>
          <Li>Финансовые данные — транзакции, счета, цели (ручной ввод)</Li>
          <Li>Технические данные — версия приложения, тип устройства (для диагностики)</Li>
        </ul>
        <Note>Мы не запрашиваем доступ к вашим банковским счетам напрямую и не используем автоматический импорт транзакций.</Note>
      </Section>
      <Section title="2. Как мы используем данные">
        <ul className="space-y-2">
          <Li>Идентификация и синхронизация данных между устройствами</Li>
          <Li>Расчёт лимитов, статистики и аналитики внутри приложения</Li>
          <Li>Восстановление данных при переустановке приложения</Li>
          <Li>Улучшение сервиса на основе агрегированных (не персональных) метрик</Li>
        </ul>
        <Note>Мы не продаём и не передаём ваши данные третьим лицам в маркетинговых целях.</Note>
      </Section>
      <Section title="3. Где хранятся данные">
        <p className="leading-relaxed text-text-muted">Все данные хранятся в <strong className="text-text">Google Firebase Firestore</strong>. Данные защищены уникальным идентификатором пользователя (UID) и недоступны другим пользователям. Firebase соответствует требованиям GDPR, SOC 2 Type II и ISO 27001.</p>
      </Section>
      <Section title="4. Аналитика и трекинг">
        <ul className="space-y-2">
          <Li>Яндекс.Метрика — счётчик посещаемости сайта (анонимизированные данные)</Li>
          <Li>Google Tag Manager — управление тегами аналитики</Li>
          <Li>Firebase Analytics — агрегированная статистика использования приложения</Li>
        </ul>
        <Note>Вы можете отключить cookies аналитики через настройки браузера.</Note>
      </Section>
      <Section title="5. Ваши права">
        <ul className="space-y-2">
          <Li>Право на доступ — запросить копию ваших данных</Li>
          <Li>Право на удаление — полностью удалить аккаунт и все данные</Li>
          <Li>Право на исправление — отредактировать любые данные вручную</Li>
          <Li>Право на переносимость — экспорт данных (в разработке)</Li>
        </ul>
      </Section>
      <Section title="6. Удаление аккаунта">
        <p className="leading-relaxed text-text-muted">Удалить аккаунт можно в настройках приложения (Профиль → Удалить аккаунт). Все данные будут безвозвратно удалены в течение 30 дней.</p>
      </Section>
      <Section title="7. Контакты">
        <p className="leading-relaxed text-text-muted">По вопросам конфиденциальности: <a href="mailto:privacy@sandawallet.com" className="text-mint hover:underline">privacy@sandawallet.com</a></p>
      </Section>
    </div>
  )
}

function TermsContent() {
  return (
    <div className="space-y-6">
      <Callout>Используя Sanda, вы соглашаетесь с настоящими условиями. Мы постарались сделать их понятными и без юридического жаргона.</Callout>
      <Section title="1. Что такое Sanda">
        <p className="leading-relaxed text-text-muted">Sanda — персональный финансовый помощник для управления ежедневным бюджетом. Приложение не является банком, финансовым советником или инвестиционным инструментом. Все финансовые решения вы принимаете самостоятельно.</p>
      </Section>
      <Section title="2. Кто может пользоваться">
        <ul className="space-y-2">
          <Li>Лица от 18 лет</Li>
          <Li>Принявшие настоящие условия использования</Li>
          <Li>Зарегистрировавшиеся через Apple ID или Google-аккаунт</Li>
        </ul>
      </Section>
      <Section title="3. Ранний доступ и TestFlight">
        <p className="leading-relaxed text-text-muted">В период бета-тестирования приложение доступно через TestFlight бесплатно. Мы оставляем за собой право изменить условия доступа после завершения бета-теста с предварительным уведомлением пользователей.</p>
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
        <p className="leading-relaxed text-text-muted">Sanda предоставляет инструменты для личного финансового планирования. Мы не несём ответственности за финансовые решения, принятые на основе данных приложения.</p>
        <Note>В случае технических сбоев мы приложим все усилия для восстановления данных, однако не гарантируем их сохранность при обстоятельствах вне нашего контроля.</Note>
      </Section>
      <Section title="6. Интеллектуальная собственность">
        <p className="leading-relaxed text-text-muted">Все элементы приложения — дизайн, код, тексты, логотип — являются собственностью Sanda. Копирование или воспроизведение без письменного разрешения не допускается.</p>
      </Section>
      <Section title="7. Изменение условий">
        <p className="leading-relaxed text-text-muted">Об изменениях уведомим по email или через приложение не менее чем за 14 дней. Продолжение использования означает согласие с новыми условиями.</p>
      </Section>
      <Section title="8. Применимое право">
        <p className="leading-relaxed text-text-muted">Настоящие условия регулируются законодательством Республики Казахстан.</p>
      </Section>
      <Section title="9. Контакты">
        <p className="leading-relaxed text-text-muted">По вопросам условий использования: <a href="mailto:legal@sandawallet.com" className="text-mint hover:underline">legal@sandawallet.com</a></p>
      </Section>
    </div>
  )
}

function Callout({ children }: { children: React.ReactNode }) {
  return <div className="overflow-hidden rounded-3xl border border-mint/25 bg-mint/[0.05] p-5 md:p-6"><p className="text-[15px] leading-relaxed text-text md:text-base">{children}</p></div>
}
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="rounded-3xl border border-line bg-white/[0.02] p-5 md:p-6"><h2 className="mb-4 text-lg font-bold text-text">{title}</h2><div className="space-y-3 text-sm text-text-muted">{children}</div></div>
}
function Li({ children }: { children: React.ReactNode }) {
  return <li className="flex items-start gap-3"><span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-mint" /><span>{children}</span></li>
}
function Note({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 rounded-xl border border-line bg-white/[0.02] px-4 py-3 text-xs text-text-dim">💡 {children}</p>
}
