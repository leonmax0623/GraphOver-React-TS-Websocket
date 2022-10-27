import React, { useState } from 'react';
import { Button, ButtonTypes } from 'shared/ui/button';
import { MainLayout } from 'shared/ui/main-layout';
import { ChatPage } from 'widgets/chat';
import { FooterMain } from 'widgets/footer-main';
import { HeaderMain1 } from 'widgets/header-main-client';
import { SidebarMain } from 'widgets/sidebar-main';

export const Chat = () => {
  return (
    <MainLayout header={<HeaderMain1 />} sidebar={<SidebarMain />} footer={<FooterMain />} withCover={false}>
      <ChatPage />
    </MainLayout>
  );
};
