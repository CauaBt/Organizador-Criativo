import BaseModal from "../../../components/modals/BaseModal"
import Button from "../../../components/ui/Button"

export default function RelationshipFormModal({
  personagens,
  tags,
  p1,
  p2,
  tipo,
  setP1,
  setP2,
  setTipo,
  onClose,
  onCreate
}) {

  return (
    <BaseModal onClose={onClose}>

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

      <Button onClick={onCreate}>
        Criar
      </Button>

    </BaseModal>
  )
}
