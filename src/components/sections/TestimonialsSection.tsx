import { Carousel } from './Carousel'
import { Reveal } from '../Reveal'

export function TestimonialsSection() {
  const people = [
    {
      name: 'Айдана, 29',
      city: 'Алматы',
      role: 'Маркетолог в IT',
      color: 'from-mint/40 to-sky/40',
      quote:
        'Откладывала на ипотеку по остаточному принципу — и этот остаток всегда был ноль. В Sanda цель «Первоначальный взнос» резервируется автоматически, и я просто её не вижу в дневном лимите. За шесть месяцев накопила больше, чем за предыдущие два года.',
      tag: 'Цель: ипотека · 780 000 ₸ собрано',
    },
    {
      name: 'Данияр, 34',
      city: 'Астана',
      role: 'Senior-разработчик',
      color: 'from-sky/40 to-purple-500/30',
      quote:
        'Две ипотеки и кредит на машину — в банке это просто «минус с баланса». В Sanda я сразу вижу, что из 680 тысяч на карте мои только 420, и знаю, сколько могу сегодня, чтобы не дёргать подушку.',
      tag: 'Обязательства в трёх банках',
    },
    {
      name: 'Камила, 26',
      city: 'Бишкек',
      role: 'HR-специалист',
      color: 'from-pink-500/30 to-mint/40',
      quote:
        'Жила в тревоге: каждый месяц было страшно, хватит ли на платежи по рассрочкам. Sanda показывает это одной цифрой — и у меня стрик 43 дня. Маленькие победы каждый день.',
      tag: 'Стрик 43 дня · капитал растёт',
    },
  ]

  return (
    <section id="people" className="border-b border-line py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="mb-8 max-w-2xl md:mb-12">
            <div className="eyebrow">Истории</div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:mt-5 md:text-5xl">
              Люди, которые устали считать в уме
            </h2>
            <p className="mt-4 text-text-muted md:mt-5">
              Разные города, разные профессии, разные доходы. Общее у всех —
              желание контролировать деньги, не превращаясь в домашнего
              бухгалтера.
            </p>
          </div>
        </Reveal>

        {/*
         * Carousel sits inside the same content column as the heading —
         * first card aligns with the site's grid gutter on every
         * breakpoint. Arrows + mouse drag come from the Carousel
         * primitive; mobile uses native swipe.
         */}
        <Reveal delay={80}>
          <Carousel ariaLabel="Отзывы пользователей">
          {people.map((p) => (
            <figure
              key={p.name}
              className="group relative flex w-[280px] flex-col overflow-hidden rounded-3xl border border-line bg-white/[0.02] p-5 transition hover:border-line-strong sm:w-[340px] md:w-[380px] md:p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div
                  className={`h-11 w-11 rounded-full bg-gradient-to-br ${p.color}`}
                  aria-hidden
                />
                <div>
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-xs text-text-muted">
                    {p.role} · {p.city}
                  </p>
                </div>
              </div>
              <blockquote className="text-[14px] leading-relaxed text-text md:text-[15px]">
                «{p.quote}»
              </blockquote>
              <figcaption className="mt-5 border-t border-line pt-4 text-xs text-text-dim md:mt-6">
                {p.tag}
              </figcaption>
            </figure>
          ))}
          </Carousel>
        </Reveal>
      </div>
    </section>
  )
}
