import { useState } from 'react';
import { ordersAPI } from 'shared/api/orders';
import { useAxiosErrorNotificate } from 'shared/hooks/axios-error-notificate';

export const usePerformer = order_id => {
  const { notificateAxiosError } = useAxiosErrorNotificate();
  const [work, setwork] = useState({});

  const getWork = async () => {
    try {
      const { data } = await ordersAPI.getWork(order_id);
      setwork(data);
    } catch (err) {
      // notificateAxiosError(err);
    }
  };

  const setWorkText = text => {
    setwork({ ...work, content: text });
  };

  const saveWork = async () => {
    if (!Object.keys(work).length) return;
    try {
      const { data } = await ordersAPI.saveWork(order_id, work);
      setwork(data);
      getWork();
    } catch (err) {
      notificateAxiosError(err);
    }
  };

  const acceptWork = async () => {
    console.log(work.id);
    try {
      const { data } = await ordersAPI.acceptWork(order_id, work.id, { confirmation: true });
    } catch (err) {
      notificateAxiosError(err);
    }
  };

  const sendSubmitWork = async () => {
    try {
      const { data } = await ordersAPI.submitWork(order_id, { work_content: work.content });
    } catch (err) {
      notificateAxiosError(err);
    }
  };

  return { getWork, setWorkText, acceptWork, saveWork, acceptWork, sendSubmitWork, work };
};
