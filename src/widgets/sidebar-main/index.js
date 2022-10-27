import { useLocalStorage } from 'app/hooks';
import { useAuth } from 'features/authorization/model';
import { useState } from 'react';
import { IconNames } from 'shared/ui/icon';
import { paths } from '../../shared/paths';
import cls from './sidebar-main.module.scss';
import { CollapseButton } from './ui/collapse-button';
import { LogoutButton } from './ui/logout-button';
import { VerticalNavigation } from './ui/vertical-navigation';

const navigationItems = [
  {
    to: paths.plotsCatalog,
    iconName: IconNames.menu.plots,
    label: 'Сюжеты',
  },
  {
    to: paths.orders,
    iconName: IconNames.menu.pen,
    label: 'Заказы',
    baseBlock: true,
  },
  {
    to: paths.auctions,
    iconName: IconNames.menu.auction,
    label: 'Аукцион',
    baseBlock: true,
  },
  {
    to: paths.chat,
    iconName: IconNames.menu.chatsCircle,
    label: 'Чат',
  },
  {
    to: paths.notebook,
    iconName: IconNames.menu.user,
    label: 'Блокнот',
  },
];

export const SidebarMain = () => {
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
