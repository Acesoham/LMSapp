const express = require('express');
const router = express.Router();
const {
  enrollCourse,
  getMyEnrollments,
  getEnrollment,
  updateProgress,
  getAllEnrollments,
} = require('../controllers/enrollmentController');
const { protect, admin } = require('../middleware/auth');

router.route('/')
  .post(protect, enrollCourse)
  .get(protect, getMyEnrollments);

router.get('/admin/all', protect, admin, getAllEnrollments);

router.route('/:courseId')
  .get(protect, getEnrollment);

router.put('/:courseId/progress', protect, updateProgress);

module.exports = router;
