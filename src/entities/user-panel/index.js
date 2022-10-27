import { useAccount } from 'entities/user/model';
import { useEffect } from 'react';
import { UserPanel as Ui } from './ui';

export const UserPanel = () => {
  const { userState, actions } = useAccount();

  useEffect(() => {
    actions.getUserData();
  }, []);
  return <Ui {...userState} />;
};
