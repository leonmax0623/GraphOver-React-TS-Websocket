import React from 'react';
import { MainLayout } from 'shared/ui/main-layout';
import { SidebarMain } from 'widgets/sidebar-main';
import { FooterMain } from '../../../widgets/footer-main';
import { HeaderMain1 } from 'widgets/header-main-client';
import { InnerCatalogPage } from 'features/plots/catalog-inner';

export const CatalogInner = () => {
  return (
    <MainLayout header={<HeaderMain1 />} sidebar={<SidebarMain />} footer={<FooterMain />}>
      <InnerCatalogPage />
    </MainLayout>
  );
};
