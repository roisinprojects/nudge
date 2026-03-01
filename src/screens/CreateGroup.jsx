import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import Input from '../components/Input'
import BackButton from '../components/BackButton'
import SegmentedBar from '../components/SegmentedBar'

export default function CreateGroup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')

  const suggestions = ['The Crew', 'Friday Fam', 'The Usual Suspects', 'Weekend Warriors']

  return (
    <Screen>
      <div style={{ paddingTop: 56 }}>
        <BackButton to="/display-name" />
      </div>

      <div style={{ marginTop: 24 }}>
        <SegmentedBar total={5} current={4} />
      </div>

      <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <h1>Name your group</h1>
          <p className="text-muted mt-8">Give your friend group a name. You can always change it later.</p>
        </div>

        <Input
          label="Group name"
          placeholder="e.g. The Crew"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <div>
          <p className="text-sm text-muted mb-8">Suggestions</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {suggestions.map(s => (
              <span
                key={s}
                className={`chip ${name === s ? 'chip-selected' : 'chip-outline'}`}
                onClick={() => setName(s)}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <Button
          disabled={!name.trim()}
          onClick={() => navigate('/invite-friends')}
        >
          Continue
        </Button>
      </div>
    </Screen>
  )
}
