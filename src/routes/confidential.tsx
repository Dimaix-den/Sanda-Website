// confidential.tsx
import { createFileRoute } from '@tanstack/react-router'
import { Fragment } from 'react'
import { Header, Footer } from '../components/Chrome'

export const Route = createFileRoute('/confidential')({
  component: Confidential,
})

export function Confidential() {
  return (
    <>
      <Header />
      <div className="container mx-auto max-w-[680px] px-6 pt-[64px] pb-[120px] md:px-8 lg:px-12">

        <h1 className="mb-[12px] text-[36px] font-black leading-[1.15] tracking-[-0.8px] md:text-[40px]">
          Политика конфиденциальности
        </h1>
        <p className="updated mb-12 text-[14px] text-white/40">
          Последнее обновление: 23 апреля 2026 г.
        </p>

        <div className="intro mb-12 rounded-r-[10px] border-l-[3px] border-[#00A676] bg-[#00A676]/7 px-6 py-5 text-[17px] text-white/70">
          Sanda — личный финансовый помощник. Мы серьёзно относимся к защите ваших данных и собираем только то, что необходимо для работы приложения.
        </div>

        <div className="space-y-[44px]">
          <section>
            <h2 className="relative mb-[14px] inline-block text-[20px] font-black tracking-[-0.3px] text-white before:absolute before:left-[-16px] before:top-[-1px] before:h-[6px] before:w-[6px] before:rounded-full before:bg-[#00A676]">
              Какие данные мы собираем
            </h2>
            <div className="card bg-[rgba(28,28,30,0.8)] border border-white/6 rounded-[14px] p-5 md:p-6">
              <ul className="list-none p-0 space-y-0">
                <li className="li relative border-b border-white/5 py-[8px] pl-[20px] text-white/65 before:absolute before:left-0 before:text-[#00A676] before:text-[13px] before:content-['→'] last:border-b-0">
                  Имя и email — при входе через Google/Apple
                </li>
                <li className="li relative border-b border-white/5 py-[8px] pl-[20px] text-white/65 before:absolute before:left-0 before:text-[#00A676] before:text-[13px] before:content-['→'] last:border-b-0">
                  Аватар профиля — из вашего аккаунта
                </li>
                <li className="li relative border-b border-white/5 py-[8px] pl-[20px] text-white/65 before:absolute before:left-0 before:text-[#00A676] before:text-[13px] before:content-['→'] last:border-b-0">
                  Финансовые данные — транзакции, счета, цели (ручной ввод)
                </li>
                <li className="li relative border-b border-white/5 py-[8px] pl-[20px] text-white/65 before:absolute before:left-0 before:text-[#00A676] before:text-[13px] before:content-['→'] last:border-b-0">
                  Настройки — валюта, периоды, параметры
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="relative mb-[14px] inline-block text-[20px] font-black tracking-[-0.3px] text-white before:absolute before:left-[-16px] before:top-[-1px] before:h-[6px] before:w-[6px] before:rounded-full before:bg-[#00A676]">
              Как мы используем данные
            </h2>
            <div className="card bg-[rgba(28,28,30,0.8)] border border-white/6 rounded-[14px] p-5 md:p-6">
              <ul className="list-none p-0 space-y-0">
                <li className="li relative border-b border-white/5 py-[8px] pl-[20px] text-white/65 before:absolute before:left-0 before:text-[#00A676] before:text-[13px] before:content-['→'] last:border-b-0">
                  Идентификация и синхронизация между устройствами
                </li>
                <li className="li relative border-b border-white/5 py-[8px] pl-[20px] text-white/65 before:absolute before:left-0 before:text-[#00A676] before:text-[13px] before:content-['→'] last:border-b-0">
                  Расчёт лимитов и статистики
                </li>
                <li className="li relative border-b border-white/5 py-[8px] pl-[20px] text-white/65 before:absolute before:left-0 before:text-[#00A676] before:text-[13px] before:content-['→'] last:border-b-0">
                  Восстановление данных при переустановке
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="relative mb-[14px] inline-block text-[20px] font-black tracking-[-0.3px] text-white before:absolute before:left-[-16px] before:top-[-1px] before:h-[6px] before:w-[6px] before:rounded-full before:bg-[#00A676]">
              Где хранятся данные
            </h2>
            <p className="mb-[12px] text-white/65">
              Все данные в <strong className="text-white">Google Firebase Firestore</strong> — облаке Google. Данные защищены UID и недоступны другим пользователям.
            </p>
            <p className="mb-[12px] text-[14px] text-white/65">
              Firebase соответствует GDPR, SOC 2, ISO 27001.
            </p>
          </section>

          <section>
            <h2 className="relative mb-[14px] inline-block text-[20px] font-black tracking-[-0.3px] text-white before:absolute before:left-[-16px] before:top-[-1px] before:h-[6px] before:w-[6px] before:rounded-full before:bg-[#00A676]">
              Передача третьим лицам
            </h2>
            <p className="mb-4 text-white/65">
              Мы <strong className="text-white">не продаём данные</strong>. Доступ только у:
            </p>
            <div className="card bg-[rgba(28,28,30,0.8)] border border-white/6 rounded-[14px] p-5 md:p-6">
              <ul className="list-none p-0 space-y-0">
                <li className="li relative border-b border-white/5 py-[8px] pl-[20px] text-white/65 before:absolute before:left-0 before:text-[#00A676] before:text-[13px] before:content-['→'] last:border-b-0">
                  <strong className="text-white">Google Firebase</strong> — хранение и авторизация
                </li>
                <li className="li relative border-b border-white/5 py-[8px] pl-[20px] text-white/65 before:absolute before:left-0 before:text-[#00A676] before:text-[13px] before:content-['→'] last:border-b-0">
                  <strong className="text-white">Google/Apple Sign-In</strong> — только авторизация
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="relative mb-[14px] inline-block text-[20px] font-black tracking-[-0.3px] text-white before:absolute before:left-[-16px] before:top-[-1px] before:h-[6px] before:w-[6px] before:rounded-full before:bg-[#00A676]">
              Гостевой режим
            </h2>
            <p className="mb-[12px] text-white/65">
              Можно использовать без аккаунта. Данные только на устройстве, без облачной синхронизации.
            </p>
          </section>

          <section>
            <h2 className="relative mb-[14px] inline-block text-[20px] font-black tracking-[-0.3px] text-white before:absolute before:left-[-16px] before:top-[-1px] before:h-[6px] before:w-[6px] before:rounded-full before:bg-[#00A676]">
              Удаление данных
            </h2>
            <div className="card bg-[rgba(28,28,30,0.8)] border border-white/6 rounded-[14px] p-5 md:p-6">
              <ul className="list-none p-0 space-y-0">
                <li className="li relative border-b border-white/5 py-[8px] pl-[20px] text-white/65 before:absolute before:left-0 before:text-[#00A676] before:text-[13px] before:content-['→'] last:border-b-0">
                  Настройки → <strong className="text-white">Удалить аккаунт</strong>
                </li>
                <li className="li relative border-b border-white/5 py-[8px] pl-[20px] text-white/65 before:absolute before:left-0 before:text-[#00A676] before:text-[13px] before:content-['→'] last:border-b-0">
                  Все данные безвозвратно удаляются из Firebase
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="relative mb-[14px] inline-block text-[20px] font-black tracking-[-0.3px] text-white before:absolute before:left-[-16px] before:top-[-1px] before:h-[6px] before:w-[6px] before:rounded-full before:bg-[#00A676]">
              Безопасность
            </h2>
            <p className="mb-[12px] text-white/65">
              Доступ по правилам Firebase Security Rules. Только владелец данных может читать/изменять. HTTPS.
            </p>
          </section>

          <section>
            <h2 className="relative mb-[14px] inline-block text-[20px] font-black tracking-[-0.3px] text-white before:absolute before:left-[-16px] before:top-[-1px] before:h-[6px] before:w-[6px] before:rounded-full before:bg-[#00A676]">
              Дети
            </h2>
            <p className="mb-[12px] text-white/65">
              Приложение не для детей младше 16 лет. Мы не собираем данные детей.
            </p>
          </section>

          <section>
            <h2 className="relative mb-[14px] inline-block text-[20px] font-black tracking-[-0.3px] text-white before:absolute before:left-[-16px] before:top-[-1px] before:h-[6px] before:w-[6px] before:rounded-full before:bg-[#00A676]">
              Контакты
            </h2>
            <div className="card bg-[rgba(28,28,30,0.8)] border border-white/6 rounded-[14px] p-5 md:p-6">
              <p className="m-0 font-semibold">
                📧 <a href="mailto:support@sanda.app" className="text-[#00A676] no-underline hover:underline">support@sanda.app</a>
              </p>
            </div>
          </section>
        </div>

        <div className="divider h-[1px] bg-white/6 my-[44px]" />
        
        <div className="footer mt-[64px] flex flex-wrap items-center justify-between gap-[8px] pt-[32px] border-t border-white/6 text-[13px] text-white/30">
          <span>© 2026 Sanda. Все права защищены.</span>
          <span>app.sanda.finance</span>
        </div>
      </div>
      <Footer />
    </>
  )
}
