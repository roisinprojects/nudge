export default function Screen({ children, style }) {
  return (
    <div className="frame">
      <div className="screen" style={style}>
        {children}
      </div>
    </div>
  )
}
