import React, { useState } from 'react';
import cls from './sidebar-main.module.scss';
import { CollapseButton } from './ui/collapse-button';
import { LogoutButton } from './ui/logout-button';
import { VerticalNavigation } from './ui/vertical-navigation';
import { IconNames } from 'shared/ui/icon';
import { paths } from 'shared/paths';
import { useAuth } from 'features/authorization/model';
import { useLocalStorage } from 'app/hooks';

const navigationItems = [
  {
    to: paths.adminCommon,
    iconName: IconNames.menu.user,
    label: 'Общая информация',
  },
  // {
  //   to: paths.adminPlots,

  //   iconName: IconNames.menu.plots,
  //   label: 'Управление сюжетами',
  // },
  // {
  //   to: paths.adminAuc,
  //   iconName: IconNames.menu.auction,
  //   label: 'Управление ауционом',
  // },
  {
    to: paths.adminUsers,
    iconName: IconNames.menu.user,
    label: 'Пользователи',
  },
  {
    to: paths.adminOrders,

    iconName: IconNames.menu.pen,
    label: 'Управление доской заказов',
  },
  {
    to: paths.adminZalob,
    iconName: IconNames.menu.chatsCircle,
    label: 'Жалобы и предложения',
  },
  {
    to: paths.adminView,
    iconName: IconNames.menu.chatsCircle,
    label: 'Просмотр данных по БиТ',
  },
];

export const SidebarAdmin = () => {
  const [collapse, setCollapse] = useState(true);
  const [auth] = useLocalStorage('access_token', '', true);
  const { logout } = useAuth();
  if (!!!auth) return <></>;
  return (
    <aside className={[cls.container, collapse ? cls.collapse : cls.expanded].join(' ')}>
      <div className={cls.expander} />

      <div className={cls.content}>
        <div className={cls.top}>
          <CollapseButton collapse={collapse} onClick={() => setCollapse(!collapse)} />
        </div>

        <div className={cls.middle}>
          <VerticalNavigation items={navigationItems} collapse={collapse} />
        </div>

        <div className={cls.bottom}>
          <LogoutButton onClick={() => logout()} />
        </div>
      </div>
    </aside>
  );
};
