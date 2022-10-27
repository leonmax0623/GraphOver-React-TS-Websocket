import { userActions } from 'app/store/user-slice';
import { useDispatch } from 'react-redux';
import { userAPI } from 'shared/api/user';
import { useAllUsers } from 'shared/hooks/all-users';
import { useAxiosErrorNotificate } from 'shared/hooks/axios-error-notificate';

export const useAddChat = () => {
  const { notificateAxiosError } = useAxiosErrorNotificate();
  const dispatch = useDispatch();

  const createChatUsers = async () => {
    try {
      const { data } = await userAPI.getUsers();
      dispatch(userActions.setUsers(data));
    } catch (err) {
      notificateAxiosError(err);
    }
  };

  return {};
};
