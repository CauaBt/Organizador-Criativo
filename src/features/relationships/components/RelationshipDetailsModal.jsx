import BaseModal from "../../../components/modals/BaseModal"
import { FiTrash2 } from "react-icons/fi"

export default function RelationshipDetailsModal({
  personagem,
  personagens,
  relacoes,
  tags,
  onClose,
  onDeleteRelacao,
  onChangeColor
}) {

  const relacoesDoPersonagem = relacoes.filter(r =>
    r.p1 === personagem.id || r.p2 === personagem.id
  )

  return (
    <BaseModal onClose={onClose}>

      <h3>{personagem.nome}</h3>

      {relacoesDoPersonagem.length === 0 ? (
        <p>Sem relacionamentos</p>
      ) : (
        relacoesDoPersonagem.map(r => {

          const outroId =
            r.p1 === personagem.id ? r.p2 : r.p1

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
                      onChange={(e) =>
                        onChangeColor(r.tipo, e.target.value)
                      }
                    />
                  </label>

                </div>

                <button
                  className="delete"
                  onClick={() => onDeleteRelacao(r.id)}
                >
                  <FiTrash2 className="icon-delete" />
                </button>

              </div>

            </div>
          )
        })
      )}

    </BaseModal>
  )
}
