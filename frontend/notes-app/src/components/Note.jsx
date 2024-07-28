import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import moment from 'moment/moment';
import NoteModal from './NoteModal';
import UpdateNoteForm from './UpdateNoteForm';

export default function Note({ note, onDelete, onUpdate }) {
  const {
    isOpen: isUpdateModalOpen,
    onOpen: onUpdateModalOpen,
    onClose: onUpdateModalClose,
  } = useDisclosure();
  return (
    <Card variant='filled' marginTop='15px'>
      <NoteModal isOpen={isUpdateModalOpen} onClose={onUpdateModalClose}>
        <UpdateNoteForm
          note={note}
          onUpdate={(updatedNote) => {
            onUpdate(updatedNote);
            onUpdateModalClose();
          }}
        />
      </NoteModal>
      <CardHeader>
        <Heading size='md'>{note.title}</Heading>
      </CardHeader>
      <Divider borderColor='gray' />
      <CardBody>
        <Text>{note.description}</Text>
      </CardBody>
      <Divider borderColor='gray' />
      <CardFooter padding='10px 20px'>
        <Flex w='full' justify='space-between' align='center'>
          <Text>{moment(note.createdAt).format('DD.MM.YYYY hh:mm:ss')}</Text>
        </Flex>
        <Flex gap='10px'>
          <Button colorScheme='teal' onClick={onUpdateModalOpen}>
            Изменить
          </Button>
          <Button
            colorScheme='red'
            onClick={() => {
              onDelete(note);
            }}
          >
            Удалить
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  );
}
