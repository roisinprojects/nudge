# Nudge UX Design System
## Complete User Experience Strategy & Psychology Guide for Claude Code

---

## CRITICAL PRINCIPLES

Before building ANY flow or screen, internalize these:

1. **Understand the Human First** — Who, what emotion, what context? Before anything else.
2. **Apply Psychology Systematically** — Every decision should be motivated by human behavior, not convenience.
3. **Design for Edge Cases** — Edge cases are where products either delight or frustrate. Treat them first-class.
4. **Feedback Loops Everywhere** — Every action needs a response. Silence creates anxiety.
5. **Cross-Industry Inspiration** — The best UX solutions often come from completely different domains.

---

## PART 1: TARGET USER & PSYCHOLOGY

### Who is Nudge for?

**Primary User:**
- Busy adults (especially parents) with 2–3 close friend groups
- Value friendships but struggle with scheduling coordination
- Tired of being "the organizer" or anxious about organizing
- Want hangouts to be regular habits, not special events
- Tech-savvy (smartphone primary), prefer mobile solutions
- Live in urban areas with good restaurant options

**Emotional Profile:**
- **Pain:** Coordination friction, social anxiety ("am I bothering them?"), FOMO if plans fall through
- **Need:** Automatic coordination, removal of organizing burden, confidence that plans will happen
- **Desire:** Deepened friendships, regular connection, zero-friction maintenance
- **Secondary feeling:** Relief when plans are confirmed, delight when something they want is planned

**Context:**
- Using phone on the go (commute, lunch break, evening)
- Usually rushed or distracted
- Responding to nudge in 2–3 minute bursts
- Phone is primary interface, desktop secondary

---

### Psychological Lenses to Apply

Every design decision must be motivated by at least one principle:

| Principle | Definition | Nudge Application |
|---|---|---|
| Cognitive Load | Working memory holds ~4 chunks. Design for chunking. | Separate decisions into distinct steps (dates, times, activities) but chunk visually |
| Default Bias | People accept defaults. Make defaults the best option. | Pre-select the most common response time (evening), pre-fill timezone |
| Loss Aversion | "Don't lose your progress" > "Save your progress." | Frame cancellation around losing friends, not losing booking |
| Social Proof | "Most users do this" increases adoption. | Show "4/4 responded" as progress indicator, celebrate streaks |
| Feedback Loops | Humans need immediate response to actions. No silence. | Show "Responding..." → checkmark → next instruction, never dead silence |
| Emotional Matching | Design response should match user emotion. | Anxious → reassurance. Confused → explain. Rushed → quick form. |
| Temporal Discounting | People prioritize immediate over future. | Celebrate THIS hangout, not "6 more will happen" |
| Reciprocity | Give value first, ask later. | Show sample response first, THEN ask user to join |
| Commitment Escalation | Small yeses lead to big yeses. | "Try Nudge" → "Create group" → "Invite friends" |
| Recognition over Recall | Show options, don't make them remember. | Dropdown for time slots, not blank text field |

---

## PART 2: EMOTIONAL STATE MAPPING

Map every screen to the user's emotional state, then design specifically for that state:

| Screen | User Emotion | What They Fear | Design Response | Specific Tactics |
|---|---|---|---|---|
| New user landing on invite | Anxious, confused | "Is this legit? Will I regret this?" | Reduce anxiety, explain simply | Show what Nudge IS before asking to join. "No more endless group chats about when to hang." |
| Signup form | Anxious, impatient | "How long is this? Will my data be safe?" | Move fast, show reassurance | 3 fields max. "Your data is private" near sensitive fields. |
| Create group | Overwhelmed | "What's a group? What should I name it?" | Give examples, show defaults | Suggestion: "Your friend group from college" + example groups shown |
| Invite friends | Nervous | "Will they respond? Will they judge me?" | Make it feel natural | "Nudge will send them an invite and explain everything. They'll understand." |
| First response form | **Confused, rushed** | "What am I doing? Why 3 dates? How long?" | **Make it obvious, make it fast** | Explain upfront: "Pick your 3 best times. **Takes 2 minutes.**" Sensible defaults. |
| Waiting for responses | Anxious | "Will people respond? Will we find a match?" | Show progress, set expectations | Live counter: "2/4 responded. Everyone responds by 5pm tomorrow." |
| No overlap error | Frustrated | "This didn't work. Did we fail?" | Acknowledge, offer paths forward | "Everyone's busy this month. Next cycle is Mar 11. Want to try then?" |
| Match found | **Excited, impatient** | "Great! When is it?" | **Celebrate, move to action fast** | Checkmark animation + clear date/time/venue. No extra text. |
| Book on OpenTable | Determined | "I just need to book it." | Clear instructions, reduce steps | "3 restaurants ready. Pick your favorite. You'll book on OpenTable." |
| Booking complete | Relieved, proud | "I made a plan with friends!" | Celebrate, create anticipation | Celebration + timeline. "Sunday 7pm at The Ivy. See you then!" |
| Between hangouts | Content | "When's the next one?" | Show future, maintain connection | "Your next hangout: Mar 29. Reminder goes out on Mar 12." |

