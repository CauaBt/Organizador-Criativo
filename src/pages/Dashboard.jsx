import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

import { tempoRelativo } from "../utils/tempo"
import { calcularProgresso } from "../utils/progresso"
import { getProjetos, saveProjetos } from "../services/projetosService"

import ProjectFormModal from "../components/modals/ProjectFormModal"
import ConfirmModal from "../components/modals/ConfirmModal"

export default function Dashboard() {

  const navigate = useNavigate()
  const location = useLocation()

  const [projetos, setProjetos] = useState([])
  const [mostrarModal, setMostrarModal] = useState(false)
  const [editando, setEditando] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)

  useEffect(() => {
    const saved = getProjetos() || []
    setProjetos(saved)
  }, [location])

  function handleSave(projeto) {

    let atualizados

    if (editando) {
      atualizados = projetos.map(p =>
        p.id === projeto.id
          ? {
              ...p,
              ...projeto,
              atualizadoEm: new Date().toISOString()
            }
          : p
      )
    } else {
      atualizados = [
        ...projetos,
        {
          ...projeto,
          capitulos: [],
          personagens: [],
          relacoes: [],
          estetica: {
            cores: [],
            imagem: null,
            musica: "",
            humor: "",
            tags: []
          },
          atualizadoEm: new Date().toISOString()
        }
      ]
    }

    setProjetos(atualizados)
    saveProjetos(atualizados)

    setMostrarModal(false)
    setEditando(null)
  }

  function editarProjeto(p) {
    setEditando(p)
    setMostrarModal(true)
  }

  function deletarProjeto(id) {
    const atualizados = projetos.filter(p => p.id !== id)

    setProjetos(atualizados)
    saveProjetos(atualizados)

    setConfirmDelete(null)
  }

  return (
    <div className="dashboard">

      <h1>Organizador Criativo</h1>

      <button onClick={() => {
        setEditando(null)
        setMostrarModal(true)
      }}>
        + Criar Projeto
      </button>

      <h2>Minhas Histórias</h2>

      <div className="projects-grid">

        {projetos.length === 0 ? (
          <p>Nenhum projeto criado</p>
        ) : (
          projetos.map((p) => {

            const progresso = calcularProgresso(p)

            return (
              <div
                key={p.id}
                className="story-card"
                onClick={() => navigate(`/project/${p.id}`)}
              >

                <h3>{p.titulo}</h3>

                <p>{p.descricao}</p>

                <p className="genero">
                  {p.genero}
                </p>

                <div className="color-palette">
                  {p.estetica?.cores?.map((cor, i) => (
                    <div
                      key={i}
                      className="color-box"
                      style={{ backgroundColor: cor }}
                    />
                  ))}
                </div>

                <p className="humor">
                  {p.estetica?.humor}
                </p>

                <div className="tags">
                  {p.estetica?.tags?.map((tag, i) => (
                    <span key={i}>{tag}</span>
                  ))}
                </div>

                {/* PROGRESSO */}
                <div className="progresso">

                  <div>
                    <strong>{progresso.estetica}%</strong>
                    <span>Estética</span>
                  </div>

                  <div>
                    <strong>{progresso.personagens}</strong>
                    <span>Personagens</span>
                  </div>

                  <div>
                    <strong>{progresso.capitulos}</strong>
                    <span>Capítulos</span>
                  </div>

                  <div>
                    <strong>{progresso.relacoes}</strong>
                    <span>Relações</span>
                  </div>

                </div>

                <p className="last-edit">
                  {p.atualizadoEm
                    ? tempoRelativo(p.atualizadoEm)
                    : "Sem edição"}
                </p>

                <div className="card-actions">

                  <button
                    className="edit"
                    onClick={(e) => {
                      e.stopPropagation()
                      editarProjeto(p)
                    }}
                  >
                    .
                  </button>

                  <button
                    className="delete"
                    onClick={(e) => {
                      e.stopPropagation()
                      setConfirmDelete(p)
                    }}
                  >
                    .
                  </button>

                </div>

              </div>
            )
          })
        )}

      </div>

      {mostrarModal && (
        <ProjectFormModal
          projeto={editando}
          onClose={() => {
            setMostrarModal(false)
            setEditando(null)
          }}
          onSave={handleSave}
        />
      )}

      {confirmDelete && (
        <ConfirmModal
          message="Deseja deletar este projeto?"
          onConfirm={() => deletarProjeto(confirmDelete.id)}
          onClose={() => setConfirmDelete(null)}
        />
      )}

    </div>
  )
}
