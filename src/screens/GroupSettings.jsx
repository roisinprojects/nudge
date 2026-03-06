import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import BackButton from '../components/BackButton'

const GROUP_COLOURS = [
  { name: 'Sage',     token: 'var(--group-sage)'     },
  { name: 'Lavender', token: 'var(--group-lavender)'  },
  { name: 'Peach',    token: 'var(--group-peach)'     },
  { name: 'Sky',      token: 'var(--group-sky)'       },
  { name: 'Butter',   token: 'var(--group-butter)'    },
  { name: 'Rose',     token: 'var(--group-rose)'      },
  { name: 'Slate',    token: 'var(--group-slate)'     },
  { name: 'Marigold', token: 'var(--group-marigold)'  },
]

const FREQUENCY_OPTIONS = ['Every 4 weeks', 'Every 6 weeks', 'Every 8 weeks']

const INITIAL_MEMBERS = [
  { name: 'Alex',   initial: 'A', isCreator: true,  isYou: false },
  { name: 'Jordan', initial: 'J', isCreator: false, isYou: false },
  { name: 'Priya',  initial: 'P', isCreator: false, isYou: false },
  { name: 'Róisín', initial: 'R', isCreator: false, isYou: true  },
]

// ── Bottom sheet wrapper ──────────────────────────────────────────────────────
function BottomSheet({ onClose, children }) {
  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0, 0, 0, 0.60)',
          zIndex: 100,
        }}
      />
      <div
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'var(--bg-card)',
          borderRadius: '12px 12px 0 0',
          padding: '20px 24px 40px',
          zIndex: 101,
        }}
      >
        <div style={{
          width: 32, height: 4, borderRadius: 2,
          background: 'var(--border-strong)',
          margin: '0 auto 20px',
        }} />
        {children}
      </div>
    </>
  )
}

// ── Section label ─────────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <p style={{
      fontSize: 12, fontWeight: 700,
      color: 'var(--ink-muted)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      marginBottom: 8,
    }}>
      {children}
    </p>
  )
}

// ── Settings row ─────────────────────────────────────────────────────────────
function SettingsRow({ label, value, colourDot, onTap, isLast }) {
  return (
    <div
      onClick={onTap}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 0',
        borderBottom: isLast ? 'none' : '1px solid var(--border-default)',
        cursor: 'pointer',
      }}
    >
      <span style={{ fontSize: 15, color: 'var(--ink-primary)' }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {colourDot && (
          <div style={{
            width: 16, height: 16, borderRadius: '50%',
            background: colourDot, flexShrink: 0,
          }} />
        )}
        {value && (
          <span style={{ fontSize: 14, color: 'var(--ink-muted)' }}>{value}</span>
        )}
        <span style={{ fontSize: 16, color: 'var(--ink-faint)', lineHeight: 1 }}>›</span>
      </div>
    </div>
  )
}

