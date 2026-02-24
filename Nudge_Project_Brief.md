# Nudge - Friend Hangout Coordination App

## Project Overview

**Nudge** is a mobile web app that solves friend group coordination friction by automating the process of scheduling regular hangouts. Instead of the endless "when are we all free?" text chains, Nudge sends automatic reminders every 6 weeks, collects availability from everyone simultaneously, uses AI to match overlapping times, finds venue options, and handles the booking logistics.

**Core insight:** Remove the burden of organizing from one person. Make hanging out with friends a scheduled, low-friction habit instead of something that requires coordination effort.

---

## Problem Statement

Friends want to hang out regularly but don't because:
1. Coordinating schedules across multiple people is tedious
2. One person always has to initiate and chase others for responses
3. Finding a time everyone's free takes days of back-and-forth
4. Deciding where to go adds another layer of decision-making
5. By the time plans are made, momentum is lost

**Target user:** Busy adults (especially parents) who care about friendships but struggle to maintain them due to scheduling friction.

---

## Solution: How Nudge Works

### The 6-Week Cycle

**Week 1-6: Idle**
- App sits quietly
- User's calendars are synced (optional, for context)

**Week 6: Nudge Sent**
- Automated notification to entire friend group: "Time to hang!"
- Everyone gets the same reminder simultaneously (removes social friction of who initiates)

**Response Window: 48 Hours**
- Each person responds with:
  - 3 date/time options (Friday, Saturday, or Sunday only)
  - 2 activity preferences (from: Drinks, Food & Drinks, Suggest)
- Responses are hidden from others (no social pressure or anchoring bias)

**Matching: AI-Powered**
- System finds overlapping availability
- Matches preferred activities
- If no overlap: extends matching window or suggests closest alternatives
- Searches OpenTable for 3 venue options matching matched criteria
- Randomly assigns one person as "booker"

**Results: Calendar Invite + Booking**
- Everyone sees: Matched date/time/activity
- Booker sees: 3 venue options with direct OpenTable links
- Booker clicks link, completes reservation on OpenTable
- Returns to Nudge to confirm booking
- App sends calendar invites to everyone with venue details

**Post-Hangout**
- Optional: rate the hangout, see history

---

## Key Features

### 1. Multiple Friend Groups
- Users can create/join different friend groups
- Each group has its own 6-week cycle
- Can stagger cycles so hangouts don't overlap

### 2. Automatic Reminders
- Push notification / email every 6 weeks
- Nudges the entire group at once (no single organizer needed)

### 3. Availability Matching
- Calendar picker (select 3 Friday/Saturday/Sunday dates)
- Time of day selection (Afternoon, Evening, Night)
- AI matches overlapping times across all responses
- Hidden responses prevent anchoring bias

### 4. Activity Selection
- Each person selects 2 preferred activities
- AI finds activity that appears in majority of preferences
- Fallback options if no clear winner

### 5. Venue Search & Booking
- Searches OpenTable for restaurants/bars matching criteria
- Shows 3 options with ratings, distance, availability
- User clicks through to OpenTable to book
- Returns to app to confirm booking
- Sends calendar invites with venue details to group

### 6. Response Tracking
- See who's responded, who hasn't
- Countdown timer (48 hours remaining)
- Waiting state while system processes

---

## Design System

### Colors (Dark Mode)
- **Background:** #0F0F0F
- **Surface:** #1A1A1A
- **Text Primary:** #FFFFFF
- **Text Secondary:** #CCCCCC

**Warm Accents:**
- **Coral (Primary):** #E85D4D (buttons, CTAs, links)
- **Mauve (Secondary):** #A88FA0 (secondary actions)
- **Taupe (Tertiary):** #8B8680 (subtle UI)

**Functional Colors:**
- **Success:** #6BB6A0 (booking confirmed, response locked)
- **Warning:** #D4A574 (deadline approaching)
- **Error:** #C85C3C (errors, failed actions)
- **Disabled:** #444444 (inactive states)

### Typography
- **Font Stack:** -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif (system fonts)
- **Logo:** Poppins Bold, 40px, #E85D4D
- **Tagline:** Poppins Regular, 16px, #CCCCCC
- **Headings:** 24-32px, 600 weight
- **Body:** 16px, 400 weight
- **Buttons:** 16px, 600 weight

### Layout
- **Mobile Frame:** 390px × 844px (iPhone 14/15)
- **Grid:** 4 columns, 16px margins, 12px gutters
- **Spacing:** 8px baseline (multiples: 8, 16, 24, 32, 40, 48)
- **Buttons:** 48px height, 358px width (full), 173px (half)
- **Corner Radius:** 8px (buttons, cards, inputs)

