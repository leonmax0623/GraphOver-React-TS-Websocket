import React from 'react';
import { HeaderMain1 } from 'widgets/header-main-client';
import { SidebarMain } from 'widgets/sidebar-main';
import { FooterMain } from 'widgets/footer-main';
import { MainLayout } from 'shared/ui/main-layout';
import { ProfileAuthor } from 'widgets/author-profile';
import { useSelector } from 'react-redux';
import { ProfileAuthorHead } from 'widgets/author-profile-head';
import { CheckCustomer } from 'widgets/Customer';
import { HeaderAdmin } from 'widgets/header-main-admin';
import { AdminProfile } from 'widgets/profile-admin';
import { SidebarAdmin } from 'widgets/sidebar-main copy';

export const Profile = () => {
  const userRole = useSelector(state => state.userReducer.user.role);
  const is_administrator = useSelector(state => state.userReducer.user.is_administrator);

  if (is_administrator)
    return (
      <MainLayout header={<HeaderAdmin />} sidebar={<SidebarAdmin />}>
        <AdminProfile />
      </MainLayout>
    );
  return (
    <MainLayout header={<HeaderMain1 />} sidebar={<SidebarMain />} footer={<FooterMain />}>
      {userRole === 'author' ? (
        <ProfileAuthor />
      ) : userRole === 'customer' ? (
        <>
          <ProfileAuthorHead />
          <CheckCustomer />
        </>
      ) : (
        <></>
      )}
    </MainLayout>
  );
};
