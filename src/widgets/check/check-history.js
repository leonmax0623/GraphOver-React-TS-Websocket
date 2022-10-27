import React, { useEffect } from 'react';

import cls from './check.module.scss';

import { Caption, Title3, Title2, Title4, Title5 } from 'shared/ui/typography';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { TextInput } from 'shared/ui/text-input';

import iconAdd from '../../shared/assets/test-content/add.svg';
import iconEdit from '../../shared/assets/test-content/icedit.svg';
import wallet from '../../shared/assets/test-content/wallet.svg';
import mastercart from '../../shared/assets/test-content/mastercart.png';
import visa from '../../shared/assets/test-content/visa.png';
import iconCalendar from '../../shared/assets/test-content/calendar.svg';
import iconUp from '../../shared/assets/test-content/icup.svg';
import iconDown from '../../shared/assets/test-content/icdown.svg';
import classNames from 'classnames';
import { InView, useInView } from 'react-intersection-observer';
import { usePaymentHistory } from './model';
import { convertDate } from 'shared/utils';

const HistoryItem = ({ transaction_amount, action_type, created_at, flow = '' }) => (
  <div className={classNames(cls.itemHistory, { [cls.up]: flow === 'up', [cls.down]: flow === 'down' })}>
    <img className={cls.pic} src={flow === 'up' ? iconUp : iconDown} alt="iconDown" />
    <Title5 className={cls.title}>
      {action_type === 'reserve money'
        ? 'Резерв денег со счета пользователя'
        : action_type === 'buy subscription'
        ? 'Покупка подписки'
        : ''}
    </Title5>
    <Caption className={cls.caption}>{convertDate(created_at)}</Caption>
    <span className={cls.price}>
      {flow === 'down' ? '-' : ''}
      {transaction_amount}₽
    </span>
  </div>
);

export const CheckHistory = props => {
  const { items, getHistory, appendHistory } = usePaymentHistory();

  useEffect(() => {
    getHistory();
  }, []);

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });
  return (
    <div className={cls.checkHistory}>
      <div className={cls.top}>
        <Title3 className={cls.title}>История счета</Title3>
        <div className={cls.date}>
          {/* <img src={iconCalendar} alt="iconCalendar" /> */}
          {/* <Caption className={cls.caption}>01 -10 июля 2022</Caption> */}
        </div>
      </div>
      <div ref={ref} className={cls.listHistory}>
        {items.map((i, ind) => (
          <HistoryItem
            key={ind}
            flow={i.action_type === 'buying' || i.action_type === 'redemption' ? 'up' : 'down'}
            {...i}
          />
        ))}
        {/* <HistoryItem flow={'down'} />
        <HistoryItem flow={'up'} /> */}

        {/* <Caption className={cls.caption}>Сегодня</Caption> */}
      </div>
    </div>
  );
};
