import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import { ordersAPI } from 'shared/api/orders';
import { useAxiosErrorNotificate } from 'shared/hooks/axios-error-notificate';

export const useUserOrders = () => {
  const { notificateAxiosError } = useAxiosErrorNotificate();
  const userState = useSelector(state => state.userReducer.user);
  const [orders, setorders] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCnt, setPageCnt] = useState(1);

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const getUserOrders = async () => {
    try {
      const { data } = await ordersAPI.getUserOrders({ page });
      setorders(data.data);
      setPageCnt(data.num_pages);
    } catch (err) {
      notificateAxiosError(err);
      console.log(err);
    }
  };

  const appendOrders = async () => {
    if (pageCnt <= page) return;
    setPage(page + 1);
    try {
      const { data } = await ordersAPI.getUserOrders({ page: page + 1 });
      setorders([...orders, ...data.data]);
    } catch (err) {
      notificateAxiosError(err);
    }
  };

  return { getUserOrders, orders, ref, inView, appendOrders };
};
