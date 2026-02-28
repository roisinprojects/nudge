export default function Input({ label, type = 'text', placeholder, value, onChange, onKeyDown }) {
  return (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}
      <input
        className="input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  )
}
