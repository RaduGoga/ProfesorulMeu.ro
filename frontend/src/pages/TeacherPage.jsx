import React, { useEffect, useState } from 'react';
import { Box, Flex, Heading, Text, Toaster } from '@chakra-ui/react'; // Added Text component
import TeacherProfile from '../components/TeacherProfile';
import ReviewCard from '../components/ReviewCard';
import ReviewForm from '../components/ReviewForm';
import { fetchTeacherById } from '../api/teachers';
import { fetchReviewsByTeacher, addReview } from '../api/reviews';
import { useParams } from 'react-router-dom';

const TeacherPage = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageStats, setAverageStats] = useState(null); // State for average stats
  const [averageOfAverages, setAverageOfAverages] = useState(null); // State for average of averages

  useEffect(() => {
    async function fetchData() {
      const teacherData = await fetchTeacherById(id);
      const reviewsData = await fetchReviewsByTeacher(id);

      setTeacher(teacherData);
      setReviews(reviewsData);

      // Calculate averages
      if (reviewsData.length > 0) {
        const totalStats = reviewsData.reduce(
          (acc, curr) => {
            acc.teaching_quality += curr.ratings.teaching_quality;
            acc.fairness += curr.ratings.fairness;
            acc.subject_knowledge += curr.ratings.subject_knowledge;
            acc.harshness += curr.ratings.harshness;
            acc.course_difficulty += curr.ratings.course_difficulty;
            return acc;
          },
          {
            teaching_quality: 0,
            fairness: 0,
            subject_knowledge: 0,
            harshness: 0,
            course_difficulty: 0,
          }
        );

        const averages = {
          averageTeachingQuality: (
            totalStats.teaching_quality / reviewsData.length
          ).toFixed(2),
          averageFairness: (totalStats.fairness / reviewsData.length).toFixed(2),
          averageSubjectKnowledge: (
            totalStats.subject_knowledge / reviewsData.length
          ).toFixed(2),
          averageHarshness: (totalStats.harshness / reviewsData.length).toFixed(2),
          averageCourseDifficulty: (
            totalStats.course_difficulty / reviewsData.length
          ).toFixed(2),
        };

        setAverageStats(averages);

        // Calculate average of all averages
        const avgValues = Object.values(averages).map(Number); // Convert all averages to numbers
        const overallAverage =
          (avgValues.reduce((sum, value) => sum + value, 0) / avgValues.length).toFixed(2);

        setAverageOfAverages(overallAverage);
      }
    }
    fetchData();
  }, [id]);

  const handleReviewSubmit = async (reviewData) => {
    await addReview(id, reviewData);
    const updatedReviews = await fetchReviewsByTeacher(id);
    setReviews(updatedReviews);

    // Recalculate averages after submitting a review
    if (updatedReviews.length > 0) {
      const totalStats = updatedReviews.reduce(
        (acc, curr) => {
          acc.teaching_quality += curr.ratings.teaching_quality;
          acc.fairness += curr.ratings.fairness;
          acc.subject_knowledge += curr.ratings.subject_knowledge;
          acc.harshness += curr.ratings.harshness;
          acc.course_difficulty += curr.ratings.course_difficulty;
          return acc;
        },
        {
          teaching_quality: 0,
          fairness: 0,
          subject_knowledge: 0,
          harshness: 0,
          course_difficulty: 0,
        }
      );

      const averages = {
        averageTeachingQuality: (
          totalStats.teaching_quality / updatedReviews.length
        ).toFixed(2),
        averageFairness: (totalStats.fairness / updatedReviews.length).toFixed(2),
        averageSubjectKnowledge: (
          totalStats.subject_knowledge / updatedReviews.length
        ).toFixed(2),
        averageHarshness: (totalStats.harshness / updatedReviews.length).toFixed(2),
        averageCourseDifficulty: (
          totalStats.course_difficulty / updatedReviews.length
        ).toFixed(2),
      };

      setAverageStats(averages);

      // Recalculate average of all averages
      const avgValues = Object.values(averages).map(Number);
      const overallAverage =
        (avgValues.reduce((sum, value) => sum + value, 0) / avgValues.length).toFixed(2);

      setAverageOfAverages(overallAverage);
    }
  };

  return (
    <Box>
      <Box display={'flex'} alignItems={'center'} justifyContent={'space-around'}>
        <Box>
          {teacher && (
          <>
            <TeacherProfile teacher={teacher} />
          </>
          )}
        </Box>
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
          {averageOfAverages && (
                <Text color={'blue.500'} fontSize={70}><strong>{averageOfAverages}</strong></Text>
          )}
          <Text marginTop={-5} fontSize={40}><strong>/5</strong></Text>
        </Box>
      </Box>

      {teacher && (
        <>
          {averageStats && (
            <Box backgroundColor={'gray.100'} mt={4} ml={5} mr={5} pb={2} borderRadius={20}>
              <Box display={'flex'} justifyContent={'center'}>
                <Text fontSize={30}><strong>Medii</strong></Text>
              </Box>
              <Box display={'flex'} justifyContent={'space-evenly'}>
                <Box ml={2} textAlign={'center'}>
                  <Text>Calitatea predatului: <strong>{averageStats.averageTeachingQuality}</strong></Text>
                  <Text>Corectitudine: <strong>{averageStats.averageFairness}</strong></Text>
                </Box>
                <Box textAlign={'center'}>
                  <Text>
                    Cunoasterea materiei: <strong>{averageStats.averageSubjectKnowledge}</strong>
                  </Text>
                  <Text>Amabilitate: <strong>{averageStats.averageHarshness}</strong></Text>
                </Box>
              </Box>
              <Box display={'flex'} justifyContent={'center'}>
                <Text>
                  Dificultatea testelor: <strong>{averageStats.averageCourseDifficulty}</strong>
                </Text>
              </Box>
            </Box>
          )}
        </>
      )}
      <Heading mt={10} mb={4} ml={6} fontSize={35}>Recenzii</Heading>
      {reviews.map((review) => (
        <ReviewCard key={review._id} review={review} />
      ))}
      <ReviewForm onSubmit={handleReviewSubmit} />
    </Box>
  );
};

export default TeacherPage;
