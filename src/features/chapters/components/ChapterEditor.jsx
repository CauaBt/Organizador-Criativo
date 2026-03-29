import Button from "../../../components/ui/Button"

export default function ChapterEditor({
  capitulo,
  onBack,
  onChange
}) {

  return (
    <div className="chapter-editor">

      <Button
        variant="secondary"
        onClick={onBack}
      >
        ← Voltar
      </Button>

      <h2>{capitulo.titulo}</h2>

      <textarea
        className="chapter-textarea"
        value={capitulo.texto || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Escreva seu capítulo aqui..."
      />

    </div>
  )
}
