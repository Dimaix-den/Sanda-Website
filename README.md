# Sanda — лендинг

Russian-language marketing landing page for **Sanda**, a financial iOS app that shows one number per day: how much you can spend today and still reach payday with your savings intact.

The site is built around the product's core idea — _одна цифра вместо таблиц_ — with interactive sections (a daily-limit calculator, a week-long self-balancing budget simulator, and tabbed feature mockups) that let a visitor feel the product before they install it.

## Stack

| Layer           | Tech                              |
| --------------- | --------------------------------- |
| Framework       | TanStack Start                    |
| Frontend        | React 19, TanStack Router v1      |
| Build           | Vite 7                            |
| Styling         | Tailwind CSS 4 (custom `@theme`)  |
| Icons           | lucide-react                      |
| Language        | TypeScript 5.7 (strict)           |
| Deployment      | Netlify                           |

All UI text is in Russian. Dark theme only, with a teal-to-blue gradient accent mirroring the product's app icon.

## Structure

```
src/
├── routes/
│   ├── __root.tsx                 # lang="ru", meta, Inter font
│   ├── index.tsx                  # landing composition
│   └── faq.tsx                    # Russian FAQ (objection-handling)
├── components/
│   ├── Chrome.tsx                 # Header (with logo) + Footer
│   ├── mockups/
│   │   ├── PhoneFrame.tsx         # iPhone bezel + status bar
│   │   └── AppMockups.tsx         # Today / Capital / Goals / Commitments screens
│   └── sections/
│       ├── HeroSection.tsx        # headline + live "Сегодня" mockup
│       ├── HowItWorksSection.tsx  # 3-step flow + live formula
│       ├── CalculatorSection.tsx  # interactive sliders → phone updates
│       ├── FeaturesSection.tsx    # tabbed feature + mockup swapper
│       ├── SimulatorSection.tsx   # 5-day self-balancing budget simulator
│       ├── PhilosophySection.tsx  # four product principles
│       ├── ComparisonSection.tsx  # Sanda vs categorisers vs banks vs YNAB
│       ├── TestimonialsSection.tsx# three persona testimonials
│       └── CtaSection.tsx         # final download CTA
├── styles.css                     # Tailwind 4 theme + components
└── router.tsx
public/
└── sanda-icon.png                 # app icon (used for logo and favicon)
```

## Local development

```bash
npm install
npm run dev       # vite dev on http://localhost:3000
npm run build     # production build → dist/
npm run preview   # preview the built bundle
```

With the Netlify CLI:

```bash
netlify dev       # runs on http://localhost:8888 with Netlify emulation
```

## Content notes

- All copy is derived from the internal marketing guideline (`Sanda_Marketing_Guideline_v1.1`). Tone is informal ("ты"), calm, no exclamation marks — consistent with the product's voice.
- The three testimonials match the canonical personas (Айдана / Данияр / Камила).
- The comparison table reproduces the positioning claim: "свободная клетка на карте — пока никого нет".
- Numbers in the hero (4,8 ★, etc.) match the document's target metrics.
