import React, { useState, useRef, useEffect } from 'react';
import { Box, Flex, Heading, Button, Spacer } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons'; // Import the HamburgerIcon

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null); // Reference to the dropdown

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Box
      px={6}
      py={2.5}
      bgColor={'blue.500'}
      boxShadow='0 6px 6px hsl(0deg 0% 0% / 0.1)'
      position="relative"
    >
      <Flex align="center" justify="space-between">
        {/* Title on the left */}
        <Heading size="lg" as={RouterLink} to="/" color={'white'}>
          ProfesorulMeu.ro
        </Heading>
        <Spacer />

        {/* Hamburger Menu on the Right */}
        <Box position="relative" ref={menuRef}>
          <Button
            bgColor={'transparent'}
            color={'white'}
            _hover={{ bg: "blue.600" }}
            _active={{ bg: "blue.700" }}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Open Menu" // Add an aria-label for accessibility
            
          >
            <HamburgerIcon />
          </Button>

          {isOpen && (
            <Box
              position="absolute"
              top="100%"
              right="0"
              bg="white"
              borderRadius="md"
              boxShadow="lg"
              mt="5px"
              py={2}
              w="185px"
              zIndex={10}
            >
              <Box
                as={RouterLink}
                to="/add-teacher"
                display="block"
                px={4}
                py={2}
                _hover={{ bg: "gray.100" }}
                onClick={() => setIsOpen(false)}
              >
                Adauga un Profesor
              </Box>
              <Box
                as={RouterLink}
                to="/contact"
                display="block"
                px={4}
                py={2}
                _hover={{ bg: "gray.100" }}
                onClick={() => setIsOpen(false)}
              >
                Intebari Frecvente si Contact
              </Box>
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
