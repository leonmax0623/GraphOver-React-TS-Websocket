import React from 'react';
import { HeaderMain1 } from 'widgets/header-main-client';
import { SidebarMain } from 'widgets/sidebar-main';
import { FooterMain } from 'widgets/footer-main';
import { MainLayout } from 'shared/ui/main-layout';
import { ViewingData } from 'widgets/ViewData';
import { SidebarAdmin } from 'widgets/sidebar-main copy';
import { HeaderAdmin } from 'widgets/header-main-admin';

export const ViewData = () => {
  return (
    <MainLayout header={<HeaderAdmin />} sidebar={<SidebarAdmin />}>
      <ViewingData />
    </MainLayout>
  );
};
