import React, { useEffect, useState } from 'react';

import cls from './author.module.scss';

export const ProfileOtherHead = ({ userState }) => {
  return (
    <div className={cls.userProfile}>
      <div className={cls.picture}>
        <img src={userState?.avatar} alt={'foto'} />
      </div>
      <div className={cls.info}>
        <div className={cls.line}>
          <span className={cls.nikname}>{userState?.username}</span>

          {/* <span className={[cls.status, cls.ok].join(' ')}>Подтвержден</span> */}
        </div>
        <div className={cls.line}>
          <span className={cls.name}>{userState?.fio}</span>
        </div>
      </div>
      <div className={cls.btns}>
        {/* <span className={cls.icon}>
          <img src={chat} />
        </span> */}
        {/* <Button className={cls.btn} type={ButtonTypes.primary} size={ButtonSizes.small}>
          Техническая поддержка
        </Button> */}
      </div>
    </div>
  );
};
