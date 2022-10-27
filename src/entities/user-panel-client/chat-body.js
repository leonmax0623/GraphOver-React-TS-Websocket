// import { SelectInput } from 'shared/ui/select-input';
// import { Title5 } from 'shared/ui/typography';
import { Answer } from 'widgets/answer';
// import { MessageChat } from 'widgets/chat-message';
import { Message } from 'widgets/message';
// import iconArrowBack from 'shared/assets/test-content/arrow_back.svg';

// import foto from 'shared/assets/test-content/foto.png';
import { useEffect, useRef, useState } from 'react';
import cls from './user-panel-client.module.scss';
// import { useChatAdmin, useChats } from 'widgets/chat/hooks';
import { useSelector } from 'react-redux';
// import { useChat, useWebSocketChat } from 'app/hooks/chat';
// import { ChatSidebar } from './chat-sidebar';
import classNames from 'classnames';
import { MessageWrite } from 'widgets/message-write';

export const ChatBody = ({ currentUser, sendMessage, scrollToBottom }) => {

  const chats = useSelector(state => state.chatReducer.chats);
  const messagesEndRef = useRef(null);
  const userMessages = currentUser && chats[currentUser?.id] ? chats[currentUser?.id] : [];
  const userId = useSelector(state => state.userReducer.user.pk);
  const [files, setfiles] = useState([]);
  const reversed_msgs = [...userMessages].reverse();

  useEffect(() => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 500);
    console.log(messagesEndRef);
  }, [reversed_msgs, currentUser, messagesEndRef]);

  console.log("#@$$$$$$$$$$", reversed_msgs)

  return (
    <div className={classNames(cls.chatForm, cls.opened)}>
      <div className={cls.chatFormMessages}>
        {reversed_msgs.map(msg => {
          console.log("0000000000", msg.media)
          if (!msg.body && msg.media.length === 0) return <></>;
          if (msg.from_user.id === userId)
            return <Answer key={msg.id} text={msg.body} media={msg.media} time={msg.timestamp} />;
          return (
            <Message
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
      <div className={cls.bot}>
        <MessageWrite files={files} setfiles={setfiles} sendMessage={sendMessage} currentUser={currentUser.id} />
      </div>
    </div>
  );
};
