import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import cls from '../../../../profileadmin.module.scss';

import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { StatusProfile } from 'shared/ui/status-profile';

import photo from 'shared/assets/test-content/foto.png';
import mail from 'shared/assets/test-content/mail.svg';
import { BanButton } from '../../../BanButton/BanButton';
import { adminPanelApi } from '../../../../../../shared/api/admin-panel';
import { ModalVerifyContext } from '../../Users';

export const UserItem = ({ user, fetch }) => {
  const { setModalData } = useContext(ModalVerifyContext);

  const onBan = async () => {
    await adminPanelApi.banUser(user.pk);
    fetch();
  };

  const onUnban = async () => {
    await adminPanelApi.unbanUser(user.pk);
    fetch();
  };

  const seeRequest = async () => {
    const { data } = await adminPanelApi.getVerifyRequest(user.pk);
    setModalData({
      id: user.pk,
      name: user.username,
      role: user.role,
      description: 'Откуда должен браться этот текст?)',
      passport: data.passport,
    });
  };

  return (
    <>
      <div className={cls.targetCol}>
        <div className={cls.user}>
          <div className={[cls.picture, cls.verified].join(' ')}>
            <img src={user.avatar || photo} />
          </div>
          <span className={cls.desc}>{user.role}</span>
          <span className={cls.name}>{user.username}</span>
        </div>
      </div>
      <div className={cls.targetCol}>
        <Link to="/tariffs" className={cls.tarif}>
          <div>
            <svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 13.5V6M5.5 13.5V1.5M1 13.5V9"
                stroke="#1A1A1A"
                strokeOpacity="0.5"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className={cls.link}>
            {user.tarif === 'Пользователь без подписки' ? 'Без подписки' : <> Тариф: {user.tarif}</>}
          </div>
        </Link>
      </div>
      <div className={cls.targetCol}>
        {
          // Если не проверен ещё.
          !user.verified && user.verify_status ? (
            <Button className={cls.btn} size={ButtonSizes.small} type={ButtonTypes.primary} onClick={seeRequest}>
              Смотреть запрос на верификацию
            </Button>
          ) : (
            <StatusProfile verified={user.verified} />
          )
        }
      </div>

      <div className={cls.targetCol}>
        <div className={cls.controls}>
          {/* <div className={cls.icon}>
            <img src={mail} alt={'mail'} />
          </div> */}

          <BanButton isBanned={!user.active_status} onBan={onBan} onUnban={onUnban} />

          <Link to={`/profile/${user.pk}`}>
            <Button className={cls.btnWhite} size={ButtonSizes.small}>
              Смотреть
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};
