import React from 'react';
import cls from './logout-button.module.scss';
import { Icon, IconNames } from 'shared/ui/icon';
import { ScreenReader } from 'shared/ui/screen-reader';

export const LogoutButton = ({ onClick }) => {
  return (
    <button className={cls.button} onClick={onClick}>
      <Icon name={IconNames.accounts.logout} size={28} className={cls.icon} />
      <ScreenReader>Выйти из аккаунта</ScreenReader>
    </button>
  );
};
