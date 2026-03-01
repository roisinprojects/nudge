import Screen from '../components/Screen'
import Button from '../components/Button'

// ── Section wrapper ─────────────────────────────────────────────────────────
function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--ink-muted)',
        borderBottom: '1px solid var(--border-default)',
        paddingBottom: 8,
        marginBottom: 16,
      }}>
        {title}
      </div>
      {children}
    </div>
  )
}

// ── Token swatch ─────────────────────────────────────────────────────────────
function Swatch({ name, value, bg, border }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
      <div style={{
        width: 32, height: 32, borderRadius: 6,
        background: bg || value,
        border: border || '1px solid var(--border-strong)',
        flexShrink: 0,
      }} />
      <div>
        <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-primary)', fontFamily: 'monospace' }}>{name}</p>
        <p style={{ fontSize: 11, color: 'var(--ink-muted)', fontFamily: 'monospace' }}>{value}</p>
      </div>
    </div>
  )
}

// ── Code label ───────────────────────────────────────────────────────────────
function Code({ children }) {
  return (
    <code style={{
      display: 'inline-block',
      fontSize: 11,
      fontFamily: 'monospace',
      background: 'var(--bg-ui)',
      border: '1px solid var(--border-default)',
      borderRadius: 4,
      padding: '2px 6px',
      color: 'var(--ink-secondary)',
      marginTop: 4,
    }}>
      {children}
    </code>
  )
}

// ── Item row ─────────────────────────────────────────────────────────────────
function Item({ label, code, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      {children}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 6 }}>
        {label && <p style={{ fontSize: 12, color: 'var(--ink-secondary)' }}>{label}</p>}
        {code && <Code>{code}</Code>}
      </div>
    </div>
  )
}

// ── Group colour row ─────────────────────────────────────────────────────────
const GROUP_COLOURS = [
  { name: '--group-sage',     hex: '#C8D8C0' },
  { name: '--group-lavender', hex: '#C8C0D8' },
  { name: '--group-peach',    hex: '#E8C8B8' },
  { name: '--group-sky',      hex: '#B8D0E0' },
  { name: '--group-butter',   hex: '#E0D8B0' },
  { name: '--group-rose',     hex: '#E0C0C8' },
  { name: '--group-slate',    hex: '#C0C8D0' },
  { name: '--group-marigold', hex: '#E0D0A8' },
]

