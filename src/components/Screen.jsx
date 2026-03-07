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
          backgroundColor: 'var(--bg-primary)',
          backgroundImage: 'radial-gradient(circle, var(--dot-color) 1px, transparent 1px)',
          backgroundSize: 'var(--dot-size) var(--dot-size)',
          backgroundAttachment: 'local',
          willChange: 'transform',
          transform: 'translateZ(0)',
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
