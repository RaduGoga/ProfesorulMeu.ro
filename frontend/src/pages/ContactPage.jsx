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
        Intrebari Frecvente
      </Heading>

      <VStack spacing={6} align="start">
        <Box>
          <Heading size="md" mb={2} color="blue.500">
            Nu imi gasesc profesorul. Pot sa il adaug pe site?
          </Heading>
          <Text>
            Sigur! Du-te pe pagina "Adauga un profesor" si completeaza formularul!
          </Text>
        </Box>

        <Separator />

        <Box>
          <Heading size="md" mb={2} color="blue.500">
            Utilizarea acestei platforme e gratis?
          </Heading>
          <Text>
            Normal! Utilizarea platformei ProfesorulMeu.ro este complet gratis atat pentru profesori, cat si pentru elevi.
          </Text>
        </Box>

        <Separator />

        <Box>
          <Heading size="md" mb={2} color="blue.500">
           Sunt profesor. Informatiile despre mine de pe acest site ma deranjeaza. Ce pot sa fac?
          </Heading>
          <Text>
            Nu vrem sa deranjam pe nimeni, scopul platformei fiind colaborarea. Contacteaza-ne via gmail si tot ce contine numele dvs. de pe site va fi sters imediat!
          </Text>
        </Box>

        <Separator />

        <Box>
          <Heading size="md" mb={2} color="blue.500">
            O recenzie scrisa de mine a disparut. Ce s-a intamplat?
          </Heading>
          <Text>
            Pentru a evita spam-ul sau comentarile nepotrivite, un filtru sterge orice recenzie suspicioasa.
          </Text>
        </Box>

        <Separator />

        <Box>
          <Heading size="md" mb={2} color="blue.500">
            Nu imi gasesc scoala in lista pentru a adauga un nou profesor. Pot adauga o scoala in lista?
          </Heading>
          <Text>
            Sigur! Contacteaza-ne via gmail si spune-mi ce scoala am ratat!
          </Text>
        </Box>
      </VStack>

      {/* Contact Information Section */}
      <Heading textAlign="center" mt={12} mb={6} size="2xl">
        Contacteaza-ne!
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
          <Text>Telefon: +40 722 650 088</Text>
        </HStack>

        <HStack>
          <Text>Located in Bucharest, Romania</Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ContactPage;
