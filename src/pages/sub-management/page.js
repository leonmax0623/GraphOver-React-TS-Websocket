import React from 'react';
import { HeaderMain1 } from 'widgets/header-main-client';
import { SidebarMain } from 'widgets/sidebar-main';
import { FooterMain } from 'widgets/footer-main';
import { SubManagerment } from 'widgets/sub-management';
import { MainLayout } from 'shared/ui/main-layout';

export const SubManager = () => {
    return (
        <MainLayout header={<HeaderMain1 />} sidebar={<SidebarMain />} footer={<FooterMain />}>
            <SubManagerment />
        </MainLayout>
    );
};
