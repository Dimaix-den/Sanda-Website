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
