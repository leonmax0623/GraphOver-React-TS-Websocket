import React, { useEffect, useState } from 'react';

import cls from './view.module.scss';

import { Caption, Title3, Title2, Title4, Title5 } from 'shared/ui/typography';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { TextInput } from 'shared/ui/text-input';

// import iconAdd from '../../shared/assets/test-content/add.svg';
// import iconEdit from '../../shared/assets/test-content/icedit.svg';
// import wallet from '../../shared/assets/test-content/wallet.svg';
// import mastercart from '../../shared/assets/test-content/mastercart.png';
// import visa from '../../shared/assets/test-content/visa.png';
// import iconCalendar from '../../shared/assets/test-content/calendar.svg';
import iconUp from 'shared/assets/test-content/icup.svg';
import iconDown from 'shared/assets/test-content/icdown.svg';
import classNames from 'classnames';
import { InView, useInView } from 'react-intersection-observer';
import { useCurrencyHistory } from './model';

import { convertDate } from 'shared/utils';
import { SelectInput } from 'shared/ui/select-input';

const HistoryItem = ({ transaction_amount, action_type, created_at, flow = '' }) => (
  <div className={classNames(cls.itemHistory, { [cls.up]: flow === 'up', [cls.down]: flow === 'down' })}>
    <img className={cls.pic} src={flow === 'up' ? iconUp : iconDown} alt="iconDown" />
    <Title5 className={cls.title}>
      {filters.filter(f => f.value === action_type)[0].label}
      {/* {action_type === 'reserve money'
        ? 'Резерв денег со счета пользователя'
        : action_type === 'buy subscription'
        ? 'Покупка подписки'
        : ''} */}
    </Title5>
    <Caption className={cls.caption}>{convertDate(created_at)}</Caption>
    <span className={cls.price}>
      {flow === 'down' ? '-' : ''}
      {transaction_amount}₽
    </span>
  </div>
);

export const HistoryCurrency = props => {
  const [activeFilter, setActiveFilter] = useState('');
  const { items, getHistory, appendHistory } = useCurrencyHistory(activeFilter);

  useEffect(() => {
    getHistory();
  }, [activeFilter]);

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });
  return (
    <div className={cls.checkHistory}>
      <div className={cls.top}>
        <Title3 className={cls.title}>История счета</Title3>
        {/* <div className={cls.date}> */}
        {/* <img src={iconCalendar} alt="iconCalendar" /> */}
        {/* <Caption className={cls.caption}>01 -10 июля 2022</Caption> */}
        {/* </div> */}
        <SelectInput
          value={activeFilter}
          changeHandler={val => setActiveFilter(val)}
          className={cls.select}
          placeholder={'Все операции'}
          options={filters}
        />
      </div>
      <div ref={ref} className={cls.listHistory}>
        {items.length > 0 ? (
          items.map((i, ind) => <HistoryItem key={ind} flow={upTypes.includes(i.action_type) ? 'up' : 'down'} {...i} />)
        ) : (
          <>Нет записей</>
        )}
        {/* <HistoryItem flow={'down'} />
        <HistoryItem flow={'up'} /> */}

        {/* <Caption className={cls.caption}>Сегодня</Caption> */}
      </div>
    </div>
  );
};
// buying, accrual, payment response, redemptio

const filters = [
  { value: 'buying', label: 'Покупка валюты' },
  { value: 'accrual', label: 'Начисление валюты' },
  { value: 'payment response', label: 'Оплата отклика на заказ' },
  { value: 'redemption', label: 'Выкуп прав на аукционе' },
  { value: 'buy subscription', label: 'Покупка подписки' },
  { value: 'order payment', label: 'Оплата выполненного заказа' },
  { value: 'reserve money', label: 'Резерв денег со счета пользователя' },
  { value: 'payout', label: 'Выплата на карту' },
];

const upTypes = ['buying', 'buy subscription', 'reserve money', '', ''];
