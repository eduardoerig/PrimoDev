import { useEffect, useState } from 'react'

const links = [
  { href: '#servicos', label: 'O que fazemos' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#processo', label: 'Como funciona' },
  { href: '#socios', label: 'Quem somos' },
  { href: '#faq', label: 'Preço' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  // a nav faz parte da construção: só entra depois que o scroll começa
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    // histerese: limiares diferentes para entrar e sair evitam a nav
    // piscando quando o scroll oscila em torno de um limiar único
    const aoRolar = () =>
      setVisivel((atual) => {
        const y = window.scrollY
        if (!atual && y > window.innerHeight * 0.35) return true
        if (atual && y < window.innerHeight * 0.15) return false
        return atual
      })
    aoRolar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-noite/80 backdrop-blur-md transition-[transform,opacity] duration-500 ${
        visivel ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-full opacity-0'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#topo" className="font-display text-xl font-bold tracking-tight">
          Primo<span className="bg-gradient-to-r from-azul-claro to-ciano bg-clip-text text-transparent">Dev</span>
          <span className="text-amarelo">.</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-neblina transition-colors hover:text-gelo"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#orcamento"
            className="rounded-full bg-azul px-5 py-2 text-sm font-semibold text-white transition hover:bg-azul-claro"
          >
            Pedir orçamento
          </a>
        </div>

        <button
          type="button"
          className="md:hidden"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-gelo" fill="none" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/5 bg-noite px-5 pb-5 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm text-neblina"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#orcamento"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-full bg-azul px-5 py-2.5 text-center text-sm font-semibold text-white"
          >
            Pedir orçamento
          </a>
        </div>
      )}
    </header>
  )
}
