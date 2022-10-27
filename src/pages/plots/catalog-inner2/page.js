import React from 'react';
import { MainLayout } from 'shared/ui/main-layout';
import { SidebarMain } from 'widgets/sidebar-main';
import { FooterMain } from '../../../widgets/footer-main';
import { HeaderMain1 } from 'widgets/header-main-client';
import { InnerCatalogPage2 } from 'features/plots/catalog-inner2';

export const CatalogInner2 = () => {
  return (
    <MainLayout header={<HeaderMain1 />} sidebar={<SidebarMain />} footer={<FooterMain />}>
      <InnerCatalogPage2 />
    </MainLayout>
  );
};
