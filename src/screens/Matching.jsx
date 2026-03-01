import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'

export default function Matching() {
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => navigate('/results'), 3000)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <Screen>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 32 }}>
        <div className="spinner" />

        <div>
          <h2>Finding the perfect match…</h2>
          <p className="text-muted mt-8">
            Our AI is comparing everyone's availability and preferences.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
          {[
            { done: true,  label: 'Collecting responses' },
            { done: true,  label: 'Matching availability' },
            { done: false, label: 'Finding venues on OpenTable' },
            { done: false, label: 'Assigning booker' },
          ].map((step, i) => (
            <div
              key={i}
              style={{ display: 'flex', alignItems: 'center', gap: 12 }}
            >
              <div
                style={{
                  width: 20, height: 20,
                  borderRadius: '50%',
                  background: step.done ? 'var(--semantic-success)' : 'var(--bg-ui)',
                  border: `2px solid ${step.done ? 'var(--semantic-success)' : 'var(--border-strong)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, color: 'var(--color-text-primary)', flexShrink: 0,
                }}
              >
                {step.done ? '✓' : ''}
              </div>
              <span
                className="text-sm"
                style={{ color: step.done ? 'var(--semantic-success)' : 'var(--ink-secondary)' }}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted">
          Redirecting you to results automatically…
        </p>
      </div>
    </Screen>
  )
}
