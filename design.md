# MediSnap Frontend — System Design & Architecture Specification (`design.md`)

## 1. Executive Summary & Vision

**MediSnap** is an AI-powered precision health platform, tele-consultation workspace, and health gamification engine designed to bridge healthcare accessibility and health monitoring across Nepal and international communities. 

The MediSnap Frontend is engineered as a responsive, resilient, single-page web application (SPA) built with React 18, Vite, Tailwind CSS, MediaPipe AI Pose Detection, WebRTC, and Zustand. It serves three primary user personas:
1. **Patients / General Users**: Accessing symptom checks, prescription scanners, medical history analytics, tele-consultations, health quests/gamification, family health tracking, and rewards.
2. **Medical Consultants / Doctors**: Managing appointments, conducting live video tele-consultations, issuing prescription insights, monitoring patient panels, and viewing earning transactions.
3. **System Administrators**: Managing consultant onboarding/verifications, platform analytics, user roles, and platform settings.

---

## 2. Technology Stack & Dependencies

| Category | Technology / Library | Purpose & Rationale |
| :--- | :--- | :--- |
| **Core Framework** | **React 18** | Concurrent rendering, hook-based UI components, Suspense code-splitting |
| **Build & Dev Tooling**| **Vite 7** | Hyper-fast HMR, ES modules bundling, quick build times |
| **Styling Engine** | **Tailwind CSS 3.3** | Utility-first design, custom theme tokens, typography plugin |
| **Typography** | **Google Fonts** | `Outfit` (Headings), `Inter` (Body & UI), `Noto Sans Devanagari` (Nepali) |
| **Icons & Media** | **Lucide React** | Lightweight, SVG-based unified medical & UI icon set |
| **State Management** | **Zustand 4** | Modular, un-opinionated state stores (`authStore`, `healthStore`, `gameStore`, etc.) |
| **Routing** | **React Router DOM 6** | Dynamic client-side routing, protected role-based guard layouts |
| **AI Computer Vision**| **MediaPipe Pose / TFJS**| Edge AI pose tracking for gamified physical health quests & rep counting |
| **Realtime Video/Audio**| **WebRTC / Native API** | Peer-to-peer live tele-consultation rooms with audio/video/screen share |
| **Internationalization**| **i18next / react-i18next**| Seamless multi-language toggling (English & Nepali `[lang="ne"]`) |
| **Notifications & Forms**| **React Hot Toast**, **React Hook Form + Zod** | Toast feedback, validated form controls with schema enforcement |
| **Charts & Maps** | **Recharts**, **Leaflet / React-Leaflet** | Interactive medical diagnostics visualization & pharmacy/hospital mapping |

---

## 3. Design Tokens & Visual Design System

MediSnap adheres to a **Modern Clinical Tech Design Aesthetic**, combining high-trust medical blues and crisp clinical white/slate backgrounds with vibrant accent colors for gamification and clear status indicators.

### 3.1 Color Palette Tokens (`tailwind.config.js`)

#### Primary Brand Spectrum (Clinical Blue)
- `primary-50`: `#eff6ff` — Subtle active states & card hover highlights
- `primary-100`: `#dbeafe` — Badge backgrounds, soft chips, tab highlights
- `primary-500`: `#3b82f6` — Interactive elements, focus rings, secondary CTAs
- `primary-600`: `#2563eb` — **Main Brand Color**: Buttons, key links, active icons
- `primary-700`: `#1d4ed8` — Hover state for primary buttons
- `primary-900`: `#1e3a8a` — High-contrast text highlights & dark accent text

#### Semantic Feedback Colors
- **Success** (`#10b981` / `#047857`): Approved bookings, completed quests, healthy metrics
- **Warning** (`#f59e0b` / `#b45309`): Moderate health risks, pending appointments
- **Error / Critical** (`#ef4444` / `#b91c1c`): High risk alerts, cancelled calls, deletion actions
- **Neutral Surface**: `bg-gray-50` (Page Canvas), `bg-white` (Container Surfaces), `border-gray-100`/`border-gray-200` (Structural Dividers)

### 3.2 Typography System

MediSnap utilizes a dynamic multi-lingual font stack designed for extreme legibility across complex medical terminology and Devanagari script.

```javascript
fontFamily: {
  sans: ["Inter", "Noto Sans Devanagari", "system-ui", "sans-serif"],
  heading: ["Outfit", "Inter", "system-ui", "sans-serif"],
  nepali: ["Noto Sans Devanagari", "sans-serif"],
}
```

