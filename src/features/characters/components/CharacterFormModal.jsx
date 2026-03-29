import BaseModal from "../../../components/modals/BaseModal"
import Button from "../../../components/ui/Button"

export default function CharacterFormModal({
  onClose,
  onSave,
  editando,
  nome, setNome,
  descricao, setDescricao,
  papel, setPapel,
  cores, setCores,
  novaCor, setNovaCor
}) {

  function adicionarCor() {
    if (!novaCor) return
    if (cores.includes(novaCor)) return
    setCores([...cores, novaCor])
  }

  function removerCor(index) {
    setCores(cores.filter((_, i) => i !== index))
  }

  return (
    <BaseModal onClose={onClose}>

      <div className="modal-header">
        <h3 className="modal-title">
          {editando ? "Editar Personagem" : "Novo Personagem"}
        </h3>

        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
      </div>

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

      <h4>Paleta de cores</h4>

      <div className="color-controls">

        <label className="color-add">
          +
          <input
            type="color"
            value={novaCor}
            onChange={(e) => setNovaCor(e.target.value)}
          />
        </label>

        <div
          className="color-preview"
          style={{ background: novaCor }}
        />

        <Button variant="secondary" onClick={adicionarCor}>
          Adicionar
        </Button>

      </div>

      <div className="color-palette">
        {cores.map((cor, i) => (
          <div key={cor + i} className="tag-item">
            <div
              className="color-box"
              style={{ background: cor }}
            />
            <button
              className="remove-btn"
              onClick={() => removerCor(i)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="modal-actions">
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>

        <Button variant="primary" onClick={onSave}>
          Salvar
        </Button>
      </div>

    </BaseModal>
  )
}
