import React from 'react';
import { HeaderMain1 } from 'widgets/header-main-client';
import { SidebarMain } from 'widgets/sidebar-main';
import { FooterMain } from 'widgets/footer-main';
import { MainLayout } from 'shared/ui/main-layout';
import { ProfileAuthorHead } from 'widgets/author-profile-head';
import { CheckCustomer } from 'widgets/Customer';

export const ProfileCustomer = () => {
  return (
    <MainLayout header={<HeaderMain1 />} sidebar={<SidebarMain />} footer={<FooterMain />}>
      <ProfileAuthorHead />
      <CheckCustomer />
    </MainLayout>
  );
};
