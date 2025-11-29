# blurrr eat – Home Screen Design Specification

## 0. Device & Canvas

- Target device: **iPhone 14 Pro**
- Canvas size (CSS pixels):
  - `phone-width: 393px`
  - `phone-height: 852px`
- The UI is rendered inside a centered “phone frame” on desktop:
  - Outer frame: dark background, large rounded corners (40px), strong shadow.
  - Inner screen: `393x852` area with a soft grey vertical gradient background.
- Simulate iOS chrome:
  - Black notch at the top center.
  - iOS-style status bar above content (time, signal, wifi, battery).
  - Home indicator bar at the very bottom.

---

## 1. Layout Structure (Top → Bottom)

1. **Status bar (fixed)**
2. **Page content column** (scrollable):
   1. Top app bar
   2. Greeting card
   3. Mode cover card (“吃饭模式”)
   4. Action card section (“这顿怎么决定？”)
3. **Bottom navigation bar** (fixed, pill, with sliding selector)
4. **Home indicator** (fixed)

All inner content is padded horizontally by `14px` and has vertical gaps of `14px` between cards.

---

## 2. Visual Tokens

### 2.1 Colors

- Page background:
  - Top: `#e4e5ea`
  - Bottom: `#d7d8de`
- Cards:
  - Base card background: `#ffffff`
- Brand / dark surfaces:
  - `#050816` or `#020617`
- Primary accent:
  - Lime green: `#b9ff46`
- Secondary accent:
  - Warm yellow: `#ffd84d`
- Additional accents:
  - Healthy green: `#4ade80`, `#22c55e`
  - Purple: `#a855f7`
  - Orange: `#fb923c`
- Text:
  - Main text: `#111827`
  - Secondary text: `#6b7280`
- Bottom nav background:
  - `#050816`
- Dots / status indicators:
  - Use accent colors (`#b9ff46`, `#facc15`, `#fb7185`) with subtle shadows.

### 2.2 Typography Levels

- Page title / brand name:
  - `20px`, `font-weight: 700`
- Card title (section titles like “吃饭模式”, “这顿怎么决定？”):
  - `16px`, `font-weight: 600`
- Mode card title / action titles (“要健康”, “一起吃”, “帮我选” etc.):
  - `14px`, `font-weight: 600`
- Body text:
  - `13px`, `font-weight: 400`
- Secondary body text / supporting text:
  - `12px`, `font-weight: 400`, color = secondary text
- Tag / chip / tiny labels:
  - `10–11px`, `font-weight: 500`, uppercase or slightly letter-spaced

Font stack:  
`-apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", system-ui, sans-serif`.

### 2.3 Radii & Shadows

- Phone frame radius: `40px`
- Inner screen radius: `32px`
- Card radius: `24px`
- Mode card radius: `20px`
- Action tile radius: `20px`
- Pill / chips radius: `999px`
- Shadows:
  - Strong card: `0 14px 28px rgba(15, 23, 42, 0.18)`
  - Medium elements (buttons, tiles): `0 8px 18px rgba(15, 23, 42, 0.14)`

---

## 3. Blob Icon Style (All icons)

Replace emoji icons with a unified “blob veggie” icon component.

### 3.1 Base blob icon

- Component name: `.icon-blob`
- Size:
  - Normal: `28x24px`
  - Large variant: `40x32px`
- Shape:
  - Main body: irregular rounded rectangle, e.g. `border-radius: 60% 70% 55% 60%`
  - “Head” shape above body using `::before` with its own rounded radius.
- Face:
  - Smiley face drawn with CSS:
    - Two circular eyes (dark green).
    - Curved smile (bottom border arc).
- Shadow:
  - Soft drop shadow matching blob color.

### 3.2 Color variants

- `icon-blob--green`:
  - Body: `#4ade80`, head: `#22c55e`
  - Usage: healthy / generic positive icon.
- `icon-blob--purple`:
  - Body: `#a855f7`, head: light purple
  - Usage: group / together mode / “帮我选”.
- `icon-blob--orange`:
  - Body: `#fb923c`, head: pale orange
  - Usage: random / “随便选”.
- `icon-blob--nav`:
  - Body: `#e5e7eb`, head: `#f9fafb`
  - Usage: bottom navigation icons.

Icons are placed inside rounded containers where needed (brand mark, action-icon-circle, bottom nav labels).

---

## 4. Components

### 4.1 Top App Bar

- Layout:
  - Left: brand mark + app name text “blurrr eat”.
  - Right: location + small context summary (“今晚上 · 上海”, “26°C · 晴”).
- Brand mark:
  - 32x32 dark rounded square with an inner blob icon (`icon-blob--green`).
