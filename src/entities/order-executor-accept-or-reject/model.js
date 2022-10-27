import { useState } from 'react';
import { ordersAPI } from 'shared/api/orders';
import { useAxiosErrorNotificate } from 'shared/hooks/axios-error-notificate';
import { useOrderItem } from 'widgets/order/model';

export const useExecutorAcceptOrReject = order_id => {
  const { getItemById } = useOrderItem(order_id);
  const { notificateAxiosError } = useAxiosErrorNotificate();
  const [isOpen, setIsOpen] = useState(false);

  const selectChoose = async type => {
    try {
      const { data } = await ordersAPI.orderAcceptOrRejectExec(order_id, { confirmation: type });
      setIsOpen(false);
      getItemById();
      // setstate(data);
    } catch (err) {
      notificateAxiosError(err);
    }
  };

  return { selectChoose, isOpen, setIsOpen };
};
