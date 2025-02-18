import axios from 'axios';

const BASE_URL = 'http://localhost:5000/reviews';

export const fetchReviewsByTeacher = async (teacherId) => {
  const response = await axios.get(`${BASE_URL}/${teacherId}`);
  return response.data;
};

export const addReview = async (teacherId, reviewData) => {
  const response = await axios.post(`${BASE_URL}/${teacherId}`, reviewData);
  return response.data;
};
