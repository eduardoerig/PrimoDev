export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 text-sm text-neblina sm:flex-row">
        <p className="font-display font-bold text-gelo">
          Primo<span className="bg-gradient-to-r from-azul-claro to-ciano bg-clip-text text-transparent">Dev</span>
          <span className="text-amarelo">.</span>
        </p>
        <p className="font-mono text-xs">software sob medida, de primo para primo</p>
        <p>© {new Date().getFullYear()} PrimoDev</p>
      </div>
    </footer>
  )
}
