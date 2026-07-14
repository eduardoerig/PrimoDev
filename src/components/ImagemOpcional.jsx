import { useState } from 'react'

/* Slot de imagem: renderiza o PNG se ele existir em public/visuais;
   se o arquivo não carregar, mostra o fallback (ou some, se não houver). */
export default function ImagemOpcional({ src, alt = '', className = '', fallback = null, ...rest }) {
  const [existe, setExiste] = useState(true)
  if (!existe) return fallback
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setExiste(false)}
      loading="lazy"
      {...rest}
    />
  )
}
