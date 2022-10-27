import { Tooltip } from '@mui/material';
import classNames from 'classnames';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { convertDate } from 'shared/utils';
import { ModalCloseChapter } from 'widgets/modals/modal-close-chapter';
import cls from './content.module.scss';
import { useStartChapterVote } from './model';

export const InnerCatalogContent2bottomPanel = props => {
  const { currentChapter } = props;

  if (currentChapter.role === 'E') return <EditStatusCasePanel {...props} />;
  if (currentChapter.role === 'W') return <WaitStatusCasePanel {...props} />;
  if (currentChapter.role === 'V') return <VoteStatusCasePanel {...props} />;
  return <div className=""></div>;
};

export const VoteStatusCasePanel = props => {
  const { currentChapter } = props;

  return (
    <div className={cls.votes}>
      <span className={cls.span}>Голоосование до: {convertDate(currentChapter?.active_to)}</span>
      <span className={cls.span}>Идет голосование</span>
    </div>
  );
};
export const WaitStatusCasePanel = props => {
  const { currentChapter } = props;

  return (
    <div className={cls.votes}>
      <span className={cls.span}>Голосование начнется: {convertDate(currentChapter?.active_to)}</span>
      <span className={cls.span}>Ожидает голосования</span>
    </div>
  );
};
export const EditStatusCasePanel = props => {
  const { id } = useParams();
  const { currentChapter, getQuestStructure, getChapter } = props;
  const userId = useSelector(state => state.userReducer.user.pk);
  const [open, setopen] = useState(false);

  const { handleStartVote } = useStartChapterVote(id, getQuestStructure, getChapter);

  return (
    <div className={cls.votes}>
      <span className={cls.span}>Редактирование до: {convertDate(currentChapter?.active_to)}</span>
      {currentChapter.user.id === userId &&
        (!currentChapter.title || !currentChapter.text ? (
          <Button size={ButtonSizes.small} type={ButtonTypes.disabled} className={cls.btnVote} disabled>
            <Tooltip title="Чтобы выложить граф на голосование, его содержимое не должно быть пустым. После заполнения графа данная опция будет доступна.">
              <>Выложить на голосование</>
            </Tooltip>
          </Button>
        ) : (
          <Button
            size={ButtonSizes.small}
            type={ButtonTypes.outline}
            onClick={() => setopen(true)}
            className={[cls.btnVote].join(' ')}
          >
            Выложить на голосование
          </Button>
        ))}
      <ModalCloseChapter
        title="Выставить на голосование"
        isOpen={open}
        setIsOpen={setopen}
        acceptText="Подтвердить"
        handleReject={() => setopen(false)}
        handleAccept={() => handleStartVote(currentChapter.id)}
      />
    </div>
  );
};
