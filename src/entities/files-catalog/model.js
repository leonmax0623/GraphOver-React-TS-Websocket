import { filesActions } from 'app/store/files-slice';
import { useDispatch } from 'react-redux';
import { filesAPI } from 'shared/api/files';
import { useAxiosErrorNotificate } from 'shared/hooks/axios-error-notificate';

export const useFileCatalog = () => {
  const { notificateAxiosError } = useAxiosErrorNotificate();
  const dispatch = useDispatch();

  const getFilesCatalog = async () => {
    try {
      const { data } = await filesAPI.getItems();
      dispatch(filesActions.setFiles(data));
    } catch (err) {
      dispatch(filesActions.setFiles([]));
      // notificateAxiosError(err);
    }
  };

  return { getFilesCatalog };
};
