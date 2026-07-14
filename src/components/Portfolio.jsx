import { motion, useReducedMotion } from 'framer-motion'

/* Projetos reais no ar. Cada card conta a mesma história que vende a PrimoDev:
   não foi só o site — foi o sistema que roda o negócio por trás. */

const projetos = [
  {
    logo: '/portfolio/orion-logo.png',
    alt: 'Logo da Orion Topografia',
    nome: 'Orion Topografia',
    setor: 'Topografia e georreferenciamento',
    url: 'https://oriontopografia.com.br',
    urlLabel: 'oriontopografia.com.br',
    resumo:
      'Empresa de topografia de precisão precisava atrair clientes e organizar a operação. Entregamos a página de captação e o sistema de gestão que roda o dia a dia.',
    entregas: ['Site de captação', 'Sistema de gestão', 'Orçamento via WhatsApp'],
    depoimento:
      'Precisávamos de mais que um site: precisávamos organizar a operação. A PrimoDev entregou a página e o sistema de gestão funcionando do jeito que já trabalhávamos.',
    autor: 'Cliente · Orion Topografia',
  },
  {
    logo: '/portfolio/urbanizy-logo.png',
    alt: 'Logo da Urbanizy Street',
    nome: 'Urbanizy Street',
    setor: 'E-commerce de streetwear',
    url: 'https://www.urbanizystreet.com/public/',
    urlLabel: 'urbanizystreet.com',
    resumo:
      'Loja de tênis e streetwear queria vender online e controlar tudo sozinha. Entregamos o e-commerce completo e o painel que lança produtos e registra vendas.',
    entregas: ['Loja virtual', 'Painel administrativo', 'Gestão de produtos e vendas'],
    depoimento:
      'Queríamos vender online e controlar tudo por trás. Saímos com a loja no ar e um painel onde lanço produto e venda sozinho. Entregas semanais, sempre soube onde estava o projeto.',
    autor: 'Cliente · Urbanizy Street',
  },
]

export default function Portfolio() {
  const reduzir = useReducedMotion()

  return (
    <section id="projetos" className="relative overflow-hidden py-16 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-mono text-sm text-ciano">{'// projetos no ar'}</p>
        <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white md:text-6xl">
          Feito, entregue,{' '}
          <span className="bg-gradient-to-r from-azul-claro to-ciano bg-clip-text text-transparent">
            rodando
          </span>
          .
        </h2>
        <p className="mt-5 max-w-2xl text-lg text-neblina md:text-xl">
          Não é promessa: é site com sistema de verdade por trás, em produção agora.
        </p>

        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-2">
          {projetos.map((p, i) => (
            <motion.article
              key={p.nome}
              initial={reduzir ? false : { opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.21, 0.65, 0.32, 1] }}
              className="glass glass-hover flex flex-col rounded-2xl p-5 md:p-9"
            >
              <div className="flex h-14 items-center md:h-20">
                <img
                  src={p.logo}
                  alt={p.alt}
                  loading="lazy"
                  className="max-h-12 w-auto max-w-[240px] object-contain md:max-h-16"
                />
              </div>

              <h3 className="mt-4 font-display text-2xl font-semibold text-white md:mt-6">{p.nome}</h3>
              <p className="mt-1 font-mono text-xs text-ciano">{p.setor}</p>

              <p className="mt-3 text-sm leading-relaxed text-neblina md:mt-4 md:text-base">{p.resumo}</p>

              <ul className="mt-4 flex flex-wrap gap-2 md:mt-5">
                {p.entregas.map((e) => (
                  <li
                    key={e}
                    className="rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-medium text-gelo"
                  >
                    {e}
                  </li>
                ))}
              </ul>

              <blockquote className="mt-4 border-l-2 border-amarelo/60 pl-4 md:mt-6">
                <p className="text-sm italic leading-relaxed text-gelo">“{p.depoimento}”</p>
                <footer className="mt-2 font-mono text-xs text-neblina">{p.autor}</footer>
              </blockquote>

              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto pt-6 font-mono text-sm text-ciano transition-colors hover:text-amarelo"
              >
                ver no ar → {p.urlLabel}
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
