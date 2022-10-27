import { aucActions } from 'app/store/auc-slice';
import { useAccount } from 'entities/user/model';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { aucAPI } from 'shared/api/auc';
import { useAxiosErrorNotificate } from 'shared/hooks/axios-error-notificate';
import { useAuctionItems } from 'widgets/auctions/model';

export const useBuyLot = getBetHistoryById => {
  const dispatch = useDispatch();
  const { getAuctionList } = useAuctionItems();
  const { notificateAxiosError } = useAxiosErrorNotificate();
  const { enqueueSnackbar } = useSnackbar();

  const { userState, actions } = useAccount();

  const sendLotRedempt = async lot_id => {
    try {
      const { data } = await aucAPI.sendLotRedempt(lot_id);
      getAuctionList();
      enqueueSnackbar(data.success, {
        variant: 'success',
      });
      actions.getUserData();
      getBetHistoryById();
      // dispatch(chatActions.setChats(data));
      // dispatch(aucActions.setChats(mockData));
    } catch (err) {
      notificateAxiosError(err);
    }
  };

  const sendLotBit = async (lot_id, bet_amount) => {
    try {
      const { data } = await aucAPI.sendLotBit(lot_id, { bet_amount });
      getAuctionList();
      enqueueSnackbar('Ваша ставка предложена', {
        variant: 'success',
      });
      actions.getUserData();

      getBetHistoryById();
      // dispatch(chatActions.setChats(data));
      // dispatch(aucActions.setChats(mockData));
    } catch (err) {
      notificateAxiosError(err);
    }
  };

  return { sendLotBit, sendLotRedempt };
};

const mockData = {};
