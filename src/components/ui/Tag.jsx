export default function Tag({ children, active, onClick }) {

  return (
    <span
      className={`tag ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {children}
    </span>
  )
}