// ── Screen ────────────────────────────────────────────────────────────────────
export default function GroupSettings() {
  const navigate = useNavigate()

  const [groupName, setGroupName] = useState('Weekend Warriors')
  const [colour, setColour]       = useState('var(--group-lavender)')
  const [frequency, setFrequency] = useState('Every 6 weeks')
  const [members, setMembers]     = useState(INITIAL_MEMBERS)

  // sheet: null | 'name' | 'colour' | 'frequency' | 'remove' | 'leave'
  const [sheet, setSheet]               = useState(null)
  const [removeTarget, setRemoveTarget] = useState(null)

  // Temp state for in-sheet edits (avoids mutating live state before Save)
  const [nameInput, setNameInput]   = useState(groupName)
  const [tempColour, setTempColour] = useState(colour)
  const [tempFreq, setTempFreq]     = useState(frequency)

  const openSheet = (type) => {
    if (type === 'name')      setNameInput(groupName)
    if (type === 'colour')    setTempColour(colour)
    if (type === 'frequency') setTempFreq(frequency)
    setSheet(type)
  }

  const closeSheet = () => { setSheet(null); setRemoveTarget(null) }

  const saveName      = () => { if (nameInput.trim()) setGroupName(nameInput.trim()); closeSheet() }
  const saveColour    = () => { setColour(tempColour); closeSheet() }
  const saveFrequency = () => { setFrequency(tempFreq); closeSheet() }

  const openRemove = (name) => { setRemoveTarget(name); setSheet('remove') }
  const confirmRemove = () => {
    setMembers(prev => prev.filter(m => m.name !== removeTarget))
    closeSheet()
  }

  return (
    <Screen style={{ paddingBottom: 40 }}>

      {/* Top nav */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 16,
        marginBottom: 28,
      }}>
        <BackButton to="/group-detail" />
        <span style={{
          fontSize: 15, fontWeight: 600,
          color: 'var(--ink-secondary)',
          letterSpacing: '-0.01em',
          flex: 1, textAlign: 'center',
        }}>
          {groupName}
        </span>
        <div style={{ width: 44, flexShrink: 0 }} />
      </div>

      {/* ── Section: Group ── */}
      <SectionLabel>Group</SectionLabel>
      <div className="card" style={{ padding: '0 16px', marginBottom: 24 }}>
        <SettingsRow
          label="Group name"
          value={groupName}
          onTap={() => openSheet('name')}
        />
        <SettingsRow
          label="Colour"
          colourDot={colour}
          onTap={() => openSheet('colour')}
        />
        <SettingsRow
          label="Nudge frequency"
          value={frequency}
          onTap={() => openSheet('frequency')}
          isLast
        />
      </div>

      {/* ── Section: Members ── */}
      <SectionLabel>Members</SectionLabel>
      <div className="card" style={{ padding: '0 16px', marginBottom: 12 }}>
        {members.map((m, i) => (
          <div
            key={m.name}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 0',
              borderBottom: i < members.length - 1 ? '1px solid var(--border-default)' : 'none',
            }}
          >
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'var(--ink-primary)', color: 'var(--bg-primary)',
              fontSize: 12, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              {m.initial}
            </div>
            <p style={{ flex: 1, fontSize: 15, color: 'var(--ink-primary)' }}>
              {m.name}
              {m.isYou && (
                <span style={{ color: 'var(--ink-muted)', fontWeight: 400 }}> (You)</span>
              )}
              {m.isCreator && (
                <span style={{ color: 'var(--ink-muted)', fontWeight: 400 }}> · Creator</span>
              )}
            </p>
            {!m.isCreator && !m.isYou && (
              <button
                onClick={() => openRemove(m.name)}
                style={{
                  background: 'none', border: 'none', padding: 0,
                  fontSize: 12, fontWeight: 600,
                  color: 'var(--semantic-error)',
                  cursor: 'pointer', lineHeight: 1,
                }}
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
      <Button variant="secondary" onClick={() => navigate('/invite-friends')}>
        + Invite someone
      </Button>

      {/* ── Section: Danger zone ── */}
      <div style={{ marginTop: 32 }}>
        <SectionLabel>Danger zone</SectionLabel>
        <div className="card" style={{ padding: '4px 16px' }}>
          <Button variant="destructive" onClick={() => openSheet('leave')}>
            Leave group
          </Button>
        </div>
      </div>

      {/* ── Bottom sheets ── */}

      {/* Edit name */}
      {sheet === 'name' && (
        <BottomSheet onClose={closeSheet}>
          <h2 style={{ marginBottom: 16 }}>Group name</h2>
          <input
            className="input"
            value={nameInput}
            onChange={e => setNameInput(e.target.value)}
            autoFocus
          />
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <Button half onClick={saveName}>Save</Button>
            <Button half variant="ghost" onClick={closeSheet}>Cancel</Button>
          </div>
        </BottomSheet>
      )}

      {/* Colour picker */}
      {sheet === 'colour' && (
        <BottomSheet onClose={closeSheet}>
          <h2 style={{ marginBottom: 16 }}>Group colour</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
            {GROUP_COLOURS.map(c => (
              <button
                key={c.token}
                onClick={() => setTempColour(c.token)}
                title={c.name}
                style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: c.token,
                  border: `2.5px solid ${tempColour === c.token ? 'var(--ink-primary)' : 'transparent'}`,
                  cursor: 'pointer',
                  outline: 'none',
                  boxShadow: tempColour === c.token ? 'var(--shadow-sm)' : 'none',
                  transition: 'border-color 100ms, box-shadow 100ms',
                }}
              />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Button half onClick={saveColour}>Save</Button>
            <Button half variant="ghost" onClick={closeSheet}>Cancel</Button>
          </div>
        </BottomSheet>
      )}

      {/* Frequency picker */}
      {sheet === 'frequency' && (
        <BottomSheet onClose={closeSheet}>
          <h2 style={{ marginBottom: 16 }}>Nudge frequency</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            {FREQUENCY_OPTIONS.map(opt => (
              <div
                key={opt}
                onClick={() => setTempFreq(opt)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '13px 16px',
                  borderRadius: 'var(--radius-lg)',
                  border: `1px solid ${tempFreq === opt ? 'var(--ink-primary)' : 'var(--border-default)'}`,
                  background: tempFreq === opt ? 'var(--bg-ui)' : 'var(--bg-card)',
                  cursor: 'pointer',
                  transition: 'all 100ms',
                }}
              >
                <div style={{
                  width: 18, height: 18, borderRadius: '50%',
                  border: `2px solid ${tempFreq === opt ? 'var(--ink-primary)' : 'var(--border-strong)'}`,
                  background: tempFreq === opt ? 'var(--ink-primary)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {tempFreq === opt && (
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--btn-primary-fg)' }} />
                  )}
                </div>
                <p style={{
                  fontSize: 14, fontWeight: 600,
                  color: tempFreq === opt ? 'var(--ink-primary)' : 'var(--ink-secondary)',
                }}>
                  {opt}
                </p>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Button half onClick={saveFrequency}>Save</Button>
            <Button half variant="ghost" onClick={closeSheet}>Cancel</Button>
          </div>
        </BottomSheet>
      )}

      {/* Remove member confirmation */}
      {sheet === 'remove' && removeTarget && (
        <BottomSheet onClose={closeSheet}>
          <h2 style={{ marginBottom: 8 }}>Remove {removeTarget} from {groupName}?</h2>
          <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 20 }}>
            They'll lose access to this group.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Button variant="destructive" onClick={confirmRemove}>Yes, remove</Button>
            <Button variant="ghost" onClick={closeSheet}>Cancel</Button>
          </div>
        </BottomSheet>
      )}

      {/* Leave group confirmation */}
      {sheet === 'leave' && (
        <BottomSheet onClose={closeSheet}>
          <h2 style={{ marginBottom: 8 }}>Leave {groupName}?</h2>
          <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 20 }}>
            You'll lose access to this group and its history.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Button variant="destructive" onClick={() => navigate('/home')}>Yes, leave</Button>
            <Button variant="ghost" onClick={closeSheet}>Cancel</Button>
          </div>
        </BottomSheet>
      )}

    </Screen>
  )
}
