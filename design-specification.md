# blurrr eat – Home Screen Design Specification (v2)

---

## 0. Device & Canvas

- Target device: **iPhone 14 Pro**
- Canvas size (CSS pixels):
  - `phone-width: 393px`
  - `phone-height: 852px`
- The UI is rendered inside a centered “phone frame” on desktop:
  - Outer frame: dark background, large rounded corners (`40px`), strong shadow.
  - Inner screen: `393x852` area with a soft grey vertical gradient background.
- Simulate iOS chrome:
  - Black notch at the top center.
  - iOS-style status bar above content (time, signal, wifi, battery).
  - Home indicator bar at the very bottom.

---

## 1. Layout & Structure

### 1.1 Page Layout (Top → Bottom)

1. **Status bar (fixed)**
2. **Page content column** (scrollable if needed):
   1. Top app bar
   2. Greeting card
   3. Mode cover card (“吃饭模式”)
   4. Action card section (“这顿怎么决定？”)
3. **Bottom navigation bar** (fixed, pill, with sliding selector)
4. **Home indicator** (fixed)

All inner content is padded horizontally by `14px`. There is a default vertical gap of `14px` between major cards/sections.

### 1.2 Spacing System

Define a spacing scale to keep layout consistent:

- Spacing tokens: `4, 8, 12, 14, 16, 20, 24, 32`
- Usage guidelines:
  - Page horizontal padding: `14px`
  - Vertical spacing between major cards: `14px`
  - Card internal padding:
    - Default: `16px` (top/bottom/left/right)
    - Dense sections (e.g. nav, status lines): `12px`
  - Gap between icon and text: `8px`
  - Gap between title and subtitle: `6–8px`
- Component constraints:
  - Mode card width: ~`120px` (min `108px`, max `140px`)
  - Action tile:
    - Large tile min height: `140px`
    - Small tile min height: `96px`

The entire design should visually fit in a `393x852` viewport. Allow vertical scrolling if content slightly overflows.

---

## 2. Visual Tokens

### 2.1 Colors (Brand / Accent / Neutral / Semantic)

- **Brand Primary**
  - Vibrant orange `#ff6b00`: primary CTA, accents, strong backgrounds.
  - Deep orange `#e85a00`: pressed/hover gradient end for primary CTA.
  - Brand ink black `#0c0c0c`: logo outline, titles, heavy text.
- **Accent Colors**
  - Leaf green `#38b24a`: freshness, positive tags, food highlights.
  - Bright yellow `#ffc247`: price/offer labels, hint blocks, energetic backgrounds.
  - Watermelon red `#e63b2e`: prices, secondary CTA, highlight accents.
- **Neutral Colors**
  - Pure white `#ffffff`: card backgrounds.
  - Cloud white `#f7f7f7`: subtle backgrounds, group blocks, pill containers.
  - Graphite gray `#1f1f1f`: primary body text.
  - Secondary gray `#4a4a4a`: secondary text, default icons.
  - Divider / subtle border `#e5e7eb`.
- **Semantic Colors**
  - Success: leaf green `#38b24a`
  - Warning: bright yellow `#ffc247`
  - Error: watermelon red `#e63b2e`
  - Info: ink black `#0c0c0c` at 80% opacity for emphasized hints.

Wherever possible, text on colored backgrounds should respect at least WCAG AA contrast.

### 2.2 Typography

- Page title / brand name:
  - `20px`, `font-weight: 700`
- Card titles (e.g. “吃饭模式”, “这顿怎么决定？”):
  - `16px`, `font-weight: 600`
- Mode titles / action titles (“要健康”, “一起吃”, “帮我选” etc.):
  - `14px`, `font-weight: 600`
- Body text:
  - `13px`, `font-weight: 400`
- Secondary body / supporting text:
  - `12px`, `font-weight: 400`, color = secondary gray
- Tag / chip / tiny labels:
  - `10–11px`, `font-weight: 500`, may be uppercase or slightly letter-spaced

Font stack:  
`-apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", system-ui, sans-serif`.

Typography rules:

- Primary text should not go below `13px` for readability.
- Titles: max **2 lines** where possible; after that use ellipsis.
- Long city names / labels: single line with `text-overflow: ellipsis` if width is constrained.

### 2.3 Radii & Shadows

