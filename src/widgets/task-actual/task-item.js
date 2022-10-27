/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';

import cls from './task.module.scss';

import { Caption, Title2, Title3, Title4 } from 'shared/ui/typography';

import foto from '../../shared/assets/test-content/foto.png';
import check from '../../shared/assets/test-content/check_green.svg';
import close from '../../shared/assets/test-content/canced.svg';
import heart from '../../shared/assets/test-content/heart-gray.svg';
import chat from '../../shared/assets/test-content/chat.svg';

import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { useAnswerToTask, useTasks } from './model';
import { useParams } from 'react-router';
import { AnswerItem } from './answer-item';
import { convertDateMn } from 'shared/utils';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { ModalAnswerToTask } from 'widgets/modals/modal-answer-to-task';

export const TaskItem = props => {
  const userId = useSelector(state => state.userReducer.user.pk);
  const [openAnswers, setOpenAnswers] = useState(false);
  const [openAnswerModal, setOpenAnswerModal] = useState(false);
  const [answers, setAnswers] = useState([]);
  const { id } = useParams();

  const getData = async () => {
    try {
      const data = await props?.getAnswers(id, props?.task?.id);
      setAnswers(data);
    } catch (err) {}
  };

  useEffect(() => {
    if (openAnswers) getData();
  }, [openAnswers]);

  const { addAnswer, err } = useAnswerToTask(id, props?.task?.id, setOpenAnswerModal);

  return (
    <div className={cls.task}>
      <div className={cls.taskitem}>
        <div className={cls.head}>
          <div className={cls.author}>{/* Автор задачи:<a className={cls.link}>Владимир А.</a> */}</div>
          <span className={cls.date}>Выполнить до: {convertDateMn(props?.task?.active_to)}</span>
          <Title4 className={cls.title}>{props?.task?.name}</Title4>
        </div>
        <p>{props?.task?.info}</p>
        <div className={cls.controls}>
          <div className={cls.btns}>
            {userId !== props?.task?.user && !props?.task?.answered && (
              <Button
                className={cls.btn}
                type={ButtonTypes.primary}
                size={ButtonSizes.small}
                onClick={() => setOpenAnswerModal(true)}
              >
                Ответить на задачу
              </Button>
            )}
            {props.task.count_answers ? (
              openAnswers ? (
                <button className={cls.close} onClick={() => setOpenAnswers(false)}>
                  <span></span>
                  <span></span>
                </button>
              ) : (
                <Button
                  className={cls.btn}
                  type={ButtonTypes.primary}
                  size={ButtonSizes.small}
                  onClick={() => setOpenAnswers(true)}
                >
                  Ответы
                </Button>
              )
            ) : (
              <></>
            )}
          </div>
          <div className={cls.info}>
            <a className={cls.txt}>Ответов: {props.task.count_answers}</a>
            <a className={classNames(cls.txt, { [cls.unread]: props.task.count_new_answers })}>
              Непрочитанных: {props.task.count_new_answers}
            </a>
          </div>
        </div>
      </div>
      {openAnswers && (
        <div className={cls.taskAnswer}>
          {answers.length > 0 ? (
            answers.map(answ => (
              <AnswerItem
                isTaskOwner={props?.task?.user === userId}
                status={props?.task.status}
                isOwner={props?.task.user === userId}
                key={answ.id}
                answ={answ}
                handleVote={props?.handleVote}
                getData={getData}
                // toggleFavorites={toggleFavorites}
              />
            ))
          ) : (
            <div className={cls['empty']}>Пока нет ответов</div>
          )}
          {/* <AnswerItem /> */}
        </div>
      )}
      <ModalAnswerToTask isOpen={openAnswerModal} setIsOpen={setOpenAnswerModal} addAnswer={addAnswer} err={err} />
    </div>
  );
};
