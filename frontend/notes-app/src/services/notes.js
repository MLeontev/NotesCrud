import axios from 'axios';

export const fetchNotes = async (filter) => {
  try {
    var response = await axios.get('http://localhost:5231/notes', {
      params: {
        search: filter?.search,
        sortItem: filter?.sortItem,
        sortOrder: filter?.sortOrder,
        page: filter?.page,
        limit: filter?.limit,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createNote = async (note) => {
  try {
    var response = await axios.post('http://localhost:5231/notes', note);
    return response.status;
  } catch (error) {
    console.log(error);
  }
};

export const deleteNote = async (note) => {
  try {
    var response = await axios.delete(`http://localhost:5231/notes/${note.id}`);
    return response.status;
  } catch (error) {
    console.log(error);
  }
};

export const updateNote = async (note) => {
  try {
    var response = await axios.put(
      `http://localhost:5231/notes/${note.id}`,
      note
    );
    return response.status;
  } catch (error) {
    console.log(error);
  }
};
