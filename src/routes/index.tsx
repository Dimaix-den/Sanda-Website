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
        <FeaturesSection />
        <InlineCta
          variant="split"
          eyebrow="Готов попробовать?"
          title="Доверь рассчеты Sanda на каждый день"
          subtitle="Устанавливается за минуту. Дает ценность сразу после внесения данных."
          cta="Скачать для iOS"
        />
        <SimulatorSection />
        <ComparisonSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
