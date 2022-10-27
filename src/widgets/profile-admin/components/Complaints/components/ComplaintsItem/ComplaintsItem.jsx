import React from 'react';
import cls from '../../../../profileadmin.module.scss';

import { Title5 } from 'shared/ui/typography';
import {
  Button,
  ButtonSizes
} from 'shared/ui/button';

export const ComplaintsItem = (
  {
    type,
    authorStatus,
    authorName,
    authorAvatarUrl = 'https://placehold.jp/150x150.png',
    date,
    title,
    text,
    onButtonClick
  }
) => {
  return (
    <>
      <div className={cls.targetCol}>
        <div className={cls.user}>
          <div className={[cls.picture, cls.verified].join(' ')}>
            <img src={authorAvatarUrl} />
          </div>
          <span className={cls.desc}>
            { authorStatus }
          </span>
          <span className={cls.name}>
            { authorName }
          </span>
        </div>
      </div>
      <div className={cls.targetCol}>
        <div className={cls.captions}>
          <span className={cls.complaintsDate}>
            {type} - { date }
          </span>
          <Title5 className={cls.title}>
            { title }
          </Title5>
        </div>
      </div>
      <div className={cls.targetCol}>
        <div className={cls.targetColText}>
          <p>
            { text }
          </p>
        </div>

      </div>

      <div className={[cls.targetCol, cls.alignToEnd].join(' ')}>
        <Button
          onClick={ onButtonClick }
          className={cls.btnWhite}
          size={ButtonSizes.small}
        >
          Смотреть
        </Button>
      </div>
    </>
  );
};

