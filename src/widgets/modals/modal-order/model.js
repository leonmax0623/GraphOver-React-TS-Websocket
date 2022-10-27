import { useSnackbar } from 'notistack';
import { ordersAPI } from 'shared/api/orders';
import { useAxiosErrorNotificate } from 'shared/hooks/axios-error-notificate';

export const useOrderModal = order_id => {
  const { notificateAxiosError } = useAxiosErrorNotificate();
  const { enqueueSnackbar } = useSnackbar();

  const pushRespond = async (_data, callback) => {
    try {
      const { data } = await ordersAPI.pushRespond(order_id, _data);
      enqueueSnackbar('Вы откликнулись на заказ.', {
        variant: 'success',
      });
      callback();
    } catch (err) {
      notificateAxiosError(err);
      callback();
    }
  };

  return { pushRespond };
};
