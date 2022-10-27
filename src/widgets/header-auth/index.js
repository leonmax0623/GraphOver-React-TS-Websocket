import React from 'react';
import cls from './auth-header.module.scss';
import { Icon, IconNames } from '../../shared/ui/icon';
import { useNavigate } from 'react-router';

import logoDarkBlue from 'shared/assets/images/logo/logo-dark-blue.svg';

export const HeaderAuth = () => {
  const navigate = useNavigate();

  return (
    <div className={cls.container}>
      <button className={cls.back} onClick={() => navigate(-1)}>
        <Icon className={cls.backIcon} name={IconNames.arrowLeft} size={28} />
        <span className={cls.backText}>Вернуться назад</span>
      </button>

      <img className={cls.logo} src={logoDarkBlue} width={62} height={32} alt={'Логотип GraphOver'} />
    </div>
  );
};
