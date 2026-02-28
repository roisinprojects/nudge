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
          let bg
          if (step < current)      bg = 'var(--color-primary-500)'        // complete
          else if (step === current) bg = 'rgba(232, 93, 77, 0.6)'          // current
          else                       bg = 'var(--color-neutral-300)'         // upcoming
          return (
            <div
              key={i}
              style={{
                flex: 1, height: 4, borderRadius: 2,
                background: bg,
                transition: 'background var(--duration-normal) var(--ease-out)',
              }}
            />
          )
        })}
        {counterText && (
          <span style={{
            fontSize: 13,
            color: 'var(--color-text-secondary)',
            whiteSpace: 'nowrap',
            paddingLeft: 12,
            fontWeight: 600,
          }}>
            {counterText}
          </span>
        )}
      </div>
      <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 6 }}>
        Step {current} of {total}
      </p>
    </div>
  )
}
