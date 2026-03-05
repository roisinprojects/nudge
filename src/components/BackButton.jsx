import { useNavigate } from 'react-router-dom'

export default function BackButton({ to, onClick }) {
  const navigate = useNavigate()
  const handleClick = onClick || (() => to ? navigate(to) : navigate(-1))
  return (
    <button className="back-btn" onClick={handleClick} aria-label="Go back">
      <span className="material-icons" style={{ fontSize: 24, lineHeight: 1 }}>chevron_left</span>
    </button>
  )
}
