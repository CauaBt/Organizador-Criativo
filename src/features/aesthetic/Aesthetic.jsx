import { useState, useEffect } from "react"
import { atualizarEstetica } from "./aestheticStore"
import { adicionarItem, removerItem, toggleItem} from "./aestheticLogic"

import ColorSection from "./components/ColorSection"
import MusicSection from "./components/MusicSection"
import HumorSection from "./components/HumorSection"
import TagSection from "./components/TagSection"
import AestheticSidebar from "./components/AestheticSidebar"

export default function Aesthetic({ projeto }) {

  const [cores, setCores] = useState(projeto.estetica?.cores || [])
  const [novaCor, setNovaCor] = useState("#000000")

  const [musicas, setMusicas] = useState(projeto.estetica?.musicas || [])
  const [novaMusica, setNovaMusica] = useState("")

  const [humores, setHumores] = useState(projeto.estetica?.humores || [])
  const [novoHumor, setNovoHumor] = useState("")

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

  // CORES

  function adicionarCor() {
    setCores(adicionarItem(cores, novaCor))
  }

  function removerCor(index) {
    setCores(removerItem(cores, index))
  }

  // MÚSICAS

  function adicionarMusica() {
    setMusicas(adicionarItem(musicas, novaMusica))
    setNovaMusica("")
  }

  function removerMusica(index) {
    setMusicas(removerItem(musicas, index))
  }

  // HUMOR

  function toggleHumor(h) {
    setHumores(toggleItem(humores, h))
  }

  function adicionarHumorCustom() {
    setHumores(adicionarItem(humores, novoHumor))
    setNovoHumor("")
  }

  function removerHumor(index) {
    setHumores(removerItem(humores, index))
  }

  // TAGS

  function adicionarTag() {
    setTags(adicionarItem(tags, novaTag))
    setNovaTag("")
  }

  function removerTag(index) {
    setTags(removerItem(tags, index))
  }

  // RENDER

  return (
    <div className="aesthetic-page">

      <div className="aesthetic-content">

        <h2>Estética</h2>

        {/* CORES */}

        <ColorSection
          cores={cores}
          novaCor={novaCor}
          setNovaCor={setNovaCor}
          onAdd={adicionarCor}
          onRemove={removerCor}
        />
        {/* MÚSICAS */}

        <MusicSection
          musicas={musicas}
          novaMusica={novaMusica}
          setNovaMusica={setNovaMusica}
          onAdd={adicionarMusica}
          onRemove={removerMusica}
        />

        {/* HUMOR */}

        <HumorSection
          opcoesHumor={opcoesHumor}
          humores={humores}
          novoHumor={novoHumor}
          setNovoHumor={setNovoHumor}
          onToggle={toggleHumor}
          onAddCustom={adicionarHumorCustom}
          onRemove={removerHumor}
        />

        {/* TAGS */}

        <TagSection
          tags={tags}
          novaTag={novaTag}
          setNovaTag={setNovaTag}
          onAdd={adicionarTag}
          onRemove={removerTag}
        />

      </div>

      {/* SIDEBAR */}

      <AestheticSidebar
        cores={cores}
        humores={humores}
        musicas={musicas}
        tags={tags}
      />

    </div>
  )
}
