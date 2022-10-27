import React from 'react';
import { HeaderMain1 } from 'widgets/header-main-client';
import { SidebarMain } from 'widgets/sidebar-main';
import { FooterMain } from 'widgets/footer-main';
import { MainLayout } from 'shared/ui/main-layout';
import { AdminProfile } from 'widgets/profile-admin';
import { HeaderAdmin } from 'widgets/header-main-admin';
import { SidebarAdmin } from 'widgets/sidebar-main copy';
import { OrderCatalogAdmin } from 'features/plots/catalog-orders-admin';

export const ProfileOrders = () => {
  return (
    <MainLayout header={<HeaderAdmin />} sidebar={<SidebarAdmin />}>
      <OrderCatalogAdmin />
    </MainLayout>
  );
};
