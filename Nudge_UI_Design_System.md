# Nudge UI Design System
## Complete Reference for Claude Code Implementation

---

## CRITICAL PRINCIPLES

Before building ANY component, internalize these:

1. **Restraint:** Every element must earn its place. Monochrome + one accent = sophistication. Trust the constraint.
2. **Clarity:** Typography does 80% of the work. One hero per view. Clear hierarchy = scannable.
3. **Craft:** Consistent 8pt spacing creates unconscious trust. Details compound: 100 perfect micro-interactions feel like quality.
4. **Minimalism:** Remove friction, not features. Speed IS design. Every click eliminated is a win.

---

## PART 1: DESIGN TOKENS

### 1.1 Spacing Scale (8pt Grid)

```css
--space-2xs: 4px    /* Icon-to-text gap, tight internal spacing */
--space-xs: 8px     /* Related elements, compact padding */
--space-sm: 12px    /* Form field padding, small gaps */
--space-md: 16px    /* Default padding, paragraph spacing */
--space-lg: 24px    /* Section padding, card spacing */
--space-xl: 32px    /* Component separation */
--space-2xl: 48px   /* Section breaks */
--space-3xl: 64px   /* Major section separation */
--space-4xl: 96px   /* Page-level spacing */
--space-5xl: 128px  /* Full-bleed section separation */
```

**THE CRITICAL RULE: Internal <= External**
- Card padding: 16px
- Gap between cards: 24px (MUST be >= padding)
- Label-to-input gap: 4–6px
- Field-to-field gap: 16–24px (MUST be > label-to-input)

When internal spacing exceeds external, elements feel disconnected from their containers.

---

### 1.2 Typography System

**Type Scale (1.200 ratio, 16px base):**

| Role | Size | Weight | Line Height | Letter Spacing | Use Case |
|---|---|---|---|---|---|
| Caption | 11px | 400 | 16px | +0.02em | Helper text, timestamps |
| Small | 13px | 400 | 20px | +0.01em | Labels, secondary text |
| Body | 16px | 400 | 24px | 0 | Default body text |
| Body Large | 19px | 400 | 28px | 0 | Prominent body text |
| Heading 5 | 23px | 600 | 28px | -0.01em | Small headings |
| Heading 4 | 28px | 600 | 36px | -0.02em | Medium headings |
| Heading 3 | 33px | 600 | 40px | -0.02em | Section headings |
| Heading 2 | 40px | 700 | 48px | -0.03em | Page headings |
| Heading 1 | 48px | 700 | 56px | -0.03em | Hero headings |

**Font Stack:**
```
-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
```

**Line Height Rules:**
- Body text (14–18px): 1.4x–1.6x line height (snap to 4px grid)
- Headings (20–48px): 1.1x–1.3x
- All line heights must snap to 4px grid: 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56

**Letter Spacing Rules:**
- Small text (< 14px): +0.01em to +0.03em
- Body (14–18px): 0
- Large (20–40px): -0.01em to -0.02em
- Display (40px+): -0.03em to -0.04em

---

### 1.3 Color System

**Dark Mode (MVP Focus)**

Base Neutrals:
```css
--color-neutral-50: #0F0F0F    /* Page background — darkest */
--color-neutral-100: #1A1A1A   /* Card background */
--color-neutral-200: #262626   /* Elevated surface */
--color-neutral-300: #333333   /* Strong borders/hover */
--color-neutral-400: #525252   /* Disabled text */
--color-neutral-500: #737373   /* Tertiary text */
--color-neutral-600: #A3A3A3   /* Secondary text */
--color-neutral-700: #D4D4D4   /* Primary text */
--color-neutral-800: #E5E5E5   /* Off-white — main text */
--color-neutral-900: #FAFAFA   /* Near white */
```

Primary Coral:
```css
--color-primary-300: #F9C5BD
--color-primary-400: #F5A89F
--color-primary-500: #E85D4D   /* Primary interactive */
--color-primary-600: #F06E5E   /* Hover — 8% lighter */
--color-primary-700: #D94A38   /* Active — 8% darker */
```

