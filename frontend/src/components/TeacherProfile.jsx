import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const TeacherProfile = ({ teacher }) => {
  const [firstName, lastName] = teacher.name.split(' ');
  return (
    <Box marginTop={5} display={'flex'} alignItems={'center'} flexDirection={'column'}>
        <Heading as="h2" size="4xl" textAlign={'center'} >Prof. {firstName}</Heading>
        <Heading as="h1" size="6xl" marginTop={-3} color={'blue.500'} textAlign={'center'} maxW={'100%'}>{lastName}</Heading>
        <Text><strong>Scoala:</strong></Text>
        <Text textAlign={'center'} >{teacher.school}</Text>
        <Text><strong>Materie:</strong></Text>
        <Text textAlign={'center'} >{teacher.subject}</Text>
    </Box>
  );
};

export default TeacherProfile;
