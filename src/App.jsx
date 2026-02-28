import { useState } from 'react'
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom'
import { ViewModeContext } from './context/viewMode'

import SignUp                from './screens/SignUp'
import Login                 from './screens/Login'
import SetPassword           from './screens/SetPassword'
import DisplayName           from './screens/DisplayName'
import CreateGroup           from './screens/CreateGroup'
import InviteFriends         from './screens/InviteFriends'
import Home                  from './screens/Home'
import GroupDetail           from './screens/GroupDetail'
import GroupSettings         from './screens/GroupSettings'
import InviteLanding         from './screens/InviteLanding'
import Profile               from './screens/Profile'
import RespondNow            from './screens/RespondNow'
import CalendarPicker        from './screens/CalendarPicker'
import TimeSlotPicker        from './screens/TimeSlotPicker'
import ActivityPreferences   from './screens/ActivityPreferences'
import ResponseLocked        from './screens/ResponseLocked'
import WaitingForOthers      from './screens/WaitingForOthers'
import Matching              from './screens/Matching'
import Results               from './screens/Results'
import BookingConfirm        from './screens/BookingConfirm'
import TimeConfirm           from './screens/TimeConfirm'
import CalendarInvite        from './screens/CalendarInvite'
import CantMakeIt            from './screens/CantMakeIt'
import BookerCancellation    from './screens/BookerCancellation'
import MultipleCancellations from './screens/MultipleCancellations'
import ErrorNoOverlap        from './screens/ErrorNoOverlap'
import ErrorNoVenues         from './screens/ErrorNoVenues'
import GenericError          from './screens/GenericError'

// ── Screen map used by the nav overlay ──────────────────────────────────────
export const SCREENS = [
  // Onboarding
  { path: '/signup',               label: 'Sign up',               group: 'Onboarding' },
  { path: '/login',                label: 'Log in',                group: 'Onboarding' },
  { path: '/set-password',         label: 'Set password',          group: 'Onboarding' },
  { path: '/display-name',         label: 'Display name',          group: 'Onboarding' },
  { path: '/create-group',         label: 'Create group',          group: 'Onboarding' },
  { path: '/invite-friends',       label: 'Invite friends',        group: 'Onboarding' },
  // Home & Groups
  { path: '/home',                   label: 'Home (your groups)',        group: 'Home & Groups'  },
  { path: '/group-detail',           label: 'Group detail',             group: 'Home & Groups'  },
  { path: '/group-settings',         label: 'Group settings',           group: 'Home & Groups'  },
  { path: '/invite-landing',         label: 'Invite landing',           group: 'Home & Groups'  },
  { path: '/profile',                label: 'Profile & settings',       group: 'Home & Groups'  },
  // Response flow
  { path: '/respond',                label: 'Respond now',              group: 'Response flow'  },
  { path: '/calendar-picker',        label: 'Pick 3 dates',             group: 'Response flow'  },
  { path: '/time-picker',            label: 'Pick times',               group: 'Response flow'  },
  { path: '/activity-preferences',   label: 'Pick activity',            group: 'Response flow'  },
  { path: '/response-locked',        label: 'Response locked',          group: 'Response flow'  },
  { path: '/waiting',                label: 'Waiting for others',       group: 'Response flow'  },
  // Matching & results
  { path: '/matching',               label: 'Matching (loading)',        group: 'Results'        },
  { path: '/results',                label: 'Results',                  group: 'Results'        },
  { path: '/booking-confirm',        label: 'Booking confirm',          group: 'Results'        },
  { path: '/time-confirm',           label: 'Confirm the time',         group: 'Results'        },
  { path: '/calendar-invite',        label: 'Calendar invite',          group: 'Results'        },
  // Cancellation
  { path: '/cant-make-it',           label: "Can't make it",            group: 'Cancellation'   },
  { path: '/booker-cancellation',    label: 'Booker: 1 cancellation',   group: 'Cancellation'   },
  { path: '/multiple-cancellations', label: 'Booker: 2+ cancellations', group: 'Cancellation'   },
  // Errors
  { path: '/error-no-overlap',       label: 'Error: no overlap',        group: 'Errors'         },
  { path: '/error-no-venues',        label: 'Error: no venues',         group: 'Errors'         },
  { path: '/error',                  label: 'Error: generic',           group: 'Errors'         },
]

// ── View mode toggle (inside prototype nav) ──────────────────────────────────
function ViewToggle({ viewMode, setViewMode }) {
  return (
    <div style={{ display: 'flex', background: '#1a1a1a', borderRadius: 8, padding: 3, gap: 2 }}>
      {['mobile', 'web'].map(m => (
        <button
          key={m}
          onClick={() => setViewMode(m)}
          style={{
            flex: 1,
            height: 28,
            borderRadius: 6,
            border: 'none',
            background: viewMode === m ? '#2d2d2d' : 'transparent',
            color: viewMode === m ? 'var(--coral)' : '#555',
            fontSize: 11,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'color 0.15s, background 0.15s',
          }}
        >
          {m === 'mobile' ? '📱 Mobile' : '🖥 Web'}
        </button>
      ))}
    </div>
  )
}

