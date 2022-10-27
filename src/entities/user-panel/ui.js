import React from 'react';
import cls from './user-panel.module.scss';
import { AvatarRound } from 'shared/ui/avatar-round';

export const UserPanel = ({ avatar = '', firstName = '', secondName = '', role = '' }) => {
  return (
    <div className={cls.container}>
      <AvatarRound image={avatar} alt={`Аватар пользователя ${firstName} ${secondName}`} className={cls.avatar} />

      <div className={cls.info}>
        <p className={cls.role}>{role}</p>
        <p className={cls.name}>
          {firstName} {secondName[0]}
        </p>
      </div>
    </div>
  );
};
