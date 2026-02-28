export default function Button({ children, variant = 'primary', half, onClick, disabled, style, type = 'button' }) {
  const cls = [
    'btn',
    disabled ? 'btn-disabled' : `btn-${variant}`,
    half ? 'btn-half' : '',
  ].filter(Boolean).join(' ')

  return (
    <button
      type={type}
      className={cls}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-disabled={disabled}
      style={style}
    >
      {children}
    </button>
  )
}
