import iconArrowBack from 'shared/assets/test-content/arrow_back.svg';
import { SelectInput } from 'shared/ui/select-input';
import { Title5 } from 'shared/ui/typography';

import { useChat, useWebSocketChat } from 'app/hooks/chat';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useChatAdmin, useChats } from 'widgets/chat/hooks';
import { ChatBody } from './chat-body';
import { ChatSidebar } from './chat-sidebar';
import cls from './user-panel-client.module.scss';

export const HeaderChat = ({ isOpenChat, openChat }) => {
  const ws = useRef({});

  const [currentUser, setcurrentUser] = useState(null);
  const userId = useSelector(state => state.userReducer.user.pk);
  const { getChats, addMessage, sendMessage, scrollToBottom } = useChats();
  const { } = useWebSocketChat(userId, ws, addMessage);
  const { getAdminInfo } = useChatAdmin();
  // const { getMessages } = useChatMessages();

  const { getMessages: getMessagesById } = useChat();

  useEffect(() => {

    if (userId) {
      getChats();
      getAdminInfo();
    }
  }, [userId]);
  if (!userId) return <></>;
  return (
    <>
      <div className={[cls.chatDrop, isOpenChat && cls.opened].join(' ')}>
        {!currentUser ? (
          <div className={cls.controls}>
            <div className="">
              <SelectInput
                color={'rgba(26, 26, 26, 0.5);'}
                paddingLeft={'8px'}
                className={cls.sort}
                placeholder={'Чаты'}
                options={[
                  // { label: 'Все сообщения', value: 'all', id: 1 },
                  { label: 'Новые сообщения', value: 'new', id: 2 },
                  // { label: 'Команда', value: 'team', id: 3 }
                ]}
              />
            </div>
            <button className={cls.btnClose} onClick={openChat}>
              <span></span>
              <span></span>
            </button>
          </div>
        ) : (
          <div className={cls.top}>
            <button className={cls.back} onClick={() => setcurrentUser(null)}>
              <img src={iconArrowBack} alt={'arrowBack'} />
            </button>
            <Link to={`/profile/${currentUser?.id}`}>
              <img src={!currentUser?.is_administrator ? 'https://graphover.ru' + currentUser?.avatar : currentUser?.avatar} className={cls.picture} alt={'ad'} />
              <Title5 className={cls.title}>{currentUser?.username}</Title5>
            </Link>
            {/* <span className={cls.count}>8 участника</span> */}
            {/* <button className={cls.burger}>
              <span></span>
              <span></span>
              <span></span>
            </button> */}
          </div>
        )}
        {!currentUser ? (
          <ChatSidebar currentUser={currentUser} setcurrentUser={setcurrentUser} />
        ) : (
          <ChatBody
            currentUser={currentUser}
            setcurrentUser={setcurrentUser}
            scrollToBottom={scrollToBottom}
            sendMessage={sendMessage}
          />
        )}
      </div>
    </>
  );
};
