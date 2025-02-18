import React from 'react';
import { Box } from '@chakra-ui/react';
import AddTeacherForm from '../components/AddTeacherForm';
import { addTeacher } from '../api/teachers';

const AddTeacherPage = () => {
  const handleSubmit = async (teacherData) => {
    await addTeacher(teacherData);
    alert('Teacher added successfully!');
  };

  return (
    <Box>
      <AddTeacherForm onSubmit={handleSubmit} />
    </Box>
  );
};

export default AddTeacherPage;
