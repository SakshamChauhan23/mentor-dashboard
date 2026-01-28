🧩 Zuvy Brand Guidelines

---

## 1. Brand Color System

### Primary Brand Color — Forest Green

**Role:** Core brand identity and primary actions

* **Primary (`--primary`)**

  * Usage: Primary buttons, main CTAs, key links
  * Light: `#2C5F2D`
  * Dark: `#3A8A3E`

* **Primary Foreground (`--primary-foreground`)**

  * Usage: Text/icons on primary surfaces
  * Color: `#FFFFFF`

* **Primary Light (`--primary-light`)**

  * Usage: Hover states, subtle backgrounds
  * Light: `#E8F5E9`

* **Primary Dark (`--primary-dark`)**

  * Usage: Pressed states, emphasis
  * Light: `#1D4620`

---

### Secondary Brand Color — Sunset Orange

**Role:** Supporting actions and highlights

* **Secondary (`--secondary`)** — `#EB7E2E`
* **Secondary Foreground** — `#FFFFFF`
* **Secondary Light** — `#FDEEE3`
* **Secondary Dark** — `#C66418`

Usage:

* Secondary CTAs
* Highlight elements
* Visual emphasis without overpowering primary

---

### Accent Color — Bright Teal

**Role:** Interaction feedback & UI highlights

* **Accent (`--accent`)** — `#12EA7B`
* **Accent Foreground** — `#1A1A1A`
* **Accent Light** — `#E0FFF0`
* **Accent Dark** — `#0DB862`

Usage:

* Focus states
* Toggles
* Interactive feedback
* Micro-interactions

---

### Semantic Colors

| Type            | Usage                         |
| --------------- | ----------------------------- |
| **Success**     | Confirmations, success states |
| **Destructive** | Errors, delete actions        |
| **Warning**     | Caution, alerts               |
| **Info**        | Informational messages        |

Each semantic color includes:

* Base
* Foreground
* Light background
* Dark / active variant

⚠️ Rule: Never repurpose semantic colors for branding or decoration.

---

### Neutral & Surface Colors

**Greys**

* Grey Light → borders, dividers
* Grey → muted text & icons
* Grey Dark → strong text, dark UI

**Backgrounds**

* Background → primary page background
* Background Secondary → section background
* Card → containers & cards
* Muted → low-emphasis surfaces

---

## 2. Typography System

### Font Families

#### 🎯 Primary Heading Font — Plein

Used for all headings to express brand personality.

* Usage:

  * H1 – H6
  * Section titles
  * Page headers
* CSS:

  ```
  font-family: 'Plein', sans-serif;
  ```

---

#### 🧠 Body & Interface Font — Switzer

Used for readability and functional UI text.

* Usage:

  * Body text
  * Paragraphs
  * Buttons
  * Labels
  * Forms
* CSS:

  ```
  font-family: 'Switzer', sans-serif;
  ```

Both fonts are sourced from **Fontshare (Indian Type Foundry)**.

---

## 3. Type Scale

### Headings (Plein)

| Level | Size             | Line Height |
| ----- | ---------------- | ----------- |
| H1    | 88px (5.5rem)    | 1.3         |
| H2    | 64px (4rem)      | 1.3         |
| H3    | 48px (3rem)      | 1.3         |
| H4    | 36px (2.25rem)   | 1.3         |
| H5    | 28px (1.75rem)   | 1.3         |
| H6    | 21px (1.3125rem) | 1.3         |

---

### Body Text (Switzer)

| Style   | Size | Line Height |
| ------- | ---- | ----------- |
| Body 1  | 16px | 1.5         |
| Body 2  | 14px | 1.5         |
| Caption | 12px | 1.5         |

---

## 4. Font Weights

| Weight          | Usage                      |
| --------------- | -------------------------- |
| Light (300)     | Subtle text (Switzer only) |
| Regular (400)   | Default body text          |
| Medium (500)    | Emphasis, subheadings      |
| Semi-bold (600) | Strong subheadings         |
| Bold (700)      | Headings & key emphasis    |

---

## 5. Text Color Hierarchy

| Type             | Usage                       |
| ---------------- | --------------------------- |
| Text Primary     | Headings, important content |
| Text Secondary   | Body text                   |
| Text Tertiary    | Labels, captions            |
| Text Muted       | Placeholders, disabled      |
| Text Accent      | Links, emphasized text      |
| Text Interactive | Hover & active states       |

---

## 6. Core Usage Rules

### Color Rules

* Primary Green = main action only
* Never mix Primary and Accent in one CTA
* Do not use Semantic colors decoratively
* Always maintain WCAG AA contrast

### Typography Rules

* Never use Plein for long paragraphs
* Use Switzer for all readable content
* Avoid more than **3 font weights** on one screen
* Maintain consistent hierarchy across pages
