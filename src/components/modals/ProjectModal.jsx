import BaseModal from "./BaseModal"
import Button from "../ui/Button"
import Input from "../ui/Input"
import Textarea from "../ui/Textarea"


export default function ProjectModal({ projeto, onClose, onSave, setProjeto }) {

  function handleChange(campo, valor) {
    setProjeto({
      ...projeto,
      [campo]: valor
    })
  }

  return (
    <BaseModal onClose={onClose}>

      <h3>{projeto?.id ? "Editar Projeto" : "Novo Projeto"}</h3>

      <Input
        label="Nome do projeto"
        value={projeto?.titulo || ""}
        onChange={(e) => handleChange("titulo", e.target.value)}
        placeholder="Ex: Minha história"
      />

      <Textarea
        label="Descrição"
        value={projeto?.descricao || ""}
        onChange={(e) => handleChange("descricao", e.target.value)}
        placeholder="Sobre o que é sua história?"
      />

      <Input
        label="Gênero"
        value={projeto?.genero || ""}
        onChange={(e) => handleChange("genero", e.target.value)}
        placeholder="Fantasia, romance..."
      />

      <div className="modal-actions">

        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>

        <Button variant="primary" onClick={() => onSave(projeto)}>
          Salvar
        </Button>

      </div>

    </BaseModal>
  )
}
