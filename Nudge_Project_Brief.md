# Nudge - Complete Project Brief v2
Updated with All Design Decisions & Clarifications

---

## PROJECT OVERVIEW

**Nudge** is a mobile web app that removes friction from friend hangout coordination by automating the 6-week cycle: automatic reminders → collect availability → AI matching → venue booking → calendar invites.

**Core mechanic:** Removes burden of organizing from one person. Makes hangouts a scheduled habit, not a coordination project.

**Target user:** Busy adults (especially parents) who value friendships but struggle to maintain them due to scheduling friction.

**MVP scope:** Functional prototype with core loop working end-to-end.

---

## USER FLOWS (COMPLETE)

### FLOW 1: ONBOARDING (NEW USER)

**Step 1: Sign Up**
- Email input
- Password input (min 8 characters)
- Create account

**Step 2: Secure Account**
- Password field
- Confirm password field
- Clear validation messaging (no aggressive errors)

**Step 3: Create Group**
- Group name input
- "Who should be in this group?" explanation
- Group size guidance: "Ideally 2-6 people for easier booking"

**Step 4: Invite Friends**
- Add friend emails (one at a time, with Add button)
- Show list of invited emails below input
- Remove button to delete invited emails
- "Send invites" button
- "Skip for now" button (they can invite later)

**Step 5: Home Screen (After Onboarding)**
- Shows "Your groups"
- If group just created: Show empty state with next nudge date
- If friends already joined: Show group card with member count

---

### FLOW 2: INVITED USER (NEW ACCOUNT)

**Entry Point: Email Invite**

Email template (copy):
```
Subject: [Friend Name] invited you to Nudge

Hi [Friend Name],

[Inviter] wants you to join the "[Group Name]" hangout group on Nudge.

We'll send automatic reminders every 6 weeks so you actually hang out.
No more endless "when are we free?" texts.

[Accept Invite Button/Link]

If you haven't heard of Nudge, it's an app that:
- Sends automatic reminders every 6 weeks
- Collects everyone's availability
- Finds a time that works for everyone
- Books the restaurant
- Sends calendar invites

See you soon!
```

**In-App Flow:**
1. Click link in email → lands on "You've been invited" screen
2. Shows: "Group Name invited you to join 'Uni Friends'"
3. Shows: Current members (avatars + names)
4. Shows: "Next hangout or next nudge date" (if one exists)
5. Button: [Accept & Join] or [Decline]
6. If accept → Added to group, taken to group home screen
7. If decline → Back to pre-login, option to login or exit

**First Experience (New Group):**
- If group just created, user lands on group with upcoming nudge
- If user joins existing group with active hangout cycle:
  - If 48h response window open: Show "Time to plan a hangout!" screen
  - If matching already happened: Show upcoming hangout details
  - If between cycles: Show "Next nudge in X days"

---

### FLOW 3: CORE RESPONSE CYCLE (EVERY 6 WEEKS)

**Step 1: Nudge Notification**
- Push notification: "Time to plan a hangout! 48 hours to respond"
- Email notification (optional, based on user settings)
- Opens to "Time to plan a hangout!" screen

**Step 2: Pick 3 Time Slots**

Screen: Response Form — Pick 3 Time Slots

Layout:
```
Header:
- Group name: "Uni Friends"
- "Time to plan a hangout!"
- "48 hours to respond · 3 responded so far"
- Progress bar (showing how much time left)

Content:
- "Pick 3 time slots"
- "Weekends only. Select up to 3."
- Scrollable list of time slot options (shows ~4-5 at a time)

Time Slot Format: "[Day], [Date] · [Time Range]"
Examples:
- Fri, 28 Feb · Lunch (11am-3pm)
- Fri, 28 Feb · Dinner (5pm-9pm)
- Fri, 28 Feb · Drinks (5pm+)
- Sat, 1 Mar · Lunch (11am-3pm)
- Sat, 1 Mar · Dinner (5pm-9pm)
- Sat, 1 Mar · Drinks (5pm+)
- Sun, 2 Mar · Lunch (11am-3pm)
[✓] Sun, 2 Mar · Dinner (5pm-9pm)
- Sun, 2 Mar · Drinks (5pm+)
... (scrollable, 6 weeks of dates)

Selection: Clickable rows with radio buttons or checkboxes
- Unselected: dark background, gray text
- Selected: coral border (#E85D4D), coral checkmark, white text
- Hover: lighter background

Counter: "3/3 selected" (appears when user hits 3)
Button: [Continue] (disabled until 3 selected, coral color when enabled)
```