export default function DesignSystem() {
  return (
    <Screen style={{ paddingBottom: 60 }}>
      <div style={{ paddingTop: 40 }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--ink-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Nudge
        </p>
        <h1 style={{ marginTop: 4 }}>Design System</h1>
        <p style={{ fontSize: 13, color: 'var(--ink-secondary)', marginTop: 6 }}>
          Living reference for all visual tokens and components.
        </p>
      </div>

      <div style={{ marginTop: 32 }}>

        {/* ── Backgrounds ─────────────────────────────────────────── */}
        <Section title="Backgrounds">
          <Swatch name="--bg-primary" value="#F8F5EE"  bg="var(--bg-primary)"  />
          <Swatch name="--bg-card"    value="#FFFFFF"   bg="var(--bg-card)"    />
          <Swatch name="--bg-ui"      value="#ECEAE3"   bg="var(--bg-ui)"      />
        </Section>

        {/* ── Ink (text) ───────────────────────────────────────────── */}
        <Section title="Ink — text colours">
          <Swatch name="--ink-primary"   value="#1A1A1A" bg="var(--ink-primary)"   border="none" />
          <Swatch name="--ink-secondary" value="#5A5650" bg="var(--ink-secondary)" border="none" />
          <Swatch name="--ink-muted"     value="#9A9488" bg="var(--ink-muted)"     border="none" />
          <Swatch name="--ink-faint"     value="#C8C4BA" bg="var(--ink-faint)"     border="none" />
        </Section>

        {/* ── Group colour palette ─────────────────────────────────── */}
        <Section title="Group colour palette">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
            {GROUP_COLOURS.map(c => (
              <div key={c.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: `var(${c.name})`,
                  border: '1px solid var(--border-strong)',
                }} />
                <span style={{ fontSize: 9, fontFamily: 'monospace', color: 'var(--ink-muted)' }}>
                  {c.name.replace('--group-', '')}
                </span>
              </div>
            ))}
          </div>
          <Code>{'border-left: 3px solid var(--group-lavender)'}</Code>
          <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 6 }}>
            Applied to card left borders and selected state fills. Never for backgrounds.
          </p>
        </Section>

        {/* ── Semantic colours ─────────────────────────────────────── */}
        <Section title="Semantic colours">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { label: 'Success', bg: 'var(--semantic-success-bg)', border: 'var(--semantic-success-border)', text: 'var(--semantic-success)' },
              { label: 'Warning', bg: 'var(--semantic-warning-bg)', border: 'var(--semantic-warning-border)', text: 'var(--semantic-warning)' },
              { label: 'Error',   bg: 'var(--semantic-error-bg)',   border: 'var(--semantic-error-border)',   text: 'var(--semantic-error)'   },
              { label: 'Info',    bg: 'var(--semantic-info-bg)',    border: 'var(--semantic-info-border)',    text: 'var(--semantic-info)'    },
            ].map(s => (
              <div key={s.label} style={{
                background: s.bg,
                border: `1px solid ${s.border}`,
                borderRadius: 8, padding: '8px 12px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: s.text }}>{s.label}</span>
                <code style={{ fontSize: 10, color: s.text, fontFamily: 'monospace' }}>--semantic-{s.label.toLowerCase()}</code>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Dot texture ──────────────────────────────────────────── */}
        <Section title="Dot texture">
          <div style={{
            height: 64, borderRadius: 8, border: '1px solid var(--border-strong)',
            backgroundColor: 'var(--bg-primary)',
            backgroundImage: 'radial-gradient(circle, var(--dot-color) 1px, transparent 1px)',
            backgroundSize: 'var(--dot-size) var(--dot-size)',
          }} />
          <Code>{'background-image: radial-gradient(circle, var(--dot-color) 1px, transparent 1px)'}</Code>
          <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 6 }}>
            Applied to .frame and web Screen container. Never on cards.
          </p>
        </Section>

        {/* ── Borders ──────────────────────────────────────────────── */}
        <Section title="Borders">
          {[
            { name: '--border-default', value: 'rgba(26,26,26,0.08)', note: 'Cards, inputs'     },
            { name: '--border-strong',  value: 'rgba(26,26,26,0.15)', note: 'Hover, focus ring' },
            { name: '--border-muted',   value: 'rgba(26,26,26,0.04)', note: 'Dividers'          },
          ].map(b => (
            <div key={b.name} style={{
              borderBottom: `2px solid ${b.value}`,
              paddingBottom: 8, marginBottom: 10,
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
            }}>
              <code style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ink-secondary)' }}>{b.name}</code>
              <span style={{ fontSize: 11, color: 'var(--ink-muted)' }}>{b.note}</span>
            </div>
          ))}
        </Section>

        {/* ── Radius ───────────────────────────────────────────────── */}
        <Section title="Border radius">
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[
              { name: 'sm', val: '4px' },
              { name: 'md', val: '6px' },
              { name: 'lg', val: '8px' },
              { name: 'xl', val: '12px' },
            ].map(r => (
              <div key={r.name} style={{ textAlign: 'center' }}>
                <div style={{
                  width: 48, height: 48,
                  background: 'var(--bg-ui)',
                  border: '1px solid var(--border-strong)',
                  borderRadius: r.val,
                  marginBottom: 4,
                }} />
                <p style={{ fontSize: 10, fontFamily: 'monospace', color: 'var(--ink-muted)' }}>--radius-{r.name}</p>
                <p style={{ fontSize: 10, color: 'var(--ink-faint)' }}>{r.val}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Shadows ──────────────────────────────────────────────── */}
        <Section title="Shadows">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { name: '--shadow-xs', label: 'XS — avatar, tight elements' },
              { name: '--shadow-sm', label: 'SM — cards (default)'        },
              { name: '--shadow-md', label: 'MD — hover state, tooltips'  },
            ].map(s => (
              <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 8,
                  background: 'var(--bg-card)', boxShadow: `var(${s.name})`,
                  flexShrink: 0,
                }} />
                <div>
                  <code style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ink-secondary)' }}>{s.name}</code>
                  <p style={{ fontSize: 11, color: 'var(--ink-muted)', marginTop: 2 }}>{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Typography ───────────────────────────────────────────── */}
        <Section title="Typography">
          <Item label="Wordmark — Poppins 800, 28px" code="<span className='logo'>nudge</span>">
            <span className="logo">nudge</span>
          </Item>
          <Item label="Page title — 22px, 700" code="<h1>">
            <h1>Heading h1</h1>
          </Item>
          <Item label="Section heading — 17px, 700" code="<h2>">
            <h2>Heading h2</h2>
          </Item>
          <Item label="Label — 14px, 700" code="<h3>">
            <h3>Heading h3</h3>
          </Item>
          <Item label="Body — 14–16px, 400" code="<p>">
            <p style={{ fontSize: 15 }}>Body text at 15px — used in cards and main content areas.</p>
          </Item>
          <Item label=".text-sm — 13px, 400" code="className='text-sm'">
            <p className="text-sm">Secondary body text, metadata, descriptions.</p>
          </Item>
          <Item label=".text-xs — 11px, 400, tracked" code="className='text-xs'">
            <p className="text-xs">Captions, timestamps, overline labels.</p>
          </Item>
          <Item label="Overline — 11px, 700, uppercase" code="fontSize: 11, fontWeight: 700, textTransform: 'uppercase'">
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-muted)' }}>
              Section label
            </p>
          </Item>
          <Item label=".text-muted" code="className='text-muted'">
            <p className="text-muted">Muted text uses --ink-secondary.</p>
          </Item>
        </Section>

        {/* ── Buttons ──────────────────────────────────────────────── */}
        <Section title="Buttons">
          <Item label="Primary — mono black, full-width" code="<Button>…</Button>">
            <Button>Continue →</Button>
          </Item>
          <Item label="Primary disabled" code="<Button disabled>…</Button>">
            <Button disabled>Continue →</Button>
          </Item>
          <Item label="Secondary — outlined" code="<Button variant='secondary'>…</Button>">
            <Button variant="secondary">Open OpenTable →</Button>
          </Item>
          <Item label="Ghost — no border" code="<Button variant='ghost'>…</Button>">
            <Button variant="ghost">Skip for now</Button>
          </Item>
          <Item label="Destructive — outlined red" code="<Button variant='destructive'>…</Button>">
            <Button variant="destructive">Remove member</Button>
          </Item>
          <Item label="Success" code="<Button variant='success'>…</Button>">
            <Button variant="success">✓ Confirmed!</Button>
          </Item>
          <Item label="Group — group colour bg (pass --group-color)" code="<Button variant='group' style={{'--group-color': 'var(--group-lavender)'}}>…</Button>">
            <Button variant="group" style={{ '--group-color': 'var(--group-lavender)' }}>
              + Invite someone
            </Button>
          </Item>
          <Item label="Half-width pair" code="half prop">
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="ghost" half>Cancel</Button>
              <Button half>Confirm</Button>
            </div>
          </Item>
        </Section>

        {/* ── Progress bar ─────────────────────────────────────────── */}
        <Section title="Progress bar (SegmentedBar)">
          <Item label="Step 1 of 3 — onboarding" code="<SegmentedBar total={3} current={1} />">
            <div>
              <div style={{ display: 'flex', gap: 4 }}>
                <div className="progress-seg active" style={{ flex: 1 }} />
                <div className="progress-seg todo"   style={{ flex: 1 }} />
                <div className="progress-seg todo"   style={{ flex: 1 }} />
              </div>
              <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 6 }}>Step 1 of 3</p>
            </div>
          </Item>
          <Item label="Step 2 of 3 with counter" code="<SegmentedBar total={3} current={2} counterText='2/3 selected' />">
            <div>
              <div style={{ display: 'flex', gap: 4 }}>
                <div className="progress-seg done"   style={{ flex: 1 }} />
                <div className="progress-seg active" style={{ flex: 1 }} />
                <div className="progress-seg todo"   style={{ flex: 1 }} />
                <span style={{ fontSize: 12, color: 'var(--ink-secondary)', fontWeight: 600, paddingLeft: 12, whiteSpace: 'nowrap' }}>2/3 selected</span>
              </div>
              <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 6 }}>Step 2 of 3</p>
            </div>
          </Item>
        </Section>

        {/* ── Input ────────────────────────────────────────────────── */}
        <Section title="Input">
          <Item label="Default" code="className='input'">
            <div className="input-group">
              <label className="input-label">Display name</label>
              <input className="input" placeholder="e.g. Sarah" readOnly />
            </div>
          </Item>
          <Item label="Error state" code="className='input error'">
            <div className="input-group">
              <label className="input-label">Email</label>
              <input className="input error" defaultValue="not-an-email" readOnly />
              <span className="input-error-msg">⚠ Please enter a valid email address.</span>
            </div>
          </Item>
          <Item label="Disabled" code="disabled">
            <div className="input-group">
              <label className="input-label">Group code</label>
              <input className="input" disabled placeholder="Locked" readOnly />
            </div>
          </Item>
        </Section>

        {/* ── Cards ────────────────────────────────────────────────── */}
        <Section title="Cards">
          <Item label="Default card" code="className='card'">
            <div className="card">
              <p style={{ fontWeight: 700, fontSize: 15 }}>Card title</p>
              <p className="text-sm text-muted" style={{ marginTop: 4 }}>Supporting text goes here.</p>
            </div>
          </Item>
          <Item label="Card with group colour left border" code="borderLeft: '3px solid var(--group-lavender)'">
            <div className="card" style={{
              borderLeft: '3px solid var(--group-lavender)',
              borderLeftWidth: 3,
              borderLeftColor: 'var(--group-lavender)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--group-lavender)' }} />
                <p style={{ fontWeight: 700, fontSize: 15 }}>Uni Friends</p>
              </div>
              <p className="text-sm text-muted" style={{ marginTop: 4 }}>Saturday, 1 March · 7pm</p>
            </div>
          </Item>
        </Section>

        {/* ── Badges ───────────────────────────────────────────────── */}
        <Section title="Badges — status">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <div>
              <span className="badge badge-respond">Respond now!</span>
              <p style={{ marginTop: 4 }}><Code>.badge-respond</Code></p>
            </div>
            <div>
              <span className="badge badge-waiting">Waiting on others</span>
              <p style={{ marginTop: 4 }}><Code>.badge-waiting</Code></p>
            </div>
            <div>
              <span className="badge badge-idle">Next nudge soon</span>
              <p style={{ marginTop: 4 }}><Code>.badge-idle</Code></p>
            </div>
            <div>
              <span className="badge badge-confirmed">Confirmed</span>
              <p style={{ marginTop: 4 }}><Code>.badge-confirmed</Code></p>
            </div>
          </div>
        </Section>

        {/* ── Tags ─────────────────────────────────────────────────── */}
        <Section title="Tags — cuisine / informational">
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <span className="tag">Modern British</span>
            <span className="tag">Drinks</span>
            <span className="tag">Late night</span>
            <span className="tag">Indian</span>
          </div>
          <Code>.tag</Code>
          <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 6 }}>
            Outlined neutral. Used for cuisine/type labels on venue cards.
          </p>
        </Section>

        {/* ── Chips ────────────────────────────────────────────────── */}
        <Section title="Chips — selectable filters / vibes">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span className="chip chip-outline">Dinner out</span>
            <span className="chip chip-selected">Drinks</span>
            <span className="chip chip-outline">Casual</span>
            <span className="chip chip-outline">Brunch</span>
          </div>
          <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
            <Code>.chip.chip-outline</Code>
            <Code>.chip.chip-selected</Code>
          </div>
        </Section>

        {/* ── Alert banners ────────────────────────────────────────── */}
        <Section title="Alert banners">
          {[
            { cls: 'alert-success', icon: '🎉', title: 'Match found!', body: 'Everyone is in — here\'s your plan.' },
            { cls: 'alert-warning', icon: '💡', title: 'Heads up',     body: 'The group is waiting on you.' },
            { cls: 'alert-error',   icon: '⚠',  title: 'No overlap',   body: 'No date works for everyone.' },
            { cls: 'alert-info',    icon: 'ℹ',  title: 'Reminder',     body: 'Nudge window closes in 48 hours.' },
          ].map(a => (
            <Item key={a.cls} code={`.alert.${a.cls}`}>
              <div className={`alert ${a.cls}`}>
                <span>{a.icon}</span>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 14 }}>{a.title}</p>
                  <p style={{ fontSize: 13, marginTop: 2 }}>{a.body}</p>
                </div>
              </div>
            </Item>
          ))}
        </Section>

        {/* ── Avatar ───────────────────────────────────────────────── */}
        <Section title="Avatars">
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div>
              <div className="avatar">Y</div>
              <Code>.avatar</Code>
            </div>
            <div>
              <div className="avatar responded">T</div>
              <Code>.avatar.responded</Code>
            </div>
            <div>
              <div className="avatar" style={{ background: 'var(--group-lavender)', border: 'none' }}>R</div>
              <Code>group-colour fill</Code>
            </div>
          </div>
        </Section>

        {/* ── Motion ───────────────────────────────────────────────── */}
        <Section title="Motion tokens">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { name: '--duration-instant', val: '50ms'  },
              { name: '--duration-fast',    val: '100ms' },
              { name: '--duration-normal',  val: '200ms' },
              { name: '--duration-slow',    val: '300ms' },
            ].map(m => (
              <div key={m.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <code style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ink-secondary)' }}>{m.name}</code>
                <span style={{ fontSize: 12, color: 'var(--ink-muted)' }}>{m.val}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 8 }}>
            Easing: <code style={{ fontFamily: 'monospace', fontSize: 11 }}>--ease-out</code> for entrances,
            {' '}<code style={{ fontFamily: 'monospace', fontSize: 11 }}>--ease-in</code> for exits.
          </p>
        </Section>

      </div>
    </Screen>
  )
}
