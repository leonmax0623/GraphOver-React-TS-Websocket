import React from 'react';
import { Link } from 'react-router-dom';
import cls from '../../../../profileadmin.module.scss';

import mail from 'shared/assets/test-content/mail.svg';
import { BanButton } from '../../../BanButton/BanButton';
import { adminPanelApi } from 'shared/api/admin-panel';

export const User = ({ user }) => {
  const onBan = async () => {
    await adminPanelApi.banUser(user.pk);
  };

  const onUnban = async () => {
    await adminPanelApi.unbanUser(user.pk);
  };

  return (
    <div className={cls.item}>
      <div className={[cls.picture, cls.verified].join(' ')}>
        <img src={user.avatar} />
      </div>
      <div className={cls.text}>
        <span className={cls.desc}>{user.role}</span>
        <span className={cls.name}>{user.username}</span>
      </div>
      <div className={cls.controls}>
        <Link to={'profile/' + user.pk}>
          <a className={cls.btnWhite}>профиль</a>
        </Link>
        {/* <div className={cls.icon}>
          <img src={mail} alt={'mail'} />
        </div> */}
        <BanButton isBanned={!user.active_status} onBan={onBan} onUnban={onUnban} />
      </div>
    </div>
  );
};
