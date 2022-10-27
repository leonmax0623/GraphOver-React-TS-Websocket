import React from 'react';
import { HeaderMain1 } from 'widgets/header-main-client';
import { SidebarMain } from 'widgets/sidebar-main';
import { FooterMain } from 'widgets/footer-main';
import { MainLayout } from 'shared/ui/main-layout';
import { ProfileAuthor } from 'widgets/author-profile';
import { useSelector } from 'react-redux';

export const AuthorProfile = () => {
  const userRole = useSelector(state => state.userReducer.user.role);
  return (
    <MainLayout header={<HeaderMain1 />} sidebar={<SidebarMain />} footer={<FooterMain />}>
      {/* {userRole === 'author' ? <ProfileAuthor /> : userRole === 'customet' ? <ProfileCustomer /> : <></>} */}
    </MainLayout>
  );
};
// ProfileCustomer
