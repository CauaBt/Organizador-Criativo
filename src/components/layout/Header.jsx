export default function Header({ titulo, subtitulo, onBack }) {

  return (
    <div className="header">

      {onBack && (
        <button onClick={onBack}>←</button>
      )}

      <div>
        <h2>{titulo}</h2>
        {subtitulo && <p>{subtitulo}</p>}
      </div>

    </div>
  )
}
