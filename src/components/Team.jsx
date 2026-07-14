import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion'

const socios = [
  { nome: 'Eduardo', foto: '/eduardo-web.jpg', cargo: 'Cofundador & Desenvolvedor' },
  { nome: 'Bruno', foto: '/bruno-web.jpg', cargo: 'Cofundador & Desenvolvedor' },
]

export default function Team() {
  const reduzir = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress: bruto } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const scrollYProgress = useSpring(bruto, { stiffness: 140, damping: 30, mass: 0.25 })
  // as fotos flutuam em profundidades diferentes conforme o scroll passa
  // amplitude proporcional aos cards compactos
  const parallax = [
    useTransform(scrollYProgress, [0, 1], [30, -30]),
    useTransform(scrollYProgress, [0, 1], [64, -64]),
  ]

  return (
    <section id="socios" ref={ref} className="relative overflow-hidden py-16 md:py-32">
      {/* glow centralizado em altura: fica transparente antes das bordas, então
          o overflow-hidden não corta um brilho ainda visível (sem linha na emenda) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 45% 35% at 18% 42%, rgba(37, 99, 235, 0.16), transparent 70%)',
        }}
      />
      <div className="relative mx-auto max-w-6xl px-5">
        <div className="grid items-center gap-12 md:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="font-mono text-sm text-ciano">{'// quem somos'}</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white md:text-6xl">
              Dois primos,
              <br />
              um{' '}
              <span className="bg-gradient-to-r from-azul-claro to-ciano bg-clip-text text-transparent">
                estúdio
              </span>
              .
            </h2>
            <p className="mt-6 text-xl leading-relaxed text-neblina">
              Quem entende o seu problema é quem escreve o código.
            </p>
            <p className="mt-4 text-base leading-relaxed text-neblina">
              Os dois são full-stack, do visual ao banco de dados, com{' '}
              <span className="text-gelo">mais de 2 anos de experiência</span> cada. Qualquer um
              dos dois resolve o seu projeto do começo ao fim.
            </p>
            <a
              href="#orcamento"
              className="mt-9 inline-block rounded-full border border-amarelo/60 px-7 py-3.5 text-lg font-semibold text-amarelo transition hover:bg-amarelo hover:text-noite"
            >
              Falar com a gente
            </a>
          </div>

          <div className="mx-auto grid w-full max-w-md grid-cols-2 gap-4">
            {socios.map((s, i) => (
              <motion.figure
                key={s.nome}
                style={reduzir ? undefined : { y: parallax[i] }}
                className="glass glass-hover overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-black">
                  <img
                    src={s.foto}
                    alt={`${s.nome}, ${s.cargo} da PrimoDev`}
                    className="h-full w-full object-cover object-top"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-noite to-transparent" />
                </div>
                <figcaption className="p-3.5">
                  <p className="font-display text-lg font-semibold text-white">{s.nome}</p>
                  <p className="mt-0.5 font-mono text-[11px] leading-snug text-ciano">{s.cargo}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
