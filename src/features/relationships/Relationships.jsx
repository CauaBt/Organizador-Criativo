import { useState } from "react"
import { salvarRelacoes } from "./relationshipsStore"

export default function Relationships({ projeto }) {

  const personagens = projeto.personagens || []

  const [relacoes, setRelacoes] = useState(projeto.relacoes || [])

  const [p1, setP1] = useState("")
  const [p2, setP2] = useState("")
  const [tipo, setTipo] = useState("")

  const [confirmDelete, setConfirmDelete] = useState(null)

  function adicionarRelacao() {

    if (!p1 || !p2) return

    const nova = {
      id: Date.now(),
      p1,
      p2,
      tipo
    }

    const atualizados = [...relacoes, nova]

    setRelacoes(atualizados)
    salvarRelacoes(projeto.id, atualizados)

    setP1("")
    setP2("")
    setTipo("")
  }

  function deletarConfirmado() {

    const atualizados = relacoes.filter(r => r.id !== confirmDelete.id)

    setRelacoes(atualizados)
    salvarRelacoes(projeto.id, atualizados)

    setConfirmDelete(null)
  }

  return (
    <div>

      <h2>Relacionamentos</h2>

      {/* CRIAR RELAÇÃO */}
      <div>

        <select value={p1} onChange={(e) => setP1(e.target.value)}>
          <option value="">Personagem 1</option>
          {personagens.map(p => (
            <option key={p.id} value={p.nome}>
              {p.nome}
            </option>
          ))}
        </select>

        <select value={p2} onChange={(e) => setP2(e.target.value)}>
          <option value="">Personagem 2</option>
          {personagens.map(p => (
            <option key={p.id} value={p.nome}>
              {p.nome}
            </option>
          ))}
        </select>

        <input
          placeholder="Tipo (ex: amizade, rivalidade)"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        />

        <button onClick={adicionarRelacao}>
          Criar Relação
        </button>

      </div>

      {/* LISTA */}
      {relacoes.length === 0 ? (
        <p>Nenhuma relação criada</p>
      ) : (
        <div>

          {relacoes.map(r => (
            <div key={r.id}>

              <p>
                {r.p1} ↔ {r.p2} {r.tipo && `(${r.tipo})`}
              </p>

              <button onClick={() => setConfirmDelete(r)}>
                Deletar
              </button>

            </div>
          ))}

        </div>
      )}

      {/* CONFIRMAÇÃO */}
      {confirmDelete && (
        <div>

          <p>
            Deletar relação entre {confirmDelete.p1} e {confirmDelete.p2}?
          </p>

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
