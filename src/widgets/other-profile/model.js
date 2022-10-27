import { useEffect, useState } from 'react';
import { userAPI } from 'shared/api/user';
import { useAxiosErrorNotificate } from 'shared/hooks/axios-error-notificate';

export const useOtherAccount = id => {
  const [userState, setState] = useState({});

  const getUserData = async () => {
    try {
      const res = await userAPI.getOtherUserData(id);
      const { data } = res;
      setState(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserData();
  }, [id]);

  return {
    userState,
  };
};

export const useOtherFriends = id => {
  const { notificateAxiosError } = useAxiosErrorNotificate();

  const [friends, setfriends] = useState([]);

  const getFriends = async () => {
    try {
      const { data } = await userAPI.getFriendsById(id);
      setfriends(data);
    } catch (err) {
      notificateAxiosError(err);
    }
  };

  return { getFriends, friends };
};
