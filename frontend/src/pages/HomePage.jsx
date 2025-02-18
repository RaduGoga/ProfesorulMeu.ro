import React, { useState, useEffect, useRef } from 'react';
import { Box, Heading, SimpleGrid, Text, Link, useBreakpointValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import { fetchTeachers } from '../api/teachers';
import pic1 from '../images/pic1.png';

const HomePage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [randomTeachers, setRandomTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachersData = async () => {
      try {
        if (query.trim()) {
          const teachers = await fetchTeachers(query);
          setResults(teachers.slice(0, 15));
        } else {
          const teachers = await fetchTeachers();
          const shuffledTeachers = teachers.sort(() => 0.5 - Math.random());
          setRandomTeachers(shuffledTeachers.slice(0, 15));
          setResults([]);
        }
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachersData();
  }, [query]);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 200);
  }, []);

  const numberOfTeachers = useBreakpointValue({ base: 6, md: 12, lg: 15 });

  const headingRef = useRef(null);
  const [marginTop, setMarginTop] = useState(16); // Default margin for one row

  useEffect(() => {
    // Check the height of the heading after rendering
    if (headingRef.current) {
      const headingHeight = headingRef.current.offsetHeight;
      
      // Assume that if height is greater than 48px (typical for one line), it's two lines
      if (headingHeight > 48) {
        setMarginTop(6); // Reduce margin for two rows
      } else {
        setMarginTop(16); // Default margin for one row
      }
    }
  }, []);

  return (
    <Box>
      <Box p={5}>
        <Heading
          ref={headingRef}
          fontSize={'4xl'}
          fontWeight={650}
          letterSpacing={1}
          lineHeight={1.2}
          mb={10}
          mt={marginTop}
          textAlign="center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
          }}
        >
          Caută-ţi <Text as="span" color="blue.500">Profesorul</Text>!
        </Heading>
        <SearchBar query={query} setQuery={setQuery} />
      </Box>

      <Box mt={3} p={5} maxW="1200px" mx="auto">
        <Heading as="h2" size="xl" mb={5} textAlign="center">
          {query.trim() ? `Rezultate pentru: "${query}"` : 'Profesori Recomandați'}
        </Heading>
        <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={5}>
          {(query.trim() ? results : randomTeachers).slice(0, numberOfTeachers).map((teacher) => {
            const [firstName, ...lastNameParts] = teacher.name.split(' ');
            const lastName = lastNameParts.join(' ');

            return (
              <Box
                key={teacher._id}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                _hover={{ boxShadow: 'lg', transform: 'scale(1.05)' }}
                transition="all 0.2s"
                bgColor={'white'}
                h={'70px'}
                display="flex"
                alignItems="center"
                justifyContent={'center'}
              >
                <Link as={RouterLink} to={`/teachers/${teacher._id}`} width="100%">
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box flex="1" pr={2}>
                      <Text
                        fontSize={'md'}
                        fontWeight="bold"
                        title={teacher.name}
                        style={{
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 2,
                          overflow: 'hidden',
                        }}
                        textAlign="center"
                      >
                        {firstName}
                        <br />
                        {lastName}
                      </Text>
                    </Box>
                    <Box flex="1" pl={2}>
                      <Text
                        fontSize="sm"
                        color="gray.600"
                        title={teacher.school}
                        style={{
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 2,
                          overflow: 'hidden',
                        }}
                        textAlign="center"
                      >
                        {teacher.school}
                      </Text>
                    </Box>
                  </Box>
                </Link>
              </Box>
            );
          })}
        </SimpleGrid>
      </Box>

      <Box mt={{ base: -5, md: -10, lg: -30 }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          style={{ display: 'block', width: '100%' }}
        >
          <path
            fill="#f5f5f5"
            fillOpacity="1"
            d="M0,128L60,144C120,160,240,192,360,208C480,224,600,224,720,218.7C840,213,960,203,1080,176C1200,149,1320,107,1380,85.3L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
      </Box>

      <Box
        display={'flex'}
        alignContent={'center'}
        flexDirection="column"
        bgColor={'gray.100'}
        p={5}
        overflow={'hidden'}
        minH={420}
        justifyContent={'center'}
      >
        <Heading size={'4xl'} mb={7} textAlign={'center'}>
          De ce sa folosesti <Text as="span" color="blue.500">ProfesorulMeu.ro</Text>?
        </Heading>
        <Heading size={'2xl'} textAlign={'center'}>
          Pe <Text as="span" color="blue.500">ProfesorulMeu.ro</Text> gasesti informatii despre <Text as="span" color="blue.500">sute de profesori</Text> de la diverse scoli.
        </Heading>
        <Box
          bgColor={'white'}
          p={5}
          w={'100'}
          maxW={'400px'}
          h={200}
          mt={5}
          borderRadius={20}
          mx="auto"
          boxShadow="0 8px 8px hsl(0deg 0% 0% / 0.1)"
          alignItems={'center'}
          display={'flex'}
        >
          <img src={pic1} alt="pic1" width="110vh" />
          <Text textAlign={'center'} color={'gray.700'} ml={5}>
            <strong>"Acest site m-a ajutat foarte mult sa imi aleg liceul!"</strong>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
