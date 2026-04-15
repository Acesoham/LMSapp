require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const connectDB = require('../config/db');

const users = [
  
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
    assignments: [
      {
        title: "Build a Portfolio Site",
        description: "Create a multi-page portfolio site using semantic HTML and advanced CSS layout techniques.",
        points: 100
      }
    ],
    lessons: [
      {
        title: 'Introduction to Web Development',
        content: 'Overview of web technologies and the modern development landscape. Understanding client-server architecture and HTTP protocols.',
        duration: '1 hour',
        videoUrl: 'https://www.youtube.com/embed/zJSY8tbf_ys',
        order: 1,
      },
      {
        title: 'HTML & CSS Fundamentals',
        content: 'Learn the building blocks of web pages. Master semantic HTML and modern CSS including Flexbox and Grid.',
        duration: '3 hours',
        videoUrl: 'https://www.youtube.com/embed/pQN-pnXPaVg',
        order: 2,
      },
      {
        title: 'JavaScript Essentials',
        content: 'Deep dive into JavaScript: variables, functions, objects, arrays, and ES6+ features.',
        duration: '4 hours',
        videoUrl: 'https://www.youtube.com/embed/W6NZfCO5SIk',
        order: 3,
      },
      {
        title: 'React Fundamentals',
        content: 'Build interactive UIs with React. Learn components, props, state, and hooks.',
        duration: '5 hours',
        videoUrl: 'https://www.youtube.com/embed/bMknfKXIFA8',
        order: 4,
      },
      {
        title: 'Node.js & Express',
        content: 'Backend development with Node.js and Express. Building RESTful APIs.',
        duration: '4 hours',
        videoUrl: 'https://www.youtube.com/embed/Oe421EPjeBE',
        order: 5,
      },
      {
        title: 'MongoDB & Database Design',
        content: 'Working with NoSQL databases. CRUD operations and data modeling.',
        duration: '3 hours',
        videoUrl: 'https://www.youtube.com/embed/pWbMrx5rVBE',
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
    assignments: [
      {
        title: "Mobile Weather App",
        description: "Fetch real-time weather data from an API and display it in a clean React Native interface.",
        points: 150
      }
    ],
    lessons: [
      {
        title: 'React Native Setup',
        content: 'Setting up your development environment for iOS and Android development.',
        duration: '2 hours',
        videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc',
        order: 1,
      },
      {
        title: 'Core Components',
        content: 'Understanding View, Text, Image, and other essential components.',
        duration: '3 hours',
        videoUrl: 'https://www.youtube.com/embed/qSRrxpdMpVc',
        order: 2,
      },
      {
        title: 'Navigation Patterns',
        content: 'Implementing stack, tab, and drawer navigation.',
        duration: '4 hours',
        videoUrl: 'https://www.youtube.com/embed/1v1J_1ZgeFA',
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
    assignments: [
      {
        title: "Linear Regression Model",
        description: "Train a model to predict house prices based on a dataset of square footage and location.",
        points: 200
      }
    ],
    lessons: [
      {
        title: 'Introduction to ML',
        content: 'Understanding machine learning concepts, types, and applications.',
        duration: '2 hours',
        videoUrl: 'https://www.youtube.com/embed/i_LwzRmA8ro',
        order: 1,
      },
      {
        title: 'Python for Data Science',
        content: 'NumPy, Pandas, and Matplotlib fundamentals.',
        duration: '4 hours',
        videoUrl: 'https://www.youtube.com/embed/r-uOLxNrNk8',
        order: 2,
      },
      {
        title: 'Supervised Learning',
        content: 'Linear regression, classification, and decision trees.',
        duration: '6 hours',
        videoUrl: 'https://www.youtube.com/embed/Kte5PeTquAI',
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
        videoUrl: 'https://www.youtube.com/embed/KdgQvgE3ji4',
        order: 1,
      },
      {
        title: 'Data Cleaning Techniques',
        content: 'Handling missing data, outliers, and data quality issues.',
        duration: '3 hours',
        videoUrl: 'https://www.youtube.com/embed/G1S2q7b8e5c',
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
        videoUrl: 'https://www.youtube.com/embed/aE_VjE7y3iU',
        order: 1,
      },
      {
        title: 'Figma Fundamentals',
        content: 'Master Figma for UI design and prototyping.',
        duration: '3 hours',
        videoUrl: 'https://www.youtube.com/embed/FTFaQWZBqQ8',
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
        videoUrl: 'https://www.youtube.com/embed/nU-IIXBWlgM',
        order: 1,
      },
      {
        title: 'SEO Fundamentals',
        content: 'Search engine optimization basics and best practices.',
        duration: '3 hours',
        videoUrl: 'https://www.youtube.com/embed/DvwS7cV9x_4',
        order: 2,
      },
    ],
  },
  {
    title: 'Advanced Next.js 14 Web Development',
    description: 'Master server-side rendering, API routes, and App Router in Next.js 14. Build high-performance React applications targeted for production.',
    category: 'Web Development',
    difficulty: 'Advanced',
    price: 119.99,
    instructor: {
      name: 'Alex Rivera',
      bio: 'Senior Frontend Engineer with expertise in React & Next.js ecosystem.',
      avatar: 'https://i.pravatar.cc/150?img=11',
    },
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    duration: '22 hours',
    rating: 4.8,
    enrolledStudents: 1400,
    assignments: [
      {
        title: "Build a Server Components Demo",
        description: "Create a Next.js 14 application that renders user data on the server without shipping JavaScript to the client.",
        points: 50
      }
    ],
    lessons: [
      {
        title: 'Introduction to Next.js 14',
        content: 'Why Next.js? Understanding the leap from React to Next.js, SEO benefits, and the new App Router.',
        duration: '1.5 hours',
        videoUrl: 'https://www.youtube.com/embed/wm5gMKuwSYk',
        order: 1,
      },
      {
        title: 'Server Components vs Client Components',
        content: 'Deep dive into rendering strategies and how to optimize for performance.',
        duration: '3 hours',
        videoUrl: 'https://www.youtube.com/embed/V67XoMhH_40',
        order: 2,
      },
      {
        title: 'Data Fetching & Mutations',
        content: 'Using Server Actions and fetching data efficiently at the server level.',
        duration: '4 hours',
        videoUrl: 'https://www.youtube.com/embed/6mQ3EWPBhRs',
        order: 3,
      },
    ],
  },
  {
    title: 'Python for Data Analysis & Visualization',
    description: 'A comprehensive guide to using Python libraries like pandas, matplotlib, and seaborn for drawing insights from complex datasets.',
    category: 'Data Science',
    difficulty: 'Intermediate',
    price: 89.99,
    instructor: {
      name: 'Jessica Lee',
      bio: 'Data Scientist and AI Researcher focused on predictive modeling.',
      avatar: 'https://i.pravatar.cc/150?img=16',
    },
    thumbnail: 'https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=800&q=80',
    duration: '28 hours',
    rating: 4.7,
    enrolledStudents: 3120,
    assignments: [
      {
        title: "Clean the Missing Data",
        description: "Download the provided housing CSV file, use pandas to drop empty columns, and fill NaNs with the median value.",
        points: 100
      }
    ],
    lessons: [
      {
        title: 'Python Basics Crash Course',
        content: 'A rapid overview of Python data types, loops, and functions for data analysis.',
        duration: '2 hours',
        videoUrl: 'https://www.youtube.com/embed/k9TUPpGqYTo',
        order: 1,
      },
      {
        title: 'Data Manipulation with Pandas',
        content: 'Importing, cleaning, and aggregating large datasets effortlessly.',
        duration: '5 hours',
        videoUrl: 'https://www.youtube.com/embed/zyGzR1z4QBA',
        order: 2,
      },
    ],
  },
  {
    title: 'Startup Funding & Business Fundamentals',
    description: 'Learn how to validate ideas, structure a startup, and raise funding from Angel Investors and Venture Capitalists.',
    category: 'Business',
    difficulty: 'Beginner',
    price: 159.99,
    instructor: {
      name: 'Marcus Thorne',
      bio: 'Serial entrepreneur and Angel Investor with 3 successful exits.',
      avatar: 'https://i.pravatar.cc/150?img=33',
    },
    thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
    duration: '18 hours',
    rating: 4.9,
    enrolledStudents: 850,
    assignments: [
      {
        title: "Draft Your Pitch Deck",
        description: "Create a 10-slide startup pitch deck covering the core problem, solution, market size, and your business model.",
        points: 200
      },
      {
        title: "Perform Competitor Analysis",
        description: "Identify 3 direct competitors and map out their strengths and weaknesses in a simple matrix.",
        points: 150
      }
    ],
    lessons: [
      {
        title: 'Idea Validation & Market Research',
        content: 'How to ensure your startup solves a real problem that people will pay for.',
        duration: '2 hours',
        videoUrl: 'https://www.youtube.com/embed/p1QGYOBbW1U',
        order: 1,
      },
      {
        title: 'Pitching to Investors',
        content: 'Building a pitch deck and the psychology behind raising venture capital.',
        duration: '3 hours',
        videoUrl: 'https://www.youtube.com/embed/yG7v4y_xwzQ',
        order: 2,
      },
    ],
  }
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
