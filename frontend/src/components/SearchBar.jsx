import React from 'react';
import { Input, Box } from '@chakra-ui/react';

const SearchBar = ({ query, setQuery, onSearch }) => {
  return (
    <Box display={'flex'} mb={-4} justifyContent={'center'}>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Nume/Scoala"
        size="xl"
        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        maxW={'70vh'}
        borderRadius={10}
        boxShadow='3px 7px 7px hsl(0deg 0% 0% / 0.05)'
        bgColor={'white'}
      />
    </Box>
  );
};

export default SearchBar;
