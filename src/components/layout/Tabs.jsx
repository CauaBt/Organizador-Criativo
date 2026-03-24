export default function Tabs({ tabs, active, onChange }) {

  return (
    <div className="tabs">

      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={active === tab.id ? "tab active" : "tab"}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}

    </div>
  )
}
