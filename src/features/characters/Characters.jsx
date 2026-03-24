import { useState } from "react"
import { salvarPersonagens } from "./characterStore"

export default function Characters({ projeto }) {

  const [personagens, setPersonagens] = useState(projeto.personagens || [])

  const [mostrarModal, setMostrarModal] = useState(false)
  const [editando, setEditando] = useState(null)

  const [confirmDelete, setConfirmDelete] = useState(null)

  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const [papel, setPapel] = useState("")

  const [cores, setCores] = useState([])
  const [novaCor, setNovaCor] = useState("#000000")

  function abrirCriar() {
    setNome("")
    setDescricao("")
    setPapel("")
    setCores([])
    setEditando(null)
    setMostrarModal(true)
  }

  function abrirEditar(p) {
    setNome(p.nome)
    setDescricao(p.descricao || "")
    setPapel(p.papel || "")
    setCores(p.cores || [])
    setEditando(p)
    setMostrarModal(true)
  }

  function adicionarCor() {
    if (!novaCor) return
    setCores([...cores, novaCor])
  }

  function removerCor(index) {
    setCores(cores.filter((_, i) => i !== index))
  }

  function salvar() {
    if (!nome) return

    let atualizados

    if (editando) {
      atualizados = personagens.map(p =>
        p.id === editando.id
          ? { ...p, nome, descricao, papel, cores }
          : p
      )
    } else {
      const novo = {
        id: Date.now(),
        nome,
        descricao,
        papel,
        cores // ✅ CORRETO
      }

      atualizados = [...personagens, novo]
    }

    setPersonagens(atualizados)
    salvarPersonagens(projeto.id, atualizados)

    setMostrarModal(false)
    setEditando(null)
  }

  function confirmarDeletar(p) {
    setConfirmDelete(p)
  }

  function deletarConfirmado() {
    const atualizados = personagens.filter(p => p.id !== confirmDelete.id)

    setPersonagens(atualizados)
    salvarPersonagens(projeto.id, atualizados)

    setConfirmDelete(null)
  }

  return (
    <div>

      <h2>Personagens</h2>

      <button className="primary-button" onClick={abrirCriar}>
        + Criar Personagem
      </button>

      {personagens.length === 0 ? (
        <p>Nenhum personagem criado</p>
      ) : (
        <div className="characters-grid">

          {personagens.map((p) => (
            <div key={p.id} className="character-card">

              <div className="character-content">

                <div className="character-header">
                  <div className="avatar" />

                  <div>
                    <h4>{p.nome}</h4>
                    <span className="tag">
                      {p.papel || "Sem papel"}
                    </span>
                  </div>
                </div>

                <p className="character-desc">
                  {p.descricao || "Sem descrição"}
                </p>

                {/* ✅ CORES REAIS */}
                <div className="character-bars">
                  {(p.cores || []).slice(0, 3).map((cor, i) => (
                    <div key={i} style={{ background: cor }} />
                  ))}
                </div>

              </div>

              <div className="card-actions">
                <button
                  className="edit"
                  onClick={(e) => {
                    e.stopPropagation()
                    abrirEditar(p)
                  }}
                >
                  ✏️
                </button>

                <button
                  className="delete"
                  onClick={(e) => {
                    e.stopPropagation()
                    confirmarDeletar(p)
                  }}
                >
                  🗑️
                </button>
              </div>

            </div>
          ))}

        </div>
      )}

      {/* MODAL */}
      {mostrarModal && (
        <div className="modal">

          <h3>{editando ? "Editar Personagem" : "Novo Personagem"}</h3>

          <input
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <textarea
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <input
            placeholder="Papel"
            value={papel}
            onChange={(e) => setPapel(e.target.value)}
          />

          {/* 🎨 CORES */}
          <h4>Paleta de cores</h4>

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

          <button onClick={salvar}>Salvar</button>
          <button onClick={() => setMostrarModal(false)}>Cancelar</button>

        </div>
      )}

      {confirmDelete && (
        <div className="modal">
          <p>Deseja deletar "{confirmDelete.nome}"?</p>

          <button onClick={deletarConfirmado}>Sim</button>
          <button onClick={() => setConfirmDelete(null)}>Cancelar</button>
        </div>
      )}

    </div>
  )
}
