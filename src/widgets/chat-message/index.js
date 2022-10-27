import cls from './chat.module.scss';

import { convertDateMn } from 'shared/utils';

export const MessageChat = ({ user, onClick, text, time }) => {

  return (
    <div className={cls.container} onClick={onClick}>
      <img className={cls.picture} src={!user?.is_administrator ? 'https://graphover.ru' + user?.avatar : user?.avatar} alt={'foto'} />
      <div className={cls.content}>
        <span className={cls.name}>{user?.username}</span>
        <span className={cls.time}>{convertDateMn(time)}</span>
        {/* <Title5 className={cls.title}>Новое сообщение</Title5> */}
        <p className={cls.text}>{text ? text : 'Нет сообщений'}</p>
        {/* <span className={cls.count}>4</span> */}
      </div>
    </div>
  );
};
