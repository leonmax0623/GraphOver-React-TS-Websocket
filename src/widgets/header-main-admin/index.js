import React from 'react';
import cls from './header-main-client.module.scss';

import logo from 'shared/assets/images/logo/logo-dark-blue.svg';
import { NavLink, useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'app/hooks';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { AdminPanel } from 'entities/user-panel-admin/ui';

export const HeaderAdmin = ({ logoAsHomePageLink = true }) => {
  const [auth] = useLocalStorage('access_token', '', true);
  const navigate = useNavigate();
  return (
    <header className={cls.container}>
      <div className={[cls.logoContainer, logoAsHomePageLink ? cls.withLink : null].join(' ')}>
        <img className={cls.logo} src={logo} width={92} height={48} alt={'Логотип GrapOver'} />
        {logoAsHomePageLink && <NavLink to={'/'} className={cls.logoLink} />}
        {/* <button className={cls.but} type="button">
          Создать сюжет
        </button> */}
      </div>

      {!!auth && <AdminPanel  />}
      {!!!auth && (
        <Button
          onClick={() => navigate('/login')}
          size={ButtonSizes.small}
          type={ButtonTypes.primary}
          className={[cls.but].join(' ')}
        >
          Войти
        </Button>
      )}
    </header>
  );
};
