import { useState } from 'react';
import { ordersAPI } from 'shared/api/orders';
import { useAxiosErrorNotificate } from 'shared/hooks/axios-error-notificate';

export const useSelectExecutor = (order_id, executor_id, order_price, writing_time, getItemById) => {
  const { notificateAxiosError } = useAxiosErrorNotificate();
  const [isOpen, setIsOpen] = useState(false);

  const selectExec = async (respond_id) => {
    try {
      const { data } = await ordersAPI.selectExec(order_id, respond_id,{ executor_id, order_price, writing_time });
      setIsOpen(false);
      getItemById && getItemById();
      // setstate(data);
    } catch (err) {
      notificateAxiosError(err);
    }
  };

  return { selectExec, isOpen, setIsOpen };
};
