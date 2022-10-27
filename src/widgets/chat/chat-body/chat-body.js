import { useEffect, useState } from 'react';
import cls from '../chat.module.scss';

import { Title5 } from 'shared/ui/typography';
import { MessageWrite } from 'widgets/message-write';

import foto from 'shared/assets/test-content/foto.png';

import iconArrowBack from 'shared/assets/test-content/arrow_back.svg';

import { useSelector } from 'react-redux';
import { MessageAnswerItem, MessageItem } from './message-item';

export const ChatBody = ({ currentUser, sendMessage, messagesEndRef, scrollToBottom }) => {
  const chats = useSelector(state => state.chatReducer.chats);
  const userMessages = currentUser && chats[currentUser] ? chats[currentUser] : [];
  const userId = useSelector(state => state.userReducer.user.pk);
  const [files, setfiles] = useState([]);
  const reversed_msgs = [...userMessages].reverse();

  useEffect(() => {
    scrollToBottom(messagesEndRef);
  }, [reversed_msgs, currentUser]);

  return (
    <div className={cls.right}>
      <div className={[cls.mobileControls].join(' ')}>
        <div className={cls.top}>
          <button className={cls.back}>
            <img src={iconArrowBack} alt={'arrowBack'} />
          </button>
          <img src={foto} className={cls.picture} alt={'foto'} />
          <span className={cls.count}>8 участника</span>
          <Title5 className={cls.title}>Команда Пиксель</Title5>
          <button className={cls.burger}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      <div className={cls.list}>
        {/* <span className={cls.time}>06 июл </span> */}
        {reversed_msgs.map(msg => {
          if (!msg.body && msg.media.length === 0) return <></>;
          if (msg.from_user.id === userId)
            return <MessageAnswerItem key={msg.id} text={msg.body} media={msg.media} time={msg.timestamp} />;
          return (
            <MessageItem
              key={msg.id}
              user={msg.from_user}
              media={msg.media}
              text={msg.body}
              time={msg.timestamp}
              logo={msg}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      {currentUser && (
        <MessageWrite files={files} setfiles={setfiles} sendMessage={sendMessage} currentUser={currentUser} />
      )}
    </div>
  );
};
