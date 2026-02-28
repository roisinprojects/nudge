import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Logo from '../components/Logo'
import Button from '../components/Button'
import Input from '../components/Input'
import BackButton from '../components/BackButton'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Screen>
      <div style={{ paddingTop: 56 }}>
        <BackButton to="/signup" />
      </div>

      <div style={{ paddingTop: 40 }}>
        <Logo />
      </div>

      <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <h1>Welcome back</h1>
          <p className="text-muted mt-8">Good to see you again.</p>
        </div>

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
          placeholder="••••••••"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <Button onClick={() => navigate('/home')}>
          Log in
        </Button>

        <p className="text-center text-muted text-sm">
          Don't have an account?{' '}
          <span
            className="text-coral bold"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/signup')}
          >
            Sign up
          </span>
        </p>
      </div>
    </Screen>
  )
}
