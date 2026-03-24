import { useState } from "react"
import { salvarCapitulos } from "../chapters/chaptersStore"

export default function Timeline({ projeto }) {

  const [capitulos, setCapitulos] = useState(projeto.capitulos || [])

  function moverCima(index) {
    if (index === 0) return

    const novos = [...capitulos]
    const temp = novos[index]
    novos[index] = novos[index - 1]
    novos[index - 1] = temp

    setCapitulos(novos)
    salvarCapitulos(projeto.id, novos)
  }

  function moverBaixo(index) {
    if (index === capitulos.length - 1) return

    const novos = [...capitulos]
    const temp = novos[index]
    novos[index] = novos[index + 1]
    novos[index + 1] = temp

    setCapitulos(novos)
    salvarCapitulos(projeto.id, novos)
  }

  return (
    <div>

      <h2>Ordem dos Capítulos</h2>

      {capitulos.length === 0 ? (
        <p>Nenhum capítulo criado</p>
      ) : (
        <div>
          {capitulos.map((c, index) => (
            <div key={c.id}>

              <span>
                {index + 1}. {c.titulo}
              </span>

              <button onClick={() => moverCima(index)}>
                ↑
              </button>

              <button onClick={() => moverBaixo(index)}>
                ↓
              </button>

            </div>
          ))}
        </div>
      )}

    </div>
  )
}
