import { Box, Button, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import './App.css';
import CreateNoteForm from './components/CreateNoteForm';
import NoteFilter from './components/NoteFilter';
import NoteModal from './components/NoteModal';
import NotesList from './components/NotesList';
import Pagination from './components/Pagination';
import {
  createNote,
  deleteNote,
  fetchNotes,
  updateNote,
} from './services/notes';

function App() {
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState({
    search: '',
    sortItem: 'date',
    sortOrder: 'desc',
    limit: 10,
    page: 1,
  });
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchAndSetNotes = async (
    filter,
    setNotes,
    setTotalPages,
    setTotalCount
  ) => {
    const notes = await fetchNotes(filter);
    setNotes(notes.notes);
    setTotalPages(notes.totalPages);
    setTotalCount(notes.totalCount);
  };

  useEffect(() => {
    fetchAndSetNotes(filter, setNotes, setTotalPages, setTotalCount);
  }, [filter]);

  const {
    isOpen: isCreateModalOpen,
    onOpen: onCreateModalOpen,
    onClose: onCreateModalClose,
  } = useDisclosure();

  const onCreate = async (note) => {
    await createNote(note);
    fetchAndSetNotes(filter, setNotes, setTotalPages, setTotalCount);
    onCreateModalClose();
  };

  const onDelete = async (note) => {
    await deleteNote(note);
    fetchAndSetNotes(filter, setNotes, setTotalPages, setTotalCount);
  };

  const onUpdate = async (note) => {
    await updateNote(note);
    fetchAndSetNotes(filter, setNotes, setTotalPages, setTotalCount);
  };

  const handlePageChange = (newPage) => {
    setFilter((prevFilter) => ({ ...prevFilter, page: newPage }));
  };

  return (
    <Box w='800px'>
      <NoteModal isOpen={isCreateModalOpen} onClose={onCreateModalClose}>
        <CreateNoteForm onCreate={onCreate} />
      </NoteModal>
      <Button
        onClick={onCreateModalOpen}
        colorScheme='teal'
        w='full'
        marginTop='15px'
      >
        Создать заметку
      </Button>
      <NoteFilter
        filter={filter}
        setFilter={setFilter}
        totalCount={totalCount}
      />
      <NotesList notes={notes} onDelete={onDelete} onUpdate={onUpdate} />
      <Pagination
        currentPage={filter.page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Box>
  );
}

export default App;
