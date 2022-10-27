import React, { useEffect, useState } from 'react';
import cls from './plots-history.module.scss';
import PlotCard from 'entities/plots/catalog-card';
import { Card, ShadowSizes } from 'shared/ui/card';
import { Title2, Title4 } from 'shared/ui/typography';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { Tabs } from 'shared/ui/tabs';
import { AvatarList } from 'shared/ui/avatar-list';
import { AvatarRound } from 'shared/ui/avatar-round';
import { StatusGlobal } from 'shared/ui/statusglobal';

import avatar from 'shared/assets/test-content/foto.png'

export const PlotsCatalogHistory = ({
}) => {

  return (
    <Card className={cls.card} shadowSize={ShadowSizes.big}>
      <div className={cls.top}>
        <Title2 className={cls.title}>История предложений</Title2>
      </div>
      <div className={cls.filters}>
        <Tabs
          name={'plot-by-activity'}
          items={[
            {
              label: 'Сюжеты',
              value: 'E',
              id: 1,
            },
            {
              label: 'Файлы',
              value: 'D',
              id: 2,
            },

          ]}
        />
      </div>
      <div className={cls.listHistory}>
        <div className={cls.historyItem}>
          <div className={cls.head}>
            <div className={cls.left}>
              <span className={cls.date}>07.07.2022 12:30</span>
              <Title4 className={cls.title}>Название сюжета длин ...</Title4>
            </div>

            <div className={cls.right}>
              <StatusGlobal />
            </div>
          </div>
          <div className={cls.body}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam aliquet interdum felis fermentum tempor placerat vulputate bibendum. Orci neque quis urna quam viverra nulla. Mauris et eu massa ipsum velit parturient sed mattis. Quis sagittis ipsum. ...</p>
          </div>
          <div className={cls.bottom}>
            <div className={cls.authors}>
              <span className={cls.tit}>Владелец:</span>
              <span className={cls.num}>Александр П.</span>
              <div className={cls.peoples}>
                <div className={cls.circle}><img src={avatar} alt={'ava'} /></div>
              </div>
            </div>
            <div className={cls.authors}>
              <span className={cls.tit}>Авторы сюжета:</span>
              <span className={cls.num}>2 человека</span>
              <div className={cls.peoples}>
                <div className={cls.circle}><img src={avatar} alt={'ava'} /></div>
                <div className={[cls.circle, cls.last].join(' ')}><img src={avatar} alt={'ava'} /></div>
              </div>
            </div>
          </div>
        </div>
        <div className={cls.historyItem}>
          <div className={cls.head}>
            <div className={cls.left}>
              <span className={cls.date}>07.07.2022 12:30</span>
              <Title4 className={cls.title}>Название сюжета длин ...</Title4>
            </div>

            <div className={cls.right}>
              <StatusGlobal />
            </div>
          </div>
          <div className={cls.body}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam aliquet interdum felis fermentum tempor placerat vulputate bibendum. Orci neque quis urna quam viverra nulla. Mauris et eu massa ipsum velit parturient sed mattis. Quis sagittis ipsum. ...</p>
          </div>
          <div className={cls.bottom}>
            <div className={cls.authors}>
              <span className={cls.tit}>Владелец:</span>
              <span className={cls.num}>Александр П.</span>
              <div className={cls.peoples}>
                <div className={cls.circle}><img src={avatar} alt={'ava'} /></div>
              </div>
            </div>
            <div className={cls.authors}>
              <span className={cls.tit}>Авторы сюжета:</span>
              <span className={cls.num}>2 человека</span>
              <div className={cls.peoples}>
                <div className={cls.circle}><img src={avatar} alt={'ava'} /></div>
                <div className={[cls.circle, cls.last].join(' ')}><img src={avatar} alt={'ava'} /></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Card>
  );
};
