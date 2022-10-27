import React from 'react';

import cls from './customer.module.scss';

import { Caption, Title3, Title2, Title4, Title5 } from 'shared/ui/typography';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';

import foto from '../../shared/assets/test-content/foto.png';
import chat from 'shared/assets/test-content/ico2.svg';
import { convertDateMn } from 'shared/utils';
import { useNavigate } from 'react-router';

export const CheckCustomerItem = props => {
  const navigate = useNavigate();

  return (
    <div
      className={cls.container}
      onClick={e => {
        e.preventDefault();
        navigate(`/orders/${props?.id}`);
      }}
    >
      <div className={cls.head}>
        <ul>
          <li>
            Начало:<span className={cls.data}>{convertDateMn(props?.created_at)}</span>
          </li>
          <li>
            Завершение:<span className={cls.data}>{convertDateMn(props?.max_writing_time)}</span>
          </li>
        </ul>
        <Title3 className={cls.title}>{props?.title}</Title3>
      </div>
      <p>{props?.description} </p>
      <div className={cls.controls}>
        <div className={cls.left}>
          {props?.executor && (
            <div className={cls.appUser}>
              <span className={cls.txt}>Назначен исполнитель</span>
              <img className={cls.picture} src={props?.executor?.avatar} alt={'foto'} />
            </div>
          )}
          {/* <span className={cls.statusGood}>успешно выполнен</span> */}
          {/* <Button className={[cls.btn].join(' ')} size={ButtonSizes.small} type={ButtonTypes.primary}>Выбрать исполнителя</Button> */}
        </div>
        <div className={cls.right}>
          <ul>
            {/* <li>
              <img className={cls.icon} src={chat} alt={'chat'} />
              <span className={cls.data}>{}</span>
            </li> */}
            <li>
              Стоимость:<span className={cls.data}>{props?.price} БиТ</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
