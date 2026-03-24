import Button from "./Button"

export default function EmptyState({ title, description, actionText, onAction }) {

  return (
    <div className="empty-state">

      <p className="empty-title">{title}</p>
      <p className="empty-desc">{description}</p>

      {actionText && (
        <Button onClick={onAction}>
          {actionText}
        </Button>
      )}

    </div>
  )
}
