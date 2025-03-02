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
    english: [
      "fuck", "shit", "bitch", "asshole", "bastard", "cunt", "dick", "piss", "cock", "whore",
      "slut", "motherfucker", "bullshit", "damn", "crap", "douchebag", "faggot", "nigger",
      "retard", "wanker", "twat", "prick", "arse", "jerk", "suck", "pussy", "goddamn", "bloody",
      "bollocks", "bugger", "chink", "kike", "spic", "coon", "gook", "tranny", "hoe", "skank",
      "fucker", "cum", "milf", "screw", "hell", "dipshit", "dumbass", "jackass", "moron", "imbecile"
    ],
    romanian: [
        "pula", "p*la", "pu1a", "pul@", "p.u.l.a", "p|ula", "p u l a", "retard", "retardat", "prost",
        "muie", "m*ie", "mu1e", "m@ie", "m|ie", "m u i e",
        "cur", "c*r", "c@r", "c u r", 
        "dracu", "dr@cu", "dr4cu", "d r a c u",
        "mortii", "m0rtii", "morti1", "morții", "m0rții", "mort!i", "m@rt1i", "m@rtii",
        "mata", "m@ta", "m4t4", "m.t.a", "m a t a", "ma ta",
        "matii", "m@tii", "m4tii", "m a t i i", "ma tii",
        "tac tu", "t@c-tu", "t4c tu", "tat tu", "t@t tu",
        "soacra", "s0acra", "so@cra", "soacra t a",
        "rasa", "r@s@", "ras@", "r a s a",
        "cocalar", "c0cal@r", "c0c@lar", "kokalar", "cocalar",
        "pitipoanca", "pitip0anca", "p!tipoanca",
        "bou", "b0u", "b@u", "b o u",
        "jegos", "jeg0s", "j3g0s", "j3g0$", "j e g o s",
        "idiot", "id!ot", "id10t", "idi0t", "i d i o t",
        "sclav", "scl@v", "scl4v", "sc|av", "s c l a v",
        "cretin", "cr3tin", "cr@tin", "cr3t1n", "c r e t i n",
        "nesimtit", "nes!mtit", "nesimt!t", "n3simtit", "n e s i m t i t",
        "bagami", "bag@mi", "bag4mi", "b4gami", "bagamias", "bagami-as", "baga mi as",
        "fututi", "fut@ ti", "f4tu ti", "fut", "bag", "dau", "gura", "prost", "tigan",
        "mortii", "m0rtii", "mort!i", "m@rtii",
        "pizda", "p!zda", "p1zda", "pizd@", "p|zda", "p1zd@", "p!zd@",
        "mars", "m@rs", "m4rs", "m.r.s", "m a r s",
        "du te", "du-te", "d u t e",
        "sugi", "sug@",
        "futi", "fut@", "f u t i",
        "lingi", "l!ngi", "l1ngi", "l@ngi",
        "scuip", "scu!p", "scu1p", "scu@p",
        "cacar", "cac@r", "kak@r", "c a c a r",
        "rahat", "rah@t", "r4hat",
        "poponar", "p0ponar", "p@ponar",
        "homalau", "h0malau", "h@malau",
        "sex", "s3x", "s e x",
        "porno", "p0rn0", "p@rno", "p o r n o",
        "dildo", "d!ldo", "d1ldo", "d i l d o",
        "vibrator", "v!brator", "v1brator", "v i b r a t o r",
        "testicul", "t3sticul", "t e s t i c u l",
        "masturb", "masturb@", "m@sturb", "m a s t u r b",
        "penis", "p3nis", "p e n i s",
        "vagin", "v@g1n", "v a g i n",
        "homo", "h0mo", "h o m o",
        "gay",
        "prostituat", "pr0stituat", "p r o s t i t u a t",
        "tarfa", "t@rfa", "t a r f a",
        "pedofil", "p3dofil", "p e d o f i l",
        "bagami as", "bagami-as", "bag@mi-as", "bag4mi as", "b4gami as", "bagami - as", "bagami _ as",
        "fututi", "fut@ ti", "f4tu ti", "fututi rasa", "fut@ ti rasa", "f4tu ti r4sa",
        "mortii tai", "m0rtii t@i", "mortii matii", "m0rtii matii", "m0rtii m4 tii",
        "pizda", "p!zda", "p1zda", "pizd@", "p|zda", "p1zd@", "pi*da", "p1*da", "p!zd@",
        "mata", "ma ta", "matii", "ma tii", "ma sii", "maica ta", "maica sa", "tac tu", "tat tu", "tactu",
        "maica sa", "frate miu", "sor mea", "soacra ta", "neamu", "neamului", "rasa ta", "rasa ta", 
        "cap de", "coaie", "coae", "coe", "ouale", "gura", "gura ta", "botul", "botul", "suge", "mancami", "manca mi",
        "manca ti as", "linge", "pupa", "cotet", "scursura", "vierme", "loaza", "parazit", "dihanie", "ciuma", 
        "spalat pe creier", "incult", "salbatic", "jigodie", "suflet de", "ochii", "taci dracu", "taci dracu", "mars ma", 
        "mars in", "mars de aici", "mars dracului", "mars in mortii", "mars in mata", "mars in pizda", "mars in pula", 
        "mars la dracu", "mars naibii", "mars in", "mars de aici", "mars acasa", "du te dracu", "du te in", "du te dreq", 
        "du te dreaq", "du te in mortii", "du te in pizda", "du te in mata", "du te in pula", "du te naibii", "du te acasa",
        "bagami as", "bagati as", "bagati as picioarele", "bagami as picioarele", "bagami as pula", "bagati as pula", 
        "bagati as mortii", "bagati as in gura", "bagami as in ma ta", "bagati as in pizda", "sa mi bag", "sa mi bag picioarele",
        "sa mi bag pula", "sa mi bag in", "sa mi bag in mata", "sa mi bag in pizda", "sa mi bag in gura", "sa ti bag", 
        "sa ti bag pula", "sa ti bag in mata", "sa ti bag in pizda", "sa ti bag in gura", "futu ti", "futu ti rasa", 
        "futu ti neamu", "futu ti viata", "futu ti muma", "futu ti mortii", "futu ti gura", "futu ti pizda", "futu ti mata", 
        "futu ti tac tu", "futu ti tactu", "futu ti tot neamu", "fututi", "futu ti", "fut@ti", "fut1ti", "futu ti"
    ]
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
