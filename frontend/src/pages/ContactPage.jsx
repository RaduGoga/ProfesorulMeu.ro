import React from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Icon,
  HStack,
  Link,
  Separator
} from "@chakra-ui/react";
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";

const ContactPage = () => {
  return (
    <Box maxW="800px" mx="auto" p={5}>
      {/* FAQ Section */}
      <Heading textAlign="center" mb={6} size="2xl">
        Frequently Asked Questions
      </Heading>

      <VStack spacing={6} align="start">
        <Box>
          <Heading size="md" mb={2} color="blue.500">
            I can't find my teacher. Can I add a new teacher?
          </Heading>
          <Text>
            Sure! You can go to the "Add Teacher" page, select your school and a subject and add your teacher. The request can take up to 48h to be approved.
          </Text>
        </Box>

        <Separator />

        <Box>
          <Heading size="md" mb={2} color="blue.500">
            Is this service free?
          </Heading>
          <Text>
            Absolutely! Using our platform is completely free for students and teachers.
          </Text>
        </Box>

        <Separator />

        <Box>
          <Heading size="md" mb={2} color="blue.500">
            I am a teacher. I don't want my name to be on this website. What can I do?
          </Heading>
          <Text>
            We do not want to invade anyone's privacy. As a teacher, at any moment, you can contact us and take down the page with your name forever.
          </Text>
        </Box>

        <Separator />

        <Box>
          <Heading size="md" mb={2} color="blue.500">
            A review of mine disappeared. What happened?
          </Heading>
          <Text>
            To avoid spam or offensive comments, we have set up a chat filter to remove any reviews that contain spam or profanity.
          </Text>
        </Box>

        <Separator />

        <Box>
          <Heading size="md" mb={2} color="blue.500">
            I can't find my school. Can I register a new school?
          </Heading>
          <Text>
            Of course! Contact me via email and tell me what school I missed!
          </Text>
        </Box>
      </VStack>

      {/* Contact Information Section */}
      <Heading textAlign="center" mt={12} mb={6} size="2xl">
        Contact Me!
      </Heading>

      <VStack spacing={4} align="stretch" p={5} borderWidth={1} borderRadius="lg" boxShadow="md">
        <HStack>
          <Icon as={EmailIcon} boxSize={5} color="blue.500" />
          <Text>
            Email:{" "}
            <Link href="mailto:your-email@gmail.com" color="blue.500">
              raduiliegoga@gmail.com
            </Link>
          </Text>
        </HStack>

        <HStack>
          <Icon as={PhoneIcon} boxSize={5} color="blue.500" />
          <Text>Phone: +40 722 650 088</Text>
        </HStack>

        <HStack>
          <Text>Located in Bucharest, Romania</Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ContactPage;