---

## PART 3: CROSS-INDUSTRY PATTERNS

### From Restaurant Reservation Systems (OpenTable)
Show what's available upfront, then let user choose. Show match confidence before committing.

### From Fitness Apps (Strava)
Track streaks and milestones. "6 hangouts in a row! 🔥" creates habit and positive reinforcement.

### From Event Planning (Eventbrite)
Guided next steps after completion. After booking: [View event] [Add to calendar] [Share] [Directions]. No dead ends.

### From Doodle
Show live predictions during response window: "Looking good for Saturday! 3/4 available so far."

### From Conversation Design
One question at a time, progressive disclosure. Feels like conversation, not form filling.

### From Medical Appointment Reminders
Escalating reminder strategy: 1 week before → 1 day before → 2 hours before.

---

## PART 4: CONTENT & MICROCOPY STRATEGY

### Button Labels (Verb-First, Outcome-Clear)

| Bad | Good | Why |
|---|---|---|
| "Submit" | "Save response" | Describes what user is doing |
| "Continue" | "Pick times →" | Clear about next action |
| "OK" | "Book at The Ivy" | Specific, outcome-focused |
| "Cancel" | "Can't make it" | Domain-specific |
| "Delete" | "Delete account" (with consequences) | Name what's being destroyed |

### Error Messages (What + Why + What Now)

Template: `[What happened]. [Why]. [What to do]`

| Bad | Good |
|---|---|
| "Invalid input" | "Email must include @ symbol. Please correct and try again." |
| "Error 500" | "We couldn't save your response (server error). Try refreshing or contact support." |
| "No overlap found" | "Everyone picked different times. Try again in 6 weeks or manually coordinate." |
| "Booking failed" | "OpenTable is fully booked at 7pm Sat. Try 6:30pm or 8pm, or pick a different restaurant." |

### Explanatory Copy (Explain the WHY)

```
BAD:  "Pick 3 dates"
GOOD: "Pick your 3 best weekends — we'll find the one that works for everyone."

BAD:  "Pick a time"
GOOD: "When does each day suit you? Your picks stay private until we find a match."

BAD:  "Pick an activity"
GOOD: "What's the vibe? Pick up to 2 — helps us find the right spot."

BAD:  "You're the booker"
GOOD: "You're the booker! We found 3 great restaurants. Pick your favorite and we'll
       book it for you. Takes 2 minutes."

BAD:  "Can't make it?"
GOOD: "Can't make it? Let the group know so we can adjust the party size or find another time."
```

### Empty State Copy (Educate, Don't Just Show Emptiness)

```
GOOD:
  Headline:    "No groups yet"
  Subheading:  "Nudge organizes hangouts automatically every 6 weeks"
  Body:        "Start with your closest friends — Nudge handles the rest"
  CTA:         "+ Create your first group"  /  "Join an existing group"
  Social proof: "1,500+ groups have organized hangouts"
```

### Celebration Copy (Specific, Warm, Forward-Looking)

```
BAD:  "Calendar invites sent"
GOOD: "Done! 🎉 Dinner is on everyone's calendar. Saturday 7pm at The Ivy."

BAD:  "You're locked in"
GOOD: "Locked in! ✓ Your times are saved. Everyone responds by 5pm tomorrow
       — we'll find a match and book a restaurant."

BAD:  "Response submitted"
GOOD: "All saved. We'll match everyone up as responses come in and send you
       results within 48 hours."
```

### Reassurance Copy (Reduce Anxiety)

```
When inviting:      "Your friends will get a friendly invite explaining how Nudge
                     works. No spam."

At signup:          "Your privacy is protected. We only use your email to invite
                     friends and send hangout details."

On form:            "Takes 2 minutes."

At response lock:   "Responses are locked to keep it fair — no one can backtrack
                     based on seeing others' picks."
```

---

## PART 5: EDGE CASE DECISION MATRIX

Every edge case needs a designed flow, not a guess.

| Scenario | Decision | User Experience |
|---|---|---|
| Zero responses | Auto-reschedule, notify group | "No one responded. Let's try again Mar 11." |
| One response | Show to user, offer manual rescheduling | "Only 1 person is available. Reschedule or try next month?" |
| Partial match (3/4) | Ask if user wants to proceed or reschedule | "3/4 are available Sat 7pm. Proceed with 3, or reschedule for all?" |
| Timezone mismatch | Pre-ask timezone in profile, convert times | "Evening" = 6–9pm in their timezone. Set once in profile. |
| User leaves mid-cycle | After matching: party size reduced. Before: treated as non-response. | Booker sees: "Sarah left. Party size now 3. Adjust reservation?" |
| Duplicate submission | Overwrite previous (show confirmation) | "Your response updated. New times: Fri 7pm, Sat 6pm, Sun noon." |
| Stale response (want to change) | Lock after submit | "Responses locked once submitted. Can't change until next cycle." |
| OpenTable booking fails | Booker sees error + alternatives | "Fully booked at 7pm. Try 6:30pm or 8pm, or pick a different venue." |
| Party size > availability | Show constraint to booker upfront | "Largest table available: 6. Your group has 8. Book 6 now?" |
| Browser refresh during response | Save draft progressively | User returns: "Your response was saved. Continue from where you left off?" |
| Very large group (20+) | Warn during creation | "Large groups (15+) take longer to match. Consider sub-groups?" |
| Booker cancels reservation | Notify group immediately | "⚠️ Reservation cancelled! Booker will re-book or reschedule." |

