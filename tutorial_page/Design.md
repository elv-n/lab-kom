---
name: NVIDIA
colors:
  primary: "#76b900"
  secondary: "#a7a7a7"
  success: "#3f8500"
  warning: "#ef9100"
  danger: "#e52020"
  info: "#0046a4"
  background: "#ffffff"
  surface: "#ffffff"
  foreground: "#000000"
  border: "#e5e5e5"
colors-dark:
  primary: "#76b900"
  secondary: "#a7a7a7"
  success: "#3f8500"
  warning: "#ef9100"
  danger: "#e52020"
  info: "#0046a4"
  background: "#0a0a0a"
  surface: "#111111"
  foreground: "#e5e5e5"
  border: "#333333"
typography:
  display:
    fontFamily: "NVIDIA-EMEA, Arial, Helvetica, sans-serif"
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.25
  h1:
    fontFamily: "NVIDIA-EMEA, Arial, Helvetica, sans-serif"
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.25
  h2:
    fontFamily: "NVIDIA-EMEA, Arial, Helvetica, sans-serif"
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.25
  body-md:
    fontFamily: "NVIDIA-EMEA, Arial, Helvetica, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: "NVIDIA-EMEA, Arial, Helvetica, sans-serif"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.5
  body-xs:
    fontFamily: "NVIDIA-EMEA, Arial, Helvetica, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.25
spacing:
  xs: 0.25rem
  sm: 0.5rem
  md: 1rem
  lg: 1.5rem
  xl: 2rem
rounded:
  sm: 1px
  md: 2px
  lg: 4px
  xl: 8px
  full: 9999px
---

## Overview

NVIDIA's design system is a high-contrast, technology-forward experience that communicates raw computational power through design restraint. The philosophy is rooted in hardware engineering aesthetics — every element feels machined rather than painted, specified rather than styled. "The green is a signal, not a surface" — this single principle governs the entire system.

## Colors

### Foundation

NVIDIA's color architecture is built on **binary contrast**: True Black (#000000), Pure White (#ffffff), and NVIDIA Green (#76b900) as the singular signal. This stark contrast creates the engineered feel of a PCB board or hardware specification sheet.

### The NVIDIA Green Accent Principle

**Green is a signal, not a surface.** #76b900 appears exclusively as borders, underlines, link indicators, and focus states. Never as background fills or large decorative areas.

### Surface Hierarchy

| Level | Light | Dark | Use |
|-------|-------|------|-----|
| Background | #ffffff | #0a0a0a | Page base |
| Surface | #ffffff | #111111 | Card fills |
| Foreground | #000000 | #e5e5e5 | Primary text |
| Border | #e5e5e5 | #333333 | Dividers |
| Primary | #76b900 | #76b900 | Signal — unchanged |
| Secondary | #a7a7a7 | #a7a7a7 | Gray |
| Success | #3f8500 | #3f8500 | Darker green |
| Warning | #ef9100 | #ef9100 | Amber |
| Danger | #e52020 | #e52020 | Red |
| Info | #0046a4 | #0046a4 | Blue |

### Dark Mode

Dark mode is not an alternate theme — it is the primary expression. Black foundation (#0a0a0a) is where the brand lives most naturally. NVIDIA Green remains constant across modes.

## Typography

**NVIDIA-EMEA** — Custom font family creating an industrial typographic voice. European, pragmatic, engineering-focused.

### Type Scale

| Role | Size | Weight | Line Height |
|------|------|--------|-------------|
| Display Hero | 36px | 700 | 1.25 |
| Section | 24px | 700 | 1.25 |
| Card Title | 20px | 700 | 1.25 |
| Body | 16px | 400 | 1.5 |
| Caption | 14px | 600 | 1.5 |
| Micro | 12px | 400 | 1.25 |

Bold is the default voice — weight 700 for headings, buttons, links. Weight 400 reserved for body text.

## Layout & Spacing

| Token | Value | Usage |
|-------|-------|-------|
| xs | 0.25rem | Micro spacing |
| sm | 0.5rem | Compact padding |
| md | 1rem | Standard gaps |
| lg | 1.5rem | Section spacing |
| xl | 2rem | Large margins |

## Elevation & Depth

Minimal and utilitarian. The primary depth signal is not shadow but color contrast: black backgrounds next to white sections create hardware-like visual layering.

| Level | Shadow | Use |
|-------|--------|-----|
| Level 0 | none | Page backgrounds |
| Level 1 | 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06) | Cards |
| Level 2 | 0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06) | Dropdowns |
| Level 3 | 0 10px 25px rgba(0,0,0,0.15), 0 6px 10px rgba(0,0,0,0.1) | Modals |
| Card | rgba(0,0,0,0.3) 0px 0px 5px | Standard card shadow |

## Shapes

| Token | Value | Usage |
|-------|-------|-------|
| sm | 1px | Micro elements |
| md | 2px | Buttons, cards, inputs — primary radius |
| lg | 4px | Modals |
| xl | 8px | Larger containers |
| full | 9999px | Switches |

Sharp 1-2px radius is the signature — never rounded or pill-shaped for buttons.

## Components

### Buttons

**Primary (Green Border):** Transparent background, 2px solid #76b900 border, 2px radius, black text. Hover fills with teal (#1eaedb).
**Secondary:** 1px solid #76b900 border.

### Cards

2px radius, #ffffff (light) / #1a1a1a (dark) background, card shadow.

### Inputs

2px radius, 1px solid #5e5e5e border. Focus: 2px solid #000000.

## Do's and Don'ts

### Do

- Use NVIDIA Green (#76b900) exclusively as a SIGNAL color — borders, underlines, outlines
- Keep the foundation black-and-white with green pinpricks of accent
- Use sharp 1-2px border radius across all components
- Apply tight 1.25 line-height to headings for dense, authoritative text
- Use 2px solid #76b900 as the primary button border pattern

### Don't

- Don't use the green as a fill on large surfaces or backgrounds
- Don't introduce mid-tone backgrounds — contrast is binary by design
- Don't use rounded or pill-shaped buttons
- Don't use generous line-height on display headers
- Don't use filled green buttons as the primary pattern
