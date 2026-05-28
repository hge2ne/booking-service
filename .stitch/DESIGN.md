---
name: NP Edu Booking
colors:
  # --- Brand / Primary (olive-lime green, from npredu #638402) ---
  primary: '#638402'
  on-primary: '#ffffff'
  primary-container: '#e9f0d2'
  on-primary-container: '#1e2a00'
  inverse-primary: '#c2d98a'
  # --- Secondary (slate navy, npredu dark buttons #2c3d5e) ---
  secondary: '#2c3d5e'
  on-secondary: '#ffffff'
  secondary-container: '#d7dded'
  on-secondary-container: '#101f3a'
  # --- Tertiary (info blue, used sparingly for callouts) ---
  tertiary: '#3a6fb0'
  on-tertiary: '#ffffff'
  tertiary-container: '#dbe8fb'
  on-tertiary-container: '#0c2742'
  # --- Surfaces / Neutrals (white + warm-cool light grays) ---
  background: '#ffffff'
  on-background: '#1c1f1e'
  surface: '#ffffff'
  surface-dim: '#eef0ec'
  surface-bright: '#ffffff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f8f5'
  surface-container: '#f2f3ef'
  surface-container-high: '#ececea'
  surface-container-highest: '#e5e6e2'
  on-surface: '#1c1f1e'
  on-surface-variant: '#4a4d4b'
  outline: '#c9cbc6'
  outline-variant: '#e5e6e2'
  inverse-surface: '#2f3230'
  inverse-on-surface: '#f1f3ef'
  surface-tint: '#638402'
  # --- Functional states ---
  error: '#d92d20'
  on-error: '#ffffff'
  error-container: '#fde4e1'
  on-error-container: '#5b0f0a'
  success: '#2f9e44'
  on-success: '#ffffff'
  warning: '#e8a33d'
  on-warning: '#3a2a00'
typography:
  display-xl:
    fontFamily: Poppins
    fontSize: 44px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.02em
  display-xl-mobile:
    fontFamily: Poppins
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Noto Sans KR
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Noto Sans KR
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.02em
  title-md:
    fontFamily: Noto Sans KR
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Noto Sans KR
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Noto Sans KR
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  label-md:
    fontFamily: Noto Sans KR
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-sm:
    fontFamily: Noto Sans KR
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
rounded:
  sm: 0.375rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.25rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  form-max: 880px
  gutter: 24px
  margin-desktop: 32px
  margin-mobile: 20px
  stack-lg: 48px
  stack-md: 24px
  stack-sm: 12px
---

# Design System: NP Edu Booking
**Source:** npredu.co.kr (theme/basic) brand language + the 3-step reservation form mockups (image1/image2)

## 1. Visual Theme & Atmosphere

NP Edu's interface is a **clean, trustworthy Korean academic-institute aesthetic**: bright white surfaces, generous light-gray banding to separate sections, and crisp charcoal type set in Noto Sans KR with the slightly tightened tracking that reads as "polished and official" in Korean UI. It is **flat and structured** rather than glossy — depth comes from hairline borders and whisper-soft shadows, never heavy elevation.

