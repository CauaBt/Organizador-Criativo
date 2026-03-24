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

  function abrirCriar() {
    setNome("")
    setDescricao("")
    setPapel("")
    setEditando(null)
    setMostrarModal(true)
  }

  function abrirEditar(p) {
    setNome(p.nome)
    setDescricao(p.descricao || "")
    setPapel(p.papel || "")
    setEditando(p)
    setMostrarModal(true)
  }

  function salvar() {

    if (!nome) return

    let atualizados

    if (editando) {
      atualizados = personagens.map(p =>
        p.id === editando.id
          ? { ...p, nome, descricao, papel }
          : p
      )
    } else {
      const novo = {
        id: Date.now(),
        nome,
        descricao,
        papel
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

      <button onClick={abrirCriar}>
        + Criar Personagem
      </button>

      {personagens.length === 0 ? (
        <p>Nenhum personagem criado</p>
      ) : (
        <div>
          {personagens.map((p) => (
            <div key={p.id}>

              <h3>{p.nome}</h3>
              <p>{p.papel}</p>

              <button onClick={() => abrirEditar(p)}>
                Editar
              </button>

              <button onClick={() => confirmarDeletar(p)}>
                Deletar
              </button>

            </div>
          ))}
        </div>
      )}

      {/* MODAL FORM */}
      {mostrarModal && (
        <div>

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
            placeholder="Papel (ex: protagonista)"
            value={papel}
            onChange={(e) => setPapel(e.target.value)}
          />

          <button onClick={salvar}>
            Salvar
          </button>

          <button onClick={() => setMostrarModal(false)}>
            Cancelar
          </button>

        </div>
      )}

      {/* MODAL CONFIRMAÇÃO */}
      {confirmDelete && (
        <div>

          <p>Deseja deletar o personagem "{confirmDelete.nome}"?</p>

          <button onClick={deletarConfirmado}>
            Sim
          </button>

          <button onClick={() => setConfirmDelete(null)}>
            Cancelar
          </button>

        </div>
      )}

    </div>
  )
}
