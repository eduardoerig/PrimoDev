/* Ícones 3D da PrimoDev: "pastilhas" com profundidade, vidro e brilho,
   desenhadas em SVG puro para carregar rápido e respeitar a paleta da marca. */

function Puck({ id, children }) {
  return (
    <svg
      viewBox="0 0 96 96"
      className="h-16 w-16 md:h-20 md:w-20"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-top`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="55%" stopColor="#172554" />
          <stop offset="100%" stopColor="#0b1222" />
        </linearGradient>
        <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id={`${id}-glyph`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id={`${id}-shine`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <filter id={`${id}-shadow`} x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow
            dx="0"
            dy="10"
            stdDeviation="8"
            floodColor="#06b6d4"
            floodOpacity="0.28"
          />
        </filter>
      </defs>

      {/* profundidade (camada de trás) */}
      <rect
        x="14"
        y="20"
        width="68"
        height="64"
        rx="18"
        fill={`url(#${id}-edge)`}
        filter={`url(#${id}-shadow)`}
      />
      {/* face de cima */}
      <rect x="14" y="12" width="68" height="66" rx="18" fill={`url(#${id}-top)`} />
      <rect
        x="14.75"
        y="12.75"
        width="66.5"
        height="64.5"
        rx="17.25"
        fill="none"
        stroke="rgba(148,163,184,0.35)"
        strokeWidth="1.5"
      />
      {/* brilho de vidro */}
      <rect x="20" y="17" width="56" height="26" rx="13" fill={`url(#${id}-shine)`} />
      {/* faísca amarela: assinatura da marca */}
      <circle cx="74" cy="21" r="4" fill="#facc15" />
      {children}
    </svg>
  )
}

export function IconSite() {
  return (
    <Puck id="site">
      {/* janela de navegador */}
      <rect
        x="30"
        y="32"
        width="36"
        height="28"
        rx="5"
        fill="none"
        stroke="url(#site-glyph)"
        strokeWidth="3.5"
      />
      <line
        x1="30"
        y1="41"
        x2="66"
        y2="41"
        stroke="url(#site-glyph)"
        strokeWidth="3.5"
      />
      <circle cx="36" cy="36.5" r="1.8" fill="#facc15" />
    </Puck>
  )
}

export function IconSistema() {
  return (
    <Puck id="sistema">
      {/* blocos que se encaixam */}
      <rect x="31" y="33" width="15" height="12" rx="3.5" fill="url(#sistema-glyph)" />
      <rect
        x="50"
        y="33"
        width="15"
        height="12"
        rx="3.5"
        fill="none"
        stroke="url(#sistema-glyph)"
        strokeWidth="3"
      />
      <rect
        x="31"
        y="49"
        width="15"
        height="12"
        rx="3.5"
        fill="none"
        stroke="url(#sistema-glyph)"
        strokeWidth="3"
      />
      <rect x="50" y="49" width="15" height="12" rx="3.5" fill="#facc15" />
    </Puck>
  )
}

export function IconAutomacao() {
  return (
    <Puck id="auto">
      {/* raio: automação */}
      <path
        d="M52 28 38 50h9l-3 18 14-22h-9l3-18z"
        fill="url(#auto-glyph)"
        stroke="url(#auto-glyph)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </Puck>
  )
}

export function IconApp() {
  return (
    <Puck id="app">
      {/* foguete: da ideia ao lançamento */}
      <path
        d="M48 27c7 4 10 12 10 20l-6 8h-8l-6-8c0-8 3-16 10-20z"
        fill="none"
        stroke="url(#app-glyph)"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <circle cx="48" cy="42" r="4" fill="url(#app-glyph)" />
      <path d="M44 58l-3 8m14-8 3 8m-10-8v9" stroke="#facc15" strokeWidth="3" strokeLinecap="round" />
    </Puck>
  )
}
