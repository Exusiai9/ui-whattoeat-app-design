
## 1. Device & Canvas

- Target device: iPhone 14 Pro
- Viewport: `393 x 852` (CSS pixels)
- Outer frame:
  - Dark background
  - Corner radius: `40px`
  - Strong shadow
- Inner screen:
  - Size: `393 x 852`
  - Background: light grey vertical gradient
  - Corner radius: `32px`
- iOS chrome simulation:
  - Top black notch
  - Status bar (time / signal / Wi-Fi / battery)
  - Bottom home indicator

---

## 2. Layout & Spacing

### 2.1 App Shell Structure (Top → Bottom)

1. Status Bar (fixed)
2. Page Content (scrollable)
   - Top App Bar
   - Content sections (Cards / Lists / Tiles / Carousels)
3. Bottom Navigation Bar (fixed, pill-shaped)
4. Home Indicator (fixed)

- Page Content horizontal padding: `14px`

### 2.2 Spacing System

- Spacing tokens: `4, 8, 12, 14, 16, 20, 24, 32`
- Rules:
  - Page horizontal padding: `14px`
  - Vertical spacing between major blocks: `14px`
  - Card internal padding:
    - Default: `16px`
    - Dense content: `12px`
  - Icon–text gap: `8px`
  - Title–subtitle gap: `6–8px`
- Component sizing:
  - Mode card width: ~`120px` (min `108px`, max `140px`)
  - Large Action Tile height: min `140px`
  - Small Action Tile height: min `96px`
- Allow `overflow-y: auto` on inner screen when content overflows

---

## 3. Design Tokens

### 3.1 Colors

**Brand Primary**

- `--color-primary: #ff6b00`
- `--color-primary-dark: #e85a00`
- `--color-ink: #0c0c0c`

**Accent**

- `--color-accent-green: #38b24a`
- `--color-accent-yellow: #ffc247`
- `--color-accent-red: #e63b2e`

**Neutral**

- `--color-white: #ffffff`
- `--color-cloud: #f7f7f7`
- `--color-text-main: #1f1f1f`
- `--color-text-secondary: #4a4a4a`
- `--color-border-subtle: #e5e7eb`

**Semantic**

- Success: `#38b24a`
- Warning: `#ffc247`
- Error: `#e63b2e`
- Info: `#0c0c0c @ 80%`

Text/background contrast should meet WCAG AA.

### 3.2 Typography

- Use external `typography.css` file

### 3.3 Radius & Shadow

- Phone frame radius: `40px`
- Inner screen radius: `32px`
- Standard card: `24px`
- Mode card: `20px`
- Action Tile: `20px`
- Pill / Chip: `999px`

Shadows:

- Strong card: `0 14px 28px rgba(15, 23, 42, 0.18)`
- Medium elements: `0 8px 18px rgba(15, 23, 42, 0.14)`
- Pressed state: reduce blur and spread by ~30% from the base shadow

### 3.4 Motion

- Easing: `cubic-bezier(0.4, 0.0, 0.2, 1)`
- Durations:
  - Micro-interactions: `120–180ms`
  - Cards / mode changes / nav glider: `220–280ms`
- Guidance:
  - Prefer `transform` + `opacity`
  - Press feedback via `scale` + shadow change

---

## 4. Icon Style – Blob Icons

### 4.1 Base Shape

- Class: `.icon-blob`
- Sizes:
  - Regular: `28 x 24px`
  - Large: `40 x 32px` (`.icon-blob--lg`)
- Shape:
  - Main body: irregular rounded rectangle (e.g. `border-radius: 60% 70% 55% 60%`)
  - Head: `::before` pseudo-element
- Face:
  - Two circular eyes + curved smile
- Shadow:
  - Soft shadow harmonized with body color

### 4.2 Color Variants

- `icon-blob--green`: body `#4ade80`, head `#22c55e`
- `icon-blob--purple`: body `#a855f7`, head lighter purple
- `icon-blob--orange`: body `#fb923c`, head pale orange
- `icon-blob--nav`: body `#e5e7eb`, head `#f9fafb`

### 4.3 Alignment & Interaction

- Center align within container; inner padding: `4–6px`
- Hover (optional): `translateY(-2px)` or `scale(1.03)`, `150–180ms`
- Active: `scale(0.97)`, reduced shadow

---

## 5. Core Components

### 5.1 Top App Bar

- Structure:
  - Left: brand mark (`32 x 32` dark rounded square + Blob icon) + app name
  - Right: two-line, right-aligned text:
    - Line 1: location / page label
    - Line 2: small icon + secondary info
