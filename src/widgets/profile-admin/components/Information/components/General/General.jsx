import React from 'react';
import cls from '../../../../profileadmin.module.scss';

import { Title2 } from 'shared/ui/typography';
import wallet from 'shared/assets/test-content/wallet.svg';

export const General = ({ bits }) => {
  return (
    <>
      <div className={cls.info}>
        <div className={cls.icon}><img src={wallet} alt="wallet" /></div>
      </div>
      <div className={cls.value}>
        <div className={cls.text}>
          <Title2 className={cls.title}>{ bits } БиТ</Title2>
          <span className={cls.desc}>{ bits } БиТ на счетах пользователей сервиса</span>
        </div>
      </div>
    </>
  );
};

