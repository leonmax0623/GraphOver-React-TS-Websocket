import React, { useState } from 'react';
import cls from './content.module.scss';

import avatar from 'shared/assets/test-content/foto.png';
import iconAdd from 'shared/assets/test-content/add.svg';
import { Title3, Title4 } from 'shared/ui/typography';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { Tabs } from 'shared/ui/tabs';
import { ChapterSidebar } from './chapter-sidebar';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { ModalReadGraphs } from 'widgets/modals/modal-read-graphs';

export const ChapterBody = props => {
  if (Object.keys(props.currentChapter).length) return <AuthorGraph {...props} />;
  if (props.structure.filter(i => i.winner_graf).length)
    return <div className={cls.text}>Выберите граф для просмотра</div>;
  return <div className={cls.text}>Нет графов, готовых к просмотру</div>;
};

export const ChapterContainer = props => {
  const [isOpen, setisOpen] = useState(false);
  return (
    <div className={cls.right}>
      <div className={cls.top}>
        <Title3 className={cls.title}>{props?.state?.name}</Title3>
        <Button className={cls.btn} type={ButtonTypes.primary} size={ButtonSizes.small} onClick={() => setisOpen(true)}>
          Читать написанные графы
        </Button>
      </div>
      <ChapterBody {...props} />
      <ModalReadGraphs isOpen={isOpen} setIsOpen={setisOpen} {...props} />
    </div>
  );
};

export const AuthorGraph = props => {
  const user = useSelector(state => state.userReducer.user);
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  return (
    <div className={cls.text}>
      <Title3>
        Граф {props.currentChapter.graph_number}. {props.currentChapter.title}
      </Title3>
      <p> {props.currentChapter.text}</p>
    </div>
  );
};
