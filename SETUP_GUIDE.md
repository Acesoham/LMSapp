# Complete Setup Guide - EduFlow E-Learning Platform

This guide will walk you through setting up the complete MERN stack application from scratch.

## Prerequisites

Before starting, ensure you have:
- ✅ Node.js (v14 or higher) installed
- ✅ npm (comes with Node.js)
- ✅ MongoDB Atlas account (free tier works fine)
- ✅ A code editor (VS Code recommended)
- ✅ Git (optional, for version control)

## Step 1: MongoDB Atlas Setup (5 minutes)

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for a free account
   - Create a new cluster (choose free tier)

2. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
   - Replace `<password>` with your actual password
   - Add database name at the end: `/elearning?retryWrites=true&w=majority`

3. **Whitelist IP Address**
   - In Atlas, go to Network Access
   - Add IP Address
   - For development, you can allow all IPs: `0.0.0.0/0`
   - For production, use specific IPs only

## Step 2: Backend Setup (10 minutes)

1. **Navigate to Backend Directory**
   ```bash
   cd backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   
   This installs:
   - express (web framework)
   - mongoose (MongoDB ODM)
   - bcryptjs (password hashing)
   - jsonwebtoken (authentication)
   - dotenv (environment variables)
   - cors (cross-origin requests)
   - express-validator (input validation)

3. **Create Environment File**
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string_here
   JWT_SECRET=your_super_secret_jwt_key_change_this
   NODE_ENV=development
   ```

4. **Seed the Database**
   ```bash
   npm run seed
   ```
   
   This will:
   - Clear existing data
   - Create admin and user accounts
   - Add 6 sample courses
   - Create sample enrollments
   
   You should see:
   ```
   MongoDB Connected: cluster0.xxx.mongodb.net
   Cleared existing data
   Users created
   Courses created
   Sample enrollments created
   Database seeded successfully!
   
   Test Credentials:
   Admin - Email: admin@example.com, Password: admin123
   User - Email: john@example.com, Password: password123
   ```

5. **Start the Backend Server**
   
   Development mode (with auto-reload):
   ```bash
   npm run dev
   ```
   
   Production mode:
   ```bash
   npm start
   ```
   
   You should see:
   ```
   Server running on port 5000
   MongoDB Connected: cluster0.xxx.mongodb.net
   ```

6. **Test the API**
   
   Open your browser and visit: http://localhost:5000
   
   You should see:
   ```json
   {"message": "E-Learning Platform API"}
   ```

## Step 3: Frontend Setup (10 minutes)

1. **Open New Terminal** (keep backend running)

2. **Navigate to Frontend Directory**
   ```bash
   cd frontend
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```
   
   This installs:
   - react (UI library)
   - react-dom (React DOM renderer)
   - react-router-dom (routing)
   - axios (HTTP client)
   - vite (build tool)
   - tailwindcss (styling)
   - postcss & autoprefixer (CSS processing)

4. **Create Environment File**
   ```bash
   cp .env.example .env
   ```
   
   The `.env` file should contain:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

5. **Start the Development Server**
   ```bash
   npm run dev
   ```
   
   You should see:
   ```
   VITE v4.5.0  ready in 500 ms
   
   ➜  Local:   http://localhost:3000/
   ➜  Network: use --host to expose
   ```

6. **Access the Application**
   
   Open your browser and visit: http://localhost:3000
   
   You should see the beautiful landing page!

## Step 4: Test the Application (10 minutes)

### Test Public Features

1. **Browse the Landing Page**
   - Navigate to http://localhost:3000
   - See hero section, features, categories
   - Click "Explore Courses" or "Get Started Free"

2. **View Courses**
   - Go to http://localhost:3000/courses
   - Test filters: category, difficulty, search
   - Click on a course to see details

3. **View Course Details**
   - Click any course
   - See course information, instructor, syllabus
   - Notice the "Enroll Now" button

### Test User Features

1. **Create New Account**
   - Click "Sign Up" in navbar
   - Fill in the form
   - Submit and see redirect to dashboard

   OR use existing account:
   - Email: john@example.com
   - Password: password123

2. **Test User Dashboard**
   - After login, you're at /dashboard
   - See enrolled courses (if using john@example.com)
   - View progress bars
   - Click "View Lessons" to expand
   - Check/uncheck lessons to update progress

3. **Enroll in Course**
   - Go to Courses page
   - Click on a course you're not enrolled in
   - Click "Enroll Now"
   - See success message
   - Redirected to dashboard
   - See new course in dashboard

### Test Admin Features

1. **Login as Admin**
   - Logout if needed
   - Login with:
     - Email: admin@example.com
     - Password: admin123

2. **Test Admin Dashboard**
   - Click "Admin" in navbar (only visible to admin)
   - See three tabs: Courses, Users, Enrollments

3. **Test Course Management**
   - **Create Course**: Click "+ Add New Course"
     - Fill all required fields
     - Add lessons
     - Submit
   
   - **Edit Course**: Click "Edit" on any course
     - Modify fields
     - Save changes
   
   - **Delete Course**: Click "Delete" on any course
     - Confirm deletion