### Components
- **Buttons:** Primary (coral), Secondary (mauve), Tertiary (taupe), Success (green), Disabled (gray)
- **States:** Default, Hover, Active, Disabled, Loading
- **Forms:** Text inputs, calendar picker, radio buttons, alerts
- **Cards:** Group cards, venue cards, event cards
- **Alerts:** Success, warning, error with icons

---

## User Flows

### 1. Onboarding (New User)
1. Sign up with email
2. Set password
3. Create first group (name it)
4. Invite friends (via email)
5. Friends receive invite link, sign up/login, join group
6. See "Your Groups" home screen

### 2. Invited User
1. Receive email invite
2. Click link
3. Sign up / Login
4. Join group
5. See group in "Your Groups"

### 3. Response Flow (Every 6 Weeks)
1. Receive nudge notification
2. Open app, see "Respond now" prompt
3. Select 3 dates (calendar picker, Fri/Sat/Sun only)
4. For each date, select time of day (Afternoon/Evening/Night)
5. Select 2 activity preferences (Drinks, Food & Drinks, Suggest)
6. Submit response → "Locked in" confirmation
7. See "Waiting for others" screen with countdown timer
8. Can see who's responded (names only, not details)

### 4. Matching & Results Flow
1. All responses submitted (or 48 hours elapsed)
2. Loading state (AI is matching)
3. Results screen shows:
   - Matched date/time
   - Matched activity
   - 3 venue options with OpenTable links
   - Name of person assigned to book
4. Booker clicks venue link → OpenTable
5. Completes reservation on OpenTable
6. Returns to Nudge → "I've booked" button
7. App sends calendar invites to entire group
8. Event locked in, group sees confirmation

### 5. Home Screen (Idle State)
- Lists all groups
- Shows next reminder date/countdown for each group
- Shows last hangout date
- Click group to see details/history

---

## Technical Requirements

### Frontend (React)
- Mobile-first responsive design (390px base)
- Dark mode throughout
- Interactive components (forms, buttons, calendar picker)
- Loading states and error handling
- Success/confirmation screens

### Backend (Required Eventually, Not for Prototype)
- User authentication
- Group management (create, invite, join)
- Response storage
- Availability matching algorithm
- OpenTable API integration
- Scheduled reminders (every 6 weeks)
- Calendar invite generation
- Email notifications

### MVP Scope (Prototype Phase)
- **Frontend only:** Build interactive UI with fake data
- **No database:** Use local state/mock data
- **No real auth:** Fake login/signup for testing
- **No real matching:** Hardcoded example results
- **No real OpenTable:** Mock venue search results
- **No real notifications:** Manual trigger for testing

---

## Wireframe Status

**Onboarding screens completed:**
- Sign up (email)
- Secure account (password)
- Customize hangout (group name)
- Add friends (invite emails)
- Home screen (your groups)
- Invited user flow

**Still needed:**
- Reminder notification / prompt to respond
- Response form (calendar picker, time selection, activity preferences)
- Response submitted confirmation
- Waiting for others screen
- Loading/matching state
- Results screen (date/time/activity matched + venue options)
- Venue details / booking confirmation
- Calendar invite screen
- Home screen details (group history, etc.)
- Error states (no overlap, no venues found, etc.)

---

## Success Criteria for MVP

1. ✓ User can sign up and create a group
2. ✓ User can invite friends and see them in the group
3. ✓ User can respond to a reminder with availability & preferences
4. ✓ System matches availability and shows results
5. ✓ User can see 3 venue options and click through to OpenTable
6. ✓ System generates and shows calendar invite
7. ✓ User flow is smooth and feels native on mobile

---

## Brand Voice

- **Friendly:** Conversational, warm, approachable
- **Direct:** Clear CTAs, no confusion
- **Playful:** Subtle humor, social energy
- **Modern:** Clean design, no clutter
- **Empowering:** Removes friction, makes hangouts effortless

---

## Next Steps for Development

1. Build response form screens (calendar picker, time selection, activity preferences)
2. Build results/matching screens
3. Build venue search results screen
4. Integrate with real or mock OpenTable data
5. Add error states and edge cases
6. Test full user flow end-to-end
7. Iterate based on feedback
8. Plan backend integration (database, auth, scheduling, real notifications)

---

## Notes for Developer

- All color codes, spacing, and typography specs are documented in separate design system files
- Frame size is 390px × 844px (always design mobile-first)
- Dark mode only (no light mode needed for MVP)
- Focus on UX clarity over visual polish
- Prioritize the core loop: reminder → response → results → booking
- Test all states: loading, success, error, disabled
- Keep interactions smooth and fast (no laggy animations)
