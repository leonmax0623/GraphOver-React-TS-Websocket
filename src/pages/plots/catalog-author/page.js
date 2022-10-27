import React from 'react';
import { MainLayout } from 'shared/ui/main-layout';
import { HeaderMain1 } from 'widgets/header-main-client';
import { SidebarMain } from 'widgets/sidebar-main';
import { FooterMain } from 'widgets/footer-main';
import { PlotsCatalog2 } from 'features/plots/catalog-author';

export const PlotsCatalogPage2 = () => {
  return (
    <MainLayout header={<HeaderMain1 />} sidebar={<SidebarMain />} footer={<FooterMain />}>
      <PlotsCatalog2 />
    </MainLayout>
  );
};
