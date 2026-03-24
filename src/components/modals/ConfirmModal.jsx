import BaseModal from "./BaseModal"

export default function ConfirmModal({ onConfirm, onClose, message }) {

  return (
    <BaseModal onClose={onClose}>

      <p>{message || "Tem certeza?"}</p>

      <div className="modal-buttons">
        <button onClick={onConfirm}>Sim</button>
        <button onClick={onClose}>Cancelar</button>
      </div>

    </BaseModal>
  )
}