Specs:
- Only show Fri/Sat/Sun dates
- Generate 6 weeks of future weekends
- Time slots: Lunch, Dinner, Drinks (as listed above)
- Max 3 selections
- Can deselect and swap (don't lock until submit)
- Visual feedback on selection/deselection

Data Structure:
```js
{
  id: "slot-001",
  date: "2026-02-28",
  dayName: "Friday",
  dayOfWeek: "Fri",
  timeSlot: "dinner", // "lunch", "dinner", "drinks"
  displayLabel: "Fri, 28 Feb · Dinner (5pm-9pm)",
  selected: true
}
```

**Step 3: Pick 2 Activities**

Screen: Response Form — Pick 2 Activities

Layout:
```
Header:
- "Pick 2 activities"
- "What are you in the mood for?"
- Progress bar (2/3 steps done)

Content:
- 3 options (pick 2):
  [ ] 🍽️ Lunch
  [✓] 🍷 Drinks
  [ ] 🍴 Dinner

Selection: Can select up to 2
- Unselected: gray text, empty circle
- Selected: coral border, coral checkmark, white text
- Hover: lighter background

Counter: "2/2 selected" (appears when at 2)
Buttons (side by side or stacked):
[Back]  [Submit]
```

Specs:
- Exactly 3 options: Lunch, Dinner, Drinks
- User must select exactly 2
- Back button goes to time picker (editable)
- Submit button saves response

Why This Works:
- Reduces redundancy (lunch vs dinner vs drinks is clear distinction)
- Allows non-alcohol options (lunch)
- Narrows venue search (AI can match activity to restaurant type)

**Step 4: Response Locked In**

Screen: Response Confirmation — Locked In

Layout:
```
Icon: ✓ checkmark (teal/success color #6BB6A0)

Header: "You're locked in!"
Subheader: "Your availability is saved. We'll let you know once
everyone's responded and we've found a match."

Selected times (summary):
Sun, 2 Mar · Dinner (5pm-9pm)
Sat, 7 Mar · Dinner (5pm-9pm)
Fri, 13 Mar · Drinks (5pm+)

Selected activities (summary):
🍷 Drinks
🍴 Dinner

Waiting for others:
"[Waiting for 2 people to respond]"
"Deadline: 47h 32m left"

Buttons:
[See who's responded]  [Back to home]
```

Specs:
- Shows what user submitted (read-only)
- Shows countdown timer to deadline (live-updating)
- Shows progress (X responded, Y total)
- No editing after submit (locked until next cycle)
- Can still navigate away and come back

**Step 5: Waiting for Crew (Real-Time Updates)**

Screen: Waiting for Responses

Layout:
```
Header:
- Group name: "Uni Friends"
- "Waiting for the crew"
- "2 people haven't responded yet"

Deadline box (prominent, teal background):
Deadline closes in 27h 52m
After this, we'll match with whoever responded

Progress: "2/4 responded" (or "3/4", "4/4")

Responded list:
[Avatar A] Alex        ✓ Responded
[Avatar J] Jordan      ✓ Responded
[Avatar ?] Waiting...  ⏳ Pending
[Avatar ?] Waiting...  ⏳ Pending

Demo/Testing Button (gray, secondary):
[Demo - Skip to matching]

Navigation: Back button to home (can check on it later)
```

Specs:
- Live-updates who responded (polling or websocket)
- Countdown timer (live)
- Shows names of who responded, initials/avatars for others
- "Pending" status for those who haven't
- If user closes app/navigates away, can come back and see progress
- No editing responses after submit

**Step 6: Auto-Matching (Happens at 48h Deadline)**

Logic:
- At 48h deadline, system auto-matches regardless of who responded
- Those who didn't respond = assumed "can't make it" (not sent invites, not matched)
- Find overlapping time slots across respondents only
- Find most popular activity choice
- If overlap found → proceed to venue search
- If no overlap → show "No Overlap" error screen (see Error States)

Data:
- Compare time slots across respondents
- Time slot with most respondents selected = match
- If tie: pick earliest date
- Activities: pick activity that appears in majority of selections
- If tie: pick option 1 (Lunch > Dinner > Drinks)

---

### FLOW 4: MATCH FOUND → BOOKING

**Step 7: Match Results (Success Case)**

Screen: Match Found — You're Going Out

Layout:
```
Header: "Match found!"

Big announcement: "You're going out"

Match details (summary box):
Date: Saturday, 15 March
Time: Dinner (7pm-9pm)
Activity: 🍴 Dinner

Info box (taupe background, #8B8680):
"👉 You've been chosen to book! Pick a venue below."

Venue options (3 cards, scrollable if needed):
---
[The Ivy]
Modern European · £££ · 0.4 miles
⭐⭐⭐⭐⭐ 4.7 (842 reviews)
Available
[Book on OpenTable →]
---
[Dishoom]
Indian · ££ · 0.7 miles
⭐⭐⭐⭐⭐ 4.8 (1204 reviews)
Available
[Book on OpenTable →]
---
[Hawksmoor]
Steakhouse · ££££ · 1.1 miles
⭐⭐⭐⭐⭐ 4.6 (631 reviews)
Available
[Book on OpenTable →]
---
```

Specs:
- Show matched date/time/activity clearly
- Highlight that THIS USER is the booker
- Show 3 venue options with: Name, cuisine type, price range, distance, star rating + review count, "Available" status, external link to OpenTable
- User clicks "Book on OpenTable →" → Opens OpenTable in new tab (external)
- User completes booking on OpenTable
- User returns to app (manually or via back button)

**Step 8: Confirm Booking**

Screen: Booking Confirmation

Layout:
```
Header: "Confirm the booking"
"Did you complete the reservation on OpenTable?"

Match details (reference):
Date: Saturday, 15 March
Time: Dinner (7pm-9pm)
Activity: 🍴 Dinner
Party size: 4 people

Form inputs:
1. Venue name (dropdown or text):
   "Which venue did you book?"
   [The Ivy ▼] (pre-populated if clicking from venue card)

2. Confirmation number (optional):
   "OpenTable confirmation number (optional):"
   [e.g., 12345 or 120358947____________]

3. Time confirmation (if different from matched):
   "What time is your reservation?"
   [7:00 PM ▼] (defaults to matched time, editable if needed)

Buttons:
[Yes, I've booked] (coral, full width)
[Something went wrong - try again] (secondary)
```

Specs:
- Pre-fill venue name if coming from venue selection
- Confirmation # is optional (helpful for records)
- Time defaults to matched time (can be changed if restaurant only had alternate time)
- "Yes, I've booked" triggers calendar invite sending

**Step 9: Success — Invites Sent**

Screen: Booking Success

Layout:
```
Icon: ✓ checkmark (teal/success color #6BB6A0)

Header: "It's booked!"
"Calendar invites are on their way to everyone in the group."

Confirmation details:
Date: Saturday, 15 March
Time: Dinner (7pm-9pm)
Activity: 🍴 Dinner
Venue: The Ivy, Modern European · 0.4 miles

Success messages (green/teal background):
✓ Calendar invites sent to 4 members
✓ OpenTable reservation confirmed

Optional detail:
Confirmation #: 12345
Reservation under: Róisín Benson

Buttons:
[Back to home]
```

Specs:
- Celebratory tone
- Confirms invites are sent
- Shows venue details for reference
- Confirmation number visible
- One button to return home

---

### FLOW 5: CANCELLATION (I CAN'T MAKE IT)

**When User Can Cancel:**
- After match found but before hangout date
- During the hangout itself (to inform booker immediately)

**Screen: Can't Make It**

Entry point: From group home screen or event details

Layout:
```
Header: "Can't make it?"
"Let the group know so [Booker Name] can adjust the booking if needed."

Event details (what they're cancelling):
Saturday, 15 March · 7pm
The Ivy, Modern European
4 people

Options:
1. [Cancel & Notify Group] (coral button)
2. [Back] (secondary)

Optional: Reason (optional dropdown, for feedback):
[ ] I got sick
[ ] Plans changed
[ ] I forgot
[ ] Other

Confirmation (after clicking cancel):
"You've cancelled. [Booker Name] has been notified."
[Understand]
```

Specs:
- Clear, not accusatory tone
- Shows event they're cancelling
- One-click cancellation
- Triggers notification to booker immediately

**Booker Receives Cancellation Notification**

Screen: Someone Can't Make It

When booker opens app after someone cancels:

```
Alert/Notification (top of screen, warning color #D4A574):
"⚠️ [Friend Name] cancelled their spot"

Details:
Event: Saturday, 15 March · 7pm · The Ivy
Cancellation count: 1/4 people cancelled

Actions:
[View options]  [Dismiss]
```

If they tap [View options]:
```
Header: "Someone can't make it"
"[Friend Name] won't be able to come to The Ivy on Saturday."

Current booking:
The Ivy
Saturday, 15 March · 7pm
Party size: 3 people (was 4, now 1 cancelled)
Confirmation #: 12345

Options:
[Contact OpenTable to adjust] (external link or copy confirmation #)
[Invite someone else] (if group allows)
[It's fine, we'll manage] (dismiss)
```

Specs:
- Booker gets notification immediately
- Can contact OpenTable to adjust party size
- Clear action items (not just "someone cancelled")

---

### FLOW 6: HOME SCREEN (VARIOUS STATES)

**State 1: Between Cycles (Idle)**
```
Header:
Logo: "nudge" (coral)
Avatar: [User initial or profile pic] (top right)

Section: Your Groups
Subtitle: "Nudge fires every 6 weeks to keep plans coming."

Group card 1:
[Uni Friends]
4 members · Last hangout 28 Jan
Next nudge: 12 days · 11 Mar
[View group]

Group card 2:
[Work Crew]
3 members · Last hangout 13 Jan
Next nudge: 3 days · 2 Mar
Responses in: 2/3
[Respond now] (button, if nudge is active)

Button (bottom):
[+ Create new group]
```

Specs:
- Shows all groups user is in
- Sorted by "next nudge" (soonest first)
- Shows member count, last hangout date
- If nudge is active, shows "Respond now" button
- Each group is clickable to view details

**State 2: Nudge Active (48h Response Window)**

Same as above, but group card shows:
```
[Work Crew]
3 members · Last hangout 13 Jan
Next nudge: NOW (or "Active")
Responses in: 2/3
⏱️ 42 hours left
[Respond now] (coral button, prominent)
```

**State 3: Hangout Scheduled (After Match)**

Group card shows:
```
[Work Crew]
3 members · Last hangout 13 Jan
🎉 Hangout scheduled!
Saturday, 15 March · 7pm
The Ivy, Modern European
[View details]  [Can't make it]
```

**State 4: Empty State — No Groups**
```
Icon: [Simple illustration, empty circle or question mark]

Header: "No groups yet"
"Create a group and invite your friends to start planning hangouts."

Subheader: "Nudge sends automatic reminders every 6 weeks so you
actually hang out. No more 'when are we free?' texts."

Buttons (stacked):
[+ Create new group]
[Join existing group]
```

---

### FLOW 7: GROUP DETAILS & SETTINGS

**Screen: Group Details**

Access: Tap on group from home screen

Layout:
```
Header: [Group Name] (editable if user is creator)
Members: 4

Sections:

1. MEMBERS
Avatar + Name:
[A] Alex · Creator
[J] Jordan
[P] Priya
[R] Róisín (You)

2. NEXT HANGOUT (if scheduled)
Saturday, 15 March · 7pm
The Ivy, Modern European
[View calendar invite]  [Can't make it]  [Add to phone calendar]

3. PAST HANGOUTS (if any)
28 Jan - The Ivy
13 Jan - Dishoom

4. GROUP SETTINGS
Button: [Settings] (gear icon, top right or in menu)
```

**If user taps [Settings]:**
```
Header: Group Settings

1. GROUP NAME (Creator only)
"Uni Friends"  [✏️ Edit]
  If editing:
  Input field: [Uni Friends_____________]
  [Save]  [Cancel]

2. CYCLE (Creator only)
"Every 6 weeks"  [Change cycle]
  If changing:
  Dropdown: Every 4 weeks / Every 6 weeks / Every 8 weeks
  [Save]  [Cancel]

3. INVITE MORE FRIENDS
"Add more people to this group"
[Invite friends]

4. YOUR ROLE
"You are a member" (or "Creator")

5. DANGER ZONE
[Leave group] (red/error color)
  Confirmation if they tap [Leave group]:
  "Are you sure? You'll be removed from [Group Name]."
  [Yes, leave]  [Cancel]
```

Specs:
- Only group creator can edit group name and cycle
- Any member can invite more friends
- Any member can leave
- Leaving removes them from group, they won't receive future nudges
- If creator leaves, group still exists (no reassignment for MVP)

---

### FLOW 8: USER PROFILE & SETTINGS

**Screen: Profile**

Access: Tap avatar from home screen

Layout:
```
Header: "Profile"

1. PROFILE PICTURE
[Profile pic or avatar]
[Upload photo]

2. NAME
"Róisín Benson"  [✏️ Edit]
  If editing:
  First name: [Róisín________]
  Last name: [Benson________]
  [Save]  [Cancel]

3. EMAIL
"róisín@example.com"  [✏️ Edit]
  If editing:
  Email: [róisín@example.com_________]
  [Save]  [Cancel]
  (Note: Changing email may require re-verification)

4. PASSWORD
[Change password]
  If changing:
  Current password: [__________]
  New password: [__________] (min 8 chars)
  Confirm: [__________]
  [Save]  [Cancel]

5. NOTIFICATIONS
"Push notifications: [Toggle ON/OFF]"
"Email reminders: [Toggle ON/OFF]"
"2-hour response reminders: [Toggle ON/OFF]"

6. ACCOUNT
[Delete account]
  If deleting:
  "Are you sure? This cannot be undone.
  You'll be removed from all groups."
  [Yes, delete]  [Cancel]
```

Specs:
- All fields editable
- Password change requires current password verification
- Email change may require re-verification
- Account deletion is permanent
- Notifications can be toggled granularly

---

## ERROR STATES

### ERROR 1: No Availability Overlap

Screen: Match Results — No Overlap

Layout:
```
Header: "Oops! No overlap"
"Everyone's got different schedules this round."

Warning box (yellow/warning color #D4A574):
"No one's available at the same time."

Options (as buttons, stacked):

1. [View responses] → Shows who picked what times
   "Who picked what times:"
   Alex: Sat 7pm, Sun 3pm
   Jordan: Fri 7pm, Sun 10pm
   Priya: Sat 3pm, Sun 7pm
   [Close]

2. [Pick closest match]
   Shows: "Best available: Saturday 7pm (3/4 people)"
   Asks: Proceed with this time anyway?
   [Yes, let's do it]  [No, reschedule]

3. [Reschedule]
   "Let's try again in 6 weeks."
   [Close]

Footer: "Next nudge: March 11"
```

Specs:
- Don't shame users ("Oops!" not "Failed!")
- Give options (view, pick best, wait)
- Show who picked what (transparency)
- Can proceed with partial match if they want

### ERROR 2: No Venues Available

Screen: Match Results — No Venues Found

Layout:
```
Header: "We found a time but..."
"No restaurants available Saturday 15 Mar at 7pm"

Info box (error color #C85C3C):
"This spot's popular! Try another time or book manually."

Options:

1. [Pick a different time]
   If multiple times had matched (second/third choice):
   "Try a different time slot:"
   ☐ Saturday 7pm (no availability)
   ☑ Saturday 8:30pm (6 options available)
   ☐ Sunday 7pm (12 options available)
   [Use this time]

   If no other options:
   "Only one time was available. Try manual booking instead."

2. [Manual booking]
   Shows instructions:
   "You're the booker. Here's what to do:"

   1. Go to OpenTable.com or app
   2. Search for: Saturday 15 Mar, 7pm, 4 people, Dinner
   3. Book a restaurant
   4. Return here with confirmation details

   [Open OpenTable]  [I've booked, confirm here]

   If they tap [I've booked, confirm here]:
   → Takes them to Booking Confirmation screen

3. [Try next cycle]
   "Let's reschedule for our next hangout in 6 weeks."
   [Close]

Footer: "We'll try again in 6 weeks"
```

Specs:
- Clear explanation (why it failed)
- Multiple paths forward
- Manual booking as fallback
- Not a dead-end

### ERROR 3: Venue Fully Booked (After Manual Booking)

Scenario: Booker goes to OpenTable, venue is fully booked, no times available

Screen: Manual Booking — Venue Full

Layout:
```
Header: "That venue is fully booked"
"The Ivy doesn't have availability for 4 people on Saturday 15 Mar at 7pm"

Options:

1. [Try a different time]
   Same time, different restaurant:
   [Search OpenTable for alternatives]

2. [Try a different restaurant]
   Same time, you find different venue:
   [Search OpenTable]

3. [Contact us for help]
   "Email: support@nudge.app"

Footer: "You can still book manually and come back to confirm."
```

Specs:
- Not an error on user's part
- Give alternatives
- Don't trap them

### ERROR 4: Generic Error (Network, DB Failure)

Screen: Error — Something Went Wrong

Layout:
```
Icon: ⚠️ or generic error symbol

Header: "Oops, something went wrong"
"We couldn't complete that action."

Optional details:
"Error: [Technical error message]"
(Only show if in dev mode; hide in production)

Buttons (stacked):
[Try again]
[Go back]
[Contact support]
```

Specs:
- Generic, covers all failure cases
- Friendly tone
- Clear next steps

---

## EMPTY STATES

### EMPTY STATE 1: Home — No Groups

See Flow 6, State 4.

### EMPTY STATE 2: Group — Between Cycles

Screen: Group Home — Idle

Layout:
```
Group header: "Uni Friends"  4 members

Next nudge section:
📅 Next nudge in 12 days (March 11)

Reassurance text:
"Nudge will send a reminder on March 11 to plan your next hangout.
No action needed until then!"

Optional sections:
[View past hangouts]  (if history exists)
[Invite more friends]
[View settings]
```

Specs:
- Reassuring, not empty
- Shows what's coming
- Gives options to do other things (invite, view history)

### EMPTY STATE 3: Group — First Hangout Scheduled

Screen: Group Home — First Hangout Coming

Layout:
```
Group header: "Work Crew"  3 members

Upcoming hangout: 🎉
"Your first hangout is coming!"

Event details:
Saturday, March 15 · 7pm
The Ivy, Modern European

Buttons:
[View details]  [Add to calendar]  [Can't make it]
```

Specs:
- Celebratory tone
- Shows event details
- Quick actions

### EMPTY STATE 4: Profile — First Time Setting Up

Screen: Profile — Incomplete

If user hasn't added photo or full details:
```
Header: "Profile"

Reminder (subtle, not aggressive):
"Looks like your profile isn't complete yet. Add a photo so
friends can recognize you in the group!"

[Complete your profile]
```

Or just show profile form with optional fields highlighted.

---

## NOTIFICATIONS STRATEGY

| Event | Channel | Message | Timing |
|---|---|---|---|
| Nudge reminder | Push + Email | "Time to plan a hangout! 48 hours to respond" | When cycle starts (T+0) |
| 2-hour warning | Push (optional) | "2 hours left! Pick your availability for [Group]" | T+46h |
| All responded | Push | "Everyone responded! Match coming soon." | At 48h deadline |
| Match found | Push + Email | "Your hangout is on! [Date] at [Venue]" | T+48h when match happens |
| Someone cancelled | Push | "[Friend] can't make it. Tap to see options." | Immediately when cancelled |
| Hangout tomorrow | Push | "Don't forget! Hangout tomorrow at 7pm at The Ivy" | Day before at 9am |
| Friend joined group | Push | "[Friend] accepted your invite to join [Group]" | Immediately when accepted |
| Invited to group | Email + In-app | "[Friend] invited you to join [Group]" | When invite sent |

**User Control** — users can toggle:
- Push notifications (all)
- Email reminders (core events)
- 2-hour response reminders (granular)

---

## DESIGN SYSTEM (COMPLETE)

### Colors

**Base:**
| Role | Hex |
|---|---|
| Background | `#0F0F0F` |
| Surface | `#1A1A1A` |
| Text Primary | `#FFFFFF` |
| Text Secondary | `#CCCCCC` |
| Borders | `#333333` |

**Warm Accents:**
| Role | Hex |
|---|---|
| Coral (Primary) | `#E85D4D` |
| Mauve (Secondary) | `#A88FA0` |
| Taupe (Tertiary) | `#8B8680` |

**Functional:**
| Role | Hex |
|---|---|
| Success | `#6BB6A0` |
| Warning | `#D4A574` |
| Error | `#C85C3C` |
| Disabled | `#444444` |

**Time of Day Icons (suggested):**
- Lunch: 🍽️ or ☀️ (gold)
- Dinner: 🍴 or 🌙 (soft gold)
- Drinks: 🍷 or 🌙 (purple/pink)

### Typography

Font Stack:
```
-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif
```

| Element | Size | Weight |
|---|---|---|
| Logo "nudge" | Poppins Bold, 40px, `#E85D4D` | Bold |
| Tagline | Poppins Regular, 16px, `#CCCCCC` | Regular |
| Headings (H1) | 28-32px | 600 |
| Headings (H2) | 20-24px | 600 |
| Body text | 16px, line-height 1.5 | 400 |
| Small/Caption | 12-14px | 400 |
| Button text | 16px | 600 |
| Labels | 14px | 500 |

### Components

**Buttons:**
- Height: 48px (all buttons)
- Padding: 12px vertical, 20px horizontal
- Width: Full-width minus 16px margins (= 358px on 390px frame)
- Corner radius: 8px
- Font: 16px, 600 weight

**Button Variants:**

```
Primary (Coral):
- Default:  #E85D4D bg, #FFFFFF text
- Hover:    #F06E5E bg
- Active:   #D94A38 bg
- Disabled: #444444 bg, #999999 text

Secondary (Mauve):
- Default:  #A88FA0 bg, #FFFFFF text
- Hover:    #B99EB0 bg
- Active:   #9A7A92 bg
- Disabled: #444444 bg, #999999 text

Tertiary (Taupe):
- Default:  #8B8680 bg, #FFFFFF text
- Hover:    #9A9590 bg
- Active:   #7D7570 bg
- Disabled: #444444 bg, #999999 text

Ghost (Outline):
- Default:  transparent, #E85D4D text, 2px #E85D4D border
- Hover:    rgba(232,93,77,0.1) bg
- Active:   rgba(232,93,77,0.2) bg
- Disabled: transparent, #999999 text, 2px #666666 border

Success (Green):
- Default:  #6BB6A0 bg, #FFFFFF text
- Hover:    #7CC9B3 bg
- Active:   #5A9F8F bg
```

**Form Elements:**
- Input height: 48px
- Input padding: 12px
- Input bg: `#0F0F0F`
- Input border (default): 2px `#333333`
- Input border (focus): 2px `#E85D4D`
- Input focus ring: subtle, `rgba(232,93,77,0.1)`
- Corner radius: 8px
- Font: 16px (prevents zoom on mobile)

**Cards:**
- Background: `#1A1A1A`
- Border: 1px `#333333` (optional)
- Padding: 16px
- Corner radius: 12px

**Spacing:**
- Base unit: 8px
- Standard gaps: 8, 16, 24, 32, 40, 48px
- Edge margins: 16px (left/right)
- Top margin (below header): 20-24px
- Between sections: 24-32px

### Mobile Frame
- Width: 390px
- Height: 844px
- Safe area top: 47px
- Safe area bottom: 34px
- Grid: 4 columns, 16px margins, 12px gutters
- Usable width: 358px

---

## KEY DECISIONS SUMMARY

### Onboarding & Invites
- Email invites with link (not shareable code, for simplicity)
- New users can't join without account (required for notifications)
- 2-6 people recommended per group (for easier OpenTable booking)

### Time Selection
- Lunch (11am-3pm), Dinner (5pm-9pm), Drinks (5pm+)
- Weekends only (Fri/Sat/Sun)
- Select 3 concrete time slots (date + time together, not separate)
- No editing after submit (locked for 48h cycle)

### Activities
- Exactly 3 options: Lunch, Dinner, Drinks
- Users pick exactly 2
- Eliminates redundancy (no "Food & Drinks" as separate option)
- Allows non-alcohol option (Lunch)

### Matching
- Auto-match at 48h deadline
- Non-respondents assumed "can't make it" (not included in match)
- No second/third choice matching (simplicity for MVP)
- If no overlap: show "no overlap" error, give options

### Booking
- One person randomly assigned to book
- AI searches OpenTable, shows 3 options
- Booker clicks link, books on OpenTable (external)
- Manual confirmation in app (user confirms they booked)
- Invites sent only after confirmation
- No automatic booking (friction accepted, complexity avoided)

### Rescheduling
- If venue fully booked: show error, suggest alternatives
- Booker can contact OpenTable directly to adjust
- Booker can invite someone else (if group allows)
- No auto-rescheduling (manual process for MVP)

### Cancellations
- User can cancel anytime after match
- Booker gets immediate notification
- Booker can contact OpenTable to adjust party size
- Cancelled user not sent calendar invite

### Responses
- Locked after submit (no editing until next cycle)
- Can swap selections before submit
- Visible to user only (hidden from group until match)

### Cycles
- Default: 6 weeks
- Group creator can change (to 4 or 8 weeks)
- Customizable anytime in group settings

### User Management
- Group creator can edit group name + cycle
- Any member can leave
- Any member can invite new friends
- Member list visible to group
- Multiple groups supported

---

## SCREENS TO BUILD (COMPREHENSIVE LIST)

### Onboarding Flow
1. Sign up (email)
2. Secure account (password)
3. Create group
4. Invite friends
5. Onboarding complete → home

### Invited User Flow
1. Invite email (template)
2. You've been invited (app screen)
3. Accept/decline
4. Land in group home

### Response Cycle
1. Home screen (various states)
2. Nudge notification
3. Pick 3 time slots
4. Pick 2 activities
5. Response locked in
6. Waiting for responses (real-time)

### Matching & Booking
1. Match found (you're the booker)
2. Booking confirmation
3. Success (invites sent)

### Cancellation
1. Can't make it (user cancels)
2. Booker notification (someone cancelled)

### Group Management
1. Group details
2. Group settings

### Profile
1. User profile
2. Profile settings

### Error States
1. No availability overlap
2. No venues found
3. Generic error

### Empty States
1. Home - no groups
2. Group - idle
3. Group - first hangout coming

---

## NICE-TO-HAVES (POST-MVP)

- Photo upload to profile
- Emoji reactions to hangouts
- Group chat/commenting
- Activity history & stats
- Sharing stats (e.g., "we've hung out 12 times")
- Dark mode toggle (currently dark mode only)
- Recurring groups (e.g., monthly book club)
- Budget/cost tracking
- Dietary restrictions/preferences
- Calendar sync to Google/Apple Calendar
- SMS reminders (in addition to push/email)
- Offline capability

---

## TECHNICAL NOTES FOR CLAUDE CODE

### MVP Scope (Prototype)
- Frontend only: React components
- No real database: mock data + state
- No real auth: fake login/signup
- No real notifications: manual trigger for testing
- No real OpenTable: mock API responses
- No scheduling service: manually trigger matching

### Phase 2 (Real Backend, Post-MVP)
- User authentication (email/password)
- Database (users, groups, responses, bookings)
- Real OpenTable API integration
- Scheduled jobs (cycle triggers, reminders)
- Email service (SendGrid, Mailgun)
- Push notifications (Firebase, OneSignal)
- Matching algorithm (serverless function)
- Calendar invite generation (iCal format)

### Component Structure

```
components/
├── Auth/
│   ├── SignUp.jsx
│   ├── SecureAccount.jsx
│   └── Login.jsx
├── Onboarding/
│   ├── CreateGroup.jsx
│   ├── InviteFriends.jsx
│   └── OnboardingComplete.jsx
├── Home/
│   ├── Home.jsx
│   ├── EmptyHome.jsx
│   └── GroupCard.jsx
├── Response/
│   ├── TimeSlotPicker.jsx
│   ├── ActivityPicker.jsx
│   ├── ResponseConfirmation.jsx
│   └── WaitingForResponses.jsx
├── Matching/
│   ├── MatchResults.jsx
│   ├── VenueSelection.jsx
│   ├── BookingConfirmation.jsx
│   └── BookingSuccess.jsx
├── Cancellation/
│   ├── CantMakeIt.jsx
│   └── BookerNotification.jsx
├── GroupDetails/
│   ├── GroupDetails.jsx
│   ├── GroupSettings.jsx
│   └── MembersList.jsx
├── Profile/
│   ├── Profile.jsx
│   └── ProfileSettings.jsx
├── Errors/
│   ├── NoOverlapError.jsx
│   ├── NoVenuesError.jsx
│   └── GenericError.jsx
└── ...
```

### Data Models

```js
// User
{
  id: "user-123",
  email: "roisin@example.com",
  name: "Róisín Benson",
  photoUrl: null,
  createdAt: "2025-02-27"
}

// Group
{
  id: "group-456",
  name: "Uni Friends",
  creatorId: "user-123",
  members: ["user-123", "user-456", "user-789"],
  cycleWeeks: 6,
  nextNudgeDate: "2026-03-11",
  createdAt: "2026-02-01"
}

// Response (during cycle)
{
  id: "response-789",
  groupId: "group-456",
  userId: "user-123",
  timeSlots: [
    { date: "2026-03-01", timeSlot: "dinner" },
    { date: "2026-03-08", timeSlot: "drinks" },
    { date: "2026-03-15", timeSlot: "dinner" }
  ],
  activities: ["dinner", "drinks"],
  submittedAt: "2026-02-27T14:30:00Z"
}

// Hangout (after match)
{
  id: "hangout-999",
  groupId: "group-456",
  matchedDate: "2026-03-15",
  matchedTime: "dinner",
  matchedActivity: "dinner",
  bookerId: "user-456",
  venue: {
    name: "The Ivy",
    cuisine: "Modern European",
    address: "...",
    opentableId: "...",
    confirmationNumber: "12345"
  },
  attendees: ["user-123", "user-456", "user-789"],
  cancelledUsers: [],
  inviteSentAt: "2026-02-27T19:00:00Z",
  createdAt: "2026-02-27T19:00:00Z"
}
```

---

## SUCCESS CRITERIA (MVP)

- User can sign up and create a group
- User can invite friends via email
- Invited users can accept invite and join group
- User receives nudge notification
- User can respond with 3 time slots + 2 activities
- Response is locked in (no editing)
- User can see waiting screen with live updates
- System auto-matches at 48h deadline
- Match shows result (date/time/activity)
- Booker sees 3 venue options (mock OpenTable)
- Booker confirms booking
- Calendar invites are sent (mocked)
- User can cancel hangout
- Booker is notified of cancellation
- User can view group details
- User can leave group
- User can change profile settings
- Error states show (no overlap, no venues, generic errors)
- Empty states show (no groups, idle group, etc.)
- All screens match design system
- Mobile responsive (390px base)
- Dark mode throughout
- Interactions are smooth and intuitive
