import { aucActions } from 'app/store/auc-slice';
import { filesActions } from 'app/store/files-slice';
import { useDispatch } from 'react-redux';
import { aucAPI } from 'shared/api/auc';
import { filesAPI } from 'shared/api/files';
import { useAxiosErrorNotificate } from 'shared/hooks/axios-error-notificate';

export const useAucTerms = () => {
  const { notificateAxiosError } = useAxiosErrorNotificate();
  const dispatch = useDispatch();

  const getTerms = async body => {
    try {
      // { quest_id: 1, lot_name, start_price, redemption_price, term }
      const { data } = await aucAPI.getTerms();
      dispatch(aucActions.setTerms(data));
      // dispatch(aucActions.setItems(data.data));
    } catch (err) {
      notificateAxiosError(err);
    }
  };

  return { getTerms };
};
