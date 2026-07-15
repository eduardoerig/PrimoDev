import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion'

/* Abertura em dois palcos SEPARADOS, um após o outro — sem camadas sobrepostas.
   Palco 1: marca + título gigante; sai de cena por completo antes de acabar.
   Palco 2: o convite — subtítulo, CTAs grandes e terminal — sobe de baixo e fica. */

// segmentos de highlight pré-computados: nada de split() por render
const roteiro = [
  'const projeto = await primodev.ouvir(cliente);',
  'proposta.fechar({ escopo, prazo, preco });',
  'while (!cliente.aprovou) ajustar();',
  'deploy("seu-negocio.com.br");',
  '✓ Projeto no ar, suporte ativo',
].map((texto) => ({
  texto,
  final: texto.startsWith('✓'),
  cabecaLen: texto.startsWith('✓') ? 0 : texto.split('(')[0].split('=')[0].length,
}))

const CHARS_POR_TICK = 3
const INTERVALO_TICK = 70

function Terminal({ ativo }) {
  const reduzir = useReducedMotion()
  const [linhas, setLinhas] = useState(reduzir ? roteiro.length : 1)
  const [chars, setChars] = useState(reduzir ? Infinity : 0)

  useEffect(() => {
    if (reduzir || !ativo) return
    const atual = roteiro[linhas - 1]
    if (!atual) return
    if (chars < atual.texto.length) {
      const t = setTimeout(() => setChars(chars + CHARS_POR_TICK), INTERVALO_TICK)
      return () => clearTimeout(t)
    }
    if (linhas < roteiro.length) {
      const t = setTimeout(() => {
        setLinhas(linhas + 1)
        setChars(0)
      }, 360)
      return () => clearTimeout(t)
    }
  }, [chars, linhas, reduzir, ativo])

  const terminou =
    linhas === roteiro.length && (reduzir || chars >= roteiro[roteiro.length - 1].texto.length)

  return (
    <div className="glass overflow-hidden rounded-2xl shadow-2xl shadow-azul/20">
      <div className="flex items-center gap-2 border-b border-white/5 px-5 py-3.5">
        <span className="h-3 w-3 rounded-full bg-red-400/70" />
        <span className="h-3 w-3 rounded-full bg-amarelo/70" />
        <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
        <span className="ml-3 font-mono text-xs text-neblina">primodev — seu-projeto.js</span>
      </div>
      <div className="min-h-40 p-4 text-left font-mono text-xs leading-6 sm:text-[13px] sm:leading-7 md:min-h-52 md:p-6 md:text-base md:leading-8">
        {roteiro.slice(0, linhas).map((linha, i) => {
          const completa = i < linhas - 1 || reduzir
          const texto = completa ? linha.texto : linha.texto.slice(0, chars)
          return (
            <div key={i} className={linha.final ? 'text-amarelo' : 'text-gelo'}>
              <span className="mr-3 select-none text-neblina/50">
                {String(i + 1).padStart(2, '0')}
              </span>
              {linha.final ? (
                <span className="font-semibold">{texto}</span>
              ) : (
                <span>
                  <span className="text-ciano">{texto.slice(0, linha.cabecaLen)}</span>
                  {texto.slice(linha.cabecaLen)}
                </span>
              )}
              {i === linhas - 1 && !terminou && <span className="cursor-blink text-amarelo">▍</span>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* blocos de copy compartilhados: uma única fonte para palcos e reduced-motion */
function Marca({ className = '' }) {
  return (
    <img src="/marca/logo-horizontal.svg" alt="PrimoDev" className={`w-auto ${className}`} />
  )
}

function Titulo() {
  return (
    <>
      Software sob medida para quem quer{' '}
      <span className="relative whitespace-nowrap">
        <span className="bg-gradient-to-r from-azul-claro via-ciano to-ciano bg-clip-text text-transparent">
          crescer
        </span>
        <svg viewBox="0 0 220 12" className="absolute -bottom-2 left-0 w-full" aria-hidden="true">
          <path
            d="M3 9c60-6 150-6 214-3"
            fill="none"
            stroke="#facc15"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </span>
      .
    </>
  )
}

function Subtitulo({ className = '' }) {
  return (
    <p className={className}>
      Sites, sistemas e automações para o seu negócio.{' '}
      <span className="text-neblina">Você fala direto com quem desenvolve.</span>
    </p>
  )
}

function Acoes({ tamanho = 'grande' }) {
  const base =
    tamanho === 'grande'
      ? 'px-8 py-4 text-lg md:px-10 md:py-5 md:text-xl'
      : 'px-8 py-4 text-lg'
  return (
    <div className="flex flex-wrap justify-center gap-5">
      <a
        href="#orcamento"
        className={`rounded-full bg-azul font-semibold text-white shadow-xl shadow-azul/40 transition hover:-translate-y-0.5 hover:bg-azul-claro ${base}`}
      >
        Pedir orçamento
      </a>
      <a
        href="#processo"
        className={`rounded-full border border-white/20 font-semibold text-gelo transition hover:border-ciano/50 hover:text-white ${base}`}
      >
        Como funciona
      </a>
    </div>
  )
}

/* fundo único, fixo e contínuo atrás dos dois palcos: sem emenda possível */
function FundoHero() {
  return (
    <div className="bg-blueprint pointer-events-none fixed inset-0 -z-10">
      <div className="glow-ciano absolute inset-0" />
      <div className="glow-azul absolute inset-0" />
    </div>
  )
}

/* Palco único: título e convite coexistem na mesma tela. Assim que o título
   começa a sair (subindo e apagando), o convite já começa a subir de baixo —
   trajetórias verticais opostas para não colidir no centro. */
function PalcoHero() {
  const ref = useRef(null)
  const { scrollYProgress: bruto } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  // no mobile o scroll chega em saltos grandes (momentum); o spring interpola
  // entre eles para o palco não andar aos trancos
  const scrollYProgress = useSpring(bruto, { stiffness: 140, damping: 30, mass: 0.25 })
  const [terminalAtivo, setTerminalAtivo] = useState(false)

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      if (v > 0.3) {
        setTerminalAtivo(true)
        unsub()
      }
    })
    return unsub
  }, [scrollYProgress])

  // título: fica 100% cheio na tela até 0.28, só então sobe e apaga (sai pelo topo)
  const tituloOpacity = useTransform(scrollYProgress, [0, 0.28, 0.48], [1, 1, 0])
  const titulo = {
    opacity: tituloOpacity,
    visibility: useTransform(tituloOpacity, (v) => (v <= 0.01 ? 'hidden' : 'visible')),
    y: useTransform(scrollYProgress, [0.28, 0.5], ['0vh', '-55vh']),
    scale: useTransform(scrollYProgress, [0.28, 0.5], [1, 0.92]),
  }
  const dica = { opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }

  // convite: começa a subir de baixo no MESMO ponto em que o título sai (0.28).
  // parte de fora da tela (>100vh) para não espiar enquanto o hero está cheio.
  const fase = (a, b, de) => ({
    y: useTransform(scrollYProgress, [a, b], [de, '0vh']),
  })
  const subtitulo = fase(0.28, 0.46, '115vh')
  const acoes = fase(0.32, 0.5, '125vh')
  const terminal = {
    y: useTransform(scrollYProgress, [0.36, 0.56], ['135vh', '0vh']),
    rotateX: useTransform(scrollYProgress, [0.36, 0.56], [20, 0]),
  }

  return (
    <section id="topo" ref={ref} className="relative h-[220vh] md:h-[300vh]">
      <div className="sticky top-0 h-svh overflow-hidden px-5">
        {/* grupo do título — sai pelo topo; não captura cliques */}
        <motion.div
          style={titulo}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-5 text-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Marca className="mb-6 h-8 md:h-11" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="max-w-5xl font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white md:text-7xl xl:text-8xl"
          >
            <Titulo />
          </motion.h1>
        </motion.div>

        {/* grupo do convite — sobe de baixo enquanto o título sai */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
          <div className="flex w-full max-w-4xl flex-col items-center">
            <motion.div style={subtitulo} className="max-w-3xl">
              <Subtitulo className="font-display text-2xl font-semibold leading-snug text-white md:text-4xl" />
            </motion.div>

            <motion.div style={acoes} className="mt-8 md:mt-10">
              <Acoes tamanho="grande" />
            </motion.div>

            <div className="mt-8 w-full max-w-3xl md:mt-12" style={{ perspective: '1200px' }}>
              <motion.div style={terminal}>
                <Terminal ativo={terminalAtivo} />
              </motion.div>
            </div>
          </div>
        </div>

        {/* dica de scroll */}
        <motion.div
          style={dica}
          className="pointer-events-none absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2 font-mono text-xs text-neblina"
        >
          <span>role para construir</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="text-ciano"
          >
            ▼
          </motion.span>
        </motion.div>
      </div>
    </section>
  )
}

export default function Hero() {
  const reduzir = useReducedMotion()

  if (reduzir) {
    return (
      <section id="topo" className="bg-blueprint relative overflow-hidden">
        <div className="glow-ciano pointer-events-none absolute inset-0" />
        <div className="glow-azul pointer-events-none absolute inset-0" />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-8 px-5 py-28 text-center">
          <Marca className="h-8" />
          <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white md:text-7xl">
            <Titulo />
          </h1>
          <Subtitulo className="text-xl text-gelo" />
          <Acoes tamanho="normal" />
          <div className="w-full max-w-2xl">
            <Terminal ativo />
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <FundoHero />
      <PalcoHero />
    </>
  )
}
