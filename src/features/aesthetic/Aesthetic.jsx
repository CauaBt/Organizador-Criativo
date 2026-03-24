import { useState, useEffect } from "react"
import { atualizarEstetica } from "./aestheticStore"

export default function Aesthetic({ projeto }) {

  const [cores, setCores] = useState(projeto.estetica?.cores || [])
  const [novaCor, setNovaCor] = useState("#000000")

  const [musicas, setMusicas] = useState(projeto.estetica?.musicas || [])
  const [novaMusica, setNovaMusica] = useState("")

  const [humores, setHumores] = useState(projeto.estetica?.humores || [])

  const [tags, setTags] = useState(projeto.estetica?.tags || [])
  const [novaTag, setNovaTag] = useState("")

  const opcoesHumor = [
    "Sereno",
    "Melancólico",
    "Acolhedor",
    "Misterioso",
    "Intenso",
    "Alegre",
    "Sombrio",
    "Nostálgico"
  ]

  useEffect(() => {
    atualizarEstetica(projeto.id, {
      cores,
      musicas,
      humores,
      tags
    })
  }, [cores, musicas, humores, tags])

  function adicionarCor() {
    if (!novaCor) return
    setCores([...cores, novaCor])
  }

  function removerCor(index) {
    setCores(cores.filter((_, i) => i !== index))
  }

  function adicionarMusica() {
    if (!novaMusica) return
    setMusicas([...musicas, novaMusica])
    setNovaMusica("")
  }

  function removerMusica(index) {
    setMusicas(musicas.filter((_, i) => i !== index))
  }

  function toggleHumor(h) {
    if (humores.includes(h)) {
      setHumores(humores.filter(x => x !== h))
    } else {
      setHumores([...humores, h])
    }
  }

  function adicionarTag() {
    if (!novaTag) return
    setTags([...tags, novaTag])
    setNovaTag("")
  }

  function removerTag(index) {
    setTags(tags.filter((_, i) => i !== index))
  }

  return (
    <div className="aesthetic-page">

      {/* CONTEÚDO */}
      <div className="aesthetic-content">

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

          <div className="color-palette">
            {cores.map((cor, i) => (
              <div
                key={i}
                className="color-box"
                style={{ background: cor }}
                onClick={() => removerCor(i)}
              />
            ))}
          </div>
        </div>

        {/* MÚSICAS */}
        <div>
          <h3>Músicas</h3>

          <input
            placeholder="Adicionar música"
            value={novaMusica}
            onChange={(e) => setNovaMusica(e.target.value)}
          />

          <button onClick={adicionarMusica}>
            Adicionar
          </button>

          <div className="tags">
            {musicas.map((m, i) => (
              <span key={i} onClick={() => removerMusica(i)}>
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* HUMOR */}
        <div>
          <h3>Humor</h3>

          <div className="tags">
            {opcoesHumor.map((h, i) => (
              <span
                key={i}
                onClick={() => toggleHumor(h)}
                className={humores.includes(h) ? "active" : ""}
              >
                {h}
              </span>
            ))}
          </div>
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

          <div className="tags">
            {tags.map((tag, i) => (
              <span key={i} onClick={() => removerTag(i)}>
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* SIDEBAR FIXA */}
      <div className="aesthetic-sidebar">

        <h3>Visão Geral</h3>

        <div className="preview-section">
          <p>Paleta de Cores</p>

          <div className="preview-colors">
            {cores.map((c, i) => (
              <div key={i} style={{ background: c }} />
            ))}
          </div>
        </div>

        <div className="preview-section">
          <p>Humor</p>

          <div className="tags">
            {humores.map((h, i) => (
              <span key={i}>{h}</span>
            ))}
          </div>
        </div>

        <div className="preview-section">
          <p>Músicas</p>

          <div className="tags">
            {musicas.map((m, i) => (
              <span key={i}>{m}</span>
            ))}
          </div>
        </div>

      </div>

    </div>
  )
}
