import React, { useEffect } from 'react';

import cls from './task.module.scss';

import { Caption, Title2, Title3, Title4 } from 'shared/ui/typography';

import foto from '../../shared/assets/test-content/foto.png';
import check from '../../shared/assets/test-content/check_green.svg';
import close from '../../shared/assets/test-content/canced.svg';
import { ReactComponent as Heart } from '../../shared/assets/test-content/heart-gray.svg';
// import {heart} from 'shared/assets/test-content/heart-gray.svg';
import chat from '../../shared/assets/test-content/chat.svg';

import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { useLikeAnswer, useTasks, useVoteAnswer } from './model';
import { useParams } from 'react-router';
import { convertDate } from 'shared/utils';
import classNames from 'classnames';

export const AnswerItem = props => {
  const { id } = useParams();
  const { toggleFavorites } = useLikeAnswer(id, props?.answ?.task, props?.getData);
  const { handleVote } = useVoteAnswer(id, props?.answ?.task, props?.getData);

  return (
    <div className={cls.taskitem}>
      <div className={cls.head}>
        <img className={cls.picture} src={props?.answ?.avatar} alt={'foto'} />
        {/* <Title4 className={cls.title}>{props?.answ?.answer}</Title4> */}
        <span className={cls.date}>{convertDate(props?.answ?.created_at)}</span>
      </div>
      <p>{props?.answ?.answer} </p>
      {props?.status === 'V' && !props?.answ?.voted && (
        <div className={cls.icons}>
          <button className={[cls.icon, cls.check].join(' ')} onClick={() => handleVote('L')}>
            <img src={check} alt={'check'} />
          </button>
          <button className={[cls.icon, cls.canced].join(' ')} onClick={() => handleVote('D')}>
            <img src={close} alt={'close'} />
          </button>
        </div>
      )}
      {props?.isTaskOwner && (
        <span
          className={classNames(cls.heart, { [cls.liked]: props?.answ?.like_by_author })}
          onClick={() => {
            toggleFavorites(props?.answ.id, !props?.answ?.like_by_author);
          }}
        >
          <Heart />
        </span>
      )}
    </div>
  );
};
