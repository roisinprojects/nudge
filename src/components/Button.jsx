export default function Button({ children, variant = 'primary', half, onClick, disabled, style }) {
  const cls = [
    'btn',
    disabled ? 'btn-disabled' : `btn-${variant}`,
    half ? 'btn-half' : '',
  ].filter(Boolean).join(' ')

  return (
    <button
      className={cls}
      onClick={disabled ? undefined : onClick}
      style={style}
    >
      {children}
    </button>
  )
}
