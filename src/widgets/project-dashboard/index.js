import React from 'react';

import cls from './dashboard.module.scss';

import { Caption, Title2, Title3, Title4 } from 'shared/ui/typography';

import avatar from 'shared/assets/test-content/foto.png';

import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { Tabs } from 'shared/ui/tabs';

export const ProjectDashBoard = () => {
  return (
    <div className={cls.container}>
      <div className={cls.top}>
        <Title2 className={cls.title}>Панель управления проектом</Title2>
        <div className={cls.filters}>
          <Tabs
            name={'plot-by-activity'}
            active={1}
            items={[
              {
                label: 'Спорные ситуации (9)',
                value: 'E',
                id: 1,
              },
              {
                label: 'Медиатека (0)',
                value: 'D',
                id: 2,
              },
              {
                label: 'Жалобы (1)',
                value: 'C',
                id: 3,
              },
            ]}
          />
        </div>
        <div className={cls.list}>
          <div className={cls.item}>
            <div className={cls.head}>
              <span className={cls.caterogry}>Жалоба</span>
              <span className={cls.date}>07.07.2022 12:30</span>
              <Title3 className={cls.title}>Название сюжета длин ...</Title3>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam aliquet interdum felis fermentum tempor
              placerat vulputate bibendum. Orci neque quis urna quam viverra nulla. Mauris et eu massa ipsum velit
              parturient sed mattis. Quis sagittis ipsum. ...
            </p>
            <div className={cls.info}>
              <div className={cls.authors}>
                <span className={cls.tit}>Владелец:</span>
                <span className={cls.num}>Александр П.</span>
                <div className={cls.peoples}>
                  <div className={cls.circle}>
                    <img src={avatar} alt={'ava'} />
                  </div>
                </div>
              </div>
              <div className={cls.authors}>
                <span className={cls.tit}>Авторы сюжета:</span>
                <span className={cls.num}>2 человека</span>
                <div className={cls.peoples}>
                  <div className={cls.circle}>
                    <img src={avatar} alt={'ava'} />
                  </div>
                  <div className={[cls.circle, cls.last].join(' ')}>
                    <img src={avatar} alt={'ava'} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cls.item}>
            <div className={cls.head}>
              <span className={cls.caterogry}>Жалоба</span>
              <span className={cls.date}>07.07.2022 12:30</span>
              <Title3 className={cls.title}>Название сюжета длин ...</Title3>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam aliquet interdum felis fermentum tempor
              placerat vulputate bibendum. Orci neque quis urna quam viverra nulla. Mauris et eu massa ipsum velit
              parturient sed mattis. Quis sagittis ipsum. ...
            </p>
            <div className={cls.info}>
              <div className={cls.authors}>
                <span className={cls.tit}>Владелец:</span>
                <span className={cls.num}>Александр П.</span>
                <div className={cls.peoples}>
                  <div className={cls.circle}>
                    <img src={avatar} alt={'ava'} />
                  </div>
                </div>
              </div>
              <div className={cls.authors}>
                <span className={cls.tit}>Авторы сюжета:</span>
                <span className={cls.num}>2 человека</span>
                <div className={cls.peoples}>
                  <div className={cls.circle}>
                    <img src={avatar} alt={'ava'} />
                  </div>
                  <div className={[cls.circle, cls.last].join(' ')}>
                    <img src={avatar} alt={'ava'} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cls.item}>
            <div className={cls.head}>
              <span className={cls.caterogry}>Жалоба</span>
              <span className={cls.date}>07.07.2022 12:30</span>
              <Title3 className={cls.title}>Название сюжета длин ...</Title3>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam aliquet interdum felis fermentum tempor
              placerat vulputate bibendum. Orci neque quis urna quam viverra nulla. Mauris et eu massa ipsum velit
              parturient sed mattis. Quis sagittis ipsum. ...
            </p>
            <div className={cls.info}>
              <div className={cls.authors}>
                <span className={cls.tit}>Владелец:</span>
                <span className={cls.num}>Александр П.</span>
                <div className={cls.peoples}>
                  <div className={cls.circle}>
                    <img src={avatar} alt={'ava'} />
                  </div>
                </div>
              </div>
              <div className={cls.authors}>
                <span className={cls.tit}>Авторы сюжета:</span>
                <span className={cls.num}>2 человека</span>
                <div className={cls.peoples}>
                  <div className={cls.circle}>
                    <img src={avatar} alt={'ava'} />
                  </div>
                  <div className={[cls.circle, cls.last].join(' ')}>
                    <img src={avatar} alt={'ava'} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cls.item}>
            <div className={cls.head}>
              <span className={cls.caterogry}>Жалоба</span>
              <span className={cls.date}>07.07.2022 12:30</span>
              <Title3 className={cls.title}>Название сюжета длин ...</Title3>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam aliquet interdum felis fermentum tempor
              placerat vulputate bibendum. Orci neque quis urna quam viverra nulla. Mauris et eu massa ipsum velit
              parturient sed mattis. Quis sagittis ipsum. ...
            </p>
            <div className={cls.info}>
              <div className={cls.authors}>
                <span className={cls.tit}>Владелец:</span>
                <span className={cls.num}>Александр П.</span>
                <div className={cls.peoples}>
                  <div className={cls.circle}>
                    <img src={avatar} alt={'ava'} />
                  </div>
                </div>
              </div>
              <div className={cls.authors}>
                <span className={cls.tit}>Авторы сюжета:</span>
                <span className={cls.num}>2 человека</span>
                <div className={cls.peoples}>
                  <div className={cls.circle}>
                    <img src={avatar} alt={'ava'} />
                  </div>
                  <div className={[cls.circle, cls.last].join(' ')}>
                    <img src={avatar} alt={'ava'} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
