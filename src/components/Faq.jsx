import { motion, useReducedMotion } from 'framer-motion'

/* Preço e prazo na frente, sem enrolação — e as perguntas que todo
   dono de negócio faz antes de chamar no WhatsApp, já respondidas. */

const perguntas = [
  {
    q: 'De quem fica o código e o site?',
    r: 'Seu. O projeto fica no seu próprio domínio, em seu nome, e acompanhamos você em todo o caminho até lá.',
  },
  {
    q: 'Tem suporte depois que vai pro ar?',
    r: 'Sim. Entrega não é despedida: continuamos por perto depois que o projeto está no ar.',
  },
  {
    q: 'Como funciona o pagamento?',
    r: 'Definido no contrato, combinado por escrito antes de qualquer linha de código. Sem surpresa.',
  },
  {
    q: 'Precisa ser presencial?',
    r: 'Vai de você. Trabalhamos remoto por padrão, mas atendemos presencial se preferir.',
  },
  {
    q: 'E se eu ainda não sei bem o que preciso?',
    r: 'É o mais comum. A conversa inicial de 30 minutos é gratuita e serve justamente para descobrirmos isso juntos.',
  },
]

export default function Faq() {
  const reduzir = useReducedMotion()

  return (
    <section id="faq" className="relative overflow-hidden py-16 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-mono text-sm text-ciano">{'// quanto custa'}</p>
        <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white md:text-6xl">
          Combinado é{' '}
          <span className="bg-gradient-to-r from-ciano to-amarelo bg-clip-text text-transparent">
            combinado
          </span>
          .
        </h2>

        <div className="mt-10 grid gap-8 md:mt-14 lg:grid-cols-[1fr_1.2fr]">
          {/* preço + prazo em destaque */}
          <motion.div
            initial={reduzir ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="glass h-fit rounded-2xl p-5 md:p-9 lg:sticky lg:top-24"
          >
            <p className="font-mono text-xs text-neblina">sites completos</p>
            <p className="mt-3 font-display text-4xl font-extrabold tracking-tight text-white md:text-6xl">
              <span className="align-top text-2xl font-semibold text-neblina md:text-3xl">
                a partir de{' '}
              </span>
              <span className="bg-gradient-to-r from-azul-claro to-ciano bg-clip-text text-transparent">
                R$ 1.000
              </span>
            </p>
            <ul className="mt-6 space-y-3 text-base text-gelo">
              {[
                'Automações e aplicativo inclusos',
                'No ar em 2 a 4 semanas',
                'Escopo, prazo e preço fechados por escrito',
                'Site seu, no seu domínio',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 text-amarelo" aria-hidden="true">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-neblina">
              Sistema sob medida depende do escopo. A conversa de 30 minutos é gratuita e você
              sai dela com uma estimativa.
            </p>
            <a
              href="#orcamento"
              className="mt-7 inline-block rounded-full bg-azul px-7 py-3.5 font-semibold text-white shadow-lg shadow-azul/30 transition hover:-translate-y-0.5 hover:bg-azul-claro"
            >
              Pedir orçamento
            </a>
          </motion.div>

          {/* perguntas frequentes */}
          <div>
            <h3 className="font-display text-2xl font-semibold text-white">
              Perguntas que todo mundo faz
            </h3>
            <div className="mt-6 space-y-3">
              {perguntas.map((p, i) => (
                <motion.details
                  key={p.q}
                  initial={reduzir ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: 'easeOut' }}
                  className="glass group rounded-xl px-5 py-4"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-gelo [&::-webkit-details-marker]:hidden">
                    {p.q}
                    <span
                      className="font-mono text-ciano transition-transform group-open:rotate-45"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-neblina">{p.r}</p>
                </motion.details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
