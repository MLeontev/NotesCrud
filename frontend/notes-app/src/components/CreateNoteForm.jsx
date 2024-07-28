import { Box, Button, Heading, Input, Textarea } from '@chakra-ui/react';
import { useState } from 'react';

export default function CreateNoteForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    onCreate({ title: title, description: description });
    setTitle('');
    setDescription('');
  };

  return (
    <Box
      as='form'
      onSubmit={onSubmit}
      w='full'
      display='flex'
      flexDirection='column'
      gap={5}
    >
      <Heading as='h3' size='lg' fontWeight='bold'>
        Создать заметку
      </Heading>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        maxLength={100}
        placeholder='Название'
      />
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        maxLength={500}
        placeholder='Описание'
      />
      <Button colorScheme='teal' type='submit'>
        Создать
      </Button>
    </Box>
  );
}
