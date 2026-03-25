import Card from "./Card"
import { useNavigate } from "react-router-dom"
import { calcularProgresso } from "../../utils/progresso"
import { tempoRelativo } from "../../utils/tempo"

export default function ProjectCard({ projeto, onEdit, onDelete }) {

  const navigate = useNavigate()
  const progresso = calcularProgresso(projeto)

  return (
    <Card
      className="story-card"
      onClick={() => navigate(`/project/${projeto.id}`)}
    >

      {/* TÍTULO */ }
  <h3>{projeto.titulo}</h3>

  {/* DESCRIÇÃO */ }
  <p className="descricao">{projeto.descricao}</p>

  {/* GÊNERO */ }
  <p className="genero">{projeto.genero}</p>

  {/* CORES */ }
  <div className="color-palette">
    {projeto.estetica?.cores?.map((cor, i) => (
      <div
        key={i}
        className="color-box"
        style={{ backgroundColor: cor }}
      />
    ))}
  </div>

  {/* HUMOR */ }
  <p className="humor">{projeto.estetica?.humor}</p>

  {/* TAGS */ }
  <div className="tags">
    {projeto.estetica?.tags?.map((tag, i) => (
      <span key={i}>{tag}</span>
    ))}
  </div>

  {/* PROGRESSO */ }

  <p className="progress-label">Processo por Abas:</p>
  <div className="progresso">

    <div>
      <strong>{progresso.estetica || 0}%</strong>
      <span>Estética</span>
    </div>

    <div>
      <strong>{progresso.personagens || 0}</strong>
      <span>Personagens</span>
    </div>

    <div>
      <strong>{progresso.capitulos || 0}</strong>
      <span>Capítulos</span>
    </div>

    <div>
      <strong>{progresso.relacoes || 0}</strong>
      <span>Relações</span>
    </div>

  </div>

  {/* DATA */ }
  <p className="last-edit">
    Última edição:{" "}
    {projeto.atualizadoEm
      ? tempoRelativo(projeto.atualizadoEm)
      : "Sem edição"}
  </p>

  {/* AÇÕES */ }
  <div className="card-actions">

    <button
      className="edit"
      onClick={(e) => {
        e.stopPropagation()
        onEdit(projeto)
      }}
    >
      ✏️
    </button>

    <button
      className="delete"
      onClick={(e) => {
        e.stopPropagation()
        onDelete(projeto)
      }}
    >
      🗑️
    </button>

  </div>

    </Card>
  )
}
