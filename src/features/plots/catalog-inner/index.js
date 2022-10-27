import React, { useEffect, useState } from 'react';
import cls from './catalog-inner.module.scss';

import avatar from 'shared/assets/test-content/foto.png';
import iconAdd from 'shared/assets/test-content/add.svg';
import { Title3, Title4 } from 'shared/ui/typography';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { MessageWriteTextArea } from 'widgets/message-write-textarea';
import { Tabs } from 'shared/ui/tabs';
import { InnerCatalogHead } from '../catalog-inner-head';
import { InnerCatalogChat } from '../catalog-inner-chat';
import { InnerCatalogContent } from '../catalog-inner-content';
import { TaskActual } from 'widgets/task-actual';
import { ProjectDashBoard } from 'widgets/project-dashboard';
import { ScenariState } from 'widgets/state-scenari';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { useQuest } from './model';
import { Modal5 } from 'widgets/modals/modal5';
import { useLocalStorage } from 'app/hooks';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

export const InnerCatalogPage = () => {
  const { id } = useParams();
  const userState = useSelector(state => state.userReducer.user);
  const questData = useQuest(id);

  const { state, currentChapter, getQuestStructure, getChapter } = questData;

  const isAuthor = state.authors_list
    ? state.authors_list.filter(i => i.name === userState.username).length === 0
      ? false
      : true
    : false;

  const isAuthorActive = isAuthor
    ? state.authors_list.filter(i => i.name === userState.username)[0].status === 'C'
      ? true
      : false
    : false;

  useEffect(() => {
    if (currentChapter.role === 'V') {
      setTimeout(function run() {
        if (currentChapter.role !== 'V') {
          getQuestStructure();
          getChapter(id, currentChapter.id);
        } else {
          setTimeout(run, 2000);
        }
      }, 2000);
    }
  }, [currentChapter]);

  return (
    <div className={cls.container}>
      <ButtonActionsPanel {...questData} isAuthor={isAuthor} isAuthorActive={isAuthorActive} />
      <InnerCatalogHead state={state} updateState={questData.getQuestData} />
      <InnerCatalogContent {...questData} />
      <InnerCatalogChat />

      {/* <TaskActual /> */}
      {/* <ProjectDashBoard /> */}
      {/* <ScenariState /> */}
    </div>
  );
};

const ButtonActionsPanel = props => {
  const navigate = useNavigate();

  return (
    <div className={cls.btnsWrapper}>
      <Button
        size={ButtonSizes.small}
        type={ButtonTypes.outline}
        onClick={() => {
          navigate('/catalog');
        }}
        className={cls.btn}
      >
        Вернуться назад
      </Button>

      <BtnActionsComponent {...props} />
      {/* <Button
        size={ButtonSizes.small}
        type={ButtonTypes.outline}
        onClick={() => {
          // setisOpen(true);
        }}
        className={cls.btn}
      >
        Заявка на авторство
      </Button> */}
    </div>
  );

  return;
};

const BtnActionsComponent = ({ state, getQuestData, isAuthor, isAuthorActive, resumeQuest, joinToQuestAsAuthor }) => {
  const { id: questId } = useParams();
  const [isOpen, setisOpen] = useState(false);
  const [isOpenClosed, setisOpenClosed] = useState(false);
  const [isOpenVote, setisOpenVote] = useState(false);
  const [isOpenAccept, setisOpenAccept] = useState(false);

  const [auth] = useLocalStorage('access_token', '', true);
  const questStatus = useSelector(state => state.questReducer.questStatus[questId]);
  const questVoteStatus = useSelector(state => state.questReducer.questVoteStatus[questId]);

  // if (true) {
  if (questStatus === 'C' && questVoteStatus === 'N') {
    return (
      <div style={{ display: 'flex' }}>
        <Button
          size={ButtonSizes.small}
          type={ButtonTypes.outline}
          onClick={() => {
            setisOpenClosed(true);
          }}
          className={cls.btn}
        >
          Продлить сюжет
        </Button>
        {/* Модалка для продления сюжета здесь */}
      </div>
    );
  }
  // неавторизованный юзер
  if (!auth) return <></>;

  // Сюжет закрыт и на голосовании
  if (questStatus === 'C' && questVoteStatus === 'V' && isAuthor)
    // if (true)
    return (
      <div className="">
        <Button
          size={ButtonSizes.small}
          type={ButtonTypes.outline}
          onClick={() => {
            setisOpenVote(true);
          }}
          className={cls.btn}
        >
          Голосовать за продление сюжета
        </Button>
        {/* Модалка для голосования за продления сюжета здесь */}
      </div>
    );
  if (questStatus === 'C' && questVoteStatus === 'V') return <></>;
  if (!isAuthor)
    return (
      <div className="">
        <Button
          size={ButtonSizes.small}
          type={ButtonTypes.outline}
          onClick={() => {
            setisOpenAccept(true);
          }}
          className={cls.btn}
        >
          Заявка на авторство
        </Button>
        <Modal5 isOpen={isOpenAccept} setIsOpen={setisOpenAccept} handleAccept={joinToQuestAsAuthor} />
      </div>
    );

  if (isAuthor && !isAuthorActive)
    return (
      <Button
        size={ButtonSizes.small}
        type={ButtonTypes.outline}
        disabled
        className={classNames(cls.btn, cls.disabled)}
      >
        Модерация
      </Button>
      // </Link>
    );
  return (
    <Link to={`/plots/${questId}/inner`} className="">
      <Button size={ButtonSizes.small} type={ButtonTypes.outline} className={classNames(cls.btn)}>
        Продолжить писать
      </Button>
    </Link>
    /* <Modal5 isOpen={isOpen} setIsOpen={setisOpen} handleAccept={}/> */
  );
};
