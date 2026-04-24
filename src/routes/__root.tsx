import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        // viewport-fit=cover lets the page paint under the iOS status bar
        // and home indicator. Without it, iOS Safari sits the page inside
        // a "safe" letterbox and exposes white strips above/below — which
        // is what the user saw as "site cut at top and bottom".
        // Combined with min-height: 100dvh and a dark html bg-color, the
        // page reaches the real screen edges on every iPhone.
        content: 'width=device-width, initial-scale=1, viewport-fit=cover',
      },
      { name: 'theme-color', content: '#05070a' },
      {
        name: 'description',
        content:
          'Sanda — умный дневной лимит трат. Каждое утро одна цифра: сколько можно потратить сегодня, чтобы дойти до зарплаты и сохранить накопления.',
      },
      { title: 'Sanda — Одна цифра вместо таблиц' },
    ],
    links: [
      { rel: 'icon', type: 'image/png', href: '/sanda-icon.png' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: '' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
