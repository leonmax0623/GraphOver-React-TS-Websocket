import { useAccount } from 'entities/user/model';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { UserPanel1 as Ui } from './ui';

export const UserPanel1 = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { userState, actions } = useAccount();
  const later = localStorage.getItem('later');

  useEffect(() => {
    if (Object.keys(userState).length == 0) return;

    if (!userState?.subscription && !later) {
      navigate('/tariffs');
    }
    // else if (userState.role !== 'customer' && (userState.subscription?.level === 'BASE' || !userState.subscription)) {
    //   navigate('/tariffs');
    // }
  }, [userState]);

  useEffect(() => {
    if (Object.keys(userState).length == 0) return;
    if (userState?.role === 'customer') return;

    if (pathname.includes('/auctions') || pathname.includes('/orders'))
      if (userState?.subscription.level === 'BASE') {
        navigate('/tariffs');
      }
    // else if (userState.role !== 'customer' && (userState.subscription?.level === 'BASE' || !userState.subscription)) {
    //   navigate('/tariffs');
    // }
  }, [pathname, userState]);

  useEffect(() => {
    actions.getUserData();
  }, []);

  return <Ui {...userState} />;
};
