# Blurrr-Style Mobile UI General Design Guidelines (Based on iPhone 14 Pro)

## 1. Canvas & Safe Area

- Device: iPhone 14 Pro (portrait)
- Logical size: `393 × 852`
- Safe Area:
  - Top: `59`
  - Bottom: `34`
- Page content area:
  - Width: `393`
  - Height: `852 - 59 - 34 ≈ 759`
- Horizontal page padding: `16`
- Recommended spacing unit: multiples of `8` (8 / 12 / 16 / 24 / 32)

---

## 2. Layout & Rhythm (Generic)

- Page is composed of multiple **modular cards** stacked vertically.
- Main axis: vertical scroll; keep consistent rhythm between modules.
- Vertical spacing:
  - Between main modules: `16–24`
  - Between child elements inside a module: `8–16`
- Top area (nav / page title):
  - Distance from bottom of top Safe Area: `16`
  - Section height (including padding): `72–80`
- Bottom primary action area:
  - Distance from previous module: `16–20`
  - Distance from top of bottom Safe Area: `16–20`
- Module width:
  - Default: `393 - 2 × 16 = 361`
  - Tips/labels may be shorter but align to the same left/right padding

---

## 3. Generic Component Size Guidelines

### 3.1 Card Components (for any content block)

- Outer frame:
  - Width: `361` (aligned with content width)
  - Corner radius: `24–28` (level-1 modules) / `16` (level-2 modules)
- Inner padding:
  - Vertical: `20`
  - Horizontal: `16`
- Shadow:
  - Level-1 (primary info): `0 18px 40px rgba(0,0,0,0.08)`
  - Level-2 (list items / price cards): `0 10px 24px rgba(0,0,0,0.06)`
- Layout patterns:
  - Single-column: title + subtitle + description + actions
  - Grid: 2–4 columns, column gap `8–12`

### 3.2 Buttons (Primary / Secondary)

- Primary CTA button:
  - Width: full content width (`361`)
  - Height: `52–56`
  - Corner radius: `24–28` (pill)
  - Font size: `16 / Medium`
- Secondary / light buttons:
  - Height: `40–44`
  - Corner radius: `20–22`
  - Font size: `14 / Regular` or `14 / Medium`
- Minimum touch target: `44 × 44`

### 3.3 Icons & Icon Containers

- Main icon size: `32 × 32`
- Secondary icon size: `20–24`
- Icon container:
  - Corner radius: `12–16`
  - Inner padding: `6–8`
- Spacing between icon and text:
  - Vertical layout: `4–6`
  - Horizontal layout: `6–8`

### 3.4 Selection / Checkmarks & Chips

- Checkmark (circle or rounded square):
  - Size: `24 × 24`
  - Radius: `12` or `50%`
- Chip / label:
  - Height: `24–28`
  - Corner radius: `12–14`
  - Horizontal padding: `8–10`
  - Font size: `12`
- Segmented control / toggle:
  - Track height: `32`
  - Radius: `16` (pill)
  - Label font size: `14`

---

## 4. Typography System

- Font family (example):
  - `-apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", sans-serif`

- Sizes & semantics:
  - H1 (main page title / key info):
    - Size: `24`
    - Weight: `Semibold`
    - Line height: `30–32`
  - H2 (section / module title):
    - Size: `20`
    - Weight: `Semibold`
    - Line height: `28`
  - H3 (sub-title / label title):
    - Size: `16`
    - Weight: `Medium`
    - Line height: `22–24`
  - Body 1 (primary body text):
    - Size: `14`
    - Weight: `Regular`
    - Line height: `20–22`
  - Body 2 (secondary / helper text):
    - Size: `12`
    - Weight: `Regular`
    - Line height: `16–18`

- Alignment rules:
  - Main titles left-aligned with content left edge.
  - Numbers / prices can be right-aligned to emphasize comparison.
  - Multi-column info aligns vertically with equal column widths.

---

## 5. Color System 

### 5.1 Base Colors

- Background gradient:
  - Top: `#DFFFD5`
  - Bottom: `#F8FFF5`
- Primary card background: `#FFFFFF`

### 5.2 Brand & Accent Colors

- Primary (neon green): `#B9FF46`
- Primary dark (pressed / hover): `#86E322`
- Accent orange (badges / deals): `#FFB55B`
- Accent purple (decoration / secondary emphasis): `#B37DFF`

### 5.3 Text & Lines

- Primary text: `#111111`
- Secondary / helper text: `#777E8C`
- Inverted text (on colored buttons): `#FFFFFF`
- Divider / border: `#E5E7EB`

---

## 6. Corners & Visual Style

- Overall style: round, soft, youthful, mostly flat with a light 3D feel.
- Corner radius standards:
  - Level-1 modules / main cards: `24–28`
  - Level-2 modules / price cards / list items: `16`
  - Icon containers / small cards: `12`
  - Buttons / segmented controls: `≥24` (pill)
- Shadow hierarchy:
  - High elevation (primary modules): `0 18px 40px rgba(0,0,0,0.08)`
  - Medium elevation (secondary modules): `0 10px 24px rgba(0,0,0,0.06)`
  - Small components may use lighter shadows or none.

---

## 7. Interaction & States (Visual)

- Primary button states:
  - Default: filled with primary color + white text.
  - Pressed: slightly darker primary / optional inner shadow.
  - Disabled: reduce opacity to `40–60%`, text color softened.
- Selection / checked states:
  - Filled with primary color, inner check icon in white.
  - Unchecked: white fill with `#E5E7EB` border.
- Floating / important modules:
  - Use stronger shadow and larger corner radius to indicate higher elevation.
- Lists / grids:
  - Minimum click area: `44 × 44`
  - Spacing between adjacent items: `8–12` to avoid mis-taps.
