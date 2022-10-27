import React from 'react';

import cls from './check.module.scss';

import { Caption, Title3, Title5 } from 'shared/ui/typography';

import wallet from '../../shared/assets/test-content/bag.svg';

import iconUp from '../../shared/assets/test-content/icup.svg';
import iconDown from '../../shared/assets/test-content/icdown.svg';
import { CheckHistory } from './check-history';
import { useAccount } from 'entities/user/model';
import { convertDate } from 'shared/utils';

import { PaymentPanel } from './payment-panel';
import { CardPanel } from './card-panel';

export const Checkwork = () => {
  const { userState } = useAccount();
  const today = new Date();

  return (
    <div className={cls.check}>
      <div className={cls.checkInfo}>
        <div className={cls.info}>
          <div className={cls.icon}>
            <img src={wallet} alt="wallet" />
          </div>
          <Title3 className={cls.title}>Мой счет БиТ</Title3>
          <Caption className={cls.caption}>на {convertDate(today)}</Caption>
        </div>
        <PaymentPanel balance={userState?.balance} />
        <div className={cls.state}>
          <ul>
            <li>
              <Title5 className={cls.caption}>Начисленно</Title5>
              <div className={cls.text}>
                <img className={cls.pic} src={iconUp} alt="iconUp" />
                <Title5 className={cls.title}>+{userState?.accrued_money}₽</Title5>
                {/* <Caption className={cls.day}>за 30 дней</Caption> */}
              </div>
            </li>
            <li>
              <Title5 className={cls.caption}>Списано</Title5>
              <div className={cls.text}>
                <img className={cls.pic} src={iconDown} alt="iconDown" />
                <Title5 className={cls.title}>-{userState?.debited_money}₽</Title5>
                {/* <Caption className={cls.day}>за 30 дней</Caption> */}
              </div>
            </li>
          </ul>
        </div>
      </div>
      {/* <CardPanel /> */}
      <CheckHistory />
    </div>
  );
};