- Brand mark can use press feedback (scale)

### 5.2 Generic Card

- Background: `#ffffff` or light neutral
- Corner radius: `24px`
- Internal padding: `16px`
- Shadow: Strong or Medium
- Structure:
  - Header (title + optional icon)
  - Body (text / numbers / chart)
  - Footer (secondary text / tags / secondary CTA)

### 5.3 Hero Card

- Enhanced version of Generic Card:
  - Larger radius (`≥ 24px`)
  - Stronger shadow
  - Brand / accent color or gradient background
- Recommended layout:
  - Left: main title, key metric, short description
  - Right: illustration / Blob icon / small chart

### 5.4 Mode Selector Carousel

#### 5.4.1 Structure

- Header row:
  - Left: component title
  - Center/Right: current mode label
- Horizontal mode card carousel
- Mode indicator dots at bottom

#### 5.4.2 Mode Cards

- Size: ~`120 x 132px`
- Radius: `20px`
- Padding: `12–14px`
- Content:
  - Top: mode name + short description
  - Bottom-right: dark or colored square + Blob icon
- Active state:
  - Emphasized background (e.g. yellow / orange)
  - Stronger shadow, optional `scale(1.02)`
- Inactive state:
  - Light grey or white background
  - Weaker shadow

#### 5.4.3 Indicator Dots

- Count = number of modes
- Active state:
  - Larger size, optional ring
  - Color aligned with mode theme color

#### 5.4.4 Behavior

- Click on a mode card or dot sets `currentMode`
- `currentMode` can drive updates in other components (text + style)

### 5.5 Action Tiles Grid

#### 5.5.1 Layout

- Header row:
  - Left: section title
  - Right: optional summary text
- Content area:
  - Two-column grid:
    - Left: one large tile
    - Right: two stacked small tiles
  - Tile gap: `12–14px`

#### 5.5.2 Tile Anatomy

- Radius: `20px`
- Padding: `14–16px`
- Shadow: Medium
- Front layer `.action-front`:
  - Icon container + Blob icon
  - Title text
- Back layer `.action-back` (optional):
  - Hidden by default
  - Title + 1–2 lines of description

#### 5.5.3 States

- Hover:
  - Corner pseudo-elements expand to cover background
  - Front layer moves up and fades slightly
  - Back layer fades in
- Active:
  - `scale(0.97)` with reduced shadow
- Disabled:
  - Opacity `0.4–0.5`
  - No hover interaction

### 5.6 Bottom Navigation

#### 5.6.1 Structure

- Outer pill container:
  - Fixed to bottom
  - Horizontal padding: `14px`
  - Bottom offset from home indicator: ~`32px`
  - Radius: `24px`
  - Background: `#050816` with optional blur + shadow
- Inner `.glass-nav-group`:
  - 3+ nav items
  - Each item: hidden radio + label
  - Label: Blob nav icon + text

#### 5.6.2 Glider

- `.glass-nav-glider` positioned behind labels
- Width = width of a single nav item
- Moves via `translateX` according to checked radio
- Background color configurable per nav item

#### 5.6.3 States

- Active:
  - Text + icon highlighted
  - Glider animates to active item (`220–280ms`)
- Press:
  - Label slightly scales, shadow adjusts

---

## 6. Interaction Patterns

### 6.1 Mode Selection

- State: `currentMode` (enum)
- Triggers:
  - Clicking a mode card
  - Clicking a mode dot
- Animation suggestion:
  - Text fade out (`150ms`) → update content → fade in + `translateY(-2px)` (`220ms`)

### 6.2 Bottom Navigation

- Visual state powered by radios + CSS
- Active nav item:
  - Glider moves to corresponding position
  - Icon + text highlighted
- Animation duration: `220–280ms`

### 6.3 Hover vs Touch

- Complex hover effects only on desktop Action Tiles
- Touch devices:
  - Keep press feedback (`scale` + shadow change)
  - Front view is primary state

---

## 7. Copy & Accessibility

### 7.1 Copy Tone

- Voice: casual, friendly, slightly playful
- Titles: max 2 lines
- Use ellipsis for width-constrained areas

### 7.2 Accessibility

- Body text size ≥ `13px`
- Tap target ≥ `44 x 44px`
- Text/background contrast meets AA
- Keyboard:
  - Consistent focus style, e.g. `outline: 2px solid #22c55e; outline-offset: 2px`
