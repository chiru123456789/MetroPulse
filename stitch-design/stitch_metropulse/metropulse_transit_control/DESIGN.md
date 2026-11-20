---
name: MetroPulse Transit Control
colors:
  surface: '#051424'
  surface-dim: '#051424'
  surface-bright: '#2c3a4c'
  surface-container-lowest: '#010f1f'
  surface-container-low: '#0d1c2d'
  surface-container: '#122131'
  surface-container-high: '#1c2b3c'
  surface-container-highest: '#273647'
  on-surface: '#d4e4fa'
  on-surface-variant: '#bcc9cd'
  inverse-surface: '#d4e4fa'
  inverse-on-surface: '#233143'
  outline: '#869397'
  outline-variant: '#3d494c'
  surface-tint: '#4cd7f6'
  primary: '#4cd7f6'
  on-primary: '#003640'
  primary-container: '#06b6d4'
  on-primary-container: '#00424f'
  inverse-primary: '#00687a'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#ffb95f'
  on-tertiary: '#472a00'
  tertiary-container: '#e79400'
  on-tertiary-container: '#563400'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#acedff'
  primary-fixed-dim: '#4cd7f6'
  on-primary-fixed: '#001f26'
  on-primary-fixed-variant: '#004e5c'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#051424'
  on-background: '#d4e4fa'
  surface-variant: '#273647'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  data-metric-xl:
    fontFamily: JetBrains Mono
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 32px
  data-metric-lg:
    fontFamily: JetBrains Mono
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 24px
  data-metric-sm:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 18px
  telemetry-code:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.05em
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 0.75rem
  gutter-lg: 1rem
  margin: 1rem
  margin-lg: 1.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

This design system is engineered for mission-critical urban transit command centers and high-fidelity operational interfaces. It operates under two distinct environments: an ultra-high-density, low-glare dark control center dashboard for dispatchers and transit engineers, and a clean, high-clarity daylight interface for field operators and passenger-facing screens.

The visual style merges technical precision minimalism with high-density data telemetry. It balances dense tabular layouts, SVG transit schematic overlays, and compact sensor gauges without cognitive fatigue. Visual hierarchy prioritizes instant anomaly identification, deterministic state messaging, and optical clarity across multi-display video walls and ruggedized field tablets.

## Colors

The operational palette is anchored in deep cosmic navy and dark slate layers to eliminate back-illumination strain in dim control centers, while maintaining crisp contrast for safety indicators.

### Theme Modes
- **Operator Theme (Default / Dark):**
  - Base canvas: `#0B111E`
  - Elevated surfaces: Surface Layer 1 (`#131D31`), Surface Layer 2 (`#1A2640`)
  - Structural strokes & dividers: `#223354`
  - Typography: High-contrast primary (`#F1F5F9`), secondary/muted slate (`#94A3B8`), subtle timestamps (`#64748B`)
- **Field & Passenger Theme (Light):**
  - Base canvas: `#F8FAFC`
  - Elevated cards & sheets: `#FFFFFF`
  - Structural strokes: `#E2E8F0`
  - Typography: Dark slate headings (`#0F172A`), muted text (`#64748B`)

### Status & State Telemetry
- **Nominal / Optimal Flow:** Emerald (`#10B981`) and Cyan (`#06B6D4`). Applied to sub-65% platform capacity, active IoT nodes, and on-time train movements.
- **Moderate Congestion / Watch:** Amber (`#F59E0B`) and Orange (`#EA580C`). Triggered between 65%–85% station/train occupancy and latency jitter.
- **Critical Density / Anomaly Alert:** Red (`#EF4444`) and Crimson (`#DC2626`). Triggered above 85% capacity, platform edge boundary violations, and sensor offline states.

## Typography

Typography prioritizes rapid scannability and structural alignment under time-sensitive transit decisions.

- **Primary Interface (Inter):** Leveraged for all structural labels, navigation states, modals, and narrative descriptions. Uppercase transforms (`label-caps`) are reserved for metadata categorization, station track headers, and status flags.
- **Telemetry & Numbers (JetBrains Mono):** Reserved for numerical values, IoT identifiers (`MAC / Sensor UUID`), Unix timestamps, headways, passenger counts, and occupancy percentages. Tabular figures prevent layout jumping during continuous real-time data streaming.

## Layout & Spacing

The layout model enforces a high-density, compact responsive grid engineered for multi-panel control consoles, operations wall displays, and responsive terminal screens.

