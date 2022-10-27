import React from 'react';
import cls from '../../../../profileadmin.module.scss';

import {
  Title3,
  Title5
} from 'shared/ui/typography';
import { SelectInput } from 'shared/ui/select-input';
import { Caption } from 'shared/ui/typography';

import iconUp from 'shared/assets/test-content/icup.svg';
import iconDown from 'shared/assets/test-content/icdown.svg';

export const Turnover = ({ accrued, withdrawned }) => {
  return (
    <div className={cls.state}>
      <div className={cls.topTitle}>
        <Title3 className={cls.title}>Оборот пользователей</Title3>
        {/*<SelectInput*/}
        {/*  className={cls.select}*/}
        {/*  placeholder={'30 дней'}*/}
        {/*  options={[*/}
        {/*    { label: '30 дней', value: 'fame', id: 1 },*/}
        {/*    { label: '30 дней', value: 'last-change', id: 2 },*/}
        {/*  ]}*/}
        {/*/>*/}
      </div>
      <ul>
        <li>
          <div className={cls.text}>
            <img className={cls.pic} src={iconUp} alt="iconUp" />
            <Title5 className={cls.title}>Начислено</Title5>
            <Caption className={cls.day}>{ accrued } БиТ</Caption>
          </div>
        </li>
        <li>
          <div className={cls.text}>
            <img className={cls.pic} src={iconDown} alt="iconDown" />
            <Title5 className={cls.title}>Списано</Title5>
            <Caption className={cls.day}>{ withdrawned } БиТ</Caption>
          </div>
        </li>
      </ul>
    </div>
  );
};

