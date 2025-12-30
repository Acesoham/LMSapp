# E-Learning Platform Backend

RESTful API built with Node.js, Express, and MongoDB for the E-Learning Platform.

## Features

- JWT Authentication
- Role-based access control (User/Admin)
- Course management (CRUD operations)
- User enrollment system
- Progress tracking
- Input validation
- Secure password hashing with bcrypt

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- express-validator for input validation

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the backend root directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```

### 3. MongoDB Setup

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Replace `your_mongodb_connection_string` in `.env` with your actual connection string

### 4. Seed Database

```bash
npm run seed
```

This will populate the database with sample data including:
- Admin user (admin@example.com / admin123)
- Regular users (john@example.com / password123)
- 6 sample courses across different categories

### 5. Run Server

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Courses
- `GET /api/courses` - Get all courses (with filters)
- `GET /api/courses/:id` - Get single course
- `POST /api/courses` - Create course (Admin only)
- `PUT /api/courses/:id` - Update course (Admin only)
- `DELETE /api/courses/:id` - Delete course (Admin only)

### Enrollments
- `POST /api/enrollments` - Enroll in course (Protected)
- `GET /api/enrollments` - Get user's enrollments (Protected)
- `GET /api/enrollments/:courseId` - Get specific enrollment (Protected)
- `PUT /api/enrollments/:courseId/progress` - Update progress (Protected)
- `GET /api/enrollments/admin/all` - Get all enrollments (Admin only)

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)

## Folder Structure

```
backend/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   ├── authController.js   # Auth logic
│   ├── courseController.js # Course CRUD
│   ├── enrollmentController.js
│   └── userController.js
├── middleware/
│   └── auth.js            # JWT verification
├── models/
│   ├── User.js
│   ├── Course.js
│   └── Enrollment.js
├── routes/
│   ├── authRoutes.js
│   ├── courseRoutes.js
│   ├── enrollmentRoutes.js
│   └── userRoutes.js
├── seed/
│   └── seedData.js        # Sample data
├── .env.example
├── package.json
└── server.js              # Entry point
```

## Test Credentials

After seeding:

**Admin:**
- Email: admin@example.com
- Password: admin123

**User:**
- Email: john@example.com
- Password: password123

## Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected routes with middleware
- Role-based access control
- Input validation
- CORS enabled

## Deployment

This backend is ready for deployment to platforms like:
- Heroku
- Railway
- Render
- AWS
- DigitalOcean

Make sure to:
1. Set environment variables on your hosting platform
2. Use production MongoDB cluster
3. Set `NODE_ENV=production`
