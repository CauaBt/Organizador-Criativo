import { useState } from "react"
import { salvarCapitulos } from "./chaptersStore"

export default function Chapters({ projeto }) {

  const [capitulos, setCapitulos] = useState(projeto.capitulos || [])

  const [capituloAtivo, setCapituloAtivo] = useState(null)

  const [mostrarModal, setMostrarModal] = useState(false)
  const [editando, setEditando] = useState(null)

  const [confirmDelete, setConfirmDelete] = useState(null)

  const [titulo, setTitulo] = useState("")
  const [texto, setTexto] = useState("")

  // -------- CRIAR / EDITAR --------

  function abrirCriar() {
    setTitulo("")
    setTexto("")
    setEditando(null)
    setMostrarModal(true)
  }

  function abrirEditar(c) {
    setTitulo(c.titulo)
    setTexto(c.texto || "")
    setEditando(c)
    setMostrarModal(true)
  }

  function salvar() {

    if (!titulo) return

    let atualizados

    if (editando) {
      atualizados = capitulos.map(c =>
        c.id === editando.id
          ? { ...c, titulo, texto }
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
    salvarCapitulos(projeto.id, atualizados)

    setMostrarModal(false)
    setEditando(null)
  }

  function deletarConfirmado() {
    const atualizados = capitulos.filter(c => c.id !== confirmDelete.id)

    setCapitulos(atualizados)
    salvarCapitulos(projeto.id, atualizados)

    setConfirmDelete(null)
  }

  // -------- VIEW LISTA --------

  if (!capituloAtivo) {
    return (
      <div>

        <h2>Capítulos</h2>

        <button onClick={abrirCriar}>
          + Criar Capítulo
        </button>

        {capitulos.length === 0 ? (
          <p>Nenhum capítulo criado</p>
        ) : (
          <div>
            {capitulos.map((c) => (
              <div key={c.id}>

                <h3 onClick={() => setCapituloAtivo(c)}>
                  {c.titulo}
                </h3>

                <button onClick={() => abrirEditar(c)}>
                  Editar
                </button>

                <button onClick={() => setConfirmDelete(c)}>
                  Deletar
                </button>

              </div>
            ))}
          </div>
        )}

        {mostrarModal && (
          <div>

            <h3>{editando ? "Editar Capítulo" : "Novo Capítulo"}</h3>

            <input
              placeholder="Título do capítulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />

            <button onClick={salvar}>
              Salvar
            </button>

            <button onClick={() => setMostrarModal(false)}>
              Cancelar
            </button>

          </div>
        )}

        {confirmDelete && (
          <div>

            <p>Deseja deletar "{confirmDelete.titulo}"?</p>

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

  // -------- VIEW ESCRITA --------

  return (
    <div>

      <button onClick={() => setCapituloAtivo(null)}>
        ← Voltar
      </button>

      <h2>{capituloAtivo.titulo}</h2>

      <textarea
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

          setCapituloAtivo({
            ...capituloAtivo,
            texto: novoTexto
          })
        }}
        placeholder="Escreva seu capítulo aqui..."
      />

    </div>
  )
}
