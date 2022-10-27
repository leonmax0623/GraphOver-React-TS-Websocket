import React from 'react';

import cls from './sub.module.scss';

import { Caption, Title3, Title2, Title4, Title5 } from 'shared/ui/typography';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { ProfileState } from 'widgets/profile-state';

export const SubManagerment = () => {
  const percentage = 64;

  return (
    <div className={cls.container}>
      <div className={cls.top}>
        <Title3 className={cls.title}>Тарифные планы</Title3>
        <Caption className={cls.caption}>Текст о тарифах заглушка</Caption>
      </div>
      <div className={cls.state}>
        <ProfileState />
      </div>
      <div className={cls.tarifs}>
        <div className={cls.head}>
          <Title3 className={cls.title}>Тарифы</Title3>
          <div className={cls.right}>
            <Button
              size={ButtonSizes.small}
              type={ButtonTypes.secondary}
              className={[cls.right, cls.plotPropose].join(' ')}
            >
              Отмена
            </Button>
            <Button
              size={ButtonSizes.small}
              type={ButtonTypes.primary}
              className={[cls.right, cls.plotPropose].join(' ')}
            >
              Сохранить
            </Button>
          </div>
        </div>
        <div className={cls.packages}>
          <div className={cls.pack}>
            <div className={cls.packTop}>
              <span className={cls.name}>Пакет BASIC</span>
              <ul className={cls.packTopInfo}>
                <li>
                  <span className={cls.val}>450 Р/</span>
                  <span className={cls.date}>день</span>
                </li>
                <li>
                  <span className={cls.val}>3550 Р/</span>
                  <span className={cls.date}>месяц</span>
                </li>
                <li>
                  <span className={cls.val}>12 050 Р/</span>
                  <span className={cls.date}>год</span>
                </li>
              </ul>
            </div>
            <ul className={cls.packInfo}>
              <li>
                <span className={cls.desc}>Описание</span>
                <span className={cls.data}>Количество авторов</span>
              </li>
              <li>
                <span className={cls.desc}>Описание</span>
                <span className={cls.data}>Количество написаний в год</span>
              </li>
              <li>
                <span className={cls.desc}>Описание</span>
                <span className={cls.data}>Описание</span>
              </li>
              <li>
                <span className={cls.desc}>Описание</span>
                <span className={cls.data}>Описание</span>
              </li>
            </ul>
          </div>
          <div className={cls.pack}>
            <div className={cls.packTop}>
              <span className={cls.name}>Пакет BASIC</span>
              <ul className={cls.packTopInfo}>
                <li>
                  <span className={cls.val}>450 Р/</span>
                  <span className={cls.date}>день</span>
                </li>
                <li>
                  <span className={cls.val}>3550 Р/</span>
                  <span className={cls.date}>месяц</span>
                </li>
                <li>
                  <span className={cls.val}>12 050 Р/</span>
                  <span className={cls.date}>год</span>
                </li>
              </ul>
            </div>
            <ul className={cls.packInfo}>
              <li>
                <span className={cls.desc}>Описание</span>
                <span className={cls.data}>Количество авторов</span>
              </li>
              <li>
                <span className={cls.desc}>Описание</span>
                <span className={cls.data}>Количество написаний в год</span>
              </li>
              <li>
                <span className={cls.desc}>Описание</span>
                <span className={cls.data}>Описание</span>
              </li>
              <li>
                <span className={cls.desc}>Описание</span>
                <span className={cls.data}>Описание</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
