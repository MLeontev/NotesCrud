import { Button, Flex } from '@chakra-ui/react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Flex justifyContent='center' margin='15px 0' gap='2'>
      {pages.map((page) => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          colorScheme={currentPage === page ? 'teal' : 'gray'}
        >
          {page}
        </Button>
      ))}
    </Flex>
  );
}
