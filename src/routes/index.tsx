import { createFileRoute } from '@tanstack/react-router'
import { Header, Footer } from '../components/Chrome'
import { HeroSection } from '../components/sections/HeroSection'
import { TrySection } from '../components/sections/TrySection'
import { FeaturesSection } from '../components/sections/FeaturesSection'
import { SimulatorSection } from '../components/sections/SimulatorSection'
import { PhilosophySection } from '../components/sections/PhilosophySection'
import { ComparisonSection } from '../components/sections/ComparisonSection'
import { TestimonialsSection } from '../components/sections/TestimonialsSection'
import { CtaSection } from '../components/sections/CtaSection'
import { InlineCta } from '../components/sections/InlineCta'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        {/*
         * TrySection merges the old "Как работает" and "Попробуй здесь"
         * blocks into one dense, interactive section to shorten the landing.
         * The old HowItWorksSection and CalculatorSection are no longer used.
         */}
        <TrySection />

        {/*
         * First inline CTA — right after the user has played with the
         * calculator. The "split" variant is compact and carries a small
         * gradient tile instead of a phone mockup, so it reads as a totally
         * different block shape from the surrounding sections.
         */}
        <InlineCta
          variant="split"
          eyebrow="Готов попробовать на своих цифрах?"
          title="Посчитал лимит — теперь пусть Sanda считает каждый день"
          subtitle="Устанавливается за минуту. Не требует доступа к банку."
          cta="Скачать для iOS"
        />

        <FeaturesSection />
        <SimulatorSection />

        {/*
         * Second inline CTA — after the simulator shows "rolling budget"
         * in action. Uses the banner variant (centred, taller) for a
         * different silhouette than the first CTA strip.
         */}
        <InlineCta
          variant="banner"
          eyebrow="Лимит, который сам подстраивается"
          title="Перестань держать бюджет в голове"
          subtitle="Sanda пересчитывает каждый день. Ты только решаешь — тратить или отложить."
          cta="Установить бесплатно"
        />

        <PhilosophySection />
        <ComparisonSection />

        {/*
         * Third inline CTA — compact, right before the testimonial
         * carousel. Short reminder before social proof.
         */}
        <InlineCta
          variant="compact"
          eyebrow="Готов попробовать?"
          title="Заведи свой первый дневной лимит за 5 минут"
          cta="Скачать"
        />

        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}