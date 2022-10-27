import React, { useEffect, useState } from 'react';
import cls from './plots-catalog-client.module.scss';
import PlotCard from 'entities/plots/catalog-card';
import { useNewOrder, useOrderCatalog } from './model';
import { Card, ShadowSizes } from 'shared/ui/card';
import { Title2 } from 'shared/ui/typography';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';

import { OrderItem } from 'widgets/order-item';
import { FilterModal } from 'entities/filter-toggle/filter-modal';
import { ModalCreateOrder } from 'widgets/modals/modal-create-order';
import { useSelector } from 'react-redux';
import { Tabs } from 'shared/ui/tabs';
import { Pagination } from 'shared/ui/pagination';
import { OrderItemAdmin } from 'widgets/order-item-admin';

export const OrderCatalogAdmin = () => {
  const { actions, visibleItems, refetchData } = useOrderCatalog();

  const orders = useSelector(state => state.ordersReducer.orders);
  const statusFilter = useSelector(state => state.ordersReducer.statusFilter);
  const pageCnt = useSelector(state => state.ordersReducer.pageCnt);
  const page = useSelector(state => state.ordersReducer.page);
  const { createNewOrder, isOpen, setIsOpen } = useNewOrder(refetchData);
  const subscription = useSelector(state => state.userReducer.user.subscription);

  // if (role === 'customer') return <></>;
  return (
    <>
      <Card className={cls.card} shadowSize={ShadowSizes.big}>
        <div className={cls.top}>
          <Title2 className={cls.title}>Список заказов</Title2>
          {/* <SearchFieldToggle className={cls.searchField} name={'search'} placeholder={'Поиск'} /> */}
        </div>
        <div className={cls.filters}>
          <FilterModal className={cls.right} actions={actions} />
        </div>

        {/* <div className=""> */}
        {visibleItems.length ? (
          visibleItems.map(item => <OrderItemAdmin {...item} client={true} refetchData={refetchData} />)
        ) : (
          <>Нет доступных сюжетов</>
        )}
        {/* </div> */}
        {!!pageCnt && <Pagination total={pageCnt} current={page} onChange={number => actions.setPage(number)} />}
      </Card>
    </>
  );
};
