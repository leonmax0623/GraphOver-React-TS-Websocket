import React from 'react';
import cls from './header-main-client.module.scss';

import { useLocalStorage } from 'app/hooks';
import { UserPanel1 } from 'entities/user-panel-client';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from 'shared/assets/images/logo/logo-dark-blue.svg';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';

export const HeaderMain1 = ({ logoAsHomePageLink = true }) => {
  const [auth] = useLocalStorage('access_token', '', true);
  const navigate = useNavigate();
  return (
    <header className={cls.container}>
      <div className={[cls.logoContainer, logoAsHomePageLink ? cls.withLink : null].join(' ')}>
        <img className={cls.logo} src={logo} width={150} height={92} alt={'Логотип GrapOver'} />
        {logoAsHomePageLink && <NavLink to={'/'} className={cls.logoLink} />}
        {/* <button className={cls.but} type="button">
          Создать сюжет
        </button> */}
      </div>

      {!!auth && <UserPanel1 />}
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
