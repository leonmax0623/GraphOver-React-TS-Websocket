import { notesActions } from 'app/store/notes-slice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { notesAPI } from 'shared/api/notes';
import { useAxiosErrorNotificate } from 'shared/hooks/axios-error-notificate';

export const useNotebook = () => {
  const dispatch = useDispatch();
  const { notificateAxiosError } = useAxiosErrorNotificate();
  const [search, setSearch] = useState('');

  const getNotes = async () => {
    try {
      const { data } = await notesAPI.getNotesWithFilter({ name: search });
      dispatch(notesActions.setNotes(data.data));
      // dispatch(aucActions.setChats(mockData));
    } catch (err) {
      notificateAxiosError(err);
    }
  };

  const deleteNote = async id => {
    try {
      const { data } = await notesAPI.deleteNote(id);
      getNotes();
      // dispatch(aucActions.setChats(mockData));
    } catch (err) {
      notificateAxiosError(err);
    }
  };

  const editNote = async id => {
    try {
      const { data } = await notesAPI.deleteNote(id);
      getNotes();
      // dispatch(aucActions.setChats(mockData));
    } catch (err) {
      notificateAxiosError(err);
    }
  };

  return { getNotes, setSearch, search, deleteNote };
};