- Phone frame radius: `40px`
- Inner screen radius: `32px`
- Card radius: `24px`
- Mode card radius: `20px`
- Action tile radius: `20px`
- Pill / chips radius: `999px` (full pill)

Shadows:

- Strong card: `0 14px 28px rgba(15, 23, 42, 0.18)`
- Medium elements (buttons, tiles, icon containers):  
  `0 8px 18px rgba(15, 23, 42, 0.14)`
- Pressed state: reduce blur and spread by ~30% (subtly “pull in”).

### 2.4 Motion & Easing Tokens

- Easing standard: `cubic-bezier(0.4, 0.0, 0.2, 1)` (material-style smooth)
- Durations:
  - Micro interactions (hover, button press): `120–180ms`
  - Card transitions / mode change / nav glider: `220–280ms`
- General rules:
  - Use `transform` + `opacity` instead of manipulating layout where possible.
  - Prefer `transform: scale()` + shadow changes for press/tap feedback.

---

## 3. Blob Icon Style (All Icons)

Replace emoji icons with a unified “blob veggie” icon component.

### 3.1 Base Blob Icon

- Component name: `.icon-blob`
- Size:
  - Normal: `28x24px`
  - Large: `40x32px` (`.icon-blob--lg`)
- Shape:
  - Main body: irregular rounded rectangle, e.g.  
    `border-radius: 60% 70% 55% 60%`
  - “Head” shape above body using `::before` with its own radii.
- Face:
  - Two circular eyes (dark green or dark neutral).
  - Curved smile drawn via border arc or pseudo-element.
- Shadow:
  - Soft drop shadow tuned to blob color, medium intensity.

### 3.2 Color Variants

- `icon-blob--green`:
  - Body: `#4ade80`, head: `#22c55e`
  - Usage: healthy mode, positive/neutral states.
- `icon-blob--purple`:
  - Body: `#a855f7`, head: lighter purple
  - Usage: group/together mode, “帮我选”.
- `icon-blob--orange`:
  - Body: `#fb923c`, head: pale orange
  - Usage: random / “随便选”.
- `icon-blob--nav`:
  - Body: `#e5e7eb`, head: `#f9fafb`
  - Usage: bottom navigation icons.

### 3.3 Icon Alignment & Interaction

- Alignment:
  - Blob icons are centered inside their containers (brand mark, action circles, nav).
  - Inner padding around icon inside circular/pill container: `4–6px`.
- Optional micro-motion (desktop only, if desired):
  - On hover: subtle `translateY(-2px)` or `scale(1.03)`, duration `150–180ms`.
  - On active/tap: `scale(0.97)` and slightly weaker shadow.

---

## 4. Components

### 4.1 Top App Bar

- Layout:
  - Left: brand mark + app name text “blurrr eat”.
  - Right: location + small context summary (e.g. “今晚上 · 上海”, “26°C · 晴”).
- Brand mark:
  - `32x32` dark rounded square with inner blob icon (`icon-blob--green`).
- Right context:
  - Two-line, right-aligned text block:
    - Line 1 (location): body text.
    - Line 2 (weather): small icon + secondary text.

States:

- Tap/press on brand mark can provide visual feedback (scale 0.97) but is not required to navigate.
- If location/weather is unavailable, fallback text (see Edge Cases).

### 4.2 Greeting Card

- Card:
  - Soften white background (`#ffffff`) with strong shadow and `24px` radius.
  - Internal padding: `16px`.
- Left content:
  - Avatar container:
    - `48x48` rounded square, light background (`#f7f7f7`), medium shadow.
    - Contains large green blob icon (`icon-blob--green icon-blob--lg`).
  - Text:
    - Title: e.g. “大家一起吃，别谁都迁就。”
    - Subtitle: short supportive line describing how the system helps.
- Right content:
  - Two lines of small status hints, each with dot or mini icon.

Behavior:

- On mode change, greeting title & subtitle can update (see mode mapping).

### 4.3 Mode Cover Card (“吃饭模式”)

- Card structure:
  - Header row + mode carousel + indicator dots.
- Header row:
  - Left: card title “吃饭模式”.
  - Center: current mode label, e.g. `当前：一起吃`.
  - Right: small pill button “修改目标”.
