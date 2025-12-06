# SRM AP College Portal - Design Guidelines

## Design Approach
**Reference-Based Approach**: Modern education management platform inspired by Linear's clean interface + Notion's card-based layouts + Apple's minimalism. Emphasis on data visualization clarity and professional academic aesthetics.

## Brand Identity
- **Brand Name**: SRM AP College Portal
- **Logo**: Text-based logo with simple geometric mark (academic/institutional motif)
- **Primary Background**: Pure white (#FFFFFF) for main content areas
- **Visual Style**: Modern, polished, professional academic portal with glassy panels and sophisticated data presentation

## Typography System
**Font Family**: Montserrat (Google Fonts) exclusively

**Scale**:
- Hero/Display: 700 weight, 2.5rem-4rem
- Page Headings (h1): 600 weight, 2rem-2.5rem
- Section Headings (h2): 600 weight, 1.5rem-1.75rem
- Subsection (h3): 600 weight, 1.25rem
- Body Text: 400 weight, 1rem
- Labels/Captions: 400 weight, 0.875rem
- Micro Copy: 300 weight, 0.75rem

## Color System
**Accent Colors**:
- Primary Teal: #08AEEA (CTAs, primary actions, active states)
- Secondary Purple: #7C5CFF (secondary actions, highlights, charts)
- Warm Accent Orange: #FFB86B (warnings, pending status, energy accents)

**Neutrals**:
- Text Primary: #1A1A1A
- Text Secondary: #666666
- Text Tertiary: #999999
- Border Light: #E5E5E5
- Border Medium: #CCCCCC
- Background Cards: #FAFAFA with subtle gradient
- Background Overlay: rgba(255,255,255,0.85) for glassy panels

**Semantic Colors**:
- Success/High: #10B981 (good attendance, high grades)
- Warning: #FFB86B (pending fees, moderate attendance)
- Error/Low: #EF4444 (low attendance, unpaid fees)

## Layout & Spacing System
**Tailwind Spacing Units**: Use 2, 4, 6, 8, 12, 16, 20, 24 units consistently

**Structure**:
- Desktop: Left sidebar navigation (280px fixed) + main content area
- Tablet: Collapsible sidebar or top navigation bar
- Mobile: Hamburger menu + stacked single column

**Container Widths**:
- Dashboard cards: max-w-7xl
- Data tables: w-full with horizontal scroll on mobile
- Forms: max-w-2xl centered

**Spacing**:
- Section padding: py-8 (mobile), py-12 (desktop)
- Card padding: p-6 (mobile), p-8 (desktop)
- Element gaps: gap-4 to gap-8

## Component Design Patterns

### Cards & Panels
- Border radius: 12-16px (rounded-xl to rounded-2xl)
- Shadow: Soft layered shadows (0 4px 6px -1px rgba(0,0,0,0.1))
- Glassy effect: White background with subtle border, optional backdrop blur for overlays

### Navigation
- Desktop: Fixed left sidebar with logo at top, nav items with icons, user profile at bottom
- Active state: Teal background with rounded corners
- Hover: Light background highlight

### KPI/Stats Cards
- Large number display (2.5rem, 700 weight)
- Icon in top-right corner (teal or purple)
- Trend indicator with small chart or percentage
- 4-column grid on desktop, 2-column on tablet, stacked on mobile

### Data Table
- Header: Sticky, white background with bottom border
- Rows: Alternating subtle background (white/#FAFAFA), hover state with light teal tint
- Virtual scrolling for 1000+ records
- Search bar with icon, filter dropdowns (branch/year/section)

### Student Profile View
- Top section: Avatar/photo + name + roll number + key stats horizontally
- Tabbed sections: Personal Info | Academic Records | Fee Status | Hostel | Attendance
- Subject cards: 6 cards in 2-column grid showing internal marks, assignments, end-sem, total, grade with visual grade badge

### Forms (Login)
- Centered card on page
- Input fields with subtle borders, focused state with teal outline
- Large submit button with teal background
- Security warning banner at top (orange background, warning icon)

## Animations & Interactions

### Hero Section
- Animated SVG illustration or Lottie animation (education/data theme)
- Subtle floating/breathing animation on load
- Hero image option: Large background with gradient overlay, blurred background for text readability

### Micro-Interactions
- Button hover: Slight scale (scale-105), deeper shadow
- Card hover: Lift effect (translateY -2px), enhanced shadow
- Table row hover: Background color transition
- Icon animations: Subtle rotate or bounce on interaction

### Loading States
- Skeleton loaders: Animated gradient shimmer on card placeholders
- KPI numbers: Count-up animation on page load (0 to actual value)
- Page transitions: Fade in content with stagger delay

### Performance
- `prefers-reduced-motion` support: Disable all non-essential animations
- Smooth scrolling with `scroll-behavior: smooth`

## Accessibility Requirements
- ARIA labels on all interactive controls (`aria-label`, `aria-expanded`)
- Keyboard navigation: Tab order, Enter/Space activation, Escape for modals
- Contrast ratios: Minimum 4.5:1 for text, 3:1 for UI components
- Focus indicators: Visible outline on all focusable elements (teal)
- Screen reader support: Semantic HTML, proper heading hierarchy

## Images
**Hero Section**: Yes, large hero image recommended
- Type: Modern education/campus photograph with gradient overlay (dark to transparent)
- Overlay: Linear gradient from rgba(26,26,26,0.6) to transparent
- Content: Centered text with blurred background buttons (backdrop-filter: blur(10px))
- Buttons on hero: White/teal background with blur effect, no hover color changes (inherit component hover states)

**Dashboard**: Small illustrative icons/graphics for empty states and onboarding

**Student Profiles**: Placeholder avatar circles with initials when no photo available