4. **Test User Management**
   - Switch to "Users" tab
   - View all users
   - See user roles (admin/user)
   - Delete non-admin users (admin can't be deleted)

5. **Test Enrollments**
   - Switch to "Enrollments" tab
   - View all enrollments
   - See progress for each enrollment

## Step 5: Understanding the Code Structure

### Backend Structure

```
backend/
├── config/          # Configuration files
│   └── db.js       # MongoDB connection
├── controllers/     # Business logic
│   ├── authController.js      # Login, register, getMe
│   ├── courseController.js    # CRUD for courses
│   ├── enrollmentController.js # Enrollment logic
│   └── userController.js      # User management
├── middleware/      # Custom middleware
│   └── auth.js     # JWT verification & role check
├── models/         # Database schemas
│   ├── User.js     # User schema with password hashing
│   ├── Course.js   # Course schema with lessons
│   └── Enrollment.js # Enrollment with progress tracking
├── routes/         # API routes
│   ├── authRoutes.js
│   ├── courseRoutes.js
│   ├── enrollmentRoutes.js
│   └── userRoutes.js
├── seed/           # Database seeding
│   └── seedData.js # Sample data script
├── .env.example    # Environment template
├── package.json    # Dependencies
└── server.js       # Entry point
```

### Frontend Structure

```
frontend/
├── src/
│   ├── components/  # Reusable UI components
│   │   ├── Navbar.jsx         # Navigation with auth state
│   │   ├── Footer.jsx         # Footer component
│   │   ├── CourseCard.jsx     # Course display card
│   │   ├── Loading.jsx        # Loading spinner
│   │   └── ProtectedRoute.jsx # Route protection HOC
│   ├── context/     # React Context
│   │   └── AuthContext.jsx    # Global auth state
│   ├── pages/       # Page components
│   │   ├── Home.jsx           # Landing page
│   │   ├── Login.jsx          # Login form
│   │   ├── Register.jsx       # Registration form
│   │   ├── Courses.jsx        # Course listing with filters
│   │   ├── CourseDetail.jsx   # Single course view
│   │   ├── Dashboard.jsx      # User dashboard
│   │   └── Admin.jsx          # Admin dashboard
│   ├── services/    # API integration
│   │   ├── api.js             # Axios instance with interceptors
│   │   ├── authService.js     # Auth API calls
│   │   ├── courseService.js   # Course API calls
│   │   ├── enrollmentService.js # Enrollment API calls
│   │   └── userService.js     # User API calls
│   ├── App.jsx      # Main app with routing
│   ├── main.jsx     # Entry point
│   └── index.css    # Global styles with Tailwind
├── index.html       # HTML template
├── vite.config.js   # Vite configuration
├── tailwind.config.js # Tailwind configuration
└── package.json     # Dependencies
```

## Step 6: Common Issues & Solutions

### Backend Issues

**Issue: MongoDB Connection Failed**
- ✅ Check your connection string in `.env`
- ✅ Verify password doesn't contain special characters (or URL encode them)
- ✅ Ensure IP is whitelisted in MongoDB Atlas
- ✅ Check if MongoDB Atlas is accessible (network firewall)

**Issue: Port 5000 already in use**
- ✅ Change PORT in `.env` to another port (e.g., 5001)
- ✅ Or kill the process using port 5000

**Issue: JWT Secret Error**
- ✅ Make sure JWT_SECRET is set in `.env`
- ✅ Use a long, random string for security

### Frontend Issues

**Issue: Cannot connect to backend**
- ✅ Ensure backend is running on port 5000
- ✅ Check VITE_API_URL in `.env` is correct
- ✅ Check browser console for CORS errors
- ✅ Verify axios requests in Network tab

**Issue: Styles not loading**
- ✅ Run `npm install` again
- ✅ Clear browser cache
- ✅ Restart the dev server

**Issue: Routes not working**
- ✅ Check React Router is properly set up
- ✅ Ensure all routes are defined in App.jsx
- ✅ Verify path names are correct

## Step 7: Building for Production

### Backend Production Build

1. Set environment variables on hosting platform:
   ```env
   MONGODB_URI=your_production_mongodb_uri
   JWT_SECRET=your_production_jwt_secret
   NODE_ENV=production
   PORT=5000
   ```

2. Deploy to platforms like:
   - Render (recommended)
   - Railway
   - Heroku
   - AWS
   - DigitalOcean

### Frontend Production Build

1. **Build the application**
   ```bash
   npm run build
   ```
   
   This creates a `dist/` folder with optimized files.

2. **Preview production build locally**
   ```bash
   npm run preview
   ```

3. **Deploy to platforms like:**
   - Vercel (recommended for React)
   - Netlify
   - AWS Amplify
   - DigitalOcean

4. **Set environment variable:**
   ```env
   VITE_API_URL=https://your-backend-url.com/api
   ```

## Step 8: Next Steps

### Customize the Platform

1. **Branding**
   - Update logo and favicon
   - Change color scheme in `tailwind.config.js`
   - Modify fonts in `index.html` and config

2. **Add Features**
   - Video lessons
   - Quizzes and assessments
   - Course reviews
   - Certificates
   - Payment integration

3. **Enhance Security**
   - Add rate limiting
   - Implement refresh tokens
   - Add two-factor authentication
   - Enhance input validation

4. **Performance**
   - Add caching
   - Implement pagination
   - Optimize images
   - Add CDN for static assets

## Support

If you encounter any issues:
1. Check the error messages carefully
2. Review this guide again
3. Check browser console for frontend errors
4. Check terminal for backend errors
5. Verify environment variables are correct

## Congratulations! 🎉

You now have a fully functional MERN stack e-learning platform running locally!

Happy coding! 🚀
