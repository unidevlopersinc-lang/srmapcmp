# SRM AP College Portal

## Overview

SRM AP College Portal is a modern student management system built as a static demonstration application. The application provides a comprehensive interface for managing student records, academic performance, attendance tracking, and fee management for SRM University Andhra Pradesh.

**Key Features:**
- Admin dashboard with comprehensive analytics and KPIs
- Student portal for viewing personal academic records
- Real-time data visualization with charts and graphs
- Responsive design optimized for desktop, tablet, and mobile devices
- Client-side authentication (demo purposes only)
- Synthetic student data generation (1000+ records)

**Technology Focus:** This is a static React application designed to run on GitHub Pages without backend dependencies. All data is generated client-side and stored in browser localStorage for session persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tool:**
- React 18 with TypeScript for type safety
- Vite as the build tool and development server
- Component-based architecture with functional components and React hooks

**Routing:**
- Wouter for lightweight client-side routing
- Protected route wrapper for authentication enforcement
- Route definitions in `App.tsx` with admin/student role-based access control

**State Management:**
- React Context API for global state (authentication, theme)
- Local component state with `useState` for UI interactions
- TanStack Query (React Query) for data fetching and caching patterns
- No external state management library (Redux, Zustand, etc.) needed

**UI Component System:**
- Shadcn/ui component library built on Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Component configuration in `components.json` with "new-york" style variant
- Custom theme system supporting light/dark modes via CSS variables

**Design System:**
- Typography: Montserrat font family (weights 300/400/600/700)
- Color palette: Teal (#08AEEA), Purple (#7C5CFF), Orange (#FFB86B) accent colors
- Spacing: Tailwind's default spacing scale (2, 4, 6, 8, 12, 16, 20, 24 units)
- Border radius: Custom values (9px, 6px, 3px)
- Accessibility: ARIA labels, keyboard navigation, `prefers-reduced-motion` support

**Key UI Patterns:**
- Sidebar navigation with collapsible menu (SidebarProvider from shadcn/ui)
- Card-based layouts for data presentation
- Animated counters for KPI metrics with intersection observer
- Skeleton loaders for loading states
- Toast notifications for user feedback
- Tabs for organizing content sections

### Data Layer

**Student Data Generation:**
- Client-side synthetic data generation in `generateStudents.ts`
- Deterministic random data using seeded functions for consistency
- Schema validation with Zod (`shared/schema.ts`)
- Generates 1000-1300 student records with realistic Indian names, addresses, and academic data

**Data Schema:**
- Student records include: personal info, academic performance (SGPA/CGPA), attendance, fee status, hostel details
- Subject records with internal marks, assignments, end-semester exams, and grades
- Branch options: CSE, ECE, EEE, MECH, CIVIL, IT
- Year levels: 1-4, Sections: A-D

**Data Persistence:**
- LocalStorage for authentication state persistence
- Session-based data (students) regenerated on each app load
- No backend database or API calls

### Authentication System

**Implementation:**
- Client-side only authentication context (`lib/auth.tsx`)
- Two user types: Admin and Student
- Admin credentials: hardcoded in `shared/schema.ts` (email: admin@srmap.edu.in, password: demo123)
- Student login: roll number + date of birth validation

**Security Considerations:**
- Explicit security warnings displayed on login page
- All credentials visible in client-side code
- Demo-only implementation - NOT suitable for production use
- No encryption, hashing, or secure token management

**Session Management:**
- Authentication state stored in React Context
- Persistence via localStorage with JSON serialization
- Protected routes redirect unauthenticated users to login
- Role-based access control (admin vs student views)

### Page Architecture

**Route Structure:**
- `/` - Login page (public)
- `/dashboard` - Admin dashboard with analytics (admin only)
- `/students` - Student list with filters and search (admin only)
- `/students/:roll` - Individual student profile (admin only)
- `/profile` - Student's personal profile view (student only)
- `/analytics` - Advanced analytics and charts (admin only)

**Dashboard Features:**
- KPI cards with animated counters (total students, avg CGPA, attendance, fees)
- Grade distribution charts
- Branch-wise performance analysis
- Recent student activity feed
- Attendance and performance visualizations

**Student Management:**
- Virtualized list rendering for performance with large datasets
- Multi-filter support (branch, year, section)
- Real-time search across student names and roll numbers
- Incremental loading (50 items per page)
- Export functionality (planned)

### Performance Optimizations

**Code Splitting:**
- Route-based code splitting via Vite
- Lazy loading of heavy components (charts, tables)
- Build configuration in `vite.config.ts`

**Rendering Optimizations:**
- `useMemo` hooks for expensive calculations (filtering, aggregations)
- `useCallback` for stable function references
- Skeleton loaders to improve perceived performance
- Intersection Observer API for scroll-triggered animations

**Build Process:**
- Custom build script (`script/build.ts`)
- Server and client bundled separately
- ESBuild for server-side bundling
- Vite for optimized client bundle with tree-shaking

## External Dependencies

### Core Framework Dependencies

**React Ecosystem:**
- `react` & `react-dom` - Core React library (v18+)
- `@tanstack/react-query` - Server state management and caching
- `react-hook-form` - Form state management
- `@hookform/resolvers` - Schema validation integration for forms
- `zod` & `zod-validation-error` - Runtime type validation

**Routing:**
- `wouter` - Lightweight routing library (alternative to React Router)

**UI Component Libraries:**
- `@radix-ui/*` packages - Headless UI primitives for 30+ components
- `class-variance-authority` - Component variant utilities
- `clsx` & `tailwind-merge` - Conditional class name utilities
- `cmdk` - Command palette component
- `embla-carousel-react` - Carousel/slider component

**Styling:**
- `tailwindcss` - Utility-first CSS framework
- `autoprefixer` - CSS vendor prefixing
- `postcss` - CSS processing

### Development & Build Tools

**TypeScript & Bundling:**
- `typescript` - Type checking and compilation
- `vite` - Build tool and development server
- `@vitejs/plugin-react` - React support for Vite
- `esbuild` - Fast JavaScript bundler

**Replit-Specific Plugins:**
- `@replit/vite-plugin-runtime-error-modal` - Development error overlay
- `@replit/vite-plugin-cartographer` - Code navigation tool
- `@replit/vite-plugin-dev-banner` - Development environment banner

### Backend (Express Server - Currently Minimal)

**Note:** While the project includes an Express server setup, the current implementation is primarily client-side focused. The backend infrastructure exists for future expansion.

**Server Framework:**
- `express` - Web application framework
- `cors` - Cross-origin resource sharing
- Database tooling present but not actively used:
  - `drizzle-orm` - TypeScript ORM
  - `drizzle-kit` - Schema management
  - `pg` - PostgreSQL client
  - `connect-pg-simple` - PostgreSQL session store

**Session Management (Inactive):**
- `express-session` - Session middleware
- `memorystore` - In-memory session store

**Utilities:**
- `nanoid` - Unique ID generation
- `date-fns` - Date manipulation library

### Font Integration

**External Resource:**
- Google Fonts API for Montserrat font family
- Loaded via CDN link in `client/index.html`
- Multiple font families preloaded but Montserrat is primary

### Data Visualization

**Chart Libraries:**
- Chart rendering handled through custom React components
- No external charting library dependency (uses CSS-based visualization)
- Progress bars and distribution charts built with Radix UI primitives

### Browser APIs Used

- LocalStorage API - Authentication persistence
- Intersection Observer API - Scroll-triggered animations
- Media Query API - Responsive design and reduced motion detection
- Date API - Timestamp generation and formatting