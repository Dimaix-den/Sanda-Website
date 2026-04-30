import { createFileRoute } from '@tanstack/react-router'
import { Header, Footer } from '../components/Chrome'
import { BetaModalProvider } from '../components/BetaModal'
import { HeroSection } from '../components/sections/HeroSection'
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
    <BetaModalProvider>
      <div className="min-h-screen">
        <Header />
        <main>
          <HeroSection />
          <FeaturesSection />
          <InlineCta
            variant="split"
            eyebrow="Попробуй бесплатно"
            title="Доверь рассчеты Sanda на каждый день"
            subtitle="Устанавливается за минуту. Дает ценноть сразу после внесения данных."
            cta="Начать"
          />
          <SimulatorSection />
          <ComparisonSection />
          <TestimonialsSection />
          <CtaSection />
        </main>
        <Footer />
      </div>
    </BetaModalProvider>
  )
}