---

## PART 6: FEEDBACK LOOPS & MICRO-INTERACTIONS

Every action needs a response. Silence is bad UX.

| Action | Feedback Type | Implementation |
|---|---|---|
| Button click | Immediate | Press state (scale 0.98, darker color) 80–120ms |
| Form field focus | Immediate | Border color: coral, focus ring visible |
| Form field error | Immediate | Red border + error icon + message slide in |
| Form field valid | Immediate | Green checkmark appears on blur |
| Submit loading | Progress | Spinner replaces text, button disabled |
| Response submission | Completion | "Saving..." → checkmark → "Saved!" |
| Match found | Completion | Checkmark animates in, results fade up with stagger |
| Booking confirmed | Completion | Celebration moment, clear next steps |
| Error | Completion | Error toast with retry + support contact |

---

## PART 7: INFORMATION ARCHITECTURE & NAVIGATION

### Screen Hierarchy

```
Home (all groups)
├── Group [Name]
│   ├── Respond (if active nudge)
│   ├── Upcoming hangout
│   ├── Past hangouts
│   ├── Members
│   └── Settings (creator only)
├── Profile
└── Help
```

### Navigation Principles

- **Consistent placement:** Same actions always in same spot (back button top-left, primary action bottom)
- **Clear labeling:** "Back", "Home", "Settings" — no ambiguity
- **Information scent:** Every button clearly signals what's behind it

---

## PART 8: ONBOARDING

**Goal:** Get new users to first value moment in < 2 minutes.

1. **Welcome (10s):** "Automatic hangouts every 6 weeks." → "Get started"
2. **Signup (30s):** Email + password only. Skip photo. → "Create account"
3. **Photo (15s):** Optional, skippable → "Next"
4. **Create Group (20s):** Suggest names, one input → "Create group"
5. **Invite (30s):** Add emails, skippable → "Send invites"
6. **Welcome (10s):** "Your group is ready. First nudge: [date]." → "Go to home"

**Key Psychology:** Chunking (6 small steps > 1 big form), sensible defaults, clear aha moment ("Your group is ready").

---

## PART 9: TONE MATCHING

| User Emotion | Tone Shift | Example |
|---|---|---|
| Anxious | Reassuring, simple | "Don't worry, your data is safe. You can leave anytime." |
| Excited | Celebratory, energetic | "You're booked! Let's make it amazing." |
| Frustrated | Calm, helpful, apologetic | "Sorry, that didn't work. Here's what we can try..." |
| Confused | Patient, explanatory | "A 'nudge' is just a reminder. No pressure, just a prompt." |
| Rushed | Concise, skip details | "Get started" not "Get started with our 6-week cycle system..." |

---

## PART 10: ACCESSIBILITY (UX LENS)

- **Keyboard:** Tab / Shift+Tab / Enter / Escape / Arrow keys for all core flows
- **Screen readers:** `<label for>`, `aria-label`, `aria-live="polite"` for live regions
- **Motion:** `prefers-reduced-motion` support, important feedback always has non-motion fallback
- **Color independence:** Never color alone — error needs icon + message + color

---

## IMPLEMENTATION CHECKLIST

Before submitting ANY screen:

**UX Completeness**
- [ ] Screen mapped to user emotional state?
- [ ] Every form has sensible defaults?
- [ ] Every action gets feedback (press, submission, error)?
- [ ] Every error has specific message + recovery path?
- [ ] Every empty state educates or guides?
- [ ] Every edge case has designed flow?

**Content Quality**
- [ ] Button labels describe outcomes (verb-first, not "Submit"/"Continue")?
- [ ] Error messages specific (what + why + what now)?
- [ ] Copy matches user emotional state?
- [ ] WHY is explained for every data request?
- [ ] Time expectation given for multi-step flows ("Takes 2 minutes")?

**Delight**
- [ ] Success moments have celebration (not just confirmation)?
- [ ] Loading states show progress?
- [ ] Completion copy is forward-looking (what happens next)?

---

## DESIGN PRINCIPLES SUMMARY

**Understand the human first.** Every decision — from button labels to error messages to edge case handling — should be motivated by psychology, not convenience.

Nudge's strong foundation becomes excellent when enriched with:
1. Systematic emotion matching
2. Comprehensive edge case design
3. Celebration & delight moments
4. Content strategy that explains and guides

*This document is your UX source of truth. Reference it before every screen. When in doubt, choose clarity and empathy.*
