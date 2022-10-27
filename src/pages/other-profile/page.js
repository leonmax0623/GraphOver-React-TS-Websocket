import React from 'react';
import { HeaderMain1 } from 'widgets/header-main-client';
import { SidebarMain } from 'widgets/sidebar-main';
import { FooterMain } from 'widgets/footer-main';
import { MainLayout } from 'shared/ui/main-layout';
import { ProfileAuthor } from 'widgets/author-profile';
import { ProfileOther } from 'widgets/other-profile';

export const OtherProfile = () => {
  return (
    <MainLayout header={<HeaderMain1 />} sidebar={<SidebarMain />} footer={<FooterMain />}>
      <ProfileOther />
    </MainLayout>
  );
};