- **Headings (`Outfit`)**: High structural clarity, geometric confidence (`font-extrabold`, `font-bold`).
- **Body & Controls (`Inter`)**: High readability at `text-xs` (12px), `text-sm` (14px), and `text-base` (16px).
- **Localized Devanagari (`Noto Sans Devanagari`)**: Activated globally when `[lang="ne"]` attribute is toggled on document root.

### 3.3 Surface Cards & Elevation Tokens

- **Default Card (`.card`)**: `bg-white rounded-2xl border border-gray-100 p-6 shadow-card`
- **Interactive Card (`.card-hover`)**: `hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200`
- **Inputs & Form Controls (`.input`)**: `w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100`
- **Primary Action (`.btn-primary`)**: `bg-primary-600 text-white hover:bg-primary-700 rounded-lg shadow-sm hover:shadow-md transition-all`

### 3.4 Animation & Motion Tokens

- `fade-in`: `fadeIn 0.5s ease-in` (Smooth page transitions)
- `slide-up`: `slideUp 0.5s ease-out` (Modal popups, drawer slides)
- `animate-float`: `float 6s ease-in-out infinite` (Gamification badges & landing hero visuals)
- `pulse-slow`: `pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite` (Live call & active AI tracking indicators)

---

## 4. Architecture & Layout Framework

MediSnap isolates layouts into persistent wrappers with role-based routing controls (`src/components/layout/`).

```
+-------------------------------------------------------------------------+
|                              Navbar / Topbar                            |
+-------------------+-----------------------------------------------------+
|                   |                                                     |
|      Sidebar      |                  Main Content Area                  |
|                   |  (Suspense Lazy Loaded Page via React Router DOM)  |
|  - Patient Links  |                                                     |
|  - Doctor Links   |                                                     |
|  - Admin Links    |                                                     |
|  - User Profile   |                                                     |
|                   |                                                     |
+-------------------+-----------------------------------------------------+
|                       Footer (Landing & Public Pages)                   |
+-------------------------------------------------------------------------+
```

### 4.1 Layout Components
1. **`Navbar.jsx`**: Public navigation header with logo, language selector (EN/NE), user avatar status, and CTA buttons.
2. **`Sidebar.jsx`**: Responsive fixed sidebar for authenticated app workspace featuring 4 categorized navigation groups:
   - **Quick Links**: Dashboard, Medical Reports, Medical History
   - **Intelligence**: AI Symptoms Checker, Prescription Scanner
   - **Connect**: Tele-Consultations, My Appointments, Doctor Search, Family Health
   - **Discover**: Quest Game (AI Pose), Rewards Marketplace (Points Chip)
   - **System (Role Dependent)**: Doctor Profile Workspace, Admin Security Panel
3. **`DashboardLayout.jsx`**: Standard container binding `Sidebar`, mobile overlay triggers, responsive main content area, and `ConfirmModal`.
4. **`DoctorLayout.jsx` & `AdminLayout.jsx`**: Specialized top/side layouts tailored for medical professional and system administrative workflows.
5. **`RouteGuards.jsx`**: Higher-Order Components (`ProtectedRoute`, `PublicRoute`, `FlowRoute`, `RoleRoute`) handling role authorization and automated onboarding redirection (`/profile-setup`).

---

## 5. Component Library Architecture

The frontend component hierarchy is divided into granular, single-responsibility units:

```
src/components/
├── ui/                   # Primitive, reusable UI widgets
├── layout/               # Navbars, Sidebars, Footers, Page Wrappers
├── features/             # Business domain feature modules
└── game/                 # AI computer vision & gamification modules
```

### 5.1 Reusable UI Primitives (`src/components/ui/`)

- `Button.jsx`: Polymorphic button supporting `primary`, `secondary`, `outline`, `danger`, and `ghost` variants with loading spinner states.
- `Card.jsx`: Surface wrapper with structured subcomponents (`CardHeader`, `CardTitle`, `CardContent`).
- `Badge.jsx`: Semantic visual tag (`success`, `warning`, `error`, `primary`, `neutral`).
- `Modal.jsx` & `ConfirmModal.jsx`: Headless UI dialog wrappers with touch-action isolation, smooth backdrop blurs, and promise-based confirmation triggers via `confirmStore`.
- `Input.jsx` & `Select.jsx`: Standardized accessible form controls with label helper text and error message states.
- `Tabs.jsx`: Tabbed navigation container with active tab pill highlight animations.
- `WebRTCCallUI.jsx`: Live audio/video overlay component rendering participant grids, mic/camera controls, screen sharing, and call timers.

### 5.2 Business Feature Modules (`src/components/features/`)

