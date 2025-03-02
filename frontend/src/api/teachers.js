import axios from 'axios';

const BASE_URL = 'https://profesorulmeu-ro.onrender.com/teachers';

export const fetchTeacherById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const fetchTeachers = async (query = '') => {
  try {
    const response = query.trim()
      ? await axios.get(`${BASE_URL}/search?q=${encodeURIComponent(query)}`)
      : await axios.get(BASE_URL);

    return response.data;
  } catch (error) {
    console.error('Error fetching teachers:', error);
    return [];
  }
};

export const addTeacher = async (teacherData) => {
  const response = await axios.post(BASE_URL, teacherData);
  return response.data;
};

// Fetch all pending teachers
export const fetchPendingTeachers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/pending`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pending teachers:', error);
    return [];
  }
};

// Approve a teacher by ID
export const approveTeacher = async (id) => {
  try {
    const response = await axios.patch(`${BASE_URL}/${id}/approve`);
    return response.data;
  } catch (error) {
    console.error('Error approving teacher:', error);
    throw error;
  }
};

// Reject a teacher by ID
export const rejectTeacher = async (id) => {
  try {
    const response = await axios.patch(`${BASE_URL}/${id}/reject`);
    return response.data;
  } catch (error) {
    console.error('Error rejecting teacher:', error);
    throw error;
  }
};
