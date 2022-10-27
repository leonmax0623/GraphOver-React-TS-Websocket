import { useSnackbar } from 'notistack';
import { adminPanelApi } from 'shared/api/admin-panel';
import { ordersAPI } from 'shared/api/orders';
import { useAxiosErrorNotificate } from 'shared/hooks/axios-error-notificate';

export const useAdminOrderModal = order_id => {
  const { notificateAxiosError } = useAxiosErrorNotificate();
  const { enqueueSnackbar } = useSnackbar();

  const removeOrder = async (_data, callback) => {
    try {
      const { data } = await adminPanelApi.removeOrder(order_id, _data);
      enqueueSnackbar('Заказ успешно удален.', {
        variant: 'success',
      });
      callback();
    } catch (err) {
      notificateAxiosError(err);
      callback();
    }
  };

  return { removeOrder };
};
