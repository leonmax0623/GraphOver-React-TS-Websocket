import React from 'react';
import { MainLayout } from 'shared/ui/main-layout';
import { HeaderMain1 } from 'widgets/header-main-client';
import { SidebarMain } from 'widgets/sidebar-main';

import { FooterMain } from 'widgets/footer-main';
import { OrderCatalog } from 'features/plots/catalog-orders';

export const OrderCatalogPage = () => {
  return (
    <MainLayout header={<HeaderMain1 />} sidebar={<SidebarMain />} footer={<FooterMain />}>
      <OrderCatalog />
    </MainLayout>
  );
};
