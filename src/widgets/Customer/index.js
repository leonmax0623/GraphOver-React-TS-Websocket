import React, { useEffect, useState } from 'react';

import cls from './customer.module.scss';

import { Caption, Title3, Title2, Title4, Title5 } from 'shared/ui/typography';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { TextInput } from 'shared/ui/text-input';

import chat from 'shared/assets/test-content/ico2-blue.svg';
import wallet from '../../shared/assets/test-content/wallet.svg';
import iconCalendar from '../../shared/assets/test-content/calendar.svg';
import iconUp from '../../shared/assets/test-content/icup.svg';
import iconDown from '../../shared/assets/test-content/icdown.svg';
import { FilterToggle } from 'entities/filter-toggle';
import { SelectInput } from 'shared/ui/select-input';
import { Tabs } from 'shared/ui/tabs';
import { SortingSelect } from 'shared/ui/sorting-select';
import { CheckCustomerItem } from 'widgets/Customer-item';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAccount } from 'entities/user/model';
import { useUserOrders } from './model';

export const CheckCustomer = () => {
  const userState = useSelector(state => state.userReducer.user);
  const { changeUserState, changeState } = useAccount();
  const { getUserOrders, orders, appendOrders, ref, inView } = useUserOrders();
  const [iseditabout, setiseditabout] = useState(false);

  useEffect(() => {
    getUserOrders();
  }, [userState?.pk]);

  useEffect(() => {
    if (inView.toString()) appendOrders();
  }, [inView]);

  return (
    <div className={cls.container}>
      <div className={cls.checkInfo}>
        <div className={cls.info}>
          <div className={cls.icon}>
            <img src={wallet} alt="wallet" />
          </div>
          <Title3 className={cls.title}>Мой счет БиТ</Title3>
        </div>
        <div className={cls.value}>
          <div className={cls.text}>
            <Title2 className={cls.title}>{userState?.balance} БиТ</Title2>
            <Caption className={cls.caption}>1Бит = 1 руб</Caption>
          </div>
          <div className={cls.icons}>
            <Link to="/check" className={cls.btn}>
              пополнить
            </Link>
          </div>
        </div>
      </div>
      <div className={cls.about}>
        <div className={cls.topTitle}>
          <Title3 className={cls.title}>Обо мне</Title3>
          <span
            className={cls.edit}
            onClick={() => {
              if (iseditabout) {
                changeUserState('info');
                setiseditabout(false);
              } else {
                setiseditabout(true);
              }
            }}
          ></span>
        </div>

        <div className={cls.text}>
          {iseditabout ? (
            <textarea
              placeholder="Введите информацию о себе"
              value={userState?.info}
              onChange={e => changeState('info', e.target.value)}
            />
          ) : (
            <p>{userState?.info}</p>
          )}
        </div>
      </div>
      <div className={cls.orders}>
        <div className={cls.top}>
          <Title2 className={cls.title}>Ваши заказы</Title2>
          {/* <a className={cls.link}>смотреть все</a> */}
        </div>
        <div className={cls.filters}>
          <Tabs
            name={'plot-by-activity'}
            items={[
              {
                label: 'Опубликован',
                value: 'E',
                id: 1,
              },
              {
                label: 'В работе',
                value: 'D',
                id: 2,
              },
              {
                label: 'Завершены',
                value: 'C',
                id: 3,
              },
            ]}
          />
        </div>
        <div className={cls.listOrder}>
          {orders?.length > 0 ? orders.map(i => <CheckCustomerItem {...i} />) : <>У вас нет заказов</>}

          {/* <CheckCustomerItem />
          <CheckCustomerItem />
          <CheckCustomerItem />
          <CheckCustomerItem />
          <CheckCustomerItem />
          <CheckCustomerItem /> */}
          <div ref={ref}></div>
        </div>
      </div>
    </div>
  );
};
