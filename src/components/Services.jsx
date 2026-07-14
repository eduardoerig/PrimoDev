import { motion, useReducedMotion } from 'framer-motion'
import { IconSite, IconSistema, IconAutomacao, IconApp } from './Icons3D'
import ImagemOpcional from './ImagemOpcional'

const servicos = [
  {
    png: '/visuais/icone-sites.png',
    icone: <IconSite />,
    titulo: 'Sites & landing pages',
    descricao: 'Rápido e fácil de achar no Google.',
  },
  {
    png: '/visuais/icone-sistemas.png',
    icone: <IconSistema />,
    titulo: 'Sistemas sob medida',
    descricao: 'Do jeito que a sua operação já trabalha.',
  },
  {
    png: '/visuais/icone-automacao.png',
    icone: <IconAutomacao />,
    titulo: 'Automações',
    descricao: 'Seus sistemas conversando entre si.',
  },
  {
    png: '/visuais/icone-apps.png',
    icone: <IconApp />,
    titulo: 'Aplicativos',
    descricao: 'Para testar a ideia sem investir pesado.',
  },
]

export default function Services() {
  const reduzir = useReducedMotion()

  return (
    <section id="servicos" className="relative overflow-hidden py-16 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-mono text-sm text-ciano">{'// o que fazemos'}</p>
        <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white md:text-6xl">
          Tecnologia que{' '}
          <span className="bg-gradient-to-r from-azul-claro to-ciano bg-clip-text text-transparent">
            resolve
          </span>
          .
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 md:mt-14 lg:grid-cols-4" style={{ perspective: '1200px' }}>
          {servicos.map((s, i) => (
            <motion.article
              key={s.titulo}
              initial={reduzir ? false : { opacity: 0, y: 60, rotateX: 18 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.21, 0.65, 0.32, 1] }}
              className="glass glass-hover flex flex-col items-center rounded-2xl p-4 text-center sm:p-7"
            >
              <ImagemOpcional
                src={s.png}
                fallback={s.icone}
                className="h-14 w-14 object-contain drop-shadow-[0_16px_30px_rgba(6,182,212,0.3)] sm:h-20 sm:w-20 md:h-24 md:w-24"
              />
              <h3 className="mt-4 font-display text-base font-semibold text-white sm:mt-6 sm:text-xl md:text-2xl">
                {s.titulo}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neblina sm:mt-3 sm:text-base">{s.descricao}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
