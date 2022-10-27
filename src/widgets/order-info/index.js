import React, { useEffect, useState } from 'react';

import cls from './order-info.module.scss';

import { ReactComponent as Check } from 'shared/assets/test-content/circle-check.svg';
import foto from 'shared/assets/test-content/foto.png';
import { Title3 } from 'shared/ui/typography';
import { convertDate, convertDateMn } from 'shared/utils';
import classNames from 'classnames';
import { useNavigate } from 'react-router';

export const OrderInfo = props => {
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();
  return (
    <div className={cls.container}>
      <div className={cls.user}>
        <img className={cls.pic} src={'https://graphover.ru' + props?.customer?.avatar} alt={'foto'} />
        <span className={cls.nikname}>{props?.customer?.username}</span>
        {/* <span
          className={classNames(cls.status, {
            [cls.verified]: props?.customer?.verified,
            // [cls.noverified]: !props?.customer?.verified,
          })}
        >
          <img src={check} alt={'status'} /> Подтвержден
        </span> */}
        {props?.customer?.verified && (
          <span className={classNames(cls.status, cls.verified)}>
            {/* <img src={check} alt={'status'} /> */}
            <Check /> <span>Подтвержден</span>
          </span>
        )}

        {!props?.customer?.verified && (
          <span className={classNames(cls.status, cls.noverified)}>
            {/* <img src={check} alt={'status'} /> */}
            <Check /> <span>Не подтвержден</span>
          </span>
        )}

        <Title3 className={cls.name}>{props?.customer?.fio}</Title3>
      </div>

      <div className={cls.text}>
        <Title3 className={cls.name}>{props?.title}</Title3>
        <p>
          {showMore ? props?.description : props?.description?.substring(0, 250)}
          {props?.description?.length > 250 && <span onClick={() => setShowMore(!showMore)}>читать полностью</span>}
        </p>
      </div>
      <div className={cls.infoLot}>
        <Title3 className={cls.name}>Информация по заказу</Title3>
        {/* <span className={[cls.statusInfo, cls.wait].join(' ')}>Ждет корректировки</span> */}
        {/* <span className={[cls.statusInfo, cls.await].join(' ')}>Ожидает приемки</span>
                <span className={[cls.statusInfo, cls.work].join(' ')}>В работе</span> */}
        <ul>
          <li>
            <span className={cls.title}>Статус :</span>
            <span className={cls.data}>
              {props?.status === 'published' ? 'Опубликован' : props?.status === 'in work' ? 'В работе' : 'Завершен'}
            </span>
          </li>
          <li>
            <span className={cls.title}>Стоимость:</span>
            <span className={cls.data}>{props?.price} БиТ</span>
          </li>
          <li>
            <span className={cls.title}>Срок выполнения:</span>
            <span className={cls.data}>{convertDate(props?.max_writing_time)}</span>
          </li>
          <li>
            <span className={cls.title}>Дата:</span>
            <span className={cls.data}>{convertDate(props?.created_at)}</span>
          </li>
          <li>
            <span className={cls.title}>Исполнитель:</span>
            {props?.executor ? (
              <div className={cls.executorBlock} onClick={() => navigate(`/profile/${props?.executor?.id}`)}>
                <span className={cls.data}>{props?.executor?.username}</span>
                <img className={cls.avatar} src={'https://graphover.ru' + props?.customer?.avatar} alt={'foto'} />
              </div>
            ) : (
              <div className={cls.executorBlock} onClick={() => navigate(`/profile/${props?.executor?.id}`)}>
                <span className={cls.data}>Не назначен</span>
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};
