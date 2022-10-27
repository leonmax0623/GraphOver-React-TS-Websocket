import { useDispatch } from 'react-redux';
import { notesAPI } from 'shared/api/notes';
import { useAxiosErrorNotificate } from 'shared/hooks/axios-error-notificate';
import { useNotebook } from 'widgets/notebook-list/model';

export const useCreateNote = () => {
  const dispatch = useDispatch();
  const { notificateAxiosError } = useAxiosErrorNotificate();
  const { getNotes } = useNotebook();

  const createNote = async body => {
    console.log("Internal", body)
    try {
      const { data } = await notesAPI.createNote(body);
      getNotes();
      // dispatch(chatActions.setChats(data));
      // dispatch(aucActions.setChats(mockData));
    } catch (err) {
      notificateAxiosError(err);
    }
  };
  return { createNote };
};

export const useUpdateNote = () => {
  const dispatch = useDispatch();
  const { notificateAxiosError } = useAxiosErrorNotificate();
  const { getNotes } = useNotebook();

  const updateNote = async (body, id) => {
    console.log("Internal", id)
    try {
      const { data } = await notesAPI.updateNote(body, id);
      getNotes();
      // dispatch(chatActions.setChats(data));
      // dispatch(aucActions.setChats(mockData));
    } catch (err) {
      notificateAxiosError(err);
    }
  };
  return { updateNote };
};