Semantic — Success:
```css
--color-success-bg:     #052E16
--color-success-border: #166534
--color-success-text:   #86EFAC
--color-success-icon:   #4ADE80
--color-success-solid:  #22C55E
```

Semantic — Error:
```css
--color-error-bg:     #450A0A
--color-error-border: #991B1B
--color-error-text:   #FCA5A5
--color-error-icon:   #F87171
--color-error-solid:  #EF4444
```

Semantic — Warning:
```css
--color-warning-bg:     #451A03
--color-warning-border: #92400E
--color-warning-text:   #FCD34D
--color-warning-icon:   #FBBF24
--color-warning-solid:  #F59E0B
```

Semantic — Info:
```css
--color-info-bg:     #172554
--color-info-border: #1E40AF
--color-info-text:   #93C5FD
--color-info-icon:   #60A5FA
--color-info-solid:  #3B82F6
```

Semantic Surfaces:
```css
--color-bg-page:     #0F0F0F
--color-bg-card:     #1A1A1A
--color-bg-elevated: #262626
```

Semantic Text:
```css
--color-text-primary:   #E5E5E5   /* Off-white — NEVER use pure #FFFFFF */
--color-text-secondary: #A3A3A3
--color-text-tertiary:  #737373
--color-text-link:      #60A5FA
```

Semantic Borders:
```css
--color-border-default: rgba(255, 255, 255, 0.06)   /* Subtle border */
--color-border-strong:  rgba(255, 255, 255, 0.10)   /* Visible border */
--color-border-muted:   rgba(255, 255, 255, 0.04)   /* Very subtle */
--color-border-focus:   #E85D4D                      /* Focus ring color */
```

