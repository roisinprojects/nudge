// Segmented progress bar — shared by onboarding and response flows.
// Props:
//   total       — total number of steps/segments
//   current     — 1-based index of current step
//   counterText — optional right-aligned text on same row as bar (e.g. "2/3 selected")
export default function SegmentedBar({ total, current, counterText }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {Array.from({ length: total }).map((_, i) => {
          const step = i + 1
          let cls
          if (step < current)       cls = 'progress-seg done'
          else if (step === current) cls = 'progress-seg active'
          else                       cls = 'progress-seg todo'
          return <div key={i} className={cls} style={{ flex: 1 }} />
        })}
        {counterText && (
          <span style={{
            fontSize: 12,
            color: 'var(--ink-secondary)',
            whiteSpace: 'nowrap',
            paddingLeft: 12,
            fontWeight: 600,
          }}>
            {counterText}
          </span>
        )}
      </div>
      <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 6 }}>
        Step {current} of {total}
      </p>
    </div>
  )
}
