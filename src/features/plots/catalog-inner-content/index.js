import React, { useState } from 'react';
import cls from './content.module.scss';

import avatar from 'shared/assets/test-content/foto.png';
import iconAdd from 'shared/assets/test-content/add.svg';
import { Title3, Title4 } from 'shared/ui/typography';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { Tabs } from 'shared/ui/tabs';
import { ChapterSidebar } from './chapter-sidebar';
import { ChapterBody, ChapterContainer } from './chapter-body';
import { useNavigate } from 'react-router';

export const InnerCatalogContent = props => {
  const multipleBranch = !!props.structure.filter(i => i.branch !== 1).length;
  return (
    <div className={cls.content}>
      <div className={cls.left}>
        <Title3 className={cls.title}>Структура сюжета</Title3>
        <div className={cls.filters}>
          {multipleBranch && (
            <Tabs
              name={'plot-by-activity'}
              active={props?.branch}
              onChange={e => {
                props.setBranch(Number(e.target.value));
              }}
              items={[
                {
                  label: '1 ветвь',
                  value: 1,
                  id: 1,
                },
                {
                  label: '2 ветвь',
                  value: 2,
                  id: 2,
                },
              ]}
            />
          )}
        </div>
        <ChapterSidebar {...props} />
      </div>
      <ChapterContainer {...props} />
    </div>
  );
};
