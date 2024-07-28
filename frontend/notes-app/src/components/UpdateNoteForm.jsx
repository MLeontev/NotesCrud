import { Box, Button, Heading, Input, Textarea } from '@chakra-ui/react';
import { useState } from 'react';

export default function UpdateNoteForm({ onUpdate, note }) {
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);

  const onSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...note, title, description });
  };

  return (
    <Box
      as='form'
      w='full'
      display='flex'
      flexDirection='column'
      gap={5}
      onSubmit={onSubmit}
    >
      <Heading as='h3' size='lg' fontWeight='bold'>
        Редактировать заметку
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
        Сохранить изменения
      </Button>
    </Box>
  );
}
