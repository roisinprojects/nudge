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

// ── Shared bottom-sheet overlay ───────────────────────────────────────────────
function BottomSheet({ title, body, confirmLabel, onConfirm, onCancel }) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onCancel}
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0, 0, 0, 0.65)',
          zIndex: 100,
        }}
      />
      {/* Sheet */}
      <div
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'var(--color-bg-elevated)',
          borderRadius: '12px 12px 0 0',
          padding: '20px 24px 40px',
          zIndex: 101,
        }}
      >
        {/* Drag handle */}
        <div style={{
          width: 32, height: 4, borderRadius: 2,
          background: 'rgba(255, 255, 255, 0.15)',
          margin: '0 auto 20px',
        }} />
        <h2 style={{ fontSize: 19 }}>{title}</h2>
        <p className="text-muted" style={{ fontSize: 14, marginTop: 8, lineHeight: 1.6 }}>{body}</p>
        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            onClick={onConfirm}
            style={{
              height: 48, width: '100%', borderRadius: 8, border: 'none',
              background: 'var(--color-error-solid)', color: '#fff',
              fontSize: 16, fontWeight: 600, cursor: 'pointer',
            }}
          >
            {confirmLabel}
          </button>
          <button
            onClick={onCancel}
            style={{
              height: 48, width: '100%', borderRadius: 8, border: 'none',
              background: 'transparent', color: 'var(--color-text-secondary)',
              fontSize: 16, fontWeight: 600, cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  )
}

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
                    background: 'transparent',
                    border: '1px solid var(--color-error-border)',
                    borderRadius: 6, padding: '5px 12px',
                    color: 'var(--color-error-text)', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    minHeight: 32,
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
            background: 'transparent',
            border: '1px solid var(--color-error-border)',
            color: 'var(--color-error-text)', fontSize: 16, fontWeight: 600, cursor: 'pointer',
          }}
        >
          Leave group
        </button>
      </div>

      {/* Remove confirmation sheet */}
      {removeTarget && (
        <BottomSheet
          title={`Remove ${removeTarget} from group?`}
          body="They'll lose access to this group and its history."
          confirmLabel={`Yes, remove`}
          onConfirm={() => confirmRemove(removeTarget)}
          onCancel={() => setRemoveTarget(null)}
        />
      )}

      {/* Leave group confirmation sheet */}
      {leaveModal && (
        <BottomSheet
          title={`Leave ${groupName}?`}
          body="You won't receive future nudges for this group. The group continues without you."
          confirmLabel="Yes, leave"
          onConfirm={() => navigate('/home')}
          onCancel={() => setLeaveModal(false)}
        />
      )}
    </Screen>
  )
}
