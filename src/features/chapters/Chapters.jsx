import { useState } from "react"
import { salvarCapitulos } from "./chaptersStore"

import Button from "../../components/ui/Button"
import EmptyState from "../../components/ui/EmptyState"
import BaseModal from "../../components/modals/BaseModal"

import { FiEdit2, FiTrash2, FiBookOpen } from "react-icons/fi"
import { useEffect } from "react"

export default function Chapters({ projeto, setProjeto }) {

  const [capitulos, setCapitulos] = useState(projeto.capitulos || [])
  const [capituloAtivo, setCapituloAtivo] = useState(null)

  const [mostrarModal, setMostrarModal] = useState(false)
  const [editando, setEditando] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const [titulo, setTitulo] = useState("")

  useEffect(() => {
    setCapitulos(projeto.capitulos || [])
  }, [projeto.capitulos])


  // CRIAR / EDITAR

  function abrirCriar() {
    setTitulo("")
    setEditando(null)
    setMostrarModal(true)
  }

  function abrirEditar(c) {
    setTitulo(c.titulo)
    setEditando(c)
    setMostrarModal(true)
  }

  function salvar() {
    if (!titulo.trim()) return

    let atualizados

    if (editando) {
      atualizados = capitulos.map(c =>
        c.id === editando.id
          ? { ...c, titulo }
          : c
      )
    } else {
      const novo = {
        id: Date.now(),
        titulo,
        texto: ""
      }

      atualizados = [...capitulos, novo]
    }

    setCapitulos(atualizados)

    setProjeto({
      ...projeto,
      capitulos: atualizados
    })

    salvarCapitulos(projeto.id, atualizados)



    setMostrarModal(false)
    setEditando(null)
  }

  function deletarConfirmado() {
    const atualizados = capitulos.filter(c => c.id !== confirmDelete.id)

    setCapitulos(atualizados)

    setProjeto({
      ...projeto,
      capitulos: atualizados
    })

    salvarCapitulos(projeto.id, atualizados)
    setConfirmDelete(null)
  }

  // =========================
  // LISTA
  // =========================

  if (!capituloAtivo) {
    return (
      <div>

        <h2>Capítulos</h2>

        <Button
          variant="primary"
          className="create-chapter-btn"
          onClick={abrirCriar}
        >
          + Criar Capítulo
        </Button>

        {capitulos.length === 0 ? (
          <EmptyState
            icon={FiBookOpen}
            title="Nenhum capítulo criado ainda"
            description="Comece criando seu primeiro capítulo"
            hint="Organize sua história em capítulos para facilitar a escrita"
            actionText="Criar Capítulo"
            onAction={abrirCriar}
          />
        ) : (
          <div className="chapters-grid">

            {capitulos.map((c, index) => (
              <div
                key={c.id}
                className="chapter-card"
                onClick={() => setCapituloAtivo(c)}
              >

                {/* HEADER */}
                <div className="chapter-header">
                  <span className="chapter-index">
                    Capítulo {index + 1}
                  </span>

                  <h3>{c.titulo || "Sem título"}</h3>
                </div>

                {/* DESCRIÇÃO */}
                <p className="chapter-preview">
                  {c.texto
                    ? c.texto.length > 100
                      ? c.texto.slice(0, 100) + "..."
                      : c.texto
                    : "Sem conteúdo ainda"}

                </p>

                {/* FOOTER */}
                <div className="chapter-footer">
                  <span>
                    📄 {c.texto?.length || 0} caracteres
                  </span>
                </div>

                {/* AÇÕES */}
                <div className="card-actions">

                  <button
                    className="edit"
                    onClick={(e) => {
                      e.stopPropagation()
                      abrirEditar(c)
                    }}
                  >
                    <FiEdit2 className="icon-edit" />
                  </button>

                  <button
                    className="delete"
                    onClick={(e) => {
                      e.stopPropagation()
                      setConfirmDelete(c)
                    }}
                  >
                    <FiTrash2 className="icon-delete" />
                  </button>

                </div>

              </div>
            ))}


          </div>
        )}

        {/* MODAL */}
        {mostrarModal && (
          <BaseModal onClose={() => setMostrarModal(false)}>

            <div className="modal-header">
              <h3 className="modal-title">
                {editando ? "Editar Capítulo" : "Novo Capítulo"}
              </h3>
            </div>

            <input
              placeholder="Título do capítulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />

            <div className="modal-actions">
              <Button variant="secondary" onClick={() => setMostrarModal(false)}>
                Cancelar
              </Button>

              <Button variant="primary" onClick={salvar}>
                Salvar
              </Button>
            </div>

          </BaseModal>
        )}

        {/* DELETE */}
        {confirmDelete && (
          <BaseModal onClose={() => setConfirmDelete(null)}>

            <p className="modal-text">
              Deseja deletar <strong>{confirmDelete.titulo}</strong>?
            </p>

            <div className="modal-actions">
              <Button variant="danger" onClick={deletarConfirmado}>
                Deletar
              </Button>

              <Button variant="secondary" onClick={() => setConfirmDelete(null)}>
                Cancelar
              </Button>
            </div>

          </BaseModal>
        )}

      </div>
    )
  }

  // EDITOR

  return (
    <div className="chapter-editor">

      <Button
        variant="secondary"
        onClick={() => setCapituloAtivo(null)}
      >
        ← Voltar
      </Button>

      <h2>{capituloAtivo.titulo}</h2>

      <textarea
        className="chapter-textarea"
        value={capituloAtivo.texto || ""}
        onChange={(e) => {

          const novoTexto = e.target.value

          const atualizados = capitulos.map(c =>
            c.id === capituloAtivo.id
              ? { ...c, texto: novoTexto }
              : c
          )

          setCapitulos(atualizados)
          salvarCapitulos(projeto.id, atualizados)

          const atualizado = {
            ...capituloAtivo,
            texto: novoTexto
          }

          setCapituloAtivo(atualizado)

        }}
        placeholder="Escreva seu capítulo aqui..."
      />

    </div>
  )
}