- Mode carousel:
  - Horizontal list of 3 mode cards:
    - Modes: “要健康”, “一起吃”, “这一顿”.
  - Each mode card:
    - Approx `120x132px`, radius `20px`, internal padding `12–14px`.
    - Top text: title + short description.
    - Bottom-right: dark square with blob icon.
  - Active card:
    - Background: yellow accent (`#ffc247`) or variant.
    - Stronger shadow and full opacity; slightly larger scale (`1.02`) is optional on active.
- Mode dots:
  - Row of 3 dots below carousel.
  - Active dot:
    - Larger size + ring effect around it.
    - Color matches current mode accent.

#### 4.3.1 Mode Logic & Copy Mapping

Define mode keys and content mapping:

| Mode label | Key      | Greeting title example                         | Greeting subtitle example                        | Section header summary example                   |
|-----------|----------|-----------------------------------------------|--------------------------------------------------|--------------------------------------------------|
| 要健康     | `healthy` | “今晚少油少盐也好吃。”                         | “我会优先推荐更轻盈、低负担的选择。”            | “要健康 · 更适合轻盈一点的搭配”                  |
| 一起吃     | `together` | “大家一起吃，别谁都迁就。”                     | “综合每个人口味，找一个都能接受的方案。”        | “一起吃 · 适合多人局”                            |
| 这一顿     | `now`     | “这顿别纠结，交给我选。”                       | “随机一点、随便一点，也可以很好吃。”            | “这一顿 · 随便吃吃就好”                          |

Implementation:

- When mode changes:
  - Update active mode card & dot.
  - Update greeting card copy.
  - Update section header summary in Action section.

### 4.4 Action Section (“这顿怎么决定？”)

- Card header:
  - Left: section title “这顿怎么决定？”.
  - Right: current mode summary (e.g. “一起吃 · 适合多人局”).
- Layout:
  - 2-column grid:
    - Left: 1 large tile (“帮我选”).
    - Right: 2 stacked smaller tiles (“自己选”, “随便选”).
- Internal spacing:
  - Gap between tiles: `12–14px`.

#### 4.4.1 Action Tile Anatomy

Common structure:

- Base tile:
  - Radius: `20px`, medium shadow.
  - Internal padding: `14–16px`.
- Front layer (`.action-front`):
  - Icon container:
    - ~`32x32` circular or pill container, light background, shadow.
    - Contains blob icon variant (green/purple/orange).
  - Title text: e.g. “帮我选”.
- Back layer (`.action-back`):
  - Hidden by default; visible on hover (desktop).
  - Contains:
    - Same title.
    - 1–2 lines of descriptive text summarizing behavior.

#### 4.4.2 Hover & Press States

- Hover (desktop):
  - Tile uses corner pseudo-elements (`::before` top-right, `::after` bottom-left).
  - On hover:
    - These pseudo-elements expand to cover tile with `var(--hover-color)`.
    - Front layer: fades out slightly, moves up by `4px`.
    - Back layer: fades in, moves to centered position.
    - Duration: `220–260ms`, using standard easing.
- Tap/press (mobile and desktop):
  - Slight `transform: scale(0.97)` and reduced shadow.
  - Restore to normal on release.
- Disabled (if ever used):
  - Reduce opacity to ~`0.4–0.5`.
  - Remove hover animations and pointer events.

Hover colors:

- 帮我选 (primary): dark navy `#020617`.
- 自己选: purple (`#6366f1`).
- 随便选: warm orange (`#f97316`).

### 4.5 Bottom Navigation

- Position:
  - Fixed to bottom of phone.
  - Outer pill:
    - Left/right: `14px`.
    - Bottom: `32px`.
    - Radius: `24px`.
    - Background: `#050816`, subtle blur & shadow for glassy look.
- Inner structure: `.glass-nav-group`
  - 3 items: 历史, 首页, 我的.
  - Each item is a `<label>` linked to a hidden radio input.
  - Each label contains:
    - A small nav blob icon (`icon-blob--nav`, scaled to ~`0.8`).
    - Text label under or beside icon.
- Glider (`.glass-nav-glider`):
  - Positioned behind labels.
  - Width: `1/3` of nav group.
  - Movement: controlled by `transform: translateX(...)` depending on which radio is checked.
  - Background:
    - 历史: neutral grey `#e5e7eb`.
    - 首页: light-to-lime gradient.
    - 我的: light blue `#dbeafe`.
