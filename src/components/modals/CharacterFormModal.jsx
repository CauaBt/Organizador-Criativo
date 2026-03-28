import { useState } from "react"
import BaseModal from "./BaseModal"

export default function CharacterFormModal({ onClose, onSave }) {

  // =========================
  // ESTADO
  // =========================

  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const [papel, setPapel] = useState("")

  const papeis = [
    "Protagonista",
    "Antagonista",
    "Coadjuvante",
    "Mentor",
    "Vilão"
  ]

  // =========================
  // AÇÕES
  // =========================

  function handleSave() {
    if (!nome.trim()) return

    onSave({
      id: Date.now(),
      nome,
      descricao,
      papel
    })

    onClose()
  }

  // =========================
  // RENDER
  // =========================

  return (
    <BaseModal onClose={onClose}>

      <h3>Novo Personagem</h3>

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

      <p>Papel</p>

      <div className="role-list">
        {papeis.map((p) => (
          <button
            key={p}
            className={papel === p ? "role active" : "role"}
            onClick={() => setPapel(p)}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="modal-actions">
        <button onClick={handleSave}>Salvar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>

    </BaseModal>
  )
}
