import React, { useState } from 'react';
import { Box, Input, Button, Heading, Text } from '@chakra-ui/react';

const schools = [
  { label: "Colegiul National de Informatica Tudor Vianu", value: "Colegiul National de Informatica Tudor Vianu" },
  { label: "Colegiul National Spiru Haret", value: "Colegiul National Spiru Haret" },
  { label: "Colegiul National Sfantul Sava", value: "Colegiul National Sfantul Sava" },
  { label: "Colegiul National Matei Basarab", value: "Colegiul National Matei Basarab" },
];

const subjects = [
  { label: "Matematica", value: "Matematica" },
  { label: "Limba si literatura romana", value: "Limba si literatura romana" },
  { label: "Limba engleza", value: "Limba engleza" },
  { label: "Biologie", value: "Biologie" },
  { label: "Logica", value: "Logica" },
  { label: "Filosofie", value: "Filosofie" },
  { label: "Fizica", value: "Fizica" },
  { label: "Sport", value: "Sport" },
  { label: "Geografie", value: "Geografie" },
  { label: "Istorie", value: "Istorie" },
  { label: "Informatica", value: "Informatica" },
  { label: "Chimie", value: "Chimie" },
  { label: "TIC", value: "TIC" },
];

const AddTeacherForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const [subject, setSubject] = useState('');

  const handleSubmit = () => {
    const teacherData = {
      name,
      school,
      subject,
    };
    onSubmit(teacherData);
  };

  return (
    <Box p={5} maxW="500px" mx="auto">
      {/* Centered, Blue Title */}
      <Heading size="lg" mb={2} textAlign="center" color="blue.500">
        Add a Teacher
      </Heading>

      {/* Instructional Text */}
      <Text textAlign="center" fontWeight="bold" mb={6} color="gray.600">
        Please fill in the teacher's name, select their school and subject, then click submit! The request may take up to 48h to be approved.
      </Text>

      {/* Name Input */}
      <Box mb={4}>
        <Text as="label" display="block" mb={2} fontWeight="medium">Name</Text>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter teacher's name"
        />
      </Box>

      {/* School Dropdown */}
      <Box mb={4}>
        <Text as="label" display="block" mb={2} fontWeight="medium">School</Text>
        <Box
          as="select"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          width="100%"
          p={2}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          _focus={{ borderColor: 'teal.500', boxShadow: 'outline' }}
        >
          <option value="">Select school</option>
          {schools.map((school) => (
            <option key={school.value} value={school.value}>
              {school.label}
            </option>
          ))}
        </Box>
      </Box>

      {/* Subject Dropdown */}
      <Box mb={4}>
        <Text as="label" display="block" mb={2} fontWeight="medium">Subject</Text>
        <Box
          as="select"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          width="100%"
          p={2}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          _focus={{ borderColor: 'teal.500', boxShadow: 'outline' }}
        >
          <option value="">Select subject</option>
          {subjects.map((subject) => (
            <option key={subject.value} value={subject.value}>
              {subject.label}
            </option>
          ))}
        </Box>
      </Box>

      {/* Submit Button */}
      <Button
        colorScheme="teal"
        onClick={handleSubmit}
        width="100%"
      >
        Submit
      </Button>
    </Box>
  );
};

export default AddTeacherForm;
