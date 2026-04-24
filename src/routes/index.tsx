import { createFileRoute } from '@tanstack/react-router'
import { Header, Footer } from '../components/Chrome'
import { HeroSection } from '../components/sections/HeroSection'
import { TrySection } from '../components/sections/TrySection'
import { FeaturesSection } from '../components/sections/FeaturesSection'
import { SimulatorSection } from '../components/sections/SimulatorSection'
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
        <TrySection />

        {/* Inline CTA after the live calculator */}
        <InlineCta
          variant="split"
          eyebrow="Готов попробовать?"
          title="Посчитал лимит — теперь пусть Sanda считает каждый день"
          subtitle="Устанавливается за минуту. Не требует доступа к банку."
          cta="Скачать для iOS"
        />

        <FeaturesSection />
        <SimulatorSection />

        <ComparisonSection />

        {/* Inline CTA before the testimonial carousel */}
        <InlineCta
          variant="compact"
          eyebrow="Ценность с первого дня"
          title=""
          cta="Скачать"
        />

        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}