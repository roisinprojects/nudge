import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import Icon from '../components/Icon'

export default function Profile() {
  const navigate = useNavigate()

  // Name
  const [firstName, setFirstName]       = useState('Róisín')
  const [lastName,  setLastName]        = useState('Benson')
  const [editingName, setEditingName]   = useState(false)
  const [firstInput,  setFirstInput]    = useState('Róisín')
  const [lastInput,   setLastInput]     = useState('Benson')

  // Password
  const [editingPw, setEditingPw]       = useState(false)
  const [currentPw, setCurrentPw]       = useState('')
  const [newPw,     setNewPw]           = useState('')
  const [confirmPw, setConfirmPw]       = useState('')
  const [pwSaved,   setPwSaved]         = useState(false)
  const [pwError,   setPwError]         = useState('')

  // Notifications
  const [pushOn,     setPushOn]         = useState(true)
  const [emailOn,    setEmailOn]        = useState(true)
  const [reminderOn, setReminderOn]     = useState(false)

  // Delete account
  const [deleteModal, setDeleteModal]   = useState(false)
  const [deleted,     setDeleted]       = useState(false)

  const saveName = () => {
    if (firstInput.trim()) setFirstName(firstInput.trim())
    if (lastInput.trim())  setLastName(lastInput.trim())
    setEditingName(false)
  }

  const savePassword = () => {
    setPwError('')
    if (!currentPw) { setPwError('Enter your current password.'); return }
    if (newPw.length < 8) { setPwError('New password must be at least 8 characters.'); return }
    if (newPw !== confirmPw) { setPwError('Passwords don\'t match.'); return }
    setPwSaved(true)
    setEditingPw(false)
    setCurrentPw(''); setNewPw(''); setConfirmPw('')
    setTimeout(() => setPwSaved(false), 3000)
  }

  // ── Deleted confirmation ───────────────────────────────────────────────────
  if (deleted) {
    return (
      <Screen style={{ paddingBottom: 40 }}>
        <div style={{ paddingTop: 56 }} />
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 16, paddingBottom: 60,
        }}>
          <Icon name="waving_hand" size={48} style={{ color: 'var(--ink-muted)' }} />
          <div>
            <h2>Account deleted</h2>
            <p className="text-muted mt-8" style={{ maxWidth: 280, margin: '8px auto 0' }}>
              Your data has been permanently removed. We hope to see you again someday.
            </p>
          </div>
          <Button onClick={() => navigate('/signup')}>Back to sign up</Button>
        </div>
      </Screen>
    )
  }

  // ── Delete confirmation modal ──────────────────────────────────────────────
  if (deleteModal) {
    return (
      <Screen style={{ paddingBottom: 40 }}>
        <div style={{ paddingTop: 56 }}>
          <BackButton onClick={() => setDeleteModal(false)} />
        </div>
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 20, paddingBottom: 60,
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'var(--semantic-error-bg)', border: '1px solid var(--semantic-error-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="warning" size={36} style={{ color: 'var(--semantic-error)' }} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <h2>Delete your account?</h2>
            <p className="text-muted mt-8" style={{ maxWidth: 280, margin: '8px auto 0' }}>
              Are you sure? This cannot be undone.
            </p>
          </div>
          <div style={{ width: '100%', textAlign: 'left' }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-secondary)', marginBottom: 8 }}>
              When you delete your account:
            </p>
            {[
              "You'll be removed from all groups",
              "Your data will be permanently deleted",
              "You won't be able to recover it",
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
                <Icon name="close" size={16} style={{ color: 'var(--semantic-error)', flexShrink: 0 }} />
                <p style={{ fontSize: 14, color: 'var(--ink-secondary)' }}>{item}</p>
              </div>
            ))}
          </div>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Button variant="destructive" onClick={() => setDeleted(true)}>
              Yes, delete account
            </Button>
            <Button variant="ghost" onClick={() => setDeleteModal(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Screen>
    )
  }

  // ── Main profile screen ────────────────────────────────────────────────────
  return (
    <Screen style={{ paddingBottom: 40 }}>
      <div style={{ paddingTop: 56 }}>
        <BackButton to="/home" />
      </div>

      <div style={{ marginTop: 20 }}>
        <h1>Your profile</h1>
      </div>

      {/* Section: Photo */}
      <div style={{ marginTop: 24 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 }}>
          Profile photo
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'var(--surface2)', border: '2px solid var(--coral)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, fontWeight: 700, color: 'var(--coral)',
            flexShrink: 0,
          }}>
            R
          </div>
          <label style={{ cursor: 'pointer' }}>
            <input type="file" accept="image/*" style={{ display: 'none' }} />
            <span style={{
              display: 'inline-block', padding: '8px 16px',
              background: 'transparent', border: '1px solid var(--coral)',
              borderRadius: 'var(--radius-lg)', color: 'var(--coral)',
              fontSize: 14, fontWeight: 600,
            }}>
              Upload photo
            </span>
          </label>
        </div>
      </div>

      <div className="divider" />

      {/* Section: Name */}
      <div>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 }}>
          Display name
        </p>
        {editingName ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label className="input-label">First name</label>
              <input className="input" value={firstInput} onChange={e => setFirstInput(e.target.value)} autoFocus />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label className="input-label">Last name</label>
              <input className="input" value={lastInput} onChange={e => setLastInput(e.target.value)} />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Button half onClick={saveName}>Save</Button>
              <Button half variant="ghost" onClick={() => { setFirstInput(firstName); setLastInput(lastName); setEditingName(false) }}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)',
            padding: '14px 16px', border: '1px solid var(--border-default)',
          }}>
            <p style={{ fontWeight: 600 }}>{firstName} {lastName}</p>
            <button
              onClick={() => setEditingName(true)}
              style={{ background: 'transparent', border: 'none', color: 'var(--coral)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
            >
              Edit
            </button>
          </div>
        )}
      </div>

      <div className="divider" />

      {/* Section: Email */}
      <div>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 }}>
          Email
        </p>
        <div style={{
          background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)',
          padding: '14px 16px', border: '1px solid var(--border-default)',
        }}>
          <p style={{ fontWeight: 600, color: 'var(--ink-secondary)' }}>róisín@example.com</p>
        </div>
        <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 8, lineHeight: 1.6 }}>
          Your email is used for notifications and account recovery. To change your email, contact support.
        </p>
      </div>

      <div className="divider" />

      {/* Section: Password */}
      <div>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 }}>
          Password
        </p>
        {pwSaved && (
          <div className="alert alert-success" style={{ marginBottom: 12 }}>
            <Icon name="check_circle" size={16} style={{ color: 'var(--semantic-success)', flexShrink: 0 }} />
            <p style={{ fontSize: 13 }}>Password updated successfully.</p>
          </div>
        )}
        {editingPw ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {pwError && (
              <div className="alert alert-error">
                <Icon name="warning" size={16} style={{ color: 'var(--semantic-error)', flexShrink: 0 }} />
                <p style={{ fontSize: 13 }}>{pwError}</p>
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label className="input-label">Current password</label>
              <input className="input" type="password" value={currentPw} onChange={e => setCurrentPw(e.target.value)} autoFocus />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label className="input-label">New password</label>
              <input className="input" type="password" value={newPw} onChange={e => setNewPw(e.target.value)} />
              <p style={{ fontSize: 12, color: newPw.length >= 8 ? 'var(--semantic-success)' : 'var(--ink-muted)' }}>
                At least 8 characters {newPw.length >= 8 ? '✓' : ''}
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label className="input-label">Confirm new password</label>
              <input className="input" type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Button half onClick={savePassword}>Save</Button>
              <Button half variant="ghost" onClick={() => { setEditingPw(false); setPwError(''); setCurrentPw(''); setNewPw(''); setConfirmPw('') }}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setEditingPw(true)}
            style={{
              width: '100%', height: 48, borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-card)', border: '1px solid var(--border-default)',
              color: 'var(--coral)', fontSize: 14, fontWeight: 600, cursor: 'pointer',
              textAlign: 'left', paddingLeft: 16,
            }}
          >
            Change password
          </button>
        )}
      </div>

      <div className="divider" />

      {/* Section: Notifications */}
      <div>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 }}>
          Notifications
        </p>
        <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 14 }}>Control how we reach you</p>

        {[
          {
            label: 'Push notifications',
            desc: 'Nudge reminders, match found, cancellations',
            value: pushOn,
            set: setPushOn,
          },
          {
            label: 'Email reminders',
            desc: 'Nudge reminder, match found',
            value: emailOn,
            set: setEmailOn,
          },
          {
            label: 'Response reminder',
            desc: 'Alert 2 hours before 48hr deadline closes',
            value: reminderOn,
            set: setReminderOn,
          },
        ].map(n => (
          <div
            key={n.label}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 16px', background: 'var(--bg-card)',
              borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-default)',
              marginBottom: 8,
            }}
          >
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 600 }}>{n.label}</p>
              <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 3 }}>{n.desc}</p>
            </div>
            {/* Toggle */}
            <div
              onClick={() => n.set(v => !v)}
              style={{
                width: 46, height: 26, borderRadius: 13,
                background: n.value ? 'var(--ink-primary)' : 'var(--border-strong)',
                position: 'relative', cursor: 'pointer',
                transition: 'background 0.2s', flexShrink: 0,
              }}
            >
              <div style={{
                position: 'absolute', top: 3,
                left: n.value ? 22 : 3,
                width: 20, height: 20, borderRadius: '50%',
                background: '#fff', transition: 'left 0.2s',
              }} />
            </div>
          </div>
        ))}
      </div>

      <div className="divider" />

      {/* Section: Delete account */}
      <div>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--semantic-error)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 }}>
          Danger zone
        </p>
        <Button variant="destructive" onClick={() => setDeleteModal(true)}>
          Delete account
        </Button>
      </div>
    </Screen>
  )
}
