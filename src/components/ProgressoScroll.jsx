import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion'

/* Fio condutor da experiência: uma linha na cor da marca que se desenha
   no topo conforme a página vai sendo construída pelo scroll. */
export default function ProgressoScroll() {
  const { scrollYProgress } = useScroll()
  const progresso = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 })
  const reduzir = useReducedMotion()

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: reduzir ? 1 : progresso }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-azul via-ciano to-amarelo"
    />
  )
}
