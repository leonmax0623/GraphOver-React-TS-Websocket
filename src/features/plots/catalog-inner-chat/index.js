import React from 'react';
import cls from './chats.module.scss';

import avatar from 'shared/assets/test-content/foto.png';
import { Title3, Title4 } from 'shared/ui/typography';
import { MessageWriteTextArea } from 'widgets/message-write-textarea';
import { useParams } from 'react-router';
import { useComments } from '../catalog-inner/model';
import classNames from 'classnames';
import { convertDate, convertDateMn } from 'shared/utils';

const CommentMessageItem = ({ is_answer, avatar, user, username, created_at, text }) => {
  return (
    <div className={classNames(cls.comment, { [cls.answer]: is_answer })}>
      <div className={cls.ava}>
        <img src={avatar} alt={'ava'} />
      </div>
      <Title4 className={cls.title}>{username}</Title4>
      <p>{text}</p>
      <div className={cls.controls}>
        <span className={cls.time}>{convertDate(created_at)}</span>
        {/* <button className={cls.linkAnswer}>Ответить</button> */}
      </div>
    </div>
  );
};

export const InnerCatalogChat = () => {
  const { id } = useParams();
  const { fetchNewComment, comments, onNextPageComments, isNextCommentsPage, newComment, setNewComment } =
    useComments(id);

  return (
    <div className={cls.chats}>
      <MessageWriteTextArea
        textAreaPlaceHolder={'Написать комментарий'}
        textButton={'Оставить комментарий'}
        setNewComment={setNewComment}
        newComment={newComment}
        handleClick={fetchNewComment}
      />
      <div className={cls.comments}>
        {comments.length > 0 ? (
          comments.map(c => <CommentMessageItem key={c.created_at} {...c} />)
        ) : (
          <>Нет комментариев</>
        )}
        {/* <div className={cls.comment}>
          <div className={cls.ava}>
            <img src={avatar} alt={'ava'} />
          </div>
          <Title4 className={cls.title}>Виталий Баранченко</Title4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit lorem erat ...</p>
          <div className={cls.controls}>
            <span className={cls.time}>08.07.2022</span>
            <button className={cls.linkAnswer}>Ответить</button>
          </div>
        </div>
        <div className={[cls.comment, cls.answer].join(' ')}>
          <div className={cls.ava}>
            <img src={avatar} alt={'ava'} />
          </div>
          <Title4 className={cls.title}>Игорь Гулеевич</Title4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit lorem erat ...</p>
          <div className={cls.controls}>
            <span className={cls.time}>08.07.2022</span>
            <button className={cls.linkAnswer}>Ответить</button>
          </div>
        </div>
        <div className={[cls.comment, cls.answer].join(' ')}>
          <div className={cls.ava}>
            <img src={avatar} alt={'ava'} />
          </div>
          <Title4 className={cls.title}>Игорь Гулеевич</Title4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit lorem erat ...</p>
          <div className={cls.controls}>
            <span className={cls.time}>08.07.2022</span>
            <button className={cls.linkAnswer}>Ответить</button>
          </div>
        </div>
        <div className={cls.comment}>
          <div className={cls.ava}>
            <img src={avatar} alt={'ava'} />
          </div>
          <Title4 className={cls.title}>Виталий Баранченко</Title4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit lorem erat ...</p>
          <div className={cls.controls}>
            <span className={cls.time}>08.07.2022</span>
            <button className={cls.linkAnswer}>Ответить</button>
          </div>
        </div>
        <div className={cls.comment}>
          <div className={cls.ava}>
            <img src={avatar} alt={'ava'} />
          </div>
          <Title4 className={cls.title}>Виталий Баранченко</Title4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit lorem erat ...</p>
          <div className={cls.controls}>
            <span className={cls.time}>08.07.2022</span>
            <button className={cls.linkAnswer}>Ответить</button>
          </div>
        </div> */}
      </div>
      {isNextCommentsPage && (
        <button className={cls.moreComments} onClick={onNextPageComments}>
          Показать еще
        </button>
      )}
    </div>
  );
};
