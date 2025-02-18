import React, { useState } from 'react';
import {
  Box,
  Textarea,
  Button,
  Heading,
  VStack,
  HStack,
  Text,
  IconButton
} from '@chakra-ui/react';

const ReviewForm = ({ onSubmit }) => {
  const [comment, setComment] = useState('');
  const [ratings, setRatings] = useState({
    teaching_quality: 1,
    fairness: 1,
    subject_knowledge: 1,
    harshness: 1,
    course_difficulty: 1,
  });
  const [commentError, setCommentError] = useState(false);
  const [profanityError, setProfanityError] = useState(false);
  const [timeLimitError, setTimeLimitError] = useState(false);

  const handleRatingChange = (key, value) => {
    setRatings({ ...ratings, [key]: value });
  };

  const handleSubmit = () => {
    const lastReviewTime = localStorage.getItem('lastReview');
    const currentTime = new Date().getTime();
    const twoMinutesInMilliseconds = 2 * 60 * 1000;

    if (lastReviewTime && currentTime - parseInt(lastReviewTime, 10) < twoMinutesInMilliseconds) {
      setTimeLimitError(true);
      return; // Prevent submission if within 2-minute window
    }

    if (comment.trim() === '') {
      setCommentError(true);
      setProfanityError(false);
      return;
    }

    if (checkForProfanity(comment)) {
      setProfanityError(true);
      setCommentError(false);
      return;
    }

    // Clear all errors
    setCommentError(false);
    setProfanityError(false);
    setTimeLimitError(false);

    // Submit review
    onSubmit({ comment, ratings });

    // Store timestamp of the last review
    localStorage.setItem('lastReview', currentTime.toString());

    // Reset form
    setComment('');
    setRatings({
      teaching_quality: 1,
      fairness: 1,
      subject_knowledge: 1,
      harshness: 1,
      course_difficulty: 1,
    });
  };

  // Profanity filter
  const badWords = {
    english: ['badword1', 'badword2', 'offensiveword'],
    romanian: ['badword1_ro', 'offensiveword_ro', 'curseword'],
  };

  const checkForProfanity = (comment) => {
    const lowercasedComment = comment.toLowerCase();
    return (
      badWords.english.some((word) => lowercasedComment.includes(word)) ||
      badWords.romanian.some((word) => lowercasedComment.includes(word))
    );
  };

  const labels = {
    teaching_quality: 'Calitatea Predatului',
    fairness: 'Corectitudine',
    subject_knowledge: 'Cunoașterea Materiei',
    harshness: 'Amabilitate',
    course_difficulty: 'Dificultatea Testelor',
  };

  return (
    <Box p={5} maxW="600px" mx="auto">
      <Heading size="xl" mb={5} textAlign="center" color="blue.500">
        Lasă o Recenzie
      </Heading>

      <VStack spacing={6} align="stretch">
        {/* Ratings */}
        {Object.keys(ratings).map((key) => (
          <Box key={key}>
            <Text fontWeight="bold" mb={2} color="gray.700">
              {labels[key]}:
            </Text>
            <HStack spacing={2}>
              {[1, 2, 3, 4, 5].map((value) => (
                <IconButton
                  key={value}
                  aria-label={`${labels[key]} rating ${value}`}
                  onClick={() => handleRatingChange(key, value)}
                  size="lg"
                  borderRadius="50%"
                  bg={ratings[key] >= value ? 'blue.400' : 'gray.200'}
                  _hover={{ bg: ratings[key] >= value ? 'blue.500' : 'gray.300' }}
                  _active={{ bg: ratings[key] >= value ? 'blue.600' : 'gray.400' }}
                  boxSize="40px"
                />
              ))}
            </HStack>
          </Box>
        ))}

        {/* Comment Section */}
        <Box>
          <Text fontWeight="bold" mb={2} color="gray.700">
            Comentariu:
          </Text>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Scrie o recenzie..."
            borderRadius={12}
            resize="vertical"
            borderColor={commentError || profanityError ? 'red.400' : 'gray.200'}
            minH="120px"
          />
          {commentError && (
            <Text color="red.400" fontSize="sm" mt={1}>
              Te rugăm să adaugi un comentariu înainte de a trimite recenzia.
            </Text>
          )}
          {profanityError && (
            <Text color="red.400" fontSize="sm" mt={1}>
              Te rugăm să nu folosești limbaj inadecvat în recenzie.
            </Text>
          )}
          {timeLimitError && (
            <Text color="red.400" fontSize="sm" mt={1}>
              Poți trimite o altă recenzie doar după 2 minute.
            </Text>
          )}
        </Box>

        {/* Submit Button */}
        <Button
          colorScheme="blue"
          size="lg"
          mt={4}
          onClick={handleSubmit}
          alignSelf="center"
          w="50%"
          borderRadius={20}
        >
          Trimite Recenzia
        </Button>
      </VStack>
    </Box>
  );
};

export default ReviewForm;
