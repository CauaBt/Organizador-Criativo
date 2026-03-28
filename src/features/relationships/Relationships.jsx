import { useState } from "react"
import { salvarRelacoes } from "./relationshipsStore"

import Button from "../../components/ui/Button"
import EmptyState from "../../components/ui/EmptyState"
import BaseModal from "../../components/modals/BaseModal"

import { FiHeart, FiTrash2 } from "react-icons/fi"

export default function Relationships({ projeto, setProjeto }) {

  const personagens = projeto.personagens || []
  const [relacoes, setRelacoes] = useState(projeto.relacoes || [])
  const tags = projeto.tags || []

  const [mostrarModal, setMostrarModal] = useState(false)
  const [personagemSelecionado, setPersonagemSelecionado] = useState(null)
  const [confirmReset, setConfirmReset] = useState(false)

  const [p1, setP1] = useState("")
  const [p2, setP2] = useState("")
  const [tipo, setTipo] = useState("")

  // =========================
  // GERAR COR
  // =========================

  function gerarCor() {
    const cores = [
      "#fca5a5",
      "#93c5fd",
      "#86efac",
      "#fde68a",
      "#c4b5fd"
    ]
    return cores[Math.floor(Math.random() * cores.length)]
  }

  // =========================
  // CRIAR RELAÇÃO
  // =========================

  function adicionarRelacao() {
    if (!p1 || !p2 || !tipo) return

    if (p1 === p2) {
      alert("Um personagem não pode se relacionar com ele mesmo")
      return
    }

    const tipoFormatado = tipo.toLowerCase().trim()

    let novasTags = [...tags]

    const existeTag = tags.find(t => t.nome === tipoFormatado)

    if (!existeTag) {
      novasTags.push({
        nome: tipoFormatado,
        cor: gerarCor()
      })
    }

    const nova = {
      id: Date.now(),
      p1: Number(p1),
      p2: Number(p2),
      tipo: tipoFormatado
    }

    const atualizados = [...relacoes, nova]

    setRelacoes(atualizados)

    setProjeto({
      ...projeto,
      relacoes: atualizados,
      tags: novasTags
    })

    salvarRelacoes(projeto.id, atualizados, novasTags)

    setMostrarModal(false)
    setTipo("")
    setP1("")
    setP2("")
  }

  // =========================
  // RESET
  // =========================

  function resetarRelacoes() {
    setRelacoes([])

    setProjeto({
      ...projeto,
      relacoes: [],
      tags: []
    })

    salvarRelacoes(projeto.id, [], [])
  }

  // =========================
  // POSIÇÕES
  // =========================

  const tamanho = 450
  const centro = tamanho / 2
  const raio = 170

  const posicoes = personagens.map((p, index) => {
    const angulo = (index / personagens.length) * 2 * Math.PI

    return {
      ...p,
      x: centro + Math.cos(angulo) * raio,
      y: centro + Math.sin(angulo) * raio
    }
  })

  // =========================
  // RELAÇÕES DO PERSONAGEM
  // =========================

  const relacoesDoPersonagem = relacoes.filter(r =>
    r.p1 === personagemSelecionado?.id ||
    r.p2 === personagemSelecionado?.id
  )

  // =========================
  // RENDER
  // =========================

  return (
    <div>

      <h2>Relacionamentos</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <Button onClick={() => setMostrarModal(true)}>
          + Criar Relacionamento
        </Button>

        <Button variant="danger" onClick={() => setConfirmReset(true)}>
          Resetar Relações
        </Button>
      </div>

      {personagens.length === 0 ? (
        <EmptyState
          icon={FiHeart}
          title="Nenhum personagem"
          description="Crie personagens primeiro"
          actionText={"Crie um Personagem"}
        />
      ) : (

        <div className="relationships-map">

          {/* LEGENDA */}
          <div className="relationships-legend">
            <div className="relationships-legend-title">
              Legenda
            </div>

            {tags.map(tag => (
              <div key={tag.nome} className="relationships-legend-item">
                <div
                  className="relationships-legend-color"
                  style={{ background: tag.cor }}
                />
                <span className="relationships-legend-text">
                  {tag.nome}
                </span>
              </div>
            ))}
          </div>

          {/* LINHAS */}
          <svg className="relationships-svg" width="100%" height="100%">
            {relacoes.map(r => {

              const a = posicoes.find(p => p.id === r.p1)
              const b = posicoes.find(p => p.id === r.p2)
              const tag = tags.find(t => t.nome === r.tipo)

              if (!a || !b) return null

              return (
                <line
                  key={r.id}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={tag?.cor || "#ccc"}
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeOpacity={0.8}
                />
              )
            })}
          </svg>

          {/* PERSONAGENS */}
          {posicoes.map(p => (
            <div
              key={p.id}
              className="relationship-node"
              style={{ left: p.x, top: p.y }}
              onClick={() => setPersonagemSelecionado(p)}
            >
              {p.nome}
            </div>
          ))}

        </div>
      )}

      {/* ========================= */}
      {/* MODAL PERSONAGEM */}
      {/* ========================= */}

      {personagemSelecionado && (
        <BaseModal onClose={() => setPersonagemSelecionado(null)}>

          <h3>{personagemSelecionado.nome}</h3>

          {relacoesDoPersonagem.length === 0 ? (
            <p>Sem relacionamentos</p>
          ) : (
            relacoesDoPersonagem.map(r => {

              const outroId =
                r.p1 === personagemSelecionado.id ? r.p2 : r.p1

              const outro = personagens.find(p => p.id === outroId)
              const tag = tags.find(t => t.nome === r.tipo)

              return (
                <div key={r.id} className="relationship-item">

                  <strong>{outro?.nome}</strong>
                  <p>{r.tipo}</p>

                  <div className="color-controls">

                    <div className="color-add">

                      <div
                        className="color-preview"
                        style={{ background: tag?.cor }}
                      />

                      <label className="color-button">
                        +

                        <input
                          type="color"
                          value={tag?.cor}
                          onChange={(e) => {

                            const novasTags = tags.map(t =>
                              t.nome === r.tipo
                                ? { ...t, cor: e.target.value }
                                : t
                            )

                            setProjeto({
                              ...projeto,
                              tags: novasTags
                            })

                            salvarRelacoes(projeto.id, relacoes, novasTags)
                          }}
                        />
                      </label>

                    </div>

                      <button className="delete" onClick={() => {

                        const atualizados = relacoes.filter(rel => rel.id !== r.id)

                        setRelacoes(atualizados)

                        setProjeto({
                          ...projeto,
                          relacoes: atualizados,
                          tags: tags
                        })

                        salvarRelacoes(projeto.id, atualizados, tags)

                      }}>
                        <FiTrash2 className="icon-delete" />
                      </button>

                  </div>

                </div>
              )
            })
          )}

        </BaseModal>
      )}

      {/* MODAL CRIAR */}

      {mostrarModal && (
        <BaseModal onClose={() => setMostrarModal(false)}>

          <h3>Novo Relacionamento</h3>

          <select value={p1} onChange={(e) => setP1(e.target.value)}>
            <option value="">Personagem 1</option>
            {personagens.map(p => (
              <option
                key={p.id}
                value={p.id}
                disabled={Number(p2) === p.id}
              >
                {p.nome}
              </option>
            ))}
          </select>

          <select value={p2} onChange={(e) => setP2(e.target.value)}>
            <option value="">Personagem 2</option>
            {personagens.map(p => (
              <option
                key={p.id}
                value={p.id}
                disabled={Number(p1) === p.id}
              >
                {p.nome}
              </option>
            ))}
          </select>

          <p style={{ fontSize: "12px", color: "#666", marginTop: "10px" }}>
            Selecione um tipo existente:
          </p>

          <div className="tags-container">
            {tags.map(tag => (
              <div
                key={tag.nome}
                className={`tag ${tipo === tag.nome ? "active" : ""}`}
                style={{ background: tag.cor }}
                onClick={() => setTipo(tag.nome)}
              >
                {tag.nome}
              </div>
            ))}
          </div>

          <p style={{ fontSize: "12px", color: "#666", marginTop: "10px" }}>
            Ou crie um novo tipo:
          </p>

          <input
            placeholder="Novo tipo..."
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          />

          <Button onClick={adicionarRelacao}>
            Criar
          </Button>

        </BaseModal>
      )}

      {/* CONFIRM RESET */}

      {confirmReset && (
        <BaseModal onClose={() => setConfirmReset(false)}>

          <div className="modal-header">
            <h3 className="modal-title">
              Resetar relações
            </h3>
          </div>

          <p className="modal-text">
            Isso vai apagar todas as relações e tipos criados.
          </p>

          <div className="modal-warning">
            Essa ação não pode ser desfeita.
          </div>

          <div className="modal-actions">

            <Button
              variant="danger"
              onClick={() => {
                resetarRelacoes()
                setConfirmReset(false)
              }}
            >
              Resetar
            </Button>

            <Button
              variant="secondary"
              onClick={() => setConfirmReset(false)}
            >
              Cancelar
            </Button>

          </div>

        </BaseModal>
      )}

    </div>
  )
}
