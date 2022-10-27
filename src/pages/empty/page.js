import React from 'react';
import { InnerLayout } from 'shared/ui/inner-layout';
import { HeaderMain1 } from 'widgets/header-main-client';
import { SidebarMain } from 'widgets/sidebar-main';
import { FooterMain } from 'widgets/footer-main';
import { TariffsPlans } from 'widgets/tariffs-plans';

export const Empty = () => {
  return (
    <InnerLayout header={<HeaderMain1 />} sidebar={<SidebarMain />} footer={<FooterMain />} withCover={false}>
      {/* <TariffsPlans /> */}
    </InnerLayout>
  );
};
