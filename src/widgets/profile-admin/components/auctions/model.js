import { aucActions } from 'app/store/auc-slice';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { aucAPI } from 'shared/api/auc';
import { useAxiosErrorNotificate } from 'shared/hooks/axios-error-notificate';

export const useAuctionItems = () => {
  const dispatch = useDispatch();
  const { notificateAxiosError } = useAxiosErrorNotificate();
  const getAuctionList = async () => {
    try {
      const { data } = await aucAPI.getAucList();
      dispatch(aucActions.setItems(data));
    } catch (err) {
      notificateAxiosError(err);
    }
  };

  return { getAuctionList };
};

export const useNewAucLot = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { notificateAxiosError } = useAxiosErrorNotificate();
  const { getAuctionList } = useAuctionItems();
  const [isOpen, setIsOpen] = useState(false);

  const createNewLot = async body => {
    try {
      // { quest_id: 1, lot_name, start_price, redemption_price, term }
      const { data } = await aucAPI.createNewLot(body);
      enqueueSnackbar('Лот успешно создан', {
        variant: 'success',
      });
      getAuctionList();
      setIsOpen(false);
      // dispatch(aucActions.setItems(data.data));
    } catch (err) {
      notificateAxiosError(err);
    }
  };

  return { createNewLot, isOpen, setIsOpen };
};
export const useBetAucLot = (lot_id, id, bettor) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { notificateAxiosError } = useAxiosErrorNotificate();
  const { getAuctionList } = useAuctionItems();
  const [isOpen, setIsOpen] = useState(false);

  const betLot = async body => {
    try {
      // { quest_id: 1, lot_name, start_price, redemption_price, term }
      const { data } = await aucAPI.betLot(lot_id, { id, bettor });
      enqueueSnackbar('Лот успешно продан', {
        variant: 'success',
      });
      getAuctionList();
      setIsOpen(false);
      // dispatch(aucActions.setItems(data.data));
    } catch (err) {
      notificateAxiosError(err);
    }
  };

  return { betLot, isOpen, setIsOpen };
};
