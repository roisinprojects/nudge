export default function Icon({ name, size = 20, style, className = '' }) {
  return (
    <span
      className={`material-icons${className ? ' ' + className : ''}`}
      style={{ fontSize: size, lineHeight: 1, display: 'inline-flex', alignItems: 'center', userSelect: 'none', ...style }}
      aria-hidden="true"
    >
      {name}
    </span>
  )
}
