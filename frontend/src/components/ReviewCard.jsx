import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const ReviewCard = ({ review }) => {
  return (
    <Box borderWidth="2px" borderRadius="10px" p={5} ml={5} mr={5} mb={2} mt={2} boxShadow='0 6px 6px hsl(0deg 0% 0% / 0.3)'>
      <Text><strong>Comentariu:</strong> {review.comment}</Text>
      <Text><strong>Evaluare:</strong></Text>
      <ul>
        {Object.entries(review.ratings).map(([key, value]) => (
          <li key={key}>{key
            .replace('teaching_quality', 'Calitatea Predatului')
            .replace('fairness', 'Corectitudine')
            .replace('subject_knowledge', 'Cunoasterea materiei')
            .replace('harshness', 'Amabilitate')
            .replace('course_difficulty', 'Dificultatea testelor')
            }: {value}</li>
        ))}
      </ul>
    </Box>
  );
};

export default ReviewCard;
