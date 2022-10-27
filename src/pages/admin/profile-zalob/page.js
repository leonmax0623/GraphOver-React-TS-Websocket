import React from 'react';
import { HeaderMain1 } from 'widgets/header-main-client';
import { SidebarMain } from 'widgets/sidebar-main';
import { FooterMain } from 'widgets/footer-main';
import { MainLayout } from 'shared/ui/main-layout';
import { AdminProfile } from 'widgets/profile-admin';
import { SidebarAdmin } from 'widgets/sidebar-main copy';
import { HeaderAdmin } from 'widgets/header-main-admin';
import cls from 'pages/admin/style.module.scss';
import { Complaints } from 'widgets/profile-admin/components/Complaints/Complaints';

export const ProfileZalob = () => {
  return (
    <MainLayout header={<HeaderAdmin />} sidebar={<SidebarAdmin />}>
      <div className={cls.container}>
        <Complaints />
      </div>
    </MainLayout>
  );
};
