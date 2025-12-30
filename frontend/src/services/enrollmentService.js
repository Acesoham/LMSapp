import api from './api';

export const enrollmentService = {
  enrollCourse: async (courseId) => {
    const response = await api.post('/enrollments', { courseId });
    return response.data;
  },

  getMyEnrollments: async () => {
    const response = await api.get('/enrollments');
    return response.data;
  },

  getEnrollment: async (courseId) => {
    const response = await api.get(`/enrollments/${courseId}`);
    return response.data;
  },

  updateProgress: async (courseId, lessonId) => {
    const response = await api.put(`/enrollments/${courseId}/progress`, { lessonId });
    return response.data;
  },

  getAllEnrollments: async () => {
    const response = await api.get('/enrollments/admin/all');
    return response.data;
  },
};
