import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import Input from '../components/Input'
import Icon from '../components/Icon'

// ─────────────────────────────────────────────
// Static data
// ─────────────────────────────────────────────

const SUGGESTIONS = ['The Crew', 'Friday Fam', 'The Usual Suspects', 'Weekend Warriors']

const COLOURS = [
  'var(--group-sage)',
  'var(--group-lavender)',
  'var(--group-peach)',
  'var(--group-sky)',
  'var(--group-butter)',
  'var(--group-rose)',
  'var(--group-slate)',
  'var(--group-marigold)',
]

const CADENCE_OPTIONS = [
  { id: 'one-off', label: 'One-off',       desc: 'Just this once, no repeats',             dashed: true },
  { id: '2w',      label: 'Every 2 weeks', desc: 'For groups with good availability' },
  { id: 'monthly', label: 'Monthly',       desc: 'A reliable monthly catch-up' },
  { id: '6w',      label: 'Every 6 weeks', desc: 'Busy but consistent',                    suggested: true },
  { id: '8w',      label: 'Every 8 weeks', desc: 'Hard to coordinate, but it happens' },
]

const MY_EMAIL = 'you@example.com'

// ─────────────────────────────────────────────
// Shared layout pieces
// ─────────────────────────────────────────────

function FlowProgress({ step }) {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {[1, 2, 3, 4].map(s => {
        const bg      = s <= step ? 'var(--ink-primary)' : 'var(--border-default)'
        const opacity = s < step ? 0.35 : 1
        return <div key={s} style={{ flex: 1, height: 3, borderRadius: 2, background: bg, opacity }} />
      })}
    </div>
  )
}

function FlowHeader({ onBack, onClose }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 24 }}>
      <button className="back-btn" onClick={onBack} aria-label="Go back">
        <span className="material-icons" style={{ fontSize: 24, lineHeight: 1 }}>chevron_left</span>
      </button>
      <button
        onClick={onClose}
        aria-label="Close"
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-secondary)', display: 'flex', alignItems: 'center', padding: 4 }}
      >
        <span className="material-icons" style={{ fontSize: 22, lineHeight: 1 }}>close</span>
      </button>
    </div>
  )
}

function Footer({ children }) {
  return (
    <div style={{
      position: 'sticky', bottom: 0,
      background: 'var(--bg-primary)',
      padding: '16px 16px 32px',
      margin: '0 -16px',
      borderTop: '1px solid var(--border-default)',
      marginTop: 16,
    }}>
      {children}
    </div>
  )
}

// ─────────────────────────────────────────────
// Step 1 — Name
// ─────────────────────────────────────────────

