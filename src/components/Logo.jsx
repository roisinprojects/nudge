export default function Logo({ tagline }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span className="logo">nudge</span>
      {tagline && <span className="tagline">{tagline}</span>}
    </div>
  )
}
