import { useViewMode } from '../context/viewMode'

export default function Screen({ children, style }) {
  const mode = useViewMode()

  if (mode === 'web') {
    return (
      <div
        style={{
          width: '100%',
          maxWidth: 600,
          margin: '0 auto',
          padding: '0 40px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          ...style,
        }}
      >
        {children}
      </div>
    )
  }

  return (
    <div className="frame">
      <div className="screen" style={style}>
        {children}
      </div>
    </div>
  )
}
