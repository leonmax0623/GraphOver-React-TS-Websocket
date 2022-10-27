import { useEffect, useRef, useState } from 'react';
import { createParams } from './utils';
import { storyCatalogAPI } from 'shared/api/story-catalog';
import { ordersAPI } from 'shared/api/orders';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useAxiosErrorNotificate } from 'shared/hooks/axios-error-notificate';
import { ordersActions } from 'app/store/orders-slice';

export const useOrderCatalog = (isUser = false) => {
  const ref = useRef(null);
  const dispatch = useDispatch();

  const pageCnt = useSelector(state => state.ordersReducer.pageCnt);
  const isNextPage = useSelector(state => state.ordersReducer.isNextPage);
  const catalogType = useSelector(state => state.ordersReducer.catalogType);

  const orders = useSelector(state => state.ordersReducer.orders);
  const userId = useSelector(state => state.userReducer.user.pk);

  const filters = useSelector(state => state.ordersReducer.filters);
  const page = useSelector(state => state.ordersReducer.page);
  const statusFilter = useSelector(state => state.ordersReducer.statusFilter);

  const visibleItems = orders.filter(item => {
    if (statusFilter === 'A') {
      return true;
    }
    if (statusFilter === 'M') {
      return item.customer.id === userId;
    }
    if (statusFilter === 'W') {
      return item.status === 'in work';
    }
    if (statusFilter === 'C') {
      return item.status === 'completed';
    }
  });

  const refetchData = () => {
    getData();
  };

  const setStatus = status => {
    dispatch(ordersActions.setStatusFilter(status));
  };

  const setPage = num => {
    dispatch(ordersActions.setPage(num));

    try {
      window.scrollTo({ behavior: 'smooth', top: 0 });
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    const params = { ...filters, page };
    
    const { data } = await ordersAPI.getOrders(params);

    if (data.num_pages < filters.page) {
      setPage(1);
    }
    dispatch(ordersActions.setOrders(data.data));
    dispatch(ordersActions.setPageCnt(data.num_pages));

    // setPageCnt(data.num_pages);
  };

  const getTopics = async () => {
    const res = await storyCatalogAPI.getTopics();
    dispatch(ordersActions.setTopics(res.data));
  };

  useEffect(() => {
    getData();
  }, [filters, page, isUser]);

  useEffect(() => {
    setPage(1);
  }, [statusFilter]);

  useEffect(() => {
    getTopics();
  }, []);

  // create RETURN
  const actions = {
    setPage,
    setStatus,
  };

  return {
    ref,
    visibleItems,
    actions,
    refetchData,
  };
};

export const useNewOrder = refetchData => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { notificateAxiosError } = useAxiosErrorNotificate();

  const [isOpen, setIsOpen] = useState(false);

  const createNewOrder = async body => {
    try {
      // { quest_id: 1, lot_name, start_price, redemption_price, term }
      const { data } = await ordersAPI.createNeworder(body);
      enqueueSnackbar('Заказ успешно создан', {
        variant: 'success',
      });
      refetchData();
      setIsOpen(false);
      // dispatch(aucActions.setItems(data.data));
    } catch (err) {
      notificateAxiosError(err);
    }
  };

  return { createNewOrder, isOpen, setIsOpen };
};