The single source of brand warmth is an **olive-lime green (#638402)** — confident but understated, used for the institute's signature **pill-shaped outline buttons**, link hovers, and now the reservation flow's progress and primary actions. The overall feeling is **orderly, parent-facing, and reassuring**: a form a parent can fill out for their child without anxiety, with each step revealed calmly as the previous one completes.

**Key characteristics:**
- White canvas with light-gray (#f2f3ef / #f7f8f5) section bands
- Olive-green brand accent, used decisively but sparingly
- Pill-shaped secondary/utility buttons (verification, address lookup)
- Noto Sans KR body with tight negative letter-spacing; Poppins/Montserrat for numerals & Latin display
- Flat layering, hairline outlines, soft shadows only on raised cards

## 2. Color Palette & Roles

### Primary Foundation
- **Cloud White** (#FFFFFF) — primary page/card background.
- **Mist Gray** (#F7F8F5) / **Section Gray** (#F2F3EF) — section bands and grouped-field backgrounds that chunk the long form into digestible zones.
- **Hairline Gray** (#E5E6E2) — borders, dividers, input outlines.

### Accent & Interactive
- **Olive Brand Green** (#638402) — the sole brand color. Primary CTA fills, active step indicator, progress bar, link hover, and selected states. On-color text is white.
- **Olive Tint** (#E9F0D2) — soft brand-green container for highlighted/selected chips and subtle emphasis.
- **Slate Navy** (#2C3D5E) — secondary solid buttons and strong UI accents (e.g., dark confirmation buttons), carried over from the site's button set.
- **Info Blue** (#3A6FB0 on #DBE8FB) — reserved strictly for informational callouts (e.g., the "조기 마감 / 재응시 제한" notice band).

### Typography & Text Hierarchy
- **Charcoal** (#1C1F1E) — headings and primary text.
- **Graphite** (#4A4D4B) — body copy, field labels' helper text.
- **Muted Gray** (#8A8F8B) — placeholders, optional-field hints, disabled text.

### Functional States
- **Required/Error Red** (#D92D20) — the required-field dot, validation errors (container #FDE4E1).
- **Success Green** (#2F9E44) — verification success ("인증 완료"), confirmation.
- **Warning Amber** (#E8A33D) — deadline-approaching / caution.

## 3. Typography Rules

**Body / Korean:** `'Noto Sans KR'` — humanist Korean sans, set with **-0.01em to -0.02em** tracking on headings for the tight, official look common to Korean institute sites.
**Display / Latin & numerals:** `'Poppins'` (and `'Montserrat'` for large English/number display) — geometric, modern, used for the big "STEP 1/2/3" labels and any English/numeric display.

### Hierarchy & Weights
- **Display (page title "신입생 테스트 예약 · 결제"):** 700, 44px desktop / 32px mobile, -0.02em.
- **Section headline ("일정", "학생 정보"):** 600–700, 22–28px, sits on/above gray bands.
- **Field label ("학년", "학생 이름"):** 500–600, 14–16px charcoal, with a red required dot.
- **Helper text (under fields):** 400, 12–14px muted gray.
- **Body:** 400, 16px, 1.6 line-height.
- **Buttons:** 500–600, 15–16px.

### Spacing Principles
- Tight negative tracking on Korean headings; normal tracking on body.
- 1.6 line-height for body readability; 1.3 for headings.
- Labels sit 8px above their inputs; helper text 6px below.

## 4. Component Stylings

### Buttons
- **Primary CTA** (e.g., "검증 및 결제 단계로 이동", step "다음"): solid **Olive Brand Green (#638402)**, white text, **8px radius**, generous padding (14px vertical / 28px horizontal), subtle darken on hover (#54700 ≈ #557002), soft focus ring in brand green.
- **Secondary solid:** Slate Navy (#2C3D5E) fill, white text, 8px radius.
- **Utility pill buttons** ("인증번호 발송", "인증하기", "주소찾기"): **outline pill** (border 1px #638402, green text, `border-radius: 9999px`, white fill) — the site's signature shape. Hover fills with Olive Tint (#E9F0D2).
- **Disabled:** surface-container fill, muted-gray text, no shadow.

### Cards & Section Containers
- **Form card / section panel:** white background, 1px Hairline Gray border, **12px radius**, internal padding 24–28px. Whisper-soft shadow `0 1px 10px rgba(0,0,0,0.05)` on raised cards; otherwise border-only and flat.
- **Section band header:** full-width light-gray (#F2F3EF) strip with the section name (일정 / 학생 정보), separating the three steps.
- **Selected / highlighted item (e.g., course chip):** Olive Tint (#E9F0D2) background with #1E2A00 text and a 1px #638402 border.

### Navigation
- Clean horizontal top bar, white with a hairline bottom border; logo left.
- Links charcoal (#1C1F1E), **hover → Olive Brand Green (#638402)**.
- Pill outline buttons (login/apply) on the right, in brand green.
- Mobile: hamburger → sliding drawer.

### Inputs & Forms
- **Text input / select:** white fill, 1px Hairline Gray (#E5E6E2) border, **8px radius**, padding 12px/14px, 16px text.
- **Focus:** border → Olive Brand Green (#638402) with a soft 3px outer glow `rgba(99,132,2,0.15)`.
- **Placeholder:** Muted Gray (#8A8F8B), example-driven ("예: 김하늘").
- **Required marker:** small red (#D92D20) dot/asterisk after the label.
- **Helper text:** 12–14px muted gray beneath the field.
- **Textarea:** same styling, min-height ~96px, resy vertical.
- **Checkbox (약관 동의):** square 8px-radius, checked fill Olive Brand Green.

### Domain-Specific: Multi-Step Reveal
- **Progress bar:** thin track (#E5E6E2) with an Olive Brand Green fill that grows 33% → 66% → 100% across the 3 steps; sits under the page title.
- **Step block:** each step is a card/section that, once its required fields validate, **reveals the next step below with a smooth scroll + fade-in**; completed steps stay visible (collapsible summary optional). Inactive future steps are hidden until unlocked.
- **Info callout band:** soft Info-Blue container (#DBE8FB / text #0C2742), 12px radius, used for the "일부 학년/시험범위 조기 마감 … 재응시 제한" notice.

## 5. Layout Principles

### Grid & Structure
- **Content max-width:** 1200px for general pages; the **reservation form is a single centered column, max-width ~880px**.
- 12-column fluid grid; form fields use a 2-up row on desktop (e.g., 학년 | 응시 일정, 이름 | 성별), collapsing to 1-up on mobile.

### Whitespace Strategy
- 8px base spacing scale.
- 48px (stack-lg) between major step sections; 24px (stack-md) between field groups; 12px (stack-sm) label-to-field.
- Page edge padding: 32px desktop / 20px mobile.

### Alignment & Visual Balance
- Left-aligned labels and fields; page title left-aligned with progress bar beneath.
- Section bands create clear horizontal rhythm down the page.

### Responsive Behavior & Touch
- Mobile-first; 2-up field rows collapse to single column < 768px.
- Touch targets ≥ 44px; pill utility buttons remain thumb-friendly.
- Progress bar and step reveal behavior identical across breakpoints.

## 6. Design System Notes for Stitch Generation

### Language to Use
- **Atmosphere:** "clean, trustworthy Korean academic-institute form — white surfaces, light-gray section bands, flat and orderly."
- **Brand color:** "olive-lime green (#638402)" for progress, primary CTA, and active states.
- **Buttons:** "olive-green outline pill buttons" for utility actions (verification, address lookup); "solid olive-green primary button" for the main CTA.
- **Shadows:** "whisper-soft shadow on raised cards," otherwise "flat with hairline borders."

### Color References
- Primary CTA / progress: "Olive Brand Green (#638402)" on white.
- Surfaces: "Cloud White (#FFFFFF)" cards on "Section Gray (#F2F3EF)" bands.
- Text: "Charcoal (#1C1F1E)" headings, "Graphite (#4A4D4B)" body.
- Info callout: "Info Blue (#3A6FB0) on #DBE8FB."

### Component Prompts
- "Create a multi-step reservation form: a centered 880px white column on a light page, with a thin olive-green progress bar under the title that fills across three steps."
- "Design field rows two-up on desktop (label with small red required dot, white input with 8px radius, olive-green focus glow), collapsing to one column on mobile."
- "Add olive-green outline pill buttons for '인증번호 발송 / 인증하기 / 주소찾기', and a solid olive-green primary button '검증 및 결제 단계로 이동'."

### Incremental Iteration
- Generate the form as ONE long screen first; refine section bands and the progress bar next; then refine the reveal/step states.
- Keep Noto Sans KR for Korean copy; Poppins/Montserrat only for "STEP n" labels and numerals.
- Never introduce orange — the brand accent is olive green; navy and info-blue are the only supporting colors.
