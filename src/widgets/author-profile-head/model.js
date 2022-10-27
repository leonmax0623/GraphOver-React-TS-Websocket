import { useAccount } from 'entities/user/model';
import { useSnackbar } from 'notistack';
import { subscriptionAPI } from 'shared/api/subscription';
import { userAPI } from 'shared/api/user';
import { useAxiosErrorNotificate } from 'shared/hooks/axios-error-notificate';

export const usePromo = () => {
  const { notificateAxiosError } = useAxiosErrorNotificate();
  const { actions } = useAccount();

  const enterPromo = async promo => {
    try {
      const { data } = await subscriptionAPI.buySubscripion({ promo_code: promo });
      actions.getUserData();
    } catch (err) {
      notificateAxiosError(err);
    }
  };

  return {
    enterPromo,
  };
};
export const useVerify = () => {
  const { notificateAxiosError } = useAxiosErrorNotificate();
  const { actions } = useAccount();
  const { enqueueSnackbar } = useSnackbar();
  const sendVerify = async file => {
    const formData = new FormData();
    if (!file) return;
    formData.append('passport', file);

    try {
      const { data } = await userAPI.verifyAccount(formData);
      actions.getUserData();
      enqueueSnackbar('Запрос на верификацию отправлен', {
        variant: 'success',
        autoHideDuration: 3000,
      });
    } catch (err) {
      notificateAxiosError(err);
    }
  };

  return {
    sendVerify,
  };
};
