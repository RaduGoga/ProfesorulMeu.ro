import React, { useState, useEffect } from 'react';
import { Button, Box, Heading, VStack, Text, HStack, Input } from '@chakra-ui/react';
import { fetchPendingTeachers, approveTeacher, rejectTeacher } from '../api/teachers';

const AdminPage = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [pendingTeachers, setPendingTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginError, setLoginError] = useState('');

  // States for the login form
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Replace with your desired credentials
    const validUsername = 'admin';
    const validPassword = 'Password123';

    if (username === validUsername && password === validPassword) {
      setAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Incorrect username or password.');
    }
  };

  useEffect(() => {
    if (authenticated) {
      const getPendingTeachers = async () => {
        setLoading(true);
        try {
          const teachers = await fetchPendingTeachers();
          setPendingTeachers(teachers);
        } catch (err) {
          setError('Failed to fetch pending teachers.');
        } finally {
          setLoading(false);
        }
      };

      getPendingTeachers();
    }
  }, [authenticated]);

  // Login form if not authenticated
  if (!authenticated) {
    return (
      <Box p={5} maxW="400px" mx="auto" mt={20} shadow="md" borderWidth="1px" borderRadius="md">
        <Heading size="lg" color="blue.500" mb={4} textAlign="center">
          Admin Login
        </Heading>

        <VStack spacing={4}>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {loginError && <Text color="red.500">{loginError}</Text>}
          <Button colorScheme="blue" onClick={handleLogin} width="full">
            Login
          </Button>
        </VStack>
      </Box>
    );
  }

  // Admin content after successful login
  return (
    <Box p={5} maxW="1200px" mx="auto">
      <Heading size="xl" mb={5} textAlign="center" color="blue.500">
        Admin - Pending Teacher Approvals
      </Heading>

      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : (
        <VStack spacing={4} align="stretch">
          {pendingTeachers.length === 0 ? (
            <Text>No pending teachers.</Text>
          ) : (
            pendingTeachers.map((teacher) => (
              <Box key={teacher._id} p={5} shadow="md" borderWidth="1px">
                <HStack justify="space-between" align="center">
                  <VStack align="start">
                    <Text fontWeight="bold">{teacher.name}</Text>
                    <Text>{teacher.school}</Text>
                    <Text>{teacher.subject}</Text>
                  </VStack>

                  <HStack>
                    <Button colorScheme="green" onClick={() => approveTeacher(teacher._id)}>
                      Approve
                    </Button>
                    <Button colorScheme="red" onClick={() => rejectTeacher(teacher._id)}>
                      Reject
                    </Button>
                  </HStack>
                </HStack>
              </Box>
            ))
          )}
        </VStack>
      )}
    </Box>
  );
};

export default AdminPage;
