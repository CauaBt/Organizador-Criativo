export default function Header({ titulo, subtitulo, onBack }) {
  return (
    <div className="header">

      <button onClick={onBack}>
        ←
      </button>

      <div>
        <h2>{titulo}</h2>
        <p>{subtitulo}</p>
      </div>

    </div>
  )
}