// ── Web app top navigation bar ───────────────────────────────────────────────
function WebTopNav() {
  const path = window.location.pathname
  const links = [
    { href: '/home',         label: 'Home'   },
    { href: '/group-detail', label: 'Groups' },
  ]
  return (
    <div
      style={{
        height: 60,
        background: 'var(--surface)',
        borderBottom: '1px solid #2a2a2a',
        display: 'flex',
        alignItems: 'center',
        padding: '0 40px',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        flexShrink: 0,
      }}
    >
      <span className="logo" style={{ fontSize: 22 }}>nudge</span>
      <nav style={{ display: 'flex', gap: 32 }}>
        {links.map(l => (
          <a
            key={l.href}
            href={l.href}
            style={{
              color: path === l.href ? 'var(--coral)' : 'var(--text-muted)',
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            {l.label}
          </a>
        ))}
      </nav>
      <a href="/profile" style={{ textDecoration: 'none' }}>
        <div className="avatar" style={{ fontSize: 16, cursor: 'pointer' }}>Y</div>
      </a>
    </div>
  )
}

// ── Prototype nav sidebar ────────────────────────────────────────────────────
function NavOverlay({ viewMode, setViewMode }) {
  const groups = [...new Set(SCREENS.map(s => s.group))]
  const { pathname } = useLocation()

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
      <div style={{ padding: '0 16px 12px', borderBottom: '1px solid #222' }}>
        <p style={{ color: 'var(--coral)', fontWeight: 700, fontSize: 16, fontFamily: 'Poppins, sans-serif' }}>nudge</p>
        <p style={{ color: '#555', fontSize: 11, marginTop: 2, marginBottom: 10 }}>prototype · all screens</p>
        <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
      </div>
      {groups.map(g => (
        <div key={g} style={{ marginTop: 16 }}>
          <p style={{ color: '#555', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, padding: '0 16px 6px' }}>{g}</p>
          {SCREENS.filter(s => s.group === g).map(s => (
            <Link
              key={s.path}
              to={s.path}
              style={{
                display: 'block',
                padding: '7px 16px',
                color: pathname === s.path ? 'var(--coral)' : '#aaa',
                fontSize: 13,
                textDecoration: 'none',
                background: pathname === s.path ? 'rgba(232,93,77,0.08)' : 'transparent',
                borderLeft: pathname === s.path ? '2px solid var(--coral)' : '2px solid transparent',
              }}
            >
              {s.label}
            </Link>
          ))}
        </div>
      ))}
    </div>
  )
}

// ── App root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [viewMode, setViewMode] = useState(
    () => localStorage.getItem('nudge-view-mode') || 'mobile'
  )

  const handleSetViewMode = (mode) => {
    setViewMode(mode)
    localStorage.setItem('nudge-view-mode', mode)
  }

  const isMobile = viewMode === 'mobile'

  return (
    <ViewModeContext.Provider value={viewMode}>
      <div style={{ display: 'flex' }}>
        <NavOverlay viewMode={viewMode} setViewMode={handleSetViewMode} />
        <div
          style={{
            marginLeft: 220,
            flex: 1,
            minHeight: '100dvh',
            background: '#080808',
            display: 'flex',
            ...(isMobile
              ? { alignItems: 'flex-start', justifyContent: 'center', padding: '24px 0' }
              : { flexDirection: 'column' }
            ),
          }}
        >
          {!isMobile && <WebTopNav />}
          <Routes>
            <Route path="/"                    element={<Navigate to="/signup" replace />} />
            <Route path="/signup"              element={<SignUp />} />
            <Route path="/login"               element={<Login />} />
            <Route path="/set-password"        element={<SetPassword />} />
            <Route path="/display-name"        element={<DisplayName />} />
            <Route path="/create-group"        element={<CreateGroup />} />
            <Route path="/invite-friends"      element={<InviteFriends />} />
            <Route path="/home"                       element={<Home />} />
            <Route path="/group-detail"               element={<GroupDetail />} />
            <Route path="/group-settings"             element={<GroupSettings />} />
            <Route path="/invite-landing"             element={<InviteLanding />} />
            <Route path="/profile"                    element={<Profile />} />
            <Route path="/respond"                    element={<RespondNow />} />
            <Route path="/calendar-picker"            element={<CalendarPicker />} />
            <Route path="/time-picker"                element={<TimeSlotPicker />} />
            <Route path="/activity-preferences"       element={<ActivityPreferences />} />
            <Route path="/response-locked"            element={<ResponseLocked />} />
            <Route path="/waiting"                    element={<WaitingForOthers />} />
            <Route path="/matching"                   element={<Matching />} />
            <Route path="/results"                    element={<Results />} />
            <Route path="/booking-confirm"            element={<BookingConfirm />} />
            <Route path="/time-confirm"              element={<TimeConfirm />} />
            <Route path="/calendar-invite"            element={<CalendarInvite />} />
            <Route path="/cant-make-it"               element={<CantMakeIt />} />
            <Route path="/booker-cancellation"        element={<BookerCancellation />} />
            <Route path="/multiple-cancellations"     element={<MultipleCancellations />} />
            <Route path="/error-no-overlap"           element={<ErrorNoOverlap />} />
            <Route path="/error-no-venues"            element={<ErrorNoVenues />} />
            <Route path="/error"                      element={<GenericError />} />
          </Routes>
        </div>
      </div>
    </ViewModeContext.Provider>
  )
}
