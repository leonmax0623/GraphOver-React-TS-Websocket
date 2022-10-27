import { notificationActions } from 'app/store/notificate-slice';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { notificateAPI } from 'shared/ws/notificate';

export const useNotifications = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const getNotifications = async (page = 1) => {
    try {
      const { data } = await notificateAPI.getNotificationList(page);
      dispatch(notificationActions.setNotificationList(data));
      getNotificationsStatus();
    } catch (err) {
      console.log(err);
    }
  };

  const getNotificationsStatus = async () => {
    try {
      const { data } = await notificateAPI.getNotificationsStatus();
      dispatch(notificationActions.setNewNotificationCount(data.count_new_notifications));
      if (data.count_new_notifications) {
        enqueueSnackbar(data.status, {
          variant: 'info',
          autoHideDuration: 5000,
          preventDuplicate: true,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return { getNotifications, getNotificationsStatus };
};
