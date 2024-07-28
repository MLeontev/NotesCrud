import { Box } from '@chakra-ui/react';
import Note from './Note';

export default function NotesList({ notes, onDelete, onUpdate }) {
  return (
    <Box>
      {notes.map((n) => (
        <Note key={n.id} note={n} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </Box>
  );
}
