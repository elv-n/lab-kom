---
name: Notion
colors:
  primary: "#0075de"
  secondary: "#615d59"
  success: "#2a9d99"
  warning: "#dd5b00"
  danger: "#dd5b00"
  info: "#213183"
  background: "#ffffff"
  surface: "#ffffff"
  foreground: "rgba(0, 0, 0, 0.95)"
  border: "rgba(0, 0, 0, 0.1)"
colors-dark:
  primary: "#4da3f0"
  secondary: "#a8a5a0"
  success: "#3dbdb9"
  warning: "#f07020"
  danger: "#f07020"
  info: "#6878c8"
  background: "#191919"
  surface: "#1e1e1e"
  foreground: "rgba(255, 255, 255, 0.92)"
  border: "rgba(255, 255, 255, 0.1)"
typography:
  display-hero:
    fontFamily: "'Inter', -apple-system, system-ui, 'Segoe UI', Helvetica, Arial, sans-serif"
    fontSize: 64px
    fontWeight: 700
    lineHeight: 1.00
    letterSpacing: -2.125px
  section:
    fontFamily: "'Inter', -apple-system, system-ui, 'Segoe UI', Helvetica, Arial, sans-serif"
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.00
    letterSpacing: -1.5px
  subheading:
    fontFamily: "'Inter', -apple-system, system-ui, 'Segoe UI', Helvetica, Arial, sans-serif"
    fontSize: 26px
    fontWeight: 700
    lineHeight: 1.23
    letterSpacing: -0.625px
  body-md:
    fontFamily: "'Inter', -apple-system, system-ui, 'Segoe UI', Helvetica, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.50
  body-sm:
    fontFamily: "'Inter', -apple-system, system-ui, 'Segoe UI', Helvetica, Arial, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.43
  body-xs:
    fontFamily: "'Inter', -apple-system, system-ui, 'Segoe UI', Helvetica, Arial, sans-serif"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.33
    letterSpacing: 0.125px
spacing:
  xs: 0.25rem
  sm: 0.5rem
  md: 1rem
  lg: 1.5rem
  xl: 2rem
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px
---

## Overview