- States:
  - Press: slight scale in and subtle shadow change.
  - Icon can slightly wobble or bounce (optional) when selected, within `150–200ms`.

---

## 5. Interaction Logic & Behavior

### 5.1 Mode Selection

- Mode cards:
  - Clicking a mode card sets it as active.
- Mode dots:
  - Clicking a dot sets corresponding mode active.
- On mode change:
  - Update:
    - Active card style & dot.
    - Greeting title and subtitle text.
    - Action section header summary.
  - Optional animation:
    - Text content fades out (`150ms`), content updated, then fades in with slight upward movement (`220ms`).

### 5.2 Bottom Navigation

- Visual switching:
  - Controlled entirely by radio inputs + CSS glider transform.
- Actual routing:
  - Optional for this spec; main focus is visual behavior.
- Active state:
  - The label of the checked radio is considered active.
  - Glider animates to the active label’s position.

### 5.3 Hover vs Touch

- Hover behavior:
  - Only action tiles implement the complex hover “corner expansion” effect.
- On touch devices:
  - Treat the front view as the primary state.
  - It is acceptable that back text is not accessible via hover animation.
  - Tap can directly trigger action instead of revealing back layer.

---

## 6. Content & Copy Guidelines

- Tone of voice:
  - Casual, friendly, slightly playful.
  - Avoid overly formal or command-like phrasing.
- Titles:
  - Aim for within 2 lines on typical screen width.
- Location & weather:
  - If too long, use ellipsis and concise phrases.
- Multi-person / group scenarios:
  - Use language that feels inclusive and warm.

---

## 7. States & Edge Cases

### 7.1 Empty States

- History empty:
  - Show friendly empty state in “历史” (if implemented) such as:
    - Illustration (optional) + text like “还没有吃饭记录，今晚要不要来一顿？”
- Recommendations empty:
  - Use soft copy such as “暂时没有合适的推荐，换个模式试试？”

### 7.2 Error States

- Location / weather unavailable:
  - Right app bar text:
    - E.g. “地点 · 未知 / 网络异常”.
  - Use neutral or info semantic color (ink black at 80%).
- System errors:
  - Prefer inline error messages over modal errors whenever possible.

### 7.3 Loading States

- For first load:
  - Use skeletons or simple placeholders for greeting card and mode card.
- For partial loads:
  - You may show a small spinner in the right context line instead of weather.

### 7.4 Long Text / Overflow

- City names, mode descriptions:
  - Use `text-overflow: ellipsis` when space is constrained.
  - Prefer truncation over wrapping in tight horizontal areas (like app bar).

---

## 8. Accessibility Guidelines

- Minimum body text size: `13px`.
- Tap targets:
  - All interactive elements should have at least `44x44px` tapping area.
- Contrast:
  - Aim for at least AA contrast for body text and important UI labels.
- Focus (for web with keyboard):
  - Define a consistent focus outline style (e.g. `outline: 2px solid #22c55e; outline-offset: 2px`).

---

## 9. Theming & Extensibility

- Color tokens should be mapped to CSS variables:
  - e.g. `--color-primary`, `--color-accent-green`, `--shadow-card-strong`.
- Future themes:
  - Design leaves room for potential dark mode by swapping background and text colors while respecting brand colors.

---

## 10. Implementation Notes (for Codex / Dev)

- Use **semantic, minimal HTML**:
  - Example class naming (BEM-like):
    - `.home`, `.home__top-bar`, `.home__greeting-card`, `.mode-card__item`, `.mode-card__item--active`, `.action-tile`, `.action-tile--primary`, `.bottom-nav`, `.bottom-nav__item--active`.
- CSS:
  - Prefer a single `<style>` block in `index.html` for this demo.
  - Structure CSS into:
    1. `:root` tokens (colors, radii, spacing, shadows, motion).
    2. Layout (phone frame, screen, scroll).
    3. Components (top bar, greeting, mode card, actions, nav).
    4. Utilities (e.g. `.sr-only`, `.text-ellipsis`).
- JavaScript:
  - Vanilla JS to:
    - Maintain current mode (`healthy`, `together`, `now`).
    - Update classes & text based on mode mapping.
    - Optionally reflect bottom nav selection state.
- Layout:
  - Ensure the main content fits `393x852`.  
  - Allow `overflow-y: auto` on the inner screen if content exceeds height slightly.