- `ChatInterface.jsx`: Conversational AI assistant panel for interactive health guidance, markdown rendering, structured suggestions, and speech synthesis.
- `PatientHealthPanel.jsx`: Medical snapshot dashboard displaying vitals, chronic condition tracking, timeline graphs, and risk scores.
- `ConsultationCallManager.jsx`: Global floating call bar managing active video call states, incoming call modal triggers, and background socket reconnects.
- `ReportUpload.jsx`: Drag-and-drop medical report analyzer powered by OCR (`Tesseract.js`) and Gemini AI parser.
- `MedicineInsight.jsx`: Prescription breakdown component showing dosage schedules, side effects, and drug interaction safety warnings.
- `DoctorProfessionalPrompt.jsx`: Verification prompt for doctor onboarding & license validation.
- `ProfileSetup.jsx`: Multi-step onboarding flow collecting personal demographics, emergency contacts, medical history, and baseline vitals.

### 5.3 AI Gamification & Pose Tracking (`src/components/game/`)

- `AITracker.jsx`: Edge computer vision component powered by **MediaPipe Pose**. Processes real-time camera feed to count exercise repetitions (squats, arm extensions), analyze joint angles (elbow/shoulder vectors), and display live form feedback overlays.
- `QuestMap.jsx`: Visual interactive map displaying health quest milestones, unlocked levels, and daily streak rewards.
- `Leaderboard.jsx`: Community ranking table showcasing top health quest achievers and point totals.
- `RewardsPanel.jsx`: Points redemption drawer allowing users to convert health quest points into telemedicine discounts and health store vouchers.

---

## 6. Page Architecture & Routing Matrix

MediSnap routes are organized into four functional domains within `src/pages/`:

```
                           +------------------------+
                           |     React Router       |
                           +-----------+------------+
                                       |
       +------------------+------------+------------+--------------------+
       |                  |                         |                    |
[Public / Landing]   [Patient Workspace]    [Doctor Portal]       [Admin Portal]
  - /                 - /dashboard           - /doctor-dashboard   - /admin
  - /auth             - /reports             - /doctor-profile     - /admin/consultants
  - /profile-setup    - /symptoms            - /doctor-appointments
                      - /prescriptions       - /doctor-transactions
                      - /consultants
                      - /booking
                      - /quest-game
                      - /family
                      - /consultation/live/:roomId
```

### 6.1 Detail Matrix of Primary Frontend Routes

| Route Path | Component Name | Layout Wrapper | Access Level | Key Features & Functionality |
| :--- | :--- | :--- | :--- | :--- |
| `/` | `Landing.jsx` | `Navbar` + `Footer` | Public | Hero visual, AI feature showcase, doctor discovery preview, multi-language banner |
| `/auth` | `Auth.jsx` | `Navbar` | Public | Google OAuth 2.0 & Email/Password authentication form |
| `/profile-setup` | `ProfileSetup.jsx` | `FlowRoute` | Protected (Setup) | Initial demographic & medical onboarding wizard |
| `/dashboard` | `Dashboard.jsx` | `DashboardLayout` | Patient | Patient health overview, AI health score gauge, upcoming appointments, quick actions |
| `/reports` | `Reports.jsx` | `DashboardLayout` | Patient | Lab report repository, upload modal, automated AI summary breakdown |
| `/results/:id` | `Results.jsx` | `DashboardLayout` | Patient | Deep diagnostic report details, key metric risk indicators, trend visualizer |
| `/symptoms` | `Symptoms.jsx` | `DashboardLayout` | Patient | Interactive symptom checker, body anatomical selector, AI differential diagnosis |
| `/prescriptions` | `PrescriptionScan.jsx` | `DashboardLayout` | Patient | Camera/File scan for doctor prescriptions, medicine reminder generator |
| `/consultants` | `Consultants.jsx` | `DashboardLayout` | Patient | Searchable doctor directory, specialty filters, rating badges, fee comparison |
| `/consultant-profile/:id` | `ConsultantProfile.jsx` | `DashboardLayout` | Patient | Doctor bio, qualifications, availability schedule calendar, patient reviews |
| `/booking` | `Booking.jsx` | `DashboardLayout` | Patient | Slot booking wizard, patient symptom note input, eSewa payment gateway integration |
| `/booking-success` | `BookingSuccess.jsx` | `DashboardLayout` | Patient | Confirmation receipt, calendar invite download, call room join button |
| `/my-appointments` | `UserAppointments.jsx` | `DashboardLayout` | Patient | List of upcoming and completed tele-consultations, room entrance triggers |
| `/consultation/live/:roomId` | `ConsultationRoom.jsx` | `ProtectedRoute` | Patient/Doctor | Full-screen WebRTC video room, real-time chat, screen sharing, digital prescription drafting |
| `/quest-game` | `QuestGame.jsx` | `DashboardLayout` | Patient | Interactive health quests, camera-based exercise pose tracker, streak rewards |
| `/family` | `Family.jsx` | `DashboardLayout` | Patient | Multi-member family health profile manager, dependent health history switching |
| `/marketplace` | `Marketplace.jsx` | `DashboardLayout` | Patient | Health store, reward point redemption for consultation discounts |
| `/medical-history` | `MedicalHistory.jsx` | `DashboardLayout` | Patient | Timeline of past diagnoses, surgeries, allergies, family history records |
| `/doctor-dashboard` | `DoctorDashboard.jsx` | `DoctorLayout` | Doctor Role | Doctor daily appointment queue, earnings summary, instant online status toggle |
| `/doctor-appointments` | `DoctorAppointments.jsx` | `DoctorLayout` | Doctor Role | Appointment management, patient record previews, meeting room launcher |
| `/doctor-transactions` | `DoctorTransactions.jsx` | `DoctorLayout` | Doctor Role | Financial ledger, consultation payout history, bank details configuration |
| `/admin` | `AdminPanel.jsx` | `AdminLayout` | Admin Role | System health telemetry, user role distribution, verification request counters |
| `/admin/consultants` | `ConsultantsManagement.jsx` | `AdminLayout` | Admin Role | Doctor verification document reviewer, medical license approval/rejection panel |

