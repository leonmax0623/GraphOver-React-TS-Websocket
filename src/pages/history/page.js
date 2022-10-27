import React from 'react';
import { HeaderMain1 } from 'widgets/header-main-client';
import { SidebarMain } from 'widgets/sidebar-main';
import { FooterMain } from 'widgets/footer-main';
import { MainLayout } from 'shared/ui/main-layout';
import { History } from 'widgets/history';
import { ProfileAuthorHead } from 'widgets/author-profile-head';

export const OfferHistory = () => {
  return (
    <MainLayout header={<HeaderMain1 />} sidebar={<SidebarMain />} footer={<FooterMain />}>
      <ProfileAuthorHead />
      <History />
    </MainLayout>
  );
};
