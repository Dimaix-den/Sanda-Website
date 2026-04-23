import { createFileRoute } from '@tanstack/react-router'
import { Header, Footer } from '../components/Chrome'
import { HeroSection } from '../components/sections/HeroSection'
import { HowItWorksSection } from '../components/sections/HowItWorksSection'
import { CalculatorSection } from '../components/sections/CalculatorSection'
import { FeaturesSection } from '../components/sections/FeaturesSection'
import { SimulatorSection } from '../components/sections/SimulatorSection'
import { PhilosophySection } from '../components/sections/PhilosophySection'
import { ComparisonSection } from '../components/sections/ComparisonSection'
import { TestimonialsSection } from '../components/sections/TestimonialsSection'
import { CtaSection } from '../components/sections/CtaSection'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <CalculatorSection />
        <FeaturesSection />
        <SimulatorSection />
        <PhilosophySection />
        <ComparisonSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
