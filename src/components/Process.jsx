import { useRef } from 'react'
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion'

/* A linha do processo se desenha conforme o scroll — o caminho do projeto
   sendo traçado na frente do visitante. Números = ordem real do trabalho. */

const passos = [
  { numero: '01', titulo: 'Conversa', descricao: '30 minutos para entender sua dor. Grátis.' },
  { numero: '02', titulo: 'Proposta', descricao: 'Escopo, prazo e preço fechados por escrito.' },
  { numero: '03', titulo: 'Construção', descricao: 'Entregas semanais. Você acompanha tudo.' },
  { numero: '04', titulo: 'No ar', descricao: 'Projeto entregue. E a gente continua por perto.' },
]

export default function Process() {
  const reduzir = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 75%', 'end 70%'],
  })
  const traco = useSpring(scrollYProgress, { stiffness: 140, damping: 28 })

  return (
    <section id="processo" className="relative bg-noite-2 py-16 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-mono text-sm text-ciano">{'// como funciona'}</p>
        <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white md:text-6xl">
          4 passos até o{' '}
          <span className="bg-gradient-to-r from-ciano to-amarelo bg-clip-text text-transparent">
            ar
          </span>
          .
        </h2>

        <div ref={ref} className="relative mt-10 grid gap-10 md:mt-16 md:grid-cols-4 md:gap-6">
          {/* trilhos apagados */}
          <div className="absolute left-[7px] top-2 h-[calc(100%-16px)] w-px bg-white/10 md:left-0 md:top-[7px] md:h-px md:w-full" aria-hidden="true" />
          {/* linha que se desenha com o scroll */}
          <motion.div
            style={{ scaleY: reduzir ? 1 : traco }}
            className="absolute left-[7px] top-2 h-[calc(100%-16px)] w-px origin-top bg-gradient-to-b from-azul via-ciano to-amarelo md:hidden"
            aria-hidden="true"
          />
          <motion.div
            style={{ scaleX: reduzir ? 1 : traco }}
            className="absolute left-0 top-[7px] hidden h-px w-full origin-left bg-gradient-to-r from-azul via-ciano to-amarelo md:block"
            aria-hidden="true"
          />

          {passos.map((p, i) => (
            <motion.div
              key={p.numero}
              initial={reduzir ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.14, ease: 'easeOut' }}
              className="relative pl-9 md:pl-0 md:pt-10"
            >
              <span
                className="absolute left-0 top-1 h-[15px] w-[15px] rounded-full border-2 border-ciano bg-noite md:top-0"
                aria-hidden="true"
              />
              <p className="font-mono text-lg font-semibold text-amarelo">{p.numero}</p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-white md:text-3xl">
                {p.titulo}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-neblina">{p.descricao}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
