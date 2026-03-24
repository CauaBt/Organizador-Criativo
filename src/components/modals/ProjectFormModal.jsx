import { useState } from "react"
import BaseModal from "./BaseModal"

export default function ProjectFormModal({ onClose, onSave, projeto }) {

const [titulo, setTitulo] = useState(projeto?.titulo || "")
const [descricao, setDescricao] = useState(projeto?.descricao || "")
const [genero, setGenero] = useState(projeto?.genero || "")

    function handleSave() {

        if (!titulo) return

        onSave({
        id: projeto?.id || Date.now(),
        titulo,
        descricao,
        genero
        })

        onClose()
    }

    return (
        <BaseModal onClose={onClose}>

        <h3>{projeto ? "Editar Projeto" : "Novo Projeto"}</h3>

        <input
            placeholder="Nome do projeto"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
        />

        <textarea
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
        />

        <input
            placeholder="Gênero (ex: fantasia, romance...)"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
        />

        <div className="modal-buttons">
            <button onClick={handleSave}>Salvar</button>
            <button onClick={onClose}>Cancelar</button>
        </div>

        </BaseModal>
    )
    }
