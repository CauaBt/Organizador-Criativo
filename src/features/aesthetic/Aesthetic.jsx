import { useState, useEffect } from "react"
import { atualizarEstetica } from "./aestheticStore"

export default function Aesthetic({ projeto }) {

  const [cores, setCores] = useState(projeto.estetica?.cores || [])
  const [novaCor, setNovaCor] = useState("#000000")

  const [musica, setMusica] = useState(projeto.estetica?.musica || "")
  const [humor, setHumor] = useState(projeto.estetica?.humor || "")
  const [tags, setTags] = useState(projeto.estetica?.tags || [])

  const [novaTag, setNovaTag] = useState("")

  useEffect(() => {
    atualizarEstetica(projeto.id, {
      cores,
      musica,
      humor,
      tags
    })
  }, [cores, musica, humor, tags])

  function adicionarCor() {
    if (!novaCor) return
    setCores([...cores, novaCor])
  }

  function removerCor(index) {
    const novas = cores.filter((_, i) => i !== index)
    setCores(novas)
  }

  function adicionarTag() {
    if (!novaTag) return
    setTags([...tags, novaTag])
    setNovaTag("")
  }

  function removerTag(index) {
    const novas = tags.filter((_, i) => i !== index)
    setTags(novas)
  }

  return (
    <div>

      <h2>Estética</h2>

      {/* CORES */}
      <div>
        <h3>Paleta de cores</h3>

        <input
          type="color"
          value={novaCor}
          onChange={(e) => setNovaCor(e.target.value)}
        />

        <button onClick={adicionarCor}>
          Adicionar cor
        </button>

        <div>
          {cores.map((cor, i) => (
            <button key={i} onClick={() => removerCor(i)}>
              {cor}
            </button>
          ))}
        </div>
      </div>

      {/* MÚSICA */}
      <div>
        <h3>Música</h3>

        <input
          placeholder="Nome ou link da música"
          value={musica}
          onChange={(e) => setMusica(e.target.value)}
        />
      </div>

      {/* HUMOR */}
      <div>
        <h3>Humor</h3>

        <input
          placeholder="Ex: Sombrio, leve..."
          value={humor}
          onChange={(e) => setHumor(e.target.value)}
        />
      </div>

      {/* TAGS */}
      <div>
        <h3>Palavras-chave</h3>

        <input
          placeholder="Adicionar palavra"
          value={novaTag}
          onChange={(e) => setNovaTag(e.target.value)}
        />

        <button onClick={adicionarTag}>
          Adicionar
        </button>

        <ul>
          {tags.map((tag, i) => (
            <li key={i}>
              <button onClick={() => removerTag(i)}>
                {tag}
              </button>
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}
