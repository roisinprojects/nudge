import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import Input from '../components/Input'
import BackButton from '../components/BackButton'

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.909-2.259c-.806.54-1.837.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg width="15" height="18" viewBox="0 0 15 18" aria-hidden="true" style={{ flexShrink: 0, fill: 'var(--ink-primary)' }}>
      <path d="M12.44 9.57c-.02-2.47 2.01-3.66 2.1-3.72-1.14-1.67-2.92-1.9-3.55-1.92-1.52-.15-2.96.9-3.73.9-.76 0-1.94-.87-3.18-.85-1.64.02-3.16.96-4.01 2.44C.35 9.13.52 13.1 2.06 15.4c.74 1.07 1.63 2.28 2.79 2.24 1.12-.04 1.55-.72 2.91-.72 1.36 0 1.74.72 2.93.7 1.2-.02 1.97-1.1 2.7-2.18.86-1.24 1.21-2.44 1.23-2.5-.03-.01-2.37-.91-2.38-3.37ZM10.47 2.76c.6-.73 1.01-1.74.9-2.76-.87.04-1.93.58-2.56 1.29-.55.65-1.04 1.68-.91 2.68.97.07 1.96-.49 2.57-1.21Z"/>
    </svg>
  )
}

function OrDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ flex: 1, height: 1, background: 'var(--border-default)' }} />
      <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>or</span>
      <div style={{ flex: 1, height: 1, background: 'var(--border-default)' }} />
    </div>
  )
}

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Screen>

      {/* ── Back button ── */}
      <div style={{ paddingTop: 24 }}>
        <BackButton to="/signup" />
      </div>

      {/* ── Heading ── */}
      <div style={{ marginTop: 48 }}>
        <h1>Sign in</h1>
        <p className="text-muted mt-8">Sign in to your account</p>
      </div>

      {/* ── Form ── */}
      <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Input
          label="Email address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <Button onClick={() => navigate('/home')}>
          Continue
        </Button>

        <OrDivider />

        <Button variant="secondary" style={{ gap: 10 }} onClick={() => {}}>
          <GoogleIcon />
          Sign in with Google
        </Button>

        <Button variant="secondary" style={{ gap: 10 }} onClick={() => {}}>
          <AppleIcon />
          Sign in with Apple
        </Button>
      </div>

      {/* ── Footer: sign up link ── */}
      <div style={{ marginTop: 'auto', paddingBottom: 40, paddingTop: 24 }}>
        <p className="text-center text-sm text-muted">
          Don't have an account?{' '}
          <span
            style={{ color: 'var(--ink-primary)', fontWeight: 600, cursor: 'pointer' }}
            onClick={() => navigate('/signup')}
          >
            Sign up
          </span>
        </p>
      </div>

    </Screen>
  )
}
