import { useState } from 'react';
import { adminPanelApi } from 'shared/api/admin-panel';
import { paymentAPI } from 'shared/api/payment';
import { useAxiosErrorNotificate } from 'shared/hooks/axios-error-notificate';

export const usePayment = () => {
  const { notificateAxiosError } = useAxiosErrorNotificate();
  const [isOpen, setisOpen] = useState(false);
  const [isOpenWithdraw, setisOpenWithdraw] = useState(false);

  const createPayment = async amount => {
    const username = '502586';
    const description = 'About payment';
    const pass = 'test_KNHadLfoKFWm_-0SQ_kyD1mLer5H9FocWsIjHxZJjYU';

    try {
      const { data } = await paymentAPI.testPayment({ amount, description });
      setisOpen(false);
      window.location.replace(data[1][1].confirmation_url);
    } catch (err) {
      notificateAxiosError(err);
    }
  };
  const createPayout = async (amount, payout_token) => {
    const username = '928494';
    const password = 'test_KNHadLfoKFWm_-0SQ_kyD1mLer5H9FocWsIjHxZJjYU';
    const description = 'About payout';

    try {
      const { data } = await paymentAPI.testPayout({ amount, payout_token, description });
      setisOpenWithdraw(false);
      window.location.replace(data[1][1].confirmation_url);
    } catch (err) {
      notificateAxiosError(err);
    }
  };

  return { createPayment, isOpen, setisOpen, isOpenWithdraw, setisOpenWithdraw, createPayout };
};

export const useCurrencyHistory = activeFilter => {
  const { notificateAxiosError } = useAxiosErrorNotificate();
  const [items, setitems] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCnt, setPageCnt] = useState(1);

  const getHistory = async () => {
    try {
      const body = {};
      if (activeFilter) body['action_type'] = activeFilter;
      const { data } = await adminPanelApi.getCurrency(page, body);
      setitems(data.data);
      setPageCnt(data.num_pages);
    } catch (err) {
      notificateAxiosError(err);
    }
  };

  const appendHistory = async () => {
    if (pageCnt <= page) return;
    setPage(page + 1);
    try {
      const { data } = await paymentAPI.getHistory({ page });
      setitems([...items, ...data]);
    } catch (err) {
      notificateAxiosError(err);
    }
  };

  return { getHistory, appendHistory, page, items };
};
