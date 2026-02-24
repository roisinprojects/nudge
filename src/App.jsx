import { Routes, Route, Navigate } from 'react-router-dom'

import SignUp          from './screens/SignUp'
import Login           from './screens/Login'
import SetPassword     from './screens/SetPassword'
import CreateGroup     from './screens/CreateGroup'
import InviteFriends   from './screens/InviteFriends'
import Home            from './screens/Home'
import GroupDetail     from './screens/GroupDetail'
import InviteLanding   from './screens/InviteLanding'
import RespondNow      from './screens/RespondNow'
import CalendarPicker  from './screens/CalendarPicker'
import ActivityPreferences from './screens/ActivityPreferences'
import ResponseLocked  from './screens/ResponseLocked'
import WaitingForOthers from './screens/WaitingForOthers'
import Matching        from './screens/Matching'
import Results         from './screens/Results'
import BookingConfirm  from './screens/BookingConfirm'
import CalendarInvite  from './screens/CalendarInvite'
import ErrorNoOverlap  from './screens/ErrorNoOverlap'
import ErrorNoVenues   from './screens/ErrorNoVenues'

// ── Screen map used by the nav overlay ──────────────────────────────────────
export const SCREENS = [
  // Onboarding
  { path: '/signup',               label: 'Sign up',               group: 'Onboarding' },
  { path: '/login',                label: 'Log in',                group: 'Onboarding' },
  { path: '/set-password',         label: 'Set password',          group: 'Onboarding' },
  { path: '/create-group',         label: 'Create group',          group: 'Onboarding' },
  { path: '/invite-friends',       label: 'Invite friends',        group: 'Onboarding' },
  // Home
  { path: '/home',                 label: 'Home (your groups)',     group: 'Home' },
  { path: '/group-detail',         label: 'Group detail',          group: 'Home' },
  { path: '/invite-landing',       label: 'Invite landing',        group: 'Home' },
  // Response flow
  { path: '/respond',              label: 'Respond now',           group: 'Response flow' },
  { path: '/calendar-picker',      label: 'Calendar picker',       group: 'Response flow' },
  { path: '/activity-preferences', label: 'Activity preferences',  group: 'Response flow' },
  { path: '/response-locked',      label: 'Response locked',       group: 'Response flow' },
  { path: '/waiting',              label: 'Waiting for others',    group: 'Response flow' },
  // Matching & results
  { path: '/matching',             label: 'Matching (loading)',     group: 'Results' },
  { path: '/results',              label: 'Results',               group: 'Results' },
  { path: '/booking-confirm',      label: 'Booking confirm',       group: 'Results' },
  { path: '/calendar-invite',      label: 'Calendar invite',       group: 'Results' },
  // Errors
  { path: '/error-no-overlap',     label: 'Error: no overlap',     group: 'Errors' },
  { path: '/error-no-venues',      label: 'Error: no venues',      group: 'Errors' },
]

function NavOverlay() {
  const groups = [...new Set(SCREENS.map(s => s.group))]

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0,
        height: '100dvh',
        width: '220px',
        background: '#111',
        borderRight: '1px solid #222',
        overflowY: 'auto',
        zIndex: 1000,
        padding: '16px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
      }}
    >
      <div style={{ padding: '0 16px 16px', borderBottom: '1px solid #222' }}>
        <p style={{ color: 'var(--coral)', fontWeight: 700, fontSize: 16, fontFamily: 'Poppins, sans-serif' }}>nudge</p>
        <p style={{ color: '#555', fontSize: 11, marginTop: 2 }}>prototype · all screens</p>
      </div>
      {groups.map(g => (
        <div key={g} style={{ marginTop: 16 }}>
          <p style={{ color: '#555', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, padding: '0 16px 6px' }}>{g}</p>
          {SCREENS.filter(s => s.group === g).map(s => (
            <a
              key={s.path}
              href={s.path}
              style={{
                display: 'block',
                padding: '7px 16px',
                color: window.location.pathname === s.path ? 'var(--coral)' : '#aaa',
                fontSize: 13,
                textDecoration: 'none',
                background: window.location.pathname === s.path ? 'rgba(232,93,77,0.08)' : 'transparent',
                borderLeft: window.location.pathname === s.path ? '2px solid var(--coral)' : '2px solid transparent',
              }}
            >
              {s.label}
            </a>
          ))}
        </div>
      ))}
    </div>
  )
}

export default function App() {
  return (
    <div style={{ display: 'flex' }}>
      <NavOverlay />
      <div style={{ marginLeft: 220, flex: 1, minHeight: '100dvh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '24px 0', background: '#080808' }}>
        <Routes>
          <Route path="/"                    element={<Navigate to="/signup" replace />} />
          <Route path="/signup"              element={<SignUp />} />
          <Route path="/login"               element={<Login />} />
          <Route path="/set-password"        element={<SetPassword />} />
          <Route path="/create-group"        element={<CreateGroup />} />
          <Route path="/invite-friends"      element={<InviteFriends />} />
          <Route path="/home"                element={<Home />} />
          <Route path="/group-detail"        element={<GroupDetail />} />
          <Route path="/invite-landing"      element={<InviteLanding />} />
          <Route path="/respond"             element={<RespondNow />} />
          <Route path="/calendar-picker"     element={<CalendarPicker />} />
          <Route path="/activity-preferences" element={<ActivityPreferences />} />
          <Route path="/response-locked"     element={<ResponseLocked />} />
          <Route path="/waiting"             element={<WaitingForOthers />} />
          <Route path="/matching"            element={<Matching />} />
          <Route path="/results"             element={<Results />} />
          <Route path="/booking-confirm"     element={<BookingConfirm />} />
          <Route path="/calendar-invite"     element={<CalendarInvite />} />
          <Route path="/error-no-overlap"    element={<ErrorNoOverlap />} />
          <Route path="/error-no-venues"     element={<ErrorNoVenues />} />
        </Routes>
      </div>
    </div>
  )
}
