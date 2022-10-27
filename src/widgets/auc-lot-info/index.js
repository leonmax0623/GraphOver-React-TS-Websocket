import React, { useEffect, useState } from 'react';

import cls from './order-info.module.scss';

import check from 'shared/assets/test-content/circle-check.svg';
import foto from 'shared/assets/test-content/foto.png';
import { Title3 } from 'shared/ui/typography';
import { convertDate, convertDateMn } from 'shared/utils';

export const AucLotInfo = props => {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className={cls.container}>
      <div className={cls.user}>
        <img className={cls.pic} src={props?.main_author?.avatar} alt={'foto'} />
        <span className={cls.nikname}>{props?.main_author?.username}</span>
        {/* <span className={[cls.status, cls.verified].join(' ')}>
          {' '}
          <img src={check} alt={'status'} /> Подтвержден
        </span> */}
        <Title3 className={cls.name}>{props?.main_author?.fio}</Title3>
      </div>

      <div className={cls.text}>
        <Title3 className={cls.name}>{props?.lot_name}</Title3>
        <p>
          {showMore ? props?.description : props?.description?.substring(0, 250)}
          {!props?.description && 'Описание отсутствует'}
          {props?.description?.length > 250 && <span onClick={() => setShowMore(!showMore)}>читать полностью</span>}
        </p>
      </div>
      <div className={cls.infoLot}>
        <Title3 className={cls.name}>Информация по лоту</Title3>
        {/* <span className={[cls.statusInfo, cls.wait].join(' ')}>Ждет корректировки</span> */}
        {/* <span className={[cls.statusInfo, cls.await].join(' ')}>Ожидает приемки</span>
                <span className={[cls.statusInfo, cls.work].join(' ')}>В работе</span> */}
        <ul>
          <li>
            <span className={cls.title}>Статус аукциона:</span>
            <span className={cls.data}>{props?.is_active ? 'Активный' : 'Неактивный'}</span>
          </li>
          <li>
            <span className={cls.title}>Стоимость начальная:</span>
            <span className={cls.data}>{props?.start_price} БиТ</span>
          </li>
          <li>
            <span className={cls.title}>Стоимость выкупа:</span>
            <span className={cls.data}>{props?.redemption_price} БиТ</span>
          </li>
          <li>
            <span className={cls.title}>Дата:</span>
            <span className={cls.data}>{convertDate(props?.created_at)}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
