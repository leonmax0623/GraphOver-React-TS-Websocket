import React, { useEffect } from 'react';

import cls from './task.module.scss';

import { Caption, Title2, Title3, Title4 } from 'shared/ui/typography';

import foto from '../../shared/assets/test-content/foto.png';
import check from '../../shared/assets/test-content/check_green.svg';
import close from '../../shared/assets/test-content/canced.svg';
import heart from '../../shared/assets/test-content/heart-gray.svg';
import chat from '../../shared/assets/test-content/chat.svg';

import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { useAddTask, useTasks } from './model';
import { useParams } from 'react-router';
import { TaskItem } from './task-item';
import { ModalAddTask } from 'widgets/modals/modal-add-task';

export const TaskActual = ({ isTaskShow, setTaskShow }) => {
  const { id } = useParams();
  const { tasks, getAnswers, getTasks, handleVote } = useTasks(id);
  const { onSubmit, err, isOpen, setIsOpen } = useAddTask(id);

  useEffect(() => {
    getTasks();
  }, []);

  if (!isTaskShow) return <></>;
  return (
    <div className={cls.container}>
      <div className={cls.top}>
        <Title3 className={cls.title}>Актуальные задачи</Title3>
        <div className={cls.btns}>
          <Button
            className={cls.btn}
            type={ButtonTypes.primary}
            size={ButtonSizes.small}
            onClick={() => setIsOpen(true)}
          >
            Добавить задачу
          </Button>
          <button className={cls.close} onClick={() => setTaskShow(false)}>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      <div className={cls.taskList}>
        {tasks?.length > 0 ? (
          tasks?.filter(t => t.status === 'V')?.length === 0 ? (
            <p className={cls['empty-paper']}>Пока нет задач</p>
          ) : (
            tasks?.map(task => (
              <TaskItem
                key={task.id}
                // isAuthor={isAuthor}
                // quest_id={quest_id}
                // setCurTaskId={setCurTaskId}
                handleVote={handleVote}
                task={task}
                getAnswers={getAnswers}
                // getTasks={getTasks}
              />
            ))
          )
        ) : (
          <p className={cls['empty-paper']}>Пока нет задач</p>
        )}
      </div>
      <ModalAddTask isOpen={isOpen} setIsOpen={setIsOpen} err={err} onSubmit={onSubmit} />
      {/* <img src={chat} alt={'chat'} /> */}
    </div>
  );
};