Notion's design philosophy treats the interface as a blank canvas where every surface is a composition of small primitives, treated with editorial typographic care. The UI gets out of the user's way — white, warm, and quiet — while whisper-thin borders create structure without weight. Notion Blue (#0075de) is the singular saturated accent, used surgically for moments that matter.

## Colors

### Foundation

The Notion palette is built on warm neutrals with deliberate yellow-brown undertones. Every gray carries micro-warmth, eliminating the cold clinical feel of blue-tinted grays. There are no cool grays in the system.

### The Singular Accent Rule

Notion Blue (#0075de) is the **only** saturated color in the core UI. It appears on primary CTAs, active focus states, and links — and nowhere else. When blue appears, it commands immediate attention because the eye has no competing color to process.

### Surface Hierarchy

| Level | Light Mode | Dark Mode | Use |
|-------|-----------|-----------|-----|
| Background | #ffffff | #191919 | Page canvas |
| Surface | #ffffff | #1e1e1e | Cards, panels |
| Border | rgba(0,0,0,0.1) | rgba(255,255,255,0.1) | Dividers, outlines |
| Interactive | #0075de | #4da3f0 | CTAs, links |
| Foreground | rgba(0,0,0,0.95) | rgba(255,255,255,0.92) | Primary text |
| Secondary | #615d59 | #a8a5a0 | Supporting text |
| Muted | #a39e98 | #6b6763 | Captions, metadata |

### Dark Mode: "Warm Descent"

Dark mode descends to #191919 — a warm near-black with subtle brown undertones. Surfaces lift slightly to #1e1e1e. Notion Blue brightens from #0075de to #4da3f0 for visibility. The whisper border philosophy survives mode switching.

### Semantic Colors

| Token | Light | Dark |
|-------|-------|------|
| Background | #ffffff | #191919 |
| Surface | #ffffff | #1e1e1e |
| Foreground | rgba(0,0,0,0.95) | rgba(255,255,255,0.92) |
| Border | rgba(0,0,0,0.1) | rgba(255,255,255,0.1) |
| Primary | #0075de | #4da3f0 |
| Secondary | #615d59 | #a8a5a0 |
| Success | #2a9d99 | #3dbdb9 |
| Warning | #dd5b00 | #f07020 |
| Danger | #dd5b00 | #f07020 |
| Info | #213183 | #6878c8 |

### Signature Details

**The Whisper Border Philosophy**: Borders at rgba(0,0,0,0.1) are ultra-thin and barely perceptible, creating structure through suggestion. **The Warm Overlay**: Modal overlays use rgba(0,0,0,0.4) — never pure black.

## Typography

**Inter** — A variable font with tall x-height and open apertures. Notion uses four specific weights: 400 (body), 500 (UI), 600 (emphasis), 700 (headings).

### Type Scale

| Role | Size | Weight | Line Height | Letter Spacing |
|------|------|--------|-------------|----------------|
| Display Hero | 64px | 700 | 1.00 | -2.125px |
| Section | 48px | 700 | 1.00 | -1.5px |
| Sub-heading | 26px | 700 | 1.23 | -0.625px |
| Body | 16px | 400 | 1.50 | normal |
| Caption | 14px | 500 | 1.43 | normal |
| Badge | 12px | 600 | 1.33 | +0.125px |

### The Aggressive Tracking Principle

Notion applies increasingly aggressive negative letter-spacing at larger sizes — from -0.625px at 26px to -2.125px at 64px. At 16px body text, tracking returns to normal.

## Layout & Spacing

| Token | Value | Usage |
|-------|-------|-------|
| xs | 0.25rem | Micro spacing |
| sm | 0.5rem | Compact padding |
| md | 1rem | Standard padding |
| lg | 1.5rem | Section gaps |
| xl | 2rem | Large margins |

## Elevation & Depth

### The Layered Paper Shadow System

Each shadow stack uses 4-5 layers with individual opacity never exceeding 0.05 in light mode — mimicking natural light on a stack of paper.

| Level | Light Mode | Dark Mode | Use |
|-------|-----------|-----------|-----|
| Level 0 | none | none | Flat surfaces |
| Level 1 | 4-layer stack (max 0.04) | Darker ambient (max 0.2) | Default card shadow |
| Level 2 | 4-layer stack (max 0.06) | Stronger ambient (max 0.25) | Hovered card |
| Level 3 | 5-layer stack (max 0.05) | Deep ambient (max 0.3) | Modals, popovers |

When shadows feel too heavy, Notion defaults to whisper borders instead of elevation.

## Shapes

| Token | Value | Usage |
|-------|-------|-------|
| sm | 4px | Inputs, checkboxes |
| md | 8px | Buttons, tables, alerts |
| lg | 12px | Cards |
| xl | 16px | Modals |
| full | 9999px | Badges, avatars, pills |

Notion uses 8px for buttons (never pill-shaped), 12px for cards, 4px for inputs.

## Components

### Buttons

**Primary**: #0075de background, white text, 8px radius, flat (no shadow). Hover: #097fe8. Active: #005bab.
**Secondary**: White surface, whisper border, same 8px radius.
**Ghost**: Transparent, blue text, no border.

### Inputs

4px radius, whisper border, 14px font. Focus: blue border with soft ring.

### Cards

12px radius, whisper border, level 1 paper shadow. Interactive variant uses no shadow change on hover.

### Modals

16px radius, level 3 shadow, warm overlay (rgba(0,0,0,0.4)). The highest elevation in the system.

## Do's and Don'ts

### Do

- Use Notion Blue (#0075de) only for primary CTAs and links — the singular accent
- Use whisper borders (rgba(0,0,0,0.1)) for all containers
- Apply near-black text (rgba(0,0,0,0.95)) — never pure #000000
- Use warm neutral grays — no cold grays allowed
- Apply aggressive negative letter-spacing at display sizes
- Use the four-layer paper shadow for elevated surfaces
- Use border-radius 8px for buttons, 12px for cards, 4px for inputs

### Don't

- Don't use pure black (#000000) for text
- Don't apply Notion Blue to background fills or large surfaces
- Don't use cold blue-tinted grays
- Don't use heavy shadows with single-layer opacity >0.05
- Don't introduce additional saturated accent colors
- Don't use font weights outside the 400-500-600-700 system
- Don't use pill-shaped buttons (border-radius: 9999px)