- Right context:
  - Stacked two lines, right-aligned:
    - Line 1 (location): body text.
    - Line 2 (weather line): small icon + secondary text.

### 4.2 Greeting Card

- Card with softened white background and strong shadow.
- Left content:
  - Avatar container (greeting-emoji):
    - 48x48 rounded square, light background, drop shadow.
    - Contains a large green blob icon (`icon-blob--green icon-blob--lg`).
  - Title and subtitle:
    - Title: e.g. “大家一起吃，别谁都迁就。”
    - Subtitle: short sentence describing how the system will help.
- Right content:
  - Two lines of small status hints with colored dots.

### 4.3 Mode Cover Card (“吃饭模式”)

- Header row:
  - Left: card title “吃饭模式”.
  - Center: current mode label `“当前：一起吃”`.
  - Right: small pill button “修改目标”.
- Mode carousel:
  - Horizontal list of 3 mode cards:
    - “要健康”, “一起吃”, “这一顿”.
  - Each mode card:
    - Size: ~120x132px, radius 20px.
    - Top text block with title + short description.
    - Bottom-right: dark square containing a blob icon.
  - Active card:
    - Uses yellow `accent-strong` background.
    - Stronger shadow and full opacity.
- Mode dots:
  - Row of 3 colored dots below carousel.
  - Active dot has ring effect and matches the current mode color.

### 4.4 Action Section (“这顿怎么决定？”)

- Card header:
  - Left: section title.
  - Right: current mode summary (e.g. “一起吃 · 适合多人局”).
- Layout:
  - Two-column grid:
    - Left column: 1 large tile (帮我选).
    - Right column: 2 stacked smaller tiles (自己选, 随便选).

#### 4.4.1 Action tile anatomy

Common structure for all three tiles:

- Base tile shape:
  - Radius 20px, subtle shadow.
- Front layer (`.action-front`):
  - Icon container:
    - 32x32 pill circle with light background and shadow.
    - Contains a blob icon with appropriate variant.
  - Title text (e.g. “帮我选”).
- Back layer (`.action-back`):
  - Overlay content to show on hover.
  - Contains:
    - Title (same as front).
    - 1–2 lines of description summarizing behavior.

#### 4.4.2 Hover behavior

- Desktop-only visual behavior:
  - Tile uses two corner pseudo-elements to create a “corner expansion” animation:
    - `::before` at top-right, `::after` at bottom-left.
    - On hover, both grow to cover the entire tile with `var(--hover-color)`.
  - While hovering:
    - Front layer fades out and moves up slightly.
    - Back layer fades in and moves to center.
- `--hover-color` for each tile:
  - 帮我选 (primary): dark navy `#020617`.
  - 自己选: purple (`#6366f1` or similar).
  - 随便选: warm orange (`#f97316`).

### 4.5 Bottom Navigation

- Fixed to the bottom of the phone:
  - Full-width pill: `left/right: 14px`, `bottom: 32px`, `border-radius: 24px`.
  - Background: `#050816`, slight shadow, blur for a glassy feel.
- Inner structure: `.glass-nav-group` with radio-based selector:
  - 3 items: 历史, 首页, 我的.
  - Each label shows:
    - A small nav blob icon (`icon-blob--nav` scaled to 0.8).
    - Text label under or beside the icon.
  - A sliding glider (`.glass-nav-glider`) behind labels:
    - Width: `1/3` of nav group.
    - Moves with CSS transform based on which radio input is checked.
    - Background variants:
      - 历史: neutral grey (`#e5e7eb`).
      - 首页: light-to-lime gradient.
      - 我的: light blue (`#dbeafe`).

---

## 5. Interaction Logic

- Mode selection:
  - Clicking a mode card or a dot sets the active mode.
  - When mode changes:
    - Update active styling on cards and dots.
    - Update greeting title and subtitle text.
    - Update section header mode label (“一起吃 · 适合多人局”).
- Bottom nav:
  - Implement visual switching using radio inputs and the glider.
  - Actual routing or content switching is optional for this design spec.
- Hover behavior:
  - Only action tiles use the hover expansion effect.
  - On touch devices, it is acceptable that back text is not visible; front view remains primary.

---

## 6. Implementation Notes for Codex

- Use **semantic, minimal HTML** with clear class names matching this spec (e.g. `.phone`, `.greeting-card`, `.mode-card-item`, `.action-tile`, `.icon-blob`).
- Put all CSS in a single `<style>` block for simplicity.
- No external frameworks or JavaScript libraries are required.
- Simple vanilla JavaScript can be used to:
  - Switch modes (`healthy`, `together`, `now`).
  - Optionally toggle nav active state.
- Ensure the entire UI fits **within a single 393 x 852 viewport without vertical scrolling** in typical desktop preview, but allow vertical scroll if content slightly overflows.
