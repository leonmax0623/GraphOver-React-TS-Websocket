import { useState } from 'react';
import { useNavigate } from 'react-router';
import { aucAPI } from 'shared/api/auc';
import { ordersAPI } from 'shared/api/orders';
import { useAxiosErrorNotificate } from 'shared/hooks/axios-error-notificate';

export const useOrderItem = id => {
  const { notificateAxiosError } = useAxiosErrorNotificate();
  const [state, setstate] = useState({});
  const [history, setHistory] = useState([]);

  const getItemById = async () => {
    try {
      const { data } = await ordersAPI.getOrderById(id);
      setstate(data);
      // setstate(mockData);
    } catch (err) {
      // console.log(err);
      notificateAxiosError(err);
    }
  };

  const getRespondsById = async () => {
    try {
      const { data } = await ordersAPI.getrespondsById(id);
      setHistory(data);
      // setstate(mockData);
    } catch (err) {
      // notificateAxiosError(err);
    }
  };

  return { state, history, getItemById, getRespondsById };
};

export const useCloseOrder = (id) => {
  const { notificateAxiosError } = useAxiosErrorNotificate();
  const navigate = useNavigate();
  const closeOrder = async () => {
    try {
      const { data } = await ordersAPI.closeOrder(id);
      navigate('/orders');
      // setstate(data);
    } catch (err) {
      notificateAxiosError(err);
    }
  };

  return { closeOrder };
};

const mockData = {
  main_author: {
    id: 45,
    fio: 'fio',
    username: 'Aleks.Kyk',
    avatar: 'http://176.53.162.180/media/images/accounts/default-user.jpeg',
  },
  lot_name: 'Таинственная история Билли у озера',
  is_active: true,
  start_price: 100,
  redemption_price: 150,
  created_at: '2022-08-16T14:29:40.733834+03:00',
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quam euismod pellentesque quis purus, et a, amet luctus. Elit vitae nunc fames egestas malesuada facilisi id. Libero mattis nec nunc lectus vestibulum feugiat id fusce. Nibh <source />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quam euismod pellentesque quis purus, et a, amet
    luctus. Elit vitae nunc fames egestas malesuada facilisi id. Libero mattis nec nunc lectus vestibulum feugiat
    id fusce. Nibh sollicitudin et non et tellus at. Ultrices turpis adipiscing sed mauris turpis sit. Nulla Lorem
    ipsum dolor sit amet, consectetur adipiscing elit. Duis quam euismod pellentesque quis purus, et a, amet
    luctus. Elit vitae nunc fames egestas malesuada facilisi id. Libero mattis nec nunc lectus vestibulum feugiat
    id fusce. Nibh sollicitudin et non et tellus at. Ultrices turpis adipiscing sed mauris turpis sit. Nulla
    luctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctusluctus. Elit vitae nunc fames egestas malesuada facilisi id. Libero mattis nec nunc lectus vestibulum feugiat
    id fusce. Nibh sollicitudin et non et tellus at. Ultrices turpis adipiscing sed mauris turpis sit. Nulla Lorem
    ipsum dolor sit amet, consectetur adipiscing elit. Duis quam euismod pellentesque quis purus, et a, amet
    luctus. Elit vitae nunc fames egestas malesuada facilisi id. Libero mattis nec nunc lectus vestibulum feugiat
    id fusce. Nibh sollicitudin et non et tellus at. Ultrices turpis adipiscing sed mauris turpis sit. Nulla
    luctus. Elit vitae nunc fames egestas malesuada facilisi id. Libero mattis nec nunc lectus vestibulum feugiat
    id fusce. Nibh sollicitudin et non et tellus at. Ultrices turpis adipiscing sed mauris turpis sit. Nulla Lorem
    ipsum dolor sit amet, consectetur adipiscing elit. Duis quam euismod pellentesque quis purus, et a, amet
    luctus. Elit vitae nunc fames egestas malesuada facilisi id. Libero mattis nec nunc lectus vestibulum feugiat
    id fusce. Nibh sollicitudin et non et tellus at. Ultrices turpis adipiscing sed mauris turpis sit. Nulla
    luctus. Elit vitae nunc fames egestas malesuada facilisi id. Libero mattis nec nunc lectus vestibulum feugiat
    id fusce. Nibh sollicitudin et non et tellus at. Ultrices turpis adipiscing sed mauris turpis sit. Nulla Lorem
    ipsum dolor sit amet, consectetur adipiscing elit. Duis quam euismod pellentesque quis purus, et a, amet
    luctus. Elit vitae nunc fames egestas malesuada facilisi id. Libero mattis nec nunc lectus vestibulum feugiat
    id fusce. Nibh sollicitudin et non et tellus at. Ultrices turpis adipiscing sed mauris turpis sit. Nulla
    luctus. Elit vitae nunc fames egestas malesuada facilisi id. Libero mattis nec nunc lectus vestibulum feugiat
    id fusce. Nibh sollicitudin et non et tellus at. Ultrices turpis adipiscing sed mauris turpis sit. Nulla Lorem
    ipsum dolor sit amet, consectetur adipiscing elit. Duis quam euismod pellentesque quis purus, et a, amet
    luctus. Elit vitae nunc fames egestas malesuada facilisi id. Libero mattis nec nunc lectus vestibulum feugiat
    id fusce. Nibh sollicitudin et non et tellus at. Ultrices turpis adipiscing sed mauris turpis sit. Nulla
    luctus integer vel fames suspendisse. Justo ullamcorper cras dui in at. `,
};
