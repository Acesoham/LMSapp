# EduFlow - Modern E-Learning Platform

A full-stack MERN (MongoDB, Express, React, Node.js) e-learning platform with modern UI/UX, user authentication, course management, and progress tracking.

![Tech Stack](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

### Public Features
- 🏠 Modern SaaS-style landing page
- 📚 Course catalog with advanced filtering (category, difficulty, price, search)
- 🔍 Detailed course pages with syllabus and instructor info
- 🎨 Fully responsive mobile-first design
- ✨ Beautiful animations and transitions

### User Features
- 🔐 JWT-based authentication (signup/login)
- 📊 Personal dashboard with enrolled courses
- 📈 Progress tracking per lesson
- ✅ Mark lessons as complete
- 🎓 Enroll in courses
- 🔒 Protected routes

### Admin Features
- 👨‍💼 Admin dashboard
- ➕ Create, edit, delete courses
- 👥 View all users
- 📋 View all enrollments
- 🎯 Role-based access control

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool & dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

## 📁 Project Structure

```
elearning-platform/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   ├── enrollmentController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Course.js
│   │   └── Enrollment.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── enrollmentRoutes.js
│   │   └── userRoutes.js
│   ├── seed/
│   │   └── seedData.js
│   ├── .env.example
│   ├── package.json
│   ├── server.js
│   └── README.md
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── CourseCard.jsx
    │   │   ├── Loading.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Courses.jsx
    │   │   ├── CourseDetail.jsx
    │   │   ├── Dashboard.jsx
    │   │   └── Admin.jsx
    │   ├── services/
    │   │   ├── api.js
    │   │   ├── authService.js
    │   │   ├── courseService.js
    │   │   ├── enrollmentService.js
    │   │   └── userService.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── .env.example
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### 1. Clone the Repository

```bash
git clone <repository-url>
cd elearning-platform
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env and add your MongoDB URI and JWT secret

# Seed the database
npm run seed

# Start the server
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install

# Create .env file
cp .env.example .env

# Start the development server
npm run dev
```

Frontend will run on `http://localhost:3000`

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api

## 🔑 Demo Credentials

After running the seed script:

**User Account:**
```
Email: john@example.com
Password: password123
```

**Admin Account:**
```
Email: admin@example.com
Password: admin123
```

## 📱 Responsive Design

The application is fully responsive and optimized for:

- 📱 Mobile devices (360px+)
- 📱 Tablets (768px+)
- 💻 Laptops/Desktops (1024px+)

## 🎨 Design Features

- **Custom Fonts**: Plus Jakarta Sans & Clash Display
- **Color Scheme**: Blue/Indigo gradient theme with clean whites
- **Animations**: Smooth fade-in, slide-up, and scale effects
- **Components**: Reusable, consistent UI components
- **Icons**: SVG icons throughout
- **Accessibility**: Semantic HTML and ARIA labels

## 🔐 Security Features

- JWT token-based authentication
- Password hashing with bcrypt (10 salt rounds)
- Protected API routes with middleware
- Role-based access control
- Input validation
- CORS enabled
- HTTP-only token storage

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Courses
- `GET /api/courses` - Get all courses (with filters)
- `GET /api/courses/:id` - Get single course
- `POST /api/courses` - Create course (Admin)
- `PUT /api/courses/:id` - Update course (Admin)
- `DELETE /api/courses/:id` - Delete course (Admin)

### Enrollments
- `POST /api/enrollments` - Enroll in course
- `GET /api/enrollments` - Get user enrollments
- `GET /api/enrollments/:courseId` - Get specific enrollment
- `PUT /api/enrollments/:courseId/progress` - Update progress
- `GET /api/enrollments/admin/all` - Get all enrollments (Admin)

### Users
- `GET /api/users` - Get all users (Admin)
- `GET /api/users/:id` - Get user by ID (Admin)
- `DELETE /api/users/:id` - Delete user (Admin)

## 🧪 Sample Data

The seed script creates:
- 1 Admin user
- 2 Regular users
- 6 Courses across different categories:
  - Web Development
  - Mobile Development
  - Data Science
  - AI/ML
  - Design
  - Marketing
- Sample enrollments with progress tracking

## 🚀 Deployment

### Backend Deployment (Render, Railway, Heroku)

1. Create a new web service
2. Connect your repository
3. Set environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
4. Deploy

### Frontend Deployment (Vercel, Netlify)

1. Create a new project
2. Connect your repository
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Set environment variables:
   - `VITE_API_URL` (your backend URL)
6. Deploy

## 📊 Database Schema

### User Model
- name, email, password (hashed)
- role (user/admin)
- enrolledCourses (array of Course IDs)

### Course Model
- title, description, category, difficulty
- price, duration, thumbnail
- instructor (name, bio, avatar)
- lessons (array with title, content, duration)
- enrolledStudents, rating

### Enrollment Model
- user (User ID)
- course (Course ID)
- progress (completedLessons array, percentage)
- enrolledAt, lastAccessedAt

## 🛣️ Roadmap

Future enhancements:
- [ ] Video lessons integration
- [ ] Quiz and assessment system
- [ ] Certificate generation
- [ ] Discussion forums
- [ ] Course reviews and ratings
- [ ] Wishlist functionality
- [ ] Email notifications
- [ ] Payment integration
- [ ] Course recommendations
- [ ] Search with Algolia

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ using the MERN stack

## 🙏 Acknowledgments

- React ecosystem
- Tailwind CSS team
- MongoDB team
- Express.js team
- All open-source contributors
