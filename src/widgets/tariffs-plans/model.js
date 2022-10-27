import { useAccount } from 'entities/user/model';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { subscriptionAPI } from 'shared/api/subscription';
import { useAxiosErrorNotificate } from 'shared/hooks/axios-error-notificate';

export const useTariffs = () => {
  const { notificateAxiosError } = useAxiosErrorNotificate();
  const { enqueueSnackbar } = useSnackbar();
  const [items, setitems] = useState([]);
  const [curDuration, setcurDuration] = useState('one month');
  const { actions } = useAccount();
  const navigate = useNavigate();

  const getItems = async () => {
    try {
      const { data } = await subscriptionAPI.getItems();
      setitems(data);
    } catch (err) {
      notificateAxiosError(err);
    }
  };

  const buySubscripion = async body => {
    try {
      const { data } = await subscriptionAPI.buySubscripion(body);
      actions.getUserData();
      enqueueSnackbar(`Вы успешно приобрели подписку ${data?.subscription?.level || ''}`, {
        variant: 'success',
      });
      navigate('/catalog');
    } catch (err) {
      notificateAxiosError(err);
    }
  };

  return { getItems, items, curDuration, setcurDuration, buySubscripion };
};

const mock = [
  {
    cost: 500,
    created_at: '2022-08-09T21:10:42.116942+03:00',
    duration: 'one month',
    level: 'BASE',
    updated_at: '2022-08-09T21:10:42.116963+03:00',
  },
  {
    level: 'PRO',
    cost: 1000,
    duration: 'one month',
    created_at: '2022-08-09T21:10:51.704241+03:00',
    updated_at: '2022-08-09T21:10:51.704268+03:00',
  },
  {
    level: 'BUSINESS',
    cost: 1500,
    duration: 'one month',
    created_at: '2022-08-09T21:10:59.877192+03:00',
    updated_at: '2022-08-09T21:10:59.877217+03:00',
  },
];
