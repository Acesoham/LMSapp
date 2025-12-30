# E-Learning Platform Frontend

Modern, responsive React frontend built with Vite and Tailwind CSS for the E-Learning Platform.

## Features

- Modern SaaS-style landing page
- Course browsing with advanced filters
- User authentication (Login/Register)
- User dashboard with progress tracking
- Admin dashboard for course management
- Fully responsive mobile-first design
- Beautiful animations and transitions
- Protected routes with role-based access

## Tech Stack

- React 18
- Vite (Build tool)
- React Router v6 (Navigation)
- Tailwind CSS (Styling)
- Axios (API requests)
- Context API (State management)

## Design Features

- **Custom Fonts**: Plus Jakarta Sans & Clash Display
- **Color Scheme**: Blue/Indigo gradient theme
- **Animations**: Fade-in, slide-up, scale-in effects
- **Responsive**: Mobile (360px+), Tablet (768px+), Desktop (1024px+)
- **Components**: Reusable card, button, input components
- **UX**: Loading states, error handling, empty states

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the frontend root directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Run Development Server

```bash
npm run dev
```

The app will run on `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

### 5. Preview Production Build

```bash
npm run preview
```

## Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── CourseCard.jsx
│   │   ├── Loading.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/         # React Context
│   │   └── AuthContext.jsx
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Courses.jsx
│   │   ├── CourseDetail.jsx
│   │   ├── Dashboard.jsx
│   │   └── Admin.jsx
│   ├── services/        # API services
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── courseService.js
│   │   ├── enrollmentService.js
│   │   └── userService.js
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Pages

### Public Pages
- **Home** (`/`) - Landing page with hero section, features, categories
- **Courses** (`/courses`) - Browse all courses with filters
- **Course Detail** (`/courses/:id`) - Detailed course view with enrollment
- **Login** (`/login`) - User login
- **Register** (`/register`) - User registration

### Protected Pages (User)
- **Dashboard** (`/dashboard`) - User's enrolled courses and progress

### Protected Pages (Admin)
- **Admin Dashboard** (`/admin`) - Manage courses, users, enrollments

## Responsive Breakpoints

```css
/* Mobile First */
Default: 360px+

/* Tablet */
md: 768px+

/* Laptop/Desktop */
lg: 1024px+
```

## Color Palette

- Primary Blue: `#0ea5e9` to `#0284c7`
- Primary Indigo: `#6366f1` to `#4f46e5`
- Background: Gradient from slate-50 via blue-50 to indigo-50
- Text: slate-900, slate-700, slate-600

## Custom Components

### Button Classes
- `btn-primary` - Blue gradient button
- `btn-secondary` - White outline button

### Card Component
- `card` - White rounded card with shadow

### Input Component
- `input-field` - Styled form input

### Badge Component
- `badge` - Small rounded label

## API Integration

All API calls go through axios interceptors that:
- Add JWT token to requests
- Handle 401 errors (redirect to login)
- Provide consistent error handling

## State Management

Using React Context API for:
- Authentication state
- User information
- Login/logout functions

## Demo Credentials

After running backend seed:

**User Account:**
- Email: john@example.com
- Password: password123

**Admin Account:**
- Email: admin@example.com
- Password: admin123

## Deployment

This frontend can be deployed to:
- Vercel
- Netlify
- AWS Amplify
- DigitalOcean App Platform

Build command: `npm run build`
Output directory: `dist`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Code splitting with React Router
- Lazy loading of components
- Optimized images
- CSS purging in production
- Fast refresh in development
