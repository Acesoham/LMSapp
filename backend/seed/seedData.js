require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const connectDB = require('../config/db');

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'user',
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    role: 'user',
  },
];

const courses = [
  {
    title: 'Full Stack Web Development Bootcamp',
    description: 'Learn to build modern web applications from scratch using React, Node.js, and MongoDB. This comprehensive course covers everything from HTML/CSS basics to deploying production applications.',
    category: 'Web Development',
    difficulty: 'Intermediate',
    price: 99.99,
    instructor: {
      name: 'Sarah Johnson',
      bio: 'Senior Full Stack Developer with 10+ years of experience. Former tech lead at major tech companies.',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
    duration: '40 hours',
    rating: 4.8,
    enrolledStudents: 1234,
    lessons: [
      {
        title: 'Introduction to Web Development',
        content: 'Overview of web technologies and the modern development landscape. Understanding client-server architecture and HTTP protocols.',
        duration: '1 hour',
        order: 1,
      },
      {
        title: 'HTML & CSS Fundamentals',
        content: 'Learn the building blocks of web pages. Master semantic HTML and modern CSS including Flexbox and Grid.',
        duration: '3 hours',
        order: 2,
      },
      {
        title: 'JavaScript Essentials',
        content: 'Deep dive into JavaScript: variables, functions, objects, arrays, and ES6+ features.',
        duration: '4 hours',
        order: 3,
      },
      {
        title: 'React Fundamentals',
        content: 'Build interactive UIs with React. Learn components, props, state, and hooks.',
        duration: '5 hours',
        order: 4,
      },
      {
        title: 'Node.js & Express',
        content: 'Backend development with Node.js and Express. Building RESTful APIs.',
        duration: '4 hours',
        order: 5,
      },
      {
        title: 'MongoDB & Database Design',
        content: 'Working with NoSQL databases. CRUD operations and data modeling.',
        duration: '3 hours',
        order: 6,
      },
    ],
  },
  {
    title: 'React Native Mobile Development',
    description: 'Build native mobile apps for iOS and Android using React Native. Learn navigation, animations, and native features integration.',
    category: 'Mobile Development',
    difficulty: 'Advanced',
    price: 129.99,
    instructor: {
      name: 'Michael Chen',
      bio: 'Mobile architect specializing in React Native. Built 20+ apps with millions of downloads.',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
    duration: '35 hours',
    rating: 4.9,
    enrolledStudents: 856,
    lessons: [
      {
        title: 'React Native Setup',
        content: 'Setting up your development environment for iOS and Android development.',
        duration: '2 hours',
        order: 1,
      },
      {
        title: 'Core Components',
        content: 'Understanding View, Text, Image, and other essential components.',
        duration: '3 hours',
        order: 2,
      },
      {
        title: 'Navigation Patterns',
        content: 'Implementing stack, tab, and drawer navigation.',
        duration: '4 hours',
        order: 3,
      },
    ],
  },
  {
    title: 'Machine Learning with Python',
    description: 'Master machine learning algorithms and techniques. Build predictive models using scikit-learn, TensorFlow, and real-world datasets.',
    category: 'AI/ML',
    difficulty: 'Advanced',
    price: 149.99,
    instructor: {
      name: 'Dr. Emily Watson',
      bio: 'PhD in Machine Learning. Research scientist and educator with 15 years in AI.',
      avatar: 'https://i.pravatar.cc/150?img=9',
    },
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800',
    duration: '50 hours',
    rating: 4.7,
    enrolledStudents: 2341,
    lessons: [
      {
        title: 'Introduction to ML',
        content: 'Understanding machine learning concepts, types, and applications.',
        duration: '2 hours',
        order: 1,
      },
      {
        title: 'Python for Data Science',
        content: 'NumPy, Pandas, and Matplotlib fundamentals.',
        duration: '4 hours',
        order: 2,
      },
      {
        title: 'Supervised Learning',
        content: 'Linear regression, classification, and decision trees.',
        duration: '6 hours',
        order: 3,
      },
    ],
  },
  {
    title: 'Data Science Fundamentals',
    description: 'Learn data analysis, visualization, and statistical methods. Work with Python, pandas, and create insightful visualizations.',
    category: 'Data Science',
    difficulty: 'Beginner',
    price: 79.99,
    instructor: {
      name: 'David Martinez',
      bio: 'Data scientist at Fortune 500 company. Passionate about making data accessible.',
      avatar: 'https://i.pravatar.cc/150?img=14',
    },
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    duration: '30 hours',
    rating: 4.6,
    enrolledStudents: 1876,
    lessons: [
      {
        title: 'Introduction to Data Science',
        content: 'What is data science and why it matters in modern business.',
        duration: '1.5 hours',
        order: 1,
      },
      {
        title: 'Data Cleaning Techniques',
        content: 'Handling missing data, outliers, and data quality issues.',
        duration: '3 hours',
        order: 2,
      },
    ],
  },
  {
    title: 'UI/UX Design Masterclass',
    description: 'Create beautiful and functional user interfaces. Learn design principles, prototyping tools, and user research methods.',
    category: 'Design',
    difficulty: 'Beginner',
    price: 89.99,
    instructor: {
      name: 'Lisa Anderson',
      bio: 'Lead designer with award-winning portfolio. Worked with startups and Fortune 100 companies.',
      avatar: 'https://i.pravatar.cc/150?img=10',
    },
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
    duration: '25 hours',
    rating: 4.8,
    enrolledStudents: 1543,
    lessons: [
      {
        title: 'Design Thinking Basics',
        content: 'Understanding user-centered design and the design thinking process.',
        duration: '2 hours',
        order: 1,
      },
      {
        title: 'Figma Fundamentals',
        content: 'Master Figma for UI design and prototyping.',
        duration: '3 hours',
        order: 2,
      },
    ],
  },
  {
    title: 'Digital Marketing Strategy',
    description: 'Master digital marketing channels including SEO, social media, email marketing, and paid advertising. Grow your online presence.',
    category: 'Marketing',
    difficulty: 'Intermediate',
    price: 69.99,
    instructor: {
      name: 'Tom Wilson',
      bio: 'Digital marketing consultant. Helped 100+ businesses scale their online presence.',
      avatar: 'https://i.pravatar.cc/150?img=13',
    },
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    duration: '20 hours',
    rating: 4.5,
    enrolledStudents: 987,
    lessons: [
      {
        title: 'Digital Marketing Overview',
        content: 'Understanding the digital marketing landscape and key channels.',
        duration: '1.5 hours',
        order: 1,
      },
      {
        title: 'SEO Fundamentals',
        content: 'Search engine optimization basics and best practices.',
        duration: '3 hours',
        order: 2,
      },
    ],
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Course.deleteMany();
    await Enrollment.deleteMany();

    console.log('Cleared existing data');

    // Create users
    const createdUsers = await User.insertMany(users);
    console.log('Users created');

    const adminUser = createdUsers.find(u => u.role === 'admin');

    // Add createdBy to courses
    const coursesWithCreator = courses.map(course => ({
      ...course,
      createdBy: adminUser._id,
    }));

    // Create courses
    const createdCourses = await Course.insertMany(coursesWithCreator);
    console.log('Courses created');

    // Create sample enrollments
    const regularUsers = createdUsers.filter(u => u.role === 'user');
    const enrollments = [];

    regularUsers.forEach((user, index) => {
      // Enroll each user in 1-2 random courses
      const numEnrollments = index % 2 === 0 ? 1 : 2;
      for (let i = 0; i < numEnrollments; i++) {
        const randomCourse = createdCourses[Math.floor(Math.random() * createdCourses.length)];
        enrollments.push({
          user: user._id,
          course: randomCourse._id,
          progress: {
            completedLessons: [],
            percentage: 0,
          },
        });
      }
    });

    await Enrollment.insertMany(enrollments);
    console.log('Sample enrollments created');

    console.log('Database seeded successfully!');
    console.log('\nTest Credentials:');
    console.log('Admin - Email: admin@example.com, Password: admin123');
    console.log('User - Email: john@example.com, Password: password123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
