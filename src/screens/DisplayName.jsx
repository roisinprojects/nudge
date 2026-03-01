import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import Input from '../components/Input'
import BackButton from '../components/BackButton'
import SegmentedBar from '../components/SegmentedBar'

export default function DisplayName() {
  const navigate = useNavigate()
  const [name, setName] = useState('')

  return (
    <Screen>
      <div style={{ paddingTop: 56 }}>
        <BackButton to="/set-password" />
      </div>

      <div style={{ marginTop: 24 }}>
        <SegmentedBar total={5} current={3} />
      </div>

      <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div>
          <h1>What should we call you?</h1>
          <p className="text-muted mt-8">This is how you'll appear to your groups.</p>
        </div>

        <Input
          label="Display name"
          placeholder="e.g. Sarah"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <Button disabled={!name.trim()} onClick={() => navigate('/create-group')}>
          Continue
        </Button>
      </div>
    </Screen>
  )
}