function StepName({ value, onChange, onContinue, onBack, onClose }) {
  return (
    <>
      <FlowHeader onBack={onBack} onClose={onClose} />
      <div style={{ marginTop: 24 }}><FlowProgress step={1} /></div>

      <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <h1>Name your group</h1>
          <p className="text-muted mt-8">You can always change this later.</p>
        </div>

        <Input
          label="Group name"
          placeholder="e.g. The Crew"
          value={value}
          onChange={onChange}
        />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {SUGGESTIONS.map(s => (
            <span
              key={s}
              className={`chip ${value === s ? 'chip-selected' : 'chip-outline'}`}
              onClick={() => onChange({ target: { value: s } })}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <Footer>
        <Button disabled={!value.trim()} onClick={onContinue}>Continue</Button>
      </Footer>
    </>
  )
}

// ─────────────────────────────────────────────
// Step 2 — Colour
// ─────────────────────────────────────────────

function StepColour({ selected, onSelect, onContinue, onBack, onClose }) {
  return (
    <>
      <FlowHeader onBack={onBack} onClose={onClose} />
      <div style={{ marginTop: 24 }}><FlowProgress step={2} /></div>

      <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <h1>Pick a colour</h1>
          <p className="text-muted mt-8">This helps you tell groups apart at a glance.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {COLOURS.map(token => (
            <div
              key={token}
              onClick={() => onSelect(token)}
              style={{
                background: token,
                borderRadius: 14,
                aspectRatio: '1 / 1',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                outline: selected === token ? '2.5px solid var(--ink-primary)' : 'none',
                outlineOffset: 2,
              }}
            >
              {selected === token && (
                <span style={{ color: '#fff', fontSize: 18, fontWeight: 700, lineHeight: 1, textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>✓</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer>
        <Button disabled={!selected} onClick={onContinue}>Continue</Button>
      </Footer>
    </>
  )
}

// ─────────────────────────────────────────────
// Step 3 — Cadence
// ─────────────────────────────────────────────

function StepCadence({ selected, onSelect, onContinue, onBack, onClose }) {
  return (
    <>
      <FlowHeader onBack={onBack} onClose={onClose} />
      <div style={{ marginTop: 24 }}><FlowProgress step={3} /></div>

      <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <h1>How often do you want to meet?</h1>
          <p className="text-muted mt-8">Nudge will kick off a new planning cycle on this schedule.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {CADENCE_OPTIONS.map(opt => {
            const isSelected = selected === opt.id
            return (
              <div
                key={opt.id}
                onClick={() => onSelect(opt.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-lg)',
                  border: `1.5px ${opt.dashed ? 'dashed' : 'solid'} ${isSelected ? 'var(--ink-primary)' : 'var(--border-strong)'}`,
                  background: isSelected ? 'var(--bg-ui)' : 'transparent',
                  cursor: 'pointer',
                  transition: 'border-color 100ms, background 100ms',
                  gap: 12,
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink-primary)' }}>{opt.label}</p>
                  <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 2 }}>{opt.desc}</p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  {opt.suggested && (
                    <span style={{
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: 'var(--ink-muted)',
                      background: 'var(--bg-ui)',
                      padding: '2px 8px',
                      borderRadius: 20,
                      border: '1px solid var(--border-default)',
                    }}>
                      Suggested
                    </span>
                  )}
                  {/* Radio */}
                  <div style={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    border: `2px solid ${isSelected ? 'var(--ink-primary)' : 'var(--border-strong)'}`,
                    background: isSelected ? 'var(--ink-primary)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {isSelected && (
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--bg-primary)' }} />
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <Footer>
        <Button onClick={onContinue}>Continue</Button>
      </Footer>
    </>
  )
}

// ─────────────────────────────────────────────
// Step 4 — Invite
// ─────────────────────────────────────────────

function StepInvite({ groupId, email, setEmail, invited, setInvited, onComplete, onBack, onClose }) {
  const [activeTab, setActiveTab] = useState('link')
  const [inputError, setInputError] = useState('')

  const inviteLink = `nudgehangouts.app/join/${groupId}`

  const addEmail = () => {
    const trimmed = email.trim().toLowerCase()
    if (!trimmed) return
    if (trimmed === MY_EMAIL.toLowerCase()) {
      setInputError("You can't invite yourself")
      return
    }
    if (invited.map(e => e.toLowerCase()).includes(trimmed)) {
      setInputError('This email has already been added')
      return
    }
    setInvited(prev => [...prev, email.trim()])
    setEmail('')
    setInputError('')
  }

  return (
    <>
      <FlowHeader onBack={onBack} onClose={onClose} />
      <div style={{ marginTop: 24 }}><FlowProgress step={4} /></div>

      <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <h1>Invite your people</h1>
          <p className="text-muted mt-8">You can add more friends after you're set up too.</p>
        </div>

        {/* Tab switcher */}
        <div style={{ display: 'flex', gap: 4, background: 'var(--bg-ui)', borderRadius: 'var(--radius-lg)', padding: 4 }}>
          {[{ id: 'link', label: 'By link' }, { id: 'email', label: 'By email' }].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                height: 36,
                border: 'none',
                borderRadius: 'calc(var(--radius-lg) - 2px)',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 600,
                background: activeTab === tab.id ? 'var(--bg-card)' : 'transparent',
                color: activeTab === tab.id ? 'var(--ink-primary)' : 'var(--ink-muted)',
                boxShadow: activeTab === tab.id ? 'var(--shadow-xs)' : 'none',
                transition: 'background 100ms, color 100ms',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* By link */}
        {activeTab === 'link' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ background: 'var(--bg-ui)', borderRadius: 14, padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
                Your invite link
              </p>
              <p style={{ fontSize: 13, color: 'var(--ink-muted)', wordBreak: 'break-all' }}>
                {inviteLink}
              </p>
              <Button onClick={() => navigator.clipboard?.writeText(inviteLink)}>
                Copy link
              </Button>
            </div>
            <p style={{ fontSize: 12, color: 'var(--ink-muted)', textAlign: 'center', lineHeight: 1.5 }}>
              Share this in your group chat. Anyone with the link can join.
            </p>
          </div>
        )}

        {/* By email */}
        {activeTab === 'email' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ flex: 1 }}>
                <Input
                  type="email"
                  placeholder="friend@example.com"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setInputError('') }}
                  onKeyDown={e => e.key === 'Enter' && addEmail()}
                />
              </div>
              <button
                onClick={addEmail}
                style={{
                  height: 48, width: 48, flexShrink: 0,
                  background: 'var(--ink-primary)', border: 'none',
                  borderRadius: 'var(--radius-lg)', color: 'var(--btn-primary-fg)',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
                aria-label="Add email"
              >
                <Icon name="add" size={22} />
              </button>
            </div>
            {inputError && (
              <p className="text-xs" style={{ color: 'var(--semantic-error)' }}>{inputError}</p>
            )}
            {invited.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <p className="text-sm text-muted">Invited ({invited.length})</p>
                {invited.map(e => (
                  <div
                    key={e}
                    className="card"
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px' }}
                  >
                    <span className="text-sm">{e}</span>
                    <button
                      onClick={() => setInvited(prev => prev.filter(x => x !== e))}
                      style={{ background: 'none', border: 'none', color: 'var(--ink-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                      aria-label={`Remove ${e}`}
                    >
                      <Icon name="close" size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <Footer>
        <Button onClick={onComplete}>Create group</Button>
      </Footer>
    </>
  )
}

// ─────────────────────────────────────────────
// Root component
// ─────────────────────────────────────────────

export default function CreateGroup() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)

  // Form state — lifted here so steps share it
  const [name,    setName]    = useState('')
  const [colour,  setColour]  = useState(null)
  const [cadence, setCadence] = useState('6w')   // "Every 6 weeks" pre-selected
  const [email,   setEmail]   = useState('')
  const [invited, setInvited] = useState([])

  // Stable mock ID for the invite link
  const groupId = `grp_${Date.now()}`

  const close = () => navigate('/home')
  const back  = () => step === 1 ? navigate(-1) : setStep(s => s - 1)
  const next  = () => setStep(s => s + 1)

  const finish = () => {
    const newGroup = {
      id:             Date.now(),
      name,
      colour,
      members:        [],
      status:         'idle',
      daysUntilNudge: 42,
    }
    navigate('/home', { state: { newGroup } })
  }

  return (
    <Screen style={{ paddingBottom: 40 }}>
      {step === 1 && (
        <StepName
          value={name}
          onChange={e => setName(e.target.value)}
          onContinue={next}
          onBack={back}
          onClose={close}
        />
      )}
      {step === 2 && (
        <StepColour
          selected={colour}
          onSelect={setColour}
          onContinue={next}
          onBack={back}
          onClose={close}
        />
      )}
      {step === 3 && (
        <StepCadence
          selected={cadence}
          onSelect={setCadence}
          onContinue={next}
          onBack={back}
          onClose={close}
        />
      )}
      {step === 4 && (
        <StepInvite
          groupId={groupId}
          email={email}
          setEmail={setEmail}
          invited={invited}
          setInvited={setInvited}
          onComplete={finish}
          onBack={back}
          onClose={close}
        />
      )}
    </Screen>
  )
}