**Key Rule: 60-30-10 Ratio**
- 60%: Neutral backgrounds (#0F0F0F page, #1A1A1A cards)
- 30%: Elevated surfaces (#262626, #333333)
- 10%: Accent color (#E85D4D coral for CTAs and key interactions)

---

### 1.4 Shadows & Elevation

Dark mode uses surface elevation, not shadows.

```css
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.2)
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.3), 0 4px 6px rgba(0, 0, 0, 0.2)
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.3), 0 8px 10px rgba(0, 0, 0, 0.15)
--shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.5)

/* Elevation Hierarchy */
--elevation-0: #0F0F0F   /* page background */
--elevation-1: #1A1A1A   /* cards, surfaces */
--elevation-2: #262626   /* elevated components, popovers */
--elevation-3: #333333   /* modals, overlays */
```

---

### 1.5 Border Radius

```css
--radius-0:    0px
--radius-sm:   4px      /* Tight curves */
--radius-md:   6px      /* Buttons, inputs — default */
--radius-lg:   8px      /* Cards, larger components */
--radius-xl:   12px     /* Hero sections, large modals */
--radius-full: 9999px   /* Avatars, pills */
```

**Nested Rule:** Child elements must have smaller radius than parents.
```
Modal (12px) > Button inside (8px) > Icon inside (4px)
```

---

### 1.6 Motion Tokens

```css
--duration-instant: 50ms
--duration-fast:    100ms
--duration-normal:  200ms
--duration-slow:    300ms
--duration-slower:  500ms

--ease-out:    cubic-bezier(0.16, 1, 0.3, 1)
--ease-in:     cubic-bezier(0.55, 0.085, 0.68, 0.53)
--ease-in-out: cubic-bezier(0.45, 0, 0.55, 1)
--ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275)
```

**Rules:**
- Animate ONLY `transform` and `opacity` (GPU-accelerated)
- Never animate `width`, `height`, `top`, `left`
- Ease-out for entering, ease-in for exiting
- Stagger multiple elements: 50–80ms between each
- Never use linear easing except progress bars

---

### 1.7 Focus & Accessibility

Focus Ring (all interactive elements):
```css
:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px #0F0F0F, 0 0 0 4px #E85D4D;
}
```

**Contrast Requirements:**
- Body text: minimum 4.5:1
- Large text (18px+ or 14px bold): minimum 3:1
- UI components: minimum 3:1

**Touch Targets:**
- Minimum 44×44px for all interactive elements
- Mobile: all buttons/inputs at least 40px height

---

## PART 2: BUTTON SPECIFICATIONS

### Sizing

| Size | Height | H Padding | V Padding | Font Size | Border Radius |
|---|---|---|---|---|---|
| sm | 32px | 12px | 6px | 13px | 6px |
| md | 36px | 16px | 8px | 14px | 6px |
| lg | 40px | 20px | 10px | 15px | 8px |
| xl | 48px | 24px | 12px | 16px | 8px |

Default for Nudge: **xl (48px)** for primary CTAs on mobile.

### Button Hierarchy

**Primary** (one per viewport section):
- Background: `--color-primary-500` (#E85D4D)
- Text: white
- Hover: `--color-primary-600` (#F06E5E)
- Active: `--color-primary-700` (#D94A38) + scale(0.98)
- Disabled: opacity 0.4, cursor not-allowed

**Secondary:**
- Background: transparent
- Border: `1px solid rgba(232, 93, 77, 0.4)`
- Text: `--color-primary-500`
- Hover: `background rgba(232, 93, 77, 0.1)`
- Active: `background rgba(232, 93, 77, 0.2)`

**Tertiary (Ghost):**
- Background: transparent, no border
- Text: `--color-text-primary` (#E5E5E5)
- Hover: `background rgba(255, 255, 255, 0.05)`
- Active: `background rgba(255, 255, 255, 0.10)`

**Destructive:**
- Background: `--color-error-solid` (#EF4444)
- Text: white
- Only for irreversible actions

---

## PART 3: FORM FIELD SPECIFICATIONS

### Input Sizing

| Size | Height | H Padding | V Padding | Font Size | Border Radius |
|---|---|---|---|---|---|
| sm | 32px | 10px | 6px | 13px | 6px |
| md | 36px | 12px | 8px | 14px | 6px |
| lg | 40px | 14px | 10px | 15px | 8px |
| xl | 48px | 16px | 12px | 16px | 8px |

Default for Nudge mobile: **xl (48px)**.

### Field States

| State | Border | Background | Label Color |
|---|---|---|---|
| Default | `--color-border-default` | `--color-bg-card` | `--color-text-secondary` |
| Focused | `--color-primary-500` + glow | `--color-bg-card` | `--color-primary-500` |
| Error | `--color-error-solid` | `--color-error-bg` | `--color-error-text` |
| Disabled | `--color-border-muted` | `--color-bg-muted` | `--color-text-tertiary` |

**Label placement:** Always top-aligned, always visible (never placeholder-only).

---

## PART 4: COMPONENT SPECIFICATIONS

### Cards

- Background: `--color-bg-card` (#1A1A1A)
- Border: `1px solid --color-border-default` (rgba(255,255,255,0.06))
- Border-radius: `--radius-lg` (8px)
- Padding: 16–24px (must be ≤ gap between cards)
- Gap between cards: 24px minimum

**Dark Mode Polish:** The 1px rgba(255,255,255,0.06) top-edge border creates a subtle "lit" appearance that makes dark UIs feel three-dimensional.

### Alerts & Banners

Types: success / error / warning / info

Each uses its semantic bg / text / border / icon tokens.

---

## PART 5: TYPOGRAPHY HIERARCHY

### Usage Rules

- **h1 (28px):** Screen/page heading — one per screen
- **h2 (23px):** Section heading
- **h3 (19px):** Component/card heading
- **Body (16px):** Default body copy
- **Small (13px):** Labels, helper text, secondary info
- **Caption (11px):** Timestamps, metadata

---

## PART 6: DARK MODE SPECIFICS

### Surface Hierarchy (Elevation-Based)

```
Page:     #0F0F0F   — darkest
Card:     #1A1A1A   — elevated
Elevated: #262626   — more elevated
Strong:   #333333   — strongest elevation
```

No shadows in dark mode. Elevation is handled by lighter surfaces.

### Text Colors (Never Pure White)

```
Primary:   #E5E5E5   — off-white, main text
Secondary: #A3A3A3   — muted
Tertiary:  #737373   — weakest
NEVER:     #FFFFFF   — too harsh
```

### Borders: "Light Catch" Effect

```css
border: 1px solid rgba(255, 255, 255, 0.06);   /* default */
border: 1px solid rgba(255, 255, 255, 0.10);   /* hover/focus/strong */
```

This single technique makes dark UIs feel three-dimensional and intentional.

---

## PART 7: DIVIDERS VS WHITESPACE

Default: use whitespace. Dividers add visual noise.

When to use:
- Between fundamentally different content types
- In tables between row groups
- Between sticky header and scrollable content

Divider spec:
```css
height: 1px;
background: rgba(255, 255, 255, 0.06);
margin-inline: 0;  /* full-bleed */
```

---

## PART 8: ICONS

- Stroke weight: **1.5px** or **2px** — choose ONE, never mix
- Gap between icon and label: **6–8px consistently everywhere**
- Style: outline OR solid — never mix in same context
- Icon-only buttons MUST have `aria-label`

---

## PART 9: ANIMATION & MOTION

Only animate GPU-accelerated properties: `transform` and `opacity`.

Never animate: `width`, `height`, `top`, `left`, `background-color`.

| Duration | Use |
|---|---|
| 50–100ms | Micro-interactions, button ripples |
| 150–200ms | Hover, focus transitions |
| 200–300ms | Entering elements (modal, page) |
| 120–200ms | Exiting elements (faster than entering) |

Stagger multiple elements: 50–80ms between each.

---

## PART 10: ACCESSIBILITY REQUIREMENTS

### Focus Rings (Non-Negotiable)

```css
:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px #0F0F0F, 0 0 0 4px #E85D4D;
}
```

### Touch Targets

- Minimum **44×44px** for all interactive elements
- All buttons/inputs: minimum 40px height on mobile

### Color Alone Never Conveys Meaning

- Success: checkmark icon + green color
- Error: error icon + red color + text message

---

## IMPLEMENTATION CHECKLIST

Before submitting ANY screen:

**Spacing**
- [ ] All gaps are 8px multiples (4px only inside components)
- [ ] Internal padding ≤ external gap
- [ ] Label-to-input < field-to-field spacing

**Typography**
- [ ] Font sizes from defined scale: 11, 13, 16, 19, 23, 28, 33, 40, 48px
- [ ] Line heights snapped to 4px grid
- [ ] Letter spacing applied per size rules
- [ ] Off-white text (#E5E5E5), never pure white (#FFFFFF)

**Colors**
- [ ] Semantic colors use proper bg/text/icon variants
- [ ] Text is #E5E5E5, never #FFFFFF
- [ ] Borders are `rgba(255,255,255,0.06)` or stronger
- [ ] Button states verified (hover, active, disabled)

**Components**
- [ ] Buttons: all states (default, hover, active, focus, disabled)
- [ ] Form fields: all states (default, focused, error, disabled)
- [ ] Cards: 1px rgba border, correct padding/gap
- [ ] Icons: consistent stroke, size, gap to labels

**Accessibility**
- [ ] Focus rings on all interactive elements
- [ ] Minimum 44×44px touch targets
- [ ] WCAG AA contrast
- [ ] Labels associated with form inputs
- [ ] Icon-only buttons have `aria-label`

**Animation**
- [ ] Only animating `transform` and `opacity`
- [ ] Ease-out entering, ease-in exiting
- [ ] 150–300ms for standard transitions

---

## DESIGN PRINCIPLES SUMMARY

**Restraint:** Every element earns its place. Monochrome + one accent = sophistication.

**Clarity:** Typography does 80% of work. One hero per view.

**Minimalism:** Remove friction. Speed IS design.

**Craft:** Consistent spacing creates unconscious trust. Details compound.

*This document is the source of truth. Reference it before building every component. When in doubt, choose restraint.*
