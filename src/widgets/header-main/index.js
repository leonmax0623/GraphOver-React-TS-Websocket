import React from 'react';
import cls from './header-main.module.scss';

import logo from 'shared/assets/images/logo/logo-dark-blue.svg';
import { NavLink } from 'react-router-dom';
import { UserPanel } from 'entities/user-panel';
import { useLocalStorage } from 'app/hooks';

export const HeaderMain = ({ logoAsHomePageLink = true }) => {
  const [auth] = useLocalStorage('access_token', '', true);

  return (
    <header className={cls.container}>
      <div className={[cls.logoContainer, logoAsHomePageLink ? cls.withLink : null].join(' ')}>
        <img className={cls.logo} src={logo} width={92} height={48} alt={'Логотип GrapOver'} />
        {logoAsHomePageLink && <NavLink to={'/'} className={cls.logoLink} />}
      </div>

      {!!auth && <UserPanel />}
    </header>
  );
};