- **Grid Architecture:** 12-column or 24-column compact fluid grid on control consoles. Desktop environments use a tight `0.75rem` to `1rem` gutter to maximize operational screen real estate.
- **Section Margins:** `1rem` on compact displays, expanding to `1.5rem` on ultra-wide station operations views.
- **Vertical Rhythm:** Information grouping follows strict 4px/8px incremental boundaries. Dense tabular rows maintain a strict 36px or 40px height to maximize visible entries above the fold.
- **Reflow Logic:** In mobile or handheld field inspector modes, lateral telemetry grids collapse into vertically stacked metric modules with horizontal swipe gestures for coach-by-coach rail composition diagrams.

## Elevation & Depth

This system avoids heavy physical drop shadows in favor of precise tonal surfacing, structural borders, and translucent containment layers.

- **Base Layering:** Canvas sits at the deepest value (`#0B111E`). Modules, monitoring cards, and telemetry blocks sit on `Surface-1` (`#131D31`). Popovers, dropdowns, and tactical dialogs rest on `Surface-2` (`#1A2640`).
- **Low-Contrast Outlines:** Every card, chart container, and metric panel is enclosed by a fine 1px border (`#223354`). No blurred multi-layered shadows are used for basic structural containers.
- **Overlay Panels & HUDs:** Video feeds, platform heatmaps, and spatial schematic overlays utilize a 60% opacity dark glass backdrop blur (`rgba(11, 17, 30, 0.75)` with `backdrop-filter: blur(8px)`) bounded by a subtle cyan-tinted stroke (`rgba(6, 182, 212, 0.3)`).
- **Alert Elevation:** Critical anomaly alerts apply an ambient red glow (`box-shadow: 0 0 16px rgba(239, 68, 68, 0.25)`) to direct field operator focus instantly across expansive visual displays.

## Shapes

The design system employs a soft-edged industrial shape language (Level 1: 0.25rem base radius). Corner radii remain disciplined and compact to conserve pixel grid fidelity and project utilitarian rigor.

- **Standard Elements (0.25rem / 4px):** Applied to buttons, input fields, badge pills, telemetry containers, and tabular rows.
- **Medium Panels (0.5rem / 8px):** Applied to root operational modules, video telemetry wrappers, and floating modal alerts.
- **Data Indicator Bars:** Progress bars, coach indicators, and capacity meters maintain sharp or minimal 2px terminal radii to avoid visual inaccuracy when reading fill percentages.

## Components

### Metric & KPI Telemetry Cards
- **Structure:** Compact panels with a 1px border (`#223354`), background (`#131D31`), padding `space-md` (12px).
- **Layout:** Top row contains metric label (`label-caps`, `#94A3B8`) paired with an IoT device ping indicator. Center displays the numeric value in `JetBrains Mono` (`data-metric-xl`), accompanied by trend indicators (e.g., `+12.4% / 5m`).

### Status Badges & Live Indicators
- **Format:** Micro-pills with `0.25rem` radius, 4px vertical / 8px horizontal padding.
- **Live State:** Accompanied by a 6px circular indicator dot. Normal (`#10B981`) pulses every 2 seconds. Critical (`#EF4444`) features a rapid 1-second warning pulse animation (`scale(1.4)` opacity cycle).

### Occupancy Progress Bars & Train Coach Capacity Diagrams
- **Linear Gauge:** 6px track height with dark background (`#1A2640`). Segmented or continuous fill dynamically colored by threshold:
  - 0% - 64%: `#06B6D4`
  - 65% - 84%: `#F59E0B`
  - 85% - 100%: `#EF4444`
- **Coach Schematic:** Horizontal array representing train cars (e.g., Cars 1 through 8). Each car is rendered as an isolated rounded rect containing a passenger count, live load percentage, and directional egress arrow indicators.

### IoT Device Health Indicators
- **Nodes:** Compact matrix listing device type (Optical Sensor, LiDAR Flow, Turnstile Gate), IP/UUID in `telemetry-code`, ping latency (ms), and operational status icon.
- **States:** Connected (`#10B981`), High Latency (`#F59E0B`), Packet Loss / Hardware Fault (`#EF4444`).

### Video Telemetry Overlays
- **Composition:** Live CCTV/LiDAR platform video feed framed with tactical corner crosshairs.
- **HUD Overlays:** Dark translucent panels (`rgba(11, 17, 30, 0.75)`) docked to corners displaying real-time bounding boxes, optical headcount stats, platform edge clearance warnings, and camera stream frame rates.

### Tactical Navigation & View Tabs
- **Tab Rails:** Flat, border-bottom anchored navigation using `0.25rem` pill backgrounds for active states (`#1A2640` with a 2px active cyan underline `#06B6D4`). Text utilizes `Inter` medium with clean visual separation.