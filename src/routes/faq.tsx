import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Header, Footer } from '../components/Chrome'

export const Route = createFileRoute('/faq')({
  component: FAQ,
})

const faqs = [
  {
    question: 'А как же категории? Я хочу видеть, куда уходят деньги.',
    answer:
      'Категории есть в разделе «Статистика» — кому интересно, может смотреть. Но главное приложение построено не вокруг них. Честная статистика — это не «ты потратил 10 000 на кофе», а «твой капитал за квартал вырос на 200 000». Sanda показывает и первое, и второе, но во главу угла ставит второе.',
  },
  {
    question: 'У меня нет стабильной зарплаты. Что делать?',
    answer:
      'В настройках есть кастомный период бюджета. Задаёшь границы от любого события до любого события. Фрилансеры обычно так и делают: от крупного поступления до следующего. Формула работает одинаково.',
  },
  {
    question: 'Мои данные в безопасности?',
    answer:
      'Данные хранятся в облаке под твоим Google или Apple ID. Можно работать без регистрации — тогда всё остаётся только на устройстве. Полное удаление доступно в настройках в один тап.',
  },
  {
    question: 'Это платное?',
    answer:
      'Сейчас Sanda бесплатна. В планах freemium: расширенная аналитика и мультивалютный режим войдут в подписку, а ядро продукта остаётся бесплатным навсегда.',
  },
  {
    question: 'Чем вы лучше приложения моего банка?',
    answer:
      'Приложение банка видит только твои операции внутри этого банка. Sanda видит всю картину: зарплату в одном банке, кредит в другом, ипотеку в третьем, цель на машину. И считает исходя из всего этого, а не из куска.',
  },
  {
    question: 'Нужно ли мне размечать каждую транзакцию?',
    answer:
      'Нет. Формула дневного лимита работает на уровне баланса, обязательств и целей — ей неважно, куда именно уходят деньги внутри дня. Разметка транзакций в Sanda опциональна.',
  },
  {
    question: 'Что будет, если я превышу дневной лимит?',
    answer:
      'Ничего плохого. Бюджет следующих дней автоматически уменьшится, чтобы сумма на период сошлась. Никаких штрафов и упрёков — только честная арифметика. Стрик дисциплины сбросится, но это легко восстановить.',
  },
  {
    question: 'Работает ли приложение без интернета?',
    answer:
      'Да. Sanda работает офлайн через локальный кеш. Синхронизация с облаком происходит автоматически, когда появляется сеть.',
  },
]

function FAQ() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-3xl px-5 py-20 md:py-28">
        <div className="eyebrow">Вопросы и ответы</div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
          Частые вопросы о Sanda
        </h1>
        <p className="mt-4 max-w-2xl text-text-muted">
          Если чего-то не нашёл — напиши на{' '}
          <a className="text-mint hover:underline" href="mailto:hello@sanda.app">
            hello@sanda.app
          </a>
          .
        </p>

        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => (
            <FAQItem key={i} {...f} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white/[0.02]">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6"
      >
        <span className="font-medium text-text">{question}</span>
        <ChevronDown
          size={18}
          className={`flex-shrink-0 text-text-muted transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="border-t border-line px-5 py-4 text-text-muted md:px-6">
          {answer}
        </div>
      )}
    </div>
  )
}
