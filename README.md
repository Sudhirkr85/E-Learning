# SSSAM Academy - India's Premier IT Training Platform

A modern, India-focused Learning Management System (LMS) and course selling platform built with **Next.js 16** (App Router), **TypeScript**, and **Tailwind CSS**. Located in Gurugram, we provide job-oriented IT training for Indian students with placement support.

🚀 **Status**: Production-ready | ✅ India-focused content | 📱 Fully responsive | 🔒 Type-safe | 💳 UPI/Razorpay ready

## 🎯 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

**Access**: Open [http://localhost:3000](http://localhost:3000) in your browser.

## ⚙️ Environment Setup

Before running the application, you must configure environment variables. Copy the example file and fill in your actual values:

```bash
# Copy the example environment file
cp env-clerk-example.txt .env
```

### Required Environment Variables

#### MongoDB Configuration
```env
MONGODB_URI=mongodb://localhost:27017/sssam-academy
```
- **Purpose**: Database connection for storing users, courses, purchases, and admin data
- **Local Development**: Use `mongodb://localhost:27017/sssam-academy`
- **Production**: Use MongoDB Atlas connection string: `mongodb+srv://<username>:<password>@cluster.mongodb.net/sssam-academy`
- **How to Get**: 
  - Local: Install MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
  - Production: Create free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

#### Clerk Authentication (Student Auth)
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...  # Optional
```
- **Purpose**: Student authentication, user management, and session handling
- **NEXT_PUBLIC_ prefix**: Required for client-side access (browser can read this)
- **Secret Key**: Server-side only (never exposed to browser)
- **How to Get**: 
  1. Create account at [Clerk Dashboard](https://dashboard.clerk.com/)
  2. Create a new application
  3. Navigate to API Keys section
  4. Copy Publishable Key and Secret Key
- **Webhook Secret**: Optional, for webhook verification (get from Webhooks section in Clerk Dashboard)

#### Razorpay Payment Integration
```env
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...
RAZORPAY_WEBHOOK_SECRET=...  # Optional
```
- **Purpose**: Payment processing for course purchases
- **Test Keys**: Use for development (start with `rzp_test_`)
- **Live Keys**: Use for production (start with `rzp_live_`)
- **How to Get**:
  1. Create account at [Razorpay Dashboard](https://dashboard.razorpay.com/)
  2. Navigate to Settings → API Keys
  3. Generate test keys for development
  4. Generate live keys for production
- **Webhook Secret**: Optional, for webhook verification (get from Settings → Webhooks)

#### Admin Panel Authentication
```env
ADMIN_EMAIL=admin@sssam-academy.com
ADMIN_PASSWORD=your_secure_admin_password_here
```
- **Purpose**: Separate authentication for admin panel access
- **Security**: Use strong, unique credentials for production
- **Separate from Clerk**: Admin auth is independent of student authentication
- **Best Practices**: 
  - Use a strong password (min 12 characters, mix of letters, numbers, symbols)
  - Don't reuse passwords from other services
  - Change password regularly in production

#### Application Configuration
```env
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
- **NODE_ENV**: Set to `development` for local, `production` for deployment
- **NEXT_PUBLIC_APP_URL**: Base URL for email links, redirects, and callbacks
  - Local: `http://localhost:3000`
  - Production: `https://your-domain.com`

### Complete .env Example

```env
# ============================================
# SSSAM Academy - Environment Variables
# ============================================

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/sssam-academy

# Clerk Authentication (Student Auth)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...

# Razorpay Payment Integration
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...
RAZORPAY_WEBHOOK_SECRET=...

# Admin Panel Authentication
ADMIN_EMAIL=admin@sssam-academy.com
ADMIN_PASSWORD=your_secure_admin_password_here

# Application Configuration
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Local Development Setup

1. **Install MongoDB** (if not already installed):
   ```bash
   # Download from https://www.mongodb.com/try/download/community
   # Start MongoDB service
   # On Windows: Run MongoDB as a service
   # On Mac: brew services start mongodb-community
   # On Linux: sudo systemctl start mongod
   ```

2. **Create Clerk Account**:
   - Go to [Clerk Dashboard](https://dashboard.clerk.com/)
   - Sign up and create a new application
   - Copy API keys to your `.env` file

3. **Create Razorpay Account**:
   - Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
   - Sign up and generate test API keys
   - Copy keys to your `.env` file

4. **Set Admin Credentials**:
   - Choose a secure email and password for admin access
   - Add to your `.env` file

5. **Install Dependencies**:
   ```bash
   npm install
   ```

6. **Run Development Server**:
   ```bash
   npm run dev
   ```

### Production Deployment Setup

1. **MongoDB Atlas** (Recommended for production):
   - Create free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Whitelist your deployment IP addresses
   - Get connection string and update `MONGODB_URI`

2. **Production API Keys**:
   - **Clerk**: Use production keys (start with `pk_live_` and `sk_live_`)
   - **Razorpay**: Use live keys (start with `rzp_live_`)
   - Never use test keys in production

3. **Environment Variables in Deployment**:
   - **Vercel**: Add in Project Settings → Environment Variables
   - **Netlify**: Add in Site Settings → Environment Variables
   - **Docker**: Pass via `-e` flags or env file
   - **Other**: Use your platform's environment variable management

4. **Security Checklist**:
   - [ ] Use production API keys (not test keys)
   - [ ] Set `NODE_ENV=production`
   - [ ] Use strong admin password
   - [ ] Enable HTTPS (SSL certificate)
   - [ ] Configure webhooks (Clerk & Razorpay)
   - [ ] Set up proper CORS origins
   - [ ] Enable rate limiting
   - [ ] Set up monitoring and logging

5. **Domain Configuration**:
   - Update `NEXT_PUBLIC_APP_URL` to your production domain
   - Add domain to Clerk allowed origins
   - Add domain to Razorpay allowed origins
   - Configure DNS records

### Environment Variable Security

- **NEVER commit `.env` to version control** (it's in `.gitignore`)
- **Use different values** for development and production
- **Rotate secrets regularly** in production
- **Use secret management services** for production (AWS Secrets Manager, HashiCorp Vault, etc.)
- **Limit access** to environment variables to only necessary team members
- **Audit environment variable usage** regularly

### Troubleshooting

**MongoDB Connection Issues**:
- Ensure MongoDB is running: `mongosh --eval "db.adminCommand('ping')"`
- Check connection string format
- Verify IP whitelist in MongoDB Atlas

**Clerk Authentication Issues**:
- Verify API keys are correct
- Check allowed origins in Clerk Dashboard
- Ensure Clerk middleware is properly configured

**Razorpay Payment Issues**:
- Verify test keys are working in development
- Check webhook configuration if using webhooks
- Ensure currency is set to INR

**Admin Panel Issues**:
- Verify `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set
- Clear browser cookies if session issues occur
- Check MongoDB connection for admin data storage

## 🇮🇳 India-Focused Features

- 💰 **INR Currency Only** - All pricing in Indian Rupees with proper formatting
- 📱 **UPI Payments** - Support for UPI, Cards, Net Banking, and EMI options
- 🗣️ **Bilingual Support** - Hindi + English instruction and support
- 🏢 **Placement Assistance** - Dedicated support for Indian IT companies
- 📍 **Local Presence** - Physical center in Gurugram, Old DLF Sector 14
- 🎓 **Summer Training** - Special programs for college students
- 💼 **Job-Oriented** - Curriculum designed for Indian job market

## ✨ Features

- ✅ **11 Pages** with 9 dynamic + static routes
- ✅ **23 Reusable Components** (UI, Cards, Sections, Layout)
- ✅ **100% TypeScript** - Full type safety
- ✅ **Fully Responsive** - Mobile-first design with Tailwind CSS
- ✅ **Refreshed Public Footer** - Cleaner user-side homepage footer with simpler navigation and contact details
- ✅ **Admin Mobile Navigation** - Drawer-based admin menu for small screens
- ✅ **Clean Architecture** - Component-driven, modular structure
- ✅ **India-Focused Content** - Real course data with INR pricing
- ✅ **Clerk Authentication** - Complete auth system with sign up, sign in, sign out
- ✅ **MongoDB User Sync** - Automatic user data synchronization
- ✅ **Route Protection** - Middleware-based access control
- ✅ **Razorpay Payment** - Complete payment flow with UPI support
- ✅ **Course Access Control** - Purchase-based content protection
- ✅ **SEO Optimized** - Metadata on all pages
- ✅ **Performance Optimized** - Next.js Image component, code splitting
- ✅ **Summer Training Programs** - Special courses for Indian students
- ✅ **Placement Support** - Job assistance and career guidance
- ✅ **Dynamic Course Management** - Admin-driven content with MongoDB
- ✅ **Automatic Fallback** - Static data fallback when DB unavailable

## 📚 Dynamic Course Architecture

### Overview
Courses are now managed dynamically through MongoDB while maintaining a static fallback mechanism. This enables the admin panel to manage course content (pricing, batches, descriptions, etc.) and have changes immediately reflected on the website without code deployment.

Admin course CRUD is disabled. The admin panel now reads the static course catalog from `src/data/courses.ts` and uses MongoDB only for purchases, sessions, recordings, and student activity.

### Course Data Flow

```
Admin Panel (sessions and enrollments only)
   ↓
Static Course Catalog (`src/data/courses.ts`)
    ↓
API Endpoints (/api/admin/sessions, /api/admin/course-enrollments)
    ↓
Frontend Pages (read static catalog)
    ↓
MongoDB Collections (purchases, classSessions)
```

### How It Works

**Frontend Pages** use the `lib/courses.ts` helper functions to fetch course data:
- `getPublishedCourses()` - Fetch all published courses
- `getComingSoonCourses()` - Fetch upcoming courses  
- `getFeaturedCourse()` - Fetch the featured course
- `getCourseBySlug(slug)` - Fetch a specific course

**Automatic Fallback Logic:**
1. Page requests courses from `/api/courses/*` endpoint
2. API tries to fetch from MongoDB collection
3. If MongoDB has courses, return them (dynamic data)
4. If MongoDB is empty or fails, fallback to static `src/data/courses.ts`
5. No errors shown to users - seamless experience

### API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/courses` | GET | Fetch all courses |
| `/api/courses/featured` | GET | Fetch featured course |
| `/api/courses/[slug]` | GET | Fetch course by slug |
| `/api/admin/courses` | GET, POST | List/create courses |
| `/api/admin/courses/[id]` | GET, PUT, DELETE | Manage specific course |

### Admin-Driven Content Flow

1. **Admin adds/edits course** in admin panel
2. **Data saved to MongoDB**
3. **API endpoints return updated data**
4. **Frontend automatically fetches fresh data** (no-store cache policy)
5. **Website displays updated course instantly**

**No Manual Steps:**
- ✅ No code changes needed
- ✅ No redeployment required
- ✅ No cache invalidation needed
- ✅ Changes live in real-time

### Fallback Support

**When is static data used?**
- MongoDB collection is empty (first deployment)
- MongoDB service unavailable/errors
- Network request fails
- API endpoint returns error status

**Static Data Location:** `src/data/courses.ts`
- 5 sample courses included
- Helper functions: `getFeaturedCourse()`, `getCourseBySlug(slug)`, etc.
- Works offline for local development

### Performance

**Server-Side Rendering:**
- Pages fetch courses server-side (faster, SEO-friendly)
- Cache policy: `cache: 'no-store'` for fresh data
- Admin updates visible instantly (no stale data)

**No Performance Hit:**
- Fallback to static data is instant
- API responses can be CDN cached
- Next.js Image component optimization built-in

## � Course Catalog

### Featured Courses
1. **AI Powered Full Stack Web Development Summer Training 2026** - ₹9 launch offer
2. **Data Science with Python & Machine Learning** - ₹12,999
3. **Digital Marketing & SEO Mastery** - ₹9,999
4. **AWS Cloud Computing & DevOps** - ₹15,999
5. **Cyber Security & Ethical Hacking** - ₹18,999

## 🎓 Class Sessions & Student Support System

### Overview
Comprehensive system for managing live class sessions and providing support to enrolled students. After purchase, students get direct access to:
- 📅 Upcoming class schedules with Google Meet links
- 🎥 Recording links for completed sessions
- 📧 Direct contact to instructors and support team
- 🕐 Office hours and availability information

### Features

**For Admins:**
- ➕ Create/Edit/Delete class sessions for each course
- 🔗 Add Google Meet links for live classes
- 📹 Upload recording links after sessions
- 📋 Add session notes and descriptions
- 👥 View all students enrolled in each course with contact details
- 📊 See revenue analytics per course
- 🔍 Search and filter students by name, email, or phone

**For Students:**
- 🚀 "Continue Learning" button on checkout success page
- 📅 View all upcoming class sessions with dates & times
- 🎥 Join Google Meet directly from course page
- 📹 Access recorded sessions after completion
- 💬 See instructor contact info and support email/phone
- 🕐 Check office hours and availability
- 📚 Access course materials and lessons

### Database Schema

**ClassSession Collection:**
```javascript
{
  _id: ObjectId,
  courseId: string,
  googleMeetLink: string,      // Meet URL
  sessionTitle: string,         // e.g., "Lecture 1 - Intro"
  description: string,          // Optional details
  sessionDate: string,          // ISO format: "2026-05-20T10:30:00"
  sessionTime: string,          // HH:mm format: "10:30"
  durationMinutes: number,      // e.g., 60
  recordingLink: string,        // Optional recording URL
  notes: string,                // Session notes
  createdAt: Date,
  updatedAt: Date
}
```

**CourseContact Collection:**
```javascript
{
  _id: ObjectId,
  courseId: string,
  supportEmail: string,         // Support email
  supportPhone: string,         // Support phone
  instructorName: string,       // Instructor name
  instructorEmail: string,      // Optional: instructor email
  officeHours: string,          // e.g., "Monday-Friday 9AM-6PM IST"
  createdAt: Date,
  updatedAt: Date
}
```

### API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/admin/sessions` | GET | Fetch sessions for course |
| `/api/admin/sessions` | POST | Create new session |
| `/api/admin/sessions` | PUT | Update session |
| `/api/admin/sessions` | DELETE | Delete session |
| `/api/admin/course-contact` | GET | Get support contact info |
| `/api/admin/course-contact` | POST | Create/update contact |
| `/api/admin/course-contact` | PUT | Update contact |
| `/api/admin/course-enrollments` | GET | View enrolled students |

### Admin Workflow

1. Navigate to `/admin/courses`
2. Click **"Manage Sessions"** on desired course
3. Add support contact info:
   - Instructor name
   - Support email & phone
   - Optional: instructor email, office hours
4. Click **"+ Add Session"** to create class sessions
5. Fill in session details:
   - Title, description
   - Google Meet link
   - Date, time, duration
   - Optional: recording link, notes
6. Click **"View Enrollments"** to see all students who purchased

### Student Experience

1. Complete course purchase and payment
2. Click **"🚀 Continue Learning"** on success page
3. Land on course details page with:
   - **Class Schedule** - All upcoming sessions with meet links
   - **Support Contact** - Email & phone links in sidebar
   - **Course Materials** - Video lessons and resources
4. Click "Join Google Meet" to access live sessions
5. Access recordings after sessions complete

### Pages

**Admin Pages:**
- `/admin/courses` - Course list with quick actions
- `/admin/courses/[courseId]/sessions` - Manage sessions & contact info
- `/admin/courses/[courseId]/enrollments` - View enrolled students with analytics

**Student Pages:**
- `/checkout/success` - Updated with "Continue Learning" button
- `/dashboard/courses/[slug]` - Full course details with sessions

### Implementation Files

**New Models:**
- `src/lib/models/class-session.ts` - ClassSession & CourseContact models

**New APIs:**
- `src/app/api/admin/sessions/route.ts` - Session CRUD
- `src/app/api/admin/course-contact/route.ts` - Contact management
- `src/app/api/admin/course-enrollments/route.ts` - Student list

**New UI Pages:**
- `src/app/admin/courses/[courseId]/sessions/page.tsx` - Session management UI
- `src/app/admin/courses/[courseId]/enrollments/page.tsx` - Enrollment viewer UI
- `src/app/dashboard/courses/[slug]/page.tsx` - Student course details page

**Updated Pages:**
- `src/app/admin/courses/page.tsx` - Added session/enrollment action buttons
- `src/app/checkout/success/page.tsx` - Added "Continue Learning" CTA

### Configuration Required

Update your checkout payment flow to pass `courseSlug`:

```javascript
// In your payment verification/success handler
const successUrl = `/checkout/success?${new URLSearchParams({
  payment_id: paymentData.id,
  order_id: orderId,
  amount: totalAmount,
  courseTitle: course.title,
  courseSlug: course.slug,      // ← IMPORTANT: Add this
  studentEmail: studentEmail,
}).toString()}`;

window.location.href = successUrl;
```

### UI/UX Features

✅ Dark theme (slate-950, slate-900) matching existing design
✅ Color-coded session status (green for upcoming, gray for past)
✅ Responsive layouts (mobile, tablet, desktop)
✅ Sticky support card sidebar on desktop
✅ Search & filter students by name/email/phone
✅ Revenue analytics (total enrolled, total revenue, average price)
✅ Clickable email/phone links for direct contact
✅ Interactive buttons with hover animations

### Testing Checklist

**Admin Panel:**
- [ ] Go to `/admin/courses` and see all courses
- [ ] Click "Manage Sessions" on any course
- [ ] Add support contact information
- [ ] Create a test session with future date/time
- [ ] Verify Google Meet link opens in new tab
- [ ] Click "View Enrollments" to see students
- [ ] Search/filter students by name or email
- [ ] Check revenue stats are calculated correctly

**Student Experience:**
- [ ] Make test purchase using Razorpay test card
- [ ] On success page, click "Continue Learning" button
- [ ] Verify course details page loads
- [ ] See all class sessions listed
- [ ] Click "Join Google Meet" button
- [ ] See support contact info in sidebar
- [ ] Verify email/phone links are clickable
- [ ] Check course materials display

### Future Enhancements

- 📊 Attendance tracking (mark present/absent per session)
- 🎓 Certificate generation on course completion
- 💬 Bulk messaging to all enrolled students
- 📅 Calendar widget showing all scheduled sessions
- 🔐 Access control verification (only purchased students can access)
- ⏺️ Automatic recording capture from Google Meet
- 🎯 Session homework/assignments with submission
- 🔔 Email/SMS reminders before each class

### Course Features
- 🎯 **Job-Oriented Curriculum** - Designed for Indian IT industry
- 🏢 **Placement Support** - Resume building, mock interviews, job connections
- 📅 **Flexible Batches** - Weekend, evening, and summer training options
- 🗣️ **Bilingual Instruction** - Hindi + English support
- 💳 **Easy Payment Options** - UPI, EMI, cards, net banking
- 📜 **Industry Certification** - Recognized by Indian employers

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication routes (login, register)
│   ├── (main)/            # Public routes
│   │   ├── page.tsx       # Home page
│   │   └── courses/       # Course listing and details
│   └── dashboard/         # Protected dashboard routes
│       ├── page.tsx       # Main dashboard
│       ├── courses/       # My courses page
│       └── lessons/       # Lesson player page
├── components/            # Reusable components
│   ├── ui/               # Base UI components (Button, Input, Card, etc.)
│   ├── cards/            # Card components (CourseCard, TrainerCard, etc.)
│   ├── layout/           # Layout components (Header, Footer, Sidebar)
│   └── sections/         # Section components (Hero, FAQ, Trainers, etc.)
├── data/                  # India-focused course data
│   ├── courses.ts        # Real SSSAM Academy courses
│   ├── testimonials.ts   # Student success stories
│   └── faq.ts            # India-specific FAQs
├── types/                # TypeScript type definitions
├── constants/            # App constants and configuration
├── utils/                # Utility functions and helpers
├── hooks/                # Custom React hooks
└── lib/                  # Library utilities and helpers
```

## 🎨 UI Components

### Base UI Components
- **Button**: Versatile button with multiple variants (primary, secondary, outline, ghost)
- **Input**: Form input with error states and icons
- **TextArea**: Multi-line text input for forms
- **Card**: Reusable card container with optional interactive states
- **Heading**: Semantic heading component (h1-h6)
- **Text**: Flexible text component with size and color variants
- **Badge**: Status and category badges
- **Rating**: Star rating display component
- **Container**: Max-width container with responsive padding
- **Divider**: Visual separator

### Card Components
- **CourseCard**: Display individual courses with progress and enrollment
- **TrainerCard**: Show instructor profile and expertise
- **TestimonialCard**: Display student testimonials

### Layout Components
- **Header**: Navigation header with mobile menu
- **Footer**: Footer with links and contact info
- **DashboardSidebar**: Navigation sidebar for dashboard

### Section Components
- **HeroSection**: Hero banner with featured course
- **CoursesGrid**: Grid layout for displaying courses
- **CurriculumPreview**: Show course lessons and curriculum
- **TrainersSection**: Display instructor profiles
- **FAQSection**: Frequently asked questions with accordion
- **ContactSection**: Contact form
- **TestimonialsSection**: Student testimonials carousel

## 📄 Pages Structure

### Public Pages
- `/` - Home page with hero, featured course, trainers, testimonials, FAQ
- `/courses` - All courses listing
- `/courses/[slug]` - Individual course details page
- `/login` - User login page
- `/register` - User registration page

### Protected Pages (Dashboard)
- `/dashboard` - Main dashboard with stats and activity
- `/dashboard/courses` - My enrolled courses
- `/dashboard/lessons/[id]` - Lesson player with video and resources
- `/dashboard/profile` - User profile (structure only)
- `/dashboard/settings` - Settings page (structure only)

### Checkout Flow
- `/checkout` - Checkout page with billing and payment method selection
- `/checkout/success` - Payment success confirmation
- `/checkout/failed` - Payment failure page (to be created)

## 🛠 Technology Stack

- **Frontend Framework**: Next.js 16+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom built components
- **Image Handling**: Next.js Image component
- **Routing**: Next.js file-based routing

## 🔜 Future Integrations

### Authentication (Ready for Clerk)
- User registration and login
- OAuth integration
- User profile management
- Role-based access control

### Payment Processing (Ready for Razorpay)
- Course checkout
- Payment gateway integration
- Order management
- Invoice generation

### Database (Ready for MongoDB)
- User management
- Course enrollment tracking
- Progress tracking
- Payment history
- Contact inquiries

## � Technology Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 16+ (App Router) |
| **Language** | TypeScript 5+ |
| **Styling** | Tailwind CSS 3+ |
| **Components** | Custom React components |
| **Image Optimization** | Next.js Image component |
| **Package Manager** | npm |
| **Build Tool** | Turbopack (Next.js built-in) |

## 📁 Project Structure

```
src/
├── app/                         # Next.js App Router Pages
│   ├── (auth)/                 # Authentication routes (no URL prefix)
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (main)/                 # Main public routes
│   │   ├── page.tsx            # Home page
│   │   ├── courses/page.tsx    # All courses
│   │   └── courses/[slug]/page.tsx
│   ├── dashboard/              # Protected dashboard routes
│   │   ├── page.tsx
│   │   ├── courses/page.tsx
│   │   ├── lessons/[id]/page.tsx
│   │   ├── profile/page.tsx
│   │   └── settings/page.tsx
│   ├── checkout/               # Checkout flow
│   │   ├── page.tsx
│   │   └── success/page.tsx
│   ├── layout.tsx              # Root layout
│   └── not-found.tsx           # 404 page
│
├── components/                  # Reusable Components (23 total)
│   ├── ui/                     # Base UI Components (10)
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Heading.tsx
│   │   ├── Text.tsx
│   │   ├── TextArea.tsx
│   │   ├── Rating.tsx
│   │   ├── Container.tsx
│   │   ├── Divider.tsx
│   │   └── index.ts
│   │
│   ├── cards/                  # Specialized Cards (3)
│   │   ├── CourseCard.tsx
│   │   ├── TrainerCard.tsx
│   │   ├── TestimonialCard.tsx
│   │   └── index.ts
│   │
│   ├── sections/               # Page Sections (7)
│   │   ├── HeroSection.tsx
│   │   ├── CoursesGrid.tsx
│   │   ├── CurriculumPreview.tsx
│   │   ├── TrainersSection.tsx
│   │   ├── FAQSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── index.ts
│   │
│   └── layout/                 # Layout Components (3)
│       ├── Header.tsx
│       ├── Footer.tsx
│       ├── DashboardSidebar.tsx
│       └── index.ts
│
├── data/                        # Mock Data & Helpers
│   ├── courses.ts              # 5 sample courses
│   ├── trainers.ts             # 5 sample trainers
│   └── faq.ts                  # 8 FAQ items
│
├── types/                       # TypeScript Definitions
│   └── index.ts                # 15+ interfaces
│
├── constants/                   # Configuration & Constants
│   └── index.ts                # Routes, enums, features, testimonials
│
├── utils/                       # Utility Functions
│   └── helpers.ts              # 10+ helper functions
│
├── hooks/                       # Custom React Hooks
│   └── index.ts                # useWindowSize, useLocalStorage
│
└── lib/                         # Library Utilities
    └── utils.ts                # cn(), getInitials(), etc.
```

## 📄 Pages & Routes

### Public Pages (No Authentication)
| Route | Description |
|-------|-------------|
| `/` | Home with hero, courses, trainers, testimonials, FAQ |
| `/courses` | Browse all courses |
| `/courses/[slug]` | Course details, curriculum, enrollment |
| `/login` | Login page (UI only, Clerk ready) |
| `/register` | Registration page (UI only, Clerk ready) |

### Dashboard Pages (Protected - Auth Required)
| Route | Description |
|-------|-------------|
| `/dashboard` | Dashboard overview with stats |
| `/dashboard/courses` | My enrolled courses |
| `/dashboard/lessons/[id]` | Lesson player with video & resources |
| `/dashboard/profile` | User profile (structure) |
| `/dashboard/settings` | Settings (structure) |

### Checkout Flow
| Route | Description |
|-------|-------------|
| `/checkout` | Billing & payment method selection |
| `/checkout/success` | Payment confirmation |

## 🎨 Components Library

### Base UI Components (10)

All components support responsive design, TypeScript, and Tailwind styling.

```typescript
// Button - Multiple variants & sizes
<Button variant="primary" | "secondary" | "outline" | "ghost" size="sm" | "md" | "lg">
  Text
</Button>

// Input - With validation & icons
<Input label="Email" type="email" placeholder="..." error="..." />

// Card - Interactive or static
<Card interactive className="...">Content</Card>

// Badge - Status badges
<Badge variant="success" | "warning" | "error" | "info" | "default">
  Text
</Badge>

// Heading - Semantic h1-h6
<Heading level={1|2|3|4|5|6}>Title</Heading>

// Text - Flexible typography
<Text size="sm" | "base" | "lg" color="primary" | "secondary" | "muted">
  Text
</Text>

// Other components: TextArea, Rating, Container, Divider
```

### Specialized Components (3)

- **CourseCard**: Displays course with thumbnail, rating, price, instructor
- **TrainerCard**: Instructor profile with expertise and social links
- **TestimonialCard**: Student testimonial with rating

### Section Components (7)

Large, composable page sections combining multiple UI components:
- **HeroSection**: Featured course banner
- **CoursesGrid**: Responsive course grid
- **CurriculumPreview**: Lesson list preview
- **TrainersSection**: Instructor profiles
- **FAQSection**: Accordion FAQ
- **ContactSection**: Contact form
- **TestimonialsSection**: Testimonials carousel

## 📊 Project Statistics

| Metric | Count |
|--------|-------|
| Total Components | 23 |
| Total Pages | 11 |
| Routes (dynamic + static) | 9 |
| Base UI Components | 10 |
| Specialized Components | 3 |
| Section Components | 7 |
| Layout Components | 3 |
| TypeScript Types | 15+ |
| Utility Functions | 15+ |
| Custom Hooks | 2 |
| Mock Data Items | 21 (5 courses, 5 trainers, 8 FAQs, 3 testimonials) |

## 🚀 Development Guide

### Adding a New Page

```typescript
// src/app/(main)/new-feature/page.tsx
import { Header, Footer } from '@/components/layout';
import { Container, Heading } from '@/components/ui';

export const metadata = {
  title: 'New Feature - SSSAM Academy',
  description: 'Description here',
};

export default function NewFeaturePage() {
  return (
    <>
      <Header />
      <Container className="py-12">
        <Heading level={1}>New Feature</Heading>
      </Container>
      <Footer />
    </>
  );
}
```

### Creating a New Component

```typescript
// src/components/cards/NewCard.tsx
'use client';

import { Card, Heading } from '@/components/ui';

interface NewCardProps {
  title: string;
}

export function NewCard({ title }: NewCardProps) {
  return (
    <Card className="p-6">
      <Heading level={3}>{title}</Heading>
    </Card>
  );
}
```

Export from `index.ts`:
```typescript
// src/components/cards/index.ts
export { NewCard } from './NewCard';
```

### Adding New Data

```typescript
// src/data/new-data.ts
export interface Item {
  id: string;
  name: string;
}

export const items: Item[] = [
  { id: '1', name: 'Item 1' },
];

export const getItemById = (id: string) => {
  return items.find(item => item.id === id);
};
```

## 🔗 Utility Functions

### Formatting
```typescript
import { formatCurrency, formatDate } from '@/utils/helpers';

formatCurrency(4999, 'INR')  // ₹4,999
formatDate('2024-05-12')     // May 12, 2024
```

### Validation
```typescript
import { validateEmail, validatePasswordStrength } from '@/utils/helpers';

validateEmail('user@example.com')      // true/false
validatePasswordStrength('Pass123!')   // { isStrong, feedback }
```

### Text Manipulation
```typescript
import { truncateText, generateSlug } from '@/utils/helpers';

truncateText('Long text...', 10)        // 'Long tex...'
generateSlug('My Course Title')         // 'my-course-title'
```

### Custom Hooks
```typescript
import { useWindowSize, useLocalStorage } from '@/hooks';

const { width, height } = useWindowSize();
const [value, setValue] = useLocalStorage('key', 'default');
```

## 📚 Mock Data

Pre-populated data ready to be replaced with API calls:

- **Courses** (`src/data/courses.ts`): 5 sample courses with full metadata
- **Trainers** (`src/data/trainers.ts`): 5 instructor profiles
- **FAQs** (`src/data/faq.ts`): 8 frequently asked questions
- **Testimonials** (`src/constants/index.ts`): 3 student testimonials

Usage:
```typescript
import { courses, getCourseById } from '@/data/courses';
import { trainers } from '@/data/trainers';

const course = getCourseById('1');
courses.forEach(c => console.log(c.title));
```

## 🎨 Design System

### Colors (Tailwind)
- **Primary**: Blue (#2563EB) - Main actions
- **Secondary**: Gray (#374151) - Text
- **Success**: Green (#10B981) - Positive states
- **Warning**: Yellow (#F59E0B) - Warnings
- **Error**: Red (#EF4444) - Errors

### Typography
- **H1**: 2.25rem, bold
- **H2**: 1.875rem, bold
- **H3**: 1.5rem, bold
- **Body**: 1rem, regular
- **Small**: 0.875rem, regular

### Responsive Breakpoints
- `sm`: 640px (phones)
- `md`: 768px (tablets)
- `lg`: 1024px (desktops)
- `xl`: 1280px (large displays)

## 🚀 Deployment

### Deploy to Vercel (Recommended)
```bash
git push origin main
# Then visit vercel.com → Import project → Deploy
```

### Deploy to Netlify
```bash
npm run build
# Drag .next folder to Netlify
```

### Deploy Anywhere
```bash
npm run build
npm start
# Runs on port 3000
```

## 🔐 Clerk Authentication Integration (Implemented)

### Environment Setup

Create a `.env` file with the following variables:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/sssam-academy

# Clerk Authentication (Get these from Clerk Dashboard)
# Go to https://dashboard.clerk.com -> Your Application -> API Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Razorpay Test Keys (Get these from Razorpay Dashboard)
RAZORPAY_KEY_ID=rzp_test_SoOs5kviZKeLm2
RAZORPAY_KEY_SECRET=F13wGfRUeVW4AgN5Y2wgqhjF
RAZORPAY_WEBHOOK_ID=
```

### Prerequisites

1. **MongoDB**: Install and run MongoDB locally
   ```bash
   # Download and install MongoDB Community Server
   # Start MongoDB service
   mongosh --eval "db.adminCommand('ping')"
   ```

2. **Clerk Account**: 
   - Create account at [Clerk Dashboard](https://dashboard.clerk.com/)
   - Create a new application or use existing one
   - Get API keys from Dashboard → Your Application → API Keys
   - Replace the keys in `.env` file

### Authentication Flow Architecture

```
Login/Register Page → Clerk Authentication → User Sync with MongoDB → Protected Routes → Dashboard Access
```

### Authentication Features

- ✅ **Sign Up**: Email/password and social login (Google, GitHub)
- ✅ **Sign In**: Email/password and social login
- ✅ **Sign Out**: Secure logout with session cleanup
- ✅ **User Sync**: Automatic MongoDB user record creation/updates
- ✅ **Route Protection**: Middleware-based access control
- ✅ **User Context**: React hooks for user state management

### Protected Routes

The following routes require authentication:
- `/dashboard` - Main dashboard
- `/dashboard/courses` - My courses
- `/dashboard/lessons/[id]` - Lesson pages
- `/checkout` - Checkout page
- `/checkout/success` - Payment success page

### User Data Schema

**Users Collection in MongoDB:**
```typescript
{
  clerkId: string,           // Clerk user ID
  name: string,              // User's full name
  email: string,             // User's email
  role: 'student',           // User role (fixed to student for now)
  avatar?: string,           // Profile picture URL
  createdAt: Date,
  updatedAt: Date
}
```

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/user/sync` | POST | Syncs Clerk user with MongoDB |
| `/api/student/purchases` | GET | Fetches user's purchased courses |
| `/api/courses/[courseId]/access` | GET | Checks course access permissions |

### Authentication Components

#### Login Page (`/login`)
- Clerk `SignIn` component
- Redirects to dashboard after successful login
- Social login options (Google, GitHub)

#### Register Page (`/register`)
- Clerk `SignUp` component
- Redirects to dashboard after successful registration
- Email verification handled by Clerk

#### Header Navigation
- Shows user avatar and name when authenticated
- Dropdown menu with dashboard, courses, and sign out options
- Shows login/register buttons when not authenticated

#### Middleware Protection
```typescript
// src/middleware.ts
- Protects dashboard and checkout routes
- Redirects unauthenticated users to login
- Redirects authenticated users away from auth pages
```

### Usage Examples

#### Using User Context in Components
```typescript
import { useUser } from '@clerk/nextjs';
import { useUserSync } from '@/hooks/use-user-sync';

function MyComponent() {
  const { user } = useUser();
  useUserSync(); // Syncs user with MongoDB
  
  return <div>Welcome, {user?.firstName}!</div>;
}
```

#### Checking Authentication Status
```typescript
import { useUser } from '@clerk/nextjs';

function ProtectedComponent() {
  const { isSignedIn, user } = useUser();
  
  if (!isSignedIn) {
    return <div>Please sign in to continue</div>;
  }
  
  return <div>Welcome back, {user?.firstName}!</div>;
}
```

### Testing Authentication

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Test sign up flow**:
   - Visit `/register`
   - Create a new account
   - Verify user is redirected to dashboard

3. **Test sign in flow**:
   - Visit `/login`
   - Sign in with created account
   - Verify user is redirected to dashboard

4. **Test route protection**:
   - Try accessing `/dashboard` while logged out
   - Verify redirect to `/login`
   - Try accessing `/login` while logged in
   - Verify redirect to `/dashboard`

### Social Login Setup

To enable social login providers:

1. **Google OAuth**:
   - Go to Clerk Dashboard → User & Authentication → Social Connections
   - Enable Google OAuth
   - Add your Google OAuth credentials

2. **GitHub OAuth**:
   - Go to Clerk Dashboard → User & Authentication → Social Connections
   - Enable GitHub OAuth
   - Add your GitHub OAuth app credentials

### Production Deployment

1. **Environment Variables**: Set production Clerk keys
2. **Allowed Origins**: Add your domain to Clerk's allowed origins
3. **Webhooks**: Configure Clerk webhooks for user events (optional)
4. **Session Management**: Configure session settings for production

## 💳 Razorpay Payment Integration (Implemented)

### Environment Setup

Create a `.env` file with the following variables:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/sssam-academy

# Razorpay Test Keys (Get these from Razorpay Dashboard)
RAZORPAY_KEY_ID=rzp_test_SoOs5kviZKeLm2
RAZORPAY_KEY_SECRET=F13wGfRUeVW4AgN5Y2wgqhjF
RAZORPAY_WEBHOOK_ID=
```

### Prerequisites

1. **MongoDB**: Install and run MongoDB locally
   ```bash
   # Download and install MongoDB Community Server
   # Start MongoDB service
   mongosh --eval "db.adminCommand('ping')"
   ```

2. **Razorpay Account**: 
   - Create account at [Razorpay Dashboard](https://dashboard.razorpay.com/)
   - Get test keys from Settings → API Keys
   - Replace the test keys in `.env` file

### Payment Flow Architecture

```
Checkout Page → Create Order API → Razorpay Popup → Payment Verification → Database Update → Course Unlock
```

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/razorpay/create-order` | POST | Creates Razorpay order and saves purchase record |
| `/api/razorpay/verify-payment` | POST | Verifies payment signature and updates status |
| `/api/student/purchases` | GET | Fetches student's purchased courses |
| `/api/courses/[courseId]/access` | GET | Checks if student has course access |

### Testing the Payment Flow

#### 1. Automated Testing
Run the comprehensive test scripts:

```bash
# Test complete payment flow
node test-payment-flow.js

# Test coupon discount flow  
node test-coupon-flow.js
```

#### 2. Manual Testing Steps

1. **Navigate to Checkout**: Visit `http://localhost:3000/checkout`
2. **Fill Form**: Complete billing information
3. **Apply Coupon** (Optional): Use `TEST10` for 10% discount
4. **Click Payment**: Triggers Razorpay popup
5. **Test Payment**: Use Razorpay test cards:
   - Card: 4111 1111 1111 1111
   - Any future expiry date
   - Any random CVV
   - Any random name

### Coupon System

**Test Coupons:**
- `TEST10` - 10% discount
- Any other code - Invalid (no discount)

### Payment Status Flow

1. **Pending**: Order created, awaiting payment
2. **Completed**: Payment verified, course unlocked
3. **Failed**: Payment verification failed
4. **Refunded**: Manual refund process

### Database Schema

**Purchases Collection:**
```typescript
{
  orderId: string,
  paymentId?: string,
  studentId: string,
  studentEmail: string,
  studentName: string,
  studentPhone: string,
  courseId: string,
  courseTitle: string,
  amount: number,
  currency: string,
  status: 'pending' | 'completed' | 'failed' | 'refunded',
  paymentMethod: 'razorpay',
  couponCode?: string,
  discountAmount?: number,
  originalAmount: number,
  taxAmount: number,
  createdAt: Date,
  updatedAt: Date
}
```

### Access Control System

**Course Access Logic:**
1. Student tries to access lesson page
2. System checks purchase record in MongoDB
3. Returns `hasAccess: true/false` based on payment status
4. Shows lesson content or purchase prompt

### Error Handling

- **MongoDB Not Connected**: Graceful fallback with empty responses
- **Invalid Razorpay Keys**: Clear error messages
- **Payment Verification Failed**: Redirects to failure page
- **Duplicate Purchase**: Prevents multiple orders for same course

### Security Features

- **Signature Verification**: HMAC-SHA256 validation
- **Order ID Tracking**: Prevents duplicate payments
- **Amount Validation**: Server-side amount verification
- **Webhook Ready**: Placeholder for webhook implementation

### Testing Checklist

- [ ] Environment variables configured
- [ ] MongoDB running locally
- [ ] Test Razorpay keys working
- [ ] Order creation successful
- [ ] Payment popup opens
- [ ] Signature verification works
- [ ] Database records created
- [ ] Course access granted after payment
- [ ] Coupon discounts applied correctly
- [ ] Success/failure pages load
- [ ] Dashboard shows purchased courses
- [ ] Lesson pages enforce access control

### Production Deployment

1. **Environment Variables**: Set production Razorpay keys
2. **MongoDB Atlas**: Use cloud database
3. **Webhooks**: Configure Razorpay webhooks
4. **HTTPS**: Enable SSL certificate
5. **Domain**: Update allowed origins in Razorpay

## �🔌 Integration Roadmap

### Phase 1: Authentication ✅ COMPLETED
- [x] Install & setup Clerk
- [x] Add Clerk provider to layout
- [x] Protect dashboard routes
- [x] OAuth integration
- [x] User sync with MongoDB
- [x] Sign in/out functionality
- [x] Route protection middleware

### Phase 2: Payments ✅ COMPLETED
- [x] Install Razorpay SDK
- [x] Create payment API route
- [x] Setup payment verification
- [x] Store payment records
- [x] Implement access control

### Phase 3: Database ✅ COMPLETED
- [x] Setup MongoDB connection
- [x] Create purchase model
- [x] Implement CRUD operations
- [x] Add access control logic

### Phase 4: Email
- [ ] Setup SendGrid/Nodemailer
- [ ] Create email templates
- [ ] Send confirmations & notifications

## � Admin Panel Setup

The SSSAM Academy includes a secure admin panel for managing courses, coupons, and lesson links.

### Environment Variables for Admin

Add these to your `.env` file:

```env
# Admin Authentication (Required for admin panel)
ADMIN_EMAIL=admin@sssam-academy.com
ADMIN_PASSWORD=your_secure_admin_password

# MongoDB (Required for admin data storage)
MONGODB_URI=mongodb://localhost:27017/sssam-academy

# Clerk Authentication (For student authentication)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Razorpay (For payments)
RAZORPAY_KEY_ID=rzp_test_SoOs5kviZKeLm2
RAZORPAY_KEY_SECRET=F13wGfRUeVW4AgN5Y2wgqhjF
RAZORPAY_WEBHOOK_ID=
```

### Admin Features

#### Course Management
- ✅ **Add/Edit/Delete Courses**: Full CRUD operations
- ✅ **Pricing Control**: Update course prices and original prices
- ✅ **Status Management**: Published, Draft, Coming Soon
- ✅ **Featured Course Toggle**: Mark courses as featured
- ✅ **Batch Information**: Update next batch dates and info
- ✅ **Course Metadata**: Instructors, duration, lessons count, level, tags

#### Coupon Management
- ✅ **Create Coupons**: Percentage or fixed amount discounts
- ✅ **Usage Limits**: Set maximum usage count
- ✅ **Validity Period**: Set start and end dates
- ✅ **Course-Specific**: Apply to specific courses or all courses
- ✅ **Minimum Amount**: Set minimum order amount
- ✅ **Active/Inactive**: Toggle coupon status

#### Lesson Links Management
- ✅ **YouTube Videos**: Add and manage YouTube lesson links
- ✅ **Google Meet Links**: Manage live session links
- ✅ **Custom Links**: Support for other video platforms
- ✅ **Course Association**: Link lessons to specific courses
- ✅ **Status Control**: Activate/deactivate lesson links

### Admin Access

#### Login
1. Navigate to `/admin/login`
2. Enter admin email and password from environment variables
3. Secure session-based authentication (24-hour expiry)

#### Admin Routes
- `/admin/dashboard` - Overview with statistics
- `/admin/courses` - Course management
- `/admin/coupons` - Coupon management  
- `/admin/lessons` - Lesson link management

#### Security Features
- 🔒 **Separate Authentication**: Admin auth is separate from student auth
- 🔒 **Server-Side Validation**: All credential checks on server
- 🔒 **Secure Sessions**: HTTP-only cookies with proper expiry
- 🔒 **Route Protection**: All admin routes protected server-side
- 🔒 **No Hardcoded Credentials**: Admin details only in environment variables

### Database Collections

The admin panel uses these MongoDB collections:

#### `courses` Collection
```typescript
{
  id: string,
  title: string,
  slug: string,
  description: string,
  shortDescription: string,
  thumbnail: string,
  instructor: string,
  instructorImage: string,
  price: number,
  originalPrice?: number,
  rating: number,
  reviews: number,
  students: number,
  duration: string,
  lessons: number,
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Beginner to Advanced',
  category: string,
  featured: boolean,
  status: 'published' | 'coming-soon' | 'draft',
  tags: string[],
  batchInfo?: string,
  nextBatch?: string,
  sections: CourseSection[],
  curriculum: Lesson[],
  createdAt: string,
  updatedAt: string
}
```

#### `coupons` Collection
```typescript
{
  id: string,
  code: string,
  description?: string,
  discountType: 'percentage' | 'fixed',
  discountValue: number,
  minAmount?: number,
  maxDiscount?: number,
  usageLimit?: number,
  usedCount: number,
  applicableCourses?: string[],
  validFrom: string,
  validUntil: string,
  isActive: boolean,
  createdAt: string,
  updatedAt: string
}
```

#### `lessons` Collection
```typescript
{
  id: string,
  courseId: string,
  lessonId?: string,
  title: string,
  type: 'youtube' | 'google_meet' | 'other',
  url: string,
  description?: string,
  isActive: boolean,
  createdAt: string,
  updatedAt: string
}
```

### API Endpoints

#### Admin Authentication
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout  
- `GET /api/admin/verify` - Verify admin session

#### Course Management
- `GET /api/admin/courses` - List all courses
- `POST /api/admin/courses` - Create new course
- `GET /api/admin/courses/[courseId]` - Get course details
- `PUT /api/admin/courses/[courseId]` - Update course
- `DELETE /api/admin/courses/[courseId]` - Delete course

#### Coupon Management
- `GET /api/admin/coupons` - List all coupons
- `POST /api/admin/coupons` - Create new coupon
- `GET /api/admin/coupons/[couponId]` - Get coupon details
- `PUT /api/admin/coupons/[couponId]` - Update coupon
- `DELETE /api/admin/coupons/[couponId]` - Delete coupon

#### Lesson Links Management
- `GET /api/admin/lessons` - List all lesson links
- `POST /api/admin/lessons` - Create new lesson link
- `GET /api/admin/lessons/[lessonId]` - Get lesson link details
- `PUT /api/admin/lessons/[lessonId]` - Update lesson link
- `DELETE /api/admin/lessons/[lessonId]` - Delete lesson link

### Quick Setup Guide

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Setup MongoDB**:
   ```bash
   # Install and start MongoDB
   mongosh --eval "db.adminCommand('ping')"
   ```

3. **Configure Environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```

5. **Access Admin Panel**:
   - Open `http://localhost:3000/admin/login`
   - Login with your admin credentials

### Security Best Practices

- 🔐 **Strong Admin Password**: Use a complex password
- 🔐 **Environment Security**: Never commit `.env` to version control
- 🔐 **Regular Password Changes**: Update admin credentials periodically
- 🔐 **HTTPS in Production**: Always use SSL in production
- 🔐 **Limited Access**: Restrict admin access to authorized personnel

### Troubleshooting

**Admin login not working?**
- Check `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env`
- Ensure MongoDB is running
- Clear browser cookies and try again

**Admin routes redirecting to login?**
- Session may have expired (24-hour timeout)
- Check browser cookie settings
- Verify admin authentication is working

**Database connection issues?**
- Verify `MONGODB_URI` is correct
- Ensure MongoDB service is running
- Check network connectivity

## �🐛 Troubleshooting

**Port 3000 already in use?**
```bash
npm run dev -- -p 3001
```

**Module not found?**
```bash
rm -rf .next
npm run dev
```

**TypeScript errors?**
```bash
npx tsc --noEmit
npm run build
```

## ✅ Build Status

```
✓ Compiled successfully
✓ TypeScript type-checked (100% coverage)
✓ 11 pages generated
✓ All dynamic routes created
✓ Production build optimized
```

## 📝 Important Notes

### Currently Using Mock Data
All data is placeholder. To use real data:
1. Create API routes in `src/app/api/`
2. Replace data imports with API calls
3. Implement error handling

### Security - Not Yet Implemented
Before production, add:
1. User authentication (Clerk/Auth0)
2. CSRF protection
3. Input validation
4. HTTPS enforcement
5. CORS headers

### Forms - UI Only
Login, register, and contact forms are UI-only. To make functional:
1. Add form validation
2. Create API endpoints
3. Implement email sending
4. Add error handling

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

## 🎯 Next Steps

1. **Explore the Application**
   - Run `npm run dev`
   - Visit all pages
   - Test responsive design

2. **Understand the Code**
   - Review component structure
   - Check TypeScript types
   - Study the data flow

3. **Plan Integrations**
   - Choose auth provider (Clerk/Auth0)
   - Select payment processor (Razorpay/Stripe)
   - Plan database (MongoDB/PostgreSQL)

4. **Start Development**
   - Create API routes
   - Implement authentication
   - Connect to database
   - Add payment processing

## 📄 Code Quality

- ✅ **100% TypeScript** - No `any` types, fully type-safe
- ✅ **Clean Architecture** - Clear separation of concerns
- ✅ **Reusable Components** - DRY principle throughout
- ✅ **Semantic HTML** - Proper heading hierarchy & ARIA labels
- ✅ **Performance** - Optimized with Next.js features
- ✅ **Accessible** - WCAG compliant components

## 🎉 Summary

**SSSAM Academy LMS is ready for development!**

- ✅ 11 fully functional pages
- ✅ 23 reusable components  
- ✅ 100% TypeScript type-safe
- ✅ Fully responsive design
- ✅ Production-ready code
- ✅ Scalable architecture
- ✅ Zero boilerplate configuration

**Start**: `npm run dev` → Open `http://localhost:3000`

---

**Version**: 1.0.0  
**License**: Proprietary to SSSAM Academy  
**Built with**: ❤️ for learning
