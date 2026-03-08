import { useParams, useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'

// ── Mock invite data ─────────────────────────────────────────────────────────
// In production these would come from the API keyed by groupId.
// Use /join/grp-demo to see the populated state.
// Use /join/grp-joined to see the "already a member" state.
// Any other ID renders the invalid-link error.

const MOCK_INVITES = {
  'grp-demo': {
    name:    'The Crew',
    colour:  'var(--group-sky)',
    inviter: 'Sarah',
    members: ['Sarah', 'Tom', 'Jess', 'Mike'],
  },
  'grp-joined': {
    name:       'Friday Fam',
    colour:     'var(--group-peach)',
    inviter:    'Anna',
    members:    ['Anna', 'Dev', 'Kezia'],
    alreadyIn:  true,
  },
}

// ── Member avatar strip ──────────────────────────────────────────────────────

function MemberAvatars({ members }) {
  const visible = members.slice(0, 3)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex' }}>
        {visible.map((name, i) => (
          <div
            key={i}
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'var(--ink-primary)',
              color: 'var(--bg-primary)',
              fontSize: 12,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid var(--bg-primary)',
              marginLeft: i === 0 ? 0 : -8,
              flexShrink: 0,
            }}
          >
            {name[0].toUpperCase()}
          </div>
        ))}
      </div>
      <p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>
        <span style={{ fontWeight: 600, color: 'var(--ink-primary)' }}>{members.length}</span>
        {' '}members already in this group
      </p>
    </div>
  )
}

// ── Error states ─────────────────────────────────────────────────────────────

function InvalidLink() {
  return (
    <div className="card" style={{ padding: '20px 16px', textAlign: 'center' }}>
      <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink-primary)', marginBottom: 6 }}>
        Link unavailable
      </p>
      <p style={{ fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.5 }}>
        This invite link is invalid or has expired.
      </p>
    </div>
  )
}

function AlreadyMember({ navigate }) {
  return (
    <>
      <div className="card" style={{ padding: '20px 16px', textAlign: 'center', marginBottom: 24 }}>
        <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink-primary)', marginBottom: 6 }}>
          You're already in this group.
        </p>
        <p style={{ fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.5 }}>
          Head back to Home to see your group.
        </p>
      </div>
      <Button onClick={() => navigate('/home')}>Go to Home</Button>
    </>
  )
}

// ── Main screen ──────────────────────────────────────────────────────────────

export default function JoinGroup() {
  const { groupId } = useParams()
  const navigate    = useNavigate()
  const invite      = MOCK_INVITES[groupId] ?? null

  return (
    <Screen style={{ paddingBottom: 48 }}>

      {/* Header — wordmark only */}
      <div style={{ paddingTop: 24 }}>
        <span className="logo">nudge</span>
      </div>

      <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* ── Error: invalid link ── */}
        {!invite && <InvalidLink />}

        {/* ── Error: already a member ── */}
        {invite?.alreadyIn && <AlreadyMember navigate={navigate} />}

        {/* ── Happy path ── */}
        {invite && !invite.alreadyIn && (
          <>
            {/* Block 1 — Group card */}
            <div
              className="card"
              style={{ borderLeft: `3px solid ${invite.colour}`, padding: '16px 16px 16px 16px' }}
            >
              {/* Row 1: invited by */}
              <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 6 }}>
                <span style={{ fontWeight: 600, color: 'var(--ink-primary)' }}>{invite.inviter}</span>
                {' '}invited you to join
              </p>

              {/* Row 2: group name */}
              <p style={{
                fontSize: 22,
                fontWeight: 700,
                color: 'var(--ink-primary)',
                letterSpacing: '-0.02em',
                marginBottom: 12,
              }}>
                {invite.name}
              </p>

              {/* Divider */}
              <div style={{ height: 1, background: 'var(--border-default)', marginBottom: 14 }} />

              {/* Row 3: avatars + count */}
              <MemberAvatars members={invite.members} />
            </div>

            {/* Block 2 — CTA */}
            <div>
              <p style={{
                fontSize: 18,
                fontWeight: 700,
                color: 'var(--ink-primary)',
                letterSpacing: '-0.01em',
                marginBottom: 6,
              }}>
                Join the group
              </p>
              <p style={{
                fontSize: 13,
                color: 'var(--ink-muted)',
                lineHeight: 1.5,
                marginBottom: 24,
              }}>
                Create an account or log in to accept your invite and start planning hangouts.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Button onClick={() => navigate('/signup', { state: { joinGroupId: groupId } })}>
                  Create an account
                </Button>
                <Button variant="secondary" onClick={() => navigate('/login', { state: { joinGroupId: groupId } })}>
                  Log in
                </Button>
              </div>
            </div>

            {/* Legal */}
            <p style={{
              fontSize: 11,
              color: 'var(--ink-muted)',
              textAlign: 'center',
              lineHeight: 1.6,
            }}>
              By joining you agree to our{' '}
              <a href="/privacy" style={{ color: 'var(--ink-muted)', textDecoration: 'underline' }}>
                Privacy Policy
              </a>
              .{' '}Your email will only be visible to group members.
            </p>
          </>
        )}

      </div>
    </Screen>
  )
}
