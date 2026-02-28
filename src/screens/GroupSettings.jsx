import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import BackButton from '../components/BackButton'

const CYCLE_OPTIONS = ['Every 4 weeks', 'Every 6 weeks', 'Every 8 weeks']

const INITIAL_MEMBERS = [
  { name: 'Alex',   initial: 'A', isCreator: true,  isYou: false },
  { name: 'Jordan', initial: 'J', isCreator: false, isYou: false },
  { name: 'Priya',  initial: 'P', isCreator: false, isYou: false },
  { name: 'Róisín', initial: 'R', isCreator: false, isYou: true  },
]

export default function GroupSettings() {
  const navigate = useNavigate()

  const [groupName, setGroupName]       = useState('Uni Friends')
  const [editingName, setEditingName]   = useState(false)
  const [nameInput, setNameInput]       = useState('Uni Friends')

  const [cycle, setCycle]               = useState('Every 6 weeks')
  const [editingCycle, setEditingCycle] = useState(false)

  const [members, setMembers]           = useState(INITIAL_MEMBERS)
  const [removeTarget, setRemoveTarget] = useState(null)

  const [leaveModal, setLeaveModal]     = useState(false)

  const saveName = () => {
    if (nameInput.trim()) setGroupName(nameInput.trim())
    setEditingName(false)
  }

  const confirmRemove = (name) => {
    setMembers(prev => prev.filter(m => m.name !== name))
    setRemoveTarget(null)
  }

  // ── Remove confirmation modal ──────────────────────────────────────────────
  if (removeTarget) {
    return (
      <Screen style={{ paddingBottom: 40 }}>
        <div style={{ paddingTop: 56 }}>
          <BackButton onClick={() => setRemoveTarget(null)} />
        </div>
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 20, paddingBottom: 60,
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'var(--surface2)', border: '2px solid #333',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, fontWeight: 700, color: 'var(--taupe)',
          }}>
            {removeTarget[0]}
          </div>
          <div style={{ textAlign: 'center' }}>
            <h2>Remove {removeTarget}?</h2>
            <p className="text-muted mt-8" style={{ maxWidth: 260, margin: '8px auto 0' }}>
              They'll be removed from {groupName} and won't receive future nudges.
            </p>
          </div>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Button variant="primary" onClick={() => confirmRemove(removeTarget)}>
              Remove {removeTarget}
            </Button>
            <Button variant="ghost" onClick={() => setRemoveTarget(null)}>
              Cancel
            </Button>
          </div>
        </div>
      </Screen>
    )
  }

  // ── Leave group confirmation ───────────────────────────────────────────────
  if (leaveModal) {
    return (
      <Screen style={{ paddingBottom: 40 }}>
        <div style={{ paddingTop: 56 }}>
          <BackButton onClick={() => setLeaveModal(false)} />
        </div>
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 20, paddingBottom: 60,
        }}>
          <div style={{ fontSize: 48 }}>👋</div>
          <div style={{ textAlign: 'center' }}>
            <h2>Leave {groupName}?</h2>
            <p className="text-muted mt-8" style={{ maxWidth: 280, margin: '8px auto 0', lineHeight: 1.6 }}>
              You're the creator. If you leave, the group continues but nobody can edit settings or remove members.
            </p>
          </div>
          <div className="alert alert-warning" style={{ width: '100%', textAlign: 'left' }}>
            <span>ℹ️</span>
            <p style={{ fontSize: 13 }}>
              You won't be nudged anymore, but the group will still hang out without you.
            </p>
          </div>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Button variant="primary" onClick={() => navigate('/home')}>
              Leave group
            </Button>
            <Button variant="ghost" onClick={() => setLeaveModal(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Screen>
    )
  }

  // ── Main settings screen ───────────────────────────────────────────────────
  return (
    <Screen style={{ paddingBottom: 40 }}>
      <div style={{ paddingTop: 56 }}>
        <BackButton to="/group-detail" />
      </div>

      <div style={{ marginTop: 20 }}>
        <h1>Group settings</h1>
        <p className="text-muted mt-8">Creator only</p>
      </div>

      {/* Section: Group name */}
      <div style={{ marginTop: 28 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--taupe)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 }}>
          Group name
        </p>
        {editingName ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <input
              className="input"
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              autoFocus
            />
            <div style={{ display: 'flex', gap: 10 }}>
              <Button half onClick={saveName}>Save</Button>
              <Button half variant="ghost" onClick={() => { setNameInput(groupName); setEditingName(false) }}>Cancel</Button>
            </div>
          </div>
        ) : (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'var(--surface)', borderRadius: 'var(--radius)',
            padding: '14px 16px', border: '1px solid rgba(255, 255, 255, 0.06)',
          }}>
            <p style={{ fontWeight: 600 }}>{groupName}</p>
            <button
              onClick={() => setEditingName(true)}
              style={{
                background: 'transparent', border: 'none',
                color: 'var(--coral)', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }}
            >
              Edit
            </button>
          </div>
        )}
      </div>

      {/* Section: Cycle */}
      <div style={{ marginTop: 24 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--taupe)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 }}>
          Nudge cycle
        </p>
        {editingCycle ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {CYCLE_OPTIONS.map(opt => (
              <div
                key={opt}
                onClick={() => setCycle(opt)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '13px 16px', borderRadius: 'var(--radius)',
                  border: `1px solid ${cycle === opt ? 'var(--coral)' : '#2a2a2a'}`,
                  background: cycle === opt ? 'rgba(232,93,77,0.08)' : 'var(--surface)',
                  cursor: 'pointer', transition: 'all 0.12s',
                }}
              >
                <div style={{
                  width: 18, height: 18, borderRadius: '50%',
                  border: `2px solid ${cycle === opt ? 'var(--coral)' : 'rgba(255, 255, 255, 0.10)'}`,
                  background: cycle === opt ? 'var(--coral)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  {cycle === opt && <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#fff' }} />}
                </div>
                <p style={{ fontSize: 14, fontWeight: 600, color: cycle === opt ? 'var(--text)' : 'var(--text-muted)' }}>
                  {opt}
                </p>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              <Button half onClick={() => setEditingCycle(false)}>Save</Button>
              <Button half variant="ghost" onClick={() => setEditingCycle(false)}>Cancel</Button>
            </div>
          </div>
        ) : (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'var(--surface)', borderRadius: 'var(--radius)',
            padding: '14px 16px', border: '1px solid rgba(255, 255, 255, 0.06)',
          }}>
            <p style={{ fontWeight: 600 }}>{cycle}</p>
            <button
              onClick={() => setEditingCycle(true)}
              style={{
                background: 'transparent', border: 'none',
                color: 'var(--coral)', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }}
            >
              Change
            </button>
          </div>
        )}
      </div>

      {/* Section: Members */}
      <div style={{ marginTop: 24 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--taupe)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 }}>
          Members ({members.length})
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {members.map(m => (
            <div
              key={m.name}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 14px', background: 'var(--surface)',
                borderRadius: 'var(--radius)', border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'var(--surface2)', border: `2px solid ${m.isYou ? 'var(--coral)' : '#333'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 600,
                color: m.isYou ? 'var(--coral)' : 'var(--text-muted)',
                flexShrink: 0,
              }}>
                {m.initial}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 600 }}>
                  {m.name}{m.isYou && <span style={{ color: 'var(--taupe)', fontWeight: 400 }}> (You)</span>}
                </p>
                <p style={{ fontSize: 12, color: 'var(--taupe)', marginTop: 2 }}>{m.isCreator ? 'Creator' : 'Member'}</p>
              </div>
              {!m.isCreator && !m.isYou && (
                <button
                  onClick={() => setRemoveTarget(m.name)}
                  style={{
                    background: 'var(--color-error-bg)', border: '1px solid var(--color-error-border)',
                    borderRadius: 6, padding: '5px 12px',
                    color: 'var(--error)', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  }}
                >
                  Remove
                </button>
              )}
              {m.isCreator && (
                <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>can't remove</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Section: Invite */}
      <div style={{ marginTop: 24 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--taupe)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 }}>
          Invite friends
        </p>
        <Button variant="ghost" onClick={() => navigate('/invite-friends')}>
          + Invite friends
        </Button>
      </div>

      {/* Section: Leave group */}
      <div style={{ marginTop: 24 }}>
        <div style={{ height: 1, background: '#1e1e1e', marginBottom: 16 }} />
        <button
          onClick={() => setLeaveModal(true)}
          style={{
            width: '100%', height: 48, borderRadius: 'var(--radius)',
            background: 'var(--color-error-bg)', border: '1px solid var(--color-error-border)',
            color: 'var(--error)', fontSize: 16, fontWeight: 600, cursor: 'pointer',
          }}
        >
          Leave group
        </button>
      </div>
    </Screen>
  )
}