---

## 7. State Management Architecture (Zustand Stores)

MediSnap utilizes lightweight, decoupled **Zustand** stores (`src/store/`) to handle global application state without context re-render overhead:

```
                  +-----------------------------------+
                  |        Zustand Core Stores        |
                  +-----------------+-----------------+
                                    |
     +-----------------+------------+------------+-----------------+
     |                 |                         |                 |
[authStore.js]  [healthStore.js]          [gameStore.js]    [confirmStore.js]
- user          - reports                 - points          - isOpen
- isAuthenticated - symptoms              - quests          - title / message
- role          - activeVitals            - activeQuest     - onConfirm
- login/logout  - fetchHealthData()       - addPoints()     - showConfirm()
```

1. **`authStore.js`**:
   - Manages user identity, JWT tokens, user role (`patient`, `doctor`, `admin`), and profile setup status.
   - Houses `checkAuth()`, `login()`, `logout()`, and `updateUser()` asynchronous actions.
2. **`healthStore.js`**:
   - Holds active patient diagnostic reports, symptom logs, vital history, and AI insights.
   - Syncs seamlessly with backend endpoints via `API` config.
3. **`gameStore.js`**:
   - Manages health quest progression, unlocked achievements, daily streaks, user reward points, and active exercise targets.
4. **`confirmStore.js`**:
   - Offers a programmatic API for triggering confirmation dialogs anywhere in the component tree (`showConfirm({ title, message, onConfirm })`).
5. **`consultationStore.js`**:
   - Tracks live video call room states, active participants, incoming call notifications, and WebRTC media streams.
6. **`settingsStore.js`**:
   - Persists user UI preferences (theme mode, notification toggles, sound feedback).

---

## 8. Data Integration & External Services

- **API Endpoint Registry (`src/Configs/ApiEndpoints.js`)**: Centralized object defining relative and absolute API routes for backend communications.
- **Payment Gateway Integration (`eSewa`)**: Integrated booking payment pipeline supporting direct web redirect checkout and verification callbacks (`/booking-success`, `/booking-failed`).
- **AI Processing Pipeline**:
  - **Gemini AI API**: powers prescription extraction, symptom analysis, and natural language diagnostic suggestions.
  - **Tesseract.js OCR**: local client-side text extraction from uploaded medical images prior to AI formatting.
  - **MediaPipe Pose**: client-side WebGL-accelerated skeletal tracking for real-time rep counting without video data ever leaving the user's browser (Privacy-First).

---

## 9. Accessibility, Localization & UX Standards

1. **Dual Language Support (English & Nepali)**:
   - Powered by `react-i18next` with dictionary translations located in `src/translations/`.
   - Structural adjustments applied automatically via global CSS selectors (`[lang="ne"] { font-family: 'Noto Sans Devanagari'; }`).
2. **Accessible Interaction Controls**:
   - Focus rings configured globally via Tailwind (`*:focus-visible { outline-none ring-2 ring-primary-500 }`).
   - Touch intervention overrides (`touch-action: manipulation`) to prevent double-tap delays on mobile devices.
3. **Print-Optimized Medical Reports**:
   - Dedicated print CSS `@media print` rules hiding navigation bars, sidebars, and interactive buttons, yielding clean white diagnostic report printouts.
