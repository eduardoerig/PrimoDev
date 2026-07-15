import { useMemo, useState } from 'react'

const WHATSAPP = '5545999851160'
const EMAIL = 'eduardoferig@gmail.com'

const tiposServico = [
  'Site ou landing page',
  'Sistema sob medida',
  'Automação',
  'Aplicativo',
  'Ainda não sei',
]

const vazio = {
  nome: '',
  contato: '',
  servico: '',
  descricao: '',
}

function Campo({ label, children, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-1.5 block text-sm font-medium text-gelo">{label}</span>
      {children}
    </label>
  )
}

const estiloInput =
  'w-full rounded-xl border border-white/10 bg-noite-3 px-4 py-3 text-sm text-gelo placeholder:text-neblina/60 transition focus:border-ciano/60'

export default function LeadForm() {
  const [dados, setDados] = useState(vazio)
  const [copiado, setCopiado] = useState(false)
  const [tentouEnviar, setTentouEnviar] = useState(false)

  const atualizar = (campo) => (e) => {
    setDados({ ...dados, [campo]: e.target.value })
  }

  // erros derivados dos dados: uma fonte de verdade só, sem limpeza manual
  const erros = useMemo(() => {
    if (!tentouEnviar) return {}
    return {
      nome: !dados.nome.trim(),
      contato: !dados.contato.trim(),
      descricao: !dados.descricao.trim(),
    }
  }, [dados, tentouEnviar])

  const resumo = useMemo(
    () =>
      [
        '*Solicitação de serviço — PrimoDev*',
        '',
        `*Nome:* ${dados.nome || '—'}`,
        `*Contato:* ${dados.contato || '—'}`,
        `*Serviço:* ${dados.servico || 'Ainda não sei'}`,
        '',
        `*O que precisa:* ${dados.descricao || '—'}`,
      ].join('\n'),
    [dados],
  )

  const validar = () => {
    setTentouEnviar(true)
    return dados.nome.trim() !== '' && dados.contato.trim() !== '' && dados.descricao.trim() !== ''
  }

  const enviarWhatsApp = (e) => {
    e.preventDefault()
    if (!validar()) return
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(resumo)}`, '_blank')
  }

  const enviarEmail = () => {
    if (!validar()) return
    const assunto = `Solicitação de serviço — ${dados.nome}`
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(
      resumo.replaceAll('*', ''),
    )}`
  }

  const copiar = async () => {
    await navigator.clipboard.writeText(resumo.replaceAll('*', ''))
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  return (
    <section id="orcamento" className="relative bg-noite-2 py-16 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-mono text-sm text-ciano">{'// pedir orçamento'}</p>
        <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white md:text-6xl">
          Conte o que você{' '}
          <span className="bg-gradient-to-r from-azul-claro to-ciano bg-clip-text text-transparent">
            precisa
          </span>
          .
        </h2>
        <p className="mt-5 max-w-2xl text-xl text-neblina">
          Descreva seu projeto em poucas linhas. Respondemos em até 24 horas.
        </p>

        <div className="mt-10 grid gap-8 md:mt-12 lg:grid-cols-[1.2fr_1fr]">
          <form className="glass space-y-5 rounded-2xl p-5 md:p-8" onSubmit={enviarWhatsApp} noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <Campo label="Seu nome *" htmlFor="nome">
                <input
                  id="nome"
                  type="text"
                  value={dados.nome}
                  onChange={atualizar('nome')}
                  placeholder="Como podemos te chamar?"
                  className={`${estiloInput} ${erros.nome ? 'border-red-400/70' : ''}`}
                  autoComplete="name"
                />
                {erros.nome && (
                  <span className="mt-1 block text-xs text-red-300">Precisamos do seu nome.</span>
                )}
              </Campo>
              <Campo label="WhatsApp ou e-mail *" htmlFor="contato">
                <input
                  id="contato"
                  type="text"
                  value={dados.contato}
                  onChange={atualizar('contato')}
                  placeholder="(00) 90000-0000 ou voce@empresa.com.br"
                  className={`${estiloInput} ${erros.contato ? 'border-red-400/70' : ''}`}
                />
                {erros.contato && (
                  <span className="mt-1 block text-xs text-red-300">
                    Precisamos de um contato para te responder.
                  </span>
                )}
              </Campo>
            </div>

            <fieldset>
              <legend className="mb-2 block text-sm font-medium text-gelo">
                O que você procura? <span className="font-normal text-neblina/70">(um toque)</span>
              </legend>
              <div className="flex flex-wrap gap-2">
                {tiposServico.map((t) => {
                  const ativo = dados.servico === t
                  return (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={ativo}
                      onClick={() => setDados({ ...dados, servico: ativo ? '' : t })}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition sm:px-4 sm:py-2 sm:text-sm ${
                        ativo
                          ? 'border-azul bg-azul text-white'
                          : 'border-white/15 text-neblina hover:border-ciano/50 hover:text-gelo'
                      }`}
                    >
                      {t}
                    </button>
                  )
                })}
              </div>
            </fieldset>

            <Campo label="O que você precisa? *" htmlFor="descricao">
              <textarea
                id="descricao"
                rows={4}
                value={dados.descricao}
                onChange={atualizar('descricao')}
                placeholder="Ex.: preciso de um sistema para controlar pedidos e estoque da minha loja…"
                className={`${estiloInput} resize-none ${erros.descricao ? 'border-red-400/70' : ''}`}
              />
              {erros.descricao && (
                <span className="mt-1 block text-xs text-red-300">
                  Conta em uma frase o que você precisa.
                </span>
              )}
            </Campo>

            <div className="flex gap-2 pt-1 sm:gap-3">
              <button
                type="submit"
                className="flex-1 whitespace-nowrap rounded-full bg-azul px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-azul/30 transition hover:-translate-y-0.5 hover:bg-azul-claro sm:flex-none sm:px-6 sm:py-3.5 sm:text-base"
              >
                <span className="sm:hidden">WhatsApp</span>
                <span className="hidden sm:inline">Enviar pelo WhatsApp</span>
              </button>
              <button
                type="button"
                onClick={enviarEmail}
                className="flex-1 whitespace-nowrap rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold text-gelo transition hover:border-ciano/50 sm:flex-none sm:px-6 sm:py-3.5 sm:text-base"
              >
                <span className="sm:hidden">E-mail</span>
                <span className="hidden sm:inline">Enviar por e-mail</span>
              </button>
            </div>
            <p className="text-xs text-neblina/70">
              Seus dados vão só para a gente. Sem spam.
            </p>
          </form>

          {/* resumo vivo: o cliente vê a "ordem de serviço" se formando */}
          <aside className="glass hidden h-fit rounded-2xl p-6 md:p-8 lg:sticky lg:top-24 lg:block">
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs text-ciano">solicitacao.txt</p>
              <button
                type="button"
                onClick={copiar}
                className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-xs text-neblina transition hover:border-amarelo/60 hover:text-amarelo"
              >
                {copiado ? 'copiado ✓' : 'copiar'}
              </button>
            </div>
            <dl className="mt-5 space-y-3 text-sm">
              {[
                ['Nome', dados.nome],
                ['Contato', dados.contato],
                ['Serviço', dados.servico],
              ].map(([rotulo, valor]) => (
                <div key={rotulo} className="flex justify-between gap-4 border-b border-white/5 pb-2">
                  <dt className="text-neblina">{rotulo}</dt>
                  <dd className={`text-right ${valor ? 'text-gelo' : 'text-neblina/40'}`}>
                    {valor || 'aguardando…'}
                  </dd>
                </div>
              ))}
              <div>
                <dt className="text-neblina">O que precisa</dt>
                <dd className={`mt-1 leading-relaxed ${dados.descricao ? 'text-gelo' : 'text-neblina/40'}`}>
                  {dados.descricao || 'aguardando…'}
                </dd>
              </div>
            </dl>
            <div className="mt-6 rounded-xl border border-amarelo/25 bg-amarelo/5 px-4 py-3 text-xs leading-relaxed text-amarelo/90">
              Esse resumo vira o ponto de partida da sua proposta. Quanto mais detalhe,
              mais certeira a resposta.
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
